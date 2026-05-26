---
name: effects extraction is 1:1 only — never simplify
description: When extracting a section from a designs/ mirror into a reusable effects/ block, faithfully replicate every animation/interaction the original has. Don't skip "subtle" effects or replace per-element triggers with a single trigger.
type: feedback
originSessionId: 11d48ecf-6da5-4e85-b61d-71e6d684debd
---
When extracting a section from a `designs/` mirror into a reusable `effects/NNN-name/` block, the bar is **1:1 visual + interaction parity with the original**, not "looks close enough."

## Specific failure modes I've already hit (don't repeat)

| Trap | Why it's wrong | What to do instead |
|---|---|---|
| **Replacing per-element scroll triggers with one section-wide trigger** | Original site uses `data-tadam-scroll` on each card so they reveal in cascade as the user scrolls. My single-IntersectionObserver impl popped them all in at once — fundamentally different feel. | Re-create the per-element observer pattern. One observer per card / per element with the trigger attribute. Each element decides when *it* reveals. |
| **Skipping a third-party library because "the visual is dominated by CSS"** | I dropped simpleparallax-js for the Talamus cards thinking the CSS staggered offsets carried the look. Original cards also drift continuously during scroll (each at a slightly different rate via `scale: 1.0 + index * 0.2`); without it the demo feels static. | Bundle the actual library into the effect's own `lib/` (A.2 self-contained rule). Don't approximate libraries with custom JS unless explicitly asked. |
| **Adding "container" content (title, header, description) that isn't part of the effect** | The effect is the staggered card grid. The site's `<h2>` and description are just neighbors. Including them dilutes the demo and wastes the user's iframe viewport. | Extract ONLY the visual primitive that was requested. If the user said "the staggered cards", do not include the title/CTA/description above them. |

## Process to follow when extracting

1. **Find the section in the design mirror's HTML.** Note every `data-*` attribute on every element — those are JS hooks.
2. **Grep main.js for each `data-*` value.** Read what it does. Copy the mechanic, not your interpretation of it.
3. **Find every CSS rule for the section's class names.** Include them all (including media queries, including hover states).
4. **List third-party libs that the section depends on.** For each: bundle a copy under the effect's `lib/` (A.2). Never `<script src="../../vendor/...">`.
5. **List font families used.** If they're licensed (Adobe Typekit etc.) document the limitation in code comments and use a fallback chain. If they're free (Google Fonts, system) bundle a local copy.
6. **Check what's in the original viewport** — only include what's visually part of the effect being extracted, not surrounding sections / titles / CTAs the user didn't ask for.
7. **After building, A/B test in browser** against the live site URL. Specifically scroll-test: do cards appear progressively or all at once? Is there continuous motion during scroll?

## How to apply
- Treat user feedback like "图标少 / 交互少 / 不一致" as an indicator that I oversimplified. The fix is to *add back* what I removed, not to argue that the difference is acceptable.
- If a feature requires a third-party library or non-trivial JS to replicate faithfully, **add the library** rather than reimplementing approximate behavior.
- When done, verify against the live URL in the original browser tab, not just the local preview.

## Branding / text content rule

Default: keep the original site's text verbatim (English, French, etc.). Don't replace brand names or copywriting unless the user explicitly asks.

Exception — font fallback fails noticeably: if the original copy uses a heavy display font we can't redistribute (Adobe Typekit, etc.) AND the system fallback makes the rendering look bad enough to call out (e.g. very thin Latin chars where the original was extra-bold display), the user has approved replacing the brand mark with **"Himax"** and the dominant title with **"阿祖AI建站"** as a fallback content strategy. Do this only when font fidelity actually breaks the look — not by default.

Trigger to apply: visual font weight / proportions noticeably off after fallback. If text reads acceptably with system sans (e.g. body copy, news cards, ALL-CAPS mono descriptions), keep original.
