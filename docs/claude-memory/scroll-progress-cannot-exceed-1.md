---
name: 滚动驱动的 progress 物理上无法超过 1.0 — 必须 normalize
description: 用 scrolled/scrollable 作 progress 时，p 永远 ≤ 1.0（因为 user max scroll = scrollable）。想做"sticky 之后"的 phase 必须乘倍数压缩 OR 加额外内容
type: feedback
originSessionId: df21e438-ca10-48d9-a7fe-fc86bdf3a493
---
当 effect 用 `position:sticky` + 自定义 progress (`p = scrolled / scrollable`) 驱动多阶段动画，**物理上 p 永远不可能 > 1.0**，因为：
- `scrollable = section.height - viewport.height`
- `scrolled` 上限 = `scrollable`（user 滚到 section 底就是 max）
- 所以 `p = scrolled / scrollable` 永远 ≤ 1.0

**Why:** 在 effects/018-obsidianassembly-places-slider 上犯过：原站有 phase 1-4，phase 4 (frac 1.00→1.10) 是 sticky 松开之后 slider 继续缩小的状态。我把 JS 改成 `Math.min(scrolled/scrollable, 1.3)` 然后 `p4 = (p - 1.0) / 0.10`，自以为"允许 p > 1.0"，结果 user 一直看不到 p4 效果。playwright 实测才发现 p 始终是 1.0 — Math.min 在工作，但被它 min 的值（scrolled/scrollable）本身就 ≤ 1.0。多轮迭代量原站尺寸 + 改 CSS 都没用，因为 phase 4 物理不可达。

**How to apply:**

1. 写多阶段 scroll effect 前先问自己："最大 p 要到多少？"
   - 如果只 0→1.0：标准做法，没问题
   - 如果要 > 1.0（比如 sticky 松开后还有动画）：**必须主动压缩**

2. 压缩 progress range 进 scrollable：
   ```js
   const ANIM_END = 1.10;  // 想让 p 到 1.10
   const p = scrollable > 0 ? Math.min(scrolled / scrollable * ANIM_END, 1.3) : 0;
   ```
   这样 user 滚到底时 p = ANIM_END。代价：各 phase 占的实际滚动百分比变小（因为同一段 scroll 对应更大的 p 增量）。

3. 替代方案：在 section 后面加一个 placeholder div 扩展页面高度，让 max scroll > scrollable。但这会让"slider 已经离开但 next section 还没开始"出现一段空白，通常不优雅。

4. **诊断技巧**：怀疑 progress 不工作时，**立即用 playwright 起本地服务 + 多 scroll 点采样 p / p1 / p3 / p4 值**（不是只看 visual），数值不对的 phase 立刻暴露：
   ```python
   page.evaluate("window.scrollTo(0, Y)")
   d = page.evaluate("() => document.documentElement.style.getPropertyValue('--p4')")
   ```
   如果 `--p4` 在每个 scroll 点都是 0.0000，根因肯定是 progress normalize 错。不要继续调 CSS。

5. 另一个相关教训：**user 反馈"视觉上没变化"时优先怀疑 JS 计算没生效**（变量没真正变），而不是 CSS 没应用。CSS 应用与否容易看出来；JS 变量被 clamp 不容易看出来，因为 CSS calc 用了 var(--pN) 还是会有"看着像在动"的中间态。
