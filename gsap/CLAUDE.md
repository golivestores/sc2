# gsap/ — Claude Code 决策指南

这个文件在你（Claude）进入 `gsap/` 目录或被主 CLAUDE.md `@` 引用时自动加载。目的是把"什么时候/怎么用 GSAP"明确化，避免重复 sc2 历史踩坑（手撸 IntersectionObserver 不准、忘记 GSAP bonus 插件现在免费、自算 sticky progress 越界等）。

---

## 决策树 1：抓站后判断是否用 GSAP

跑完 `python scrape-url.py URL NNN-slug "Title"` 之后：

```
1. grep designs/<slug>/index.html + chunks 看是否含 'gsap'
   ├── 不含 → 普通站，按常规流程走，本文件夹与你无关
   └── 含 → 进入第 2 步
2. grep 看用了哪些插件（关键字按出现频率）：
   - ScrollTrigger（最常见，~80% GSAP 站都用）
   - SplitText（字符 reveal hero / 大字 intro 必备）
   - ScrollSmoother（平滑滚动；和 Lenis 二选一，看原站）
   - Flip（layout transition，bar 多 state 切换、卡片重排）
   - Observer（自定义 wheel/touch 触发）
   - MorphSVG / DrawSVG（logo/icon 动画）
   - Draggable + InertiaPlugin（拖拽滑块、惯性）
3. 把识别结果**记在 effect meta.json 的 tech 字段**，例如 "GSAP + ScrollTrigger + SplitText"
4. 抽 effect 时直接用同款插件（见决策树 2）
```

**速判技巧**：
```bash
grep -rEoh '(gsap|ScrollTrigger|SplitText|ScrollSmoother|MorphSVG|DrawSVG|Flip|Observer|Draggable)' \
  designs/<slug>/index.html designs/<slug>/assets/**/*.js 2>/dev/null | sort -u
```

---

## 决策树 2：抽 effect 时如何引 GSAP

```
原站用了 GSAP？
├── 否 → 不引 GSAP。除非你判断手撸的 IntersectionObserver/wheel 累积代码
│        会触发 sc2 历史踩坑（见 docs/claude-memory/effects-extraction-must-be-1to1.md），
│        那种情况主动引 GSAP 让 1:1 复刻更稳。
└── 是 → 进入下一层
    │
    ├─ 是主题站镜像抽 effect（base-href 法）？
    │   见 docs/claude-memory/feedback-effect-extract-from-themed-mirror.md
    │  → 不需要复制 GSAP。原站 GSAP 已经在 designs/<mirror>/，
    │    base href 让 effect 直接复用。检查原站 GSAP 版本即可。
    │
    └─ 是 self-contained 抽取？
       → cp gsap/dist/<需要的>.min.js effects/<NNN>/lib/
       → effects/<NNN>/index.html 里按顺序引：
            <script src="lib/gsap.min.js"></script>
            <script src="lib/ScrollTrigger.min.js"></script>
            <script>gsap.registerPlugin(ScrollTrigger);</script>
```

**版本对齐**：原站如果是 GSAP 3.10（早于 ScrollSmoother）→ 用本仓库的 3.13 没问题，API 向后兼容。原站如果是 3.5 以下（老 TweenLite/TweenMax 时代）→ 罕见，需要确认 API 一致性。

---

## 决策树 3：用什么插件复刻什么模式

这是最重要的一张表 —— 直接对应 sc2 已有记忆里反复踩的坑：

| sc2 现有模式（往往是手撸） | GSAP 对应 API | 涉及的 sc2 踩坑记忆 |
|---|---|---|
| 多个元素逐个 reveal（cascade） | `gsap.utils.toArray(...).forEach(el => gsap.from(el, {opacity:0, y:40, scrollTrigger: {trigger:el, start:"top 80%"}}))` | `effects-extraction-must-be-1to1.md` |
| sticky section + scroll 进度驱动 phase | `ScrollTrigger({trigger, start:"top top", end:"+=300%", scrub:true, pin:true, onUpdate: self => { el.style.setProperty('--p', self.progress) }})` | `scroll-progress-cannot-exceed-1.md` `effect-slider-collage-rules.md` |
| wheel 累积 + 阈值切片（一次手势=一次切换） | `Observer.create({type:"wheel,touch,pointer", wheelSpeed:-1, onUp:goNext, onDown:goPrev, tolerance:10, preventDefault:true})` | `feedback-webgl-effect-mix-blend-rules.md` point 3 |
| 字符逐个 reveal hero | `const split = new SplitText(".title", {type:"chars"}); gsap.from(split.chars, {opacity:0, y:60, stagger:0.02})` | （之前付费跳过，现在直接用） |
| layout state 切换（bar 展开↔收缩，卡片重排） | `const s = Flip.getState(els); /* 改 DOM/class */; Flip.from(s, {duration:0.6, ease:"power2.inOut"})` | `feedback-state-toggle-effect-pitfalls.md` |
| logo SVG 形变 | `gsap.to("#path-a", {morphSVG:"#path-b", duration:1.2})` | （之前付费跳过） |
| 进入视口 crossfade + scale 微动 | `gsap.from(el, {opacity:0, scale:1.04, scrollTrigger:{trigger:el, start:"top 75%"}})` | `effect-slider-collage-rules.md` 动画要求 |
| ScrollSmoother（平滑滚动） | `ScrollSmoother.create({smooth:1.5, effects:true})` —— **iframe 预览时禁用** | （新坑：见下方） |

---

## iframe 预览的特殊处理（重要）

sc2 navigator 用 `transform: scale(0.25)` 把 effect 缩到 1/4 大小放卡片里。这对 GSAP 有几个影响：

### 1. ScrollTrigger 在 `?demo=preview` 下要走 fast-forward 分支

预览模式下用户看不到滚动，ScrollTrigger 算出来的 progress 永远是 0。**约定**：

```js
const isPreview = new URLSearchParams(location.search).get('demo') === 'preview';

if (isPreview) {
  // 跳过 ScrollTrigger，直接把动画播到末态（让卡片预览显示有内容的状态）
  gsap.set(".reveal-target", { opacity: 1, y: 0 });
} else {
  gsap.from(".reveal-target", {
    opacity: 0, y: 40,
    scrollTrigger: { trigger: ".reveal-target", start: "top 80%" }
  });
}
```

### 2. ScrollSmoother 在 iframe 内必须禁用

ScrollSmoother 接管 `wheel` 事件 → 跟外层 navigator 抢滚动 → navigator 卡死。**在 iframe 上下文里别用 ScrollSmoother**：

```js
const inIframe = window.self !== window.top;
if (!inIframe) {
  ScrollSmoother.create({ smooth: 1.5 });
}
```

如果原站用了 ScrollSmoother 而你必须保 1:1：在 effect 里加 banner 提示用户"在新标签页打开看完整体验"，iframe 里降级到普通滚动。

### 3. ScrollTrigger 的 start/end 像素值不受 `transform: scale` 影响

`getBoundingClientRect` 在 scale 下会返回缩放后的尺寸，但 ScrollTrigger 内部用 `offsetTop/offsetHeight`（不受 transform 影响），所以 progress 计算是对的。**不要**手动在 preview 模式下乘 0.25 之类的修正。

---

## 常见反模式（别这样写）

- ❌ `<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/gsap.min.js">` — 违反 A.2 自闭包，离线 + zip 下载都断。cp 到 `lib/`。
- ❌ `<script src="../../gsap/dist/gsap.min.js">` — 同上，违反 A.2。effect 必须自带 GSAP 的拷贝。
- ❌ 多个 effect 想共享同一份 GSAP → 不允许。每个 effect 都 cp 一份独立 `lib/gsap.min.js`，~70KB 不是问题。
- ❌ 在 `<head>` 用 `defer` 加载 GSAP 然后 `<script>` 里同步调用 `gsap.to(...)` — 同步代码会在 defer 之前跑导致 `gsap is not defined`。要么不用 defer（推荐），要么把所有 gsap 调用包在 `DOMContentLoaded` 里。
- ❌ 没 `gsap.registerPlugin(ScrollTrigger)` 就用 ScrollTrigger → 静默无效果。每个插件用前都要 register。
- ❌ 改 effect 后忘了重测 `?demo=preview` 分支 → 卡片预览空白。

---

## 工作流程清单（给 AI 自查用）

抽完 effect 标 completed 前对照：

- [ ] 原站用 GSAP？→ effect 也用 GSAP（不要手撸替代）
- [ ] 引了 GSAP 插件？→ `gsap.registerPlugin(...)` 已调用
- [ ] ScrollTrigger 动画在 `?demo=preview` 下有 fast-forward 分支
- [ ] ScrollSmoother 在 iframe 里被禁用（如果用到）
- [ ] `lib/` 里实际有所有引用到的 .min.js 文件（不是 vendor 路径）
- [ ] meta.json 的 `tech` 字段写明 "GSAP + 用到的插件名"，便于卡片标签着色
- [ ] Playwright 像素对照（按 `feedback-effect-screenshot-compare.md` 流程）通过

---

## 相关文档

- 代码片段：[snippets.md](./snippets.md)
- effect 模板：[templates/effect-with-gsap.html](./templates/effect-with-gsap.html)
- base-href 抽取模板：[templates/base-href-effect.html](./templates/base-href-effect.html)
- 一句话 toolbox 记忆：`docs/claude-memory/effect-gsap-toolbox.md`
- 自闭包规则：`docs/claude-memory/effects-gallery-format-locked.md` A.2 条
- 抽取忠诚度规则：`docs/claude-memory/effects-extraction-must-be-1to1.md`
