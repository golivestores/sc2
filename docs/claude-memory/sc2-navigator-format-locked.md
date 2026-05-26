---
name: sc2 navigator format is locked
description: The sc2 designs/index.html (navigator) layout is finalized — reads designs.js (rebuild-generated), shows iframe-preview cards. Don't redesign. New scraped sites must drop in unchanged.
type: feedback
originSessionId: 11d48ecf-6da5-4e85-b61d-71e6d684debd
---
The sc2 navigator at `c:/Users/EDY/Documents/sc2/designs/index.html` is finalized and must not be redesigned without an explicit ask. Future scrapes (via `scrape-url.py`) must produce mirrors that fit into this navigator without manual fix-ups.

Note: on 2026-05-13 the navigator was moved from the project root to `designs/index.html` to stop being confused with `effects/index.html`. Because http.server then shadows the directory listing with the navigator itself, the discovery mechanism switched from "fetch directory listing" to "load `designs/designs.js` (rebuild-generated, exposes `window.__DESIGNS__`)" — same pattern as `effects/effects.js`. Adding a new mirror now requires running `rebuild-index.ps1` afterwards; the auto-rescan-on-refresh behavior is gone.

Locked layout details (do not change):
- Renders cards from `window.__DESIGNS__` (loaded via `<script src="designs.js">`).
- Each card has an iframe preview (400% × scale 0.25 from top-left, aspect-ratio 16/10) loading `<folder>/index.html`.
- iframe is interactive (NO `pointer-events:none`) — scroll wheel and clicks work inside, but the card body and a top-right ↗ overlay open the mirror in a new tab.
- Card body shows: numeric prefix (e.g. `001`), title from meta.json, savedAt date, link to original `sourceUrl`.
- Dark theme; per-card meta from `<folder>/meta.json` (via the rebuild-generated designs.json/js).

Why: User went through several iterations of this navigator and explicitly said "this is what I want — preserve it." They don't want format drift as more sites are added.

How to apply:
- Treat `designs/index.html` as locked. Any visual/behavioral changes need explicit user approval.
- For new scrape issues (sites not previewing right), fix them at the **scrape stage** (`scrape-url.py`), not by modifying the navigator.
- The path shim is already auto-injected by `scrape-url.py` into every scraped `index.html` — handles the common case of bundled JS hardcoding root-absolute URLs (Three.js GLB, `/api/*.json`, `/_astro/*.hdr`) that would 404 in iframe context.
- The user uses `python -m http.server 8080` from the project root. Two entry URLs: `localhost:8080/designs/` (镜像导航) and `localhost:8080/effects/` (块画廊).
- After a new scrape, run `rebuild-index.ps1` (or `rebuild-index.bat`) before refreshing the navigator — otherwise the new card won't show up.
