---
name: WebGL/Canvas effect + mix-blend-mode 复刻 5 条铁律
description: 复刻含 R3F+three.js 的水波纹/displacement effect 时反复踩过的 5 个坑：mix-blend stacking、布局 grid 不抗挤、滚动驱动、fit() 高度基准、占位图 setter 劫持
type: feedback
originSessionId: 06e32a16-db05-4598-816a-c330a78b16f0
---
复刻 fromanother.love Featured Work 水波纹时反复踩过的 5 个坑，逐条记下：

1. **`mix-blend-mode` 在 canvas 上不生效 = 多半是 stacking context 阻断**。`canvas { z-index: 2 }` 配合 `position: relative` 会让 canvas 创建独立 stacking context，标题元素的 `mix-blend-mode: difference` 取不到 canvas 像素当 backdrop，图上的字保持原色不反相。**Why**: blend 只在同一合成层内合成下层像素。**How to apply**: 让 canvas 不要 z-index/position 创建独立 stacking context；标题 absolute + z-index 高；父容器加 `isolation: isolate` + 不透明背景色作为兜底 backdrop（背景色 = 字色让 `|cream − cream| = 0` 出黑色，图上 `|cream − dark| = light` 出反相浅色）。

2. **CSS grid 列宽会强制挤换标题**。原版的设计稿是"标题左对齐 + 图居中 + 标题末尾几字伸进图区"。我用 `grid-template-columns: 1fr 1.5fr` 把标题塞到左列，左列宽度不够时 H2 会从 2 行被挤成 3 行（"Louis Vuitton Series" → "Louis / Vuitton / Series"）。**Why**: grid item 默认 `min-width: auto`，但 flex/grid 容器会按列宽截行。**How to apply**: 标题用 `position: absolute; left: 0; width: max-content`，脱离 flex/grid 流，永远按内容宽度。图用 flex container `align-items: stretch` + `flex: 1 1 100%` 让 canvas wrapper 撑满高度，fit() 才能拿到正确 maxH。

3. **scroll-pin 区域改 effect 时直接用 wheel 累积**。原版 Featured Work 是 GSAP ScrollTrigger pin 5-7 屏，每屏切一项。我做 effect 时没必要复制 pin scroll —— 直接监听 `wheel` 累积 deltaY，跨过 220px 阈值就 `goTo(next)`，配 350ms idle 重置避免 drift。一次手势 = 一次切换（transition 中忽略 wheel）。**Why**: pin 需要外层 scroll spacer + sticky，复杂且影响 effect 自闭包性。**How to apply**: `window.addEventListener('wheel', ...)` 累积 + 阈值，配触屏 swipe + 键盘三种触发都接同一个 `goTo()`。

4. **fit() 基准要用 .center 不是 .img-wrap**。grid/flex 容器里的子 item 默认 `height: auto` = 内容高度，所以 `.img-wrap.getBoundingClientRect().height` 经常返回比预期小一个数量级的值（138 instead of 952），canvas 因此被算成几十像素的极小尺寸。**Why**: flex item 在 align-items: center 下高度跟随内容，不撑满；只有 stretch 才撑满。**How to apply**: fit() 直接读 `.center`（最外层容器）的 `getBoundingClientRect().height` 作 maxH 基准；或者让 wrapper 显式 `height: 100%` + 父容器 `align-items: stretch`。

5. **WebGL TextureLoader 用 `new Image()` 加载，IMG.onerror 全局监听抓不到**。`new Image()` 不挂 DOM 树，`document.addEventListener('error', ..., true)` 只能捕获 DOM 元素事件。要让加载失败的远程图（如 Prismic 的 cover）走本地占位，必须**劫持 `HTMLImageElement.prototype.src` setter**：`Object.defineProperty(HTMLImageElement.prototype, 'src', { set: function(v){ origSetter.call(this, rewrite(v)) } })` —— 这对 DOM `<img>` 和 `new Image()` 都生效，TextureLoader 拿到的 texture 是本地图，WebGL 水波纹的 displacement 输入有效，shader 才能跑起来。`srcset` 也要同步劫持（next/image 会用）。
