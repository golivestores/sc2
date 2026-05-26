---
name: sc2 effects gallery + viewer format is locked
description: The effects gallery (effects/index.html), viewer (effects/view.html), and per-effect file conventions are finalized. Future effects must drop in matching this format unchanged.
type: feedback
originSessionId: 11d48ecf-6da5-4e85-b61d-71e6d684debd
---
The sc2 `effects/` gallery + viewer + per-effect layout is finalized and must not be redesigned without explicit ask. Every new effect must drop in conforming to these conventions.

History: on 2026-05-13 the viewer was briefly deleted (one-click `📦 zip` only) and then restored at user request — the source-snippet copy UI was load-bearing. Don't propose deleting view.html again.

## Gallery (`effects/index.html`)

- **Card grid**: `repeat(auto-fill, minmax(340px, 1fr))`, gap 20px.
- **Card layout** (top to bottom):
  1. `.card__preview` — iframe at `width:400% height:400% transform:scale(0.25) origin top-left` so the inner virtual viewport is ~1360px+ and the demo's desktop media queries fire. Aspect-ratio 3/2. Iframe `src` appended with `?demo=preview` so the demo hides its floating overlay buttons and runs a faked cascade.
  2. `↗` corner badge (`.card__open`) — opens standalone demo in new tab.
  3. `.card__body` (clickable, opens demo in current tab).
  4. `.card__actions` row with **three** buttons in this order: `📋 源码` → `view.html?effect=<folder>`, `📦 zip` → sibling `<folder>/<folder>.zip` with `download` attr, `原站 ↗` → `localMirror`.
- **Filter chips** at top: `全部 / 动画 / 文字 / 交互 / 入场 / 滚动 / 首屏` — text labels Chinese, `data-filter` attributes English (`all / animation / typography / interaction / intro / scroll / hero`). New chips must also be added to `view.html`'s hardcoded `CATEGORY_LABELS` dict for matching localization.
- **Tag color coding** (used in BOTH gallery cards and viewer header):
  - `.tag` (soft yellow `#f3efd6`) — free-form descriptive tags.
  - `.tag--tech` (gray `#e8e4c7` / text `#4a4725`) — `meta.tech` value.
  - `.tag--category` (blue `#dde6ff` / text `#2b3d73` / bold) — tag matches a filter chip.

## Viewer (`effects/view.html`)

- Loads `<folder>/source-bundle.js` via dynamic `<script>` tag (works under file://; fetch does not).
- **Header**: title + subtitle + description + tags + actions row: `下载 .zip` (primary) + `跳转原网页 ↗` (uses `localMirror`).
- **Demo iframe**: 16:9, no scale.
- **"整合代码 · 一键复制到你的项目"** section with 4 paste blocks:
  1. `all-in-one` — external scripts + `<style>` + HTML + inline `<script>` concatenated.
  2. `HTML` — body innerHTML, with `<style>`/`<script>` and `data-demo-only` elements stripped.
  3. `CSS` — concat of all `<style>` block contents.
  4. `JS` — concat of all inline `<script>` block contents.
  - external_scripts list shown as a separate notice when present.

## Floating overlay inside each demo (`effects/NNN/index.html`)

- Injected by `inject-overlay.py`, fenced with `<!-- sc2-overlay:start --> ... <!-- sc2-overlay:end -->` right before `</body>`. Idempotent — re-running updates the block in place.
- Renders `<div id="sc2-overlay">` with two stacked `.sc2-btn` anchors top-right:
  1. `📦 下载 zip` → sibling `<folder>.zip` with `download` attr.
  2. `📋 源码` → `../view.html?effect=<folder>` with `target="_top"` so it escapes any iframe.
- A tiny inline script removes the entire overlay when `?demo=preview` is in the URL, so gallery thumbnails stay clean.

## meta.json schema

| field | required | purpose |
|---|---|---|
| `title` | ✓ | card heading |
| `subtitle` | | secondary text after `NNN ·` |
| `description` | | one-paragraph explanation (escaped HTML) |
| `tech` | | tech-stack tag (gray styling) |
| `tags` | | array of strings — chip-category keys (English) and free-form. Always English keys; UI maps to Chinese labels. |
| `previewHref` | | iframe sub-path; default `index.html` |
| `sourceUrl` | | online URL — metadata only, NOT used as button link |
| `localMirror` | | **relative path from `effects/`** to local mirror under `designs/`. Used by both `原站 ↗` buttons. e.g. `../designs/001-talamus/index.html` |
| `order` | | sort override (default = num asc) |

## Effect HTML conventions

- Each `effects/NNN-name/` is fully self-contained (A.2): no `../vendor/` refs; libs in own `lib/`; assets in own `assets/`.
- `data-demo-only` attribute marks scaffolding (demo intros, scroll-room hero) — packager strips it from paste-ready snippets.
- `?demo=preview` querystring contract:
  - Without param: 1:1 with original site. Floating overlay buttons visible.
  - With param: hide intro, run a faked cascade. Floating overlay auto-removed.

## Adding a new effect

1. Create `effects/NNN-name/` with `index.html` (self-contained), `meta.json` (with `localMirror`), and any `assets/` `lib/`.
2. Run `rebuild-index.ps1` → updates `effects/effects.{js,json}` + `designs/designs.{js,json}`.
3. Run `python package-effects.py` → generates `<NNN-name>.zip` + `source-bundle.js` per effect (both gitignored).
4. Run `python inject-overlay.py` → adds the floating overlay (zip + 源码) to the new effect's index.html (idempotent; updates existing blocks).
5. Refresh gallery — new card auto-appears with all 3 buttons working.

## How to apply

- Treat the gallery, viewer, overlay, and packager output formats as locked. Don't redesign without explicit user approval.
- Every new effect must follow the schema and produce the same gallery + viewer experience.
- For category-tag localization: if a new chip is added to the toolbar, also add the same English→Chinese mapping to `view.html`'s hardcoded `CATEGORY_LABELS` dict (gallery derives from DOM, viewer can't).
- `effects/*/*.zip` and `effects/*/source-bundle.js` are gitignored; regenerated locally by `package-effects.py`.
