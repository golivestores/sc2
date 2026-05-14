# effects — 动画/特效合集（sc2）

可复用的小型 demo 库。每个子文件夹是一个独立自包含的效果。

画廊页 [`index.html`](index.html) 由数据驱动渲染（数据源是 [`effects.js`](effects.js) / [`effects.json`](effects.json)，由根目录 [`rebuild-index.ps1`](../rebuild-index.ps1) 扫描各子文件夹的 `meta.json` 自动生成）。**新增 / 改 / 删 effect 时不要手动改 `index.html` 里的卡片列表。**

每张卡片下方有三个按钮：
- **`📋 源码`** → 打开 [`view.html`](view.html)，可以逐文件复制 HTML/CSS/JS，或下载整体 zip
- **`📦 zip`** → 直接下载这个 effect 的 zip 包（同目录下 `NNN-名字.zip`，由 `package-effects.py` 生成）
- **`原站 ↗`** → 跳转到 `meta.json` 的 `localMirror`（本地镜像 demo，用于对照原网页）

点卡片本体进 demo 单页（`effects/NNN/index.html`），demo 右上角浮起两个按钮：📦 下载 zip + 📋 源码——画廊缩略图通过 `?demo=preview` 自动隐藏 overlay。

---

## 目录结构

```
effects/
├── README.md              # 当前文档
├── index.html             # 画廊入口，从 effects.js 渲染卡片
├── view.html              # 单 effect 详情页（?effect=NNN-名字）— demo + 源码 + zip
├── effects.json           # 自动生成 · 通用 JSON 数据
├── effects.js             # 自动生成 · 被 index.html / view.html 加载
└── NNN-短名/
    ├── index.html         # demo 主体（自包含；底部 sc2-overlay 注入两个浮动按钮：📦 zip + 📋 源码，仅在非 ?demo=preview 时显示）
    ├── meta.json          # 卡片元信息（schema 见下）
    ├── original.html      # 可选 · 嵌入原站镜像作预览（适用于强依赖原站上下文的 effect）
    ├── assets/            # 可选 · demo 私有资源（图片/字体/SVG）
    ├── lib/               # 可选 · effect 自带的库副本（GSAP/Three/Lottie 等）
    ├── source-bundle.js   # 自动生成 · 被 view.html 加载（gitignored；本地用）
    └── NNN-短名.zip       # 自动生成 · 由 ../../package-effects.py 产出（gitignored；本地用）
```

---

## 添加新效果（sc2 流程）

完整 5 步流程见 [根 README](../README.md#五步工作流扩充素材库照这个走)。这里只列 effects 这部分：

1. 在 [`../designs/`](../designs/) 浏览已抓的镜像，**指定一屏**给我（截图、URL 锚点、或文字描述）
2. 跑 `python ../new-effect.py <slug> --source-url <URL> --mirror ../designs/<NNN>/index.html` → 自动建 `NNN-slug/` 骨架（index.html + meta.json + assets/ + lib/）
3. 编辑 `NNN-slug/index.html`：**1:1** 抄原镜像那段的 HTML/CSS/JS，必要时拿 `?demo=preview` 分支跑伪 cascade
4. 编辑 `meta.json`：填 `description` / `tech` / `tags`（其它字段 new-effect.py 已经预填）
5. 跑 `python ../finalize.py` → rebuild 索引 + 打 zip + 注入 overlay 一条龙
6. 浏览器开 `http://localhost:8080/effects/` 看新卡片，点进 demo 单页人工验收（hover、滚动、动画都试一遍）

### 自包含铁律 (A.2)

**不要引用 `../../vendor/` 或任何兄弟文件夹的资源**——不然 zip 下载到别人电脑上链接全坏。
- 共享库（GSAP / Three / Lottie / Swiper）：复制一份到 effect 自己的 `lib/` 子目录
- 私有资源（图片/字体/SVG）：放 effect 自己的 `assets/`
- 第三方 CDN：能不引就不引；非引不可时，引 vendor-locked 的稳定版本（如 `https://unpkg.com/gsap@3.12.5/dist/gsap.min.js`），并且 zip 内尽量改成本地化引用

代价：每个用 GSAP 的 effect 都各自带一份 GSAP（小磁盘冗余）。收益：随便一个 effect 文件夹复制到任何项目都能跑，下载 zip 解压即用。

---

## meta.json schema

```json
{
  "title":       "circle-reveal-hover",
  "subtitle":    "clip-path hover",
  "description": "鼠标悬停时，从卡片中心“撑开”一个圆形揭示背面内容。",
  "tech":        "CSS only",
  "tags":        ["animation", "interaction"],
  "previewHref": "",
  "sourceUrl":   "https://talamus.pro/",
  "localMirror": "../designs/001-talamus/index.html",
  "order":       999
}
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✓ | 卡片大标题，通常等于文件夹名后半段 |
| `subtitle` |  | 卡片小字（紧跟在 `NNN ·` 后面） |
| `description` |  | 一段话说明（纯文本；HTML 标签会被转义） |
| `tech` |  | 技术栈 tag（带特殊样式，区别于普通 tag） |
| `tags` |  | 普通 tags 数组，**同时**用于顶部 chips 筛选（`animation` / `typography` / `interaction` / `intro` / `scroll`） |
| `previewHref` |  | iframe 加载的子文件路径，默认 `index.html`。需要嵌原站镜像时填 `original.html` |
| `sourceUrl` |  | 原网站在线 URL（仅作元数据记录，不会被画廊或 viewer 直接链接） |
| `localMirror` |  | **从 `effects/` 出发的相对路径**，指向 `designs/<NNN-名字>/index.html` 这个本地镜像。画廊卡的"原站 ↗"和 viewer 的"跳转原网页 ↗"按钮用这个值。例如 `../designs/001-talamus/index.html` |
| `order` |  | 视觉排序覆盖；默认按 num 升序。要把某个 effect 压到末尾就写大数（如 `999`） |

字段都可以缺省（脚本会用合理默认值）；最少只要 `title`。

---

## 画廊页 (index.html) 设计约定 ⚠️

**卡片结构**（由 JS 自动渲染，不要手写）：

```html
<div class="card" data-tags="...">
  <div class="card__preview">
    <iframe src="NNN-x/index.html"></iframe>
    <a class="card__open" href="NNN-x/index.html" target="_blank">↗</a>  <!-- hover 才浮出 -->
  </div>
  <a class="card__body" href="NNN-x/index.html">
    <span class="card__num">NNN · subtitle</span>
    <h3 class="card__title">...</h3>
    <p class="card__desc">...</p>
    <div class="card__meta">...</div>
  </a>
</div>
```

### iframe 上**不要**叠 click 拦截 overlay

历史教训（来自 sc/）：曾经在 iframe 上加过 `.card__overlay`（`pointer-events: auto` + `position: absolute; inset: 0;`）来让"点卡片任意区域跳 demo"。后果：`:hover` 事件被 overlay 拦掉，clip-path 圆形揭示、cursor 跟随这种 hover 驱动的预览全部看不到效果。**绝对不要再加回来。**

### 两个进入 demo 的入口

- **iframe 区域**：留给 iframe 自己——hover、click、cursor 全部由 iframe 内部消费，不作为 click target
- **右上角 `↗` 角标**：`.card__open`，hover 时浮出，`target="_blank"` 在新标签打开（不丢画廊滚动位置）
- **卡片下半部分**：`.card__body` 是 `<a>`，点击在当前标签打开

### 已知代价（暂忍）

- 滚轮经过 iframe 可能被 iframe 文档吞掉（特别是有内部滚动的）。可以从卡片边缘空白处绕开
- 修复需要 `iframe.contentWindow.addEventListener('wheel', ...)` 注入转发，仅 HTTP 服务器下生效（file:// 同源策略会拦），暂不做

---

## 命名规范

- 描述效果本身，不描述具体应用场景
  - 好：`marquee-infinite-scroll`、`text-mask-gradient`
  - 不好：`hero-banner-effect`、`mana-site-thumb`
- 三位数字前缀只管排序，不表示难度/优先级
- 0xx 段（001-099）是真·可复用组件保留位，不要用来占位 / 测试 / 排序 hack

---

## 打开方式

- **双击 [`effects/index.html`](index.html)**：纯 CSS / 原生 JS 的 demo 正常显示。`effects.js` 通过 `<script>` 加载所以数据本身没问题
- **`http://localhost:8000/effects/`**（先在 sc2 根目录跑 `python -m http.server 8000`）：内部用 `fetch` / GLTF / Lottie / 跨文件资源的 demo 也能跑全套

iframe 缩放为 50%，鼠标可以**直接在预览里互动**触发 hover / cursor 等效果。
