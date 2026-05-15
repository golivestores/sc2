# -*- coding: utf-8 -*-
"""
package-effects.py — bundle each effect folder into a self-contained zip
plus a source-bundle.js that the viewer page reads.

For every `effects/NNN-name/` folder, produces:
  - effects/NNN-name/NNN-name.zip       (drop-in copy of the folder)
  - effects/NNN-name/source-bundle.js   (file contents + paste-ready HTML/CSS/JS
                                         snippets, loaded by effects/view.html)

source-bundle.js exists so the viewer works under file:// (where fetch() is
blocked). The viewer loads it via a `<script>` tag, then renders the file
list and the "ready-to-paste" snippets section from the data inside.

Run after adding / editing an effect:

    python package-effects.py

A.2 reminder: each effect folder is fully self-contained — no references to
sibling vendor/ or cross-folder paths. The zip is just `zipfile.write` over
the folder. If you start using shared vendor/ libs in an effect, this script
won't bundle them and your zip will be broken on another machine.
"""
import sys, io, json, re, zipfile, argparse, base64, mimetypes
from pathlib import Path

# Force stdout to UTF-8 on Windows (default is GBK, which can't encode our status glyphs).
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent
EFFECTS_DIR = ROOT / "effects"

# files we treat as text (and inline into source-bundle.js for the viewer)
TEXT_EXTS = {
    "html", "htm", "css", "js", "mjs", "json", "svg", "txt", "md", "xml",
    "ts", "jsx", "tsx", "vue", "yaml", "yml",
}

# files the packager generates itself — not real source, exclude from zip + bundle
GENERATED_NAMES = {"source-bundle.js"}

# sc2-ecosystem metadata files — they live alongside source but are NOT part of
# what the block needs to run on another machine. Excluded from the zip so the
# downloaded artifact contains only the runnable demo (index.html + assets + lib).
ZIP_EXCLUDE_NAMES = {"meta.json"}

# Local-only work directories never to be included in the zip or bundle.
# `source-media/` holds raw mp4/jpg pulled from the original site for later
# re-encoding — kept on disk for the author but useless to a downstream
# consumer, and can be 100+ MB. effect 014 once ballooned the zip to 130 MB
# because its source-media was bundled in.
ZIP_EXCLUDE_DIRS = {"source-media"}


def is_generated(p: Path, effect_dir: Path) -> bool:
    """Files this script writes (zip and bundle) — exclude when packaging."""
    if p.parent != effect_dir:
        return False
    if p.suffix.lower() == ".zip":
        return True
    if p.name in GENERATED_NAMES:
        return True
    return False


def is_sc2_metadata(p: Path, effect_dir: Path) -> bool:
    """Files that exist for sc2 itself (gallery, viewer) but are not needed
    by the block at runtime — exclude these from the downloadable zip."""
    if p.parent != effect_dir:
        return False
    return p.name in ZIP_EXCLUDE_NAMES


def collect_files(effect_dir: Path) -> list[Path]:
    files = []
    for p in effect_dir.rglob("*"):
        if not p.is_file():
            continue
        if is_generated(p, effect_dir):
            continue
        # Skip files inside any ZIP_EXCLUDE_DIRS (e.g. source-media/) so the
        # zip + bundle stay lean even if the author keeps raw source on disk.
        if any(part in ZIP_EXCLUDE_DIRS for part in p.relative_to(effect_dir).parts[:-1]):
            continue
        files.append(p)
    files.sort()
    return files


_TAG_OPEN_RE = re.compile(r"<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>", re.S)
_DEMO_ONLY_RE = re.compile(
    r"<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\bdata-demo-only\b[^>]*>", re.S | re.I
)


def strip_demo_only(html: str) -> str:
    """Remove every element (and its content) carrying `data-demo-only`.

    Walks the matching close tag depth-aware so nested same-name elements don't
    confuse the matcher. Self-closing void tags would just have their opening
    tag removed; in practice `data-demo-only` is used on container elements.
    """
    out = []
    pos = 0
    while True:
        m = _DEMO_ONLY_RE.search(html, pos)
        if not m:
            out.append(html[pos:])
            break
        out.append(html[pos:m.start()])
        tag = m.group(1)
        depth = 1
        scan = m.end()
        open_re = re.compile(rf"<{tag}\b", re.I)
        close_re = re.compile(rf"</{tag}\s*>", re.I)
        while depth > 0:
            no = open_re.search(html, scan)
            nc = close_re.search(html, scan)
            if not nc:
                # malformed — bail out, drop the rest
                pos = len(html)
                break
            if no and no.start() < nc.start():
                depth += 1
                scan = no.end()
            else:
                depth -= 1
                scan = nc.end()
        else:
            pos = scan
            continue
        break
    return "".join(out)


def extract_snippets(html_text: str) -> dict:
    """Pull HTML body / inline CSS / inline JS into copy-paste-ready strings.

    Excludes <script src="..."> from the JS string but lists the URLs separately
    under `external_scripts` so the viewer can show "you also need to load X".
    """
    css_blocks = re.findall(r"<style[^>]*>(.*?)</style>", html_text, re.S | re.I)
    css = "\n\n".join(b.strip() for b in css_blocks if b.strip())

    inline_js_blocks = re.findall(
        r"<script(?![^>]*\bsrc\b)[^>]*>(.*?)</script>", html_text, re.S | re.I
    )
    js = "\n\n".join(b.strip() for b in inline_js_blocks if b.strip())

    external_scripts = re.findall(r'<script[^>]*\bsrc\s*=\s*["\']([^"\']+)["\']', html_text, re.I)

    body_m = re.search(r"<body[^>]*>(.*?)</body>", html_text, re.S | re.I)
    body = body_m.group(1) if body_m else html_text
    body = re.sub(r"<style[^>]*>.*?</style>", "", body, flags=re.S | re.I)
    body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.S | re.I)
    # strip elements marked data-demo-only — these are scaffolding (demo intros,
    # scroll-room spacers) not part of the reusable block. Match the opening tag
    # carrying the attribute, then walk to its matching close tag, depth-aware.
    body = strip_demo_only(body)
    # collapse runs of blank lines created by the substitutions above
    body = re.sub(r"\n\s*\n\s*\n+", "\n\n", body).strip()

    return {
        "html": body,
        "css": css,
        "js": js,
        "external_scripts": external_scripts,
    }


def write_source_bundle(effect_dir: Path, files: list[Path]) -> Path:
    """Write effects/<NNN>/source-bundle.js with file contents + snippets."""
    folder = effect_dir.name
    file_records = []
    for p in files:
        rel = p.relative_to(effect_dir).as_posix()
        ext = p.suffix.lower().lstrip(".")
        size = p.stat().st_size
        text = None
        if ext in TEXT_EXTS:
            try:
                text = p.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                try:
                    text = p.read_text(encoding="latin-1")
                except Exception:
                    text = None
            except Exception:
                text = None
        file_records.append({"path": rel, "size": size, "text": text})

    snippets = {"html": "", "css": "", "js": "", "external_scripts": []}
    index = effect_dir / "index.html"
    if index.exists():
        snippets = extract_snippets(index.read_text(encoding="utf-8"))

    bundle = {
        "effect": folder,
        "files": file_records,
        "snippets": snippets,
    }
    out = effect_dir / "source-bundle.js"
    payload = json.dumps(bundle, ensure_ascii=False, indent=2)
    out.write_text(
        "/* auto-generated by package-effects.py — do not edit by hand */\n"
        "window.__SC2_BUNDLE__ = " + payload + ";\n",
        encoding="utf-8",
    )
    return out


# --- single-file zip: selectively inline assets into index.html ----------
#
# Goal: zip should be "unzip → double-click index.html → it runs", with HTML
# kept readable (not bloated by base64 media). Recipients want to be able to
# inspect / swap individual assets too.
#
# Rule:
#   - <script src="local.js"></script>             → inline content (text)
#   - <link rel="stylesheet" href="local.css">     → inline content (text)
#   - <video|audio|source|img src/poster="...">    → KEEP as separate file in
#     the zip (same folder structure as the source). HTML keeps the relative
#     path, so unzipping side-by-side preserves how it loaded in the editor.
#   - other tags (anything else with src/poster):
#       • inline as data URI if file < INLINE_SIZE_LIMIT (small)
#       • else KEEP as separate file
#   - external URLs (http(s)://, //cdn, data:) untouched.
#
# Net effect: zip contains index.html + assets/ folder with any video, audio,
# image referenced. Only text resources (JS libs, external CSS) get inlined.

# Mime types not always covered by the stdlib mimetypes module
_EXTRA_MIME = {
    ".mp4":  "video/mp4",
    ".webm": "video/webm",
    ".mov":  "video/quicktime",
    ".m4v":  "video/x-m4v",
    ".mp3":  "audio/mpeg",
    ".m4a":  "audio/mp4",
    ".wav":  "audio/wav",
    ".ogg":  "audio/ogg",
    ".svg":  "image/svg+xml",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf":  "font/ttf",
    ".otf":  "font/otf",
    ".eot":  "application/vnd.ms-fontobject",
}


def _file_to_data_uri(path: Path) -> str:
    mime = _EXTRA_MIME.get(path.suffix.lower()) \
        or mimetypes.guess_type(str(path))[0] \
        or "application/octet-stream"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def _is_external_url(s: str) -> bool:
    s = s.strip()
    return s.startswith(("http://", "https://", "//", "data:", "#",
                         "mailto:", "tel:", "javascript:", "about:"))


def _resolve_local(effect_dir: Path, ref: str) -> Path | None:
    if not ref or _is_external_url(ref):
        return None
    # strip query / fragment
    clean = ref.split("?", 1)[0].split("#", 1)[0]
    p = (effect_dir / clean).resolve()
    try:
        # security: make sure we don't escape the effect dir
        p.relative_to(effect_dir.resolve())
    except ValueError:
        return None
    return p if p.exists() and p.is_file() else None


# Tags whose media should NEVER be base64-inlined — kept as separate files in
# the zip so the HTML stays small + readable. The recipient unzips and the
# relative `src=` in the HTML resolves to the sibling file in the same folder.
# img is included so PNG/JPG/SVG referenced via <img> are also kept on disk.
_KEEP_AS_FILE_TAGS = {"video", "audio", "source", "img"}

# For other tags (img, etc.), inline as data URI only if file is small enough.
# 100 KB is the sweet spot: small SVG icons get inlined for "single paste"
# convenience, large screenshots stay external.
_INLINE_SIZE_LIMIT = 100 * 1024


def inline_assets_into_html(html: str, effect_dir: Path) -> tuple[str, set[Path], set[Path]]:
    """Return (modified_html, inlined_paths, kept_paths).

    Inlines:
      - <script src="local"></script> → <script>...content...</script>
      - <link rel="stylesheet" href="local"> → <style>...content...</style>
      - <img|… src/poster="local"> → data URI IF file is < _INLINE_SIZE_LIMIT
        AND the surrounding tag is not in _KEEP_AS_FILE_TAGS.

    Files referenced by <video>/<audio>/<source>, or larger than the size
    limit, are left as-is (path unchanged) and returned in `kept_paths` so
    the caller can include them alongside index.html in the zip.
    """
    inlined: set[Path] = set()
    kept: set[Path] = set()

    # 1) <script src="..."> with empty body — always inline (text, small)
    def repl_script(m):
        opening_attrs = m.group(1)
        src_match = re.search(r'\bsrc\s*=\s*["\']([^"\']+)["\']', opening_attrs)
        if not src_match:
            return m.group(0)
        ref = src_match.group(1)
        path = _resolve_local(effect_dir, ref)
        if not path:
            return m.group(0)
        try:
            content = path.read_text(encoding="utf-8", errors="replace")
        except Exception:
            return m.group(0)
        inlined.add(path)
        cleaned_attrs = re.sub(r'\bsrc\s*=\s*["\'][^"\']*["\']\s*', "", opening_attrs).strip()
        opening = f"<script {cleaned_attrs}>" if cleaned_attrs else "<script>"
        return f"{opening}\n/* inlined from {ref} */\n{content}\n</script>"

    html = re.sub(r'<script\b([^>]*)>\s*</script>', repl_script, html, flags=re.I)

    # 2) <link rel="stylesheet" href="..."> — always inline (text, small)
    def repl_link_css(m):
        attrs = m.group(1)
        if not re.search(r'rel\s*=\s*["\']stylesheet["\']', attrs, re.I):
            return m.group(0)
        href_match = re.search(r'\bhref\s*=\s*["\']([^"\']+)["\']', attrs)
        if not href_match:
            return m.group(0)
        ref = href_match.group(1)
        path = _resolve_local(effect_dir, ref)
        if not path:
            return m.group(0)
        try:
            content = path.read_text(encoding="utf-8", errors="replace")
        except Exception:
            return m.group(0)
        inlined.add(path)
        return f"<style>\n/* inlined from {ref} */\n{content}\n</style>"

    html = re.sub(r'<link\b([^>]*)/?>', repl_link_css, html, flags=re.I)

    # 3) For each opening tag with src/poster, decide: inline as data URI, or
    #    keep as separate file. Tag name determines the rule.
    def process_tag(m):
        tag_name = m.group(1).lower()
        attrs = m.group(2)
        if tag_name in ("script", "link"):
            return m.group(0)  # already handled in passes 1-2

        new_attrs = attrs
        for attr_name in ("src", "poster"):
            attr_pat = re.compile(rf'(\b{attr_name}\s*=\s*)(["\'])([^"\']+)\2', re.I)
            attr_match = attr_pat.search(new_attrs)
            if not attr_match:
                continue
            ref = attr_match.group(3)
            path = _resolve_local(effect_dir, ref)
            if not path or path in inlined:
                continue

            # Decide: keep file or inline data URI?
            if tag_name in _KEEP_AS_FILE_TAGS:
                kept.add(path)
                continue
            try:
                size = path.stat().st_size
            except Exception:
                continue
            if size > _INLINE_SIZE_LIMIT:
                kept.add(path)
                continue

            try:
                uri = _file_to_data_uri(path)
            except Exception:
                kept.add(path)
                continue
            inlined.add(path)
            replacement = f"{attr_match.group(1)}{attr_match.group(2)}{uri}{attr_match.group(2)}"
            new_attrs = new_attrs[:attr_match.start()] + replacement + new_attrs[attr_match.end():]

        return f"<{m.group(1)}{new_attrs}>"

    html = re.sub(r'<(\w+)((?:\s+[^>]*)?)>', process_tag, html)

    return html, inlined, kept


def write_zip(effect_dir: Path, files: list[Path]) -> tuple[Path, int]:
    """Write the zip: index.html with text/small-image refs inlined; binary
    media (video/audio) kept as separate sibling files.

    Recipient unzips → folder contains index.html + any video/audio files
    referenced. Double-clicking index.html resolves the relative `src` and
    media plays from the sibling file."""
    folder = effect_dir.name
    zip_name = f"{folder}.zip"
    zip_path = effect_dir / zip_name

    index_path = effect_dir / "index.html"
    if not index_path.exists():
        return _write_zip_tree(effect_dir, files)

    original_html = index_path.read_text(encoding="utf-8")
    inlined_html, inlined_files, kept_files = inline_assets_into_html(original_html, effect_dir)

    # raw_bytes = inlined HTML + every kept binary file (what zip will compress)
    raw_bytes = len(inlined_html.encode("utf-8"))
    for p in kept_files:
        try: raw_bytes += p.stat().st_size
        except Exception: pass

    tmp_path = effect_dir / (zip_name + ".tmp")
    with zipfile.ZipFile(tmp_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        # the inlined HTML
        zf.writestr(folder + "/index.html", inlined_html)
        # binary media kept as separate sibling files (preserves original
        # relative paths so the inlined HTML's <video src="assets/x.mp4">
        # resolves correctly after unzip)
        for p in kept_files:
            arcname = folder + "/" + p.relative_to(effect_dir).as_posix()
            zf.write(p, arcname)
        # also copy any other source files NOT referenced anywhere (companion
        # docs, second html pages, etc.) — keeps the zip a useful "everything
        # in this folder" snapshot if author included extras.
        for p in files:
            if p == index_path:
                continue
            if p in inlined_files or p in kept_files:
                continue
            arcname = folder + "/" + p.relative_to(effect_dir).as_posix()
            zf.write(p, arcname)
    tmp_path.replace(zip_path)
    return zip_path, raw_bytes


def _write_zip_tree(effect_dir: Path, files: list[Path]) -> tuple[Path, int]:
    """Pure file-tree zip (used as a fallback when index.html is missing)."""
    folder = effect_dir.name
    zip_name = f"{folder}.zip"
    zip_path = effect_dir / zip_name
    total = sum(p.stat().st_size for p in files)
    tmp_path = effect_dir / (zip_name + ".tmp")
    with zipfile.ZipFile(tmp_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for p in files:
            arcname = folder + "/" + p.relative_to(effect_dir).as_posix()
            zf.write(p, arcname)
    tmp_path.replace(zip_path)
    return zip_path, total


def package_one(effect_dir: Path, skip_zip: bool = False):
    files = collect_files(effect_dir)
    # 1) write the source bundle FIRST so it lives in the folder permanently
    bundle_path = write_source_bundle(effect_dir, files)
    if skip_zip:
        return None, 0, 0, bundle_path
    # 2) zip is the user-facing download — keep ONLY what the block needs to run.
    #    Exclude sc2-internal artifacts:
    #      - source-bundle.js (viewer support file)
    #      - meta.json (gallery card metadata)
    #      - the zip itself + any other sibling .zip
    files_for_zip = [
        p for p in files
        if p != bundle_path and not is_sc2_metadata(p, effect_dir)
    ]
    zip_path, raw_bytes = write_zip(effect_dir, files_for_zip)
    return zip_path, len(files_for_zip), raw_bytes, bundle_path


# === Tag taxonomy (locked — see TAGS.md) ====================================
# Order matters only for human review of axis 4 (technique). Axes 1/3/5 are
# required exactly-one; axis 2 is optional 0-1; axis 4 is optional 0-3.
TAG_AXIS_BANKUAI = {"首屏","导航","产品","分类","介绍","评价","案例动态","CTA","关于","联系","页脚"}
TAG_AXIS_XINGTAI = {"网格","轮播","滑块","跑马灯","顶栏","横幅","文字段","列表"}
TAG_AXIS_CHUFA   = {"入场","滚动","悬停","点击","自动播放"}
TAG_AXIS_JISHU   = {"形变","路径裁切","逐字出场","视差","交叉淡入","多态切换","遮罩","文字滚动","响应式","键盘"}
TAG_AXIS_CHANPIN = {"美妆","食品","健康","时尚","B2B服务","工业安防","协会组织","设计建筑","科技","教育","金融","房产","生活方式"}

ALL_KNOWN_TAGS = TAG_AXIS_BANKUAI | TAG_AXIS_XINGTAI | TAG_AXIS_CHUFA | TAG_AXIS_JISHU | TAG_AXIS_CHANPIN


def _validate_tags(tags: list[str]) -> list[str]:
    """Return list of human-readable errors. Empty list = valid."""
    errors = []

    # Unknown tags first — usually a typo or someone making up a new tag.
    unknown = [t for t in tags if t not in ALL_KNOWN_TAGS]
    if unknown:
        errors.append(f"unknown tag(s) {unknown} — see TAGS.md for the allowed set")

    # Bucket into axes.
    bk = [t for t in tags if t in TAG_AXIS_BANKUAI]
    xt = [t for t in tags if t in TAG_AXIS_XINGTAI]
    cf = [t for t in tags if t in TAG_AXIS_CHUFA]
    js = [t for t in tags if t in TAG_AXIS_JISHU]
    cp = [t for t in tags if t in TAG_AXIS_CHANPIN]

    # Required-exactly-one axes.
    if len(bk) != 1:
        errors.append(f"axis 1 板块: need exactly 1, got {len(bk)} ({bk})")
    if len(cf) != 1:
        errors.append(f"axis 3 触发: need exactly 1, got {len(cf)} ({cf})")
    if len(cp) != 1:
        errors.append(f"axis 5 产品类型: need exactly 1, got {len(cp)} ({cp})")

    # Bounded axes.
    if len(xt) > 1:
        errors.append(f"axis 2 形态: max 1 allowed, got {len(xt)} ({xt})")
    if len(js) > 3:
        errors.append(f"axis 4 技术: max 3 allowed, got {len(js)} ({js})")

    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n", 1)[0])
    parser.add_argument(
        "--bundle-only",
        action="store_true",
        help="regenerate only source-bundle.js, skip the .zip (use during effect "
             "iteration when zip downloads aren't needed yet).",
    )
    args = parser.parse_args()

    if not EFFECTS_DIR.exists():
        print(f"effects directory not found: {EFFECTS_DIR}")
        sys.exit(1)

    targets = [d for d in sorted(EFFECTS_DIR.iterdir())
               if d.is_dir() and (d / "index.html").exists()]
    if not targets:
        print("no effect folders found (expected effects/NNN-name/index.html)")
        return

    # Validate every meta.json before doing any packaging work. A broken meta
    # would silently drop the effect from gallery indexes (designs.js / effects.js
    # are regenerated by rebuild-index.ps1, which only warns and continues), so
    # fail fast here. See feedback-state-toggle-effect-pitfalls.md #6: stale /
    # malformed metadata is easy to miss until a teammate notices the empty card.
    import json as _json
    bad_meta = []
    for d in targets:
        m = d / "meta.json"
        if not m.exists():
            bad_meta.append((d.name, "meta.json missing"))
            continue
        try:
            parsed = _json.loads(m.read_text(encoding="utf-8"))
        except Exception as e:
            bad_meta.append((d.name, f"JSON parse error: {e}"))
            continue
        # Tag taxonomy validation — see TAGS.md for the locked spec.
        # Axes:
        #   1 板块       (required, exactly 1)
        #   2 形态       (optional, 0 or 1)
        #   3 触发       (required, exactly 1)
        #   4 技术       (optional, 0-3)
        #   5 产品类型   (required, exactly 1)
        tags = parsed.get("tags", [])
        if not isinstance(tags, list):
            bad_meta.append((d.name, "tags must be a JSON array"))
            continue
        for err in _validate_tags(tags):
            bad_meta.append((d.name, err))
    if bad_meta:
        print("aborting: invalid meta.json found —")
        for name, err in bad_meta:
            print(f"  {name}: {err}")
        print("\nFix the listed meta.json file(s) — see TAGS.md for the tag spec —")
        print("then re-run package-effects.py.")
        sys.exit(1)

    if args.bundle_only:
        print(f"packaging {len(targets)} effect(s) -> source-bundle.js only (zip skipped)\n")
    else:
        print(f"packaging {len(targets)} effect(s) -> .zip + source-bundle.js\n")
    total_files = 0
    total_bytes = 0
    total_zip_bytes = 0
    total_bundle_bytes = 0
    for d in targets:
        zip_path, n, raw, bundle_path = package_one(d, skip_zip=args.bundle_only)
        bundle_bytes = bundle_path.stat().st_size
        total_bundle_bytes += bundle_bytes
        if zip_path is None:
            print(f"  ok  {d.name:<40s}  bundle {bundle_bytes/1024:>5.1f} KB  (zip skipped)")
        else:
            zip_bytes = zip_path.stat().st_size
            total_files += n
            total_bytes += raw
            total_zip_bytes += zip_bytes
            print(f"  ok  {d.name:<40s}  {n:>3} files  {raw/1024:>7.1f} KB -> "
                  f"{zip_bytes/1024:>7.1f} KB zip + {bundle_bytes/1024:>5.1f} KB bundle")

    if args.bundle_only:
        print(f"\ntotal: {total_bundle_bytes/1024:.1f} KB bundle (zip skipped — "
              f"run without --bundle-only to also produce .zip)")
    else:
        print(f"\ntotal: {total_files} files, {total_bytes/1024:.1f} KB raw -> "
              f"{total_zip_bytes/1024:.1f} KB zipped + {total_bundle_bytes/1024:.1f} KB bundle")


if __name__ == "__main__":
    main()
