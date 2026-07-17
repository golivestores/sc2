#!/usr/bin/env python3
"""
v2: Build a self-contained effect that re-uses the parent mirror as the asset host.

Strategy:
  * Read full mirror index.html
  * Keep <head> intact (all stylesheets + globals)
  * Inject <base href="../../designs/<mirror>/"> right after <head> open
    so every relative resource ref (assets/...) resolves to the mirror
  * Replace <body>...</body> with: target shopify-section + body-tail global scripts
    (everything inside body that is NOT a top-level shopify-section gets kept,
    plus the named shopify-section by id)

Usage:
    python extract-effect-section.py <mirror_index.html> <section_id> <out_dir> <title>
"""
import sys, re, html
from pathlib import Path

SRC, SECTION_IDS_ARG, OUT, TITLE = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
SECTION_IDS = [s.strip() for s in SECTION_IDS_ARG.split(",") if s.strip()]
SRC = Path(SRC).resolve()
OUT = Path(OUT).resolve()
MIRROR_DIR = SRC.parent
# compute base href: from effects/<eff>/index.html → ../../designs/<mirror>/
# OUT is .../effects/<eff>; MIRROR_DIR is .../designs/<mirror>
rel_to_mirror = Path("..") / ".." / MIRROR_DIR.relative_to(OUT.parent.parent)
BASE_HREF = str(rel_to_mirror).replace("\\", "/") + "/"

raw = SRC.read_text(encoding="utf-8", errors="ignore")
html_m = re.search(r'(<html\b[^>]*>)', raw, re.I)
html_open = html_m.group(1) if html_m else '<html lang="en">'

# 1. split head / body
head_m = re.search(r'(<head\b[^>]*>)(.*?)(</head>)', raw, re.S | re.I)
body_m = re.search(r'(<body\b[^>]*>)(.*?)(</body>)', raw, re.S | re.I)
if not (head_m and body_m):
    sys.exit("could not find <head> / <body>")
head_open, head_inner, head_close = head_m.groups()
body_open, body_inner, body_close = body_m.groups()

# Webflow and similar sites often have no named top-level sections.  For those
# mirrors, accept `selector:<CSS selector>` and retain the selected visual
# primitive, the audio/cursor runtime dependencies, and every original script.
# This keeps the source site's own animation runtime intact while still
# producing a focused effect page.
if SECTION_IDS_ARG.startswith("selector:"):
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        sys.exit("selector extraction requires beautifulsoup4")
    selector = SECTION_IDS_ARG[len("selector:"):].strip()
    soup = BeautifulSoup(raw, "html.parser")
    # The project-only overlay is useful in the navigator, but it must never
    # become part of an extracted effect (its Chinese controls and translator
    # hooks interfere with character-split source animations).
    overlay = soup.select_one("#sc2-overlay")
    if overlay:
        overlay.decompose()
    target = soup.select_one(selector)
    if not target:
        sys.exit(f"selector not found: {selector}")
    dependencies = []
    for dep in soup.select("audio, [data-transition], [data-sticker-cursor]"):
        if dep is not target and dep not in target.descendants:
            dependencies.append(str(dep))
    scripts = [str(script) for script in soup.find_all("script") if "sc2-overlay" not in str(script)]
    target_html = str(target)
    # The user requested English copy for this effect. These are the only
    # source-language strings in the selected volleyball-to-horse block.
    target_html = target_html.replace("Sondern", "Instead:")
    target_html = target_html.replace(
        "Sportliche Events, echte Begegnungen und neue Chancen fuer alle Mitglieder. In einer familiaeren Atmosphaere.",
        "Sporting events, real connections, and new opportunities for every member. In a welcoming atmosphere.",
    )
    new_body_inner = (
        "".join(dependencies)
        + '<main class="effect-stage isolate">' + target_html + "</main>"
        + "".join(scripts)
    )
    new_head_inner = re.sub(r'<base\b[^>]*>', '', head_inner, count=1, flags=re.I)
    new_head_inner = f'<base href="{BASE_HREF}">\n' + new_head_inner
    new_head_inner = re.sub(r'<title>.*?</title>', f'<title>{html.escape(TITLE)} — sc2 effect</title>', new_head_inner, count=1, flags=re.S | re.I)
    new_head_inner += """
<meta name="google" content="notranslate">
<style>
  html, body { margin: 0; min-height: 100%; }
  .effect-stage { isolation: isolate; }
  .sticker-cursor, .transition { pointer-events: none; }
</style>
"""
    html_open = re.sub(r'\slang=("[^"]*"|\'[^\']*\')', ' lang="en"', html_open, flags=re.I)
    if "translate=" not in html_open:
        html_open = html_open[:-1] + ' translate="no">'
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / "index.html"
    out.write_text(
        "<!doctype html>\n" + html_open + "\n" + head_open + "\n" + new_head_inner + "\n" + head_close + "\n"
        + body_open + "\n" + new_body_inner + "\n" + body_close + "\n</html>",
        encoding="utf-8",
    )
    print(f"wrote: {out}")
    print(f"base href: {BASE_HREF}")
    print(f"selector kept: {selector}")
    sys.exit(0)

# 2. find each top-level shopify-section span inside body
SEC_OPEN = re.compile(r'<(?:div|section)\s+id="(shopify-section-[^"]+)"[^>]*>')
matches = list(SEC_OPEN.finditer(body_inner))
if not matches:
    sys.exit("no shopify-section blocks in body")

# build section spans: each section ends just before the next section opens (top-level only)
spans = []
for i, mm in enumerate(matches):
    start = mm.start()
    end = matches[i+1].start() if i+1 < len(matches) else None
    spans.append((mm.group(1), start, end, mm))

# 3. locate target spans by ids in document order; everything before first span = leading; after last span = trailing
target_indices = []
for sid in SECTION_IDS:
    idx = next((i for i, s in enumerate(spans) if s[0] == sid), -1)
    if idx < 0:
        sys.exit(f"section id not found: {sid}")
    target_indices.append(idx)
target_indices.sort()

first_section_start = spans[0][1]
last_section_end_marker = spans[-1][2] if spans[-1][2] is not None else len(body_inner)

leading = body_inner[:first_section_start]
trailing = body_inner[last_section_end_marker:]

targets_html = []
for ti in target_indices:
    t_start = spans[ti][1]
    t_end = spans[ti][2] if spans[ti][2] is not None else len(body_inner)
    targets_html.append(body_inner[t_start:t_end])

new_body_inner = (
    leading
    + '<main class="effect-stage isolate">' + "".join(targets_html) + '</main>'
    + trailing
)

# 5. inject <base href> at head start; remove conflicting base if any
new_head_inner = re.sub(r'<base\b[^>]*>', '', head_inner, count=1, flags=re.I)
new_head_inner = f'<base href="{BASE_HREF}">\n' + new_head_inner
# update <title>
new_head_inner = re.sub(r'<title>.*?</title>', f'<title>{html.escape(TITLE)} · sc2 effect</title>', new_head_inner, count=1, flags=re.S | re.I)

# 6. write
OUT.mkdir(parents=True, exist_ok=True)
out = (OUT / "index.html")
out.write_text(
    "<!doctype html>\n" + html_open + "\n"
    + head_open + "\n" + new_head_inner + "\n" + head_close + "\n"
    + body_open + "\n" + new_body_inner + "\n" + body_close + "\n"
    + "</html>",
    encoding="utf-8")
print(f"wrote: {out}")
print(f"base href: {BASE_HREF}")
print(f"sections kept: {len(target_indices)} of {len(spans)} (dropped {len(spans)-len(target_indices)})")
