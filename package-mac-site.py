#!/usr/bin/env python3
"""
Build a Mac-friendly preview package for a full site mirror in designs/NNN-slug.

This is intentionally separate from package-effects.py. It creates:

  mac-zip/<package-name>/
    open-on-mac.command
    README-MAC.txt
    README-CODEX.txt
    site/

Then it writes mac-zip/<package-name>.zip with Unix executable permissions for
open-on-mac.command and validates the zip by extracting it and serving site/.
"""

from __future__ import annotations

import argparse
import html.parser
import mimetypes
import os
import posixpath
import re
import shutil
import socket
import sys
import tempfile
import threading
import time
import zipfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse, urlsplit
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parent
MAC_ZIP = ROOT / "mac-zip"
IGNORE_DIRS = {
    ".git",
    "__pycache__",
    "__MACOSX",
    "transition-check",
    "node_modules",
}
IGNORE_FILE_PREFIXES = ("._", "verify-")
TEXT_SUFFIXES = {".html", ".css", ".js", ".json", ".txt", ".svg", ".xml"}


OPEN_ON_MAC = """#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_DIR="$ROOT_DIR/site"

if [ ! -d "$SITE_DIR" ]; then
  echo "ERROR: site folder was not found next to this script."
  echo "Keep open-on-mac.command and the site folder in the same package folder."
  read -r -p "Press Enter to close..."
  exit 1
fi

if command -v python3 >/dev/null 2>&1; then
  PY_BIN="python3"
elif command -v python >/dev/null 2>&1; then
  PY_BIN="python"
else
  echo "ERROR: Python 3 was not found on this Mac."
  echo "Install Python 3, then run this script again."
  read -r -p "Press Enter to close..."
  exit 1
fi

PORT="$("$PY_BIN" - <<'PY'
import socket
import sys

ports = list(range(8090, 8200)) + list(range(8000, 8090))
for port in ports:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock.bind(("127.0.0.1", port))
        except OSError:
            continue
        print(port)
        sys.exit(0)
print("ERROR: no free local port found from 8000 to 8199", file=sys.stderr)
sys.exit(1)
PY
)"

URL="http://127.0.0.1:$PORT/index.html"

cd "$SITE_DIR"

echo "Starting local preview from:"
echo "  $SITE_DIR"
echo
echo "Opening:"
echo "  $URL"
echo
echo "Keep this Terminal window open while viewing the site."
echo "Close this Terminal window or press Ctrl+C to stop the server."
echo

( sleep 1.2; open "$URL" ) &

"$PY_BIN" - "$PORT" <<'PY'
import mimetypes
import os
import posixpath
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

port = int(sys.argv[1])

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("font/otf", ".otf")
mimetypes.add_type("application/wasm", ".wasm")
mimetypes.add_type("model/gltf-binary", ".glb")
mimetypes.add_type("image/ktx2", ".ktx2")
mimetypes.add_type("image/x-exr", ".exr")
mimetypes.add_type("audio/mpeg", ".mp3")
mimetypes.add_type("video/mp4", ".mp4")
mimetypes.add_type("video/webm", ".webm")
mimetypes.add_type("application/octet-stream", ".splinecode")

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        raw_path = urlsplit(path).path
        local_path = super().translate_path(path)
        if os.path.exists(local_path):
            return local_path

        clean = posixpath.normpath(unquote(raw_path))
        last = clean.rsplit("/", 1)[-1]
        if "." not in last:
            return os.path.join(os.getcwd(), "index.html")
        return local_path

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path.startswith("/cdn-cgi/rum"):
            self.send_response(204)
            self.end_headers()
            return
        self.send_response(404)
        self.end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\\n" % (self.address_string(), fmt % args))

server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\\nServer stopped.")
PY
"""


README_MAC = """{title} - Mac Local Preview
{underline}

Do not open site/index.html directly.
This site should be opened through a local HTTP server.

Recommended way:

1. Unzip the package.
2. Keep the site folder and open-on-mac.command in the same folder.
3. Double-click open-on-mac.command.
4. A Terminal window will start a local server and open the browser.
5. Keep the Terminal window open while reviewing the site.
6. Close the Terminal window, or press Ctrl+C, when finished.

Expected browser URL:

  http://127.0.0.1:<auto-port>/index.html

If the browser URL starts with file://, the site was opened the wrong way.

If double-click does nothing or opens the script as text:

1. Open Terminal.
2. Type:

   chmod +x 

3. Drag open-on-mac.command into the Terminal window.
4. Press Enter.
5. Double-click open-on-mac.command again.

If macOS blocks the file:

1. Right-click open-on-mac.command.
2. Choose Open.
3. Click Open again in the warning dialog.

Manual fallback:

1. Open Terminal.
2. Run:

   cd "/path/to/{package_name}/site"
   python3 -m http.server 8090 --bind 127.0.0.1

3. Open:

   http://127.0.0.1:8090/index.html
"""


def split_srcset(value: str) -> list[str]:
    """Split srcset candidates even when separators have no following space."""
    candidates: list[str] = []
    current: list[str] = []
    depth = 0
    for char in value:
        if char in "([{":
            depth += 1
        elif char in ")]}":
            depth = max(0, depth - 1)
        if char == "," and depth == 0:
            candidate = "".join(current).strip()
            if candidate:
                candidates.append(candidate)
            current = []
        else:
            current.append(char)
    candidate = "".join(current).strip()
    if candidate:
        candidates.append(candidate)
    return candidates


class RefParser(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for key, value in attrs:
            if not value:
                continue
            if key in {"src", "href", "data-spline-url"}:
                self.refs.append((key, value))
            elif key == "srcset":
                for candidate in split_srcset(value):
                    # Density descriptors may be fractional (for example
                    # ``image.webp 1.5x``), while width descriptors are
                    # normally integers. Strip either form before resolving
                    # the local file path.
                    url = re.sub(r"\s+\d+(?:\.\d+)?[wx]\s*$", "", candidate.strip())
                    if url:
                        self.refs.append(("srcset", url))


def copy_site(source: Path, site: Path) -> None:
    def ignore(_: str, names: list[str]) -> set[str]:
        ignored: set[str] = set()
        for name in names:
            if name in IGNORE_DIRS or name.startswith(IGNORE_FILE_PREFIXES):
                ignored.add(name)
            if name.lower() in {"debug.log"}:
                ignored.add(name)
        return ignored

    shutil.copytree(source, site, ignore=ignore)


def patch_packaged_paths(site: Path, source_name: str) -> int:
    """Make project-root preview paths work when site/ is served as web root."""
    count = 0
    project_prefix = f"/designs/{source_name}/"
    for path in site.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        original = text
        text = text.replace(f'<base href="{project_prefix}">', '<base href="/">')
        text = text.replace(f"<base href='{project_prefix}'>", "<base href='/'>")
        text = text.replace(project_prefix, "/")
        if text != original:
            path.write_text(text, encoding="utf-8", newline="")
            count += 1
    return count


def prune_unreferenced_alternate_media(site: Path) -> tuple[int, int]:
    """Drop packaged WebM duplicates only when the site now references MP4.

    Source mirrors keep both files for archival safety. The Mac package can
    omit an older WebM alternate when a same-stem MP4 exists, the MP4 filename
    is referenced by the packaged text, and the WebM filename is not.
    """
    text_parts: list[str] = []
    for path in site.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            text_parts.append(path.read_text(encoding="utf-8"))
        except UnicodeDecodeError:
            continue
    references = "\n".join(text_parts)

    removed = 0
    removed_bytes = 0
    for webm in site.rglob("*.webm"):
        mp4 = webm.with_suffix(".mp4")
        if not mp4.exists():
            continue
        if mp4.name not in references or webm.name in references:
            continue
        removed_bytes += webm.stat().st_size
        webm.unlink()
        removed += 1
    return removed, removed_bytes


def write_support_files(package_dir: Path, source: Path, package_name: str) -> None:
    (package_dir / "open-on-mac.command").write_text(OPEN_ON_MAC, encoding="utf-8", newline="\n")
    title = package_name.replace("-", " ").title()
    (package_dir / "README-MAC.txt").write_text(
        README_MAC.format(title=title, underline="=" * len(title), package_name=package_name),
        encoding="utf-8",
        newline="\n",
    )
    (package_dir / "README-CODEX.txt").write_text(
        "\n".join(
            [
                "Packaging notes",
                "===============",
                "",
                f"Source: {source}",
                f"Package directory: {package_dir}",
                f"Zip: {package_dir.with_suffix('.zip')}",
                "",
                "Validated by package-mac-site.py after extracting the generated zip.",
                "Use open-on-mac.command instead of opening site/index.html directly.",
                "",
            ]
        ),
        encoding="utf-8",
        newline="\n",
    )


def make_zip(package_dir: Path) -> Path:
    zip_path = package_dir.with_suffix(".zip")
    if zip_path.exists():
        zip_path.unlink()
    base = package_dir.parent
    entries = [package_dir] + sorted(package_dir.rglob("*"), key=lambda p: p.relative_to(base).as_posix())
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for path in entries:
            rel = path.relative_to(base).as_posix()
            if path.is_dir():
                rel += "/"
            info = zipfile.ZipInfo(rel)
            info.create_system = 3
            info.date_time = time.localtime(path.stat().st_mtime)[:6]
            if path.is_dir():
                info.external_attr = (0o40755 << 16) | 0x10
                zf.writestr(info, b"")
            else:
                mode = 0o100755 if path.name == "open-on-mac.command" else 0o100644
                info.external_attr = mode << 16
                zf.writestr(info, path.read_bytes())
    return zip_path


def validate_zip_structure(zip_path: Path, package_name: str) -> None:
    with zipfile.ZipFile(zip_path) as zf:
        names = set(zf.namelist())
        required = {
            f"{package_name}/open-on-mac.command",
            f"{package_name}/README-MAC.txt",
            f"{package_name}/site/index.html",
        }
        missing = required - names
        if missing:
            raise RuntimeError(f"zip missing required entries: {sorted(missing)}")
        bad = [n for n in names if "__MACOSX" in n or "/._" in n or n.startswith("._")]
        if bad:
            raise RuntimeError(f"zip contains Mac metadata junk: {bad[:10]}")
        info = zf.getinfo(f"{package_name}/open-on-mac.command")
        mode = (info.external_attr >> 16) & 0o777
        if mode != 0o755:
            raise RuntimeError(f"open-on-mac.command mode is {oct(mode)}, expected 0o755")


def iter_local_refs(site: Path) -> tuple[list[str], list[str], list[str]]:
    index = site / "index.html"
    parser = RefParser()
    parser.feed(index.read_text(encoding="utf-8", errors="ignore"))
    refs: list[tuple[Path, str]] = [(index, ref) for _, ref in parser.refs]
    for css in site.joinpath("assets").rglob("*.css"):
        text = css.read_text(encoding="utf-8", errors="ignore")
        for match in re.finditer(r"url\(([^)]+)\)", text):
            refs.append((css, match.group(1).strip().strip("\"'")))

    missing: list[str] = []
    remote: list[str] = []
    root_routes: list[str] = []
    for base, ref in refs:
        if not ref or ref.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
            continue
        parsed = urlparse(ref)
        if parsed.scheme in {"http", "https"}:
            remote.append(ref)
            continue
        path = unquote(ref.split("#", 1)[0].split("?", 1)[0])
        route_path = path.rstrip("/")
        route_leaf = route_path.rsplit("/", 1)[-1]
        if path and "." not in route_leaf:
            root_routes.append(ref)
            continue
        target = site / path.lstrip("/") if path.startswith("/") else base.parent / path
        if not target.resolve().exists():
            missing.append(f"{base.relative_to(site)} -> {ref}")
    return missing, remote, root_routes


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


class ValidatingHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        raw_path = urlsplit(path).path
        local_path = super().translate_path(path)
        if os.path.exists(local_path):
            return local_path
        clean = posixpath.normpath(unquote(raw_path))
        last = clean.rsplit("/", 1)[-1]
        if "." not in last:
            return os.path.join(os.getcwd(), "index.html")
        return local_path

    def log_message(self, fmt: str, *args: object) -> None:
        pass

    def do_POST(self) -> None:
        if self.path.startswith("/cdn-cgi/rum"):
            self.send_response(204)
            self.end_headers()
            return
        self.send_response(404)
        self.end_headers()


def serve_for_validation(site: Path) -> tuple[ThreadingHTTPServer, str]:
    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/css", ".css")
    mimetypes.add_type("font/woff2", ".woff2")
    mimetypes.add_type("font/otf", ".otf")
    mimetypes.add_type("application/wasm", ".wasm")
    mimetypes.add_type("video/mp4", ".mp4")
    mimetypes.add_type("video/webm", ".webm")
    mimetypes.add_type("application/octet-stream", ".splinecode")
    port = free_port()
    old_cwd = Path.cwd()
    os.chdir(site)
    server = ThreadingHTTPServer(("127.0.0.1", port), ValidatingHandler)
    server._old_cwd = old_cwd  # type: ignore[attr-defined]
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f"http://127.0.0.1:{port}"


def stop_validation_server(server: ThreadingHTTPServer) -> None:
    server.shutdown()
    old_cwd = getattr(server, "_old_cwd", None)
    if old_cwd:
        os.chdir(old_cwd)


def http_get(url: str) -> int:
    with urlopen(url, timeout=10) as response:
        response.read(256)
        return int(response.status)


def validate_http(site: Path) -> None:
    server, base_url = serve_for_validation(site)
    try:
        if http_get(f"{base_url}/index.html") != 200:
            raise RuntimeError("index.html did not return 200")
        index = site / "index.html"
        text = index.read_text(encoding="utf-8", errors="ignore")
        for ref in re.findall(r'(?:src|href|data-spline-url)="([^"]+)"', text):
            if urlparse(ref).scheme in {"http", "https"}:
                continue
            key_resource = any(
                token in ref for token in ("css/", ".js", ".splinecode", ".wasm", ".glb", ".ktx2")
            )
            if key_resource and (ref.startswith("assets/") or ref.startswith("/")):
                resource_url = f"{base_url}/{ref.lstrip('/')}"
                if http_get(resource_url) != 200:
                    raise RuntimeError(f"key resource did not return 200: {ref}")
    finally:
        stop_validation_server(server)


def validate_spline_with_playwright(site: Path) -> str:
    if not (site / "index.html").read_text(encoding="utf-8", errors="ignore").find('data-animation-type="spline"') >= 0:
        return "no spline scene detected"
    try:
        import asyncio
        from playwright.async_api import async_playwright
    except Exception as exc:  # pragma: no cover - dependency varies by machine
        raise RuntimeError("Spline scene detected, but Playwright is not available for validation") from exc

    async def run() -> str:
        server, base_url = serve_for_validation(site)
        responses: list[tuple[int, str]] = []
        failed: list[str] = []
        page_errors: list[str] = []
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(
                    headless=True,
                    args=["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
                )
                page = await browser.new_page(viewport={"width": 1440, "height": 1000})
                page.on("requestfailed", lambda r: failed.append(r.url))
                page.on("pageerror", lambda e: page_errors.append(str(e)))
                page.on(
                    "response",
                    lambda r: responses.append((r.status, r.url))
                    if any(x in r.url for x in ["runtime", "splinecode", "draco", "wasm", "glb", "ktx"])
                    else None,
                )
                await page.goto(f"{base_url}/index.html", wait_until="load", timeout=30000)
                await page.wait_for_timeout(10000)
                data = await page.evaluate(
                    """() => {
                    const mod = window.Webflow && window.Webflow.require ? window.Webflow.require('spline') : null;
                    const el = document.querySelector('[data-animation-type="spline"]');
                    const canvas = el && el.querySelector('canvas');
                    return {
                      hasInstance: !!(mod && mod.getInstance && mod.getInstance(el)),
                      canvas: canvas ? [canvas.width, canvas.height] : null
                    };
                }"""
                )
                await browser.close()
            if failed:
                raise RuntimeError(f"browser request failures: {failed[:10]}")
            if page_errors:
                raise RuntimeError(f"browser page errors: {page_errors[:10]}")
            required = ["runtime", "scene.splinecode", "draco_wasm_wrapper.js", "draco_decoder.wasm"]
            missing = [item for item in required if not any(item in url and status == 200 for status, url in responses)]
            if missing:
                raise RuntimeError(f"Spline validation missing 200 responses for: {missing}; got {responses}")
            if not data["hasInstance"]:
                raise RuntimeError("Spline instance was not created")
            if not data["canvas"] or data["canvas"] == [300, 150]:
                raise RuntimeError(f"Spline canvas was not resized/render-initialized: {data['canvas']}")
            return "spline runtime, scene, Draco, and canvas instance validated"
        finally:
            stop_validation_server(server)

    return asyncio.run(run())


def main() -> int:
    parser = argparse.ArgumentParser(description="Package a designs/ full-site mirror for Mac colleagues.")
    parser.add_argument("source", help="Source site directory, e.g. designs/074-ori-koji-global")
    parser.add_argument("package_name", help="Package directory name, e.g. himax-ori-koji-mac")
    parser.add_argument("--force", action="store_true", help="Overwrite an existing package directory and zip")
    parser.add_argument("--skip-browser", action="store_true", help="Skip Playwright browser validation")
    args = parser.parse_args()

    source = (ROOT / args.source).resolve()
    if not source.is_dir():
        raise SystemExit(f"source directory not found: {source}")
    if not (source / "index.html").exists():
        raise SystemExit(f"source does not contain index.html: {source}")
    if not args.package_name.endswith("-mac"):
        raise SystemExit("package_name must end with -mac")

    MAC_ZIP.mkdir(exist_ok=True)
    package_dir = (MAC_ZIP / args.package_name).resolve()
    if package_dir.exists():
        if not args.force:
            raise SystemExit(f"package exists, pass --force to overwrite: {package_dir}")
        if package_dir.parent != MAC_ZIP.resolve():
            raise SystemExit(f"refusing to delete outside mac-zip: {package_dir}")
        shutil.rmtree(package_dir)
    zip_path = package_dir.with_suffix(".zip")
    if zip_path.exists() and args.force:
        zip_path.unlink()

    site = package_dir / "site"
    copy_site(source, site)
    patched_files = patch_packaged_paths(site, source.name)
    pruned_media_files, pruned_media_bytes = prune_unreferenced_alternate_media(site)
    write_support_files(package_dir, source, args.package_name)
    zip_path = make_zip(package_dir)

    validate_zip_structure(zip_path, args.package_name)

    with tempfile.TemporaryDirectory(prefix="sc2-mac-package-validate-") as tmp:
        extract_root = Path(tmp)
        with zipfile.ZipFile(zip_path) as zf:
            zf.extractall(extract_root)
        extracted_site = extract_root / args.package_name / "site"
        missing, remote, root_routes = iter_local_refs(extracted_site)
        if missing:
            raise RuntimeError("missing local files:\n" + "\n".join(missing[:50]))
        validate_http(extracted_site)
        browser_result = "browser validation skipped"
        if not args.skip_browser:
            browser_result = validate_spline_with_playwright(extracted_site)

    print(f"package_dir={package_dir}")
    print(f"zip={zip_path}")
    print(f"size={zip_path.stat().st_size}")
    print(f"patched_project_preview_paths_in_files={patched_files}")
    print(f"pruned_unreferenced_webm_files={pruned_media_files}")
    print(f"pruned_unreferenced_webm_bytes={pruned_media_bytes}")
    print(f"remote_refs_allowed={len(remote)}")
    print(f"root_routes_handled_by_launcher={len(root_routes)}")
    print(f"browser_validation={browser_result}")
    print("validation=ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
