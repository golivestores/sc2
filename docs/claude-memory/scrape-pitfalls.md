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
