# vendor — 本地第三方库池

所有组件（`snippets/*`、`effects/*`）通用的第三方库都放这里，避免在每个组件里重复下载/引入 CDN。

## 目录结构

```
vendor/
├── swiper/
│   ├── swiper-bundle.min.css   # 18 KB
│   └── swiper-bundle.min.js    # 154 KB
├── gsap/
│   ├── gsap.min.js             # 72 KB
│   └── ScrollTrigger.min.js    # 43 KB
├── three/
│   ├── three.module.min.js     # 670 KB  (ESM)
│   └── addons/
│       ├── loaders/GLTFLoader.js         # 108 KB
│       └── utils/BufferGeometryUtils.js  # 31 KB
└── lottie/
    └── lottie.min.js           # 305 KB
```

## 版本

| 库 | 版本 | 来源 |
| --- | --- | --- |
| Swiper | **11.x** latest | `cdn.jsdelivr.net/npm/swiper@11/...` |
| GSAP + ScrollTrigger | **3.12.5** | `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/` |
| Three.js | **0.160.0** (r160) ESM | `cdn.jsdelivr.net/npm/three@0.160.0/...` |
| lottie-web | **5.12.2** | `cdn.jsdelivr.net/npm/lottie-web@5.12.2/...` |

## 如何引用（从 `snippets/xxx/index.html` 看，要回退两级到 vendor）

### Swiper（普通 `<script>`）

```html
<link rel="stylesheet" href="../../vendor/swiper/swiper-bundle.min.css">
<script src="../../vendor/swiper/swiper-bundle.min.js"></script>
```

### GSAP + ScrollTrigger

```html
<script src="../../vendor/gsap/gsap.min.js"></script>
<script src="../../vendor/gsap/ScrollTrigger.min.js"></script>
<script>gsap.registerPlugin(ScrollTrigger);</script>
```

### Three.js + GLTFLoader（ESM，需要 importmap）

```html
<script type="importmap">
{
  "imports": {
    "three":          "../../vendor/three/three.module.min.js",
    "three/addons/":  "../../vendor/three/addons/"
  }
}
</script>
<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

  const loader = new GLTFLoader();
  loader.load('model.glb', (gltf) => { /* ... */ });
</script>
```

### Lottie（浏览器 bundle）

```html
<script src="../../vendor/lottie/lottie.min.js"></script>
<script>
  lottie.loadAnimation({
    container: document.querySelector('#lottieEl'),
    renderer:  'svg',
    loop:      true,
    autoplay:  true,
    path:      'animation.json'
  });
</script>
```

## 一次引用全套（复制到任何组件的 `<head>`，按需删减）

```html
<!-- Swiper -->
<link rel="stylesheet" href="../../vendor/swiper/swiper-bundle.min.css">
<script src="../../vendor/swiper/swiper-bundle.min.js"></script>

<!-- GSAP + ScrollTrigger -->
<script src="../../vendor/gsap/gsap.min.js"></script>
<script src="../../vendor/gsap/ScrollTrigger.min.js"></script>

<!-- Lottie -->
<script src="../../vendor/lottie/lottie.min.js"></script>

<!-- Three.js (ESM + importmap) -->
<script type="importmap">
{
  "imports": {
    "three":         "../../vendor/three/three.module.min.js",
    "three/addons/": "../../vendor/three/addons/"
  }
}
</script>
<!-- later: <script type="module">import * as THREE from 'three'; ...</script> -->
```

## 相对路径提示

- `snippets/<name>/` 和 `effects/<nnn>-xxx/` 到 `vendor/` 是 `../../vendor/...`
- `designs/<nnn>-xxx/` 同级到 `vendor/` 也是 `../../vendor/...`
- 嵌到更深目录时按实际层级算，或改用绝对路径（`/vendor/...`，要求从 sc 根目录起本地服务器）

## 导出组件到别的项目时

复制对应的 vendor 子目录（如 `vendor/swiper/`）到目标项目，相应修改组件 HTML 里的路径即可。也可以把这些文件换回 CDN——只是 offline 就不可用。
