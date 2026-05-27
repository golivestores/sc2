# sc2 / gsap — GSAP 3.13 全套（含原付费插件）

这是 sc2 仓库自带的 GSAP 工具集，目的是让**任何 clone 这个仓库的同事 + Claude Code 实例**都能开箱即用地：

1. 抓站时识别"这个站用了 GSAP，effect 抽取不需要重写动画逻辑"
2. 抽 effect 时直接 `cp gsap/dist/*.min.js effects/<NNN>/lib/`，用 GSAP 原生 API 1:1 复刻原站动画（不再手撸 IntersectionObserver / 自累积 wheel / 自算 sticky progress）
3. 复用一致的 effect 模板（见 `templates/`），减少踩坑

---

## 为什么放仓库里（不走 CDN / npm）

- **A.2 自闭包规则**（见 `docs/claude-memory/effects-gallery-format-locked.md`）：每个 `effects/NNN/` 必须自带 `lib/`，不能引 `../vendor/...`。所以每个 effect 用 GSAP 时**复制**所需 .min.js 到自己 `lib/`，不能 reference 这个文件夹。
- 这个文件夹是"**源**"，不是运行时依赖。它的作用是：(1) 给 AI/同事查"GSAP 有什么"的速查表；(2) 当 cp 源；(3) 装模板。
- 离线开发友好 + zip 打包不依赖网络。

---

## License

GSAP 3.13.0（2025 年 Webflow 收购后）**100% 免费**，包括所有曾经付费的 bonus 插件（ScrollSmoother / SplitText / MorphSVG / DrawSVG / GSDevTools / InertiaPlugin / Physics2D / PhysicsProps / ScrambleText / CustomBounce / CustomWiggle）。商用无任何额外费用。

- 标准许可：https://gsap.com/standard-license/
- 版权：© 2025 GreenSock（顶部 `/*! GSAP 3.13.0 ... */` 注释完整保留）

下载源：`https://unpkg.com/gsap@3.13.0/dist/`，2026-05-27 拉取。要升版本 → `bash` 里跑：

```bash
cd gsap/dist
for f in *.min.js; do curl -sSL "https://unpkg.com/gsap@<new-version>/dist/$f" -o "$f"; done
```

---

## 文件夹结构

```
gsap/
├── README.md           # 这个文件 —— 同事看
├── CLAUDE.md           # AI 决策树 —— Claude Code 读，决定何时/如何用 GSAP
├── snippets.md         # 常见模式 → GSAP API 代码片段，复制即用
├── dist/               # 25 个 .min.js（GSAP 3.13.0 全套）
└── templates/
    ├── effect-with-gsap.html      # 标准 self-contained effect 模板（含 ScrollTrigger）
    └── base-href-effect.html      # 主题站镜像复用 GSAP 的 base-href 模板
```

---

## dist/ 里有什么（25 个文件，~420KB）

| 文件 | 用途 | 典型场景 |
|---|---|---|
| **gsap.min.js** | 核心引擎 | 任何 GSAP 动画都需要，永远第一个引 |
| **ScrollTrigger.min.js** | 滚动驱动动画 | 元素 reveal、scrub timeline、pin section |
| **ScrollSmoother.min.js** | 平滑滚动 | Lenis 平替（Lenis 也行，看原站用啥） |
| **SplitText.min.js** | 拆 DOM 成 char/word/line | 字符 reveal hero（**之前付费**） |
| **MorphSVGPlugin.min.js** | SVG path 形变 | logo 变形、形状过渡（**之前付费**） |
| **DrawSVGPlugin.min.js** | SVG 描边动画 | 线条逐段绘制（**之前付费**） |
| **Flip.min.js** | layout 状态间过渡 | 元素从 A 位置/尺寸动画到 B 位置/尺寸 |
| **Observer.min.js** | 统一 wheel/touch/pointer 事件 | 取代手撸 wheel 累积 + 阈值 |
| **MotionPathPlugin.min.js** | 沿路径运动 | 元素沿 SVG path 移动 |
| **Draggable.min.js** | 拖拽 | 滑块、卡片拖拽、惯性 |
| **InertiaPlugin.min.js** | 惯性物理（配合 Draggable） | 自然减速、回弹（**之前付费**） |
| **CustomEase.min.js** | 自定义贝塞尔缓动 | 复杂缓动曲线 |
| **CustomBounce.min.js** | 自定义弹跳 | 弹性入场（**之前付费**） |
| **CustomWiggle.min.js** | 自定义抖动 | 摇晃、震荡（**之前付费**） |
| **ScrambleTextPlugin.min.js** | 文字打乱→还原 | hacker 风字符变化（**之前付费**） |
| **TextPlugin.min.js** | 文字逐字替换 | typewriter 效果 |
| **EasePack.min.js** | 缓动包（slow/rough/expoScale 等） | 特殊缓动 |
| **MotionPathHelper.min.js** | 可视化路径编辑器 | 开发时用，生产不引 |
| **GSDevTools.min.js** | 时间轴 debug 面板 | 开发时用，生产不引（**之前付费**） |
| **PixiPlugin.min.js** | Pixi.js 集成 | WebGL 项目用 |
| **EaselPlugin.min.js** | EaselJS 集成 | 极少用到 |
| **Physics2DPlugin.min.js** | 2D 物理 | 重力/速度/加速度（**之前付费**） |
| **PhysicsPropsPlugin.min.js** | 单属性物理 | 单值物理（**之前付费**） |
| **CSSRulePlugin.min.js** | 动画 CSS 规则本身 | 极少用 |
| **ScrollToPlugin.min.js** | 程序化滚动 | `gsap.to(window, { scrollTo: 0 })` |

**最常用 80% 场景只需要**：`gsap.min.js` + `ScrollTrigger.min.js`。其它按需。

---

## 同事/AI 上手 3 句话总结

1. **抓站时**：scrape-url.py 已经会把原站引用的 GSAP 一并镜像到 `designs/NNN/assets/`。你不用动。
2. **抽 effect 时**：原站如果用了 GSAP，**直接用 GSAP** 复刻，不要手撸 IntersectionObserver / wheel 累积。具体决策见 [CLAUDE.md](./CLAUDE.md)，代码片段见 [snippets.md](./snippets.md)。
3. **开新 effect**：从 `templates/effect-with-gsap.html` 复制，或主题站镜像抽 effect 时用 `templates/base-href-effect.html` 共享原站 GSAP。

---

## 跟 sc2 其它流程的对接

- `extract-effect-section.py`（base-href 法抽主题站）—— 因为原站的 GSAP 已经在 `designs/<mirror>/` 里，effect 通过 base href 自动能用，不需要 cp。
- `package-effects.py` —— 打 zip 时会把 effect `lib/` 里的 GSAP 一并打进去，下载即可用。
- `inject-overlay.py` —— 跟 GSAP 无关，不冲突。

详见 [CLAUDE.md](./CLAUDE.md) 决策树。
