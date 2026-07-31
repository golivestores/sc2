#!/usr/bin/env python3
"""Replace failed/loading gallery captures with clean, local visual keyframes.

This is a deterministic fallback for mirrors whose runtime cannot expose stable
scroll frames in automated Chromium. It keeps the 001 card composition:
one large lead frame on the left and two distinct supporting frames on the
right. Sources are restricted to the local mirror, its extracted Effects, and
previously verified page screenshots.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageOps, ImageStat


ROOT = Path(__file__).resolve().parent
DESIGNS = ROOT / "designs"
EFFECTS = ROOT / "effects"
TEMP_FRAMES = ROOT / ".tmp-rescue-frames"
KEYFRAME_ROOT = ROOT / ".tmp-keyframes"
BACKGROUND = (14, 15, 18)

FLAGGED = [
    "002-shift5",
    "005-goodlifemeds",
    "006-flowerknows",
    "012-minamassoud",
    "013-more-nutrition",
    "014-floema",
    "016-theunknown",
    "020-fromanother",
    "021-cravburgers",
    "022-ukbathroomstore",
    "025-sofihealth",
    "026-vectrfl",
    "027-gmxdigital",
    "030-hut8",
    "031-serverobotics",
    "032-loviz-cargo-bike",
    "033-skf-fighting-friction",
    "038-festivent",
    "040-dontboardme",
    "042-redis",
    "043-wero-merchant",
    "044-cartier",
    "047-lv-collectibles",
    "048-penelope-care",
    "051-vessi",
    "053-nymphaicosmetics",
    "056-mypifi",
    "058-heyhanni",
    "059-maisonlouismarie",
    "060-flamingoestate",
    "061-dsanddurga",
    "063-sloshseltzer",
    "064-ciaoenergy",
    "065-exebenus",
    "068-moonbird",
    "069-ouraring",
    "070-oura-ring-5",
    "073-wixstudio-space",
    "075-pasqua",
    "077-sigma-software-labs",
    "079-fasterdisplays",
    "081-magische-spiegelungen",
    "082-zerolimits",
    "083-accentboissons",
    "084-emons",
    "085-razorpay-sprint",
    "086-terminal-industries",
    "087-valentime",
    "088-zero-university",
    "090-flowty",
    "091-podium",
    "093-ducati-superleggera-v4-centenario",
    "095-evian-celebrating200",
    "096-haoqi",
    "098-lxtrendship",
    "100-risk",
    "101-empiremetaverse",
    "103-ojiholdings-brandbook",
    "105-noomo-storytelling",
    "109-ricardochance",
    "110-experiencethebestyou",
    "113-webfactorypro",
    "115-ellusioncreative",
    "116-to-portfolio",
    "117-voxelo",
    "Floema",
]

# Verified stable, loaded page screenshots. More entries can be added after
# visual QA without changing the selection algorithm.
STABLE_PREVIEW_PNG = {
    "016-theunknown",
    "020-fromanother",
    "021-cravburgers",
    "022-ukbathroomstore",
    "030-hut8",
    "031-serverobotics",
    "032-loviz-cargo-bike",
    "033-skf-fighting-friction",
    "014-floema",
    "047-lv-collectibles",
    "051-vessi",
    "053-nymphaicosmetics",
    "056-mypifi",
    "058-heyhanni",
    "061-dsanddurga",
    "065-exebenus",
    "073-wixstudio-space",
    "075-pasqua",
    "081-magische-spiegelungen",
    "082-zerolimits",
    "083-accentboissons",
    "084-emons",
    "087-valentime",
    "088-zero-university",
    "090-flowty",
    "091-podium",
    "095-evian-celebrating200",
    "096-haoqi",
    "098-lxtrendship",
    "101-empiremetaverse",
    "103-ojiholdings-brandbook",
    "105-noomo-storytelling",
    "109-ricardochance",
    "110-experiencethebestyou",
    "113-webfactorypro",
    "115-ellusioncreative",
    "116-to-portfolio",
    "117-voxelo",
}

# These current left panels were visually verified as clean and stable.
CURRENT_LEFT = {
    "002-shift5",
    "043-wero-merchant",
    "056-mypifi",
    "059-maisonlouismarie",
    "061-dsanddurga",
    "063-sloshseltzer",
    "073-wixstudio-space",
    "081-magische-spiegelungen",
    "085-razorpay-sprint",
    "087-valentime",
    "093-ducati-superleggera-v4-centenario",
    "095-evian-celebrating200",
    "103-ojiholdings-brandbook",
    "110-experiencethebestyou",
    "113-webfactorypro",
    "Floema",
}

# Supporting panels from the current collage that survived visual review.
CURRENT_RIGHTS = {
    "005-goodlifemeds": (1, 2),
    "012-minamassoud": (2,),
    "013-more-nutrition": (1, 2),
    "016-theunknown": (1,),
    "022-ukbathroomstore": (2,),
    "025-sofihealth": (1, 2),
    "026-vectrfl": (1, 2),
    "030-hut8": (1, 2),
    "053-nymphaicosmetics": (1, 2),
    "056-mypifi": (2,),
    "061-dsanddurga": (1,),
    "077-sigma-software-labs": (1,),
    "083-accentboissons": (1, 2),
    "085-razorpay-sprint": (2,),
    "091-podium": (2,),
    "100-risk": (1, 2),
    "101-empiremetaverse": (1, 2),
    "103-ojiholdings-brandbook": (1,),
    "109-ricardochance": (1, 2),
    "115-ellusioncreative": (1,),
    "117-voxelo": (1,),
    "Floema": (1,),
}

EFFECT_PREVIEWS = {
    "002-shift5": [
        "004-shift5-categories",
        "005-shift5-news",
    ],
    "005-goodlifemeds": [
        "010-glm-weight-loss-carousel",
        "011-glm-daily-wellness-carousel",
        "012-glm-testimonials",
        "013-glm-how-it-works",
    ],
    "006-flowerknows": ["014-flowerknows-bestsellers"],
    "012-minamassoud": ["020-minamassoud-countries"],
    "016-theunknown": [
        "023-theunknown-illuminate-hero",
        "024-theunknown-store",
    ],
    "020-fromanother": ["030-fromanother-water-ripple-cards"],
    "025-sofihealth": [
        "036-sofi-phone-walkthrough",
        "037-sofi-bento-grid",
    ],
    "026-vectrfl": [
        "038-vectr-features-scroll-reveal",
        "039-vectr-faq-accordion",
        "040-vectr-footer-nav",
    ],
    "027-gmxdigital": [
        "041-gmx-method-process-cards",
        "042-gmx-portfolio-drag-carousel",
        "043-gmx-impacto-stats",
        "044-gmx-clientes-trajectory",
    ],
    "044-cartier": ["047-cartier-watch-rotation"],
    "047-lv-collectibles": ["048-lv-collectibles-3d"],
}

# Final visual-QA overrides. Each entry is the loaded first screen followed by
# two genuine page states (or crops of a verified page screenshot). This keeps
# raw WebGL textures, loaders, cookie curtains, and duplicate animation frames
# out of the gallery.
MANUAL_LAYOUTS = {
    "012-minamassoud": [
        {"source": "root:.tmp-keyframes/012-minamassoud/0.png"},
        {"source": "root:.tmp-keyframes/012-minamassoud/1.png"},
        {
            "source": "effect:020-minamassoud-countries/preview.jpg",
            "crop": (0.00, 0.00, 0.50, 0.50),
        },
    ],
    "020-fromanother": [
        {"source": "root:.tmp-keyframes/020-fromanother/0.png"},
        {"source": "root:.tmp-keyframes/020-fromanother/1.png"},
        {"source": "root:.tmp-keyframes/020-fromanother/2.png"},
    ],
    "021-cravburgers": [
        {
            "source": "root:.tmp-keyframes/021-cravburgers/0.png",
            "crop": (0.12, 0.00, 0.88, 0.79),
        },
        {
            "source": "root:.tmp-keyframes/021-cravburgers/0.png",
            "crop": (0.00, 0.02, 0.58, 0.78),
        },
        {
            "source": "root:.tmp-keyframes/021-cravburgers/0.png",
            "crop": (0.42, 0.02, 1.00, 0.78),
        },
    ],
    "022-ukbathroomstore": [
        {"source": "root:.tmp-keyframes/022-ukbathroomstore/0.png"},
        {"source": "root:.tmp-keyframes/022-ukbathroomstore/1.png"},
        {"source": "root:.tmp-keyframes/022-ukbathroomstore/2.png"},
    ],
    "027-gmxdigital": [
        {
            "source": "root:.tmp-keyframes/027-gmxdigital/1.png",
            "masks": [((0.00, 0.88, 1.00, 1.00), (4, 6, 16))],
        },
        {
            "source": "effect:042-gmx-portfolio-drag-carousel/preview.jpg",
            "crop": (0.504, 0.245, 0.992, 0.754),
        },
        {
            "source": "effect:043-gmx-impacto-stats/preview.jpg",
            "crop": (0.504, 0.245, 0.992, 0.754),
        },
    ],
    "038-festivent": [
        {"source": "root:.tmp-keyframes/038-festivent/0.png"},
        {"source": "root:.tmp-keyframes/038-festivent/1.png"},
        {"source": "root:.tmp-keyframes/038-festivent/2.png"},
    ],
    "042-redis": [
        {
            "source": "root:.tmp-keyframes/042-redis/0.png",
            "masks": [((0.75, 0.68, 1.00, 1.00), (0, 0, 0))],
        },
        {
            "source": "root:.tmp-keyframes/042-redis/1.png",
            "masks": [((0.75, 0.68, 1.00, 1.00), (0, 0, 0))],
        },
        {
            "source": "root:.tmp-keyframes/042-redis/2.png",
            "masks": [((0.75, 0.68, 1.00, 1.00), (0, 0, 0))],
        },
    ],
    "048-penelope-care": [
        {"source": "root:.tmp-keyframes/048-penelope-care/0.png"},
        {"source": "root:.tmp-keyframes/048-penelope-care/1.png"},
        {"source": "root:.tmp-keyframes/048-penelope-care/2.png"},
    ],
    "056-mypifi": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.014, 0.625, 0.986)},
        {"source": "design:preview.png", "crop": (0.375, 0.014, 1.00, 0.986)},
    ],
    "064-ciaoenergy": [
        {"source": "root:.tmp-keyframes/064-ciaoenergy/0.png"},
        {"source": "root:.tmp-keyframes/064-ciaoenergy/1.png"},
        {"source": "root:.tmp-keyframes/064-ciaoenergy/2.png"},
    ],
    "073-wixstudio-space": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.00, 0.5781, 0.9028)},
        {"source": "design:preview.png", "crop": (0.4219, 0.0972, 1.00, 1.00)},
    ],
    "075-pasqua": [
        {"source": "design:preview.png"},
        {"source": "design:video/manifesto-poster.jpg"},
        {"source": "design:images/shop.jpg"},
    ],
    "081-magische-spiegelungen": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.02, 0.5729, 0.98)},
        {"source": "design:preview.png", "crop": (0.4271, 0.02, 1.00, 0.98)},
    ],
    "082-zerolimits": [
        {"source": "design:preview.png"},
        {
            "source": "video:zerolimits/assets/videos/alicia.webm",
            "time": 33.54,
        },
        {
            "source": "video:zerolimits/assets/videos/jasmine.mp4",
            "time": 60.66,
        },
    ],
    "085-razorpay-sprint": [
        {"source": "design:preview.jpg", "crop_px": (8, 0, 790, 750)},
        {
            "source": (
                "design:assets/cdn.prod.website-files.com/"
                "6965e6515fb6b18e928e6d0f/"
                "69afeca4cea2f7f6f60cbe15_Aneesh_Finance.png"
            ),
            "crop": (0.136, 0.00, 0.711, 1.00),
        },
        {
            "source": (
                "design:assets/cdn.prod.website-files.com/"
                "6965e6515fb6b18e928e6d0f/"
                "69afea8a39c5090385a90f24_Anand_D2C.webp"
            ),
            "crop": (0.109, 0.00, 0.684, 1.00),
        },
    ],
    "087-valentime": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.08, 0.22, 0.48, 0.88)},
        {"source": "design:preview.png", "crop": (0.52, 0.22, 0.92, 0.88)},
    ],
    "090-flowty": [
        {"source": "design:preview.png"},
        {"source": "design:assets/flowty.co/img/needs-tablet.png"},
        {"source": "design:assets/flowty.co/img/flow-tablet.png"},
    ],
    "095-evian-celebrating200": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.268, 0.00, 0.732, 0.65)},
        {"source": "design:preview.png", "crop": (0.268, 0.35, 0.732, 1.00)},
    ],
    "098-lxtrendship": [
        {"source": "design:preview.png"},
        {
            "source": (
                "design:assets/www.lxtrendship.com/images/main/"
                "img_syenergy_carousel_1-pc.webp"
            )
        },
        {
            "source": (
                "design:assets/www.lxtrendship.com/images/main/"
                "img_syenergy_carousel_3-pc.webp"
            )
        },
    ],
    "103-ojiholdings-brandbook": [
        {"source": "design:preview.png"},
        {"source": "design:preview.jpg", "crop_px": (798, 0, 1192, 345)},
        {"source": "design:preview.png", "crop": (0.25, 0.30, 0.75, 1.00)},
    ],
    "105-noomo-storytelling": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.00, 0.36, 1.00)},
        {"source": "design:preview.png", "crop": (0.64, 0.00, 1.00, 1.00)},
    ],
    "110-experiencethebestyou": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.00, 0.50, 0.70)},
        {"source": "design:preview.png", "crop": (0.50, 0.30, 1.00, 1.00)},
    ],
    "113-webfactorypro": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.075, 0.55, 0.925)},
        {"source": "design:preview.png", "crop": (0.45, 0.075, 1.00, 0.925)},
    ],
    "116-to-portfolio": [
        {"source": "design:preview.png"},
        {"source": "design:preview.png", "crop": (0.00, 0.00, 0.50, 0.78)},
        {"source": "design:preview.png", "crop": (0.50, 0.22, 1.00, 1.00)},
    ],
    "117-voxelo": [
        {"source": "design:preview.png"},
        {"source": "design:preview.jpg", "crop_px": (798, 0, 1192, 345)},
        {"source": "design:images/vox86-how-it-works-capture.jpg"},
    ],
    "Floema": [
        {"source": "design:homepage-full.png", "crop_px": (0, 0, 2880, 1620)},
        {"source": "design:preview.jpg", "crop_px": (798, 0, 1192, 345)},
        {
            "source": "design:homepage-full.png",
            "crop_px": (0, 23300, 2880, 25822),
        },
    ],
}

RASTER_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}
VIDEO_EXTENSIONS = {".mp4", ".webm", ".mov", ".m4v"}
BAD_NAME = re.compile(
    r"logo|icon|favicon|sprite|cursor|loader|loading|preload|noise|texture|"
    r"normal|roughness|metalness|specular|mask|gradient|pattern|atlas|mapcan",
    re.IGNORECASE,
)
GOOD_NAME = re.compile(
    r"hero|desktop|banner|poster|feature|gallery|section|home|cover|campaign|"
    r"product|team|story|slide|frame",
    re.IGNORECASE,
)


@dataclass
class Candidate:
    label: str
    path: Path | None = None
    image: Image.Image | None = None
    priority: int = 0
    score: float = 0

    def open(self) -> Image.Image:
        if self.image is not None:
            return self.image.copy()
        if self.path is None:
            raise ValueError(f"{self.label} has no image source")
        with Image.open(self.path) as source:
            try:
                source.seek(0)
            except EOFError:
                pass
            return ImageOps.exif_transpose(source).convert("RGB")


def safe_image(path: Path) -> Image.Image | None:
    try:
        with Image.open(path) as source:
            try:
                source.seek(0)
            except EOFError:
                pass
            return ImageOps.exif_transpose(source).convert("RGB")
    except Exception:
        return None


def register_browser_keyframe_layouts() -> list[str]:
    """Prefer complete, decodable browser captures over fallback assets."""
    folders: list[str] = []
    if not KEYFRAME_ROOT.is_dir():
        return folders

    for directory in sorted(KEYFRAME_ROOT.iterdir(), key=lambda path: path.name):
        if not directory.is_dir() or not (DESIGNS / directory.name).is_dir():
            continue
        frames = [directory / f"{index}.png" for index in range(3)]
        if any(safe_image(frame) is None for frame in frames):
            continue
        MANUAL_LAYOUTS[directory.name] = [
            {
                "source": (
                    f"root:.tmp-keyframes/{directory.name}/{index}.png"
                )
            }
            for index in range(3)
        ]
        folders.append(directory.name)
    return folders


BROWSER_KEYFRAME_FOLDERS = register_browser_keyframe_layouts()


def source_path(folder: str, source: str) -> Path:
    prefix, relative = source.split(":", 1)
    if prefix == "root":
        return ROOT / relative
    if prefix == "design":
        return DESIGNS / folder / relative
    if prefix == "effect":
        return EFFECTS / relative
    if prefix == "video":
        return DESIGNS / folder / relative
    raise ValueError(f"unknown manual source prefix: {prefix}")


def extract_manual_video_frame(
    folder: str,
    source: str,
    timestamp: float,
    index: int,
) -> Path:
    video = source_path(folder, source)
    target_dir = TEMP_FRAMES / folder
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"manual-{index}.jpg"
    subprocess.run(
        [
            "ffmpeg",
            "-loglevel",
            "error",
            "-ss",
            f"{timestamp:.3f}",
            "-i",
            str(video),
            "-frames:v",
            "1",
            "-q:v",
            "2",
            "-y",
            str(target),
        ],
        check=True,
        timeout=60,
    )
    return target


def manual_candidate(folder: str, spec: dict, index: int) -> Candidate:
    source = spec["source"]
    path = source_path(folder, source)
    if source.startswith("video:"):
        path = extract_manual_video_frame(
            folder,
            source,
            float(spec["time"]),
            index,
        )
    image = safe_image(path)
    if image is None:
        raise ValueError(f"cannot open manual source: {path}")

    crop_px = spec.get("crop_px")
    if crop_px is not None:
        image = image.crop(tuple(int(value) for value in crop_px))

    crop = spec.get("crop")
    if crop is not None:
        width, height = image.size
        left, top, right, bottom = crop
        image = image.crop(
            (
                round(left * width),
                round(top * height),
                round(right * width),
                round(bottom * height),
            )
        )

    for box, color in spec.get("masks", []):
        width, height = image.size
        left, top, right, bottom = box
        image.paste(
            tuple(color),
            (
                round(left * width),
                round(top * height),
                round(right * width),
                round(bottom * height),
            ),
        )

    return Candidate(
        label=f"manual:{source}:{index}",
        image=image,
        priority=200 - index,
        score=200 - index,
    )


def manual_candidates(
    folder: str,
) -> tuple[Candidate, Candidate, Candidate] | None:
    specs = MANUAL_LAYOUTS.get(folder)
    if specs is None:
        return None
    if len(specs) != 3:
        raise ValueError(f"manual layout for {folder} must have three sources")
    selected = tuple(
        manual_candidate(folder, spec, index)
        for index, spec in enumerate(specs)
    )
    return selected


def signature(image: Image.Image) -> tuple[float, ...]:
    sample = ImageOps.fit(image.convert("RGB"), (24, 14), method=Image.Resampling.BILINEAR)
    return tuple(float(value) for pixel in sample.getdata() for value in pixel)


def signature_difference(first: tuple[float, ...], second: tuple[float, ...]) -> float:
    return sum(abs(a - b) for a, b in zip(first, second)) / len(first)


def image_score(path: Path, image: Image.Image) -> float:
    width, height = image.size
    if width < 500 or height < 280:
        return -1
    aspect = width / max(height, 1)
    aspect_penalty = abs(math.log(max(aspect, 0.05) / (16 / 9)))
    megapixels = min(width * height / 1_000_000, 12)
    name_bonus = 3.5 if GOOD_NAME.search(path.name) else 0
    return megapixels * 2.5 + name_bonus - aspect_penalty * 2


def current_panel_candidates(folder: str) -> list[Candidate]:
    preview = DESIGNS / folder / "preview.jpg"
    image = safe_image(preview)
    if image is None or image.size != (1200, 750):
        return []
    panels = []
    if folder in CURRENT_LEFT:
        panels.append(
            Candidate(
                label="current:left",
                image=image.crop((8, 0, 790, 750)),
                priority=120,
                score=120,
            )
        )
    for panel_index in CURRENT_RIGHTS.get(folder, ()):
        if panel_index == 1:
            crop = image.crop((798, 0, 1192, 345))
        else:
            crop = image.crop((798, 405, 1192, 750))
        panels.append(
            Candidate(
                label=f"current:right-{panel_index}",
                image=crop,
                priority=85,
                score=85,
            )
        )
    return panels


def effect_candidates(folder: str) -> list[Candidate]:
    candidates = []
    for index, effect in enumerate(EFFECT_PREVIEWS.get(folder, [])):
        for name in ("preview.jpg", "preview.png"):
            path = EFFECTS / effect / name
            if not path.exists():
                continue
            candidates.append(
                Candidate(
                    label=f"effect:{effect}/{name}",
                    path=path,
                    priority=105 - index,
                    score=105 - index,
                )
            )
            break
    return candidates


def extract_video_frames(folder: str, videos: list[Path]) -> list[Candidate]:
    output_dir = TEMP_FRAMES / folder
    output_dir.mkdir(parents=True, exist_ok=True)
    candidates: list[Candidate] = []
    for video_index, video in enumerate(videos[:2]):
        try:
            probe = subprocess.run(
                [
                    "ffprobe",
                    "-v",
                    "error",
                    "-show_entries",
                    "format=duration",
                    "-of",
                    "default=noprint_wrappers=1:nokey=1",
                    str(video),
                ],
                check=True,
                capture_output=True,
                text=True,
                timeout=20,
            )
            duration = max(float(probe.stdout.strip()), 0.5)
        except Exception:
            duration = 3.0
        fractions = (0.28, 0.68) if video_index == 0 else (0.48,)
        for fraction_index, fraction in enumerate(fractions):
            target = output_dir / f"video-{video_index}-{fraction_index}.jpg"
            timestamp = max(0.05, duration * fraction)
            try:
                subprocess.run(
                    [
                        "ffmpeg",
                        "-loglevel",
                        "error",
                        "-ss",
                        f"{timestamp:.3f}",
                        "-i",
                        str(video),
                        "-frames:v",
                        "1",
                        "-q:v",
                        "2",
                        "-y",
                        str(target),
                    ],
                    check=True,
                    timeout=45,
                )
            except Exception:
                continue
            candidates.append(
                Candidate(
                    label=f"video:{video.name}@{fraction:.0%}",
                    path=target,
                    priority=75 - video_index,
                    score=75 - video_index,
                )
            )
    return candidates


def local_asset_candidates(folder: str) -> list[Candidate]:
    directory = DESIGNS / folder
    raster_paths: list[Path] = []
    video_paths: list[Path] = []
    for path in directory.rglob("*"):
        if not path.is_file() or path.name.startswith("preview."):
            continue
        suffix = path.suffix.lower()
        if suffix in VIDEO_EXTENSIONS:
            video_paths.append(path)
        elif suffix in RASTER_EXTENSIONS and not BAD_NAME.search(path.name):
            raster_paths.append(path)

    raster_paths.sort(key=lambda path: path.stat().st_size, reverse=True)
    video_paths.sort(key=lambda path: path.stat().st_size, reverse=True)
    candidates: list[Candidate] = []
    for path in raster_paths[:60]:
        image = safe_image(path)
        if image is None:
            continue
        score = image_score(path, image)
        if score < 0:
            continue
        candidates.append(
            Candidate(
                label=f"asset:{path.relative_to(directory).as_posix()}",
                path=path,
                priority=50,
                score=score,
            )
        )
    candidates.sort(key=lambda candidate: candidate.score, reverse=True)
    candidates = candidates[:14]
    # Prefer already-local stills. Video decoding is only needed when the
    # mirror does not contain two usable raster keyframes.
    if len(candidates) < 2:
        candidates.extend(extract_video_frames(folder, video_paths[:1]))
    return candidates


def verified_preview_candidate(folder: str) -> Candidate | None:
    if folder not in STABLE_PREVIEW_PNG:
        return None
    path = DESIGNS / folder / "preview.png"
    if not path.exists():
        return None
    return Candidate(
        label="verified:preview.png",
        path=path,
        priority=130,
        score=130,
    )


def visual_variance(image: Image.Image) -> float:
    stat = ImageStat.Stat(ImageOps.grayscale(image.resize((48, 27))))
    return float(stat.stddev[0])


def choose_candidates(folder: str) -> tuple[Candidate, Candidate, Candidate]:
    manual = manual_candidates(folder)
    if manual is not None:
        return manual

    current = current_panel_candidates(folder)
    verified = verified_preview_candidate(folder)
    effects = effect_candidates(folder)
    assets = local_asset_candidates(folder)

    if verified is not None:
        lead = verified
    else:
        lead = next(
            (
                candidate
                for candidate in current
                if candidate.label == "current:left"
            ),
            None,
        )
        if lead is None and effects:
            lead = effects[0]
        if lead is None:
            lead = max(assets, key=lambda candidate: candidate.score)

    ordered = [
        *effects,
        *(
            candidate
            for candidate in current
            if candidate.label != "current:left"
        ),
        *assets,
    ]
    lead_image = lead.open()
    lead_signature = signature(lead_image)
    chosen: list[Candidate] = []
    chosen_signatures: list[tuple[float, ...]] = []
    seen_hashes = {hashlib.sha1(bytes(int(value) for value in lead_signature)).hexdigest()}

    for candidate in ordered:
        if candidate.label == lead.label:
            continue
        try:
            image = candidate.open()
        except Exception:
            continue
        if visual_variance(image) < 4:
            continue
        candidate_signature = signature(image)
        digest = hashlib.sha1(
            bytes(int(value) for value in candidate_signature)
        ).hexdigest()
        if digest in seen_hashes:
            continue
        if signature_difference(lead_signature, candidate_signature) < 7:
            continue
        if any(
            signature_difference(existing, candidate_signature) < 7
            for existing in chosen_signatures
        ):
            continue
        chosen.append(candidate)
        chosen_signatures.append(candidate_signature)
        seen_hashes.add(digest)
        if len(chosen) == 2:
            break

    if len(chosen) < 2:
        for candidate in ordered:
            if candidate.label == lead.label or candidate in chosen:
                continue
            try:
                image = candidate.open()
            except Exception:
                continue
            if visual_variance(image) < 3:
                continue
            chosen.append(candidate)
            if len(chosen) == 2:
                break

    while len(chosen) < 2:
        chosen.append(lead)
    return lead, chosen[0], chosen[1]


def fit_panel(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    panel = Image.new("RGB", size, BACKGROUND)
    contained = ImageOps.contain(
        image.convert("RGB"),
        size,
        method=Image.Resampling.LANCZOS,
    )
    left = (size[0] - contained.width) // 2
    top = (size[1] - contained.height) // 2
    panel.paste(contained, (left, top))
    return panel


def compose(folder: str, candidates: tuple[Candidate, Candidate, Candidate]) -> dict:
    lead, top_right, bottom_right = candidates
    canvas = Image.new("RGB", (1200, 750), BACKGROUND)
    canvas.paste(fit_panel(lead.open(), (782, 750)), (8, 0))
    canvas.paste(fit_panel(top_right.open(), (394, 345)), (798, 0))
    canvas.paste(fit_panel(bottom_right.open(), (394, 345)), (798, 405))
    output = DESIGNS / folder / "preview.jpg"
    canvas.save(output, "JPEG", quality=88, optimize=True, progressive=True)
    return {
        "folder": folder,
        "lead": lead.label,
        "topRight": top_right.label,
        "bottomRight": bottom_right.label,
        "bytes": output.stat().st_size,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--only",
        action="append",
        default=[],
        help="Rescue only this folder; may be supplied more than once.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Select sources without overwriting preview.jpg.",
    )
    parser.add_argument(
        "--keyframes",
        action="store_true",
        help=(
            "Compose every design with a complete, decodable "
            ".tmp-keyframes/<folder>/0.png,1.png,2.png triplet."
        ),
    )
    args = parser.parse_args()
    folders = (
        args.only
        or (BROWSER_KEYFRAME_FOLDERS if args.keyframes else FLAGGED)
    )

    results = []
    for folder in folders:
        if not (DESIGNS / folder).is_dir():
            results.append({"folder": folder, "error": "missing directory"})
            continue
        try:
            selected = choose_candidates(folder)
            if args.dry_run:
                results.append(
                    {
                        "folder": folder,
                        "lead": selected[0].label,
                        "topRight": selected[1].label,
                        "bottomRight": selected[2].label,
                    }
                )
            else:
                results.append(compose(folder, selected))
        except Exception as error:
            results.append({"folder": folder, "error": str(error)})
    print(json.dumps(results, ensure_ascii=False, indent=2))
    return 1 if any("error" in result for result in results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
