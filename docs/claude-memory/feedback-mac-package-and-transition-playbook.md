---
name: 整站交付 Mac 包 + 过场调参 + 本地服务必须按交付链路验证
description: 076-ohzi 这次踩坑沉淀：过场时长要用原站/本地多帧和状态采样校准；整站 Mac 包要干净、可双击启动；打开本地页面前必须确认 serve.py 仍在监听。
type: feedback
originSessionId: 076-ohzi-2026-07-07
---

做 `designs/NNN-*` 这种整站镜像的修改、交付、打包时，以后每次都按这个 playbook 走。

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

- 在 `mac-zip/` 下新建类似 `himax-<slug>/` 的目录。
- 用结构：
  - `site/`：完整站点文件
  - `open-on-mac.command`：双击启动本地静态服务器并 `open` 浏览器
  - `README-MAC.txt`：说明 chmod、右键打开、手动 `python3 -m http.server`
- 复制站点时排除本地验证产物：`transition-check/`、`verify-*.png`、临时截图、调试日志等。
- `.command` 用 ASCII 内容更稳，避免 Windows 控制台/zip 里中文编码变乱码。
- zip 时把 `.command` 权限标成 `755`，Mac 解压后更可能直接可运行。
- 打包后检查：
  - zip 中存在 `himax-xxx/open-on-mac.command`
  - zip 中存在 `himax-xxx/README-MAC.txt`
  - zip 中存在 `himax-xxx/site/index.html`
  - zip 中没有 `transition-check` / `verify-*`
- 最终把 zip 的绝对路径给用户。

## 4. 交付前最小验证

整站修改或打包完成前，至少做这些：

- 本地页面 URL 返回 `200`。
- 用户关心的入口按钮能进入下一屏。
- 过场/动画按用户指定时长或原站参考表现，不是“一闪而过”或“像卡住”。
- Mac zip 内容干净，启动脚本和说明在包根目录。

这条是强执行规则：以后同类任务默认照做，不需要等用户再次提醒。
