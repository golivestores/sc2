---
name: 改完 effect 不要自动打 zip，等用户显式触发再打
description: 改完一个 effect 后默认只更新 index.html / meta.json，不要主动跑 package-effects.py 生成 zip + source-bundle.js
type: feedback
originSessionId: 3ccfc27b-75f3-4b05-9dcb-3b5ecefdd9dd
---
改完 effect 的 index.html / CSS / meta.json 后，**默认不要**跑 `package-effects.py`。

**Why**：
- 用户希望保留"打包"这一步作为显式动作（"点打包按钮"），便于自行控制何时生成可下载的 zip。
- 一次迭代会反复改文件，每次都自动打包会重复生成 100+KB 的 source-bundle.js 和数十 KB 的 zip，污染 git 工作区且无意义。
- `effects/*/*.zip` 和 `effects/*/source-bundle.js` 已在 .gitignore，但开发期间频繁刷新依然刷屏 disk I/O。

**How to apply**：
- 改完 effect 后只跑 `rebuild-index.ps1`（更新画廊 designs.js / effects.js），不跑 `package-effects.py`。
- 用 Playwright 验证视觉/交互效果即可。
- 用户说"打包"、"发布"、"出 zip"、"准备交付"、"finalize" 等明确触发词时，再跑 `package-effects.py`。
- 如果 effect 内容大改但用户没说打包，提一句"要打包吗？"询问，不要自作主张。
