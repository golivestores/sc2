// =====================================================
// GMX DIGITAL — Script FINAL UNIFICADO v2
// Fixes: Ultra Real animation, Helix pacing, Performance,
//        Memory management, Nebula optimization
// =====================================================

// ------------------------------
// 0) Helpers globais
// ------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PIXEL_RATIO = Math.min(window.devicePixelRatio, 1.5);
const isMobile = () => window.innerWidth <= 768;
const ENABLE_ABOUT_CUBE = false;
const ENABLE_ABOUT_CUBE_LITE = false; // Desativado — substituído pelo Túnel Neon GMX

const createVisibilityObserver = (target, { onEnter, onExit, rootMargin = '0px', threshold = 0.1 } = {}) => {
  if (!target) return null;
  let isVisible = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isVisible) { isVisible = true; onEnter?.(); }
      else if (!entry.isIntersecting && isVisible) { isVisible = false; onExit?.(); }
    });
  }, { root: null, rootMargin, threshold });
  observer.observe(target);
  return observer;
};

const isElementInView = (el, offset = 0) => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.bottom > offset && rect.top < (window.innerHeight - offset);
};

const runtimeFx = {
  started: false,
  quality: isMobile() ? 0.9 : 1,
  fpsSmoothed: 60,
  frameSamples: 0
};

function startPerformanceTuner() {
  if (runtimeFx.started || prefersReducedMotion) return;
  runtimeFx.started = true;
  // On mobile, just set conservative quality and skip the RAF loop
  if (isMobile()) {
    runtimeFx.quality = 0.78;
    return;
  }
  let last = performance.now();
  function tick(now) {
    const dt = Math.max(1, now - last);
    last = now;
    const fps = 1000 / dt;
    runtimeFx.fpsSmoothed = runtimeFx.fpsSmoothed * 0.92 + fps * 0.08;
    runtimeFx.frameSamples++;

    if (runtimeFx.frameSamples % 24 === 0) {
      if (runtimeFx.fpsSmoothed < 47) runtimeFx.quality = Math.max(0.68, runtimeFx.quality - 0.03);
      else if (runtimeFx.fpsSmoothed > 60) runtimeFx.quality = Math.min(1, runtimeFx.quality + 0.015);
    }
    // Stop measuring after ~5 seconds (300 frames at 60fps)
    if (runtimeFx.frameSamples > 300) return;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function getFxQuality() {
  return runtimeFx.quality;
}

function scaledCount(base) {
  return Math.max(1, Math.round(base * getFxQuality()));
}

function getAdaptiveFrameBudget(desktopFps = 58, mobileFps = 42) {
  const base = 1000 / (isMobile() ? mobileFps : desktopFps);
  const q = getFxQuality();
  if (q >= 0.95) return base;
  if (q >= 0.85) return base * 1.15;
  if (q >= 0.75) return base * 1.35;
  return base * 1.6;
}

// Shared circle texture
let circleTexture = null;
function getCircleTexture() {
  if (circleTexture) return circleTexture;
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.beginPath(); ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();
  circleTexture = new THREE.CanvasTexture(c);
  return circleTexture;
}

// ------------------------------
// 1) Áudio + cursor (lazy-loaded on first interaction)
// ------------------------------
let hoverSound = null;
let clickSound = null;
let audioInitialized = false;
function initAudioLazy() {
  if (audioInitialized) return;
  audioInitialized = true;
  hoverSound = new Audio('assets/audio/hover.mp3');
  hoverSound.volume = 0.15;
  clickSound = new Audio('assets/audio/click.mp3');
  clickSound.volume = 0.4;
}
['pointerdown','keydown'].forEach(ev => window.addEventListener(ev, initAudioLazy, { once: true, passive: true }));

function playHover() { if (!hoverSound) return; try { hoverSound.currentTime = 0; hoverSound.play().catch(() => {}); } catch (e) {} }
function playClick() { if (!clickSound) return; try { clickSound.currentTime = 0; clickSound.play().catch(() => {}); } catch (e) {} }

const gmxCursor = document.querySelector('.gmx-cursor');
const cursorText = document.querySelector('.cursor-text');

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let targetX = mouseX, targetY = mouseY;
let normX = 0, normY = 0;
let lenis;

const CURSOR_LERP = 0.35;

window.addEventListener('pointermove', (e) => {
  if (isMobile() || typeof e.clientX !== 'number') return;
  mouseX = e.clientX; mouseY = e.clientY;
  normX = (e.clientX / window.innerWidth) * 2 - 1;
  normY = -(e.clientY / window.innerHeight) * 2 + 1;
}, { passive: true });

let cursorVelX = 0, cursorVelY = 0, prevCursorX = 0, prevCursorY = 0;

function renderCursor() {
  if (isMobile()) return; // No custom cursor on mobile — save CPU
  targetX += (mouseX - targetX) * CURSOR_LERP;
  targetY += (mouseY - targetY) * CURSOR_LERP;
  // Velocity-based squash/stretch for organic feel
  cursorVelX = targetX - prevCursorX;
  cursorVelY = targetY - prevCursorY;
  prevCursorX = targetX;
  prevCursorY = targetY;
  const speed = Math.sqrt(cursorVelX * cursorVelX + cursorVelY * cursorVelY);
  const stretch = Math.min(speed * 0.012, 0.35);
  const angle = Math.atan2(cursorVelY, cursorVelX) * (180 / Math.PI);
  const scaleX = 1 + stretch;
  const scaleY = 1 - stretch * 0.5;
  if (gmxCursor) {
    if (speed > 1.5 && !gmxCursor.classList.contains('grow')) {
      gmxCursor.style.transform = `translate(${targetX}px,${targetY}px) translate(-50%,-50%) rotate(${angle}deg) scale(${scaleX},${scaleY})`;
    } else {
      gmxCursor.style.transform = `translate(${targetX}px,${targetY}px) translate(-50%,-50%)`;
    }
  }
  requestAnimationFrame(renderCursor);
}
if (!isMobile()) renderCursor();

// ------------------------------
// 2) Modais + clique + Focus Trap
// ------------------------------
function trapFocus(modal) {
  const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return null;
  const first = focusable[0], last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
  }
  modal.addEventListener('keydown', handler);
  first.focus();
  return () => modal.removeEventListener('keydown', handler);
}
let releaseFocusTrap = null;

const serviceData = {
  webgl: { tag: "EXPERIÊNCIA IMERSIVA • WEB DESIGN", title: "Desenvolvimento Web & WebGL", body: "Engenharia de ponta fundida com Direção de Arte. Construímos ecossistemas digitais com física 3D e renderização WebGL desenhados para dominar a percepção do usuário no primeiro frame." },
  branding: { tag: "IDENTIDADE VISUAL • BRAND SYSTEM", title: "Branding Premium", body: "Identidades visuais projetadas para o mercado High-Ticket. Arquitetura de marca agressiva e sofisticada que justifica preços mais altos e gera desejo irracional no consumidor." },
  landingpage: { tag: "UI/UX • PERFORMANCE", title: "Landing Pages de Conversão", body: "Máquinas de vendas vestidas de alta-costura. Unimos neurociência, design tátil e copywriting estratégico para campanhas que exigem conversão extrema e imediata." },
  ia: { tag: "ESTADO DA ARTE • VÍDEO & IMAGEM", title: "Cinematografia & IA Generativa", body: "O impossível materializado. Direção de arte absoluta, criação de ambientes e cinematografia hiper-realista gerada por IA para campanhas que não aceitam as limitações da realidade." },
  trafego: { tag: "PERFORMANCE • MÍDIA PAGA", title: "Tráfego Pago & Performance", body: "Growth previsível por funil e oferta. Estratégia de mídia paga, criativos de alta performance, otimização contínua e dashboards de resultado — para marcas que precisam escalar com controle." }
};
/* i18n override */
if(window.__GMX_I18N&&window.__GMX_I18N.serviceData){Object.keys(window.__GMX_I18N.serviceData).forEach(function(k){if(serviceData[k])Object.assign(serviceData[k],window.__GMX_I18N.serviceData[k]);});}
const _t=function(k){return window.__GMX_I18N&&window.__GMX_I18N.cursor&&window.__GMX_I18N.cursor[k]||k;};

function openService(k) {
  const d = serviceData[k]; if (!d) return;
  playClick();
  document.getElementById('sm-tag').innerText = d.tag;
  document.getElementById('sm-title').innerText = d.title;
  document.getElementById('sm-body').innerHTML = d.body;
  const modal = document.querySelector('.service-modal');
  modal?.classList.add('active');
  modal?.setAttribute('aria-hidden', 'false');
  lenis?.stop();
  if (modal) releaseFocusTrap = trapFocus(modal);
  if (gmxCursor && !isMobile()) { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; }
}

function closeService() {
  playClick();
  const modal = document.querySelector('.service-modal');
  modal?.classList.remove('active');
  modal?.setAttribute('aria-hidden', 'true');
  if (releaseFocusTrap) { releaseFocusTrap(); releaseFocusTrap = null; }
  lenis?.start();
}

function openVideo(url) {
  if (!url) return; playClick();
  const vid = document.getElementById('project-video');
  const m = document.querySelector('.video-modal');
  if (!vid || !m) return;
  vid.src = url; lenis?.stop();
  m.setAttribute('aria-hidden', 'false');
  gsap.to(m, { opacity: 1, scale: 1, duration: 0.6, ease: "power4.out",
    onStart: () => { m.style.pointerEvents = "auto"; vid.play().catch(() => {}); },
    onComplete: () => { releaseFocusTrap = trapFocus(m); }
  });
  if (gmxCursor && !isMobile()) { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; }
}

function closeVideo() {
  playClick();
  const m = document.querySelector('.video-modal');
  const vid = document.getElementById('project-video');
  if (!m || !vid) return;
  if (releaseFocusTrap) { releaseFocusTrap(); releaseFocusTrap = null; }
  m.setAttribute('aria-hidden', 'true');
  gsap.to(m, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power3.in",
    onComplete: () => { m.style.pointerEvents = "none"; vid.pause(); vid.src = ""; lenis?.start(); }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Hero cinematic — live clock (SP timezone)
  const heroClock = document.getElementById('hero-clock');
  if (heroClock) {
    const pad = n => String(n).padStart(2, '0');
    const tickClock = () => {
      try {
        const parts = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).formatToParts(new Date());
        const h = parts.find(p => p.type === 'hour').value;
        const m = parts.find(p => p.type === 'minute').value;
        const s = parts.find(p => p.type === 'second').value;
        heroClock.textContent = `${h}:${m}:${s}`;
      } catch {
        const d = new Date();
        heroClock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }
    };
    tickClock();
    setInterval(tickClock, 1000);
  }

  // Hero cinematic — ensure video autoplays
  const heroCineVideo = document.querySelector('.hero-cine-video');
  if (heroCineVideo) {
    heroCineVideo.play().catch(() => {
      const tryPlay = () => { heroCineVideo.play().catch(() => {}); };
      document.addEventListener('pointerdown', tryPlay, { once: true });
      document.addEventListener('scroll', tryPlay, { once: true, passive: true });
    });
  }

  // Hero Variant C — 3D Narrative Tunnel (THREE.js)
  (function setupHero3DNarrative(){
    const cv = document.getElementById('hero-3d-canvas');
    if (!cv || typeof THREE === 'undefined') return;
    const mob = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.018);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: !mob, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mob ? 1.3 : 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x030308, 1);

    // Ambient + point lights travel with camera
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const pCyan = new THREE.PointLight(0x00f2fe, 2.8, 120); scene.add(pCyan);
    const pPink = new THREE.PointLight(0xff007f, 2.0, 110); scene.add(pPink);

    // ==== Tunnel ring segments along -Z ====
    const TUNNEL_LEN = 420;   // total length along -Z
    const RING_COUNT = mob ? 36 : 60;
    const RING_STEP  = TUNNEL_LEN / RING_COUNT;
    const RING_RADIUS = 22;
    const rings = [];
    const ringGeo = new THREE.TorusGeometry(RING_RADIUS, 0.12, 8, 96);

    for (let i = 0; i < RING_COUNT; i++) {
      const hue = i / RING_COUNT;
      const color = new THREE.Color().setHSL(0.55 + hue * 0.35, 0.85, 0.55); // cyan → violet → pink
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent:true,
        opacity:0.55,
        blending: THREE.AdditiveBlending,
        depthWrite:false
      });
      const ring = new THREE.Mesh(ringGeo, mat);
      ring.position.z = -i * RING_STEP;
      ring.rotation.z = i * 0.08;
      scene.add(ring);
      rings.push(ring);
    }

    // ==== Inner wireframe "cage" for depth layering ====
    const cageCount = mob ? 18 : 30;
    const cages = [];
    const cageGeo = new THREE.TorusGeometry(RING_RADIUS * 0.55, 0.04, 6, 60);
    for (let i = 0; i < cageCount; i++) {
      const mat = new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.12, blending:THREE.AdditiveBlending, depthWrite:false });
      const c = new THREE.Mesh(cageGeo, mat);
      c.position.z = -i * (TUNNEL_LEN / cageCount) - 4;
      c.rotation.x = Math.PI * 0.5;
      scene.add(c);
      cages.push(c);
    }

    // ==== Floating video panels along the tunnel ====
    const videoFiles = [
      'assets/video/showreel.mp4',
      'assets/video/GMXDIGITALURUS.mp4',
      'assets/video/Megaarquitetura.mp4',
      'assets/video/9dejulho.mp4',
      'assets/video/finalgmxobra.mp4',
      'assets/video/bellavita.mp4',
    ];
    const panelCount = mob ? 4 : 7;
    const panels = [];
    const panelGeo = new THREE.PlaneGeometry(14, 8);

    for (let i = 0; i < panelCount; i++) {
      const videoEl = document.createElement('video');
      videoEl.src = videoFiles[i % videoFiles.length];
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('muted', '');
      videoEl.setAttribute('webkit-playsinline', '');
      videoEl.preload = 'auto';
      videoEl.addEventListener('loadeddata', () => videoEl.play().catch(()=>{}));
      videoEl.play().catch(()=>{});

      const tex = new THREE.VideoTexture(videoEl);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      if (THREE.RGBFormat) tex.format = THREE.RGBFormat;

      const mat = new THREE.MeshBasicMaterial({ map:tex, transparent:true, opacity:0.92, side:THREE.DoubleSide, toneMapped:false });
      const mesh = new THREE.Mesh(panelGeo, mat);

      // distribute around tunnel wall
      const angle = (i / panelCount) * Math.PI * 2 + Math.random() * 0.6;
      const radius = RING_RADIUS - 3 - Math.random() * 3;
      const z = -20 - (i / panelCount) * (TUNNEL_LEN - 60);
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
      mesh.lookAt(0, 0, z);
      mesh.scale.setScalar(0.9 + Math.random() * 0.6);

      // glow frame
      const frameMat = new THREE.LineBasicMaterial({ color: i % 2 === 0 ? 0x00f2fe : 0xff007f, transparent:true, opacity:0.5 });
      const frame = new THREE.LineSegments(new THREE.EdgesGeometry(panelGeo), frameMat);
      mesh.add(frame);

      scene.add(mesh);
      panels.push({ mesh, angle, radius, baseZ: z, seed: Math.random() * 100 });
    }

    // ==== Starfield particles flying toward camera ====
    const STAR_COUNT = mob ? 900 : 2200;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    const palette = [
      new THREE.Color(0xffffff), new THREE.Color(0xffffff), new THREE.Color(0xffffff),
      new THREE.Color(0x00f2fe), new THREE.Color(0xff007f), new THREE.Color(0xa855f7),
    ];
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = RING_RADIUS * (0.4 + Math.random() * 1.8);
      const a = Math.random() * Math.PI * 2;
      starPos[i*3]   = Math.cos(a) * r;
      starPos[i*3+1] = Math.sin(a) * r;
      starPos[i*3+2] = -Math.random() * TUNNEL_LEN;
      const c = palette[(Math.random() * palette.length) | 0];
      starCol[i*3] = c.r; starCol[i*3+1] = c.g; starCol[i*3+2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: mob ? 1.4 : 1.1,
      vertexColors:true,
      transparent:true,
      opacity:0.9,
      blending:THREE.AdditiveBlending,
      depthWrite:false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ==== Scroll-driven camera + mouse parallax ====
    const state = {
      scrollProg: 0,
      targetProg: 0,
      mx: 0, my: 0,
      tmx: 0, tmy: 0,
    };

    function onScroll(){
      const heroEl = document.querySelector('.hero-3dnarrative');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const h = rect.height || window.innerHeight;
      const prog = Math.max(0, Math.min(1, -rect.top / h));
      state.targetProg = prog;
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();

    if (!mob){
      window.addEventListener('pointermove', (e) => {
        state.tmx = (e.clientX / window.innerWidth) * 2 - 1;
        state.tmy = -((e.clientY / window.innerHeight) * 2 - 1);
      }, { passive:true });
    }

    function onResize(){
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    let raf = 0, running = true;
    const start = performance.now();

    function frame(){
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const t = (performance.now() - start) * 0.001;

      // Smooth mouse lerp
      state.mx += (state.tmx - state.mx) * 0.05;
      state.my += (state.tmy - state.my) * 0.05;
      state.scrollProg += (state.targetProg - state.scrollProg) * 0.08;

      // Camera travels down the tunnel. Scroll adds extra travel.
      const baseTravel = -5 - t * 4; // constant slow travel
      const scrollBoost = -state.scrollProg * (TUNNEL_LEN * 0.45);
      camera.position.x = state.mx * 2.2;
      camera.position.y = state.my * 1.6;
      camera.position.z = baseTravel + scrollBoost;
      camera.rotation.z = -state.mx * 0.04;

      // Loop: when camera passes a ring, push it to the far end
      rings.forEach(r => {
        if (r.position.z > camera.position.z + 8) r.position.z -= TUNNEL_LEN;
        r.rotation.z += 0.004;
      });
      cages.forEach((c, i) => {
        if (c.position.z > camera.position.z + 6) c.position.z -= TUNNEL_LEN;
        c.rotation.y += 0.012 + i * 0.0003;
      });

      // Stars warp
      const pArr = starGeo.attributes.position.array;
      const speed = 0.6 + state.scrollProg * 3.5;
      for (let i = 0; i < STAR_COUNT; i++) {
        pArr[i*3+2] += speed;
        if (pArr[i*3+2] > camera.position.z + 4) {
          pArr[i*3+2] -= TUNNEL_LEN;
          const r = RING_RADIUS * (0.4 + Math.random() * 1.8);
          const a = Math.random() * Math.PI * 2;
          pArr[i*3]   = Math.cos(a) * r;
          pArr[i*3+1] = Math.sin(a) * r;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Panels drift + recycle
      panels.forEach(p => {
        // slight float on radius + angle
        const a = p.angle + Math.sin(t * 0.2 + p.seed) * 0.03;
        const r = p.radius + Math.sin(t * 0.4 + p.seed) * 0.4;
        p.mesh.position.x = Math.cos(a) * r;
        p.mesh.position.y = Math.sin(a) * r;
        if (p.mesh.position.z > camera.position.z + 14) {
          p.mesh.position.z -= TUNNEL_LEN;
          p.baseZ = p.mesh.position.z;
        }
        p.mesh.lookAt(camera.position);
      });

      // Lights travel with camera a bit ahead
      pCyan.position.set(Math.cos(t * 0.6) * 10, Math.sin(t * 0.8) * 6, camera.position.z - 12);
      pPink.position.set(-Math.cos(t * 0.7) * 10, -Math.sin(t * 0.9) * 6, camera.position.z - 26);

      renderer.render(scene, camera);
    }
    frame();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running) { running = true; frame(); }
    });
  })();


  (function setupHeroShader(){
    const cv = document.getElementById('hero-shader-canvas');
    if (!cv) return;
    const gl = cv.getContext('webgl', { antialias:false, premultipliedAlpha:false });
    if (!gl) { cv.style.background = 'radial-gradient(ellipse at 30% 30%, #2a1650 0%, #12082a 45%, #05030a 100%)'; return; }

    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
    const fs = `
      precision highp float;
      uniform vec2 uRes;
      uniform float uTime;
      uniform vec2 uMouse;

      // simplex-ish noise (cheap)
      vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
               + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // palette: purple -> pink -> cyan -> near-black
      vec3 palette(float t){
        vec3 c1 = vec3(0.060, 0.015, 0.110); // deep indigo
        vec3 c2 = vec3(0.490, 0.180, 0.780); // violet
        vec3 c3 = vec3(1.000, 0.160, 0.580); // hot pink
        vec3 c4 = vec3(0.000, 0.949, 0.996); // cyan
        vec3 col = mix(c1, c2, smoothstep(0.0, 0.35, t));
        col = mix(col, c3, smoothstep(0.35, 0.65, t));
        col = mix(col, c4, smoothstep(0.75, 1.0, t));
        return col;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / uRes.xy;
        vec2 st = uv;
        st.x *= uRes.x / uRes.y;

        float t = uTime * 0.10;
        vec2 m = uMouse * 0.45;

        // layered flow field
        float n1 = snoise(st * 1.4 + vec2(t, -t * 0.7) + m);
        float n2 = snoise(st * 2.6 + vec2(-t * 0.5, t * 0.9) - m * 0.6);
        float n3 = snoise(st * 0.7 + vec2(t * 0.3, t * 0.4));
        float f  = n1 * 0.55 + n2 * 0.3 + n3 * 0.25;
        f = 0.5 + 0.5 * f;

        // radial fall-off from mouse for "lens" feel
        float d = distance(uv, 0.5 + uMouse * 0.35);
        f += (0.35 - d) * 0.35;

        vec3 col = palette(clamp(f, 0.0, 1.0));

        // vignette
        float vig = smoothstep(1.1, 0.35, distance(uv, vec2(0.5)));
        col *= 0.35 + 0.75 * vig;

        // bottom darken + top lift
        col *= mix(0.72, 1.05, uv.y);

        // film grain
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)) + uTime) * 43758.5453);
        col += (grain - 0.5) * 0.035;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type, src){
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('Shader error:', gl.getShaderInfoLog(s)); gl.deleteShader(s); return null;
      }
      return s;
    }
    const vss = compile(gl.VERTEX_SHADER, vs);
    const fss = compile(gl.FRAGMENT_SHADER, fs);
    if (!vss || !fss) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vss); gl.attachShader(prog, fss);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const pLoc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    const mouse = { x:0, y:0, tx:0, ty:0 };
    const isMob = window.innerWidth < 768;

    function resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, isMob ? 1.3 : 1.6);
      const w = cv.clientWidth || window.innerWidth;
      const h = cv.clientHeight || window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
    }
    resize();
    window.addEventListener('resize', resize);

    if (!isMob){
      window.addEventListener('pointermove', (e) => {
        mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      }, { passive:true });
    }

    const start = performance.now();
    let rafId = 0, running = true;
    function frame(){
      if (!running) return;
      rafId = requestAnimationFrame(frame);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const t = (performance.now() - start) * 0.001;
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    frame();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; cancelAnimationFrame(rafId); }
      else if (!running) { running = true; frame(); }
    });
  })();

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gmx-click-card'); if (!card) return;
    e.preventDefault(); e.stopPropagation();
    if (card.dataset.service) openService(card.dataset.service);
    if (card.dataset.video) openVideo(card.dataset.video);
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.gmx-click-card');
    if (!card) return;
    e.preventDefault();
    playClick();
    if (card.dataset.service) openService(card.dataset.service);
    if (card.dataset.video) openVideo(card.dataset.video);
  });

  document.getElementById('close-service')?.addEventListener('click', closeService);
  document.getElementById('close-video')?.addEventListener('click', closeVideo);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeVideo(); closeService(); } });

  // Dropdown (generic for all custom selects — keyboard accessible)
  function initCustomSelect(triggerId, hiddenId) {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;
    const wrapper = trigger.closest('.custom-select-wrapper');
    const opts = wrapper?.querySelector('.custom-options');
    const hidden = document.getElementById(hiddenId);
    if (!opts || !hidden) return;
    const options = Array.from(opts.querySelectorAll('.custom-option'));
    let focusedIdx = -1;
    function openDropdown() { opts.classList.add('open'); trigger.classList.add('active'); trigger.setAttribute('aria-expanded', 'true'); focusedIdx = -1; }
    function closeDropdown() { opts.classList.remove('open'); trigger.classList.remove('active'); trigger.setAttribute('aria-expanded', 'false'); focusedIdx = -1; options.forEach(o => o.classList.remove('focused')); }
    function isOpen() { return opts.classList.contains('open'); }
    function selectOption(o) {
      playClick();
      const v = o.dataset.value || (window.__GMX_I18N&&window.__GMX_I18N.formFallback||"Não definido");
      trigger.querySelector('span').innerText = v;
      trigger.querySelector('span').style.color = '#fff';
      hidden.value = v; closeDropdown(); trigger.focus();
    }
    function focusOption(idx) {
      options.forEach(o => o.classList.remove('focused'));
      focusedIdx = Math.max(0, Math.min(idx, options.length - 1));
      options[focusedIdx]?.classList.add('focused');
      options[focusedIdx]?.scrollIntoView({ block: 'nearest' });
    }
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', (ev) => { ev.stopPropagation(); playClick(); isOpen() ? closeDropdown() : openDropdown(); });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeDropdown(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen()) openDropdown(); focusOption(focusedIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (!isOpen()) openDropdown(); focusOption(focusedIdx - 1); }
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isOpen() && focusedIdx >= 0) { selectOption(options[focusedIdx]); }
        else { playClick(); isOpen() ? closeDropdown() : openDropdown(); }
      }
    });
    options.forEach((o, i) => {
      o.addEventListener('click', (ev) => { ev.stopPropagation(); selectOption(o); });
      o.addEventListener('mouseenter', () => focusOption(i));
    });
    document.addEventListener('click', () => { if (isOpen()) closeDropdown(); });
  }
  initCustomSelect('gmx-servico-trigger', 'gmx-servico');
  initCustomSelect('gmx-prazo-trigger', 'gmx-prazo');
  setupFloatingInputs();
  setupLGPD();
  lazyLoadBgVideo();
  lazyLoadShowreelVideo();
  setupWhatsAppMask();
  setupFormRealTimeValidation();
  setupPortfolioDrag();
});

// ------------------------------
// LAZY LOAD BACKGROUND VIDEO
// ------------------------------
function lazyLoadBgVideo() {
  const vid = document.getElementById('bg-video-lazy');
  if (!vid) return;
  // Skip entirely on mobile — saves bandwidth and CPU
  if (isMobile()) {
    vid.parentElement.style.display = 'none';
    return;
  }
  // Defer loading by 2s after DOMContentLoaded for performance
  setTimeout(() => {
    const src = document.createElement('source');
    src.src = 'https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-facade-34989-large.mp4';
    src.type = 'video/mp4';
    vid.appendChild(src);
    vid.load();
  }, 2000);
}

// ------------------------------
// LAZY LOAD SHOWREEL VIDEO
// On desktop: load immediately. On mobile: defer until scrolled near.
// ------------------------------
function lazyLoadShowreelVideo() {
  document.querySelectorAll('video source[data-src]').forEach(function(source) {
    var video = source.parentElement;
    if (!isMobile()) {
      // Desktop: set src now
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
      video.load();
    } else {
      // Mobile: use IntersectionObserver to load when near
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          source.src = source.dataset.src;
          source.removeAttribute('data-src');
          video.load();
        }
      }, { rootMargin: '400px 0px' });
      obs.observe(video);
    }
  });
}

// ------------------------------
// LGPD COOKIE CONSENT
// ------------------------------
function setupLGPD() {
  const banner = document.getElementById('lgpd-banner');
  if (!banner) return;
  const consent = localStorage.getItem('gmx_lgpd_consent');
  if (consent) return; // Already accepted/rejected
  // Show after 1.5s
  setTimeout(() => banner.classList.add('is-visible'), 1500);
  document.getElementById('lgpd-accept')?.addEventListener('click', () => {
    localStorage.setItem('gmx_lgpd_consent', 'accepted');
    banner.classList.remove('is-visible');
    // Fire GTM consent event if GTM is loaded
    if (window.dataLayer) window.dataLayer.push({ event: 'cookie_consent', consent_status: 'accepted' });
  });
  document.getElementById('lgpd-reject')?.addEventListener('click', () => {
    localStorage.setItem('gmx_lgpd_consent', 'rejected');
    banner.classList.remove('is-visible');
    if (window.dataLayer) window.dataLayer.push({ event: 'cookie_consent', consent_status: 'rejected' });
  });
}

// ------------------------------
// WHATSAPP INPUT MASK (BR format)
// ------------------------------
function setupWhatsAppMask() {
  const input = document.getElementById('gmx-whats');
  if (!input) return;
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 7) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    input.value = v;
  });
}

// ------------------------------
// FORM REAL-TIME VALIDATION
// ------------------------------
function setupFormRealTimeValidation() {
  const fields = [
    { id: 'gmx-nome', validate: v => v.trim().length >= 2 },
    { id: 'gmx-email', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'gmx-whats', validate: v => v.replace(/\D/g, '').length >= 10 },
    { id: 'gmx-mensagem', validate: v => v.trim().length >= 10 }
  ];
  fields.forEach(({ id, validate }) => {
    const input = document.getElementById(id);
    if (!input) return;
    const wrap = input.closest('.floating-input');
    if (!wrap) return;
    let touched = false;
    input.addEventListener('blur', () => { touched = true; check(); }, { passive: true });
    input.addEventListener('input', () => { if (touched) check(); }, { passive: true });
    function check() {
      const val = input.value || '';
      if (val.trim().length === 0) {
        wrap.classList.remove('is-valid', 'is-invalid');
      } else if (validate(val)) {
        wrap.classList.add('is-valid');
        wrap.classList.remove('is-invalid');
      } else {
        wrap.classList.add('is-invalid');
        wrap.classList.remove('is-valid');
      }
    }
  });
}

function setupFloatingInputs() {
  document.querySelectorAll('.floating-input').forEach(w => {
    const f = w.querySelector('input,textarea'); if (!f) return;
    const sync = () => w.classList.toggle('has-value', (f.value || "").trim().length > 0);
    sync();
    f.addEventListener('input', sync, { passive: true });
    f.addEventListener('change', sync, { passive: true });
    setTimeout(sync, 200); setTimeout(sync, 800);
  });
}

// ------------------------------
// PORTFOLIO DRAG-SCROLL (Infinite auto-scroll carousel)
// Cards clone for seamless loop. Hover pauses. Drag works.
// ------------------------------
function setupPortfolioDrag() {
  const container = document.querySelector('.portfolio-drag');
  if (!container) { console.warn('[Portfolio] container not found'); return; }

  const originalCards = Array.from(container.querySelectorAll('.showreel-glass-frame'));
  const progressFill = document.querySelector('.portfolio-progress-fill');
  const totalCards = originalCards.length;
  if (!totalCards) { console.warn('[Portfolio] no cards found'); return; }

  console.log('[Portfolio] Setup: found', totalCards, 'cards');

  // Force all original cards to be visible immediately (don't wait for scroll reveal)
  originalCards.forEach(card => {
    card.classList.remove('reveal-up');
    card.style.opacity = '1';
    card.style.transform = 'none';
  });

  // --- Clone all cards for seamless infinite loop ---
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.remove('reveal-up');
    clone.style.opacity = '1';
    clone.style.transform = 'none';
    clone.removeAttribute('data-cloned'); // clean
    clone.setAttribute('data-cloned', 'true');
    container.appendChild(clone);
  });

  const allCards = Array.from(container.querySelectorAll('.showreel-glass-frame'));
  console.log('[Portfolio] Total cards (incl clones):', allCards.length);

  // Width of the original set (for reset point)
  let originalWidth = 0;
  function calcOriginalWidth() {
    const gap = parseFloat(getComputedStyle(container).gap) || 24;
    originalWidth = 0;
    for (let i = 0; i < totalCards; i++) {
      originalWidth += originalCards[i].offsetWidth + gap;
    }
    console.log('[Portfolio] originalWidth:', originalWidth, 'scrollWidth:', container.scrollWidth, 'clientWidth:', container.clientWidth);
  }
  // Calc after a short delay for layout to stabilize
  setTimeout(calcOriginalWidth, 100);
  setTimeout(calcOriginalWidth, 500);
  window.addEventListener('resize', calcOriginalWidth);

  // --- Drag state ---
  let isDragging = false, startX = 0, scrollLeft = 0;
  let dragVelocity = 0, lastDragX = 0, momentumRaf = null;

  // --- Infinite loop reset ---
  function checkLoop() {
    if (originalWidth <= 0) return;
    if (container.scrollLeft >= originalWidth) {
      container.scrollLeft -= originalWidth;
    } else if (container.scrollLeft <= 0 && container.scrollLeft < 1) {
      container.scrollLeft += originalWidth;
    }
  }

  // --- Progress bar ---
  function updateProgress() {
    if (!progressFill || originalWidth <= 0) return;
    const pct = (container.scrollLeft % originalWidth) / originalWidth;
    progressFill.style.width = Math.max(5, pct * 100) + '%';
  }

  // --- 3D tilt based on scroll position ---
  function updateCardEffects() {
    checkLoop();
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    allCards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const offset = (cardCenterX - centerX) / (containerRect.width / 2);
      const clampedOffset = Math.max(-1, Math.min(1, offset));

      const rotateY = clampedOffset * 3;
      const scale = 1 - Math.abs(clampedOffset) * 0.04;
      const dimness = 1 - Math.abs(clampedOffset) * 0.15;

      if (!isMobile()) {
        card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = Math.max(0.7, dimness);
      }
    });
    updateProgress();
  }

  container.addEventListener('scroll', () => {
    requestAnimationFrame(updateCardEffects);
  }, { passive: true });
  requestAnimationFrame(updateCardEffects);

  // --- Auto-scroll (infinite, non-stop) ---
  let autoScrollRaf = null;
  let autoScrollPaused = false;
  const AUTO_SPEED = isMobile() ? 0.6 : 1.0;

  function autoScrollLoop() {
    if (!autoScrollPaused && !isDragging) {
      container.scrollLeft += AUTO_SPEED;
      checkLoop();
    }
    autoScrollRaf = requestAnimationFrame(autoScrollLoop);
  }

  function startAutoScroll() {
    if (autoScrollRaf) return;
    calcOriginalWidth();
    console.log('[Portfolio] Auto-scroll started, originalWidth:', originalWidth);
    autoScrollRaf = requestAnimationFrame(autoScrollLoop);
  }

  function stopAutoScroll() {
    autoScrollPaused = true;
  }

  function restartAutoScroll() {
    autoScrollPaused = false;
  }

  // Start auto-scroll using IntersectionObserver (more reliable than ScrollTrigger)
  const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAutoScroll();
        restartAutoScroll();
      } else {
        stopAutoScroll();
      }
    });
  }, { rootMargin: '100px 0px', threshold: 0 });
  portfolioObserver.observe(container);

  // Fallback: start after 3s regardless
  setTimeout(() => { startAutoScroll(); }, 3000);

  // --- Pause on hover (desktop) — resume after delay ---
  let resumeTimeout = null;
  function delayedRestart(delay) {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => { restartAutoScroll(); }, delay || 3000);
  }

  container.addEventListener('mouseenter', stopAutoScroll);
  container.addEventListener('mouseleave', () => { if (!isDragging) delayedRestart(1500); });

  // --- Arrow buttons (desktop navigation) ---
  const prevBtn = document.querySelector('.portfolio-nav--prev');
  const nextBtn = document.querySelector('.portfolio-nav--next');
  function getCardStep() {
    const firstCard = container.querySelector('.showreel-glass-frame');
    const gap = parseFloat(getComputedStyle(container).gap) || 24;
    return firstCard ? firstCard.offsetWidth + gap : 400;
  }
  function navByArrow(direction) {
    stopAutoScroll();
    if (momentumRaf) { cancelAnimationFrame(momentumRaf); momentumRaf = null; }
    const step = getCardStep();
    container.scrollBy({ left: direction * step, behavior: 'smooth' });
    delayedRestart(3500);
  }
  if (prevBtn) prevBtn.addEventListener('click', () => navByArrow(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navByArrow(1));

  // --- Touch drag (mobile) ---
  let touchStartX = 0, touchScrollLeft = 0, touchDragVelocity = 0, lastTouchX = 0, isTouching = false;

  container.addEventListener('touchstart', (e) => {
    isTouching = true;
    stopAutoScroll();
    if (resumeTimeout) clearTimeout(resumeTimeout);
    if (momentumRaf) { cancelAnimationFrame(momentumRaf); momentumRaf = null; }
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = container.scrollLeft;
    lastTouchX = touchStartX;
    touchDragVelocity = 0;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 1.4;
    touchDragVelocity = (lastTouchX - x) * 0.4;
    lastTouchX = x;
    container.scrollLeft = touchScrollLeft - walk;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isTouching = false;
    if (Math.abs(touchDragVelocity) > 1.5) {
      const decelerate = () => {
        touchDragVelocity *= 0.93;
        container.scrollLeft += touchDragVelocity;
        if (Math.abs(touchDragVelocity) > 0.5) momentumRaf = requestAnimationFrame(decelerate);
        else { momentumRaf = null; delayedRestart(4000); }
      };
      momentumRaf = requestAnimationFrame(decelerate);
    } else {
      delayedRestart(4000);
    }
  }, { passive: true });

  // Hide drag hint after first interaction
  const hint = document.querySelector('.portfolio-drag-hint');
  if (hint) {
    const hideHint = () => { hint.style.opacity = '0'; hint.style.transition = 'opacity 0.5s'; };
    if (prevBtn) prevBtn.addEventListener('click', hideHint, { once: true });
    if (nextBtn) nextBtn.addEventListener('click', hideHint, { once: true });
    container.addEventListener('touchstart', hideHint, { once: true, passive: true });
  }
}

// ------------------------------
// 3) Motores: Lenis + GSAP
// ------------------------------
let interacoesLigadas = false;
const checkMotor = setInterval(() => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof THREE !== 'undefined' && typeof Lenis !== 'undefined') {
    clearInterval(checkMotor); iniciarMotores();
  }
}, 50);

function iniciarMotores() {
  gsap.registerPlugin(ScrollTrigger);
  lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
  window.lenis = lenis; // Expor globalmente para o Túnel GMX
  startPerformanceTuner();

  if (!ENABLE_ABOUT_CUBE && !ENABLE_ABOUT_CUBE_LITE) {
    document.body.classList.add('about-cube-disabled');
    document.body.classList.remove('about-cube-lite');
  } else {
    document.body.classList.remove('about-cube-disabled');
    document.body.classList.toggle('about-cube-lite', ENABLE_ABOUT_CUBE_LITE && !ENABLE_ABOUT_CUBE);
  }

  const headerGMX = document.querySelector('.gmx-header');
  const scrollRing = document.querySelector('.ring-fill');
  const scrollPerc = document.querySelector('.scroll-perc');
  const scrollRingWrap = document.querySelector('.scroll-progress-ring');
  const btnTop = document.getElementById('btn-top');
  const waFab = document.getElementById('wa-fab');
  let lastScrollY = 0;
  let currentScrollY = 0;
  let syncHeroVisibility = null;

  // Cache DOM selectors for scroll velocity distortion (perf: no querySelectorAll per frame)
  // IMPORTANT: Cards/work-items EXCLUDED — skew on clickable elements causes hit-test divergence
  const skewTargets = document.querySelectorAll('.skew-on-scroll, .section-title, .portfolio-heading, .manifesto-title, .form-title, .bento-title');

  lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    currentScrollY = e.scroll || 0;

    // Scroll velocity distortion DISABLED — was causing click-target desync
    // (skewY transforms shift visual position away from DOM hit-test box)

    if (headerGMX) {
      if (e.scroll > 100) {
        headerGMX.classList.add('is-scrolled');
        headerGMX.classList.toggle('is-hidden', e.scroll > lastScrollY && e.scroll > 300);
      } else { headerGMX.classList.remove('is-scrolled', 'is-hidden'); }
    }
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollRing && scrollPerc && total > 0) {
      const p = Math.min(1, Math.max(0, e.scroll / total));
      scrollRing.style.strokeDashoffset = 289 - (p * 289);
      scrollPerc.innerText = Math.round(p * 100);
    }
    // Back-to-top, progress ring, WA FAB - show after scrolling past hero
    const showFixed = e.scroll > window.innerHeight * 0.5;
    const showWaFab = showFixed && isMobile();
    if (scrollRingWrap) scrollRingWrap.classList.toggle('is-visible', showFixed);
    if (btnTop) btnTop.classList.toggle('is-visible', showFixed);
    if (waFab) waFab.classList.toggle('is-visible', showWaFab);
    if (typeof syncHeroVisibility === 'function') syncHeroVisibility(currentScrollY);
    lastScrollY = e.scroll;
  });

  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Loader — with safety for already-loaded pages
  const counter = document.querySelector('.loader-counter');
  const loaderEl = document.querySelector('.gmx-loader');
  const barFill = document.getElementById('loader-bar-fill');
  let progress = 0;
  let loaderDone = false;

  const updateProgress = setInterval(() => {
    const remaining = 95 - progress;
    progress += Math.max(1, remaining * 0.12 + Math.random() * 2);
    if (progress >= 95) progress = 95;
    if (counter) counter.textContent = Math.round(progress) + '%';
    if (barFill) barFill.style.width = Math.round(progress) + '%';
  }, 60);

  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    clearInterval(updateProgress);
    if (counter) counter.textContent = '100%';
    if (barFill) barFill.style.width = '100%';
    setTimeout(() => {
      // Apenas esconder o loader — sem animação de slices no carregamento inicial
      if (loaderEl) loaderEl.style.pointerEvents = 'none'; // impedir cliques durante fade-out
      const tl = gsap.timeline();
      tl.to(loaderEl, { opacity: 0, duration: 0.8, ease: "power4.inOut",
        onComplete: () => { if (loaderEl) loaderEl.style.display = "none"; }
      });

      // Hero reveal após loader desaparecer completamente
      const heroAnims = document.querySelectorAll('.hero-anim');
      heroAnims.forEach(el => {
        if (el.tagName === 'H1') {
          // Make the h1 container visible first (it has opacity:0 from .hero-anim CSS)
          gsap.set(el, { opacity: 1, y: 0 });
          // Split glitch-target spans into individual characters (skip .gmx-highlight to preserve gradient)
          el.querySelectorAll('.glitch-target').forEach(span => {
            if (span.classList.contains('gmx-highlight')) {
              // Animate gradient span as a whole unit — don't break its background-clip:text
              span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(110%) rotateX(-80deg);transform-origin:bottom center;filter:blur(8px);';
              span.classList.add('highlight-anim-unit');
              return;
            }
            const text = span.textContent;
            span.innerHTML = '';
            text.split('').forEach(ch => {
              const s = document.createElement('span');
              s.className = 'split-char';
              s.textContent = ch === ' ' ? '\u00A0' : ch;
              s.style.cssText = 'display:inline-block;opacity:0;transform:translateY(110%) rotateX(-80deg);transform-origin:bottom center;filter:blur(8px);';
              span.appendChild(s);
            });
          });
          const chars = el.querySelectorAll('.split-char');
          tl.to(chars, { opacity: 1, y: '0%', rotateX: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.025, ease: "power4.out" }, "+=0.1");
          // Animate the gradient highlight span as one piece, right after the chars
          const highlightUnit = el.querySelector('.highlight-anim-unit');
          if (highlightUnit) {
            tl.to(highlightUnit, { opacity: 1, y: '0%', rotateX: 0, filter: 'blur(0px)', duration: 0.9, ease: "power4.out" }, "-=0.4");
          }
        } else {
          tl.to(el, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }, "-=0.5");
        }
      });
      tl.to(".reveal-up", { y: 0, opacity: 1, duration: 1.0, stagger: 0.04, ease: "power3.out" }, "-=0.8");
      tl.add(() => { ScrollTrigger.refresh(); }, "-=0.5");
      // Cleanup will-change on split-chars after intro animations settle (perf: free GPU layers)
      setTimeout(() => { document.querySelectorAll('.split-char').forEach(s => s.style.willChange = 'auto'); }, 3500);
      if (!interacoesLigadas) { interacoesLigadas = true; ligarInteracoes(); }
    }, 400);
  }

  // If page already loaded (e.g. cached), fire immediately
  if (document.readyState === 'complete') {
    finishLoader();
  } else {
    window.addEventListener('load', finishLoader);
    // Safety timeout: if load never fires within 8s, force finish
    setTimeout(finishLoader, 8000);
  }

  // Delayed ScrollTrigger recalc to account for content-visibility: auto layout shifts
  setTimeout(() => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); }, 2500);
  setTimeout(() => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); }, 6000);

  // =====================================================
  // INTERAÇÕES
  // =====================================================
  function ligarInteracoes() {
    const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    function scrambleEffect(el) {
      const orig = el.dataset.original || el.innerText;
      if (!el.dataset.original) el.dataset.original = orig;
      if (!isMobile()) el.style.width = Math.ceil(el.getBoundingClientRect().width) + 2 + 'px';
      el.style.display = 'inline-block';
      let iter = 0;
      clearInterval(el._si);
      el._si = setInterval(() => {
        el.innerText = orig.split("").map((c, i) => (i < iter || c === " ") ? orig[i] : scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)]).join("");
        if (iter >= orig.length) { clearInterval(el._si); el.innerText = orig; if (!isMobile()) el.style.width = ''; }
        iter += 1 / 3;
      }, 30);
    }

    const ts = isMobile() ? "top 120%" : "top 92%";
    const heroTitle = document.querySelector('.hero-title');
    document.querySelectorAll('.glitch-target').forEach(item => {
      // Skip hero title's glitch-targets — they use magnetic warp instead
      if (heroTitle && heroTitle.contains(item)) return;
      ScrollTrigger.create({ trigger: item, start: ts, onEnter: () => scrambleEffect(item) });
      if (!isMobile()) item.addEventListener('mouseenter', () => { scrambleEffect(item); playHover(); });
    });

    document.querySelectorAll('.reveal-up').forEach(item => {
      /* form-container gets near-instant reveal; other sections stay snappy */
      const isForm = item.closest('.application-form');
      const dur = isMobile() ? 0.3 : (isForm ? 0.35 : 0.55);
      gsap.to(item, { scrollTrigger: { trigger: item, start: isForm ? 'top 98%' : ts }, y: 0, opacity: 1, duration: dur, ease: "power2.out" });
    });

    // Tilt
    document.querySelectorAll('.tilt-effect').forEach(f => {
      if (isMobile()) return;
      f.addEventListener('mousemove', (e) => {
        const r = f.getBoundingClientRect();
        gsap.to(f, { rotationY: (e.clientX - r.left - r.width / 2) * 0.02, rotationX: -(e.clientY - r.top - r.height / 2) * 0.02, ease: "power2.out", duration: 0.5 });
      });
      f.addEventListener('mouseleave', () => gsap.to(f, { rotationY: 0, rotationX: 0, ease: "power3.out", duration: 1.2 }));
    });

    // Magnetic buttons (enhanced)
    document.querySelectorAll('.gmx-btn-nav,.submit-btn,.wa-btn,.service-modal-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        if (isMobile()) return;
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.6;
        const dy = (e.clientY - r.top - r.height / 2) * 0.6;
        gsap.to(btn, { x: dx, y: dy, duration: 0.35, ease: "power2.out" });
        btn.style.boxShadow = `0 0 24px rgba(0,242,254,0.25), 0 0 60px rgba(0,242,254,0.08)`;
      });
      btn.addEventListener('mouseleave', () => { if (!isMobile()) { gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1,0.3)" }); btn.style.boxShadow = ''; } });
      btn.addEventListener('mouseenter', () => { if (gmxCursor && !isMobile()) { gmxCursor.classList.add('grow'); cursorText.innerText = _t('CLIQUE'); playHover(); } });
      btn.addEventListener('mouseleave', () => { if (gmxCursor && !isMobile()) { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; } });
    });

    // Parallax works
    gsap.utils.toArray('.work-item').forEach(w => {
      const bg = w.querySelector('.work-bg-parallax'); if (!bg) return;
      gsap.to(bg, { yPercent: 25, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // CountUp (uses data-count so real values stay in DOM for SEO)
    document.querySelectorAll('.metric h3').forEach(el => {
      const raw = el.dataset.count || el.textContent.trim();
      const m = raw.match(/[\d.]+/); if (!m) return;
      const num = parseFloat(m[0]);
      const pre = raw.substring(0, raw.indexOf(m[0]));
      const suf = raw.substring(raw.indexOf(m[0]) + m[0].length);
      const isF = m[0].includes('.');
      const originalText = el.textContent.trim();
      // DON'T zero the text here — keep real value for crawlers/SEO
      ScrollTrigger.create({ trigger: el.closest('.metric') || el, start: "top 85%", once: true,
        onEnter: () => {
          el.textContent = pre + '0' + suf; // Zero only when user scrolls here
          const o = { v: 0 };
          gsap.to(o, { v: num, duration: 2.2, ease: "power2.out",
            onUpdate: () => el.textContent = pre + (isF ? o.v.toFixed(1) : Math.round(o.v)) + suf,
            onComplete: () => el.textContent = originalText
          });
        }
      });
    });

    // Proof reveal
    const ps = document.querySelector('.gmx-proof-section');
    if (ps) {
      const pc = ps.querySelector('.proof-copy');
      const mc = ps.querySelectorAll('.metric');
      if (pc) gsap.fromTo(pc, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ps, start: "top 75%", once: true } });
      if (mc.length) gsap.fromTo(mc, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ps, start: "top 65%", once: true } });
    }

    // Showreel cinematic reveal
    const showreelFrame = document.querySelector('.showreel-section .showreel-glass-frame');
    if (showreelFrame && !isMobile()) {
      gsap.fromTo(showreelFrame,
        { scale: 0.88, opacity: 0, y: 80 },
        { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: "power3.out",
          scrollTrigger: { trigger: '.showreel-section', start: "top 85%", once: true }
        }
      );
    }

    // Light-realm: no opacity animation needed — CSS ::before gradient
    // handles the dark→white transition naturally. Removing the old
    // opacity:0 fromTo which caused the "white disappears" bug.

    // Step/Bento stagger (Lusion-style smooth reveals)
    const sc = document.querySelectorAll('.step-card');
    if (sc.length) gsap.fromTo(sc, { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: '.method-section', start: "top 78%", once: true } });
    const bc = document.querySelectorAll('.bento-card');
    if (bc.length) gsap.fromTo(bc, { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: '.services-grid-section', start: "top 78%", once: true } });

    // Lusion-style: About section staggered reveal
    // NOTE: Do NOT animate aboutLeft opacity/x — it conflicts with the immersive scroll-lock
    // which migrates the canvas and controls aboutLeft.borderRadius/boxShadow.
    const aboutNumberEl = document.querySelector('.about-number');
    const aboutTagEl = document.querySelector('.about-tag');
    const aboutTitleEl = document.querySelector('.premium-text-card .section-title');
    const aboutDividerEl = document.querySelector('.about-divider');
    const aboutDescEl = document.querySelector('.premium-text-card .section-desc');
    const aboutBigEl = document.querySelector('.premium-text-card .big-text');
    const aboutPillEls = document.querySelectorAll('.capability-pill');
    if (aboutTagEl && aboutTitleEl) {
      const aboutTextEls = [aboutTagEl, aboutTitleEl, aboutDividerEl, aboutDescEl, aboutBigEl].filter(Boolean);
      gsap.set(aboutTextEls, { opacity: 0, y: 30 });
      gsap.set(aboutPillEls, { opacity: 0, y: 20, scale: 0.9 });
      if (aboutNumberEl) gsap.set(aboutNumberEl, { opacity: 0 });
      ScrollTrigger.create({
        trigger: '.about-gmx',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (aboutNumberEl) tl.to(aboutNumberEl, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0);
          tl.to(aboutTextEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.15);
          tl.to(aboutPillEls, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: "back.out(1.7)" }, 0.7);
        }
      });
    }

    // Lusion-style: Portfolio header reveal
    const portHeader = document.querySelector('.portfolio-header');
    if (portHeader) {
      gsap.fromTo(portHeader.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: portHeader, start: "top 80%", once: true }
        }
      );
    }

    // Lusion-style: Qualification items stagger
    const qualItems = document.querySelectorAll('.qualification-item');
    if (qualItems.length) {
      gsap.fromTo(qualItems,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: '.gmx-qualification', start: "top 75%", once: true }
        }
      );
    }

    // Lusion-style: FAQ items stagger
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
      gsap.fromTo(faqItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: '.gmx-faq', start: "top 78%", once: true }
        }
      );
    }

    // Lusion-style: Smooth parallax on white cards (subtle depth)
    if (!isMobile()) {
      document.querySelectorAll('.bento-card').forEach((card, i) => {
        gsap.to(card, { y: -(5 + i * 3), ease: "none",
          scrollTrigger: { trigger: '.services-grid-section', start: "top bottom", end: "bottom top", scrub: 2 }
        });
      });
      document.querySelectorAll('.step-card').forEach((card, i) => {
        gsap.to(card, { y: -(4 + i * 2), ease: "none",
          scrollTrigger: { trigger: '.method-section', start: "top bottom", end: "bottom top", scrub: 2 }
        });
      });
    }

    // Cursor contexts
    if (!isMobile() && gmxCursor && cursorText) {
      document.querySelectorAll('.portfolio .showreel-glass-frame').forEach(c => {
        c.addEventListener('mouseenter', () => { gmxCursor.classList.add('grow'); cursorText.innerText = _t('VER'); playHover(); });
        c.addEventListener('mouseleave', () => { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; });
      });
      const sr = document.querySelector('.showreel-section .showreel-glass-frame');
      if (sr) { sr.addEventListener('mouseenter', () => { gmxCursor.classList.add('grow'); cursorText.innerText = 'PLAY'; playHover(); }); sr.addEventListener('mouseleave', () => { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; }); }
      document.querySelectorAll('.bento-card').forEach(c => {
        c.addEventListener('mouseenter', () => { gmxCursor.classList.add('grow'); cursorText.innerText = _t('ABRIR'); playHover(); });
        c.addEventListener('mouseleave', () => { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; });
      });
      ['helix-sticky-wrapper', 'ultra-sticky'].forEach(cls => {
        const el = document.querySelector('.' + cls);
        if (el) { el.addEventListener('mouseenter', () => { gmxCursor.classList.add('grow'); cursorText.innerText = 'SCROLL'; }); el.addEventListener('mouseleave', () => { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; }); }
      });
    }

    // =====================================================
    // MAGNETIC TEXT WARP (creativity differentiator)
    // Characters repel away from cursor like a force field
    // =====================================================
    if (!isMobile() && !prefersReducedMotion) {
      if (heroTitle) {
        // Reuse the .split-char elements created by the intro animation
        const charEls = Array.from(heroTitle.querySelectorAll('.split-char'));
        if (charEls.length) {
          charEls.forEach(s => {
            s.classList.add('magnetic-char');
          });

          // After intro animation completes, split .gmx-highlight ("A REALIDADE.")
          // into per-char spans with interpolated cyan→pink colors for magnetic warp
          const highlightSpan = heroTitle.querySelector('.gmx-highlight');
          if (highlightSpan) {
            setTimeout(() => {
              const text = highlightSpan.textContent;
              const totalChars = text.length;
              if (totalChars < 2) return;
              highlightSpan.innerHTML = '';
              // Override gradient styles — use per-char interpolated colors instead
              highlightSpan.style.background = 'none';
              highlightSpan.style.webkitBackgroundClip = 'unset';
              highlightSpan.style.backgroundClip = 'unset';
              highlightSpan.style.webkitTextFillColor = 'unset';
              highlightSpan.classList.remove('highlight-anim-unit');
              text.split('').forEach((ch, i) => {
                const s = document.createElement('span');
                s.className = 'split-char magnetic-char';
                s.textContent = ch === ' ' ? '\u00A0' : ch;
                s.style.display = 'inline-block';
                // Interpolate cyan (#00f2fe) → pink (#ff007f) per char position
                const t = i / (totalChars - 1);
                const r = Math.round(t * 255);
                const g = Math.round(242 * (1 - t));
                const b = Math.round(254 - t * 127);
                s.style.color = `rgb(${r},${g},${b})`;
                highlightSpan.appendChild(s);
                charEls.push(s); // Add to magnetic array
              });
            }, 3500); // Wait for intro highlight animation to finish
          }

          const RADIUS = 160;
          const STRENGTH = 28;
          let magneticRaf = null;
          let magneticActive = false;

          function updateMagnetic() {
            const hero = heroTitle.getBoundingClientRect();
            if (mouseY < hero.top - RADIUS || mouseY > hero.bottom + RADIUS ||
                mouseX < hero.left - RADIUS || mouseX > hero.right + RADIUS) {
              if (magneticActive) {
                charEls.forEach(s => { s.style.transform = ''; });
                magneticActive = false;
              }
              magneticRaf = requestAnimationFrame(updateMagnetic);
              return;
            }
            magneticActive = true;
            charEls.forEach(s => {
              const r = s.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2;
              const dx = cx - mouseX;
              const dy = cy - mouseY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < RADIUS && dist > 0) {
                const force = (1 - dist / RADIUS) * STRENGTH;
                const angle = Math.atan2(dy, dx);
                s.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
              } else {
                s.style.transform = '';
              }
            });
            magneticRaf = requestAnimationFrame(updateMagnetic);
          }

          createVisibilityObserver(heroTitle, {
            onEnter: () => { if (!magneticRaf) magneticRaf = requestAnimationFrame(updateMagnetic); },
            onExit: () => {
              if (magneticRaf) { cancelAnimationFrame(magneticRaf); magneticRaf = null; }
              charEls.forEach(s => { s.style.transform = ''; });
              magneticActive = false;
            },
            rootMargin: '100px'
          });
        }
      }
    }

    // Metric parallax
    if (!isMobile()) {
      document.querySelectorAll('.metric').forEach((m, i) => {
        gsap.to(m, { y: -15 - i * 8, ease: "none", scrollTrigger: { trigger: '.gmx-proof-section', start: "top bottom", end: "bottom top", scrub: 1.5 } });
      });
    }

    /* ======================================================
       ABOUT SECTION — Immersive Scroll-Lock Deep Zoom v3
       5 clean phases: FADE-IN → ZOOM → HOLD → ZOOM-OUT → FADE-OUT
       Canvas moves ONLY behind fully-opaque overlay (invisible swap).
       Proper lerp interpolation — no cumulative multiplication.
       ====================================================== */
    const aboutSec = document.querySelector('.about-gmx');
    const cubeCont = document.getElementById('cube-container');
    const immOverlay = document.getElementById('immersive-3d-overlay');
    if (ENABLE_ABOUT_CUBE && aboutSec && cubeCont && immOverlay && !isMobile() && typeof THREE !== 'undefined') {
      const aboutLeftEl = aboutSec.querySelector('.about-left');
      const aboutRightEl = aboutSec.querySelector('.about-right');

      let canvasInOverlay = false;

      /* Phase boundaries */
      const P = { fadeIn: 0.14, zoomEnd: 0.48, holdEnd: 0.70, zoomOut: 0.87 };
      /* 0.87 → 1.0 = fade out */

      /* Camera keyframes */
      const CAM_START = { x: 0, y: 4, z: 10, fov: 50 };
      const CAM_DEEP  = { x: 0, y: 1.5, z: 4, fov: 30 };
      const LOOK_AT = new THREE.Vector3(0, 0.3, 0); /* center of cube group */

      function lerp(a, b, t) { return a + (b - a) * t; }
      function easeIO(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3) / 2; }

      /* Canvas parent helpers (clean style swap) */
      function canvasToOverlay(rend, cam) {
        if (canvasInOverlay) return;
        rend.domElement.style.cssText = 'display:block;width:100%;height:100%;';
        immOverlay.appendChild(rend.domElement);
        rend.setSize(window.innerWidth, window.innerHeight);
        rend.setClearColor(0x050510, 1);
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
        rend.render(cubeCont._chromeScene, cam);
        canvasInOverlay = true;
      }
      function canvasToContainer(rend, cam) {
        if (!canvasInOverlay) return;
        cubeCont.appendChild(rend.domElement);
        rend.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
        const cw = cubeCont.clientWidth || 500, ch = cubeCont.clientHeight || 500;
        rend.setSize(cw, ch);
        rend.setClearColor(0x030308, 0);
        cam.aspect = cw / ch;
        cam.updateProjectionMatrix();
        canvasInOverlay = false;
      }
      function resetAll() {
        const rend = cubeCont._chromeRenderer;
        const cam = cubeCont._chromeCamera;
        if (rend) canvasToContainer(rend, cam);
        if (cam) { cam.fov = 50; cam.position.set(0,4,10); cam.lookAt(LOOK_AT); cam.updateProjectionMatrix(); }
        immOverlay.style.opacity = '0';
        immOverlay.style.pointerEvents = 'none';
        if (aboutLeftEl) { aboutLeftEl.style.borderRadius = '24px'; aboutLeftEl.style.boxShadow = ''; aboutLeftEl.style.opacity = '1'; }
        if (aboutRightEl) aboutRightEl.style.opacity = '1';
      }

      ScrollTrigger.create({
        trigger: aboutSec,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const cam = cubeCont._chromeCamera;
          const rend = cubeCont._chromeRenderer;
          if (!cam || !rend) return;

          /* ━━ Phase 1: FADE IN (0 → P.fadeIn) ━━ */
          if (p <= P.fadeIn) {
            const t = p / P.fadeIn;
            immOverlay.style.opacity = t;
            immOverlay.style.pointerEvents = t > 0.5 ? 'auto' : 'none';
            if (aboutLeftEl) {
              aboutLeftEl.style.borderRadius = lerp(24, 0, t) + 'px';
              aboutLeftEl.style.boxShadow = 'none';
              aboutLeftEl.style.opacity = (1 - t);
            }
            if (aboutRightEl) aboutRightEl.style.opacity = (1 - t);
            /* Keep canvas in container during fade-in; swap only once overlay is fully opaque (Phase 2) */
            /* Camera at start */
            cam.fov = CAM_START.fov;
            cam.position.set(CAM_START.x, CAM_START.y, CAM_START.z);
            cam.lookAt(LOOK_AT);
            cam.updateProjectionMatrix();
          }
          /* ━━ Phase 2: ZOOM IN (P.fadeIn → P.zoomEnd) ━━ */
          else if (p <= P.zoomEnd) {
            immOverlay.style.opacity = '1';
            immOverlay.style.pointerEvents = 'auto';
            if (aboutLeftEl) aboutLeftEl.style.opacity = '0';
            if (aboutRightEl) aboutRightEl.style.opacity = '0';
            canvasToOverlay(rend, cam); /* safety for reverse-scroll */
            const t = easeIO((p - P.fadeIn) / (P.zoomEnd - P.fadeIn));
            cam.fov = lerp(CAM_START.fov, CAM_DEEP.fov, t);
            cam.position.x = lerp(CAM_START.x, CAM_DEEP.x, t);
            cam.position.y = lerp(CAM_START.y, CAM_DEEP.y, t);
            cam.position.z = lerp(CAM_START.z, CAM_DEEP.z, t);
            cam.lookAt(LOOK_AT);
            cam.updateProjectionMatrix();
          }
          /* ━━ Phase 3: HOLD / DRIFT (P.zoomEnd → P.holdEnd) ━━ */
          else if (p <= P.holdEnd) {
            immOverlay.style.opacity = '1';
            canvasToOverlay(rend, cam);
            if (aboutLeftEl) aboutLeftEl.style.opacity = '0';
            cam.fov = CAM_DEEP.fov;
            cam.position.y = CAM_DEEP.y;
            cam.position.z = CAM_DEEP.z;
            const drift = (p - P.zoomEnd) / (P.holdEnd - P.zoomEnd);
            cam.position.x = Math.sin(drift * Math.PI * 2) * 0.35;
            cam.lookAt(LOOK_AT);
            cam.updateProjectionMatrix();
          }
          /* ━━ Phase 4: ZOOM OUT (P.holdEnd → P.zoomOut) ━━ */
          else if (p <= P.zoomOut) {
            immOverlay.style.opacity = '1';
            canvasToOverlay(rend, cam);
            if (aboutLeftEl) aboutLeftEl.style.opacity = '0';
            const t = easeIO((p - P.holdEnd) / (P.zoomOut - P.holdEnd));
            cam.fov = lerp(CAM_DEEP.fov, CAM_START.fov, t);
            cam.position.x = lerp(0, CAM_START.x, t);
            cam.position.y = lerp(CAM_DEEP.y, CAM_START.y, t);
            cam.position.z = lerp(CAM_DEEP.z, CAM_START.z, t);
            cam.lookAt(LOOK_AT);
            cam.updateProjectionMatrix();
          }
          /* ━━ Phase 5: FADE OUT (P.zoomOut → 1.0) ━━ */
          else {
            /* Move canvas back FIRST while overlay still covers everything */
            canvasToContainer(rend, cam);
            cam.fov = CAM_START.fov;
            cam.position.set(CAM_START.x, CAM_START.y, CAM_START.z);
            cam.lookAt(LOOK_AT);
            cam.updateProjectionMatrix();
            const t = (p - P.zoomOut) / (1.0 - P.zoomOut);
            immOverlay.style.opacity = (1 - t);
            immOverlay.style.pointerEvents = t > 0.5 ? 'none' : 'auto';
            if (aboutRightEl) aboutRightEl.style.opacity = t;
            if (aboutLeftEl) {
              aboutLeftEl.style.borderRadius = lerp(0, 24, t) + 'px';
              aboutLeftEl.style.boxShadow = '';
              aboutLeftEl.style.opacity = t;
            }
          }
        },
        onLeave: resetAll,
        onLeaveBack: resetAll
      });
    }

    // Hyper Reality strip infinite scroll animation (replaces helix + ultra sections)
    const hyperStripInner = document.querySelector('.hyper-strip-inner');
    if (hyperStripInner) {
      const hyperTween = gsap.to(hyperStripInner, {
        xPercent: -50, duration: 22, ease: "none", repeat: -1
      });
      ScrollTrigger.create({
        trigger: '.hyper-strip',
        start: 'top bottom', end: 'bottom top',
        onUpdate: self => {
          const v = Math.abs(self.getVelocity());
          if (v > 200) {
            gsap.to(hyperTween, { timeScale: 1 + v * 0.001, duration: 0.4 });
          } else {
            gsap.to(hyperTween, { timeScale: 1, duration: 0.8 });
          }
        }
      });
    }

    // Hero glow
    const hl = document.querySelector('.hero-title .gmx-highlight');
    if (hl && !isMobile()) gsap.to(hl, { textShadow: "0 0 40px rgba(0,242,254,0.4),0 0 80px rgba(255,0,127,0.2)", duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // Footer reveal
    const ft = document.querySelector('.gmx-footer-premium');
    if (ft) {
      const fc = ft.querySelectorAll('.footer-col');
      if (fc.length) {
        gsap.fromTo(fc, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ft, start: "top 85%", once: true } });
        // Safety net: ensure footer columns become visible even if ScrollTrigger misses
        setTimeout(() => { fc.forEach(c => { if (parseFloat(getComputedStyle(c).opacity) < 0.5) gsap.to(c, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }); }); }, 5000);
      }
      // Footer parallax effect on ::before bg
      if (!isMobile()) {
        gsap.fromTo(ft, { backgroundPositionY: '0%' }, {
          backgroundPositionY: '100%', ease: "none",
          scrollTrigger: { trigger: ft, start: "top bottom", end: "bottom top", scrub: 1 }
        });
      }
    }



    // Form reveal
    const fs = document.querySelector('.application-form');
    if (fs) {
      const ftx = fs.querySelector('.form-text');
      const ffl = fs.querySelector('.form-fields');
      if (ftx) gsap.fromTo(ftx, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: fs, start: "top 70%", once: true } });
      if (ffl) gsap.fromTo(ffl, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.2, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: fs, start: "top 70%", once: true } });
    }

    // Floating CTA
    const cta = document.getElementById('floating-cta');
    if (cta) {
      ScrollTrigger.create({
        trigger: '.pure-hero', start: "bottom 80%",
        endTrigger: '.application-form', end: "top 90%",
        onEnter: () => cta.classList.add('is-visible'), onLeave: () => cta.classList.remove('is-visible'),
        onEnterBack: () => cta.classList.add('is-visible'), onLeaveBack: () => cta.classList.remove('is-visible')
      });
      const cl = cta.querySelector('.scroll-link');
      if (cl) cl.addEventListener('click', (e) => {
        e.preventDefault(); playClick();
        const t = document.querySelector(cl.getAttribute('href'));
        if (t && lenis) lenis.scrollTo(t.getBoundingClientRect().top + window.scrollY - 80, { duration: 1.5, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      });
    }

    // ─── FORM SECTION: hide ALL fixed overlays when form is visible ───
    const formSection = document.querySelector('.application-form');
    if (formSection) {
      // Collect ALL fixed elements that could block form clicks
      function getFixedBlockers() {
        const blockers = [];
        document.querySelectorAll('*').forEach(el => {
          if (formSection.contains(el)) return; // skip form's own children
          const cs = window.getComputedStyle(el);
          if (cs.position === 'fixed' && cs.display !== 'none' && cs.pointerEvents !== 'none') {
            const r = el.getBoundingClientRect();
            if (r.width > 30 && r.height > 30) blockers.push(el);
          }
        });
        return blockers;
      }

      let formVisible = false;
      const formObs = new IntersectionObserver((entries) => {
        const vis = entries[0].isIntersecting;
        if (vis === formVisible) return;
        formVisible = vis;
        const blockers = getFixedBlockers();
        blockers.forEach(el => {
          // Don't hide the header
          if (el.classList.contains('gmx-header')) return;
          if (vis) {
            el.dataset.gmxPe = el.style.pointerEvents || '';
            el.style.pointerEvents = 'none';
          } else {
            el.style.pointerEvents = el.dataset.gmxPe || '';
            delete el.dataset.gmxPe;
          }
        });
      }, { threshold: 0.05 });
      formObs.observe(formSection);
    }

    // Social proof reveal
    const sp = document.querySelector('.gmx-social-proof');
    if (sp) {
      const sl = sp.querySelector('.social-proof-label');
      const cl2 = sp.querySelector('.client-logos');
      const tc = sp.querySelector('.testimonial-card');
      if (sl) gsap.fromTo(sl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sp, start: "top 80%", once: true } });
      if (cl2) gsap.fromTo(cl2, { opacity: 0, y: 30 }, { opacity: 0.4, y: 0, duration: 1.0, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: sp, start: "top 75%", once: true } });
      if (tc) gsap.fromTo(tc, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.4, ease: "power3.out", scrollTrigger: { trigger: sp, start: "top 70%", once: true } });
    }

    // Trajetória — zigzag timeline with SVG path
    const trajSection = document.querySelector('.traj');
    if (trajSection) {
      // Header reveal
      const trajHeader = trajSection.querySelector('.traj-header');
      if (trajHeader) {
        gsap.fromTo(trajHeader, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: trajSection, start: 'top 70%', once: true }
        });
      }

      (function initTrajetoria() {
        const items = gsap.utils.toArray('.traj-item');
        const svg = document.getElementById('traj-svg');
        const pathEl = document.getElementById('traj-path');
        const glowEl = document.getElementById('traj-glow');
        const hintEl = document.getElementById('traj-hint');
        const coreEl = document.getElementById('traj-core');
        const travellerDot = document.getElementById('traj-traveller');
        const travellerGlow = document.getElementById('traj-traveller-glow');
        const timeline = document.querySelector('.traj-timeline');

        if (!items.length || !trajSection) return;

        let pathLength = 0;

        /* ========== INJECT CORNER CUT ========== */
        items.forEach((item) => {
          const card = item.querySelector('.traj-card');
          if (!card) return;
          const corner = document.createElement('span');
          corner.className = 'traj-card-corner';
          card.appendChild(corner);
        });

        /* ========== BUILD PATH ========== */
        function buildPath() {
          if (!svg || !pathEl || !timeline || window.innerWidth <= 900) return 0;

          const saved = items.map(item => item.getAttribute('style') || '');
          items.forEach(item => {
            item.style.setProperty('transform', 'none', 'important');
            item.style.setProperty('opacity', '1', 'important');
          });
          timeline.offsetHeight;

          const timelineRect = timeline.getBoundingClientRect();
          const centerX = timelineRect.width / 2;
          const h = timeline.scrollHeight;

          svg.setAttribute('width', timelineRect.width);
          svg.setAttribute('height', h);
          svg.setAttribute('viewBox', `0 0 ${timelineRect.width} ${h}`);
          svg.style.width = timelineRect.width + 'px';
          svg.style.height = h + 'px';

          const nodes = [];
          items.forEach((item) => {
            const node = item.querySelector('.traj-node');
            if (!node) return;
            const nr = node.getBoundingClientRect();
            nodes.push({
              x: nr.left + nr.width / 2 - timelineRect.left,
              y: nr.top + nr.height / 2 - timelineRect.top,
            });
          });
          const closerNode = timeline.querySelector('.traj-closer-node');
          if (closerNode) {
            const cnr = closerNode.getBoundingClientRect();
            nodes.push({
              x: cnr.left + cnr.width / 2 - timelineRect.left,
              y: cnr.top + cnr.height / 2 - timelineRect.top,
            });
          }

          items.forEach((item, i) => {
            if (saved[i]) item.setAttribute('style', saved[i]);
            else item.removeAttribute('style');
          });

          if (nodes.length < 2) return 0;

          let d = `M ${nodes[0].x} ${nodes[0].y}`;

          for (let i = 0; i < nodes.length - 1; i++) {
            const curr = nodes[i];
            const next = nodes[i + 1];
            const gap = next.y - curr.y;

            /* Wider bezier arcs — push control points further apart vertically
               to flow around taller fullbleed cards */
            const mid1Y = curr.y + gap * 0.25;
            const midCY = curr.y + gap * 0.5;
            d += ` C ${curr.x} ${mid1Y}, ${centerX} ${mid1Y}, ${centerX} ${midCY}`;
            const mid2Y = curr.y + gap * 0.75;
            d += ` C ${centerX} ${mid2Y}, ${next.x} ${mid2Y}, ${next.x} ${next.y}`;
          }

          [pathEl, glowEl, hintEl, coreEl].forEach((el) => {
            if (el) el.setAttribute('d', d);
          });

          const len = pathEl.getTotalLength();

          [pathEl, glowEl, coreEl].forEach((el) => {
            if (el) {
              el.style.strokeDasharray = len;
              el.style.strokeDashoffset = len;
            }
          });

          return len;
        }

        let scrollDrawReady = false;
        function initPath() {
          pathLength = buildPath();
          if (pathLength && !scrollDrawReady) {
            scrollDrawReady = true;
            setupScrollDraw();
          }
          if (pathLength) ScrollTrigger.refresh();
        }
        document.fonts.ready.then(() => setTimeout(initPath, 300));
        window.addEventListener('load', () => setTimeout(initPath, 800));

        /* ========== SCROLL-DRIVEN PATH DRAW + TRAVELLER ========== */
        let drawProgress = 0;
        function setupScrollDraw() {
          if (pathLength && pathEl) {
            gsap.timeline({
              scrollTrigger: {
                trigger: timeline,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 0.3,
                onUpdate: (self) => { drawProgress = self.progress; },
              },
            }).to([pathEl, glowEl, coreEl].filter(Boolean), {
              strokeDashoffset: 0,
              ease: 'none',
              duration: 1,
            }, 0);
          }

          if (pathEl && travellerDot && travellerGlow && pathLength) {
            function updateTraveller() {
              if (drawProgress > 0.005 && drawProgress < 0.995) {
                const pt = pathEl.getPointAtLength(drawProgress * pathLength);
                travellerDot.setAttribute('cx', pt.x);
                travellerDot.setAttribute('cy', pt.y);
                travellerDot.setAttribute('opacity', '1');
                travellerGlow.setAttribute('cx', pt.x);
                travellerGlow.setAttribute('cy', pt.y);
                travellerGlow.setAttribute('opacity', '.6');
              } else {
                travellerDot.setAttribute('opacity', '0');
                travellerGlow.setAttribute('opacity', '0');
              }
              requestAnimationFrame(updateTraveller);
            }
            updateTraveller();
          }
        }

        /* ========== CARD REVEAL ========== */
        items.forEach((item) => {
          const card = item.querySelector('.traj-card');
          const node = item.querySelector('.traj-node span');
          const isLeft = item.classList.contains('traj-item--left');

          gsap.fromTo(item,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0,
              duration: 1, ease: 'power2.out',
              scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            }
          );

          if (card) {
            const tagEl = card.querySelector('.traj-card-tag');
            const yearEl = card.querySelector('.traj-card-year');
            const titleEl = card.querySelector('.traj-card-title');
            const logoEl = card.querySelector('.traj-card-bg');
            const bodyEls = card.querySelectorAll('.traj-card-text, .traj-card-quote');
            const ctaEl = card.querySelector('.traj-card-cta');

            if (tagEl) gsap.set(tagEl, { opacity: 0, x: -12 });
            if (yearEl) gsap.set(yearEl, { opacity: 0, y: 10 });
            if (titleEl) gsap.set(titleEl, { clipPath: isLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' });
            if (logoEl) gsap.set(logoEl, { opacity: 0, scale: 0.85 });
            if (bodyEls.length) gsap.set(bodyEls, { opacity: 0, y: 14 });
            if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 8 });

            ScrollTrigger.create({
              trigger: item,
              start: 'top 80%',
              once: true,
              onEnter: () => {
                item.classList.add('is-active');

                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                if (tagEl) tl.to(tagEl, { opacity: 1, x: 0, duration: 0.4 }, 0);
                if (yearEl) tl.to(yearEl, { opacity: 1, y: 0, duration: 0.5 }, 0.08);
                if (titleEl) tl.to(titleEl, { clipPath: 'inset(0 0% 0 0%)', duration: 0.6 }, 0.2);
                if (logoEl) tl.to(logoEl, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, 0.15);
                if (bodyEls.length) {
                  tl.to(bodyEls, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.35);
                }
                if (ctaEl) tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.4 }, 0.55);
              },
            });
          }

          if (node) {
            gsap.fromTo(node, { scale: 0 }, {
              scale: 1, duration: 0.5, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: item, start: 'top 82%', once: true },
            });
          }
        });

        /* ========== CLOSING NODE ANIMATION ========== */
        const closer = document.querySelector('.traj-closer');
        if (closer) {
          gsap.fromTo(closer,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out',
              scrollTrigger: { trigger: closer, start: 'top 85%', once: true } }
          );
        }

        /* ========== RESIZE ========== */
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            pathLength = buildPath();
            ScrollTrigger.refresh();
          }, 250);
        });
      })();
    }

    // 3D Setups
    setupHero3D();
    if (ENABLE_ABOUT_CUBE) setupCube3D();
    // Lazy-load About sphere: only init when section nears viewport
    if (ENABLE_ABOUT_CUBE_LITE && !ENABLE_ABOUT_CUBE) {
      const aboutEl = document.querySelector('.about-gmx');
      if (aboutEl) {
        const aboutObs = new IntersectionObserver((entries, obs) => {
          if (entries[0].isIntersecting) { obs.disconnect(); setupAboutCubeLite(); }
        }, { rootMargin: '400px 0px' });
        aboutObs.observe(aboutEl);
      } else { setupAboutCubeLite(); }
    }
    // setupHelix3D();          // Replaced with hyper-strip banner
    // setupUltraRealSection(); // Section removed
    setupFormAndNav();
    setupHeroVisibility();
    setupScrollFriction();
    setupHamburgerMenu();
    setupTestimonialsCarousel();
    setupSocialProofFallback();
    setupSectionIndicator();

  // =====================================================
  // SECTION INDICATOR (side nav dots)
  // =====================================================
  function setupSectionIndicator() {
    const indicator = document.getElementById('section-indicator');
    if (!indicator) return;
    const dots = indicator.querySelectorAll('.si-dot');
    if (!dots.length) return;

    // Show indicator after hero
    ScrollTrigger.create({
      trigger: '.pure-hero', start: 'bottom 60%',
      endTrigger: '.application-form', end: 'top 90%',
      onEnter: () => indicator.classList.add('is-visible'),
      onLeave: () => indicator.classList.remove('is-visible'),
      onEnterBack: () => indicator.classList.add('is-visible'),
      onLeaveBack: () => indicator.classList.remove('is-visible')
    });

    // Track active section
    const sectionIds = Array.from(dots).map(d => d.dataset.section);
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el, start: 'top center', end: 'bottom center',
        onEnter: () => activateDot(id),
        onEnterBack: () => activateDot(id)
      });
    });

    function activateDot(id) {
      dots.forEach(d => d.classList.toggle('active', d.dataset.section === id));
    }

    // Click to scroll
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        playClick();
        const target = document.getElementById(dot.dataset.section);
        if (target && lenis) {
          lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - 80, {
            duration: 1.5, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      });
    });
  }
  }

  // Scroll Friction
  function setupScrollFriction() {
    // Helix and Ultra Real sections removed — scroll friction no longer needed for those
    // Immersive overlay handles its own scroll behavior
  }

  // Hero visibility
  let setHeroActive = null;
  function setupHeroVisibility() {
    const u = document.getElementById('hero-universe'); if (!u) return;
    const update = (scrollValue) => {
      const y = typeof scrollValue === 'number' ? scrollValue : currentScrollY;
      const off = y > window.innerHeight * 1.05;
      u.classList.toggle('is-off', off);
      if (typeof setHeroActive === 'function') setHeroActive(!off);
    };
    syncHeroVisibility = update;
    update(typeof lenis?.scroll === 'number' ? lenis.scroll : (window.scrollY || 0));
    window.addEventListener('resize', () => update(currentScrollY), { passive: true });
  }

  // =====================================================
  // HERO BACKGROUND VIDEO (substitui o WebGL 3D anterior)
  // =====================================================
  function setupHero3D() {
    if (document.querySelector('.hero-cinematic, .hero-shader, .hero-3dnarrative')) return;
    const video = document.getElementById('hero-bg-video');
    if (!video) return;

    const tryPlay = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener('loadeddata', tryPlay, { once: true });

    const unlock = () => { tryPlay(); window.removeEventListener('pointerdown', unlock); window.removeEventListener('touchstart', unlock); window.removeEventListener('keydown', unlock); };
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });

    setHeroActive = (active) => {
      if (active) { tryPlay(); }
      else { try { video.pause(); } catch (e) {} }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { try { video.pause(); } catch (e) {} }
      else if (isElementInView(document.querySelector('#inicio'), 80)) tryPlay();
    }, { passive: true });
  }

  // =====================================================
  // PREMIUM 3D — RUBIK'S CUBES INTERATIVOS (About Section)
  // Vários cubos mágicos coloridos que reagem ao mouse
  // =====================================================
  function setupCube3D() {
    const cont = document.getElementById('cube-container');
    if (!cont || typeof THREE === 'undefined') return;
    if (prefersReducedMotion) { cont.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(0,242,254,0.08), transparent 70%)'; return; }

    try {
    const mob = isMobile();
    const scene = new THREE.Scene();
    const cw = cont.clientWidth || 500, ch = cont.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(50, cw / ch, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mob, powerPreference: 'high-performance' });
    renderer.setSize(cw, ch);
    renderer.setPixelRatio(PIXEL_RATIO);
    renderer.setClearColor(0x030308, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = !mob;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    cont.appendChild(renderer.domElement);
    camera.position.set(0, 4, 10);
    camera.lookAt(0, 0, 0);

    const grp = new THREE.Group();
    scene.add(grp);

    /* ---- Environment Map for glossy reflections ---- */
    function createEnvMap() {
      const size = 256;
      const c = document.createElement('canvas');
      c.width = size * 2; c.height = size;
      const ctx = c.getContext('2d');
      const bg = ctx.createLinearGradient(0, 0, 0, size);
      bg.addColorStop(0, '#000308'); bg.addColorStop(0.4, '#0a1828');
      bg.addColorStop(0.5, '#1a5878'); bg.addColorStop(0.6, '#0a1020');
      bg.addColorStop(1, '#020106');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, size * 2, size);
      function glow(x, y, r, col) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = g; ctx.fillRect(0, 0, size * 2, size);
      }
      glow(150, size * 0.47, 100, 'rgba(0,242,254,0.6)');
      glow(380, size * 0.50, 80, 'rgba(255,0,127,0.5)');
      glow(260, size * 0.45, 50, 'rgba(255,255,255,0.7)');
      ctx.globalCompositeOperation = 'source-over';
      const tex = new THREE.CanvasTexture(c);
      tex.mapping = THREE.EquirectangularReflectionMapping;
      return tex;
    }
    const rawEnv = createEnvMap();
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromEquirectangular(rawEnv).texture;
    rawEnv.dispose(); pmrem.dispose();
    scene.environment = envMap;

    /* ---- Lights ---- */
    scene.add(new THREE.AmbientLight(0x182030, 1.0));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 6);
    if (!mob) { keyLight.castShadow = true; keyLight.shadow.mapSize.set(512, 512); }
    scene.add(keyLight);
    const cyanPt = new THREE.PointLight(0x00f2fe, 2.0, 25);
    cyanPt.position.set(-5, 4, 5); scene.add(cyanPt);
    const pinkPt = new THREE.PointLight(0xff007f, 1.5, 20);
    pinkPt.position.set(5, 2, -4); scene.add(pinkPt);
    const purpPt = new THREE.PointLight(0x7b61ff, 1.0, 15);
    purpPt.position.set(-2, -3, 4); scene.add(purpPt);
    const rimLight = new THREE.PointLight(0x00f2fe, 0.8, 20);
    rimLight.position.set(0, -2, -8); scene.add(rimLight);

    /* ============================================================
       RUBIK'S CUBE BUILDER
       Each cube = 3x3x3 grid of mini-cubes (cubies) with
       colored faces in dark/neon aesthetic matching the site
       ============================================================ */

    /* Helper: Gera material dos cubies individuais — dark premium aesthetic */
    function makeCubieMaterials(colorSet) {
      /* Six faces: +x, -x, +y, -y, +z, -z */
      return colorSet.map(c => {
        const isGlow = c > 0x200000; // bright color vs dark
        return new THREE.MeshPhysicalMaterial({
          color: c,
          metalness: isGlow ? 0.35 : 0.8,
          roughness: isGlow ? 0.18 : 0.12,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMap,
          envMapIntensity: isGlow ? 1.2 : 1.8,
          emissive: new THREE.Color(c),
          emissiveIntensity: isGlow ? 0.15 : 0.02
        });
      });
    }

    /* Black separator material for inner gaps */
    const blackMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0a, metalness: 0.6, roughness: 0.3, envMap, envMapIntensity: 0.3
    });

    function buildRubiksCube(size, colorScheme) {
      const cubeGroup = new THREE.Group();
      const gap = 0.08; // gap between cubies
      const cubieSize = (size - gap * 2) / 3;
      const cubieGeo = new THREE.BoxGeometry(cubieSize * 0.95, cubieSize * 0.95, cubieSize * 0.95);

      /* RoundedBoxGeometry alternative: beveled edges via chamfer */
      /* We use regular box + slight scale for now */

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            /* Pick face colors: outer faces get color, inner get black */
            const faceColors = [];
            faceColors.push(x === 2 ? colorScheme[0] : 0x0a0a0a); // +x
            faceColors.push(x === 0 ? colorScheme[1] : 0x0a0a0a); // -x
            faceColors.push(y === 2 ? colorScheme[2] : 0x0a0a0a); // +y
            faceColors.push(y === 0 ? colorScheme[3] : 0x0a0a0a); // -y
            faceColors.push(z === 2 ? colorScheme[4] : 0x0a0a0a); // +z
            faceColors.push(z === 0 ? colorScheme[5] : 0x0a0a0a); // -z

            const mats = makeCubieMaterials(faceColors);
            const cubie = new THREE.Mesh(cubieGeo, mats);

            const offset = -(size / 2) + cubieSize / 2 + gap / 2;
            cubie.position.set(
              offset + x * (cubieSize + gap),
              offset + y * (cubieSize + gap),
              offset + z * (cubieSize + gap)
            );
            if (!mob) { cubie.castShadow = true; cubie.receiveShadow = true; }
            cubeGroup.add(cubie);
          }
        }
      }

      /* Black inner core visible through gaps */
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(size * 0.88, size * 0.88, size * 0.88),
        blackMat
      );
      cubeGroup.add(core);

      return cubeGroup;
    }

    /* ============================================================
       CREATE MULTIPLE RUBIK'S CUBES
       ============================================================ */
    const cubeCount = mob ? 7 : 13;
    const rubiksCubes = [];

    /* Color schemes — dark aesthetic matching site palette:
       cyan (#00f2fe), pink (#ff007f), purple (#7b61ff),
       dark chrome, deep blue, white accent */
    const schemes = [
      [0x00f2fe, 0x0a1a2a, 0x7b61ff, 0x0d0d18, 0xff007f, 0x111820], // GMX Core
      [0x0d1520, 0xff007f, 0x0a0a14, 0x00f2fe, 0x151525, 0x7b61ff], // Dark Pink
      [0x7b61ff, 0x0a1218, 0x00f2fe, 0x12081a, 0x0d1a28, 0xff007f], // Purple Lead
      [0x00f2fe, 0x0d0d1a, 0xff007f, 0x0a1520, 0x7b61ff, 0x0a0a12], // Cyan+Pink
      [0x0a1828, 0x00f2fe, 0x0d0d15, 0x7b61ff, 0xff007f, 0x101828], // Deep Cyber
      [0xff007f, 0x7b61ff, 0x0d1218, 0x00f2fe, 0x0a0a14, 0x151525], // Magenta Lead
      [0x0d1a28, 0x00f2fe, 0xff007f, 0x0a0a14, 0x7b61ff, 0x101820], // Dark Ocean
      [0x7b61ff, 0xff007f, 0x00f2fe, 0x0d0d18, 0x0a1520, 0x151525], // Tri-Neon
      [0x00f2fe, 0x7b61ff, 0x0a0a14, 0xff007f, 0x0d1a28, 0x101820], // Ice
      [0x0a1218, 0xff007f, 0x7b61ff, 0x00f2fe, 0x0d0d18, 0x0a1a2a], // Void Glow
      [0xff007f, 0x0a0a14, 0x00f2fe, 0x7b61ff, 0x101828, 0x0d1520], // Neon Dark
      [0x7b61ff, 0x00f2fe, 0x0d0d15, 0xff007f, 0x0a1828, 0x151525], // Aurora
      [0x00f2fe, 0xff007f, 0x7b61ff, 0x0a0a14, 0x0d1a28, 0x101820]  // Full GMX
    ];

    /* Spatial arrangement: scattered around the scene */
    const positions = mob
      ? [
          { x: 0, y: 0, z: 0, s: 1.5 },
          { x: -2.6, y: 1.8, z: -1.5, s: 0.85 },
          { x: 2.3, y: -1.3, z: -1, s: 0.9 },
          { x: -1.5, y: -2, z: 1, s: 0.65 },
          { x: 2, y: 2.2, z: -2, s: 0.7 },
          { x: -3.0, y: -0.5, z: -0.5, s: 0.55 },
          { x: 1.2, y: 3.0, z: -1.5, s: 0.5 }
        ]
      : [
          { x: 0, y: 0.3, z: 0, s: 1.4 },       // Center (hero)
          { x: -3.5, y: 2.2, z: -2, s: 0.95 },
          { x: 3.2, y: -1.5, z: -1.5, s: 1.0 },
          { x: -2.5, y: -2.3, z: 1, s: 0.75 },
          { x: 2.8, y: 2.8, z: -2.5, s: 0.85 },
          { x: -4.0, y: -0.5, z: -3, s: 0.65 },
          { x: 4.2, y: 0.8, z: -1, s: 0.70 },
          { x: -1.2, y: 3.5, z: -1, s: 0.55 },
          { x: 1.5, y: -3.2, z: -2, s: 0.60 },
          { x: -4.8, y: 1.5, z: -1.5, s: 0.50 },  // New
          { x: 4.8, y: -2.5, z: -2.5, s: 0.55 },  // New
          { x: 0.5, y: 4.0, z: -3, s: 0.45 },     // New
          { x: -2.0, y: -3.8, z: -1.5, s: 0.50 }   // New
        ];

    for (let i = 0; i < cubeCount; i++) {
      const p = positions[i];
      const scheme = schemes[i % schemes.length];
      const rubiksSize = 1.5 * p.s;
      const cube = buildRubiksCube(rubiksSize, scheme);
      cube.position.set(p.x, p.y, p.z);
      /* Random initial rotation for variety */
      cube.rotation.set(
        Math.random() * Math.PI * 0.3,
        Math.random() * Math.PI * 0.5,
        Math.random() * Math.PI * 0.2
      );
      grp.add(cube);

      rubiksCubes.push({
        group: cube,
        basePos: new THREE.Vector3(p.x, p.y, p.z),
        size: rubiksSize,
        rotSpeed: { x: 0.002 + Math.random() * 0.004, y: 0.003 + Math.random() * 0.005, z: 0.001 + Math.random() * 0.003 },
        floatPhase: Math.random() * Math.PI * 2,
        floatAmp: 0.15 + Math.random() * 0.25,
        floatSpeed: 0.3 + Math.random() * 0.4,
        /* Mouse interaction state */
        pushVel: new THREE.Vector3(0, 0, 0),
        spinVel: new THREE.Vector3(0, 0, 0),
        scatterRot: new THREE.Vector3(0, 0, 0)
      });
    }

    /* ============================================================
       FLOATING PARTICLES for atmosphere
       ============================================================ */
    const pCount = scaledCount(mob ? 50 : 120);
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const pSeeds = new Float32Array(pCount * 3);
    const palette = [new THREE.Color(0x00f2fe), new THREE.Color(0xff007f), new THREE.Color(0x7b61ff), new THREE.Color(0xffdd00), new THREE.Color(0xffffff)];
    for (let i = 0; i < pCount; i++) {
      pPositions[i*3] = (Math.random()-0.5)*14;
      pPositions[i*3+1] = (Math.random()-0.5)*10;
      pPositions[i*3+2] = (Math.random()-0.5)*10 - 2;
      pSeeds[i*3] = Math.random()*Math.PI*2;
      pSeeds[i*3+1] = 0.3 + Math.random()*0.8;
      pSeeds[i*3+2] = Math.random()*Math.PI*2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i*3] = c.r; pColors[i*3+1] = c.g; pColors[i*3+2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({
      size: mob ? 0.06 : 0.08, transparent: true, opacity: 0.6, vertexColors: true,
      map: getCircleTexture(), alphaTest: 0.05, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    grp.add(new THREE.Points(pGeo, pMat));

    /* ============================================================
       RAYCASTER for mouse interaction
       ============================================================ */
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-99, -99);
    const mouse3D = new THREE.Vector3(0, 0, 0);
    let mouseInside = false;

    /* ---- Hover state ---- */
    let hov = false, hovSmooth = 0;
    const hitbox = cont.parentElement;
    if (hitbox) {
      hitbox.addEventListener('mouseenter', () => {
        hov = true; mouseInside = true;
        if (gmxCursor && !mob) { gmxCursor.classList.add('grow'); cursorText.innerText = 'EXPLORE'; playHover(); }
      });
      hitbox.addEventListener('mouseleave', () => {
        hov = false; mouseInside = false;
        mouseNDC.set(-99, -99);
        if (gmxCursor && !mob) { gmxCursor.classList.remove('grow'); cursorText.innerText = ''; }
      });
      hitbox.addEventListener('mousemove', (e) => {
        const r = cont.getBoundingClientRect();
        mouseNDC.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouseNDC.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        /* Project mouse to 3D space on z=0 plane */
        raycaster.setFromCamera(mouseNDC, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        raycaster.ray.intersectPlane(plane, mouse3D);
      });
    }

    renderer.render(scene, camera);

    /* Expose camera for immersive scroll-lock */
    cont._chromeCamera = camera;
    cont._chromeRenderer = renderer;
    cont._chromeScene = scene;

    /* ---- Animation loop ---- */
    let raf = 0, act = false;
    const startC = () => { if (act) return; act = true; raf = requestAnimationFrame(animC); };
    const stopC = () => { act = false; if (raf) cancelAnimationFrame(raf); raf = 0; };
    let lastFrameC = 0;

    function animC(now) {
      if (!act) return;
      raf = requestAnimationFrame(animC);
      if (!now) now = performance.now();
      if (now - lastFrameC < getAdaptiveFrameBudget(60, 38)) return;
      lastFrameC = now;

      const t = now * 0.001;
      hovSmooth += ((hov ? 1.0 : 0.0) - hovSmooth) * 0.06;

      /* ---- Update each Rubik's cube ---- */
      for (let i = 0; i < rubiksCubes.length; i++) {
        const rc = rubiksCubes[i];
        const cube = rc.group;

        /* Floating bob */
        const floatY = Math.sin(t * rc.floatSpeed + rc.floatPhase) * rc.floatAmp;

        /* Mouse repulsion / attraction */
        if (mouseInside && !mob) {
          const dx = cube.position.x - mouse3D.x;
          const dy = cube.position.y - mouse3D.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = 3.5; // radius of mouse influence

          if (dist < influence) {
            const force = (1 - dist / influence);
            const angle = Math.atan2(dy, dx);

            /* Push away from cursor */
            rc.pushVel.x += Math.cos(angle) * force * 0.08;
            rc.pushVel.y += Math.sin(angle) * force * 0.08;

            /* Spin faster when mouse is near */
            rc.spinVel.x += force * 0.04 * (dx > 0 ? 1 : -1);
            rc.spinVel.y += force * 0.05 * (dy > 0 ? 1 : -1);
            rc.spinVel.z += force * 0.02;

            /* Individual cubies scatter slightly on hover (only center cube) */
            if (i === 0 && dist < 2.0) {
              cube.children.forEach((child, ci) => {
                if (child.isMesh && child.geometry.type === 'BoxGeometry' && ci < 27) {
                  const scatter = (1 - dist / 2.0) * 0.12 * hovSmooth;
                  const dir = child.position.clone().normalize();
                  child.position.lerp(
                    child.position.clone().add(dir.multiplyScalar(scatter)),
                    0.08
                  );
                }
              });
            }
          }
        }

        /* Apply velocities with damping */
        cube.position.x += rc.pushVel.x;
        cube.position.y += rc.pushVel.y;
        rc.pushVel.multiplyScalar(0.92); // friction

        /* Spring back to base position */
        cube.position.x += (rc.basePos.x - cube.position.x) * 0.03;
        cube.position.y += (rc.basePos.y + floatY - cube.position.y) * 0.03;
        cube.position.z += (rc.basePos.z - cube.position.z) * 0.03;

        /* Rotation: idle spin + mouse-driven spin */
        cube.rotation.x += rc.rotSpeed.x + rc.spinVel.x;
        cube.rotation.y += rc.rotSpeed.y + rc.spinVel.y;
        cube.rotation.z += rc.rotSpeed.z + rc.spinVel.z;
        rc.spinVel.multiplyScalar(0.95); // spin damping

        /* Reassemble scattered cubies (center cube) */
        if (i === 0 && (!mouseInside || hovSmooth < 0.3)) {
          const cubieSize = (rc.size * 0.95) / 3;
          const gap = 0.08;
          let ci = 0;
          for (let x = 0; x < 3 && ci < cube.children.length; x++) {
            for (let y = 0; y < 3; y++) {
              for (let z = 0; z < 3; z++) {
                const child = cube.children[ci];
                if (child && child.isMesh && child.geometry.type === 'BoxGeometry' && ci < 27) {
                  const offset = -(rc.size / 2) + cubieSize / 2 + gap / 2;
                  const target = new THREE.Vector3(
                    offset + x * (cubieSize + gap),
                    offset + y * (cubieSize + gap),
                    offset + z * (cubieSize + gap)
                  );
                  child.position.lerp(target, 0.04);
                }
                ci++;
              }
            }
          }
        }
      }

      /* ---- Particles ---- */
      const pa = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        const ph = pSeeds[i*3], spd = pSeeds[i*3+1];
        pa[i*3] += Math.sin(t * 0.3 + ph) * 0.003;
        pa[i*3+1] += Math.cos(t * 0.25 + ph) * 0.003;
        pa[i*3+2] += 0.005 * spd;
        if (pa[i*3+2] > 5) pa[i*3+2] = -8;
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.opacity = 0.4 + hovSmooth * 0.35;

      /* ---- Lights subtle movement ---- */
      cyanPt.intensity = 2.0 + Math.sin(t * 1.1) * 0.3 + hovSmooth * 0.8;
      pinkPt.intensity = 1.5 + Math.cos(t * 0.9) * 0.25 + hovSmooth * 0.6;
      cyanPt.position.x = -5 + Math.sin(t * 0.2) * 1.5;
      pinkPt.position.x = 5 + Math.cos(t * 0.25) * 1.5;

      /* ---- Camera subtle parallax ---- */
      if (!mob) {
        grp.rotation.y += (normX * 0.12 - grp.rotation.y) * 0.04;
        grp.rotation.x += (normY * 0.06 - grp.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    }

    createVisibilityObserver(cont.closest('section') || cont, {
      rootMargin: '200px',
      onEnter: startC,
      onExit: () => {
        const inOverlay = renderer.domElement.parentElement && renderer.domElement.parentElement.id === 'immersive-3d-overlay';
        if (!inOverlay) stopC();
      }
    });
    setTimeout(() => { if (!act && isElementInView(cont, -200)) startC(); }, 500);
    window.addEventListener('resize', () => {
      const inOverlay = renderer.domElement.parentElement && renderer.domElement.parentElement.id === 'immersive-3d-overlay';
      const w = inOverlay ? window.innerWidth : cont.clientWidth;
      const h = inOverlay ? window.innerHeight : cont.clientHeight;
      if (w > 0 && h > 0) { renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopC(); else if (isElementInView(cont, 80)) startC();
    }, { passive: true });

    } catch (e) {
      console.error('GMX Rubiks 3D error:', e);
      cont.style.background = 'radial-gradient(ellipse at 30% 40%, rgba(0,242,254,0.12) 0%, rgba(255,0,127,0.06) 50%, transparent 80%)';
    }
  }

  // =====================================================
  // ABOUT — ELITE MORPHING GEOMETRIC SPHERE (dark metallic + blue/pink)
  // Inspired by high-end Three.js showcases
  // =====================================================
  function setupAboutCubeLite() {
    const cont = document.getElementById('cube-container');
    if (!cont || typeof THREE === 'undefined') return;
    if (prefersReducedMotion) {
      cont.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(0,242,254,0.14), rgba(255,0,127,0.08) 55%, transparent 80%)';
      return;
    }

    try {
      cont.innerHTML = '';
      const mob = isMobile();

      // --- SCENE ---
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x020206, 0.05);

      const cw = cont.clientWidth || 500;
      const ch = cont.clientHeight || 500;
      const camera = new THREE.PerspectiveCamera(42, cw / ch, 0.1, 100);
      camera.position.set(0, 0, 5.5);
      camera.lookAt(0, 0, 0);

      // --- RENDERER (opaque dark bg) ---
      const renderer = new THREE.WebGLRenderer({
        alpha: false, antialias: !mob,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(PIXEL_RATIO, mob ? 1.2 : 1.5));
      renderer.setSize(cw, ch);
      renderer.setClearColor(0x030308, 1);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;';
      cont.appendChild(renderer.domElement);

      // --- ENV MAP (studio lighting) ---
      function buildEnvMap() {
        const size = 256;
        const c = document.createElement('canvas');
        c.width = size * 2; c.height = size;
        const ctx = c.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 0, size);
        g.addColorStop(0, '#020206');
        g.addColorStop(0.3, '#0a1525');
        g.addColorStop(0.5, '#1a2a40');
        g.addColorStop(0.7, '#0a1020');
        g.addColorStop(1, '#020206');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, c.width, c.height);
        const glow = (x, y, r, col) => {
          const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
          rg.addColorStop(0, col);
          rg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = rg;
          ctx.fillRect(0, 0, c.width, c.height);
        };
        glow(80, size * 0.35, 150, 'rgba(0,242,254,0.42)');
        glow(440, size * 0.65, 130, 'rgba(255,0,127,0.35)');
        glow(256, size * 0.50, 90, 'rgba(200,220,255,0.6)');
        ctx.globalCompositeOperation = 'source-over';
        return new THREE.CanvasTexture(c);
      }

      const rawEnv = buildEnvMap();
      rawEnv.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      const envMap = pmrem.fromEquirectangular(rawEnv).texture;
      rawEnv.dispose(); pmrem.dispose();
      scene.environment = envMap;

      // --- LIGHTS ---
      scene.add(new THREE.AmbientLight(0x303848, 0.4));
      const blueKey = new THREE.PointLight(0x00f2fe, 4.0, 20);
      blueKey.position.set(-3.5, 2.5, 4);
      scene.add(blueKey);
      const pinkKey = new THREE.PointLight(0xff007f, 3.0, 18);
      pinkKey.position.set(3.8, -2.0, 3.5);
      scene.add(pinkKey);
      const blueRim = new THREE.PointLight(0x0088ff, 1.5, 12);
      blueRim.position.set(-1, -2, 5);
      scene.add(blueRim);
      const topLight = new THREE.DirectionalLight(0xd0e0ff, 0.6);
      topLight.position.set(0, 4, 3);
      scene.add(topLight);

      // --- MAIN GROUP ---
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // === CORE SPHERE (dark metallic icosahedron) ===
      const icoDetail = mob ? 3 : 4;
      const coreGeo = new THREE.IcosahedronGeometry(1.45, icoDetail);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x080810,
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        envMap,
        envMapIntensity: 1.8,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      mainGroup.add(coreMesh);

      // Store original positions for vertex displacement
      const coreOrigPos = new Float32Array(coreGeo.attributes.position.array);
      const vertCount = coreOrigPos.length / 3;

      // === WIREFRAME OVERLAY (glowing edges) ===
      const wireGeo = new THREE.IcosahedronGeometry(1.46, mob ? 2 : 3);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      mainGroup.add(wireMesh);

      // === INNER GLOW SPHERE (pink core) ===
      const innerGeo = new THREE.IcosahedronGeometry(0.75, 2);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xff007f,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      mainGroup.add(innerMesh);

      // === FLOATING TRIANGULAR SHARDS (orbit fragments) ===
      const shardCount = mob ? 14 : 24;
      const shards = [];
      for (let i = 0; i < shardCount; i++) {
        const s = Math.random() * 0.12 + 0.04;
        const geo = new THREE.TetrahedronGeometry(s, 0);
        const isBlue = i % 2 === 0;
        const mat = new THREE.MeshPhysicalMaterial({
          color: isBlue ? 0x0a0a14 : 0x100812,
          metalness: 0.92,
          roughness: 0.2,
          envMap,
          envMapIntensity: 2.0,
          emissive: new THREE.Color(isBlue ? 0x00f2fe : 0xff007f),
          emissiveIntensity: 0.15
        });
        const mesh = new THREE.Mesh(geo, mat);

        // Random orbit
        const orbitR = 1.8 + Math.random() * 1.4;
        const orbitSpeed = 0.08 + Math.random() * 0.18;
        const orbitPhase = Math.random() * Math.PI * 2;
        const orbitTilt = (Math.random() - 0.5) * Math.PI * 0.8;
        const orbitY = (Math.random() - 0.5) * 0.6;

        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mainGroup.add(mesh);
        shards.push({
          mesh, mat, orbitR, orbitSpeed, orbitPhase, orbitTilt, orbitY,
          spinX: 0.01 + Math.random() * 0.03,
          spinY: 0.015 + Math.random() * 0.03
        });
      }

      // === PARTICLE RING (orbit particles) ===
      const pCount = mob ? 80 : 160;
      const pPositions = new Float32Array(pCount * 3);
      const pBase = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        const a = Math.random() * Math.PI * 2;
        const r = 1.6 + Math.random() * 2.0;
        const h = (Math.random() - 0.5) * 2.4;
        pBase[i3] = Math.cos(a) * r;
        pBase[i3 + 1] = h;
        pBase[i3 + 2] = Math.sin(a) * r;
      }
      pPositions.set(pBase);
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x88ccff, size: mob ? 0.025 : 0.035,
        transparent: true, opacity: 0.35,
        map: getCircleTexture(), alphaTest: 0.1,
        depthWrite: false, blending: THREE.AdditiveBlending
      });
      mainGroup.add(new THREE.Points(pGeo, pMat));

      // === DEEP STARFIELD ===
      const starCount = mob ? 120 : 250;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPos[i3] = (Math.random() - 0.5) * 24;
        starPos[i3 + 1] = (Math.random() - 0.5) * 16;
        starPos[i3 + 2] = -6 - Math.random() * 40;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xa0b8d0, size: mob ? 0.018 : 0.025,
        transparent: true, opacity: 0.25,
        map: getCircleTexture(), alphaTest: 0.1,
        depthWrite: false, blending: THREE.AdditiveBlending
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // --- MOUSE INTERACTION (smooth, contained) ---
      let mouseX = 0, mouseY = 0;
      let hover = 0, hoverTarget = 0;

      const hit = cont.parentElement || cont;
      hit.addEventListener('mouseenter', () => { hoverTarget = 1; });
      hit.addEventListener('mousemove', (e) => {
        hoverTarget = 1;
        const rect = hit.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      });
      hit.addEventListener('mouseleave', () => { hoverTarget = 0; });

      // --- RENDER LOOP ---
      let raf = 0, active = false, lastFrame = 0;
      const startLoop = () => { if (active) return; active = true; raf = requestAnimationFrame(loop); };
      const stopLoop = () => { active = false; if (raf) cancelAnimationFrame(raf); raf = 0; };

      function loop(now = performance.now()) {
        if (!active) return;
        raf = requestAnimationFrame(loop);
        if (now - lastFrame < getAdaptiveFrameBudget(60, 42)) return;
        lastFrame = now;

        const t = now * 0.001;
        hover += (hoverTarget - hover) * 0.06;

        // === SCROLL-REACTIVE SPHERE ===
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProg = scrollTotal > 0 ? Math.min(1, Math.max(0, currentScrollY / scrollTotal)) : 0;

        // === VERTEX DISPLACEMENT (organic morph — scroll-driven) ===
        const posArr = coreGeo.attributes.position.array;
        for (let i = 0; i < vertCount; i++) {
          const i3 = i * 3;
          const ox = coreOrigPos[i3];
          const oy = coreOrigPos[i3 + 1];
          const oz = coreOrigPos[i3 + 2];

          // Displacement intensifies with scroll progress
          const freq = 1.8 + scrollProg * 1.2;
          const amp = 0.06 + hover * 0.08 + scrollProg * 0.18;
          const n = Math.sin(ox * freq + t * 0.6) *
                    Math.cos(oy * freq + t * 0.45) *
                    Math.sin(oz * freq + t * 0.55);
          const d = 1 + n * amp;

          posArr[i3] = ox * d;
          posArr[i3 + 1] = oy * d;
          posArr[i3 + 2] = oz * d;
        }
        coreGeo.attributes.position.needsUpdate = true;
        coreGeo.computeVertexNormals();

        // Core color evolves: cold steel → deep purple as scroll increases
        const hue = 0.62 - scrollProg * 0.12;
        const sat = 0.25 + scrollProg * 0.35;
        const lgt = 0.04 + scrollProg * 0.02;
        coreMat.color.setHSL(hue, sat, lgt);
        coreMat.envMapIntensity = 1.8 + hover * 0.8 + scrollProg * 0.6;

        // Core rotation (slow auto + mouse follow, speeds up with scroll)
        const rotFactor = 1 + scrollProg * 1.8;
        const tRX = t * 0.15 * rotFactor + mouseY * 0.3 * hover;
        const tRY = t * 0.22 * rotFactor + mouseX * 0.4 * hover;
        coreMesh.rotation.x += (tRX - coreMesh.rotation.x) * 0.02;
        coreMesh.rotation.y += (tRY - coreMesh.rotation.y) * 0.02;
        wireMesh.rotation.copy(coreMesh.rotation);
        innerMesh.rotation.x = coreMesh.rotation.x * 0.6;
        innerMesh.rotation.y = coreMesh.rotation.y * 0.8 + t * 0.1;

        // Core materials react to hover + scroll
        coreMat.emissiveIntensity = hover * 0.08 + scrollProg * 0.06;
        coreMat.emissive.setHSL(0.85 - scrollProg * 0.2, 0.6, 0.15 * scrollProg);
        wireMat.opacity = 0.06 + hover * 0.12 + scrollProg * 0.1;
        innerMat.opacity = 0.04 + hover * 0.08 + scrollProg * 0.06;
        innerMesh.scale.setScalar(0.7 + Math.sin(t * 1.5) * 0.03 + hover * 0.1 + scrollProg * 0.15);

        // === SHARDS orbit ===
        for (let i = 0; i < shards.length; i++) {
          const s = shards[i];
          const angle = t * s.orbitSpeed + s.orbitPhase;
          s.mesh.position.set(
            Math.cos(angle) * s.orbitR,
            Math.sin(angle * 0.7 + s.orbitTilt) * s.orbitR * 0.3 + s.orbitY,
            Math.sin(angle) * s.orbitR * 0.7
          );
          s.mesh.rotation.x += s.spinX;
          s.mesh.rotation.y += s.spinY;
          s.mat.emissiveIntensity = 0.1 + hover * 0.25 + scrollProg * 0.3 + Math.sin(t * 2 + i) * 0.05;
        }

        // === PARTICLES drift ===
        const parr = pGeo.attributes.position.array;
        for (let i = 0; i < pCount; i++) {
          const i3 = i * 3;
          const rot = t * 0.08 + i * 0.04;
          parr[i3] = pBase[i3] * Math.cos(rot) - pBase[i3 + 2] * Math.sin(rot);
          parr[i3 + 1] = pBase[i3 + 1] + Math.sin(t * 0.5 + i * 0.1) * 0.04;
          parr[i3 + 2] = pBase[i3] * Math.sin(rot) + pBase[i3 + 2] * Math.cos(rot);
        }
        pGeo.attributes.position.needsUpdate = true;
        pMat.opacity = 0.28 + hover * 0.15 + scrollProg * 0.12;

        // === STARS drift ===
        const sa = starGeo.attributes.position.array;
        for (let i = 0; i < sa.length; i += 3) {
          sa[i + 2] += 0.008;
          if (sa[i + 2] > -4) sa[i + 2] = -42 - Math.random() * 8;
        }
        starGeo.attributes.position.needsUpdate = true;

        // Main group float
        mainGroup.position.y = Math.sin(t * 0.65) * 0.06;
        mainGroup.rotation.z = Math.sin(t * 0.3) * 0.01;

        // Lights pulse (intensify with scroll)
        blueKey.intensity = 3.8 + Math.sin(t * 0.8) * 0.4 + hover * 1.5 + scrollProg * 1.0;
        pinkKey.intensity = 2.8 + Math.cos(t * 0.7) * 0.3 + hover * 1.2 + scrollProg * 1.8;
        blueRim.intensity = 1.3 + hover * 0.6 + scrollProg * 0.8;

        // Camera subtle motion
        camera.position.x += (mouseX * 0.12 * hover - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 0.08 * hover - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      createVisibilityObserver(cont.closest('section') || cont, {
        rootMargin: '180px',
        onEnter: startLoop,
        onExit: stopLoop
      });
      setTimeout(() => { if (!active && isElementInView(cont, -180)) startLoop(); }, 250);

      window.addEventListener('resize', () => {
        const w = cont.clientWidth || 500;
        const h = cont.clientHeight || 500;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopLoop(); else if (isElementInView(cont, 50)) startLoop();
      }, { passive: true });
    } catch (e) {
      console.error('ABOUT 3D error:', e);
      cont.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(0,242,254,0.14), rgba(255,0,127,0.08) 55%, transparent 80%)';
    }
  }

  // Helix 3D & Ultra Real sections removed — code cleaned

  // =====================================================
  // FORM + NAV
  // =====================================================
  function setupFormAndNav() {
    // Prevent native form submit (we handle via JS)
    const gmxForm = document.getElementById('gmx-form');
    gmxForm?.addEventListener('submit', (e) => e.preventDefault());

    const submitBtn = document.getElementById('gmx-submit');
    const successOverlay = document.getElementById('form-success');
    const errorToast = document.getElementById('form-error-toast');
    let errorTimeout = null;

    function showFormError(msg) {
      if (!errorToast) return;
      const textEl = errorToast.querySelector('.toast-text');
      if (textEl && msg) textEl.textContent = msg;
      errorToast.classList.add('is-visible');
      // Shake fields that are empty
      ['gmx-nome', 'gmx-whats', 'gmx-mensagem'].forEach(id => {
        const inp = document.getElementById(id);
        const wrap = inp?.closest('.floating-input');
        if (inp && !inp.value.trim() && wrap) {
          wrap.classList.add('has-error');
          setTimeout(() => wrap.classList.remove('has-error'), 600);
        }
      });
      clearTimeout(errorTimeout);
      errorTimeout = setTimeout(() => errorToast.classList.remove('is-visible'), 3500);
    }

    // Google Sheets endpoint (Apps Script Web App URL)
    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzTRcvCyW_wtZh8Utn5Jc29RaDwTT1LvOHfJbTRCMed0wEkXCBjGRgKGwV-VFt-iMm7zA/exec';

    submitBtn?.addEventListener('click', (e) => {
      e.preventDefault(); playClick();
      const nome = document.getElementById('gmx-nome')?.value?.trim();
      const email = document.getElementById('gmx-email')?.value?.trim();
      const whats = document.getElementById('gmx-whats')?.value?.trim();
      const marca = document.getElementById('gmx-marca')?.value?.trim();
      const site = document.getElementById('gmx-site')?.value?.trim();
      const objetivo = document.getElementById('gmx-objetivo')?.value?.trim();
      const servico = document.getElementById('gmx-servico')?.value?.trim();
      const prazo = document.getElementById('gmx-prazo')?.value?.trim();
      const msg = document.getElementById('gmx-mensagem')?.value?.trim();
      if (!nome || !whats || !msg) {
        showFormError(window.__GMX_I18N&&window.__GMX_I18N.formError||'Preencha Nome, WhatsApp e Mensagem para continuar.');
        return;
      }

      // Save to Google Sheets
      if (SHEETS_URL && SHEETS_URL !== 'COLE_SUA_URL_AQUI') {
        fetch(SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, whats, marca, site, objetivo, servico, prazo, mensagem: msg })
        }).catch(() => {});
      }

      // Send email notification via FormSubmit (no account required)
      fetch('https://formsubmit.co/ajax/guilherme@gmxdigital.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Nova aplicação GMX — ${nome}${marca ? ' / ' + marca : ''}`,
          _template: 'table',
          _captcha: 'false',
          Nome: nome,
          Email: email || '—',
          WhatsApp: whats,
          Marca: marca || '—',
          'Site/Instagram': site || '—',
          Objetivo: objetivo || '—',
          Servico: servico || '—',
          Prazo: prazo || '—',
          Mensagem: msg
        })
      }).catch(() => {});

      // Redirect to thank-you page with client data
      const params = new URLSearchParams();
      if (nome) params.set('nome', nome);
      if (servico) params.set('servico', servico);
      if (objetivo) params.set('objetivo', objetivo);
      // Detect language — if on /en/ path, use relative obrigado.html (inside /en/)
      const isEn = window.location.pathname.includes('/en/') || document.documentElement.lang === 'en';
      const thankYouBase = isEn ? 'obrigado.html' : 'obrigado.html';
      window.location.href = thankYouBase + '?' + params.toString();
    });

    document.getElementById('btn-top')?.addEventListener('click', () => {
      playClick();
      if (lenis) lenis.scrollTo(0, { duration: 1.6, immediate: false, force: true, lock: false, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('btn-top')?.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      playClick();
      if (lenis) lenis.scrollTo(0, { duration: 1.6, immediate: false, force: true, lock: false, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Cinematic nav transition (mini wipe)
    function navTransition(callback) {
      const slices = document.querySelectorAll('.pt-slice');
      if (!slices.length || prefersReducedMotion) { callback(); return; }
      const tl = gsap.timeline();
      tl.set(slices, { scaleY: 0, transformOrigin: 'top' });
      tl.to(slices, { scaleY: 1, duration: 0.22, stagger: 0.025, ease: 'power3.inOut' });
      tl.add(() => callback());
      tl.to(slices, { scaleY: 0, duration: 0.28, stagger: 0.025, ease: 'power3.inOut', transformOrigin: 'bottom' }, '+=0.04');
    }

    document.querySelectorAll('.scroll-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); playClick();
        const id = this.getAttribute('href'); if (!id || id === '#') return;
        const el = document.querySelector(id); if (!el) return;

        // If mobile nav is open, close it first then scroll after overlay closes
        const mobileNav = document.getElementById('mobile-nav');
        const hamburger = document.getElementById('hamburger-btn');
        const wasMobileOpen = mobileNav && mobileNav.classList.contains('is-open');
        if (wasMobileOpen) {
          mobileNav.classList.remove('is-open');
          if (hamburger) { hamburger.classList.remove('is-active'); hamburger.setAttribute('aria-expanded', 'false'); }
          if (lenis) lenis.start();
        }

        // Small delay on mobile to let overlay close & Lenis stabilize
        const delay = wasMobileOpen ? 120 : 0;
        setTimeout(() => {
          navTransition(() => {
            // Use native scrollTo on mobile for reliability, Lenis on desktop
            const baseScroll = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY;
            const top = el.getBoundingClientRect().top + baseScroll - 80;
            if (lenis && !isMobile()) {
              lenis.scrollTo(top, { duration: 0.01, immediate: true });
            } else {
              if (lenis) lenis.stop();
              window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
              if (lenis) requestAnimationFrame(() => { lenis.start(); });
            }
          });
        }, delay);
      });
    });

    // Inter-page transitions (e.g. index → privacidade.html)
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      if (link.target === '_blank' || link.classList.contains('scroll-link')) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        navTransition(() => { window.location.href = href; });
      });
    });
  }

  // =====================================================
  // HAMBURGER MENU (mobile)
  // =====================================================
  function setupHamburgerMenu() {
    const btn = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('mobile-nav');
    if (!btn || !overlay) return;

    btn.addEventListener('click', () => {
      playClick();
      const isOpen = overlay.classList.toggle('is-open');
      btn.classList.toggle('is-active', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
      if (isOpen) { lenis?.stop(); } else { lenis?.start(); }
    });

    // Close on link click (skip scroll-links — they handle their own close above)
    overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
      if (link.classList.contains('scroll-link')) return;
      link.addEventListener('click', () => {
        overlay.classList.remove('is-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
        lenis?.start();
      });
    });
  }

  // =====================================================
  // TESTIMONIALS CAROUSEL
  // =====================================================
  function setupTestimonialsCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonial-dots');
    if (!cards.length || cards.length < 2 || !dotsContainer) return;

    let current = 0;
    let autoInterval;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', window.__GMX_I18N&&window.__GMX_I18N.testimonialLabel?window.__GMX_I18N.testimonialLabel(i):`Depoimento ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAuto(); playClick(); });
      dotsContainer.appendChild(dot);
    });

    function goTo(idx) {
      cards[current]?.classList.remove('active');
      dotsContainer.children[current]?.classList.remove('active');
      current = idx;
      cards[current]?.classList.add('active');
      dotsContainer.children[current]?.classList.add('active');
    }

    function next() { goTo((current + 1) % cards.length); }
    function resetAuto() { clearInterval(autoInterval); autoInterval = setInterval(next, 5000); }
    function pauseAuto() { clearInterval(autoInterval); }
    resetAuto();

    // Pause on hover/focus — WCAG 2.2.2 Pause, Stop, Hide
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', pauseAuto);
      wrapper.addEventListener('mouseleave', resetAuto);
      wrapper.addEventListener('focusin', pauseAuto);
      wrapper.addEventListener('focusout', resetAuto);
      let touchStartX = 0;
      wrapper.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
      wrapper.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) {
          dx > 0 ? goTo((current - 1 + cards.length) % cards.length) : next();
          resetAuto();
        }
      }, { passive: true });
    }
  }

  // =====================================================
  // SOCIAL PROOF — HIDE SECTION IF ALL LOGOS FAIL
  // =====================================================
  function setupSocialProofFallback() {
    const container = document.getElementById('client-logos');
    if (!container) return;
    const imgs = container.querySelectorAll('img');
    let loaded = 0, failed = 0;
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth === 0) { failed++; img.style.display = 'none'; }
      img.addEventListener('error', () => { failed++; img.style.display = 'none'; if (failed === imgs.length) container.style.display = 'none'; });
      img.addEventListener('load', () => { loaded++; });
    });
    // If all already failed
    if (failed === imgs.length) container.style.display = 'none';
  }

} // fim iniciarMotores
