---
name: 从主题驱动的镜像 (Shopify/Wix/Webflow 等) 抽 effect 必须用 base-href 法
description: Shopify/Wix/Webflow 这类主题站的镜像里 effect section 抽出来后会丢交互；只剥 section outerHTML + 局部 CSS 永远做不到 1:1，必须保留整套 head + body 末尾 global script + 用 <base href> 把资源根指回 designs/<mirror>/ 才能复用主题的 swiper init / quick-add hover / tab show-hide JS。
type: feedback
originSessionId: 61724419-e02f-4d09-88cb-781981839e7c
---
抽主题驱动站 (Shopify Dawn / Wix Editor / Webflow / Squarespace …) 镜像里某个 section 做 sc2 effect 时，**不要走"section outerHTML + 仅 section 自己引的 CSS"**那条捷径——effect index.html 必须把镜像的整个 `<head>` + body 全局 script 都搬过去，再用 `<base href="../../designs/<mirror>/">` 把所有相对路径指回镜像复用资源。

**Why:** 2026-05-26 抽 povbeauty.com (Shopify Dawn) 的产品卡片 grid (031) + shop by step (032) 时，第一版只抽了 section 自身 HTML + 它引的 component-card.css / quick-add.css 等局部 CSS，看似有截图但实际：
- 第一张产品卡 hover-state CSS 锁住一个错位的蓝色 ADD TO CART 按钮把卡撑高（hover JS 没控好它）
- swiper 箭头是装饰，点了不切片
- shop by step 步骤点了不响应
- 用户当面指出 "31 比例不对 箭头也没有该有的效果 之前复刻没有这种问题"

根因：Shopify Dawn 把交互 JS（swiper init / quick-add hover 弹按钮 / tab show-hide / product-form / cart-drawer）都挂在主题的全局 script 上（base.js / theme custom.js / quick-add.js / product-form.js / swiper-bundle.js），section 自己的 `<script src>` 只是其中一小撮。Wix / Webflow 也一样，所有动画都在 wix-thunderbolt-runtime / webflow.js 里。剥光只剩 HTML 等于把灵魂砍掉。

**How to apply:**
1. 用 `extract-effect-section.py` (v2 base-href 法) 抽 section，命令：
   `python extract-effect-section.py designs/<mirror>/index.html "<section_id>[,<section_id2>...]" effects/<NNN-slug> "<title>"`
2. 脚本会：保留镜像整个 `<head>`，在 head 顶注入 `<base href="../../designs/<mirror>/">`，body 内只留指定 section（其它 shopify-section 全删）+ leading drawer/header 容器 + trailing global script。
3. 多 section 需求（比如标题在独立 rich_text section，需要"标题+主体"一起带过来）就用逗号分隔多个 section id。
4. 抽完用 Playwright 跑**两层**检查：
   - 多视口截屏对比原站镜像（视觉）
   - 触发 hover / click 箭头 / click step 截屏（交互）—— 静态截图骗不过用户
5. effect 文件夹只有一个 index.html + meta.json + preview.png，资源全部走 base href 指回 designs，体积极小。
6. 配套的：rebuild-index.py 只刷索引；package-effects.py 打 zip 时会把 base href 引用的 designs 子树一并打进去（如不会就要确认 packager 跟随 base href，否则 zip 出去无法独立运行——本条 2026-05-26 还没验证过，下次打包前先 dry-run）。
