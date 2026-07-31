---
name: 整站交付 Mac 包 + 过场调参 + 本地服务必须按交付链路验证
description: 076-ohzi、074-ori-koji 等踩坑沉淀：过场时长要用原站/本地多帧和状态采样校准；整站 Mac 包必须是带启动脚本的干净可运行包，不要只给 site 目录；打开本地页面前必须确认 HTTP 链路返回 200。
type: feedback
originSessionId: 076-ohzi-2026-07-07
---

做 `designs/NNN-*` 这种整站镜像的修改、交付、打包时，以后每次都按这个 playbook 走。

2026-07-10 追加两次 Mac 交付教训：旧的 site-only zip 会让同事解压后不知道入口，或直接双击 `index.html` 走 `file://` 导致模块、3D、根路径路由失败。以后发 Mac 同事的整站包，默认必须是 `*-mac` 包，包根目录必须有双击启动脚本和说明，并且必须做“解压后从包内起 HTTP 服务”的冒烟测试。

## 1. 动效/过场：不要只凭“出现了”判断

076-ohzi 的坑：点击 `HOW WE DO IT` / `OUR WORK` 后，彩色线条最初只出现约 1 秒；后来又调到 9 秒，用户觉得太长，最终改成 3 秒。

以后遇到原站过场、loading、scroll/time driven 动画时：

- 先用原站或截图参考确认“有几帧、持续多久、退场如何进入下一屏”，不要只看一张截图。
- 本地修改后至少抓 1s / 3s / 5s 或用户指定时长的状态/截图，确认不是状态机等着但画面没动。
- 如果用户明确给时长，如“3 秒彩线过场”，以用户时长为准，不要继续追求原站超长等待感。
- 对压缩 bundle 的改动要同步运行时入口兜底。076-ohzi 中同时改了 `Api-BKtZC3Pw.js` 和 `local-entry.js`，否则一处入口可能覆盖另一处行为。
- 如果截图本身拖慢 WebGL，不要用截图时间当精确时钟；用页面内部 `performance.now()` / `setTimeout` 状态采样再判断。

## 2. 本地服务：打开浏览器前必须确认端口还活着

076-ohzi 的坑：已经打开过浏览器，但后台 `serve.py` 后来退出，用户看到 `127.0.0.1 refused connection`。

以后用户让“跑本地服务器并打开网页”时：

- 先请求目标 URL，例如 `http://127.0.0.1:8080/designs/NNN/index.html`。
- 如果 refused，重新启动 `python -u serve.py --no-open`，并把 stdout/stderr 重定向到日志。
- 启动后必须再 `Invoke-WebRequest` 确认返回 `200`，再 `Start-Process` 打开浏览器。
- 如果浏览器已在错误页，告诉用户刷新也可以；不要只说“已打开”。

## 3. 整站 Mac 包：不要用 effects 打包脚本；做干净可运行包

076-ohzi 是完整站点，不是 `effects/` 小组件。`package-effects.py` 不适合这种交付。

以后用户说“打包 Mac 同事 / 发同事 / Mac 包”且目标是 `designs/NNN-*` 时：

- 默认使用根目录的 `package-mac-site.py`，不要再手工复制 + 手工 zip，除非脚本缺能力并且同步补脚本。标准命令形如：
  - `python package-mac-site.py designs/074-ori-koji-global himax-ori-koji-mac --force`
  - 脚本必须完成复制、Mac 启动文件生成、zip 755 权限写入、解压后二次 HTTP/Playwright 验证。
- 在 `mac-zip/` 下新建类似 `himax-<slug>-mac/` 的目录，zip 名称也用 `himax-<slug>-mac.zip`。不要只覆盖旧的 `himax-<slug>.zip`，避免用户继续发错旧包。
- `<slug>` 必须使用原站/原品牌的英文品牌名（小写 ASCII 连字符），例如原品牌 `WebFactoryPro` → `himax-webfactorypro-mac`。不得改用重制后的宣传语、人名、栏目名或 hero 文案（例如 `azu-ai`），也不加 Design 编号；用户特别指定名称时除外。
- 用结构：
  - `site/`：完整站点文件
  - `open-on-mac.command`：双击启动本地静态服务器并 `open` 浏览器
  - `README-MAC.txt`：说明 chmod、右键打开、手动 `python3 -m http.server`
  - `README-CODEX.txt`：可选，记录来源目录、包路径、启动脚本能力和验证结果
- 复制站点时排除本地验证产物：`transition-check/`、`verify-*.png`、临时截图、调试日志等。
- `.command` 用 ASCII 内容更稳，避免 Windows 控制台/zip 里中文编码变乱码。
- `open-on-mac.command` 必须通过 `http://127.0.0.1:<auto-port>/index.html` 打开，不要让同事直接打开 `file://.../site/index.html`。
- 启动脚本必须自动找空闲端口，至少支持 `python3`，并在缺少 Python 时给出清晰错误。
- 启动脚本需要补常见 MIME 类型：`.js`、`.css`、`.wasm`、`.glb`、`.ktx2`、`.exr`、`.mp3`、`.splinecode`。
- 启动脚本需要对无扩展名的站内根路径回退到 `index.html`，例如 `/comparison`、`/privacy`、`/terms-of-use`，避免点击导航后本地 404。
- 启动脚本建议加 `Cache-Control: no-store`，避免同事重复测试时看旧缓存。
- 如果站点有 Spline/WebGL/Three.js，不能只检查 `.splinecode`、`.glb` 等文件存在。还要搜索压缩 JS 里是否有写死的项目预览路径，例如 `/designs/NNN-slug/assets/...`。074-ori-koji 的实际坑是：
  - Webflow Spline 模块动态 `import("/designs/074-ori-koji-global/assets/.../runtime.js")`，在项目根 `serve.py` 下能跑，但 Mac 包从 `site/` 根目录服务时 404。
  - Spline runtime 的 Draco decoder fallback 也写死 `/designs/074-ori-koji-global/assets/www.gstatic.com/draco/...`，导致 `draco_wasm_wrapper.js` / `draco_decoder.wasm` 404，模型无法解码。
  - 这类路径要改成基于 `document.baseURI` 的本地路径，例如 `new URL("assets/.../runtime.js", document.baseURI).href`。
- `README-MAC.txt` 必须明确：
  - 不要直接打开 `site/index.html`
  - 正确 URL 必须以 `http://127.0.0.1` 开头
  - 双击无效时怎么执行 `chmod +x`
  - macOS 安全提示时怎么右键 Open
  - 手动 fallback：`cd ".../site"` 后 `python3 -m http.server 8090 --bind 127.0.0.1`
- zip 时把 `.command` 权限标成 `755`，Mac 解压后更可能直接可运行。用 Python `zipfile` 时必须设置 `ZipInfo.create_system = 3` 和 `external_attr = 0o100755 << 16`；只设置 Windows 文件权限不够。
- 打包后检查：
  - zip 中存在 `himax-xxx/open-on-mac.command`
  - zip 中存在 `himax-xxx/README-MAC.txt`
  - zip 中存在 `himax-xxx/site/index.html`
  - `tar -tvf himax-xxx-mac.zip` 里 `open-on-mac.command` 显示为 `-rwxr-xr-x`
  - zip 中没有 `__MACOSX` / `._*`
  - zip 中没有 `transition-check` / `verify-*`
- 最终把 zip 的绝对路径给用户。

## 4. 交付前最小验证

整站修改或打包完成前，至少做这些：

- 本地页面 URL 返回 `200`。
- 如果是 Mac 包，必须解压刚生成的 zip 到临时目录，从解压后的 `site/` 起本地 HTTP 服务，再请求 `index.html` 和关键资源返回 `200`。关键资源至少包括主 CSS/JS；有 3D/WebGL/Spline 时还要验证 `.splinecode` / `.glb` / runtime 资源。
- 对 Spline 场景，Playwright 验证必须至少确认这些请求全是 `200`：`@splinetool/runtime`、`scene.splinecode`、`draco_wasm_wrapper.js`、`draco_decoder.wasm`；并确认 `window.Webflow.require('spline').getInstance(...)` 为真、桌面 canvas 不是默认 `300x150`。
- 跑一次 HTML/CSS 引用检查：本地文件缺失必须是 `0`。远程 `preconnect`、`og:image`、`twitter:image` 可接受；远程脚本、样式、主图、3D 资源不应遗漏，除非用户明确允许联网预览。
- 检查 `href="/"`、`href="/comparison"`、`href="/privacy"` 这类根路径：要么改成本地可用路径，要么确认 `open-on-mac.command` 已做 extensionless route fallback。
- 用户关心的入口按钮能进入下一屏。
- 过场/动画按用户指定时长或原站参考表现，不是“一闪而过”或“像卡住”。
- Mac zip 内容干净，启动脚本和说明在包根目录。

这条是强执行规则：以后同类任务默认照做，不需要等用户再次提醒。
