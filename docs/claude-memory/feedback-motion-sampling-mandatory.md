---
name: 动效 effect 写前 + 写后必须 mirror 数值采样
description: 截图视觉对照不能代替手感验收；写前抓原版 motion 数值看是连续还是离散，写后自家 effect 同样采样跟原版曲线对照。两次都漏会做出"看着对但滚起来卡"的 effect（已有先例：035 离散切层）
type: feedback
originSessionId: d6e8c914-0dbd-4021-8d0e-0cd71598c900
---
写任何涉及滚动/时间/进度驱动的 effect，**hard rule**：

**写前（在 mirror 上）**：playwright 跑一次 motion sampling — 监控 `.style.transform` / `.style.opacity` / 自定义 `--p` 等关键变量，每 100-200ms 采一次，至少 15 帧。看曲线是平滑连续还是阶梯跳变。

**写后（在自家 effect 上）**：同样的脚本跑一遍，跟 mirror 的曲线形状对照。两条曲线的相邻帧变化率应当同数量级；如果原版每帧变 ~0.5% 而我家每帧变 0/0/0/15% 三连，就是离散 bug，回去改。

模板脚本（每次改 URL + 选择器即可）：
```python
import time
samples = []
for i in range(20):
    val = pg.evaluate("""() => {
      const el = document.querySelector('TARGET_SELECTOR');
      return el ? (el.style.transform || getComputedStyle(el).transform) : null;
    }""")
    samples.append((time.time(), val))
    pg.wait_for_timeout(200)
for ts, v in samples: print(f'  t={ts-samples[0][0]:.2f}s  {v}')
```

**Why**：

1. **截图骗不了构图，骗得了手感**。035 写完截图三个 scroll 位置的 PNG 都对，但实际滚动一卡一卡 —— 视觉对 ≠ 动效对。
2. **看代码也骗得了**。035 我用 `opacity: 0.8s cubic-bezier(...)` 配 `.is-active` 切换，"看起来"是 crossfade，实际 p 跨边界时 active 离散切换，过渡区只有一个 layer 可见。读代码以为对了，跑起来才发现错。
3. **原版用了什么平滑机制只能从 motion 数值看出来**。lessestudio 用 Lenis，mirror `<html class="lenis">` 是信号但容易漏；可如果当时跑了 motion sampling，会立刻看到 mirror 在滚动时 `--p` 是连续小步长（~0.5%/帧），自己写如果是大跳跃（0/0/0/25%）一眼就显形。
4. **034 我做了这步（measure_testimonials.py 测出 53 px/s 匀速）一次过；035 没做就翻车**。两次同一个项目，同一种动效类型，差别就在有没有做这步采样。

**How to apply**：

- 任何 scroll-driven / time-driven / progress-driven effect 在标 completed 前必须走这个流程。
- 不只看 transform —— 关注的是"用户感知的运动量"对应的那个变量。可能是 `transform`、`opacity`、CSS variable `--p`、滚动条位置、setInterval 步进、rAF 累加。
- 对照不通过的两种典型形态：
  - **离散跳变**：相邻帧值差异远大于平均差异，期间一堆 0（或同值）→ 用了 `.is-active` 或 `setInterval` 步进
  - **scroll 事件饥饿**：scroll 时连续，stop 后立刻冻结 → 用了 `addEventListener('scroll', update)`，没 rAF loop。Windows 下原生 step scroll 也会让连续段被切成 chunks
- 修法对照表：
  - 离散切层 → 每个 layer 算自己的连续 opacity 权重（三角形/smoothstep/高斯）
  - scroll 事件饥饿 → rAF 持续 loop + lerp 平滑（`currentP += (targetP - currentP) * 0.12`），或直接引 Lenis

**不触发**：
- 纯静态 reveal（IO 触发一次 opacity 0→1，CSS transition 完事的那种）— motion 简单到不会出问题
- hover 状态切换（CSS transition 已经天然连续）

**相关 memory**：
- `feedback-effect-screenshot-compare.md`：截图对照（尺寸/构图）
- `scroll-progress-cannot-exceed-1.md`：数值采样用于 debug 边界 bug
- `effects-extraction-must-be-1to1.md`：1:1 复刻总则
- `feedback-error-postmortem-discipline.md`：被指出错误时的复盘 ritual
