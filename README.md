# sc2 — 网页素材库

个人维护的「抓站镜像 + 可复用代码块」库。两根支柱：

- **`designs/`** — 整站离线镜像（用 `scrape-url.py` 抓回来）。用于浏览整站、抽具体段落。
- **`effects/`** — 从镜像里挑出来的可复用代码块（hero、卡片网格、CTA 等）。每个块自包含、可单独打 zip 给同事直接用。

入口三个页面：根 `index.html`（镜像导航）、`effects/index.html`（块画廊）、`effects/view.html`（块详情 + 一键复制 / 下载 zip）。

---

## 目录

- [快速上手](#快速上手)
- [目录结构](#目录结构)
- [流程 1：抓一个新网站到 designs/](#流程-1抓一个新网站到-designs)
- [流程 2：从 designs/ 抽一段做 effect](#流程-2从-designs-抽一段做-effect)
- [meta.json 字段表](#metajson-字段表)
- [分类标签 / chip 筛选](#分类标签--chip-筛选)
- [核心约定（这些不能违反）](#核心约定这些不能违反)
- [脚本速查](#脚本速查)
- [常见问题 / 坑](#常见问题--坑)

---

## 快速上手

**新机器准备工作**：

1. 克隆 / 拷贝整个 `sc2/` 目录到本机
2. 装 Python 3（任意 ≥3.10 的发行版即可）
3. 打开终端进项目根：
   ```powershell
   cd c:\Users\EDY\Documents\sc2
   ```
4. 起本地 HTTP 服务器：
   ```powershell
   python -m http.server 8080
   ```
5. 浏览器开 <http://localhost:8080/>

**为什么必须用本地服务器**：根目录的 `index.html`（导航页）通过 `fetch('designs/')` 扫子目录列表，浏览器在 `file://` 下禁 fetch，必须经 HTTP。effects 的画廊和 viewer 也大量依赖相对路径资源，HTTP 下最稳。

> **小贴士**：每次新机器开工，第一件事就是 `python -m http.server 8080`。后续所有 URL 都基于 `http://localhost:8080/`。

---

## 目录结构

```
sc2/
├── README.md                  ← 你正在看的文件
├── index.html                 ← 根导航：自动扫描 designs/ 下所有镜像
├── designs.json               ← 自动生成（rebuild 时刷新；新版导航不依赖它）
├── designs/                   ← 整站镜像
│   └── NNN-站名/
│       ├── index.html         ← scrape-url.py 抓回来的入口（自动注入了 path shim）
│       ├── meta.json          ← 标题 / 描述 / 原 URL / 抓取日期
│       └── assets/<host>/...  ← 资源（按原网址路径镜像）
│
├── effects/                   ← 可复用代码块
│   ├── index.html             ← 画廊：扫 effects.js 渲染卡片，带 chip 筛选
│   ├── view.html              ← 详情页（?effect=NNN-名字）：demo + 一键复制 + 下载 zip
│   ├── effects.json           ← rebuild 自动生成
│   ├── effects.js             ← rebuild 自动生成（被 index/view 加载）
│   ├── README.md              ← effects 子目录的轻量说明（与本文档互补）
│   └── NNN-短名/
│       ├── index.html         ← demo 主体（自包含！）
│       ├── meta.json          ← 卡片元数据 + sourceUrl + localMirror
│       ├── assets/            ← demo 私有资源（图片、视频、字体 …）
│       ├── lib/               ← demo 自带的第三方 JS 副本（splitting.js / simpleparallax.js …）
│       ├── source-bundle.js   ← 自动生成：viewer 用的文件内容 + paste-ready snippets（不要手改）
│       └── NNN-短名.zip       ← 自动生成：解压双击即跑的单个块
│
├── scrape-url.py              ← URL → designs/<NNN>/ 离线镜像
├── rebuild-index.ps1          ← 扫 designs/ + effects/ 重建索引（effects.js / effects.json / designs.json）
├── rebuild-index.bat          ← 上面 ps1 的 GUI 启动器（双击）
├── package-effects.py         ← 给每个 effect 生成 source-bundle.js + zip
│
├── builds/                    ← 改动测试 / 一次性产出（与本流程无关）
└── vendor/                    ← 旧版共享库（gsap / lottie / swiper / three）。新 effect 不引用它，遵循自包含约定
```

新机器上**不要忘记**保留所有上面这些脚本和约定文件——只删 effects 或 designs 子目录是 OK 的，但脚本、index.html、view.html、本 README 是基础设施。

---

## 流程 1：抓一个新网站到 designs/

### 一行命令

```powershell
python scrape-url.py https://example.com/ NNN-短名 "可读标题"
```

例：

```powershell
python scrape-url.py https://talamus.pro/ 001-talamus "Talamus"
python scrape-url.py https://shift5.io/ 002-shift5 "Shift5"
```

### scrape-url.py 自动做的事

1. **抓首页 HTML**（带浏览器 UA，避免被反爬）
2. **解析 HTML 里所有资源引用**：CSS、JS、图片、字体、视频、`data-*` 属性里的 URL …
3. **下载到本地**，按原 URL 路径镜像到 `designs/<NNN>/assets/<host>/...`
4. **二次扫 CSS**：`url()` `@import` 引用的字体 / 图片再下一遍
5. **三次扫 JS**：每个下载下来的 JS 文件里 grep `"./X.js"` `"/api/X.json"` 这种字符串字面量动态 chunk，递归补抓（解决 Vite/Webpack/Astro 类站点的动态 import 问题）
6. **重写 HTML**：所有原 URL 替换成本地相对路径
7. **顶部注入 path shim**：用 fetch + XHR 拦截，把 JS 里 hardcode 的根绝对路径（`/api/data.json` `/_astro/x.hdr` 等）改写为相对路径——让镜像在 sub-iframe 里也能跑

### 抓完后

- 镜像目录长这样：`designs/001-talamus/{index.html, meta.json, assets/...}`
- 浏览器开 <http://localhost:8080/designs/001-talamus/index.html> 验证
- 根导航页（`http://localhost:8080/`）刷新一下，新卡片自动出现（自动扫 `designs/`，不依赖 designs.json）

### 抓站可能漏的东西

`scrape-url.py` 顶部有 docstring，列了几条已知 gotcha：

- **数字编号的 Webpack chunk**（如 `__webpack_require__.e(123)`）：URL 是运行时拼出来的，没有字符串字面量，grep 不到。需要手动读 runtime.js 找模板再 curl
- **协议相对的关键 CSS**（`<link href="//host/x.css">` 含 `&amp;`）：可能编码失败
- **WebGL / Three.js 类站**：动态拼 `ASSET_DIR + "/models/" + name + ".glb"` 这种没法静态发现，需要起服务器看 404 日志迭代

如果某个交互在镜像里没工作，F12 看 Network 面板找 404，然后 curl 补到对应路径。

---

## 流程 2：从 designs/ 抽一段做 effect

### 完整 4 步

1. **指定要抽哪段**：浏览 `localhost:8080/designs/<NNN>/index.html`，选定一屏 / 一段交互（截图、URL 锚点、文字描述都行）

2. **建 effect 文件夹**：

   ```
   effects/NNN-短名/
   ├── index.html      ← 自包含 demo（HTML + 内联 CSS + 内联 JS）
   ├── meta.json       ← 见下方 schema
   ├── assets/         ← 该 effect 的私有图片 / 视频 / 字体
   └── lib/            ← 该 effect 用到的第三方 JS 副本（不引 ../../vendor/）
   ```

   index.html 的写法关键点：
   - 从原镜像扒 HTML 段、扒 CSS 规则、扒 JS 模块，**verbatim 1:1 还原**——不要按"理解+重写"做（[原因](#核心约定这些不能违反)）
   - 第三方库（splitting.js、simpleparallax-js 等）从 CDN 下到 `lib/`，HTML 里 `<script src="lib/X.js">`
   - 字体 fallback 友好：原站 Adobe Typekit 等私有字体不能打包，用 fallback 链 + 可选 Google Fonts 链接

3. **跑 rebuild + packager**：

   ```powershell
   powershell -ExecutionPolicy Bypass -File rebuild-index.ps1
   python package-effects.py
   ```

   - rebuild 把 effect 加进 `effects.js` 让画廊认识它
   - packager 生成 `source-bundle.js`（viewer 用）和 `NNN-短名.zip`（下载用，索引页"下载 zip"按钮指向它）

4. **刷新画廊** <http://localhost:8080/effects/>，新卡片自动出现，缩略图里有伪 cascade 动画。点 `</> 源码` 进 viewer 验证 paste-ready 代码 + zip 下载

### 仅迭代修改 effect 内容（暂时不需要新 zip）

```powershell
python package-effects.py --bundle-only
```

只更新 source-bundle.js（viewer 渲染所需），跳过 zip 生成。改完一轮想出 zip 时再去掉 `--bundle-only` 跑全套。

---

## meta.json 字段表

```json
{
  "title":       "Talamus 错位卡片网格",
  "subtitle":    "staggered card grid",
  "description": "7 张白色卡片用 grid + nth-child(8n+k) 错位排布……",
  "tech":        "CSS Grid + IO + simpleparallax-js",
  "tags":        ["animation", "intro", "scroll"],
  "previewHref": "",
  "sourceUrl":   "https://talamus.pro/",
  "localMirror": "../designs/001-talamus/index.html",
  "order":       1
}
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✓ | 卡片大标题 |
| `subtitle` |  | 卡片小字（紧跟在 `NNN ·` 后面） |
| `description` |  | 一段说明（会被 HTML escape，纯文本） |
| `tech` |  | 技术栈标签（米黄色单独样式） |
| `tags` |  | 数组，**英文键**。命中 chip 列表的会显示成蓝色中文（动画 / 入场 等），其它显示成黄色 |
| `previewHref` |  | 缩略图 iframe 加载的子文件，默认 `index.html` |
| `sourceUrl` |  | 原网站 URL（仅作元数据记录，不会被任何按钮直接链接） |
| `localMirror` |  | **从 `effects/` 出发的相对路径**到 `designs/<NNN>/index.html`。画廊卡的"原站 ↗"和 viewer 的"跳转原网页 ↗"按钮用这个值。例：`../designs/001-talamus/index.html` |
| `order` |  | 排序覆盖；默认按 num 升序 |

---

## 分类标签 / chip 筛选

画廊顶部 chip 列表：

| chip 中文 | data-filter 英文键 |
|---|---|
| 全部 | all |
| 动画 | animation |
| 文字 | typography |
| 交互 | interaction |
| 入场 | intro |
| 滚动 | scroll |
| 首屏 | hero |

约定：

- **meta.json 的 `tags` 数组里始终用英文键**（`"tags": ["animation", "intro", "hero"]`）
- 渲染时画廊和 viewer 的 `CATEGORY_LABELS` 把英文键映射成中文显示（蓝色 `.tag--category` 样式）
- 不在上表里的自由 tag（如 `"glassmorphism"` `"clip-path"`）保持原文 + 黄色 `.tag` 样式
- **加新 chip 的话**：同时改两处——`effects/index.html` 的 `<button class="chip" data-filter="...">中文</button>` + `effects/view.html` 里硬编码的 `CATEGORY_LABELS` 字典

---

## 核心约定（这些不能违反）

### A.2 自包含

每个 `effects/NNN-短名/` 文件夹**完全自包含**：

- ❌ 不引用 `../../vendor/`、不引用兄弟 effect 的资源
- ✅ 用到的库（GSAP / Three / splitting.js / simpleparallax-js …）下载到自己的 `lib/`
- ✅ 用到的图片 / 视频 / 字体放自己的 `assets/`
- ✅ Google Fonts 等 CDN 是允许的（在线 fallback；离线时自动落到系统字体）

代价：用 GSAP 的 effect 各自一份 GSAP 副本（小磁盘冗余）。收益：随便复制文件夹到任意项目都能跑、解压 zip 不会缺文件。

### 1:1 还原（看代码写代码）

抽 effect 时**不能简化原版交互**。三个反面教训（来自实战）：

| 错误 | 正确做法 |
|---|---|
| "原版用 per-element 滚动监听，我用一个 IntersectionObserver 统一触发，差不多" | per-element 触发产生 cascade，整组触发是一次性显——视觉感受完全不同。抄原版机制 |
| "原版用 simpleparallax-js，但 CSS 错位已经够好看，我跳过库" | 滚动 drift 是核心交互之一。下载库到 `lib/`，verbatim 调用同样参数 |
| "我加了原版没有的 hero header / 标题文案" | effect 只装"被指定的那一段"。脚手架放 `data-demo-only` 标记的元素里，packager 会从 paste-ready snippet 里剥掉 |

判断标准：拿原网站对比着滚一下，每个动画节奏 / 触发时机都对得上。

### `data-demo-only` 属性

在 effect 的 index.html 里，凡是**仅为 demo 展示**而加（不属于 block 本体）的元素都加这个属性：

```html
<header class="demo-intro" data-demo-only>
  <h1>Effect Name</h1>
  <p>Scroll down ↓</p>
</header>
```

`package-effects.py` 在生成 viewer 的 paste-ready HTML snippet 时会**剥掉所有标了 `data-demo-only` 的元素**，让用户复制走的是干净的 block 主体。

### `?demo=preview` querystring

画廊缩略图 iframe 加载 effect 时会拼上 `?demo=preview`：

- 不带参数（独立打开 / 解压 zip 双击）：完全 1:1 原版行为
- 带参数（缩略图 iframe）：
  - 隐藏 `.demo-intro`（如果有）
  - 跳过 scroll trigger，改用 `setTimeout` 走伪 cascade（让小缩略图也有动画感而不需要滚动）

每个 effect 的 index.html 自己决定怎么响应这个参数（参考 001-talamus-card-grid 和 003-talamus-cta 的实现）。

---

## 脚本速查

### `scrape-url.py`

```powershell
python scrape-url.py <URL> <NNN-名字> ["可读标题"]
```

新增整站镜像。auto-注入路径 shim、auto-发现动态 chunk。

### `rebuild-index.ps1` / `.bat`

```powershell
powershell -ExecutionPolicy Bypass -File rebuild-index.ps1
# 或者 GUI：双击 rebuild-index.bat
```

扫 `designs/*` + `effects/*` 重建 3 个索引文件：

- `designs.json`（兼容字段，新版根导航不依赖）
- `effects/effects.json`
- `effects/effects.js`（被 effects/index.html 和 effects/view.html 加载）

**何时跑**：增 / 删 / 改了任何 `meta.json` 或新建 / 删除了 effect 子目录后。

### `package-effects.py`

```powershell
python package-effects.py                  # 全套：source-bundle.js + zip
python package-effects.py --bundle-only    # 仅刷新 source-bundle.js（迭代时省时）
```

为每个 `effects/NNN-/` 子目录生成：

- `source-bundle.js` —— 文件内容 + 拆好的 paste-ready snippets，viewer 通过 `<script>` 标签加载（在 file:// 下也能跑）
- `NNN-名字.zip` —— 单 HTML 文件 + 媒体（视频音频留为单独文件不 base64 内联，其它文本资源 inline）

**何时跑**：每次改了 effect 的 index.html / 资源后。

---

## 常见问题 / 坑

### "`Failed to fetch`" / "数据不显示"

- **根导航 / 画廊页**：必须经 HTTP 服务器（`python -m http.server 8080`）打开，`file://` 不行
- **viewer**：使用 `<script src="source-bundle.js">` 加载数据，`file://` 也能跑。如果还报错，多半是**忘了运行 packager**，去跑 `python package-effects.py --bundle-only`

### 浏览器缓存导致看不到改动

- 旧 `index.html` / `effects.js` 被浏览器缓存了
- **Ctrl + F5** 强制刷新即可

### 解压 zip 后视频不播

- 最常见原因：**没真正解压**。Windows 资源管理器允许"双击预览 zip 内 HTML"，但只把 HTML 解到临时目录，**`assets/` 子文件夹没跟出来**。所以 `<video src="assets/X.mp4">` 路径解析失败
- **正确做法**：右键 zip → "解压全部"到目标文件夹 → 再去那个文件夹双击 `index.html`
- effect 的 index.html 已经有 JS 安全网：autoplay 被拦时自动显示 controls，video 加载失败时 console 会喊 `[sc2] video failed to load`

### 字体看起来比原网站细 / 偏

- 原网站常用 Adobe Typekit（如 halyard-display），账号绑定的 woff2 不能合规打包
- 我们用 `font-family: "halyard-display", "Inter", -apple-system, ..., sans-serif` 这种 fallback 链
- 配 Google Fonts 的 Inter（在 effect 的 `<head>` 里有 `<link>`），online 时视觉接近、offline 落系统字体
- 视觉重量差（halyard 500 比 Inter 500 厚很多）已经把 demo 里 `font-weight` bump 到 700-800 补偿

### 动画字符顶部被裁

- 来自 `.word { overflow: hidden }` + `transform: translateY(-9px)` 上抬：halyard-display 的字面 metrics 让 -9px 不会裁切，但 fallback 字体（Inter / 中文系统字体）字面更高，会顶出 `.word` 边界
- 修复：`line-height: 1.1`（原版紧贴 ~0.95 改宽松）+ `padding-top: 0.12em; margin-top: -0.12em` 给上方缓冲 + 终态 `translateY(0)` 而不是 `-9px`
- 002-talamus-hero 的 CSS 有这个修法，未来再做带字符动画的 effect 照搬即可

### Webpack / Vite 动态 chunk 在镜像里漏抓

- `scrape-url.py` 已经会 grep JS 字符串字面量里的 `"./X.js"` 自动补抓 ✓
- 但 `__webpack_require__.e(123)` 这种数字编号 chunk（URL 由 publicPath + 模板拼出来）grep 不到
- F12 Network 面板看 404，找出缺哪个 chunk，然后 curl 补到对应本地路径

---

## 其他人 / 其他设备复刻这套库

需要带过去的最小集合：

```
sc2/
├── README.md            ← 本文件
├── index.html           ← 根导航
├── scrape-url.py
├── rebuild-index.ps1
├── rebuild-index.bat
├── package-effects.py
├── designs/             ← 你已有的镜像（也可以从空开始）
└── effects/
    ├── index.html       ← 画廊
    ├── view.html        ← 详情页
    ├── README.md        ← 子目录说明
    ├── effects.js       ← 自动生成（首次跑 rebuild 后才有）
    ├── effects.json
    └── （以及各 NNN-名字 子目录）
```

复刻流程：

1. 拷贝整个 `sc2/` 目录到新机器
2. 装 Python 3
3. `cd c:\path\to\sc2`
4. `python -m http.server 8080`
5. 浏览器开 `http://localhost:8080/`，所有现有内容都能用

新增内容：跑 `scrape-url.py` 抓站、按本 README 流程 2 抽 effect。

如果新机器是 Mac/Linux：rebuild-index.bat 不能用，直接 `pwsh -File rebuild-index.ps1` 或者把 ps1 翻译成 shell 脚本（核心逻辑就是扫文件夹 + 写 JSON）。
