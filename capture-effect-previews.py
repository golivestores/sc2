"""
Capture static preview images for every effect card.

The gallery should not iframe all effect pages. This script opens each
effects/NNN-slug/index.html page in headless Chromium, scrolls through it once
to trigger lazy/reveal states, captures visually distinct scroll states, then
stores a compact preview.jpg beside the effect.

Usage:
    python capture-effect-previews.py
    python capture-effect-previews.py --only 054-scroll-bg-color-guide
    python capture-effect-previews.py --width 1200 --max-frames 4
"""
import argparse
import io
import re
import sys
import threading
from http.server import ThreadingHTTPServer
from pathlib import Path

from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

import serve

ROOT = Path(__file__).resolve().parent
EFFECTS = ROOT / "effects"


class QuietCaptureHandler(serve.LazyHandler):
    def log_message(self, fmt, *args):
        pass

    def copyfile(self, source, outputfile):
        try:
            return super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return None


def effect_dirs(only: str | None) -> list[Path]:
    if only:
        folder = EFFECTS / only
        if not (folder / "index.html").exists():
            raise SystemExit(f"effect not found or missing index.html: {folder}")
        return [folder]
    return [
        p for p in sorted(EFFECTS.iterdir())
        if p.is_dir() and re.match(r"^\d+-", p.name) and (p / "index.html").exists()
    ]


def start_server(port: int) -> tuple[ThreadingHTTPServer, str]:
    server = ThreadingHTTPServer(("127.0.0.1", port), QuietCaptureHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    host, real_port = server.server_address
    return server, f"http://{host}:{real_port}"


def wait_until_stable(page) -> None:
    try:
        page.wait_for_load_state("networkidle", timeout=6000)
    except PlaywrightTimeoutError:
        pass
    try:
        page.evaluate("() => document.fonts && document.fonts.ready")
    except Exception:
        pass
    page.wait_for_timeout(700)


def prime_scroll(page) -> None:
    metrics = page.evaluate(
        """() => ({
          h: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
          vh: window.innerHeight
        })"""
    )
    height = int(metrics.get("h") or 0)
    vh = int(metrics.get("vh") or 900)
    max_y = max(0, height - vh)
    step = max(520, int(vh * 0.72))

    y = 0
    while y <= max_y:
        page.evaluate("(y) => window.scrollTo(0, y)", y)
        page.wait_for_timeout(140)
        y += step

    page.evaluate("() => window.scrollTo(0, 0)")
    page.wait_for_timeout(420)


def page_metrics(page) -> tuple[int, int, int]:
    metrics = page.evaluate(
        """() => ({
          h: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
          w: window.innerWidth,
          vh: window.innerHeight
        })"""
    )
    return int(metrics["w"]), int(metrics["vh"]), int(metrics["h"])


def wait_for_view(page, settle_ms: int) -> None:
    page.wait_for_timeout(settle_ms)
    try:
        page.evaluate(
            """() => new Promise(resolve => {
              requestAnimationFrame(() => requestAnimationFrame(resolve));
            })"""
        )
    except Exception:
        pass


def viewport_capture(page, y: int, settle_ms: int) -> Image.Image:
    page.evaluate("(y) => window.scrollTo(0, y)", y)
    wait_for_view(page, settle_ms)
    png = page.screenshot(full_page=False, type="png")
    img = Image.open(io.BytesIO(png))
    img.load()
    return img.convert("RGB")


def frame_signature(img: Image.Image) -> Image.Image:
    return img.resize((96, 67), Image.Resampling.BILINEAR).convert("L")


def frame_distance(a: Image.Image, b: Image.Image) -> float:
    diff = ImageChops.difference(a, b)
    return float(ImageStat.Stat(diff).mean[0])


def frame_complexity(sig: Image.Image) -> float:
    return float(ImageStat.Stat(sig).stddev[0])


def select_evenly(items: list[tuple[int, Image.Image]], limit: int) -> list[tuple[int, Image.Image]]:
    if len(items) <= limit:
        return items
    if limit <= 1:
        return [items[0]]
    indexes = []
    for i in range(limit):
        indexes.append(round(i * (len(items) - 1) / (limit - 1)))
    seen = set()
    result = []
    for idx in indexes:
        if idx not in seen:
            result.append(items[idx])
            seen.add(idx)
    return result


def collect_keyframes(page, args) -> list[tuple[int, Image.Image]]:
    width, vh, height = page_metrics(page)
    max_y = max(0, height - vh)
    if max_y == 0:
        return [(0, viewport_capture(page, 0, args.settle))]

    step = max(320, int(vh * args.sample_ratio))
    ys = list(range(0, max_y + 1, step))
    if ys[-1] != max_y:
        ys.append(max_y)

    frames: list[tuple[int, Image.Image]] = []
    sigs: list[Image.Image] = []
    for y in ys:
        shot = viewport_capture(page, y, args.settle)
        sig = frame_signature(shot)
        if sigs and frame_complexity(sig) < args.blank_threshold:
            continue
        if not sigs:
            frames.append((y, shot))
            sigs.append(sig)
            continue
        nearest = min(frame_distance(sig, existing) for existing in sigs)
        if nearest >= args.diff_threshold:
            frames.append((y, shot))
            sigs.append(sig)

    if not frames:
        frames.append((0, viewport_capture(page, 0, args.settle)))

    return select_evenly(frames, args.max_frames)


def layout_for(count: int) -> tuple[int, int]:
    if count <= 1:
        return 1, 1
    if count <= 2:
        return 2, 1
    if count <= 4:
        return 2, 2
    return 3, 2


def paste_contained(canvas: Image.Image, img: Image.Image, box: tuple[int, int, int, int]) -> None:
    x, y, w, h = box
    scale = min(w / img.width, h / img.height)
    rw = max(1, int(img.width * scale))
    rh = max(1, int(img.height * scale))
    resized = img.resize((rw, rh), Image.Resampling.LANCZOS)
    px = x + (w - rw) // 2
    py = y + (h - rh) // 2
    canvas.paste(resized, (px, py))


def compose_keyframe_sheet(frames: list[tuple[int, Image.Image]], width: int) -> Image.Image:
    count = len(frames)
    cols, rows = layout_for(count)
    height = int(width * 2 / 3)
    gutter = 10 if count > 1 else 0
    canvas = Image.new("RGB", (width, height), (21, 18, 13))

    tile_w = (width - gutter * (cols + 1)) // cols
    tile_h = (height - gutter * (rows + 1)) // rows
    for i, (_, frame) in enumerate(frames):
        col = i % cols
        row = i // cols
        x = gutter + col * (tile_w + gutter)
        y = gutter + row * (tile_h + gutter)
        tile = Image.new("RGB", (tile_w, tile_h), (18, 16, 13))
        paste_contained(tile, frame, (0, 0, tile_w, tile_h))
        canvas.paste(tile, (x, y))
    return canvas


def capture_keyframe_sheet(page, args) -> tuple[Image.Image, int]:
    frames = collect_keyframes(page, args)
    return compose_keyframe_sheet(frames, args.width), len(frames)


def capture_stitched(page, settle_ms: int, overlap: int) -> Image.Image:
    """Capture the page as the user sees it while scrolling.

    Playwright's full_page screenshot is layout-based. For sticky / scroll-driven
    effects that means lower page regions can be captured as empty background
    instead of the current viewport state. This function scrolls screen by
    screen, waits for lazy/animation state to settle, screenshots the viewport,
    and pastes each viewport into a long image at its real scroll offset.
    """
    width, vh, height = page_metrics(page)
    if height <= vh:
        return viewport_capture(page, 0, settle_ms)

    step = max(320, vh - max(0, overlap))
    max_y = max(0, height - vh)
    ys = list(range(0, max_y + 1, step))
    if ys[-1] != max_y:
        ys.append(max_y)

    canvas = Image.new("RGB", (width, height), (21, 18, 13))
    filled = [False] * height

    for y in ys:
        shot = viewport_capture(page, y, settle_ms)
        segment_h = min(vh, height - y)
        canvas.paste(shot.crop((0, 0, width, segment_h)), (0, y))
        for row in range(y, min(height, y + segment_h)):
            filled[row] = True

    # If an overlap/rounding gap ever appears, fill it with the closest captured
    # row instead of leaving the dark canvas visible.
    pixels = canvas.load()
    last_seen = None
    for row, ok in enumerate(filled):
        if ok:
            last_seen = row
            continue
        if last_seen is not None:
            for x in range(width):
                pixels[x, row] = pixels[x, last_seen]

    page.evaluate("() => window.scrollTo(0, 0)")
    return canvas


def compress_preview(png_bytes: bytes, out_path: Path, max_width: int, max_height: int, quality: int) -> tuple[int, int, int]:
    Image.MAX_IMAGE_PIXELS = None
    with Image.open(io.BytesIO(png_bytes)) as raw:
        raw.load()
        if raw.mode in ("RGBA", "LA") or ("transparency" in raw.info):
            bg = Image.new("RGB", raw.size, (21, 18, 13))
            alpha = raw.convert("RGBA").split()[-1]
            bg.paste(raw.convert("RGB"), mask=alpha)
            img = bg
        else:
            img = raw.convert("RGB")

        scale = min(1.0, max_width / img.width, max_height / img.height)
        if scale < 1:
            target = (max(1, int(img.width * scale)), max(1, int(img.height * scale)))
            img = img.resize(target, Image.Resampling.LANCZOS)

        out_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(out_path, "JPEG", quality=quality, optimize=True, progressive=True)
        return img.width, img.height, out_path.stat().st_size


def save_preview(raw: Image.Image, out_path: Path, max_width: int, max_height: int, quality: int) -> tuple[int, int, int]:
    Image.MAX_IMAGE_PIXELS = None
    img = raw.convert("RGB")
    scale = min(1.0, max_width / img.width, max_height / img.height)
    if scale < 1:
        target = (max(1, int(img.width * scale)), max(1, int(img.height * scale)))
        img = img.resize(target, Image.Resampling.LANCZOS)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=quality, optimize=True, progressive=True)
    return img.width, img.height, out_path.stat().st_size


def capture_one(page, base_url: str, folder: Path, args) -> tuple[bool, str]:
    url = f"{base_url}/effects/{folder.name}/index.html"
    out = folder / "preview.jpg"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=args.timeout)
        page.add_style_tag(content="""
          #sc2-overlay { display: none !important; }
          html { scroll-behavior: auto !important; }
        """)
        wait_until_stable(page)
        prime_scroll(page)
        preview, frame_count = capture_keyframe_sheet(page, args)
        w, h, size = save_preview(preview, out, args.width, args.max_height, args.quality)
        return True, f"{w}x{h}, {frame_count} frame(s), {size / 1024:.0f} KB"
    except Exception as e:
        try:
            png = page.screenshot(full_page=False, type="png", timeout=15000)
            w, h, size = compress_preview(png, out, args.width, args.max_height, args.quality)
            return False, f"full-page failed; saved viewport fallback {w}x{h}, {size / 1024:.0f} KB ({e})"
        except Exception as e2:
            return False, f"failed: {e}; fallback failed: {e2}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--only", help="capture a single effect folder")
    ap.add_argument("--port", type=int, default=0, help="local server port; 0 picks a free port")
    ap.add_argument("--width", type=int, default=1200, help="max output image width")
    ap.add_argument("--max-height", type=int, default=800, help="max output image height")
    ap.add_argument("--max-frames", type=int, default=4, help="max visually distinct viewport captures per preview")
    ap.add_argument("--diff-threshold", type=float, default=8.0, help="minimum visual difference needed to keep a frame")
    ap.add_argument("--blank-threshold", type=float, default=6.0, help="skip non-initial frames below this visual-detail score")
    ap.add_argument("--sample-ratio", type=float, default=0.72, help="scroll sample distance as viewport-height ratio")
    ap.add_argument("--quality", type=int, default=82, help="JPEG quality")
    ap.add_argument("--timeout", type=int, default=60000, help="per-page Playwright timeout in ms")
    ap.add_argument("--settle", type=int, default=650, help="wait after each scroll position before screenshotting")
    ap.add_argument("--overlap", type=int, default=80, help="overlap between stitched viewport captures")
    ap.add_argument("--viewport-width", type=int, default=1440)
    ap.add_argument("--viewport-height", type=int, default=1000)
    args = ap.parse_args()

    folders = effect_dirs(args.only)
    server, base_url = start_server(args.port)
    print(f"preview server: {base_url}")
    print(f"capturing {len(folders)} effect(s)")

    failures = 0
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": args.viewport_width, "height": args.viewport_height},
                device_scale_factor=1,
                ignore_https_errors=True,
            )
            page = context.new_page()
            page.set_default_timeout(args.timeout)

            for i, folder in enumerate(folders, 1):
                ok, msg = capture_one(page, base_url, folder, args)
                if not ok:
                    failures += 1
                tag = "ok" if ok else "warn"
                print(f"[{i:02d}/{len(folders):02d}] {tag} {folder.name}: {msg}", flush=True)

            browser.close()
    finally:
        server.shutdown()

    if failures:
        print(f"done with {failures} warning(s)")
    else:
        print("done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
