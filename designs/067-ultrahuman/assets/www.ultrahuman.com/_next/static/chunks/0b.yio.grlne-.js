(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,133535,e=>{"use strict";var t=e.i(391398);e.s(["CrossDark",0,e=>(0,t.jsx)("svg",{style:e.style,className:e.className,width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M20 20L4 4M20 4L4 20",stroke:e.fill??"#000000",strokeWidth:"2",strokeLinecap:"round"})})])},202191,e=>{"use strict";var t=e.i(391398);e.s(["CartCross",0,e=>(0,t.jsxs)("svg",{className:e.className,style:e.style,width:"30",height:"30",viewBox:"0 0 30 30",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("rect",{width:"30",height:"30",rx:"15",fill:"#F2F2F7"}),(0,t.jsx)("path",{d:"M10.0474 18.1821C9.73633 18.4931 9.72998 19.0454 10.0537 19.3691C10.3838 19.6928 10.936 19.6865 11.2407 19.3818L14.9985 15.624L18.75 19.3755C19.0674 19.6928 19.6133 19.6928 19.937 19.3691C20.2607 19.039 20.2607 18.4995 19.9434 18.1821L16.1919 14.4306L19.9434 10.6728C20.2607 10.3554 20.2671 9.80949 19.937 9.48579C19.6133 9.16209 19.0674 9.16209 18.75 9.47949L14.9985 13.2309L11.2407 9.47949C10.936 9.16839 10.3774 9.15569 10.0537 9.48579C9.72998 9.80949 9.73633 10.3681 10.0474 10.6728L13.7988 14.4306L10.0474 18.1821Z",fill:"#3C3C43","fill-opacity":"0.6"})]})])},957134,e=>{"use strict";var t=e.i(391398),a=e.i(760814),r=e.i(191788),i=e.i(730943),o=e.i(202191),n=e.i(133535);let l=(0,r.createContext)({set:()=>{},clear:()=>{},show:()=>{},hide:()=>{},setCloseButtonTheme:()=>{},setCloseBtnHidden:()=>{},setTop:()=>{},setAlignRight:()=>{},setFullView:()=>{},setBg:()=>{},setPortal:()=>{},isPortal:!1}),s=(0,a.default)(({className:e,children:a,hideModal:r,lightCloseButton:i,top:l,fullViewMbl:s,bg:d,closeBtnHidden:c=!1,alignRight:u=!1})=>(0,t.jsxs)("div",{className:`${e} ${l?"top":""} ${s?"full-view-backdrop":""} ${u?"align-right":""}`,"aria-hidden":"true",onClick:r,children:[(0,t.jsxs)("div",{className:`modalContent ${"dark"===d?"dark-bg":""} ${s?"full-view-mobile":""} ${u?"align-right-content":""}`,onClick:e=>e.stopPropagation(),"aria-hidden":"true",children:[a,s||c?null:(0,t.jsx)("button",{className:`closeBtn ${i?"light":"filled"}`,onClick:r,type:"button","aria-label":"Close",children:i?(0,t.jsx)(n.CrossDark,{}):(0,t.jsx)(o.CartCross,{})})]}),s&&!c?(0,t.jsx)("button",{className:`closeNBtn ${i?"light":""}`,onClick:r,children:(0,t.jsx)(n.CrossDark,{})}):null]})).withConfig({componentId:"sc-a743b718-0"})`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 150;

  & * {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  &.top {
    z-index: 3000;
  }

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.7);

  padding: 24px;

  &.align-right:not(.full-view-backdrop) {
    padding: 16px;
  }

  &.full-view-backdrop {
    padding: 0;

    /* Full-view + right-aligned sheet: keep mobile edge-to-edge, add inset from tablet up */
    &.align-right {
      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        padding: 24px;
      }
    }
  }

  opacity: 0;

  animation: ${a.keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
  `} 0.2s ease-in-out forwards;

  /* Right alignment for specific modals - align to right (horizontal) but respect padding for vertical spacing */
  &.align-right {
    justify-content: center; /* Keep vertical centering to respect top/bottom padding */
    align-items: flex-end; /* Align to right side */
  }

  .full-view-mobile {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 !important;
    border-radius: 0 !important;
    /* Allow fixed positioning to work within modal */
    transform: none !important;
    will-change: auto !important;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      border-radius: 24px !important;
    }

    &::before {
      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        position: sticky;
        top: -0.1rem;
        box-shadow: 0px 5px 25px 18px #fff;
        display: block;
        content: '';
        width: 100%;
        height: 0.1rem;
        // background:  linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.00) 100%);
        z-index: 150;
      }
    }

    &::after {
      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        position: sticky;
        top: 100%;
        display: block;
        content: '';
        width: 100%;
        height: 0.1rem;
        box-shadow: 0px -5px 25px 28px #fff;
        z-index: 150;
      }
    }
  }

  .modalContent {
    position: relative;
    width: 100%;
    border-radius: 24px;
    overflow: auto;
    color: #000000;
    background: #ffffff;

    transform: translateY(40px);

    animation: ${a.keyframes`
    from {transform: translateY(24px);}
    to {transform: translateY(0);}
  `} 0.2s ease-in-out forwards;

    /* For full-view mobile, don't create stacking context issues */
    &.full-view-mobile {
      transform: none !important;
      will-change: auto !important;
      /* Allow fixed positioning to work */
      isolation: auto !important;
    }

    /* For right-aligned modals, don't create stacking context issues */
    &.align-right-content {
      transform: none !important;
      will-change: auto !important;
      /* Allow fixed positioning to work */
      isolation: auto !important;

      /* Remove sticky gradient effects for right-aligned modals */
      &::before,
      &::after {
        display: none !important;
      }
    }

    &.full-view-mobile.align-right-content {
      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        height: 100%;
        max-height: 100%;
        overflow: hidden;
      }
    }

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      min-width: 100px;
      min-height: 100px;
      width: fit-content;
      height: fit-content;
    }

    .closeBtn {
      position: absolute;
      right: 24px;
      top: 24px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      padding: 0;
      display: grid;
      place-items: center;
      cursor: pointer;

      &.filled {
        background: transparent;
      }

      &:not(.filled):not(.light) {
        background: rgba(0, 0, 0, 0.08);
      }

      &.light {
        background: #fff;
      }

      svg {
        width: 30px;
        height: 30px;
      }

      &.light svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .dark-bg {
    background-color: black;
  }

  .closeNBtn {
    position: fixed;
    right: 24px;
    top: 24px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.08);
    display: grid;
    place-items: center;
    z-index: 1100;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      right: calc((100vw / 2) - (58rem / 2) + 2.4rem);
      top: calc((100vh / 2) - (58rem / 2) + 1.6rem);
    }

    &.light {
      background: #fff;
    }

    svg {
      width: 16px;
    }
  }

  // .gradient-container {
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   border: 1px solid red;
  //   width: 100%;
  //   height: 6.8rem;
  //   background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 77.5%);
  // }
`;e.s(["ModalContext",0,l,"ModalProvider",0,({children:e})=>{let[a,o]=(0,r.useState)(!1),[n,d]=(0,r.useState)(null),[c,u]=(0,r.useState)(""),[f,p]=(0,r.useState)(!1),[h,m]=(0,r.useState)(!1),[g,b]=(0,r.useState)(!1),[y,C]=(0,r.useState)(!1),[x,_]=(0,r.useState)(!1),[w,S]=(0,r.useState)(!1),v=(0,r.useCallback)(e=>{d(e??null)},[]),L=(0,r.useCallback)(()=>{o(!1),p(!1),b(!1),C(!1),S(!1)},[]),E=(0,r.useCallback)(()=>{d(null),L()},[L]),T=(0,r.useCallback)(e=>{u(e)},[]),A=(0,r.useCallback)(()=>{o(!0)},[]),k=(0,r.useCallback)(e=>{"dark"!=e&&p(!0)},[]),P=(0,r.useCallback)(()=>m(!0),[]),R=(0,r.useCallback)(()=>b(!0),[]),I=(0,r.useCallback)(()=>S(!0),[]),O=(0,r.useCallback)(e=>_(e),[]),N=(0,r.useMemo)(()=>({set:v,clear:E,show:A,hide:L,setCloseButtonTheme:k,setCloseBtnHidden:C,setTop:P,setFullView:R,setBg:T,setAlignRight:I,setPortal:O,isPortal:x}),[v,E,A,L,k,C,P,R,T,I,O,x]),M=a?(0,t.jsx)(s,{top:h||x,lightCloseButton:f,hideModal:L,fullViewMbl:g,bg:c,closeBtnHidden:y,alignRight:w,children:n}):null;return(0,t.jsxs)(l.Provider,{value:N,children:[e,x&&"u">typeof document?(0,i.createPortal)(M,document.body):M]})}])},161592,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"LoadableContext",{enumerable:!0,get:function(){return r}});let r=e.r(741705)._(e.r(191788)).default.createContext(null)},852414,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return f}});let r=e.r(741705)._(e.r(191788)),i=e.r(161592),o=[],n=[],l=!1;function s(e){let t=e(),a={loading:!0,loaded:null,error:null};return a.promise=t.then(e=>(a.loading=!1,a.loaded=e,e)).catch(e=>{throw a.loading=!1,a.error=e,e}),a}class d{constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}}function c(t){return function(t,a){let s=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},a),c=null;function u(){if(!c){let e=new d(t,s);c={getCurrentValue:e.getCurrentValue.bind(e),subscribe:e.subscribe.bind(e),retry:e.retry.bind(e),promise:e.promise.bind(e)}}return c.promise()}if("u"<typeof window&&o.push(u),!l&&"u">typeof window){let t=s.webpack&&"function"==typeof e.t.resolveWeak?s.webpack():s.modules;t&&n.push(e=>{for(let a of t)if(e.includes(a))return u()})}function f(e,t){let a;u(),(a=r.default.useContext(i.LoadableContext))&&Array.isArray(s.modules)&&s.modules.forEach(e=>{a(e)});let o=r.default.useSyncExternalStore(c.subscribe,c.getCurrentValue,c.getCurrentValue);return r.default.useImperativeHandle(t,()=>({retry:c.retry}),[]),r.default.useMemo(()=>{var t;return o.loading||o.error?r.default.createElement(s.loading,{isLoading:o.loading,pastDelay:o.pastDelay,timedOut:o.timedOut,error:o.error,retry:c.retry}):o.loaded?r.default.createElement((t=o.loaded)&&t.default?t.default:t,e):null},[e,o])}return f.preload=()=>u(),f.displayName="LoadableComponent",r.default.forwardRef(f)}(s,t)}function u(e,t){let a=[];for(;e.length;){let r=e.pop();a.push(r(t))}return Promise.all(a).then(()=>{if(e.length)return u(e,t)})}c.preloadAll=()=>new Promise((e,t)=>{u(o).then(e,t)}),c.preloadReady=(e=[])=>new Promise(t=>{let a=()=>(l=!0,t());u(n,e).then(a,a)}),"u">typeof window&&(window.__NEXT_PRELOADREADY=c.preloadReady);let f=c},425167,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return u},noSSR:function(){return c}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let o=e.r(741705),n=e.r(391398);e.r(191788);let l=o._(e.r(852414)),s="u"<typeof window;function d(e){return{default:e?.default||e}}function c(e,t){if(delete t.webpack,delete t.modules,!s)return e(t);let a=t.loading;return()=>(0,n.jsx)(a,{error:null,isLoading:!0,pastDelay:!1,timedOut:!1})}function u(e,t){let a=l.default,r={loading:({error:e,isLoading:t,pastDelay:a})=>null};e instanceof Promise?r.loader=()=>e:"function"==typeof e?r.loader=e:"object"==typeof e&&(r={...r,...e});let i=(r={...r,...t}).loader;return(r.loadableGenerated&&(r={...r,...r.loadableGenerated},delete r.loadableGenerated),"boolean"!=typeof r.ssr||r.ssr)?a({...r,loader:()=>null!=i?i().then(d):Promise.resolve(d(()=>null))}):(delete r.webpack,delete r.modules,c(a,r))}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},168489,(e,t,a)=>{t.exports=e.r(425167)},981022,e=>{"use strict";var t=e.i(391398),a=e.i(191788),r=e.i(168489);e.i(664157);var i=e.i(271179);let o=(0,r.default)(()=>e.A(826413).then(e=>({default:e.Widget})),{loadableGenerated:{modules:[24453]},ssr:!1,loading:()=>(0,t.jsx)("div",{style:{minHeight:"200px",minWidth:"200px"},children:"Loading form..."})});e.s(["TypeformSnippet",0,({typeformId:e,className:r,style:n,frameTitle:l,trackingParams:s})=>{let{t:d}=(0,i.useTranslation)("common");return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"200px",minWidth:"200px"},children:d("typeformSnippet.content.loadingForm")}),children:(0,t.jsx)(o,{id:e,inlineOnMobile:!0,disableScroll:!0,"data-tf-iframe-props":`title=${l}`,"data-tf-medium":"snippet","data-tf-inline-on-mobile":!0,style:{minWidth:"200px",minHeight:"200px",...n},className:`${r} typeformSnippet`,tracking:s??{}})})}])},914098,e=>{"use strict";let t=null,a=new Set;e.s(["getPerformanceLabLenis",0,function(){return t},"pausePerformanceLabLenisScroll",0,function(){t?.stop()},"registerPerformanceLabLenis",0,function(e){t=e,a.forEach(e=>e())},"resumePerformanceLabLenisScroll",0,function(){t?.start()},"subscribePerformanceLabLenisReady",0,function(e){return t&&e(),a.add(e),()=>{a.delete(e)}},"unregisterPerformanceLabLenis",0,function(e){t===e&&(t=null)}])},738653,e=>{"use strict";let t=["IN"];e.s(["PERFORMANCE_LAB_BOOK_TOUR_TYPEFORM_ID",0,"oGvGBH7o","VO2_MAX_LEADERBOARD_PATH",0,"/performance-lab/leaderboard","isVo2MaxBannerCountry",0,e=>!!e&&t.includes(e.toUpperCase())])},510769,e=>{"use strict";var t=e.i(391398),a=e.i(191788),r=e.i(914098);e.s(["PerformanceLabModalBodyScrollLock",0,({children:e})=>((0,a.useEffect)(()=>{let e=document.documentElement,t=document.body,a=e.style.overflow,i=t.style.overflow;return e.style.overflow="hidden",t.style.overflow="hidden",(0,r.pausePerformanceLabLenisScroll)(),()=>{e.style.overflow=a,t.style.overflow=i,(0,r.resumePerformanceLabLenisScroll)()}},[]),(0,t.jsx)(t.Fragment,{children:e}))])},592571,e=>{"use strict";var t=e.i(391398),a=e.i(760814);e.i(664157);var r=e.i(271179),i=e.i(981022),o=e.i(738653),n=e.i(510769);let l=a.default.div.withConfig({componentId:"sc-f16cc782-0"})`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: calc(100vw - 48px);
  background: #000;
  border-radius: 16px;
  overflow: hidden;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    height: 720px;
    width: 780px;
  }
`,s=a.default.div.withConfig({componentId:"sc-f16cc782-1"})`
  flex: 1;
  min-height: 0;
  width: 100%;

  .typeform-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;e.s(["PerformanceLabTFModal",0,({planId:e})=>{let{t:a}=(0,r.useTranslation)("common");return(0,t.jsx)(n.PerformanceLabModalBodyScrollLock,{children:(0,t.jsx)(l,{children:(0,t.jsx)(s,{children:(0,t.jsx)(i.TypeformSnippet,{typeformId:o.PERFORMANCE_LAB_BOOK_TOUR_TYPEFORM_ID,frameTitle:a("waitlistTypeformModal.typeformSnippet.frameTitle"),className:"typeform-container",trackingParams:e?{utm_source:e}:{}})})})})}])},510116,e=>{"use strict";e.s(["API_BASE_URL",0,"https://api.ultrahuman.com","WEBCMS_API_BASE_URL",0,"https://web-cms-backend.ultrahuman.com"])},979546,474508,248335,e=>{"use strict";var t,a,r,i,o=e.i(191788),n=e.i(859207),l=((t={}).M1="M1",t.RING="RING",t.RING_PRO="RING_PRO",t.RING_RARE="RING_RARE",t.RING_DIESEL="RING_DIESEL",t.MERCH="MERCH",t.GENERIC="GENERIC",t.PERFORMANCE_LAB="PERFORMANCE_LAB",t.UHX="UHX",t.SUPPLEMENT="SUPPLEMENT",t);let s=["PERFORMANCE_LAB","UHX"];var d=((a={}).OG="OG",a.GIFT="GIFT",a),c=((r={})[r.ITEM_LIST=0]="ITEM_LIST",r[r.GIFT_NOTE=1]="GIFT_NOTE",r),u=((i={}).NO_EDIT="NO_EDIT",i.NO_QTY_BTNS="NO_QTY_BTNS",i.HIDE_IN_CART="HIDE_IN_CART",i);e.s(["CartFlow",()=>d,"CartFlowScreens",()=>c,"ProductType",()=>l,"ProductUiTags",()=>u,"isDigitalProductType",0,e=>s.includes(e)],474508),n.ShopifyStore.IN,n.ShopifyStore.US,n.ShopifyStore.EU,n.ShopifyStore.GB,n.ShopifyStore.AE,n.ShopifyStore.ROW,n.ShopifyStore.CA,n.ShopifyStore.SA,n.ShopifyStore.MX,n.ShopifyStore.AU,n.ShopifyStore.ZA;let f={[n.ShopifyStore.IN]:"sharedCart.cartUi.taxIncl",[n.ShopifyStore.US]:"sharedCart.cartUi.taxExcl",[n.ShopifyStore.EU]:"sharedCart.cartUi.taxIncl",[n.ShopifyStore.GB]:"sharedCart.cartUi.taxIncl",[n.ShopifyStore.AE]:"sharedCart.cartUi.taxExcl",[n.ShopifyStore.ROW]:"sharedCart.cartUi.taxExcl",[n.ShopifyStore.CA]:"sharedCart.cartUi.taxExcl",[n.ShopifyStore.SA]:"sharedCart.cartUi.taxIncl",[n.ShopifyStore.MX]:"sharedCart.cartUi.taxIncl",[n.ShopifyStore.AU]:"sharedCart.cartUi.taxIncl",[n.ShopifyStore.ZA]:"sharedCart.cartUi.taxIncl"},p=async(e,t,a)=>{if(void 0===e)return{error:!0,message:"Missing store"};let r=`${t}${t.includes("?")?"&":"?"}store=${e}`;try{let e=await fetch(r,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}});if(!e.ok)return console.error(`[Cart API] ${e.status} ${e.statusText} for ${r}`),{error:!0,status:e.status};return await e.json()}catch(e){return console.error("[Cart API] Network error:",e),{error:!0,message:e instanceof Error?e.message:String(e)}}},h={ATHLETES:"athletes",HEALTHCARE:"healthcare-workers",SCIENTIST:"scientist-and-researchers",VETERANS:"veterans",EDUCATION:"education"},m={[h.ATHLETES]:"UHHROATHL15",[h.HEALTHCARE]:"UHHROHLT15",[h.SCIENTIST]:"UHHROSCRS15",[h.VETERANS]:"UHHROVET15",[h.EDUCATION]:"UHHROSTD15"},g={cart:null,store:null,currency:null,taxes:0,duty:0,setStore:()=>void 0,isCartVisible:!1,showCart:()=>void 0,hideCart:()=>void 0,isUpsellVisible:!1,showUpsellModal:()=>void 0,hideUpsellModal:()=>void 0,proceedWithUpsell:async()=>void 0,addToCartSilently:async()=>void 0,createCartWithItem:async()=>!1,addToCart:async()=>void 0,updateCartQuantity:async()=>void 0,incrementCartQuantity:async()=>void 0,addToCartByShopifyVariantId:async()=>void 0,removeFromCart:async()=>void 0,deleteFromCart:async()=>void 0,checkout:()=>void 0,updateCartAttributes:async()=>void 0,altContent:null,setAltContent:()=>void 0,referralDiscount:0,ultrahumanXAdded:null,deleteCartFromLocalStorage:()=>void 0,affiliateDetails:null,campaignActive:!1,campaigns:[],campaignsLoading:!1,campaignsError:null,getCampaignForProduct:()=>void 0,cartFlow:d.OG,setCartFlow:()=>void 0,cartLoading:!1,cardioAdaptibilityCart:null,setCardioAdaptibilityCart:()=>void 0,afibCart:null,setAfibCart:()=>void 0,activeFlowScreen:c.ITEM_LIST,setActiveFlowScreen:()=>void 0,getCartAttributeValue:()=>void 0,getCartAttributeIndex:()=>void 0,error:null,setError:()=>void 0,applicableDiscountCoupons:[],setCartType:()=>void 0,referral:"",taxString:"",cartType:l.GENERIC};e.s(["HeroCategoriesMap",0,h,"TaxConfigKey",0,f,"deleteFromLocalStorage",0,e=>{window.localStorage.removeItem(e)},"getFromLocalStorage",0,e=>window.localStorage.getItem(e),"getHeroDiscountCode",0,e=>m[e],"getHeroDiscountPercentage",0,()=>.15,"getSanitizedProductDescriptionHtml",0,e=>e?e.replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi,"").replace(/<div[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/div>/gi,"").trim():"","getTaxString",0,(e,t)=>{if(!e)return"";let a=f[e];return a?t(a):""},"hasHtmlTextContent",0,e=>!!e&&e.replace(/<[^>]+>/g," ").replace(/&nbsp;/gi," ").replace(/\s+/g," ").trim().length>0,"heroDiscountCodes",0,m,"initialCartContextValue",0,g,"isCartApiSuccess",0,function(e){return!!e&&!("error"in e&&e.error)&&"cart"in e},"makeStoreApiRequest",0,p,"saveToLocalStorage",0,(e,t)=>{window.localStorage.setItem(e,t)}],248335);let b=(0,o.createContext)(g);e.s(["CartContext",0,b],979546)},957263,e=>{"use strict";var t=e.i(191788),a=e.i(510116),r=e.i(859207);let i=async e=>{try{let t=`${a.API_BASE_URL}/api/web_v1/affiliate_partner/${e}/`,r=await fetch(t);return await r.json()}catch(e){}},o=async e=>{let t=e.toLowerCase(),r=a.WEBCMS_API_BASE_URL+`/ultrawork/?search=${t}&page=1&limit=5`;try{let e=await fetch(r,{method:"GET"});if(404===e.status)return null;let t=await e.json();if(t.success)return t;return null}catch(e){return null}},n=async(e,t)=>{let i=a.WEBCMS_API_BASE_URL+`/ultrawork/getCompany/${e.toLowerCase()}`;try{let e=await fetch(i,{method:"GET"});if(404===e.status)return null;let a=await e.json();if(a.success&&"data"in a){if(t&&a.data.discounts_by_store){let e=(0,r.getEffectiveStoreForDiscount)(t);if(e&&a.data.discounts_by_store[e])return{...a.data,discounts:a.data.discounts_by_store[e]}}return a.data}return null}catch(e){return null}},l=async(e,t)=>{try{let r=await fetch(`${a.WEBCMS_API_BASE_URL}/ultrawork/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,companyCode:t})});return await r.json()}catch(e){return console.error("Error generating magic link:",e),{statusCode:500,status:"fail",message:"Error generating magic link"}}},s=async(e,t,r)=>{try{let i=await fetch(`${a.WEBCMS_API_BASE_URL}/ultrawork/verify`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,email:t,companyCode:r})});return await i.json()}catch(e){return console.error("Error verifying token:",e),{statusCode:500,status:"fail",message:"Error verifying token"}}};e.s(["generateUltraworkMagicLink",0,l,"getWorkAffiliate",0,n,"searchWorkAffiliate",0,o,"useAffiliateMetadata",0,e=>{let[a,r]=(0,t.useState)(null);return(0,t.useEffect)(()=>{let t=async()=>{try{let t=await i(e);if("ok"!==t.status)throw Error(t.error.message??"");r({name:t.data.name,code:t.data.code,image:t.data.image,m1Active:t.data.m1_active,ringActive:t.data.ring_active,ringProActive:t.data.ring_pro_active??t.data.ring_active,ringRareActive:t.data.ring_rare_active,ringDieselActive:t.data.ring_diesel_active,homeActive:t.data.home_active,bloodVisionActive:t.data.blood_vision_active,subtitle:t.data.subtitle,landing_page:t.data.landing_page,discount_configs:t.data.discount_config})}catch(e){return{redirect:{destination:"/404"}}}};e&&t()},[e]),{affiliateDetails:a}},"verifyUltraworkToken",0,s])},805049,e=>{"use strict";let t="uh_performance_lab_book_tour_typeform_shown",a="book-tour-scroll-anchor",r=`[data-pl-section="${a}"]`;e.s(["PERFORMANCE_LAB_BOOK_TOUR_AUTO_DELAY_MS",0,7e3,"PL_BOOK_TOUR_SCROLL_ANCHOR_ATTR",0,a,"PL_BOOK_TOUR_SCROLL_ANCHOR_SELECTOR",0,r,"hasPerformanceLabBookTourTypeformBeenShown",0,()=>{try{return"1"===sessionStorage.getItem(t)}catch{return!1}},"markPerformanceLabBookTourTypeformShown",0,()=>{try{sessionStorage.setItem(t,"1")}catch{}}])},912514,861393,e=>{"use strict";var t=e.i(191788),a=e.i(203828);e.i(664157);var r=e.i(271179),i=e.i(307959),o=e.i(153147),n=e.i(957134),l=e.i(979546),s=e.i(592571),d=e.i(805049),c=e.i(391398),u=e.i(760814),f=e.i(510769);let p=u.default.div.withConfig({componentId:"sc-c7d9f10a-0"})`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: calc(100vw - 48px);
  max-width: 500px;
  padding: 56px 32px 32px;
  background: #ffffff;
  border-radius: 16px;
  color: #000000;
  box-sizing: border-box;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    padding: 56px 40px 40px;
    gap: 32px;
  }
`,h=u.default.div.withConfig({componentId:"sc-c7d9f10a-1"})`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,m=u.default.h2.withConfig({componentId:"sc-c7d9f10a-2"})`
  margin: 0;
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.48px;
  color: #000000;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    font-size: 28px;
    letter-spacing: -0.56px;
  }
`,g=u.default.div.withConfig({componentId:"sc-c7d9f10a-3"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,b=u.default.p.withConfig({componentId:"sc-c7d9f10a-4"})`
  margin: 0;
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: -0.2px;
  color: rgba(0, 0, 0, 0.72);
`,y=u.default.button.withConfig({componentId:"sc-c7d9f10a-5"})`
  width: 100%;
  padding: 14px 24px;
  border-radius: 48px;
  border: none;
  background: #1539f5;
  color: #ffffff;
  font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  text-transform: uppercase;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: #0f2ed4;
  }

  &:focus-visible {
    outline: 2px solid #1539f5;
    outline-offset: 2px;
  }
`,C=({onContinue:e})=>{let{t}=(0,r.useTranslation)("performance-lab");return(0,c.jsx)(f.PerformanceLabModalBodyScrollLock,{children:(0,c.jsxs)(p,{role:"dialog","aria-modal":"true","aria-labelledby":"pl-india-purchase-title",children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(m,{id:"pl-india-purchase-title",children:t("indiaPurchaseModal.title","Continue to Performance Lab, Bengaluru")}),(0,c.jsxs)(g,{children:[(0,c.jsx)(b,{children:t("indiaPurchaseModal.descriptionLine1","Ultrahuman Performance Lab is available in Bengaluru, India right now.")}),(0,c.jsx)(b,{children:t("indiaPurchaseModal.descriptionLine2","Coming soon to London, Paris, New York, Abu Dhabi, Sweden and more cities.")})]})]}),(0,c.jsx)(y,{type:"button",onClick:e,"aria-label":t("indiaPurchaseModal.continueAria","Continue to Performance Lab pricing on the India store"),"data-buttontype":"performance_lab_india_purchase_continue",children:t("indiaPurchaseModal.continue","Continue")})]})})};var x=e.i(474508),_=e.i(859207);let w={type:"none",percentage:0,discountCode:"",label:""},S=e=>{if(!e?.lines)return[];let t=e.lines.edges;return t?t.filter(e=>e.node?.attributes?.some(e=>"_product_type"===e.key&&e.value===x.ProductType.PERFORMANCE_LAB)):[]},v=e=>S(e).reduce((e,t)=>e+(t.node?.quantity??0),0),L=(e,t)=>{if(!e?.lines||!t)return null;let a=e.lines.edges;if(!a)return null;let r=`gid://shopify/ProductVariant/${t}`,i=a.find(e=>e.node?.merchandise?.id===r);return i?.node??null},E=(e,t)=>({shopifyVariantId:`gid://shopify/ProductVariant/${e}`,productType:x.ProductType.PERFORMANCE_LAB,discountCode:t||void 0}),T=(e,t)=>{if(!e||!t)return w;let a=(0,_.getEffectiveStoreForDiscount)(_.ShopifyStore.IN)??_.ShopifyStore.IN,r=t.discount_configs?.[a],i=r?.GENERIC??r?.RING;if(!i)return w;let o="percentage"===i.type?i.value:0;return o<=0?w:{type:"affiliate",percentage:o,discountCode:i.code,label:`${o}% OFF APPLIED`}};e.s(["buildPerformanceLabCartLineItem",0,E,"findCartLine",0,L,"getPerformanceLabCartItemCount",0,v,"getPerformanceLabCartLines",0,S,"resolvePerformanceLabAffiliateDiscount",0,T],861393);var A=e.i(957263);let k=/^in(?:-|$)/i,P="/performance-lab/buy",R=["recovery","standalone","iv-therapy","diagnostics"],I="--pl-navbar-offset",O=(e,t)=>{let a="IN"===e.toUpperCase(),r=!!(t&&k.test(t));return a||r},N=(e,t,a)=>{let r,i=(r={},a?.category&&(r.category=a.category),a?.planId&&(r.plan=a.planId),Object.keys(r).length>0?{pathname:P,query:r}:P);return O(e,t)?i:"string"==typeof i?(0,o.addRegionPrefix)(i,"in"):i.pathname?{...i,pathname:(0,o.addRegionPrefix)(i.pathname,"in")}:i},M=()=>{let{region:e,regionSlug:a}=(0,t.useContext)(i.RegionLocaleContext);return(0,t.useMemo)(()=>O(e,a),[e,a])},B=()=>{let e=(0,a.useRouter)(),r=(0,o.useFormatLink)(),i=(0,t.useContext)(n.ModalContext);return(0,t.useCallback)(a=>{i.set(t.default.createElement(C,{onContinue:()=>{i.hide(),i.clear();let t=r(a,{asObject:!0});e.push(t)}})),i.setCloseButtonTheme("light"),i.show()},[i,r,e])};e.s(["PL_NAVBAR_HIDE_TRANSITION_MS",0,300,"PL_NAVBAR_OFFSET_CSS_VAR",0,I,"PL_NAVBAR_OFFSET_FALLBACK",0,"56px","getPerformanceLabCtaPath",0,N,"resolvePerformanceLabBuyCategory",0,(e,t)=>e&&R.includes(e)?e:t&&R.includes(t)?t:void 0,"syncPerformanceLabNavbarOffset",0,e=>{let t=e?Math.ceil(e.getBoundingClientRect().bottom):56;document.documentElement.style.setProperty(I,`${Math.max(0,t)}px`)},"useHandleBookNow",0,e=>{let r=(0,a.useRouter)(),n=M(),{region:l,regionSlug:s}=(0,t.useContext)(i.RegionLocaleContext),d=(0,o.useFormatLink)(),c=B(),u=N(l,s,{category:e?.category});return(0,t.useCallback)(()=>{if(n){let e=d(u,{asObject:!0});r.push(e);return}c(u)},[u,d,n,c,r])},"useHandlePerformanceLabBuyNavigate",0,()=>{let e=(0,a.useRouter)(),r=M(),{region:n,regionSlug:l}=(0,t.useContext)(i.RegionLocaleContext),s=(0,o.useFormatLink)(),d=B();return(0,t.useCallback)(t=>{let a=N(n,l,t);if(r){let t=s(a,{asObject:!0});e.push(t);return}d(a)},[s,r,d,n,l,e])},"useHandlePlanSelect",0,(e,r)=>{let n=(0,a.useRouter)(),s=M(),{region:d,regionSlug:c}=(0,t.useContext)(i.RegionLocaleContext),u=(0,o.useFormatLink)(),f=B(),p=(0,t.useContext)(l.CartContext),[h,m]=(0,t.useState)(!1),g=n.query.affiliateCode,{affiliateDetails:b}=(0,A.useAffiliateMetadata)(g??""),y=(0,t.useMemo)(()=>T(g,b),[g,b]),C=(0,t.useCallback)(()=>{let t=u(N(d,c,{category:r?.category,planId:e.id}),{asObject:!0});n.push(t)},[u,r?.category,e.id,d,c,n]);return{handlePlanSelect:(0,t.useCallback)(async()=>{if(!s)return void f(N(d,c,{category:r?.category,planId:e.id}));if(!e.shopifyVariantId)return void C();if(!L(p.cart,e.shopifyVariantId)){m(!0);try{await p.addToCartSilently([E(e.shopifyVariantId,y.discountCode)])}finally{m(!1)}}},[y.discountCode,p,s,C,f,r?.category,e.id,e.shopifyVariantId,d,c]),isAdding:h}},"useIsIndiaRegion",0,M,"useOpenBookTourModal",0,()=>{let e=(0,t.useContext)(n.ModalContext);return(0,t.useCallback)(()=>{(0,d.markPerformanceLabBookTourTypeformShown)(),e.set(t.default.createElement(s.PerformanceLabTFModal)),e.setCloseButtonTheme("light"),e.show()},[e])},"usePerformanceLabCTALabel",0,(e,t)=>{let{t:a}=(0,r.useTranslation)("performance-lab");return a(e,t)},"usePerformanceLabCartItemCount",0,()=>{let e=(0,t.useContext)(l.CartContext);return(0,t.useMemo)(()=>v(e.cart),[e.cart])}],912514)}]);