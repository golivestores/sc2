---
name: collage-style slider effects — strict separation of "arrows" vs "scroll"
description: For collage/sticky-scroll sliders (like obsidianassembly /#places), arrows ONLY swap the active image (with crossfade). Tiles are FIXED decorations that never move on arrow click. Don't conflate "slot rotation" with image cycling.
type: feedback
originSessionId: df21e438-ca10-48d9-a7fe-fc86bdf3a493
---
When building a slider/carousel effect where the visual has a "central active image + surrounding decorative tiles" (collage layout):

**Two mechanisms must be STRICTLY INDEPENDENT.** Do not merge them.

(A) **Arrow buttons / keyboard ←→ = swap the IMAGE displayed in the active center slot.**
    - 7 (or N) image variants stack inside the active container, opacity 0.
    - Only one has `.is-current` (opacity 1).
    - Swap = toggle `.is-current` between outgoing + incoming. CSS transitions
      opacity over 0.6-0.8s. Title text and counter swap with similar timing.
    - **Satellite tile positions DO NOT CHANGE.** They are decoration.
    - Do **NOT** implement this as "slot rotation" where all N tiles cycle
      through N positions on each click — that's a different effect.

(B) **Scroll wheel / page scroll = drive a `--progress: 0..1` CSS variable.**
    - Progress affects position + size of EVERYTHING (active grows, tiles
      drift outward, title fades) via calc() interpolation.
    - At progress=0: collage layout (small active, all tiles visible).
    - At progress=1: active fills viewport, tiles drift off-screen.
    - Arrows do **NOT** affect zoom level; zoom is purely scroll-driven.

**Layout reference rules:**
- Always pixel-measure from the user's reference screenshot before designing
  positions. Don't reuse old measurements blindly — the live site or the
  user's preferred crop may differ.
- "4 tiles around active" (2 left stacked + 2 right stacked) is a common
  case. Don't add 6 tiles unless the reference shows 6.
- Title block is usually large display-serif italic at top of viewport,
  separate from the slider area. Not a small caption above.
- Active block sits in the lower portion of viewport (~26vh top), with
  size ~50-60vw × 55-65vh at progress=0.

**Animation requirements:**
- Image swap MUST have a visible crossfade (~0.7s opacity). Without it, the
  swap feels jarring and the user will complain "no animation".
- Title text fade should be ~0.5s. Counter swap is instant under the title.
- Image inside .active-img can use a slight scale(1.04 → 1.0) for "ken-burns"
  feel during crossfade.

**Section structure for scroll-driven zoom:**
- Outer section: ~300vh tall (gives scroll runway).
- Inner sticky-frame: position:sticky, top:0, height:100vh, overflow:hidden.
- Title block + active block + tiles all absolute-positioned within sticky-frame.
- Use vw/vh units (not %) for tile positions so they're stable regardless
  of where the slider element sits.

**Common mistakes (recorded so they don't repeat):**
- ❌ Implementing arrows as "slot rotation" where the active and clicked tile
  swap positions — that moves the satellites and confuses the user.
- ❌ Skipping the crossfade animation on image swap (hard-cuts feel broken).
- ❌ Making the slider area too small/cramped — leave breathing room.
- ❌ Trying to put 6 tiles + active all inside viewport at once — the
  original lets some tiles fall off-screen below; that's the design.
- ❌ Mounting tiles inside a wrapped .slider element that's already smaller
  than viewport — then "% of slider" is too tight. Mount directly inside
  sticky-frame with vw/vh anchors.
- ❌ Using `width/height` calc() on the slider element to grow it on scroll —
  works but causes layout shift; prefer absolute positioning on each element
  and let progress drive each independently.

**Reference effect:** `effects/018-obsidianassembly-places-slider/index.html`
implements both mechanisms correctly. Read it before redoing a similar effect.
