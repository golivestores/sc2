---
name: 改完别自动 git push，等用户显式触发再推
description: 改完代码、commit 之后默认停在本地，不要主动 git push。等用户说"推上去 / push / 上传 / 上 github / 发布"等触发词再推
type: feedback
originSessionId: 3ccfc27b-75f3-4b05-9dcb-3b5ecefdd9dd
---
每次完成一组改动并 commit 后，**默认停在本地仓库**——不要主动跑 `git push`。

**Why**：
- 用户希望先在本地反复确认效果（截图、刷新画廊、对比设计稿）再统一推。已经推了再改、再推会产生连续的"小补丁 commit"污染历史。
- 用户的反馈原话："先别push 等我满意后再push到github上"——这是工作流偏好，不只是单次场景。

**How to apply**：
- commit 完成后，告诉用户"已 commit 在本地：`<sha>`，可以继续改"，但不要跑 `git push`。
- 用户给出以下任一明确触发词才推：`推`、`推上去`、`push`、`上传`、`上 github`、`发布`、`同步到远端`、`同步到 origin`。
- 如果不确定是不是"推"的意图（比如用户只说"行"、"可以"），先反问"现在推吗？"。
- 与已有的 feedback-no-auto-package 配合：默认改完只 commit；要 zip 才打包；要远端可见才 push。
