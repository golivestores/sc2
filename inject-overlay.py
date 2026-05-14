"""
inject-overlay.py — one-time-ish injector that adds a floating "下载 zip" button
to every effect's index.html. Idempotent: re-running skips files that already
contain the marker.

The injected block is fenced with `<!-- sc2-overlay:start -->` /
`<!-- sc2-overlay:end -->` so a future cleanup or zip-time filter can strip it.

The overlay hides itself when the page is loaded in the gallery preview iframe
(`?demo=preview`), so card thumbnails are unchanged.
"""
import sys, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
EFFECTS = ROOT / "effects"

MARKER_START = "<!-- sc2-overlay:start -->"
MARKER_END = "<!-- sc2-overlay:end -->"

def overlay_html(folder: str) -> str:
    # Two stacked fixed-position buttons in the top-right corner of the demo.
    # zip on top, 源码 directly below. Both hide when ?demo=preview (gallery iframe).
    zip_name = f"{folder}.zip"
    # source viewer lives at effects/view.html; demo is at effects/<folder>/index.html
    src_href = f"../view.html?effect={folder}"
    return f"""{MARKER_START}
<style>
  #sc2-overlay {{
    position: fixed; top: 16px; right: 16px; z-index: 2147483647;
    display: flex; flex-direction: column; gap: 8px;
    font: 600 12px/1 -apple-system, "Segoe UI", "Microsoft YaHei", Helvetica, sans-serif;
  }}
  #sc2-overlay .sc2-btn {{
    display: inline-flex; align-items: center; justify-content: center;
    padding: 8px 14px; min-width: 110px;
    color: #fff; background: rgba(20,22,30,.78);
    border: 1px solid rgba(255,255,255,.16); border-radius: 8px;
    text-decoration: none;
    -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
    box-shadow: 0 4px 16px rgba(0,0,0,.2);
    transition: background .15s, transform .15s;
  }}
  #sc2-overlay .sc2-btn:hover {{
    background: rgba(20,22,30,.95); transform: translateY(-1px);
  }}
</style>
<div id="sc2-overlay">
  <a class="sc2-btn" href="{zip_name}" download title="下载本 effect 的 zip 包">📦 下载 zip</a>
  <a class="sc2-btn" href="{src_href}" target="_top" title="查看 / 复制源码">📋 源码</a>
</div>
<script>
(function () {{
  if (new URLSearchParams(location.search).get('demo') === 'preview') {{
    var el = document.getElementById('sc2-overlay');
    if (el) el.remove();
  }}
}})();
</script>
{MARKER_END}"""

def inject(html_path: Path) -> str:
    folder = html_path.parent.name
    text = html_path.read_text(encoding="utf-8")

    if MARKER_START in text:
        new = re.sub(
            re.escape(MARKER_START) + r".*?" + re.escape(MARKER_END),
            overlay_html(folder),
            text, count=1, flags=re.DOTALL,
        )
        if new == text:
            return "unchanged"
        html_path.write_text(new, encoding="utf-8")
        return "updated"

    m = re.search(r"</body\s*>", text, re.IGNORECASE)
    block = "\n" + overlay_html(folder) + "\n"
    if m:
        new = text[:m.start()] + block + text[m.start():]
    else:
        new = text + block
    html_path.write_text(new, encoding="utf-8")
    return "injected"

def main():
    targets = sorted(EFFECTS.glob("[0-9][0-9][0-9]-*/index.html"))
    if not targets:
        print("no effect index.html found")
        return 1
    for p in targets:
        status = inject(p)
        print(f"  {status:>9}  {p.relative_to(ROOT)}")
    print(f"\ndone. {len(targets)} effect(s) processed.")

if __name__ == "__main__":
    sys.exit(main() or 0)
