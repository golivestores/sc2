"""
finalize.py — one-shot wrapper that runs the post-edit steps so any change
to an effect (new folder, edited index.html, replaced asset) flows through
to the things that depend on it:

  1. rebuild-index.py         → effects/effects.{js,json} + designs/designs.{js,json}
                                + effects/tag-axis.js (from /tag-axis.json)
  2. inject-overlay.py        → re-stamps the floating overlay block in each demo
  3. package-effects.py       → effects/NNN/<NNN>.zip + source-bundle.js
                                (opt-in via --package; otherwise serve.py
                                builds these on demand when the gallery's
                                zip / 源码 button is clicked)

Idempotent — safe to run as many times as you want.

Usage:
    python finalize.py                   # rebuild + overlay (fast)
    python finalize.py --package         # also pre-build all 19 zips
    python finalize.py --skip-rebuild --skip-overlay   # selectively
"""
import sys, io, subprocess, argparse
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent


def run_py(name: str) -> int:
    script = ROOT / name
    if not script.exists():
        print(f"  ! missing {name}, skipping")
        return 0
    r = subprocess.run([sys.executable, str(script)], capture_output=True, text=True, timeout=600)
    for line in (r.stdout or "").splitlines():
        if line.strip():
            print(f"  {line}")
    if r.returncode != 0:
        print(f"  ! {name} exited {r.returncode}")
        if r.stderr.strip():
            print(f"  stderr: {r.stderr.strip()[:300]}")
    return r.returncode


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--skip-rebuild", action="store_true",
                    help="don't regenerate effects.js / designs.js / tag-axis.js")
    ap.add_argument("--skip-overlay", action="store_true",
                    help="don't re-inject the floating overlay block in demos")
    ap.add_argument("--package", action="store_true",
                    help="also pre-build all 19 effect zips + source-bundle.js. "
                         "Default is to skip — serve.py builds them on demand "
                         "when a gallery button is clicked, which keeps the "
                         "working tree small.")
    args = ap.parse_args()

    failures = 0
    if not args.skip_rebuild:
        print("[1] rebuilding indexes (designs.js + effects.js + tag-axis.js)")
        failures += bool(run_py("rebuild-index.py"))
    if not args.skip_overlay:
        print("\n[2] injecting demo overlay (zip + 源码 buttons)")
        failures += bool(run_py("inject-overlay.py"))
    if args.package:
        print("\n[3] packaging effects (zip + source-bundle.js)")
        failures += bool(run_py("package-effects.py"))

    print()
    if failures:
        print(f"finalize: {failures} step(s) had problems — see messages above.")
        return 1
    if args.package:
        msg = "finalize: done (with --package). open http://localhost:8080/effects/ to verify."
    else:
        msg = ("finalize: done. start the dev server with `python serve.py` — "
               "zips and source-bundle.js will be built lazily on first click.")
    print(msg)
    return 0


if __name__ == "__main__":
    sys.exit(main())
