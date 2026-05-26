---
name: Next.js (App Router) SPA mirror — 6-step fixup
description: When a Next.js App Router site (e.g. adaline.ai) is scraped, scrape-url.py copies _next/ but leaves runtime absolute-path bombs. Apply this recipe.
type: reference
originSessionId: 06e32a16-db05-4598-816a-c330a78b16f0
---
scrape-url.py only handles Nuxt with --nuxt-spa-fixup; Next.js App Router needs an analogous 6-step pass. Symptoms after raw scrape: 200+ 404s for /_next/static/chunks, /images/, /sequence/, plus a loader stuck at "99%" (frame-sequence pre-cacher waiting on missing JPGs).

**Recipe** (applied in c:/tmp/fix_017.py as the canonical template — copy and adapt for each site):

1. **Inject `<base href="/designs/NNN-slug/">` after `<head>`.** Makes all subsequent rewrites resolve via base — no need for `./` prefixes.

2. **Rewrite absolute → base-relative in index.html.** For every site-local prefix (`images`, `metadata`, `videos`, `sequence`, `_next`, plus whatever else `grep -ohE '"/[a-z]+/' index.html | sort -u` reveals): replace all of `\"/X/`, `"/X/`, `'/X/`, `&#x27;/X/`, `url(/X/` with the slash-less form `\"X/` / `"X/` etc. RSC flight payloads use the escaped `\"` form, inline styles use `'` and `&#x27;`.

3. **Patch webpack publicPath in `_next/static/chunks/webpack-*.js`.** Find `.p="/_next/"` and change to `.p="_next/"`. Webpack `<script>` injection bypasses `<base>` (URL constructed manually), so this MUST be relative.

4. **Patch absolute paths inside JS chunks.** Same prefixes as step 2, but only `"X"` and `'X'` quoting forms. Don't forget `_next` — chunks contain hard-coded `src:"/_next/static/media/footer-X.png"` from Image static imports.

5. **Flip `unoptimized:!1` → `unoptimized:!0`** in the chunk that contains `path:"/_next/image"` (Next.js Image config). The optimizer endpoint doesn't exist statically; this makes `<Image>` use raw `src` directly.

6. **Copy real asset trees up one level.** For every prefix in step 2 that exists under `assets/<host>/`: `shutil.copytree(assets/host/X, NNN-slug/X)`. With `<base href>` they're now reachable as `X/...`. **Also copy `assets/<host>/_next/static/{css,media}` into root `_next/static/`** — scrape often leaves root `_next/` with only `chunks/`. And copy `assets/<host>/_next/image.*` into root `_next/` — Next.js srcSets reference those as `_next/image.HASH` filenames (the optimizer cache), not as `?url=…&w=…` query strings, so `unoptimized:!0` alone won't save you if the HTML already baked the hashed paths.

**Out-of-band**: frame sequences (e.g. `sequence/16x9_281/standard/*.jpg`) aren't in the asset extraction — they're discovered at runtime by JS. Scrape them with a separate parallel-fetch loop (12 threads ≈ 150s for 281 frames). Standard quality (1080p) is enough for the navigator iframe; skip the high-res tier unless asked.

**Residual 404s that are OK to leave**: RSC prefetches for sibling routes like `/pricing?_rsc=…` `/blog?_rsc=…` — Next.js auto-prefetches Link targets that don't exist in a single-page mirror.

**SW gotcha**: If a Next.js mirror registers a service worker (e.g. fromanother.love → `sw.js`), the SW can intercept fetches and rewrite relative asset paths back to root-absolute (`/icons/...` instead of `./icons/...`). When debugging mysterious root-absolute 404s that don't appear in any chunk grep, disable the SW (`context = browser.new_context(service_workers="block")`) — if the 404s vanish, the SW was the culprit. For a clean local demo, either keep SW disabled at viewing time or strip the SW registration call from the chunk that calls `navigator.serviceWorker.register`.

**Heavy-asset preloaders that hang**: Sites that gate the hero behind a numeric `%` preloader waiting on Mux HLS / large videos will sit at ~35–50% forever offline. For a clean `preview.png`, force-hide the fixed full-viewport overlay containing `%` text via `page.evaluate`, then wait ~5s for the underlying scene to render. **To actually unblock the preloader for real use** (so the page becomes interactive, not just screenshotted), the fix is three steps deep:
1. Rewrite `https://stream.mux.com/${id}.m3u8` → `missing-stream-mux/${id}.dead` in both chunks AND in `index.html` RSC payload. `.dead` (not `.m3u8`) is critical so the page chunk's `if (/\.m3u8/.test(e) || e.includes("m3u8"))` detection falls through to the native `t.src=e` branch and the 404 triggers `<video>` onerror.
2. In the `ReactPlayer` chunk (the one with `hlsConfig` + `attachMedia`), replace `Hls.isSupported()` → `!1`. ReactPlayer ignores src suffix and unconditionally calls `attachMedia` whenever Hls is supported — must force the native fallback.
3. In the preloader-store chunk (zustand store with `assetsRequests`/`cpmRegister`/`assetsProgress`), short-circuit `n>=r.assetsRequests&&n<r.cpmRegister` → `false&&...`. This early-return path updates only `assetsLoadTo` and skips `assetsProgress`, so even when every asset has unregistered, the progress bar can stay frozen at a partial value because `cpmRegister` (incremented per ReactPlayer mount) is out of sync.