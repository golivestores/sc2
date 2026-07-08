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

## 在整站镜像里做 rebrand（南崖→Himax / 标题→阿祖AI出海）—— Next.js RSC 镜像的安全改法（045 实操）

用户要求把镜像里的品牌名整体替换（"south cliff 都改成 himax"、首页大标题改"阿祖AI出海"）时，**不是所有文本都能直接 sed**——Next.js App Router 镜像里文本分几种载体，各有雷：
1. **可见文本 / RSC inline-JSON 字符串 / `<title>` / `<meta>`**：直接在 `index.html` 里字符串替换是**安全**的（前提：grep 确认 RSC flight 里**没有 `:T<hex>,` 长度前缀行**——`grep -oE '[0-9a-f]+:T[0-9a-f]+,'`；045 是 0 个，所以纯 inline-JSON，改长度无害）。**若有 T-row**，改文本会变 byte 长度 → flight 解析崩（"Application error: a client-side exception"）→ 那种得连 hex 长度一起重算。替换时**只动带空格/大小写的品牌词**（`South Cliff`→`Himax`、`SOUTH CLIFF`→`HIMAX`），**绝不碰 URL 形式**（`south-cliff-dental-group`、`southcliffdentalgroup` —— 改了 Prismic/CDN 全 404）。
2. **DOM 文本节点不要用 MutationObserver+setInterval 去改**——外部 mutate React 托管的 text node 会让 React reconcile 崩。改 SSR'd HTML 源里的字符串（连同 RSC inline-JSON）才稳，React 用同一份数据 hydrate 不会还原。
3. **Logo 是 path-based SVG（`grep <text` 为 0，全 `<path>`）**：文字烤进矢量，改不了 → 自画一个 `<text>` 版 SVG 替换（viewBox 对齐原图，如 400×119；白/蓝两色版对应 header/footer）。**SVG `<text>` 在 `<img>` 里能正常渲染**（系统字体 Georgia/PingFang 都解析，先单独 set_content 测一张确认）。
4. **Logo 走 Prismic CDN + imgix srcset（`?fit=max&w=640`）的最坑**：① 直接改 `index.html` 里那条 `https://…cdn…logo.svg` 引用会**崩页**（疑似破坏 Next/Image 期望的图片 metadata）——别动 HTML。② img-shim 的 `src`/`srcset` property-setter hook **抓不到**（Next/Image 用 `setAttribute` 或 currentSrc 从 srcset 选，绕过 property setter；连补 `Element.prototype.setAttribute` hook 都漏）。③ **唯一稳的**：注入一个 `setInterval(force,400)` 周期脚本，扫 `img,source`，凡 `currentSrc/src/srcset` 含 `scdg-logo-white`/`logo-blue` 的就 `el.srcset=''; el.setAttribute('src', 本地HIMAX svg deploy-绝对路径)`。运行时改 img 属性（非结构）不崩 React，React 不重设就稳住。**教训**：CDN-srcset 图片的替换走运行时 img-force，别改 HTML 源 URL。
验收：load 后查 `document.body.innerText` 里目标品牌词计数（Himax 有、South Cliff 0）、`document.title` 已改、`crashed=body.innerText.includes('Application error')===false`、logo `currentSrc` 不带 imgix query（=本地命中）、逐图截图确认 logo/hero 文案。脚本模板见 `c:/tmp/brandcheck.py`、`c:/tmp/logo2.py`。
