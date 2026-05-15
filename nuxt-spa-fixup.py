"""
nuxt-spa-fixup.py — run the Nuxt SPA fixup recipe on an already-scraped mirror.

Wraps scrape-url.py's apply_nuxt_spa_fixup() so you can re-fix or first-fix a
design folder without re-running scrape-url.py. Useful when:
  - You scraped without --nuxt-spa-fixup and the page renders "PAGE NOT FOUND"
    or shows 404s in the console.
  - You bumped the recipe (new step) and want to re-run on past mirrors.
  - You're fixing a Nuxt 2 site (recipe extended for Nuxt 2's __NUXT__ inline
    config + webpack publicPath, see scrape-url.py steps 4b / 4c).

Usage:
    python nuxt-spa-fixup.py designs/011-donmolinico-home

The script reads `sourceUrl` from the folder's meta.json to know which live host
to fetch missing chunks/lazy assets from. Override with --url if meta is wrong.

Idempotent — re-running won't re-patch already-patched files or re-download
already-present chunks. Steps that don't apply to your framework (e.g. Nuxt 2
sites have no `entry.HASH.js`) print a "skipping" line and move on.
"""
import sys, io, json, argparse
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("folder", help="design folder, e.g. designs/011-donmolinico-home")
    ap.add_argument("--url", help="live URL (overrides meta.json sourceUrl)")
    args = ap.parse_args()

    folder = Path(args.folder).resolve()
    if not folder.is_dir():
        print(f"not a directory: {folder}", file=sys.stderr); return 1
    if not (folder / "index.html").exists():
        print(f"no index.html under {folder}", file=sys.stderr); return 1

    url = args.url
    meta_path = folder / "meta.json"
    if not url and meta_path.exists():
        try:
            url = json.loads(meta_path.read_text(encoding="utf-8")).get("sourceUrl")
        except json.JSONDecodeError as e:
            print(f"meta.json malformed ({e}); pass --url manually", file=sys.stderr); return 1
    if not url:
        print("no sourceUrl in meta.json and --url not given", file=sys.stderr); return 1

    # Import the recipe function from scrape-url.py. Import-by-path because
    # scrape-url.py has a hyphen in its name (can't `import scrape-url`).
    import importlib.util
    spec = importlib.util.spec_from_file_location("scrape_url", ROOT / "scrape-url.py")
    if spec is None or spec.loader is None:
        print("can't load scrape-url.py", file=sys.stderr); return 1
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)

    mod.apply_nuxt_spa_fixup(folder, original_url=url)
    return 0


if __name__ == "__main__":
    sys.exit(main())
