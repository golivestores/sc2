---
name: effect 多状态 (collapsed/expanded/hover/scroll/intro) 切换的 6 个常见坑
description: 实现带 scroll+hover+intro 多 state 切换的 bar/overlay effect 时，6 个会反复掉的坑及修法。下次再做类似 donmolinico 顶部条 / morphing logo 时直接照抄
type: feedback
originSessionId: 3ccfc27b-75f3-4b05-9dcb-3b5ecefdd9dd
---
做带多 state 切换的 effect（顶部 bar 在 top-of-page / scrolled / hover / menu-open 之间切换，加上入场动画）时，下面 6 个坑反复掉过——以后做这类直接对照避雷：

## 1. 容器尺寸与内部 layout 不同步
**症状**：collapsed 时 bg 红方块缩小，但内部 logo 跑到 bg 红框外面去（M 王冠悬挂在 bar 下方）。
**Why**：`.menu-label` 容器保持展开尺寸不动、只把 `.menu-label__bg` 缩小。`.menu-label__inner` 用 `flex` + `justify-content: space-between` 按**容器高度**分布 hamburger 和 logo，结果在 collapsed 时它把内容铺在比可见 bg 大得多的容器里。
**How to apply**：永远动整个**容器**尺寸（`.menu-label { width, height }`），让 `__bg` 永远 `100% / 100%` 跟随容器。flex `space-between` / padding / 内容的 hit-area 都自动跟随。

## 2. CSS `:hover` 在 cursor 静止时黏住
**症状**：用户点完 hamburger 关菜单后滚鼠标滚轮，bar 不收缩。
**Why**：CSS `:hover` 只取决于 cursor 当前位置，鼠标不动也算 hover。点完 hamburger cursor 留在 bar 上 → `:hover` 一直命中 → `:hover` 规则把 bar 顶回展开态、压过 `is-scrolled` 的收缩规则。
**How to apply**：scroll 触发 + hover 触发同时存在时，**不要用 CSS `:hover`**，改用 JS 控的类：
```js
bar.addEventListener('mouseenter', () => body.classList.add('is-bar-hovered'));
bar.addEventListener('mouseleave', () => body.classList.remove('is-bar-hovered'));
window.addEventListener('scroll', () => body.classList.remove('is-bar-hovered'));  // 关键：滚动强制去 hover
bar.addEventListener('mousemove', () => { if (Date.now() - lastScrollTs > 200) body.classList.add('is-bar-hovered'); });  // 滚动停 200ms 后 mousemove 才能重新点亮
```

## 3. wrapper opacity 切换时子元素 opacity 没跟着切
**症状**：scroll 后 hover bar，bar 展开了但里面金字一片空。
**Why**：`body.is-scrolled .logo-morphing { opacity: 0 }` 把 wrapper 关掉。补 `body.is-scrolled.is-bar-hovered .logo-morphing { opacity: 1 }` 让 wrapper 回来——但内部 `> g` 元素还停在 `body.is-scrolled .logo-morphing > g { opacity: 0 }` 上没人重置。wrapper 可见、子元素全透明 → 空框。
**How to apply**：写"反向 state 覆盖规则"时记得**所有被前向规则触及的层级都要逐层重置**，wrapper 一条不够。stagger transition-delay 同理。

## 4. intro overlay z-index 把要展示的内容压在底下
**症状**：入场红幕铺满时金字 logo 看不到。
**Why**：intro 红幕（z-index 25）盖住了 bar（z-index 20），bar 内的入场大字 logo 跟着被埋。
**How to apply**：intro overlay 必须低于（或显式地让 in-flight 内容高于）入场期间要展示的内容。我的方案是把 curtain z-index 调到 15，bar z-index 20，bar 内 logo 自然漂在 curtain 之上。或者把入场 logo 拎出来做成独立 `position: fixed` 元素 z-index 高于 curtain。

## 5. SVG `<use href="#xxx">` 引用不存在的 id 静默失败
**症状**：入场大字 logo 完全不渲染。
**Why**：写了 `<use href="#logo-full" />` 但没有元素加 `id="logo-full"`。SVG `<use>` 找不到引用对象不报错、不警告，只是空白。
**How to apply**：拷贝复用 SVG 资源时**直接内联复制 path**，别用 `<use>`。多 +3KB 但确定不静默失败。

## 6. 重构后旧 keyframe 没清理，造成入场尾端"残留图案"
**症状**：红幕缩到顶时小 M 王冠和大字 DON MOLINICO 叠在一起出现（M 浮在大字 logo 上）。
**Why**：早期版本默认是 collapsed 态，有 `@keyframes mono-enter { 0,80% opacity:0; 100% opacity:1 }` 在 `.is-entering` 期间把 mono 淡入到 1。后来翻转默认成 expanded，mono 入场后应该保持 0，但这条 keyframe 没删——尾端被淡入到 0.95，跟 bar 的 morphing logo 同位置叠加。
**How to apply**：重大重构（翻转默认 state、改变 intro 终态）后，grep 当前文件**所有 `@keyframes` 和 `.is-entering`/`is-scrolled` 等 state class 规则**，逐条问"这条还匹配新设计意图吗"。残留的 keyframe 永远 forwards 把元素卡在你不想要的态。

## 工作流提醒
- **每次实测**：用 Playwright `page.evaluate` 同时读 `body.className`、关键元素 `opacity` / `getBoundingClientRect`、并截图——单看截图会漏 wrapper/children 不同步这类问题（截图看起来对、数值不对）。
- **状态机展开测**：每个 state + 每个 transition（top → scroll → hover → menu-open → scroll-while-hover）都过一遍，别只测主路径。
