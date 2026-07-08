Akamai/企业反爬站点 + 重型可交互 WebGL 体验：当 `scrape-url.py`（py）被 403 挡掉、且 WACZ 也录不动那个体验时，用「真实浏览器认证会话 + 同源 in-page fetch」把整套资源批量下载到本地，再做静态镜像。首次验证：2026-06-17 cartier.com/en-fr/watchesandwonders / 044-cartier（Akamai + AEM 外壳 + 7.2MB Nuxt 3 + Three.js + Lenis + Draco/EXR/KTX2 沉浸式滚动体验，最终 255MB 完全离线可交互）。

## 识别信号

- py `urllib` 直抓返回 **403 + 响应头 `Server: AkamaiGHost`**，body 是 `<TITLE>Access Denied</TITLE>` + `errors.edgesuite.net` 引用号。
- HTML 里有 Akamai bot sensor 脚本：`<script src="https://<host>/akam/13/<hash>">` + 一串混淆路径 `<script src="/pti8Qb_9qo/...">`（Akamai Bot Manager）。
- **headless Chromium 也被 403**（Akamai 检测 `navigator.webdriver`/headless 指纹）。

## 决策树（py → WACZ → 认证浏览器下载）

```
py 被 Akamai 403？
├─ 否 → 常规流程
└─ 是 → headed 真实浏览器能过吗？（见下「绕过 Akamai」）
        ├─ 站是普通 server-rendered（内容在 HTML 里）→ 直接认证会话抓 HTML+资源，静态镜像
        └─ 站是重型可交互体验（WebGL/scrollytelling，资源随交互渐进加载）
            ├─ 先试 WACZ（ArchiveWeb.page 人工驱动录制）
            │   └─ 录不动？（Lenis/自定义滚动，合成事件 + Autopilot 都驱动不了，
            │       `SIZE STORED` 不涨）→ 放弃 WACZ
            └─ 用「认证浏览器 in-page fetch」批量下资源（本recipe核心）：
                资源 URL 在 app.js 里是确定的（清单数组 + cdnURL 配置），
                不需要驱动体验，解析出完整清单直接下。
```

## 绕过 Akamai：headed 真实浏览器 + stealth

```python
b = p.chromium.launch(channel="msedge", headless=False,   # 必须 headed + 真实浏览器 channel
        args=["--disable-blink-features=AutomationControlled"])
ctx = b.new_context(user_agent="...Edg/126...", locale="fr-FR")
ctx.add_init_script("Object.defineProperty(navigator,'webdriver',{get:()=>undefined});"
                    "window.chrome=window.chrome||{runtime:{}};")
```
- `channel="msedge"`（或 `"chrome"`）调用真实浏览器二进制 → TLS/JA3 指纹真实 → Akamai 放行。`headless=False` 关键（headless 一律被 403）。
- 用户机器有显示器才能 headed。CI/headless 环境这条走不通。

## 核心技巧：认证会话 + 同源 in-page fetch 下载（绕过 Akamai 抓资源）

资源 host 可能是另一个 Akamai 子域（如 cartier 的 `websitefactory.cartier.com`，直抓也 403）。关键：**Akamai sensor cookie（`_abck` 等）设在父域 `.cartier.com` 上，覆盖所有子域**。流程：

1. headed 浏览器 `goto` 主页 → 点掉 cookie 同意（`#popin_tc_privacy_button` ALLOW ALL）→ Akamai sensor 脚本跑完，cookie 落到 `.<domain>`。
2. **`goto` 到资源 CDN 的某个 URL**（如 `https://websitefactory.cartier.com/.../app.css`）→ 浏览器 origin 切到该 CDN，且带着父域 cookie → **200**。
3. 此时 **in-page `fetch()` 是同源的**（无 CORS），逐个抓资源 → `arrayBuffer` → `btoa` base64 → 回传 Python 落盘：
   ```js
   const r = await fetch(base + path, {credentials:'include'});
   const b = new Uint8Array(await r.arrayBuffer());
   let s=''; for(let i=0;i<b.length;i+=8192) s+=String.fromCharCode.apply(null,b.subarray(i,i+8192));
   return btoa(s);   // Python 端 base64.b64decode 写文件
   ```
4. **必须节流**：Akamai 对「突发大量快速 fetch」会二次挑战 → 后续 fetch 抛 CORS error（'ERR'）。实测 batch=3、每批 sleep 350ms 稳；burst（一次 5+ 并发无间隔）会在头几个之后全 'ERR'。配重试 pass（失败项再跑，间隔加大）。
   - **诊断**：第一批成功、之后全 'ERR' = 被 Akamai 限流，不是 CORS/代码 bug。同源页面（主域）的 fetch 不限流，CDN 子域才限。

> ⚠️ 不要用 `context.request.get()`（APIRequestContext）—— 它共享 cookie 但走独立 HTTP 栈，TLS 指纹不对，Akamai 照样 403。只有「浏览器真实网络栈的 in-page fetch」稳。

## 从 app.js 提取完整资源清单（不用驱动体验）

Nuxt/Vite 体验的资源路径是确定的，静态解析 app.js 即可：
1. **cdnURL 配置**：HTML 里常有 `var CDN_URL="https://<cdn>/.../"; ... cdnURL: CDN_URL`。资源 = `CDN_URL + path`（注意常拼成 `//` 双斜杠，server 容忍）。
2. **资源清单数组**：grep `path:"/webgl/...glb"` 之类，形如 `oRt=[{type:"gltf",name:"scenes",path:"/webgl/models/mainScene.glb"},{type:"exr",path:"/webgl/textures/cubemaps/SC00_oct.exr"},...]`。
3. **离散资源**：`grep -oE '"/(webgl|images|audio|videos)/[^"]+\.(glb|exr|3dl|json|mp4|mp3|webp|png)"'` 去重。
   - ⚠️ **「松散计数」会骗人**：loose grep `/images/productPages/X/` 出现 3078 次 ≠ 3078 个文件。带引号的 literal 才是真文件（本例 productPages 实际只有 ~122 个离散命名块 scrollMediasBlock1-5/sliderBlock1-4 + `-2` retina 变体，不是图序列）。先确认是「离散块」还是「编号帧序列」再决定下载量。

## 静态镜像 localize（关键改写）

1. **体验 cdnURL → 本地**：`var CDN_URL="https://<cdn>/.../"` → `var CDN_URL="/designs/NNN-slug/exp/"`；app.js/app.css 的 `<script>/<link>` src 同改。这一步让整个体验离线（资源走本地 exp/）。
2. **AEM/外壳绝对路径 → deploy-absolute**：`/etc.clientlibs/`、`/static/`、`/dam/`、`/content/`（含 `https://www.<host>/...` 变体）→ `/designs/NNN-slug/...`。用引号感知正则避免误伤正文。
3. **删 Akamai sensor + tracking**：`<script src=".../akam/...">`、`<script src="/pti8Qb_9qo/...">`、akam pixel `<img>` —— 离线会 hang/err，必须删。
4. **隐藏地区/同意弹窗**：country LocationSelector modal 常在静态 HTML 里（offline 也会弹挡住体验）→ 注入 CSS `display:none` + JS `setInterval` 移除节点 + 解 body overflow 锁。consent（TagCommander）是 JS 注入的，离线不加载、不会弹，无需处理。

## 补漏：靠「离线 404 监控」找运行时构造的依赖

首轮下完，**起本地 server + Playwright route-abort 非 127.0.0.1（模拟断网）**跑一遍，看 local 4xx：
- WebGL 体验几乎必缺：**Draco 解码器**（`/webgl/libs/draco/draco_wasm_wrapper.js` + `draco_decoder.wasm`）—— 缺了 Draco 压缩的 glb 解不出，模型不显示。**Basis/KTX2 transcoder**（`/webgl/libs/basis/basis_transcoder.{js,wasm}`）同理。
- **字体**：app.css 里 `url(./X.woff2)` 相对 `/exp/assets/` → CDN `/assets/X.woff2`，首轮 HTML 解析抓不到，要 grep app.css 补。
- 这些路径 grep app.js（`/webgl/libs/`、`"./X.wasm"`）+ app.css（`url()`）拿到，认证会话补下一轮。

## 验收（断网模拟）

Playwright `route('**/*')` 里 `r.continue_()` 仅当 `url.startswith("http://127.0.0.1")`，否则 `r.abort()`：
- `brokenImgs===0`（扫 `naturalWidth===0`）。
- 体验：等 console 出 **`setAsReady`/`setAsLoaded`** 信号（不是看进度数字！见下「99% 假警报」）→ 截图看 3D 场景出图。
- 残留可接受的 local 4xx：电商后端（`/api/commerce/*` 501、`/geolocation` 404、CSRF/i18n `*.json` 404、ApplePay/Paypal/forter）—— 都是外壳电商功能，离线本就不可用，不影响视觉/体验。

## 三个会误判的坑（重要）

1. **「卡在 99%」是假警报**：首验只等 12s 截到 loader 显示「99」就以为卡死。其实再等几秒就到 100（console `webglStore.setAsReady true`）。**判断体验是否 ready 看 console 信号，不要看进度数字快照**。
2. **合成 wheel 驱动不了 Lenis 体验 ≠ 镜像坏了**：Playwright `mouse.wheel` 在 Lenis/自定义虚拟滚动体验上**不推进场景**（live 站同样不推进——我对照测过）。而且体验资源全预加载，滚动**不产生新网络请求、`window.scrollY` 恒为 0**——这俩指标全是 0 会让你以为没动。**正确验证：滚动前后各截一张图比对**（本例截到 hall→THE FILM→THE SOUND OF CRAFT 三个不同场景才确认可交互）。真人用真实鼠标滚轮能正常驱动（isTrusted 真事件）。
3. **WebGL canvas `readPixels` 返回全黑不可信**：`preserveDrawingBuffer:false`（默认）下读 canvas 像素是黑/透明的。判断「有没有渲染」用**截图**，不要用 readPixels。（同 028 on.energy 坑）

## 局限（要当面声明，别藏）

- 原站 CDN 上**本身就 404 的资源抓不回**（本例 4 款腕表「产品详情子页」图 91 个，多种路径/大小写都 404，live 站也加载不出 = 原站部署缺口）。镜像匹配 live 实况即可，深层子页缺图属预期。
- 电商后端 API 离线不可用（购物车/心愿单/账户/地理定位）—— 预期。
- **体积大**（本例 255MB）：导航器卡片是 0.25 缩略 iframe 会完整加载整个体验，可能略卡 → 提示用户直接开 index.html / 新标签页看完整体验。
- 必须本地 http server 打开（WebGL + ES module，file:// 不行）。

## 完整脚本模板（c:/tmp，可拷贝改 host/slug 复用）

- `download_all.py` — 认证会话 + 分组（CDN 体验 / www 外壳）批量 in-page fetch + 节流 + 重试 + resumable（跳过已存在）。
- `collect_missing.py` + `download_missing.py` — 解析 app.css `url()` 字体 + app.js `/webgl/libs/` 补漏清单，二轮认证下载。
- `localize.py` — cdnURL/AEM 路径改写 + 删 sensor + 隐藏弹窗，生成 index.html。
- `verify.py` — route-abort 非本地 + 扫 brokenImgs + 等 setAsReady + 截图。

## 为什么不内化进 scrape-url.py

跟其它 framework recipe 同理：每个 Akamai 站的 cdnURL 配置形态、资源清单结构、外壳框架（AEM/SFCC/...）都不同；而且核心依赖 headed 真实浏览器（scrape-url.py 是纯 urllib 无浏览器）。碰到 Akamai 站按本 recipe 手动走一遍最稳。相关：`scrape-pitfalls.md` #6（WACZ 兜底——本 recipe 是「WACZ 也录不动」时的进一步兜底）。
