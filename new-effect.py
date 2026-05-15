"""
new-effect.py — scaffold a new effect folder under effects/ with the locked
sc2 layout. Doesn't try to extract real content from a mirror (that part is
a judgment call, see CLAUDE-style workflow in README) — just lays down the
files in the right shape so the human/assistant can fill them in 1:1.

Usage:
    python new-effect.py <slug> [--num NNN] [--source-url URL] [--mirror PATH] [--title TITLE]

Examples:
    # next available number, slug `xyz-hero`
    python new-effect.py xyz-hero --title "XYZ Hero" \
        --source-url https://xyz.com/ --mirror ../designs/008-xyz/index.html

    # explicit number (overwrites that slot if folder exists)
    python new-effect.py 015-foo-bar --num 15

Produces:
    effects/NNN-<slug>/
      ├── index.html          ← skeleton with ?demo=preview plumbing + sc2-overlay placeholder
      ├── meta.json           ← all fields stubbed (locked schema)
      ├── assets/             ← empty (drop images/videos/fonts here)
      └── lib/                ← empty (drop self-contained third-party JS here)

After scaffolding, follow the workflow in README:
  1. Fill in index.html with the 1:1-extracted HTML/CSS/JS (verify per
     `effects-extraction-must-be-1to1` rule — no simplification).
  2. Fill in meta.json (title/description/tech/tags/localMirror).
  3. Run `python finalize.py` to rebuild indexes + package zip + inject overlay.
  4. Open `http://localhost:8080/effects/<NNN-slug>/` and the source mirror
     side-by-side in two tabs; compare hover/scroll/animation by eye.
"""
import sys, io, re, json, argparse
from pathlib import Path
from datetime import date

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent
EFFECTS = ROOT / "effects"

INDEX_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  /* Replace with the verbatim CSS pulled from the source mirror. */
  body {{ margin: 0; font-family: -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif; }}
</style>
</head>
<body>

<!-- TODO: replace with the 1:1 HTML from the source section. -->
<main>
  <h1>{title}</h1>
  <p>placeholder — fill with the extracted block.</p>
</main>

<script>
/* Demo-preview hook contract:
   - No querystring: faithful to the source. Run the real scroll/hover triggers.
   - ?demo=preview: hide intros, fake the cascade so the gallery thumbnail iframe
                    shows motion without scroll input.
   Reference implementations: effects/001-talamus-card-grid, effects/003-talamus-cta. */
(function () {{
  const previewMode = new URLSearchParams(location.search).get('demo') === 'preview';
  if (previewMode) {{
    // example: setTimeout(() => document.body.classList.add('intro-done'), 0);
  }}
}})();
</script>

</body>
</html>
"""

META_TEMPLATE = {
    "title": "",
    "subtitle": "",
    "description": "",
    "tech": "",
    # tags follow the 5-axis taxonomy from TAGS.md:
    #   axis 1 板块     required exactly 1 of: 首屏/导航/产品/分类/服务/流程/评价/新闻/案例/CTA/关于/联系/页脚
    #   axis 2 形态     optional 0-1 of:       网格/轮播/滑块/跑马灯/顶栏/横幅/文字段/列表
    #   axis 3 触发     required exactly 1 of: 入场/滚动/悬停/点击/自动播放
    #   axis 4 技术     optional 0-3 of:       形变/路径裁切/逐字出场/视差/交叉淡入/多态切换/遮罩/文字滚动/响应式/键盘
    #   axis 5 产品类型 required exactly 1 of: 美妆/食品/健康/时尚/B2B服务/工业安防/协会组织/设计建筑/科技/教育/金融/房产/生活方式
    # Example: ["产品", "网格", "悬停", "路径裁切", "美妆"]
    # package-effects.py refuses to package if the tag set is invalid.
    "tags": ["TODO-板块", "TODO-触发", "TODO-产品类型"],
    "previewHref": "",
    "sourceUrl": "",
    "localMirror": "",
    "order": 9999,
}


def next_num() -> str:
    """Return zero-padded next available NNN by scanning existing folders."""
    existing = []
    for p in EFFECTS.iterdir() if EFFECTS.exists() else []:
        if p.is_dir():
            m = re.match(r"^(\d{3})-", p.name)
            if m:
                existing.append(int(m.group(1)))
    return f"{(max(existing) + 1) if existing else 1:03d}"


def main():
    ap = argparse.ArgumentParser(
        description="Scaffold a new effect folder with the locked sc2 layout.",
    )
    ap.add_argument("slug", help="folder slug — either `<name>` or `NNN-<name>`")
    ap.add_argument("--num", help="force this NNN (otherwise: next available)")
    ap.add_argument("--title", help="meta.json title (defaults to slug)")
    ap.add_argument("--source-url", help="meta.json sourceUrl (live URL of the block's origin)")
    ap.add_argument("--mirror", help="meta.json localMirror (relative path from effects/, e.g. ../designs/001-foo/index.html)")
    args = ap.parse_args()

    EFFECTS.mkdir(exist_ok=True)

    # parse slug — accept either "xyz" or "015-xyz"
    m = re.match(r"^(\d{3})-(.+)$", args.slug)
    if m:
        num = args.num or m.group(1)
        slug = m.group(2)
    else:
        num = args.num or next_num()
        slug = args.slug
    num = f"{int(num):03d}"

    folder_name = f"{num}-{slug}"
    folder = EFFECTS / folder_name
    if folder.exists():
        print(f"refusing to clobber existing: {folder}", file=sys.stderr)
        return 1
    folder.mkdir(parents=True)
    (folder / "assets").mkdir()
    (folder / "lib").mkdir()

    title = args.title or slug
    (folder / "index.html").write_text(
        INDEX_TEMPLATE.format(title=title), encoding="utf-8",
    )
    meta = dict(META_TEMPLATE)
    meta["title"] = title
    if args.source_url:
        meta["sourceUrl"] = args.source_url
    if args.mirror:
        meta["localMirror"] = args.mirror
    meta["order"] = int(num)
    (folder / "meta.json").write_text(
        json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf-8",
    )

    rel = folder.relative_to(ROOT)
    print(f"created {rel}/")
    print(f"  ├── index.html         ← fill with 1:1 extracted HTML/CSS/JS")
    print(f"  ├── meta.json          ← fill description/tech/tags{'  ← sourceUrl=' + args.source_url if args.source_url else ''}")
    print(f"  ├── assets/            (drop images/videos/fonts)")
    print(f"  └── lib/               (drop third-party JS)")
    print(f"\nNext:")
    print(f"  1. edit {rel}/index.html")
    print(f"  2. python finalize.py        (rebuild + package + inject overlay)")
    print(f"  3. open http://localhost:8080/effects/{folder_name}/ + the source mirror side-by-side to compare")
    return 0


if __name__ == "__main__":
    sys.exit(main())
