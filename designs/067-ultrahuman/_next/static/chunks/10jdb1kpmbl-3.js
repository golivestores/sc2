(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,462817,e=>{e.v({className:"graphik_431a85d-module__BJ2CdG__className",variable:"graphik_431a85d-module__BJ2CdG__variable"})},651162,e=>{"use strict";var t=e.i(462817);let r={className:t.default.className,style:{fontFamily:"'graphik', 'graphik Fallback', system-ui, sans-serif"}};null!=t.default.variable&&(r.variable=t.default.variable),e.s(["graphik",0,r],651162)},341476,e=>{"use strict";let t=null,r=[];async function n(){if(!t)try{var n={track:(await e.A(776218)).track};t=n;let i=r;for(let[e,t]of(r=[],i))n.track(e,t)}catch{r=[]}}e.s(["analytics",0,{track:function(e,n){t?t.track(e,n):r.length<50&&r.push([e,n])}},"initAnalyticsProvider",0,n])},519230,e=>{"use strict";var t=e.i(391398),r=e.i(191788),n=e.i(203828),i=e.i(126019),a=e.i(760814),o=e.i(307959),s=e.i(341476);let c=a.default.button.withConfig({componentId:"sc-dd6d3c1f-0"})`
  cursor: pointer;
  background: transparent;
  border: 1px solid
    ${({$variant:e})=>"dark"===e?"rgba(255, 255, 255, 0.25)":"rgba(0, 0, 0, 0.15)"};
  border-radius: 999px;
  box-sizing: border-box;
  min-height: 28px;
  padding: ${({hideRegionLabel:e})=>e?"4px 4px":"4px 6px 4px 4px"};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.14px;
  color: inherit;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  opacity: 1 !important;

  &:hover {
    background: ${({$variant:e})=>"dark"===e?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.04)"};
  }
`;e.s(["RegionSelector",0,({className:e,displayFormat:a="iso",theme:d="light",hideRegionLabel:u=!1})=>{let{countryName:l,flag:p,region:h}=(0,r.useContext)(o.RegionLocaleContext),f=(0,n.useRouter)();return(0,t.jsxs)(c,{className:e,onClick:()=>{s.analytics.track("Region Selector - CLICK");let e=f.asPath;f.push(`/choose-country-region?ref=${encodeURIComponent(e)}`)},$variant:d,hideRegionLabel:u,children:[p&&(0,t.jsx)(i.default,{src:p,alt:`${h} flag`,width:18,height:18,style:{borderRadius:"50%"}}),u?null:"name"===a&&l||h]})}])},429201,e=>{"use strict";let t={src:e.i(630042).default,width:640,height:640,blurWidth:8,blurHeight:8,blurDataURL:"data:image/webp;base64,UklGRhIBAABXRUJQVlA4TAUBAAAvB8ABEM1VICICHgi6FSMAAICXGgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg7sS5MdAADwQMBtIAAAAM7/0ujAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg4SUeCLgNBAAAwPlfGh0wGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8vMQDCQAAAAAAOP8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgPzd+/4+k4jEtp0BeN4TSW3bGWr1+n+dBCCSAiaxMyIBRKLWJAD/nQGwLRKAWpGoVYBakQA6CdsAtk2iALUaydkFsO09x3d2AQAA"};e.s(["default",0,t])},194111,e=>{"use strict";var t=e.i(391398);e.s(["UHLogo",0,e=>(0,t.jsxs)("svg",{className:e.className,style:e.style,width:"32px",height:"24px",viewBox:"0 0 32 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("title",{children:"Logo / 53"}),(0,t.jsx)("desc",{children:"Created with Sketch."}),(0,t.jsx)("g",{id:"Symbols",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:(0,t.jsx)("g",{id:"header-/-Default",transform:"translate(-120.000000, -24.000000)",fill:e.fill??"#000",children:(0,t.jsx)("g",{id:"header-/-scrolled",transform:"translate(120.000000, 20.000000)",children:(0,t.jsx)("g",{id:"Logo-/-53",children:(0,t.jsx)("path",{d:"M28.5836299,4.22641509 L28.5836299,13.3454483 L23.474,13.3454151 L32,21.0242679 L25.8058042,27.7735849 L15.9998561,18.9433764 L6.19419577,27.7735849 L0,21.0242679 L8.526,13.3454151 L3.40498221,13.3454483 L3.40498221,4.22641509 L28.5836299,4.22641509 Z",id:"Combined-Shape"})})})})})]})])},939028,e=>{e.v({className:"jetbrains_mono_85243f4a-module__eb-CGW__className",variable:"jetbrains_mono_85243f4a-module__eb-CGW__variable"})},208173,e=>{"use strict";var t=e.i(939028);let r={className:t.default.className,style:{fontFamily:"'JetBrains Mono', monospace",fontStyle:"normal"}};null!=t.default.variable&&(r.variable=t.default.variable),e.s(["jetbrainsMono",0,r],208173)},777658,e=>{"use strict";let t={diagnostics:"/performance-lab",recovery:"/performance-lab/recovery",ivLounge:"/performance-lab/iv-lounge",contact:"/performance-lab/contact"},r=[t.diagnostics,t.recovery,t.ivLounge,t.contact],n=e=>r.includes(e);function i(e){let r=e.split("?")[0].split("#")[0].replace(/\/$/,"")||"/",n=r.indexOf("/performance-lab");return n>=0?r.slice(n)||t.diagnostics:r}e.s(["PERFORMANCE_LAB_NAV_PATHS",0,t,"getPerformanceLabNavSection",0,e=>e===t.diagnostics?"diagnostics":e===t.recovery?"recovery":e===t.ivLounge?"ivLounge":e===t.contact?"contact":null,"isPerformanceLabRoute",0,e=>i(e).startsWith("/performance-lab"),"normalizePerformanceLabRoutePath",0,i,"usesPerformanceLabNavbar",0,n,"usesPerformanceLabNavbarUrl",0,e=>n(i(e))])},940290,e=>{"use strict";var t=e.i(391398);e.s(["CaretUp",0,({className:e,style:r,fill:n="white",width:i=15,height:a=11})=>(0,t.jsx)("svg",{className:e,style:r,width:i,height:a,viewBox:"0 0 15 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M14.6732 8.15665L12.6499 10.18L7.33659 4.85126L2.0233 10.18L-4.00543e-05 8.15665L7.33662 0.819993L14.6732 8.15665Z",fill:n??"white"})})])},661174,e=>{"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.s(["default",()=>t])},987250,e=>{"use strict";var t=e.i(661174);e.s(["default",0,function(e,r,n){var i;return(i=function(e,r){if("object"!=(0,t.default)(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,r||"default");if("object"!=(0,t.default)(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(r,"string"),(r="symbol"==(0,t.default)(i)?i:i+"")in e)?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}],987250)},760121,(e,t,r)=>{"use strict";var n=e.r(191788),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=n.useState,o=n.useEffect,s=n.useLayoutEffect,c=n.useDebugValue;function d(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(e){return!0}}var u="u"<typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=a({inst:{value:r,getSnapshot:t}}),i=n[0].inst,u=n[1];return s(function(){i.value=r,i.getSnapshot=t,d(i)&&u({inst:i})},[e,r,t]),o(function(){return d(i)&&u({inst:i}),e(function(){d(i)&&u({inst:i})})},[e]),c(r),r};r.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:u},890979,(e,t,r)=>{"use strict";t.exports=e.r(760121)},75907,e=>{"use strict";function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>t])},771914,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return c}});let n=e.r(191788),i=e.r(799604),a="function"==typeof IntersectionObserver,o=new Map,s=[];function c({rootRef:e,rootMargin:t,disabled:r}){let d=r||!a,[u,l]=(0,n.useState)(!1),p=(0,n.useRef)(null),h=(0,n.useCallback)(e=>{p.current=e},[]);return(0,n.useEffect)(()=>{if(a){if(d||u)return;let r=p.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:i,elements:a}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=s.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=o.get(n)))return t;let i=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:i},s.push(r),o.set(r,t),t}(r);return a.set(e,t),i.observe(e),function(){if(a.delete(e),i.unobserve(e),0===a.size){i.disconnect(),o.delete(n);let e=s.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&s.splice(e,1)}}}(r,e=>e&&l(e),{root:e?.current,rootMargin:t})}else if(!u){let e=(0,i.requestIdleCallback)(()=>l(!0));return()=>(0,i.cancelIdleCallback)(e)}},[d,t,e,u,p.current]),[h,u,(0,n.useCallback)(()=>{l(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},154471,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(270090),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},548735,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},539149,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return S},useLinkStatus:function(){return E}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(952456),o=e.r(391398),s=a._(e.r(191788)),c=e.r(160472),d=e.r(471112),u=e.r(728169),l=e.r(889129),p=e.r(514862),h=e.r(425479),f=e.r(771914),m=e.r(154471),y=e.r(344113),g=e.r(663230);e.r(548735);let _=new Set;function b(e,t,r,n){if(!("u"<typeof window)&&(0,d.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let i=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(_.has(i))return;_.add(i)}e.prefetch(t,r,n).catch(e=>{})}}function x(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let v=s.default.forwardRef(function(e,t){let r,n,{href:i,as:a,children:u,prefetch:_=null,passHref:v,replace:w,shallow:E,scroll:S,locale:A,onClick:C,onNavigate:I,onMouseEnter:R,onTouchStart:P,legacyBehavior:T=!1,transitionTypes:j,...k}=e;r=u,T&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let L=s.default.useContext(h.RouterContext),V=!1!==_,{href:O,as:N}=s.default.useMemo(()=>{if(!L){let e=x(i);return{href:e,as:a?x(a):e}}let[e,t]=(0,c.resolveHref)(L,i,!0);return{href:e,as:a?(0,c.resolveHref)(L,a):t||e}},[L,i,a]),H=s.default.useRef(O),M=s.default.useRef(N);T&&(n=s.default.Children.only(r));let D=T?n&&"object"==typeof n&&n.ref:t,[U,F,$]=(0,f.useIntersection)({rootMargin:"200px"}),B=s.default.useCallback(e=>{(M.current!==N||H.current!==O)&&($(),M.current=N,H.current=O),U(e)},[N,O,$,U]),W=(0,g.useMergedRef)(B,D);s.default.useEffect(()=>{!L||F&&V&&b(L,O,N,{locale:A})},[N,O,F,A,V,L?.locale,L]);let G={ref:W,onClick(e){T||"function"!=typeof C||C(e),T&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!L||e.defaultPrevented||function(e,t,r,n,i,a,o,s,c){let u,{nodeName:l}=e.currentTarget;if(!("A"===l.toUpperCase()&&((u=e.currentTarget.getAttribute("target"))&&"_self"!==u||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,d.isLocalURL)(r)){i&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(c){let e=!1;if(c({preventDefault:()=>{e=!0}}),e)return}let e=o??!0;"beforePopState"in t?t[i?"replace":"push"](r,n,{shallow:a,locale:s,scroll:e}):t[i?"replace":"push"](n||r,{scroll:e})})()}}(e,L,O,N,w,E,S,A,I)},onMouseEnter(e){T||"function"!=typeof R||R(e),T&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),L&&b(L,O,N,{locale:A,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){T||"function"!=typeof P||P(e),T&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),L&&b(L,O,N,{locale:A,priority:!0,bypassPrefetchedCheck:!0})}};if((0,l.isAbsoluteUrl)(N))G.href=N;else if(!T||v||"a"===n.type&&!("href"in n.props)){let e=void 0!==A?A:L?.locale;G.href=L?.isLocaleDomain&&(0,m.getDomainLocale)(N,e,L?.locales,L?.domainLocales)||(0,y.addBasePath)((0,p.addLocale)(N,e,L?.defaultLocale))}return T?s.default.cloneElement(n,G):(0,o.jsx)("a",{...k,...G,children:r})}),w=(0,s.createContext)({pending:!1}),E=()=>(0,s.useContext)(w),S=v;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41158,(e,t,r)=>{t.exports=e.r(539149)},153147,e=>{"use strict";var t=e.i(391398),r=e.i(191788),n=e.i(41158),i=e.i(203828),a=e.i(171225),o=e.i(307959);let s=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","email","affiliate","affiliateCode","referral","discount","sscid","irclickid","click_id","flow"];function c(e){return!(e.startsWith("#")||e.startsWith("/"))&&(!!(e.startsWith("mailto:")||e.startsWith("tel:"))||/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(e))}function d(e){return"/blog"===e||e.startsWith("/blog/")}function u(e,t){if(!e.startsWith("/"))return e;let r=e.split("/").filter(Boolean)[0];return!r||/^\w{2}(-\w{2,3})?$/.test(r)?e:a.REGION_PREFIXED_PATHS.has(r.toLowerCase())?`/${t}${e}`:e}function l(e){return e?e.startsWith("#")?e:`#${e}`:""}function p(e,t){let r=e.startsWith("//");try{if(r){let r=new URL(`https:${e}`),n=t?.incomingQuery??{};Object.entries(n).forEach(([e,t])=>{r.searchParams.delete(e),Array.isArray(t)?t.forEach(t=>r.searchParams.append(e,t)):r.searchParams.append(e,t)});let i=t?.extraParams??{};return Object.entries(i).forEach(([e,t])=>{r.searchParams.has(e)||(Array.isArray(t)?t.forEach(t=>r.searchParams.append(e,t)):r.searchParams.append(e,t))}),`//${r.host}${r.pathname}${r.search}${r.hash}`}let n=new URL(e),i=t?.incomingQuery??{};Object.entries(i).forEach(([e,t])=>{n.searchParams.delete(e),Array.isArray(t)?t.forEach(t=>n.searchParams.append(e,t)):n.searchParams.append(e,t)});let a=t?.extraParams??{};Object.entries(a).forEach(([e,t])=>{n.searchParams.has(e)||(Array.isArray(t)?t.forEach(t=>n.searchParams.append(e,t)):n.searchParams.append(e,t))});let o=n.toString();if(t?.appendHash)return`${o}${l(t.appendHash)}`;return o}catch{return e}}function h(e){let t=(0,i.useRouter)(),{regionSlug:n}=(0,r.useContext)(o.RegionLocaleContext);return(0,r.useCallback)((r,i)=>(function(e,t={},r){let n=r?.discardParams??[],i=r?.appendToExternal??!1,a=r?.asObject??!1,o=new Set(n.map(e=>e.toLowerCase())),u=s.filter(e=>!o.has(e.toLowerCase())),h={};if(u.forEach(e=>{let r=t[e];null!=r&&(h[e]=Array.isArray(r)?r.map(e=>String(e)):String(r))}),"string"==typeof e){if(c(e))return e.startsWith("mailto:")||e.startsWith("tel:")||!i?e:p(e,{extraParams:h});let t=d(e)?{}:h;if(!a){let r=new URLSearchParams;return Object.entries(t).forEach(([e,t])=>{Array.isArray(t)?t.forEach(t=>r.append(e,t)):r.append(e,t)}),`${e}${r.toString()?`?${r.toString()}`:""}`}return{pathname:e,query:t}}if("string"==typeof e.pathname&&c(e.pathname)){if(e.pathname.startsWith("mailto:")||e.pathname.startsWith("tel:"))return a?e:e.pathname;if(!i){if(a)return e;let t=e.query??{};return p(e.pathname,{incomingQuery:t,appendHash:"string"==typeof e.hash?e.hash:void 0})}let t=e.query??{};return p(e.pathname,{incomingQuery:t,extraParams:h,appendHash:"string"==typeof e.hash?e.hash:void 0})}let f=e.query??{},m="string"==typeof e.pathname&&d(e.pathname)?{}:h;if(!a){let t={},r=(e,r)=>{if(Array.isArray(r)){Array.isArray(t[e])||(t[e]=[]);let n=t[e];r.forEach(e=>{n.includes(e)||n.push(e)})}else t[e]=r};Object.entries(m).forEach(([e,t])=>r(e,t)),Object.entries(f).forEach(([e,t])=>r(e,t));let n=new URLSearchParams;Object.entries(t).forEach(([e,t])=>{Array.isArray(t)?t.forEach(t=>n.append(e,t)):n.append(e,t)});let i="string"==typeof e.pathname?e.pathname:"",a="string"==typeof e.hash?l(e.hash):"";return`${i}${n.toString()?`?${n.toString()}`:""}${a}`}return{...e,query:{...m,...f}}})("string"==typeof r?u(r,n):r.pathname&&!c(r.pathname)?{...r,pathname:u(r.pathname,n)}:r,t.query,{...e,...i}),[t.query,n,e?.discardParams,e?.appendToExternal,e?.asObject])}let f=r.default.forwardRef(function(e,i){let a,{href:o,discardParams:s,appendToExternal:c=!1,...d}=e,u=h(),l=(0,r.useMemo)(()=>u(o,{discardParams:s,appendToExternal:c,asObject:!0}),[o,u,s,c]),p=d.rel;return"_blank"===d.target&&((a=new Set(String(d.rel??"").trim().split(/\s+/).filter(Boolean))).add("noopener"),a.add("noreferrer"),p=Array.from(a).join(" ")),(0,t.jsx)(n.default,{ref:i,href:l,...d,rel:p})});e.s(["FORWARDED_PARAM_KEYS",0,s,"addRegionPrefix",0,u,"default",0,f,"useFormatLink",0,h])},419231,e=>{"use strict";var t=e.i(760814);let r=t.css`
  width: 100%;
  margin: 0 auto;

  padding: 0 12px;

  @media (min-width: ${({theme:e})=>e.globalV2.sm.minWidth}) {
    max-width: 540px;
    padding: 0 0;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.minWidth}) {
    max-width: 720px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
    max-width: 960px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.xl.minWidth}) {
    max-width: 1200px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.xxl.minWidth}) {
    max-width: 1320px;
  }
`,n=t.css`
  width: 100%;
  margin: 0 auto;

  padding: 0 12px;

  @media (min-width: ${({theme:e})=>e.globalV2.sm.minWidth}) {
    max-width: 670px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.minWidth}) {
    max-width: 900px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
    max-width: 1024px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.xl.minWidth}) {
    max-width: 1248px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.xxl.minWidth}) {
    max-width: 1440px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.xxxl.minWidth}) {
    max-width: 1920px;
  }
`,i=t.default.div.withConfig({componentId:"sc-d532561a-0"})`
  ${r}
`,a=t.default.div.withConfig({componentId:"sc-d532561a-1"})`
  ${n}
`;e.s(["Container",0,i,"ContainerCSS",0,r,"ContainerLG",0,a])},963635,e=>{"use strict";var t=e.i(391398),r=e.i(203828),n=e.i(126019);e.i(664157);var i=e.i(271179),a=e.i(307959),o=e.i(191788),s=e.i(760814),c=e.i(208173),d=e.i(940290),u=e.i(419231),l=e.i(153147),p=e.i(777658);let h=["IN","AE","CH","IS","GB","AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","MC","NL","PL","PT","RO","SK","SI","ES","SE","FO","NO","ZA","HK"],f=(0,s.default)(({className:e})=>{let{t:r}=(0,i.useTranslation)("common"),{region:s,flag:c,countryName:d}=(0,o.useContext)(a.RegionLocaleContext);if("XX"===s||!s||m.includes(s))return null;let l="GLOBAL"===s,p=d?(0,t.jsxs)(t.Fragment,{children:[r("common.marketingBanner.shipping")," ",l?r("common.marketingBanner.productName"):"US"===s||"PR"===s||[...h,"IN","AE"].includes(s)?"":r("common.marketingBanner.productName")," ",!l&&(0,t.jsxs)(t.Fragment,{children:[r("common.marketingBanner.toCountry",{country:d})," ",c&&(0,t.jsx)(n.default,{src:c,alt:r("common.marketingBanner.countryFlagAlt",{country:s}),width:16,height:16,style:{borderRadius:"50%",display:"inline-block",verticalAlign:"middle"}})]})]}):null;return(0,t.jsx)("div",{className:`${e} gtm`,"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsx)(u.Container,{children:p})})}).withConfig({componentId:"sc-1a13cad5-0"})`
  position: relative;
  z-index: 100;
  background: #000000;
  color: #ffffff;
  text-align: center;
  font-size: 1.4rem;

  height: 32px;
  display: grid;
  place-items: center;

  i {
    color: ${({theme:e})=>e.colorsV2.accent} !important;
    font-style: normal;
  }

  &.hide {
    display: none;
  }
`,m=["PK","SY","SS","YE","ET","BY","CF","ER","IQ","KP","LY","PS","RU","SO"];(0,s.default)(({className:e,content:n,onClick:i})=>{let s=(0,r.useRouter)(),{region:c}=(0,o.useContext)(a.RegionLocaleContext),d=(0,o.useRef)(null),u=!m.includes(c),p=(0,l.useFormatLink)(),[h,y]=(0,o.useState)(0);return(0,o.useEffect)(()=>{{let e=setInterval(()=>{"visible"===document.visibilityState&&y(e=>(e+1)%2)},6e3);return()=>{clearInterval(e)}}},[2]),(0,t.jsx)("div",{className:e,children:(0,t.jsxs)(t.Fragment,{children:[0===h?(0,t.jsx)("div",{className:"content",onClick:()=>{i?i():s.push(p("/home",{asObject:!0}))},"aria-hidden":!0,children:n}):null,1===h&&u?(0,t.jsx)("div",{ref:d,"aria-hidden":!0,children:(0,t.jsx)(f,{})}):null]})})}).withConfig({componentId:"sc-1a13cad5-1"})`
  background: #000;
  color: #fff;
  position: relative;
  cursor: pointer;

  min-height: 32px;
  display: grid;
  place-items: center;

  .hide {
    opacity: 0;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
    .only-mobile {
      display: none;
    }
  }

  & > .content {
    text-align: center;
    font-size: 1.4rem;
  }
`;let y=(0,s.default)(({className:e})=>{let{t:n}=(0,i.useTranslation)("common"),a=(0,r.useRouter)(),o=(0,l.useFormatLink)();return(0,t.jsx)("div",{className:`${e} ${c.jetbrainsMono.className} ${c.jetbrainsMono.variable} gtm `,onClick:()=>{a.push(o("/performance-lab",{asObject:!0}))},"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsxs)("span",{children:[n("common.marketingBanner.discoverPerformanceLab")," ",(0,t.jsx)("span",{className:"cta-text",children:n("common.marketingBanner.exploreNow")}),(0,t.jsx)("span",{className:"cta-icon",children:(0,t.jsx)(d.CaretUp,{style:{transform:"rotate(90deg)",height:"8px",opacity:"0.85",marginLeft:"4px"}})})]})})}).withConfig({componentId:"sc-1a13cad5-2"})`
  background: linear-gradient(
    263deg,
    #0c218f 6.79%,
    #1539f5 47.89%,
    #0c218f 102.85%
  );
  color: #ffffff;
  font-size: 1.2rem;
  text-transform: uppercase;

  &,
  & * {
    font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace !important;
  }
  letter-spacing: 0.05em;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;

  font-weight: 400;

  .cta-text {
    font-weight: 400;
    margin-left: 4px;
    opacity: 1;
    text-decoration: underline;
  }

  .cta-icon {
    display: none;
  }

  &:hover .cta-text {
    opacity: 0.85;
  }

  @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
    .cta-text {
      display: none;
    }
    .cta-icon {
      display: inline;
    }
  }
`,g=(0,s.default)(({className:e})=>{let{t:n}=(0,i.useTranslation)("common"),a=(0,r.useRouter)(),o=(0,l.useFormatLink)();return(0,t.jsx)("div",{className:`${e} gtm`,onClick:()=>{a.push(o("/pricing",{asObject:!0}))},"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsxs)(u.Container,{children:[n("common.marketingBanner.m2Live")," ",(0,t.jsx)(d.CaretUp,{style:{transform:"rotate(90deg)"},width:14,height:10})]})})}).withConfig({componentId:"sc-1a13cad5-3"})`
  background: #000000;
  color: #ffffff;
  font-size: 1.4rem;
  text-align: center;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;

  font-weight: 400;

  .cta-text {
    font-weight: 400;
    margin-left: 4px;
    opacity: 1;
    text-decoration: underline;
  }

  &:hover .cta-text {
    opacity: 0.85;
  }
`;(0,s.default)(({className:e})=>{let{t:r}=(0,i.useTranslation)("common");return(0,t.jsx)("div",{className:`${e} ${c.jetbrainsMono.className} ${c.jetbrainsMono.variable} gtm `,"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsx)("span",{children:r("common.marketingBanner.liveInBengaluru")})})}).withConfig({componentId:"sc-1a13cad5-4"})`
  background: linear-gradient(
    263deg,
    #0c218f 6.79%,
    #1539f5 47.89%,
    #0c218f 102.85%
  );
  color: #ffffff;
  font-size: 1.2rem;
  text-transform: uppercase;

  &,
  & * {
    font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace !important;
  }
  letter-spacing: 0.05em;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;

  font-weight: 400;

  .cta-text {
    font-weight: 400;
    margin-left: 4px;
    opacity: 1;
    text-decoration: underline;
  }

  .cta-icon {
    display: none;
  }

  &:hover .cta-text {
    opacity: 0.85;
  }

  @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
    .cta-text {
      display: none;
    }
    .cta-icon {
      display: inline;
    }
  }
`;let _={bannerActive:!0,bannerComponent:(0,t.jsx)(y,{})},b=new Set(["/ring","/ring/buy","/diesel-ultrahuman-ring","/diesel-ultrahuman-ring/buy","/rare","/rare/buy"]),x=(0,s.default)(({className:e})=>{if(!_.bannerActive)return null;let{region:n}=(0,o.useContext)(a.RegionLocaleContext),i=(0,r.useRouter)();if("/performance-lab/buy"===i.pathname||(0,p.usesPerformanceLabNavbar)(i.pathname)||"XX"==n)return null;let s=(n||"").toUpperCase(),c="US"===s||"PR"===s||m.includes(s),d="US"===s?(0,t.jsx)(g,{}):_.bannerComponent,u=i.pathname.endsWith("/buy")||i.pathname.endsWith("/pricing");return b.has(i.pathname)&&c?d:"/rare"===i.pathname?null:u&&!m.includes(s)?(0,t.jsx)(f,{}):d}).withConfig({componentId:"sc-1a13cad5-5"})`
  width: 100vw;
  position: relative;
  top: 0;
  z-index: 10000;

  animation: ${s.keyframes`
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `} 0.3s ease-in-out forwards;
`;e.s(["MarketingBanner",0,x,"isMarketingBannerActive",0,()=>_.bannerActive])},701085,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={AppRouterContext:function(){return o},GlobalLayoutRouterContext:function(){return c},LayoutRouterContext:function(){return s},MissingSlotContext:function(){return u},TemplateContext:function(){return d}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(741705)._(e.r(191788)),o=a.default.createContext(null),s=a.default.createContext(null),c=a.default.createContext(null),d=a.default.createContext(null),u=a.default.createContext(new Set)},531430,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ReadonlyURLSearchParams",{enumerable:!0,get:function(){return i}});class n extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class i extends URLSearchParams{append(){throw new n}delete(){throw new n}set(){throw new n}sort(){throw new n}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},470008,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={NavigationPromisesContext:function(){return u},PathParamsContext:function(){return d},PathnameContext:function(){return c},ReadonlyURLSearchParams:function(){return o.ReadonlyURLSearchParams},SearchParamsContext:function(){return s},createDevToolsInstrumentedPromise:function(){return l}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(191788),o=e.r(531430),s=(0,a.createContext)(null),c=(0,a.createContext)(null),d=(0,a.createContext)(null),u=(0,a.createContext)(null);function l(e,t){let r=Promise.resolve(t);return r.status="fulfilled",r.value=t,r.displayName=`${e} (SSR)`,r}},991622,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={HTTPAccessErrorStatus:function(){return a},HTTP_ERROR_FALLBACK_ERROR_CODE:function(){return s},getAccessFallbackErrorTypeByStatus:function(){return u},getAccessFallbackHTTPStatus:function(){return d},isHTTPAccessFallbackError:function(){return c}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a={NOT_FOUND:404,FORBIDDEN:403,UNAUTHORIZED:401},o=new Set(Object.values(a)),s="NEXT_HTTP_ERROR_FALLBACK";function c(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,r]=e.digest.split(";");return t===s&&o.has(Number(r))}function d(e){return Number(e.digest.split(";")[1])}function u(e){switch(e){case 401:return"unauthorized";case 403:return"forbidden";case 404:return"not-found";default:return}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},40184,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RedirectStatusCode",{enumerable:!0,get:function(){return i}});var n,i=((n={})[n.SeeOther=303]="SeeOther",n[n.TemporaryRedirect=307]="TemporaryRedirect",n[n.PermanentRedirect=308]="PermanentRedirect",n);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},301939,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={REDIRECT_ERROR_CODE:function(){return o},isRedirectError:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(40184),o="NEXT_REDIRECT";function s(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let t=e.digest.split(";"),[r,n]=t,i=t.slice(2,-2).join(";"),s=Number(t.at(-2));return r===o&&("replace"===n||"push"===n)&&"string"==typeof i&&!isNaN(s)&&s in a.RedirectStatusCode}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},68934,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isNextRouterError",{enumerable:!0,get:function(){return a}});let n=e.r(991622),i=e.r(301939);function a(e){return(0,i.isRedirectError)(e)||(0,n.isHTTPAccessFallbackError)(e)}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},456781,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={bindSnapshot:function(){return d},createAsyncLocalStorage:function(){return c},createSnapshot:function(){return u}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"),"__NEXT_ERROR_CODE",{value:"E504",enumerable:!1,configurable:!0});class o{disable(){throw a}getStore(){}run(){throw a}exit(){throw a}enterWith(){throw a}static bind(e){return e}}let s="u">typeof globalThis&&globalThis.AsyncLocalStorage;function c(){return s?new s:new o}function d(e){return s?s.bind(e):o.bind(e)}function u(){return s?s.snapshot():function(e,...t){return e(...t)}}},561318,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"workUnitAsyncStorageInstance",{enumerable:!0,get:function(){return n}});let n=(0,e.r(456781).createAsyncLocalStorage)()},986357,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={ACTION_HEADER:function(){return o},FLIGHT_HEADERS:function(){return y},NEXT_ACTION_NOT_FOUND_HEADER:function(){return E},NEXT_ACTION_REVALIDATED_HEADER:function(){return C},NEXT_DID_POSTPONE_HEADER:function(){return b},NEXT_HMR_REFRESH_HASH_COOKIE:function(){return l},NEXT_HMR_REFRESH_HEADER:function(){return u},NEXT_HTML_REQUEST_ID_HEADER:function(){return A},NEXT_INSTANT_PREFETCH_HEADER:function(){return f},NEXT_INSTANT_TEST_COOKIE:function(){return m},NEXT_IS_PRERENDER_HEADER:function(){return w},NEXT_REQUEST_ID_HEADER:function(){return S},NEXT_REWRITTEN_PATH_HEADER:function(){return x},NEXT_REWRITTEN_QUERY_HEADER:function(){return v},NEXT_ROUTER_PREFETCH_HEADER:function(){return c},NEXT_ROUTER_SEGMENT_PREFETCH_HEADER:function(){return d},NEXT_ROUTER_STALE_TIME_HEADER:function(){return _},NEXT_ROUTER_STATE_TREE_HEADER:function(){return s},NEXT_RSC_UNION_QUERY:function(){return g},NEXT_URL:function(){return p},RSC_CONTENT_TYPE_HEADER:function(){return h},RSC_HEADER:function(){return a}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="rsc",o="next-action",s="next-router-state-tree",c="next-router-prefetch",d="next-router-segment-prefetch",u="next-hmr-refresh",l="__next_hmr_refresh_hash__",p="next-url",h="text/x-component",f="next-instant-navigation-testing-prefetch",m="next-instant-navigation-testing",y=[a,s,c,u,d],g="_rsc",_="x-nextjs-stale-time",b="x-nextjs-postponed",x="x-nextjs-rewritten-path",v="x-nextjs-rewritten-query",w="x-nextjs-prerender",E="x-nextjs-action-not-found",S="x-nextjs-request-id",A="x-nextjs-html-request-id",C="x-action-revalidated";("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},69123,(e,t,r)=>{"use strict";function n(){let e,t,r=new Promise((r,n)=>{e=r,t=n});return{resolve:e,reject:t,promise:r}}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createPromiseWithResolvers",{enumerable:!0,get:function(){return n}})},942008,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i={RenderStage:function(){return c},StagedRenderingController:function(){return d}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let o=e.r(7117),s=e.r(69123);var c=((n={})[n.Before=1]="Before",n[n.EarlyStatic=2]="EarlyStatic",n[n.Static=3]="Static",n[n.EarlyRuntime=4]="EarlyRuntime",n[n.Runtime=5]="Runtime",n[n.Dynamic=6]="Dynamic",n[n.Abandoned=7]="Abandoned",n);class d{constructor(e,t,r){this.abortSignal=e,this.abandonController=t,this.shouldTrackSyncIO=r,this.currentStage=1,this.syncInterruptReason=null,this.staticStageEndTime=1/0,this.runtimeStageEndTime=1/0,this.staticStageListeners=[],this.earlyRuntimeStageListeners=[],this.runtimeStageListeners=[],this.dynamicStageListeners=[],this.staticStagePromise=(0,s.createPromiseWithResolvers)(),this.earlyRuntimeStagePromise=(0,s.createPromiseWithResolvers)(),this.runtimeStagePromise=(0,s.createPromiseWithResolvers)(),this.dynamicStagePromise=(0,s.createPromiseWithResolvers)(),e&&e.addEventListener("abort",()=>{let{reason:t}=e;this.staticStagePromise.promise.catch(u),this.staticStagePromise.reject(t),this.earlyRuntimeStagePromise.promise.catch(u),this.earlyRuntimeStagePromise.reject(t),this.runtimeStagePromise.promise.catch(u),this.runtimeStagePromise.reject(t),this.dynamicStagePromise.promise.catch(u),this.dynamicStagePromise.reject(t)},{once:!0}),t&&t.signal.addEventListener("abort",()=>{this.abandonRender()},{once:!0})}onStage(e,t){if(this.currentStage>=e)t();else if(3===e)this.staticStageListeners.push(t);else if(4===e)this.earlyRuntimeStageListeners.push(t);else if(5===e)this.runtimeStageListeners.push(t);else if(6===e)this.dynamicStageListeners.push(t);else throw Object.defineProperty(new o.InvariantError(`Invalid render stage: ${e}`),"__NEXT_ERROR_CODE",{value:"E881",enumerable:!1,configurable:!0})}shouldTrackSyncInterrupt(){if(!this.shouldTrackSyncIO)return!1;switch(this.currentStage){case 1:case 5:case 6:case 7:default:return!1;case 2:case 3:case 4:return!0}}syncInterruptCurrentStageWithReason(e){if(1!==this.currentStage&&7!==this.currentStage){if(this.abandonController)return void this.abandonController.abort();if(this.abortSignal){this.syncInterruptReason=e,this.currentStage=7;return}switch(this.currentStage){case 2:case 3:case 4:this.syncInterruptReason=e,this.advanceStage(6);return;case 5:return}}}getSyncInterruptReason(){return this.syncInterruptReason}getStaticStageEndTime(){return this.staticStageEndTime}getRuntimeStageEndTime(){return this.runtimeStageEndTime}abandonRender(){let{currentStage:e}=this;switch(e){case 2:this.resolveStaticStage();case 3:this.resolveEarlyRuntimeStage();case 4:this.resolveRuntimeStage();case 5:this.currentStage=7;return}}advanceStage(e){if(e<=this.currentStage)return;let t=this.currentStage;if(this.currentStage=e,t<3&&e>=3&&this.resolveStaticStage(),t<4&&e>=4&&this.resolveEarlyRuntimeStage(),t<5&&e>=5&&(this.staticStageEndTime=performance.now()+performance.timeOrigin,this.resolveRuntimeStage()),t<6&&e>=6){this.runtimeStageEndTime=performance.now()+performance.timeOrigin,this.resolveDynamicStage();return}}resolveStaticStage(){let e=this.staticStageListeners;for(let t=0;t<e.length;t++)e[t]();e.length=0,this.staticStagePromise.resolve()}resolveEarlyRuntimeStage(){let e=this.earlyRuntimeStageListeners;for(let t=0;t<e.length;t++)e[t]();e.length=0,this.earlyRuntimeStagePromise.resolve()}resolveRuntimeStage(){let e=this.runtimeStageListeners;for(let t=0;t<e.length;t++)e[t]();e.length=0,this.runtimeStagePromise.resolve()}resolveDynamicStage(){let e=this.dynamicStageListeners;for(let t=0;t<e.length;t++)e[t]();e.length=0,this.dynamicStagePromise.resolve()}getStagePromise(e){switch(e){case 3:return this.staticStagePromise.promise;case 4:return this.earlyRuntimeStagePromise.promise;case 5:return this.runtimeStagePromise.promise;case 6:return this.dynamicStagePromise.promise;default:throw Object.defineProperty(new o.InvariantError(`Invalid render stage: ${e}`),"__NEXT_ERROR_CODE",{value:"E881",enumerable:!1,configurable:!0})}}waitForStage(e){return this.getStagePromise(e)}delayUntilStage(e,t,r){var n,i,a;let o,s=(n=this.getStagePromise(e),i=t,a=r,o=new Promise((e,t)=>{n.then(e.bind(null,a),t)}),void 0!==i&&(o.displayName=i),o);return this.abortSignal&&s.catch(u),s}}function u(){}},119202,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={getCacheSignal:function(){return _},getDraftModeProviderForCacheScope:function(){return y},getHmrRefreshHash:function(){return h},getPrerenderResumeDataCache:function(){return l},getRenderResumeDataCache:function(){return p},getServerComponentsHmrCache:function(){return m},getStagedRenderingController:function(){return g},isHmrRefresh:function(){return f},isInEarlyRenderStage:function(){return c},throwForMissingRequestStore:function(){return d},throwInvariantForMissingStore:function(){return u},workUnitAsyncStorage:function(){return a.workUnitAsyncStorageInstance}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(561318);e.r(986357);let o=e.r(7117),s=e.r(942008);function c(e){let t=e.stagedRendering;return!!t&&(t.currentStage===s.RenderStage.EarlyStatic||t.currentStage===s.RenderStage.EarlyRuntime)}function d(e){throw Object.defineProperty(Error(`\`${e}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`),"__NEXT_ERROR_CODE",{value:"E251",enumerable:!1,configurable:!0})}function u(){throw Object.defineProperty(new o.InvariantError("Expected workUnitAsyncStorage to have a store."),"__NEXT_ERROR_CODE",{value:"E696",enumerable:!1,configurable:!0})}function l(e){switch(e.type){case"prerender":case"prerender-runtime":case"prerender-ppr":case"prerender-client":case"validation-client":return e.prerenderResumeDataCache;case"request":if(e.prerenderResumeDataCache)return e.prerenderResumeDataCache;case"prerender-legacy":case"cache":case"private-cache":case"unstable-cache":case"generate-static-params":return null;default:return e}}function p(e){switch(e.type){case"request":case"prerender":case"prerender-runtime":case"prerender-client":case"validation-client":if(e.renderResumeDataCache)return e.renderResumeDataCache;case"prerender-ppr":return e.prerenderResumeDataCache??null;case"cache":case"private-cache":case"unstable-cache":case"prerender-legacy":case"generate-static-params":return null;default:return e}}function h(e){}function f(e){return!1}function m(e){}function y(e,t){if(e.isDraftMode)switch(t.type){case"cache":case"private-cache":case"unstable-cache":case"prerender-runtime":case"request":return t.draftMode}}function g(e){switch(e.type){case"request":case"prerender-runtime":return e.stagedRendering??null;case"prerender":case"prerender-client":case"validation-client":case"prerender-ppr":case"prerender-legacy":case"cache":case"private-cache":case"unstable-cache":case"generate-static-params":return null;default:return e}}function _(e){switch(e.type){case"prerender":case"prerender-client":case"validation-client":case"prerender-runtime":return e.cacheSignal;case"request":if(e.cacheSignal)return e.cacheSignal;case"prerender-ppr":case"prerender-legacy":case"cache":case"private-cache":case"unstable-cache":case"generate-static-params":return null;default:return e}}},472536,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"workAsyncStorageInstance",{enumerable:!0,get:function(){return n}});let n=(0,e.r(456781).createAsyncLocalStorage)()},398401,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"workAsyncStorage",{enumerable:!0,get:function(){return n.workAsyncStorageInstance}});let n=e.r(472536)},251892,e=>{"use strict";var t=e.i(191788);class r extends t.Component{state={hasError:!1};static getDerivedStateFromError(){return{hasError:!0}}componentDidUpdate(e){this.state.hasError&&function(e,t){if(e===t)return!1;if(!e||!t||e.length!==t.length)return!0;for(let r=0;r<e.length;r+=1)if(!Object.is(e[r],t[r]))return!0;return!1}(e.resetKeys,this.props.resetKeys)&&this.setState({hasError:!1})}componentDidCatch(e,t){let{name:r,onError:n}=this.props;try{window.newrelic&&"function"==typeof window.newrelic.noticeError&&window.newrelic.noticeError(e,{boundary:r??"unnamed",componentStack:(t.componentStack??"").slice(0,4e3)})}catch{}if(n)try{n(e,t)}catch{}}render(){return this.state.hasError?this.props.fallback??null:this.props.children}}e.s(["ErrorBoundary",0,r])},741315,e=>{"use strict";var t,r,n=((t={}).oneTimePurchase="otp",t.membership="membership",t.x="x",t),i=((r={}).otp_2_week="uh-m1-two-week",r.otp_12_week="uh-m1-twelve-week",r.otp_24_week="uh-m1-twenty-four-week",r.otp_1_year="uh-m1-year",r.membership_1_sensor_month="uh-m1-1-sensor-month",r.membership_2_sensor_month="uh-m1-2-sensor-month",r.otp_2_week_x="uh-m1-two-week-x",r.otp_12_week_x="uh-m1-twelve-week-x",r.otp_24_week_x="uh-m1-twenty-four-week-x",r.otp_1_year_x="uh-m1-year-x",r.otp_2_week_ref="uh-m1-two-week_ref",r.otp_4_week_ref="uh-m1-four-week_ref",r.otp_12_week_ref="uh-m1-twelve-week_ref",r.otp_24_week_ref="uh-m1-twenty-four-week_ref",r.otp_1_year_ref="uh-m1-year_ref",r.membership_1_sensor_month_ref="uh-m1-1-sensor-month-ref",r.membership_2_sensor_month_ref="uh-m1-2-sensor-month-ref",r.otp_2_week_campaign="uh-m1-two-week-campaign",r.otp_4_week_campaign="uh-m1-four-week-campaign",r.otp_2_week_select="uh-m1-two-week-select",r.otp_12_week_select="uh-m1-twelve-week-select",r.otp_24_week_select="uh-m1-twenty-four-week-select",r.otp_1_year_select="uh-m1-year-select",r.special_1_month_us="uh-m1-one-month-us-special",r.special_3_month_us="uh-m1-three-month-us-special",r.special_1_year_us="uh-m1-year-us-special",r.otp_1_month_us="uh-m1-one-month-us",r.otp_3_month_us="uh-m1-three-month-us",r.otp_1_year_us="uh-m1-year-us",r.membership_1_sensor_month_us="uh-m1-1-sensor-month-us",r.otp_1_month_ae="uh-m1-one-month-ae",r.otp_3_month_ae="uh-m1-three-month-ae",r.otp_6_month_ae="uh-m1-six-month-ae",r.otp_1_year_ae="uh-m1-year-ae",r.otp_1_month_ae_x="uh-m1-one-month-ae-x",r.otp_3_month_ae_x="uh-m1-three-month-ae-x",r.otp_6_month_ae_x="uh-m1-six-month-ae-x",r.otp_1_year_ae_x="uh-m1-year-ae-x",r.membership_1_sensor_month_ae="ul-m1-1-sensor-month-ae",r.membership_1_sensor_month_ae_ref="ul-m1-1-sensor-month-ae-ref",r.otp_1_month_ae_ref="uh-m1-one-month-ae-ref",r.otp_3_month_ae_ref="uh-m1-three-month-ae-ref",r.otp_6_month_ae_ref="uh-m1-six-month-ae-ref",r.otp_1_year_ae_ref="uh-m1-year-ae-ref",r.otp_3_month_ae_affiliate="uh-m1-three-month-ae-affiliate",r.otp_6_month_ae_affiliate="uh-m1-six-month-ae-affiliate",r.ultrahuman_x="ultrahuman_x",r.ultrahuman_x_ae="ultrahuman_x_ae",r.ultrahuman_x_us="ultrahuman_x_us",r.otp_2_weeks_eu="otp_2_weeks_eu",r.otp_4_weeks_eu="otp_4_weeks_eu",r.otp_12_weeks_eu="otp_12_weeks_eu",r.otp_2_weeks_eu_campaign="otp_2_weeks_eu_campaign",r.otp_4_weeks_eu_campaign="otp_4_weeks_eu_campaign",r.otp_12_weeks_eu_campaign="otp_12_weeks_eu_campaign",r);e.s(["ProductPurchaseOption",()=>n,"ProductPurchaseType",()=>i,"productShopifyIdMap",0,{"uh-m1-two-week":{type:"otp",productId:"45142433988678",shopifyVariantId:"gid://shopify/ProductVariant/45142433988678",productType:"cyborg",planId:0},"uh-m1-twelve-week":{type:"otp",productId:"45142434021446",shopifyVariantId:"gid://shopify/ProductVariant/45142434021446",productType:"cyborg",planId:0},"uh-m1-twenty-four-week":{type:"otp",productId:"45142434054214",shopifyVariantId:"gid://shopify/ProductVariant/45142434054214",productType:"cyborg",planId:0},"uh-m1-year":{type:"otp",productId:"45142434086982",shopifyVariantId:"gid://shopify/ProductVariant/45142434086982",productType:"cyborg",planId:0},"uh-m1-two-week-x":{type:"x",productId:"40566813556806",shopifyVariantId:"gid://shopify/ProductVariant/40566813556806",productType:"cyborg",planId:0},"uh-m1-twelve-week-x":{type:"x",productId:"40596792016966",shopifyVariantId:"gid://shopify/ProductVariant/40596792016966",productType:"cyborg",planId:0},"uh-m1-twenty-four-week-x":{type:"x",productId:"40566761324614",shopifyVariantId:"gid://shopify/ProductVariant/40566761324614",productType:"cyborg",planId:0},"uh-m1-year-x":{type:"x",productId:"40566763487302",shopifyVariantId:"gid://shopify/ProductVariant/40566763487302",productType:"cyborg",planId:0},"uh-m1-two-week_ref":{type:"otp",productId:"40462186283078",shopifyVariantId:"gid://shopify/ProductVariant/40462186283078",productType:"cyborg",planId:0},"uh-m1-four-week_ref":{type:"otp",productId:"40376567693382",shopifyVariantId:"gid://shopify/ProductVariant/40329680257094",productType:"cyborg",planId:0},"uh-m1-twelve-week_ref":{type:"otp",productId:"40462187855942",shopifyVariantId:"gid://shopify/ProductVariant/40462187855942",productType:"cyborg",planId:0},"uh-m1-twenty-four-week_ref":{type:"otp",productId:"40462189527110",shopifyVariantId:"gid://shopify/ProductVariant/40462189527110",productType:"cyborg",planId:0},"uh-m1-year_ref":{type:"otp",productId:"40462192083014",shopifyVariantId:"gid://shopify/ProductVariant/40462192083014",productType:"cyborg",planId:0},"uh-m1-two-week-select":{type:"otp",productId:"45142433988678",shopifyVariantId:"gid://shopify/ProductVariant/45142433988678",productType:"cyborg",planId:0},"uh-m1-twelve-week-select":{type:"otp",productId:"45142434021446",shopifyVariantId:"gid://shopify/ProductVariant/45142434021446",productType:"cyborg",planId:0},"uh-m1-twenty-four-week-select":{type:"otp",productId:"45142434054214",shopifyVariantId:"gid://shopify/ProductVariant/45142434054214",productType:"cyborg",planId:0},"uh-m1-year-select":{type:"otp",productId:"45142434086982",shopifyVariantId:"gid://shopify/ProductVariant/45142434086982",productType:"cyborg",planId:0},"uh-m1-two-week-campaign":{type:"otp",productId:"40508689907782",shopifyVariantId:"gid://shopify/ProductVariant/40508689907782",productType:"cyborg",planId:0},"uh-m1-four-week-campaign":{type:"otp",productId:"40508693282886",shopifyVariantId:"gid://shopify/ProductVariant/40508693282886",productType:"cyborg",planId:0},"uh-m1-1-sensor-month":{type:"membership",productId:"40459179655238",shopifyVariantId:"",productType:"cyborg",planId:0xa99213},"uh-m1-2-sensor-month":{type:"membership",productId:"40459180769350",shopifyVariantId:"",productType:"cyborg",planId:0xa99214},"uh-m1-1-sensor-month-ref":{type:"membership",productId:"40459179655238",shopifyVariantId:"",productType:"cyborg",planId:0xa99213},"uh-m1-2-sensor-month-ref":{type:"membership",productId:"40459180769350",shopifyVariantId:"",productType:"cyborg",planId:0xa99214},"uh-m1-one-month-ae":{type:"otp",productId:"44186161086706",shopifyVariantId:"gid://shopify/ProductVariant/44186161086706",productType:"cyborg",planId:0},"uh-m1-three-month-ae":{type:"otp",productId:"44187468824818",shopifyVariantId:"gid://shopify/ProductVariant/44187468824818",productType:"cyborg",planId:0},"uh-m1-six-month-ae":{type:"otp",productId:"44187592786162",shopifyVariantId:"gid://shopify/ProductVariant/44187592786162",productType:"cyborg",planId:0},"uh-m1-year-ae":{type:"otp",productId:"44579593978098",shopifyVariantId:"gid://shopify/ProductVariant/44579593978098",productType:"cyborg",planId:0},"uh-m1-one-month-ae-x":{type:"x",productId:"62381263847795",shopifyVariantId:"gid://shopify/ProductVariant/62381263847795",productType:"cyborg",planId:0},"uh-m1-three-month-ae-x":{type:"x",productId:"62381265125747",shopifyVariantId:"gid://shopify/ProductVariant/62381265125747",productType:"cyborg",planId:0},"uh-m1-six-month-ae-x":{type:"x",productId:"62381268894067",shopifyVariantId:"gid://shopify/ProductVariant/62381268894067",productType:"cyborg",planId:0},"uh-m1-year-ae-x":{type:"x",productId:"62381272334707",shopifyVariantId:"gid://shopify/ProductVariant/62381272334707",productType:"cyborg",planId:0},"uh-m1-one-month-ae-ref":{type:"otp",productId:"44186161086706",shopifyVariantId:"gid://shopify/ProductVariant/44186161086706",productType:"cyborg",planId:0},"uh-m1-three-month-ae-ref":{type:"otp",productId:"44187468824818",shopifyVariantId:"gid://shopify/ProductVariant/44187468824818",productType:"cyborg",planId:0},"uh-m1-six-month-ae-ref":{type:"otp",productId:"44187592786162",shopifyVariantId:"gid://shopify/ProductVariant/44187592786162",productType:"cyborg",planId:0},"uh-m1-year-ae-ref":{type:"otp",productId:"44187781071090",shopifyVariantId:"gid://shopify/ProductVariant/44187781071090",productType:"cyborg",planId:0},"ul-m1-1-sensor-month-ae":{type:"membership",productId:"44218367443186",shopifyVariantId:"",productType:"cyborg",planId:0xa9929a},"ul-m1-1-sensor-month-ae-ref":{type:"membership",productId:"44218367443186",shopifyVariantId:"",productType:"cyborg",planId:0xa9929a},"uh-m1-three-month-ae-affiliate":{type:"otp",productId:"44342569959666",shopifyVariantId:"gid://shopify/ProductVariant/44342569959666",productType:"cyborg",planId:0},"uh-m1-six-month-ae-affiliate":{type:"otp",productId:"44342611869938",shopifyVariantId:"gid://shopify/ProductVariant/44342611869938",productType:"cyborg",planId:0},"uh-m1-one-month-us-special":{type:"x",productId:"44186161086706",shopifyVariantId:"gid://shopify/ProductVariant/44186161086706",productType:"cyborg",planId:0},"uh-m1-three-month-us-special":{type:"x",productId:"44187468824818",shopifyVariantId:"gid://shopify/ProductVariant/44187468824818",productType:"cyborg",planId:0},"uh-m1-year-us-special":{type:"x",productId:"44579593978098",shopifyVariantId:"gid://shopify/ProductVariant/44579593978098",productType:"cyborg",planId:0},"uh-m1-one-month-us":{type:"otp",productId:"44186161086706",shopifyVariantId:"gid://shopify/ProductVariant/44186161086706",productType:"cyborg",planId:0},"uh-m1-three-month-us":{type:"otp",productId:"44187468824818",shopifyVariantId:"gid://shopify/ProductVariant/44187468824818",productType:"cyborg",planId:0},"uh-m1-year-us":{type:"otp",productId:"44579593978098",shopifyVariantId:"gid://shopify/ProductVariant/44579593978098",productType:"cyborg",planId:0},"uh-m1-1-sensor-month-us":{type:"membership",productId:"44218367443186",shopifyVariantId:"",productType:"cyborg",planId:0xa9929a},otp_2_weeks_eu:{type:"otp",productId:"10950762955070",shopifyVariantId:"gid://shopify/ProductVariant/49203361284414",productType:"cyborg",planId:0},otp_4_weeks_eu:{type:"otp",productId:"10950659572030",shopifyVariantId:"gid://shopify/ProductVariant/49202716934462",productType:"cyborg",planId:0},otp_12_weeks_eu:{type:"otp",productId:"10950659604798",shopifyVariantId:"gid://shopify/ProductVariant/49202716999998",productType:"cyborg",planId:0},otp_2_weeks_eu_campaign:{type:"otp",productId:"null",shopifyVariantId:"gid://shopify/ProductVariant/",productType:"cyborg",planId:0},otp_4_weeks_eu_campaign:{type:"otp",productId:"null",shopifyVariantId:"gid://shopify/ProductVariant/40718088372284",productType:"cyborg",planId:0},otp_12_weeks_eu_campaign:{type:"otp",productId:"null",shopifyVariantId:"gid://shopify/ProductVariant/40718094860348",productType:"cyborg",planId:0},ultrahuman_x:{type:"otp",productId:"40922833158214",shopifyVariantId:"gid://shopify/ProductVariant/40922833158214",productType:"cyborg",planId:0},ultrahuman_x_ae:{type:"otp",productId:"44515347759346",shopifyVariantId:"gid://shopify/ProductVariant/44515347759346",productType:"cyborg",planId:0},ultrahuman_x_us:{type:"otp",productId:"40709660082236",shopifyVariantId:"gid://shopify/ProductVariant/40709660082236",productType:"cyborg",planId:0}}])},520685,15912,e=>{"use strict";var t=e.i(859207),r=e.i(741315);r.ProductPurchaseType.otp_3_month_ae_ref,r.ProductPurchaseOption.oneTimePurchase,r.ProductPurchaseType.otp_4_week_ref,r.ProductPurchaseOption.oneTimePurchase,r.ProductPurchaseType.otp_1_month_ae_ref,r.ProductPurchaseType.otp_3_month_ae_ref,r.ProductPurchaseType.otp_12_week_ref,r.ProductPurchaseType.otp_4_week_ref;let n={[t.ShopifyStore.IN]:{discountCode:"REFERRAL1000",discount:1e3},[t.ShopifyStore.AE]:{discountCode:"REFERRAL100",discount:100}},i={[t.ShopifyStore.IN]:{discountCode:"REFERRINGAIR",discount:2849.9},[t.ShopifyStore.AE]:{discountCode:"REFERRINGAIR",discount:129.9},[t.ShopifyStore.US]:{discountCode:"REFERRINGAIR",discount:34.9},[t.ShopifyStore.SA]:{discountCode:"REFERRINGAIR",discount:164.5},[t.ShopifyStore.MX]:{discountCode:"REFERRINGAIR",discount:34.9},[t.ShopifyStore.ROW]:{discountCode:"REFERRINGAIR",discount:34.9},[t.ShopifyStore.GB]:{discountCode:"REFERRINGAIR",discount:27.9},[t.ShopifyStore.EU]:{discountCode:"REFERRINGAIR",discount:27.9},[t.ShopifyStore.AU]:{discountCode:"REFERRINGAIR",discount:27.9},[t.ShopifyStore.CA]:{discountCode:"REFERRINGAIR",discount:34.9},[t.ShopifyStore.ZA]:{discountCode:"REFERRINGAIR",discount:799.9}},a={[t.ShopifyStore.IN]:{discountCode:"REFERRINGPRO",discount:4499.9},[t.ShopifyStore.AE]:{discountCode:"REFERRINGPRO",discount:175.9},[t.ShopifyStore.US]:{discountCode:"REFERRINGPRO",discount:47.9},[t.ShopifyStore.SA]:{discountCode:"REFERRINGPRO",discount:206.9},[t.ShopifyStore.MX]:{discountCode:"REFERRINGPRO",discount:987.9},[t.ShopifyStore.ROW]:{discountCode:"REFERRINGPRO",discount:47.9},[t.ShopifyStore.GB]:{discountCode:"REFERRINGPRO",discount:42.9},[t.ShopifyStore.EU]:{discountCode:"REFERRINGPRO",discount:49.9},[t.ShopifyStore.AU]:{discountCode:"REFERRINGPRO",discount:74.9},[t.ShopifyStore.CA]:{discountCode:"REFERRINGPRO",discount:65.9},[t.ShopifyStore.ZA]:{discountCode:"REFERRINGPRO",discount:926.9}},o={},s={[t.ShopifyStore.AE]:{discountCode:"BFSM120",discount:20,discountType:"percentage",active:!1},[t.ShopifyStore.GB]:{discountCode:"BFSM130",discount:30,discountType:"percentage",active:!1},[t.ShopifyStore.IN]:{discountCode:"BFSM120",discount:20,discountType:"percentage",active:!1},[t.ShopifyStore.EU]:{discountCode:"BFSM130",discount:30,discountType:"percentage",active:!1}},c={},d={DE:{store:t.ShopifyStore.EU,discountCode:"VS1GZDNVFWZH",discount:15,discountType:"percentage",active:!1}},u={},l={},p=({store:e,country:t})=>{let r=t?.toUpperCase(),n=r?d[r]:void 0,i=n?.store,a=i??e??void 0,o=a?c[a]:void 0;if(!n)return o;if(!o&&!i){let{store:e,...t}=n;return void 0!==t.discount&&void 0!==t.discountCode&&void 0!==t.discountType&&void 0!==t.active?t:void 0}let{store:s,...u}={...o,...n};return void 0===u.discount||void 0===u.discountCode||void 0===u.discountType||void 0===u.active?o:u},h=({store:e,country:t})=>{let r=t?.toUpperCase(),n=r?u[r]:void 0,i=n?.store,a=i??e??void 0,s=a?o[a]:void 0;if(!n)return s;if(!s&&!i){let{store:e,...t}=n;return void 0!==t.discount&&void 0!==t.discountCode&&void 0!==t.discountType&&void 0!==t.active?t:void 0}let{store:c,...d}={...s,...n};return void 0===d.discount||void 0===d.discountCode||void 0===d.discountType||void 0===d.active?s:d};e.s(["getCampaignPromoDiscountConfig",0,({store:e,country:t,product:r,campaignConfig:n})=>n&&n.active?{discountCode:n.discountCode,discount:n.discount,discountType:n.discountType,active:!0}:"ring"===r||"ring-pro"===r?h({store:e,country:t}):"home"===r?p({store:e,country:t}):"m1"===r?(({store:e,country:t})=>{let r=t?.toUpperCase(),n=r?l[r]:void 0,i=n?.store,a=i??e??void 0,o=a?s[a]:void 0;if(!n)return o;if(!o&&!i){let{store:e,...t}=n;return void 0!==t.discount&&void 0!==t.discountCode&&void 0!==t.discountType&&void 0!==t.active?t:void 0}let{store:c,...d}={...o,...n};return void 0===d.discount||void 0===d.discountCode||void 0===d.discountType||void 0===d.active?o:d})({store:e,country:t}):void 0,"getHomePromoDiscountConfig",0,p,"getRingPromoDiscountConfig",0,h,"m1PromoDiscount",0,s,"referralCodes",0,n,"ringProReferralCodes",0,a,"ringReferralCodes",0,i],520685);let f={[t.ShopifyStore.IN]:{discountCode:"P9KZSKHGZ7VM",discount:.15,price:"₹199",yearlyPrice:2388},[t.ShopifyStore.AE]:{discountCode:"WV74KZDYH7J0",discount:.12,price:"AED 9",yearlyPrice:108},[t.ShopifyStore.ROW]:{discountCode:"WV74KZDYH7J0",discount:.12,price:"USD 2.5",yearlyPrice:30},[t.ShopifyStore.US]:{discountCode:"WV74KZDYH7J0",discount:.12,price:"USD 2.5",yearlyPrice:30},[t.ShopifyStore.GB]:{discountCode:"AJ2381CKFR88",discount:.15,price:"GBP 2",yearlyPrice:24},[t.ShopifyStore.EU]:{discountCode:"AJ2381CKFR88",discount:.15,price:"EUR 2.5",yearlyPrice:30},[t.ShopifyStore.AU]:{discountCode:"AJ2381CKFR88",discount:.15,price:"AUD 2.5",yearlyPrice:30},[t.ShopifyStore.SA]:{discountCode:"AJ2381CKFR88",discount:.15,price:"AUD 2.5",yearlyPrice:30},[t.ShopifyStore.MX]:{discountCode:"AJ2381CKFR88",discount:.15,price:"AUD 2.5",yearlyPrice:30},[t.ShopifyStore.CA]:{discountCode:"WV74KZDYH7J0",discount:.12,price:"CAD 2.5",yearlyPrice:30},[t.ShopifyStore.ZA]:{discountCode:"WV74KZDYH7J0",discount:.12,price:"CAD 2.5",yearlyPrice:30}};e.s(["ultrahumanXDiscountCodes",0,f],15912)},29282,278490,e=>{"use strict";var t=e.i(203828),r=e.i(307959),n=e.i(191788);e.i(350461);var i=e.i(510116);let a=/^[A-Za-z]{2}$/,o=new Set(["xx","xy","zz","aa"]);function s(e){if("string"!=typeof e)return!1;let t=e.trim();if(!t)return!1;let r=t.toLowerCase();return"undefined"!==r&&"null"!==r&&("row"===r||!o.has(r)&&a.test(t))}async function c(e,t=!1){if(!s(e))return{campaigns:[]};let r=e.trim().toUpperCase();try{let n=new AbortController,a=setTimeout(()=>n.abort("Request timeout"),t?1e3:5e3),o=`${i.API_BASE_URL}/api/web_v1/product_campaigns?country=${encodeURIComponent(r)}`,s=await fetch(o,{signal:n.signal});if(clearTimeout(a),"ROW"===e&&!s.ok||!s.ok)return{campaigns:[],fetchFailed:!0};return await s.json()}catch(e){return console.error("Error fetching campaigns:",e),{campaigns:[],fetchFailed:!0}}}function d(e){let t=new Date;return e.filter(e=>{if("enabled"!==e.visibility_status)return!1;let r=new Date(e.start_time),n=new Date(e.end_time);return t>=r&&t<=n}).sort((e,t)=>e.priority-t.priority)}e.s(["fetchCampaigns",0,c,"getActiveCampaigns",0,d,"isValidCountry",0,s],278490),e.s(["getCampaignByProduct",0,function(e,t){return"cgm"===t||"m1"===t?e.find(e=>"cgm"===e.product||"m1"===e.product):e.find(e=>e.product===t)},"getCampaignConfig",0,function(e){if(e)return{discountCode:e.discount_code,discount:e.discount_value,discountType:e.discount_type,active:!0,product:e.product}},"useCampaigns",0,function(e){let i,[a,o]=(0,n.useState)(e??[]),[u,l]=(0,n.useState)(!e),[p,h]=(0,n.useState)(null),f=(0,t.useRouter)(),m=(0,n.useContext)(r.RegionLocaleContext).region,y=function(e){let t=e.split("?")[0].split("#")[0];if(![/^\/ring\/buy\/.+/,/^\/home\/buy\/.+/,/^\/pricing\/.+/,/^\/shop\/.+/].some(e=>e.test(t)))return null;let r=t.split("/").filter(Boolean),n=r[r.length-1];return n?.toLowerCase()==="global"?null:n&&/^[a-z]{2}$/i.test(n)?n.toLowerCase():null}(f.asPath);f.pathname,i=y??f.query.locale??f.query.country??m,i?.toLowerCase()==="pr"&&(i="us");let g=(0,n.useCallback)(async()=>{if(!s(i)){o([]),h(null),l(!1);return}try{l(!0),h(null);let e=await c(i),t=d(e.campaigns);o(t)}catch(e){h(e instanceof Error?e:Error("Failed to fetch campaigns")),o([])}finally{l(!1)}},[i]);return(0,n.useEffect)(()=>{let t=i?.toUpperCase(),r=m?.toUpperCase();if(e&&t&&t===r){o(e),l(!1);return}g()},[g,e,m,f.query.locale,i]),{campaigns:a,loading:u,error:p,refetch:g}}],29282)},25704,e=>{"use strict";var t=e.i(391398),r=e.i(121666),n=e.i(760814),i=e.i(191788),a=e.i(458774);let o=n.default.div.withConfig({componentId:"sc-e2dd395b-0"})`
  display: flex;
  align-items: ${({centerAlign:e})=>e?"center":"flex-start"};
  justify-content: ${({centerJustify:e})=>e?"center":"flex-start"};
  gap: ${({gap:e})=>e??0};
  flex-direction: ${({direction:e})=>e??"row"};
  order: ${({order:e})=>e??"unset"};
  &.${e=>e.className} {
    /* Additional styles go here */
  }
`,s=(0,n.default)(({className:e,text:n,link:s,image:c,heading:d})=>{let u=(0,i.useRef)(null),l="https://ultrahuman.com";return(0,t.jsx)("div",{className:e,children:(0,t.jsx)(o,{direction:"row",style:{justifyContent:"space-between"},children:(0,t.jsxs)(o,{direction:"column",children:[(0,t.jsx)("h3",{style:{order:1},children:d??"Get the Ultrahuman App"}),n?(0,t.jsx)("p",{style:{order:2},className:"desktop-only",children:n}):null,(0,t.jsxs)(o,{direction:"row",order:5,style:{alignItems:"end"},children:[(0,t.jsx)(r.CustomImage,{alt:"",src:c??"web_v2/UHAppQr.png",width:"100",height:"100",className:"desktop-only",style:{marginRight:"12px"}}),(0,t.jsxs)("div",{className:"copy-link","aria-hidden":"true",onClick:()=>{window&&window.navigator.clipboard.writeText(s??l).then(()=>{u.current&&(u.current.style.backgroundColor="#008a05",setTimeout(()=>{u.current&&(u.current.style.backgroundColor="rgba(0, 0, 0)")},1500))})},children:[(0,t.jsx)("div",{className:"link-content",children:s??l}),(0,t.jsx)("div",{className:"copy-action-element",ref:u,children:(0,t.jsx)(a.LinkWhite,{})})]})]})]})})})}).withConfig({componentId:"sc-e2dd395b-1"})`
  padding: 40px 29px;
  width: 100%;

  .top-bar {
    margin-bottom: 8px;
  }

  h4 {
    font-size: 15px;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: -0.6px;
    text-transform: uppercase;
  }

  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 110%; /* 35.2px */
    letter-spacing: -1.28px;
    margin-bottom: 4px;
  }

  .copy-link {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 4px;

    .link-content {
      padding: 8px 20px;
      border-radius: 8px;
      border: 1px solid #d9d9d9;
      background: #f5f5f5;
      font-size: 1.6rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 240px;
      line-height: 150%;

      @media (min-width: ${({theme:e})=>e.globalV2.lg.maxWidth}) {
        max-width: 280px;
      }
    }

    .copy-action-element {
      border-radius: 8px;
      background: #000;
      min-height: 100%;
      aspect-ratio: 1/1;
      width: auto;
      display: grid;
      place-items: center;
      padding: 4px 12px;
      transition: all 0.2s ease-in-out;
    }
  }

  .steps {
    margin-top: 20px;
    gap: 29px;
    flex-direction: column;

    .step {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;

      .step-image {
        margin-left: auto;
      }

      .step-number {
        border-radius: 50%;
        background: #1d1d1d;
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        color: #fff;
      }

      p {
        flex-shrink: 20;
        font-size: 14px;
        line-height: 130%; /* 18.2px */
        letter-spacing: -0.56px;
      }

      .step-mobile-wrapper {
        gap: 10px;
      }
    }
  }

  .tab {
    border-radius: 4px;
    background: #ececec;
    color: #1c1c1c;
    font-size: 10px;
    font-weight: 500;
    line-height: 100%; /* 10px */
    letter-spacing: -0.4px;
    padding: 2px 6px;
  }

  .mobile-only {
    display: block;
    &.flex {
      display: flex;
    }
    &.grid {
      display: grid;
    }
  }

  .desktop-only {
    display: none !important;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.lg.maxWidth}) {
    padding: 40px;

    .top-bar {
      margin-top: 29px;
      margin-bottom: 12px;
    }

    p {
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      line-height: 130%; /* 20.8px */
      letter-spacing: -0.64px;
      margin-bottom: 24px;
    }

    hr {
      margin: 37px 0;
      border-top: #1010101a;
    }

    .steps {
      // margin-top: 20px;
      // gap: 29px;
      flex-direction: row;

      .step {
        display: flex;
        width: 229px;
        height: 221px;
        flex-direction: column;

        .step-image {
          margin: 0;
        }

        .step-number {
          display: grid;
          place-items: center;
        }
        p {
          flex-shrink: 20;
          font-size: 14px;
          line-height: 130%; /* 18.2px */
          letter-spacing: -0.56px;
          height: 56px;
          margin-top: auto;
          width: 90%;
          text-align: center;
        }

        &.step-3 {
          .step-image {
            margin-top: 50px;
          }
        }
        .step-mobile-wrapper {
          gap: 10px;
        }
      }
    }
    .mobile-only {
      display: none !important;
    }
    .desktop-only {
      display: block !important;
      &.flex {
        display: flex !important;
      }
      &.grid {
        display: grid !important;
      }
    }
  }
`;e.s(["UhAppModal",0,s])},458774,e=>{"use strict";var t=e.i(391398);e.s(["LinkWhite",0,e=>(0,t.jsxs)("svg",{className:e.className,style:e.style,width:"16px",height:"16px",viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("title",{children:"noun-link-4813247"}),(0,t.jsx)("g",{id:"Experts-section",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:(0,t.jsx)("g",{id:"Experts-full-page",transform:"translate(-446.000000, -423.000000)",fill:"#FFFFFF",fillRule:"nonzero",children:(0,t.jsx)("g",{id:"Group-2-Copy",transform:"translate(350.000000, 423.000000)",children:(0,t.jsxs)("g",{id:"noun-link-4813247",transform:"translate(96.000000, 0.000000)",children:[(0,t.jsx)("path",{d:"M5.55715244,7.40299245 C6.3632225,6.58461598 7.72282478,6.52898073 8.5968365,7.40299245 L8.60298861,7.40299245 C8.84907292,7.64907677 9.02763312,7.95066447 9.132201,8.27059459 C9.39058807,8.22752946 9.61834095,8.11679372 9.79063074,7.9445369 L10.6397732,7.1015476 C10.4490605,6.73242845 10.2028223,6.39392884 9.90754166,6.09245834 C8.29269119,4.51064473 5.79661363,4.55499909 4.24659159,6.09245834 L1.16998828,9.16906164 C-0.390069347,10.7418286 -0.389922842,13.2572814 1.16998828,14.8300117 C2.74275522,16.3900693 5.25820805,16.3899228 6.83093836,14.8300117 L9.7291353,11.9318148 C8.88299614,12.0694488 8.07066299,11.9920466 7.31711493,11.7287956 L5.52041523,13.5193421 C4.70819196,14.3377186 3.29295444,14.3377186 2.47457796,13.5193421 C1.63675296,12.6816636 1.63748548,11.3167505 2.47457796,10.479658 C2.5359562,10.4181369 5.7629175,7.1977647 5.55718797,7.40305472 L5.55715244,7.40299245 Z",id:"Path"}),(0,t.jsx)("path",{d:"M10.4430915,8.59700755 C9.64647099,9.40549494 8.28844365,9.48189726 7.40340743,8.59700755 L7.39725532,8.59700755 C7.15117101,8.35092323 6.97261081,8.04933553 6.86804293,7.72940541 C6.60965586,7.77247054 6.38190298,7.88320628 6.2096132,8.0554631 L5.36047068,8.8984524 C5.55118346,9.26757155 5.79742161,9.60607116 6.09270227,9.90754166 C7.7228625,11.5045185 10.2182808,11.4302405 11.7536523,9.90754166 L14.8302556,6.83093836 C16.3903133,5.25817143 16.3901668,2.74271859 14.8302556,1.16998828 C13.2574887,-0.390069347 10.7420359,-0.389922842 9.16930557,1.16998828 L6.27125514,4.06818522 C7.1173943,3.93055117 7.92972745,4.00795339 8.6832755,4.27120441 L10.4799752,2.48065792 C11.2921985,1.66228144 12.707436,1.66228144 13.5258125,2.48065792 C14.3636375,3.31833642 14.362905,4.6832495 13.5258125,5.52034198 C13.4642914,5.58186306 10.2373264,8.8022353 10.443056,8.59694528 L10.4430915,8.59700755 Z",id:"Path"})]})})})})]})])},563127,e=>{"use strict";var t=e.i(391398);e.s(["ChatBubbles",0,e=>(0,t.jsx)("svg",{className:e.className,style:e.style,width:"18",height:"17",viewBox:"0 0 18 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8.14652 9.20877H7.08397L3.54214 11.3339V9.08062C1.26934 8.54246 -0.239949 6.38717 0.0314997 4.06735C0.302948 1.74754 2.26905 -0.00109102 4.60469 5.10739e-07H8.14652C10.6895 5.10739e-07 12.7509 2.06145 12.7509 4.60438C12.7509 7.14732 10.6895 9.20877 8.14652 9.20877ZM8.14795 10.6247C10.9475 10.62 13.3752 8.68834 14.0089 5.96149V5.96149C15.9076 6.6687 17.1198 8.53524 16.9936 10.5575C16.8674 12.5797 15.4326 14.281 13.4607 14.7467V17L9.91886 14.8749H8.85631C7.09391 14.874 5.4869 13.8663 4.71855 12.2802L7.47783 10.6247H8.14795Z",fill:"black"})})])},175650,e=>{"use strict";var t=e.i(391398);e.s(["UltrahumanWordmark",0,e=>(0,t.jsxs)("svg",{className:e.className,style:e.style,width:"1280",height:"118",viewBox:"0 0 1280 118",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{d:"M1140.14 112.793L1163.37 2.78856C1163.71 1.16429 1165.14 0 1166.79 0H1202.74C1204.13 0 1205.4 0.848066 1205.96 2.14173L1229.18 56.8779H1229.5L1240.89 2.78856C1241.23 1.16429 1242.66 0 1244.31 0H1280L1256.19 112.793H1218.21C1216.81 112.793 1215.55 111.959 1215 110.665L1191.14 54.9518H1190.83L1179.27 110.004C1178.93 111.628 1177.5 112.793 1175.85 112.793H1140.14Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M1000.55 112.793L1055.35 1.95486C1055.95 0.761822 1057.16 0 1058.49 0H1123.29L1131.6 112.793H1089.89L1088.45 92.3242H1055.62C1054.28 92.3242 1053.07 93.086 1052.49 94.3078L1044.49 110.809C1043.9 112.017 1042.68 112.793 1041.35 112.793H1000.55ZM1081.89 32.8733C1081.22 32.8733 1080.6 33.2614 1080.3 33.8795L1065.76 64.7836H1088.3L1087.06 33.7214C1087.05 33.2471 1086.65 32.8733 1086.19 32.8733H1081.89Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M851.836 112.793L875.062 2.78856C875.404 1.16429 876.83 0 878.484 0H918.192C919.704 0 921.044 0.977432 921.514 2.42921L934.789 43.352L964.759 1.46615C965.4 0.546212 966.455 0 967.582 0H1014.22L991.15 110.004C990.808 111.628 989.382 112.793 987.728 112.793H951.242L962.762 57.7547C962.948 56.8348 961.779 56.2886 961.223 57.036L924.409 105.218H922.812L904.533 56.4754C904.22 55.6561 903.036 55.7424 902.865 56.6048L891.758 109.99C891.416 111.628 889.99 112.793 888.336 112.793H851.836Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M742.906 108.121C733.425 101.782 728.677 92.6548 728.677 80.7244C728.677 75.7797 729.318 70.2457 730.602 64.1224L743.448 2.78856C743.79 1.16429 745.216 0 746.856 0H785.095L771.351 65.5886L771.194 66.8822L771.037 68.334C770.937 68.9808 770.823 69.5702 770.723 70.102V71.3956C770.723 78.0508 775.3 81.3856 784.468 81.3856C794.477 81.3856 800.608 76.2828 802.846 66.0773L816.163 2.80293C816.505 1.16429 817.931 0 819.585 0H857.839L842.968 70.2601C839.446 86.474 832.745 98.4044 822.821 106.037C813.126 113.454 799.382 117.162 781.588 117.162C764.963 117.162 752.074 114.158 742.906 108.136V108.121Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M661.266 112.793L669.735 72.5024H639.009C637.355 72.5024 635.929 73.6667 635.587 75.291L627.703 112.778H586.626L610.436 0H651.513L643.201 38.9967H676.764L685.076 0H726.153L702.927 110.004C702.585 111.628 701.159 112.793 699.505 112.793H661.251H661.266Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M447.013 112.793L501.82 1.95486C502.419 0.761822 503.631 0 504.957 0H569.759L578.071 112.793H536.352L534.912 92.3242H499.909L490.955 110.809C490.371 112.017 489.145 112.793 487.819 112.793H447.013ZM528.354 32.8733C527.684 32.8733 527.071 33.2614 526.771 33.8795L512.228 64.7836H534.77L533.558 34.5695C533.529 33.6208 532.745 32.8733 531.818 32.8733H528.354Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M446.542 112.793H404.952C403.697 112.793 402.528 112.117 401.915 111.01L388.898 87.8395C388.27 86.7327 387.115 86.0571 385.861 86.0571H377.791C376.137 86.0571 374.711 87.2214 374.369 88.8601L369.949 110.019C369.607 111.643 368.181 112.822 366.527 112.822H328.287L351.499 2.78856C351.841 1.16429 353.267 0 354.921 0H407.875C439.841 0 455.81 12.6779 455.81 38.0336C455.81 60.2702 446.114 74.5579 426.724 80.8969L446.542 112.807V112.793ZM400.675 56.2311C405.365 56.2311 409.044 54.7793 411.696 51.8758C414.248 49.3028 415.531 45.9105 415.531 41.7277C415.531 34.5263 411.268 30.9328 402.742 30.9328H389.283C387.629 30.9328 386.203 32.0971 385.861 33.7358L381.17 56.2311H400.675Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M300.67 33.8364C299.016 33.8364 297.59 35.0007 297.248 36.6249L281.807 109.99C281.465 111.614 280.039 112.778 278.385 112.778H240.145L256.77 33.822H219.685L229.167 2.4867C229.609 1.02055 230.963 0 232.503 0H336.528L333.335 33.8364H300.67Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M123.145 112.793L146.371 2.78856C146.713 1.16429 148.139 0 149.793 0H186.807C187.363 0 187.776 0.517464 187.662 1.06368L171.265 78.6258H223.378L213.597 110.306C213.141 111.772 211.786 112.778 210.261 112.778H123.174L123.145 112.793Z",fill:e.fill??"#EEEEEE"}),(0,t.jsx)("path",{d:"M14.2293 108.121C4.74786 101.782 0 92.6548 0 80.7244C0 75.7797 0.641611 70.2457 1.92482 64.1224L14.7569 2.80293C15.0991 1.16429 16.5249 0 18.1788 0H56.4184L42.6738 65.5886L42.517 66.8822L42.3601 68.334C42.2603 68.9808 42.1463 69.5702 42.0465 70.102V71.3956C42.0465 78.0508 46.6232 81.3856 55.791 81.3856C65.8143 81.3856 71.931 76.2828 74.1694 66.0773L88.0708 0H129.148L114.277 70.2601C110.755 86.474 104.054 98.4044 94.1304 106.037C84.4351 113.454 70.6905 117.162 52.8967 117.162C36.272 117.162 23.3829 114.158 14.2151 108.136L14.2293 108.121Z",fill:e.fill??"#EEEEEE"})]})])},2987,e=>{"use strict";var t=e.i(859207);let r={[t.ShopifyStore.IN]:{Year1:{variantId:"gid://shopify/ProductVariant/42410418995270",alternateVariantId:"gid://shopify/ProductVariant/42410418995270",price:4999},Year2:{variantId:"gid://shopify/ProductVariant/42458741243974",alternateVariantId:"gid://shopify/ProductVariant/42458741243974",price:5999,save:20}},[t.ShopifyStore.AE]:{Year1:{variantId:"gid://shopify/ProductVariant/52323624747379",alternateVariantId:"gid://shopify/ProductVariant/52323624747379",price:199},Year2:{variantId:"gid://shopify/ProductVariant/52355419963763",alternateVariantId:"gid://shopify/ProductVariant/52355419963763",price:299.99,save:20}},[t.ShopifyStore.EU]:{Year1:{variantId:"gid://shopify/ProductVariant/55121006821750",alternateVariantId:"gid://shopify/ProductVariant/55121006821750",price:49},Year2:{variantId:"gid://shopify/ProductVariant/55176328020342",alternateVariantId:"gid://shopify/ProductVariant/55176328020342",price:79,save:44}},[t.ShopifyStore.GB]:{Year1:{variantId:"gid://shopify/ProductVariant/55121006821750",alternateVariantId:"gid://shopify/ProductVariant/55121006821750",price:49},Year2:{variantId:"gid://shopify/ProductVariant/55176328020342",alternateVariantId:"gid://shopify/ProductVariant/55176328020342",price:79,save:20}},[t.ShopifyStore.ROW]:{Year1:{variantId:"gid://shopify/ProductVariant/42449043030076",alternateVariantId:"gid://shopify/ProductVariant/42449043030076",price:48},Year2:{variantId:"gid://shopify/ProductVariant/42493701718076",alternateVariantId:"gid://shopify/ProductVariant/42493701718076",price:78,save:23}},[t.ShopifyStore.US]:{Year1:{variantId:"gid://shopify/ProductVariant/41515247075424",alternateVariantId:"gid://shopify/ProductVariant/41515247075424",price:48},Year2:{variantId:"gid://shopify/ProductVariant/41559574216800",alternateVariantId:"gid://shopify/ProductVariant/41559574216800",price:78,save:23}},[t.ShopifyStore.AU]:{Year1:{variantId:"gid://shopify/ProductVariant/55121006821750",alternateVariantId:"gid://shopify/ProductVariant/55121006821750",price:79},Year2:{variantId:"gid://shopify/ProductVariant/55176328020342",alternateVariantId:"gid://shopify/ProductVariant/55176328020342",price:79,save:20}},[t.ShopifyStore.CA]:{Year1:{variantId:"gid://shopify/ProductVariant/41515247075424",alternateVariantId:"gid://shopify/ProductVariant/41515247075424",price:69},Year2:{variantId:"gid://shopify/ProductVariant/41559574216800",alternateVariantId:"gid://shopify/ProductVariant/41559574216800",price:78,save:23}},[t.ShopifyStore.SA]:{Year1:{variantId:"gid://shopify/ProductVariant/55121006821750",alternateVariantId:"gid://shopify/ProductVariant/55121006821750",price:48},Year2:{variantId:"gid://shopify/ProductVariant/55176328020342",alternateVariantId:"gid://shopify/ProductVariant/55176328020342",price:78,save:23}},[t.ShopifyStore.MX]:{Year1:{variantId:"gid://shopify/ProductVariant/55121006821750",alternateVariantId:"gid://shopify/ProductVariant/55121006821750",price:48},Year2:{variantId:"gid://shopify/ProductVariant/55176328020342",alternateVariantId:"gid://shopify/ProductVariant/55176328020342",price:78,save:23}},[t.ShopifyStore.ZA]:{Year1:{variantId:"gid://shopify/ProductVariant/55121006821750",alternateVariantId:"gid://shopify/ProductVariant/55121006821750",price:48},Year2:{variantId:"gid://shopify/ProductVariant/55176328020342",alternateVariantId:"gid://shopify/ProductVariant/55176328020342",price:78,save:23}}};e.s(["AfibShopifyMap",0,r])},765265,e=>{"use strict";var t=e.i(859207);let r=`
  --seperator-border: 1px solid rgba(0,0,0,0.1);
  --button-radius: 16px;
  --internal-sections-padding: 6px 16px;
  --footer-sections-padding: 20px 24px 16px;
`;e.s(["cartContentVars",0,r,"getShippingAndTaxDisclaimerMap",0,e=>({[t.ShopifyStore.IN]:null,[t.ShopifyStore.US]:e("cart:sharedCart.shippingAndTaxDisclaimer.us"),[t.ShopifyStore.AE]:e("cart:sharedCart.shippingAndTaxDisclaimer.ae"),[t.ShopifyStore.ROW]:e("cart:sharedCart.shippingAndTaxDisclaimer.row"),[t.ShopifyStore.GB]:e("cart:sharedCart.shippingAndTaxDisclaimer.row"),[t.ShopifyStore.EU]:e("cart:sharedCart.shippingAndTaxDisclaimer.row"),[t.ShopifyStore.AU]:e("cart:sharedCart.shippingAndTaxDisclaimer.row"),[t.ShopifyStore.CA]:e("cart:sharedCart.shippingAndTaxDisclaimer.us"),[t.ShopifyStore.SA]:e("cart:sharedCart.shippingAndTaxDisclaimer.row"),[t.ShopifyStore.MX]:e("cart:sharedCart.shippingAndTaxDisclaimer.row"),[t.ShopifyStore.ZA]:e("cart:sharedCart.shippingAndTaxDisclaimer.row")})])},972455,e=>{"use strict";var t=e.i(191788);e.s(["useLottieAnimation",0,(r,{path:n,renderer:i="svg",loop:a=!0,autoplay:o=!1,rendererSettings:s,onInstance:c})=>{let d=(0,t.useRef)(null);return(0,t.useEffect)(()=>{if(!r.current)return;let t=!0;return e.A(336770).then(({default:e})=>{t&&r.current&&(d.current=e.loadAnimation({container:r.current,renderer:i,loop:a,autoplay:o,rendererSettings:s,path:n}),c&&d.current&&c(d.current))}),()=>{t=!1,d.current?.destroy()}},[o,r,a,n,i,s,c]),d}])},111869,e=>{"use strict";let t={"/":"dark","/home":"light","/ring/buy":"light","/ring/buy/better-help":"light","/home/buy":"light","/home/buy/better-help":"light","/ring/faq":"dark","/shop":"light","/blood-vision/tests":"light","/blood-vision":"dark","/print-sizing-kit":"dark","/blood-vision/faq":"dark","/environment":"light","/ogdb":"dark","/ogdb/search":"dark","/powerplugs":"dark","/hsa-fsa":"light","/performance-lab/buy":"light","/photon":"light","/photon/buy":"light","/privacyPolicy":"light","/termsAndCondition":"light","/termsOfSale/UltrahumanRing":"light","/termsOfSale/UltrahumanM1":"light","/termsOfSale/UltrahumanHome":"light"};[...Object.keys(t)],e.s(["AE_PRICING_LINK_ABSOLUTE",0,"https://www.ultrahuman.com/ae/pricing","BLOG_LINK",0,"https://ultrahuman.com/blog","DEFAULT_FOOTER_THEME",0,"light","HEADER_CART_ICON_IN_ACTIVE_PAGES",0,[],"NO_HEADER_OR_FOOTER_PAGES",0,["/advanced","/prompt","/one-tree-planted","/cycle-report/[token]"],"NO_WA_CHATBOT_PAGES",0,["/ring/claim","/ring/order","/order","/one-tree-planted","/glucose","/cycle-report","/blood-vision/buy","/performance-lab"],"READ_THE_SCIENCE_LINK_ACTIVITY_NUDGES",0,"https://ultrahuman.com/blog?utm_source=affiliate_homepage_blogs&utm_medium=value_prop_section&utm_content=bh2","READ_THE_SCIENCE_LINK_FITNESS_INGIGHTS",0,"https://ultrahuman.com/blog/what-is-metabolic-fitness?utm_source=affiliate_homepage_blogs&utm_medium=value_prop_section&utm_content=wimf","READ_THE_SCIENCE_LINK_FUEL",0,"https://ultrahuman.com/blog?utm_source=affiliate_homepage_blogs&utm_medium=value_prop_section&utm_content=bh3","READ_THE_SCIENCE_LINK_METABOLIC_SCORE",0,"https://ultrahuman.com/blog?utm_source=affiliate_homepage_blogs&utm_medium=value_prop_section&utm_content=bh1","START_ULTRAMETABOLIC_LINK",0,"https://ultrahuman.com/pricing/","WA_CHATBOT_ALTERNATE_MOBILE_UI_EXCEPTIONS",0,["/blood-vision/buy/blood-on-us"],"WA_CHATBOT_ALTERNATE_MOBILE_UI_PAGES",0,["/ring/buy","/ring/buy/*","/rare/buy","/rare/buy/*","/home/buy","/home/buy/*","/pricing","/pricing/*","/x/redeem","/powerplugs/redeem","/blood-vision/buy","/blood-vision/buy/*","/performance-lab/buy"],"footerThemeConfig",0,{"/home":"dark","/science":"dark","/science/studies":"dark","/science/studies/[slug]":"dark","/science/bytes/[slug]":"dark","/science/bytes":"dark"},"headerThemeConfig",0,t,"isOrderPage",0,e=>"/order"===e||!!e?.startsWith("/order/")])},650303,e=>{"use strict";var t=e.i(391398);e.s(["CaretUpBlack",0,({className:e,style:r})=>(0,t.jsx)("svg",{className:e,style:r,width:"15",height:"11",viewBox:"0 0 15 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M14.6732 8.15665L12.6499 10.18L7.33659 4.85126L2.0233 10.18L-4.00543e-05 8.15665L7.33662 0.819993L14.6732 8.15665Z",fill:"#000000"})})])},54013,e=>{"use strict";var t=e.i(391398),r=e.i(191788),n=e.i(760814);e.i(664157);var i=e.i(271179),a=e.i(957134),o=e.i(981022),s=e.i(650303);let c=(0,n.default)(({className:e,trackingParams:r})=>{let{t:n}=(0,i.useTranslation)("home");return(0,t.jsx)("div",{className:e,children:(0,t.jsx)(o.TypeformSnippet,{typeformId:"yOi1E7Wy",frameTitle:n("home.bottomBar.label.bookCallTitle"),className:"typeform-container",trackingParams:r})})}).withConfig({componentId:"sc-65e8ea7-0"})`
  height: 80vh;
  width: calc(100vw - 48px);

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    height: 500px;
    width: 780px;
  }

  .typeform-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;(0,n.default)(({className:e,rightPadding:n,initialActive:o})=>{let{t:d}=(0,i.useTranslation)("home"),u=(0,r.useContext)(a.ModalContext),[l,p]=(0,r.useState)(!1),h=()=>{u.set((0,t.jsx)(c,{})),u.setCloseButtonTheme("light"),u.show()};return(0,r.useEffect)(()=>{if(o)return void p(!0);if(!window)return;let e=.8*window.innerHeight;p(window.scrollY>e);let t=!1,r=()=>{t||(window.requestAnimationFrame(()=>{p(window.scrollY>e),t=!1}),t=!0)};return document.addEventListener("scroll",r,{passive:!0}),()=>{document.removeEventListener("scroll",r)}},[o]),(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:e+`${l?" active":""} ${n?"right-padded":""}`,onClick:h,role:"button",tabIndex:0,onKeyDown:h,children:(0,t.jsxs)("div",{className:"content",children:[d("home.bottomBar.text.getRightPlan"),(0,t.jsxs)("span",{className:"sub-content",children:[d("home.bottomBar.button.talkToSpecialist"),(0,t.jsx)(s.CaretUpBlack,{style:{transform:"rotate(90deg)"}})]})]})})})}).withConfig({componentId:"sc-65e8ea7-1"})`
  padding: 2rem 2rem;
  transition: all 0.2s ease-in;
  transform: translateY(100%);
  cursor: pointer;

  &.right-padded {
    // padding-right: 72px;
    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      padding-right: 100px;
    }
  }

  &.active {
    transform: translateY(0);
  }

  &:hover {
    .sub-content {
      transform: translateX(4px);
    }
  }

  z-index: 10;
  position: sticky;
  bottom: 0;
  width: 100vw;
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);

  .sm-display {
    display: initial;
    @media (min-width: ${({theme:e})=>e.global.phone.maxWidth}) {
      display: none;
    }
  }

  .lg-display {
    display: none;
    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      display: initial;
    }
  }

  @media (min-width: ${({theme:e})=>e.global.phone.maxWidth}) {
    padding: 1.2rem 4rem;
  }

  & .content {
    font-size: 1.7rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
    display: flex;
    justify-content: center;

    .sub-content {
      padding-left: 0.8rem;
      color: #000000;
      background: transparent;
      border: none;
      font-size: 1.7rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      svg {
        height: 1rem;
        margin: auto 0;
        margin-left: 0.5rem;
      }
    }

    button {
      padding-left: 0.8rem;
      color: #000000;
      background: transparent;
      border: none;
      font-size: 1.7rem;
      font-weight: 500;

      &:hover {
        transition: all 0.2s ease-in-out;
        transform: translate(4px);
      }

      svg {
        height: 1rem;
        margin: auto 0;
        margin-left: 0.5rem;
      }
    }
  }
`,e.s(["BookCallTFComponentDiv",0,c])},973528,e=>{"use strict";function t(){return"u">typeof window}function r(){return"production"}function n(){return(t()?window.vam:r())||"production"}function i(){return"production"===n()}function a(){return"development"===n()}function o(e,t){if(!e||!t)return e;let r=e;try{let e=Object.entries(t);for(let[t,n]of e)if(!Array.isArray(n)){let e=s(n);e.test(r)&&(r=r.replace(e,`/[${t}]`))}for(let[t,n]of e)if(Array.isArray(n)){let e=s(n.join("/"));e.test(r)&&(r=r.replace(e,`/[...${t}]`))}return r}catch(t){return e}}function s(e){return RegExp(`/${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(?=[/?#]|$)`)}function c(e={debug:!0}){var n;if(!t())return;!function(e="auto"){if("auto"===e){window.vam=r();return}window.vam=e}(e.mode),window.va||(window.va=function(...e){(window.vaq=window.vaq||[]).push(e)}),e.beforeSend&&(null==(n=window.va)||n.call(window,"beforeSend",e.beforeSend));let i=e.scriptSrc?e.scriptSrc:a()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?`${e.basePath}/insights/script.js`:"/_vercel/insights/script.js";if(document.head.querySelector(`script[src*="${i}"]`))return;let o=document.createElement("script");o.src=i,o.defer=!0,o.dataset.sdkn="@vercel/analytics"+(e.framework?`/${e.framework}`:""),o.dataset.sdkv="1.6.1",e.disableAutoTrack&&(o.dataset.disableAutoTrack="1"),e.endpoint?o.dataset.endpoint=e.endpoint:e.basePath&&(o.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(o.dataset.dsn=e.dsn),o.onerror=()=>{let e=a()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${i}. ${e}`)},a()&&!1===e.debug&&(o.dataset.debug="false"),document.head.appendChild(o)}function d(e,r,n){var o,s;if(!t()){let e="[Vercel Web Analytics] Please import `track` from `@vercel/analytics/server` when using this function in a server environment";if(i())console.warn(e);else throw Error(e);return}if(!r){null==(o=window.va)||o.call(window,"event",{name:e,options:n});return}try{let t=function(e,t){if(!e)return;let r=e,n=[];for(let[i,a]of Object.entries(e))"object"==typeof a&&null!==a&&(t.strip?r=function(e,{[e]:t,...r}){return r}(i,r):n.push(i));if(n.length>0&&!t.strip)throw Error(`The following properties are not valid: ${n.join(", ")}. Only strings, numbers, booleans, and null are allowed.`);return r}(r,{strip:i()});null==(s=window.va)||s.call(window,"event",{name:e,data:t,options:n})}catch(e){e instanceof Error&&a()&&console.error(e)}}e.s(["computeRoute",0,o,"default",0,{inject:c,track:d,computeRoute:o},"inject",0,c,"pageview",0,function({route:e,path:t}){var r;null==(r=window.va)||r.call(window,"pageview",{route:e,path:t})},"track",0,d])},879466,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return c}});let n=e.r(741705),i=e.r(391398),a=n._(e.r(191788)),o=e.r(889129);async function s({Component:e,ctx:t}){return{pageProps:await (0,o.loadGetInitialProps)(e,t)}}class c extends a.default.Component{static{this.origGetInitialProps=s}static{this.getInitialProps=s}render(){let{Component:e,pageProps:t}=this.props;return(0,i.jsx)(e,{...t})}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},194182,(e,t,r)=>{t.exports=e.r(161457)},756453,e=>{"use strict";var t=e.i(391398),r=e.i(153147),n=e.i(194182),i=e.i(760814);e.i(664157);var a=e.i(271179);let o=(0,i.default)(({className:e})=>{let{t:i}=(0,a.useTranslation)("common");return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("section",{className:e,children:[(0,t.jsx)("div",{"data-us-project":"MekbJaIxD2semiAhBBDT",style:{width:"100%",height:"100%"}}),(0,t.jsx)("div",{className:"content-container",children:(0,t.jsxs)("div",{className:"content",children:[(0,t.jsxs)("p",{children:[i("applicationErrorComponent.text.looksLikeOur"),(0,t.jsx)("br",{}),i("applicationErrorComponent.text.tryRefreshingCome")]}),(0,t.jsx)(r.default,{href:{pathname:"/"},children:i("applicationErrorComponent.customLink.takeMeHome")})]})})]}),(0,t.jsx)(n.default,{src:"https://cdn.unicorn.studio/v1.3.2/unicornStudio.umd.js",onLoad:()=>{window&&window.UnicornStudio&&(window.UnicornStudio.isInitialized||(window.UnicornStudio.init(),window.UnicornStudio.isInitialized=!0))}})]})}).withConfig({componentId:"sc-a20b004d-0"})`
  position: relative;
  width: 100%:
  height: 100lvh;
  height: 100vh;

  background-color: #000000;
  color: #ffffff;


  .content-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    display: grid;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 60px;
    
    
    & .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;

      padding: 120px 16px 0;
      
      @media (min-width: ${({theme:e})=>e.globalV2.md.minWidth}) {
        padding-top: 60px;
        }
        
        p {
          font-size: 1.6rem;
          text-align: center;
          line-height: 1.5;
          
          max-width: 48ch;
          
          @media (min-width: ${({theme:e})=>e.globalV2.xxl.minWidth}) {
            font-size: 1.9rem;
          }
          }
          
          a {
            font-size: 1.6rem;
            color: #ffffff;
            padding: 12px 24px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px;
            
            background: rgba(0,0,0,0.45);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            
            @media (min-width: ${({theme:e})=>e.globalV2.xxl.minWidth}) {
              font-size: 1.9rem;
            }
      }
    }

  }
`;e.s(["ApplicationErrorComponent",0,o])}]);