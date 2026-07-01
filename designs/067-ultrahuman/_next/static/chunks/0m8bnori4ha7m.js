(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,940290,e=>{"use strict";var t=e.i(391398);e.s(["CaretUp",0,({className:e,style:r,fill:n="white",width:i=15,height:a=11})=>(0,t.jsx)("svg",{className:e,style:r,width:i,height:a,viewBox:"0 0 15 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M14.6732 8.15665L12.6499 10.18L7.33659 4.85126L2.0233 10.18L-4.00543e-05 8.15665L7.33662 0.819993L14.6732 8.15665Z",fill:n??"white"})})])},419231,e=>{"use strict";var t=e.i(760814);let r=t.css`
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
`;e.s(["Container",0,i,"ContainerCSS",0,r,"ContainerLG",0,a])},958678,(e,t,r)=>{t.exports=e.r(280963)},78198,e=>{"use strict";let t="https://cdn.speedsize.com",r="https://public-web-assets.uh-static.com";e.s(["S3_URI",0,"https://s3.amazonaws.com/public-web-assets.ultrahuman.com","SPEEDSIZE_CDN",0,t,"UH_STATIC_URL",0,r,"getAssetUrl",0,e=>`${r}${e}`,"getCompressedAssetUrl",0,e=>`${t}/3f711f28-1488-44dc-b013-5e43284ac4b0/${r}${e}`])},663230,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let n=e.r(191788);function i(e,t){let r=(0,n.useRef)(null),i=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=a(e,n)),t&&(i.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},215125,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return a},imageConfigDefault:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=["default","imgix","cloudinary","akamai","custom"],o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},813521,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return a}});let n=e.r(741705)._(e.r(191788)),i=e.r(215125),a=n.default.createContext(i.imageConfigDefault)},468816,(e,t,r)=>{"use strict";function n(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,t.qualities[0]):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return n}})},213606,(e,t,r)=>{"use strict";function n({widthInt:e,heightInt:t,blurWidth:r,blurHeight:i,blurDataURL:a,objectFit:o}){let s=r?40*r:e,l=i?40*i:t,c=s&&l?`viewBox='0 0 ${s} ${l}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${c}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${c?"none":"contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${a}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return n}})},866785,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return c}}),e.r(894470);let n=e.r(420262),i=e.r(213606),a=e.r(215125),o=["-moz-initial","fill","none","scale-down",void 0];function s(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function c({src:e,sizes:t,unoptimized:r=!1,priority:u=!1,preload:d=!1,loading:f,className:m,quality:p,width:h,height:g,fill:b=!1,style:y,overrideSrc:v,onLoad:x,onLoadingComplete:w,placeholder:j="empty",blurDataURL:P,fetchPriority:S,decoding:C="async",layout:_,objectFit:E,objectPosition:O,lazyBoundary:R,lazyRoot:L,...$},A){var M;let I,k,z,{imgConf:W,showAltText:N,blurComplete:T,defaultLoader:D}=A,B=W||a.imageConfigDefault;if("allSizes"in B)I=B;else{let e=[...B.deviceSizes,...B.imageSizes].sort((e,t)=>e-t),t=B.deviceSizes.sort((e,t)=>e-t),r=B.qualities?.sort((e,t)=>e-t);I={...B,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===D)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let U=$.loader||D;delete $.loader,delete $.srcSet;let F="__next_img_default"in U;if(F){if("custom"===I.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=U;U=t=>{let{config:r,...n}=t;return e(n)}}if(_){"fill"===_&&(b=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[_];e&&(y={...y,...e});let r={responsive:"100vw",fill:"100vw"}[_];r&&!t&&(t=r)}let V="",q=l(h),H=l(g);if((M=e)&&"object"==typeof M&&(s(M)||void 0!==M.src)){let t=s(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(k=t.blurWidth,z=t.blurHeight,P=P||t.blurDataURL,V=t.src,!b)if(q||H){if(q&&!H){let e=q/t.width;H=Math.round(t.height*e)}else if(!q&&H){let e=H/t.height;q=Math.round(t.width*e)}}else q=t.width,H=t.height}let G=!u&&!d&&("lazy"===f||void 0===f);(!(e="string"==typeof e?e:V)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,G=!1),I.unoptimized&&(r=!0),F&&!I.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let K=l(p),X=Object.assign(b?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:E,objectPosition:O}:{},N?{}:{color:"transparent"},y),Y=T||"empty"===j?null:"blur"===j?`url("data:image/svg+xml;charset=utf-8,${(0,i.getImageBlurSvg)({widthInt:q,heightInt:H,blurWidth:k,blurHeight:z,blurDataURL:P||"",objectFit:X.objectFit})}")`:`url("${j}")`,Z=o.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,Q=Y?{backgroundSize:Z,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},J=function({config:e,src:t,unoptimized:r,width:i,quality:a,sizes:o,loader:s}){if(r){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,n.getDeploymentId)();if(e){let r=t.indexOf("?");if(-1!==r){let n=new URLSearchParams(t.slice(r+1));n.get("dpl")||(n.append("dpl",e),t=t.slice(0,r)+"?"+n.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:l,kind:c}=function({deviceSizes:e,allSizes:t},r,n){if(n){let r=/(^|\s)(1?\d?\d)vw/g,i=[];for(let e;e=r.exec(n);)i.push(parseInt(e[2]));if(i.length){let r=.01*Math.min(...i);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,i,o),u=l.length-1;return{sizes:o||"w"!==c?o:"100vw",srcSet:l.map((r,n)=>`${s({config:e,src:t,quality:a,width:r})} ${"w"===c?r:n+1}${c}`).join(", "),src:s({config:e,src:t,quality:a,width:l[u]})}}({config:I,src:e,unoptimized:r,width:q,quality:K,sizes:t,loader:U}),ee=G?"lazy":f;return{props:{...$,loading:ee,fetchPriority:S,width:q,height:H,decoding:C,className:m,style:{...X,...Q},sizes:J.sizes,srcSet:J.srcSet,src:v||J.src},meta:{unoptimized:r,preload:d||u,placeholder:j,fill:b}}}},803866,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let n=e.r(468816),i=e.r(420262);function a({config:e,src:t,width:r,quality:o}){let s=(0,i.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let r=new URLSearchParams(t.slice(e+1)),n=r.get("dpl");if(n){s=n,r.delete("dpl");let i=r.toString();t=t.slice(0,e)+(i?"?"+i:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let l=(0,n.findClosestQuality)(o,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${l}${t.startsWith("/")&&s?`&dpl=${s}`:""}`}a.__next_img_default=!0;let o=a},849194,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return x}});let n=e.r(741705),i=e.r(952456),a=e.r(391398),o=i._(e.r(191788)),s=n._(e.r(730943)),l=n._(e.r(280963)),c=e.r(866785),u=e.r(215125),d=e.r(813521);e.r(894470);let f=e.r(425479),m=n._(e.r(803866)),p=e.r(663230),h={deviceSizes:[640,750,828,1080,1200,1920,2048],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,n,i,a,o){let s=e?.src;e&&e["data-loaded-src"]!==s&&(e["data-loaded-src"]=s,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}n?.current&&n.current(e)}}))}function b(e){return o.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let y=(0,o.forwardRef)(({src:e,srcSet:t,sizes:r,height:n,width:i,decoding:s,className:l,style:c,fetchPriority:u,placeholder:d,loading:f,unoptimized:m,fill:h,onLoadRef:y,onLoadingCompleteRef:v,setBlurComplete:x,setShowAltText:w,sizesInput:j,onLoad:P,onError:S,...C},_)=>{let E=(0,o.useCallback)(e=>{e&&(S&&(e.src=e.src),e.complete&&g(e,d,y,v,x,m,j))},[e,d,y,v,x,S,m,j]),O=(0,p.useMergedRef)(_,E);return(0,a.jsx)("img",{...C,...b(u),loading:f,width:i,height:n,decoding:s,"data-nimg":h?"fill":"1",className:l,style:c,sizes:r,srcSet:t,src:e,ref:O,onLoad:e=>{g(e.currentTarget,d,y,v,x,m,j)},onError:e=>{w(!0),"empty"!==d&&x(!0),S&&S(e)}})});function v({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...b(t.fetchPriority)};return e&&s.default.preload?(s.default.preload(t.src,r),null):(0,a.jsx)(l.default,{children:(0,a.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let x=(0,o.forwardRef)((e,t)=>{let r=(0,o.useContext)(f.RouterContext),n=(0,o.useContext)(d.ImageConfigContext),i=(0,o.useMemo)(()=>{let e=h||n||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),i=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:i,localPatterns:"u"<typeof window?n?.localPatterns:e.localPatterns}},[n]),{onLoad:s,onLoadingComplete:l}=e,p=(0,o.useRef)(s);(0,o.useEffect)(()=>{p.current=s},[s]);let g=(0,o.useRef)(l);(0,o.useEffect)(()=>{g.current=l},[l]);let[b,x]=(0,o.useState)(!1),[w,j]=(0,o.useState)(!1),{props:P,meta:S}=(0,c.getImgProps)(e,{defaultLoader:m.default,imgConf:i,blurComplete:b,showAltText:w});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(y,{...P,unoptimized:S.unoptimized,placeholder:S.placeholder,fill:S.fill,onLoadRef:p,onLoadingCompleteRef:g,setBlurComplete:x,setShowAltText:j,sizesInput:e.sizes,ref:t}),S.preload?(0,a.jsx)(v,{isAppRouter:!r,imgAttributes:P}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},288961,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return u},getImageProps:function(){return c}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(741705),o=e.r(866785),s=e.r(849194),l=a._(e.r(803866));function c(e){let{props:t}=(0,o.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let u=s.Image},126019,(e,t,r)=>{t.exports=e.r(288961)},121666,e=>{"use strict";var t=e.i(391398),r=e.i(126019),n=e.i(191788),i=e.i(78198);let a=e=>`${i.SPEEDSIZE_CDN}/3f711f28-1488-44dc-b013-5e43284ac4b0/${i.UH_STATIC_URL}/${e}`,o=({src:e,width:t})=>{let r=a(e);return t&&/\.(png|jpe?g|webp)$/i.test(e)?`${r}/w_${t}`:r},s=({src:e})=>a(e),l=(0,n.forwardRef)(function({src:e,alt:n,...i},a){let l="string"==typeof e&&e.startsWith("/");return(0,t.jsx)(r.default,{ref:a,src:e,loader:l?void 0:i.priority?s:o,alt:n,...i})});e.s(["CustomImage",0,l])},661174,e=>{"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.s(["default",()=>t])},987250,e=>{"use strict";var t=e.i(661174);e.s(["default",0,function(e,r,n){var i;return(i=function(e,r){if("object"!=(0,t.default)(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,r||"default");if("object"!=(0,t.default)(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(r,"string"),(r="symbol"==(0,t.default)(i)?i:i+"")in e)?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}],987250)},760121,(e,t,r)=>{"use strict";var n=e.r(191788),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=n.useState,o=n.useEffect,s=n.useLayoutEffect,l=n.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(e){return!0}}var u="u"<typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=a({inst:{value:r,getSnapshot:t}}),i=n[0].inst,u=n[1];return s(function(){i.value=r,i.getSnapshot=t,c(i)&&u({inst:i})},[e,r,t]),o(function(){return c(i)&&u({inst:i}),e(function(){c(i)&&u({inst:i})})},[e]),l(r),r};r.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:u},890979,(e,t,r)=>{"use strict";t.exports=e.r(760121)},75907,e=>{"use strict";function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>t])},771914,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return l}});let n=e.r(191788),i=e.r(799604),a="function"==typeof IntersectionObserver,o=new Map,s=[];function l({rootRef:e,rootMargin:t,disabled:r}){let c=r||!a,[u,d]=(0,n.useState)(!1),f=(0,n.useRef)(null),m=(0,n.useCallback)(e=>{f.current=e},[]);return(0,n.useEffect)(()=>{if(a){if(c||u)return;let r=f.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:i,elements:a}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=s.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=o.get(n)))return t;let i=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:i},s.push(r),o.set(r,t),t}(r);return a.set(e,t),i.observe(e),function(){if(a.delete(e),i.unobserve(e),0===a.size){i.disconnect(),o.delete(n);let e=s.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&s.splice(e,1)}}}(r,e=>e&&d(e),{root:e?.current,rootMargin:t})}else if(!u){let e=(0,i.requestIdleCallback)(()=>d(!0));return()=>(0,i.cancelIdleCallback)(e)}},[c,t,e,u,f.current]),[m,u,(0,n.useCallback)(()=>{d(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},154471,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(270090),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},548735,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},539149,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return S},useLinkStatus:function(){return P}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(952456),o=e.r(391398),s=a._(e.r(191788)),l=e.r(160472),c=e.r(471112),u=e.r(728169),d=e.r(889129),f=e.r(514862),m=e.r(425479),p=e.r(771914),h=e.r(154471),g=e.r(344113),b=e.r(663230);e.r(548735);let y=new Set;function v(e,t,r,n){if(!("u"<typeof window)&&(0,c.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let i=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(y.has(i))return;y.add(i)}e.prefetch(t,r,n).catch(e=>{})}}function x(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let w=s.default.forwardRef(function(e,t){let r,n,{href:i,as:a,children:u,prefetch:y=null,passHref:w,replace:j,shallow:P,scroll:S,locale:C,onClick:_,onNavigate:E,onMouseEnter:O,onTouchStart:R,legacyBehavior:L=!1,transitionTypes:$,...A}=e;r=u,L&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let M=s.default.useContext(m.RouterContext),I=!1!==y,{href:k,as:z}=s.default.useMemo(()=>{if(!M){let e=x(i);return{href:e,as:a?x(a):e}}let[e,t]=(0,l.resolveHref)(M,i,!0);return{href:e,as:a?(0,l.resolveHref)(M,a):t||e}},[M,i,a]),W=s.default.useRef(k),N=s.default.useRef(z);L&&(n=s.default.Children.only(r));let T=L?n&&"object"==typeof n&&n.ref:t,[D,B,U]=(0,p.useIntersection)({rootMargin:"200px"}),F=s.default.useCallback(e=>{(N.current!==z||W.current!==k)&&(U(),N.current=z,W.current=k),D(e)},[z,k,U,D]),V=(0,b.useMergedRef)(F,T);s.default.useEffect(()=>{!M||B&&I&&v(M,k,z,{locale:C})},[z,k,B,C,I,M?.locale,M]);let q={ref:V,onClick(e){L||"function"!=typeof _||_(e),L&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!M||e.defaultPrevented||function(e,t,r,n,i,a,o,s,l){let u,{nodeName:d}=e.currentTarget;if(!("A"===d.toUpperCase()&&((u=e.currentTarget.getAttribute("target"))&&"_self"!==u||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,c.isLocalURL)(r)){i&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let e=o??!0;"beforePopState"in t?t[i?"replace":"push"](r,n,{shallow:a,locale:s,scroll:e}):t[i?"replace":"push"](n||r,{scroll:e})})()}}(e,M,k,z,j,P,S,C,E)},onMouseEnter(e){L||"function"!=typeof O||O(e),L&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),M&&v(M,k,z,{locale:C,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){L||"function"!=typeof R||R(e),L&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),M&&v(M,k,z,{locale:C,priority:!0,bypassPrefetchedCheck:!0})}};if((0,d.isAbsoluteUrl)(z))q.href=z;else if(!L||w||"a"===n.type&&!("href"in n.props)){let e=void 0!==C?C:M?.locale;q.href=M?.isLocaleDomain&&(0,h.getDomainLocale)(z,e,M?.locales,M?.domainLocales)||(0,g.addBasePath)((0,f.addLocale)(z,e,M?.defaultLocale))}return L?s.default.cloneElement(n,q):(0,o.jsx)("a",{...A,...q,children:r})}),j=(0,s.createContext)({pending:!1}),P=()=>(0,s.useContext)(j),S=w;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41158,(e,t,r)=>{t.exports=e.r(539149)},153147,e=>{"use strict";var t=e.i(391398),r=e.i(191788),n=e.i(41158),i=e.i(203828),a=e.i(171225),o=e.i(307959);let s=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","email","affiliate","affiliateCode","referral","discount","sscid","irclickid","click_id","flow"];function l(e){return!(e.startsWith("#")||e.startsWith("/"))&&(!!(e.startsWith("mailto:")||e.startsWith("tel:"))||/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(e))}function c(e){return"/blog"===e||e.startsWith("/blog/")}function u(e,t){if(!e.startsWith("/"))return e;let r=e.split("/").filter(Boolean)[0];return!r||/^\w{2}(-\w{2,3})?$/.test(r)?e:a.REGION_PREFIXED_PATHS.has(r.toLowerCase())?`/${t}${e}`:e}function d(e){return e?e.startsWith("#")?e:`#${e}`:""}function f(e,t){let r=e.startsWith("//");try{if(r){let r=new URL(`https:${e}`),n=t?.incomingQuery??{};Object.entries(n).forEach(([e,t])=>{r.searchParams.delete(e),Array.isArray(t)?t.forEach(t=>r.searchParams.append(e,t)):r.searchParams.append(e,t)});let i=t?.extraParams??{};return Object.entries(i).forEach(([e,t])=>{r.searchParams.has(e)||(Array.isArray(t)?t.forEach(t=>r.searchParams.append(e,t)):r.searchParams.append(e,t))}),`//${r.host}${r.pathname}${r.search}${r.hash}`}let n=new URL(e),i=t?.incomingQuery??{};Object.entries(i).forEach(([e,t])=>{n.searchParams.delete(e),Array.isArray(t)?t.forEach(t=>n.searchParams.append(e,t)):n.searchParams.append(e,t)});let a=t?.extraParams??{};Object.entries(a).forEach(([e,t])=>{n.searchParams.has(e)||(Array.isArray(t)?t.forEach(t=>n.searchParams.append(e,t)):n.searchParams.append(e,t))});let o=n.toString();if(t?.appendHash)return`${o}${d(t.appendHash)}`;return o}catch{return e}}function m(e){let t=(0,i.useRouter)(),{regionSlug:n}=(0,r.useContext)(o.RegionLocaleContext);return(0,r.useCallback)((r,i)=>(function(e,t={},r){let n=r?.discardParams??[],i=r?.appendToExternal??!1,a=r?.asObject??!1,o=new Set(n.map(e=>e.toLowerCase())),u=s.filter(e=>!o.has(e.toLowerCase())),m={};if(u.forEach(e=>{let r=t[e];null!=r&&(m[e]=Array.isArray(r)?r.map(e=>String(e)):String(r))}),"string"==typeof e){if(l(e))return e.startsWith("mailto:")||e.startsWith("tel:")||!i?e:f(e,{extraParams:m});let t=c(e)?{}:m;if(!a){let r=new URLSearchParams;return Object.entries(t).forEach(([e,t])=>{Array.isArray(t)?t.forEach(t=>r.append(e,t)):r.append(e,t)}),`${e}${r.toString()?`?${r.toString()}`:""}`}return{pathname:e,query:t}}if("string"==typeof e.pathname&&l(e.pathname)){if(e.pathname.startsWith("mailto:")||e.pathname.startsWith("tel:"))return a?e:e.pathname;if(!i){if(a)return e;let t=e.query??{};return f(e.pathname,{incomingQuery:t,appendHash:"string"==typeof e.hash?e.hash:void 0})}let t=e.query??{};return f(e.pathname,{incomingQuery:t,extraParams:m,appendHash:"string"==typeof e.hash?e.hash:void 0})}let p=e.query??{},h="string"==typeof e.pathname&&c(e.pathname)?{}:m;if(!a){let t={},r=(e,r)=>{if(Array.isArray(r)){Array.isArray(t[e])||(t[e]=[]);let n=t[e];r.forEach(e=>{n.includes(e)||n.push(e)})}else t[e]=r};Object.entries(h).forEach(([e,t])=>r(e,t)),Object.entries(p).forEach(([e,t])=>r(e,t));let n=new URLSearchParams;Object.entries(t).forEach(([e,t])=>{Array.isArray(t)?t.forEach(t=>n.append(e,t)):n.append(e,t)});let i="string"==typeof e.pathname?e.pathname:"",a="string"==typeof e.hash?d(e.hash):"";return`${i}${n.toString()?`?${n.toString()}`:""}${a}`}return{...e,query:{...h,...p}}})("string"==typeof r?u(r,n):r.pathname&&!l(r.pathname)?{...r,pathname:u(r.pathname,n)}:r,t.query,{...e,...i}),[t.query,n,e?.discardParams,e?.appendToExternal,e?.asObject])}let p=r.default.forwardRef(function(e,i){let a,{href:o,discardParams:s,appendToExternal:l=!1,...c}=e,u=m(),d=(0,r.useMemo)(()=>u(o,{discardParams:s,appendToExternal:l,asObject:!0}),[o,u,s,l]),f=c.rel;return"_blank"===c.target&&((a=new Set(String(c.rel??"").trim().split(/\s+/).filter(Boolean))).add("noopener"),a.add("noreferrer"),f=Array.from(a).join(" ")),(0,t.jsx)(n.default,{ref:i,href:d,...c,rel:f})});e.s(["FORWARDED_PARAM_KEYS",0,s,"addRegionPrefix",0,u,"default",0,p,"useFormatLink",0,m])},657232,e=>{"use strict";var t=e.i(191788);let r=t.useLayoutEffect;e.s(["useWindowSize",0,()=>{let[e,n]=(0,t.useState)({width:0,height:0});return r(()=>{n({width:window.innerWidth,height:window.innerHeight})},[]),(0,t.useEffect)(()=>{let e=null,t=window.innerWidth,r=window.innerHeight;function i(){null===e&&(e=requestAnimationFrame(()=>{let i=window.innerWidth,a=window.innerHeight;(i!==t||a!==r)&&(t=i,r=a,n({width:i,height:a})),e=null}))}return window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i),null!==e&&cancelAnimationFrame(e)}},[]),e}])},194111,e=>{"use strict";var t=e.i(391398);e.s(["UHLogo",0,e=>(0,t.jsxs)("svg",{className:e.className,style:e.style,width:"32px",height:"24px",viewBox:"0 0 32 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("title",{children:"Logo / 53"}),(0,t.jsx)("desc",{children:"Created with Sketch."}),(0,t.jsx)("g",{id:"Symbols",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:(0,t.jsx)("g",{id:"header-/-Default",transform:"translate(-120.000000, -24.000000)",fill:e.fill??"#000",children:(0,t.jsx)("g",{id:"header-/-scrolled",transform:"translate(120.000000, 20.000000)",children:(0,t.jsx)("g",{id:"Logo-/-53",children:(0,t.jsx)("path",{d:"M28.5836299,4.22641509 L28.5836299,13.3454483 L23.474,13.3454151 L32,21.0242679 L25.8058042,27.7735849 L15.9998561,18.9433764 L6.19419577,27.7735849 L0,21.0242679 L8.526,13.3454151 L3.40498221,13.3454483 L3.40498221,4.22641509 L28.5836299,4.22641509 Z",id:"Combined-Shape"})})})})})]})])},777658,e=>{"use strict";let t={diagnostics:"/performance-lab",recovery:"/performance-lab/recovery",ivLounge:"/performance-lab/iv-lounge",contact:"/performance-lab/contact"},r=[t.diagnostics,t.recovery,t.ivLounge,t.contact],n=e=>r.includes(e);function i(e){let r=e.split("?")[0].split("#")[0].replace(/\/$/,"")||"/",n=r.indexOf("/performance-lab");return n>=0?r.slice(n)||t.diagnostics:r}e.s(["PERFORMANCE_LAB_NAV_PATHS",0,t,"getPerformanceLabNavSection",0,e=>e===t.diagnostics?"diagnostics":e===t.recovery?"recovery":e===t.ivLounge?"ivLounge":e===t.contact?"contact":null,"isPerformanceLabRoute",0,e=>i(e).startsWith("/performance-lab"),"normalizePerformanceLabRoutePath",0,i,"usesPerformanceLabNavbar",0,n,"usesPerformanceLabNavbarUrl",0,e=>n(i(e))])},963635,e=>{"use strict";var t=e.i(391398),r=e.i(203828),n=e.i(126019);e.i(664157);var i=e.i(271179),a=e.i(307959),o=e.i(191788),s=e.i(760814),l=e.i(208173),c=e.i(940290),u=e.i(419231),d=e.i(153147),f=e.i(777658);let m=["IN","AE","CH","IS","GB","AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","MC","NL","PL","PT","RO","SK","SI","ES","SE","FO","NO","ZA","HK"],p=(0,s.default)(({className:e})=>{let{t:r}=(0,i.useTranslation)("common"),{region:s,flag:l,countryName:c}=(0,o.useContext)(a.RegionLocaleContext);if("XX"===s||!s||h.includes(s))return null;let d="GLOBAL"===s,f=c?(0,t.jsxs)(t.Fragment,{children:[r("common.marketingBanner.shipping")," ",d?r("common.marketingBanner.productName"):"US"===s||"PR"===s||[...m,"IN","AE"].includes(s)?"":r("common.marketingBanner.productName")," ",!d&&(0,t.jsxs)(t.Fragment,{children:[r("common.marketingBanner.toCountry",{country:c})," ",l&&(0,t.jsx)(n.default,{src:l,alt:r("common.marketingBanner.countryFlagAlt",{country:s}),width:16,height:16,style:{borderRadius:"50%",display:"inline-block",verticalAlign:"middle"}})]})]}):null;return(0,t.jsx)("div",{className:`${e} gtm`,"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsx)(u.Container,{children:f})})}).withConfig({componentId:"sc-1a13cad5-0"})`
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
`,h=["PK","SY","SS","YE","ET","BY","CF","ER","IQ","KP","LY","PS","RU","SO"];(0,s.default)(({className:e,content:n,onClick:i})=>{let s=(0,r.useRouter)(),{region:l}=(0,o.useContext)(a.RegionLocaleContext),c=(0,o.useRef)(null),u=!h.includes(l),f=(0,d.useFormatLink)(),[m,g]=(0,o.useState)(0);return(0,o.useEffect)(()=>{{let e=setInterval(()=>{"visible"===document.visibilityState&&g(e=>(e+1)%2)},6e3);return()=>{clearInterval(e)}}},[2]),(0,t.jsx)("div",{className:e,children:(0,t.jsxs)(t.Fragment,{children:[0===m?(0,t.jsx)("div",{className:"content",onClick:()=>{i?i():s.push(f("/home",{asObject:!0}))},"aria-hidden":!0,children:n}):null,1===m&&u?(0,t.jsx)("div",{ref:c,"aria-hidden":!0,children:(0,t.jsx)(p,{})}):null]})})}).withConfig({componentId:"sc-1a13cad5-1"})`
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
`;let g=(0,s.default)(({className:e})=>{let{t:n}=(0,i.useTranslation)("common"),a=(0,r.useRouter)(),o=(0,d.useFormatLink)();return(0,t.jsx)("div",{className:`${e} ${l.jetbrainsMono.className} ${l.jetbrainsMono.variable} gtm `,onClick:()=>{a.push(o("/performance-lab",{asObject:!0}))},"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsxs)("span",{children:[n("common.marketingBanner.discoverPerformanceLab")," ",(0,t.jsx)("span",{className:"cta-text",children:n("common.marketingBanner.exploreNow")}),(0,t.jsx)("span",{className:"cta-icon",children:(0,t.jsx)(c.CaretUp,{style:{transform:"rotate(90deg)",height:"8px",opacity:"0.85",marginLeft:"4px"}})})]})})}).withConfig({componentId:"sc-1a13cad5-2"})`
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
`,b=(0,s.default)(({className:e})=>{let{t:n}=(0,i.useTranslation)("common"),a=(0,r.useRouter)(),o=(0,d.useFormatLink)();return(0,t.jsx)("div",{className:`${e} gtm`,onClick:()=>{a.push(o("/pricing",{asObject:!0}))},"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsxs)(u.Container,{children:[n("common.marketingBanner.m2Live")," ",(0,t.jsx)(c.CaretUp,{style:{transform:"rotate(90deg)"},width:14,height:10})]})})}).withConfig({componentId:"sc-1a13cad5-3"})`
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
`;(0,s.default)(({className:e})=>{let{t:r}=(0,i.useTranslation)("common");return(0,t.jsx)("div",{className:`${e} ${l.jetbrainsMono.className} ${l.jetbrainsMono.variable} gtm `,"aria-hidden":"true","data-buttontype":"marketing banner",children:(0,t.jsx)("span",{children:r("common.marketingBanner.liveInBengaluru")})})}).withConfig({componentId:"sc-1a13cad5-4"})`
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
`;let y={bannerActive:!0,bannerComponent:(0,t.jsx)(g,{})},v=new Set(["/ring","/ring/buy","/diesel-ultrahuman-ring","/diesel-ultrahuman-ring/buy","/rare","/rare/buy"]),x=(0,s.default)(({className:e})=>{if(!y.bannerActive)return null;let{region:n}=(0,o.useContext)(a.RegionLocaleContext),i=(0,r.useRouter)();if("/performance-lab/buy"===i.pathname||(0,f.usesPerformanceLabNavbar)(i.pathname)||"XX"==n)return null;let s=(n||"").toUpperCase(),l="US"===s||"PR"===s||h.includes(s),c="US"===s?(0,t.jsx)(b,{}):y.bannerComponent,u=i.pathname.endsWith("/buy")||i.pathname.endsWith("/pricing");return v.has(i.pathname)&&l?c:"/rare"===i.pathname?null:u&&!h.includes(s)?(0,t.jsx)(p,{}):c}).withConfig({componentId:"sc-1a13cad5-5"})`
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
`;e.s(["MarketingBanner",0,x,"isMarketingBannerActive",0,()=>y.bannerActive])}]);