scrape-url.py 抓 **React Router v7 framework mode**（即新版 Remix，Vite 构建、`ssr:false` prerender 模式）站点时会双重翻车，且 scrape 自带的 verify 一眼就报错但根因不直观。首次验证：2026-06-15 serverobotics.com / 031-serverobotics（React Router v7 + Lenis + Sanity CMS + Mux video，最终 0 broken image、scrollHeight 与原站 19539≈19638 吻合）。

## 识别信号（≈100% React Router v7 framework mode）

- HTML 里有 `window.__reactRouterContext = {...}` 和 `window.__reactRouterRouteModules = {root:route0,...}`
- 启动是单个 `<script type="module" async>`：`import "/assets/manifest-<hash>.js"; import * as route0 from "/assets/root-<hash>.js"; ...; import("/assets/entry.client-<hash>.js");`
- 一堆 `<link rel="modulepreload" href="/assets/<chunk>.js">`，构建产物全在 `/assets/`，字体在 `/fonts/`
- `__reactRouterContext` 里常见 `"ssr":false` + React streaming-suspense 标记（`<!--$?-->`、`$RC=function`、`$RT/$RB/$RV`）——说明是 build 时 prerender 出的静态壳，客户端 hydrate
- verify 报 `PAGEERROR: assets is not defined` + 一堆 `<svg> viewBox: Expected number, "assets/www.xxx"` + `initial-scale` warning

## 两个根因

### A. scrape-url.py 的 URL 改写对裸数字过度匹配，把 index.html 改烂
把 SVG `viewBox="0 0 273 118"` 里的 `0`、`<meta viewport content="...initial-scale=1">` 里的 `1`、内联 JS/JSON 里的裸数字，全部当成 root-relative URL（`/0` `/1` `/694`…）下载（404）并替换成 `assets/www.<host>/<number>`。在内联 `<script>` 里 `1` → `assets/www.xxx/1` 被 JS 解析成 `assets / www.xxx / 1`（除法）→ **`assets is not defined`** / `SyntaxError`。SVG/viewBox 报 `Expected number`。**这种损坏遍布几百处，别想 surgical 修——直接重抓 raw HTML 重建。**

### B. ES module 裸 specifier + 构建产物 root-absolute 路径
即便修了 A，`import "/assets/..."` 被改成 bare `"assets/..."`（缺 `./`）→ module specifier 拒绝；而构建产物（manifest、route module、CSS、Vite preload helper）里硬编码 `/assets/` `/fonts/` 是 **root-absolute**，子路径 mirror 下全 404。path-shim 只 hook fetch/XHR，**拦不住 ES `import()` 和 `<link>` 注入**，所以光靠 shim 没用。

## Recipe（canonical 脚本：c:/tmp/build_index_final.py + patch_031.py）

`PREFIX = /designs/NNN-slug/assets/www.<host>`（deploy-absolute，对 import-specifier 和 href 都成立，是唯一两种上下文通用的形式——相对路径不行，因为 manifest 的 URL 既被 `import()`（相对 importer chunk 解析）又被 `<link>` 注入（相对 document 解析），只有 root-absolute 两边都对）。

1. **重抓 pristine raw HTML**（带 Chrome UA），别用被改烂的 index.html。`grep` 确认原站 `serverobotics.com/<digit> bare: 0`、`initial-scale=1` 干净，证实损坏 100% 是 scraper 引入的。

2. **重建 index.html**：把所有 `"/assets/` → `"PREFIX/assets/`、`"/fonts/` → `"PREFIX/fonts/`（含 `'` 引号变体）；favicon/icon/webmanifest 同理。统一替换对 `import "/assets/"`、`from "/assets/"`、`import("/assets/"`、`href="/assets/"` 全部生效。

3. **patch JS chunks + CSS 里硬编码的 `/assets/` `/fonts/` literal** → `PREFIX/assets/` `PREFIX/fonts/`（幂等：文件已含 PREFIX 就 skip）。**Vite preload helper** `Bc=function(t){return"/"+t}`（grep `return"/"+`，`__vite__mapDeps` 的 dep 是无前导斜杠的 `"assets/X.js"`）→ 改成 `return"PREFIX/"+t`。

4. **路由匹配**（关键，否则白屏报 `Something went wrong`）：React Router 用 `window.location.pathname` 去 route tree 匹配，mirror 跑在 `/designs/NNN-slug/index.html` → 命中 catch-all sub-page route（无 prerender loader data）→ `Zn: No result found for routeId "web-sub-page"` → root ErrorBoundary。`<head>` 顶注入：
   ```html
   <base href="/designs/NNN-slug/"/>
   <script>try{history.replaceState(history.state,'','/'+location.search+location.hash);}catch(e){}</script>
   ```
   pathname 改 `/` → prerender 的 index route（`web-index-page`）匹配；`<base>` 保相对 URL 仍解到 mirror 目录。（同 scrape-pitfalls #4 React Router path-mismatch，但那条是老式 CSR，这条是 framework-mode prerender。）

5. **第三方 CDN 资源保持 absolute**：Sanity 图（`cdn.sanity.io/images`）、Mux 视频（`stream.mux.com`/`image.mux.com`）、社媒 feed（`curator-assets.b-cdn.net` 的 .mp4）——留原 URL 走 live CDN，比本地重抓更忠实（scraper 把 Sanity srcset URL 截断成 `/<number>&w=...` 全废了）。代价：离线/无网时这些不显示；Mux 视频 headless 静态截图常是灰底（poster 有时加载，navigator iframe 里多数能出帧）；curator 社媒 .mp4 需白名单 referer，本地 `net::ERR_FAILED`，只丢 footer 社媒自动播放，poster 图在。

6. **本地 root 图别漏**：`/icon-serve.png`、favicon 之类 root-absolute 引用既在 index.html 又在 chunk（如 `index-<hash>.js`）里，两处都要 `"/icon-serve.png` → `"PREFIX/icon-serve.png`。

7. **CSS `@font-face` 用 `url(../fonts/...)`（相对 stylesheet 位置，本来就对）——千万别给它加 PREFIX**，否则 `url(../PREFIX/fonts/...)` 被 `../` 解成双重路径 404。第 3 步 patch `/fonts/` 时若 CSS 是 `../fonts/` 要排除/回退。

## 验证清单
- [ ] intro 遮罩（常见 `fixed inset-0 z-40 bg-brand-<x>` + logo）opacity 归 0 / 消失（卡住=路由没匹配，回 step 4）
- [ ] `broken images === 0`（playwright 扫 `naturalWidth===0`）
- [ ] scrollHeight 与原站吻合、逐段 A/B 截图对照（scroll-driven 文字 reveal 只是动画进度差，结构要一致）
- [ ] 残留 pageerror 可接受：React #418（hydration mismatch，自动 client-render 兜底）、Sanity visual-editing 的 `.tar` CORS `Request failed`（live-mode 工具初始化，静态 mirror 无关）、`/x.data` 404（sibling route prefetch）

## 坑 8：内容路由可能在 splat `routes/$` 而不是 `_index`（2026-06-16 skf.com/group/fighting-friction/01, 033）

step 4 的 replaceState 默认目标是 `/`，假设内容在 prerender 的 index route（`_index`）。**但有的微站把全部内容挂在 catch-all splat 路由 `routes/$`（path `"*"`）上，`_index` 是个只有 server loader 的空壳（client 模块只有 1 字节 `\n`）**。skf fighting-friction 就是：app 部署在 `/group/...` 子路径，basename `/`，原站 `location.pathname=/group/fighting-friction/01` 命中 `*` → routes/$ 渲染。我一开始 replaceState 到 `/` → 命中空壳 `_index` → **页面整片空白但 0 报错**（routes/$ 的内容没渲染）。
- **判断信号**：headless 跑原站读 `window.__reactRouterContext.state.loaderData` 的 keys。如果是 `['root','routes/$']` 而不是 `['root','routes/_index']`，内容就在 splat。
- **修法**：replaceState 目标改成**原站真实 pathname**（这里 `/group/fighting-friction/01`），别用 `/`。这样 mirror 的 loaderData 跟 live 完全一致、React 不再 #418、内容渲染。
- 推论：**replaceState 目标应当从「live 站 loaderData 命中哪个 route」反推，而不是无脑写 `/`**。`/` 只在内容确实在 `_index` 时才对。

## 坑 9：缺失的 `_index`/`manifest-<hash>.js` chunk 是合法空壳，但 manifest 里的 route module 路径要 deploy-absolute

scrape 只跟 HTML 里直接出现的 chunk，**manifest 里 root-absolute 引用的 route module（如 `_index-<hash>.js`、`manifest-<hash>.js`）会漏抓**。这俩在 live 上常常是 1 字节（只有 loader、无 client 组件），补抓即可、别当真缺东西。但 splat/index route 的 module 路径被 entry.client 在运行时 `import()`（从深层 chunk 解析），**必须 deploy-absolute**（`/designs/NNN/assets/.../X.js`），相对 `./` 会相对 chunk 解析成双层路径。step 2/3 的 `"/fighting-friction/01/assets` → `"PREFIX/assets` 替换要覆盖到这些。

## 坑 10：scrollytelling AVIF 帧序列（VIDEO_BG_* 常量）out-of-band 抓

重型 scroll 微站常用逐帧 AVIF 序列做背景动画（`frames/{W}/{seq}/{seq}_{NNNN}.avif?v={VER}`），帧路径在 chunk 里**动态拼**、scrape 抓不到，且 `scrollHeight` 停在 viewport 高（wheel 驱动虚拟滚动，没法靠 window.scrollTo 触发抓帧）。
- 帧数/分辨率/版本是 minified 导出常量：grep `getImageConfig`/`getTargetSizeIndex` 找到 `VIDEO_BG_WIDTHS`(分辨率档,如 `[510,834,1920]`)/`VIDEO_BG_SEQ1_FRAMES`(每档帧数,如 `[719,719,718]`)/`VIDEO_BG_SEQ2_FRAMES`/`VIDEO_BG_VERSION`(如 `1.2.3`)。这些常被 `export{X as a1,...}` 起别名再 import，要顺着 `a1 as VIDEO_BG_WIDTHS` 找到源 chunk 里 `nh=[...]` 这种短名定义。
- `getTargetSizeIndex` = `WIDTHS.findIndex(w=>innerWidth<=w)`。navigator 卡片 iframe（width:400% → innerWidth~1360）和桌面 standalone 都落在最大档（1920），所以**只抓 1920 档**就够覆盖两种看法；窄屏档按需补。
- 16 线程并行 fetch（带 Chrome UA），存盘**去掉 `?v=` query**（http.server 按路径 serve、忽略 query）。skf 这次 1920 档 seq1 718 帧 + seq2 758 帧 + 视频(.webm/.mp4)+内容图 = 1484 文件 / 249MB / 0 fail。
- 视频也有 `?v=` hashless 版（`videos/X.webm?v=1.2.3`）跟 HTML 里 contenthash 版（`X.<hash>.webm`）两套，JS 要前者，单独补抓。
- 验证：dismiss cookie consent（`#cmpwelcomebtnyes a` 等，banner 会拦 wheel）后驱动 wheel，看 canvas 是否 1920x1080 在画 + `performance.getEntriesByType('resource')` 里 `/frames/` 请求数上涨 + 0 个 4xx。

## 为什么不内化进 scrape-url.py
跟 Nuxt/Next/SvelteKit 三个 recipe 同理——chunk 图谱/路径布局每家不同，而且 React Router 这次的根因 A（裸数字误改）其实是 scrape-url.py 自身的 over-aggressive rewrite bug，未来值得单独修 scraper；在那之前，React Router v7 站一律按本 recipe 重建 index.html。相关：scrape-pitfalls #4（React Router path mismatch）、#7（bare specifier 缺 `./`）。
