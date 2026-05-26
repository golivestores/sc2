---
name: 提取 effects 后必须复查再交付
description: 每个 effect 写完别立刻报完成，对照原站逐条核对动画/交互/布局，缺的不要标注就跳过
type: feedback
originSessionId: d09e77f1-e7ef-4fe7-9242-d4ead50023c5
---
做 effects/ 提取（goodlifemeds、talamus、shift5、omr 等同类型 1:1 复刻任务）时，写完 index.html 不要直接报完成。先逐条复查：

- 动画与微交互：hover 视频切换、Lottie/SVG 序列、自动播放、字符 reveal、scroll-trigger 等。原站有的就要尝试还原；连资源都不在本地的才省略，并且要在用户面前明确点名"这个我没做，因为 X"，不要藏在 meta.json 描述里。
- 布局：复杂的 grid（asymmetric / sticky / 12 列 zig-zag）截图比对再发。不要把 3-tile 拼成简单的 2-col 就交。
- 资源缺失：先在 designs/<id>/assets/ 下用 Glob 找一遍 mp4 / json / webp，原站引用的资源大多被 scrape-url.py 镜像了，"找不到 mp4"应该先 grep `goodlifemeds.b-cdn.net` 这种 CDN 域名再说。

**Why:** 用户在 010/011 里要 hover 旋转药瓶视频、012 要盒子打开动画 + 正确布局，我都没做就交付。下一轮被点出来才补就是浪费往返。memory「effects extraction is 1:1 only — never simplify」是规则，这条是配套的执行流程。

**How to apply:** 写完一个 effect、把 todo 标 completed 之前，再跑一遍：①列出原 section 的动画 + 交互清单；②对照实现里有哪几条；③缺的当面说明而不是默默省略。批量做多个 effect 时同样每个独立复查，不能因为前一个走通就跳过后续的核对。
