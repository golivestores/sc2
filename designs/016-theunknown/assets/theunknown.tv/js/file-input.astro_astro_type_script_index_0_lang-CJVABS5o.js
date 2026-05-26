import{g as Ut,C as x,T as S,i as O,A as N,m as J,p as W,a as w,b as nt,f as G,c as zt,V as Wt,h as A,t as pt,d as ut,e as wt,j as at,k as Pt,l as qt,r as Ct,o as Vt,s as Gt,n as Yt,q as Xt,u as Zt,F as Jt,v as Ot,w as Kt,x as It,y as Rt}from"./libs-CFvlTRJz.js";import{b as Qt,c as y,s as Ft,e as ht,o as lt}from"./petit-kit-DNrI3lPJ.js";import{g as Y,a as kt}from"./gsap-Bc2aDPd5.js";import{C as te,R as K,T as ft,P as Q,V as I,M as tt,a as ct,b as ee,G as oe}from"./ogl-DYa94y7C.js";import{n as se}from"./ClientRouter.astro_astro_type_script_index_0_lang-CUYf2et0.js";const re=`
  attribute vec2 uv;
  attribute vec2 position;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`,ie=`
  precision mediump float;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec4 iMouse;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform vec3 color4;
  uniform vec3 color5;
  uniform float scale;
  uniform float isMobile;
  uniform float rads;
  uniform float frequency;
  uniform float amplitude;

  varying vec2 vUv;

  #define S(a,b,t) smoothstep(a,b,t)

  #define NUM_LINES 20
  #define LINE_LIFETIME 2.5
  #define LINE_PIXEL_WIDTH 1.0
  #define FADE_PORTION 0.25
  #define MIN_LINE_LENGTH 0.3
  #define MAX_LINE_LENGTH 0.8

  mat2 Rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
  }

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
    return fract(sin(p) * 43758.5453);
  }
  float fhash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float uShape(float h) {
    float x = h - 0.5;
    return 0.5 + sign(x) * sqrt(abs(x) * 2.) * 0.5;
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
    float b = dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float c = dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float d = dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

    float n = mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    return 0.5 + 0.5 * n;
  }

  vec3 saturate(vec3 a) { return clamp(a, 0., 1.); }
  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec4 getRay(vec2 uv, float xMouse, float t, float width) {
    uv.y = 1.0 - uv.y;
    vec2 vUv = vec2(uv.y, uv.x);
    float mouseX = (iMouse.x / iResolution.x) + 0.5;
    float alpha = 0.0;
    vec3 color = vec3(0.0);

    float addX = mouseX;
    vUv.x += mouseX * 0.01;

    for (int i = 0; i < NUM_LINES; i++) {
        float fi = float(i);

        float h = fract(sin(fi * 13.13 + 1.23) * 43758.5453123);
        float x = 0.5 + sign(h - 0.5) * sqrt(abs(h - 0.5) * 2.5) * 0.5;

        float lenHash = fract(addX + sin(fi * 13.13 + 4.56) * 43758.5453123);
        float lineLength = mix(MIN_LINE_LENGTH, MAX_LINE_LENGTH, lenHash);

        float spawnTime = fract(sin(fi * 13.13) * 43758.5453123) * LINE_LIFETIME;
        float timeSinceSpawn = mod(t + spawnTime, LINE_LIFETIME);
        float lifeFrac = (timeSinceSpawn / LINE_LIFETIME);

        float fade = smoothstep(0.0, FADE_PORTION, lifeFrac) * smoothstep(1.0, 1.0 - FADE_PORTION, lifeFrac);

        float yStart = mix(0.05 + lineLength, 0.0 - lineLength, step(0.5, x));
        float yEnd   = mix(1.0 - 0.0, 1. - lineLength, step(0.5, x));
        float grad   = mix(
            (vUv.y - yStart) / max(0.0001, (yEnd - yStart)),
            1.0 - (vUv.y - yStart) / max(0.0001, (yEnd - yStart)),
            step(0.5, x)
        );

        float inLine = step(yStart, vUv.y) * step(vUv.y, yEnd);
        float line = smoothstep(x - width, x, vUv.x) * (1.0 - smoothstep(x, x + width, vUv.x));

        float a = line * grad * fade * inLine;
        alpha += a;
        color += a * mix(vec3(0.2, 0.4, 1.0), vec3(1.0), grad);
    }

    alpha = clamp(alpha, 0.0, 1.0);
    color = clamp(color, 0.0, 1.0);

    return vec4(color, 1.0);
  }

  vec3 starField(vec2 uv, float iTime, float addX) {
    float starDensity = 0.0008;
    float baseSize = 1.8;
    vec3 col = vec3(0.0);

    for (int i = 0; i < 3; i++) {
        float layer = float(i) * 13.7;
        // Move the stars by offsetting uv.x with addX
        vec2 p = (uv + vec2(addX * 0.000001, 0.0)) * (600.0 + 200.0 * float(i)) + layer;

        // Random seed for star placement
        float rnd = fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453 + layer);

        if (rnd > 1.0 - starDensity) {
            // Star position
            float starX = fract(p.x + rnd);
            float starY = fract(p.y + rnd * 1.3);
            vec2 starPos = vec2(starX, starY);

            // Distance from star center
            float d = length(uv - starPos);

            // Star size and softness
            float size = baseSize * mix(0.7, 1.3, rnd);
            float star = smoothstep(size, 0.0, d);

            // Unique sparkle/fade for each star
            float sparkleSeed = rnd * 100.0 + float(i) * 17.0;
            float sparkle = 0.7 + 0.5 * sin(iTime * (0.07 + rnd * 1.5) + sparkleSeed);
            float fade = 1.5 + 0.5 * sin(iTime * (0.3 + rnd) + sparkleSeed * 0.7);

            float brightness = sparkle * fade * 0.8;

            // Add star to color
            col += vec3(1.0) * star * brightness;
        }
    }
    return col;
  }

  // -- place these helpers above main(), near other utilities --
float randHash(vec3 p) {
  // 3D hash → 0..1, stable across frames for a given p
  return fract(sin(dot(p, vec3(12.9898,78.233,37.719))) * 43758.5453);
}

// Ensure a < b and a minimum width; clamp to [-1, 1]
vec2 randomWindow(float seed, float minWidth, float maxWidth) {
  float center = mix(-0.6, 0.6, randHash(vec3(seed, seed*1.13, seed*2.07))); // center within safe range
  float width  = mix(minWidth, maxWidth, randHash(vec3(seed*3.31, seed*0.71, seed*4.79)));
  float a = clamp(center - width*0.5, -1.0, 1.0);
  float b = clamp(center + width*0.5, -1.0, 1.0);

  // if clamping inverted the interval, fix ordering and enforce minimum width
  if (b <= a) {
    float c = clamp(center, -0.9, 0.9);
    a = clamp(c - minWidth*0.5, -1.0, 1.0);
    b = clamp(c + minWidth*0.5, -1.0, 1.0);
  }
  return vec2(a, b);
}

  void main() {
    vec3 colorc1   = color1;
    vec3 colorc2 = color2;
    vec3 colorc3      = color3;
    vec3 colorc4     = color4;
    vec3 colorc5   = color5;
    vec3 colorc44    = color4;

    float xMouse = (iMouse.x / iResolution.x) + 0.5;

    vec2 fragCoord = vUv * iResolution;
    vec2 uv = fragCoord / iResolution.xy;
    float scaleRatioX = iResolution.x / 1920.;
    float scaleRatioY = iResolution.y / 780.;
    vec2 bUv = uv;
    uv = uv.yx;
    uv.x /= 1. + scaleRatioX;
    uv.y /= 1. + scaleRatioY;

    uv.y += 0.05;

    vec2 scaledUv = vec2(uv.x, uv.y);
    scaledUv /= scale;

    if (isMobile == 1.) {
      scaledUv.x *= 3.;
      // scaledUv.y *= 3.;
    }
    float ratio = iResolution.x / iResolution.y;

    vec2 tuv = uv - 0.5;
    tuv.y -= (xMouse * 0.1 * ratio);

    vec2 scaledTuv = scaledUv - 0.5;
    scaledTuv.y -= (xMouse * 0.1 * ratio);

    float degree = noise(vec2(iTime * 0.1, tuv.x * scaledTuv.y));

    float rot5 = radians(rads);
    float s5 = sin(rot5), c5 = cos(rot5);
    mat2 rotMat5 = mat2(c5, -s5, s5, c5);

    tuv.y *= 1.0 / ratio;
    float rotAngle = radians((degree - 0.5) * sin(iTime) * 1720.0);
    float sA = sin(rotAngle), cA = cos(rotAngle);
    mat2 rotMatA = mat2(cA, -sA, sA, cA);
    tuv = rotMatA * tuv / ratio;
    tuv.y *= ratio;

    tuv.x += ((iMouse.x / iResolution.x) - 0.5) * 0.05;
    tuv.y += ((iMouse.y / iResolution.y) - 0.5) * 0.05;

    float speed = iTime * 0.05;
    tuv.x += sin(tuv.y * frequency + speed) / amplitude;
    tuv.y += sin(tuv.x * frequency * 0.5 + speed) / (amplitude * 2.5);

    vec2 rotTuv = rotMat5 * tuv;
    float layerMix1 = S(-0.3, 0.2, rotTuv.x);
    float layerMix2 = S(-0.3, 0.2, rotTuv.x);
    float layerMix3 = S(-0.5, 0.2, rotTuv.x);
    float layerMix4 = S(-0.3, 0.2, rotTuv.x); 

    vec3 layer1 = mix(colorc1, colorc2, layerMix1);
    vec3 layer2 = mix(colorc3, colorc4, layerMix2);
    vec3 layer3 = mix(colorc5, colorc44, layerMix3);
    vec3 layer4 = mix(colorc3, colorc5, layerMix4);

    vec3 totalLayer = mix(layer1, layer2, layerMix1);
    totalLayer = mix(totalLayer, layer4, layerMix4);
    totalLayer = mix(totalLayer, layer3, layerMix3);

    float finalMix = S(0., -0.3, scaledTuv.y);
    vec3 col = mix(layer1, layer2, finalMix);
    col = mix(col, layer3, finalMix);
    col = mix(col, layer4, finalMix);
    // vec3 col = mix(layer1, layer2, totalLayer);

    float t = iTime * 10.0;
    float width = LINE_PIXEL_WIDTH / iResolution.x;

    vec4 ray = getRay(uv, xMouse, t, width);
    col *= (1.0 + ray.rgb);

    col *= 1.0 - (rand(bUv * 20.0) - 0.5) * 0.08;
    col = saturate(col);

    // --- Black to transparent gradient from bottom to top ---
    float gradient = 1.0 - smoothstep(0.5, 1.0, 1. - vUv.y);
    col *= 0.3 + (gradient) * 0.7;
    // col *= gradient;
    col += (vec3(29. / 255., 32. / 255., 95. / 255.) * (1. - gradient)) * 0.5;
    // col += (vec3(6. / 255., 15. / 255., 66. / 255.) * (1. - gradient));

    col *= 1. + starField(vec2(bUv.x - xMouse * 0.00000, bUv.y), iTime * 10., xMouse * 1.) * gradient;

    float vignette = smoothstep(1.0, 0.7, length(uv - 0.5));
    col *= vignette;

    // --- FOG BASED ON DEPTH ---
    // vec3 fogColor = vec3(0.1, 0.12, 0.2); // You can adjust this
    // float depth = length(uv - 0.5); // 0 at center, ~0.7 at corners
    // float fogStart = 0.4; // Start fog at this "depth"
    // float fogEnd = 0.7;   // Fully fogged at this "depth"
    // float fogFactor = smoothstep(fogStart, fogEnd, depth) * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`,X=new Qt,{mode:ne}=Ut(),C=X.set("current-time-mode",ne);let D,mt;D=X.set("loaded",!1),mt=X.set("ready",!1);const _=r=>{const[t,e,o]=r.match(/\w\w/g).map(s=>parseInt(s,16)/255);return new te(t,e,o)},ae={dark:[_("#34153d"),_("#4C1B5E"),_("#8071B4"),_("#009286"),_("#009286")],light:[_("#ff8d54"),_("#ffe86d"),_("#f56c5c"),_("#FF5462"),_("#E6349A")]};class le extends x{static observedAttrs=["colors"];tpl;colors;program;targets;isRunning=!0;rendering=!0;wasRunning=!0;constructor(){super({plugins:[S,O],props:{frequency:{type:"number",default:20.3,reflect:!0},rads:{type:"number",default:0,reflect:!0},scale:{type:"number",default:.48,reflect:!0},colors:{default:ae,type:"object",reflect:!0},speed:{type:"number",default:2.91,reflect:!0},amplitude:{type:"number",default:2.43,reflect:!0}}})}onUpdate(t,e){t.colors?t.colors.dark[0][0]==="#"&&(this.props.colors.dark=t.colors.dark.map(_),this.props.colors.light=t.colors.light.map(_)):t.scale?this.props.scale=t.scale:t.frequency&&this.program&&(this.program.uniforms.frequency.value=this.props.frequency)}setScale(t){this.props.scale=t,this.program&&(this.program.uniforms.scale.value=this.props.scale)}setFrequency(t){this.props.frequency=t,this.program&&(this.program.uniforms.frequency.value=this.props.frequency)}setRads(t){this.props.rads=t,this.program&&(this.program.uniforms.rads.value=this.props.rads)}setSpeed(t){this.props.speed=t}setAmplitude(t){this.props.amplitude=t,this.program&&(this.program.uniforms.amplitude.value=this.props.amplitude)}setColors(t){this.targets.color1.setEnd(this.props.colors[t][0]),this.targets.color2.setEnd(this.props.colors[t][1]),this.targets.color3.setEnd(this.props.colors[t][2]),this.targets.color4.setEnd(this.props.colors[t][3]),this.targets.color5.setEnd(this.props.colors[t][4])}onMount(){const t=this.$("div"),e=new K({dpr:1}),o=e.gl;t.appendChild(o.canvas),o.clearColor(1,1,1,1);const s=new ft(o);this.targets={color1:new N(this.props.colors.light[0]),color2:new N(this.props.colors.light[1]),color3:new N(this.props.colors.light[2]),color4:new N(this.props.colors.light[3]),color5:new N(this.props.colors.light[4])},this.program=new Q(o,{vertex:re,fragment:ie,transparent:!1,uniforms:{iResolution:{value:new I(window.innerWidth,window.innerHeight)},iMouse:{value:[0,0,0,0]},iTime:{value:0},scale:{value:this.props.scale},frequency:{value:this.props.frequency},amplitude:{value:this.props.amplitude},rads:{value:this.props.rads},color1:{value:this.targets.color1.getCurrent()},color2:{value:this.targets.color2.getCurrent()},color3:{value:this.targets.color3.getCurrent()},color4:{value:this.targets.color4.getCurrent()},color5:{value:this.targets.color5.getCurrent()},isMobile:{value:J.current.width<=1024?1:0}}}),C.subscribe(u=>{this.setColors(u)}),window.addEventListener("mousemove",u=>{-u.clientX,window.innerHeight-u.clientY});const n=new tt(o,{geometry:s,program:this.program});let i=0;window.addEventListener("mousewheel",u=>{i+=u.deltaY*.5,i<0&&(i=0)}),this.rendering=!0;const a=u=>{if(!this.rendering||(requestAnimationFrame(a),!this.isRunning))return;const d=W.getCurrent();this.program.uniforms.iTime.value=u*(this.props.speed*1e-4)+i*.001,this.program.uniforms.iMouse.value=[-d.x*.33,d.y*.33,0,0],this.targets.color1.tick(),this.targets.color2.tick(),this.targets.color3.tick(),this.targets.color4.tick(),this.targets.color5.tick(),this.program.uniforms.color1.value=this.targets.color1.getCurrent(),this.program.uniforms.color2.value=this.targets.color2.getCurrent(),this.program.uniforms.color3.value=this.targets.color3.getCurrent(),this.program.uniforms.color4.value=this.targets.color4.getCurrent(),this.program.uniforms.color5.value=this.targets.color5.getCurrent(),this.program.uniforms.frequency.value=this.props.frequency,e.render({scene:n})};requestAnimationFrame(a),new IntersectionObserver(u=>{u.forEach(d=>{d.isIntersecting?this.isRunning=!0:this.isRunning=!1})}).observe(this),document.querySelector("c-menu")?.addEventListener("toggle",u=>{u.detail.opened?(this.wasRunning=this.isRunning,this.isRunning=!1):this.isRunning=this.wasRunning});const p=()=>{const u=this.$("div");e.setSize(u.clientWidth,u.clientHeight),e.gl.canvas.style.height="100%"};window.addEventListener("resize",p,!1),p()}onUnmount(){this.rendering=!1}render(){this.tpl(y`<div class="w-full h-full"></div>`)}}customElements.get("c-aurora")||customElements.define("c-aurora",le);class ce extends x{static observedAttrs=["content"];tpl;wasRunning=!0;cursor;constructor(){super({plugins:[S,O],props:{speed:40,content:"sliding strip",href:"#"},styles:`
        sliding-strip .stripe-container {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, font-size, letter-spacing, font-variation-settings, color;
          font-size: 25.6667px;
          line-height: 100%;
          font-variation-settings: 'wght' 400, 'Wide' 0;
          color: var(--color-dark);
        }

        sliding-strip .stripe-container:hover {
          font-size: 50px;
          letter-spacing: 0.05em;
          font-variation-settings: 'wght' 900, 'Wide' 10;
          color: var(--color-white);
        }

        sliding-strip .stripe-container:hover {
          transform: translate3d(0, 0, 0) !important;
        }

        sliding-strip .stripe-container span:after {
          content: ' • ';
        }
      `})}fillContent=()=>{const t=this.$(".sliding-strip-content");t.innerHTML="";const e=this.props.content,o=document.createTextNode(e),s=document.createElement("span");s.classList.add("whitespace-nowrap","whitespace-pre"),s.appendChild(o),t.appendChild(s);const n=s.offsetWidth,i=this.$(".stripe-container").offsetWidth,a=Math.ceil(i*2/n);for(let l=1;l<a;l++){const c=s.cloneNode(!0);t.appendChild(c)}};onMount(){this.cursor=document.querySelector("c-liquid-cursor");const t=Ft(this.fillContent,100);window.addEventListener("resize",t),this.fillContent();const e=this.$(".sliding-strip-content"),o=e.offsetWidth/4,s=o/this.props.speed;this.animation=Y.to(e,{x:-o,duration:s,ease:"linear",repeat:-1,modifiers:{x:Y.utils.unitize(n=>parseFloat(n)%o)}}),this.addEventListener("mouseenter",()=>{this.cursor?.onOpen("Discover")}),this.addEventListener("mouseleave",()=>{this.cursor?.onClose()})}onUnmount(){window.removeEventListener("resize",this.fillContent)}onInView(){this.wasRunning}onOutView(){this.wasRunning=this.animation.isActive()}render(){this.tpl(y`
        <a
          href=${this.props.href}
          class="
          stripe-container w-full h-[calc(100%)] flex items-center
          cursor-pointer
          flex items-center justify-center text-[var(--color-dark)] text-[25.6667px] leading-[120%] font-[Lemon] uppercase
          bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-white)_25%,var(--color-white)_75%,var(--color-white)_100%)]
          hover:bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-red)_25%,var(--color-red)_75%,var(--color-white)_100%)]
          hover:dark:bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-green)_25%,var(--color-green)_75%,var(--color-white)_100%)]
          dark:!text-[var(--color-white)] dark:bg-[linear-gradient(90deg,var(--color-midnight)_0%,var(--color-midnight)_25%,var(--color-midnight)_75%,var(--color-midnight)_100%)]
          border-t-1 border-b-1 border-dark/30 dark:border-white/30
        "
        >
          <div class="sliding-strip-content flex no-wrap"></div>
        </a>
      `)}}customElements.get("sliding-strip")||customElements.define("sliding-strip",ce);const ko=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));class de extends x{static observedAttrs=["content"];tpl;wasRunning=!0;cursor;animation;constructor(){super({plugins:[S,O],props:{speed:40,content:[{label:"sliding strip",href:"#"},{label:"sliding strip",href:"#"}],href:"#"},styles:`
        sliding-menu .stripe-container {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, font-size, letter-spacing, font-variation-settings, color;
          font-size: 25.6667px;
          line-height: 100%;
          font-variation-settings: 'wght' 400, 'Wide' 0;
          color: var(--color-dark);
        }

        sliding-menu .stripe-container:hover {
          font-size: 50px;
          letter-spacing: 0.05em;
          font-variation-settings: 'wght' 900, 'Wide' 10;
          color: var(--color-white);
        }

        sliding-menu .stripe-container:hover {
          transform: translate3d(0, 0, 0) !important;
        }

        sliding-menu a:hover {
          text-decoration: underline;
        }
      `})}fillContent=()=>{const t=this.$(".sliding-strip-content");t.innerHTML="";const e=document.createElement("div");e.classList.add("flex","no-wrap"),this.props.content.forEach(i=>{const a=document.createTextNode(i.label),l=document.createElement("a");l.href=i.href,l.classList.add("whitespace-nowrap","whitespace-pre"),l.appendChild(a),e.appendChild(l);const c=document.createElement("span");c.appendChild(document.createTextNode(" • ")),c.classList.add("whitespace-nowrap","whitespace-pre","mx-1"),e.appendChild(c)}),t.appendChild(e);const o=this.$(".stripe-container").offsetWidth,s=Math.ceil(o*2/e.offsetWidth);for(let i=1;i<s;i++){const a=e.cloneNode(!0);t.appendChild(a)}t.querySelectorAll("a").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault();const c=document.getElementById(i.href.split("#")[1]).getBoundingClientRect().top+window.scrollY;window.scrollTo({top:c,behavior:"smooth"})})})};onMount(){this.cursor=document.querySelector("c-liquid-cursor");const t=Ft(this.fillContent,100);window.addEventListener("resize",t),this.fillContent();const e=this.$(".sliding-strip-content"),o=e.offsetWidth/4,s=o/this.props.speed;this.animation=Y.to(e,{x:-o,duration:s,ease:"linear",repeat:-1,modifiers:{x:Y.utils.unitize(n=>parseFloat(n)%o)}}).play(),this.addEventListener("mouseenter",()=>{this.animation.pause()}),this.addEventListener("mouseleave",()=>{this.animation.play()})}onUnmount(){window.removeEventListener("resize",this.fillContent)}onInView(){this.wasRunning&&this.animation.restart()}onOutView(){this.wasRunning=this.animation.isActive(),this.animation.pause()}render(){this.tpl(y`
        <div
          class="
            stripe-container w-full h-[calc(100%)] flex items-center
            cursor-pointer
            flex items-center justify-center text-[var(--color-dark)] text-[25.6667px] leading-[120%] font-[Lemon] uppercase
            bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-white)_25%,var(--color-white)_75%,var(--color-white)_100%)]
            hover:bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-red)_25%,var(--color-red)_75%,var(--color-white)_100%)]
            hover:dark:bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-green)_25%,var(--color-green)_75%,var(--color-white)_100%)]
            dark:!text-[var(--color-white)] dark:bg-[linear-gradient(90deg,var(--color-midnight)_0%,var(--color-midnight)_25%,var(--color-midnight)_75%,var(--color-midnight)_100%)]
            border-t-1 border-b-1 border-dark/30 dark:border-white/30
          "
        >
          <div class="sliding-strip-content flex no-wrap"></div>
        </div>
      `)}}customElements.get("sliding-menu")||customElements.define("sliding-menu",de);class pe extends x{static observedAttrs=["classNames"];constructor(){super({shadow:!1,props:{hideOnMobile:{type:"boolean",default:!0},classNames:{type:"string",default:""},id:{type:"string",default:"Fm-IwhFiQt0"},openYoutubeTab:{type:"boolean",default:!1}}})}render(t){const e=t.hideOnMobile?"md:block hidden":"";return`
      <div
        class="video-modal-trigger ${t.classNames} ${e} group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 scale-95 hover:scale-105"
      >
        <img
          class="w-full h-full object-cover"
          src="./images/video-thumb.png"
          alt="Video thumbnail"
        />
        <svg
          width="40"
          height="40"
          viewBox="0 0 106 106"
          fill="none"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-11
            group-hover:scale-115 transition-all duration-300 dropshadow-sm"
        >
          <circle cx="53" cy="53" r="49" stroke="#FFF6F1" stroke-width="8"
          ></circle>
          <path
            d="M47 63.3926L47 42.6074L65.001 53L47 63.3926Z"
            fill="#FFF6F1"
            stroke="#FFF6F1"
            stroke-width="8"></path>
        </svg>
      </div>
    `}onMount(){const t=this.$(".video-modal-trigger");let e=null;const o=()=>{const a=document.createElement("div");return a.className="video-modal fixed top-0 left-0 w-screen h-screen z-[500] pointer-events-none opacity-0 scale-110 bg-black/85 transition-all duration-300",a.innerHTML=`
        <div class="video-modal-overlay absolute top-0 left-0 w-full h-full z-10"></div>
        <div
          class="
            video-modal-content
            w-[calc(100%-50px)] h-[calc(100%-50px)] mt-[25px] ml-[25px]
            md:w-[calc(100%-200px)] md:h-[calc(100%-200px)] md:mt-[100px] md:ml-[100px]
            lg:w-[calc(100%-300px)] lg:h-[calc(100%-300px)] lg:mt-[150px] lg:ml-[150px]
            relative z-10 bg-black overflow-hidden rounded-xl"
        ></div>
        <div
          class="video-modal-close absolute top-[50px] right-[50px] z-10 cursor-pointer border-2 border-white rounded-full p-[10px] scale-100 transition-all duration-300 hover:scale-110"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      `,a},s=a=>{const l=document.createElement("iframe");l.className="w-full h-full rounded-xl",l.src=`https://www.youtube.com/embed/${this.props.id}`,l.frameBorder="0",l.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",l.allowFullscreen=!0,a.appendChild(l)},n=()=>{if(e)return;e=o();const a=w();a.disableScroll(),e.style.top=`${a.getCurrent().y}px`,document.body.appendChild(e),setTimeout(()=>{e.classList.remove("opacity-0","scale-110","pointer-events-none"),e.classList.add("opacity-100","scale-100","pointer-events-auto")},10);const l=e.querySelector(".video-modal-overlay"),c=e.querySelector(".video-modal-content"),p=e.querySelector(".video-modal-close");s(c);const u=()=>{w().enableScroll(),e.classList.remove("opacity-100","scale-100","pointer-events-auto"),e.classList.add("opacity-0","scale-110","pointer-events-none"),setTimeout(()=>{e?.remove(),e=null},300),window.removeEventListener("keydown",d)},d=m=>{m.key==="Escape"&&u()};l?.addEventListener("click",u),p?.addEventListener("click",u),iframe?.addEventListener("keydown",u),window.addEventListener("keydown",d)},i=()=>{this.props.openYoutubeTab&&window.open(`https://www.youtube.com/watch?v=${this.props.id}`,"_blank")};t?.addEventListener("click",this.props.openYoutubeTab?i:n),this.onUnmount=()=>{t?.removeEventListener("click",n),e&&(e.remove(),e=null)}}}customElements.get("c-video-modal")||customElements.define("c-video-modal",pe);const Eo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));class ue extends x{tpl;message="Request sent!";timeout;constructor(){super({})}initSticky=()=>{const t=w(),e=this.$("div"),o=e.getBoundingClientRect(),s=10;t.onProgress((n,i)=>{e.style.transform=`translate3d(-10px, ${i.y+window.innerHeight-(o.height+s)}px, 0)`})};onMount(){document.addEventListener("astro:page-load",this.initSticky),this.hide()}onDestroy(){document.removeEventListener("astro:page-load",this.initSticky)}hide(){const e=this.$("div"),o=e.getBoundingClientRect().height;e.style.top=`${o+10}px`,e.style.visibility="hidden"}setMessage(t){this.message=t;const e=this.$("div");e.innerHTML=t}showMessage(t){this.timeout&&clearTimeout(this.timeout),this.setMessage(t);const e=this.$("div");e.style.visibility="visible",e.style.top="0px",this.timeout=setTimeout(()=>{const s=this.$("div"),n=s.getBoundingClientRect().height;s.style.top=`${n+10}px`,s.style.visibility="hidden"},3e3)}render(){return`
      <div class="
        fixed top-0 right-0 text-center request-message z-100 min-w-[300px] bg-white p-[20px] rounded-[10px] shadow-md text-dark
      "
      style="transition: top 0.3s ease-in-out;"
      >
        ${this.message}
      </div>
    `}}customElements.get("c-request-message")||customElements.define("c-request-message",ue);const g="cubic-bezier(0.34, 1.56, 0.64, 1)",z="cubic-bezier(0.77, 0, 0.175, 1)",Et="cubic-bezier(0.34, 1.56, 0.64, 1)",he=`
  text-[130px] uppercase
`,fe=`
  font-[Lemon] ${he} font-wide font-bold
`,R=`
  font-['Alte-Haas-Grotesk'] not-italic font-normal text-[16px] sm:text-[18.6667px] leading-[120%]
`,St=(r,t)=>`/${t}/${t==="fr"?"le-connu":"the-known"}/${r}`;class me extends x{static observedAttrs=["limited"];constructor(){super({shadow:!1,props:{noLatest:{type:"boolean",default:!1,reflect:!0},limited:{type:"boolean",default:!1,reflect:!0},articles:{type:"array",default:[],reflect:!0},filters:{type:"array",default:[],reflect:!0},filterTitle:"FILTER BY",selectedFilter:{type:"string",default:"all articles",noRender:!0},allArticlesLabel:"all articles",lang:{type:"string",default:"en",reflect:!0}},styles:`
        .article-container h2 {
          transition: color 300ms var(--overshoot, cubic-bezier(.5,1.5,.5,1));
        }
        .article-container {
          cursor: pointer;
        }
        .article-container:hover img {
          filter: saturate(100%);
          transform: scale(1.2) !important;
        }
        .article-container:hover h2 {
          color: var(--color-red, #e00);
        }
      `,batchRender:!0})}getCols=t=>{const e=[[],[],[],[]];return t.forEach((o,s)=>{e[s%4].push(o)}),e};_getToDisplay(){const t=this.props.articles||[],e=this.props.selectedFilter!==this.props.allArticlesLabel,o=this.props.noLatest||e?t:t.slice(1);let s=this.props.limited?o.slice(0,4):o;return e&&(s=s.filter(n=>(n.tags||[]).some(i=>i.name===this.props.selectedFilter))),s}_buildColsInner(t){return t.map((e,o)=>`
          <div
            class="section__journal__col flex flex-col gap-[36px] w-full md:w-[25%] transition-opacity duration-1000 will-change-[opacity]"
            style="transition-delay: ${o*100}ms;"
          >
            ${e.map(s=>{const n=this.articleHeight[s.id];return`
                  <c-liquid-cursor-area
                    class="article-container flex flex-col w-full"
                    content='READ MORE'}
                    href="${St(s.slug,this.props.lang)}"
                  >
                    <div class="article-container flex flex-col w-full col-article" data-col="${o}">
                      <div
                        class="relative w-full overflow-hidden rounded-[20px]"
                        style="padding-top: ${n}%"
                      >
                        <img
                          class="w-full h-full object-cover saturate-0 hover:saturate-100 absolute top-0 left-0"
                          style="transition: all 1500ms ${Et}; transform: scale(1.05);"
                          src="${nt(s.preview_img.url)}"
                        />
                      </div>
                      <div class="flex flex-col gap-[10px] mt-[35px]">
                        <h2 class="font-[Lemon] uppercase font-bold !text-[32px] xl:!text-[40px] leading-[90%] text-dark dark:text-purple w-[100%]">
                          ${s.title}
                        </h2>
                        <div class="text-purple mt-[10px]">
                          ${s.date?s.date+" • ":""}${s.hashtags}
                        </div>
                      </div>
                      <div class="flex flex-col gap-[10px] mt-[20px]">
                        <div class="${R} !text-[16px] lg:!text-[17px] text-dark dark:text-white/70">
                          ${s.preview}
                        </div>
                      </div>
                    </div>
                  </c-liquid-cursor-area>
                `}).join("")}
          </div>
        `).join("")}_updateColsGrid(){const t=this.querySelector("#journal-cols");if(!t)return;const e=this._getToDisplay(),o=this.getCols(e);t.innerHTML=this._buildColsInner(o),this.querySelectorAll(".col-article").forEach(n=>{G(n,{globalDelay:Number(n.dataset.col)*.1,rootMargin:"0px 0px -50px 0px"})})}render(t){const e=t.articles||[];if(!e.length)return"<div>Loading…</div>";const o=Array.from(new Set(e.flatMap(c=>(c.tags||[]).map(p=>p.name)))),s=e[0],n=this.getCols(this._getToDisplay()),i=this.props.noLatest?"":`
      <c-liquid-cursor-area content='READ MORE' href="${St(s.slug,this.props.lang)}">
        <div
          id="section__journal__latest"
          class="
            article-container flex justify-between items-stretch
            gap-[12%] md:gap-[30px] xl:gap-[12%]
            flex-col-reverse sm:flex-row
            w-full max-w-[1920px]
          "
          style="transition: transform 1000ms ease-in-out, opacity 1000ms ease-in-out;"
        >
          <div class="flex flex-col flex-1">
            <h2
              id="latest-article-title"
              class="${fe} text-[clamp(1.2rem,12vw,342px)] sm:text-[120px] md:text-[70px] lg:text-[120px] text-left z-12 text-red relative leading-[90%]"
              style="${this._titleFontSize?`font-size: ${this._titleFontSize}px`:""}"
            >
              ${s.title}
            </h2>
            <div class="mt-[20px] flex gap-[10px] text-purple dark:text-violet">
              ${s.date} • ${s.hashtags}
            </div>
            <div class="${R} mt-[45px] text-dark dark:text-white">
              ${s.preview}
            </div>
          </div>
          <div class="w-[100%] w-auto w-[585px] md:w-1/2 lg:w-[585px] overflow-hidden rounded-[20px] self-strech mb-[20px] sm:mb-0">
            <img
              class="w-full h-full object-cover sm:saturate-0"
              style="transition: all 1500ms ${Et}; transform: scale(1.05);"
              src="${nt(s.preview_img.url)}"
            />
          </div>
        </div>
      </c-liquid-cursor-area>
    `,a=o.length?`
      <div class='mt-[100px]'>
        <h5 class="font-['Alte-Haas-Grotesk'] text-[32px] text-left uppercase text-dark dark:text-purple">
          ${this.props.filterTitle}
        </h5>
        <div class="flex gap-[10px] mt-[20px] flex-wrap">
          <c-tag content='${this.props.allArticlesLabel}' selectable selected=${this.props.selectedFilter===this.props.allArticlesLabel} ></c-tag>
          ${o.map(c=>{const p=c===this.props.selectedFilter;return`<c-tag content="${c}" selectable selected="${p}"></c-tag>`}).join("")}
        </div>
      </div>
    `:"",l=`
      <div id="journal-cols" class="w-full max-w-[1920px] mt-[80px] justify-between gap-[18px] mb-[140px] min-h-[400px] flex flex-col md:flex-row">
        ${this._buildColsInner(n)}
      </div>
    `;return`
      <div>
        ${i}
        ${a}
        <slot></slot>
        ${l}
      </div>
    `}setTagsEvents=()=>{let t=this.$("c-tag");t&&t.length&&t.forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("content");this.set("selectedFilter",o),t.forEach(s=>{s.setSelected(!1)}),e.setSelected(!0)})})};articleHeight={};_titleFontSize=null;onUpdate({articles:t,selectedFilter:e}){t&&t.forEach(o=>{this.articleHeight[o.id]=75+Math.random()*50}),e!==void 0&&this.mounted&&this._updateColsGrid()}onMount(){const t=this.$("#section__journal__latest"),e=this.$(".col-article");document.fonts.ready.then(()=>setTimeout(()=>this.fitLatestTitle(),100));let o;window.addEventListener("resize",()=>{clearTimeout(o),o=setTimeout(()=>this.fitLatestTitle(),150)}),setTimeout(()=>{t&&zt(t,{rootMargin:"0px 0px -200px 0px"}),e&&e.length&&e.forEach(s=>{G(s,{globalDelay:Number(s.dataset.col)*.1,rootMargin:"0px 0px -50px 0px"})})},1)}fitLatestTitle(){const t=document.getElementById("latest-article-title");t&&(t.style.fontSize="",this._titleFontSize=null,setTimeout(()=>{let e=parseFloat(getComputedStyle(t).fontSize);if(e){for(;e>12;){const o=parseFloat(getComputedStyle(t).lineHeight)||e*1.2;if(t.scrollHeight<=o*4)break;e-=1,t.style.fontSize=`${e}px`}this._titleFontSize=e}},50))}onRender(){this.setTagsEvents(),C.subscribe(t=>{const e=this.$("c-tag");e&&e.forEach(o=>{o.setAttribute("color",t==="dark"?"var(--color-violet)":"var(--color-purple)"),o.setAttribute("borderColor",t==="dark"?"var(--color-violet)":"var(--color-purple)"),o.update&&o.update()})})}}customElements.get("journal-component")||customElements.define("journal-component",me);function Bt(r){if(!r)return 0;const t=r.getBoundingClientRect(),e=t.width,o=t.height;if(e===0||o===0)return 0;const s=window.innerWidth,n=window.innerHeight,i=Math.max(t.left,0),a=Math.max(t.top,0),l=Math.min(t.right,s),c=Math.min(t.bottom,n),p=Math.max(0,l-i),u=Math.max(0,c-a),d=p*u,m=e*o;return d/m}function ge(r){return parseFloat(r.style.transform.split("rotate(")[1].split("deg")[0])}class ve extends x{inView=!1;rendering=!0;constructor(){super({props:{color:"#00D4FF",scale:1,reverse:!1,parentSection:"",mode:"intersection",className:""}})}onUnmount(){this.rendering=!1}onMount(){const t=document.getElementById(this.props.parentSection),e=this.$("#bg__star");e.style.transform="rotate(0deg)";const o=()=>{if(!this.rendering)return;requestAnimationFrame(o);let s=ge(e);this.props.reverse?s-=.05:s+=.05,e.style.transform=`rotate(${s}deg)`};requestAnimationFrame(o),t&&window.addEventListener("scroll",()=>{const s=Bt(t);let n=1;this.props.mode==="intersection"?n=1-Math.abs(s):n=1-s,e.style.scale=1-n})}render(){const t=this.props.scale*100;return`
    <svg
      id="bg__star"
      width="${t}%"
      height="${t}%"
      viewBox="0 0 742 742"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform transform-gpu ${this.props.className}"
    >
      <mask
        id="mask0_1_401"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="742"
        height="742"
      >
        <path d="M742 0H0.666809V741.333H742V0Z" fill="white"></path>
      </mask>
      <g mask="url(#mask0_1_401)">
        <mask
          id="mask1_1_401"
          style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="742"
          height="742"
        >
          <path d="M742 0H0.666809V741.333H742V0Z" fill="white"></path>
        </mask>
        <g mask="url(#mask1_1_401)">
          <g opacity="0.7">
            <mask
              id="mask2_1_401"
              style="mask-type:luminance"
              maskUnits="userSpaceOnUse"
              x="-6"
              y="-1"
              width="754"
              height="748"
            >
              <path
                d="M747.893 -0.654053H-5.21741V746.568H747.893V-0.654053Z"
                fill="white"></path>
            </mask>
            <g mask="url(#mask2_1_401)">
              <path
                d="M0.669678 370.667C0.669678 367.442 325.441 371.602 325.581 368.424C325.721 365.199 1.93156 339.821 2.21198 336.643C2.4924 333.418 325.535 367.302 325.955 364.124C326.376 360.946 6.32479 305.844 6.88562 302.712C7.44646 299.534 325.955 363.142 326.703 360.011C327.451 356.88 13.8493 272.334 14.7373 269.249C15.6253 266.164 326.843 359.076 327.825 356.039C328.853 353.001 24.4585 239.665 25.6269 236.674C26.7953 233.683 328.012 355.104 329.32 352.206C330.629 349.262 38.1056 208.165 39.5076 205.314C40.9565 202.463 329.601 351.271 331.19 348.467C332.732 345.663 54.5568 178.113 56.2393 175.356C57.9218 172.645 331.61 347.486 333.433 344.869C335.256 342.205 73.672 149.744 75.5882 147.173C77.5044 144.603 333.947 343.934 336.004 341.457C338.06 338.98 95.2642 123.291 97.4141 120.908C99.564 118.524 336.658 340.522 338.901 338.279C341.145 336.035 119.24 98.9415 121.577 96.7916C123.96 94.6417 339.649 337.437 342.126 335.381C344.603 333.325 145.272 76.8819 147.843 74.9657C150.413 73.0495 342.874 334.633 345.538 332.811C348.202 330.988 173.314 57.2994 176.071 55.6168C178.782 53.9343 346.332 332.156 349.183 330.567C351.987 329.025 203.132 40.334 206.03 38.8852C208.88 37.4364 349.978 330.006 352.922 328.698C355.867 327.389 234.399 26.1729 237.39 25.0045C240.381 23.8361 353.717 328.23 356.755 327.202C359.792 326.174 266.88 14.9562 269.965 14.1149C273.05 13.2269 357.549 326.828 360.68 326.08C363.812 325.333 300.203 6.87076 303.382 6.26319C306.513 5.70235 361.615 325.753 364.793 325.333C367.971 324.912 334.087 1.86996 337.312 1.58954C340.49 1.30912 365.868 325.099 369.093 324.959C372.271 324.819 368.111 0.0472412 371.336 0.0472412C374.561 0.0472412 370.402 324.819 373.58 324.959C376.804 325.099 402.182 1.30912 405.36 1.58954C408.585 1.86996 374.701 324.912 377.879 325.333C381.057 325.753 436.16 5.70235 439.291 6.26319C442.469 6.87076 378.861 325.333 381.992 326.08C385.124 326.828 469.67 13.2269 472.754 14.1149C475.839 15.0029 382.927 326.221 385.965 327.202C389.003 328.23 502.339 23.8361 505.33 25.0045C508.321 26.1729 386.9 327.389 389.797 328.698C392.742 330.006 533.839 37.4831 536.69 38.8852C539.541 40.334 390.732 328.978 393.536 330.567C396.34 332.109 563.89 53.9343 566.648 55.6168C569.359 57.2994 394.518 330.988 397.135 332.811C399.799 334.633 592.259 73.0495 594.83 74.9657C597.4 76.8819 398.069 333.325 400.547 335.381C403.024 337.437 618.712 94.6417 621.096 96.7916C623.479 98.9415 401.481 336.035 403.725 338.279C405.968 340.522 643.062 118.571 645.212 120.908C647.362 123.291 404.566 338.98 406.622 341.457C408.679 343.934 665.121 144.603 667.038 147.173C668.954 149.744 407.37 342.205 409.193 344.869C411.016 347.533 684.704 172.645 686.387 175.402C688.069 178.113 409.847 345.663 411.436 348.467C412.978 351.271 701.669 202.416 703.118 205.314C704.567 208.165 411.997 349.262 413.306 352.206C414.614 355.151 715.831 233.683 716.999 236.674C718.167 239.665 413.773 353.001 414.801 356.039C415.829 359.076 727.047 266.164 727.935 269.249C728.823 272.334 415.222 356.88 415.97 360.011C416.717 363.142 735.179 299.534 735.787 302.712C736.348 305.844 416.297 360.946 416.717 364.124C417.138 367.302 740.18 333.418 740.461 336.643C740.741 339.821 416.951 365.199 417.091 368.424C417.231 371.602 742.003 367.442 742.003 370.667C742.003 373.892 417.231 369.732 417.091 372.91C416.951 376.135 740.741 401.513 740.461 404.691C740.18 407.916 417.138 374.032 416.717 377.21C416.25 380.388 736.348 435.49 735.787 438.622C735.179 441.8 416.717 378.192 415.97 381.323C415.222 384.454 728.823 469 727.935 472.085C727.047 475.17 415.829 382.258 414.801 385.296C413.773 388.333 718.167 501.669 716.999 504.66C715.831 507.651 414.614 386.23 413.306 389.128C411.997 392.072 704.52 533.17 703.118 536.02C701.669 538.871 413.025 390.063 411.436 392.867C409.894 395.671 688.116 563.221 686.387 565.979C684.704 568.689 411.016 393.848 409.193 396.466C407.37 399.083 668.954 591.59 667.038 594.161C665.121 596.731 408.632 397.4 406.622 399.877C404.566 402.354 647.362 618.043 645.212 620.426C643.062 622.81 405.968 400.812 403.725 403.055C401.481 405.299 623.433 642.393 621.096 644.542C618.712 646.692 403.024 403.897 400.547 405.953C398.069 408.009 597.354 664.452 594.83 666.368C592.306 668.285 399.799 406.701 397.135 408.524C394.518 410.346 569.359 684.035 566.601 685.717C563.89 687.4 396.34 409.178 393.536 410.767C390.732 412.309 539.587 701 536.69 702.449C533.839 703.898 392.742 411.328 389.797 412.636C386.853 413.945 508.321 715.161 505.33 716.33C502.339 717.498 389.003 413.104 385.965 414.132C382.927 415.16 475.839 726.378 472.754 727.219C469.67 728.107 385.124 414.506 381.992 415.254C378.861 416.001 442.469 734.463 439.291 735.071C436.16 735.632 381.057 415.581 377.879 416.001C374.701 416.422 408.585 739.464 405.36 739.745C402.182 740.025 376.804 416.235 373.58 416.375C370.402 416.515 374.561 741.287 371.336 741.287C368.111 741.287 372.271 416.515 369.093 416.375C365.868 416.235 340.49 740.025 337.312 739.745C334.087 739.464 367.971 416.422 364.793 416.001C361.615 415.581 306.513 735.632 303.382 735.071C300.203 734.463 363.812 416.001 360.68 415.254C357.549 414.506 273.003 728.107 269.965 727.219C266.88 726.331 359.792 415.113 356.755 414.132C353.717 413.104 240.381 717.498 237.39 716.33C234.399 715.161 355.82 413.945 352.922 412.636C349.978 411.328 208.88 703.851 206.03 702.449C203.132 701 351.987 412.356 349.183 410.767C346.379 409.225 178.829 687.4 176.071 685.717C173.361 684.035 348.202 410.346 345.585 408.524C342.921 406.701 150.46 668.285 147.889 666.368C145.319 664.452 344.65 408.009 342.173 405.953C339.696 403.897 124.007 646.692 121.624 644.542C119.24 642.393 341.238 405.299 338.995 403.055C336.705 400.765 99.6574 622.763 97.5076 620.426C95.3577 618.043 338.153 402.354 336.097 399.877C334.041 397.4 77.5978 596.731 75.6816 594.161C73.7654 591.59 335.349 399.13 333.527 396.466C331.704 393.802 58.0153 568.689 56.3328 565.932C54.6502 563.221 332.872 395.671 331.283 392.867C329.741 390.063 41.0499 538.918 39.6011 536.02C38.1523 533.17 330.722 392.072 329.414 389.128C328.105 386.184 26.8888 507.651 25.7204 504.66C24.552 501.669 328.946 388.333 327.918 385.296C326.89 382.258 15.6721 475.17 14.8308 472.085C13.9428 469 327.544 384.454 326.796 381.323C326.049 378.192 7.58667 441.8 6.9791 438.622C6.41826 435.49 326.469 380.388 326.049 377.21C325.628 374.032 2.58587 407.916 2.30545 404.691C2.02503 401.513 325.815 376.135 325.675 372.91C325.441 369.732 0.669678 373.892 0.669678 370.667Z"
                fill=${this.props.color}></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `}}customElements.get("c-star")||customElements.define("c-star",ve);const So=Object.freeze(Object.defineProperty({__proto__:null,getIntersectionRatio:Bt},Symbol.toStringTag,{value:"Module"}));let xe=class extends x{tpl;static observedAttrs=["dark"];constructor(){super({props:{content:"",dark:{type:"boolean",default:!1,reflect:!0},mini:!1},styles:`
        c-css-button {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
          background-image: linear-gradient(
            90deg,
            #0757A4,
            #009286 33%,
            #54DBB0 66%,
            #00D4FF
          );
          background-size: 300%;
          backdrop-filter: blur(5px);
          transition: background-position 0.7s ease-in-out;
          will-change: background;
          overflow: hidden;
          text-transform: uppercase;
          text-wrap: nowrap;
        }

        c-css-button:hover {
          background-position: right;
        }

        c-css-button button {
          transition: box-shadow 0.2s ${g};
        }

        c-css-button button.dark {
          box-shadow: inset -1px -1px 1px rgba(76, 27, 94, 0.24), inset 1px 1px 1px rgba(76, 27, 94, 0.23), inset -1px -1px 2px rgba(76, 27, 94, 0.17), inset 1px 1px 4px rgba(76, 27, 94, 0.2);
          background: radial-gradient(circle at 0% 50%, rgba(76, 27, 94, 0.15) 0%, transparent 100%);
        }

        c-css-button svg {
          margin-left: 26px;
          transition: stroke 0.2s ${g};
          will-change: stroke;
        }

        c-css-button svg.mini {
          margin-left: 15px;
        }

        c-css-button > div {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        c-css-button:after {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 0% 50%, var(--color-white) 0%, var(--color-white) 100%) !important;
          opacity: 0;
          transition: opacity 0.5s ${g};
          will-change: opacity;
          pointer-events: none;
        }

        c-css-button:hover {
          transform: scale(1.);
        }

        c-css-button:hover:after {
          opacity: 0;
        }

        c-css-button p {
          display: flex;
          justify-content: center;
          transition: color 0.2s ${g};
          will-change: color;
        }

        c-css-button p:nth-child(0) {
          margin-top: -100%;
          top: 31%;
        }

        c-css-button p:last-child {
          position: absolute;
          transition: top 0.2s ${g};
          top: 200%;
        }

        c-css-button .content {
          text-transform: uppercase;
          z-index: 1;
          height: 50%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.4s ${g};
          will-change: transform;
          transform: translateY(0%);
        }

        c-css-button:hover .content {
          transform: translateY(-200%);
        }

        c-css-button button.dark .content p {
          transition: color 0.4s ${g};
        }

        c-css-button button.dark:hover .content p {
          color: var(--color-white) !important;
        }
        c-css-button button.dark:hover .content path {
          stroke: var(--color-white) !important;
        }
      `})}forgeGardient(t){let e="radial-gradient(circle at 0% 0%, ";return t.forEach((o,s)=>{e+=`${o} ${s/(t.length-2)*100}%`,s!==t.length-1&&(e+=", ")}),e+=")",e}onMount(){C.subscribe(t=>{const e=["rgba(255, 255, 255, 0.1)","rgba(255, 255, 255, 0.1)"];if(t==="dark"){const o=[...e,"#0757A4","#009286","#54DBB0","#00D4FF"];this.style.backgroundImage=`linear-gradient(90deg, ${o[0]}, ${o[1]} 33%, ${o[2]} 66%, ${o[3]})`}else{const o=[...e,"#C138EB","#FF5462","#C138EB","#8071B4"];this.style.backgroundImage=this.forgeGardient(o)}})}render(){const t=this.props.dark?"dark hover:text-white":"",e=this.props.dark?"text-dark":"text-white",o=this.props.dark?"var(--color-dark)":"var(--color-white)",s=this.props.mini?"px-[15px] py-[5px]":"px-[38px] py-5",n=this.props.mini?"text-[13px]":"text-base",i=this.props.mini?"w-[13px] h-[12px] mt-[1px]":"w-[19px] h-[21px]";return`<button
        key="button"
        class="
          ${R}
          ${t}
          ${s}
          pointer-events-auto
          disabled:opacity-50 disabled:cursor-not-allowed
          flex justify-center items-center relative overflow-hidden bg-white/10 cursor-pointer
          hover:bg-white/20 transition-colors duration-200
        "
      >
        <div class="flex-grow-0 flex-shrink-0 bg-[#fff6f1]/[0.01]"></div>
        <div class="content">
          <p
            class="flex-grow-0 flex-shrink-0 text-left ${e} ${n}"
          >
            ${this.props.content} ${Lt(o,i,this.props.mini)}
          </p>
          <p
            class="flex-grow-0 flex-shrink-0 text-left ${e} ${n}"
          >
            ${this.props.content} ${Lt(o,i,this.props.mini)}
          </p>
        </div>
      </button> `}};const Lt=(r="var(--color-white)",t="w-[19px] h-[21px]",e=!1)=>`<svg
    class="${t} ${e?"mini":""}"
    viewBox="0 0 19 21"
    fill="none"
    style="stroke: ${r};"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 1.5L7.65289 10.5L2 19.5" stroke-width="2.66667" />
    <path d="M11.6528 1.5L17.3057 10.5L11.6528 19.5" stroke-width="2.66667" />
  </svg> `;customElements.get("c-css-button")||customElements.define("c-css-button",xe);const be=`
  attribute vec2 uv;
  attribute vec2 position;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`,ye=`
precision highp float;

uniform sampler2D iVideo;
uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform float globalAlpha;

varying vec2 vUv;

void main() {
    vec3 videoColor = texture2D(iVideo, vUv).rgb;
    vec3 targetColor = vec3(0.463, 0.988, 0.302); // #76fc4d in RGB
    float tolerance = 0.65;
    
    float diff = length(videoColor - targetColor);
    float isTarget = 1.0 - step(tolerance, diff);
    float alpha = 1. - isTarget;

    if (vUv.y > 0.9) {
      alpha = 0.0;
    }

    gl_FragColor = vec4(videoColor, alpha * globalAlpha);
}
`;class we extends x{tpl;program;video=null;videoTexture=null;inView=!1;rendering=!0;onInView(t){this.inView=!0}onOutView(t){this.inView=!1}onUnmount(){this.rendering=!1}constructor(){super({plugins:[S,O]})}onMount(){const t=this.$("div");this.video=document.createElement("video"),this.video.src="./videos/Comp 1_1.webm",this.video.crossOrigin="anonymous",this.video.loop=!0,this.video.muted=!0,this.video.autoplay=!0,this.video.playsInline=!0,this.video.style.display="none",document.body.appendChild(this.video);const e=new K({alpha:!0}),o=e.gl;t.appendChild(o.canvas),o.clearColor(0,0,0,0);const s=new ft(o);this.videoTexture=new ct(o,{minFilter:o.NEAREST,magFilter:o.NEAREST,format:o.RGBA}),this.program=new Q(o,{depthTest:!1,depthWrite:!1,vertex:be,fragment:ye,transparent:!0,uniforms:{iResolution:{value:new I(t.clientWidth,t.clientHeight)},globalAlpha:{value:0},iTime:{value:0},iVideo:{value:this.videoTexture}}});const n=new tt(o,{geometry:s,program:this.program}),i=l=>{this.rendering&&(requestAnimationFrame(i),this.inView&&(this.program.uniforms.iTime.value=l*.001,this.video&&this.video.readyState>=this.video.HAVE_CURRENT_DATA&&this.videoTexture&&(this.videoTexture.image=this.video,this.videoTexture.needsUpdate=!0,this.program.uniforms.globalAlpha.value=1),e.render({scene:n})))};this.video.play().catch(l=>{console.warn("Video play failed:",l)});const a=()=>{const c=Math.round(1080);e.gl.canvas.width=607,e.gl.canvas.height=c,e.gl.canvas.style.width="607px",e.gl.canvas.style.height=c+"px",e.setSize(607,c)};window.addEventListener("resize",a,!1),a(),requestAnimationFrame(i)}render(){this.tpl(y`<div
        class="absolute top-0 left-0 w-full h-full mix-blend-plus-lighter"
      ></div>`)}}customElements.get("c-stairs")||customElements.define("c-stairs",we);const $o=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Ce=`
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,ke=`
  precision highp float;
  uniform sampler2D uColor;
  uniform sampler2D uDepth;
  uniform vec2 uMouseLerp;
  uniform float uStrength;
  uniform float uHeight;
  uniform float uAspect;
  uniform float uMargin;
  uniform float uCropOffset;
  uniform float uCropScale;
  uniform float uImageScale; // <-- Add this
  varying vec2 vUv;
  void main() {
    // Crop horizontally if needed
    vec2 croppedUv = vUv;
    croppedUv.x = uCropOffset + vUv.x * uCropScale;
    croppedUv.x = vUv.x * uAspect;
    croppedUv.x -= uMargin * uAspect;

    // --- SCALE THE IMAGE ---
    float addY = 1.0 - 1.0 / uImageScale;
    vec2 scaledUv = (croppedUv - 0.5) / uImageScale + 0.5;
    scaledUv.y += addY * 0.5;



    // Mouse from [-1,1] in both axes, no aspect correction
    vec2 mouse = (uMouseLerp - 0.5) * 2.0;
    float maxMove = 1.0;
    mouse = clamp(mouse, vec2(-maxMove), vec2(maxMove));
    float depth = texture2D(uDepth, scaledUv).r;
    float alphaDepth = texture2D(uDepth, scaledUv).a;
    float parallax = (1.0 - depth);
    vec2 offset = mouse * parallax * uStrength;
    vec2 uv = clamp(scaledUv + offset, 0.001, 0.999);
    vec4 color = texture2D(uColor, uv);
    float alpha = color.a;
    if (alphaDepth < 1.0) alpha *= alphaDepth;

    // --- FOG BASED ON DEPTH ---
    vec3 fogColor = vec3(0.1, 0.12, 0.2); // Adjust as needed
    float fogStart = 0.1; // Depth at which fog starts (0 = near, 1 = far)
    float fogEnd = 1.0;   // Depth at which fog is fully applied
    float fogFactor = smoothstep(fogStart, fogEnd, 1. - depth);
    vec3 finalColor = mix(color.rgb, fogColor, fogFactor * 0.5);

    gl_FragColor = vec4(finalColor, alpha);
  }
`,Dt={src:"./images/mountain-Bav45N-m.webp"},Ht={src:"./images/depth-CrAbJ0nd.png"};class Ee extends x{tpl;program;mesh;renderer;camera;uniforms;colorImage=null;depthImage=null;mouseTarget=new I(.5,.5);inView=!1;rendering=!0;constructor(){super({plugins:[S,O]})}onInView(t){this.inView=!0}onOutView(t){this.inView=!1}set color(t){this.colorImage=t,this._tryLoadTextures()}set depth(t){this.depthImage=t,this._tryLoadTextures()}async _tryLoadTextures(){if(this.program){if(this.colorImage){const t=await this._ensureImage(this.colorImage);this.imageWidth=t.naturalWidth||t.width,this.imageHeight=t.naturalHeight||t.height,this.computeAspect(),this.uniforms.uColor.value=new ct(this.renderer.gl,{image:t,premultiplyAlpha:!0,flipY:!1}),this._updateCropUniforms()}if(this.depthImage){const t=await this._ensureImage(this.depthImage);this.uniforms.uDepth.value=new ct(this.renderer.gl,{image:t,premultiplyAlpha:!0,flipY:!1})}}}computeAspect(){this.imageWidth&&(this.program.uniforms.uAspect.value=window.innerWidth/this.imageWidth,this.program.uniforms.uMargin.value=(window.innerWidth-this.imageWidth)/window.innerWidth*.5)}_updateCropUniforms(){const t=this.imageWidth/this.imageHeight,e=window.innerWidth/window.innerHeight;let o=0,s=1;e>t&&(s=t/e,o=(1-s)/2),this.uniforms.uCropOffset.value=o,this.uniforms.uCropScale.value=s}_ensureImage(t){return typeof t!="string"?Promise.resolve(t):new Promise((e,o)=>{const s=new window.Image;s.onload=()=>e(s),s.onerror=o,s.src=t})}onMount(){const t=this.$("div");this.color=Dt.src,this.depth=Ht.src,this.renderer=new K({dpr:2,alpha:!0});const e=this.renderer.gl;t.appendChild(e.canvas),this.camera=new ee(e,{fov:30}),this.camera.position.z=2;const o=new oe(e,{position:{size:2,data:new Float32Array([-1,-1,1,-1,1,1,-1,1])},uv:{size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},index:{data:new Uint16Array([0,1,2,2,3,0])}});this.uniforms={uColor:{value:null},uDepth:{value:null},uMouse:{value:new I(.5,.5)},uMouseLerp:{value:new I(.5,.5)},uStrength:{value:.1},uAspect:{value:window.innerWidth/window.innerHeight},uHeight:{value:t.innerHeight},uMargin:{value:0},uCropOffset:{value:0},uCropScale:{value:1},uImageScale:{value:1}},J.subscribe(i=>{i.width<=1024?this.uniforms.uImageScale.value=.5:this.uniforms.uImageScale.value=1}),this.program=new Q(e,{vertex:Ce,fragment:ke,uniforms:this.uniforms,transparent:!0,cullFace:null,depthTest:!0,depthWrite:!1}),this.mesh=new tt(e,{geometry:o,program:this.program}),window.addEventListener("mousemove",i=>{this.mouseTarget.set(i.clientX/window.innerWidth,1-i.clientY/window.innerHeight)}),window.addEventListener("touchmove",i=>{if(i.touches.length){const a=i.touches[0];this.mouseTarget.set(a.clientX/window.innerWidth,1-a.clientY/window.innerHeight)}},{passive:!1});const s=()=>{if(!this.rendering||(requestAnimationFrame(s),!this.inView))return;const i=W.getCurrent();this.uniforms.uMouseLerp.value.y=.5,this.uniforms.uMouseLerp.value.x=ht(0,1,i.x/window.innerWidth,.47,.53),this.uniforms.uColor.value&&this.uniforms.uDepth.value&&this.renderer.render({scene:this.mesh,camera:this.camera})};s();const n=()=>{const a=this.$("div").clientHeight;this.renderer.setSize(window.innerWidth,a),this.camera.perspective({aspect:window.innerWidth/a}),this.uniforms.uHeight.value=a,this.uniforms.uAspect.value=window.innerWidth/a,this.computeAspect(),this._updateCropUniforms()};window.addEventListener("resize",n,!1),n(),this._tryLoadTextures()}onUnmount(){this.rendering=!1}render(){this.tpl(y`<div
        class="absolute top-0 left-0 z-11 w-full h-full pointer-events-none"
      ></div>`)}}customElements.get("c-parallax-depth")||customElements.define("c-parallax-depth",Ee);const Se=`
  attribute vec2 uv;
  attribute vec2 position;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`,Le=`
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float speed;
uniform float scale;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform vec3 color5;

// 3D Simplex noise by Ashima Arts
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod289(i);
    vec4 p = permute( permute( permute(
      vec4(i.z, i.z + i1.z, i.z + i2.z, i.z + 1.0))
      + vec4(i.y, i.y + i1.y, i.y + i2.y, i.y + 1.0))
      + vec4(i.x, i.x + i1.x, i.x + i2.x, i.x + 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * vec3(1.0, 2.0, 3.0) - vec3(0.0, 1.0, 2.0) * n_;
    vec4 j = p - 149.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = (x_ * ns.x) + ns.y;
    vec4 y = (y_ * ns.x) + ns.y;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m *= m;
    return 100.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec3 palette(float t) {
    if (t < 0.25) {
        float f = smoothstep(0.0, 0.25, t);
        return mix(color1, color2, f);
    } else if (t < 0.5) {
        float f = smoothstep(0.25, 0.5, t);
        return mix(color2, color3, f);
    } else if (t < 0.75) {
        float f = smoothstep(0.5, 0.75, t);
        return mix(color3, color4, f);
    } else {
        float f = smoothstep(0.75, 1.0, t);
        return mix(color4, color5, f);
    }
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    // Keep same visual aspect correction but avoid extra ops
    float aspect = (iResolution.x / iResolution.y) * 0.5;
    uv = (uv - 0.5) * vec2(aspect, 1.0) + 0.5;
    uv *= 2.5;

    float n = snoise(vec3(uv * scale + iTime * 0.1, iTime * speed));
    // Single clamp after composition
    n = clamp(0.5 + 0.5 * n + 0.5 - abs(cos(sin(iTime * speed)) * 0.5), 0.0, 1.0);

    gl_FragColor = vec4(palette(n), 1.0);
}
`;class $e extends x{tpl;colors;program;targets;rendering=!0;inView=!1;viewport;firstDraw=!1;constructor(){super({plugins:[S,O],props:{forceInView:!1,noResize:!1,scale:1,speed:.15,colors:{dark:["#34153d","#4C1B5E","#8071B4","#009286","#0757A4"],light:["#FF5462","#E6349A","#ffe86d","#f56c5c","#E6349A"]}}})}setColors(t){this.targets.color1=this.colors[t][0],this.targets.color2=this.colors[t][1],this.targets.color3=this.colors[t][2],this.targets.color4=this.colors[t][3],this.targets.color5=this.colors[t][4],this.firstDraw=!1}onUpdate(t,e){this.firstDraw=!1}onMount(){const t=this.$("div");this.viewport=new Wt(t),window.addEventListener("scroll",()=>{this.viewport.update(),this.inView=this.viewport.isInViewport()}),this.colors={dark:[A(this.props.colors.dark[0]),A(this.props.colors.dark[1]),A(this.props.colors.dark[2]),A(this.props.colors.dark[3]),A(this.props.colors.dark[4])],light:[A(this.props.colors.light[0]),A(this.props.colors.light[1]),A(this.props.colors.light[2]),A(this.props.colors.light[3]),A(this.props.colors.light[4])]};const e=new K({dpr:.5}),o=e.gl;t.appendChild(o.canvas),o.clearColor(0,0,0,0);const s=new ft(o);this.targets={color1:this.colors.dark[0],color2:this.colors.dark[1],color3:this.colors.dark[2],color4:this.colors.dark[3],color5:this.colors.dark[4]},this.program=new Q(o,{depthTest:!1,depthWrite:!1,vertex:Se,fragment:Le,transparent:!0,uniforms:{iResolution:{value:new I(window.innerWidth,window.innerHeight)},iTime:{value:0},speed:{value:this.props.speed},scale:{value:this.props.scale},color1:{value:this.targets.color1},color2:{value:this.targets.color2},color3:{value:this.targets.color3},color4:{value:this.targets.color4},color5:{value:this.targets.color5}}}),C.subscribe(h=>{this.setColors(h),this.firstDraw=!1}),this.setColors(C.get());const n=new tt(o,{geometry:s,program:this.program});this.rendering=!0;const i=()=>window.innerWidth<=1024;let a=0,l=0;const c=h=>{if(!this.rendering)return;requestAnimationFrame(c),a===0&&(a=h);const f=h-a,L=Math.min(f,100)*.003;a=h,!(i()&&this.firstDraw||!this.inView&&!this.props.forceInView&&this.firstDraw)&&(l+=L*this.props.speed,this.program.uniforms.iTime.value=l,this.program.uniforms.color1.value=this.targets.color1,this.program.uniforms.color2.value=this.targets.color2,this.program.uniforms.color3.value=this.targets.color3,this.program.uniforms.color4.value=this.targets.color4,this.program.uniforms.color5.value=this.targets.color5,e.render({scene:n}),this.firstDraw=!0)};requestAnimationFrame(c);let p=!1;const u=()=>{p&&this.props.noResize?(o.canvas.style.width="100%",o.canvas.style.height="100%"):(e.setSize(t.clientWidth,t.clientHeight),this.program.uniforms.iResolution.value=new I(t.clientWidth,t.clientHeight)),p=!0};let d;const m=()=>{d&&clearTimeout(d),d=setTimeout(()=>{this.props.noResize||(this.firstDraw=!1),u()},100)};this.props.noResize||(window.addEventListener("resize",m,!1),new ResizeObserver(m).observe(t)),m(),setTimeout(()=>{this.props.noResize||m(),this.firstDraw=!0},500)}onUnmount(){this.rendering=!1}render(){this.firstDraw=!1,this.tpl(y`<div class="absolute top-0 left-0 w-full h-full"></div>`)}}customElements.get("c-gradient")||customElements.define("c-gradient",$e);const To=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Te={src:"./images/card-list-title-illustration-C6es1SES.svg"};class _e extends x{tpl;allCards=[];filteredCards=[];currentCategory="all-cards";currentSearchTerm="";isFiltering=!1;constructor(){super({plugins:[S],props:{cards:{type:"string",default:"[]"},categories:{type:"string",default:"[]"}},styles:`
        tarot-category-grid-component {
          display: block;
          width: 100%;
        }

        .category-section {
          margin-bottom: 60px;
        }

        @media (min-width: 640px) {
          .category-section {
            margin-bottom: 70px;
          }
        }

        @media (min-width: 768px) {
          .category-section {
            margin-bottom: 80px;
          }
        }

        .category-title-container {
          max-width: 1920px;
          margin: 0 auto 40px;
          position: relative;
          z-index: 13;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .category-title-container {
            margin-bottom: 50px;
          }
        }

        @media (min-width: 768px) {
          .category-title-container {
            margin-bottom: 60px;
          }
        }

        .category-title {
          position: relative;
          font-family: 'Gunter', sans-serif;
          font-weight: normal;
          font-size: 24px;
          line-height: 92%;
          color: var(--color-dark);
        }

        @media (min-width: 640px) {
          .category-title {
            font-size: 28px;
          }
        }

        @media (min-width: 768px) {
          .category-title {
            font-size: 32px;
          }
        }

        .dark .category-title {
          color: var(--color-violet);
        }

        .category-title-text {
          position: relative;
          z-index: 10;
        }

        .category-title-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .tarot-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
          transition: opacity 500ms ${z};
        }

        @media (min-width: 640px) {
          .tarot-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }
        }

        @media (min-width: 768px) {
          .tarot-grid {
            gap: 30px;
          }
        }

        @media (min-width: 1024px) {
          .tarot-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 35px;
          }
        }

        @media (min-width: 1280px) {
          .tarot-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
          }
        }

        @media (min-width: 1536px) {
          .tarot-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .tarot-card-item {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 600ms ${z} forwards;
          min-width: 0;
          width: 100%;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          opacity: 0;
          animation: fadeIn 400ms ${z} forwards;
        }

        @media (min-width: 640px) {
          .empty-state {
            padding: 50px 20px;
          }
        }

        @media (min-width: 768px) {
          .empty-state {
            padding: 60px 20px;
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .dark .tarot-card {
          background: linear-gradient(to bottom, var(--card-bg-dark), var(--card-bg-dark)) !important;
          border-color: var(--card-border-dark) !important;
        }
      `})}connectedCallback(){super.connectedCallback();try{this.allCards=JSON.parse(this.props.cards),this.filteredCards=[...this.allCards]}catch(t){console.error("Failed to parse cards:",t),this.allCards=[],this.filteredCards=[]}document.addEventListener("tarot-filter",this.handleFilter.bind(this)),document.addEventListener("tarot-search",this.handleSearch.bind(this)),this.render()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("tarot-filter",this.handleFilter.bind(this)),document.removeEventListener("tarot-search",this.handleSearch.bind(this))}handleFilter(t){const{category:e}=t.detail;this.currentCategory=e,this.applyFilters()}handleSearch(t){const{searchTerm:e}=t.detail;this.currentSearchTerm=e.toLowerCase().trim(),this.applyFilters()}applyFilters(){if(this.isFiltering=this.currentSearchTerm!==""||this.currentCategory!=="all-cards",this.isFiltering){let t=[...this.allCards];this.currentCategory&&this.currentCategory!=="all-cards"&&(t=t.filter(e=>e.category?.toLowerCase().replace(/\s+/g,"-")===this.currentCategory)),this.currentSearchTerm&&(t=t.filter(e=>(e.title?.toLowerCase()||"").includes(this.currentSearchTerm))),this.filteredCards=t}this.render()}groupCardsByCategory(){const t={};return this.allCards.forEach(e=>{const o=e.category?.toLowerCase().replace(/\s+/g,"-")||"unknown";t[o]||(t[o]=[]),t[o].push(e)}),t}renderCategoryTitle(t){return`
      <div class="category-title-container">
        <h3 class="category-title">
          <span class="category-title-text">${t.toUpperCase()}</span>
          <img 
            src="${Te.src}" 
            class="category-title-bg" 
            alt=""
            aria-hidden="true"
          />
        </h3>
      </div>
    `}getCategoryColors(t){const e=t?.toLowerCase().replace(/\s+/g,"-")||"";return{pentacles:{bg:"rgba(23, 184, 184, 0.15)",bgDark:"rgba(23, 184, 184, 0.25)",border:"rgba(23, 184, 184, 0.6)",borderDark:"rgba(23, 184, 184, 0.8)",borderHover:"rgb(23, 184, 184)",shadow:"rgba(23, 184, 184, 0.3)"},swords:{bg:"rgba(107, 76, 154, 0.15)",bgDark:"rgba(107, 76, 154, 0.25)",border:"rgba(107, 76, 154, 0.6)",borderDark:"rgba(107, 76, 154, 0.8)",borderHover:"rgb(107, 76, 154)",shadow:"rgba(107, 76, 154, 0.3)"},cups:{bg:"rgba(155, 123, 181, 0.15)",bgDark:"rgba(155, 123, 181, 0.25)",border:"rgba(155, 123, 181, 0.6)",borderDark:"rgba(155, 123, 181, 0.8)",borderHover:"rgb(155, 123, 181)",shadow:"rgba(155, 123, 181, 0.3)"},wands:{bg:"rgba(255, 133, 133, 0.15)",bgDark:"rgba(255, 133, 133, 0.25)",border:"rgba(255, 133, 133, 0.6)",borderDark:"rgba(255, 133, 133, 0.8)",borderHover:"rgb(255, 133, 133)",shadow:"rgba(255, 133, 133, 0.3)"},"major-arcana":{bg:"rgba(84, 219, 176, 0.15)",bgDark:"rgba(84, 219, 176, 0.25)",border:"rgba(84, 219, 176, 0.6)",borderDark:"rgba(84, 219, 176, 0.8)",borderHover:"rgb(84, 219, 176)",shadow:"rgba(84, 219, 176, 0.3)"}}[e]||{bg:"rgba(128, 113, 180, 0.15)",bgDark:"rgba(128, 113, 180, 0.25)",border:"rgba(128, 113, 180, 0.6)",borderDark:"rgba(128, 113, 180, 0.8)",borderHover:"rgb(128, 113, 180)",shadow:"rgba(128, 113, 180, 0.3)"}}renderCard(t,e){const o=t.keywords?t.keywords.split("•").map(i=>i.trim()):[],s=t.image?.url?nt(t.image.url):"",n=this.getCategoryColors(t.category);return`
      <div
        class="tarot-card-item"
        style="animation-delay: ${e*50}ms;"
      >
        <article
          class="tarot-card
            relative w-full h-full
            backdrop-blur-sm
            border-2
            overflow-hidden
            transition-all duration-500
            hover:scale-[1.02] hover:shadow-2xl
            flex flex-col"
          style="
            --card-bg-light: ${n.bg};
            --card-bg-dark: ${n.bgDark};
            --card-border-light: ${n.border};
            --card-border-dark: ${n.borderDark};
            --card-border-hover: ${n.borderHover};
            --card-shadow: ${n.shadow};
            background: linear-gradient(to bottom, var(--card-bg-light), var(--card-bg-light));
            border-color: var(--card-border-light);
          "
          onmouseenter="this.style.borderColor='var(--card-border-hover)'; this.style.boxShadow='0 25px 50px -12px var(--card-shadow)'"
          onmouseleave="this.style.borderColor=document.documentElement.classList.contains('dark') ? 'var(--card-border-dark)' : 'var(--card-border-light)'; this.style.boxShadow=''"
        >
            <!-- Card Image -->
            <div class="relative w-full overflow-hidden">
              ${s?`<img
                      src="${s}"
                      alt="${t.title}"
                      loading="lazy"
                      decoding="async"
                      class="w-full h-auto transition-transform duration-500 hover:scale-105"
                    />`:`<div class="w-full aspect-[2/3] bg-gradient-to-br from-violet/40 to-purple/40 flex items-center justify-center">
                      <span class="text-white/50 text-[48px]">🔮</span>
                    </div>`}
            </div>

            <!-- Card Content -->
            <div class="flex-1 px-[20px] py-[20px] flex flex-col gap-[12px]">
              <!-- Keywords -->
              ${o.length>0?`<p
                      class="font-['Alte-Haas-Grotesk'] font-bold
                        text-[16px]
                        leading-[23px]
                        tracking-[-0.22px]
                        text-dark dark:text-white
                        text-center
                        uppercase"
                    >
                      ${o.slice(0,3).join(" • ")}
                    </p>`:""}

              <!-- Short Description -->
              ${t.short_description?`<p
                      class="font-['Alte-Haas-Grotesk'] font-normal
                        text-[15px]
                        leading-[23px]
                        text-dark dark:text-white
                        text-center"
                    >
                      ${t.short_description}
                    </p>`:""}
            </div>
          </article>
      </div>
    `}renderCategorySection(t,e){return e.length===0?"":`
      <section class="category-section">
        ${this.renderCategoryTitle(t)}
        <div class="tarot-grid">
          ${e.map((o,s)=>this.renderCard(o,s)).join("")}
        </div>
      </section>
    `}renderAllCategories(){const t=["Major Arcana","Wands","Cups","Swords","Pentacles"],e=this.groupCardsByCategory();return`<div class="tarot-category-grids-container">${t.map(s=>{const n=s.toLowerCase().replace(/\s+/g,"-"),i=e[n]||[];return this.renderCategorySection(s,i)}).join("")}</div>`}renderFilteredGrid(){return`<div class="tarot-filtered-grid-container">${this.filteredCards.length>0?`<div class="tarot-grid">
          ${this.filteredCards.map((o,s)=>this.renderCard(o,s)).join("")}
        </div>`:`<div class="empty-state">
          <div class="text-[64px] mb-[20px]">🔮</div>
          <h3 class="font-[Lemon] text-[32px] md:text-[48px] font-bold text-violet dark:text-violet mb-[12px] uppercase">
            No Cards Found
          </h3>
          <p class="${R} text-dark dark:text-white opacity-60">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>`}</div>`}render(){this.isFiltering?this.template.innerHTML=this.renderFilteredGrid():this.template.innerHTML=this.renderAllCategories()}}customElements.get("tarot-category-grid-component")||customElements.define("tarot-category-grid-component",_e);class Me extends x{tpl;inView=!1;rendering=!0;constructor(){super({plugins:[O]})}onInView(t){this.inView=!0}onOutView(t){this.inView=!1}onUnmount(){this.rendering=!1}onMount(){const t=[...this.$("svg > g")],e=[1,-1,1,-1,1,-1,1,-1,1,-1,1,-1],o=D.get();t.forEach((a,l)=>{a.style.opacity=0,a.style.transform=`translateY(${50*(t.length-l)}px)`,a.style.transition=`transform 1s ${z}, opacity 1s ${z}`,a.style.willChange="transform, opacity",a.style.transitionDelay=`${(t.length-l)*75}ms`}),D.subscribe(a=>{a&&setTimeout(()=>{setTimeout(()=>{t.forEach(l=>{l.style.transform="translateY(0px)",l.style.opacity=1})},0),setTimeout(()=>{t.forEach(c=>{c.style.transition=`transform 0.2s ${g}, opacity 0.2s ${g}`,c.style.willChange="transform, opacity",c.style.transitionDelay="none"});const l=()=>{if(!this.rendering||(requestAnimationFrame(l),!this.inView))return;const p=W.getCurrent().x/window.innerWidth-.5,u=15;t.forEach((d,m)=>{const h=e[m],f=`translate(${p*u*h}px, 0px)`;d.style.transform=f})};l()},1500)},o?0:2e3)});const s=this.$("svg");s.style.willChange="transform, filter";const n=w(),i=a=>{s.style.transform=`translateY(${-150+a.y*5e3}px)`,s.style.filter=`blur(${3+a.y*100}px)`};n.onProgress(i),i(n.getProgress())}render(){return`<svg
      version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178 206" width="100%" height="100%"
      class="overflow-visible scale-50 md:scale-100"
   >
    <title>Group 27</title>
    <defs>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
          <path d="m142.17 194.92h-104.17v10.26h104.17z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp2">
          <path d="m90.08 205.18c19.54 0 37.58-3.82 52.08-10.26h-104.16c14.51 6.44 32.54 10.26 52.08 10.26z"/>
       </clipPath>
       <linearGradient id="g1" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-52.086,-52.085,52.085,-52.086,111.913,223.323)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp3">
          <path d="m159.88 174.4h-138.88v20.52h138.88z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp4">
          <path d="m90.44 194.92h0.02c28.39 0 53.6-8.06 69.43-20.52h-138.89c15.83 12.46 41.04 20.52 69.44 20.52z"/>
       </clipPath>
       <linearGradient id="g2" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-69.438,-69.438,69.438,-69.438,123.699,214.717)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp5">
          <path d="m170.15 153.89h-159.15v20.52h159.15z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp6">
          <path d="m90.57 163.23c14.46 0 27.51-3.59 36.72-9.35h42.86c-6.04 8.17-15.58 15.23-27.49 20.52h-104.17c-11.91-5.29-21.45-12.35-27.49-20.52h42.86c9.21 5.75 22.25 9.35 36.72 9.35"/>
       </clipPath>
       <linearGradient id="g3" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-79.946,-79.945,79.945,-79.946,125.552,198.813)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp7">
          <path d="m175.12 133.37h-170.12v20.52h170.12z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp8">
          <path d="m90.06 152.97c21.81 0 40.39-8.17 47.47-19.61h37.59c-2.6 7.58-8.03 14.55-15.62 20.52h-138.89c-7.58-5.96-13.01-12.94-15.62-20.52h37.59c7.08 11.44 25.66 19.61 47.47 19.61"/>
       </clipPath>
       <linearGradient id="g4" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-87.816,-87.815,87.815,-87.816,131.706,183.886)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp9">
          <path d="m54.08 112.85h-50.08v20.52h50.08z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp10">
          <path d="m4 112.85h36.26c0 7.95 5.25 15.17 13.82 20.52h-42.86c-2.32-3.14-4.13-6.45-5.35-9.88-1.23-3.43-1.87-6.99-1.87-10.64z"/>
       </clipPath>
       <linearGradient id="g5" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-35.299,-35.298,35.298,-35.299,45.975,140.392)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp11">
          <path d="m177.59 112.85h-50.08v20.52h50.08z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp12">
          <path d="m141.33 112.85h36.26c0 7.29-2.58 14.23-7.22 20.52h-42.86c8.56-5.35 13.82-12.57 13.82-20.52z"/>
       </clipPath>
       <linearGradient id="g6" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-24.777,-24.777,24.777,-24.777,169.167,137.638)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp13">
          <path d="m39.32 92.33h-39.32v20.52h39.32z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp14">
          <path d="m1.74 92.33h37.59c-1.98 3.2-3.06 6.65-3.06 10.26 0 3.61 1.08 7.06 3.06 10.26h-37.59c-1.14-3.32-1.74-6.75-1.74-10.26 0-3.51 0.6-6.94 1.74-10.26z"/>
       </clipPath>
       <linearGradient id="g7" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-29.055,-29.055,29.055,-29.055,32.028,116.731)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp15">
          <path d="m173.59 92.33h-39.32v20.52h39.32z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp16">
          <path d="m134.27 92.33h37.59c1.14 3.32 1.74 6.75 1.74 10.26 0 3.51-0.6 6.94-1.74 10.26h-37.59c1.98-3.2 3.06-6.66 3.06-10.26 0-3.6-1.08-7.06-3.06-10.26z"/>
       </clipPath>
       <linearGradient id="g8" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-29.055,-29.055,29.054,-29.055,165.118,116.189)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp17">
          <path d="m54.08 71.81h-50.08v20.52h50.08z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp18">
          <path d="m11.22 71.81h42.86c-8.56 5.35-13.82 12.57-13.82 20.52h-36.26c0-7.3 2.58-14.24 7.22-20.52z"/>
       </clipPath>
       <linearGradient id="g9" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-24.777,-24.777,24.777,-24.777,41.947,93.199)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp19">
          <path d="m177.59 71.81h-50.08v20.52h50.08z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp20">
          <path d="m127.51 71.81h42.85c4.65 6.28 7.22 13.22 7.22 20.52h-36.26c0-7.95-5.25-15.17-13.82-20.52"/>
       </clipPath>
       <linearGradient id="g10" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-35.299,-35.299,35.299,-35.299,168.859,99.48)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp21">
          <path d="m175.12 51.3h-170.12v20.52h170.12z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp22">
          <path d="m20.61 51.3h138.88c7.58 5.96 13.01 12.94 15.62 20.52h-37.59c-7.08-11.44-25.66-19.61-47.47-19.61-21.81 0-40.39 8.17-47.47 19.61h-37.58c2.6-7.58 8.04-14.55 15.62-20.52"/>
       </clipPath>
       <linearGradient id="g11" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-87.816,-87.816,87.816,-87.816,138.491,109.744)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp23">
          <path d="m170.15 30.78h-159.15v20.52h159.15z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp24">
          <path d="m38.49 30.78h104.17c11.91 5.29 21.45 12.35 27.49 20.52h-42.85c-9.21-5.76-22.25-9.35-36.72-9.35-14.47 0-27.51 3.59-36.72 9.35h-42.86c6.04-8.17 15.58-15.23 27.49-20.52z"/>
       </clipPath>
       <linearGradient id="g12" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-79.946,-79.945,79.946,-79.946,133.564,85.737)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp25">
          <path d="m159.88 10.26h-138.88v20.52h138.88z"/>
       </clipPath>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp26">
          <path d="m21 30.78h138.88c-15.83-12.46-41.04-20.52-69.44-20.52-28.4 0-53.6 8.06-69.44 20.52z"/>
       </clipPath>
       <linearGradient id="g13" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-69.437,-69.438,69.438,-69.438,133.355,61.343)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
       <clipPath clipPathUnits="userSpaceOnUse" id="cp27">
          <path d="m38 10.26h104.17c-14.51-6.44-32.54-10.26-52.09-10.26-19.55 0-37.58 3.82-52.08 10.26z"/>
       </clipPath>
       <linearGradient id="g14" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-52.086,-52.085,52.086,-52.086,116.995,33.448)">
          <stop offset="0" stop-color="#4c1b5e"/>
          <stop offset=".3" stop-color="#4c1b5e"/>
          <stop offset=".34" stop-color="#4c2462"/>
          <stop offset=".4" stop-color="#4d3d6c"/>
          <stop offset=".47" stop-color="#4f677e"/>
          <stop offset=".55" stop-color="#51a096"/>
          <stop offset=".63" stop-color="#54dbb0"/>
          <stop offset=".67" stop-color="#5ddbac"/>
          <stop offset=".74" stop-color="#76dda2"/>
          <stop offset=".83" stop-color="#a0e092"/>
          <stop offset=".94" stop-color="#d9e57b"/>
          <stop offset="1" stop-color="#ffe86d"/>
       </linearGradient>
    </defs>
    <style>
       .s0 { fill: url(#g1) } 
       .s1 { fill: url(#g2) } 
       .s2 { fill: url(#g3) } 
       .s3 { fill: url(#g4) } 
       .s4 { fill: url(#g5) } 
       .s5 { fill: url(#g6) } 
       .s6 { fill: url(#g7) } 
       .s7 { fill: url(#g8) } 
       .s8 { fill: url(#g9) } 
       .s9 { fill: url(#g10) } 
       .s10 { fill: url(#g11) } 
       .s11 { fill: url(#g12) } 
       .s12 { fill: url(#g13) } 
       .s13 { fill: url(#g14) } 
    </style>
    <g id="11">
       <g id="Clip-Path" clip-path="url(#cp1)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp2)">
                <g>
                   <path class="s0" d="m90.1 142.8l-57.2 57.3 57.2 57.2 57.2-57.2z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="10">
       <g id="Clip-Path" clip-path="url(#cp3)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp4)">
                <g>
                   <path class="s1" d="m90.4 105l-79.7 79.7 79.7 79.7 79.7-79.7z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="9">
       <g id="Clip-Path" clip-path="url(#cp5)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp6)">
                <g>
                   <path class="s2" d="m90.6 74.3l-89.9 89.9 89.9 89.8 89.8-89.8z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="8">
       <g id="Clip-Path" clip-path="url(#cp7)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp8)">
                <g>
                   <path class="s3" d="m90.1 48.3l-95.4 95.3 95.4 95.3 95.3-95.3z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="7">
       <g id="Clip-Path" clip-path="url(#cp9)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp10)">
                <g>
                   <path class="s4" d="m29 87.8l-35.3 35.3 35.3 35.3 35.3-35.3z"/>
                </g>
             </g>
          </g>
       </g>
       <g id="Clip-Path" clip-path="url(#cp11)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp12)">
                <g>
                   <path class="s5" d="m152.6 87.8l-35.3 35.3 35.3 35.3 35.3-35.3z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="6">
       <g id="Clip-Path" clip-path="url(#cp13)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp14)">
                <g>
                   <path class="s6" d="m19.7 72.7l-30 29.9 30 29.9 29.9-29.9z"/>
                </g>
             </g>
          </g>
       </g>
       <g id="Clip-Path" clip-path="url(#cp15)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp16)">
                <g>
                   <path class="s7" d="m153.9 72.7l-29.9 29.9 29.9 29.9 29.9-29.9z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="5">
       <g id="Clip-Path" clip-path="url(#cp17)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp18)">
                <g>
                   <path class="s8" d="m29 46.8l-35.3 35.3 35.3 35.3 35.3-35.3z"/>
                </g>
             </g>
          </g>
       </g>
       <g id="Clip-Path" clip-path="url(#cp19)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp20)">
                <g>
                   <path class="s9" d="m152.6 46.8l-35.3 35.3 35.3 35.3 35.3-35.3z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="4">
       <g id="Clip-Path" clip-path="url(#cp21)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp22)">
                <g>
                   <path class="s10" d="m90.1-33.8l-95.4 95.3 95.4 95.4 95.3-95.4z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="3">
       <g id="Clip-Path" clip-path="url(#cp23)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp24)">
                <g>
                   <path class="s11" d="m89.6-48.8l-89.9 89.8 89.9 89.9 89.8-89.9z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="2">
       <g id="Clip-Path" clip-path="url(#cp25)">
          <g>
             <g id="Clip-Path" clip-path="url(#cp26)">
                <g>
                   <path class="s12" d="m90.4-59.2l-79.7 79.7 79.7 79.7 79.7-79.7z"/>
                </g>
             </g>
          </g>
       </g>
    </g>
    <g id="1">
       <g id="Clip-Path">
          <g id="Clip-Path" clip-path="url(#cp27)">
             <g>
                <path class="s13" d="m90.1-52.1l-57.2 57.2 57.2 57.2 57.2-57.2z"/>
             </g>
          </g>
       </g>
    </g>
 </svg>`}}customElements.get("c-ring")||customElements.define("c-ring",Me);class Ae extends x{static observedAttrs=["items","duration","height","bg","color"];constructor(){super({shadow:!1,props:{items:{type:"array",default:["Infinite Sliding Text Demo","Masked Gradient Sides","Responsive","No JavaScript"],reflect:!0},duration:{type:"number",default:12,reflect:!0},height:{type:"string",default:"64px",reflect:!0},bg:{type:"string",default:"#23272f",reflect:!0},color:{type:"string",default:"#fff",reflect:!0}},styles:`
        .slider-container {
        position: relative;
        width: 100%;
        max-width: 700px;
        height: 100%;
        overflow: hidden;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        display: flex;
        align-items: center;
        margin: auto;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%);
        mask-image: linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%);
      }
      .slider-track {
        display: flex;
        align-items: center;
        height: 100%;
        animation: slide-left 30s linear infinite;
        user-select: none;
        white-space: nowrap;
      }
      @keyframes slide-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .slider-sequence {
        display: inline-block;
      }
      .slider-sequence .slider-text::after {
        content: " • ";
        opacity: 0.7;
        margin: 0 0.5em;
      }
      .slider-sequence {
        font-size: 13px !important;
      }
      `})}render(t){const{items:e}=t,o=e.map(s=>`<span class="slider-text">${s}</span>`).join("");return`
      <div class="slider-container">
        <div class="slider-track">
          <span class="slider-sequence">${o}</span>
          <span class="slider-sequence">${o}</span>
        </div>
      </div>
    `}}customElements.get("infinite-sliding-text")||customElements.define("infinite-sliding-text",Ae);class Ue extends x{tpl;constructor(){super({plugins:[S,pt],props:{mode:C},styles:`
        c-mode {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
          background: radial-gradient(circle at 0% 50%, rgba(255, 246, 241, 0.5) 0%, transparent 100%);
          backdrop-filter: blur(5px);
          transition: background 0.2s ${g};
          will-change: background;
          overflow: hidden;
          text-transform: uppercase;
        }
      `})}onMount(){C.subscribe(t=>{t==="dark"?document.body.classList.add("dark"):document.body.classList.remove("dark")}),this.plugins.interval(()=>{this.update()},1e3)}toggle(){this.set("mode",t=>t==="dark"?"light":"dark")}render(){const t=this.props.mode==="dark"?y`
            <svg
              width="22"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              key="dark"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          `:y`
            <svg
              width="22"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              key="light"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          `;this.tpl(y`
      <div
        class="${ut(["text-xs text-left px-5 py-[5px] flex items-center gap-2.5 rounded w-fit cursor-pointer transition-color duration-200 will-change-color","hover:bg-white/25","pointer-events-auto pointer"])}"
        @click=${this.toggle.bind(this)}
      >
        ${t}
      </div>
    `)}}customElements.get("c-mode")||customElements.define("c-mode",Ue);const $t=[{title:"À PROPOS",slug:"a-propos",text:"À PROPOS DE NOUS"},{title:"SERVICES",slug:"services",text:"Découvrez nos services"},{title:"NOS PROJETS",slug:"nos-projets",text:"DÉCOUVREZ NOS DERNIÈRES CRÉATIONS • VOIR COMMENT NOUS CUISINONS"},{title:"LE STUDIO",slug:"le-studio",text:"LE STUDIO • L'ÉQUIPE • LE PROCESSUS"},{title:"LE CONNU",slug:"le-connu",text:"LISEZ NOS ARTICLES"},{title:"LA BOUTIQUE",href:"https://store.theunknown.tv",text:"SHOP LA BOUTIQUE",target:"_blank",rel:"noopener noreferrer"},{title:"CARRIÈRES",slug:"carrieres",text:"CARRIÈRES"},{title:"Contact",slug:"contact",text:"CONTACTEZ-NOUS"}],Tt=[{title:"About us",slug:"about-us",text:"ABOUT US"},{title:"Services",slug:"services",text:"Discover our services"},{title:"OUR WORK",slug:"our-work",text:"DISCOVER OUR LATEST WORKS • SEE HOW WE COOK THINGS"},{title:"The studio",slug:"the-studio",text:"THE STUDIO • THE TEAM • THE PROCESS"},{title:"The known",slug:"the-known",text:"READ OUR ARTICLES"},{title:"THE STORE",href:"https://store.theunknown.tv/",text:"SHOP THE STORE",target:"_blank",rel:"noopener noreferrer"},{title:"Careers",slug:"careers",text:"CAREERS"},{title:"Contact",slug:"contact",text:"CONTACT US"}];class ze extends x{inViewed=!1;menuBtn;tpl;constructor(){super({props:{opened:!1},plugins:[S,O]})}escape=t=>{t.key==="Escape"&&(this.toggle(),this.menuBtn.classList.remove("active"))};onInView(){this.inViewed=!0,this.update()}onOutView(){this.inViewed=!1,this.update()}onUpdate({opened:t}){const e=document.querySelector("c-mode"),o=document.querySelector("#lang-selector"),s=this.menuBtn,n=w();t?(this.classList.remove("top-[-50px]","h-[0px]"),this.classList.add("top-0","h-screen"),document.addEventListener("keydown",this.escape),e&&(e.style.transition="transform 300ms ease-in-out",e.style.transform="translateY(0%)"),o&&(o.style.transition="transform 300ms ease-in-out",o.style.transform="translateY(0%)"),s&&s.classList.add("active"),n&&n.disableScroll()):(document.removeEventListener("keydown",this.escape),this.classList.remove("top-0","h-screen"),this.classList.add("top-[-50px]","h-[0px]"),e&&(e.style.transition="transform 300ms ease-in-out",e.style.transform="translateY(-300%)"),o&&(o.style.transition="transform 300ms ease-in-out",o.style.transform="translateY(-300%)"),s&&s.classList.remove("active"),n&&n.enableScroll())}_initialized=!1;_timeModeUnsub=null;onMount(){this.menuBtn=document.getElementById("menu-btn"),this.classList.add("fixed","top-0","left-0","w-screen","h-[0px]","z-100"),this.style.transition=`top 300ms ${g}, height 300ms ${g}, filter 300ms ${g}`,this._initialized||(this._initialized=!0,document.addEventListener("astro:page-load",()=>{wt("./videos/menu.webm"),wt("./videos/menu-night.webm")})),this._timeModeUnsub?.();let t=C.get();this._timeModeUnsub=C.subscribe(e=>{if(e===t)return;t=e;const o=document.querySelector("c-menu-content video"),s=o?.querySelector("source");o&&s&&(s.src=e==="dark"?"./videos/menu-night.webm":"./videos/menu.webm",o.load())})}toggle(){this.set("opened",!this.props.opened),this.dispatchEvent(new CustomEvent("toggle",{detail:{opened:this.props.opened}}))}close(){this.set("opened",!1),this.dispatchEvent(new CustomEvent("close",{detail:{opened:!1}}))}render(){this.tpl(y`
      <div
        class="
          fixed top-0 left-0 w-screen bg-black/50 flex items-center justify-center z-100
          ${this.props.opened?"h-screen":"h-[0px]"}
        "
        style="transition: height 300ms ${z}; will-change: height;"
      >
        ${this.inViewed?y`<c-menu-content
                class="w-full h-full flex justify-center items-center mt-[-50px] sm:mt-0"
              ></c-menu-content>`:""}
        </div>
      </div>
    `)}}customElements.get("c-menu")||customElements.define("c-menu",ze);class Pe extends x{tpl;constructor(){super({plugins:[S],styles:`
        c-menu-content {
          background: var(--color-midnight);
        }

        c-menu-content .entry {
          position: relative;
          padding-top: 5px;
          opacity: 0.5;
          transition: all 300ms ${g};
          will-change: opacity, padding, font-variation-settings, line-height;
        }

        c-menu-content .entry:hover {
          padding-top: 50px;
          padding-bottom: 20px;
          opacity: 1;
        }

        c-menu-content .entry:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            white,
            transparent
          )
        }

        c-menu-content .entry:last-child:after {
          display: none;
        }

        c-menu-content .entry > span:first-child {
          position: relative;
          transition: all 450ms ${g};
        }

        c-menu-content .entry > span:first-child {
          font-variation-settings: 'wght' 400, 'Wide' 0;
          line-height: 100%;
        }

        c-menu-content .entry:hover > span:first-child {
          line-height: 150px;
          font-size: 200px;
          font-variation-settings: 'wght' 900, 'Wide' 10;
        }

        @media (max-width: 768px) {
          c-menu-content .entry > span:first-child {
            font-size: 50px;
            font-variation-settings: 'wght' 500, 'Wide' 10;
          }

          c-menu-content .entry:hover > span:first-child {
            line-height: 100%;
            font-size: 50px;
            font-variation-settings: 'wght' 500, 'Wide' 10;
          }

          c-menu-content .entry:hover > span:last-child {
            height: 0px !important;
          }

          c-menu-content .entry:hover {
            padding-top: 5px;
            padding-bottom: 0px;
            opacity: 1;
          }
        }

        c-menu-content .entry > span:last-child {
          width: fit-content;
          leading-trim: both;
          text-edge: cap;
          align-items: center;
          text-align: center;
          transition: all 450ms ${g};
        }

        c-menu-content .entry:hover > span:last-child {
          height: 40px;
        }
      `})}onMount(){const t=this.$("video");t&&t.load()}setTransparency(t){const e=at()==="fr"?$t:Tt,o=this.$(".entry");if(t===-1){o.forEach(s=>{s.style.opacity="0.75"});return}o.forEach((s,n)=>{if(n===t)s.style.opacity="1";else{const i=Math.max(0,1-Math.abs(t-n)/e.length);s.style.opacity=String(Math.min(1,.15+Math.pow(i,5)))}})}close(){document.querySelector("c-menu")?.toggle()}render(){const t=C.get(),e=at()==="fr"?$t:Tt;this.tpl(y`
        <video
          class="absolute top-0 left-0 w-full h-full object-cover"
          id="bgVideo"
          autoplay
          muted=${!0}
          loop=${!0}
          preload=${"auto"}
          playsinline=${!0}
        >
          <source
            src=${t==="dark"?"./videos/menu-night.webm":"./videos/menu.webm"}
            type="video/webm"
          />
        </video>
      `,y`
        <div
          class="container relative w-full h-full flex flex-col items-center justify-center"
        >
          <div
            class="w-full h-full flex flex-col items-center justify-center max-w-[1200px]"
            @mouseleave=${()=>{this.setTransparency(-1)}}
          >
            ${e.map((o,s)=>y`
                <a
                  href=${"slug"in o?Pt(o.slug):o.href}
                  target=${o.target||""}
                  rel=${o.rel||""}
                  class="
                      entry uppercase text-white text-2xl w-full text-center pt-2 flex flex-col items-center
                      opacity-0 text-bold
                    "
                  @mouseenter=${()=>this.setTransparency(s)}
                >
                  <span class="font-[Lemon] text-[40px] xl:text-[60px]">
                    ${o.title}
                  </span>
                  <span
                    class="block text-white text-[13.1478px] leading-[120%] w-full text-center mt-2 overflow-hidden h-[0px]"
                  >
                    <span class="w-[800px] h-[64px] block text-[20px]">
                      <infinite-sliding-text
                        items=${JSON.stringify([o.text,o.text,o.text,o.text,o.text,o.text,o.text,o.text])}
                      />
                    </span>
                  </span>
                </a>
              `)}
          </div>
        </div>
      `)}}customElements.get("c-menu-content")||customElements.define("c-menu-content",Pe);const qe=[Dt.src,Ht.src],Oe=[],dt=new qt(qe);dt.onComplete(()=>{D.set(!0),new qt(Oe).start()});document.addEventListener("astro:page-load",()=>{document.querySelectorAll("[data-file-input]").forEach(t=>{const e=t.getAttribute("data-file-input"),o=document.querySelector(`#${e} #${e}-input`),s=document.querySelector(`#${e} #placeholder`);o.addEventListener("change",n=>{const i=n.target.files[0];s.textContent=i.name})})});const Ie=()=>{const r=w(),t=document.getElementById("picture-dump");if(!t)return;let e={};try{const c=t.getAttribute("data")??"{}";e=JSON.parse(c)}catch{e={}}t.remove(),Object.values(e).forEach(c=>{if(!c)return;const p=new Image;p.src=c});const o=document.getElementById("projects__list__img__container"),s=document.getElementById("projects__list__img__container__placeholder"),n=document.getElementById("projects__list__img__container__placeholder_img"),i=document.getElementById("projects-container");o&&s&&n&&i&&r.intersection(o,c=>{const p=s.getBoundingClientRect(),u=i.getBoundingClientRect(),d=c?.bb?.top??0;(c?.bb?.height??p.height)<-d+p.height?-d+p.height<u.height&&(s.style.transform=`translateY(${-d}px)`):d<0?s.style.transform=`translateY(${-d}px)`:s.style.transform="translateY(0px)"});const a=Array.from(document.querySelectorAll(".project")),l=document.querySelector("c-liquid-cursor");C.subscribe(c=>{a.forEach(p=>{c==="dark"?(p.classList.add("dark"),p.classList.remove("light")):(p.classList.remove("dark"),p.classList.add("light"))})}),a.forEach(c=>{const p=c.id?.split("-")[1],u=p?e[p]:void 0,d=()=>{typeof l?.onOpen=="function"&&l.onOpen("Open"),s?.classList.add("show"),u&&n&&(n.src=u),a.forEach(h=>{h.classList.remove("selected"),h.classList.add("unselected")}),c.classList.add("selected"),c.classList.remove("unselected")},m=()=>{s?.classList.remove("show"),a.forEach(h=>{h.classList.remove("selected"),h.classList.remove("unselected")}),typeof l?.onClose=="function"&&l.onClose()};c.addEventListener("mouseenter",d),c.addEventListener("mouseleave",m),c.addEventListener("focus",d),c.addEventListener("blur",m)}),a.forEach(c=>{let p;p=Vt(c,u=>{u[0]?.isIntersecting&&(c.classList.remove("opacity-0"),p&&typeof p=="function"&&p())})})};document.addEventListener("astro:page-load",()=>{const r=Ct(window.location.pathname);r!=="/our-work"&&window.location.pathname!=="/"&&Ct(window.location.pathname)!=="/en/our-work"&&r!=="/fr/our-work"&&r!=="/fr/nos-projets"&&r!=="/fr"&&r!=="/en"||Ie()});const Re=[".rv","[class*='rv-']",".tl-i",".vs-c",".proof",".blk-provoke",".blk-signature",".sig-pillar",".hero-meta",".hero-author","h2.h2","div.h2"].join(","),P=()=>{try{w()?.forceResize?.()}catch{}},Fe=r=>{r.querySelectorAll(Re).forEach(t=>{t.classList.add("visible","in")})},Be=r=>{r.querySelectorAll('a[href^="#"]').forEach(t=>{const e=t.cloneNode(!0);t.parentNode?.replaceChild(e,t),e.addEventListener("click",o=>{const s=e.getAttribute("href");if(!s||s==="#"||s.length<2)return;const n=document.getElementById(s.slice(1));if(!n)return;o.preventDefault();const i=w();i?.scrollYTo&&(i.scrollYTo(n),history.replaceState&&history.replaceState(null,"",s))})})},De=r=>{const t=r.querySelector("#chstrip"),e=r.querySelector("#hero-top"),o=r.querySelector("#rp"),s=r.querySelector("#mtf"),n=r.querySelector("#rf"),i=r.querySelector("#rd"),a=r.querySelector("#mob-cur"),l=r.querySelector("#ch-line"),c=r.querySelector("#ch-inner"),p=r.querySelector("#mob-tray"),u=r.querySelector("#mob-tray-bar"),d=Array.from(r.querySelectorAll("section[id^='s'], [id^='s'][data-s]")).filter(v=>/^s\d+$/.test(v.id)),m=v=>r.querySelector(`.ch-a[data-s='${v}'] .ch-label`)?.textContent?.trim()??v,h=[];for(const v of[o,t])v&&(v.style.position="absolute",v.style.left="0",v.style.right="0",h.push({el:v,mode:"top",height:0,paddingBottom:0}));p&&(p.style.position="absolute",p.style.left="0",p.style.right="0",p.style.bottom="auto",h.push({el:p,mode:"bottom",height:0,paddingBottom:0}));let f=0,b=0,L=1,E=0;const H=[],M=()=>{const v=ot();E=typeof window.visualViewport<"u"&&window.visualViewport?.height||window.innerHeight,f=r.getBoundingClientRect().top+v,b=e?e.offsetHeight*.5:0,L=Math.max(1,document.documentElement.scrollHeight-E);for(const k of h)k.height=k.el.offsetHeight,k.paddingBottom=parseFloat(getComputedStyle(k.el).paddingBottom)||0;H.length=0;for(const k of d)H.push({id:k.id,y:k.getBoundingClientRect().top+v})};if(u){const v=()=>{M(),et(ot())};u.addEventListener("click",()=>{requestAnimationFrame(v),setTimeout(v,80),setTimeout(v,260)})}let gt=null;const et=v=>{const k=Math.max(0,Math.min(100,v/L*100)).toFixed(2)+"%";if(o&&(o.style.width=k),s&&(s.style.width=k),n&&(n.style.width=k),i&&(i.style.left=k),t&&(t.classList.toggle("on",v>b),t.classList.toggle("dense",v>160)),h.length){const $=v-f,B=$+E;for(const T of h){const st=T.mode==="top"?$:B-(T.height-T.paddingBottom);T.el.style.top=Math.max(0,st)+"px"}}if(H.length){let $=H[0].id;const B=v+54;for(const T of H)T.y<=B&&($=T.id);if($!==gt){if(gt=$,r.querySelectorAll(".ch-a, .mob-tray-list a, #rnav a").forEach(T=>{T.classList.toggle("on",T.getAttribute("data-s")===$)}),l&&c){const T=c.querySelector(`.ch-a[data-s='${$}']`);if(T){const st=c.getBoundingClientRect(),yt=T.getBoundingClientRect();l.style.left=yt.left-st.left+c.scrollLeft+"px",l.style.width=yt.width+"px"}}a&&(a.textContent=m($))}}},ot=()=>{try{const v=w()?.getCurrent?.(),U=v&&typeof v.y=="number"?v.y:0;return Number.isFinite(U)?U:0}catch{return 0}};let vt=-1,xt=-1;const bt=w();bt?.onProgress&&bt.onProgress((v,U)=>{const k=(U&&typeof U.y=="number"?U.y:0)||0,$=typeof window.visualViewport<"u"&&window.visualViewport?.height||window.innerHeight,B=$!==xt;B&&(xt=$,E=$),!(k===vt&&!B)&&(vt=k,et(k))}),M(),window.addEventListener("resize",M,{passive:!0});const F=typeof window.visualViewport<"u"?window.visualViewport:null;return F&&(F.addEventListener("resize",M,{passive:!0}),F.addEventListener("scroll",M,{passive:!0})),document.fonts?.ready&&document.fonts.ready.then(M).catch(()=>{}),r.querySelectorAll("img").forEach(v=>{v.complete||(v.addEventListener("load",M,{once:!0}),v.addEventListener("error",M,{once:!0}))}),et(ot()),()=>{window.removeEventListener("resize",M),F&&(F.removeEventListener("resize",M),F.removeEventListener("scroll",M))}};let Z=[];const He=()=>{const r=document.getElementById("blog-inline-root");if(!r)return;Fe(r),Be(r);const t=De(r);if(t&&Z.push(t),P(),document.fonts?.ready&&document.fonts.ready.then(P).catch(()=>{}),r.querySelectorAll("img").forEach(e=>{e.complete||(e.addEventListener("load",P,{once:!0}),e.addEventListener("error",P,{once:!0}))}),"ResizeObserver"in window){const e=new ResizeObserver(()=>P());e.observe(r),Z.push(()=>e.disconnect())}setTimeout(P,100),setTimeout(P,500),setTimeout(P,1500)};document.addEventListener("astro:page-load",He);document.addEventListener("astro:before-swap",()=>{for(const r of Z)try{r()}catch{}Z=[]});let rt=[];document.addEventListener("astro:page-load",()=>{document.querySelectorAll(".project-media-slider").forEach((t,e)=>{const o=t.querySelector("c-dump"),s=o?.getAttribute("data")||"normal",n=o?.getAttribute("data-peek")==="1";clearTimeout(rt[e]);const i=t.querySelector(".cart"),a=t.querySelectorAll(".slide"),l=t.querySelector(".dots");if(!i||!a.length||(l&&(l.innerHTML=""),(a.length<=1||n)&&(l&&(l.style.display="none"),a.length<=1)))return;let c=0;const p=()=>Array.from(a).map(h=>h.offsetWidth);if(!n&&l)for(let h=0;h<a.length;h++){const f=document.createElement("button");f.type="button",f.className="dot w-[10px] h-[10px] rounded-full bg-white/50 hover:bg-white hover:scale-125 transition-all duration-300 cursor-pointer",f.addEventListener("click",()=>{clearTimeout(rt[e]),d(h)}),l.appendChild(f)}const u=h=>{if(n||!l)return;l.querySelectorAll(".dot").forEach((b,L)=>{L===h?(b.classList.remove("bg-white/50"),b.classList.add("bg-white")):(b.classList.remove("bg-white"),b.classList.add("bg-white/50"))})},d=h=>{const b=p().slice(0,h).reduce((L,E)=>L+E,0);i.style.transform=`translateX(-${b}px)`,c=h,u(c),n||(rt[e]=setTimeout(()=>{m()},4e3))},m=()=>{let h=c;s==="reverse"?(h-=1,h<0&&(h=a.length-1)):(h+=1,h>=a.length&&(h=0)),d(h)};if(n){let h=0;t.addEventListener("touchstart",f=>{h=f.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",f=>{const b=h-f.changedTouches[0].clientX;if(!(Math.abs(b)<30))if(b>0){const L=c+1>=a.length?0:c+1;d(L)}else{const L=c-1<0?a.length-1:c-1;d(L)}},{passive:!0})}window.addEventListener("resize",()=>{d(c)}),d(0)})});const Ne=()=>{const r=document.getElementById("contact-form-dump");let t=!1;r&&(t=r.getAttribute("data")==="true"),C.subscribe(n=>{t&&document.querySelector("c-css-button#contact__newsletter__checkbox").setAttribute("dark",n!=="dark")});const e=document.querySelector("input#contact__newsletter__checkbox"),o=document.querySelector("c-css-button#contact__newsletter__checkbox button");setTimeout(()=>{o&&(o.disabled=!0)},100),e?.addEventListener("change",n=>{const i=document.querySelector("c-css-button#contact__newsletter__checkbox button");i&&(i.disabled=!n.target.checked)});const s=document.getElementById("newsletter-form");s?.addEventListener("submit",async n=>{if(n.preventDefault(),n.stopPropagation(),!document.querySelector("input#contact__newsletter__checkbox")?.checked)return;const a=document.getElementById("contact__email"),l=document.getElementById("contact-form-request-message"),c=l?.getAttribute("data-fails")||"";window.document.body.style.cursor="wait";try{const p=await Gt({email:a?.value});window.document.body.style.cursor="default",p&&p.success?(Yt(s),document.dispatchEvent(new CustomEvent("open-thank-you-modal",{detail:{message:window.location.pathname.startsWith("/fr")?"Merci !":"Thank you!"}}))):l.showMessage(c)}catch{window.document.body.style.cursor="default",l.showMessage(c)}})};document.addEventListener("astro:page-load",()=>{Ne()});let q=null,j=!1;document.addEventListener("astro:page-load",()=>{je()});function je(){const r=document.getElementById("tarot-hero-title"),t=document.getElementById("tarot-hero-subtitle");if(!r||!t)return;[r,t].forEach(s=>{Xt(s,i=>`<span class='word inline-block whitespace-pre'>${i} </span>`),s.querySelectorAll("span.word").forEach(i=>{Zt(i,l=>`<span class='char transform-gpu'>${l}</span>`),i.querySelectorAll("span.char").forEach(l=>{l.style.fontVariationSettings="'wght' 700, 'Wide' 0",l.style.willChange="font-variation-settings"})})});const e=[...r.querySelectorAll("span.char"),...t.querySelectorAll("span.char")],o=()=>{if(e.length!==0){if(q&&!j){q.disable(),q=null;return}j&&!q?(q=new Jt(e,{wghtRange:[700,900],wideRange:[0,10],maxDistance:400}),w().onProgress((n,i)=>{i&&typeof i.y=="number"&&q?.setScroll(i.y)})):j&&q&&q.active()}};J.subscribe(s=>{j=s.width>=1024,o()}),j=window.innerWidth>=1024,o()}document.addEventListener("astro:page-load",()=>{const r=document.getElementById("tarot-search-input"),t=document.getElementById("tarot-search-clear");if(!r||!t)return;const e=()=>{r.value.trim()?t.classList.remove("opacity-0","pointer-events-none"):t.classList.add("opacity-0","pointer-events-none")};t.addEventListener("click",()=>{r.value="",r.dispatchEvent(new Event("input",{bubbles:!0})),r.focus(),e()}),r.addEventListener("input",e),r.addEventListener("input",o=>{const s=new CustomEvent("tarot-search",{detail:{searchTerm:o.target.value},bubbles:!0});document.dispatchEvent(s)})});document.addEventListener("astro:page-load",()=>{const r=document.querySelectorAll(".tarot-filter-tab");r.length&&(C.subscribe(t=>{r.forEach(e=>{e.setAttribute("dark",t!=="dark")})}),r.forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget,s=o.getAttribute("data-category"),n=o.getAttribute("data-category-name");r.forEach(a=>{const l=a;l.classList.remove("bg-violet","border-violet","text-white"),l.classList.add("bg-transparent","border-violet/40","text-dark","dark:text-white","hover:border-violet","hover:bg-violet/10"),l.setAttribute("aria-pressed","false")}),o.classList.remove("bg-transparent","border-violet/40","hover:border-violet","hover:bg-violet/10"),o.classList.add("bg-violet","border-violet","text-white","dark:text-white"),o.setAttribute("aria-pressed","true");const i=new CustomEvent("tarot-filter",{detail:{category:s,categoryName:n},bubbles:!0});document.dispatchEvent(i)})}))});const We=document.querySelectorAll("#clients img");We.forEach(r=>{G(r,{rootMargin:"0px 0px -200px 0px"})});const Ve=()=>{const r=new Ot,t=w(),e=document.querySelector("#about-us__values__mobile"),o=document.querySelector("#about-us__values__mobile__content");t.sticky(o,{parent:e});const s=document.querySelectorAll("#about-us__values__mobile .slide");s.forEach((n,i)=>{if(i===0)return;const a=i>1?-285:0;r.add({enter:{marginTop:a},steps:[{from:(i-2)/s.length,to:(i-1)/s.length,values:{marginTop:0}},{from:(i-1)/s.length,to:i/s.length,values:{marginTop:-285}}],action:l=>{n.style.marginTop=`${l.marginTop}px`}})}),t.intersection(e,n=>{const i=n.intersection.y*((s.length+2)/s.length),a=ht(.1,1,i,0,1);r.progress(a)})};document.addEventListener("astro:page-load",()=>{window.location.pathname.includes("about-us")&&Ve()});function Ge(r){return Array.from({length:r},(n,i)=>({transform:`translateX(calc(-50% + ${i*80}px))`,scale:+(1-i*.08).toFixed(2)}))}document.addEventListener("astro:page-load",()=>{const r=w(),t=document.getElementById("cards-parent"),e=document.getElementById("cards");if(!e)return;const o=e.querySelectorAll(".card");if(!o)return;const s=o.length,n=Ge(s);o.forEach((i,a)=>{i.classList.add("transition-all","duration-1000"),i.style.transform=`${n[a].transform} scale(${n[a].scale})`}),r.intersection(t,i=>{const a=Math.round(lt(i.intersection.y,[0,.66],[0,s-1])),l=i.bb.bottom-window.innerHeight,c=Math.min(i.bb.y,0)+Math.max(-l,0);e.style.transform=`translateY(${-c}px)`,o.forEach((p,u)=>{if(u<a)p.style.transform="translateX(-200%) scale(1.0)",p.style.opacity=0;else{const d=u-a;p.style.transform=`${n[d].transform} scale(${n[d].scale})`,p.style.opacity=1}})})});let it=[];document.addEventListener("astro:page-load",()=>{document.querySelectorAll(".slider").forEach((t,e)=>{const o=t.querySelector("c-dump").getAttribute("data");clearTimeout(it[e]);const s=t.querySelectorAll(".slide"),n=t.querySelector(".cart"),i=Array.from(s).map(d=>d.offsetWidth),a=s.length,l=t.querySelector(".dots");for(let d=0;d<a;d++){const m=document.createElement("div");m.classList.add("dot"),m.classList.add("w-[10px]"),m.classList.add("h-[10px]"),m.classList.add("rounded-full"),m.classList.add("bg-white/50"),m.classList.add("hover:bg-white","hover:scale-125","transition-all","duration-300","cursor-pointer"),m.addEventListener("click",()=>{clearTimeout(it[e]),c(d)}),l?.appendChild(m)}const c=d=>{const m=i.map((f,b)=>b<d?f:0).reduce((f,b)=>f+b,0);n.style.transform=`translateX(-${m}px)`;const h=l.querySelectorAll(".dot");Array.from(h).forEach((f,b)=>{b===d?(f.classList.remove("bg-white/50"),f.classList.add("bg-white")):(f.classList.remove("bg-white"),f.classList.add("bg-white/50"))}),u=d,it[e]=setTimeout(()=>{p()},2e3)},p=()=>{let d=u;o==="reverse"?(d--,d<0&&(d=i.length-1)):(d++,d>=i.length-1&&(d=0)),c(d)};let u=0;c(u)})});const Ye=()=>{const r=new Ot,t=w(),e=document.querySelector("#the-studio__values__mobile"),o=document.querySelector("#the-studio__values__mobile__content"),s=document.querySelectorAll("#the-studio__values__mobile .slide");s.forEach((n,i)=>{if(i===0)return;const a=i>1?-425:0;r.add({enter:{marginTop:a},steps:[{from:(i-2)/s.length,to:(i-1)/s.length,values:{marginTop:0}},{from:(i-1)/s.length,to:i/s.length,values:{marginTop:-425}}],action:l=>{n.style.marginTop=`${l.marginTop}px`}})}),t.intersection(e,n=>{const i=n.bb.bottom-window.innerHeight,a=Math.min(n.bb.y,0)+Math.max(-i,0);o.style.transform=`translateY(${-a}px)`;const l=n.intersection.y*((s.length+2)/s.length),c=ht(.1,1,l,0,1);r.progress(c)})};document.addEventListener("astro:page-load",()=>{window.location.pathname.includes("the-studio")&&Ye()});function _t(r,t=1,e=0){r.style.height="auto";let o=r.scrollHeight;const s=parseFloat(getComputedStyle(r).lineHeight)||20;if(t){const n=s*t;o<n&&(o=n)}if(e){const n=s*e;o>n&&(o=n)}r.style.height=o+"px"}document.addEventListener("astro:page-load",function(){document.querySelectorAll("#talk-modal-form").forEach(r=>{const t=r.querySelector("#contact__message");t&&(_t(t,5,7),t.addEventListener("input",function(){_t(t,5,7)})),r.getAttribute("data-success");const e=r.getAttribute("data-fails");r.addEventListener("submit",async o=>{o.preventDefault(),o.stopPropagation(),window.document.body.style.cursor="wait";const s=r.querySelector("#contact__name"),n=r.querySelector("#contact__email"),i=r.querySelector("#contact__message"),a=r.querySelector("#rental__phone"),l=r.querySelector("#contact__service");let c="";a&&(c+=`phone: ${a?.value}
`),l&&(c+=`contact for service: ${l?.value}
`),c+=`message: ${i?.value}
`;const p={name:s?.value,email:n?.value,message:c},u=await Kt(p);if(window.document.body.style.cursor="default",typeof window.closeTalkModal=="function"&&window.closeTalkModal(),s.value="",n.value="",i&&(i.value=""),u&&u.success){const d=window.location.pathname.startsWith("/fr")?"Merci !":"Thank you!";document.dispatchEvent(new CustomEvent("open-thank-you-modal",{detail:{message:d}}))}else document.getElementById("talk-modal-form-request-message")?.showMessage(e)})})});const Xe=()=>{document.documentElement.querySelectorAll(":scope > #newsletter-modal").forEach(o=>o.remove());const r=document.getElementById("newsletter-modal");r&&document.documentElement.appendChild(r);const t=()=>{r&&(r.style.opacity="0",r.style.pointerEvents="none")},e=o=>{const s=r?.querySelector("#newsletter-modal-message");s&&(s.textContent=o),r&&(r.style.opacity="1",r.style.pointerEvents="auto",setTimeout(t,3e3))};document.getElementById("newsletter-modal-overlay")?.addEventListener("click",t),document.addEventListener("open-thank-you-modal",(o=>{e(o.detail?.message||"Thank you!")}))};document.addEventListener("astro:page-load",Xe);const Ze=document.querySelector("#loading"),Je=()=>{const r=w();r.sticky(Ze);const t=document.querySelector("#loading");if(D.get())t.classList.add("hidden");else{r.disableScroll(),t.classList.remove("hidden");const e=document.querySelector("#loading-cover"),o=new Image;o.src=e?.src,e.classList.add("opacity-0"),e.classList.add("blur-xl"),t?.classList.add("h-screen"),t?.classList.add("brightness-100"),t?.classList.remove("h-0");const s=document.querySelector("#loading-bg-gradient"),i=C.get()==="dark"?"background: linear-gradient(180deg, #1F0237 -7.23%, #55DBB0 105.23%);":"background: linear-gradient(180deg, #4C1B5E -3.36%, #F23B56 105.23%);";s.style.cssText=i;const a=document.querySelector("#loading-bg");o.onload=()=>{e.classList.remove("opacity-0"),e.classList.remove("blur-xl"),setTimeout(()=>{dt.onProgress(l=>{a.style.height=`${l*100}vh`,l===1&&setTimeout(()=>{t?.classList.remove("h-screen"),t?.classList.remove("brightness-100"),t?.classList.add("h-0"),t.style.filter="brightness(0.8) blur(3px)",mt.set(!0),r.enableScroll(),t.addEventListener("transitionend",c=>{c.propertyName==="height"&&t.classList.add("hidden")})},2e3)}),dt.start()},900)}}};document.addEventListener("astro:page-load",()=>{D.set(!1),mt.set(!1),Je()});const Ke=Array.from({length:10},(r,t)=>t);class Qe extends x{static observedAttrs=["time"];tpl;constructor(){super({batchRender:!1,props:{time:"00:00:00"},plugins:[S]})}render(t){const e=t.time.split("");this.tpl(y`<div
      key="time-component"
      class="inline-block font-mono overflow-hidden h-full"
    >
      ${e.map((o,s)=>{if(o===":")return y`<div key="separator-${s}" class="inline-block mt-[3px]">
            ${o}
          </div>`;const n=parseInt(o);return y`<div
          key="part-${s}"
          class="inline-block align-top items-center transition-transform duration-200 mt-[3px] will-change-[transform]"
          style="transform: translate3d(0, ${-n*10}%, 0)"
        >
          ${Ke.map(i=>y`<div>${i}</div>`)}
        </div>`})}
    </div>`)}}customElements.get("c-time-counter")||customElements.define("c-time-counter",Qe);class to extends x{tpl;constructor(){super({batchRender:!1,plugins:[S,pt],props:{render:!0}})}onMount(){C.subscribe(t=>{t==="dark"?document.body.classList.add("dark"):document.body.classList.remove("dark")}),this.plugins.interval(()=>{this.update()},1e3)}toggleDayNight(){C.set(t=>t==="dark"?"light":"dark")}render(){if(!this.props.render)return;const{time:t}=Ut(),e=t.split(" ")[0],o=t.split(" ")[1];this.tpl(y`
        <div
          class="${ut(["text-xs text-left px-5 py-[5px] flex items-center gap-2.5 rounded border border-white w-fit cursor-pointer transition-color duration-200 will-change-color","hover:bg-white/25","pointer-events-auto"])}"
          @click=${this.toggleDayNight}
        >
          MTL:
          <c-time-counter
            class="h-[21px] pt-0"
            time=${e}
          ></c-time-counter>
          ${o}
        </div>
      `)}}customElements.get("c-current-time")||customElements.define("c-current-time",to);document.addEventListener("astro:before-swap",()=>{const r=document.querySelector("c-menu");r&&r.props?.opened&&r.close();const t=document.getElementById("menu-btn");t&&(t.classList.remove("active"),t.setAttribute("aria-expanded","false"))});const eo=()=>{if(!document.querySelector("c-menu")){const i=document.querySelector("lottie-player");i.addEventListener("click",()=>{document.querySelector("c-menu").close(),window.scrollTo({top:0,behavior:"smooth"}),It()!=="/"&&se(Pt("/"))}),i.addEventListener("mouseenter",()=>{i.direction="backward"}),i.addEventListener("mouseleave",()=>{i.direction="forward"}),X.subscribe("ready",u=>{u&&i.play&&i.play()});const a=document.getElementById("menu-btn");a.addEventListener("click",function(){a.classList.toggle("active"),a.setAttribute("aria-expanded",a.classList.contains("active")),document.querySelector("c-menu").toggle()}),document.getElementById("lets-talk-btn").addEventListener("click",()=>{window.openVoiceflowCentered?.()});const c=document.querySelector("#menu-container"),p=document.createElement("c-menu");p.classList.add("pointer-events-auto"),c.appendChild(p)}const t=w(),e=document.querySelector("#header-container");t.sticky(e);const o=document.querySelector("#header-container-inner"),s=document.querySelector("#header-container-gradient");let n=!1;Rt(i=>{i==="hide"?(o.style.transform="translateY(-100%)",s.style.opacity="0"):(o.style.transform="translateY(0)",n&&(s.style.opacity="1"),n=!0)})};document.addEventListener("astro:page-load",eo);document.addEventListener("astro:page-load",function(){const r=w(),t=document.getElementById("talk-modal");r.sticky(t),window.openTalkModal=()=>{const o=document.getElementById("talk-modal-content");o?.classList.remove("opacity-0","blur-2xl","scale-110","translate-y-[-100%]","pointer-events-none"),o?.classList.add("opacity-100","blur-none","scale-100","translate-y-0","pointer-events-auto"),window.posthog?.capture("talk_modal_opened")},window.closeTalkModal=()=>{const o=document.getElementById("talk-modal-content");o?.classList.remove("opacity-100","blur-none","scale-100","translate-y-0","pointer-events-auto"),o?.classList.add("opacity-0","blur-2xl","scale-110","translate-y-[-100%]","pointer-events-none")},document.getElementById("talk-modal-close")?.addEventListener("click",()=>{closeTalkModal()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&closeTalkModal()})});document.addEventListener("astro:page-load",()=>{const r=w(),t=document.getElementById("goToTop");t.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),r.sticky(t),Rt(e=>{e==="hide"?t.style.opacity="0":t.style.opacity="1"})});function Nt(){const r=document.getElementById("featured-article-title");r&&(r.style.fontSize="",setTimeout(()=>{let t=parseFloat(getComputedStyle(r).fontSize);if(t)for(;t>12;){const e=parseFloat(getComputedStyle(r).lineHeight)||t*1.2;if(r.scrollHeight<=e*4)break;t-=1,r.style.fontSize=`${t}px`}},50))}document.fonts.ready.then(()=>setTimeout(Nt,100));let Mt;window.addEventListener("resize",()=>{clearTimeout(Mt),Mt=setTimeout(Nt,150)});C.subscribe(r=>{document.querySelectorAll(".journal-tag").forEach(e=>{e.setAttribute("color",r==="dark"?"var(--color-violet)":"var(--color-purple)"),e.setAttribute("borderColor",r==="dark"?"var(--color-violet)":"var(--color-purple)"),e.update&&e.update()})});const oo=document.querySelector("#section__journal__latest"),so=document.querySelectorAll(".col-article");setTimeout(()=>{zt(oo,{rootMargin:"0px 0px -200px 0px"}),so.forEach(r=>{G(r,{globalDelay:r.dataset.col*.1,rootMargin:"0px 0px -100px 0px"})})},1);const ro=()=>{const r=w(),t=document.getElementById("contact-illustration"),e=document.getElementById("contact__hidden__title"),o=document.querySelectorAll("#contact-illustration > g"),s=Array.from(o).map(n=>parseFloat(n.getAttribute("order"))/4);r.intersection(t,n=>{const i=lt(n.bb.top-window.innerHeight,[-window.innerHeight*.7,-window.innerHeight*.4],[50,0]),a=lt(n.bb.top-window.innerHeight,[-window.innerHeight*.7,-window.innerHeight*.4],[0,1]);e.style.opacity=1-a,o.forEach((l,c)=>{s[c]!==0?l.style.transform=`translateX(${i*s[c]}%)`:l.style.transform=`translateY(${i*s[c]}%)`,l.style.opacity=a})})};document.addEventListener("astro:page-load",()=>{ro()});const jt={"about-us":"a-propos","our-work":"nos-projets","the-studio":"le-studio","the-known":"le-connu",careers:"carrieres","coming-soon":"coming-soon","privacy-policy":"politique-de-confidentialite","terms-of-service":"conditions-utilisation",services:"services",contact:"contact"},io=Object.fromEntries(Object.entries(jt).map(([r,t])=>[t,r])),no=(r,t)=>{const e=r.split("/"),o=t==="en"?io:jt;return e[1]&&(e[1]=o[e[1]]||e[1]),e.join("/")},ao=r=>{const t=document.querySelector(`link[rel="alternate"][hreflang^="${r}"]`);if(!t?.href)return null;try{return new URL(t.href).pathname}catch{return null}},lo=()=>{const r=It(),e=at()==="en"?"fr":"en",o=e.toUpperCase();document.querySelectorAll(".lang-toggle").forEach(n=>{const i=n;i.textContent=o;const a=ao(e);i.href=a??`/${e}${no(r,e)}`,i.addEventListener("click",()=>{document.cookie=`NEXT_LOCALE=${e}; path=/; max-age=2592000`})})};document.addEventListener("astro:page-load",lo);let co=class extends x{tpl;static observedAttrs=["dark"];constructor(){super({props:{content:"",dark:{type:"boolean",default:!1,reflect:!0},mini:!1},styles:`
        c-button {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
          background: linear-gradient(90deg, #0757A4, #009286 33%, #54DBB0 66%, #00D4FF);
          backdrop-filter: blur(5px);
          transition: background 0.2s ${g};
          will-change: background;
          overflow: hidden;
          text-transform: uppercase;
          text-wrap: nowrap;
        }

        c-button button {
          transition: box-shadow 0.2s ${g};
        }

        c-button button.dark {
          box-shadow: inset -1px -1px 1px rgba(76, 27, 94, 0.24), inset 1px 1px 1px rgba(76, 27, 94, 0.23), inset -1px -1px 2px rgba(76, 27, 94, 0.17), inset 1px 1px 4px rgba(76, 27, 94, 0.2);
          background: radial-gradient(circle at 0% 50%, rgba(76, 27, 94, 0.15) 0%, transparent 100%);
        }

        c-button svg {
          margin-left: 26px;
          transition: stroke 0.2s ${g};
          will-change: stroke;
        }

        c-button svg.mini {
          margin-left: 15px;
        }

        c-button > div {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        c-button:after {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 0% 50%, var(--color-white) 0%, var(--color-white) 100%) !important;
          opacity: 0;
          transition: opacity 0.5s ${g};
          will-change: opacity;
          pointer-events: none;
        }

        c-button:hover {
          transform: scale(1.);
        }

        c-button:hover:after {
          opacity: 1;
        }

        c-button p {
          display: flex;
          justify-content: center;
          transition: color 0.2s ${g};
          will-change: color;
        }

        c-button p:nth-child(0) {
          margin-top: -100%;
          top: 31%;
        }

        c-button p:last-child {
          position: absolute;
          transition: top 0.2s ${g};
          top: 200%;
        }

        c-button:hover p {
          color: var(--color-black);
        }

        c-button:hover svg {
          stroke: var(--color-black) !important;
        }

        c-button .content {
          text-transform: uppercase;
          z-index: 1;
          height: 50%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.4s ${g};
          will-change: transform;
          transform: translateY(0%);
        }

        c-button:hover .content {
          transform: translateY(-200%);
        }
        c-button:hover button.dark {
          box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
        }
      `})}onMount(){let t=0;w().intersection(this,o=>{const s=Math.round((1-o.bb.y/window.innerHeight)*100);s!==t&&(t=s,this.style.background=`radial-gradient(circle at ${s}% 50%, rgba(255, 246, 241, 0.4) 0%, transparent 50%)`)})}render(){const t=this.props.dark?"dark":"",e=this.props.dark?"text-dark":"text-white",o=this.props.dark?"var(--color-dark)":"var(--color-white)",s=this.props.mini?"px-[15px] py-[5px]":"px-[38px] py-5",n=this.props.mini?"text-[13px]":"text-base",i=this.props.mini?"w-[13px] h-[12px] mt-[1px]":"w-[19px] h-[21px]";return`<button
        key="button"
        class="
          ${R}
          ${t}
          ${s}
          pointer-events-auto
          flex justify-center items-center relative overflow-hidden bg-white/10 cursor-pointer
          hover:bg-white/20 transition-colors duration-200
        "
      >
        <div class="flex-grow-0 flex-shrink-0 bg-[#fff6f1]/[0.01]"></div>
        <div class="content">
          <p
            class="flex-grow-0 flex-shrink-0 text-left ${e} ${n}"
          >
            ${this.props.content} ${At(o,i,this.props.mini)}
          </p>
          <p
            class="flex-grow-0 flex-shrink-0 text-left ${e} ${n}"
          >
            ${this.props.content} ${At(o,i,this.props.mini)}
          </p>
        </div>
      </button> `}};const At=(r="var(--color-white)",t="w-[19px] h-[21px]",e=!1)=>`<svg
    class="${t} ${e?"mini":""}"
    viewBox="0 0 19 21"
    fill="none"
    style="stroke: ${r};"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 1.5L7.65289 10.5L2 19.5" stroke-width="2.66667" />
    <path d="M11.6528 1.5L17.3057 10.5L11.6528 19.5" stroke-width="2.66667" />
  </svg> `;customElements.get("c-button")||customElements.define("c-button",co);function V(r=1,t=!1){const e=Math.random()*360,o=t?80+Math.random()*20:60+Math.random()*40,s=t?45+Math.random()*10:50+Math.random()*20;return`hsla(${e},${o}%,${s}%,${r})`}function po(r,t=1){let e=r.replace(/^#/,"");e.length===3&&(e=e.split("").map(E=>E+E).join(""));const o=parseInt(e,16),s=o>>16&255,n=o>>8&255,i=o&255,a=s/255,l=n/255,c=i/255,p=Math.max(a,l,c),u=Math.min(a,l,c);let d=0,m=0,h=(p+u)/2;if(p!==u){const E=p-u;switch(m=h>.5?E/(2-p-u):E/(p+u),p){case a:d=(l-c)/E+(l<c?6:0);break;case l:d=(c-a)/E+2;break;case c:d=(a-l)/E+4;break}d/=6}const f=Math.round(d*360),b=Math.round(m*100),L=Math.round(h*100);return`hsla(${f},${b}%,${L}%,${t})`}function uo(r,t,e){const o=parseFloat(r.match(/hsla?\(([\d.]+)/)[1]),s=parseFloat(r.match(/,([\d.]+)%/)[1]),n=parseFloat(r.match(/,([\d.]+)%/)[1]),i=parseFloat(r.match(/,([\d.]+)\)/)[1]),a=parseFloat(t.match(/hsla?\(([\d.]+)/)[1]),l=parseFloat(t.match(/,([\d.]+)%/)[1]),c=parseFloat(t.match(/,([\d.]+)%/)[1]),p=parseFloat(t.match(/,([\d.]+)\)/)[1]),u=o+(a-o)*e,d=s+(l-s)*e,m=n+(c-n)*e,h=i+(p-i)*e;return`hsla(${u},${d}%,${m}%,${h})`}class ho extends x{tpl;constructor(){super({props:{content:"",colors:["#FF0000","#00FF00","#0000FF"].map(po),dark:!1,mini:!1},styles:`
        c-neo-button {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
          background: radial-gradient(circle at 0% 50%, rgba(255, 246, 241, 0.5) 0%, transparent 100%);
          backdrop-filter: blur(5px);
          transition: background 0.2s ${g};
          will-change: background;
          overflow: hidden;
          text-transform: uppercase;
        }

        c-neo-button button {
          transition: box-shadow 0.2s ${g};
        }

        c-neo-button button.dark {
          box-shadow: inset -1px -1px 1px rgba(76, 27, 94, 0.24), inset 1px 1px 1px rgba(76, 27, 94, 0.23), inset -1px -1px 2px rgba(76, 27, 94, 0.17), inset 1px 1px 4px rgba(76, 27, 94, 0.2);
          background: radial-gradient(circle at 0% 50%, rgba(76, 27, 94, 0.15) 0%, transparent 100%);
        }

        c-neo-button svg {
          margin-left: 26px;
          transition: stroke 0.2s ${g};
          will-change: stroke;
        }

        c-neo-button canvas {
          filter: brightness(0.8);
        }

        c-neo-button > div {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        c-neo-button:after {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 0% 50%, var(--color-white) 0%, var(--color-white) 100%) !important;
          opacity: 0;
          transition: opacity 0.5s ${g};
          will-change: opacity;
          pointer-events: none;
        }

        c-neo-button p {
          display: flex;
          justify-content: center;
          transition: color 0.2s ${g};
          will-change: color;
        }

        c-neo-button .content {
          text-transform: uppercase;
          z-index: 1;
          height: 50%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.4s ${g};
          will-change: transform;
          transform: translateY(0%);
        }

        c-neo-button .gradient {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.5s ${g};
          will-change: opacity;
        }

        c-neo-button:hover .gradient {
          opacity: 1;
        }
        c-neo-button p {
          transition: color 0.2s ${g};
        }
        c-neo-button:hover p {
          color: var(--color-white);
        }
        c-neo-button:hover svg {
          stroke: var(--color-white) !important;
        }
        c-neo-button:hover button.dark {
          box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
        }
      `})}onMount(){let t=0;w().intersection(this,u=>{const d=Math.round((1-u.bb.y/window.innerHeight)*100);d!==t&&(t=d,this.style.background=`radial-gradient(circle at ${d}% 50%, rgba(255, 246, 241, 0.4) 0%, transparent 50%)`)});const o=this.querySelector(".gradient");if(!o)return;const s=document.createElement("canvas");s.style.width="100%",s.style.height="100%",s.style.position="absolute",s.style.top="0",s.style.left="0",s.style.pointerEvents="none",s.style.borderRadius="inherit",o.appendChild(s);const n={moveSpeed:40,lerpSpeed:.01,targetChangeChance:.01,vivid:!1};let i=[{current:V(1)},{current:V(1)},{current:V(.3)}];i=this.props.colors.map(u=>({current:u}));const a=[{x:0,y:0},{x:o.offsetWidth,y:o.offsetHeight}];function l(){const u=window.devicePixelRatio||1,d=o.getBoundingClientRect();s.width=d.width*u,s.height=d.height*u,a[1].x=s.width,a[1].y=s.height}l(),window.addEventListener("resize",l);let c=performance.now();function p(u){const d=(u-c)/1e3;c=u;for(let f=0;f<a.length;f++)a[f].x+=(Math.random()-.5)*d*n.moveSpeed,a[f].y+=(Math.random()-.5)*d*n.moveSpeed,a[f].x=Math.max(0,Math.min(s.width,a[f].x)),a[f].y=Math.max(0,Math.min(s.height,a[f].y));for(let f=0;f<i.length;f++){if(!i[f].target||Math.random()<n.targetChangeChance){const b=f===2?.2+Math.random()*.3:1;i[f].target=V(b,n.vivid)}i[f].current=uo(i[f].current,i[f].target,n.lerpSpeed)}const m=s.getContext("2d");m.clearRect(0,0,s.width,s.height);const h=m.createLinearGradient(a[0].x,a[0].y,a[1].x,a[1].y);for(let f=0;f<i.length;f++)h.addColorStop(f/(i.length-1),i[f].current);m.fillStyle=h,m.fillRect(0,0,s.width,s.height),requestAnimationFrame(p)}requestAnimationFrame(p),this.addEventListener("mouseenter",()=>{n.moveSpeed=120,n.lerpSpeed=.04,n.targetChangeChance=.04,n.vivid=!0}),this.addEventListener("mouseleave",()=>{n.moveSpeed=40,n.lerpSpeed=.01,n.targetChangeChance=.01,n.vivid=!1})}render(){const t=this.props.dark?"dark":"",e=this.props.dark?"text-dark":"text-white",o=this.props.dark?"var(--color-dark)":"var(--color-white)",s=this.props.mini?"px-[20px] py-[5px]":"px-[38px] py-4";return`<button
        key="button"
        class='${ut([R,t,s,"flex justify-center items-center relative overflow-hidden px-[38px] py-4 bg-white/10 cursor-pointer","disabled:opacity-50 disabled:cursor-not-allowed","pointer-events-auto"])}'
      >
        <div class="flex-grow-0 flex-shrink-0 bg-[#fff6f1]/[0.01]"></div>
        <div class="gradient absolute top-0 left-0 w-full h-full"></div>
        <div class="content">
          <p
            class="flex-grow-0 flex-shrink-0 font-bold text-left ${e}"
          >
            ${this.props.content} ${fo(o)}
          </p>
        </div>
      </button> `}}const fo=(r="var(--color-white)")=>`<svg
    width="19"
    height="21"
    viewBox="0 0 19 21"
    fill="none"
    style="stroke: ${r};"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 1.5L7.65289 10.5L2 19.5" stroke-width="2.66667" />
    <path d="M11.6528 1.5L17.3057 10.5L11.6528 19.5" stroke-width="2.66667" />
  </svg> `;customElements.get("c-neo-button")||customElements.define("c-neo-button",ho);class mo extends x{tpl;constructor(){super({shadow:!1,plugins:[S,pt],props:{content:"",color:"",borderColor:"",selectable:!1,selected:!1,hoverColorIsColor:!1}})}setColor(t){this.set("color",t),this.set("borderColor",t),this.update()}setSelected(t){this.set("selected",t),this.update()}onMount(){this.update(),this.plugins.timeout(()=>{this.onUpdate()},100),this.addEventListener("mouseenter",this.onmouseenter),this.addEventListener("mouseleave",this.onmouseleave)}onUpdate(){const t=this.getAttribute("selected")==="true";this.$("div")&&(t?this.onmouseenter():this.onmouseleave())}onDestroy(){this.removeEventListener("mouseenter",this.onmouseenter),this.removeEventListener("mouseleave",this.onmouseleave)}onmouseenter=()=>{const t=this.$("div");t.style.backgroundColor=this.getAttribute("borderColor"),t.style.color=this.props.hoverColorIsColor?this.getAttribute("color"):"var(--color-white)"};onmouseleave=()=>{const t=this.$("div");this.props.selected||(t.style.backgroundColor="transparent",t.style.color=this.getAttribute("color"))};render(){const t=this.getAttribute("borderColor"),e=this.getAttribute("color");return`
      <div
        key="container"
        class="text-[11px] text-left text-violet dark:text-violet
        flex justify-center items-center h-[24.62px] relative gap-[11.052950859069824px] px-[20px] rounded-[4.42px] border-[1.5px]
        ${this.props.selectable?"cursor-pointer":""} text-[${e}] text-nowrap w-fit"
        style="transition: color 200ms ${z}, background-color 200ms ${z}, border-color 200ms ${z}; border-color: ${t}; color: ${e};"
      >
        ${this.getAttribute("content")}
      </div>
    `}}customElements.get("c-tag")||customElements.define("c-tag",mo);const Mo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));class go extends x{tpl;constructor(){super({shadow:!1,plugins:[S],props:{mq:J.ref()}})}onMount(){const t=this.$("& > div");if(this.props.mq.width<=640)return;const e={x:window.innerWidth*.5,y:window.innerHeight*1.1};kt.ticker.add(()=>{e.x=W.getCurrent().x,e.y=W.getCurrent().y,kt.set(t,{left:e.x,top:e.y})}),document.addEventListener("mousemove",o=>{o.clientX,o.clientY}),this.onClose()}onClose(){const t=this.$("& > div");t.classList.remove("w-fit"),t.classList.remove("h-[54px]"),t.classList.add("w-[24px]"),t.classList.add("h-[24px]"),t.classList.remove("px-6"),this.$("& #content").textContent=""}onOpen(t){const e=this.$("& > div"),o=this.$("& #content");e.classList.remove("w-[24px]"),e.classList.remove("h-[24px]"),e.classList.add("h-[54px]"),e.classList.add("w-fit"),e.classList.add("px-6"),o.textContent=t}render(){this.tpl(y`
        <div
          class="
            fixed top-0 left-0 w-fit h-[54px] z-15 overflow-hidden rounded-full border-0 border-white px-6 translate-x-[-50%] translate-y-[-50%] pointer-events-none bg-[rgba(255,255,255,0.17)]
            will-change-[width,height,padding] transform-gpu
            hidden md:block
          "
          style="
            transition: width 0.2s ${g}, height 0.2s ${g}, padding 0.2s ${g};
            will-change: width, height, padding;
            isolation: isolate;
            box-shadow: inset -1px -1px 1px rgba(255, 246, 241, 0.24), inset 1px 1px 1px rgba(255, 246, 241, 0.23), inset -1px -1px 2px rgba(255, 246, 241, 0.17), inset 1px 1px 4px rgba(255, 246, 241, 0.2);
          "
        >
          <div class="flex h-full w-full items-center justify-center">
            <div
              class="w-full h-full z-12"
              style="filter: url(#glass-distortion) blur(1px) drop-shadow(10px -4px 6px rgb(255, 255, 255)) brightness(96%);
                backdrop-filter: blur(2px);
                isolation: isolate;
                position: absolute;
                inset: 0;"
            ></div>
            <div
              id="content"
              class=${`relative z-12 ${R} font-700 font-size-[18px] leading-[22px] drop-shadow-xl text-nowrap`}
            >
              Scroll
            </div>
          </div>
        </div>
      `)}}customElements.get("c-liquid-cursor")||customElements.define("c-liquid-cursor",go);const Ao=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));class vo extends x{tpl;cursor;child;constructor(){super({shadow:!1,plugins:[S],props:{content:{type:String,default:"DEFAULT"},href:"#"},styles:`
        c-liquid-cursor-area a[data-disabled="true"] {
          pointer-events: none;      /* optional: blocks mouse */
          color: gray;
          cursor: not-allowed;
        }
      `})}onPreMount(){this.child=[...this.children],this.setChildren(this.children)}onMount(){this.cursor=document.querySelector("c-liquid-cursor");const t=this.$("& > a");this.child.forEach(e=>{t.appendChild(e)})}onEnter=()=>{this.cursor?.onOpen(this.props.content)};onLeave=()=>{this.cursor?.onClose()};render(t){this.tpl(y`<a
        href=${t.href}
        class="w-full h-full"
        data-disabled=${t.href==="#"}
        @mouseenter=${this.onEnter}
        @mouseleave=${this.onLeave}
        @click=${e=>{t.href==="#"&&e.preventDefault()}}
      >
        </slot>
      </a>`)}}customElements.get("c-liquid-cursor-area")||customElements.define("c-liquid-cursor-area",vo);const Uo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{Eo as V,$o as a,To as b,C as c,Mo as d,z as e,Ao as f,Uo as g,So as i,g as o,R as p,mt as r,ko as s};
