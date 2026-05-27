# GSAP 代码片段（按 sc2 真实使用场景）

直接 copy-paste 用。所有片段假定已经引：
```html
<script src="lib/gsap.min.js"></script>
<script src="lib/<其他插件>.min.js"></script>
```

每段前会写"对应 sc2 哪个历史痛点"。

---

## 1. 多元素 cascade reveal（取代手撸 IntersectionObserver）

**对应坑**：`docs/claude-memory/effects-extraction-must-be-1to1.md` —— 我曾用一个 IntersectionObserver 让所有卡片一次性弹出，原站是逐个 cascade。

```html
<script src="lib/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',     // 元素顶部到达视口 85% 时触发
      toggleActions: 'play none none reverse'
    }
  });
});
</script>
```

**关键点**：每个元素**自己的** ScrollTrigger，不是一个共享 observer。这就是 per-element trigger 的正确写法。

---

## 2. Sticky section + scrub timeline（取代手算 progress）

**对应坑**：`docs/claude-memory/scroll-progress-cannot-exceed-1.md` —— 手算 `scrolled/scrollable` 永远 ≤1.0 且边界容易错。

```html
<script src="lib/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);

// 想让滚动从 section 顶端到底部 = animation 从 0% 到 100%
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.sticky-section',
    start: 'top top',
    end: '+=300%',          // section 高度的 3 倍滚动距离
    pin: true,              // 期间 section 被钉住
    scrub: 1,               // 0.5-1 之间，越大越平滑
    // markers: true,       // 调试时打开
  }
});

// 分阶段：0%-30% 标题淡出，30%-70% 图片放大，70%-100% 字幕进入
tl.to('.title', { opacity: 0, y: -100, duration: 0.3 })
  .to('.hero-img', { scale: 1.5, duration: 0.4 }, 0.3)
  .from('.caption', { opacity: 0, y: 40, duration: 0.3 }, 0.7);
</script>
```

**关键点**：用 timeline 时间戳（0.3, 0.7）就是 sticky 滚动的进度比例。不要自己算 `scrolled/scrollable`。

---

## 3. Wheel/touch 累积 + 阈值切片（取代手撸 wheel listener）

**对应坑**：`docs/claude-memory/feedback-webgl-effect-mix-blend-rules.md` point 3 —— 手撸 wheel deltaY 累积 + 350ms idle reset，代码绕。

```html
<script src="lib/Observer.min.js"></script>
<script>
gsap.registerPlugin(Observer);

let current = 0;
const total = slides.length;
let animating = false;

function goTo(i) {
  if (animating || i < 0 || i >= total) return;
  animating = true;
  // ... 你的切片动画 ...
  gsap.to(slides[current], { opacity: 0, onComplete: () => {
    current = i;
    gsap.to(slides[current], { opacity: 1, onComplete: () => animating = false });
  }});
}

Observer.create({
  type: 'wheel,touch,pointer',
  wheelSpeed: -1,
  onUp:   () => goTo(current + 1),  // 滚轮向下 = 下一项
  onDown: () => goTo(current - 1),  // 滚轮向上 = 上一项
  tolerance: 10,
  preventDefault: true
});
</script>
```

**关键点**：`tolerance` 自动处理"一次手势触发多次"问题，不需要手动 idle reset。`preventDefault: true` 在 iframe 里要谨慎，会阻止外层 navigator 滚动；预览模式可以关掉。

---

## 4. SplitText 字符 reveal hero（之前付费，现在免费）

**对应坑**：以前自己用 `innerHTML.split('').map(c => <span>${c}</span>).join('')` 拆字符，现在直接 SplitText。

```html
<script src="lib/ScrollTrigger.min.js"></script>
<script src="lib/SplitText.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger, SplitText);

const split = new SplitText('.hero-title', { type: 'chars,words' });

gsap.from(split.chars, {
  opacity: 0,
  y: 100,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.8,
  ease: 'back.out(1.7)',
  scrollTrigger: { trigger: '.hero-title', start: 'top 80%' }
});

// 想销毁恢复原 DOM：split.revert();
</script>
```

**关键点**：`type: 'chars,words'` 同时拆字符和词，`split.chars` 拿到 char span 数组，`stagger` 控制错位时间。

---

## 5. Flip 状态切换（取代手动多 state CSS 类）

**对应坑**：`docs/claude-memory/feedback-state-toggle-effect-pitfalls.md` —— bar 在 top/scrolled/hover/menu-open 多 state 间形变，6 个坑里 3 个跟"容器和子元素尺寸不同步"有关。Flip 一次性算好。

```html
<script src="lib/Flip.min.js"></script>
<script>
gsap.registerPlugin(Flip);

// 想让 .bar 从 collapsed → expanded
const state = Flip.getState('.bar, .bar *');  // 记录所有相关元素当前 layout
document.body.classList.add('is-expanded');    // 改 class，CSS 直接变到目标态
Flip.from(state, {
  duration: 0.6,
  ease: 'power2.inOut',
  absolute: true,           // 关键：动画期间用 absolute 定位避免 reflow
  onLeave: el => gsap.to(el, { opacity: 0, duration: 0.3 }),
  onEnter: el => gsap.from(el, { opacity: 0, duration: 0.3 })
});
</script>
```

**关键点**：写好"开始 CSS"和"结束 CSS"，Flip 自动算中间过渡。不需要写 `transition` 也不需要手动算 transform。

---

## 6. ScrollTrigger pin + 横滑

```html
<script src="lib/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray('.panel');

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-wrap',
    pin: true,
    scrub: 1,
    end: () => '+=' + document.querySelector('.horizontal-wrap').offsetWidth
  }
});
</script>
```

---

## 7. MorphSVG logo 形变（之前付费）

```html
<script src="lib/MorphSVGPlugin.min.js"></script>
<script>
gsap.registerPlugin(MorphSVGPlugin);

gsap.to('#logo-path', {
  morphSVG: '#target-path',   // 形变到这个 path 的 d 属性
  duration: 1.2,
  ease: 'power2.inOut'
});
</script>
```

---

## 8. DrawSVG 线条逐段绘制（之前付费）

```html
<script src="lib/DrawSVGPlugin.min.js"></script>
<script src="lib/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

gsap.from('path.signature', {
  drawSVG: 0,                 // 从 0% 长度开始绘制
  duration: 2,
  scrollTrigger: { trigger: '.signature-wrap', start: 'top 70%' }
});
</script>
```

---

## 9. ScrollSmoother 平滑滚动（iframe 内禁用）

```html
<script src="lib/ScrollTrigger.min.js"></script>
<script src="lib/ScrollSmoother.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const inIframe = window.self !== window.top;
if (!inIframe) {
  ScrollSmoother.create({
    smooth: 1.5,              // 滚动平滑度（秒），1-2 之间通常合适
    effects: true             // 启用 data-speed / data-lag 视差效果
  });
}
</script>
```

HTML 结构必须配套：
```html
<body>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!-- 你的所有内容 -->
    </div>
  </div>
</body>
```

---

## 10. Draggable + Inertia 滑块（之前 Inertia 付费）

```html
<script src="lib/Draggable.min.js"></script>
<script src="lib/InertiaPlugin.min.js"></script>
<script>
gsap.registerPlugin(Draggable, InertiaPlugin);

Draggable.create('.slider-track', {
  type: 'x',
  inertia: true,              // 释放后惯性滑动
  bounds: '.slider-container',
  edgeResistance: 0.65,
  throwResistance: 2000
});
</script>
```

---

## 11. `?demo=preview` 兼容样板

每个用 ScrollTrigger 的 effect 都要这一段：

```js
const isPreview = new URLSearchParams(location.search).get('demo') === 'preview';

if (isPreview) {
  // 卡片缩略图模式：把动画直接播到末态
  gsap.set('.reveal-target', { opacity: 1, y: 0, scale: 1 });
  // 别 registerPlugin / 别 create ScrollTrigger
} else {
  gsap.registerPlugin(ScrollTrigger);
  // 正常 ScrollTrigger 代码
  gsap.from('.reveal-target', {
    opacity: 0, y: 60,
    scrollTrigger: { trigger: '.reveal-target', start: 'top 80%' }
  });
}
```

---

## 12. 调试技巧

```js
// 在 ScrollTrigger 上加 markers（黄绿色线）可视化触发位置
scrollTrigger: { trigger: '.x', start: 'top 80%', markers: true }

// 列出所有活跃的 ScrollTrigger
ScrollTrigger.getAll().forEach(st => console.log(st.vars.trigger, st.progress));

// 强制刷新（resize 后用）
ScrollTrigger.refresh();

// GSDevTools（开发时用，生产删除）
gsap.registerPlugin(GSDevTools);
GSDevTools.create({ animation: myTimeline });
```

---

## 决定用哪个：参考表

| 场景 | 用啥 |
|---|---|
| 元素进视口淡入 | ScrollTrigger（无 scrub） |
| 滚动驱动多阶段（pin） | ScrollTrigger + Timeline + scrub |
| 字符/词逐个动画 | SplitText |
| layout 切换（A 位置→B 位置） | Flip |
| 自定义 wheel/touch 触发逻辑 | Observer |
| SVG path 形变 | MorphSVGPlugin |
| SVG 描边绘制 | DrawSVGPlugin |
| 平滑滚动 | ScrollSmoother（iframe 外）/ 原生（iframe 内） |
| 拖拽 + 惯性 | Draggable + InertiaPlugin |
| 沿路径运动 | MotionPathPlugin |
| 文字打乱→还原 | ScrambleTextPlugin |
| typewriter | TextPlugin |
