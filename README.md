# sc2 — 网页素材库

把别人家网站抓回来 + 从里面挑可复用的"块"做成素材库。两根支柱：

- **`designs/`** —— 整站离线镜像（用 `scrape-url.py` 抓）。看整站、找参考、挑要抽的段落。
- **`effects/`** —— 从镜像里抽出来的小型可复用代码块（hero、卡片网格、CTA、过场动画…）。每个块自包含、能单独打 zip 发出去。

两个入口页（项目根起本地服务器后访问）：

| 入口 | URL | 用途 |
|---|---|---|
| 镜像导航 | <http://localhost:8080/designs/> | 浏览所有抓回来的整站 |
| 代码块画廊 | <http://localhost:8080/effects/> | 浏览/复制/下载所有 effect |

---

## 同事开荒：5 分钟跑起来

```powershell
# Windows
cd c:\path\to\sc2
python -m http.server 8080
```

```bash
# macOS / Linux
cd /path/to/sc2
python3 -m http.server 8080
```

浏览器开 <http://localhost:8080/designs/>，能看到镜像卡片就说明 OK。

**第一次还要装两个工具**（只装一次，以后不用管）：

```powershell
# Playwright（headless 浏览器，自动验证抓取/截图对比 effect 用）
pip install playwright
playwright install chromium

# FFmpeg（视频压缩；只在你想瘦镜像/effect 体积时才用）
winget install --id=Gyan.FFmpeg -e --source winget     # Windows
brew install ffmpeg                                     # macOS
```

如果不装 Playwright，`scrape-url.py` 的 `--no-verify` 提示会出现，但其它功能照常。

---

## 五步工作流（扩充素材库照这个走）

### 第 1 步 · 抓一个网站到 `designs/`

```powershell
python scrape-url.py https://example.com/ 008-example "Readable Title"
```

`scrape-url.py` 自动做这些事：

1. 下载页面 + 所有同源 CSS/JS/图片/视频/字体
2. 重写 HTML / CSS 里的链接到本地路径
3. 注入"path shim"——hook `fetch` / `XHR`，把 `/api/...` 这类根绝对路径自动改成相对，让镜像在 navigator iframe 里也能跑
4. 自动复制 `_nuxt/` `_astro/` `_next/` `_app/` `_svelte/` 等框架目录到镜像根——Nuxt/Astro/Next/SvelteKit 这些站运行时会拼根绝对路径取 manifest（如 `/_nuxt/builds/meta/<buildId>.json`），不复制就 404
5. 跑一次 `python finalize.py --skip-package --skip-overlay`（内部调 `rebuild-index.py`）让 `designs/index.html` 认识新卡片
6. 用 Playwright 加载本地镜像、报 console errors / 404 / 截一张 `preview.png`

如果不需要自动验证：`python scrape-url.py URL 名字 --no-verify`。如果不需要自动 rebuild：`--no-rebuild`。

**抓 Nuxt SPA**（如 obsidianassembly、donmolinico 之类用 Vue Router 客户端路由的站）：加 `--nuxt-spa-fixup` 一并跑下 5 步补救（补 CSS chunks、复制 images/fonts 到根、`/images/` → `./images/`、注入 `<base href>`、补 lazy 图）。Nuxt 2 多两步：改写内联 `__NUXT__.basePath` 让 Vue Router 路由匹配本地路径、改写 webpack `f.p="/_nuxt/"` 让 lazy chunks 走 base href。详见 memory [nuxt3-spa-mirror-recipe.md](.claude/projects/c--Users-EDY-Documents-sc2/memory/nuxt3-spa-mirror-recipe.md)。

对已经抓回来但忘了加 `--nuxt-spa-fixup` 的镜像，可以事后再跑：`python nuxt-spa-fixup.py designs/NNN-slug`（幂等；从该 folder 的 `meta.json.sourceUrl` 反推原 host）。

抓完去 <http://localhost:8080/designs/>，新卡片就在那。

### 第 2 步 · 确认抓取结果，缺什么补什么

scrape 末尾会打印：

```
[verify] headless rendering http://127.0.0.1:.../designs/008-example/index.html
  title:        'Example - Some Headline'
  body length:  43102 chars
  screenshot:   designs/008-example/preview.png
  ERRORS (1):
    [error] Failed to load resource: ...
  404/failed resources (3):
    net::ERR_ABORTED https://...somecdn.com/...
```

**判断标准**：

- 标题对得上、body 字数合理（hero/header SSR 渲染出来的 > 1000 字符通常 OK）→ 多半正常
- 一堆 404 + body 几乎空 → 漏抓了关键资源；翻 docstring 顶部「KNOWN GOTCHAS」对症处理（Webpack 数字 chunk、协议相对 CSS、运行时拼接的 chunk 路径等）
- 部分 404 但页面看着正常 → 多半是 favicon / 营销 pixel / 第三方 tracker，无所谓

**不对的话**：跟我（或 Claude）说哪里不对、怎么不对，我看 console / 截图改 scraper 或手工补。

### 第 3 步 · 从镜像里挑一段抽成 effect

挑好之后给我（Claude）：

- 镜像里哪一段（截图 + URL 锚点 + 区域选择器三选一）
- 这段叫什么（slug，如 `xyz-hero` 或 `widget-scroll-list`）

我会：

1. 跑 `python new-effect.py <slug> --source-url <URL> --mirror "../designs/<NNN>/index.html"`——脚本建好 `effects/NNN-slug/{index.html, meta.json, assets/, lib/}` 骨架（含 `?demo=preview` plumbing 注释）
2. 把镜像里那段的 HTML / CSS / JS **1:1** 抄进 index.html（核心约定见后面）
3. 把动画依赖的第三方库（GSAP / splitting.js / simpleparallax-js / Three.js 等）复制到 effect 的 `lib/`；自己的图/视频/字体放 `assets/`
4. 填 `meta.json`（`title` / `subtitle` / `description` / `tech` / `tags` / `localMirror`）。`tags` 按 [TAGS.md](TAGS.md) 五轴规范填——错了下一步打包会拒

### 第 4 步 · 收尾 + 验证 effect

```powershell
python finalize.py                              # 三件套：rebuild + package + inject-overlay
```

`finalize.py` 会跑完：

| 步骤 | 产物 | 用途 |
|---|---|---|
| `rebuild-index.py` | `effects/effects.{js,json}` + `designs/designs.{js,json}` + `effects/tag-axis.js` | 让画廊看见新卡片 |
| `package-effects.py` | `effects/NNN/<NNN>.zip` + `source-bundle.js` | 卡片下载按钮 + viewer paste 块 |
| `inject-overlay.py` | 每个 `effects/NNN/index.html` 底部注入浮动 overlay | demo 单页右上角的 📦 zip + 📋 源码 按钮 |

**自查清单**（每次交付前必走一遍）：

- [ ] 列出原站这段所有的动画 / 交互（hover、scroll trigger、自动播放、cascade 顺序）
- [ ] 在 demo 里逐项试一遍——有没有缺
- [ ] 字体、颜色、间距与截图肉眼一致
- [ ] 用到的第三方库都在 `lib/` 里、`<script src>` 路径正确
- [ ] `?demo=preview` 加载下不会有 scroll trigger 卡住、伪 cascade 跑得正常
- [ ] `meta.json` 的 `tags` 按 [TAGS.md](TAGS.md) 填齐五轴（`package-effects.py` 会自动校验）

不对就改回第 3 步循环，直到满意。

### 第 5 步 · 还要抽别的段吗？

回第 3 步即可。每次抽完跑一次 `finalize.py` 就行（idempotent，再跑一次不会出问题）。

---

## 目录结构

```
sc2/
├── README.md                  ← 本文件
├── .gitignore                 ← 排 .claude / *.zip / source-bundle.js / preview.png 等生成物
│
├── designs/                   ← 整站镜像
│   ├── index.html             ← 镜像导航：读 designs.js 渲染卡片
│   ├── designs.json           ← rebuild 自动生成
│   ├── designs.js             ← rebuild 自动生成（被 designs/index.html 加载）
│   └── NNN-站名/
│       ├── index.html         ← scrape-url.py 抓回来 + 注入 path shim
│       ├── meta.json          ← 标题 / 描述 / 原 URL / 抓取日期
│       ├── preview.png        ← scrape verify 时截图（gitignored）
│       ├── assets/<host>/...  ← 资源（按原网址路径镜像）
│       └── _nuxt/ / _astro/ ...← 框架运行时资源根（auto-copy 到这里）
│
├── effects/                   ← 可复用代码块
│   ├── index.html             ← 画廊：扫 effects.js 渲染卡片，chip 筛选
│   ├── view.html              ← 单 effect 详情页（?effect=NNN）：demo + 一键复制 HTML/CSS/JS + 下载 zip
│   ├── effects.json           ← rebuild 自动生成
│   ├── effects.js             ← rebuild 自动生成
│   ├── README.md              ← effects 子目录的轻量说明
│   └── NNN-短名/
│       ├── index.html         ← demo 主体（自包含！底部 sc2-overlay 由 inject-overlay.py 注入）
│       ├── meta.json          ← 卡片元数据（schema 见下）
│       ├── assets/            ← demo 私有资源
│       ├── lib/               ← demo 自带的第三方 JS 副本（不跨 effect 引用兄弟资源）
│       ├── source-bundle.js   ← package-effects.py 生成（gitignored）
│       └── NNN-短名.zip       ← package-effects.py 生成（gitignored）
│
├── scrape-url.py              ← URL → designs/<NNN>/ 离线镜像（含 auto-rebuild + headless verify）
├── new-effect.py              ← 新建 effects/<NNN-slug>/ 骨架文件
├── finalize.py                ← 三步打包脚本：rebuild + package + inject-overlay
├── rebuild-index.py           ← 扫两个目录重建 designs.js / effects.js / tag-axis.js（被 finalize.py 调用）
├── package-effects.py         ← 给每个 effect 生成 source-bundle.js + zip
├── inject-overlay.py          ← 把浮动下载/源码 overlay 注入每个 effect 的 index.html
├── reencode-mp4.py            ← 批量 ffmpeg 重压 mp4 到 1.5-2 Mbps（瘦体积用）
└── finalize.py                ← 一键：rebuild + package + inject-overlay
```

---

## 脚本速查表

| 脚本 | 何时用 | 关键参数 |
|---|---|---|
| `python scrape-url.py URL NNN-slug "Title"` | 抓新站 | `--no-rebuild` `--no-verify` `--nuxt-spa-fixup` |
| `python new-effect.py <slug>` | 新建 effect 骨架 | `--num NNN` `--title` `--source-url` `--mirror` |
| `python finalize.py` | 改完 effect 一键收尾 | `--skip-rebuild` `--skip-package` `--skip-overlay` |
| `python reencode-mp4.py` | 批量压视频（CRF 27 H.264） | （无参数，会自动跳过已经低码率/太小的） |
| `python package-effects.py` | （finalize 内部调用，可单独跑） | `--bundle-only` 跳过 zip |
| `python inject-overlay.py` | （finalize 内部调用，可单独跑） | 无 |
| `python rebuild-index.py` | （finalize 内部调用，可单独跑） | 无 |

---

## meta.json 字段表

### designs/`<NNN>`/meta.json

```json
{
  "title":       "Talamus",
  "description": "",
  "sourceUrl":   "https://talamus.pro/",
  "savedAt":     "2026-05-06",
  "tags":        []
}
```

scrape 自动写好；只有 description / tags 可能要你手填。

### effects/`<NNN-名字>`/meta.json

```json
{
  "title":       "Talamus 错位卡片网格",
  "subtitle":    "staggered card grid",
  "description": "7 张白色卡片用 grid + nth-child(8n+k) 错位排布……",
  "tech":        "CSS Grid + IO + simpleparallax-js",
  "tags":        ["产品", "网格", "入场", "逐字出场", "B2B服务"],
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
| `description` |  | 一段说明（HTML escape，纯文本） |
| `tech` |  | 技术栈标签（米黄色单独样式） |
| `tags` | ✓ | **数组，五轴中文标签**——见 [TAGS.md](TAGS.md)。必填板块×1 + 触发×1 + 产品类型×1；可选形态 0-1 + 技术 0-3。`package-effects.py` 会校验，违反就拒绝打包 |
| `previewHref` |  | 缩略图 iframe 加载的子文件，默认 `index.html` |
| `sourceUrl` |  | 原网站 URL（仅元数据；任何按钮都不直接链接它） |
| `localMirror` |  | **从 `effects/` 出发的相对路径**，指向 `designs/<NNN>/index.html`。画廊卡的「原站 ↗」和 viewer 的「跳转原网页 ↗」用这个 |
| `order` |  | 排序覆盖；默认按 num 升序 |

---

## 分类标签 — 五轴规范

**完整定义见 [TAGS.md](TAGS.md)**。这里只放速查。

每个 effect 必须按下面五轴打 tags：

| 轴 | 必填？ | 数量 | 可选值（节选） |
|---|---|---|---|
| 1 板块 | ✅ | 1 | `首屏` `导航` `产品` `分类` `介绍` `评价` `案例动态` `CTA` `关于` `联系` `页脚` |
| 2 形态 | ⭕ | 0–1 | `网格` `轮播` `滑块` `跑马灯` `顶栏` `横幅` `文字段` `列表` |
| 3 触发 | ✅ | 1 | `入场` `滚动` `悬停` `点击` `自动播放` |
| 4 技术 | ⭕ | 0–3 | `形变` `路径裁切` `逐字出场` `视差` `交叉淡入` `多态切换` `遮罩` `文字滚动` `响应式` `键盘` |
| 5 产品类型 | ✅ | 1 | `美妆` `食品` `健康` `时尚` `B2B服务` `工业安防` `协会组织` `设计建筑` `科技` `教育` `金融` `房产` `生活方式` |

示例：`"tags": ["产品", "网格", "悬停", "路径裁切", "美妆"]`

**强制守门**：跑 `package-effects.py`（或 `finalize.py`）时会校验所有 meta.json：

- 缺板块 / 触发 / 产品类型 → 拒绝打包
- 用了表外的 tag（拼写错、deprecated 词）→ 拒绝打包
- 形态 ≥ 2 个 / 技术 ≥ 4 个 → 拒绝打包

错误信息会指出**具体哪个 effect 的哪个轴出问题**。改了再跑。

**用 `new-effect.py` 起新 effect 时**，`meta.json` 的 `tags` 会带 `["TODO-板块", "TODO-触发", "TODO-产品类型"]` 占位符 + 注释。填不对就过不了打包关——逼着规范执行。

---

## 核心约定（不能违反）

### A.2 自包含

每个 `effects/NNN-名字/` 文件夹完全自包含：

- ❌ 不引兄弟 effect 的资源（每个 effect 单独打 zip，跨引用会导致解压后丢文件）
- ✅ 用到的库（GSAP / Three / splitting.js…）下载到自己的 `lib/`
- ✅ 图/视频/字体放自己的 `assets/`
- ✅ Google Fonts 等在线 CDN 允许（在线 fallback；离线落系统字体）

收益：复制文件夹到任意项目能跑、解压 zip 不缺文件。

### 1:1 还原（看代码写代码）

抽 effect 时**不能简化原版交互**。三个反面教训：

| 错误 | 正确做法 |
|---|---|
| "原版用 per-element 滚动监听，我用一个 IO 统一触发，差不多" | per-element 触发产生 cascade，整组触发是一次性显——视觉感受完全不同。抄原版机制 |
| "原版用 simpleparallax-js，但 CSS 错位够好看，跳过库" | 滚动 drift 是核心交互之一。下载库到 `lib/`，verbatim 调用 |
| "我加了原版没有的 hero / 标题文案" | effect 只装"被指定的那一段"。脚手架放 `data-demo-only` 标记，packager 会从 paste-ready snippet 里剥掉 |

判断标准：在浏览器里左右开两个标签——`http://localhost:8080/effects/<NNN>/`（demo）和原网站源 URL——同步滚动、同步 hover，肉眼能看出差别就是不对。

### `data-demo-only` 属性

effect 的 index.html 里仅为 demo 展示而加（不属于 block 本体）的元素都加：

```html
<header class="demo-intro" data-demo-only>
  <h1>Effect Name</h1>
  <p>Scroll down ↓</p>
</header>
```

`package-effects.py` 生成 viewer 的 paste-ready HTML 时**会剥掉**所有 `data-demo-only` 元素，让复制走的是干净的 block 本体。

### `?demo=preview` querystring

画廊缩略图 iframe 加载 effect 时自动拼上 `?demo=preview`：

- 不带参数（独立打开 / 解压 zip 双击）：完全 1:1 原版行为
- 带参数（缩略图 iframe）：
  - 隐藏 `[data-demo-only]` 引子
  - 跳过 scroll trigger，改用 `setTimeout` 走伪 cascade（小缩略图也有动画）
  - 浮动 sc2-overlay 自动隐藏

每个 effect 自己在 `<script>` 里处理这个参数（参考 001-talamus-card-grid 和 003-talamus-cta）。

---

## 常见问题 / 坑

### scrape 后 navigator 上看不到新卡片

跑过 `scrape-url.py` 后应该自动 rebuild 了。如果你用了 `--no-rebuild`，跑一下 `python finalize.py --skip-package --skip-overlay`（或直接 `python finalize.py`），刷新 navigator。

### scrape 后页面打开是白屏

最常见两种：

1. **Nuxt/Astro/Next/SvelteKit 框架 manifest 404**：自动复制框架目录到镜像根应该解决了。如果没解决（手抓的旧镜像），手工把 `designs/<NNN>/assets/<host>/_nuxt/` 复制到 `designs/<NNN>/_nuxt/`
2. **Webpack 数字编号 chunk**（`__webpack_require__.e(123)`）漏抓：URL 是运行时拼出来的，scraper grep 不到。F12 看 Network 404，curl 手补到对应路径

### viewer 报「找不到 source-bundle.js」

跑 `python finalize.py` 或单独跑 `python package-effects.py`。`source-bundle.js` 是生成物、gitignored。

### 解压 zip 后视频不播

最常见原因：**没真正解压**。Windows 资源管理器双击预览 zip 内 HTML 只解 HTML 到临时目录，`assets/` 子文件夹没跟。**正确做法**：右键 zip → "解压全部"到目标文件夹 → 再去那个文件夹双击 `index.html`。

### 字体看起来比原网站细 / 偏

原网站常用 Adobe Typekit（如 halyard-display），账号绑定的 woff2 不能合规打包。我们用 `font-family: "halyard-display", "Inter", -apple-system, …, sans-serif` 这种 fallback 链，online 时落 Google Fonts 的 Inter，offline 落系统字体。视觉重量差已经把相关 demo 里 `font-weight` bump 到 700-800 补偿。

### 动画字符顶部被裁

来自 `.word { overflow: hidden }` + `transform: translateY(-9px)` 上抬：halyard 字面 metrics 让 -9px 不裁，但 Inter / 中文系统字体字面更高，会顶出 `.word` 边界。修复：`line-height: 1.1` + `padding-top: 0.12em; margin-top: -0.12em` + 终态 `translateY(0)`。002-talamus-hero 的 CSS 有这个修法，后续带字符动画的 effect 照搬。

### 仓库体积变大

- mp4 默认是 1080p / 7+ Mbps，scrape 回来很占空间。跑 `python reencode-mp4.py` 全部重压到 ~1.8 Mbps（CRF 27），通常能砍掉 50%+
- effects 的 `*.zip` 和 `source-bundle.js` 已经在 .gitignore 里、不进库
- `_nuxt/` 等框架目录会比 `assets/<host>/_nuxt/` 多占一份磁盘（auto-copy 双份）——但镜像独立性更好，这点冗余可以忍

---

## 复刻到新机器

最小集合：

```
sc2/
├── README.md
├── .gitignore
├── scrape-url.py / new-effect.py / finalize.py / nuxt-spa-fixup.py
├── rebuild-index.py / package-effects.py / inject-overlay.py / reencode-mp4.py
├── designs/index.html               ← 镜像导航
└── effects/
    ├── index.html                   ← 画廊
    ├── view.html                    ← 详情页
    └── README.md
```

1. `git clone`（或拷整个文件夹）
2. `pip install playwright && playwright install chromium`（一次性）
3. `cd sc2 && python -m http.server 8080`
4. 开 <http://localhost:8080/designs/> 或 <http://localhost:8080/effects/>

Mac/Linux 与 Windows 等价：所有脚本都是 Python，没有 PowerShell 依赖。
