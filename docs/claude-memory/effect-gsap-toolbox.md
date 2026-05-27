仓库根有一个 `gsap/` 文件夹，含 GSAP 3.13.0 全套 25 个 .min.js（包括 ScrollSmoother / SplitText / MorphSVG / DrawSVG / GSDevTools / InertiaPlugin / Physics2D / PhysicsProps / ScrambleText / CustomBounce / CustomWiggle —— 2025 年 Webflow 收购后全部免费）。详细决策树在 `gsap/CLAUDE.md`，代码片段在 `gsap/snippets.md`，effect 模板在 `gsap/templates/`。

## 核心决策规则

**抓站后**：grep `designs/<slug>/` 是否含 `gsap` / `ScrollTrigger` / `SplitText` / `ScrollSmoother` / `MorphSVG` / `DrawSVG` / `Flip` / `Observer` / `Draggable`，把识别结果写进 effect meta.json 的 `tech` 字段。

**抽 effect**：
- 主题站镜像（base-href 法）→ effect 共享 mirror 的 GSAP，不 cp，见 `feedback-effect-extract-from-themed-mirror.md`
- self-contained → `cp gsap/dist/<需要的>.min.js effects/<NNN>/lib/`，按 A.2 自闭包规则
- 永远不要从 `gsap/` 文件夹直接 reference（违反 A.2，离线 + zip 都断）

**反模式速查**（这些情况现在统一用 GSAP，不要重蹈覆辙）：

| 历史踩坑 | 对应 sc2 memory | GSAP 替代 |
|---|---|---|
| 单个 IntersectionObserver 让所有元素一次性弹出 | `effects-extraction-must-be-1to1.md` | ScrollTrigger（每元素自己的 trigger） |
| 手算 sticky `scrolled/scrollable` 永远 ≤1.0 出 bug | `scroll-progress-cannot-exceed-1.md` | ScrollTrigger + Timeline + scrub |
| 手撸 wheel deltaY 累积 + 350ms idle reset | `feedback-webgl-effect-mix-blend-rules.md` p3 | Observer 插件 |
| bar 多 state 切换时容器/子元素尺寸不同步 | `feedback-state-toggle-effect-pitfalls.md` 1/3 | Flip 插件 |
| 字符 reveal 自己拆 span（之前 SplitText 付费） | （没踩过坑，但之前回避） | SplitText（现在免费） |

## 关键约束

**iframe 预览模式**：sc2 navigator 缩 0.25 显示卡片预览。约定 `?demo=preview` 参数下要：
1. 跳过 ScrollTrigger 注册，直接 `gsap.set(..., 末态)` 让卡片有内容
2. 不要启用 ScrollSmoother（会跟外层 navigator 抢 wheel 事件）

每个 GSAP 用法的 effect 都要有这个 fast-forward 分支，否则卡片缩略图空白。

**版本对齐**：本仓库 GSAP 是 3.13，原站可能是 3.10/3.12 等。3.x 的 API 向后兼容，可以放心用 3.13 替代。3.x 以前（TweenLite/TweenMax）就罕见了，遇到再单独看。

## Why 这个文件夹存在

之前每抽一个 effect 我都得重新判断"GSAP 哪些插件免费可用、要不要重写、版本对不对"——浪费时间且不一致（早期 effect 用手撸 IntersectionObserver，后期才知道可以用 ScrollTrigger）。`gsap/` 是统一的工具源 + 决策指南，新进的人/AI 看 `gsap/CLAUDE.md` 一次就能上手。

## How to apply

- 抽 effect 时遇到原站用 GSAP → 默认也用 GSAP（不要降级成手撸），看 `gsap/snippets.md` 找对应模式
- 原站没用 GSAP 但你判断手撸代码会触发上表踩坑 → 主动引 GSAP
- 开新 effect → 从 `gsap/templates/effect-with-gsap.html` 起手
- 卡在 ScrollTrigger 边界/scrub/pin 不准时 → `markers: true` 调试，看 `gsap/CLAUDE.md` "iframe 预览的特殊处理" 一节
