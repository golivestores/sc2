# sc2 — Claude Code 项目说明

这个仓库是 SiteCollection 2：抓取/镜像值得借鉴的网页设计 → 拆出可复用的交互 effect 放进 gallery。

启动 Claude Code 时本文件会被自动加载，下面 `@` 引用的所有 memory 文件会一起注入到 context，让 Claude 知道项目约定 + 历史踩坑 + 验收规则。**新人/同事 clone 后无需任何额外配置，打开 Claude Code 直接就有这些记忆。**

## 工作目录约定
- 抓取的镜像放在 `designs/NNN-slug/`（由 `scrape-url.py` 生成）
- 提取出的可复用 effect 放在 `effects/NNN-slug/`，每个 effect 自带 `index.html` + `meta.json` + `preview.png`
- `rebuild-index.py` 重建 `designs/designs.js` + `effects/effects.js`（这两个被前端 gallery 读）
- `extract-effect-section.py` 从主题站镜像抽 effect 用（base-href 法）
- `package-effects.py` 打 zip（不自动跑，等显式触发）

## 项目格式锁定（不要改设计）
@docs/claude-memory/sc2-navigator-format-locked.md
@docs/claude-memory/effects-gallery-format-locked.md
@docs/claude-memory/effects-extraction-must-be-1to1.md

## 抓站 / 镜像踩坑
@docs/claude-memory/scrape-default-target.md
@docs/claude-memory/scrape-pitfalls.md
@docs/claude-memory/nuxt3-spa-mirror-recipe.md
@docs/claude-memory/nextjs-spa-mirror-recipe.md

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
