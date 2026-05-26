---
name: Nuxt 3 SPA mirrors need 5-step manual fix-up
description: scrape-url.py captures the static HTML shell but misses runtime-loaded CSS chunks, lazy images, and breaks under Nuxt's history.replaceState — needs ~5 manual fixes per Nuxt 3 site
type: reference
originSessionId: df21e438-ca10-48d9-a7fe-fc86bdf3a493
---
After `python scrape-url.py URL NNN-slug "Title"` on a Nuxt 3 SPA, the auto-rebuild + headless verify will report a render but the page will be visually broken (404s on CSS/images, "PAGE NOT FOUND" route, etc.). The auto `_nuxt/` root-copy step gets you part of the way but five more things typically need manual fix-up:

1. **CSS chunks not in HTML** — the inline `<link rel="stylesheet">` only covers a few base CSS files. Route-specific CSS (default.HASH.css, index.HASH.css, error-500.HASH.css, etc.) is loaded by JS at runtime and not picked up by scraper.
   Fix: grep `entry.HASH.js` for `"\.\/[A-Za-z0-9_.-]+\.[a-f0-9]{8}\.css"` to find all referenced CSS, batch-fetch the missing ones into both `assets/<host>/_nuxt/` and `_nuxt/`.

2. **Asset folders (`images/`, `fonts/`)** are downloaded under `assets/<host>/` but CSS references them as `url(../images/...)` relative to its own location. Copy `assets/<host>/{images,fonts,audio,video}/` to mirror root so paths resolve regardless of which CSS copy is loaded.

3. **`<img src="/images/...">` and CSS `url(/images/...)` with leading slash**. Path shim only hooks fetch/XHR — not image src or CSS url(). Rewrite all JS/CSS source files: `"/images/X" → "./images/X"`, `url(/images/X) → url(./images/X)`. Same for `/fonts/`, `/audio/`, `/video/`.

4. **Nuxt history.replaceState rewrites `location.href` to `/`** after hydration, breaking all relative paths in subsequent runtime-set `<img>` sources. Inject `<base href="/designs/NNN-slug/">` right after `<head>` opening — this locks the relative-URL base regardless of history changes. Use the absolute server path so it works no matter where pushState moves location.

5. **Lazy-loaded images** referenced at scroll-trigger time, not as string literals. After step 4, do a headless scroll-through and capture all 4xx responses with URL containing `/designs/NNN-slug/images/`, then batch-fetch their live equivalents from `https://<host>/<rel-path>`.

Don't generalize step 1-5 into scrape-url.py defaults blindly — each is mildly site-specific (CSS hash patterns, image folder names, base href path). But for any Nuxt 3 SPA mirror, expect all five.

Sites seen with this pattern: 008-donmolinico (partial — got step 4 issue but stopped at "reference-only"), 009-obsidianassembly (full 5-step recipe applied successfully).
