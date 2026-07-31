"""Capture compact three-view collage previews for the Design gallery.

Each preview contains the first viewport plus two visually distinct views from
the middle of the page.  The first view is shown large on the left; the two
middle views are stacked on the right.

Usage:
    python capture-design-previews.py
    python capture-design-previews.py --only 104-offmenu
"""

from __future__ import annotations

import argparse
import io
import json
import re
import subprocess
import sys
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from http.server import ThreadingHTTPServer
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageOps, ImageStat
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

import serve


ROOT = Path(__file__).resolve().parent
DESIGNS = ROOT / "designs"


class QuietCaptureHandler(serve.LazyHandler):
    def log_message(self, fmt, *args):
        pass

    def copyfile(self, source, outputfile):
        try:
            return super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return None


def design_dirs(only: str | None) -> list[Path]:
    if only:
        folder = DESIGNS / only
        if not (folder / "index.html").exists():
            raise SystemExit(f"design not found or missing index.html: {folder}")
        return [folder]
    return [
        folder
        for folder in sorted(DESIGNS.iterdir())
        if folder.is_dir()
        and (folder / "index.html").exists()
        and not (folder / ".skip-index").exists()
    ]


def start_server(port: int) -> tuple[ThreadingHTTPServer, str]:
    server = ThreadingHTTPServer(("127.0.0.1", port), QuietCaptureHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    host, real_port = server.server_address
    return server, f"http://{host}:{real_port}"


def wait_until_stable(page, settle_ms: int) -> None:
    try:
        page.wait_for_load_state("networkidle", timeout=5000)
    except PlaywrightTimeoutError:
        pass
    try:
        page.evaluate(
            """() => Promise.race([
              document.fonts ? document.fonts.ready : Promise.resolve(),
              new Promise(resolve => setTimeout(resolve, 3000))
            ])"""
        )
    except Exception:
        pass
    page.wait_for_timeout(settle_ms)


def prepare_page_for_capture(page, settle_ms: int) -> None:
    """Dismiss transient UI and remove a loader that still blocks content.

    Waiting for networkidle alone is not sufficient for the mirrored sites:
    some loaders have an exit animation, some require a gesture, and some stay
    mounted after the page underneath is complete.  These temporary changes
    affect only the capture tab; no mirrored source file is modified.
    """

    action = page.evaluate(
        """() => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const visible = el => {
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden'
              && Number(style.opacity || 1) > 0.02
              && rect.width > 3 && rect.height > 3;
          };
          const overlayAncestor = el => {
            for (let node = el; node && node !== document.body; node = node.parentElement) {
              const style = getComputedStyle(node);
              const rect = node.getBoundingClientRect();
              if (
                visible(node)
                && (style.position === 'fixed' || node.matches('[role="dialog"], dialog'))
                && rect.width >= vw * 0.22
                && rect.height >= vh * 0.12
              ) return node;
            }
            return null;
          };
          const controls = [...document.querySelectorAll(
            'button, [role="button"], a, input[type="button"], input[type="submit"]'
          )].filter(visible);
          const dismiss = /^(close|dismiss|accept(?: all)?|agree|allow all|ok(?:ay)?|got it|continue without accepting|reject(?: all)?|no thanks|skip|×|✕)$/i;
          const enter = /(enter|start|begin|launch|explore|experience|enable sound|sound on|click anywhere|tap to|scroll to (?:start|discover))/i;
          let target = controls.find(el => {
            const text = (el.getAttribute('aria-label') || el.textContent || el.value || '')
              .trim().replace(/\\s+/g, ' ');
            return dismiss.test(text) && overlayAncestor(el);
          });
          if (!target) {
            target = controls.find(el => {
              const text = (el.getAttribute('aria-label') || el.textContent || el.value || '')
                .trim().replace(/\\s+/g, ' ');
              return enter.test(text) && overlayAncestor(el);
            });
          }
          if (target) {
            target.setAttribute('data-sc2-preview-action', 'true');
            return { type: 'control' };
          }

          const gate = [...document.querySelectorAll('body *')].find(el => {
            if (!visible(el)) return false;
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            const marker = `${el.id} ${String(el.className)}`;
            const text = (el.textContent || '').trim().replace(/\\s+/g, ' ');
            return style.position === 'fixed'
              && rect.width >= vw * 0.75
              && rect.height >= vh * 0.65
              && /(preloader|loader|loading|splash|curtain|entry|gate)/i.test(marker)
              && /(click anywhere|tap to|scroll to (?:start|discover)|enable sound|start experience)/i.test(text);
          });
          if (gate) {
            const rect = gate.getBoundingClientRect();
            return {
              type: 'point',
              x: Math.round(rect.left + rect.width / 2),
              y: Math.round(rect.top + rect.height / 2)
            };
          }
          return null;
        }"""
    )
    if action and action.get("type") == "control":
        locator = page.locator('[data-sc2-preview-action="true"]')
        try:
            locator.click(timeout=1800)
            page.wait_for_timeout(450)
        except Exception:
            pass
    elif action and action.get("type") == "point":
        try:
            page.mouse.click(action["x"], action["y"])
            page.wait_for_timeout(550)
        except Exception:
            pass

    # Hide only full-screen elements explicitly marked as loader/gate UI.
    page.evaluate(
        """() => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          let removed = 0;
          for (const el of document.querySelectorAll('body *')) {
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            if (
              style.display === 'none'
              || style.visibility === 'hidden'
              || Number(style.opacity || 1) <= 0.02
              || style.position !== 'fixed'
              || rect.width < vw * 0.75
              || rect.height < vh * 0.65
            ) continue;
            const marker = `${el.id} ${String(el.className)}`;
            const text = (el.textContent || '').trim().replace(/\\s+/g, ' ');
            const explicitLoader = /(preloader|\\bloader\\b|loading|splash-screen|curtain|page-transition|transition-pages?)/i.test(marker);
            const explicitGate = /(entry|gate|intro-layer|splash)/i.test(marker)
              && /(loading|\\b\\d{1,3}%|click anywhere|tap to|scroll to (?:start|discover)|enable sound|bounce a ball)/i.test(text);
            if (!explicitLoader && !explicitGate) continue;
            el.setAttribute('data-sc2-preview-hidden', 'true');
            el.style.setProperty('display', 'none', 'important');
            removed += 1;
          }
          if (removed) {
            document.documentElement.style.setProperty('overflow', 'auto', 'important');
            if (document.body) document.body.style.setProperty('overflow', 'auto', 'important');
          }
          return removed;
        }"""
    )
    page.evaluate("() => window.scrollTo(0, 0)")
    settle_view(page, max(500, min(1100, settle_ms)))


def page_metrics(page) -> tuple[int, int, int]:
    metrics = page.evaluate(
        """() => ({
          width: window.innerWidth,
          viewport: window.innerHeight,
          height: Math.max(
            document.documentElement.scrollHeight,
            document.body ? document.body.scrollHeight : 0
          )
        })"""
    )
    return int(metrics["width"]), int(metrics["viewport"]), int(metrics["height"])


def settle_view(page, milliseconds: int) -> None:
    page.wait_for_timeout(milliseconds)
    try:
        page.evaluate(
            """() => new Promise(resolve => {
              requestAnimationFrame(() => requestAnimationFrame(resolve));
            })"""
        )
    except Exception:
        pass


def capture_view(page, y: int, settle_ms: int) -> Image.Image:
    page.evaluate("y => window.scrollTo(0, y)", y)
    settle_view(page, settle_ms)
    return capture_current_view(page)


def capture_current_view(page) -> Image.Image:
    png = page.screenshot(full_page=False, type="png", timeout=15000)
    with Image.open(io.BytesIO(png)) as raw:
        raw.load()
        return raw.convert("RGB")


def signature(image: Image.Image) -> Image.Image:
    return image.resize((96, 60), Image.Resampling.BILINEAR).convert("L")


def distance(a: Image.Image, b: Image.Image) -> float:
    return float(ImageStat.Stat(ImageChops.difference(a, b)).mean[0])


def complexity(image: Image.Image) -> float:
    return float(ImageStat.Stat(image).stddev[0])


def low_information(image: Image.Image) -> bool:
    sample = signature(image)
    stats = ImageStat.Stat(sample)
    mean = float(stats.mean[0])
    spread = float(stats.stddev[0])
    return spread < 2.2 or (mean < 6.0 and spread < 8.0) or (mean > 249.0 and spread < 5.0)


def distinct_enough(first: Image.Image, frames: list[tuple[int, Image.Image]]) -> bool:
    if len(frames) < 2:
        return False
    first_sig = signature(first)
    a_sig = signature(frames[0][1])
    b_sig = signature(frames[1][1])
    return (
        distance(first_sig, a_sig) >= 4.0
        and distance(first_sig, b_sig) >= 4.0
        and distance(a_sig, b_sig) >= 2.8
    )


def prime_lazy_content(page, max_y: int, viewport: int) -> None:
    if max_y <= 0:
        return
    step = max(600, int(viewport * 0.9))
    natural_count = max_y // step + 1
    max_samples = 14
    if natural_count <= max_samples:
        positions = list(range(0, max_y + 1, step))
        if positions[-1] != max_y:
            positions.append(max_y)
    else:
        positions = [
            round(max_y * index / (max_samples - 1))
            for index in range(max_samples)
        ]
    for y in dict.fromkeys(positions):
        page.evaluate("y => window.scrollTo(0, y)", y)
        page.wait_for_timeout(90)
    page.evaluate("() => window.scrollTo(0, 0)")
    page.wait_for_timeout(350)


def wheel_keyframes(page, viewport: int, settle_ms: int) -> list[tuple[int, Image.Image]]:
    """Advance scroll-jacked/WebGL pages with real wheel input."""

    page.evaluate("() => window.scrollTo(0, 0)")
    try:
        page.mouse.move(720, max(80, viewport // 2))
        for _ in range(3):
            page.mouse.wheel(0, -max(700, int(viewport * 0.9)))
            page.wait_for_timeout(90)
    except Exception:
        pass
    settle_view(page, max(220, settle_ms // 2))

    frames: list[tuple[int, Image.Image]] = []
    wheel_delta = max(700, int(viewport * 0.92))
    for index in range(6):
        try:
            page.mouse.wheel(0, wheel_delta)
        except Exception:
            break
        settle_view(page, max(260, settle_ms))
        if index in (1, 3, 5):
            frames.append(((index + 1) * wheel_delta, capture_current_view(page)))
    return frames


def choose_middle_views(
    first: Image.Image,
    candidates: list[tuple[int, Image.Image]],
    max_y: int,
) -> list[tuple[int, Image.Image]]:
    if not candidates:
        return [(0, first), (0, first)]

    first_sig = signature(first)
    scored = []
    for y, image in candidates:
        sig = signature(image)
        score = distance(first_sig, sig) * 1.5 + complexity(sig)
        scored.append((score, y, image, sig))

    scored.sort(reverse=True, key=lambda item: item[0])
    first_pick = scored[0]
    remaining = [item for item in scored[1:] if item[1] != first_pick[1]]
    if not remaining:
        return [(first_pick[1], first_pick[2]), (first_pick[1], first_pick[2])]

    min_gap = max(1, int(max_y * 0.14))
    spaced = [item for item in remaining if abs(item[1] - first_pick[1]) >= min_gap]
    pool = spaced or remaining
    second_pick = max(
        pool,
        key=lambda item: (
            distance(first_pick[3], item[3]) * 1.35
            + distance(first_sig, item[3])
            + complexity(item[3]) * 0.45
        ),
    )
    return sorted(
        [(first_pick[1], first_pick[2]), (second_pick[1], second_pick[2])],
        key=lambda item: item[0],
    )


def capture_three_views(page, settle_ms: int) -> tuple[list[Image.Image], list[int]]:
    _, viewport, height = page_metrics(page)
    max_y = max(0, height - viewport)
    prime_lazy_content(page, max_y, viewport)
    first = capture_view(page, 0, settle_ms)

    candidates: list[tuple[int, Image.Image]] = []
    if max_y > max(80, viewport // 5):
        ratios = (0.18, 0.34, 0.5, 0.66, 0.82)
        for ratio in ratios:
            y = max(0, min(max_y, round(max_y * ratio)))
            candidates.append((y, capture_view(page, y, settle_ms)))

    middle = choose_middle_views(first, candidates, max_y)
    if max_y <= max(80, viewport // 5) or not distinct_enough(first, middle):
        wheel_frames = wheel_keyframes(page, viewport, settle_ms)
        if wheel_frames:
            candidates.extend(
                (max_y + position, frame) for position, frame in wheel_frames
            )
            middle = choose_middle_views(first, candidates, max(max_y, viewport * 6))

    if low_information(first):
        informative = [
            (position, frame)
            for position, frame in candidates
            if not low_information(frame)
        ]
        if informative:
            informative.sort(key=lambda item: item[0])
            first = informative[0][1]
            middle = choose_middle_views(first, candidates, max(max_y, viewport * 6))

    page.evaluate("() => window.scrollTo(0, 0)")
    return [first, middle[0][1], middle[1][1]], [0, middle[0][0], middle[1][0]]


def capture_three_views_fast(page, settle_ms: int) -> tuple[list[Image.Image], list[int]]:
    """Bounded capture for old/WebGL pages that never reach a stable idle state."""
    page.wait_for_timeout(max(1800, min(3200, settle_ms)))
    prepare_page_for_capture(page, min(650, settle_ms))
    _, viewport, height = page_metrics(page)
    max_y = max(0, height - viewport)
    positions = [0, round(max_y * 0.38), round(max_y * 0.76)] if max_y else [0, 0, 0]
    frames = [capture_view(page, y, 260) for y in positions]
    if max_y <= max(80, viewport // 5) or not distinct_enough(
        frames[0], list(zip(positions[1:], frames[1:]))
    ):
        wheel_frames = wheel_keyframes(page, viewport, 260)
        if wheel_frames:
            candidates = list(zip(positions[1:], frames[1:]))
            candidates.extend(wheel_frames)
            middle = choose_middle_views(
                frames[0],
                candidates,
                max(max_y, viewport * 6),
            )
            frames = [frames[0], middle[0][1], middle[1][1]]
            positions = [0, middle[0][0], middle[1][0]]
    page.evaluate("() => window.scrollTo(0, 0)")
    return frames, positions


def contain_on_background(
    canvas: Image.Image,
    image: Image.Image,
    box: tuple[int, int, int, int],
) -> None:
    x, y, width, height = box
    fitted = ImageOps.contain(image, (width, height), Image.Resampling.LANCZOS)
    px = x + (width - fitted.width) // 2
    py = y + (height - fitted.height) // 2
    canvas.paste(fitted, (px, py))


def compose_preview(frames: list[Image.Image], width: int, height: int) -> Image.Image:
    background = (12, 13, 17)
    canvas = Image.new("RGB", (width, height), background)
    gutter = max(6, round(width * 0.007))
    inner_w = width - gutter * 3
    inner_h = height - gutter * 2
    left_w = round(inner_w * 0.665)
    right_w = inner_w - left_w
    right_h = (inner_h - gutter) // 2

    contain_on_background(canvas, frames[0], (gutter, gutter, left_w, inner_h))
    contain_on_background(
        canvas,
        frames[1],
        (gutter * 2 + left_w, gutter, right_w, right_h),
    )
    contain_on_background(
        canvas,
        frames[2],
        (gutter * 2 + left_w, gutter * 2 + right_h, right_w, inner_h - right_h - gutter),
    )
    return canvas


def asset_frame(image: Image.Image, width: int = 1440, height: int = 900) -> Image.Image:
    frame = Image.new("RGB", (width, height), (12, 13, 17))
    fitted = ImageOps.contain(image.convert("RGB"), (width, height), Image.Resampling.LANCZOS)
    frame.paste(fitted, ((width - fitted.width) // 2, (height - fitted.height) // 2))
    return frame


def asset_fallback(folder: Path, args) -> tuple[bool, str]:
    extensions = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}
    reject_words = {
        "favicon", "icon", "logo", "sprite", "noise", "normal", "roughness",
        "metallic", "displace", "mask", "loader", "cursor", "arrow", "qr",
    }
    related_previews = {
        "008-donmolinico": [
            ROOT / "effects" / "015-donmolinico-products-carousel" / "preview.jpg",
            ROOT / "effects" / "016-donmolinico-litolata-trio" / "preview.jpg",
            ROOT / "effects" / "017-donmolinico-pandereta-duo" / "preview.jpg",
        ],
        "011-donmolinico-home": [
            ROOT / "effects" / "015-donmolinico-products-carousel" / "preview.jpg",
            ROOT / "effects" / "016-donmolinico-litolata-trio" / "preview.jpg",
            ROOT / "effects" / "017-donmolinico-pandereta-duo" / "preview.jpg",
        ],
    }
    candidates = []
    verification_preview = folder / "preview.png"
    if verification_preview.exists():
        candidates.append((10**13 + verification_preview.stat().st_size, verification_preview))
    for path in related_previews.get(folder.name, []):
        if path.exists():
            candidates.append((10**12 + path.stat().st_size, path))
    for path in folder.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in extensions:
            continue
        lowered = path.name.lower()
        if lowered.startswith("preview."):
            continue
        if any(word in lowered for word in reject_words):
            continue
        try:
            size = path.stat().st_size
        except OSError:
            continue
        if size >= 20_000:
            candidates.append((size, path))

    candidates.sort(reverse=True, key=lambda item: item[0])
    chosen: list[Image.Image] = []
    chosen_sigs: list[Image.Image] = []
    for _, path in candidates[:240]:
        try:
            with Image.open(path) as raw:
                raw.seek(0)
                image = ImageOps.exif_transpose(raw).convert("RGB")
                width, height = image.size
                if width < 480 or height < 280 or width / max(1, height) > 4.5 or height / max(1, width) > 4.5:
                    continue
                sig = signature(image)
                if chosen_sigs and min(distance(sig, old) for old in chosen_sigs) < 4.0:
                    continue
                chosen.append(image.copy())
                chosen_sigs.append(sig)
                if len(chosen) == 3:
                    break
        except Exception:
            continue

    if len(chosen) < 3:
        videos = []
        for path in folder.rglob("*"):
            if path.is_file() and path.suffix.lower() in {".mp4", ".webm", ".mov", ".m4v"}:
                try:
                    videos.append((path.stat().st_size, path))
                except OSError:
                    pass
        videos.sort(reverse=True, key=lambda item: item[0])
        for _, path in videos[:8]:
            try:
                result = subprocess.run(
                    [
                        "ffmpeg", "-loglevel", "error", "-ss", "1", "-i", str(path),
                        "-frames:v", "1", "-vf", "scale=1440:-2", "-f", "image2pipe",
                        "-vcodec", "png", "pipe:1",
                    ],
                    capture_output=True,
                    timeout=15,
                    check=False,
                )
                if result.returncode != 0 or not result.stdout:
                    continue
                with Image.open(io.BytesIO(result.stdout)) as raw:
                    image = raw.convert("RGB")
                    sig = signature(image)
                    if chosen_sigs and min(distance(sig, old) for old in chosen_sigs) < 4.0:
                        continue
                    chosen.append(image.copy())
                    chosen_sigs.append(sig)
                    if len(chosen) == 3:
                        break
            except Exception:
                continue

    if not chosen:
        title = folder.name
        try:
            title = json.loads((folder / "meta.json").read_text(encoding="utf-8-sig")).get("title") or title
        except Exception:
            pass
        placeholder = Image.new("RGB", (1440, 900), (24, 26, 33))
        draw = ImageDraw.Draw(placeholder)
        draw.text((80, 410), title, fill=(232, 233, 238))
        chosen = [placeholder]

    while len(chosen) < 3:
        chosen.append(chosen[-1].copy())
    frames = [asset_frame(image) for image in chosen[:3]]
    preview = compose_preview(frames, args.width, args.height)
    output = folder / "preview.jpg"
    preview.save(output, "JPEG", quality=args.quality, optimize=True, progressive=True)
    return True, f"asset fallback, {output.stat().st_size / 1024:.0f} KB"


def capture_one(page, base_url: str, folder: Path, args) -> tuple[bool, str]:
    url = f"{base_url}/designs/{folder.name}/index.html"
    output = folder / "preview.jpg"
    try:
        page.goto(
            url,
            wait_until="domcontentloaded",
            timeout=args.timeout,
        )
        # Some mirrored SPAs rewrite "/" immediately after DOMContentLoaded.
        # Let that navigation settle, then retry style injection instead of
        # treating a transient destroyed execution context as a failed page.
        page.wait_for_timeout(1200)
        capture_css = """
              #sc2-overlay { display: none !important; }
              #loader,
              #preloader,
              .preloader,
              .transition-pages,
              .page-loader,
              .page-transition,
              .loading-screen,
              .loader.before_exit,
              .loader.before-exit {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
              html { scroll-behavior: auto !important; }
            """
        style_ready = False
        for _ in range(3):
            try:
                page.add_style_tag(content=capture_css)
                style_ready = True
                break
            except Exception:
                page.wait_for_timeout(700)
        if not style_ready:
            # Dynamic loader removal below remains available even if the
            # document navigated too often to accept a persistent style tag.
            page.wait_for_timeout(500)

        body_text = ""
        try:
            body_text = page.evaluate(
                "() => (document.body?.innerText || '').slice(0, 12000).toLowerCase()"
            )
        except Exception:
            page.wait_for_timeout(700)
        if re.search(r"\b(page not found|404 not found|error 404)\b", body_text):
            ok, detail = asset_fallback(folder, args)
            return ok, f"error page detected; {detail}"

        last_error: Exception | None = None
        for attempt in range(2):
            try:
                if args.fast:
                    frames, positions = capture_three_views_fast(
                        page, args.initial_settle
                    )
                else:
                    wait_until_stable(page, args.initial_settle)
                    prepare_page_for_capture(page, args.settle)
                    frames, positions = capture_three_views(page, args.settle)
                break
            except Exception as exc:
                last_error = exc
                if "execution context was destroyed" not in str(exc).lower() or attempt:
                    raise
                page.wait_for_timeout(1200)
                try:
                    page.add_style_tag(content=capture_css)
                except Exception:
                    pass
        else:
            raise last_error or RuntimeError("capture did not produce frames")
        if all(low_information(frame) for frame in frames):
            ok, detail = asset_fallback(folder, args)
            return ok, f"all captured frames were low-information; {detail}"
        preview = compose_preview(frames, args.width, args.height)
        output.parent.mkdir(parents=True, exist_ok=True)
        preview.save(
            output,
            "JPEG",
            quality=args.quality,
            optimize=True,
            progressive=True,
        )
        return True, f"{args.width}x{args.height}, y={positions}, {output.stat().st_size / 1024:.0f} KB"
    except Exception as exc:
        return False, str(exc)


def standard_preview_exists(folder: Path, width: int, height: int) -> bool:
    output = folder / "preview.jpg"
    try:
        with Image.open(output) as preview:
            return preview.size == (width, height)
    except (OSError, ValueError):
        return False


def isolated_capture_command(folder: Path, args) -> list[str]:
    command = [
        sys.executable,
        str(Path(__file__).resolve()),
        "--capture-worker",
        "--only",
        folder.name,
        "--width",
        str(args.width),
        "--height",
        str(args.height),
        "--quality",
        str(args.quality),
        "--viewport-width",
        str(args.viewport_width),
        "--viewport-height",
        str(args.viewport_height),
        "--timeout",
        str(args.timeout),
        "--initial-settle",
        str(args.initial_settle),
        "--settle",
        str(args.settle),
        "--port",
        str(args.port if args.jobs == 1 else 0),
    ]
    if args.fast:
        command.append("--fast")
    if args.no_js:
        command.append("--no-js")
    return command


def isolated_capture_detail(stdout: str) -> str:
    lines = [line.strip() for line in stdout.splitlines() if line.strip()]
    capture_lines = [line for line in lines if re.match(r"^\[\d+/\d+\]", line)]
    if capture_lines:
        return capture_lines[-1].split(": ", 1)[-1]
    return lines[-1] if lines else "no output"


def run_isolated_capture(folder: Path, args) -> tuple[bool, str]:
    """Capture one folder with a hard process budget, then fall back to assets."""

    command = isolated_capture_command(folder, args)
    try:
        result = subprocess.run(
            command,
            cwd=ROOT,
            capture_output=True,
            text=True,
            timeout=args.process_timeout,
            check=False,
        )
        if result.returncode == 0 and (folder / "preview.jpg").exists():
            return True, isolated_capture_detail(result.stdout)
        reason = isolated_capture_detail(result.stdout)
        if result.stderr.strip():
            reason = result.stderr.strip().splitlines()[-1]
        reason = f"capture worker failed ({result.returncode}): {reason}"
    except subprocess.TimeoutExpired:
        reason = f"capture worker timed out after {args.process_timeout}s"
    except Exception as exc:
        reason = f"capture worker error: {exc}"

    try:
        ok, detail = asset_fallback(folder, args)
    except Exception as exc:
        return False, f"{reason}; asset fallback failed: {exc}"
    return ok, f"{reason}; {detail}"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--only", help="capture one Design folder")
    parser.add_argument(
        "--folder-list",
        help="UTF-8 text file containing one Design folder per line",
    )
    parser.add_argument("--skip-existing", action="store_true", help="leave existing preview.jpg files untouched")
    parser.add_argument(
        "--skip-standard",
        action="store_true",
        help="skip only preview.jpg files already matching --width and --height",
    )
    parser.add_argument(
        "--batch-isolated",
        action="store_true",
        help="capture each Design in a restartable child process (now the default)",
    )
    parser.add_argument("--jobs", type=int, default=1, help="number of isolated capture workers")
    parser.add_argument("--process-timeout", type=int, default=70, help="maximum seconds for one isolated Design")
    parser.add_argument("--capture-worker", action="store_true", help=argparse.SUPPRESS)
    parser.add_argument("--fast", action="store_true", help="use a short non-idle fallback capture")
    parser.add_argument("--no-js", action="store_true", help="disable JavaScript for a last-resort static capture")
    parser.add_argument("--asset-fallback", action="store_true", help="build collages from local image assets only")
    parser.add_argument("--gallery-shot", help="capture the Design gallery itself for visual QA")
    parser.add_argument("--audit-sheet", help="build a labelled contact sheet of all Design previews")
    parser.add_argument("--shard-index", type=int, default=0, help="zero-based shard number")
    parser.add_argument("--shard-count", type=int, default=1, help="number of parallel shards")
    parser.add_argument("--port", type=int, default=0)
    parser.add_argument("--width", type=int, default=1200)
    parser.add_argument("--height", type=int, default=750)
    parser.add_argument("--quality", type=int, default=80)
    parser.add_argument("--viewport-width", type=int, default=1440)
    parser.add_argument("--viewport-height", type=int, default=900)
    parser.add_argument("--timeout", type=int, default=45000)
    parser.add_argument("--initial-settle", type=int, default=4500)
    parser.add_argument("--settle", type=int, default=700)
    args = parser.parse_args()

    if args.audit_sheet:
        items = json.loads((DESIGNS / "designs.json").read_text(encoding="utf-8-sig"))
        columns = 4
        tile_width = 300
        image_height = 188
        label_height = 34
        rows = (len(items) + columns - 1) // columns
        sheet = Image.new("RGB", (columns * tile_width, rows * (image_height + label_height)), (14, 15, 19))
        draw = ImageDraw.Draw(sheet)
        for index, item in enumerate(items):
            column = index % columns
            row = index // columns
            x = column * tile_width
            y = row * (image_height + label_height)
            path = DESIGNS / item["folder"] / "preview.jpg"
            try:
                with Image.open(path) as raw:
                    preview = ImageOps.fit(raw.convert("RGB"), (tile_width, image_height), Image.Resampling.LANCZOS)
            except Exception:
                preview = Image.new("RGB", (tile_width, image_height), (70, 20, 20))
            sheet.paste(preview, (x, y))
            label = f"{item['folder']}  {item.get('title', '')}"
            draw.text((x + 7, y + image_height + 8), label[:43], fill=(225, 227, 234))
        output = Path(args.audit_sheet)
        output.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(output, "JPEG", quality=88, optimize=True)
        page_rows = 6
        page_height = page_rows * (image_height + label_height)
        page_count = (rows + page_rows - 1) // page_rows
        for page_index in range(page_count):
            top = page_index * page_height
            bottom = min(sheet.height, top + page_height)
            page_output = output.with_name(f"{output.stem}-{page_index + 1:02d}{output.suffix}")
            sheet.crop((0, top, sheet.width, bottom)).save(page_output, "JPEG", quality=90, optimize=True)
        print(f"audit sheet: {output} ({sheet.width}x{sheet.height})")
        return 0

    if args.gallery_shot:
        server, base_url = start_server(args.port)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(headless=True)
                page = browser.new_page(
                    viewport={"width": args.viewport_width, "height": args.viewport_height}
                )
                page.goto(f"{base_url}/designs/", wait_until="domcontentloaded", timeout=args.timeout)
                page.wait_for_timeout(1800)
                gallery_height = page.evaluate("() => document.documentElement.scrollHeight")
                for y in range(0, gallery_height, max(320, int(args.viewport_height * 0.8))):
                    page.evaluate("y => window.scrollTo(0, y)", y)
                    page.wait_for_timeout(70)
                page.evaluate("() => window.scrollTo(0, 0)")
                page.wait_for_timeout(700)
                first_preview = page.locator('.preview').first
                box = first_preview.bounding_box()
                if box:
                    page.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
                    page.mouse.wheel(0, 560)
                    page.wait_for_timeout(220)
                wheel_scroll = page.evaluate("() => window.scrollY")
                page.evaluate("() => window.scrollTo(0, 0)")
                state = page.evaluate(
                    """() => ({
                      cards: document.querySelectorAll('.card').length,
                      images: document.querySelectorAll('.preview img').length,
                      broken: [...document.querySelectorAll('.preview img')].filter(img => !img.complete || !img.naturalWidth).length,
                      brokenSrc: [...document.querySelectorAll('.preview img')].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')),
                      iframes: document.querySelectorAll('.preview iframe').length,
                      openOverlays: document.querySelectorAll('.preview__open').length,
                      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
                    })"""
                )
                state["wheelScroll"] = wheel_scroll
                Path(args.gallery_shot).parent.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=args.gallery_shot, full_page=False)
                print(json.dumps(state, ensure_ascii=False))
                browser.close()
        finally:
            server.shutdown()
        return 0

    if args.shard_count < 1 or not 0 <= args.shard_index < args.shard_count:
        parser.error("--shard-index must be within --shard-count")
    if args.jobs < 1:
        parser.error("--jobs must be at least 1")
    if args.process_timeout < 1:
        parser.error("--process-timeout must be at least 1")
    if args.only and args.folder_list:
        parser.error("--only and --folder-list cannot be used together")
    if args.folder_list:
        list_path = Path(args.folder_list)
        if not list_path.is_absolute():
            list_path = ROOT / list_path
        names = [
            line.strip()
            for line in list_path.read_text(encoding="utf-8-sig").splitlines()
            if line.strip() and not line.lstrip().startswith("#")
        ]
        folders = []
        for name in names:
            folder = DESIGNS / name
            if not (folder / "index.html").exists():
                parser.error(f"Design folder from --folder-list is invalid: {name}")
            if (folder / ".skip-index").exists():
                continue
            folders.append(folder)
    else:
        folders = design_dirs(args.only)
    if args.skip_existing:
        folders = [folder for folder in folders if not (folder / "preview.jpg").exists()]
    if args.skip_standard:
        folders = [
            folder
            for folder in folders
            if not standard_preview_exists(folder, args.width, args.height)
        ]
    if not args.only and args.shard_count > 1:
        folders = folders[args.shard_index :: args.shard_count]
    # Freeze selection before starting workers so concurrent output cannot
    # affect sharding or skip decisions.
    folders = tuple(folders)

    if args.asset_fallback:
        failures = 0
        print(f"building {len(folders)} local-asset fallback(s)", flush=True)
        for index, folder in enumerate(folders, 1):
            try:
                ok, detail = asset_fallback(folder, args)
            except Exception as exc:
                ok, detail = False, str(exc)
            failures += 0 if ok else 1
            print(f"[{index:03d}/{len(folders):03d}] {'ok' if ok else 'warn'} {folder.name}: {detail}", flush=True)
        return 0 if failures == 0 else 1

    if not args.capture_worker:
        failures = 0
        total = len(folders)
        print(
            f"capturing {total} Design(s) in isolated processes "
            f"(jobs={args.jobs}, timeout={args.process_timeout}s)",
            flush=True,
        )
        results: dict[int, tuple[bool, str]] = {}
        with ThreadPoolExecutor(max_workers=args.jobs) as executor:
            pending = {
                executor.submit(run_isolated_capture, folder, args): index
                for index, folder in enumerate(folders, 1)
            }
            for future in as_completed(pending):
                index = pending[future]
                try:
                    results[index] = future.result()
                except Exception as exc:
                    results[index] = (False, f"isolated runner error: {exc}")
                ok, detail = results[index]
                failures += 0 if ok else 1
                folder = folders[index - 1]
                print(
                    f"[{index:03d}/{total:03d}] {'ok' if ok else 'warn'} "
                    f"{folder.name}: {detail}",
                    flush=True,
                )
        print(f"done with {failures} warning(s)" if failures else "done")
        return 0 if failures == 0 else 1

    server, base_url = start_server(args.port)
    print(f"preview server: {base_url}")
    print(f"capturing {len(folders)} Design(s)")
    failures = 0
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                headless=True,
                args=[
                    "--enable-webgl",
                    "--ignore-gpu-blocklist",
                    "--use-angle=swiftshader",
                    "--enable-unsafe-swiftshader",
                ],
            )
            context = browser.new_context(
                viewport={"width": args.viewport_width, "height": args.viewport_height},
                device_scale_factor=1,
                ignore_https_errors=True,
                java_script_enabled=not args.no_js,
            )

            page = context.new_page()
            page.set_default_timeout(args.timeout)
            for index, folder in enumerate(folders, 1):
                ok, message = capture_one(page, base_url, folder, args)
                failures += 0 if ok else 1
                status = "ok" if ok else "warn"
                print(
                    f"[{index:03d}/{len(folders):03d}] {status} {folder.name}: {message}",
                    flush=True,
                )
            browser.close()
    finally:
        server.shutdown()

    print(f"done with {failures} warning(s)" if failures else "done")
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
