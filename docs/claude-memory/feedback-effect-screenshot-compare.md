---
name: effect 写完必须自己截屏 + 与原站像素级对照
description: 完成 effect 后必须用 Playwright 在多视口下截原站 + 自家 demo，并列出 W×H/aspect/SVG 占比的实测差，差超过 ~5% 要回去改 CSS
type: feedback
originSessionId: 3ccfc27b-75f3-4b05-9dcb-3b5ecefdd9dd
---
写完 effect 在标 completed 前，**自己**做这一步：

1. 起本地 server，跑 Playwright 在原站和自家 demo 上各截 3 张图（mobile 390 / tablet 768 / desktop 1440 或贴近用户实际看的视口），同等 clip 区域。
2. 用 `page.evaluate` 量两边关键元素的 `getBoundingClientRect()`（bar/容器宽高、关键子元素如 SVG/logo 尺寸），打印 Δw/Δh。
3. 把对照图一并读回来，**视觉对照**布局、字号占比、间距——别只看数字。

**Why:**
- 用户的反馈是"大小不对，每次做完自己截屏比对效果"——即原站 240×143 而 effect 只有 216×130（24px 偏差 ≈ 10%），当场被指出。
- 仅靠 CSS rem/clamp 写出来的尺寸常常偏一档，必须用真实测量值（max(240px, 24vw)、calc(124px + 4.7vw) 之类的直接 px 公式）才稳。
- "看起来差不多"在交付前是不够的，用户能一眼看出来。

**How to apply:**
- 任何 effect 完成后默认走这条流程；模板：抓原站尺寸 → 拟合公式（多视口线性拟合 calc / max 比 clamp + rem 更精确） → 渲自家 → 对照 → 改 → 再对照。
- 至少 mobile + 1 个大视口，能多就多。差超过 5% 必修。
- 公式优先用 px + vw 拟合，**不要**用 rem，因为原站常有 `html { font-size: 90% }` 会让 rem 偏 ~10%。
