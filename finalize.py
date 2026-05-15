"""
finalize.py — one-shot wrapper that runs the three post-edit steps so any
change to an effect (new folder, edited index.html, replaced asset) flows
through to all the things that depend on it:

  1. rebuild-index.py         → effects/effects.{js,json} + designs/designs.{js,json}
                                + effects/tag-axis.js (from /tag-axis.json)
  2. package-effects.py       → effects/NNN/<NNN>.zip + source-bundle.js
  3. inject-overlay.py        → re-stamps the floating overlay block in each demo

Idempotent — safe to run as many times as you want.

Usage:
    python finalize.py [--skip-rebuild] [--skip-package] [--skip-overlay]
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
    ap.add_argument("--skip-rebuild", action="store_true")
    ap.add_argument("--skip-package", action="store_true")
    ap.add_argument("--skip-overlay", action="store_true")
    args = ap.parse_args()

    failures = 0
    if not args.skip_rebuild:
        print("[1/3] rebuilding indexes (designs.js + effects.js + tag-axis.js)")
        failures += bool(run_py("rebuild-index.py"))
    if not args.skip_package:
        print("\n[2/3] packaging effects (zip + source-bundle.js)")
        failures += bool(run_py("package-effects.py"))
    if not args.skip_overlay:
        print("\n[3/3] injecting demo overlay (zip + 源码 buttons)")
        failures += bool(run_py("inject-overlay.py"))

    print()
    if failures:
        print(f"finalize: {failures} step(s) had problems — see messages above.")
        return 1
    print("finalize: done. open http://localhost:8080/effects/ to verify.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
