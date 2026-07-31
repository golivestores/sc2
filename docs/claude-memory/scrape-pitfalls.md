---
name: scrape & mirror 常见坑合集
description: scrape-url.py 抓完站后会反复掉的坑及修法（file:// + ES module 静默失败、webpack contenthash chunk 误判为 404……）。新 scrape 类错误请追加进来，不要每条单开 md
type: feedback
originSessionId: 1bf4f120-227e-44f8-b348-e2c83cc71349
---
抓站 + 镜像运行时会反复掉的坑。新坑请按现有格式追加到本文件末尾。

## 1. file:// 直开 + `<script type="module">` 静默失败
**症状**：scrape 完某节整块空白；那块由第三方 JS 组件（Shopify app block / 自定义元素 / `<script type="module">` bundle）渲染。
**Why**：现代 Chromium/Edge 对 `file://` 下的 `<script type="module">` 直接拒绝（CORS / module specifier 解析失败），bundle 不执行、组件不渲染，但控制台不一定有醒目报错——肉眼看像 scrape 漏了东西。flowerknows.co (006) 的 Moast 视频轮播就是这样：bundle、24 个 chunk、嵌入 JSON 数据全在本地 mirror 里 200 OK，`python -m http.server` 跑就 21 个 slide 全渲染，用户双击 file:// 打开就空白。auto-injected path shim 只改 fetch/XHR，**改不了 module 的 import 解析**。
**How to apply**：用户报“某块少了”先问“是不是 file:// 直开”。是就让走 sc2 navigator (`http://localhost:8080/`) 或在 `designs/<slug>/` 里起 `python -m http.server`。真要排查 scrape 漏抓，最快路径：起 server + headless Edge + CDP（`--remote-debugging-port=9555`）+ `Runtime.evaluate` 读 `customElements.get(...)` / `shadowRoot.innerHTML` / `element.media.length`，能直接看出组件是定义了没渲染、还是数据没注入、还是根本没加载。`_diag/probe.js` 的 ws+CDP 模板可复用，记得用 `/json/new?<url>` 创建新 tab 而不是 attach 到 `/json/list[0]`（Edge 启动时第一个 tab 通常是某个扩展页）。

## 2. webpack chunk 404 ≠ chunk 不存在
**症状**：scrape `assets failed` 里有 `assets/foo.js → 404`；但原站访问那个交互显然在跑（lab46 coiIcon 的 3D 图标鼠标跟随就是这样）。
**Why**：scraper 拿到的是 webpack manifest 里的逻辑模块名（`{"./coiIcon.js":[346,346]}`），按 `assets/coiIcon.js` 裸名直接 fetch。真正落盘的文件名是带 contenthash 的 `assets/<id>.<contenthash>.chunk.min.js`——webpack chunk loader 运行时才会拼。直接接受 404 → 漏掉这个 chunk 控制的所有行为，meta 还可能误写成“原站本来就这样”（lab46 effect 021 第一次就这么 ship 的，少了鼠标跟随）。
**How to apply**：404 chunk 如果对应**用户能看到的交互**（不是埋点 / analytics / 之类），按以下流程恢复：
1. 在 `main.min.<hash>.js` 里搜 `.u=function`（未压缩则 `__webpack_require__.u`），形如：
   ```
   o.u=function(e){return"assets/"+e+"."+o.h()+".chunk.min.js"}
   o.h=function(){return"5d88d7f29a1dc591"}
   ```
2. chunk id 看 manifest（例如 `346`），拼成 `assets/<id>.<contenthash>.chunk.min.js`。
3. `curl` 原 host。200 → 落到 `effects/<NNN>/lib/`（或抽出相关 factory，整 bundle 通常很大）。
4. ship 之前到原站亲眼确认那个交互**是不是真的缺失**——别让 404 log 替你下结论。

## 3. Vite/Astro preload-helper 把 dep 路径强行前缀 `/`，镜像全 404
**症状**：scrape 完页面整块空白；`/js/foo.js` `/css/bar.css` `/anim/logo.json` 一片 404；但 `assets/<host>/js/foo.js` 在磁盘上确实存在；HTML 里的 `<script src>` 都是 `assets/<host>/...` 相对路径所以入口能加载，挂的全是 import() 触发的 lazy chunks。
**Why**：Vite/Astro 编译时把 lazy import 的 dep 列表（`__vite__mapDeps`）放在调用方文件里，由 `preload-helper-<hash>.js` 这个共享小文件统一拼 URL。preload-helper 长这样：
```js
const v = function(l){return "/"+l};   // 这里强行 "/" 前缀！
const y = function(f,c){
  return Promise.all(c.map(e=>{ e=v(e); ... link.href=e; ... }))
};
```
`/` 是文档根，跟 `<base href>` 完全无关——`<base>` 只影响相对路径，绝对路径不受任何影响。所以即便注入了 `<base href="/designs/NNN-slug/">`，preload 依然去 `http://127.0.0.1:8080/js/foo.js` 拉，全部 404。这是 theunknown.tv (016) 第一次镜像时碰到的。
**How to apply**：
1. `grep -l 'return"/"+l' designs/<slug>/**/*.js`（或 `'/+l'` 之类，preload-helper 在不同 vite 版本变量名不同），找到 preload-helper 那个文件。
2. `sed -i 's|return"/"+l|return"./"+l|g'` 把前缀从 `/` 改成 `./`。注意要同时改 root copy 和 `assets/<host>/` 下的那一份。
3. 配合一步：把 `assets/<host>/js/` `css/` `images/` `videos/` `fonts/` `anim/` `uploads/` 全部 `cp -r` 到 design 根，让 `./js/foo.js` 配合 `<base href="/designs/NNN-slug/">` 能解到 `/designs/NNN-slug/js/foo.js`。
4. 真站上有 `\`\` 空格的资源（如 `videos/01 - business marketing.webm`）scraper 直接报 `URL can't contain control characters` 一律失败——用 `urllib.parse.quote()` 自己手动 fetch。
5. Astro 也用 `history.pushState` 切路由，所以 `<base href>` 那条还是要注入，理由跟 Nuxt 3 一样（见 `nuxt3-spa-mirror-recipe.md` step 4）。

## 4. React Router SPA 在 `/designs/NNN/` 下匹配不到任何路由
**症状**：scrape 完页面只渲染了 fixed header（nav + marquee），主内容区一片黑；`#root` innerHTML 有内容但 `getBoundingClientRect().height === 0`；React Router 路由列表里只有 `/`, `/about` 等顶层路径；控制台没有 page error 只有一条 `useLenis must be used within a LenisProvider` warning（典型迷惑信号）。innoceanberlin.com (017) 就是这样。
**Why**：React Router 直接读 `window.location.pathname` 选路由，本地 mirror 跑在 `/designs/017-innoceanberlin/index.html`，pathname 不匹配 `/` `/about` `/work/:slug` 任何一个就走 fallback（多数 SPA 是 `return null` 而不是 404 页），所以主 `<Route>` 子树整个不挂载——也就没人创建主 Three.js canvas、Lenis context provider 等。仅剩的 `<header>` 是 Router 之外的，所以照常渲染。`<base href>` 在这里**没用**：base href 只影响相对 URL 的解析，不会改 `location.pathname` 的值。
**How to apply**：在 `<head>` 第一个 `<script>` 之前插入：
```html
<base href="./" />
<script>
(function () {
  if (location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') !== '') {
    try { history.replaceState(history.state, '', '/' + (location.search || '') + (location.hash || '')); } catch (e) {}
  }
})();
</script>
```
`history.replaceState` 把 pathname 改成 `/`，Router 立刻匹配根路由；`<base href="./">` 保证后续相对资源 URL 仍按 index.html 原位置解析（因为 location.pathname 已经变成 `/`，没有 base 的话 `assets/foo.js` 会被解到 `/assets/foo.js` 而不是 `/designs/NNN/assets/foo.js`）。验证信号：mirror 的 canvas 列表从 `[96×96]` 变成 `[96×96, viewport×viewport]`，`document.documentElement.scrollHeight` 跟原站一致（innocean 是 6375px）。

附：可以用 `grep -oE 'path:"[^"]{1,30}"' assets/<host>/.../assets/index-*.js | sort -u` 快速看 SPA 的路由表，确认是不是 path mismatch（如果 `"/"` 在列表里但你 mirror 在 `/designs/NNN/`，就是这个坑）。

## 5. Vercel 把 `_next` 静态资产 brotli 预压缩，不带 `Content-Encoding` 也照发
**症状**：scrape 完所有 `_next/static/chunks/*.js` 都 SyntaxError "Invalid or unexpected token"（playwright pageerror N 个，每个 chunk 1 个），文件用 `node --check` 校验也是乱码二进制。CSS 还更惨——`02f3a007.css` 之类首字节是 `EF BF BD`（UTF-8 replacement char），因为 scrape-url.py 的 CSS 流水线把 brotli 流当 utf-8 解了 `errors="replace"` 再写回，原始 brotli 字节被永久毁掉。viture.jp/beast (018) 撞到的。
**Why**：Vercel edge 对 `_next/static/chunks/*` 这类带 immutable cache 的资产存的就是预压缩字节，请求时无视 `Accept-Encoding` header 直接返回 brotli body，但**不**在响应头加 `Content-Encoding: br`（Python urllib 没主动声明 Accept-Encoding 时它觉得不需要）。所以 `urlopen().read()` 拿到的是 brotli 字节而不是 JS 文本，scrape-url.py 当二进制存盘，CSS 走文本流水线被毁。
**How to apply**：
1. JS chunks 直接 `brotli.decompress(file.read_bytes())` 写回（无 magic，try/except 即可）。`pip install brotli`。
2. CSS chunks 已被毁——再 fetch 一次同 URL，请求时带 `Accept-Encoding: br, gzip`，按 `Content-Encoding` 头 decompress；没有头就 sniff brotli/gzip。
3. Next.js + Vercel 站还有第二个坑：HTML `<script src>` 引用的是带 build hash 后缀的长名 `X.<buildhash>.js`（落盘也是这个名），但 inline 的 RSC payload (`__next_f.push([1,"...\"X.js?dpl=dpl_...\"..."])`) 引用的是 SHORT name `X.js`。React 跑时按 RSC 字符串拼 URL 去 lazy load，本地 mirror 上只有长名文件就 404。修法：每个长名 chunk `shutil.copyfile()` 一份短名 twin（webpack runtime + RSC chunk loader 各取所需）。
4. **绝对不要**为了清掉 RSC 里的 `?dpl=dpl_...` 而 strip——那串 token 经常被切到多个 `__next_f.push([1,"..."])` 调用里跨字符串拼接（`?dpl=dpl_C` + `EJJaJohxNvJzwaStYGk...`），你的正则只匹配第一段就把分隔符吃了，剩下半截 token 会被 webpack chunk URL 拼接器当成文件名延伸，报 "can't infer type of chunk from URL"。本地 static server 反正会忽略 query string，留着 `?dpl=...` 完全无害。
5. Vercel `_next/static/chunks/*.0905f674.*` 长名是 build hash，几小时到几天就会被 GC，**重抓必须立即做**——hash 变了之后老 URL 一律 404，CSS 文本流水线毁掉的字节就真没法恢复了。所以 brotli 修复脚本要趁热跑。
6. Fonts 走 `_next/static/media/*.woff2`，CSS 里以 `url(../media/X.woff2)` 相对引用——scrape-url.py 的 url() 改写**不**会自动跟进二级目录里的资产，得自己从 chunks 里 grep `\.\./media/([A-Za-z0-9._-]+)` 收集后单独 fetch 一遍。

7. **真正的大坑：保留 `?dpl=...` query 不仅别 strip，还得加到 `<script src>` 上**。Turbopack runtime 在 `requireRuntimeModuleId(94553)` 加载 page entry 时，会用 `document.querySelectorAll('script[src="${t}"], script[src^="${t}?"], script[src="${e}"], script[src^="${e}?"]')` 检查 chunk 是否已经加载（`t` = `assets/.../X.js`，`e` = `static/chunks/X.js`）。原站 HTML 的 `<script src>` 都是 `X.js?dpl=dpl_C...` 形式，前缀选择器 `^="X.js?"` 匹配成功，turbopack 知道 chunk 已加载、直接走 hydrate。本地 mirror 如果 `<script src>` 是 `X.0905f674.js` 或 `X.js`（无 query），那 4 个选择器全 miss，turbopack 觉得 chunk 没加载就**自己创建新的 `<script>` tag 重新拉一次** —— 这种 race 会让 React `hydrate(l, t)` 里的 `await l` Promise 永远 pending、整个 React app 不挂载（`__reactFiber*` 都为 null），但 0 console error、0 page error，**完全静默**。修法：HTML 里把每个 `<script src=".../static/chunks/X.0905f674.js">` 改成 `<script src=".../static/chunks/X.js?dpl=dpl_<原 build token>">`（dpl token 从原站 RSC payload 里 grep）。这一步是 Next.js + Vercel 镜像 React 起不来的根因，常见症状：DOM 静态 markup 在但所有 video 都 `paused`+`autoplay=false`、canvas 都是默认 `300x150`、`window.next` 不存在或部分存在、`__next_f.length=0`（所有 RSC chunk 已 forEach 但没人消费）。
8. 修完上一坑后还要 **frame sequence 单独抓**：asset-preloader.js（独立脚本）里硬编码了三套序列（`/beast/sequences/in/{1..90}.webp`、`/beast/sequences/trans_1/{1..165}.avif`、`/beast/sequences/trans_3/{1..241}.avif`），共 496 帧。scrape-url.py 抓不到。用 16 线程并行 `urlopen` 拉，10 分钟内能搞定。一帧都不能少 —— preloader 等到全部 ready 才 resolve `allReady` Promise，React intro 动画又卡在那个 Promise 上，缺帧 = 没动画。
9. 修 asset-preloader.js 的 `/beast/` 路径前缀时**必须用 `(?<!www\.viture\.jp)/beast/` 这种 negative-lookbehind**，否则多次跑 fix 脚本会叠加前缀 → `assets/www.viture.jp/assets/www.viture.jp/.../beast/...` 一层层套，最后 404 全军覆没。

10. **不只 Vercel/brotli——任何 CDN 都可能预压缩资源不带 `Content-Encoding`**。同样的坑会出现在 gzip 上：ukbathroomstore.co.uk (022) 的 Trustpilot widget bootstrap (`widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js`) 7.8KB **gzip 字节** → `gzip.decompress()` → 24.9KB 真 JS。症状跟 brotli 一致（console `Invalid or unexpected token`，文件首 4 字节是压缩 magic 而不是 ASCII JS）。**快速排查脚本**：扫 `designs/<slug>/assets/` 所有 `.js`，看首 4 字节是不是 `1f 8b 08` (gzip) / `cf 84` 或 `8b 1e` (brotli) / 其他控制字符；命中的直接 `gzip.decompress()` 或 `brotli.decompress()` 写回。这一步建议变成 scrape-url.py 的标准 post-process，比每次手动 grep 省事。

完整修复脚本模板：
- `c:/tmp/fix_018.py` — 通用收尾（brotli 解压 + twin chunks + HTML 路径改写 + 字体抓取）
- `c:/tmp/fix_018_anim.py` — 动画恢复（preloader 路径修复 + 496 帧并行下载）
- 关键 HTML 后处理：脱掉 `<script src>` 的 buildhash 段并加上 `?dpl=...` query，让 turbopack 的 `script[src^="X.js?"]` 选择器命中。Idempotent 写法：
  ```python
  html = re.sub(r'(<script[^>]+src="[^"]+_next/static/chunks/[a-zA-Z0-9-]+)(?:\.[0-9a-f]{8})?(\.js)(\?dpl=[^"]*)?(")', r'\1\2?dpl=dpl_CEJJaJohxNvJzwaStYGkf1LYBAdz\4', html)
  ```
  （dpl token 从原站 RSC payload `__next_f.push([1,"...js?dpl=dpl_..."])` 拷过来；同 build hash 的所有 chunk 共用同一个）

## 6. py 镜像 hydrate 不动 → 走 WACZ 回放 + `wacz-extract.py` 兜底

**症状**：scrape 完 0 console error、0 4xx，但页面卡在 SSR 出来的 loader / placeholder 不动；探针显示 `self.__next_f.length` 一直是初始值（队列没被消费）、`hasReact:false`、`globalThis.TURBOPACK.push` 已被 runtime 替换但 `body chars` 永远 = SSR 那一刻。cravburgers.shop (本来要做 021) 就是这样：Next.js 15 App Router + Turbopack + Vercel 部署的站。
**Why**：Next.js 15 + Turbopack 的 chunk graph 启动条件比 webpack 时代复杂——除了第 5 节 point 7 的 `?dpl=` query 选择器问题，turbopack 还用 `document.currentScript.src` 算 chunk base URL，本地 mirror 里 `<script src>` 路径前缀和 `__next_f` flight payload 里的 chunk path 不一致就静默断链。第 5 节那套 viture (018) 修法理论上能解，但 cravburgers 的 build 没有 buildhash 后缀、`?dpl=` token 也提不出来（不是同一种 Vercel build 模式），现成脚本怼不上去。**与其每碰一种 Next.js 变体都重复试 + 调，不如换工具链**。
**How to apply**：
1. **先按现有 6 步 Next.js recipe 试**（见 `nextjs-spa-mirror-recipe.md` + 第 5 节 point 7）。能修好就修。
2. 修不好（hydrate 依然不动）→ 切 **WACZ 回放** 路径：
   - 装 [ArchiveWeb.page](https://archiveweb.page/) Chrome 扩展，**先访问目标 URL** 再点 Start（直接在扩展商店页面点会报 "extensions gallery cannot be scripted"）
   - 录的时候把动效触发点都走一遍（滚到底、所有 hover、所有 menu / route 切换）—— wacz 是 "only-records-what-you-touch" 模型，没触发就没 chunk
   - 导出 `.wacz` → 拖进 `designs/NNN-slug/cravburgers.wacz`
   - 写 `meta.json`（必须含 `sourceUrl`，replay 要它定位）
   - `python rebuild-index.py` 会**自动生成** `index.html` viewer（内含 `<replay-web-page>` + 本地 `_replay/{ui.js, replay/sw.js}`）
3. **要在本地 http server 下打开**（不能 file://），service worker 注册不了 → viewer 内置了提示 banner，没起 server 时会显示
4. **要抽 effect、要读源码**：跑 `python wacz-extract.py designs/NNN-slug/X.wacz`，解出 `_extracted/assets/<host>/...` 树（结构跟 py 抓的同形），原 grep/读 chunk 流程零改动复用。wacz 通常比 py 多抓 20%–30%（lazy chunk + 额外路由），对 effect 抽取是净增益
5. **像素对照**：viewer 本身就是 ground truth（bit-perfect replay），跟自家 effect demo 双开 playwright 截图对比即可

**决策表**：
- 站好抓 → **py 优先**（reproducible / git-friendly / file:// 可开 / 体积小 / 卡片预览能用 iframe）
- 站难抓 / hydrate 断 / 地理墙 / Cloudflare 挑战 → **wacz 兜底**
- 抓 effect 的源码层面两者打平（都是真实 chunk）；周边工作流 py 更顺手

**已落地的工具**：
- `wacz-extract.py`（sc2 根）—— wacz → assets/ 树，用 `warcio` 库
- `designs/_replay/{ui.js, replay/sw.js}` —— 自托管 replay-web-page 库，跨源 SW 注册问题用这个绕过
- `rebuild-index.py::_generate_wacz_viewer()` —— 检测 `*.wacz` 自动生成 viewer index.html，带 `WACZ_VIEWER_MARKER` 标记保证幂等且不覆盖手写

**Navigator 卡片缩略图**：wacz design 的 iframe-in-iframe 预览有 SW scope 冲突，目前卡片会显示加载中灰屏；点开 viewer 后正常。未来改 navigator 让 wacz 卡片用 preview.png 作缩略图即可。

**WACZ replay 的硬限制：`document.write` 站点也救不了**。ralphlauren.com (本来要做 022) 验证了这条：py 被 Akamai 307 Forbidden 挡 → wacz 录回来 20MB 完整源码 → replay-web-page mount OK、SW 拦截 OK、URL bar 显示正确归档时间戳，但内容 iframe **永远黑屏**。Console 反复出现 `Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened`——浏览器（headless 和真 Chrome 一致）对 async 加载脚本里的 `document.write` 直接拒绝。Ralph Lauren / 老 Adobe DTM / 老 GTM 同代际企业 EC 大多有这个模式。`embed="replayonly"` 和 `embed="full"` 都失败，因为问题不在 viewer chrome 而在 iframe 沙箱的渲染时序。
- **症状识别**：viewer mount 成功（URL bar 出现、时间戳正确）但内容黑屏；console 多条 `Failed to execute 'write' on 'Document'` warning；wombat.js 还会报 `Sync XHR not supported`（同一类老式同步代码）。
- **怎么办**：把 design 定位调成"源码归档 only"——`wacz-extract.py` 照样解出全部 JS/CSS/asset（RL wacz 解出 734 文件 / 111 JS / 16 CSS / 20+ 第三方 host，比 py 抓的多近一个数量级），抽 effect 工作流不受影响；视觉对照直接开真站（用户自己浏览器能开就行）；如果就要在 designs 库里有可交互回放，那这种站直接删，不强求。
- **决策树补丁**：站好抓 → py；站难抓 → wacz；**wacz 也救不动 → wacz-extract 当源码归档 + 真站做视觉参考，不强求 interactive replay**。
- **WACZ「录不动」≠ WACZ 黑屏**：黑屏是老式 document.write 站（本节）；「录不动」是现代重型可交互体验（Lenis/自定义虚拟滚动驱动不了、Autopilot 无效、`SIZE STORED` 不涨）。后者换「认证浏览器 in-page fetch 批量下资源 + 静态镜像」能救 → 见 `akamai-authenticated-browser-download-recipe.md`（2026-06-17 cartier 044：Akamai + 7.2MB Three.js/Nuxt/Lenis 体验 → headed 真实浏览器过 Akamai → 同源 fetch 下 255MB → cdnURL 改本地 → 完全离线可交互）。
- **预判**：见到这些信号基本可以预判 wacz replay 也会黑屏——Akamai/PerimeterX 防爬（说明是老式企业 EC）、HTML 里 `<script>document.write(` 直接出现、tag manager URL 含 `assets.adobedtm.com` / `googletagmanager.com` 同步标签注入、wacz 录回来上百个第三方 host。

## 7. 动态 `import("assets/...")` 缺 `./` 前缀 → bare specifier 拒绝

**症状**：scrape 完页面大体正常，console 报 `Failed to resolve module specifier 'assets/<host>/...'`，对应那段 dynamic import 的 feature 失效（购物车同步 / lazy widget / 第三方 SDK 之类）。ukbathroomstore.co.uk (022) 的 Shopify `init-shop-cart-sync` 就是这样。
**Why**：原站 HTML 是 `await import("https://cdn.shopify.com/.../foo.esm.js")`，scrape-url.py 把绝对 URL 替换成 `assets/<host>/...` 相对路径。**HTML `<script src>` 处理是宽松的**（任何相对路径都行），但 **ES module 的 dynamic `import()` 用 JS module specifier 规则**——必须 `./` 或 `/` 或 `https://` 开头，bare `assets/...` 直接拒绝（unlike browser HTML 路径解析）。scrape-url.py 的 URL 改写不区分这两类上下文。
**How to apply**：
1. `grep -n 'import("assets/' designs/<slug>/index.html` 找出所有 bare specifier import
2. `sed -i 's|import("assets/|import("./assets/|g'` 或 Edit 工具加 `./` 前缀
3. chunks 里也扫一遍（少见但偶尔有）：`grep -rln 'import("assets/' designs/<slug>/assets/`
4. 顺便检查 worker / sw 文件里 `importScripts("assets/...")` 同模式
5. 这个改完 verify 跑一次确认 `Failed to resolve module specifier` 消失即可（CookieYes / GTM 之类的 PAGEERROR 是另一类，不是这个）

## 8. WebGL "video-displacement" 区块在镜像里黑屏：真内容藏在 hidden 的 texture-source video

**症状**：scrape 完 0 page error、0 404、hero 正常、Three.js 场景也正常，但**某个全屏视频背景区块整块黑**。on.energy (028) 的 "Performance Proven at Scale"（`HomeFullBleedTextVideo` 组件）就是这样——原站是一条流动的金色光流，镜像里纯黑。
**Why**：这类组件不是直接 `<video>` 当背景，而是：① 一个 `<video class="source-video" autoplay muted loop>` 被 CSS 设成 `visibility:hidden;opacity:0`——它**只是 WebGL 的纹理源**，肉眼不可见；② 一个 `<canvas class="video-displacement-canvas">` 跑一个 chromatic-aberration / 鼠标位移 shader，每帧 `texImage2D(video)` 上传视频帧再 `drawArrays` 输出——**canvas 才是可见层**。这个渲染循环 `F` 挂在框架的全局 rAF hook 上（Nuxt 是 `hooks.hook("window:raf",F)`）。**在镜像/离线环境里 `F` 跑了几十帧后就停**（实测 on.energy 在页面顶部画了 82 帧——那时视频还停在第 0 帧黑场——之后基本停画），canvas 卡在黑帧上。诡异的是同页别的 WebGL（Three.js GLB 场景）照常 animate，说明 `window:raf` 本身没死，是这个组件的 `F` 特异地不再被调用/提前 return（A() 初始化其实成功了：getContext + program link + useProgram 全 OK，glError 0）。具体为何 `F` 特异停掉没在 minified 代码里挖到根因，但**不需要**——真内容在 video 里，直接显示它即可。
**诊断信号**（按这个顺序逐个排除，每步都是一个 playwright probe）：
1. 该区块有 `<canvas>` 且截图是黑/透明 → 八成是 raf 驱动的 canvas 效果断了
2. 找同区块的 `<video>`：`getComputedStyle` 看是不是 `visibility:hidden`/`opacity:0`（纹理源的标志）
3. 采样 video 像素确认它**有内容**（drawImage 到 2d canvas 再 getImageData 扫亮度；on.energy 实测 44% 像素 >60 亮度 = 确实是光流）。注意：直接读 webgl canvas 像素会因 `preserveDrawingBuffer:false` 返回全透明，不可信——要读 **video** 元素
4. 按 canvas class 给 gl context 打 tag 数 `drawArrays`，看是否每帧在画（停了就是 `F` 断了）
**How to apply**：有两档修法。**先别只做 CSS 兜底——用户会立刻发现交互没了**（on.energy 这次就是：CSS 静态版交付后用户回「能看到但是鼠标交互不存在」，被迫返工）。

**首选（1:1，保住交互）——自驱 rAF 重跑原 shader**：
1. 从 chunk 里把这段 displacement composable **原样**抠出来（grep `video-displacement` 定位组件，再找 `getContext("webgl"`、`u_texture`/`u_mouse` 的 shader 字符串、`ht=(t,s,r={})=>` 之类的 setup 函数）。要拿全：顶点+片元 shader 源码、参数（on.energy 是 `radius:.25,strength:.015,smoothing:.1`）、几何（positions `[-1,-1,1,-1,-1,1,1,1]` + texCoords `[0,1,1,1,0,0,1,0]`，`TRIANGLE_STRIP`）、纹理参数（`CLAMP_TO_EDGE`+`LINEAR`）、逐帧 lerp（`w=1-Math.pow(1-smoothing,dt)`，`dt=(now-last)/16.6667`）、鼠标映射（mousemove 绑在 section 上，用 canvas rect 归一化 → `u_mouse`，`u_active` 1↔0）。
2. 注入一段自包含 `<script>`：对每个组件根（`.home-full-bleed-text-video`）新建**自己的** `<canvas>` 插进 `.video-wrapper`，照搬 shader 跑**自己的** `requestAnimationFrame` loop（每帧 `texImage2D(video)`+set uniforms+`drawArrays`），并显式 `video.play()`（visibility:hidden 的纹理源在真浏览器里偶尔不 autoplay，要手动 play+muted+playsInline）。原站那个挂 `window:raf` 的死循环不用管，新建 canvas 跟它不抢。
3. 幂等 + 重试：组件是 SPA 水合后才挂的，用 `setInterval(init,400)` 跑 ~40 次兜住晚挂载；每个 section 用 `__sc2disp` flag 防重复。
4. 成功画出第一帧后给 section 加个标记类（如 `sc2-gl-ok`），让兜底 CSS 失效。
**兜底（WebGL 真起不来时不至于黑屏）**：
```css
.home-full-bleed-text-video:not(.sc2-gl-ok) .source-video{visibility:visible !important;opacity:1 !important;object-fit:cover !important}
.home-full-bleed-text-video .video-displacement-canvas{display:none !important}   /* 盖掉原站那个卡黑的 canvas */
```
脚本 init WebGL 任何一步失败就 `showRaw(video)`（内联 `visibility:visible`，原 stylesheet 规则没 `!important` 所以内联必胜）。`:not(.sc2-gl-ok)` 让兜底只在脚本没接管时显示裸视频——脚本一接管就隐回纯纹理源，避免两层视频叠加。注意 `object-fit:cover`（这个 scopeId 的 video 规则常没带，否则 2500×1318 拉进 1440×900 变形）。

**最重要的教训（工作流）**：这是**截图骗过验收的典型**——scrape 收尾只看了 hero 渲染 + 无 404 就放行，没逐区滚动核对。**WebGL/canvas 重的站（grep `three`/`gsap`/`canvas` 命中），收尾必须滚完每个动态区逐屏截图比对原站，且对有交互的区块要模拟 hover/mousemove 再截一张比对**，空白的 `<canvas>` 一律当红旗查（见 `feedback-effects-verify-before-shipping.md` / `feedback-motion-sampling-mandatory.md` 同一根因：渲染成功 + 200 ≠ 视觉忠实，静态截图对 ≠ 交互对）。

## 9. SPA 首屏 intro GSAP timeline 在离线镜像里不触发 → fixed header 元素卡在 opacity:0/visibility:hidden

**症状**：Nuxt/Vite SPA 镜像页面**整体渲染正常**（WebGL hero 出图、各 section 出来、`scrollHeight` 跟原站一致、0 真 404），但**固定定位的 header 元素消失**：品牌 logo（`.logo-wrapper`）、导航/菜单按钮（`.main-menu-wrapper` / `.menu-toggle`）在原站可见、镜像里看不到。hut8.com (030, Nuxt 3 + Three.js + GSAP) 就是这样——sunburst logo 和右上角 "Hut 8" 菜单 pill 都不显示，其它全对。
**Why**：这些元素初始 CSS 是 `opacity:0` / `visibility:hidden`，由首屏 intro 的 GSAP timeline（`Vn.to(".logo-wrapper",{opacity:1})`、`.main-menu-wrapper` 同理）淡入。这条 timeline 挂在某个 intro/preloader/scene-ready 触发点上，**离线镜像里那个触发点不 fire**（preloader 行为、scene-loaded 回调、或框架 raf hook 时序差异），于是 reveal tween 永不执行，元素永远停在初始隐藏态。注意**同一页其它 scroll-driven 动画照常工作**（hut8 的 `.logo-wrapper` width 被 `scroll.y4` 改到了 240px，证明动画系统活着）——只是那一条 intro reveal 没跑，极有迷惑性。
**诊断信号**（逐个 playwright probe）：
1. 截图比对发现 fixed logo / nav toggle 在镜像缺失，但页面主体都在
2. `getComputedStyle(el)` 读到 `opacity:'0'` 或 `visibility:'hidden'`，而原站同元素是 `'1'` / `'visible'`
3. 该元素的**其它**属性（width / mixBlendMode / fill）已被改动 = 动画系统在跑，只缺 reveal 这一步
4. 自动化 `.click()` 在镜像**和原站**都超时 → 是 strict-actionability 的测试假象（pill 有拦截 click 的子元素），不是镜像缺陷；判断标准永远是「原站同测试是否同样失败」
**How to apply**：跟 028 on.energy 同一套路（注入自包含脚本强制末态），但这里是 DOM 不是 WebGL canvas：
1. 在 `index.html` `</body>` 前注入幂等脚本，把这些元素**强制设成原站验证过的 reveal 末态**：`el.style.opacity='1'; el.style.visibility='visible'`。用 `setInterval` 跑 ~30 次（每 400ms）兜住 SPA 晚挂载，再 `clearInterval`。
2. **菜单/抽屉类**只 reveal `wrapper`（让 toggle pill 显示），**绝不**加 `.open` class——原站首屏菜单是关着的，panel 由 closed clip-path 盖住，只露 toggle。强制 opacity:1 但不 open = 1:1 匹配原站关闭态。
3. 注意 CSS opacity 继承：父 wrapper `opacity:0` 会让子 toggle 即使自己 `visibility:visible` 也整体透明——必须把 **wrapper** 的 opacity 提到 1，光改 toggle 没用。
4. 用 `<!-- sc2-mirror-fix:start/end -->` 包裹，re-run 用正则替换保持幂等。
5. 验收：playwright 读 mirror 和 live 的 `.logo-wrapper` / `.menu-toggle` / `.main-menu-wrapper` 的 `visibility/opacity`，三个都对上 `visible/1` 才算过；再截右上角 corner 对照 pill。
**根因归类**：跟 028 / `feedback-no-good-enough-shortcuts.md` 同源——「渲染成功 + 0 404 ≠ 视觉/交互忠实」。收尾必须逐屏滚 + 对固定 header 元素逐个量 computed style，不能只看 hero 出图就放行。

## 10. Rive 动画区块空白：scraper 抓不到 `/rives/*.riv` + `/assets/rive/*.riv` 运行时路径，且 WASM 从 unpkg 加载

**症状**：某些整屏的「大字动画」区块在镜像里空白（深色/纯色），但页面其它部分都正常。playwright 探针看到对应 `<canvas>` 卡在**默认 `300×150`**（display 尺寸是 1440×900 但 drawing buffer 没 setSize），原站同 canvas 是 1440×900。scrape 收尾的 failed 列表里有 `<host>/rive.wasm` `<host>/rive_fallback.wasm` 404，console 有 `/assets/rive/*.mp3 File not found` / `Unable to decode audio data`，偶发 `Cannot read properties of undefined (reading 'progress')`（intermittent，Vue 捕获，不一定每次 fire）。phive.pt (034, Burocratik Nuxt 3) 撞到：两屏「ACTIVATE YOUR SENSES」「JOIN THE … CLUBS」全空。
**Why**：这些区块**不是 Three.js/WebGL，是 [Rive](https://rive.app) 矢量动画**（`@rive-app/canvas` runtime）。判断信号——broken canvas 的父 div 是 `data-component="rive-asset"`、canvas 上有 `data-file="/assets/rive/<hash>.riv"`、且常带 Nuxt 懒水合属性 `hydrate-on-idle`。Rive 需要两样东西，scraper 都抓不到：
  - **`.riv` 动画文件**：运行时由组件按 `data-file` 拉取，路径是 `/rives/<name>.riv`（命名 UI 动画：burger/close/arrow-left/arrow-right/sound/intensity/duration）和 `/assets/rive/<hash>.riv`（Sanity 上传的大动画，就是那两个空白大屏）。scraper 不解析运行时构造的这些路径 → 全 404 → Rive 没动画可放 → canvas 不 setSize 卡 300×150。
  - **WASM runtime**：`@rive-app/canvas` 默认从 `https://unpkg.com/@rive-app/canvas@<ver>/rive.wasm` 加载（本例 2.27.1）。原站引用的 `<host>/rive.wasm` 其实 404（原站也走 unpkg fallback），所以 scrape 那两条 wasm 404 是**红鲱鱼**，别当真缺失。
**误诊提醒**：canvas 卡 300×150 + 自定义引擎（这里是 Burocratik 自研 "🍀 BüroGL" wrapper，console 有这串 emoji 日志）极易误判成「WebGL 离屏/worker 没起来」往 028 那条（自驱 rAF 重跑 shader）去修——**先确认是不是 Rive**：查 broken canvas 的 `parentElement.dataset.component==='rive-asset'` / `canvas[data-file$=".riv"]`。是 Rive 就别碰 WebGL。同页真 WebGL（本例底部 3D 称重片，父 `.container` canvas 2880×1800）是另一套，能正常渲染别动它。
**How to apply**：
1. playwright 抓**原站** `https://<host>/...` 跑一遍，监听 `request` 收集所有 `.riv` 和 `.wasm` URL（`r.url.endsWith('.riv')`），再读 DOM 的 `[data-file]` 属性兜底。
2. 按原 URL 路径 `curl`（带 Chrome UA）落盘到镜像**同相对路径**：`/assets/rive/X.riv` → `designs/<slug>/assets/rive/X.riv`，`/rives/X.riv` → `designs/<slug>/rives/X.riv`（path-shim + base href 会把 `/assets/rive/` `/rives/` 解到镜像目录）。
3. WASM 自包含：`curl https://unpkg.com/@rive-app/canvas@<ver>/rive.wasm` → `designs/<slug>/lib/rive.wasm`，然后注入早于 path-shim 的 fetch 拦截把 unpkg 那个 URL 重定向到本地：`window.fetch=function(i,init){var u=typeof i==='string'?i:i&&i.url; if(/@rive-app\/canvas@[\d.]+\/rive\.wasm/.test(u)) return f.call(this,'/designs/<slug>/lib/rive.wasm',init); ...}`。本地 `python -m http.server` 给 `.wasm` 发 `application/wasm`（3.12 实测 OK），`instantiateStreaming` 不会因 MIME 拒。验证：playwright `ctx.route('**unpkg.com**', abort)` 仍能渲染 = 真本地化成功。
4. 验收：broken canvas 的 `width/height` 从 `300x150` 变成 `1440x900`（≈原站）即修好；逐屏截图确认大字动画出图。
**硬限制——Rive 里的文字是烤进矢量的**：`.riv` 二进制里**没有可改的 text run**（`strings`/正则扫 ASCII+UTF-16 找不到 'PHIVE'/文案 → 说明文字是 vector path 不是 text run）。所以做 rebrand（如 PHIVE→HIMAX）时，Rive 动画里烤进去的 brand 字样（本例 "JOIN THE PHIVE CLUBS"）DOM 脚本碰不到，跟 3D GLB 模型烤进贴图的 PHIVE 同类——只能要原始 .rev 源重导，镜像层改不了。要么接受、要么 overlay 盖（但 Rive 常 scroll-driven 缩放/位移，静态 overlay 易错位）。先扫 `.riv` 确认有没有 text run 再决定。

## 11. CSS 自定义属性里的 `url()` 解析基准是「消费它的 stylesheet」而非 document → 镜像里路径双重前缀 404

**症状**：WordPress / 主题站镜像页面整体渲染正常、`<img>` 0 broken，但**某几个用 CSS mask / background 的 logo/图标空白**。playwright 监听 response 看到一堆 404，URL 形如 `assets/<host>/wp-content/themes/<theme>/assets/dist/css/assets/<host>/wp-content/uploads/.../logo.png`——`assets/<host>/...` 这段**出现了两次**，第二段嫁接在某个 CSS 文件所在目录后面。festivent.ca (038, WordPress) 的 hero 两个合作伙伴 logo（`--mask-url`）就是这样。
**Why**：HTML 里是内联 `style="--mask-url: url('assets/<host>/wp-content/uploads/.../logo.png')"`（一个 CSS 自定义属性，值含相对 `url()`）。scraper 把原绝对 URL `https://<host>/wp-content/uploads/...` 改成了 root-relative 的 `assets/<host>/...`。**关键坑**：当 `url()` 写在 CSS 自定义属性里、由别处的 `mask-image: var(--mask-url)` 消费时，浏览器按 spec/实现把这个相对 URL **解析相对于「声明/消费 var 的那张 stylesheet 的 base URL」**——这里就是深埋在 `.../dist/css/` 的主题 CSS——而**不是** document。于是相对路径 `assets/<host>/...` 接在 CSS 目录后面 → 双重前缀 → 404。普通 `<img src>` / 直接写在元素 `style` 里的 `background:url()` 不踩这个坑（按 document 解析），**只有 `url()` 进了自定义属性再被 `var()` 消费**才触发。而且这俩文件 scraper 压根没下（mask 源图常被漏抓）。
**How to apply**（最省事且最 portable）：
1. 确认真身：`grep` 出双重前缀 404 里的文件名，到原站 `curl`（带 Chrome UA）下来，看大小。
2. **小图（≤ 几十 KB）→ 直接内联成 `data:` URI**：base64 后替换 HTML 里 `url('assets/...')` 为 `url('data:image/png;base64,...')`。零路径解析、任意 serve root / 甚至 file:// 都成立，比修相对层级 robust 得多。festivent 两个 logo（12KB PNG mask + 8.7KB SVG）就这么解的。
3. 大图不适合内联 → 把 `url()` 改成 **deploy-absolute**（`/designs/NNN-slug/assets/...`）让两种解析基准都对；或按那张消费 CSS 的实际目录补足 `../` 回到 mirror 根（脆，多个不同深度的消费者会顾此失彼）。
4. 验收：playwright 监听 response，本地 127.0.0.1 的 4xx 归零；读 `.o-mask` 等元素的 `getComputedStyle(el).maskImage` 确认值变成 `url("data:...")` 而不是空。

## WordPress 镜像速记（038-festivent 首次验证）

WP 站（`grep wp-content` 命中）多是 server-rendered 静态 HTML，比 Nuxt/Next/SvelteKit/React-Router 那几类 SPA **好抓得多**——scrape-url.py 一遍基本到位（festivent 158 assets 一次过，0 broken `<img>`、scrollHeight 与原站 12465 完全一致）。收尾只需扫这 3 类残留绝对 URL：
1. **内联 `--mask-url` / CSS 自定义属性 url()** → 见上面坑 11（data URI 内联）。
2. **`<meta>` 里的 og:image / msapplication-TileImage** + **WordPress 性能插件（optimization-detective 等）的 `<script>` / `librarySrc`** 仍是绝对 `https://<host>/wp-content/...` → 下载落到 `assets/<host>/...` 同相对路径再把 HTML 里的绝对 URL 改成相对。其中 optimization-detective 的 `detect-args` JSON 里 `e[0]` 和 `webVitalsLibrarySrc` 被 `await import(t)` 动态加载——**裸 `assets/...` 会触发坑 7（bare specifier 拒绝），必须加 `./` 前缀**。
3. **导航 `href` 链接 + PDF 下载链接**保持绝对 `https://<host>/...` 不用动——单页镜像点它们本来就该去线上，属预期行为（跟其它 recipe 一致）。
残留的第三方 host（cookieyes / google-analytics / doubleclick / facebook / gstatic recaptcha）都是 tracking/consent，离线 block 掉照样渲染，唯一 console warning 是 CookieYes 报「URL 变了」——无害（banner 离线本就不显示）。**离线验收法**：playwright `page.route('**/*')` 里把非 127.0.0.1 的请求全 abort，模拟真断网，看本地 4xx 是否归零 + 截图逐屏比对原站。

## 12. R3F WebGL 场景在子路径镜像里冻结 —— 场景 visible 闸在 `usePathname()` 路由匹配上，子路径不命中 → frameloop="never"（045-southcliffdentalgroup，已解）

**症状**：Next.js 15 + Vercel + R3F/Three.js + GSAP ScrollSmoother 站（southcliffdentalgroup.com）。按坑 5/坑 7 把 hydration 全修通后页面**几乎完美**（React 起、nav/正文/图/字体/平滑滚动全对、0 console error/pageerror/rejection、3D 资源 GLB+draco+basis+hdri+texture 字节级等同原站全 200）。**但全屏 WebGL 背景 3D cliff 场景只渲染 ~2 帧就冻结**：canvas 在（1296×810）、`gl.isContextLost()===false`、但 `drawElements/drawArrays` 计数原站连续/镜像 2-3 次后停；canvas 容器 `DIV.fixed` inline `opacity` 原站随滚动 0.07→1.0 ramp、镜像死锁 `0`。视觉：原站逐屏动态暗色 cliff、镜像对应区块纯白。**注意这不是「渲染失败」是「render loop 没开」——极易误判成 GPU/Suspense/资源问题白挖几小时。**

**真根因（已定位+已修）**：R3F `<Canvas frameloop={N.canvasVisible&&N.tabVisible?"always":"never"}>`。`canvasVisible` 由场景容器组件的 effect 按 `usePathname()` 设：`let e=d.fo(O); if(e){...canvasVisible=true}else{canvasVisible=false}`，`d.fo` 是 pathname→pageKey 映射（`a["/"]="home"`，路由表 `[{route:"/",pageKey:"home"},...]`）。镜像跑在 `/designs/045-slug/` 子路径 → `d.fo("/designs/045-slug/")` 不命中任何 route → 返回 `null` → `canvasVisible=false` → **frameloop="never" → 场景不 render → 冻结**。**这就是坑 4（React Router 子路径不匹配）/ Nuxt-i18n recipe step6 的 R3F 变体**——只是这次卡的不是「整页白屏」而是「3D 场景静止」，更隐蔽。

**修法（外科手术 patch 路由映射函数，别动 location）**：
- **不要**用 `history.replaceState` 把 `location.pathname` 改成 `/`——Next.js 15 App Router 在这站上水合会整个崩（bodyLen 退回 SSR shell、canvas 消失），net regression。
- **正确做法**：grep chunk 找那个 pathname→pageKey 函数（本例 minified `function l(e){return"string"==typeof e&&e.startsWith("/our-treatments/")...a[e]?a[e]:...}`），在函数体最前面插一段把镜像子路径归一化成 `/`：
  ```js
  function l(e){if(typeof e==="string"){var _sc2=e.replace(/^\/designs\/045-slug/,"").replace(/\/index\.html$/,"");e=_sc2===""?"/":_sc2;}return ...原逻辑}
  ```
  → `l("/designs/045-slug/")`→`/`→`a["/"]="home"` → canvasVisible=true → frameloop="always" → 场景活。**三份 copy 都要 patch**（root buildhash、root short-name twin、`assets/<host>/` copy）。验证：draws load 后 ~579、滚动时 `.fixed` opacity 0.14→0.56→1.0 平滑 ramp、截图出暗色 cliff（CDP captureScreenshot 抓，普通 page.screenshot 会因连续 rAF 渲染 timeout）。

**通用诊断模板（下次碰 R3F/Three 站「场景静止但页面对」直接照跑）**：
1. 数 `drawElements/drawArrays`（注入 `window.__d++` 包 `WebGLRenderingContext`+`WebGL2RenderingContext` 两 prototype）：load 后 +2s delta，>50=连续、<5=冻结。
2. 量目标元素 inline `opacity`（`f.getAttribute('style')`）随 scroll 是否变。注意 React inline style 用 `style.cssText`/attribute 路径设，`setProperty`/opacity descriptor hook 不到（0 writes 是假象）。
3. **最关键一步：从 React fiber dump 出冻结组件的源码读它的判断**——爬 `#__next` 的 `__reactFiber$*` 到 top，按 `f.type.name` 找到裹 canvas 的组件（`firstDom(f)` 确认含 `<canvas>`），`f.type.toString()` 把 minified 源码打出来，直接读 `frameloop=` / `canvasVisible` / `visible` 的判断条件。**比盯整个 chunk 猜快十倍**。本例一眼看到 `frameloop:N.canvasVisible&&N.tabVisible?"always":"never"` + `d.fo(usePathname())` 就破案了。
4. fiber-walk 量组件 bool flag 签名（mirror vs live diff）可辅助定位「哪个组件状态不对」，但**别停在 flag 层**——要 `.toString()` 读源码找 flag 的设值条件，否则会误判成「不可复刻」（本坑第一版就是只挖到 flag 层 `FFFFFT` vs `FFTTTF` 就放弃了，其实再 dump 一下源码就破了）。

**教训**：R3F/Three 的「场景静止但 DOM 全对」八成是 `frameloop`/`visible` 被某个 `usePathname()`/路由/可见性条件闸住，而镜像子路径不满足。先 `f.type.toString()` 读组件源码再下结论，别轻易归到「server-context 不可复刻」那类硬限制。

**配套坑：场景渲染了但「某一屏背景不对/偏暗」= daytime/scene 状态 fallback 到时间计算**。045 修通 frameloop 后用户发现 OUR PATIENTS 那屏镜像偏暗/golden 而原站是亮 pale-blue。根因同源：场景背景色 `d(daytime)=("daytime"===daytime)?"#ffffff":"#061118"`，daytime 取值 `o(e)=s(e)||l()`——`s(e)` 从 **Prismic 数据**读 `e.get("daytime")`，读不到就 fallback 到时间函数 `l=()=>{let e=new Date;return 60*e.getHours()+e.getMinutes()<1020?"daytime":"afternoon"}`（17:00 后→afternoon→暗）。镜像里 Prismic singleton 数据客户端拿不到 → `s(e)=null` → 走 `l()` → 当前时间过 17:00 就变 afternoon（暗 navy bg）；原站 `s(e)="daytime"`（Prismic 配的）→ 亮。**修法**：把 fallback `l=()=>{...}` 直接 patch 成 `l=()=>"daytime"`（锁成原站当前呈现的态；Prismic 真有值时 `s(e)` 仍优先），三份 chunk copy 都改。验证：content-matched 截图（按 section 标题文字滚到居中再 settle 2.5s 截，别按固定 scroll 量——ScrollSmoother 下 mir/live 内容位置会漂）逐屏比对，hero/EMERGENCY 暗、OUR PATIENTS 亮，与原站一致。**残留**：OUR PATIENTS 那屏相机略低（镜像看到 cliff+sun+rainbow，原站是纯 pale-sky）——scroll→camera keyframe 映射在该 section 有微小偏移，ScrollTrigger.refresh resize-pump 没完全纠正，属深层 camera 编排细节，主诉（暗背景）已解则可接受。**通用**：3D 站「整体能动但个别屏配色/明暗不对」先查有没有 `xxx||timeBasedFallback()` 这种「CMS 值读不到就按本地时间/环境算」的状态，patch 成原站当前态。

**配套坑 2：相机随滚动飞行转场整个不动（视角卡死在初始位）= 相机关键帧来自客户端 Prismic fetch，数据进了 RSC server-data 层但没流到客户端 3D 组件 → 自驱相机复刻**。045 修通 frameloop + daytime 后用户发现「原版随滚轮视角会大幅转场（俯瞰海岸线），镜像视角不动」。实测 `sceneState.camera.position`：原站随滚动 [25,0,169]→[567,234,219]（Y 升 0→234 做俯瞰），镜像永远卡 [25,0,169]。根因：每段相机关键帧来自 Prismic 文档（client 端 `dangerouslyGetAll` 5 次调用，chunk 788 的 Prismic client）。数据**确实 fetch 了**（`cache:"force-cache"`，Playwright 的 `response` 事件抓不到 cache 命中所以一度误判成 0 次；用 hook `window.fetch` 才看到 5 次），但 Next.js App Router 把 slice 服务端渲染成 HTML、结构化的相机关键帧字段**没进 RSC payload**，静态镜像里这份 client-fetch 的数据没流到 3D 相机组件（同 daytime 回退一个根因：RSC server-data 层在静态镜像缺位）。**这是静态镜像这套 Next.js RSC + Prismic + 客户端 3D 数据架构的根本限制**。
**解法——自驱相机（复刻 028 on.energy 自驱 shader 的同思路，但驱动的是相机而非 canvas）**：
1. **采原站相机路径**：headless 加载原站，fiber-walk 找 `sceneState`（memoizedState 链里 `'canvasVisible' in o && 'curveTrack' in o` 的对象），读 `sceneState.camera` 的 `position`/`quaternion`/`fov`。按 `window.scrollTo` 步进（每 100px，settle 1.3s）采 ~60 点，**每点同时记录「平滑滚动值」**（`#smooth-content` 的 transform translateY，ScrollSmoother 的实际视觉滚动量，**不是** window.scrollY——后者会被 ScrollSmoother 大幅 lag）。存成 `[smoothed, px,py,pz, qx,qy,qz,qw]` 数组。
2. **注入自驱脚本**（`</body>` 前，幂等 marker）：rAF loop 每帧 ① fiber-walk 找 `sceneState.camera` ② 读当前平滑滚动 ③ 在路径数组里二分找夹逼点，position 用 lerp、quaternion 用 **slerp**（带 dot<0 取反走最短路），set `cam.position`/`cam.quaternion`，fov 变了才 `updateProjectionMatrix()`。
3. **三个关键 gotcha**：
   - **R3F 不会覆盖手动设的相机**（原内部相机逻辑因无数据而休眠）——先做 overwrite 测试：set 一个 distinctive position，600ms 后还在 = 自驱 rAF 能赢。
   - **fiber-walk 找到的是 React 快照（snapshot）**：第一次找到时 `sceneState.camera` 可能还是 null（相机未创建），若 `if(!ss)ss=findSS()` 缓存了这个 null-camera 快照就永远拿不到相机（debug 全局 `found:0` 但 `frames` 在涨）。**修法：`if(!cam){ss=findSS();cam=ss&&ss.camera;}` 持续重找直到拿到 camera**；一旦拿到，快照的 `.camera` 指向的是 THREE 相机对象本体（可变），后续直接 mutate 它即可。
   - **按平滑滚动 key，不是 raw scrollY**：相机要跟「视觉内容」同步，而内容由 ScrollSmoother 的平滑滚动驱动；按 raw scrollY 会让相机超前于内容。
   - React #418 重渲染会把注入的 `<script>` 元素从 DOM 删掉（`document.documentElement.innerHTML` 里搜不到 marker），但 inline script 在 parse 时已执行、rAF 闭包照常活着，不影响。
4. **验收**：motion-sample 自家相机 position 随滚动连续无跳变（Δ 平滑），且数值贴合采样路径（如 sm=2129→[277.7,227,209.5] vs 原站 sm=2106→[277.2,226.5,209.4]）；content-matched 截图逐屏比对俯瞰海岸线等关键视角出现。脚本模板：`c:/tmp/capture_campath.py`（采路径）、`c:/tmp/build_camdrive.py`（生成+注入自驱脚本）、`c:/tmp/verify_pair.py`（按平滑滚动目标抓 mir/live 对照图）。
**决策**：Next.js/Nuxt 等 SSR-3D 站，「场景能渲染但相机/某状态不随滚动变」先确认数据源——是 client-fetch 没流到（本坑）还是 scroll-scrub 没接上（坑 #12 主条）。前者 RSC 数据流补不上时，**自驱**是通用兜底：采原站状态曲线 + rAF 复刻，比硬接服务端数据层可靠。

**自驱相机的边界（045 多 agent 对照验收得出，重要）**：自驱只复刻**相机运动**，不复刻**场景叙事状态**。045 这种站是一整套 data-driven 编排：随滚动**换模型**（cliff→tooth→skull）、**切昼夜光照**（白天 pale-sky vs skull 段的 night 暗光）、**改雾密度**（高空 live 雾很厚把海岸线糊住、镜像清晰）——这些 per-scroll 的 scene-state 全来自缺失的 Prismic 数据，自驱相机碰不到。验收实测：相机 xyz 数值对得上（sm=2000：mirror[276,226,209] vs live[278,227,210] dist=3.7），但同位置 live 浓雾糊住地形、末段 live 是发光骷髅+夜光而镜像是白天海岸线+footer。**结论**：自驱让「视角随滚动转场」从无到有（解决用户主诉），但做不到逐屏 1:1（雾/模型/昼夜光照另需各自的数据，没法只靠相机一条曲线）。要全复刻得把每个 scene-state（fog density、active model、light/daytime）都像相机一样采曲线+rAF 驱动，工作量爆炸且 model-swap 需要组件挂载（数据门控，强不来）。**多 agent 并发验收的坑**：6 个 agent 各开 mirror+live 两个重 WebGL 页 = 12 个并发，GPU/内存打架导致部分页 loader 卡死/`Application error` 客户端崩溃——**单实例跑完全稳**，并发崩溃是验收假象，别当真 bug；重型 3D 验收要么串行、要么限并发 ≤3。

## 13. scrape-url.py 抓不全 Vite/Vue「数字服务包」→ Apache 目录列表递归爬 + 单一 asset-base 钩子离线化

**症状**：scrape-url.py 只抓到极少文件（louisvuitton-collectibles.imm-g-prod.com / 047-lv-collectibles 只抓到 11 个），但原站是个完整的 Three.js WebGL 体验（25 个 GLB + HDR + 音频 + MSDF 字体，163MB）。页面是 Vue 3 + Vite 打包，入口是个 **dev 式 bare-import 模块**（HTML 里 `<link rel=preload href="data:...base64...">` 解出来是 `import {createApp} from 'vue'; import App from './src/App.vue'`），真正执行的是单个 `<script type=module src=/scripts/mainXXXX.js>`；几乎所有资源路径是 **运行时用一个 base 前缀拼出来的**，不是字符串字面量 → scraper 跟不动。
**Why**：scraper 只跟 HTML 里直接出现的 `<script src>`/`<link>`，跟不了 bare specifier import，也跟不了运行时 `${base}assets/...` 拼接。
**How to apply**（这套站通常比 Akamai 简单得多 —— 普通 Apache，无反爬，urllib 直接并行下）：
1. **先 headless 加载原站看清 boot + 真实资源**（跟 028/Cartier 同法）：`window.DigitalServices`（或同类全局）从哪来、canvas 起没起、network 里 `/assets/...` 的真实 host 和路径前缀。本例 `window.DigitalServices = {env:{animationData, animationId, animationPath:'/', lang, playerLang}}` 是 **inline 写在 HTML 里的**（standalone「包」部署自带 mock 宿主环境），资源全在 `/assets/` 下。
2. **试 Apache 目录列表**：`curl https://host/assets/` 若返回 `Index of /assets` HTML → **整站可枚举**。写递归爬虫顺着 `href` 里以 `/` 结尾的子目录往下钻，把 `/assets /mock /scripts` 整棵树下到 `designs/NNN-slug/` **保持根路径**（`/assets/models/x.glb` → `designs/NNN-slug/assets/models/x.glb`）。16 线程 urllib（带 Chrome UA），本例 144 文件 / 163MB / 0 fail。
3. **离线化找那一个 asset-base 配置钩子，改一处而不是到处 patch**：grep 主 chunk 看资源路径怎么拼的——本例 `${this.manifest.animationPath}assets/vendor/draco/`、`assetsPath` 全部源自 `animationPath`。所以只要把 inline 的 `animationPath: '/'` 改成 `animationPath: '/designs/NNN-slug/'`，**所有 Three.js loader + Worker 里的 Draco 解码器**（关键：Worker 的 fetch 不走 page 的 path-shim，但走 animationPath 拼接就没问题）一次性全解到本地。比注入 base href / path-shim 到处擦屁股干净得多。
4. **`<script type=module src>` 是 root-absolute → 改 deploy-absolute**（`/scripts/X.js` → `/designs/NNN-slug/scripts/X.js`），favicon/css 同理。path-shim 当 insurance 留着（只兜 fetch/XHR，兜不了 module src 和 Worker）。
5. **验收**：route-abort 非 127.0.0.1 模拟断网，点进体验滚一遍，0 broken / 0 local 4xx / 0 pageerror。残留外部请求（本例 `api.louisvuitton.com` 的 NFT walletconnect/账户 API）属电商后端，离线失效但不影响 3D 浏览，正常。
**速记决策**：scraper 抓不全的 Vite/Vue 站 → ① headless 看清真实资源 ② Apache 开目录列表就递归爬整棵树 ③ 找唯一的 asset-base 钩子（animationPath / cdnURL / publicPath / assetsPath 之类）改一处 ④ 普通 Apache 无 Akamai，urllib 直接并行下，不用 Cartier 那套认证浏览器 in-page fetch。完整脚本模板：`c:/tmp/lv_download.py`（递归爬+并行下）、`c:/tmp/lv_localize.py`（单钩子改写+shim）、`c:/tmp/verify_lv.py`（断网验收）。

## 14. Webflow 镜像两连坑：SRI `integrity` 拒绝加载本地文件 + 文件名字面含 `%20` 被误当空格解码（005-goodlifemeds 重爬实证）

Webflow 站（`grep website-files.com` 命中、CSS/JS 走 `cdn.prod.website-files.com`）scrape 完 verify 报 **`body length: 0 chars`**（页面整片空白）+ CSS 404 + `PAGEERROR: Invalid or unexpected token`，但文件其实都在磁盘上、首字节正常（无压缩损坏）。两个独立根因：

**坑 A：`<link>`/`<script>` 带 SRI `integrity="sha384-..."` + `crossorigin` → 浏览器拒绝加载本地化改写过的文件。** Webflow 在主 CSS（`good-life-redesign.shared.<hash>.min.css`）和所有 JS chunk 上加了子资源完整性校验。scrape 把 URL 改成 `assets/...` 相对路径、内容也重写了 → hash 必然不匹配 → 浏览器**静默拒绝**加载（报成 "Failed to load resource 404" 的假象）→ 无 CSS（body bg 默认白）+ JS 不跑 → Webflow 的静态 HTML 虽在但 verify 读到的渲染结果异常/空。**修法**：移除 HTML 里所有 `integrity` + `crossorigin` 属性（本地化必做，SRI 对改写过的本地文件永远失败）：
```python
import re; h=open('index.html',encoding='utf-8').read()
h=re.sub(r'\s+integrity="[^"]*"','',h); h=re.sub(r'\s+crossorigin="[^"]*"','',h); h=re.sub(r'\s+crossorigin(?=[\s/>])','',h)
open('index.html','w',encoding='utf-8').write(h)
```
立竿见影：body 0→9666 chars、bg 变回品牌米白、scrollHeight 恢复。残留的 `Invalid or unexpected token` PAGEERROR 是那些 root-absolute 的 `haqt6...` GTM/analytics 混淆 beacon 被 http.server 当 HTML 返回再当 JS 解析，离线无害。

**坑 B：原站文件名字面含 `%20`（不是空格！）→ scrape 误解码 → 下载 403 + 本地路径错。** 几张产品卡图（`video-card-visual__img`，如 `Ozempic Product Card.avif`）scrape 时 failed、本地 broken。诊断：A/B 截图发现 **LIVE broken=1（只原站自缺的 placeholder.svg）但 MIRROR broken=6**——证明原站这些图能正常显示，是 scrape 抓错了。读原站 `img.currentSrc`：原站值是 `Ozempic%2520Product%2520Card.avif`——**双重编码**（`%2520` = `%20` 再编码），意味着 CDN 上真实文件名字面就含 `%20` 这 5 个字符。scrape-url.py 把 `%20` 当"空格的编码"解码成空格 → ① 下载请求 `Ozempic%20Product%20Card.avif` → CDN 解码成空格找不到 → 403 ② 本地存成空格名、HTML 也写空格 → 自洽但内容缺失。**修法**：用原站真实 `currentSrc`（保留双编码）做下载源，存成 mirror HTML 当前请求会解码到的本地路径。
- **下载被 Webflow CDN bot 拦（urllib/直接 goto 全 403）**：必须真实浏览器 + **in-page `fetch()`**（带页面会话/referer）。但 **Transcend Consent Manager (airgap) 会 hook `window.fetch` 拦跨域**（报 `TypeError: Failed to fetch`，stack 指向 `transcend-`）→ 用 `ctx.route("**transcend**",abort)` + `ctx.route("**airgap**",abort)` 屏蔽掉，fetch 恢复原生即可跨域取 arrayBuffer→base64 回传。
- **文件名超长（>260）写盘失败**：含一长串 hash + 空格 + 括号的 `topaz-upscale-3x-min` 图，完整路径 263 字符，`\\?\` 长路径前缀在本机 Python 写仍报 Errno22/2 → 最省事：存成短名（`691f6e6b-topaz-hero.webp`），用正则把 HTML 里该图 `src` 改短名 + **删掉整个 `srcset`**（Webflow 的 srcset URL 字面含空格本就非法、浏览器已回退到 src）。注意正则别用 `\s` 排除——这些文件名字面含空格。
- 验收：A/B `full_page` 截图，mirror broken 数追平 live（都=1 的 placeholder）。

完整脚本模板：`c:/tmp/fetch_glm6.py`（block transcend + in-page fetch + base64 落盘）、`c:/tmp/ab_glm.py`（A/B 全页截图 + 双边 broken 计数）、`c:/tmp/realsrc_glm.py`（读原站 img.currentSrc 看真实编码）。**预判**：见到 Webflow（website-files.com）+ `integrity=` + 文件名带 `%20`/`%2520`，按本条两步走。

## 15. Nuxt 3 + Three.js WebGL 体验：3D 模型「被绘制但不可见」= `isHome = pathname==="/"` 判断在子路径镜像里 false → 最终合成 shader 把 basicGradient 整个盖住模型（057-arago，已解）

**症状**：Nuxt 3 (SSR 预渲染) + Three.js + Theatre.js + Lenis 的滚动叙事站（arago.wawww.studio）。补完 CSS chunk/manifest/base href 后页面**几乎完美**：文字/图片/字体/布局/滚动全对、`scrollHeight` 与原站完全一致（13729）、0 broken img、0 pageerror、所有 3D 资源（GLB+KTX2+cubemap+draco+basis）字节级等同原站全 200。**但全屏 WebGL hero 的 3D 模型（旋转芯片/数据中心）不可见**——canvas 在（2160×1350）、`gl.isContextLost()===false`、只显示蓝色渐变背景+地面环线，模型整个缺失。**headed 真实浏览器也一样黑**（不是 headless 假象）。

**这套站把「渲染成功 ≠ 视觉忠实」推到极致——下面这些诊断全部「镜像==原站」却仍黑，极度迷惑**：
- 25 个模型/纹理/解码器资源：mirror 与 live 请求列表**逐条相同、全 200**（不是缺资源）。
- 主 chunk `cDPtGTYW.js`：与 live **字节级相同**（pre-instrument size 2032115==2032115，scraper 没改 3D 代码）。
- `crossOriginIsolated` / `SharedArrayBuffer`：**两边都是 False/undefined**（不是 COOP/COEP / 多线程 basis 转码问题）。
- 片元 shader：hook `drawElements` 抓到的 3 个大 draw 的 frag main()**两边完全一致**（含真实 PBR shader 采样 `uMaterials`/`uAoMap`/`uPlasticNormal`）。
- 模型几何体**确实被绘制**：`drawElements` 计数 mirror 持续 ~42 万元素/帧（frustumCulled 常 false，「被绘制」≠「在视野/可见」，别被高 draw 数骗以为正常）。
- Theatre.js 内联 state（`getProject("...",{state:qoe})`）两边相同；instrument `updateSequenceProgress` 读到 mirror 的 `sequence.position` **正确=6**（hero 末态）、`isPlayingIntro=false`、`needToPlayIntro=false`——序列位置/intro 状态全对。

**真根因（fiber/源码级才挖到）**：最终合成 shader 是 `outputColor = mix(mainScene, basicGradient, showBasicGradient)`，`showBasicGradient = sat(uShowBasicGradient + uPageShowBasicGradient + uNavigationShowBasicGradient)`。这些 uniform 经一个 home 判断函数门控：
```js
function jA(n){const t=n.split("?")[0].trim().replace(/\/+$/,""),i=t.startsWith("/")?t:`/${t}`;if(i==="/")return!0;/* 否则只认 /#hash */return!!i.match(/^\/#([\w-]+)$/)}
```
`jA(fullPath)` **只在路径===「/」时返回 true**。它决定 WebGL 体验的 isHome：`new GE({isHome:jA(e.fullPath)...})` + `i.mount(el, jA(e.fullPath))` + 页面转场 `setPageGradientProgress`。镜像跑在 `/designs/057-arago/` → `jA` 返回 **false** → WebGL 以**非首页模式**挂载 → `uPageShowBasicGradient` 拉到 1 → 合成 shader 把 basicGradient **整个盖住 mainScene（模型）** → 看到的「蓝色渐变」就是这层 fallback，模型其实在背后正常渲染只是被 mix 掉了。这是坑 #12（045 R3F frameloop 被 `usePathname()` 闸住）/ 坑 #4 / Nuxt-i18n recipe step6 的**又一变体**——但卡的不是「整页白」也不是「场景冻结」，而是「模型被 fallback 渐变层盖住」，最隐蔽。

**修法（surgical patch `jA` 把镜像子路径归一化成 home，别动 location）**：
```python
JA_OLD='function jA(n){const t=n.split("?")[0].trim().replace(/\\/+$/,""),'
JA_NEW='function jA(n){const t=n.split("?")[0].trim().replace(/\\/index\\.html$/,"").replace(/^\\/designs\\/057-arago/,"").replace(/\\/+$/,""),'
```
→ `/designs/057-arago/`、`/designs/057-arago/index.html` 都归一成 `""` → `i="/"` → `jA` 返回 true → isHome=true → 模型正常显示；`/designs/057-arago/terms-of-use` 仍归一成 `/terms-of-use`（正确判非首页）。**两份 chunk copy（root `_nuxt/` + `assets/<host>/_nuxt/`）都要 patch**。验证：fix 后 hero/中段/footer 逐屏与原站 1:1（芯片随滚动旋转、footer 双芯片+「ENJOY THE THRILLING RIDE」全对）。

**配套补救（同站其它步骤，标准 Nuxt 3 recipe + 几条专属）**：
1. 补 runtime CSS chunk（`grep entry.js 的 *.css`）+ Nuxt app manifest（`_nuxt/builds/meta/<buildId>.json` + `latest.json`，buildId 从 inline `__NUXT__.config.app.buildId` 拿）。
2. `<base href="/designs/NNN-slug/">`（path `:"/"` 无 i18n，不用 replaceState）。
3. **Vercel image optimizer**：SSR 的 `<img>` 用 scraper 抓到的 `_vercel/image.<hash>`（无扩展名），但 hydration 后 NuxtImg 重建 `/_vercel/image?url=/static/...&w=&q=` query → 404。patch loader `return{url:s+"?"+K(...)}` → `return{url: e[0]=="/"&&e[1]!="/"?e.slice(1):e}`（去 leading slash 让 base href 解到 mirror 根）+ 下载 `/static/...` 原图到 mirror 根。
4. **`_vercel/image.<hash>` 里是 SVG 的那些**：`python http.server` 当 octet-stream 发，`<img>` 拒渲染 SVG（同坑 #5/maddys 9c）→ 建 `.svg` twin + 改 HTML 引用（21 个 twin / 114 处 ref）。
5. **Three.js 运行时资源 scraper 全抓不到**（`assets/cubeMap/`、`assets/models/*.glb`、`assets/textures/*.{ktx2,png,webp,jpg}`、`vendors/draco/{draco_decoder.wasm,draco_wasm_wrapper.js}`、`vendors/basis/{basis_transcoder.js,wasm}`）——靠「离线 404 监控」收集清单（route-abort 非 127.0.0.1 跑一遍）再从 live 同相对路径并行下到 mirror 根。
**验收**：route-abort 非本地模拟断网，brokenImgs=0、canvas 2160×1350、0 pageerror、外部请求=0（完全自包含），唯一残留 local 4xx = `/_vercel/insights/script.js`（Vercel analytics，无害）。

**通用教训**：Three.js/WebGL「DOM 全对、资源全 200、shader 相同、模型几何体在画，但模型不可见」时，**别停在「资源/shader 层都一样」就放弃**——往**最终合成/post-processing shader** + **home/route 判断**查。模型常被一层 `mix(scene, fallback, flag)` 盖掉，而 `flag` 由 `pathname==="/"` 之类的判断驱动，镜像子路径必然踩。诊断顺序：① drawElements 计数确认几何体在画（在画=「被盖/被 mix 掉」而非「没渲染」）② preserveDrawingBuffer readPixels 看屏幕到底是「暗渐变」还是「黑」（暗渐变=有 fallback 层盖着）③ grep chunk 找 `mix(`+`showBasicGradient`/`uReveal`/`uTransition` 之类合成 uniform ④ 顺藤摸到门控它的 `pathname`/`isHome`/`fullPath` 判断，patch 成 home。脚本模板：`c:/tmp/shaderhook.py`（hook drawElements 抓 frag shader）、`c:/tmp/readpix.py`（preserveDrawingBuffer 亮度）、`c:/tmp/offline_verify.py`（断网验收）。


## 16. Webflow 站的「运行时 image-sequence manifest + esm.sh Three.js shader」两坑（066-armory 实证）

Webflow 站不总是纯静态。armory.in（Webflow + GSAP/ScrollTrigger/SplitText + Lenis）首屏是**滚动驱动的 AVIF 图序列 scrollytelling**（滚动时逐帧播放地形飞行 + `[detected-info]`/`[dialogue]` 文案 overlay 按帧进度淡入），外加一个全屏 fixed 的 WebGL pixel-wave 背景 shader。scrape 完 hero 只显示第 0 帧（静态地形，肉眼像正常），**极易漏掉整段 scroll 动画**。先按坑 14 修 SRI/`integrity`（否则 CSS 被拒、body 空）。然后两个 scraper 抓不到的运行时依赖：

**A. Image-sequence 帧清单是运行时 `fetch` 的 `.txt`（逗号分隔的帧 URL），不在 HTML 里。** `initImageSequence({deskLow:'https://cdn.prod.website-files.com/.../X_avif_links.txt',...})`（index.html 内联 boot 脚本），img-seq.js `fetch(txt)` → `split(',')` → 每帧 `new Image().src=url`（帧在 `armory.b-cdn.net/Home/Hero/high-res_desk_v3/*.avif`，780 帧 hero + 126 帧 drone_crash，各 ~130-170KB）。path-shim 只改 root-absolute（`/x`→`./x`），**改不了整条 `https://` 绝对 URL** → 离线全 fail（console `[hero-seq] Fetch failed`）。修法：① curl 下 `.txt` manifest 到镜像同相对路径；② 解析出帧 URL 16 线程并行下到 `assets/<host>/...`（`%20` 空格 dir 存成解码后的空格名，http.server 会解码匹配）；③ 改 manifest 内容 `https://armory.b-cdn.net/`→`assets/armory.b-cdn.net/`；④ 改 index.html 的 desk 配置 URL→相对 `assets/...txt`（fetch 相对文档解析即可，mobile tier 桌面永不取、留 live 无害）。验收：`window.__seqInit` 有 frameCount、滚动逐屏截图看帧变+overlay 淡入。脚本：`c:/tmp/dl_frames.py`。

**B. WebGL shader（shader.js, type=module）bare-import `https://esm.sh/three@0.171.0`（+postprocessing 3 个）。** 驱动全屏 fixed `#source` canvas（z-index:1 在 z-index:2 暗内容后，肉眼贡献小但要 1:1）。esm.sh 模块图谱互相 `from"/three@.../es2022/*.mjs"` 递归引用，直接 cp 单文件不行。修法：**递归镜像 esm.sh**——BFS 从 4 个入口 fetch，正则抓每个模块的 `import/export ... from"X"`（`/x`→`https://esm.sh/x`、`.`→urljoin），存成扁平 sanitized 文件名（避免 `three@X` 既是文件又是目录冲突），把所有 esm.sh import 重写成 **deploy-absolute** `/designs/NNN-slug/assets/esm.sh/<file>`（importer 深度无关），再 patch shader.js 的 4 个 import（先替长 URL 再替短的 `"https://esm.sh/three@X"`，防前缀误伤）。armory 9 文件收敛。验收：断网 `#source` canvas `getContext('webgl')` 返回 HAS_GL、blocked hosts 无 esm.sh。脚本：`c:/tmp/mirror_esm.py`。

**残留可接受外部**：3 个 tracker（clarity.ms/google-analytics/google.com）+ 1 个 image_branding.js 的 console.log 品牌图（jsdelivr，纯开发者彩蛋不可见）。断网验收：brokenImgs=0、pageerror=0、local 4xx=0。**Webflow logo 替换**：header 是 path-based `armory-logo.svg`（overwrite 成自画 `<text>` HIMAX，保 viewBox/白色），footer 是 raster `Armory Logo Metal.png`（2628×278，改 `<img src>` 指向自画 metallic-gradient `<text>` HIMAX SVG）。**教训**：Webflow ≠ 一定纯静态；`grep -o 'initImageSequence\|esm.sh\|type=.module.'` 命中就按本条查运行时 fetch 依赖，别只看第 0 帧+hero 出图就放行（同 028/坑 15 根因：渲染成功≠视觉/交互忠实）。

## 17. Webflow + rspack achunk contenthash chunks + `<script type="importmap">` Three.js（jsdelivr）+ CORS-blocked WebGL fetch 资源（064-ciaoenergy 实证，已完全离线）

ciaoenergy.com（Webflow + GSAP 3.15 ScrollTrigger/SplitText + Three.js + Lenis）首屏是 WebGL 3D 罐子滚动叙事（~20s 电影级 loader intro → 6 口味切换 + 背景循环视频）。scrape 完 body 空（先按**坑 14** 删 `integrity`/`crossorigin` SRI，立刻 body 0→正常）。之后三类 scraper 抓不到的运行时依赖：

**A. Webflow 现在用 rspack，主 `webflow.<hash>.js` 运行时懒加载 `webflow.achunk.<contenthash>.js`。** scraper 报一堆 `webflow.achunk.*.` 404（注意末尾裸点、无扩展名）。这是 webpack/rspack 的 contenthash chunk（跟 scrape-url.py docstring 的「numeric chunk id」同类但用 hash map）。修法：在 `webflow.<hash>.js` 里 grep `r.u=e=>"webflow.achunk."+({...})[e]+".js"`，那个对象就是 `{chunkId: contenthash}` 全表；publicPath `r.p` 从 `currentScript.src` 推导（=本地 js/ 目录）→ chunk 请求落在 `assets/<host>/.../js/webflow.achunk.<hash>.js`。按表 curl 每个 hash 从 `cdn.prod.website-files.com/<siteid>/js/webflow.achunk.<hash>.js` 下到那个 js/ 目录（064 是 12 个）。动态 chunk **不带 SRI**（grep `integrity` 只有 `nonce`）→ 下完即用。

**B. Three.js 走 `<script type="importmap">`（不是 esm.sh bare-import，跟坑 16.B 不同变体）。** importmap 把 `"three"`→`https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js`、`"three/addons/"`→`.../examples/jsm/`，内联 `type=module` 再 `import * as THREE from 'three'` + 10 个 `three/addons/...` + `import Lenis from 'https://unpkg.com/lenis@.../lenis.mjs'`。修法：**递归本地化 jsm**——BFS 从 build/three.module.js + 用到的 10 个 addon 入口 fetch，正则抓每个 .js 的 `import/export ... from '...'`（含 dynamic `import()`）：bare `three`→importmap 兜底不递归、`three/addons/`→`examples/jsm/`、相对 `./`/`../`→`os.path.normpath` 解析递归。**保留 jsm 目录结构**存到 `assets/cdn.jsdelivr.net/npm/three@<v>/`（相对 import 才解得对），三.module.js 自包含。再把 importmap 两个 URL 改成 **`./assets/...`**（importmap value 必须 `/`|`./`|`../` 开头，`./` 相对文档 base 解到镜像目录；bare `assets/...` 非法）。Lenis mjs 自包含，import URL 改 `./assets/unpkg.com/...`。064 递归收敛 19 个 three 文件。

**C. WebGL loader 资源（GLB/HDR/AVIF 贴图）是 THREE loader 运行时 `fetch` 的，scraper 抓不到 → 离线/跨源 CORS 拦。** 症状：online 时从 `cdn.mprez.fr` 加载正常，本地 mirror（127.0.0.1）报 `blocked by CORS policy` + `PAGEERROR: Failed to fetch` / `Cannot access 'section' before initialization`，canvas 起了(1440×900)但 draws 停/模型不显示。这些 URL 在 index.html 内联 boot 脚本里是**完整 https 字面量**（base.glb/can.glb/hdri2.hdr/6 口味 avif）。修法：全部下到 `assets/<cdnhost>/...` 同相对路径，把 `https://<cdn>/` 字面替换成 `assets/<cdn>/`（fetch 相对文档解析即可）。背景循环视频/loader 视频 scraper 已抓到（它们在 HTML `<video><source>` 里）。

**rebrand（品牌整体换 + 首屏改中文标题）**：用户「ciaoenergy 全改 himax、首屏中心改阿祖AI出海」。① **只替换带空格的品牌词** `Ciao Energy`→`Himax`、`CIAO ENERGY`→`HIMAX`——URL/文件名全是无空格形式（`ciaoenergy.com`/`cdn.mprez.fr/ciaoenergy/`/`Ciao-energy_*.avif`/`Ciao_energy-fav-*.png`/`CIAO-ENERGY-*.mp3`），空格形式绝不命中路径（同 045 rebrand 规则）。先 grep 确认 JS chunk 里无带空格品牌词（本站全部可见文本在 index.html），且社媒 URL/mailto/`data-wf-domain`/canonical 保留不动。② 首屏顶部正中 logo 是 path-based `<img src=...logo.svg>`（22 个 `<path>`、无 `<text>`）→ 换成**内联 `<svg class="navbar_logo" viewBox="0 0 130 47"><text>阿祖AI出海`**（保原 viewBox/footprint、白色 fill、CJK font-family 链），保持 nav 布局 1:1（cx/尺寸不变）。用户明确「图片里的文字不用改」→ 3D 罐子烤进 avif 贴图的 CIAO + loader `vertical_can.svg` 保留。JSON-LD 的 Organization name/logo 也随文本替换一起变 Himax。

**验收教训（loader 别被 5s 快照骗）**：这站 loader 是 ~20s 电影级 intro——采样 `t=2s 45%→8s 100%→(overlay op 1→0 淡出)→20s overlay=NONE(revealed)`。5s 截图只会抓到 87/93% 加载态（大 CIAO 竖罐 loader 图），**别以为卡住**；采样 loader%/overlay opacity 直到 revealed 才判定。断网验收（route-abort 非 127.0.0.1）：canvas 1440×900、WebGL 持续 draw、brokenImgs=0、local 4xx=0、唯一 blocked = umami 分析器。脚本：`c:/tmp/localize_three.py`（递归 three+lenis+媒体）、`c:/tmp/verify_offline.py`。

## 17. Webflow 站的自定义交互代码整套托管在**外部 Vercel app**（动态 `createElement` 加载）+ 帧序列来自 **Vercel Blob storage**（065-exebenus 实证）

exebenus.com（Webflow + Cloudflare，响应头 `x-wf-region`/`x-lambda-id` 认 Webflow）scrape 完先按坑 14 剥 SRI `integrity`/`crossorigin`（否则主 CSS 被拒、body 空、bg 白）。修完 body 渲染但**整页全黑**：探到全屏 fixed `.c-loader_main-wrapper`(z:99999) preloader 卡「0% Initializing drilling visibility...」永不消失，`canvas` 卡默认 300×150，hero `.c-title-2` opacity:0。诊断链（逐个 playwright probe）：

**A. 站点全部自定义 JS（canvas 帧序列渲染器 + preloader + 滚动动画）托管在外部 Vercel app，靠内联 `addScript()` 动态 `createElement("script",type=module)` 加载 → scraper 完全抓不到。** index.html 末尾内联脚本按 host 选 origin：`PRODUCTION_URL='https://<slug>-<site>.vercel.app'`（live 用它）/`STAGE_URL='https://<slug>.vercel.app'`（webflow.io 用）→ `addScript("main", \`${PRODUCTION_URL}/main.js\`, true)`。`main.js` 是 **Vite 构建的 ESM**（`import("./chunks/X.feature.js")` 懒加载 ~50 个 chunk，含 `image-sequence.feature`→`index.<hash>.js`(canvas 渲染实现) + `runtime.<hash>.js`(1.1MB 共享 GSAP/Lottie) + ScrollTrigger/SplitText/smoothScroll 等）。**修法**：① 递归下载 Vercel app 的 main.js + 所有 chunk（BFS 顺 `import/from"X"` 解析每文件目录下的相对 ref；注意 `__vite__mapDeps([...])` 数组里的 chunk 是**裸 `chunks/X` 无 `./` 前缀**，普通 import 正则漏抓，要单独 `["'](chunks|assets)/...["']` 补一轮）到 `designs/NNN-slug/custom/`（保持 `main.js`+`chunks/` 结构）；② production URL 可能 SSL/`ERR_CONNECTION_CLOSED`（部署暂停），用 **stage URL** urllib 抓即可（同仓库不同部署，feature 一致）；③ 把 index.html loader 的 `else` 分支改 `addScript("main","custom/main.js",true)`（相对文档解析→`/designs/NNN-slug/custom/main.js`，ESM 的 `./chunks/` 相对 main.js URL 自解，无 `<base href>` 也对；且相对路径比 deploy-absolute 更 portable）。localhost host 不匹配 webflow.io→走 else→命中本地。

**B. 高清滚动帧序列来自 Vercel Blob storage，base URL 埋在 minified chunk 的 config const 里（不是 DOM/manifest）。** `index.<hash>.js`（image-sequence 实现）里：`Nr=0,Br=781,Wr=4,Hr="webp",Vr="https://<random>.public.blob.vercel-storage.com/exebenus_img",kr="frame_"` → URL builder `Tn(e,t)=>\`${e.baseUrl}/${e.namePrefix}${padStart(t,e.padding)}.${e.extension}\`` = `.../exebenus_img/frame_0000.webp`（782 帧 0000-0781，4 位补零，各 ~180KB=139MB）。渲染器用 `new Image()`+`img.src=`（DOM 相对解析，`new URL` count=0）。**修法**：探测确认帧上界（`frame_0781`=200,`0782`=404）→ 24 线程并行下到 `designs/NNN-slug/frames/` → chunk 里 `Vr` 的完整 vercel-storage URL 替成相对 `frames`（→`img.src="frames/frame_0000.webp"`相对文档解析）。DOM 里那几个 `frameN.avif`(website-files) 是 counter 标记/低清 fallback，不是主序列。

**验收 + 已知特性**：断网(route-abort 非 127.0.0.1) → preloader 完成、canvas sized(如 1392×812)、hero 出图 + 滚动逐屏钻井平台线框可视化「发展」（深度计数 0m→5000m + `Sub-optimal ROP` vs `On Pace` 数据 overlay 按帧淡入）。**preloader 用本地帧后反而变慢（~40s vs 无帧时 7s）**：它 gate 在初始批（~28 帧）预加载 + 逐帧 `img.decode()`，`python -m http.server` 单线程串行发 139MB 是瓶颈 → 属重型序列固有特性（同 cartier 255MB/skf 249MB，导航器 0.25 缩略 iframe 会略卡，提示用户开 standalone）。残留可接受外部：Usercentrics CMP(`web.cmp.usercentrics.eu` consent banner 动态 import，离线 404 无害)、GA 501、`runtime.js` 动态 `import("https://cdn.jsdelivr.net/npm/p5@...")`（p5.js 懒加载，homepage 不需要、优雅降级）。**rebrand**：logo 是 8-path SVG(EXEBENUS 每字母一 path，`viewBox 0 0 160 16` fill `#FF671C`)→自画 `<text>` HIMAX（`textLength="150" lengthAdjust="spacing"` 填满原 wordmark 宽度）；可见品牌词全是**大写 `Exebenus`**（title/meta/JSON-LD/footer），URL/资源全是**小写 `exebenus`**（域名/CSS 文件名/mailto/linkedin/vercel/asset 路径）→ 精确替换 `Exebenus`→`Himax` 零误伤 URL。**教训**：Webflow 站 loader 脚本里出现 `vercel.app`/`createElement("script"` = 自定义代码在外部，必须递归下 + 本地化；帧序列 base URL 藏 minified config（`grep public.blob.vercel-storage\|baseUrl\|namePrefix`），不在 DOM。

## 18. 密码保护的 Shopify 店铺（storefront password page）→ 用密码换 `_shopify_essential` cookie 注入 scrape-url.py（071-uswing 实证）

**症状**：`curl -I` 目标站直接 `302 → /password`，响应头 `powered-by: Shopify`。scrape-url.py 裸抓只会拿到密码页（~11KB 的 `/password` 表单），不是真实店面。开发中的客户店铺、未上线的 Shopify 站常见（用户会给密码，如「密码是1」）。
**Why**：Shopify 未上线店铺用 storefront password 挡住整站。通过密码后服务端把认证态写进 `_shopify_essential` cookie（新版 Shopify 用它，不是老式 `storefront_digest`），后续请求带这个 cookie 才放行。scrape-url.py 是纯 urllib 无 cookie 支持。
**How to apply**：
1. **拿 cookie**：先 `curl -c jar.txt https://<shop>.myshopify.com/password`（拿初始 essential cookie），再 POST 密码：
   ```bash
   curl -s -b jar.txt -c jar.txt -X POST "https://<shop>.myshopify.com/password" \
     --data-urlencode "form_type=storefront_password" \
     --data-urlencode "utf8=✓" --data-urlencode "password=<PWD>"
   ```
   成功信号：`302 Found` + `location: https://<shop>.myshopify.com/`（跳回根，不是回 `/password`）。POST 后 `set-cookie` 里刷新的 `_shopify_essential` 即认证态。**别加 `-L`**（跟随重定向会 re-POST 报 411 Length Required，无害但干扰）。
2. **验证**：`curl -b jar.txt https://<shop>.myshopify.com/` 应 `200` + 真实 `<title>`（不含密码表单）。
3. **cookie 注入 scrape-url.py**：`http_get()` 已加环境变量钩子（HTML + 资源下载都走 http_get，一处覆盖全部）：
   ```python
   _ck = os.environ.get("SCRAPE_COOKIE"); _ck_host = os.environ.get("SCRAPE_COOKIE_HOST","")
   if _ck and (not _ck_host or _ck_host in url): _headers["Cookie"] = _ck
   ```
   `SCRAPE_COOKIE_HOST` 限定只对 myshopify host 发 cookie，不泄漏给 `cdn.shopify.com` 等 CDN。运行：
   ```bash
   export SCRAPE_COOKIE="_shopify_essential=<从jar提取的值>"
   export SCRAPE_COOKIE_HOST="<shop>.myshopify.com"
   python scrape-url.py "https://<shop>.myshopify.com/" NNN-slug "Title" --no-rebuild
   ```
   从 Netscape cookie jar 提值：`awk -F'\t' '/_shopify_essential/{print "_shopify_essential="$7}' jar.txt | tail -1`。
4. **验收**：镜像跟原站（Playwright 加同 cookie 开 live）逐项比对 `title/bodyLen/scrollH/imgs/broken/sections/products`——071 六项全部逐字相等即 1:1。**注意 bodyLen 可能很小**（uswing 只 1857 innerText 字符），别慌：Shopify 店面首页多是图片/产品卡，可见文本本就少，原站同值就对。
5. **可接受残留 4xx**：`cdn/shopifycloud/checkout-web/assets/...{css,js}`（结账 SDK 投机预加载，**原站也 404**，只在真实结账上下文才 serve）+ checkout 翻译 `translations/*.js` 404 + `produce_batch`/`monorail`/`analytics` beacon（POST → http.server 501）。都不影响店面首页视觉/交互。
6. **bare specifier 修复**（同坑 #7）：Shopify 首页常有 `import("assets/.../loader.init-shop-cart-sync.en.esm.js")` → 缺 `./` 报 `Failed to resolve module specifier` → `sed -i 's|import("assets/|import("./assets/|g' index.html`。
**脚本模板**：`C:/tmp/verify_uswing.py`（mirror vs live 同 cookie 对照）。

## 19. Wix Studio (Thunderbolt) 镜像：scraper 把逗号分隔的 imgix 变换 URL 拆坏 → 假 404，但图其实已下到本地（073-wixstudio-space 实证，已解）

Wix 站（`grep wixstatic.com\|parastorage.com\|wix-thunderbolt` 命中；HTML 里有 `<script src=".../wix-thunderbolt/dist/main.*.bundle.min.js">` + `siteassets.parastorage.com/pages/pages/thunderbolt?...` 特征）通常是 **SSR 预渲染的 Thunderbolt 页**——首屏 HTML 是真实 markup（hero 能渲染），scroll journey 动效走 Wix motion（CSS/JS），scrape-url.py 一遍基本到位。但 Wix 的响应式图片 URL 有个**逗号分隔的 imgix 变换段**会把 scraper 的 URL 改写逻辑坑翻。

**症状**：scrape verify 报一堆 `! https://www.wix.com/studio/design/inspiration/h_25 (404)` / `.../enc_avif (404)` / `.../blur_2 (404)` / `.../q_85 (404)`——这些"文件名"其实是 imgix 变换参数。首屏 preview.png 里 hero 缺图（astronaut/clouds 空）。
**Why**：Wix CDN 图片 URL 形如
`https://static.wixstatic.com/media/<id>~mv2.png/v1/fill/w_49,h_32,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/<filename>.png`
——`/v1/fill/` 后是一串**逗号分隔**的变换参数。scrape-url.py 把每个"看起来像相对路径"的逗号段（`al_c`/`q_85`/`blur_2`/`enc_avif`/`usm_...`）当成页面相对 URL，改写成 `assets/www.wix.com/studio/design/inspiration/al_c` 之类的**bogus 前缀**插进 URL 里（下载那些假 URL → 404）。**但关键**：scraper 用**清洗后的正确 URL**把大部分图**已经下到本地干净路径**（`assets/static.wixstatic.com/media/<id>~mv2.png/v1/fill/w_49,h_32,al_c,q_85,.../file.png`），只是 HTML 里的 `src` 引用是**被污染的**（插了 bogus 前缀）→ 磁盘有图、HTML 指不到 → broken。
**How to apply**：
1. **确认污染范围**：`grep -oE 'assets/www\.wix\.com/studio/design/inspiration/[a-z0-9_.]+' index.html | sed 's|.*/||' | sort -u`——列出 bogus 前缀后的所有 token。应当**全是 imgix 参数**（`al_c q_85 blur_2 enc_avif enc_auto usm_0.66_1.00_0.01 h_NN w_NN lg_1 quality_auto`）**外加一个 `index.html`**（唯一合法、要保留）。
2. **剥 bogus 前缀**（negative-lookahead 保护 index.html）：
   ```python
   import re
   html = re.sub(r'assets/www\.wix\.com/studio/design/inspiration/(?!index\.html)', '', html)
   ```
   剥完 HTML 的 `src` 就精确等于磁盘上的干净路径（48/51 直接命中）。同时覆盖 `src`/`srcset`/`url()` 三种形式。
3. **补下没抓到的少数图**（HTML 剥完后仍 `not os.path.exists` 的）：CDN URL = `assets/` 段换成 `https://`，路径 `urllib.parse.quote(safe=',~._-()=')`（保留逗号/波浪号），Chrome UA 下载。**注意 raw `~mv2.png`（无 `/v1/fill/` 变换段）需要 UA 否则 403，但带变换段的 URL 无 UA 也 200**。
4. **超长路径（>260）的图 http.server 发不出 → 404 → broken**（同**坑 14** goodlifemeds）：这些 URL-as-filepath 带 `/v1/crop/.../fill/.../` 或双 `f000.jpg` id 时路径极长，Python 能用 `\\?\` 前缀写盘但 **http.server 开不了长路径**（存在但 serve 404）。修法：`shutil.copyfile` 到短名 `assets/wixmedia/<12hex>_<w>x<h>.<ext>`，正则把 HTML 里该长 ref（含 `%20` 空格变体）改短名。
5. **验收**：Playwright 断言 `broken===0` + 本地 4xx 归零。mirror vs live 六项指标（title/bodyLen/scrollH/imgs/videos/broken）逐字相等即 1:1（073 全等：bodyLen 1824、scrollH 31350、imgs 65、videos 6）。
**可接受残留**：`frog.wix.com/bolt-performance`（Wix 性能 beacon，502）、`sentry-next.wixpress.com`（429 限流）、`clientWorker.*.bundle.min.js` 从 `www.wix.com` 跨源 `new Worker()` 被 SecurityError 挡（Thunderbolt 运行时 worker，离线本就跨源失败）——都是 Wix 后端遥测/运行时 worker，不影响 scroll journey 视觉/动效。**og:image**（`058543_...jpg`）留绝对 CDN URL 不动（社媒 meta 用）。
**脚本模板**：`c:/tmp/fix_wix_imgs.py`（剥 bogus 前缀 + 安全 token 报告）、`c:/tmp/dl_missing_wix3.py`（`\\?\` 长路径补下）、`c:/tmp/fix_longpath_wix.py`（超长→短名 + HTML 改写）、`c:/tmp/cmp_wix.py`（mirror vs live 六指标 + 逐屏截图对照）。

### 19b. Wix 的 scroll 动效离线全死（motion runtime 跨源 fetch parastorage）→ 自驱 rAF 复刻（073 实证）

**这是 073 收尾时被用户抓到的严重漏验**：图修完、六指标全等、逐屏截图都"对"，就 ship 了。用户一滚就发现"很多动效不一致——宇航员的躺倒、星球的旋转"全没了。**教训见文末「motion 验收硬规则」。**
**症状**：Wix scroll journey 的所有 scroll-scrub 动画（元素随滚动旋转/缩放/位移/reveal）在镜像里**全部静止**——元素卡在 SSR 快照的 `data-motion-enter="done"` 末态，滚动时 transform 不变。**静态截图完全看不出**（每个 section 停下来构图都对），只有 motion-sample 才暴露。
**Why**：Wix Thunderbolt 的动效不在 SSR HTML 里，靠**运行时**驱动：`main.*.bundle.min.js` 加载后 **`fetch()` 跨源**从 `siteassets.parastorage.com/pages/pages/thunderbolt?...&module=thunderbolt-features&pageId=...` 拉一份 **JSON**（组件结构 + behaviors + motion 定义,主页那份 ~850KB）。离线时这个跨源 fetch 失败 → 没有 behaviors → motion 引擎不跑。HTML 里那 3 条 `<link rel="prefetch" as="fetch" ...thunderbolt?module=...>` 只是**预取提示**,不是执行入口。
**诊断（motion-sample,不是截图）**：扫全部元素在多个 scrollY 下的 `getComputedStyle(el).transform`,统计"跨 scroll 变化"的元素数。live 有 N 个（073 是 astronaut #comp-lte8dpl4 随滚 `matrix(1,0,0,1..)`→`matrix(0.769,-0.558,0.558,0.769..)` = 缩放+旋转；spheres 同理）,mirror **0 个** → 引擎死。模板 `c:/tmp/motion_scan.py`。
**Path A（复活原生 runtime）——试过,无效,别浪费时间**：把那 4 份 feature/platform JSON 抓下来（Playwright `response.body()`）+ 注入 fetch 拦截器按 `module=+pageId` serve 本地 → mirror 仍 **0 个** motion。因为 motion 的**代码**（lazy webpack chunk）也没下来,且 Thunderbolt 还要 `new Worker('https://www.wix.com/.../clientWorker...')` 跨源被 SecurityError 挡。**跟坑 #6/#15 同族:重型 SPA runtime 离线复活是无底洞**。
**Path B（自驱 rAF 复刻,采用）**：跟 028 on.energy 自驱 shader / 045 自驱相机同思路。**关键教训:第一版只采 `transform+opacity` 不够,用户第二轮又抓出文字 reveal/火箭没动 → 必须采「全部会动的 CSS 属性」。**
1. **先全属性扫描找机制**（别假设只有 transform）：多 scrollY 下扫全元素,统计哪些属性跨 scroll 变。073 实测:`transform`(89) `opacity`(17) **`clipPath`(25=文字逐行 clip-wipe reveal「字逐步出现」+ 火箭 portal)** **`filter`(21=blur)** **`color`/`webkitTextFillColor`(40=文字变色 reveal)**。**文字 reveal 常是 clip-path polygon 逐行擦除或 text-fill-color 渐显,不是 transform** —— 漏了这类就"文字不出现"。模板 `c:/tmp/prop_scan.py`。
2. **确认目标元素在镜像 SSR 存在**：文字被 SplitText 拆成 span/行 div,检查 mirror 的 `#comp-xxx` innerHTML 与 live 是否同构（073 同构,可驱动）。若是 runtime 才创建的 span,镜像没有就驱动不了。
3. **综合密采**：SSR 稳定选择器（`#id` 或 `nth-of-type` 链上溯到 id 祖先,073 全命中）→ 密采**每个会动元素的全部会动属性**为**原始 computed 字符串**（`scrollY→{prop:值}`,每 80px 一帧）。存 `assets/motion-full.json`(~1.9MB)。
4. **注入通用插值 rAF**（marker `sc2-motiondrive`）：**通用「数值字符串插值」**——把两帧的属性字符串按数字模板对齐（`s.replace(/-?\d*\.?\d+/g,'~')` 比模板,同则逐数 lerp,异则 snap）。一套代码插值 `matrix()`/`inset()/polygon()`(clip)/`blur()`(filter)/`rgb()`(color) 全搞定。clipPath 同时写 `clip-path`+`-webkit-clip-path`;color 写 `color`+`-webkit-text-fill-color`。模板见 073 `index.html` sc2-motiondrive 块 + `c:/tmp/capture_full.py`。
5. **相位保真:平滑连续滚动采集,不要 jump**：Wix 的 reveal 多是「进视口时按时间播 ~0.8s」的 trigger 动画,不是纯 scroll-scrub。用 `scrollTo` 跳采会得到任意快照;必须**模拟真实用户平滑下滚**（`scrollBy(0,14)`/帧 ~840px/s）+ 每帧 rAF 记录「当前 scrollY 落入的 80px 网格格」的属性值,得到「平滑下滑时每个位置的真实态」。模板 `c:/tmp/smooth_capture.py`。**验收也必须 mir/live 同用平滑滚动对照**（jump 对照是假象:jump 会提前触发 reveal,冤枉镜像）。
6. **验收**：多 agent workflow 逐段对照 mir/live 平滑滚动截图对（`c:/tmp/pairs.py` 采对 → workflow 逐段 adversarial 比 + 完整性 critic）。073 结果 16/20 位置 1:1,宇航员/火箭/文字 reveal/finale 全对。**注意:重型 WebGL 页并发验收会崩（见 045）→ 让 agent 只 Read 预采的 PNG 对,不各自开浏览器**。
**Path B 的两类硬限制（要当面说,别装 1:1）**：
 - **时间/速度/trigger 分量**：Wix reveal 靠时间播,静态 `scrollY→prop` 曲线只能复刻「平滑下滑时的手感」,jump 到某点定格的精确态复刻不了（宇航员匀速躺倒对得很好;文字 reveal 平滑滚下也对）。
 - **runtime 虚拟/平滑滚动 section（最狠,星球画廊 2nd cluster 实证）**：某些 section（横向滚动画廊/pin）live 用 runtime 驱动的**虚拟滚动**——`window.scrollTo(y)` 后视觉位置 ≠ y（内容在 `.vhuu5-overflow` 容器里被 runtime lerp）。同一个 `window.scrollY`,incremental 到达 vs `scrollTo` 直达,元素位置**不同**（073 大紫星球 imgTop 6476 vs 在屏,全程无 transform）。镜像原生滚动 `scrollY`=视觉位置,与 live 的虚拟滚动**根本错位**,自驱按 `scrollY` 采的曲线对不上 → 那个 section 星球会「该在时不在」。**这是 Lenis/虚拟滚动同族限制（见 cartier / `feedback-no-good-enough`）,自驱碰不了,只能复活 runtime（无底洞）或接受**。073 星球第一簇（settled y=12200）对得很好,第二簇（y=13400）因虚拟滚动错位偏差。
**og:image / 六指标之外**:六指标全等 ≠ 动效对（073 就是六指标全等但动效全死）。

### ⚠️ motion 验收硬规则（073 漏验教训,已并入工作流）

**任何镜像,只要 `grep` 命中动效运行时**（`wix.*motion`/`data-motion-part`/`ScrollTrigger`/`gsap`/`framer-motion`/`lenis`/`animation-timeline`/`ScrollSmoother`),**收尾必须 motion-sample（mirror vs live 的 transform/opacity 曲线对照）再判定,不能只截图**。根因同 `feedback-motion-sampling-mandatory.md` / `feedback-no-good-enough-shortcuts.md`:**"渲染成功 + 六指标全等 + 逐屏截图对 ≠ 动效忠实"**。SSR 站尤其阴——SSR markup 把动画末态烤进 HTML,截图停下来全对,一滚才发现引擎死。073 就是只截图没 motion-sample 就 ship,被用户当场抓出。

### 19c. 自驱动达不到 1:1 时:Wix runtime 是「域名锁」的,在线原生也救不了 → **WACZ 回放才是唯一真 1:1**（073 最终方案,已落地自包含离线）

073 自驱动交付后用户仍要「全面且一比一」(自驱动的相位/虚拟滚动段对不齐、有 filter blur 卡死等本质局限)。于是逐条验证了两条「更狠」的路,结论:
**① 在线原生(让镜像加载 Wix CDN 真运行时)是死胡同——runtime 域名锁**:实测**连 Wix 官方原版 index.html 放到 127.0.0.1 都崩**(不是 scraper 的锅)。逐层拆:(a) `thunderbolt-commons` 的路由函数 `m=({relativeEncodedUrl:r})=>r.match(...)` 在子路径下 `r` 为 undefined → 崩,`r.match`→`(r||"").match` 可绕;(b) 补 `<base href>`+`history.replaceState('/studio/design/inspiration/space')` 后 `animations.<hash>.chunk.min.js`(motion 代码)**能加载了**;(c) **但 motion 引擎就是不激活**——hook `EventTarget.addEventListener` 数到 **0 个 scroll listener**,transform 全程 identity。Wix 运行时结构性拒绝在非 wix.com 域名激活动效,再往下是无边界逆向 init 时序、无保证。**教训:重型 SPA 运行时「域名锁」类站,在线原生也别硬刚**(同坑 #6/#15「无底洞」再确认)。
**② WACZ 回放是正解,且恰好破域名锁**:replay-web-page 回放时让页面**以为自己在原 URL(www.wix.com/…)** → 域名锁不触发 → **真运行时正常跑 → 动效真 1:1**(宇航员 transform 逐位==live:y=300 `matrix(0.972311,-0.166662,...)`==live;文字逐行 clip reveal、星球、火箭全是原生的)。且 **WARC 存档全 → SW 从存档 serve → 完全离线**(route-abort 非本地,0 外部请求,motion 照跑)。**比在线原生还好(自包含+离线+1:1)**。

**自动化造 WACZ 的落地流程(Windows,无需 ArchiveWeb.page 扩展)**:
1. **录**:`warcprox` 在 Windows 挂了(`import fcntl`)→ 改用 **Playwright `context.on("response")` 抓所有响应**(url/status/headers/body),`warcio.WARCWriter` 写 `response` 记录。**关键**:Playwright 的 `r.body()` 是**解码后**的字节 → 写 WARC 时**去掉 `content-encoding`/`content-length`/CSP header、Content-Length 设成解码后长度**,否则回放二次解压坏掉。加载 live + **完整滚 2 遍(每 250px 停 160ms)**触发所有懒加载图/chunk/feature JSON。073 抓到 251 条 / 14.8MB。模板 `c:/tmp/wacz_record.py`。
2. **打包**:`pip install wacz warcio setuptools`(wacz 要 `pkg_resources`,setuptools≥81 删了它 → **`pip install "setuptools<81"`**)。`wacz create -o x.wacz x.warc.gz` **在 Windows 有 bug**(zip 条目名用反斜杠 `archive\x.warc.gz` → 读 datapackage 时 `BadZipFile`,且不生成 `datapackage.json`)。**绕过:手搓 WACZ**——从半成品 zip 取出 `indexes/index.cdx.gz`+`index.idx`,配 disk 上的原始 WARC,自己写 `pages/pages.jsonl`(header 行 + 1 条 page)+`datapackage.json`(resources 带 `sha256:`+bytes)+`datapackage-digest.json`,用 `zipfile`(**正斜杠路径**,ZIP_STORED)重打。模板 `c:/tmp/rebuild_wacz.py`。
3. **接入 sc2**:`.wacz` 放 `designs/NNN-slug/`,把手写 `index.html` 挪走(→`index-selfdrive.html` 留作 fallback),`python rebuild-index.py` 自动生成 `<replay-web-page source=x.wacz url=<原URL> embed=replayonly replayBase=../_replay/replay/>` viewer(检测 `.wacz`+index 缺失/带 marker 才生成)。**必须本地 http server 开**(SW 注册,不能 file://)。
4. **验收**:Playwright 加载 viewer,`pg.frames` 里找含 astronaut img 的 content frame(回放是 iframe-in-iframe,3 帧),`frame.evaluate("window.scrollTo")` 滚它 + 量 transform 随滚变化 + 逐位对 live。再 route-abort 非 127.0.0.1 确认离线仍跑。模板 `c:/tmp/verify_replay.py`/`verify_offline_replay.py`。
**残留**:回放里 cookie banner 会重现(runtime 每次回放重新初始化、consent 态没存进档),属真实站一部分,想干净得录进 dismissed 态或注入 CSS(iframe 跨源难,一般接受)。导航器卡片对 wacz 是 iframe-in-iframe 有 SW scope 冲突显灰屏,点开 viewer 正常(见坑 #6 尾注)。
**决策树补丁**:动效运行时站 → 自驱动(离线近似,快)；要**真 1:1** 且自驱动达不到 → **先判运行时是否「域名锁」**(把官方原版 HTML 放 127.0.0.1 试,崩=锁)→ 锁了就**别碰在线原生**,直接 **WACZ 回放**(自包含+离线+真 1:1)。

## 20. Astro v5 站的五连坑：importmap 自托管 Three.js 漏抓 + 运行时 root-absolute 资源 + `history.replaceState` 改 pathname 让懒加载相对资源 404（072-bitfalk-aim 实证，已完全离线 1:1）

bitfalk.com/aim（`<meta name="generator" content="Astro v5">` + GSAP ScrollTrigger/TextPlugin + Three.js UnrealBloom + 5 个 WebGL 场景 + 222 帧滚动 falcon canvas + 复古 falcon.exe 小游戏 iframe）。这是 **server-rendered Astro**（HTML 是真实 markup，非 SPA hydration），但首屏被 `.loading` 遮罩挡住、`body innerText` 只 876 字符——因为整页动画靠 `import('three')` 模块驱动,而 scraper 把 Three.js 全漏了、模块级联崩、loading 永不消失。逐坑：

**A. importmap 自托管 Three.js 漏抓（跟坑 16/17 同族但自托管 + root-absolute）**：HTML 有 `<script type="importmap">{"imports":{"three":"/js/vendor/three/three.module.min.js","three/addons/":"/js/vendor/three/examples/jsm/"}}</script>`，scene JS `import * as THREE from 'three'` + `three/addons/postprocessing/{EffectComposer,RenderPass,UnrealBloomPass}.js`。这些是 **bare-specifier import 经 importmap 解析**、不是 `<script src>` → scraper 完全跟不到 → 全 404。修法：① 递归下载 three 树（入口 = three.module.min.js + 用到的 addon,顺 `import/from './xx.js'` 相对引用 BFS,addon 之间还互相引 Pass/ShaderPass/CopyShader/LuminosityHighPassShader/MaskPass;bitfalk 10 个文件收敛）到 mirror 根 `js/vendor/three/`;② importmap 的 root-absolute value `/js/vendor/...` 改 **`./js/vendor/...`**（importmap value 必须 `/`|`./`|`../` 开头,`./` 相对文档 base 解析)。

**B. 运行时构造的 root-absolute 资源 scraper 全漏（且有的懒加载,首验测不到）**：Astro 站把大量资源路径**在 JS 里运行时拼**成 root-absolute（scraper 只跟 HTML 里字面出现的）：
   - **帧序列** `` `/images/falcon-smooth/out${(i+19).padStart(4,'0')}.webp` ``（frameCount 常量,bitfalk 222 帧 0019–0240）
   - `/Universum/` WebGL 场景素材（fog/erdnacht/cartridge.html + 贴图）
   - **`/sounds/*.mp3|wav` 音效**——只在 hover/click 才懒加载,**首次 headless verify 完全测不到**（差点漏掉整个音效系统)
   - `/falconexe/` iframe 里的整套小游戏（见坑 D）
   - techstack 场景的 devicon 图标从 `cdn.jsdelivr.net/gh/devicons/...`（CDN,离线要本地化）
   **教训**：别只信 verify 的 4xx 列表。收尾必须 `grep -rhoE "['\"\`(]/([A-Za-z][A-Za-z0-9_-]*)/" 所有 JS` 把**每一个** root-absolute 前缀列出来逐个核（bitfalk 第一遍漏了 `/sounds/`,因为它懒加载)。下载后按前缀改写 `['"\`(]/X/` → `assets/<host>/X/`（document-relative,配合下面 base href 免疫 replaceState)。

**C.(最通用最隐蔽的新坑)站点自己的 `history.replaceState` 改 `location.pathname` → 之后懒加载的相对资源解析基准跟着变 → 404**：bitfalk 有个「URL-slug-sync」滚动处理器,滚到不同区就 `history.replaceState(null,null,'/ideas')`（把 URL 改成 slug）。**后果**:pathname 从 `/designs/072-.../index.html` 变成根级 `/ideas` → 之后任何**懒加载的相对 URL**（techstack 滚进视口才加载的 devicon、用户点 tab 才 set 的 falconexe iframe `src`）解析基准变成根 → `/assets/...` → 404。**极度迷惑**:同一批资源初始加载的那些 200、滚动后加载的那些 404,表现为「**间歇性、随机子集** 404」(figma/mongodb/postgresql 这次挂、下次换一批)。**根因诊断**:404 的 URL 是 root `/assets/...` 而非 `/designs/NNN/assets/...`,且都是懒加载资源。**修法**:注入 `<base href="/designs/NNN-slug/">`（Nuxt recipe step4 同款)——base href 让**所有相对 URL 锁定解析基准**,与 `location.pathname` 如何被 replaceState 改动**完全无关**。这比逐个 patch 站点的 updateURL 更 bulletproof(还可能漏边界)。注意:importmap 的 `./` 与 base href 兼容(Chromium 用文档 base URL 解析 importmap),three 放 mirror 根 `js/vendor/three/` 正好命中。**副作用**:replaceState 仍会把 URL 栏改成 `/aim` 等(root-absolute URL 参数不受 base href 影响)——但这**正好复刻原站**(原站 URL 栏也显示 bitfalk.com/aim),纯 cosmetic 且忠实。

**D. Astro 常见两个 head 内小机关**：
   - **mobile-redirect inline script**:head 第一个 `<script>` 常有 `if(innerWidth<768) location.replace('/mobile/')` → 窄窗/缩略图 iframe 会跳去 root-absolute `/mobile/` 逃出镜像目录 404。中和掉两处 `location.replace(mobilePath)` → `void 0`。
   - **嵌套 iframe 子应用自带 `<base href="/xxx/">`**:falcon.exe 小游戏 `assets/<host>/falconexe/index.html` 里有 `<base href="/falconexe/">`（root-absolute)→ 它内部相对 ref(style.css/game.js/sprites/)全解到 root → 404。改成 `<base href="./">`(相对 iframe 自身 URL,自包含)。子应用还常引 google-fonts(Press Start 2P)+ 死的 CDN(web-haptics@1.0.2 npm 上根本不存在,原站也 404,留着即可匹配 live)——字体本地化,死引用保留。

**E. sub-path 触发站点自身潜在 ReferenceError（坑 4 的又一变体）**：`handleInitialPath()` 读 `location.pathname.replace(/^\/|\/$/g,'')` 做 deep-link,镜像子路径(`designs/072-.../index.html`)不是任何真实 slug → 命中一个**作用域外的 `slugMap`**(原站作者只 `window.` expose 了 `updateURL` 忘了 `slugMap`,是原站在直接访问 `/tech` 等真实 slug 时也会炸的潜在 bug,只是首页从不触发所以 live 无报错)。镜像下 `pageerror: slugMap is not defined`。**修法**:剥掉镜像前缀让 path 归空 → `if(!path)return` 提前返回,行为 = 原站首页(不能改 location.pathname,否则毁掉所有相对资源解析——本站没 `<base>` 时靠 document-relative,有 `<base>` 后也不该动 pathname)。

**验收(断网 route-abort 非 127.0.0.1)**:scrollH 与原站逐字相等(bitfalk 7915==7915)、5 canvas 全 1440×900、brokenImgs=0、pageerror=0、devicon 15/15 滚动后仍 200、falcon.exe iframe 自包含渲染。逐屏截图对照 hero(falcon+鹰影)/WELCOME 段/THE ENGINE ROOM 终端+3D 弹夹/footer 全 1:1。**live 对照的自动化陷阱**:原站用 Lenis 平滑滚动,`window.scrollTo` 驱动不了(镜像能),导致 live 截图卡在早段——是**自动化假象不是内容差异**(同 cartier 坑「合成滚动驱动不了 Lenis」),判断内容完整性以镜像自身逐屏 + 关键区 A/B 为准。**可接受残留**:`/cdn-cgi/rum`(Cloudflare beacon POST→501)。**预判**:见 Astro v5 + `<script type="importmap">` + `import('three')` + 首屏 `.loading` 卡住,按 A–E 顺查。脚本模板:`c:/tmp/verify_bitfalk.py`(断网验收)、`c:/tmp/ab.py`(mirror vs live 六指标)。

## 21. WebGL 首屏依赖 preloader 结束态 + LocomotiveScroll wheel 在离线镜像中不接管：卡车出现但不随滚轮行进（0006-madarplatform）

**症状**：`terminal-industries` 后的 `madarplatform` 镜像中，GLB/OBJ/贴图都已本地化且 200，但首屏卡车最初缺失或只在顶部被裁掉；修出卡车后，滚轮下滑时卡车不会像原站一样沿路线前进。控制台无错误，外部请求也可能为 0，容易误判为“资源都齐了”。

**根因**：
1. 原站 WebGL 首屏相机分两段：preloader 起点 `Z[0]` 和 preloader 结束/真实滚动曲线起点。离线镜像为了快速显示页面隐藏了 preloader，结果 Three.js 相机停在 preloader 起点，卡车模型虽然存在但投影到视口上沿之外，表现为“卡车缺失”。
2. WebGL 滚动相机更新函数有 `!this.isPlaying` 条件。离线跳过 preloader 后 `animation.isPlaying` 仍为 `true`，导致 `handleScroll()` 不执行，滚动曲线被锁死。
3. 页面启用了 LocomotiveScroll/smooth-scroll，`html` 被加 `overflow:hidden`，真实滚动由 Locomotive 内部 y 值驱动。离线/本地环境中 wheel 输入没有可靠进入 Locomotive，`window.scrollY` 和 `app.animation.scroller.getScrollProgress()` 都停在 0，所以即使相机曲线没锁，用户滚轮也不会推动卡车。

**How to diagnose**：
- 用 `#debug` 或等价方式暴露 `window.app`，检查 `app.truck.gltf` 是否存在、`camera.instance.position`、`camera.cameraControls._target`、`animation.isPlaying`。
- 用 Three.js `Box3().setFromObject(truck)` + 投影到 NDC 检查模型是否在视口内。若 `ndcMax.y > 1`，不是资源缺失，是相机位置裁掉。
- 手动调用 `jQuery('body').data('smoothScroll').scroller.scrollTo(1000,{duration:0,disableLerp:true})`。如果 `app.animation.scroller.getScrollProgress()` 和相机位置随之变化，说明原站曲线正常，坏的是 wheel 输入/离线滚动接管。

**Fix pattern**：
1. 不要只看 Network 200。必须验证 GLB 在 Three.js 场景中存在且投影在视口内。
2. 若跳过 preloader，必须同步设置 WebGL 状态到“preloader 已完成”：
   - 初始相机点用原站 preloader 结束点/滚动曲线起点，而不是 preloader 起点。
   - `animation.isPlaying` 初始值改为 `false`，让 `handleScroll()` 能响应滚动。
3. 若页面使用 LocomotiveScroll 且 `html/body overflow:hidden`，不要依赖 `window.scrollTo` 或普通 `page.mouse.wheel` 判定滚动。离线可加一个很小的 fallback：capture 阶段监听 `wheel`，`preventDefault + stopImmediatePropagation` 后调用原站自己的 `scroller.scrollTo(y,{duration:0,disableLerp:true})`。这样只是把输入喂给原 runtime，卡车、路线、pin、相机插值仍由原站代码执行。
4. 验收必须包含：滚轮前后 `locoy`、`appScroll`、`camera.position` 三者都变化；并保留外部请求 0、requestfailed 0、console/pageerror 0。

**Extra note**：Playwright `page.screenshot()` 有时会卡在 `waiting for fonts to load`，即使 `document.fonts.status === 'loaded'`。可用 CDP `Page.captureScreenshot` 作为截图兜底，不要把这个误判为页面加载失败。
## 22. Nuxt + Spline 站点的离线镜像硬规则：不要只看图片 200，必须补齐 `.splinecode` + Draco + headless 绕过验证

Flowty/Himax（`090-flowty`）这次的主坑不是普通图片，而是 Nuxt 客户端运行时里的 Spline 3D 手机。后续同类站点默认按下面做：

- `cdn-cgi/image/... srcset` 会产生大量尺寸变体。只抓到一个尺寸时，浏览器仍可能按 DPR/viewport 选另一个缺失路径，表现为“很多无法显示”。必须枚举 `index.html` 里的所有 `src/srcset` 本地引用，缺的同名变体用已下载的最佳变体补齐，最后验证 `broken image = 0`。
- Nuxt chunk 里可能有动态 Spline 路径，例如 `` `/spline/${scene}` ``、`"/spline/phone.splinecode"`。这些不会被普通 HTML 抓取覆盖。必须 `rg "splinecode|/spline/" _nuxt assets/<host>/_nuxt`，下载所有 `.splinecode`，并把根路径改成本地镜像路径。
- Spline runtime 还会从 Google 拉 Draco 解码器：`https://www.gstatic.com/draco/versioned/decoders/1.5.2/{draco_wasm_wrapper.js,draco_decoder.wasm,draco_decoder.js}`。离线包必须本地化到如 `draco/`，并 patch runtime 默认 decoder path，否则 `.splinecode` 200 但 canvas 仍不生成。
- 自动化验证会被站点自己的 bot/headless 检测跳过。Flowty 的组件检查了 `HeadlessChromium`、`navigator.webdriver`、`plugins.length`、`languages`。Playwright 自查 3D 时要注入正常 UA、`webdriver=false`、非空 plugins/languages，否则会误判“3D 未加载”。
- 不能只看 DOM 有容器。必须等 10-20s 后检查 `document.querySelectorAll("canvas")`、canvas class/尺寸/opacity、Spline/Draco 请求是否 200，截图确认 3D 非空。
- Rebrand 压缩 Nuxt chunk 时，要同时改 SSR HTML 和客户端 `_nuxt/*.js`，否则 hydration 后会恢复旧文案。中文写入不要经过 PowerShell 默认编码；用 UTF-8 编辑或用 Unicode 码点修复，避免变成 `??AI??`。
- SVG logo 通常是路径，不是文本。品牌替换后仍显示旧字标时，用局部 CSS 覆盖目标 logo 容器，隐藏原 SVG 并用伪元素输出新品牌；选择器必须足够窄，避免误伤菜单图标。

验收模板：本地 HTTP 打开，`broken image = 0`，非 analytics 本地 4xx/failed = 0，至少一个 3D canvas 正常尺寸，截图能看到 3D 主体；再打开带 cache-buster 的 URL 给用户确认。


## 22. Next streaming + offline animation/page-preload pitfalls (2026-07-13, icomat)
- Do not do raw global brand replacement across scraped HTML. It can mutate asset URLs, JSON payloads, and encoded text. Prefer DOM/text-node replacement or narrowly scoped static text replacement.
- PowerShell text rewrites can damage UTF-8-heavy scraped HTML and JavaScript escapes. For large HTML/JS patches, use byte-safe UTF-8 writes and verify injected scripts with `node --check`.
- React/Next streaming pages may keep real content inside hidden `S:0` fragments until `$RC` runs. Add a fallback that releases the streamed fragment when the visible page shell remains empty.
- Offline mirrors must patch URL property setters, not only `setAttribute`: Next image/script/link code often assigns `img.src`, `link.href`, `video.src`, or `poster` directly.
- Stuck loader/overlay layers can make a page appear blank even when DOM and assets are loaded. Inspect large fixed elements and hide only the stuck loader/overlay, not broad UI panels.
- Split-text/GSAP fallbacks should be scoped to the affected hero/section. Global `.line/.word/.char` overrides can pull later sections into the first viewport.
- Next route prefetch may request non-home chunks even when only the homepage is needed. Disable or stub optional route chunks so the offline self-check has no 404s.


## 23. Lenis wheel can be blocked while programmatic scroll still works (2026-07-13, icomat)
- Always self-check real wheel input, not just `window.scrollTo()`: a page can have normal `scrollHeight` and still ignore mouse-wheel events because Lenis/animation code intercepts wheel offline.
- If `scrollTo()` works but `page.mouse.wheel()` leaves `scrollY` unchanged, add a conservative wheel fallback: listen in capture/passive mode, wait one animation frame, and only call `scrollBy` when native scrolling did not happen.
- Include keyboard fallback for PageUp/PageDown/Arrow/Home/End when the site relies on a custom smooth-scroll runtime.


## 24. Icomat / Next image optimizer + HEVC + sequence verification (2026-07-13, 0008-himax-icomat)
- Do not treat a generic local _next/image fallback as success. Next optimizer requests must be mapped by decoded original `url` plus `w`; width-only matching can make many cards show the wrong repeated image while network checks still pass.
- Patch `srcset` / `imagesrcset` setters as well as `src`. Next/React can assign optimizer URLs through srcset after hydration.
- HEVC/HVC1 MP4 files can load as files but stay at `readyState=0` in Chromium offline mirrors. Transcode visible videos to H.264/yuv420p and rewrite runtime URLs to those copies.
- Sequence/3D sections using `/images/sequences/*.tar` need the real tar files. A stub or missing tar can leave the canvas black even with zero broken images. Verify by screenshot and canvas pixels at the relevant scroll positions.
- Logo/lottie wordmarks can disappear after the original animation state changes. Use one deduplicated Himax text fallback; check it on both dark and light sections so it does not overlap or vanish.
- Self-check must include visual screenshots, real wheel input, external-request blocking, local 4xx, broken visible images, video dimensions/readyState, and brand text scan. Local `net::ERR_ABORTED` media requests can be caused by pause/src swaps; judge them with final readyState and screenshots.

## 25. Webflow + model-viewer homepage mirrors (2026-07-14, 0009-himax-telkom-ot)
- Webflow embeds can put all 3D assets in `<model-viewer src="https://r2.../*.glb">`. Generic HTML/image scraping misses these. Extract every `model-viewer[src]`, download the GLBs, rewrite to local paths, and also mirror model-viewer's Draco/KTX2 decoder assets from `www.gstatic.com`.
- Offline URL guards must allow same-origin absolute URLs. If `http://127.0.0.1/.../asset.glb` is treated as an external URL and replaced with `#`, model-viewer may fetch/parse the HTML document and stall with JSON/GLB parse failures.
- `srcset` URLs are whitespace-delimited. Local asset filenames containing spaces must be percent-encoded in `srcset` only. Runtime `srcset` patchers must be idempotent: decode first, then encode once, or `%20` becomes `%2520` and produces local 404s.
- Do not force-load every GLB at once. Large Webflow model galleries can contain dozens of 7-18 MB GLBs. Use viewport-scoped/staggered model-viewer loading on scroll so the visible model appears without freezing the page.
- A clean self-check for these pages must include: external requests = 0, local 4xx = 0 after scrolling, viewport broken images = 0, hero model loaded/visible, at least the active viewport gallery model loaded, video readyState/dimensions valid, and visible brand text scan clean.

## 26. Webflow Rspack chunks + lottie-vector brand text + JS image sequences (2026-07-14, 0010-himax-zetta-joule)
- Webflow's main `webflow.*.js` can be a small Rspack runtime where chunk URLs are generated by `r.u(id) => "webflow.achunk.<hash>.js"`. The scraper will miss these because the final filenames are computed at runtime. Read the runtime map, download every `webflow.achunk.*.js`, and remove stale SRI `integrity` attributes after local rewrites.
- Canvas/image-sequence sections may build URLs from a prefix plus frame numbers, for example `Image Sequence/.../Frame_` + `3000..3139` + `.webp`. Grep inline scripts for URL prefixes and frame ranges, download all frames, then verify the canvas has non-trivial `toDataURL()` length at the scrolled section.
- Brand text inside `.lottie` or inline SVG may be converted to vector paths. DOM `innerText` scans can pass while old branding is still visible in screenshots. Always visually inspect lottie/chart/logo areas; if editing the lottie is not practical, add a tightly scoped overlay that covers only the old wordmark region.
- Runtime rebrand scripts should not use an unbounded `MutationObserver` that rewrites attributes/text on every mutation. It can loop during parsing and block `DOMContentLoaded`. Use finite delayed passes or disconnect while mutating.
- Third-party credits such as "Designed with ..." are easy to miss because the link may already be disabled. Hide those visible external-brand credits for company-site deliverables.

## 27. Framer hydrate modules + dynamic media branding (2026-07-14, 0011-himax-addverb)
- Framer pages can reintroduce original text after hydration from local `.mjs` metadata/component modules. Rebrand `index.html`, `meta.json`, search indexes, and text-bearing Framer modules; checking only SSR HTML is not enough.
- Runtime URL guards must preserve the slash after the host. A bad mapper like `assets/` + host + path creates `assets/framerusercontent.comimages/...` and breaks videos/images even though the correct files exist.
- `import()` and modulepreload are not intercepted by `fetch` or DOM `setAttribute` patches. Patch module strings directly for editor-only imports such as `https://framer.com/edit/init.mjs`, or replace them with a local stub module.
- Do not return bare `#` for blocked non-link resources. Browsers resolve `src="#"` to the current HTML document, then may request `index.html` as an image/script and throw `Unexpected token '<'`. Use an inert hash only for `href`; use a `data:` URI or a local stub for non-href resources.
- Framer can request unhashed original image URLs at runtime even when SSR references hashed variants. Generate no-hash aliases from the largest downloaded variant, then rerun with local 4xx checks after scrolling.
- Video autoplay may stay at `readyState=0` offline unless media is primed. Set local videos to muted/playsInline/preload/loop/autoplay, call `load()` only when needed, then `play().catch(...)`. Avoid repeatedly resetting the same `src`, or Playwright will report many local `net::ERR_ABORTED` media requests.
- Visible brand text embedded inside video frames is not caught by DOM brand scans. Do not use a static overlay on a changing video; either edit the media or show a tightly scoped overlay only during the video time range where the old brand appears.
- Canvas pixel checks can false-negative when sampling a transparent corner. Pair pixel checks with screenshots at the canvas section, or sample center/visible pixels.

## 28. Astro ecommerce mirrors: runtime image bases, Cloudflare email decode, and incomplete Pagefind (2026-07-14, 0012-himax-packwire)
- Astro modules can rewrite server-rendered image paths back to root-absolute `/images/...` during hydration. Patch the runtime base constant or install URL property setters early; do not trust the SSR HTML alone.
- Cloudflare email protection can recreate the original brand email after static replacement. Remove the local `email-decode.min.js` script and replace the protected span/href, then verify visible body text after load.
- Pagefind may be scraped as only `pagefind.js` without `pagefind-entry.json`, wasm, index, filter, and fragment files. That gives a local 404 only when the search UI is opened. Either mirror the full index or replace the search code with a local static search list.
- Search result thumbnails are often hard-coded in JS rather than present in HTML. Create local aliases for every possible result image path, then test the search dropdown with real input.
- Static anchor cleanup should happen in HTML, not only in a runtime click handler. For homepage-only mirrors, change non-hash anchors to an inert hash and remove `target`, `rel`, and inline navigation handlers.
- Brand text embedded in product PNG/WebP samples is not found by DOM scans. Inspect the first viewport screenshot and edit or mask the local bitmap assets when old product/sample logos are visible.
- Do not force-rebrand incidental product-sample logos inside packaging/product photos. Replace the site brand, header/footer logos, visible copy, and real company wordmarks; leave box mockup/customer/sample branding alone unless the user explicitly asks to edit the image.
- Delete unused generated search/index folders before final packaging. They can contain external-looking strings and stale runtime code even if the active page no longer references them.
- Final self-check for this class: static `href/src/srcset/url()` external loads = 0, dynamic external requests = 0, local 4xx = 0 after opening search and scrolling, broken images = 0, cookie/privacy nodes absent, visible old-brand scan clean, and screenshots reviewed for image-embedded branding.

## 29. Shopify ecommerce mirrors: runtime rebrand must skip asset-bearing nodes (2026-07-14, 0013-himax-boxgenie)
- Runtime brand replacement must not walk text nodes inside SCRIPT, STYLE, NOSCRIPT, or TEMPLATE. Replacing `boxgenie` inside inline CSS changed `assets/www.boxgenie.com/...` font URLs into `assets/www.himax.com/...`, causing clean-looking HTML to produce local font 404s only after hydration.
- When using a MutationObserver for rebrand cleanup, filter by parent tag before changing text nodes, and keep asset paths on the original scraped host. Rebrand visible copy and real site logos; do not rewrite local resource paths.
- If optional ecommerce configurator scripts are removed for homepage-only mirrors, leave small local stubs for globals the theme still references, such as `boxgenie_embed`, quantity presets, or price constants, so the page has no runtime pageerror while buttons remain inert.
- Final self-check should include a cache-busted browser pass after scrolling: external requests = 0, local 4xx = 0, pageerror = 0, broken images = 0, and visible old-brand text scan clean. Static grep alone will miss runtime-mutated CSS URLs.

## 30. Parcel / Three.js GLTF homepage mirrors: handle `fetch(URL)` and local Draco decoders (2026-07-14, 0014-himax-cargokite)
- Three.js / Parcel bundles may call `fetch(new URL("https://..."))`, not `fetch("https://...")`. Offline guards that only inspect string inputs will miss the request and still produce external Prismic/API fetches. Normalize `input instanceof URL ? input.href : input.url || input` before deciding whether to stub/block.
- GLB files using `KHR_draco_mesh_compression` need the Draco decoder runtime as well as the `.glb`. If `DRACOLoader.setDecoderPath("https://www.gstatic.com/draco/...")` remains external, the model can download but fail with `DracoDecoderModule is not defined`. Copy local `draco_decoder.js`, `draco_wasm_wrapper.js`, and `draco_decoder.wasm`, patch the decoder path to that local folder, and verify the canvas/model visually.
- Parcel asset maps can include WebGL-only dependencies such as cubemap faces (`px/nx/py/ny/pz/nz`) and `.glb` files that are not obvious from HTML. Inspect the Parcel JS asset map and run a first browser pass to catch local 404s before judging image completeness.
- Header/logo rebrands that hide SVG path wordmarks should preserve the original header color state. If the source toggles classes like `dark-mode` / `mix-mode`, set the initial state for the first viewport and have the overlay text use the same CSS variables so the replacement logo does not vanish on dark or light sections.
- Final self-check for this class: cache-busted browser load + real wheel scroll, external requests = 0, failed requests = 0, local 4xx = 0, pageerror/console error = 0, visible broken images = 0, old visible brand text = 0, at least one visible nonblank WebGL canvas/model loaded, and screenshot review of the hero logo/model.

## 31. Tesla/Akamai mirrors: headful capture, 206 media, Cloudinary comma srcset, hidden SVG sprites (2026-07-14, 0015-himax-tesla-powerwall)
- Tesla/Akamai can return 403 to urllib/headless and a challenge shell before the real page. Use a headful browser session to let the page load, capture response bodies, and do not print or persist browser cookies in logs.
- Browser-captured video responses may be HTTP 206 ranges. Download the full MP4 files separately, rewrite the media URLs to local copies, then verify visible videos with `readyState`, `videoWidth`, and `videoHeight`.
- Cloudinary transform segments such as `f_auto,q_auto` break when placed raw in `srcset`, because commas are candidate separators. Percent-encode transform commas in HTML and in runtime `src/srcset/poster` setters; also handle the spaced runtime form `f_auto, q_auto`.
- Tesla/TCL pages may include hidden SVG sprite containers with classes like `.tds--is_hidden` or `.tcl-hidden`. If the original CSS does not restore those hidden states offline, the sprites can create a large blank block above the first viewport. Hide these utility containers before visual QA.
- Remote font URLs can be rewritten into local-looking but nonexistent font paths. Strip or localize `@font-face` blocks, then rerun dynamic local 4xx checks because static external-link scans will miss same-origin 404s.
- Final self-check should include screenshot review, not just request counts: no external requests, no failed requests, no local 4xx, no console/page errors, no broken visible images, no visible old brand text, no cookie/skip/permanent-CTA overlays, and hero content positioned in the first viewport.

### 31b. Tesla/TCL captured DOM can look loaded while CSS, responsive state, and events are missing (2026-07-16, 0015-himax-tesla-powerwall)
- Tesla pages can require both the Drupal aggregate CSS and a separate runtime TCL React stylesheet. If the TCL sheet is omitted or a font-URL rewrite truncates an aggregate file, intrinsic image/video sizes take over and page height can grow from about 10k to 28k. Compare stylesheet byte sizes and parsed rule counts with the live response before debugging layout nodes.
- A captured mega-menu can be overwritten by two independent header renderers: the legacy mega-menu bundle and the newer DesignSystemReact global menu. Preventing only one renderer still removes the captured navigation. Preserve the complete captured DOM by guarding both render calls, then bind an offline menu fallback to the existing panels.
- Capturing at desktop freezes desktop-only TCL configuration into the HTML. Resizing does not automatically restore mobile `grid-column`, padding, typography, or the compact Menu header when the responsive React pass is disabled. Verify 1440, 768, and 390 widths and reapply the component's own mobile/tablet config values where needed.
- `data-component-status="initialized"` is not evidence that interaction survived. Static tabs may show the correct active slide and even autoplay once while clicks do nothing because React listeners were never serialized. Click every carousel/spec tab and verify `aria-selected`, active classes, media index, and video play/pause state; restore those state transitions locally when handlers are absent.
- Do not hide cookie, chat, or permanent-CTA layers globally before comparing screenshots. They affect hero viewport math (`--tcl-bottom-banner-height`) and sticky-header states. Match the live first-visit baseline, keep links inert, and provide local dismiss/toggle behavior.
- Rebranding must not alter asset filenames inside JSON payloads. A dormant path such as `1M-Powerwalls-Powerwall-3-Hero-*` can be changed to a nonexistent Himax filename and fail only on responsive rerender. Scan branded strings inside asset-bearing JSON separately from visible text.
- Final acceptance for this class: real wheel input, desktop/tablet/mobile screenshots, menu open/close and submenu drill-in, every carousel/spec interaction, all lazy images, video `readyState` plus dimensions, external request/anchor scan, local 4xx/pageerror scan, and visible old-brand scan.

## 32. Next/Vercel inline SSR + Mux media + local 3D hero (2026-07-16, 0016-himax-meetcleo)
- A Next/Vercel page can return a 1.6 MB single-line document containing complete SSR markup, inline CSS, and RSC data. Regex-heavy generic scrapers may appear to hang on that input. Capture the HTML directly, parse structured attributes where possible, and avoid repeated whole-document regular expressions.
- Complete SSR markup does not mean the original Next runtime is usable offline. Hydration can replace a valid captured page with a local 500/RSC error when route data is unavailable. Preserve the SSR DOM, remove the failing client runtime, and restore only the homepage interactions locally.
- Mux playback IDs may exist only in inline RSC data. Mirror both `image.mux.com/<id>/thumbnail.jpg` and `stream.mux.com/<id>/high.mp4`, replace posters with local muted looping videos, and pause videos outside the viewport to keep mobile scrolling responsive.
- Same-origin GLB/HDR requests can return 403 when downloaded without the live page context. Retry with a normal browser user agent and the source-site `Referer`, then verify the GLB in a real Three.js scene. `GLTFLoader` may also require a local `BufferGeometryUtils.js` import even when the model itself is present.
- Large transparent DatoCMS PNGs can be 30-48 MB each. Resize them to a sensible maximum dimension while preserving alpha, then verify every resulting file with an image decoder and browser `naturalWidth`/`naturalHeight`.
- Removing the original animation runtime can leave valid, fully decoded images at `opacity: 0`. A network check and `naturalWidth > 0` are not enough; inspect computed opacity and explicitly complete only the affected `data-animate-on-load` state. For tab changes, preload the next local image before fading out the current one.
- Reveal wrappers can remain both transparent and blurred after the original motion runtime is removed. Restoring `opacity: 1` alone still leaves apparently missing or soft text; inspect and reset `filter`/`-webkit-filter`, `visibility`, `transform`, and `clip-path` on the exact reveal wrapper.
- A horizontal carousel whose original controller is gone may leave later cards permanently offscreen, so native lazy loading never requests their images. Preload every local carousel image and restore wheel, pointer-swipe, keyboard, and click navigation before visual QA.
- A generic locally injected background video with a positive `z-index` can cover otherwise valid card images and text. Use `document.elementsFromPoint()` when content is decoded but not painted, then scope the video's stacking level to the section and keep its overlay content in a higher local stacking context.
- Sticky full-viewport 3D layers can intercept header clicks even when the header looks visually on top. Give the hero section and canvas `pointer-events: none`, keep the fixed header in a high isolated stacking context, and test menu/QR clicks with real pointer events.
- Lazy-image QA must distinguish offscreen images from visible failures. A rectangle with width/height is not necessarily in the viewport. For final verification, force all images to eager load or scroll each section, wait for decoding, and require zero local failures plus zero decoded images with `naturalWidth === 0`.
- Rebranding visible text nodes should be case-insensitive but must skip `SCRIPT`, `STYLE`, `NOSCRIPT`, and `TEMPLATE`; otherwise asset paths and embedded data can be corrupted. Keep links statically inert and also guard runtime `window.open`, `fetch`, XHR, and URL property setters.
- Final acceptance for this class: desktop/mobile screenshots, nonblank 3D canvas, wheel-driven hero motion, local QR, menu open/close, feature tabs, review arrows/swipe, FAQ toggles, all images decoded, local videos with valid dimensions, external requests/anchors = 0, local 4xx/page errors = 0, and visible old brand text = 0.

## 33. Framer mirrors: preserve hydration modules and localize runtime media together (2026-07-17, 0017-himax-midlife-engineering)

- **Symptom:** Restoring original Framer `.mjs` modules brought back the intended wheel-driven synth/keyboard motion, but hydration then rewrote SSR-local image URLs to `framerusercontent.com` URLs. With an offline CSP, the motion worked while the visible keyboard icons and badges became broken images.
- **Root cause:** SSR asset rewrites alone are insufficient. Framer component metadata in the hydration modules owns the final `img.src` values. Disabling the modules makes the images appear again but destroys the original interaction, so treating these as separate fixes causes a repair loop.
- **Correct approach:** Keep the original module graph byte-for-byte where possible. Download every runtime image/media URL referenced by the active Framer modules, then install a tiny local URL mapper *before* the main module starts. The mapper may rewrite only asset URLs to matching local files; it must not alter animation code, runtime identifiers, or generic minified text.
- **Do not do:** Do not replace broad URL-like regex matches in minified modules. A matcher that consumes commas, parentheses, template delimiters, or adjacent code silently corrupts the module and can leave the page stuck on its SSR loader. Validate each changed module with `node --check` before it is served.
- **Acceptance is paired, not sequential:** After a cache-busted browser pass and real wheel input, require all of the following at once: original wheel motion present, all currently visible images decoded without broken placeholders, local 4xx = 0 after scrolling, dynamic external image requests = 0, page errors = 0, and a screenshot comparison of the hero synth.

## 34. Next/Turbopack 3D mirrors: retain runtime identity and crawl scroll-triggered assets (2026-07-17, 0018-himax-trionn)

- **Do not replace an interactive Next homepage with SSR-only fallback just because local hydration initially errors.** That can make the text and first image appear, but removes the original Canvas/WebGL, scroll timeline, lazy project cards, and route-level interactions. Treat it only as a diagnostic fallback, not a delivery.
- **Turbopack identifies chunks by their original root path (`/_next/...`), not only by downloaded bytes.** Rewriting entry scripts into a project subfolder can make the RSC payload and the runtime disagree silently: the SSR page becomes empty or React never mounts. Preserve original script/RSC order and root URL identity. When a shared local server already has an `_next` directory, add a narrowly scoped server mapping keyed to the specific mirror page's Referer; never overwrite the shared directory or add a global redirect.
- **Initial asset lists are incomplete.** Start the untouched runtime, collect local 4xx requests, download the requested chunks byte-for-byte, and repeat. Trionn's second pass exposed additional JS/CSS chunks after React began mounting; without them the page showed the Next error screen even though the entry scripts loaded.
- **Always perform real wheel/scroll QA to the bottom.** The Trionn hero was fine while a later 3D sequence requested 180 files (`images/stone/frame_0001.webp` through `frame_0180.webp`) only after scrolling. Download the whole sequence in parallel, verify the exact file count, then scroll through the affected section again and require a nonblank Canvas plus zero sequence-frame 404s.
- **Dynamic media is not limited to `<img>`.** Capture missing desktop/mobile project images, card videos, orbit/partner images, Web Audio files, and hover sounds from runtime network telemetry. A page may look mostly complete while a client-logo image is a broken `<img>` or an audio decoder fails only after an interaction.
- **Brand replacement must live above the runtime, not inside minified chunks.** Use a small display-layer adapter before hydration that replaces visible text/title/alt text while explicitly skipping SCRIPT, STYLE, NOSCRIPT, and TEMPLATE; keep original URLs and module identifiers untouched. React can rewrite text after initial render, so observe added nodes and run a short bounded recheck. Replace an image logo with a scoped display overlay rather than renaming asset paths.
- **Acceptance for this class:** load at the standard local URL, wait for React mount, confirm at least one nonblank original Canvas, wheel-scroll from hero through the final dynamic section, inspect screenshots of both, require all visible images to have `naturalWidth > 0`, videos to have dimensions/readyState, no local 4xx for active visual media, no error-page text, and a visible old-brand scan after hydration.

## 35. Vite + Mapbox globe mirrors: map states, offline fallbacks, and external-brand badge removal (2026-07-17, 0019-himax-monumoir)

- **Mapbox globe is a runtime visual, not a static image list.** A local Mapbox style JSON alone does not provide the worker-served vector tiles, globe projection, or star/point layer. A simple flat-map fallback can make the final scroll phase look like an unexplained black void. Compare the source using real wheel input, identify the exact map transition state, and use a locally saved source-rendered background only as a tightly scoped offline visual fallback beneath the original local map/card DOM.
- **Crawl map card images and marker thumbnails as separate asset families.** The detail card can load while round monument markers silently disappear: the source's marker code hides the marker on image error. Extract every key used to construct `/images/mapview/${key}.jpg`, mirror the entire set, then verify all image elements after a wheel-driven pass rather than only checking the currently selected card.
- **Use real wheel input for scroll-pinned map scenes.** `window.scrollTo()` can be clamped or bypass the animation controller, producing misleading screenshots. Drive the page with incremental wheel events, record the progression through the overlay fade, and inspect the key frame immediately before the fade becomes opaque.
- **No external links requires removing promotional containers, not merely making anchors inert.** Third-party badges (for example an Awwwards vertical badge) can retain a visible frame/SVG after its `href` is stripped. Detect the badge by its URL/ARIA label, remove its dedicated parent container whenever it is rendered, and keep a bounded DOM observer/pass for React re-renders. Then assert both `external hrefs = 0` and `badge nodes = 0` in a fresh browser load, plus screenshot review.
- **Acceptance for this class:** local map-card images and all mapview thumbnails decode, original wheel timing is preserved, the offline globe/star fallback appears before the black fade, no broken images/local 4xx, external anchors = 0, third-party badge nodes = 0, visible original-brand scan clean, and screenshots of the map transition and final page are reviewed.

## 36. Exact Next/Turbopack restoration: keep script-node shape and patch runtime URLs narrowly (2026-07-20, 0016-himax-meetcleo)

- **Do not delete third-party `<script>` nodes from captured Next SSR HTML.** Removing them changed the server DOM shape and triggered React #418 at `<HTML>` even though the page visually recovered. Keep every node in place; for non-Next external scripts replace only `src` with a local empty stub and remove stale `integrity`. Preserve inline Flight/bootstrap scripts byte-for-byte unless a specific non-visual injector is proven safe to neutralize.
- **Cloudflare tail injectors can escape main-window URL guards.** The captured tail script created an iframe, then created `/cdn-cgi/...` from the iframe's own realm, so patched DOM setters in the parent did not intercept it. Preserve that `<script>` node but replace only the Cloudflare injector body with an inert statement.
- **Flight text records can be length-sensitive.** Replacing font or preload URLs with shorter strings caused truncated or closed Flight streams. Use equal-length local replacements for strings inside length-prefixed records; validate hydration after every global HTML rewrite.
- **Mux storyboard URLs may be constructed inside the player implementation.** Light-DOM `track.src` guards did not catch every shadow/custom-element path. Patch the exact storyboard URL constructor to a local `WEBVTT` stub while leaving video playback code unchanged.
- **Stop background 404s before hydration.** Next Link prefetches can request sibling `?_rsc=` routes even after anchors become inert; return a local 204 for these prefetches. Keep all clickable anchors inert separately.
- **Acceptance:** cold desktop and mobile loads, real wheel input through the complete page and back to `scrollY=0`, nonblank canvas pixel variance, broken images = 0, external anchors/resources/requests = 0, local 4xx or failed requests = 0, console/page errors = 0, and visual checks of intro, giant-phone, shrink, and endpoint frames.

## 37. Framer dynamic icons, embedded video, and idempotent media localization (2026-07-20, 0020-himax-dock)

- **Parser-created iframes can request before a runtime guard runs.** Replace exact embedded-video URLs in the SSR HTML with local players, while keeping the original Framer hydration modules and iframe dimensions. Mirror the videos as H.264/AAC fast-start MP4 files and verify autoplay, muted loop, `readyState`, dimensions, and advancing `currentTime`.
- **A repeated localizer must be idempotent.** Calling `setAttribute("src", currentSrc)` during bounded hydration passes still restarts images, iframes, and videos, causing stutter and `net::ERR_ABORTED`. Compute the mapped URL first and write only when it differs from the current attribute.
- **Framer package icons can use native dynamic `import()` assembled at runtime.** Fetch/XHR and DOM URL setters do not intercept this. Patch only the specific component state for the used icon to a local React component object; a bare function passed to `useState` is treated as a lazy initializer and produces React error 130.
- **Same-page Framer links may normalize a project URL from `index.html#section` to `/project/#section`.** Compare paths after stripping a trailing `index.html`, preserve the hash, and provide local smooth scrolling. Otherwise an offline-link sanitizer can silently turn valid section navigation into `href="#"`.
- **Split-text animation defeats ordinary word replacement.** Framer may render `Dock` as four one-character spans, so no individual text node contains the word. Replace the matching character sequence inside its existing word wrapper; when the replacement is longer, clone the final character span and reset the clone's initial `opacity`, `filter`, and `transform` so the added character does not remain permanently invisible.
- **Award badges are standalone promotional UI.** Making the badge link inert still leaves the fixed `W. Nominee` artwork visible. Hide its exact container before first paint and remove that container after parsing, without applying broad selectors to legitimate page artwork.
- **Acceptance:** with all external requests actively blocked, desktop and mobile must wheel to the bottom and back to zero, section navigation and FAQ interactions must work, both embedded videos must keep playing, all images must decode, canvases must render at their intended responsive breakpoint, and external requests/anchors/resources, local failures, 4xx responses, console errors, page errors, visible old branding, and horizontal overflow must all be zero.

## 38. WordPress hashed theme assets, partial downloads, and offline runtime guards (2026-07-21, 0021-himax-rezonbio)

- **A scraper timeout after browser verification does not mean the mirror failed.** Inspect the produced file count and byte size before discarding the run; the HTML and most media may already be complete while only the automated verification process is stuck.
- **WordPress cache rewrites can reference hashed local theme files that were never saved.** When a local 404 points to a hashed CSS/JS filename, fetch the exact unversioned source URL from the live theme and store its bytes at the expected hashed local path. Preserve the original theme and GSAP scripts so hero text, menus, sticky sections, and footer reveals keep their source behavior.
- **Remove analytics and consent runtimes without removing visual runtimes.** Strip GTM, HubSpot, tracking, cookie-banner, prefetch, and Cloudflare injectors; keep the theme bundles and add a narrow runtime guard for fetch/XHR/beacon, external DOM resource setters, links, and `window.open`.
- **A nonzero image file can still be corrupt.** Large WebP downloads may time out after writing a partial file. Verify width and height with an actual decoder or `ffprobe`, then inspect the rendered desktop and mobile background; file existence and byte count alone are insufficient.
- **Directly jumping to the footer can misclassify offscreen lazy images as broken.** Use incremental wheel scrolling or evaluate only visible images, and separately require zero local 4xx responses. Verify footer backgrounds through the computed `::after` style because the image may live on a pseudo-element rather than the footer node.
- **Acceptance:** cold desktop and mobile loads with the internet blocked, rotating hero text changes state, desktop dropdown and mobile menu open, real wheel input reaches the bottom and returns upward, all three videos report valid dimensions/ready state, desktop/mobile footer backgrounds decode, and external requests/links/resources, local 4xx, console/page errors, visible old branding, and horizontal overflow are all zero.

## 39. Next.js TrustedScriptURL chunks, Sanity hydration, and Mux HLS localization (2026-07-21, 0022-himax-clearlifereset)

- **Next dynamic chunk setters may receive `TrustedScriptURL`, not a JavaScript string.** A URL guard that returns early for non-strings misses these requests and leaves runtime chunks at root `/_next/...`. Convert URL-like values with `String(value)`, then remap same-origin root Next paths into the project's local asset directory. Verify the exact dynamic chunk returns 200 and that `ChunkLoadError` is absent.
- **Sanity image localization must cover hydration IDs, not only visibly missing files.** The SSR can start with local images while React replaces every responsive `src/srcset` with direct CDN URLs. Build a hash-to-local-file map for both newly downloaded images and images the scraper already saved, and patch `src`, `srcset`, `setAttribute`, and added nodes before judging offline completeness.
- **Next Link viewport prefetch creates route noise even when the user never clicks.** Patch the site's shared Link component to render `href="#"` while preserving its component shape, styles, and click handlers. This prevents homepage-only mirrors from requesting sibling route chunks and `_next/data` JSON while keeping local cart and UI controls interactive.
- **A downloaded Mux master `.m3u8` is not an offline video.** It can contain signed external rendition manifests and fails native parsing locally. Use a valid signed rendition to remux the source into a local H.264 MP4, then replace both SSR and hydrated HLS URLs and verify `readyState`, dimensions, playback time, muted autoplay, and looping.
- **Rebranding SSR text without updating the matching page bundles causes React hydration errors.** Replace the exact visible brand string in the serialized HTML and the responsible homepage/app chunks together; leave lowercase route slugs and asset identifiers unchanged. Delay the display-layer text observer until hydration settles so it cannot mutate nodes React is still reconciling.
- **Visual comparison must account for animation phase.** Auto-moving hero split states and scroll-driven ingredient/timeline labels may differ at a single timestamp. Compare several source/local wheel-driven frames and structural states; require matching section geometry and active animation behavior rather than one identical timer value.
- **Acceptance:** source/local desktop and mobile scroll frames align, cart opens and closes, wheel input reaches the bottom and returns to zero, every image decodes, the local MP4 plays, and external requests/links/resources, local 4xx, failed requests, console/page errors, visible old branding, and horizontal overflow are all zero.

## 40. WordPress inline media manifests, alpha-video canvases, and custom snap scrolling (2026-07-21, 0024-himax-sursur)

- **A scraper can finish successfully and still exit nonzero on Windows.** Console output containing a Unicode checkmark can fail under the GBK code page after the files and browser preview were already produced. Inspect the generated directory and preceding verification output before rerunning or discarding the mirror.
- **CSS data URI fragments are not missing network assets.** A reference such as `%23n` can come from an SVG fragment inside a data URL. Do not treat it as a failed download unless the browser actually emits a network request or a visible asset is broken.
- **Inline runtime manifests can own most of the visual media.** This page declared five videos, five posters, and separate 81-frame desktop and mobile WebP sequences inside `sursurAssets`; a normal HTML/CSS crawl did not collect them. Parse the manifest, mirror every family, preserve frame numbering, and rewrite only its asset root.
- **Stacked alpha videos must keep their original compositor.** The source MP4s store color and alpha-mask halves in a 2:1 frame and are rendered through the page's original WebGL/2D canvas code. Replacing them with ordinary `<video>` elements or still images loses transparency and motion. Keep the original script, localize the MP4s, and verify decoded dimensions plus nonblank canvas pixels.
- **A loader timeout can hide missing media.** The page dismisses its loader after a fallback delay even when runtime media failed. Acceptance must verify video `readyState`, video dimensions, exact sequence-frame counts, nonblank canvases, and zero failed requests after the loader disappears.
- **Full-screen snap sites may keep `window.scrollY` at zero.** This page scrolls an internal `#snap-container`, includes wheel accumulation, automatic sequence transitions, and a mobile horizontal-card stage that intentionally consumes several wheel gestures before the footer. Record internal `scrollTop`, inspect intermediate screenshots, use enough gestures to reach the final section, and then verify reverse-wheel navigation returns to the first section.
- **Acceptance:** desktop and mobile load with all nonlocal requests blocked; 5 videos decode, 6 canvases contain pixels, all 162 sequence frames are local, every image decodes, the 8 desktop sections and mobile card/footer flow respond to real wheel input in both directions, the motion toggle changes and restores state, and external requests/anchors, local 4xx, console/page errors, visible old branding, broken images, and horizontal overflow are all zero.

## 41. Elementor nested documents, runtime chunks, and breakpoint-only backgrounds (2026-07-22, 0025-himax-visualidentity-studio)

- **A complete HTML document embedded inside an Elementor HTML/shortcode widget can leak global styles into the outer page.** This page contained nested `html`, `head`, and `body` tags whose `html, body { height: 100% }` rule reduced the root scroll height to one viewport while the body content remained over 12,000 px tall. Preserve the widget's WebGL code, but remove the leaked fixed height and verify real `window.scrollY` movement rather than assuming the wheel is broken.
- **Elementor loads active widgets through webpack chunks that are absent from the initial script list.** Mirror the exact shared handlers, nav menu, accordion, posts/load-more, form, popup, and Swiper files, then rewrite only `elementorFrontendConfig.urls.assets` and `ElementorProFrontendConfig.urls.assets` to local roots. Do not disable the Elementor runtime just to suppress `ChunkLoadError`; doing so removes the mobile menu, reveal motion, sticky header, and accordion behavior.
- **Jetpack/i0 images can exist only in generated Elementor CSS.** The initial HTML image crawl missed motion-effect team backgrounds, hover backgrounds, and mobile-only replacements. Scroll every breakpoint to the bottom, collect same-origin 404s, compare the live unmodified `post-<id>.css`, and download the exact CDN URL into the hashed local filename expected by the rewritten CSS.
- **Percent-encoded CSS filenames need the server's decoded filesystem spelling.** A CSS path containing `%E2%80%93` is requested over HTTP with percent encoding, but the local server resolves it to an en dash. Saving only the literal percent characters produces a persistent 404 even though the bytes are present; store the decoded Unicode filename and verify the exact browser request returns 200.
- **A full-screen WebGL raymarch can keep consuming GPU after it leaves the viewport.** Preserve all visible shader, pointer, resize, and scroll behavior, but use `IntersectionObserver` to skip expensive draw passes while the scene is offscreen and resume immediately when it re-enters. This keeps the visual result unchanged while preventing later Elementor sections and automated QA from stalling.
- **Hidden rebranded lazy logos are not visible broken images.** When an old GIF logo is deliberately hidden and replaced with a CSS `HIMAX` wordmark, the browser may never decode its `loading="lazy"` source and report `naturalWidth === 0`. Count visible broken images separately and still require zero local 4xx responses.
- **Acceptance:** desktop and mobile wheel from the WebGL hero to the footer and back to zero; mobile menu opens/closes; the services accordion changes state; every breakpoint-only background returns 200; and external requests, external anchors, local 4xx, failed requests, console/page errors, visible old branding, cookie/translation overlays, and horizontal overflow are all zero.

## 42. Vite history 路由镜像：不要为修正文案误删必要的根路径改写（2026-07-22，094-thewatch）

- **直接原因：** `094-thewatch` 的内部路由只注册了 `/`。镜像入口先根据原始子目录计算并写入 `<base>`，随后用 `history.replaceState()` 把浏览器路径改为 `/`，这样资源仍从 Design 子目录加载，而应用路由看到的却是它预期的根路径。为阻止地址栏跳到根目录而删除这段改写后，路由无法命中，页面停在 `meta.title` / 品牌占位屏。
- **最初的错误判断：** 右侧页码出现 `聽/ 04` 时，只修改了压缩模块中的静态字符串，并依据 HTTP 返回内容就宣布修复，没有验证浏览器当前 DOM。运行时可能重复创建该文本节点，模块缓存也可能让旧实例继续运行，因此“源码中已不存在乱码”不等于“实际画面已修复”。
- **抽象教训：** 地址栏变化可能是离线镜像兼容层的一部分，不一定是错误跳转。任何 `history.pushState`、`history.replaceState`、`<base>`、路由 `base/mode` 或路径 shim 都属于耦合系统；修改其中一处之前必须先确认应用注册的路由、资源解析基准和最终页面挂载条件。
- **正确修法：** 保留必要的根路径 `replaceState`，在显示层对精确的错误页码文本做窄范围修正；如果框架会重建节点，使用限定到该文本模式的 `MutationObserver`，不能全局删除中文，也不能改动路由以绕开显示问题。资源修改后使用新的版本参数强制冷加载。
- **强制验收：** 必须从标准 URL 冷启动页面，等待加载屏结束，确认主 WebGL/DOM 页面实际挂载；记录地址栏最终路径并判断它是否为预期路由行为；检查右侧页码的真实 DOM 文本和截图；再检查 Console、关键资源 404 和交互。禁止只凭 `rg`、文件内容或 HTTP 200 宣布完成。
- **回滚规则：** 如果修改路由兼容层后出现 `meta.title`、空白页、占位品牌屏、加载器不消失或主场景未挂载，第一时间恢复路径 shim，再从显示层解决原问题，不继续叠加缓存或资源补丁。

## 43. Webflow + Three.js hidden runtime assets and shared preview server (2026-07-23, 0026-himax-alkares)

- **A locally mirrored Three.js entry is not necessarily self-contained.** `three.module.js` imports `three.core.js`, while `GLTFLoader` also imports `BufferGeometryUtils.js` and optional codec helpers. Mirror the exact package version and audit module requests after initialization; copying only the five modules named by the page still leaves the canvas at its default `300x150`.
- **WebGL assets can be hidden in late runtime configuration.** This page fetched four shader text files, a Draco-compressed GLB, a Poly Haven HDR, and Google-hosted Draco decoders only after Three.js initialized or the footer became relevant. Scroll through the whole page with external networking blocked and keep iterating until external requests and local 4xx are both zero.
- **Unescaped spaces in localized `srcset` candidates can invalidate the complete attribute.** If the original Webflow filenames contain spaces and the mirror writes them without URL encoding, the browser drops candidates and emits repeated parser warnings. When the full local `src` is already present, remove the malformed `srcset` rather than inventing responsive URLs.
- **One threaded preview server should be shared by every Codex/browser window.** Two processes cannot both bind `127.0.0.1:8080`, but the repository's `ThreadingHTTPServer` can serve all project URLs concurrently. Reuse the existing server, verify the target URL returns 200, and never start a second 8080 instance. If the listener becomes unresponsive, identify it before stopping it because it may belong to another user window.
- **Acceptance:** desktop and mobile canvases match viewport dimensions, the footer Draco model renders, quote sheet and Swiper controls respond, real wheel input travels down and back up, and external requests/anchors, local failures/4xx, page errors, broken images, visible old branding, and horizontal overflow are all zero.

## 44. Legacy Webpack + Three.js runtime roots, idempotent guards, and loader events (2026-07-28, 0027-himax-contra)

- **Old Webpack mirrors can construct both CSS and WebGL URLs at runtime.** This page injected `css/style.css` from JavaScript and used `assetsUrl:"./"` for GLB models, matcaps, browser UI images, noise textures, and kinetic-type artwork. Localize the CSS injection and patch only the runtime asset root; keep the original Three.js components and animation bundle intact.
- **Static string scans include false positives.** A bundled package manifest contained `main:"./src/p2.js"`, but the browser never requested it. Treat browser request telemetry as authoritative before inventing a missing runtime file.
- **Offline DOM guards must be idempotent.** A MutationObserver that rewrites an anchor to `href="#"` on every `href` mutation can schedule itself forever and starve `DOMContentLoaded`. Compare the current value before every `setAttribute` or text write, and avoid observing attributes that the guard does not need.
- **Do not stop an animation that the original loader uses as a lifecycle event.** The source listens for `webkitAnimationIteration` on its loader icon before starting the intro and removing the loader. Replacing the icon with `display:none` made mobile startup stall; keep the original animation running with `opacity:0` and draw the Himax wordmark separately.
- **Custom ASScroll can leave `window.scrollY` at zero for the entire page.** Verify progress with the translated `.asscroll-page` matrix and real wheel input, then reverse-wheel from the footer back to transform offset zero. A zero native scroll position is not proof that scrolling failed.
- **An aborted media request is not automatically a broken video.** Chromium may cancel an initial MP4 request while replacing it with a range/media pipeline request. Accept it only when the local response has no 4xx, the video reports `readyState=4`, valid dimensions, advancing `currentTime`, and the relevant chapter visibly renders.
- **Acceptance:** desktop and mobile loaders remove themselves, original WebGL scenes and all four chapters respond to real wheel input in both directions, the MP4 plays, menu/download/share interactions work, and external requests/anchors, local 4xx, console/page errors, visible old branding, broken images, and horizontal overflow are zero.
## 45. SVG fragment preservation and interactive WebGL footer marks (2026-07-28, 0027-himax-contra)

- **Localizing an SVG sprite URL must preserve its fragment.** The mirror rewrote every `images/svgsprite.svg#symbol-id` to the local sprite file but dropped `#symbol-id`. All 69 `<use>` elements then loaded without 404s while rendering nothing, hiding carousel arrows, quote-link arrows, download/share icons, and social icons.
- **Recover sprite references from the original document in DOM order.** When the original and mirror contain the same number of `<use>` nodes, compare and restore each exact fragment (`circle`, `arrow-back`, `arrow-forward`, `link`, and so on) while retaining the localized base path. Then verify both visible geometry and the control behavior, such as a next-arrow click changing the active quote.
- **Do not disable an original WebGL component to rebrand nearby text.** Removing `dom2webgl="c:FooterLogo"` and replacing it with a CSS wordmark discarded the GLB geometry, matcap lighting, pointer hit testing, and drag rotation. Keep the abstract original 3D mark, rebrand the surrounding copy separately, and verify the model fits desktop/mobile plus reports the original grab/drag interaction.
- **Acceptance:** all sprite fragments match the source sequence, desktop carousel arrows and inline link arrows are visible, arrow clicks change slides without navigation, the footer GLB is complete at desktop and mobile breakpoints, drag rotation works and releases pointer state, and external requests/anchors, local 4xx, console/page errors, broken images, visible old branding, and horizontal overflow remain zero.