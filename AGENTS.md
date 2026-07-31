# sc2 — Codex 项目说明

这个仓库是 SiteCollection 2：抓取/镜像值得借鉴的网页设计 → 拆出可复用的交互 effect 放进 gallery。

启动 Codex 时本文件会被自动加载，下面 `@` 引用的所有 memory 文件会一起注入到 context，让 Codex 知道项目约定 + 历史踩坑 + 验收规则。**新人/同事 clone 后无需任何额外配置，打开 Codex 直接就有这些记忆。**

## 工作目录约定
- 抓取的镜像放在 `designs/NNN-slug/`（由 `scrape-url.py` 生成）
- 提取出的可复用 effect 放在 `effects/NNN-slug/`，每个 effect 自带 `index.html` + `meta.json` + `preview.png`
- `rebuild-index.py` 重建 `designs/designs.js` + `effects/effects.js`（这两个被前端 gallery 读）
- `extract-effect-section.py` 从主题站镜像抽 effect 用（base-href 法）
- `package-effects.py` 打 zip（不自动跑，等显式触发）
- `gsap/` 自带 GSAP 3.13.0 全套（含原付费插件）+ AI 决策指南 + 代码片段 + effect 模板。详见 `gsap/README.md`（人）/ `gsap/CLAUDE.md`（AI）

## Design / Effect 硬性规范（新增、修改、交付都必须遵守）

本节是当前最高优先级的仓库格式约定。若旧 README / memory 与本节冲突，以本节为准。目标是：同事从 GitHub clone 后运行 `python serve.py`，Design 能浏览、Effect 能预览、源码能直接显示、ZIP 能按需生成。

### Design 镜像格式

- 目录只能是 `designs/NNN-slug/`；`NNN` 为唯一三位编号，`slug` 只用小写英文、数字和连字符。不得复用编号、临时改名或创建第二套目录结构。
- 每个 Design 必须有：`index.html`、`meta.json`、验证截图 `preview.png`；页面资源放在该目录内部。不得把临时截图、调试脚本或抓取日志混入交付目录。
- `meta.json` 至少包含合法的 `title`、`sourceUrl`、`savedAt`、`tags`。必须是 UTF-8 且能被 JSON 解析；禁止注释、尾逗号、占位值和错误路径。
- 镜像默认要求原站视觉、文案、布局、动画和交互 1:1；未经用户明确要求，不得重新设计、简化、重排或自行 rebrand。
- 镜像必须能在 `python serve.py` 下独立加载。交付前检查主页面及关键路由，Console 无阻断错误，Network 无关键资源 404，不能白屏、缺字体、缺图、缺模型或缺运行时 chunk。
- 不手写 `designs/designs.js`、`designs/designs.json` 或导航卡片。新增/修改后只通过 `python rebuild-index.py`（或项目提供的 finalize 流程）重建索引；`designs/index.html` 的既有格式未经明确要求不得改。

### Effect 目录与内容格式

- 目录只能是 `effects/NNN-slug/`，编号/slug 规则与 Design 相同。每个新 Effect 必须有：`index.html`、`meta.json`、`preview.png`；自有资源放 `assets/`，第三方运行库放 `lib/`。
- Effect 必须自包含：禁止引用 `../vendor/`、其他 effect/design 的资源或仅本机存在的绝对路径。线上 CDN 依赖应下载到本 effect；确实不能本地化时必须明确说明并验证离线退化行为。
- `meta.json` 必须包含：`title`、`description`、`tech`、`tags`、`sourceUrl`、`localMirror`；`localMirror` 必须是从 `effects/` 指向对应 `designs/NNN-slug/index.html` 的相对路径。`tags` 必须符合根目录 `TAGS.md` 的五轴规范，新 Effect 不得沿用旧英文/自由标签格式。
- Effect 只提取用户指定的视觉/交互单元；不擅自添加标题、说明、加载屏、空白滚动区或无关 section。原区块已有的 hover、scroll、drag、自动播放、响应式、WebGL、音视频和微交互都要逐项还原，禁止“看起来差不多”的简化版本。
- Demo 专用脚手架必须标记 `data-demo-only`；缩略图模式必须支持 `?demo=preview`。右上角 ZIP/源码浮层只能由 `inject-overlay.py` 注入，并保留 `sc2-overlay` 起止注释，禁止手写另一套按钮结构。
- 不手写 `effects/effects.js`、`effects/effects.json` 或画廊卡片；统一用 `rebuild-index.py` 生成。`effects/index.html`、`effects/view.html` 的既有画廊/查看器布局为锁定格式，未经明确要求不得重做。

### 源码查看器：只允许直接读取真实源文件

- 在 HTTP/HTTPS 下，`effects/view.html?effect=<folder>` 必须直接读取 `<folder>/index.html` 和 `<folder>/meta.json`，并显示 Demo、all-in-one、HTML、CSS、JS 与复制按钮。
- 禁止生成、读取或回退到 `source-bundle.js`。源码查看器只能直接读取 Effect 的 `index.html`、`meta.json`、CSS 与 JS；严禁恢复 bundle 缺失报错或 `--bundle-only` 提示。
- Chromium 不允许 `file://` 页面读取兄弟文件；从本地文件模式进入源码页时，必须自动跳转到 `http://127.0.0.1:8080/effects/view.html?effect=<folder>`，不得要求用户生成兼容文件。
- 源码按钮固定指向 `../view.html?effect=<folder>`（画廊中为 `view.html?effect=<folder>`）。新增 Effect 后必须确认目录内不存在 `source-bundle.js`，并通过 `python serve.py` 实测源码仍可直接显示。
- 同事 clone 后的标准入口是 `python serve.py` + `http://127.0.0.1:8080/effects/`。不得以直接双击 `file://` 的限制，替代 HTTP 模式验收。

### ZIP 与生成物规则

- `effects/*/*.zip` 是按需生成物并保持 gitignored，不提交到 GitHub。`source-bundle.js` 已废弃，禁止再次生成。
- 默认不主动运行 `package-effects.py`；只有用户明确说“打包 / ZIP / 交付 / finalize”时才生成。
- ZIP 按钮必须在 `python serve.py` 下支持首次点击按需生成。`package-effects.py --only <slug>` 必须能为历史 Effect 生成 ZIP；全量打包仍必须执行严格 meta/tags 规范校验。
- 用户要求 ZIP 时，至少验证：HTTP 200、Content-Type 为 ZIP、压缩包可打开、`testzip()` 无损坏、包内含 `<folder>/index.html` 及全部本地依赖。

### 强制验收与交付阻断

- 每次新增/修改 Design 或 Effect 后，先重建索引，再用 `python serve.py` 验收；禁止只看代码就宣布完成。
- 每次 Design / Effect 完成并准备交付时，必须确保 `python serve.py` 正在运行，在浏览器中打开最终本地页面，并在最终回复中给出可点击的 `http://127.0.0.1:8080/...` 地址；不得只给文件路径或要求用户自行启动服务器。
- 必须在用户实际使用的桌面视口截图自查，覆盖首屏、用户指定终点和关键交互状态；同时检查 Console 与关键资源 404。
- 每个 Effect 额外检查：独立 Demo、`?demo=preview`、源码页、复制按钮、浮层跳转、响应式和原站对照。涉及滚动/时间动画时必须采样多个时刻/滚动位置，不能只截静态首帧。
- 以下任一情况存在时禁止交付或推送：白屏、缺 section、整体错位、内容被裁切、加载屏残留、源码页报 bundle 缺失、源码块为空、关键资源 404、交互未实现、meta 无效、索引未更新、ZIP 请求 404/损坏。
- 默认不打 ZIP、不 commit、不 push；分别等待用户明确授权。工作区有其他改动时，只暂存本任务文件，禁止顺手提交同事/用户的未完成内容。

## GSAP 工具集（开箱即用）
@gsap/CLAUDE.md
@docs/claude-memory/effect-gsap-toolbox.md

## 项目格式锁定（不要改设计）
@docs/claude-memory/sc2-navigator-format-locked.md
@docs/claude-memory/effects-gallery-format-locked.md
@docs/claude-memory/effects-extraction-must-be-1to1.md

## 抓站 / 镜像踩坑
@docs/claude-memory/scrape-default-target.md
@docs/claude-memory/scrape-pitfalls.md
@docs/claude-memory/nuxt3-spa-mirror-recipe.md
@docs/claude-memory/nextjs-spa-mirror-recipe.md
@docs/claude-memory/sveltekit-spa-mirror-recipe.md
@docs/claude-memory/react-router-v7-spa-mirror-recipe.md
@docs/claude-memory/akamai-authenticated-browser-download-recipe.md

## effect 实现规则
@docs/claude-memory/effect-slider-collage-rules.md
@docs/claude-memory/scroll-progress-cannot-exceed-1.md

## effect 验收 / 工作流偏好（feedback）
@docs/claude-memory/feedback-effect-extract-from-themed-mirror.md
@docs/claude-memory/feedback-effect-screenshot-compare.md
@docs/claude-memory/feedback-effects-verify-before-shipping.md
@docs/claude-memory/feedback-state-toggle-effect-pitfalls.md
@docs/claude-memory/feedback-webgl-effect-mix-blend-rules.md
@docs/claude-memory/feedback-no-auto-package.md
@docs/claude-memory/feedback-no-auto-push.md
@docs/claude-memory/feedback-error-postmortem-discipline.md
@docs/claude-memory/feedback-motion-sampling-mandatory.md
@docs/claude-memory/feedback-mac-package-and-transition-playbook.md
