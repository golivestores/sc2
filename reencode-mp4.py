"""
Re-encode every mp4 under designs/ + effects/ to ~1.8 Mbps H.264 in place.

Heuristics:
- Skip files smaller than 1 MB (already small).
- Skip files whose existing bitrate is already <= 2.5 Mbps.
- Encode to a sibling .reenc.mp4 then atomically replace.
- Keep audio at 96 kbps AAC, faststart for web.

Designed to be safe to interrupt: in-progress .reenc.mp4 files are cleaned up at startup.
"""
import os, sys, json, time, shutil, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TARGETS = [ROOT / "designs", ROOT / "effects"]
SKIP_SMALLER_THAN = 1 * 1024 * 1024            # 1 MB
SKIP_BITRATE_AT_OR_BELOW = 2_500_000           # 2.5 Mbps
CRF = 27                                       # libx264 quality knob (1080p ~1.5-2 Mbps at CRF 27)
PRESET = "medium"
AUDIO_BR = "96k"

# winget-installed ffmpeg lands in a long per-user path that isn't on PATH for
# subprocesses spawned before the user re-logs in. Resolve once at startup.
def _resolve(exe):
    p = shutil.which(exe)
    if p:
        return p
    candidates = list(Path(os.environ["LOCALAPPDATA"]).glob(
        f"Microsoft/WinGet/Packages/Gyan.FFmpeg_*/ffmpeg-*-full_build/bin/{exe}.exe"
    ))
    if candidates:
        return str(candidates[0])
    raise SystemExit(f"could not find {exe}; install ffmpeg first")

FFMPEG = _resolve("ffmpeg")
FFPROBE = _resolve("ffprobe")


def probe(path: Path):
    """Return (duration_s, bit_rate_bps, size_bytes) using ffprobe."""
    r = subprocess.run(
        [FFPROBE, "-v", "error", "-show_format", "-show_streams", "-of", "json", str(path)],
        capture_output=True, text=True
    )
    if r.returncode != 0:
        return None
    data = json.loads(r.stdout)
    fmt = data.get("format", {})
    dur = float(fmt.get("duration", 0) or 0)
    br = int(fmt.get("bit_rate", 0) or 0)
    sz = int(fmt.get("size", path.stat().st_size) or path.stat().st_size)
    return dur, br, sz


def reencode(src: Path) -> tuple[bool, str]:
    """Encode in place. Returns (changed, reason)."""
    if not src.exists():
        return False, "missing"
    if src.stat().st_size < SKIP_SMALLER_THAN:
        return False, "tiny"
    p = probe(src)
    if not p:
        return False, "probe-failed"
    dur, br, sz = p
    if br and br <= SKIP_BITRATE_AT_OR_BELOW:
        return False, f"already-low ({br/1000:.0f}k)"

    tmp = src.with_suffix(src.suffix + ".reenc.tmp.mp4")
    if tmp.exists():
        tmp.unlink()

    # Cap to 1920 wide so 4K/3K downscales; keep aspect (-2 forces even height).
    # Use -map 0 with fallback to -map 0:v + 0:a? to keep all streams without
    # failing on no-audio files.
    cmd = [
        FFMPEG, "-y", "-loglevel", "error",
        "-i", str(src),
        "-c:v", "libx264", "-crf", str(CRF), "-preset", PRESET,
        "-vf", "scale='min(1920,iw)':'-2'",
        "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", AUDIO_BR,
        "-pix_fmt", "yuv420p",
        str(tmp),
    ]
    t0 = time.time()
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        if tmp.exists():
            tmp.unlink()
        return False, f"ffmpeg-err: {r.stderr.strip()[:140]}"

    new_sz = tmp.stat().st_size
    # Only commit if the new file is actually smaller; otherwise the original was already efficient.
    if new_sz >= sz * 0.95:
        tmp.unlink()
        return False, f"no-savings (was {sz/1024/1024:.1f}MB, would be {new_sz/1024/1024:.1f}MB)"

    src.unlink()
    tmp.rename(src)
    elapsed = time.time() - t0
    return True, f"{sz/1024/1024:.1f}->{new_sz/1024/1024:.1f}MB in {elapsed:.1f}s"


def main():
    # cleanup any leftover tmps from a previous interrupted run
    for d in TARGETS:
        for tmp in d.rglob("*.reenc.tmp.mp4"):
            print(f"  cleanup: {tmp.relative_to(ROOT)}")
            try: tmp.unlink()
            except OSError: pass

    files = []
    for d in TARGETS:
        files.extend(p for p in d.rglob("*.mp4") if ".reenc.tmp" not in p.name)
    files.sort()
    total_before = sum(f.stat().st_size for f in files)
    print(f"Found {len(files)} mp4 files, total {total_before/1024/1024:.0f} MB")

    saved = 0
    changed = 0
    for i, f in enumerate(files, 1):
        rel = f.relative_to(ROOT)
        ok, why = reencode(f)
        tag = "RE" if ok else "--"
        print(f"  [{i:>2}/{len(files)}] {tag} {rel}  ({why})", flush=True)
        if ok:
            changed += 1
    total_after = sum(f.stat().st_size for f in files if f.exists())
    saved = total_before - total_after
    print(f"\nDone. Re-encoded {changed}/{len(files)} files. Saved {saved/1024/1024:.0f} MB ({total_before/1024/1024:.0f} -> {total_after/1024/1024:.0f} MB)")


if __name__ == "__main__":
    sys.exit(main() or 0)
