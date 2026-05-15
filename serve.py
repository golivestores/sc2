"""
serve.py — local dev server for sc2 with lazy zip / source-bundle generation.

Drop-in replacement for `python -m http.server`. What it adds:
  - Default port 8080 (instead of 8000).
  - Auto-opens http://127.0.0.1:<port>/effects/ in the browser ~0.4s after
    the listener is up.
  - Intercepts GET for `effects/<slug>/<slug>.zip` and
    `effects/<slug>/source-bundle.js`. If the file is missing on disk, runs
    `python package-effects.py --only <slug>` to materialize it before
    handing off to the default static file serving.

Why: `effects/*/*.zip` and `effects/*/source-bundle.js` are .gitignored to
keep the repo light. Without lazy build, a fresh `git clone` would 404 on
the gallery's 📦 zip and 📋 源码 buttons until the cloner runs
`python finalize.py`. serve.py removes that step — first click on a button
takes a few seconds (one-time package per effect), subsequent clicks are
instant because the file is now on disk.

Usage:
    python serve.py            # default port 8080
    python serve.py 9000       # custom port
    python serve.py --no-open  # skip auto-opening the browser
"""
import sys, io, re, subprocess, threading, webbrowser, argparse
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent
PACKAGER = ROOT / "package-effects.py"

# Match GET paths like /effects/001-talamus-card-grid/001-talamus-card-grid.zip
# The same slug appears twice: directory name and zip basename. This is the
# convention package-effects.py uses; if it changes, update the pattern.
ZIP_PAT    = re.compile(r"^/effects/([^/]+)/\1\.zip$")
BUNDLE_PAT = re.compile(r"^/effects/([^/]+)/source-bundle\.js$")

# Per-slug mutex so two simultaneous requests (zip + source-bundle from the
# same gallery card click flurry) don't kick off two parallel package builds.
# Created lazily inside _lock_for under the dict lock.
_dict_lock = threading.Lock()
_build_locks: dict[str, threading.Lock] = {}


def _lock_for(slug: str) -> threading.Lock:
    with _dict_lock:
        lock = _build_locks.get(slug)
        if lock is None:
            lock = _build_locks[slug] = threading.Lock()
        return lock


def _slug_is_safe(slug: str) -> bool:
    """Reject anything that doesn't look like an effect folder name. Defense in
    depth against path traversal — the regex already excludes "/", but the
    subprocess argument should still be validated before being passed."""
    return bool(re.match(r"^\d+-[A-Za-z0-9-]+$", slug))


def _run_packager(slug: str, bundle_only: bool) -> tuple[bool, str]:
    """Invoke package-effects.py --only <slug>. Return (ok, stdout-or-error)."""
    if not _slug_is_safe(slug):
        return False, f"refusing build for unsafe slug {slug!r}"
    if not (ROOT / "effects" / slug / "index.html").exists():
        return False, f"effect not found: effects/{slug}/"
    cmd = [sys.executable, str(PACKAGER), "--only", slug]
    if bundle_only:
        cmd.append("--bundle-only")
    try:
        r = subprocess.run(
            cmd, capture_output=True, text=True, timeout=120, cwd=str(ROOT)
        )
    except Exception as e:
        return False, f"build subprocess failed: {e}"
    if r.returncode != 0:
        return False, (
            f"package-effects.py exited {r.returncode}\n"
            f"stderr: {(r.stderr or '').strip()[:500]}"
        )
    return True, (r.stdout or "").strip()


class LazyHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler with lazy build on zip / source-bundle miss."""

    def __init__(self, *args, **kwargs):
        # Pin directory to repo root so cwd at server start doesn't matter.
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _maybe_build(self) -> None:
        """If self.path is a known-on-demand resource and the file is missing,
        run the packager. After this returns, do_GET proceeds as normal: if
        build succeeded the file is now on disk and gets served; if it failed
        the user sees a 404 and the failure reason is in the server terminal."""
        path = self.path.split("?", 1)[0].split("#", 1)[0]

        m = ZIP_PAT.match(path)
        if m:
            slug = m.group(1)
            target = ROOT / "effects" / slug / f"{slug}.zip"
            if target.exists():
                return
            with _lock_for(slug):
                if target.exists():  # double-check after acquiring lock
                    return
                print(f"  [lazy-build] {slug}.zip — packaging...")
                ok, msg = _run_packager(slug, bundle_only=False)
                tag = "ok" if ok else "FAIL"
                print(f"  [lazy-build {tag}] {slug}: {msg[:300]}")
            return

        m = BUNDLE_PAT.match(path)
        if m:
            slug = m.group(1)
            target = ROOT / "effects" / slug / "source-bundle.js"
            if target.exists():
                return
            with _lock_for(slug):
                if target.exists():
                    return
                print(f"  [lazy-build] {slug}/source-bundle.js — building...")
                ok, msg = _run_packager(slug, bundle_only=True)
                tag = "ok" if ok else "FAIL"
                print(f"  [lazy-build {tag}] {slug}: {msg[:300]}")
            return

    def do_GET(self):
        self._maybe_build()
        return super().do_GET()

    def do_HEAD(self):
        self._maybe_build()
        return super().do_HEAD()

    def log_message(self, fmt, *args):
        # Slightly quieter than the default — drop the date prefix, keep the
        # status line. Errors still surface clearly.
        sys.stderr.write(f"  {self.address_string()} - {fmt % args}\n")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("port", nargs="?", type=int, default=8080,
                    help="port to bind on 127.0.0.1 (default: 8080)")
    ap.add_argument("--no-open", action="store_true",
                    help="skip auto-opening the gallery in a browser")
    args = ap.parse_args()

    if not PACKAGER.exists():
        print(f"can't find {PACKAGER} — serve.py expects to live next to "
              f"package-effects.py at the sc2 repo root.", file=sys.stderr)
        return 1

    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), LazyHandler)
    except OSError as e:
        print(f"can't bind 127.0.0.1:{args.port} — {e}", file=sys.stderr)
        return 1

    base = f"http://127.0.0.1:{args.port}"
    print(f"sc2 dev server on {base}/")
    print(f"  effects gallery:  {base}/effects/")
    print(f"  designs nav:      {base}/designs/")
    print(f"  lazy build:       intercepts effects/*/*.zip and source-bundle.js")
    print(f"  (Ctrl+C to stop)")

    if not args.no_open:
        # Tiny delay so the listener is definitely accepting connections
        # before the browser tries to load.
        threading.Timer(0.4, lambda: webbrowser.open(f"{base}/effects/")).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nshutting down")
        server.shutdown()
    return 0


if __name__ == "__main__":
    sys.exit(main())
