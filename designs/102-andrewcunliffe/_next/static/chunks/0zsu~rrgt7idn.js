(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,22086,e=>{"use strict";var t=e.i(18050),r=e.i(71645);let n="#21262A",i="#5D686F",a="#859299",o=Math.hypot(18.08-12.47,16.9-12.47),l=["What should I do if the information on my W-2 is incorrect?","How do I file multiple W-2 forms from different employers?","What if I lost my W-2 or never received it from my employer?","How does the information from box 12 on my W-2 affect my tax return?","Can I import my W-2 directly from my employer or payroll provider?","What's the deadline for my employer to send my W-2?"],s=e=>e<0?0:e>1?1:e,c=(e,t,r)=>s((e-t)/(r-t)),d=(e,t,r)=>t+(r-t)*e;function u(e,t,r,n){let i=3*e,a=3*(r-e)-i,o=1-i-a,l=3*t,s=3*(n-t)-l,c=1-l-s,d=e=>((o*e+a)*e+i)*e,u=e=>(3*o*e+2*a)*e+i;return e=>{let t,r=e;for(let t=0;t<8;t++){let t=d(r)-e;if(1e-4>Math.abs(t))break;let n=u(r);if(1e-6>Math.abs(n))break;r-=t/n}return((c*(t=r)+s)*t+l)*t}}e.s(["default",0,function({cfg:e,scale:h=1,freeze:m}){let f=e.anchor??"center",p=(0,r.useRef)({container:null,white:null,gray:null,border:null,contents:null,glass:null,lens:null,handle:null,flyout:null}),v=(0,r.useRef)(0),g=(0,r.useRef)("open"),w=(0,r.useRef)(null),y=(0,r.useRef)({pos:0,vel:0}),b=()=>(function(e,t,r){if(e.container&&(e.container.style.width=`${d(t,580,36)}px`,e.container.style.borderRadius=`${t<.5?18:d(c(t,.5,1),18,6)}px`),e.white&&(e.white.style.opacity=`${1-c(t,0,.5)}`),e.gray&&(e.gray.style.opacity=`${c(t,.55,1)}`),e.border&&(e.border.style.opacity=`${1-c(t,0,.4)}`),e.contents){e.contents.style.opacity=`${1-c(t,0,.24)}`;let n=d(c(t,0,.32),1,.86);e.contents.style.transformOrigin="left"===r?"20px center":"right"===r?"560px center":"center",e.contents.style.transform=`scale(${n})`}e.glass&&(e.glass.style.opacity=`${c(t,.36,.6)}`,e.glass.style.transform=`translate(-50%, -50%) scale(${d(c(t,.36,1),.82,1)})`),e.lens&&(e.lens.style.opacity=`${c(t,.36,.6)}`),e.handle&&(e.handle.style.strokeDashoffset=`${(1-c(t,.56,.82))*o}`)})(p.current,v.current,f),x=e=>{let t=p.current.flyout;t&&(t.style.opacity=`${e}`,t.style.transform=`translateY(${-((1-e)*8)}px)`,t.style.pointerEvents=e>.5?"auto":"none")},_=(e,t,r,n,i,a)=>{null!=w.current&&cancelAnimationFrame(w.current);let o=u(...n),l=null,c=n=>{null==l&&(l=n);let d=s((n-l)/(1e3*r));i(e+(t-e)*o(d)),d<1?w.current=requestAnimationFrame(c):(w.current=null,a?.())};w.current=requestAnimationFrame(c)},L=(t,r)=>{null!=w.current&&cancelAnimationFrame(w.current);let n=e.spec,i=performance.now();if("tween"===n.kind){let e=v.current,a=u(...n.ease),o=i,l=i=>{let c=s((i-o)/(1e3*n.duration));v.current=e+(t-e)*a(c),b(),c<1?w.current=requestAnimationFrame(l):(w.current=null,r?.())};w.current=requestAnimationFrame(l);return}let{stiffness:a,damping:o,mass:l}=n,c=y.current;c.pos=v.current;let d=e=>{let n=(e-i)/1e3;i=e,n>1/30&&(n=1/30);let s=Math.max(1,Math.ceil(n/(1/240))),u=n/s;for(let e=0;e<s;e++){let e=(-a*(c.pos-t)-o*c.vel)/l;c.vel+=e*u,c.pos+=c.vel*u}v.current=c.pos,b(),.001>Math.abs(c.pos-t)&&.02>Math.abs(c.vel)?(c.pos=t,c.vel=0,v.current=t,b(),w.current=null,r?.()):w.current=requestAnimationFrame(d)};w.current=requestAnimationFrame(d)},C=()=>{"open"===g.current&&null==m&&(g.current="collapsed",_(1,0,.16,[.4,0,1,1],x,()=>L(1)))},k=()=>{"collapsed"===g.current&&null==m&&(g.current="open",L(0,()=>_(0,1,.22,[0,0,.2,1],x)))};(0,r.useEffect)(()=>{if(null!=w.current&&cancelAnimationFrame(w.current),null!=m){v.current=m,b(),x(+(m<.05));return}return g.current="open",v.current=0,b(),x(1),()=>{null!=w.current&&cancelAnimationFrame(w.current)}},[m,e]),(0,r.useEffect)(()=>{},[e]);let M=e=>t=>{p.current[e]=t};return(0,t.jsxs)("div",{style:{position:"relative",width:580*h,transform:`scale(${h})`,transformOrigin:"left"===f?"left top":"right"===f?"right top":"top center"},children:[(0,t.jsxs)("div",{role:"button",tabIndex:0,onClick:k,onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),k())},"aria-label":"Search","data-cursor":"hover",style:{position:"relative",width:580,height:36,cursor:"pointer"},children:[(0,t.jsxs)("div",{ref:M("container"),style:{position:"absolute",..."left"===f?{left:0}:"right"===f?{right:0}:{left:"50%",transform:"translateX(-50%)"},width:580,height:36,borderRadius:18,overflow:"hidden",boxSizing:"border-box"},children:[(0,t.jsx)("div",{ref:M("white"),style:{position:"absolute",inset:0,background:"#fff"}}),(0,t.jsx)("div",{ref:M("gray"),style:{position:"absolute",inset:0,background:"#E2E9ED",opacity:0}}),(0,t.jsx)("div",{ref:M("border"),style:{position:"absolute",inset:0,borderRadius:"inherit",border:`2px solid ${n}`}})]}),(0,t.jsxs)("svg",{ref:M("contents"),width:580,height:36,viewBox:"0 0 580 36",fill:"none","aria-hidden":!0,style:{position:"absolute",..."left"===f?{left:0}:"right"===f?{right:0}:{left:"50%",marginLeft:-290},top:0},children:[(0,t.jsx)("path",{d:"M19.1005 15.7557C18.8097 15.7556 18.5156 15.6935 18.2361 15.5695L12.6094 13.0524L13.403 11.2622L19.0297 13.7793C19.0867 13.8054 19.142 13.7989 19.1924 13.763C19.2428 13.7254 19.2656 13.6764 19.259 13.6143L18.6134 7.45808L20.5535 7.25391L21.1975 13.4069C21.2772 14.1697 20.9552 14.8949 20.3372 15.3473C19.9667 15.6183 19.536 15.7555 19.1005 15.7557ZM23.0522 17.8203C23.4207 18.0929 23.8505 18.2354 24.2863 18.239L24.2863 18.2358C24.5774 18.2382 24.8723 18.1803 25.153 18.0568L30.8008 15.5873L30.0223 13.7905L24.3745 16.26C24.3174 16.2857 24.2622 16.2787 24.2121 16.2423C24.1619 16.206 24.1396 16.1551 24.1466 16.0931L24.8424 9.9458L22.9041 9.72529L22.2083 15.8726C22.1222 16.6364 22.4381 17.3643 23.0522 17.8203ZM26.0549 27.795L21.9748 23.1608C21.4692 22.5862 21.3102 21.8073 21.5541 21.0793C21.7964 20.3513 22.3881 19.8257 23.1375 19.6722L29.1739 18.4384L29.5618 20.3595L23.5255 21.5933C23.4636 21.6058 23.4243 21.6414 23.4042 21.7017C23.3842 21.7619 23.3951 21.8143 23.4369 21.862L27.517 26.4963L26.0549 27.795ZM14.6493 28.1226L12.9633 27.1362L16.0636 21.7903C16.4482 21.1269 17.1344 20.7326 17.8987 20.7355C18.663 20.7384 19.3461 21.1378 19.7258 21.8041L22.7857 27.1731L21.0924 28.1468L18.0325 22.7777C17.9711 22.6697 17.8133 22.6675 17.7511 22.7767L14.6509 28.1226L14.6493 28.1226ZM11.1249 22.4965L12.5614 23.8235L12.5614 23.8267L16.731 19.2729C17.2477 18.7067 17.4202 17.9326 17.1922 17.2C16.9642 16.4674 16.3828 15.9303 15.6365 15.7623L9.62533 14.4111L9.2 16.3243L15.2112 17.6722C15.2712 17.6859 15.3114 17.7239 15.3303 17.7829C15.3492 17.8436 15.3372 17.8974 15.2945 17.9426L11.1249 22.4965Z",fill:"#236CFF",fillRule:"evenodd",clipRule:"evenodd"}),(0,t.jsx)("path",{d:"M41.872 12.672L44.368 21.696H44.4L47.056 12.672H48.8L51.44 21.696H51.472L53.968 12.672H55.648L52.32 24H50.672L47.92 14.896H47.888L45.136 24H43.488L40.16 12.672H41.872ZM60.041 19.456V20.736H56.329V19.456H60.041ZM69.102 22.608V24H61.71V22.512L66.222 18.032C66.91 17.328 67.47 16.592 67.47 15.632C67.47 14.448 66.574 13.68 65.454 13.68C64.302 13.68 63.518 14.512 63.326 15.648L61.806 15.392C62.078 13.664 63.534 12.384 65.47 12.384C67.358 12.384 69.054 13.488 69.054 15.6C69.054 17.056 68.222 18.048 67.23 19.024L63.55 22.608H69.102Z",fill:n}),(0,t.jsx)("path",{d:"M560.011 11H560C559.081 10.9993 558.17 11.1796 557.321 11.5307C556.471 11.8819 555.699 12.3969 555.049 13.0464C553.735 14.3581 552.996 16.138 552.994 17.9945C552.993 19.851 553.729 21.6321 555.041 22.9459C556.352 24.2596 558.132 24.9985 559.989 25H560C561.856 25.0013 563.637 24.2651 564.951 22.9533C566.265 21.6415 567.004 19.8615 567.005 18.005C567.006 16.1485 566.27 14.3675 564.958 13.0538C563.646 11.7401 561.866 11.0013 560.01 11H560.011ZM562.826 19.418C562.921 19.5104 562.997 19.6208 563.05 19.7429C563.102 19.865 563.129 19.9962 563.13 20.129C563.131 20.2618 563.106 20.3934 563.055 20.5163C563.005 20.6391 562.93 20.7506 562.836 20.8444C562.742 20.9381 562.63 21.0122 562.507 21.0623C562.385 21.1124 562.253 21.1376 562.12 21.1362C561.987 21.1349 561.856 21.1071 561.734 21.0545C561.612 21.002 561.502 20.9256 561.41 20.83L560 19.414L558.584 20.826C558.491 20.9188 558.381 20.9925 558.259 21.0427C558.138 21.0929 558.008 21.1187 557.876 21.1186C557.745 21.1185 557.615 21.0925 557.493 21.0421C557.372 20.9918 557.262 20.918 557.169 20.825C556.981 20.6372 556.876 20.3827 556.876 20.1173C556.876 19.9859 556.902 19.8558 556.953 19.7345C557.003 19.6131 557.077 19.5028 557.17 19.41L558.586 18L557.174 16.581C557.079 16.4886 557.002 16.3782 556.95 16.2561C556.898 16.134 556.871 16.0028 556.87 15.87C556.869 15.7372 556.894 15.6056 556.945 15.4827C556.995 15.3599 557.07 15.2484 557.164 15.1546C557.258 15.0609 557.369 14.9868 557.492 14.9367C557.615 14.8866 557.747 14.8615 557.88 14.8628C558.013 14.8641 558.144 14.8919 558.266 14.9445C558.388 14.997 558.498 15.0734 558.59 15.169L560 16.586L561.416 15.174C561.604 14.9865 561.858 14.8813 562.124 14.8814C562.389 14.8816 562.643 14.9872 562.831 15.175C563.018 15.3628 563.124 15.6173 563.123 15.8827C563.123 16.1481 563.018 16.4025 562.83 16.59L561.414 18L562.826 19.418Z",fill:i})]}),(0,t.jsx)("div",{ref:M("glass"),style:{position:"absolute",..."left"===f?{left:18}:"right"===f?{left:562}:{left:"50%"},top:"50%",width:20,height:20,opacity:0,transform:"translate(-50%, -50%) scale(0.82)"},children:(0,t.jsxs)("svg",{width:20,height:20,viewBox:"0 0 20 20",fill:"none","aria-hidden":!0,children:[(0,t.jsx)("circle",{ref:M("lens"),cx:8.33,cy:8.33,r:5.85,stroke:i,strokeWidth:1.9,style:{opacity:0}}),(0,t.jsx)("line",{ref:M("handle"),x1:12.47,y1:12.47,x2:18.08,y2:16.9,stroke:i,strokeWidth:1.9,strokeLinecap:"round",style:{strokeDasharray:o,strokeDashoffset:o}})]})})]}),(0,t.jsx)("div",{ref:M("flyout"),role:"listbox","aria-label":"Search results",style:{position:"absolute",top:42,left:0,width:580,background:"#fff",borderRadius:8,boxShadow:"0 2px 8px rgba(76,85,89,0.20)",padding:"8px 0",boxSizing:"border-box"},children:l.map((e,r)=>(0,t.jsxs)("button",{type:"button",role:"option","aria-selected":!1,onClick:C,className:"search-morph-row",style:{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left",font:"500 15px/1.35 -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",color:"#393A3D"},children:[(0,t.jsxs)("svg",{width:18,height:18,viewBox:"0 0 20 20",fill:"none","aria-hidden":!0,style:{flexShrink:0},children:[(0,t.jsx)("circle",{cx:8.33,cy:8.33,r:5.85,stroke:a,strokeWidth:1.9}),(0,t.jsx)("line",{x1:12.47,y1:12.47,x2:18.08,y2:16.9,stroke:a,strokeWidth:1.9,strokeLinecap:"round"})]}),(0,t.jsx)("span",{children:e.split(/(W-2)/g).map((e,r)=>"W-2"===e?(0,t.jsx)("span",{style:{color:"#859299"},children:e},r):(0,t.jsx)("span",{children:e},r))})]},r))}),(0,t.jsx)("style",{children:".search-morph-row:hover{background:#F0F3F5;}"})]})}])},33411,e=>{"use strict";var t=e.i(18050),r=e.i(71645),n=e.i(22086);let i={name:"Precise",blurb:"Mechanical · fast, sharp in-out",spec:{kind:"tween",duration:.52,ease:[.76,0,.24,1]},anchor:"right"};e.s(["default",0,function(){let e=(0,r.useRef)(null),[a,o]=(0,r.useState)(0);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let r=()=>{let{width:e,height:r}=t.getBoundingClientRect();e>0&&r>0&&o(Math.min(e/620,r/340))};r();let n=new ResizeObserver(r);return n.observe(t),()=>n.disconnect()},[]),(0,t.jsx)("div",{ref:e,"data-search-morph":!0,className:"flex h-full w-full items-start justify-center",children:a>0&&(0,t.jsx)("div",{style:{transform:`scale(${a})`,transformOrigin:"top center"},children:(0,t.jsx)(n.default,{cfg:i,scale:1})})})}])},87652,e=>{"use strict";var t=e.i(71645),r=e.i(49652);let n={some:0,all:1};e.s(["useInView",0,function(e,{root:i,margin:a,amount:o,once:l=!1,initial:s=!1}={}){let[c,d]=(0,t.useState)(s);return(0,t.useEffect)(()=>{if(!e.current||l&&c)return;let t={root:i&&i.current||void 0,margin:a,amount:o};return function(e,t,{root:i,margin:a,amount:o="some"}={}){let l=(0,r.resolveElements)(e),s=new WeakMap,c=new IntersectionObserver(e=>{e.forEach(e=>{let r=s.get(e.target);if(!!r!==e.isIntersecting)if(e.isIntersecting){let r=t(e.target,e);"function"==typeof r?s.set(e.target,r):c.unobserve(e.target)}else"function"==typeof r&&(r(e),s.delete(e.target))})},{root:i,rootMargin:a,threshold:"number"==typeof o?o:n[o]});return l.forEach(e=>c.observe(e)),()=>c.disconnect()}(e.current,()=>(d(!0),l?void 0:()=>d(!1)),t)},[i,e,a,l,o]),c}],87652)},17881,e=>{"use strict";var t=e.i(18050),r=e.i(71645),n=e.i(87652),i=e.i(72328);let a="<>[]{}/#%*+=:;01";e.s(["default",0,function({text:e,className:o,duration:l=800}){let s=(0,r.useRef)(null),c=(0,n.useInView)(s,{once:!0,amount:.6}),d=(0,i.useReducedMotion)(),[u,h]=(0,r.useState)(e),[m,f]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{if(!c)return;if(d)return void f(!0);let t=0,r=performance.now(),n=i=>{let o=Math.min((i-r)/l,1);if(o>=1){h(e),f(!0);return}let s=Math.floor(o*e.length),c="";for(let t=0;t<e.length;t++){let r=e[t];t<s||" "===r?c+=r:c+=a[Math.random()*a.length|0]}h(c),t=requestAnimationFrame(n)};return t=requestAnimationFrame(n),()=>cancelAnimationFrame(t)},[c,d,e,l]),(0,t.jsx)("span",{ref:s,className:o,role:"img","aria-label":e,"data-scramble":m?"done":"pending",children:(0,t.jsx)("span",{"aria-hidden":!0,children:u})})}])},5207,e=>{"use strict";var t=e.i(71645),r=e.i(35382),n=e.i(91994);e.s(["useMagnetic",0,function(e,{radius:i=120,pull:a=.32}={}){let o=(0,t.useRef)(null),l=(0,r.useMotionValue)(0),s=(0,r.useMotionValue)(0),c=(0,n.useSpring)(l,{stiffness:260,damping:20,mass:.5}),d=(0,n.useSpring)(s,{stiffness:260,damping:20,mass:.5});return(0,t.useEffect)(()=>{let t=e.current;if(!t||window.matchMedia("(pointer: coarse)").matches||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let r=e=>{let r=(o.current??t).getBoundingClientRect(),n=r.left+r.width/2,c=r.top+r.height/2,d=e.clientX-n,u=e.clientY-c;Math.hypot(d,u)<i?(l.set(d*a),s.set(u*a)):(l.set(0),s.set(0))},n=()=>{l.set(0),s.set(0)};return t.addEventListener("pointermove",r),t.addEventListener("pointerleave",n),()=>{t.removeEventListener("pointermove",r),t.removeEventListener("pointerleave",n)}},[e,i,a,l,s]),{targetRef:o,x:c,y:d}}])},57711,e=>{"use strict";var t=e.i(18050),r=e.i(71645);let n="showcase:mode",i=(0,r.createContext)(null);function a(e){return"scenes"===e?e:null}e.s(["ShowcaseModeProvider",0,function({children:e}){let[o,l]=(0,r.useState)("scenes"),[s,c]=(0,r.useState)(!1);(0,r.useEffect)(()=>{let e=a(new URLSearchParams(window.location.search).get("mode")),t=null;try{t=a(window.localStorage.getItem(n))}catch{}let r=e??t;r&&l(r),c(!0)},[]);let d=(0,r.useMemo)(()=>({mode:o,hydrated:s,setMode:e=>{l(e);try{window.localStorage.setItem(n,e)}catch{}}}),[o,s]);return(0,t.jsx)(i.Provider,{value:d,children:e})},"useShowcaseMode",0,function(){let e=(0,r.useContext)(i);if(!e)throw Error("useShowcaseMode must be used inside <ShowcaseModeProvider>");return e},"useShowcaseModeOptional",0,function(){return(0,r.useContext)(i)}])},17996,e=>{"use strict";var t=e.i(18050),r=e.i(71645),n=e.i(57711),i=e.i(14178);let a=[{id:"hero",label:"Intro"},{id:"about",label:"About"},{id:"work",label:"Work"},{id:"contact",label:"Contact",fallbackSelector:"footer"}];function o(e){let t=document.getElementById(e.id);return t||(e.fallbackSelector?document.querySelector(e.fallbackSelector):null)}function l(e){return Math.min(Math.max(e,0),1)}e.s(["default",0,function({sections:e=a,compactBelowLg:s=!1}){let c=(0,r.useRef)(null),d=(0,r.useRef)(null),[u,h]=(0,r.useState)([]),[m,f]=(0,r.useState)(null),p=(0,r.useRef)(0),v=(0,r.useRef)([]),g=(0,n.useShowcaseModeOptional)(),w=!!(g&&g.hydrated&&"scenes"!==g.mode),y=(0,r.useCallback)(()=>{let t=c.current;if(!t)return;let r=t.clientHeight;if(0===r)return;let n=Math.max(document.documentElement.scrollHeight-window.innerHeight,1),i=e.map(e=>{let t=o(e);return t?{section:e,top:t.getBoundingClientRect().top+window.scrollY}:null}).filter(e=>null!==e);v.current=i.map(({section:e,top:t})=>({id:e.id,top:t}));let a=i.map(({top:e})=>l((e-96)/n)*r);for(let e=1;e<a.length;e++)a[e]=Math.max(a[e],a[e-1]+26);if(a.length>0&&a[a.length-1]>r){a[a.length-1]=r;for(let e=a.length-2;e>=0;e--)a[e]=Math.min(a[e],a[e+1]-26)}h(i.map(({section:e},t)=>({id:e.id,label:e.label,y:a[t]})))},[e]);function b(t){let r=e.find(e=>e.id===t);if(!r)return;let n=o(r);n&&(f(t),p.current=performance.now()+1e3+150,(0,i.scrollToSectionSmart)(n,{offset:96}),history.replaceState&&history.replaceState(null,"",`#${t}`))}return((0,r.useEffect)(()=>{y();let e=0,t=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(y)};window.addEventListener("resize",t);let r=new ResizeObserver(t);return r.observe(document.body),c.current&&r.observe(c.current),()=>{window.removeEventListener("resize",t),r.disconnect(),cancelAnimationFrame(e)}},[y]),(0,r.useEffect)(()=>{let e=0,t=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(()=>{let e=c.current,t=d.current,r=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);if(e&&t){let n=l(window.scrollY/r);t.style.transform=`translateY(${n*e.clientHeight}px)`}if(performance.now()<p.current)return;let n=v.current;if(0===n.length)return;let i=window.scrollY+96+2,a=n[0].id;for(let e of n)e.top<=i&&(a=e.id);window.scrollY>=r-2&&(a=n[n.length-1].id),f(e=>e===a?e:a)})};return t(),window.addEventListener("scroll",t,{passive:!0}),()=>{window.removeEventListener("scroll",t),cancelAnimationFrame(e)}},[u]),w)?null:(0,t.jsxs)(t.Fragment,{children:[s&&(0,t.jsx)("nav",{"aria-label":"Jump to section",className:"flex flex-wrap gap-2 py-4 lg:hidden",children:e.map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>b(e.id),"aria-current":m===e.id?"true":void 0,className:"min-h-11 border border-[var(--method-rule)] px-4 font-mono text-xs uppercase tracking-widest text-[var(--method-muted)] transition-colors hover:text-[var(--fg)]",children:e.label},e.id))}),(0,t.jsx)("nav",{"aria-label":"Section navigation","data-testid":"minimap-nav",className:"pointer-events-none fixed bottom-[88px] left-10 top-[208px] z-30 hidden w-[120px] mix-blend-difference lg:block",children:(0,t.jsxs)("div",{ref:c,className:"relative h-full",children:[(0,t.jsx)("div",{ref:d,"aria-hidden":!0,"data-testid":"minimap-playhead",className:"absolute -left-[7px] top-0 h-[2px] w-[15px] bg-white will-change-transform"}),u.map(e=>{let r=m===e.id;return(0,t.jsx)("div",{style:{top:e.y},className:"absolute left-0 -translate-y-1/2",children:(0,t.jsxs)("button",{type:"button",onClick:()=>b(e.id),"data-cursor":"hover","data-cursor-label":e.label,"data-minimap-label":e.id,"aria-current":r?"true":void 0,"aria-label":`Go to ${e.label}`,className:"group pointer-events-auto flex items-center gap-3 py-1",children:[(0,t.jsx)("span",{"aria-hidden":!0,className:`block h-px transition-[width,background-color] duration-[450ms] ease-[cubic-bezier(0.56,0.22,0.05,0.99)] motion-reduce:transition-none ${r?"w-[18px] bg-white":"w-[10px] bg-white/40 group-hover:bg-white/80"}`}),(0,t.jsx)("span",{"aria-hidden":!0,className:`font-mono select-none whitespace-nowrap text-[10px] uppercase tracking-[0.14em] transition-[color,transform] duration-[450ms] ease-[cubic-bezier(0.56,0.22,0.05,0.99)] motion-reduce:transition-none ${r?"translate-x-0.5 text-white":"text-white/45 group-hover:text-white/85"}`,children:e.label})]})},e.id)})]})})]})}])},62664,e=>{"use strict";var t=e.i(18050),r=e.i(71645),n=e.i(8560),i=e.i(90072);let a=`
precision highp float;
uniform float u_time;
uniform vec3 u_trail[24];   // world xy + strength
uniform float u_dpr;
uniform float u_sizeAtten;        // ~camera distance, keeps rest size ~constant
uniform vec2 u_res;               // viewport in CSS px (world ≈ px)
uniform float u_ambientPush;      // ambient self-parting magnitude (px)
attribute float a_seed;
varying float v_energy;
varying vec2 v_screen;

void main() {
  vec3 p = position;

  // Idle breathing — the field is never fully still.
  p.x += sin(u_time * 0.50 + a_seed * 6.2831) * 2.2;
  p.y += cos(u_time * 0.42 + a_seed * 9.4) * 2.2;
  p.z += sin(u_time * 0.33 + a_seed * 4.1) * 3.0;

  float energy = 0.0;

  // Ambient self-parting — the cloud opens gently at the SAME slow drifting
  // lobes the background reveal uses, so the field breathes open on its own
  // even with no cursor (immersive-g feel). Lobe centers are computed in uv
  // (y-up) then mapped to world px.
  float breath = 0.62 + 0.38 * sin(u_time * 0.18);
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    vec2 cuv = vec2(
      0.5 + 0.40 * sin(u_time * (0.060 + fk * 0.017) + fk * 2.10),
      0.5 + 0.30 * cos(u_time * (0.048 + fk * 0.013) + fk * 4.30)
    );
    vec2 cw = vec2((cuv.x - 0.5) * u_res.x, (cuv.y - 0.5) * u_res.y);
    vec2 da = p.xy - cw;
    float dd = max(length(da), 0.001);
    float s = u_ambientPush * breath * exp(-(dd * dd) / (220.0 * 220.0));
    p.xy += (da / dd) * s;
    p.z += s * 0.9;
    energy += s / max(u_ambientPush, 0.001) * 0.5; // faint tint where it opens
  }

  for (int i = 0; i < 24; i++) {
    vec3 t = u_trail[i];
    if (t.z <= 0.0) continue;
    vec2 d = p.xy - t.xy;
    float dist = max(length(d), 0.001);
    float s = t.z * exp(-(dist * dist) / (150.0 * 150.0));
    vec2 dir = d / dist;
    // Radial spread in the view plane + a slight swirl, then pop toward camera.
    p.xy += dir * s * 52.0 + vec2(-dir.y, dir.x) * s * 16.0;
    p.z += s * 150.0;
    energy += s;
  }
  v_energy = clamp(energy, 0.0, 1.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  v_screen = gl_Position.xy / gl_Position.w * 0.5 + 0.5;

  float size = (1.7 + v_energy * 3.0) * u_dpr;
  gl_PointSize = size * (u_sizeAtten / -mv.z);
}
`,o=`
precision highp float;
uniform sampler2D u_video;
uniform float u_light;                          // 1 = light theme, 0 = dark theme
varying float v_energy;
varying vec2 v_screen;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float sprite = smoothstep(0.5, 0.10, length(c));
  if (sprite <= 0.0) discard;

  vec3 vid = texture2D(u_video, clamp(v_screen, 0.0, 1.0)).rgb;
  float lum = dot(vid, vec3(0.299, 0.587, 0.114));
  vec3 accents = vid - vec3(lum);              // chroma residual = the LEDs
  // The cloud is additively blended; the canvas composites over the page as
  // page' = col + (1 - a) * page, so a dot's perceptual weight is:
  //  • DARK theme: brightening ≈ col on near-black (Δ ≈ 0.5 at rest).
  //  • LIGHT theme: darkening ≈ a * page - col — so INK contrast needs a HIGH
  //    rest alpha and a near-black base. The old 0.14/0.26 pair only moved the
  //    paper ~0.11 and the field read as barely-there next to dark mode
  //    (theme-parity ask, 2026-07-03). 0.05/0.60 gives Δ ≈ 0.52 — the same
  //    magnitude as dark's rest brightening.
  bool light = u_light > 0.5;
  vec3 base   = light ? vec3(0.05, 0.052, 0.06) : vec3(0.50, 0.53, 0.60);
  float ceil  = light ? 0.48 : 0.78;
  float restA = light ? 0.60 : 0.42;
  vec3 tint = clamp(vec3(pow(clamp(lum, 0.0, 1.0), 2.2)) * 0.28 + accents * 0.55, 0.0, 0.40);
  vec3 col = mix(base, base + tint, clamp(v_energy * 1.1, 0.0, 1.0));
  col += v_energy * 0.10;                      // slight lift only
  col = clamp(col, 0.0, ceil);

  float a = (restA + v_energy * 0.66) * sprite;
  gl_FragColor = vec4(col, a);                 // additive blend (set on material)
}
`,l=`
precision highp float;
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,s=`
precision highp float;
uniform sampler2D u_video;
uniform vec3 u_trailUV[24];  // screen uv (y-up) + strength
uniform float u_aspect;
uniform float u_time;
uniform float u_ambient;           // ceiling for the self-reveal layer
uniform float u_light;             // 0 = dark theme, 1 = light theme
uniform float u_videoAspect;       // native video w/h (e.g. 16/9) — keeps cover
varying vec2 v_uv;

// Cover-fit the (landscape) footage to the viewport at its NATIVE aspect:
// fill the frame, crop the overflow, never stretch. On a portrait phone this
// fills the height and lets the sides spill outside the viewport.
vec2 coverUV(vec2 uv, float viewA, float vidA) {
  vec2 c = uv - 0.5;
  if (viewA < vidA) c.x *= viewA / vidA;  // narrow/portrait view → fill height, crop width
  else              c.y *= vidA / viewA;  // wide view → fill width, crop height
  return c + 0.5;
}

void main() {
  // --- Cursor-driven reveal (the wake) ---
  float reveal = 0.0;
  for (int i = 0; i < 24; i++) {
    vec3 t = u_trailUV[i];
    if (t.z <= 0.0) continue;
    vec2 d = v_uv - t.xy;
    d.x *= u_aspect;                 // round wipe on non-square viewports
    float dist = length(d);
    reveal += t.z * exp(-(dist * dist) / 0.020);
  }

  // --- Ambient self-reveal (immersive-g) ---
  // A few large, slow lobes wander across the plane so the machine interior
  // breathes through on its OWN, with no cursor input. Subtle and capped so
  // most of the page stays dark; the cursor wake still dominates.
  float ambient = 0.0;
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    vec2 c = vec2(
      0.5 + 0.40 * sin(u_time * (0.060 + fk * 0.017) + fk * 2.10),
      0.5 + 0.30 * cos(u_time * (0.048 + fk * 0.013) + fk * 4.30)
    );
    vec2 da = v_uv - c;
    da.x *= u_aspect;
    float dd = length(da);
    ambient += exp(-(dd * dd) / 0.045);
  }
  float breath = 0.62 + 0.38 * sin(u_time * 0.18);
  ambient = clamp(ambient, 0.0, 1.0) * u_ambient * breath;

  reveal = clamp(reveal + ambient, 0.0, 1.0);
  if (reveal <= 0.002) discard;

  vec3 vid = texture2D(u_video, coverUV(v_uv, u_aspect, u_videoAspect)).rgb;
  float lum = dot(vid, vec3(0.299, 0.587, 0.114));
  // Dark-theme grade, lifted slightly (2026-06-15): less crush, a brighter
  // grey base and a higher ceiling so the machine interior reads a touch
  // more — while still staying clearly sub-white on the #050505 page.
  float crushed = pow(clamp(lum, 0.0, 1.0), 1.85);
  vec3 accents = vid - vec3(lum);                  // chroma residual = the LEDs
  vec3 graded = vec3(crushed) * 0.62;              // brighter grey base
  graded += accents * 0.40;                        // slightly stronger glints
  graded *= vec3(0.66, 0.82, 1.12);                // cool teal cast
  graded = clamp(graded, 0.0, 0.50);               // higher ceiling, still sub-white

  // Light-theme grade: the dark grade above would read as a dark hole on the
  // warm-paper page. INVERT the crush so the dark machine footage becomes a
  // soft paper wash with faint ink detail where the cloud parts — a white wash
  // over the video, never a dark patch. Cool accents survive as a whisper.
  float litInv = 1.0 - pow(clamp(lum, 0.0, 1.0), 1.4);
  vec3 lightGraded = vec3(0.95, 0.935, 0.915) - vec3(litInv) * vec3(0.13, 0.15, 0.18);
  lightGraded += accents * 0.16;
  lightGraded = clamp(lightGraded, 0.74, 1.0);
  graded = mix(graded, lightGraded, u_light);

  float m = smoothstep(0.0, 0.9, reveal);
  gl_FragColor = vec4(graded, m * 0.9);
}
`,c={kind:"exp",durationSec:2.2};e.s(["DEFAULT_REVEAL_FADE",0,c,"default",0,function({revealFade:e}={}){let d=(0,r.useRef)(null),u=(0,r.useRef)(null),[h,m]=(0,r.useState)(!1),[f,p]=(0,r.useState)(!1);(0,r.useEffect)(()=>{let e=window.matchMedia("(min-width: 768px)"),t=window.matchMedia("(prefers-reduced-motion: reduce)"),r=()=>p(e.matches&&!t.matches);return r(),e.addEventListener("change",r),t.addEventListener("change",r),()=>{e.removeEventListener("change",r),t.removeEventListener("change",r)}},[]);let v=(0,r.useRef)(e);return(0,r.useEffect)(()=>{v.current=e},[e]),(0,r.useEffect)(()=>{let e=()=>m(!0);return void e()},[]),(0,r.useEffect)(()=>{let e=d.current,t=u.current;if(!e||!t)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.dataset.fieldState="off";return}let r=window.matchMedia("(min-width: 768px)"),h=!1,m=null,f=()=>{!h&&!m&&r.matches&&(e.parentElement&&(e.parentElement.style.opacity="1"),e.style.opacity="1",m=function(e,t,r){let d;try{d=new n.WebGLRenderer({canvas:e,alpha:!0,antialias:!1,powerPreference:"low-power"})}catch{return e.dataset.fieldState="off",()=>{}}let u=Math.min(window.devicePixelRatio||1,1.75);d.setPixelRatio(u),d.setClearColor(0,0);let h=new i.Scene,m=new i.PerspectiveCamera(55,1,1,1e5),f=new i.VideoTexture(t);f.minFilter=i.LinearFilter,f.magFilter=i.LinearFilter,f.colorSpace=i.SRGBColorSpace;let p=()=>{let e=t.play();e&&"function"==typeof e.catch&&e.catch(()=>{})};p(),window.addEventListener("intro:gone",p);let v=new i.ShaderMaterial({uniforms:{u_video:{value:f},u_trailUV:{value:Array.from({length:24},()=>new i.Vector3)},u_aspect:{value:1},u_time:{value:0},u_ambient:{value:.32},u_light:{value:0},u_videoAspect:{value:16/9}},vertexShader:l,fragmentShader:s,transparent:!0,depthTest:!1,depthWrite:!1}),g=new i.Mesh(new i.PlaneGeometry(1,1),v);g.renderOrder=0,h.add(g);let w=()=>{t.videoWidth&&t.videoHeight&&(v.uniforms.u_videoAspect.value=t.videoWidth/t.videoHeight)};w(),t.addEventListener("loadedmetadata",w);let y=new i.ShaderMaterial({uniforms:{u_time:{value:0},u_dpr:{value:u},u_sizeAtten:{value:1e3},u_video:{value:f},u_trail:{value:Array.from({length:24},()=>new i.Vector3)},u_res:{value:new i.Vector2(1,1)},u_ambientPush:{value:13},u_light:{value:0}},vertexShader:a,fragmentShader:o,transparent:!0,depthTest:!1,depthWrite:!1,blending:i.AdditiveBlending}),b=()=>{let e=+("light"===document.documentElement.dataset.theme);v.uniforms.u_light.value=e,y.uniforms.u_light.value=e};b();let x=new MutationObserver(b);x.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});let _=new i.Points(new i.BufferGeometry,y);_.renderOrder=1,_.frustumCulled=!1;let L=new i.Group;L.add(_),h.add(L);let C=1,k=1;function M(){let t=e.clientWidth,r=e.clientHeight;if(0===t||0===r)return;C=t,k=r,u=Math.min(window.devicePixelRatio||1,1.75),d.setPixelRatio(u),d.setSize(t,r,!1);let n=55*Math.PI/180,a=r/(2*Math.tan(n/2));m.aspect=t/r,m.position.set(0,0,a),m.updateProjectionMatrix(),y.uniforms.u_sizeAtten.value=a,y.uniforms.u_dpr.value=u,y.uniforms.u_res.value.set(t,r),v.uniforms.u_aspect.value=t/r;let o=2*(a+240)*Math.tan(n/2);g.scale.set(t/r*o,o,1),g.position.z=-240;let l=t<768?30:24,s=Math.ceil(t/l)+2,c=Math.ceil(r/l)+2,h=Math.min(s*c,12e3),f=new Float32Array(3*h),p=new Float32Array(h),w=0;e:for(let e=0;e<c;e++)for(let n=0;n<s;n++){if(w>=h)break e;let i=5*Math.sin(12.9898*e+78.233*n),a=5*Math.cos(39.346*e+11.135*n),o=(.5*Math.sin(7.13*e+3.7*n)+.5)*220-110;f[3*w]=-t/2+n*l+i,f[3*w+1]=r/2-e*l+a,f[3*w+2]=o,p[w]=43758.5453*Math.sin(127.1*w)%1,w++}let b=_.geometry;b.setAttribute("position",new i.BufferAttribute(f,3)),b.setAttribute("a_seed",new i.BufferAttribute(p,1)),b.setDrawRange(0,h)}let E=Array.from({length:24},()=>new i.Vector3),A=Array.from({length:24},()=>new i.Vector3),S=new Float32Array(24),j=new Float32Array(24),F=0,R=-1e4,z=-1e4,H=0,I=!1,P=0,V=0;function W(e){let t=e.clientX,r=e.clientY,n=performance.now(),i=Math.hypot(t-R,r-z);if(i<4)return;let a=Math.min(.45+i/Math.max(n-H,1)*.6,1.7);I&&(a=Math.min(1.6*a+.35,2.4)),E[F].set(t-C/2,k/2-r,a),A[F].set(t/C,1-r/k,a),S[F]=n,j[F]=a,F=(F+1)%24,R=t,z=r,H=n,P=(t/C-.5)*.42,V=(r/k-.5)*.34}function $(e){I=!0;let t=e.clientX,r=e.clientY,n=performance.now();E[F].set(t-C/2,k/2-r,1.9),A[F].set(t/C,1-r/k,1.9),S[F]=n,j[F]=1.9,F=(F+1)%24,R=t,z=r,H=n}function D(){I=!1}let N=0,O=!1,G=performance.now(),q=G;function B(e){if(!O)return;let t=Math.min((e-q)/1e3,.05);q=e;let n=Math.exp(-3.4*t),i=r.current??c;for(let t=0;t<24;t++){E[t].z*=n;let r=(e-S[t])/1e3;A[t].z=j[t]*function(e,t){let r=Math.max(t.durationSec,.05);if("exp"===t.kind)return Math.exp(Math.log(.05)/r*e);if("smooth"===t.kind){let t=Math.min(e/r,1);return 1-t*t*(3-2*t)}let n=Math.min(t.holdSec??.4*r,r-.05);if(e<=n)return 1;let i=Math.min((e-n)/(r-n),1);return 1-i*i*(3-2*i)}(r,i)}y.uniforms.u_trail.value.forEach((e,t)=>e.copy(E[t])),v.uniforms.u_trailUV.value.forEach((e,t)=>e.copy(A[t]));let a=(e-G)/1e3;y.uniforms.u_time.value=a,v.uniforms.u_time.value=a,L.rotation.y+=(P-L.rotation.y)*.05,L.rotation.x+=(V-L.rotation.x)*.05,d.render(h,m),N=requestAnimationFrame(B)}let T=!0;function U(r){r!==O&&(O=r,e.dataset.fieldState=r?"running":"paused",r?(p(),N=requestAnimationFrame(B)):(cancelAnimationFrame(N),t.pause()))}M(),U(!0);let Z=new IntersectionObserver(([e])=>{U((T=e.isIntersecting)&&!document.hidden)},{threshold:0});Z.observe(e);let Y=()=>U(T&&!document.hidden);document.addEventListener("visibilitychange",Y);let K=0,X=new ResizeObserver(()=>{cancelAnimationFrame(K),K=requestAnimationFrame(M)});X.observe(e);let J=t=>{t.preventDefault(),U(!1),e.dataset.fieldState="off"};return e.addEventListener("webglcontextlost",J),window.addEventListener("pointermove",W,{passive:!0}),window.addEventListener("pointerdown",$,{passive:!0}),window.addEventListener("pointerup",D,{passive:!0}),window.addEventListener("pointercancel",D,{passive:!0}),()=>{U(!1),Z.disconnect(),X.disconnect(),x.disconnect(),cancelAnimationFrame(K),document.removeEventListener("visibilitychange",Y),window.removeEventListener("pointermove",W),window.removeEventListener("pointerdown",$),window.removeEventListener("pointerup",D),window.removeEventListener("pointercancel",D),window.removeEventListener("intro:gone",p),t.removeEventListener("loadedmetadata",w),e.removeEventListener("webglcontextlost",J),_.geometry.dispose(),y.dispose(),v.dispose(),g.geometry.dispose(),f.dispose(),d.dispose()}}(e,t,v))},p=()=>r.matches?f():void(m&&(m(),m=null),e.dataset.fieldState="off",e.style.opacity="0");return e.dataset.fieldState="off",r.matches||(e.style.opacity="0"),f(),window.addEventListener("intro:gone",f),r.addEventListener("change",p),()=>{h=!0,window.removeEventListener("intro:gone",f),r.removeEventListener("change",p),m&&m()}},[]),(0,t.jsxs)("div",{"aria-hidden":!0,className:"pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-[1400ms] ease-out",style:{opacity:+!!h},children:[(0,t.jsx)("video",{ref:u,className:"pointer-events-none fixed left-0 top-0 h-[2px] w-[2px] opacity-0",src:"assets/andrewcunliffe.ai/",muted:!0,loop:!0,playsInline:!0,preload:f?"auto":"none","aria-hidden":!0}),(0,t.jsx)("canvas",{ref:d,"data-testid":"hero-field",className:"h-full w-full"})]})}])}]);