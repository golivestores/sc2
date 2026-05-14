"""
scrape-url.py — download a webpage with all its assets for local editing.

Usage:
    python scrape-url.py <URL> <folder-name> [title]

Example:
    python scrape-url.py https://example.com/ 002-example "Example site"

Saves to: designs/<folder-name>/
  - index.html (rewritten to use local paths)
  - assets/<host>/<path>      (downloaded CSS, JS, images, fonts, ...)
  - meta.json                 (skeleton — edit title/description/tags afterwards)

Rewrites URLs inside HTML (href/src/srcset), inside CSS url() references, and
inside any data-* attribute whose value looks like an asset URL (e.g. Shopify
themes that put GLTF / HDR / Lottie paths on <body data-modele="…" data-hdr="…">
for theme JS to consume).

Does NOT execute JavaScript. Lazy-loaded or JS-injected resources will not be captured.
For those, use the SingleFile browser extension instead.

KNOWN GOTCHAS (read these before declaring a mirror "complete"):

  * **Webpack/Vite dynamic chunks (string-literal URLs)** — handled automatically.
    The scraper greps every downloaded JS file for `"./X.js"`, `"/X.json"`, etc.
    (any path with a known asset extension), resolves them against the importer's
    URL, downloads, and recurses. Absolute refs (`/api/data.json`, `/models/x.glb`)
    are also duplicated to `out_dir/<path>` so they resolve when the user serves
    out_dir as the document root via a local HTTP server.

  * **Webpack numeric chunk IDs** — `__webpack_require__.e(123)` style still NOT
    auto-handled. URL is constructed at runtime (`i.u = e => "..."` + publicPath),
    so there is no string literal to grep. Fix: read runtime.js for the publicPath
    + filename template, grep app.js for all `i.e(\\d+)` chunk ids, curl each one
    into the mirror manually.

  * **Protocol-relative URLs as load-bearing CSS** — `<link href="//host/path/x.css">`
    sometimes encode-fail on rewrite (e.g. `&amp;` in URLs) or get dismissed as
    "third-party / Shopify backend" without reading them. They often contain
    layout-critical rules (position: sticky, clip-path initial states, etc).
    Rule: **never label a same-origin CSS file "non-critical" without reading it.**
    If your section grep doesn't find a key selector, suspect a missed CSS file.

  * **Webpack dynamic CSS chunks** — same problem as JS but rarer; check `runtime.js`
    for `miniCssF` (mini-css-extract output). Currently this scraper has no
    automatic handling; spot-check by searching the live page for unique selectors.
"""
import sys, os, re, json, shutil, socket, subprocess, hashlib, mimetypes
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag, unquote
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from datetime import date

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
TIMEOUT = 25

ROOT = Path(__file__).resolve().parent
DESIGNS = ROOT / "designs"

# Recognise URL-ish strings inside arbitrary data-* attributes.
# Some themes (Shopify, Webflow, …) stash asset URLs on <body data-foo="//host/x.gltf">
# and read them back from JS. The scraper has to pick those up too, otherwise the
# offline mirror loads broken paths.
_URL_PROTOCOL_RE = re.compile(r"^(?://|https?:|/)", re.IGNORECASE)
_URL_ASSET_EXT_RE = re.compile(
    r"""\.(?:
        json|gltf|glb|bin|hdr|exr|ktx2?|drc       # 3D / data
      | png|jpe?g|webp|svg|gif|ico|avif|bmp      # images
      | css|m?js                                  # code
      | woff2?|ttf|otf|eot                        # fonts
      | mp[34]|webm|ogg|wav|m4a|mov|aac|flac      # av
      | pdf|zip|wasm                              # misc
      | xml|txt
    )(?:$|\?|\#)""",
    re.IGNORECASE | re.VERBOSE,
)


def looks_like_asset_url(v):
    """Heuristic: is this string likely an asset URL we should download?

    We are conservative on purpose — data-* attributes carry all kinds of stuff
    (JSON blobs, route paths, IDs). Only accept values that *both* look path-y
    AND end at a recognised asset extension.
    """
    if not v or not isinstance(v, str):
        return False
    s = v.strip()
    if not s:
        return False
    if s[0] in "{[":            # JSON / array literal
        return False
    if s.startswith(("data:", "javascript:", "mailto:", "tel:", "#", "?")):
        return False
    has_ext = bool(_URL_ASSET_EXT_RE.search(s))
    if not has_ext:
        return False
    # has a known extension — also require some path-shape evidence
    return bool(_URL_PROTOCOL_RE.match(s)) or "/" in s


def http_get(url):
    req = Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urlopen(req, timeout=TIMEOUT) as r:
        data = r.read()
        ctype = r.headers.get("Content-Type", "")
        final_url = r.geturl()
    return data, ctype, final_url


class AssetExtractor(HTMLParser):
    """Collects attribute locations that reference external resources."""
    # attr_name indicates how the URL is embedded: 'plain' | 'srcset' | 'style'
    ATTRS = {
        "link":   [("href", "plain")],
        "script": [("src",  "plain")],
        "img":    [("src",  "plain"), ("srcset", "srcset"), ("data-src", "plain"),
                   ("data-srcset", "srcset")],
        "source": [("src",  "plain"), ("srcset", "srcset")],
        "video":  [("src",  "plain"), ("poster", "plain")],
        "audio":  [("src",  "plain")],
        "iframe": [("src",  "plain")],
        "use":    [("href", "plain"), ("xlink:href", "plain")],
    }

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.assets = []   # list of (url, kind)
        self.inline_styles = []  # list of (text,) — inline <style> blocks are harvested from raw HTML too

    LINK_ASSET_RELS = {
        "stylesheet", "preload", "prefetch", "modulepreload",
        "icon", "shortcut icon", "apple-touch-icon", "apple-touch-icon-precomposed",
        "mask-icon", "manifest",
    }

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        a = dict(attrs)
        # filter <link> to only resource-like rels (skip canonical/alternate/dns-prefetch/etc.)
        if tag == "link":
            rel = (a.get("rel") or "").strip().lower()
            if rel not in self.LINK_ASSET_RELS:
                return
        handled = set()
        for name, kind in self.ATTRS.get(tag, []):
            v = a.get(name)
            if not v:
                continue
            handled.add(name)
            if kind == "srcset":
                for part in split_srcset(v):
                    p = part.strip().split()
                    if p and p[0]:
                        self.assets.append((p[0], "srcset-item"))
            else:
                self.assets.append((v, "plain"))
        # Generic data-* URL scan. Catches Shopify-style theme attrs like
        # <body data-modele="//host/MANA.gltf?v=…" data-hdr="…"> and similar.
        for k, v in a.items():
            if not k or not k.startswith("data-") or k in handled:
                continue
            if looks_like_asset_url(v):
                self.assets.append((v, "plain"))
        style = a.get("style")
        if style:
            for u in re.findall(r"url\(\s*['\"]?([^'\"\)]+)['\"]?\s*\)", style):
                self.assets.append((u, "css-url"))


def local_path_for(url, base_url):
    """Map an absolute URL to a local relative path under assets/."""
    absu = urljoin(base_url, url)
    absu, _ = urldefrag(absu)
    p = urlparse(absu)
    if p.scheme not in ("http", "https"):
        return None, None
    host = p.netloc
    path = unquote(p.path) or "/"
    if path.endswith("/"):
        path += "index.html"
    # flatten query into filename to distinguish ?v=123 variants
    if p.query:
        q_hash = hashlib.sha1(p.query.encode("utf-8")).hexdigest()[:8]
        root, ext = os.path.splitext(path)
        path = f"{root}.{q_hash}{ext}"
    # Windows-safe sanitisation of each path component.
    # Some image proxies embed an http(s) URL inside the path, e.g.
    #   /_ipx/f_webp&s_600x374/https:/cdn.sanity.io/images/.../foo.png
    # The literal "https:" can't be a folder name on Windows (':' is illegal in
    # filename components, also '<>"|?*' and chars 0-31).
    def _sanitise(comp):
        bad = '<>:"|?*'
        out = "".join(("_" if c in bad or ord(c) < 32 else c) for c in comp)
        return out or "_"
    parts = [host] + [_sanitise(c) for c in path.lstrip("/").split("/")]
    rel = "assets/" + "/".join(parts)
    return absu, rel


def split_srcset(value):
    """Split a srcset value on commas, ignoring commas inside (), [], or {}.

    Storyblok and Imgix produce URLs like
      .../m/768x659/filters:format(avif,webp):quality(80)
    where a naive value.split(",") rips the URL in half.
    """
    parts = []
    buf = []
    depth = 0
    for ch in value:
        if ch in "([{":
            depth += 1
            buf.append(ch)
        elif ch in ")]}":
            if depth > 0:
                depth -= 1
            buf.append(ch)
        elif ch == "," and depth == 0:
            parts.append("".join(buf))
            buf = []
        else:
            buf.append(ch)
    if buf:
        parts.append("".join(buf))
    return parts


def rewrite_srcset(value, mapper):
    parts = []
    for item in split_srcset(value):
        s = item.strip()
        if not s:
            continue
        bits = s.split(None, 1)
        u = bits[0]
        rest = (" " + bits[1]) if len(bits) > 1 else ""
        new = mapper(u)
        parts.append((new if new else u) + rest)
    return ", ".join(parts)


def rewrite_css(text, base_url, register):
    """Rewrite url(...) and @import inside a CSS text. register(url) -> local_path."""
    def _skip(raw):
        return (not raw) or raw.startswith(("data:", "#", "javascript:", "about:"))

    def repl_url(m):
        q = m.group(1) or ""
        raw = m.group(2).strip()
        if _skip(raw):
            return m.group(0)
        absu, rel = local_path_for(raw, base_url)
        if not rel:
            return m.group(0)
        register(absu, rel)
        # compute path relative to the CSS file's own local dir
        rel_from_css = rel_path_between(base_local_dir(base_url), rel)
        return f"url({q}{rel_from_css}{q})"

    def repl_import(m):
        raw = m.group(1).strip()
        if _skip(raw):
            return m.group(0)
        absu, rel = local_path_for(raw, base_url)
        if not rel:
            return m.group(0)
        register(absu, rel)
        rel_from_css = rel_path_between(base_local_dir(base_url), rel)
        return f'@import "{rel_from_css}"'

    text = re.sub(r"url\(\s*(['\"]?)([^'\")]+)\1\s*\)", repl_url, text)
    text = re.sub(r"""@import\s+(?:url\()?\s*['"]([^'"]+)['"]\s*\)?\s*;?""", repl_import, text)
    return text


def base_local_dir(css_abs_url):
    """The assets/host/dir/ prefix for a given CSS absolute URL."""
    _, rel = local_path_for(css_abs_url, css_abs_url)
    return os.path.dirname(rel) if rel else ""


def rel_path_between(from_dir, to_path):
    """Posix-style relative path from from_dir to to_path, both under project root."""
    if not from_dir:
        return to_path
    fa = from_dir.replace("\\", "/").strip("/").split("/")
    ta = to_path.replace("\\", "/").split("/")
    i = 0
    while i < len(fa) and i < len(ta) - 1 and fa[i] == ta[i]:
        i += 1
    ups = [".."] * (len(fa) - i)
    return "/".join(ups + ta[i:]) if ups or ta[i:] else "."


def main():
    import argparse
    p = argparse.ArgumentParser(
        description="Scrape a webpage into designs/<folder>/ with all assets.",
        epilog="After scraping, the script auto-runs rebuild-index.ps1 and "
               "headless-renders the local mirror to spot console errors / 404s. "
               "Disable with --no-rebuild and/or --no-verify.",
    )
    p.add_argument("url")
    p.add_argument("folder")
    p.add_argument("title", nargs="?", default=None)
    p.add_argument("--no-rebuild", action="store_true",
                   help="skip auto-running rebuild-index.ps1 at the end")
    p.add_argument("--no-verify", action="store_true",
                   help="skip headless render check of the local mirror")
    p.add_argument("--nuxt-spa-fixup", action="store_true",
                   help=("apply the 5-step Nuxt 3 SPA recipe after scraping: "
                         "fetch missing CSS chunks, copy images/fonts to mirror root, "
                         "rewrite /images/ → ./images/, inject <base href>, "
                         "headless scroll + fetch lazy assets"))
    args = p.parse_args()
    url = args.url
    folder = args.folder
    title = args.title or folder
    skip_rebuild = args.no_rebuild
    skip_verify = args.no_verify
    apply_nuxt_fixup = args.nuxt_spa_fixup

    out_dir = DESIGNS / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "assets").mkdir(exist_ok=True)

    print(f"[1/4] fetching HTML: {url}")
    html_bytes, ctype, final_url = http_get(url)
    # decode
    enc = "utf-8"
    m = re.search(r"charset=([\w\-]+)", ctype or "", re.I)
    if m:
        enc = m.group(1)
    try:
        html = html_bytes.decode(enc, errors="replace")
    except LookupError:
        html = html_bytes.decode("utf-8", errors="replace")

    base_url = final_url

    print("[2/4] extracting assets from HTML")
    ex = AssetExtractor()
    ex.feed(html)

    # also catch <style>…</style> blocks via regex (HTMLParser doesn't hand us raw CSS)
    style_blocks = re.findall(r"<style[^>]*>(.*?)</style>", html, re.I | re.S)

    # plan: registry maps absolute URL -> local relative path
    registry = {}

    def register(absu, rel):
        registry[absu] = rel

    # first pass: enqueue assets directly referenced by HTML
    html_rewrites = {}  # original string -> replacement (we'll do str.replace)
    for raw, kind in ex.assets:
        if not raw or raw.startswith(("data:", "javascript:", "mailto:", "tel:", "#")):
            continue
        if kind == "srcset-item":
            absu, rel = local_path_for(raw, base_url)
            if rel:
                register(absu, rel)
                html_rewrites[raw] = rel  # replace this single URL token inside srcset values
        else:
            absu, rel = local_path_for(raw, base_url)
            if rel:
                register(absu, rel)
                html_rewrites[raw] = rel

    # also parse inline <style> for url() / @import
    for css in style_blocks:
        for raw in re.findall(r"url\(\s*['\"]?([^'\"\)]+)['\"]?\s*\)", css):
            if raw.startswith("data:"):
                continue
            absu, rel = local_path_for(raw, base_url)
            if rel:
                register(absu, rel)
                html_rewrites[raw] = rel

    print(f"[3/4] downloading {len(registry)} assets")
    downloaded = {}
    failed = []

    def fetch_one(absu, rel):
        try:
            data, ct, _ = http_get(absu)
            return absu, rel, data, ct, None
        except Exception as e:
            return absu, rel, None, None, str(e)

    with ThreadPoolExecutor(max_workers=8) as ex2:
        futs = [ex2.submit(fetch_one, a, r) for a, r in registry.items()]
        for i, f in enumerate(as_completed(futs), 1):
            absu, rel, data, ct, err = f.result()
            if err:
                failed.append((absu, err))
                print(f"    ! {absu[:80]}  ({err})")
                continue
            downloaded[absu] = (rel, data, ct or "")
            if i % 20 == 0:
                print(f"    {i}/{len(registry)}")

    # write assets; for CSS, rewrite url() first to point within assets/
    pending_css = []
    for absu, (rel, data, ct) in downloaded.items():
        target = out_dir / rel
        try:
            target.parent.mkdir(parents=True, exist_ok=True)
        except OSError as e:
            failed.append((absu, f"mkdir failed: {e}"))
            continue
        is_css = "css" in ct.lower() or rel.lower().endswith(".css")
        if is_css:
            pending_css.append((absu, rel, data, target))
        else:
            try:
                with open(target, "wb") as f:
                    f.write(data)
            except OSError as e:
                # Most often: Windows MAX_PATH (260) exceeded due to deep CDN
                # paths + ridiculously long original filenames (Webflow image
                # IDs etc). Skip and keep going — the asset just won't be
                # mirrored locally.
                failed.append((absu, f"write failed: {e}"))

    # process CSS in a second wave so we discover its url() references
    css_second_wave = {}

    def register_and_fetch(absu, rel):
        if absu in registry or absu in css_second_wave:
            return
        css_second_wave[absu] = rel

    for absu, rel, data, target in pending_css:
        try:
            css_text = data.decode("utf-8", errors="replace")
        except Exception:
            css_text = data.decode("latin-1", errors="replace")
        new_css = rewrite_css(css_text, absu, register_and_fetch)
        try:
            target.parent.mkdir(parents=True, exist_ok=True)
            with open(target, "w", encoding="utf-8") as f:
                f.write(new_css)
        except OSError as e:
            failed.append((absu, f"css write failed: {e}"))

    if css_second_wave:
        print(f"    fetching {len(css_second_wave)} additional assets referenced inside CSS")
        with ThreadPoolExecutor(max_workers=8) as ex2:
            futs = [ex2.submit(fetch_one, a, r) for a, r in css_second_wave.items()]
            for f in as_completed(futs):
                absu, rel, data, ct, err = f.result()
                if err:
                    failed.append((absu, err))
                    continue
                target = out_dir / rel
                try:
                    target.parent.mkdir(parents=True, exist_ok=True)
                    with open(target, "wb") as wf:
                        wf.write(data)
                except OSError as e:
                    failed.append((absu, f"write failed: {e}"))

    # JS dynamic-chunk discovery — Vite/Webpack/Rollup output bundles often contain
    # string literals like `import("./Lottie-XYZ.js")` or `fetch("/api/data.json")` that
    # the HTML parser never sees. We grep downloaded JS for those refs and recurse.
    #
    # - Sibling refs (`./X.js`) resolve to the importer's directory under assets/.
    # - Absolute refs (`/X.js`) ALSO get duplicated to out_dir/<path> so they resolve
    #   when the user serves out_dir as the document root (file:// + absolute paths
    #   never works; users are expected to run `python -m http.server` from out_dir).
    #
    # Numeric Webpack chunk IDs (`__webpack_require__.e(123)`) are NOT auto-detected
    # since the URL is constructed at runtime — those still need manual handling per
    # the docstring's "KNOWN GOTCHAS" notes.
    JS_REF_RE = re.compile(
        r"""['"]((?:\.{1,2}/|/)[A-Za-z0-9_\-./]+\."""
        r"""(?:js|mjs|json|wasm|glb|gltf|hdr|exr|bin|drc|ktx2?|woff2?|ttf|otf))['"]"""
    )

    def scan_js_refs(text, parent_url):
        """Yield (absolute_url, was_absolute_path) for each candidate ref, same-host only."""
        parent_host = urlparse(parent_url).netloc
        for ref in set(JS_REF_RE.findall(text)):
            is_abs = ref.startswith("/") and not ref.startswith("//")
            try:
                absu = urljoin(parent_url, ref)
                absu, _ = urldefrag(absu)
            except Exception:
                continue
            if urlparse(absu).netloc != parent_host:
                continue
            yield absu, is_abs

    js_seen = set(registry.keys()) | set(css_second_wave.keys())
    js_queue = []  # list of (absu, rel)
    js_root_copy = {}  # absu -> server-root path (for absolute-ref files that need duplicating)

    def enqueue_js_ref(absu, is_abs, parent_url):
        if absu in js_seen:
            return
        js_seen.add(absu)
        _, rel = local_path_for(absu, parent_url)
        if not rel:
            return
        if is_abs:
            url_path = urlparse(absu).path.lstrip("/")
            if url_path:
                js_root_copy[absu] = url_path
        js_queue.append((absu, rel))

    # seed: scan all already-downloaded JS
    for absu, (rel, data, ct) in list(downloaded.items()):
        if not (rel.lower().endswith((".js", ".mjs")) or "javascript" in (ct or "").lower()):
            continue
        try:
            text = data.decode("utf-8", errors="replace")
        except Exception:
            continue
        for ref_abs, is_abs in scan_js_refs(text, absu):
            enqueue_js_ref(ref_abs, is_abs, absu)

    js_round = 0
    js_total = 0
    while js_queue:
        js_round += 1
        batch = list(js_queue)
        js_queue.clear()
        print(f"    fetching {len(batch)} dynamic JS-discovered chunks (round {js_round})")
        with ThreadPoolExecutor(max_workers=8) as ex2:
            futs = [ex2.submit(fetch_one, a, r) for a, r in batch]
            for f in as_completed(futs):
                absu, rel, data, ct, err = f.result()
                if err:
                    failed.append((absu, err))
                    continue
                downloaded[absu] = (rel, data, ct or "")
                target = out_dir / rel
                try:
                    target.parent.mkdir(parents=True, exist_ok=True)
                    with open(target, "wb") as wf:
                        wf.write(data)
                except OSError as e:
                    failed.append((absu, f"write failed: {e}"))
                    continue
                # absolute-path refs ALSO need a copy at out_dir/<path> for runtime
                # absolute URL resolution under a local server rooted at out_dir
                if absu in js_root_copy:
                    root_target = out_dir / js_root_copy[absu]
                    try:
                        root_target.parent.mkdir(parents=True, exist_ok=True)
                        with open(root_target, "wb") as wf:
                            wf.write(data)
                    except OSError as e:
                        failed.append((absu, f"root-copy write failed: {e}"))
                js_total += 1
                # recurse: JS chunks may import further chunks
                if rel.lower().endswith((".js", ".mjs")) or "javascript" in (ct or "").lower():
                    try:
                        text = data.decode("utf-8", errors="replace")
                        for ref_abs, is_abs in scan_js_refs(text, absu):
                            enqueue_js_ref(ref_abs, is_abs, absu)
                    except Exception:
                        pass
    if js_total:
        print(f"    JS chunk discovery: {js_total} files across {js_round} round(s)")

    print("[4/4] rewriting HTML")
    # Replace URLs using boundary-aware regex so that a short URL (e.g. "https://host/")
    # doesn't accidentally overwrite a prefix of a longer URL inside inline JS strings.
    #
    # NOTE: HTMLParser decodes &amp; → & in attribute values when delivering them to
    # AssetExtractor, but the source HTML still has &amp;. So a URL like
    #   //host/x.jpg?v=1&amp;width=3840
    # registers as `//host/x.jpg?v=1&width=3840` in html_rewrites, but the literal
    # text in HTML is still entity-encoded. We try both variants so substitution hits.
    new_html = html
    raw_urls = sorted(html_rewrites.keys(), key=len, reverse=True)
    for raw in raw_urls:
        rel = html_rewrites[raw]
        variants = [raw]
        if "&" in raw:
            variants.append(raw.replace("&", "&amp;"))
        for variant in variants:
            pattern = re.compile(
                r'(?<=[\"\'(\s=,])' + re.escape(variant) + r'(?=[\"\'\s,\)])'
            )
            new_html = pattern.sub(rel, new_html)

    # inline <style> blocks: rewrite CSS url() using the page URL as base
    def rewrite_inline_style(m):
        css = m.group(1)
        new_css = rewrite_css(css, base_url, lambda a, r: None)
        return f"<style{m.group(0).split('<style',1)[1].split('>',1)[0]}>{new_css}</style>"

    # simpler path: do re.sub with a callable that preserves tag attrs
    def _inline_style_sub(m):
        opening = m.group(1)
        body = m.group(2)
        new_body = rewrite_css(body, base_url, lambda a, r: None)
        return f"{opening}{new_body}</style>"

    new_html = re.sub(r"(<style[^>]*>)(.*?)</style>", _inline_style_sub, new_html, flags=re.I | re.S)

    # Inject a runtime path shim into <head>. Bundled JS often hardcodes root-absolute
    # URLs like fetch("/api/data.json"), GLTFLoader.load("/models/x.glb"), or
    # fetch("/_astro/envmap.hdr"). Those resolve fine when this page is served from
    # its own server root (e.g. python -m http.server inside this folder), but break
    # when the page is loaded as a sub-iframe under a parent navigator (e.g. the sc2
    # navigator at localhost:8080/designs/<folder>/index.html — "/api/..." then resolves
    # to the parent's root, not this folder).
    #
    # The shim hooks fetch() and XMLHttpRequest.open(), rewriting "/x" to "./x" so the
    # request resolves relative to this document. It is a no-op under the standalone-
    # server case (relative resolves to the same target as absolute when the page is
    # at the root), and it leaves "//host" protocol-relative URLs alone.
    PATH_SHIM = """<script>
/* Local-mirror path shim — auto-injected by scrape-url.py.
   See scrape-url.py for rationale. Behavior under standalone server is unchanged. */
(function () {
  function rewrite(u) {
    if (typeof u !== 'string') return u;
    if (u.length < 2 || u[0] !== '/' || u[1] === '/') return u;
    return '.' + u;
  }
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function (input, init) {
      if (typeof input === 'string') {
        input = rewrite(input);
      } else if (input && typeof Request !== 'undefined' && input instanceof Request) {
        try {
          var u = new URL(input.url);
          if (u.origin === location.origin && u.pathname[0] === '/' && u.pathname[1] !== '/') {
            input = new Request(rewrite(u.pathname + u.search + u.hash), input);
          }
        } catch (e) {}
      }
      return origFetch.call(this, input, init);
    };
  }
  var origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    arguments[1] = rewrite(url);
    return origOpen.apply(this, arguments);
  };
})();
</script>"""
    # insert right after the opening <head> tag (case-insensitive, whitespace tolerant)
    new_html, n_subs = re.subn(
        r"(<head\b[^>]*>)", lambda m: m.group(1) + PATH_SHIM, new_html, count=1, flags=re.I
    )
    if n_subs == 0:
        # no <head> found (rare) — prepend the shim so it still runs first
        new_html = PATH_SHIM + new_html

    with open(out_dir / "index.html", "w", encoding="utf-8") as f:
        f.write(new_html)

    # meta.json skeleton
    meta_path = out_dir / "meta.json"
    if not meta_path.exists():
        meta = {
            "title": title,
            "description": "",
            "sourceUrl": url,
            "savedAt": date.today().isoformat(),
            "tags": [],
        }
        meta_path.write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")

    total_bytes = sum((out_dir / r).stat().st_size for r in set(v[0] for v in downloaded.values()) if (out_dir / r).exists())
    print("")
    print(f"done. folder: {out_dir}")
    print(f"  assets downloaded: {len(downloaded)}")
    print(f"  assets failed:     {len(failed)}")
    print(f"  total size:        {total_bytes/1024/1024:.1f} MB")
    if failed:
        print(f"  (first 5 failures)")
        for u, e in failed[:5]:
            print(f"    {u[:90]}  -> {e}")

    # === post-process: framework asset directories that runtime code wants at
    # the document root (Nuxt fetches /_nuxt/builds/meta/<buildId>.json, Astro
    # fetches /_astro/*, Next fetches /_next/*, SvelteKit /_app/*). These URLs
    # are constructed at runtime (templated against buildId + publicPath) so
    # the JS string-literal scan can't find them. Path shim rewrites /x to ./x
    # which resolves to designs/<folder>/_nuxt/... → must exist there. Solution:
    # if assets/<host>/_framework/ exists, duplicate the tree to <out_dir>/_framework/. */
    framework_dirs_copied = []
    for fw in ("_nuxt", "_astro", "_next", "_app", "_svelte"):
        existing_root = out_dir / fw
        if existing_root.exists():
            continue
        candidates = list((out_dir / "assets").glob(f"*/{fw}"))
        for src in candidates:
            if src.is_dir() and not existing_root.exists():
                try:
                    shutil.copytree(src, existing_root)
                    framework_dirs_copied.append((fw, src.parent.name))
                except OSError as e:
                    print(f"  framework dir copy failed for {fw}: {e}")
                break
    if framework_dirs_copied:
        for fw, host in framework_dirs_copied:
            print(f"  copied {host}/{fw}/ → {out_dir.name}/{fw}/ (runtime-resolved root path)")

    if apply_nuxt_fixup:
        apply_nuxt_spa_fixup(out_dir, original_url=url)

    if not skip_rebuild:
        run_rebuild_index(ROOT)
    if not skip_verify:
        verify_mirror_headless(out_dir, original_url=url)


def apply_nuxt_spa_fixup(mirror_dir: Path, original_url: str):
    """5-step recipe to turn a Nuxt 3 SPA scrape into a self-contained renderable mirror.

    Default scrape captures the HTML shell + assets the static parser sees, but
    Nuxt apps fall through five gaps:
      1. Route-specific CSS chunks (default/index/error-*.HASH.css) loaded by JS
         at runtime — not in the HTML, not auto-downloaded.
      2. CSS @font-face / url() and JS `"/images/..."` references point at the
         document root, but the mirror lives at /designs/NNN/. Files exist under
         assets/<host>/{images,fonts}/ but not at the mirror root where lookups land.
      3. Image src and CSS url() with leading `/` bypass the fetch/XHR path shim.
      4. After hydration Nuxt history.replaceState rewrites location.href to `/`,
         breaking all relative paths set by subsequent JS.
      5. Lazy-scrolled images referenced only at scroll-trigger time.

    The recipe — applied automatically when --nuxt-spa-fixup is passed:
      step 1: grep `entry.HASH.js` for `./X.HASH.css` literals, fetch missing
              ones from live `https://<host>/_nuxt/` into both copies of _nuxt/.
      step 2: copy assets/<host>/{images,fonts,audio,video,media}/ to mirror root.
      step 3: rewrite `"/X/`, `url(/X/` → `./X/` in all mirror JS/CSS for the
              common asset-folder names.
      step 4: inject `<base href="/designs/<folder>/">` right after <head>.
      step 5: headless scroll-through; for every 4xx response under the mirror
              path, fetch the corresponding URL from <host>/<rel-path>.

    Idempotent: re-running skips work already done.
    """
    import shutil
    from urllib.parse import urlparse
    from urllib.request import Request, urlopen
    from concurrent.futures import ThreadPoolExecutor

    host = urlparse(original_url).netloc
    if not host:
        print("[nuxt-spa-fixup] cannot determine host from URL, aborting")
        return
    print(f"\n[nuxt-spa-fixup] applying 5-step Nuxt 3 SPA recipe (host={host})")

    UA = {"User-Agent": "Mozilla/5.0"}
    mirror_nuxt = mirror_dir / "_nuxt"
    assets_nuxt = mirror_dir / "assets" / host / "_nuxt"

    # === step 1: fetch missing CSS chunks ===
    entry_js = next(iter(assets_nuxt.glob("entry.*.js")), None)
    if entry_js:
        text = entry_js.read_text(encoding="utf-8", errors="replace")
        css_refs = set(re.findall(r'"\.\/([A-Za-z0-9_.-]+\.[a-f0-9]{8}\.css)"', text))
        have = set(p.name for p in mirror_nuxt.glob("*.css")) if mirror_nuxt.exists() else set()
        missing = sorted(css_refs - have)
        if missing:
            print(f"  step 1: fetching {len(missing)} missing CSS chunks")
            def fetch_css(name):
                try:
                    with urlopen(Request(f"https://{host}/_nuxt/{name}", headers=UA), timeout=15) as r:
                        data = r.read()
                    for d in [mirror_nuxt, assets_nuxt]:
                        d.mkdir(parents=True, exist_ok=True)
                        (d / name).write_bytes(data)
                    return f"    ok {name}"
                except Exception as e:
                    return f"    fail {name}: {e}"
            with ThreadPoolExecutor(max_workers=6) as ex:
                for r in ex.map(fetch_css, missing):
                    print(r)
        else:
            print("  step 1: no missing CSS chunks")
    else:
        print("  step 1: no entry.*.js found, skipping CSS chunk grep")

    # === step 2: copy asset folders to mirror root ===
    src_host = mirror_dir / "assets" / host
    if src_host.exists():
        copied = []
        for d in src_host.iterdir():
            if not d.is_dir() or d.name in ("_nuxt", "_astro", "_next", "_app", "_svelte"):
                continue
            if d.name in ("images", "fonts", "audio", "video", "videos", "media"):
                dst = mirror_dir / d.name
                if not dst.exists():
                    try:
                        shutil.copytree(d, dst)
                        copied.append(d.name)
                    except OSError as e:
                        print(f"    skip {d.name}: {e}")
        if copied:
            print(f"  step 2: copied {', '.join(copied)}/ to mirror root")
        else:
            print("  step 2: no fresh asset folders to copy")

    # === step 3: rewrite /images/ → ./images/ in JS/CSS ===
    patterns = [
        (re.compile(r'(["\'])\/(images|fonts|audio|video|videos|media)\/'), r'\1./\2/'),
        (re.compile(r'url\(\/(images|fonts|audio|video|videos|media)\/'),    r'url(./\1/'),
    ]
    rewrites = 0
    files_changed = 0
    for f in list(mirror_dir.rglob("*.js")) + list(mirror_dir.rglob("*.css")):
        text = f.read_text(encoding="utf-8", errors="replace")
        new = text
        for pat, repl in patterns:
            new = pat.sub(repl, new)
        if new != text:
            f.write_text(new, encoding="utf-8")
            files_changed += 1
            rewrites += sum(len(re.findall(p, text)) for p, _ in patterns)
    print(f"  step 3: rewrote {rewrites} asset paths across {files_changed} files")

    # === step 4: inject <base href> ===
    index_html = mirror_dir / "index.html"
    h = index_html.read_text(encoding="utf-8")
    base_href = f"/designs/{mirror_dir.name}/"
    base_tag = f'<base href="{base_href}">'
    if base_tag in h:
        print(f"  step 4: <base href> already present")
    else:
        new_h, n = re.subn(r"(<head\b[^>]*>)", lambda m: m.group(1) + base_tag, h, count=1, flags=re.I)
        if n:
            index_html.write_text(new_h, encoding="utf-8")
            print(f"  step 4: injected <base href=\"{base_href}\">")
        else:
            print(f"  step 4: no <head> found, base href not injected")

    # === step 5: headless scroll + fetch lazy assets ===
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("  step 5: playwright not installed — skipping lazy-asset sweep")
        return

    # spawn temp server rooted at sc2/
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        # wait for server
        for _ in range(30):
            try:
                with socket.create_connection(("127.0.0.1", port), timeout=0.2):
                    break
            except OSError:
                pass

        url = f"http://127.0.0.1:{port}/designs/{mirror_dir.name}/index.html"
        mirror_prefix = f"http://127.0.0.1:{port}/designs/{mirror_dir.name}/"
        bad = set()
        with sync_playwright() as p:
            browser = p.chromium.launch()
            ctx = browser.new_context(service_workers="block", viewport={"width": 1440, "height": 900})
            page = ctx.new_page()
            page.on("response", lambda r: bad.add(r.url) if r.status >= 400 and r.url.startswith(mirror_prefix) else None)
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=20000)
                page.wait_for_timeout(4000)
                for y in (400, 1200, 2400, 4000, 6000, 8000):
                    page.evaluate(f"() => window.scrollTo(0, {y})")
                    page.wait_for_timeout(700)
            except Exception as e:
                print(f"    headless scroll failed: {e}")
            browser.close()

        if not bad:
            print("  step 5: no missing mirror-relative assets")
            return
        print(f"  step 5: fetching {len(bad)} missing lazy assets")

        def fetch_lazy(u):
            rel = u[len(mirror_prefix):]
            live = f"https://{host}/{rel}"
            dst = mirror_dir / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            try:
                with urlopen(Request(live, headers=UA), timeout=15) as r:
                    dst.write_bytes(r.read())
                return f"    ok {rel}"
            except Exception as e:
                return f"    fail {rel}: {e}"
        with ThreadPoolExecutor(max_workers=8) as ex:
            for r in ex.map(fetch_lazy, sorted(bad)):
                print(r)
    finally:
        server.terminate()
        try:
            server.wait(timeout=3)
        except subprocess.TimeoutExpired:
            server.kill()


def run_rebuild_index(root: Path):
    """Invoke rebuild-index.ps1 so the new mirror appears in designs/designs.js.

    Best-effort: prints the failure but doesn't stop the scrape if PowerShell
    isn't available (non-Windows). The user can run rebuild-index.* by hand.
    """
    script = root / "rebuild-index.ps1"
    if not script.exists():
        return
    print("\n[rebuild] regenerating designs.js + effects.js")
    candidates = [["pwsh", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(script)],
                  ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(script)]]
    for cmd in candidates:
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if r.returncode == 0:
                # surface the "Indexed N design(s)" line so the user sees what happened
                for line in r.stdout.splitlines():
                    if line.strip():
                        print(f"  {line}")
                return
            else:
                print(f"  rebuild stderr: {r.stderr.strip()[:200]}")
                return
        except FileNotFoundError:
            continue
        except Exception as e:
            print(f"  rebuild failed: {e}")
            return
    print("  no powershell/pwsh found — run rebuild-index.ps1 (or .bat) manually")


def verify_mirror_headless(mirror_dir: Path, original_url: str):
    """Headless render of the local mirror; report console errors + 404s.

    Starts a one-shot http.server bound to a free port in a subprocess, opens
    the mirror in Playwright, dumps any errors, then tears the server down.
    Silent skip when Playwright isn't installed.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("\n[verify] playwright not installed — skipping headless check (pip install playwright + playwright install chromium)")
        return

    # Find a free port
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()

    # Spawn http.server rooted at sc2/ (so designs/<folder>/index.html resolves
    # alongside other mirrors and the path shim's "./" works).
    root = mirror_dir.parent.parent
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=str(root), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        # Give the server a moment to bind
        for _ in range(20):
            try:
                with socket.create_connection(("127.0.0.1", port), timeout=0.2):
                    break
            except OSError:
                pass

        url = f"http://127.0.0.1:{port}/designs/{mirror_dir.name}/index.html"
        print(f"\n[verify] headless rendering {url}")

        errors = []
        failed_resources = []
        warnings = []
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            page.on("pageerror", lambda e: errors.append(f"PAGEERROR: {str(e)[:200]}"))
            page.on("console", lambda m: (errors if m.type == "error" else warnings).append(
                f"[{m.type}] {m.text[:200]}") if m.type in ("error", "warning") else None)
            page.on("requestfailed", lambda r: failed_resources.append(
                f"{r.failure or 'failed'} {r.url[:140]}") if "favicon" not in r.url else None)
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=15000)
                page.wait_for_timeout(2500)
            except Exception as e:
                errors.append(f"GOTO: {str(e)[:200]}")

            title = page.title()
            body_chars = page.evaluate("() => document.body.innerText.length")
            screenshot = mirror_dir / "preview.png"
            try:
                page.screenshot(path=str(screenshot), full_page=False)
            except Exception:
                screenshot = None
            browser.close()

        print(f"  title:        {title!r}")
        print(f"  body length:  {body_chars} chars")
        if screenshot:
            print(f"  screenshot:   {screenshot.relative_to(root)}")
        if errors:
            print(f"  ERRORS ({len(errors)}):")
            for e in errors[:8]:
                print(f"    {e}")
        if failed_resources:
            print(f"  404/failed resources ({len(failed_resources)}):")
            for r in failed_resources[:8]:
                print(f"    {r}")
        if not errors and not failed_resources:
            print(f"  ✓ no console errors / failed requests")
        print(f"\n  Open: {url}")
        print(f"  Compare with: {original_url}")
    finally:
        server.terminate()
        try:
            server.wait(timeout=3)
        except subprocess.TimeoutExpired:
            server.kill()


if __name__ == "__main__":
    main()
