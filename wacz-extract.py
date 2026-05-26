"""
wacz-extract.py — unpack a .wacz archive into a py-scrape-style assets/ tree.

Usage:
    python wacz-extract.py <wacz-file> [<out-dir>]

Defaults out-dir to <wacz-parent>/_extracted/  (e.g. designs/021-cravburgers/_extracted).

Output structure mirrors what scrape-url.py produces:
    <out-dir>/
      assets/<host>/<path>/...   ← every captured 2xx response body
      _manifest.json             ← URL list with status / content-type / size
      _index.html                ← copy of the "main" landing page (if found)

Why: WACZ replays beautifully in <replay-web-page> but the contents are zipped
inside WARC records, so you can't grep them. This script untwists the archive
into a normal directory tree so the existing effect-extraction workflow
(grep / read / cite line numbers) works on wacz-captured sites too.

KNOWN GOTCHAS:
  * Windows MAX_PATH (260) — very deep CDN paths fail silently. We catch + log.
  * Same URI with different query strings → distinct files via 8-char hash suffix.
  * Same URI captured multiple times → latest 2xx wins.
  * Cross-origin third-party assets (analytics, fonts, ad pixels) all end up under
    assets/<their-host>/. Filter by host if you only want the primary site.
"""
import sys, os, json, hashlib, zipfile
from pathlib import Path
from urllib.parse import urlparse, unquote
from warcio.archiveiterator import ArchiveIterator


def sanitise_component(comp: str) -> str:
    """Windows-safe filename: strip <>:"|?* and chars 0-31."""
    bad = '<>:"|?*'
    out = "".join(("_" if c in bad or ord(c) < 32 else c) for c in comp)
    return out or "_"


def local_path_for(url: str) -> tuple[str, str] | tuple[None, None]:
    """Map an absolute URL to (host, relative_path_under_assets)."""
    p = urlparse(url)
    if p.scheme not in ("http", "https"):
        return None, None
    host = p.netloc
    path = unquote(p.path) or "/"
    if path.endswith("/"):
        path += "index.html"
    if p.query:
        q_hash = hashlib.sha1(p.query.encode("utf-8")).hexdigest()[:8]
        root, ext = os.path.splitext(path)
        path = f"{root}.{q_hash}{ext}"
    parts = [sanitise_component(c) for c in path.lstrip("/").split("/")]
    return host, "/".join(parts)


def iter_warcs_in_wacz(wacz_path: Path):
    """Yield (warc_name, file-like) for each .warc(.gz) inside the wacz zip."""
    with zipfile.ZipFile(wacz_path) as zf:
        names = [n for n in zf.namelist()
                 if n.startswith("archive/") and (n.endswith(".warc") or n.endswith(".warc.gz"))]
        if not names:
            print(f"warning: no archive/*.warc(.gz) entries in {wacz_path}", file=sys.stderr)
        for n in names:
            with zf.open(n) as fh:
                yield n, fh


def extract(wacz_path: Path, out_dir: Path) -> dict:
    """Walk every WARC response record and write its body to assets/host/path/.

    Returns stats dict for reporting.
    """
    out_dir.mkdir(parents=True, exist_ok=True)
    assets_root = out_dir / "assets"
    assets_root.mkdir(exist_ok=True)

    seen: dict[str, dict] = {}   # url -> {rel, status, ctype, size}
    written = 0
    skipped_nonresponse = 0
    skipped_non2xx = 0
    skipped_nourl = 0
    failed_writes: list[tuple[str, str]] = []

    for warc_name, fh in iter_warcs_in_wacz(wacz_path):
        for record in ArchiveIterator(fh):
            if record.rec_type != "response":
                skipped_nonresponse += 1
                continue
            uri = record.rec_headers.get_header("WARC-Target-URI")
            if not uri or uri.startswith(("urn:", "metadata:")):
                skipped_nourl += 1
                continue
            # status
            http_status = ""
            ctype = ""
            if record.http_headers:
                http_status = record.http_headers.get_statuscode() or ""
                ctype = record.http_headers.get_header("Content-Type") or ""
            if http_status and not http_status.startswith("2"):
                skipped_non2xx += 1
                continue
            host, rel = local_path_for(uri)
            if not rel:
                skipped_nourl += 1
                continue
            try:
                body = record.content_stream().read()
            except Exception as e:
                failed_writes.append((uri, f"stream read: {e}"))
                continue
            dst = assets_root / host / rel
            try:
                dst.parent.mkdir(parents=True, exist_ok=True)
                dst.write_bytes(body)
                written += 1
                seen[uri] = {
                    "rel": f"assets/{host}/{rel}",
                    "status": http_status,
                    "ctype": ctype.split(";")[0].strip(),
                    "size": len(body),
                }
            except OSError as e:
                # Most common: Windows MAX_PATH or illegal path chars we didn't sanitise.
                failed_writes.append((uri, f"write: {e}"))

    # write manifest
    manifest = {
        "wacz": str(wacz_path.name),
        "captured_urls": len(seen),
        "files": [{"url": u, **info} for u, info in seen.items()],
    }
    (out_dir / "_manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    # if there's an obvious "main page" response (text/html at the host root),
    # copy it to _index.html for convenience
    main_page = next(
        (info["rel"] for u, info in seen.items()
         if info["ctype"].startswith("text/html") and urlparse(u).path in ("", "/")),
        None,
    )
    if main_page:
        src = out_dir / main_page
        if src.exists():
            (out_dir / "_index.html").write_bytes(src.read_bytes())

    return {
        "written": written,
        "skipped_nonresponse": skipped_nonresponse,
        "skipped_non2xx": skipped_non2xx,
        "skipped_nourl": skipped_nourl,
        "failed_writes": failed_writes,
        "main_page": main_page,
    }


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    wacz_path = Path(sys.argv[1]).resolve()
    if not wacz_path.exists():
        print(f"error: {wacz_path} not found", file=sys.stderr)
        return 1
    if len(sys.argv) >= 3:
        out_dir = Path(sys.argv[2]).resolve()
    else:
        out_dir = wacz_path.parent / "_extracted"

    print(f"unpacking: {wacz_path}")
    print(f"     into: {out_dir}")
    stats = extract(wacz_path, out_dir)
    print()
    print(f"  written:           {stats['written']}")
    print(f"  skipped non-resp:  {stats['skipped_nonresponse']}")
    print(f"  skipped non-2xx:   {stats['skipped_non2xx']}")
    print(f"  skipped no URL:    {stats['skipped_nourl']}")
    print(f"  failed writes:     {len(stats['failed_writes'])}")
    if stats["main_page"]:
        print(f"  main page:         {stats['main_page']}  (copied to _index.html)")
    if stats["failed_writes"]:
        print(f"  (first 5 failures)")
        for u, e in stats["failed_writes"][:5]:
            print(f"    {u[:90]} -> {e}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
