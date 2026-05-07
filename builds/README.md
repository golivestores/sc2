# builds — 改动测试落地

你给我一段代码 + 一句改动方案（"把这个 hover 效果改成点击触发"、"颜色换成深蓝渐变"、"把动画时长压成一半"……），我把成品作为单文件 html 放在这里。

跟 effects 的区别：
- effects/ 是**素材库**，要长期保留、保持简洁、可复用
- builds/ 是**测试场**，单次任务的产出，不进素材库——失败可以删，成功的也不期望被别处引用

## 目录约定

```
builds/
├── README.md
└── NNN-短名/
    ├── index.html
    ├── meta.json    # 可选
    └── assets/      # 可选
```

- 三位数字前缀按时间递增
- 短名 kebab-case，**描述这次测试本身想验证什么**，不带任何外部参照。例如：
  - `001-glass-card-hover`
  - `002-radial-menu-snap`
  - `003-text-mask-scroll`
  - `004-cursor-magnet`

## meta.json 模板（可选）

```json
{
  "title": "玻璃卡片 hover",
  "savedAt": "2026-04-30",
  "ask": "三张卡片，hover 时背面带磨砂玻璃效果",
  "notes": "用了 backdrop-filter，Safari 上要加 -webkit-"
}
```

`ask` 一句话记下当时的需求；`notes` 写实现里的踩坑或参数选择理由。半年后回看不至于完全失忆。

## 引用路径

builds 跟 vendor / designs 同层：

```html
<!-- vendor 库，按需 -->
<script src="../../vendor/gsap/gsap.min.js"></script>
<script src="../../vendor/gsap/ScrollTrigger.min.js"></script>
```

不依赖外部 CDN（除非测试本身就是要测 CDN）。

## 怎么打开

走本地服务器（`file://` 不行）：

```powershell
cd c:\Users\EDY\Documents\sc
python -m http.server 8000
```

然后访问 <http://localhost:8000/builds/NNN-xxx/>
