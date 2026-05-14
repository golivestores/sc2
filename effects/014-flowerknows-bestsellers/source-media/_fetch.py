"""Pull the 21 original .mp4 videos + .jpg thumbnails for the Flower Knows
'Shop Our Bestsellers' Moast carousel, into source-media/. Each pair is
named NN-<first-product-handle>.{mp4,jpg} so it's obvious which file goes
to which Moast slide when uploading.

These are flowerknows.co's videos — use them ONLY for layout verification
on your test store. For production, replace with your own product videos.
"""
import json, re, sys
from pathlib import Path
from urllib.request import urlopen, Request

ROOT = Path(__file__).resolve().parent           # source-media/
EFFECT = ROOT.parent                             # 014-flowerknows-bestsellers/
SRC_HTML = EFFECT.parent.parent / "designs" / "006-flowerknows" / "index.html"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"

# Extract the embedded <script type="application/json" class="data"> JSON.
text = SRC_HTML.read_text(encoding="utf-8")
m = re.search(
    r'<script type="application/json" class="data">\s*(\{.*?\})\s*</script>',
    text, re.S
)
if not m:
    print("Could not find inline data JSON", file=sys.stderr)
    sys.exit(1)

data = json.loads(m.group(1))
media_list = data.get("media", [])
print(f"Found {len(media_list)} media entries")

def fetch(url, dst: Path):
    if dst.exists() and dst.stat().st_size > 1024:
        return f"  exists  {dst.name}"
    try:
        req = Request(url, headers={"User-Agent": UA})
        with urlopen(req, timeout=60) as r:
            buf = r.read()
        dst.write_bytes(buf)
        return f"  ok      {dst.name}  ({len(buf)/1024:.0f} KB)"
    except Exception as e:
        return f"  FAIL    {dst.name}  {e}"

for i, m in enumerate(media_list, 1):
    products = m.get("productProfile", {}).get("products", [])
    handle = "video"
    if products:
        h = products[0].get("product", {}).get("handle", "")
        # Strip -us suffix and shorten
        handle = re.sub(r"-(us|us-1|1|2)$", "", h)[:40] or "video"
    base = f"{i:02d}-{handle}"

    video_url = m.get("originalSource")
    if video_url:
        print(fetch(video_url, ROOT / f"{base}.mp4"))

    thumb_url = m.get("url")
    if thumb_url:
        # strip Shopify image transform query so we get full-res jpg
        thumb_url = re.sub(r"\?.*$", "", thumb_url)
        ext = ".jpg" if thumb_url.lower().endswith((".jpg", ".jpeg")) else ".png"
        print(fetch(thumb_url, ROOT / f"{base}{ext}"))

print("\nDone. Files in:", ROOT)
