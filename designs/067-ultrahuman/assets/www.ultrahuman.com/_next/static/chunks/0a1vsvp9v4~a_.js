(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,719152,777180,e=>{"use strict";var t=e.i(391398),r=e.i(191788),a=e.i(760814),i=e.i(133535);e.i(664157);var n=e.i(271179);let o=(0,r.createContext)({showToast:()=>{},hideToast:()=>{},clearAllToasts:()=>{}}),s=({toast:e,index:r,total:a,onClose:o})=>{let{t:s}=(0,n.useTranslation)("common");return(0,t.jsx)(c,{type:e.type,index:r,total:a,className:"toast-item",children:(0,t.jsxs)("div",{className:"toast-content",children:[(0,t.jsx)("div",{className:"toast-message",children:e.message}),(0,t.jsx)("button",{className:"toast-close",onClick:o,"aria-label":s("toast.button.ariaLabel.closeNotification"),children:(0,t.jsx)(i.CrossDark,{fill:"#ffffff"})})]})})},l=a.keyframes`
  from {
    transform: translateX(100%) translateY(0) scale(1);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 1;
  }
`,d=a.default.div.withConfig({componentId:"sc-3a0ae53d-0"})`
  position: fixed;
  bottom: calc(24px + var(--sticky-bottom-bar-offset, 0px));
  right: 24px;
  z-index: 1100;
  display: flex;
  flex-direction: column-reverse;
  // pointer-events: none;

  &:hover {
    .toast-item:last-child {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      margin-bottom: 12px;
    }

    .toast-item:not(:first-child) {
      transform: translateX(0) translateY(0) scale(1) !important;
      opacity: 1 !important;
      margin-bottom: 12px !important;
    }
  }

  @media (max-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    bottom: calc(24px + var(--sticky-bottom-bar-offset, 0px));
    left: 24px;
    right: 24px;
    align-items: center;
  }
`,c=a.default.div.withConfig({componentId:"sc-3a0ae53d-1"})`
  pointer-events: auto;
  background: rgba(20, 20, 23, 0.7);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-left: 4px solid
    ${({type:e})=>{switch(e){case"error":default:return"#ff4757";case"success":return"#2ed573";case"info":return"#5352ed"}}};
  color: #e4e4e7;
  padding: 14px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  min-width: 280px;
  max-width: 360px;
  position: relative;
  overflow: hidden;
  transform-origin: center bottom;
  margin-bottom: ${({index:e,total:t})=>1===t||0===e?"0":`-${Math.min(6*e,18)}px`};
  transform: ${({index:e,total:t})=>{if(1===t||0===e)return"translateX(0) translateY(0) scale(1)";let r=Math.min(8*e,24),a=Math.max(.85,1-.05*e);return`translateX(0) translateY(${r}px) scale(${a})`}};
  opacity: ${({index:e,total:t})=>1===t||0===e?"1":Math.max(.6,1-.15*e)};
  z-index: ${({index:e})=>1e3-e};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  animation: ${l} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-fill-mode: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({type:e})=>{switch(e){case"error":default:return"#ff4757";case"success":return"#2ed573";case"info":return"#5352ed"}}},
      transparent
    );
    opacity: 0.6;
  }

  @media (max-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    min-width: unset;
    width: 100%;
    max-width: 100%;
    margin: 0 8px;
  }

  .toast-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .toast-message {
    flex: 1;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .toast-close {
    background: none;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    opacity: 0.6;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    flex-shrink: 0;
    margin-left: 8px;

    &:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.08);
      color: #e4e4e7;
      transform: scale(1.05);
    }

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;e.s(["ToastContext",0,o,"ToastProvider",0,({children:e})=>{let[a,i]=(0,r.useState)([]),n=(0,r.useCallback)((e,t="error",r=5e3)=>{let a=`toast-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,n={id:a,message:e,type:t,duration:r};i(e=>[...e,n]),r>0&&setTimeout(()=>{l(a)},r)},[]),l=(0,r.useCallback)(e=>{i(t=>t.filter(t=>t.id!==e))},[]),c=(0,r.useCallback)(()=>{i([])},[]),u=(0,r.useMemo)(()=>({showToast:n,hideToast:l,clearAllToasts:c}),[n,l,c]);return(0,t.jsxs)(o.Provider,{value:u,children:[e,(0,t.jsx)(d,{children:a.map((e,r)=>(0,t.jsx)(s,{toast:e,index:r,total:a.length,onClose:()=>l(e.id)},e.id))})]})}],719152),e.i(350461);var u=e.i(859207);let p={[u.ShopifyStore.IN]:{variantId:"gid://shopify/ProductVariant/40719978790982",checkouturl:""},[u.ShopifyStore.AE]:{variantId:"gid://shopify/ProductVariant/44679292780786",checkouturl:""},[u.ShopifyStore.ROW]:{variantId:"gid://shopify/ProductVariant/40709679317052",checkouturl:""},[u.ShopifyStore.GB]:{variantId:"gid://shopify/ProductVariant/49202716836158",checkouturl:"https://ultrahuman-eu-uk.myshopify.com/cart/49202716836158:1?channel=buy_button"},[u.ShopifyStore.EU]:{variantId:"gid://shopify/ProductVariant/49202716836158",checkouturl:"https://ultrahuman-eu-uk.myshopify.com/cart/49202716836158:1?channel=buy_button"},[u.ShopifyStore.US]:{variantId:"gid://shopify/ProductVariant/40200417050720",checkouturl:"https://stelcore-x-ultrahuman.myshopify.com/cart/40200417050720:1?channel=buy_button"},[u.ShopifyStore.AU]:{variantId:"gid://shopify/ProductVariant/49202716836158",checkouturl:"https://ultrahuman-eu-uk.myshopify.com/cart/49202716836158:1?channel=buy_button"},[u.ShopifyStore.CA]:{variantId:"gid://shopify/ProductVariant/40200417050720",checkouturl:"https://stelcore-x-ultrahuman.myshopify.com/cart/40200417050720:1?channel=buy_button"},[u.ShopifyStore.SA]:{variantId:"gid://shopify/ProductVariant/49202716836158",checkouturl:"https://ultrahuman-eu-uk.myshopify.com/cart/49202716836158:1?channel=buy_button"},[u.ShopifyStore.MX]:{variantId:"gid://shopify/ProductVariant/49202716836158",checkouturl:"https://ultrahuman-eu-uk.myshopify.com/cart/49202716836158:1?channel=buy_button"},[u.ShopifyStore.ZA]:{variantId:"gid://shopify/ProductVariant/49202716836158",checkouturl:"https://ultrahuman-eu-uk.myshopify.com/cart/49202716836158:1?channel=buy_button"}};e.s(["GiftWrappingProductShopifyMap",0,p],777180)},834728,e=>{"use strict";var t=e.i(859207);let r={[t.ShopifyStore.IN]:{Year1:{variantId:"gid://shopify/ProductVariant/43721380167750",alternateVariantId:"gid://shopify/ProductVariant/43721380167750",price:799,discountedPrice:250,discountCode:"DA28GBZKQ771"}},[t.ShopifyStore.AE]:{Year1:{variantId:"gid://shopify/ProductVariant/52870403293555",alternateVariantId:"gid://shopify/ProductVariant/52870403293555",price:149.99,discountedPrice:34.99,discountCode:"73AEW8FGE8EC"}},[t.ShopifyStore.EU]:{Year1:{variantId:"gid://shopify/ProductVariant/56156431024502",alternateVariantId:"gid://shopify/ProductVariant/56156431024502",price:39.99,discountedPrice:9.99,discountCode:"0DC7CX46SWW5"}},[t.ShopifyStore.GB]:{Year1:{variantId:"gid://shopify/ProductVariant/56130469855606",alternateVariantId:"gid://shopify/ProductVariant/56130469855606",price:24.99,discountedPrice:7.99,discountCode:"KA1ZBECARDVA"}},[t.ShopifyStore.ROW]:{Year1:{variantId:"gid://shopify/ProductVariant/43429038751804",alternateVariantId:"gid://shopify/ProductVariant/43429038751804",price:39,discountedPrice:9.99,discountCode:"HKK6SVAG0PF8"}},[t.ShopifyStore.US]:{Year1:{variantId:"gid://shopify/ProductVariant/42245095587936",alternateVariantId:"gid://shopify/ProductVariant/42245095587936",price:39,discountedPrice:9,discountCode:"0G3WSZPJ3007"}},[t.ShopifyStore.AU]:{Year1:{variantId:"gid://shopify/ProductVariant/56130469855606",alternateVariantId:"gid://shopify/ProductVariant/56130469855606",price:24.99,discountedPrice:7.99,discountCode:"KA1ZBECARDVA"}},[t.ShopifyStore.CA]:{Year1:{variantId:"gid://shopify/ProductVariant/42245095587936",alternateVariantId:"gid://shopify/ProductVariant/42245095587936",price:39,discountedPrice:9.99,discountCode:"0G3WSZPJ3007"}},[t.ShopifyStore.SA]:{Year1:{variantId:"gid://shopify/ProductVariant/56156431024502",alternateVariantId:"gid://shopify/ProductVariant/56156431024502",price:39.99,discountedPrice:9.99,discountCode:"0DC7CX46SWW5"}},[t.ShopifyStore.MX]:{Year1:{variantId:"gid://shopify/ProductVariant/56156431024502",alternateVariantId:"gid://shopify/ProductVariant/56156431024502",price:39.99,discountedPrice:9.99,discountCode:"0DC7CX46SWW5"}},[t.ShopifyStore.ZA]:{Year1:{variantId:"gid://shopify/ProductVariant/56156431024502",alternateVariantId:"gid://shopify/ProductVariant/56156431024502",price:39.99,discountedPrice:9.99,discountCode:"0DC7CX46SWW5"}}};e.s(["ClueShopifyMap",0,r])},506504,663337,475703,189753,751172,866809,214073,91147,708173,879865,74481,609097,220358,842319,79377,324298,e=>{"use strict";var t=e.i(391398),r=e.i(191788),a=e.i(203828);e.i(664157);var i=e.i(271179),n=e.i(168489),o=e.i(719152),s=e.i(248335),l=e.i(777180),d=e.i(834728),c=e.i(982702),u=e.i(310640),p=e.i(2987),h=e.i(37515),m=e.i(957263),g=e.i(520685),f=e.i(29282),b=e.i(640077),x=e.i(15912),y=e.i(973528);let w="/api/govx/authorize",v=e=>!!(e&&"US"===e.toUpperCase());e.s(["isGovxEligible",0,v,"openGovxVerify",0,(e,t)=>{(0,y.track)("govx_verify_click",{surface:e,region:t??""});{let e=t?`${w}?region=${encodeURIComponent(t)}`:w;window.location.assign(e)}}],663337);var C=e.i(474508),k=e.i(859207),S=e.i(307959),j=e.i(741315),_=e.i(171225);class I{store;BASE_URL_CART;constructor(e){this.store=e,this.BASE_URL_CART="/api/vendor/shopify/cart/"}async createCart(e){return(0,s.makeStoreApiRequest)(this.store,this.BASE_URL_CART+"create/",e)}async getCart(e){if(!e)throw Error("Cart ID is required");let t=encodeURIComponent(e);return await (0,s.makeStoreApiRequest)(this.store,this.BASE_URL_CART+`?id=${t}`)}async addToCart(e,t,r){return await (0,s.makeStoreApiRequest)(this.store,this.BASE_URL_CART+"add/",{cartId:e,lines:t,discountCodes:r})}async updateCartQuantity(e,t){return await (0,s.makeStoreApiRequest)(this.store,this.BASE_URL_CART+"update/",{cartId:e,lines:t})}async updateCartAttributes(e,t){return await (0,s.makeStoreApiRequest)(this.store,this.BASE_URL_CART+"updateAttributes/",{cartId:e,attributes:t})}async removeFromCart(e,t,r){return await (0,s.makeStoreApiRequest)(this.store,this.BASE_URL_CART+"remove/",{cartId:e,lineId:t,discountCodes:r})}}var E=e.i(979546),P=e.i(153147),N=e.i(562591);let A=(0,n.default)(()=>e.A(328152),{loadableGenerated:{modules:[640008]},ssr:!1});e.s(["CartProvider",0,({children:e,initialCampaigns:n})=>{let y=(0,r.useRef)([]),w=(0,a.useRouter)(),{t:R}=(0,i.useTranslation)("cart"),{showToast:T}=(0,r.useContext)(o.ToastContext),V="/shop"===w.pathname,L=(()=>{let[e,t]=(0,r.useState)(null),[n,o]=(0,r.useState)(null),[u,p]=(0,r.useState)(!1),[h,m]=(0,r.useState)(null),g=(0,a.useRouter)(),{t:f}=(0,i.useTranslation)("cart"),b=(0,r.useCallback)(e=>{t(e),e&&n?w.current=n:e||(w.current=null)},[n]),x=(0,r.useRef)(null),y=(0,r.useRef)(!1),w=(0,r.useRef)(null),v=(0,r.useCallback)(async e=>{if(!n||!e)return;let t=encodeURIComponent(e),r=await (0,s.makeStoreApiRequest)(n,`/api/vendor/shopify/cart/?id=${t}`);if(!r||!("error"in r)||!r.error)return r},[n]),C=(0,r.useCallback)(async(e,t)=>{if(!n||!e||!t)return;let r=await (0,s.makeStoreApiRequest)(n,"/api/vendor/shopify/cart/updateAttributes/",{cartId:e,attributes:t});if(!r||!("error"in r)||!r.error)return r},[n]),k=(0,r.useCallback)(async()=>{if(!n)return;b(null);let e=`cart_${n}`,t=(0,s.getFromLocalStorage)(e);if(t&&!["",void 0,null].includes(t))try{let r=await v(t);if(!r||!(0,s.isCartApiSuccess)(r)||!r.cart||!r.cart.id){(0,s.deleteFromLocalStorage)(e),b(null);return}if(x.current&&x.current.length>0){let a=r.cart.attributes||[],i=new Map;for(let e of a)i.set(e.key,e.value);if(x.current)for(let e of x.current)i.set(e.key,e.value);let n=Array.from(i,([e,t])=>({key:e,value:t})),o=await C(t,n);o&&(0,s.isCartApiSuccess)(o)&&o.cart&&o.cart.id?b(o.cart):((0,s.deleteFromLocalStorage)(e),b(null))}else b(r.cart)}catch(t){console.error("Error updating cart:",t),(0,s.deleteFromLocalStorage)(e),b(null)}},[n]),S=(0,r.useCallback)(()=>{if(b(null),n){let e=`cart_${n}`;(0,s.deleteFromLocalStorage)(e)}},[n]),j=(0,r.useCallback)(()=>{let e=["currency","type","product","affiliateDiscountCode","affiliateName","affiliateDiscountPercentage","affiliateImage"],t=new URLSearchParams(window.location.search),r=[];for(let[a,i]of t.entries())!e.includes(a)&&i&&r.push({key:a,value:i});x.current=r},[]);(0,r.useEffect)(()=>{if(!y.current&&(j(),e&&e.id&&n)){let e=`cart_${n}`,t=(0,s.getFromLocalStorage)(e);t&&x.current&&x.current.length>0&&(y.current=!0,v(t).then(r=>{if(!r||!(0,s.isCartApiSuccess)(r)||!r.cart||!r.cart.id){(0,s.deleteFromLocalStorage)(e),b(null);return}let a=r.cart.attributes||[],i=new Map;for(let e of a)i.set(e.key,e.value);if(x.current)for(let e of x.current)i.set(e.key,e.value);return C(t,Array.from(i,([e,t])=>({key:e,value:t})))}).then(t=>{t&&(0,s.isCartApiSuccess)(t)&&t.cart&&t.cart.id?b(t.cart):((0,s.deleteFromLocalStorage)(e),b(null))}).catch(t=>{console.error("Error updating cart attributes from URL params:",t),(0,s.deleteFromLocalStorage)(e),b(null)}).finally(()=>{y.current=!1}))}},[g.query]);let _=(0,r.useRef)(null);(0,r.useEffect)(()=>{n&&_.current!==n&&(b(null),y.current=!1,_.current=n,k())},[n]),(0,r.useEffect)(()=>{j(),k()},[]),(0,r.useEffect)(()=>{if(e&&"id"in e&&n&&w.current===n){let t=`cart_${n}`;(0,s.saveToLocalStorage)(t,e.id)}},[e,n]),(0,r.useEffect)(()=>{if(!e||!n)return;let t=!0,r=[l.GiftWrappingProductShopifyMap[n].variantId,c.SizingKitShopifyMap[n].shopifyVariantId,d.ClueShopifyMap[n].Year1.variantId];for(let a=0;a<e.lines.edges.length;a++)if(!r.includes(e.lines.edges[a].node.merchandise.id)){t=!1;break}if(t)return void S()},[e,n,S]);let I=(0,r.useMemo)(()=>{let t=s.TaxConfigKey[n];return{taxes:e?.cost?.totalTaxAmount?.amount??0,duty:e?.cost?.totalDutyAmount?.amount??0,taxString:t?f(t):""}},[e?.cost,n,f]);return{cart:e,setCart:b,store:n,setStore:o,cartLoading:u,setCartLoading:p,error:h,setError:m,deleteCartFromLocalStorage:S,updateCart:k,updateCartAttributes:C,urlParams:x.current,...I}})(),{cart:U,setCart:$,store:M,cartLoading:O,setCartLoading:W,error:z,setError:F,deleteCartFromLocalStorage:D,updateCartAttributes:q}=L,{store:B,currency:H,region:G}=(0,r.useContext)(S.RegionLocaleContext),[Y,X]=(0,r.useState)(H||null);(0,r.useEffect)(()=>{B&&L.setStore(B),H&&X(H)},[B,H]);let{cartVisible:K,altContent:Q,setAltContent:J,isUpsellVisible:Z,primaryProductForUpsell:ee,showCart:et,hideCart:er,showUpsellModal:ea,hideUpsellModal:ei}=(()=>{let[e,t]=(0,r.useState)(!1),[a,i]=(0,r.useState)(null),[n,o]=(0,r.useState)(!1),[s,l]=(0,r.useState)(null),d=(0,r.useCallback)(()=>{t(!0)},[]),c=(0,r.useCallback)(()=>{i(null),t(!1)},[]),u=(0,r.useCallback)(e=>{l(e||null),o(!0)},[]),p=(0,r.useCallback)(()=>{o(!1),l(null)},[]);return{cartVisible:e,setCartVisible:t,altContent:a,setAltContent:i,isUpsellVisible:n,setIsUpsellVisible:o,primaryProductForUpsell:s,setPrimaryProductForUpsell:l,showCart:d,hideCart:c,showUpsellModal:u,hideUpsellModal:p}})();(0,r.useEffect)(()=>{V&&Z&&ei()},[V,Z,ei]);let{cartType:en,setCartType:eo,ultrahumanXAdded:es,setUltrahumanXAdded:el,cardioAdaptibilityCart:ed,setCardioAdaptibilityCart:ec,afibCart:eu,setAfibCart:ep}=((e,t)=>{let[a,i]=(0,r.useState)(),[n,o]=(0,r.useState)(null),[s,l]=(0,r.useState)(null),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{if(e?.id){let r=e.lines.edges;for(let{node:e}of(o(null),c(null),l(null),r))(e.merchandise.id===u.uhxVariantIds[t]?.Year1||e.merchandise.id===u.uhxVariantIds[t]?.Year2||e.merchandise.id===u.uhxVariantIds[t]?.Month3)&&o(e),(e.merchandise.id===p.AfibShopifyMap[t]?.Year1.variantId||e.merchandise.id===p.AfibShopifyMap[t]?.Year2.variantId)&&c(e),(e.merchandise.id===h.CardioAdaptibilityShopifyMap[t]?.Year1.variantId||e.merchandise.id===h.CardioAdaptibilityShopifyMap[t]?.Year2.variantId)&&l(e)}},[e,t]),{cartType:a,setCartType:i,ultrahumanXAdded:n,setUltrahumanXAdded:o,cardioAdaptibilityCart:s,setCardioAdaptibilityCart:l,afibCart:d,setAfibCart:c}})(U,M),{campaigns:eh,loading:em,error:eg}=(0,f.useCampaigns)(n),{setDiscountCodes:ef,applicableDiscountCoupons:eb}=((e,t,i,n,o,l=[])=>{let c=(0,a.useRouter)(),{affiliateCode:u}=c.query,{region:p}=(0,r.useContext)(S.RegionLocaleContext),h=u&&!("birthday"===u&&!c.query.discount),{affiliateDetails:y}=(0,m.useAffiliateMetadata)(h?u:""),w=(0,r.useCallback)((r,a={})=>{if(!e)return o.current=[],o.current;let{isM1ProductTypePresent:n,isRingProductTypePresent:u,isRingProProductTypePresent:h,isUhxProductTypePresent:m,removingUhx:w=!1,hasTradeIn:S=!1}=a,j=[...r];if(c.query.discount&&j.push(c.query.discount),c.query.referral){if(t===C.ProductType.RING_PRO||h||c.pathname.startsWith("/ring-pro")){let t=g.ringProReferralCodes[e]?.discountCode;t&&(j=j.filter(t=>t!==g.ringReferralCodes[e]?.discountCode&&t!==g.referralCodes[e]?.discountCode)).push(t)}else if(t===C.ProductType.RING||u){let t=g.ringReferralCodes[e].discountCode;(j=j.filter(t=>t!==g.referralCodes[e]?.discountCode)).push(t)}else if(t===C.ProductType.M1||n){let t=g.referralCodes[e]?.discountCode??"";(j=j.filter(t=>t!==g.ringReferralCodes[e].discountCode)).push(t)}}else if(y){let r,a=(0,k.getEffectiveStoreForDiscount)(e),i=y.discount_configs[a]??{};t===C.ProductType.RING_PRO||h||c.pathname.startsWith("/ring-pro")?r=i.RING_PRO?.code:t===C.ProductType.RING||u||c.pathname.startsWith("/ring")?r=i.RING?.code:t===C.ProductType.M1||n||c.pathname.startsWith("/blood")?r=i.M1?.code:c.pathname.startsWith("/home")&&(r=i.HOME?.code),r&&j.push(r)}let _=(0,b.isM1UhxBundlingEnabled)(e);if(_&&(i||m)&&(t===C.ProductType.M1||n)&&!w&&e){let t=x.ultrahumanXDiscountCodes[e]?.discountCode;t&&!j.includes(t)&&j.push(t)}else if(e&&w){let t=x.ultrahumanXDiscountCodes[e]?.discountCode;t&&(j=j.filter(e=>e!==t))}let I=c.query.heroCategory??"";if(I&&!(I===s.HeroCategoriesMap.VETERANS&&v(p))){let e=(0,s.getHeroDiscountCode)(I);e&&j.push(e)}let E=c.query.discount??"";E&&j.push(E),"clue"===c.query.flow&&e&&d.ClueShopifyMap[e]?.Year1?.discountCode&&j.push(d.ClueShopifyMap[e].Year1.discountCode);let P=c.query.locale??p,N=(0,g.getRingPromoDiscountConfig)({store:e,country:P});e&&(t===C.ProductType.RING||u)&&N?.active&&N?.discountCode;let A=(0,g.getHomePromoDiscountConfig)({store:e,country:c.query.country});c.pathname.startsWith("/home")&&A?.active&&A.discountCode;let R=(0,f.getCampaignByProduct)(l,"ring");if(R&&!S&&(t===C.ProductType.RING||u)){let e=R.discount_code;e&&!j.includes(e)&&j.push(e)}let T=(0,f.getCampaignByProduct)(l,"ring-pro");if(T&&!S&&(t===C.ProductType.RING_PRO||h)){let e=T.discount_code;e&&!j.includes(e)&&j.push(e)}let V=(0,f.getCampaignByProduct)(l,"home");if(V&&c.pathname.startsWith("/home")){let e=V.discount_code;e&&!j.includes(e)&&j.push(e)}let L=(0,f.getCampaignByProduct)(l,"cgm");if(L&&(t===C.ProductType.M1||n)&&!w&&(i||m||!_)){let e=L.discount_code;e&&!j.includes(e)&&j.push(e)}return o.current=[...new Set(j.filter(e=>e))],o.current},[c.query,c.pathname,e,t,n,i,y,!1,p,l]),j=(0,r.useMemo)(()=>n?.discountCodes?.filter(e=>e.applicable)?.map(e=>e.code)??[],[n?.discountCodes]);return{discountCodes:o.current,setDiscountCodes:w,applicableDiscountCoupons:j}})(M,en,es,U,y,eh),[ex,ey]=(0,r.useState)(C.CartFlowScreens.ITEM_LIST),[ew,ev]=(0,r.useState)(C.CartFlow.OG),eC=(0,r.useRef)(!1),[ek,eS]=(0,r.useState)(),{affiliateCode:ej}=w.query,e_=(0,P.useFormatLink)(),eI=`cart_${M}`,eE=w.query.workAffiliate&&w.query.discount;(0,r.useEffect)(()=>{let e=async()=>{if(!eE)return;let e=await (0,m.getWorkAffiliate)(w.query.affiliateCode,M);eS({affiliateCode:e.affiliate_code,discount:e.discounts.ring_discount,discountCode:e.discounts.ring_discount_code})};eE&&e()},[eE,ej,M]);let eP=(0,r.useCallback)(e=>{if(e&&M&&Array.isArray(e.lines.edges)&&e.lines.edges.length>0){if(e.lines.edges.some(e=>e.node.attributes?.some(e=>"_product_type"===e.key&&(e.value===C.ProductType.RING_PRO||"ring_pro"===e.value))))return void eo(C.ProductType.RING_PRO);let t=!1;for(let r=0;r<e.lines.edges.length;r++){let a=e.lines.edges[r].node.merchandise.product.id;if(c.RingAndRelatedProductsIdMap[M]?.includes(a)){t=!0;break}}eo(t?C.ProductType.RING:C.ProductType.M1)}},[M,eo]),eN=(0,r.useCallback)(()=>{},[]),eA=(0,r.useCallback)(e=>(0,f.getCampaignByProduct)(eh,e),[eh]),{addToCartInternal:eR,removeFromCart:eT,deleteFromCart:eV,updateCartQuantity:eL,incrementCartQuantity:eU,createCartWithItem:e$}=((e,t,a,i,n,l,d,p,h,m,g,y,w,v,S)=>{let{cart:E,store:P,setCart:N,deleteCartFromLocalStorage:A,urlParams:R}=e,{showToast:T}=(0,r.useContext)(o.ToastContext),V=(0,r.useCallback)(e=>{let t=e?.find(e=>"_max_quantity"===e.key)?.value;if(!t)return null;let r=Number(t);if(!Number.isFinite(r))return null;let a=Math.floor(r);return a>0?a:null},[]),L=(0,r.useCallback)(e=>{if(!Number.isFinite(e))return null;let t=Math.floor(Number(e));return t>0?t:null},[]),U=(0,r.useCallback)(e=>1===e?"Item already in cart.":`Maximum quantity is ${e} for this item.`,[]),$=(0,r.useCallback)((e,t)=>t?[...e.filter(e=>"_max_quantity"!==e.key),{key:"_max_quantity",value:String(t)}]:e,[]),M=P?new I(P):null,O=(0,r.useCallback)(async(e,r=!0,a)=>{if(!P||!M)return!1;try{let n=await M.createCart({lines:e,attributes:R||[],discountCodes:a||t,countryCode:S&&"ROW"!==S?S:void 0});if(!(0,s.isCartApiSuccess)(n))return T("Failed to add item to cart. Please try again."),!1;if(n.cart)return N(n.cart),g(n.cart),y(),r&&i(),!0;return T("Failed to add item to cart. Please try again."),!1}catch(e){return console.error("Cart creation error:",e),T("Unable to add item to cart. Please check your connection and try again."),!1}},[P,M,t,S,N,g,y,i,T,R]),W=(0,r.useCallback)((e,t)=>{if(!E)return null;let r=E.lines.edges,a=null;return r.forEach(r=>{r.node.merchandise.id===e&&(a={merchandiseId:r.node.merchandise.id,attributes:r.node.attributes,quantity:r.node.quantity});let i=t.productType===C.ProductType.RING,n=["engraving"];!a&&i&&r.node.merchandise.id===t.shopifyVariantId&&t?.params?.noteAttributes?.filter(e=>n.includes(e.key))?.every(e=>r.node.attributes.some(t=>t.key===e.key&&t.value===e.value))&&(a={merchandiseId:r.node.merchandise.id,attributes:r.node.attributes,quantity:r.node.quantity}),!a&&P&&t.shopifyVariantId===r.node.merchandise.id&&(r.node.merchandise.id===c.SizingKitShopifyMap[P].shopifyVariantId||r.node.merchandise.id===c.RingProSizingKitShopifyMap[P].shopifyVariantId||r.node.merchandise.id===u.uhxVariantIds[P].Year1||r.node.merchandise.id===u.uhxVariantIds[P].Year2)&&(a={merchandiseId:r.node.merchandise.id,attributes:r.node.attributes,quantity:r.node.quantity})}),a},[E,P]),z=(0,r.useCallback)(e=>{let t=!1,r=!1,a=!1,i=!1,n=!1,o=!1;for(let s=0;s<e.length;s++)e[s].productType===C.ProductType.M1?t=!0:e[s].productType===C.ProductType.RING?r=!0:e[s].productType===C.ProductType.RING_PRO?a=!0:e[s].productType===C.ProductType.MERCH?i=!0:e[s].productType===C.ProductType.GENERIC?n=!0:e[s].productType===C.ProductType.UHX&&(o=!0);return{isM1ProductTypePresent:t,isRingProductTypePresent:r,isRingProProductTypePresent:a,isMerchProductTypePresent:i,isGenericProductTypePresent:n,isUhxProductTypePresent:o}},[]),F=(0,r.useCallback)(async(e,r=!1,o=!0,l=!1)=>{let d;if(!P||!M)return!1;let c=[],p=[...t];e.forEach(e=>{e.discountCode&&p.push(e.discountCode);let t=W(j.productShopifyIdMap[e.pid]?.shopifyVariantId??e.shopifyVariantId,e),r=Array.isArray(e.params?.noteAttributes)?(e.params?.noteAttributes).map(e=>({key:e.key??e.key,value:e.value??e.value})).filter(e=>"string"==typeof e.key&&e.key.trim().length>0&&"string"==typeof e.value&&e.value.trim().length>0):[],a=L(e.params?.maxQuantity);if(t){let{merchandiseId:e,attributes:i,quantity:n}=t,o=V(i),s=a??o;if(s&&n>=s)return void T(U(s));let l=$(r.length?[...i.filter(e=>!r.some(t=>t.key===e.key)),...r]:i,s);c.push({merchandiseId:e,quantity:1,attributes:l})}else if(void 0!==e.pid){let t=j.productShopifyIdMap[e.pid];if(!t)return!1;let i=$([{key:"_product_type",value:t.productType},...r],a);c.push({merchandiseId:t.shopifyVariantId,quantity:1,attributes:i})}else if(void 0!==e.shopifyVariantId){let t=$([...e.params?.productType?[{key:"_product_type",value:e.params?.productType}]:e.productType?[{key:"_product_type",value:e.productType}]:[],...r],a);c.push({merchandiseId:e.shopifyVariantId,quantity:1,attributes:t})}});let h=l?"upsell":((d=window.location.pathname.replace(/^\/|\/$/g,"").split("/"))[0]&&_.ALL_REGION_SLUGS.includes(d[0])&&d.shift(),d.join("_")||"home");h&&c.forEach(e=>{e.attributes&&!e.attributes.some(e=>"_cart_source"===e.key)&&e.attributes.push({key:"_cart_source",value:h})});let m=e.some(e=>{let t=e.params?.noteAttributes;if(!t)return!1;let r=t.some(e=>"trade_in_device"===e.key&&e.value?.trim()),a=t.some(e=>"trade_in_serial_number"===e.key&&e.value?.trim());return r&&a}),x=z(e),S=!1,I=E?.lines?.edges?.some(e=>e.node.attributes?.some(e=>"_product_type"===e.key&&e.value===C.ProductType.M1));if(x.isM1ProductTypePresent&&!n&&P&&(0,b.isM1UhxBundlingEnabled)(P)){let e=v("cgm"),t=(0,f.getCampaignConfig)(e);t?.active&&(S=!0)}let R=a(p,{...x,isM1ProductTypePresent:x.isM1ProductTypePresent||I,isUhxProductTypePresent:x.isUhxProductTypePresent||!!n||S,hasTradeIn:m});if(S&&P){let e=u.uhxVariantIds[P]?.Year1;e&&c.push({merchandiseId:e,quantity:1,attributes:[{key:"_product_type",value:C.ProductType.UHX}]})}if(!c.length)return!1;let F=E?.id;if(P===k.ShopifyStore.US&&!r&&E?.lines&&F){let t=e.find(e=>e.params?.productType==="BLOOD_VISION"),r=t?.params?.noteAttributes?.find(e=>"_exc_region"===e.key||"_exc_region"===e.key)?.value;if(r){let e=E.lines.edges.map(e=>{let t=e?.node?.attributes;if(!t?.some(e=>e?.key==="_product_type"&&e?.value==="BLOOD_VISION"))return null;let a=t?.find(e=>e?.key==="_exc_region")?.value;return a&&a!==r?e?.node?.id:null}).filter(e=>!!e);if(e.length>0){let t=await M.removeFromCart(F,e,R);if(!(0,s.isCartApiSuccess)(t)||!t.cart?.id)return A(),T("Failed to update cart. Please try again."),!1;N(t.cart),g(t.cart),F=t.cart.id}}}try{if(r||!F)return await O(c,o,R);{let e=await M.addToCart(F,c,R);if(!(0,s.isCartApiSuccess)(e))return A(),T("Failed to add item to cart. Please try again."),!1;if(e.cart)return N(e.cart),g(e.cart),w(0),o&&i(),y(),!0;return A(),T("Failed to add item to cart. Please try again."),!1}}catch(e){return console.error("Add to cart error:",e),A(),T("Unable to add item to cart. Please check your connection and try again."),!1}},[P,M,E,t,a,z,W,N,g,w,i,y,O,T,A,n,v,U,L,V,$]),D=(0,r.useCallback)(async e=>{if(!P||!e||!M||!E)return;let r=E.lines?.edges??[],i=[e],o=(e,t)=>e?.find(e=>e.key===t)?.value,c=r.find(t=>t.node.id===e),u=c?.node?.attributes,g=o(u,"_bundle_id");"1"===o(u,"_is_bundle_parent")&&g&&(i=r.filter(e=>o(e.node.attributes,"_bundle_id")===g).map(e=>e.node.id));let b=[...t],y=x.ultrahumanXDiscountCodes[P]?.discountCode;if(e===n?.id&&y&&b.includes(y)){let e=[...b];e.splice(e.indexOf(y),1),b=a(e,{removingUhx:!0})}if(e===n?.id){let e=v("cgm"),t=(0,f.getCampaignConfig)(e),r=t?.discountCode;if(r&&b.includes(r)){let e=[...b];e.splice(e.indexOf(r),1),b=a(e,{removingUhx:!0})}}if(2===r.length&&n&&e!==n.id&&(i=[...i,n.id]),e===n?.id)for(let{node:t}of r)t.id!==e&&Object.values(j.productShopifyIdMap).some(e=>e.shopifyVariantId===t.merchandise.id&&e.type===j.ProductPurchaseOption.x)&&!i.includes(t.id)&&i.push(t.id);try{let t=await M.removeFromCart(E.id,i,b);if(!(0,s.isCartApiSuccess)(t)||!t.cart)return A(),T("Unable to remove item. Please try again."),!1;N(t.cart),e===n?.id&&l(null),e===d?.id&&p(null),e===h?.id&&m(null);try{t.cart.lines?.edges?.length===0&&(l(null),p(null),m(null))}catch(e){}return!0}catch(e){return console.error("Delete from cart error:",e),A(),T("Unable to remove item. Please try again."),!1}},[P,M,E,n,d,h,t,a,N,l,p,m,T,A]),q=(0,r.useCallback)(async(e,t,r)=>{if(!P||!e||!M||!E?.id)return;let a=E.lines?.edges?.find(t=>t.node.id===e),n=V(a?.node?.attributes),o=t;if(n&&t>n){if(T(U(n)),a?.node?.quantity>=n)return!0;o=n}if(0===t)return await D(e);try{let t=await M.updateCartQuantity(E.id,{id:e,quantity:o,attributes:r});if(!(0,s.isCartApiSuccess)(t)||!t.cart)return A(),T("Unable to update quantity. Please try again."),!1;{N(t.cart);let r=E.lines?.edges?.find(t=>t.node.id===e);return r?.node?.attributes?.find(e=>"_product_type"===e.key)?.value!==C.ProductType.PERFORMANCE_LAB&&i(),!0}}catch(e){return console.error("Update cart quantity error:",e),A(),T("Unable to update quantity. Please try again."),!1}},[P,M,E,N,i,T,A,D,U,V]),B=(0,r.useCallback)(async e=>{if(!P||!e||!M)return;let r=V(e.node?.attributes);if(r&&e.node?.quantity>=r)return T(U(r)),!0;let a=e.node.attributes.findIndex(e=>"sibling_id"===e.key);if(-1===a)await q(e.node.id,e.node.quantity+1);else if(E?.id)try{let r=await M.addToCart(E.id,{merchandiseId:e.node.merchandise.id,quantity:1,attributes:e.node.attributes.splice(a,1)},t);if(!(0,s.isCartApiSuccess)(r))return A(),T("Unable to update quantity. Please try again."),!1;return r.cart&&(N(r.cart),g(r.cart)),w(0),i(),y(),!!r.cart}catch(e){console.error("Increment cart quantity error:",e),A(),T("Unable to update quantity. Please try again.")}},[P,M,E,t,q,N,g,w,i,y,T,A,U,V]);return{addToCartInternal:F,removeFromCart:(0,r.useCallback)(async(e,r,n,o)=>{if(!P||!e||!r||!M)return;let l=[...t];if(o&&l.splice(l.indexOf(o),1),a(l,{}),1===r)return await D(e);if(E?.id)try{let t=await M.updateCartQuantity(E.id,{id:e,quantity:r-1,attributes:n});if(!(0,s.isCartApiSuccess)(t))return A(),T("Unable to remove item. Please try again."),!1;if(t.cart)return N(t.cart),i(),!0;return A(),T("Unable to remove item. Please try again."),!1}catch(e){return console.error("Remove from cart error:",e),A(),T("Unable to remove item. Please try again."),!1}},[P,M,E,t,a,N,i,T,D,A]),deleteFromCart:D,updateCartQuantity:q,incrementCartQuantity:B,createCartWithItem:O}})(L,y.current,ef,et,es,el,eu,ep,ed,ec,eP,eN,ey,eA,G),eM=(0,r.useCallback)(async(e,t,r,a)=>{await eT(e,t,r,a)},[eT]),eO=(0,r.useCallback)(async e=>{await eV(e)},[eV]),eW=(0,r.useCallback)(async(e,t,r)=>{await eL(e,t,r)},[eL]),ez=(0,r.useCallback)(async e=>{await eU(e)},[eU]),eF=(0,r.useCallback)(async e=>{if(M&&e&&U?.id)try{let t=await (0,s.makeStoreApiRequest)(M,"/api/vendor/shopify/cart/add/",{cartId:U.id,lines:{merchandiseId:e,quantity:1},discountCodes:y.current});if(t&&"error"in t&&t.error)return void console.error("[Cart] Add to cart failed:",t);if(t&&t.cart)L.setCart(t.cart),et();else throw Error("Failed to add item to cart")}catch(e){console.error("Add to cart by variant ID error:",e)}},[M,U,y,L,et]),eD=w.query.referral&&M,eq=0;eD&&(eq=en===C.ProductType.M1?g.referralCodes[M]?.discount??0:en===C.ProductType.RING_PRO?g.ringProReferralCodes[M]?.discount??0:g.ringReferralCodes[M]?.discount??0);let eB=(0,r.useCallback)(e=>{if(0===e.length)return;let t=e[e.length-1];if(t.shopifyVariantId)return t.shopifyVariantId},[]),eH=(0,r.useCallback)(async(e,t=!0)=>{if(!await eR(e,!1,!V&&!t))return;if(V)return void T(R("sharedCart.upsell.addedToCart"),"success");let r=e.some(e=>e.productType===C.ProductType.PERFORMANCE_LAB);!t||Z||r||ea(eB(e))},[eR,V,Z,eB,ea,T,R]),eG=(0,r.useCallback)(async e=>{await eR(e,!1,!1,!0)},[eR]),eY=(0,r.useCallback)(async(e=[])=>{e.length>0?await eR(e,!1,!V,!0):V||et(),ei()},[eR,V,et,ei]),eX=(0,r.useCallback)(e=>{if(!U||!("attributes"in U))return;let t=U.attributes.filter(t=>t.key===e)[0];return t?t.value:void 0},[U]),eK=(0,r.useCallback)(e=>{let t;if(U&&"attributes"in U){for(let r=0;r<U.attributes.length;r++)if(U.attributes[r].key===e){t=r;break}return t}},[U]),eQ=(0,r.useCallback)(async e=>{if(U&&U.id&&!eC.current){eC.current=!0,ev(e),e===C.CartFlow.OG&&ey(C.CartFlowScreens.ITEM_LIST),W(!0);try{if(e===C.CartFlow.OG){let e=await q(U.id,[{key:"gift_flow",value:"false"},{key:"giftee_email",value:"null"},{key:"gift_note",value:"null"},{key:"notify_giftee",value:"false"}]);if(e?.cart?.id){$(e.cart);let t=U.lines.edges.filter(e=>e.node.merchandise.id===l.GiftWrappingProductShopifyMap[M].variantId);Array.isArray(t)&&t.length>0&&t[0]&&t[0].node.id&&await eO(t[0].node.id)}else(0,s.deleteFromLocalStorage)(eI)}else if(e===C.CartFlow.GIFT){let e=await q(U.id,[{key:"gift_flow",value:"true"}]);if(e?.cart?.id){$(e.cart);let t=U.lines?.edges??[];t.length>0&&t.every(e=>(0,C.isDigitalProductType)(e.node.attributes?.find(e=>"_product_type"===e.key)?.value))||await eG([{shopifyVariantId:l.GiftWrappingProductShopifyMap[M].variantId,productType:C.ProductType.GENERIC}])}else(0,s.deleteFromLocalStorage)(eI)}}finally{eC.current=!1,W(!1)}}},[U,M,eI,q,$,eO,eG,W]);(0,r.useEffect)(()=>{if(U&&"id"in U&&M){let e=eX("gift_flow"),t=[];if(U?.discountCodes?.forEach(e=>{t.push(e.code)}),ef(t,{}),!O&&!eC.current){if("true"===e)ev(C.CartFlow.GIFT);else if(ev(C.CartFlow.OG),ey(C.CartFlowScreens.ITEM_LIST),U&&U.lines&&U.lines.edges){for(let e=0;e<U.lines.edges.length;e++)if(U.lines.edges[e].node.merchandise.id===l.GiftWrappingProductShopifyMap[M].variantId){eO(U.lines.edges[e].node.id);break}}}}},[U,M,O,eX,ef,ey,eO]);let eJ=ej&&!("birthday"===ej&&!w.query.discount),{affiliateDetails:eZ}=(0,m.useAffiliateMetadata)(eJ?ej:""),e0=eh.length>0,e1=(0,r.useCallback)(async()=>{if(W(!0),!U||!M)return;let e=new URL(U.checkoutUrl);if(eZ){let t=eZ.code;e.searchParams.append("affiliateCode",t),e.searchParams.append("affiliate",t)}let t=new URL(e_(e.toString(),{appendToExternal:!0,asObject:!1}));t.searchParams.set("product_type","cyborg"),t.searchParams.set("store",M||"");try{let e=(0,N.getCookie)("_uh_fbclid");e&&t.searchParams.set("fbclid",String(e));let r=(0,N.getCookie)("_fbp");r&&t.searchParams.set("_fbp",String(r));let a=(0,N.getCookie)("_fbc");a&&t.searchParams.set("_fbc",String(a))}catch(e){}Array.from(t.searchParams.entries()).forEach(([e,r])=>{"email"===e&&t.searchParams.set("checkout[email]",r),t.searchParams.set(`attributes[${e}]`,r)}),(0,s.deleteFromLocalStorage)(eI),w.push(t.toString())},[U,M,eZ,e_,w,W]),e2=(0,r.useMemo)(()=>({cart:U,store:M,currency:Y,setStore:L.setStore,isCartVisible:K,showCart:et,hideCart:er,isUpsellVisible:Z,showUpsellModal:ea,hideUpsellModal:ei,proceedWithUpsell:eY,addToCartSilently:eG,createCartWithItem:e$,addToCart:eH,addToCartByShopifyVariantId:eF,removeFromCart:eM,deleteFromCart:eO,checkout:e1,updateCartAttributes:q,updateCartQuantity:eW,incrementCartQuantity:ez,altContent:Q,setAltContent:J,ultrahumanXAdded:es,referralDiscount:eq,cartFlow:ew,setCartFlow:eQ,cartLoading:O,activeFlowScreen:ex,setActiveFlowScreen:ey,getCartAttributeValue:eX,getCartAttributeIndex:eK,deleteCartFromLocalStorage:D,affiliateDetails:eZ,campaignActive:e0,campaigns:eh,campaignsLoading:em,campaignsError:eg,getCampaignForProduct:eA,error:z,setError:F,applicableDiscountCoupons:eb,setCartType:eo,taxes:L.taxes,duty:L.duty,taxString:L.taxString,cardioAdaptibilityCart:ed,setCardioAdaptibilityCart:ec,afibCart:eu,setAfibCart:ep,cartType:en,workAffiliateDiscount:ek}),[U,M,Y,L,K,et,er,Z,ea,ei,eY,eG,e$,eH,eF,eM,eO,e1,q,eW,ez,Q,J,es,eq,ew,eQ,O,ex,ey,eX,eK,D,eZ,e0,eh,em,eg,eA,z,F,eb,eo,ed,ec,eu,ep,en,ek]);return(0,t.jsxs)(E.CartContext.Provider,{value:e2,children:[e,Z&&(0,t.jsx)(A,{onContinueToCart:e=>eY(e),onClose:ei,primaryVariantId:ee})]})}],506504);let R={firstSeen:"",preExistingUser:!1,sectionVisits:{},subsectionVisits:{},totalVisits:0,lastVisit:"",lastPage:""},T={data:R,isPreExistingUser:!1,firstSeen:"",totalVisits:0,getSectionVisits:()=>0,getSubsectionVisits:()=>0,ringVisits:0,ringBuyVisits:0,homeVisits:0,homeBuyVisits:0},V=(0,r.createContext)(T);e.s(["UserAnalyticsContext",0,V,"useUserAnalyticsContext",0,()=>{let e=(0,r.useContext)(V);return e||(console.warn("[UserAnalytics] useUserAnalyticsContext must be used within a UserAnalyticsProvider. Returning default values."),T)}],475703);var L=e.i(341476);let U="ultrahuman_user_analytics",$=Object.values(k.ShopifyStore).map(e=>e.toLowerCase()),M=["bloodVisionIndiaCart","bloodVisionIndiaPincode","bloodVisionIndiaCheckoutData"],O=()=>{try{let e=window.localStorage.getItem(U);return e?JSON.parse(e):null}catch(e){return console.error("[UserAnalytics] Error reading localStorage:",e),null}},W=e=>{try{window.localStorage.setItem(U,JSON.stringify(e))}catch(e){console.error("[UserAnalytics] Error writing localStorage:",e)}},z=()=>{try{for(let e of $){let t=`cart_${e}`;if(window.localStorage.getItem(t))return!0}if(window.localStorage.getItem("COOKIE_CONSENT"))return!0;for(let e of M)if(window.localStorage.getItem(e))return!0;return!1}catch(e){return console.error("[UserAnalytics] Error checking for existing signals:",e),!1}},F=e=>"/"===e||""===e?"homepage":e.split("/").filter(Boolean)[0]||"other",D=e=>{let t=e.split("/").filter(Boolean);return t.length>=2?`${t[0]}/${t[1]}`:null},q=(e,t)=>{try{window.dataLayer?.push({event:e,...t})}catch(e){console.error("[UserAnalytics] Error pushing to dataLayer:",e)}},B=e=>{let t=new Date().toISOString();return{...R,firstSeen:t,preExistingUser:e,totalVisits:+!!e}},H=()=>{let e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"};e.s(["checkForExistingSignals",0,z,"createInitialData",0,B,"getDeviceType",0,H,"getPageSection",0,F,"getPageSubsection",0,D,"getStorageData",0,O,"pushToDataLayer",0,q,"setStorageData",0,W],189753);let G=e=>{if("function"==typeof window.requestIdleCallback){let t=window.requestIdleCallback(e,{timeout:2e3});return()=>window.cancelIdleCallback(t)}let t=window.setTimeout(e,200);return()=>window.clearTimeout(t)};e.s(["UserAnalyticsProvider",0,({children:e})=>{let i=(()=>{let e=(0,a.useRouter)(),[t,i]=(0,r.useState)(R),n=(0,r.useRef)(!1),o=(0,r.useRef)(!1),s=(0,r.useRef)("");(0,r.useEffect)(()=>{if(!o.current)return o.current=!0,G(()=>{let e=O();if(e&&e.firstSeen)i(e);else{let e=z(),t=B(e);W(t),i(t);let r=e?"user_analytics_returning_user":"user_analytics_new_user",a=e?"userAnalyticsReturningUser":"userAnalyticsNewUser",n={preExistingUser:e,firstSeen:t.firstSeen,device:H()};L.analytics.track(r,n),q(a,n)}})},[]),(0,r.useEffect)(()=>{if(!e.isReady||!t.firstSeen)return;let r=e.pathname;if(!n.current||s.current!==r)return n.current=!0,s.current=r,G(()=>{let e=F(r),a=D(r),n=new Date().toISOString(),o=!t.sectionVisits[e],s=a&&!t.subsectionVisits[a],l=t.preExistingUser&&o?2:1,d=t.preExistingUser&&s?2:1,c={...t,totalVisits:t.totalVisits+1,sectionVisits:{...t.sectionVisits,[e]:(t.sectionVisits[e]||0)+l},subsectionVisits:a?{...t.subsectionVisits,[a]:(t.subsectionVisits[a]||0)+d}:t.subsectionVisits,lastVisit:n,lastPage:r};W(c),i(c);let u={pathname:r,section:e,subsection:a||"none",totalVisits:c.totalVisits,sectionVisits:c.sectionVisits[e],subsectionVisits:a?c.subsectionVisits[a]:0,preExistingUser:c.preExistingUser,device:H()};L.analytics.track("user_analytics_page_visit",u),q("userAnalyticsPageVisit",u)})},[e.isReady,e.pathname,t]),(0,r.useEffect)(()=>{let t=()=>{n.current=!1};return e.events.on("routeChangeStart",t),()=>{e.events.off("routeChangeStart",t)}},[e.events]);let l=(0,r.useCallback)(e=>t.sectionVisits[e]||0,[t.sectionVisits]),d=(0,r.useCallback)(e=>t.subsectionVisits[e]||0,[t.subsectionVisits]);return(0,r.useMemo)(()=>({data:t,isPreExistingUser:t.preExistingUser,firstSeen:t.firstSeen,totalVisits:t.totalVisits,getSectionVisits:l,getSubsectionVisits:d,ringVisits:t.sectionVisits.ring||0,ringBuyVisits:t.subsectionVisits["ring/buy"]||0,homeVisits:t.sectionVisits.home||0,homeBuyVisits:t.subsectionVisits["home/buy"]||0}),[t,l,d])})();return(0,t.jsx)(V.Provider,{value:i,children:e})}],751172);var Y=e.i(760814),X=e.i(402100),K=e.i(78198),Q=e.i(765265);let J=(0,Y.default)(({className:e,onBackToBrowse:r})=>{let{t:a}=(0,i.useTranslation)("cart");return(0,t.jsx)("div",{className:e,children:(0,t.jsxs)("div",{className:"centered",children:[(0,t.jsx)("h3",{children:a("sharedCart.cartUi.emptyTitle")}),(0,t.jsx)("p",{style:{textAlign:"center"},children:a("sharedCart.cartUi.emptyDescription")}),(0,t.jsx)("button",{className:"blue-button",onClick:r,children:a("sharedCart.cartUi.backToBrowse")})]})})}).withConfig({componentId:"sc-20ed0c6d-0"})`
  height: 100%;
  width: 100%;

  .centered {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 24px;

    h3 {
      font-size: 24px;
      font-weight: 500;
    }

    p {
      font-size: 16px;
    }
  }

  .blue-button {
    ${X.BlueButtonCss}
    width: 100%;
    border-radius: var(--button-radius);
    font-weight: 500;

    &:disabled {
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;var Z=e.i(251892);let ee=(0,n.default)(()=>e.A(285138).then(e=>e.CartContent),{loadableGenerated:{modules:[228755]},ssr:!1,loading:()=>(0,t.jsx)("div",{role:"status","aria-label":"Loading cart",style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:240,padding:24}})}),et=(0,Y.default)(({className:e})=>{let{cart:a,isCartVisible:i,altContent:n,hideCart:o}=(0,r.useContext)(E.CartContext);return(0,t.jsx)("div",{className:`${e} ${i?"active":""}`,onClick:o,"aria-hidden":"true","data-testid":"cart",children:(0,t.jsxs)("div",{className:"content",onClick:e=>{e.stopPropagation()},"aria-hidden":"true",children:[a&&a?.lines&&a?.lines.edges&&a?.lines.edges.length>=1&&(0,t.jsx)(Z.ErrorBoundary,{name:"cart-content",resetKeys:[a.lines.edges.length],fallback:(0,t.jsx)(J,{onBackToBrowse:o}),children:(0,t.jsx)(ee,{})}),(!a||!a?.lines||!a?.lines.edges||!(a?.lines.edges.length>=1))&&(0,t.jsx)(J,{onBackToBrowse:o}),n&&(0,t.jsxs)("div",{className:"overlay-content",children:[(0,t.jsxs)("h2",{children:[" ",(0,t.jsx)("button",{className:"close-btn",onClick:o??null,children:"×"})]}),n]})]})})}).withConfig({componentId:"sc-8e08e23d-0"})`
  ${Q.cartContentVars}

  /* Cart Container Styles - Overlay and Positioning */
  letter-spacing: -0.04em;
  z-index: -1;
  display: none;
  opacity: 0;
  transition: all 0.1s ease-in-out;
  overscroll-behavior: contain;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 100dvh;

  background: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(54px);
  backdrop-filter: blur(54px);

  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    justify-content: flex-end;
    padding: 24px;

    .mobile-only {
      display: none;
    }
  }

  &.active {
    z-index: 1001;
    display: flex;
    opacity: 1;

    & .content {
      transform: translateX(0);
    }
  }

  /* Content Container Styles */
  & .content {
    background: rgba(255, 255, 255, 0.7);
    // backdrop-filter: blur(100px);
    width: 100%;
    border-radius: 0;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    // box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
    transform: translate(0, 25%);
    transition: all 0.2s ease-in-out;
    color: #000000;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      width: 500px;
      border-radius: 16px;
      transform: translate(25%, 0);
    }

    /* Overlay Content Styles */
    .overlay-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      -webkit-backdrop-filter: blur(50px);
      backdrop-filter: blur(50px);
      border: red 1px solid;

      h2 .close-btn {
        height: 100%;
        border: none;
        background: transparent;
        align-items: center;

        svg,
        img {
          width: 16px;
          height: auto;
        }
      }

      h2 {
        position: relative;
        font-size: 32px;
        font-weight: 500;
        height: 60px;
        border-bottom: 1px solid rgb(245, 245, 250);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px;
      }
    }

    .img-section {
      display: flex;
      flex-direction: column;
      ${(0,X.backgroundImageMixin)({image:(0,K.getCompressedAssetUrl)("/web/cart_subs_upsell_bg.png")})};
      background-size: contain;
      aspect-ratio: 160 / 49;
      width: auto;
      height: auto;
      margin-top: 16px;
      justify-content: center;
      align-items: center;

      .img-section-content {
        color: rgb(255, 255, 255);
        font-size: 14px;
        text-align: center;
        width: 78%;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);

        .over-line {
          text-decoration-line: line-through;
          text-decoration-style: solid;
        }

        .highlight-text {
          font-weight: 500;
        }
      }
    }
  }
`;e.s(["Cart",0,et],866809);var er=e.i(940290),ea=e.i(175650),ei=e.i(121666),en=e.i(126019),eo=e.i(546737);let es="+447455746726",el={IN:"1800-102-8693",AE:"8000-357-03249",GB:es,US:"+17247050275",CA:"+14387032156",LT:"8002-3371"};e.s(["DEFAULT_PHONE_NUMBER",0,es,"PHONE_NUMBER_BY_COUNTRY",0,el,"US_ADDRESS",0,{streetAddress:"8 The Green, Suite 7640",addressLocality:"Dover",addressRegion:"DE",postalCode:"19901",addressCountry:"US"}],214073);var ed=e.i(657232),ec=e.i(519230),eu=e.i(111869),ep=e.i(957134),eh=e.i(972455);let em=(0,Y.default)(({className:e,setFlow:a,setUserLoc:n})=>{let{t:o}=(0,i.useTranslation)("common"),s=(0,r.useRef)(null),l=(0,r.useRef)(null);return(0,r.useEffect)(()=>{l&&l.current?.stop()},[]),(0,eh.useLottieAnimation)(s,{path:"/Precise-location-animation.json",renderer:"svg",loop:!0,autoplay:!1,onInstance:e=>{l.current=e}}),(0,t.jsxs)("div",{className:e,children:[(0,t.jsx)("div",{className:"location-img-container",children:(0,t.jsx)("div",{className:"tracker",ref:s})}),(0,t.jsxs)("div",{className:"location-content-container",children:[(0,t.jsx)("h3",{children:o("locationAccessPopup.subheading.weNeedAccess")}),(0,t.jsx)("p",{children:o("locationAccessPopup.text.pleaseGrantLocation")}),(0,t.jsx)("button",{className:"cta primary",onClick:function(e){e?.target&&(e.target.disabled=!0,l.current?.play()),window?.navigator&&window.navigator.geolocation.getCurrentPosition(e=>{n&&a&&(n(e),a("LOCATION_PERMISSION_GIVEN"))},e=>{n&&a&&(n(null),a("LOCATION_PERMISSION_DENIED"))},{timeout:1e4})},children:o("locationAccessPopup.button.gotIt")})]})]})}).withConfig({componentId:"sc-2878ddf3-0"})`
  border: 0.6px solid rgba(0, 0, 0, 0.09);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.32) 49.87%,
    rgba(153, 153, 153, 0.32) 100%
  );
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    max-width: 59.7rem;
    height: 595px;
    border-radius: 28px;
    margin: 0.8rem;
  }

  .location-img-container {
    position: relative;
    height: 100%;
    width: 100%;
    background-image: url(/locationBg.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      height: 55%;
    }

    .tracker {
      position: relative;
      top: 20%;
      height: 28rem;
      width: 28rem;

      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        top: 12%;
      }

      img {
        aspect-ratio: 1/1;
      }

      svg {
        aspect-ratio: 1/1;
      }
    }
  }

  .location-content-container {
    position: relative;
    height: 47%;
    width: calc(100% - 1.6rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    padding-bottom: 3.2rem;
    text-align: center;

    @media (max-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      top: -6%;
    }

    h3 {
      color: #000;
      font-size: 24px;
      letter-spacing: -0.96px;
      font-style: normal;
      font-weight: 500;
      line-height: 110%; /* 35.2px */
      max-width: 87%;

      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        font-size: 32px;
        letter-spacing: -1.28px;
      }
    }

    p {
      color: #000;
      text-align: center;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%; /* 16.9px */
      letter-spacing: -0.39px;
      max-width: 82%;

      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        max-width: 58%;
      }
    }

    .cta {
      display: inline-block;
      padding: 0.9rem 4rem;
      font-size: ${({theme:e})=>e.typographyV2.fontSize.extrasmall};
      font-weight: 500;
      cursor: pointer;
      margin-top: 12px;
      background: transparent;
      border: none;
      text-align: center;
      font-style: normal;
      line-height: 16px; /* 123.077% */
      letter-spacing: -0.39px;

      &.primary {
        color: #fff;
        border-radius: 8px;
        background: #306fdb;
        box-shadow: 0px 1px 2px 0px #4aa8ff inset;

        transition: all 0.2s ease-in-out;

        &:hover {
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
        }

        &:disabled {
          background: #306fdbd0;
          cursor: not-allowed;
        }

        @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
          margin-top: 16px;
        }
      }
    }
  }
`,eg=["TW"],ef=({code:e,size:r=20})=>{if(!e||eg.includes(e.toUpperCase()))return null;let a=`/circle-flag-icons/${e.toLowerCase()}.svg`;return(0,t.jsx)(en.default,{src:a,alt:`${e} flag`,width:r,height:r,style:{borderRadius:"50%"}})};e.s(["FlagIcon",0,ef,"getFlagSrc",0,e=>!e||eg.includes(e.toUpperCase())?null:`/circle-flag-icons/${e.toLowerCase()}.svg`],91147);let eb=({selectedCountry:e,countries:a,onSelect:n})=>{let[o,s]=(0,r.useState)(!1),l=(0,r.useRef)(null),d=a.find(t=>t.iso===e),{t:c}=(0,i.useTranslation)("common");return(0,r.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&s(!1)};return o&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[o]),(0,t.jsxs)("div",{className:"country-selector",ref:l,children:[(0,t.jsxs)("button",{type:"button",className:"country-dropdown-trigger",onClick:()=>s(!o),children:[(0,t.jsxs)("span",{className:"country-dropdown-label",children:[d&&(0,t.jsx)(ef,{code:d.iso,size:18}),d?.country||e]}),(0,t.jsx)(en.default,{src:"/selectArrowDown.svg",alt:c("retailStoreListing.image.alt.arrow"),width:20,height:20})]}),o&&(0,t.jsx)("div",{className:"country-dropdown-options",children:a.map(r=>(0,t.jsxs)("button",{type:"button",className:`country-dropdown-option ${r.iso===e?"selected":""}`,onClick:()=>{n(r.iso),s(!1)},children:[(0,t.jsx)(ef,{code:r.iso,size:18}),r.country]},r.iso))})]})},ex=(0,Y.default)(({className:e,setCountry:a,setFlow:n,chosenCountry:o,userLoc:s})=>{let{region:l}=(0,r.useContext)(S.RegionLocaleContext),{t:d}=(0,i.useTranslation)("common"),[c,u]=(0,r.useState)([]),[p,h]=(0,r.useState)([]),[m,g]=(0,r.useState)(null),[f,b]=(0,r.useState)(!1),[x,y]=(0,r.useState)(""),[w,v]=(0,r.useState)(!1),[C,k]=(0,r.useState)([]),[j,_]=(0,r.useState)(null);(0,r.useEffect)(()=>{fetch("/api/stores/countries").then(e=>{if(!e.ok)throw Error(`Failed to fetch countries: ${e.status}`);return e.json()}).then(e=>{h(e.countries.filter((e,t,r)=>t===r.findIndex(t=>t.iso===e.iso)))}).catch(e=>{console.error("Error loading countries:",e),h([])})},[]);let I=async(e,t=1)=>{b(!0);try{let r=`/api/stores/countries/${e}?page=${t}&limit=20`;s&&(r+=`&lat=${s.coords.latitude}&lng=${s.coords.longitude}`);let a=await fetch(r);if(!a.ok)throw Error(`Failed to fetch stores: ${a.status}`);let i=await a.json(),n=i.data||i,o=n.stores||[],l=n.pagination||{};1===t?(u(o),g(l)):(u(e=>[...e,...o]),g(()=>({...l,currentPage:t,hasNextPage:l.hasNextPage})))}catch(e){console.error("Error loading stores:",e),u([]),g(null)}finally{b(!1)}},E=async(e,t,r=1)=>{if(e.length<3){k([]),_(null),v(!1);return}v(!0);try{let a=`/api/stores/countries/${t}/search?q=${encodeURIComponent(e)}&page=${r}&limit=20`;s&&(a+=`&lat=${s.coords.latitude}&lng=${s.coords.longitude}`);let i=await fetch(a);if(!i.ok)throw Error(`Failed to search stores: ${i.status}`);let n=await i.json(),o=n.data||n,l=o.stores||[],d=o.pagination||{};1===r?k(l):k(e=>[...e,...l]),_(d)}catch(e){console.error("Error searching stores:",e),k([]),_(null)}finally{v(!1)}},N=()=>{y(""),k([]),_(null),v(!1)};(0,r.useEffect)(()=>{let e=o||l;e&&p.some(t=>t.iso===e)&&I(e,1)},[o,l,p]),(0,r.useEffect)(()=>{let e;return x&&x.length>=3?e=setTimeout(()=>{let e=o||l;e&&E(x,e,1)},500):""===x&&N(),()=>{e&&clearTimeout(e)}},[x,o,l]);let A=e=>{let t=e.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)||[e];if(t.length>1){let e=t.slice(1);return e[5]=12>+e[0]?" AM":" PM",e[0]=String(e[0]%12||12),"00"===e[2]&&e.splice(1,3),e.join("")}return e};return(0,t.jsxs)("div",{className:e,children:[(0,t.jsxs)("div",{className:"sticky-header",children:[(0,t.jsx)("h2",{className:"head",children:d("retailStoreListing.heading.buyUltrahumanPartner")}),s?.coords?null:(0,t.jsx)("p",{className:"sub-head",children:d("retailStoreListing.text.findNearStores")}),(0,t.jsx)(eb,{selectedCountry:o||l,countries:p,onSelect:e=>{a&&n&&(u([]),a(e),n("COUNTRY_SELECTOR"),N())}}),(0,t.jsx)("div",{className:"search-container",children:(0,t.jsxs)("div",{className:"search-input-wrapper",children:[(0,t.jsx)("input",{type:"text",placeholder:d("retailStoreListing.input.placeholder.searchStoresName"),value:x,onChange:e=>y(e.target.value),className:"search-input"}),x&&(0,t.jsx)("button",{onClick:N,className:"clear-search-btn",type:"button",children:"✕"})]})}),(0,t.jsxs)("div",{className:"city-info",children:[(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"9",height:"13",viewBox:"0 0 9 13",fill:"none",children:(0,t.jsx)("path",{d:"M4.49998 0C2.30467 0 0.5 1.71192 0.5 4.15383C0.5 5.02527 0.705265 5.63147 1.08654 6.30287L4.23075 11.8413C4.25737 11.8894 4.29638 11.9295 4.34372 11.9574C4.39107 11.9853 4.44503 12 4.49998 12C4.55494 12 4.6089 11.9853 4.65624 11.9574C4.70359 11.9295 4.7426 11.8894 4.76921 11.8413L7.91343 6.30287C8.29471 5.63146 8.49997 5.02526 8.49997 4.15383C8.49997 1.71192 6.6953 0 4.49998 0ZM4.49998 2.15384C5.51958 2.15384 6.34613 2.98039 6.34613 3.99998C6.34613 5.01956 5.51958 5.84613 4.49998 5.84613C3.48039 5.84613 2.65384 5.01956 2.65384 3.99998C2.65384 2.98039 3.48039 2.15384 4.49998 2.15384Z",fill:"black"})}),(0,t.jsx)("p",{className:"city-name"}),(0,t.jsx)("div",{className:"bullet-point"}),(0,t.jsx)("p",{className:"country-name",children:w?d("retailStoreListing.text.searching"):x&&x.length>=3?d("retailStoreListing.text.storesFoundForQuery",{count:j?.totalItems||C?.length||0,query:x}):d("retailStoreListing.text.storesFound",{count:m?.totalItems||c?.length||0})})]})]}),(0,t.jsx)("div",{className:"store-container",children:(x&&x.length>=3?C:c)?.map((e,r)=>{var a,i;return(0,t.jsxs)(t.Fragment,{children:[l===o&&s&&r>0&&!(x&&x.length>=3)&&(x&&x.length>=3?C:c)[r-1]?.isNear&&!e.isNear?(0,t.jsx)("div",{className:"separator",children:(0,t.jsx)("p",{children:d("retailStoreListing.text.otherStoresYour")})}):null,(0,t.jsxs)("div",{className:`store ${s&&0===r&&l===o?"nearest":e.isNear?"near":"others"}`,children:[(0,t.jsxs)("div",{className:"store-name",children:[" ",(0,t.jsx)(en.default,{src:"/store-icon.svg",alt:d("retailStoreListing.image.alt.storeIcon"),width:16,height:16,style:{position:"relative",top:"0.3rem"}})," ",(0,t.jsx)("h3",{children:e.retailPartnerName})]}),(0,t.jsxs)("div",{className:"store-info",children:[(0,t.jsx)("p",{children:e?.city}),l===o&&s&&0==r&&(0,t.jsx)("p",{className:"tag",children:d("retailStoreListing.text.nearest")}),o===l&&s?(0,t.jsx)(P.default,{className:"store-directions lg-none",target:"_blank",href:e.gMapUrl,"data-buttontype":"ring homepage buy",children:d("retailStoreListing.link.getDirections")}):null]}),new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})<e.storeOpenTime?(0,t.jsx)("p",{className:"store-opens-at",children:d("retailStoreListing.text.opensAt",{time:A(e.storeOpenTime)})}):new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})>e.storeClosingTime?(0,t.jsx)("p",{className:"store-opens-at",children:d("retailStoreListing.text.opensAtTomorrow",{time:A(e.storeOpenTime)})}):(0,t.jsx)("p",{className:"product-availability",children:e?.inStore?d("retailStoreListing.text.availableToday"):d("retailStoreListing.text.available")}),o===l&&s&&e.isNear&&(0,t.jsxs)(P.default,{className:"cta primary uber ",target:"_blank",href:(a=e.lat,i=e.long,`https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${a}&dropoff[longitude]=${i}`),"data-buttontype":"ring homepage buy",children:[(0,t.jsx)(en.default,{src:"/UberIcon.png",alt:d("retailStoreListing.image.alt.uberImg"),width:25,height:18})," ",(0,t.jsx)("p",{children:d("retailStoreListing.text.bookUber")})]}),l!==o&&e.gMapUrl?(0,t.jsx)(P.default,{className:"cta primary",target:"_blank",href:e.gMapUrl,"data-buttontype":"ring homepage buy",style:{position:"absolute",bottom:"0",right:"0",margin:"1.6rem"},children:d("retailStoreListing.link.getDirections")}):null,l===o?(0,t.jsx)(P.default,{className:"cta primary sm-none",target:"_blank",href:e.gMapUrl,"data-buttontype":"ring homepage buy",style:{position:"absolute",bottom:"0",right:"0",margin:"1.6rem"},children:d("retailStoreListing.link.getDirections")}):null,l!==o||s?null:(0,t.jsx)(P.default,{className:"cta primary lg-none",target:"_blank",href:e.gMapUrl,"data-buttontype":"ring homepage buy",style:{position:"absolute",bottom:"0",right:"0",margin:"1.6rem"},children:d("retailStoreListing.link.getDirections")}),l===o&&s?(0,t.jsx)("p",{className:"store-distance",children:e.distanceFormatted||""}):null]},e.lat)]})})}),(x&&x.length>=3?j?.hasNextPage||C.length>0&&!j:m?.hasNextPage||c.length>0&&!m)&&(0,t.jsx)("div",{className:"load-more-container",children:(0,t.jsx)("button",{className:"load-more-btn",onClick:()=>{let e=o||l;x&&x.length>=3?e&&j&&E(x,e,j.currentPage+1):e&&m?I(e,m.currentPage+1):e&&I(e,2)},disabled:f||w,children:f||w?d("retailStoreListing.button.loading"):x&&x.length>=3?j?d("retailStoreListing.button.showMoreCount",{count:j.totalItems-C.length}):d("retailStoreListing.button.showMore"):m?d("retailStoreListing.button.showMoreCount",{count:m.totalItems-c.length}):d("retailStoreListing.button.showMore")})})]})}).withConfig({componentId:"sc-64b2d23c-0"})`
  padding: 2rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  width : 100%
  height: 100%;
  position: relative;
  overflow-y: auto;
  ${X.hideScrollbar}

  /* Mobile fixed header - now works with modal support */
  @media(max-width: 768px) {
    /* Ensure parent container supports scrolling */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; 
    position: relative;
    
    .sticky-header {
      position: fixed; 
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000; 
      background-color: white;
      padding-top: 2rem; 
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
      width: 100vw; 
      padding-left: 1.6rem;
      padding-right: 1.6rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      margin: 0;
    }
    
    /* Add padding to store container to account for fixed header */
    .store-container {
      padding-top: 240px; 
    }
  }

  /* Tablet and smaller - only for tablets, not mobile */
  @media(min-width: 769px) and (max-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    .sticky-header {
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: white;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 1rem;
      width: 100%;
      transform: translate3d(0, 0, 0);
      will-change: transform;
      padding-left: 1.6rem;
      padding-right: 1.6rem;
      margin-left: -1.6rem;
      margin-right: -1.6rem;
    }
  }

  @media(min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    height: 59.5rem;
    width: 59.7rem;
    padding: 0 6.2rem 3.2rem;
    
    .sticky-header {
      position: sticky;
      padding-top: 3.2rem;
      top: 0;
      z-index: 10;
      background-color: white;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 1rem;
      width: 100%;
      transform: translateZ(0);
      will-change: transform;
    }
  }



  .store-name{
    display: flex;
    gap: 0.4rem;
    width: 85%;
  }

  .gradient-container {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    bottom: 0;
    left: 0;
    border: 1px solid red;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 77.5%);
    background: red;
  }

  .head {
    width: 90%;
    color: #000;
    font-size: 24px;
    letter-spacing: -0.96px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      width: 100%;
      font-size: 2.8rem;
      letter-spacing: -1.28px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }

  .sub-head {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 16.9px */
    letter-spacing: -0.52px;
    color: rgba(0, 0, 0, 0.80);
    width: 90%;
    margin-top: 0.8rem;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        width: 100%;
        justify-content: center;
        text-align: center;
        margin-top: 0.4rem;
      }


    span {
        
      button {
        background: transparent;
        border: none;
        text-decoration-line: underline;
        cursor: pointer;
      }
    }
  }

  .country-selector {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 1.6rem;
    width: 70%;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      justify-content: center;
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }

    .country-dropdown-trigger {
      background: #fff;
      color: #000;
      font-size: 14px;
      font-weight: 500;
      line-height: 130%;
      letter-spacing: -0.28px;
      outline: none;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 4rem;
      padding: 0.5rem 0.8rem 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .country-dropdown-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .country-dropdown-options {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 100;
      background: #fff;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.08);
      max-height: 240px;
      overflow-y: auto;
      ${X.hideScrollbar}
    }

    .country-dropdown-option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      background: #fff;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      color: #000;
      text-align: left;

      &:first-child {
        border-radius: 12px 12px 0 0;
      }
      &:last-child {
        border-radius: 0 0 12px 12px;
      }
      &:hover {
        background: #f2f2f2;
      }
      &.selected {
        font-weight: 600;
        background: #f7f7f7;
      }
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      justify-content: center;
    }

    .search-input-wrapper {
      position: relative;
      width: 70%;
      display: flex;
      align-items: center;

      .search-input {
        width: 100%;
        height: 4rem;
        padding: 0.5rem 1rem;
        padding-right: 3rem; /* Space for clear button */
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 130%;
        letter-spacing: -0.28px;
        background: #fff;
        color: #000;
        outline: none;
        transition: border-color 0.2s ease;

        &::placeholder {
          color: rgba(0, 0, 0, 0.5);
        }

        &:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
        }
      }

      .clear-search-btn {
        position: absolute;
        right: 0.8rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        font-size: 16px;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  .city-info {
    display: flex;
    gap: 0.7rem;
    align-items: center;
    color: #000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    margin: 1.3rem 0 3rem 0;
    letter-spacing: 0.36px;
    text-transform: uppercase;

    @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
      justify-content: center;
      margin: 1.6rem 0 2.5rem 0;
    }

    .bullet-point {
      background-color: #00000080;
      display: inline;
      position: relative;
      margin: 0 0.8rem 0 0.3rem;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 0.5rem;
        height: 0.5rem;
        background-color: #00000090;
        border-radius: 100%;
      }
    }
  }

  .store-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding-bottom: 3.2rem;

    .nearest{
        border-radius: 16px;
border: 2px solid rgba(255, 255, 255, 0.05);
background: #FFF;
box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
    }

    .others{
        border-radius: 16px;
        background: #F7F7F7;
    }

    .near{
        border-radius: 16px;
        border: 1px solid rgba(0, 0, 0, 0.10);
    }

    .separator{
      position: relative;
      padding: 2.4rem 0;
      width : 100%;
      height: 4.8rem;

      color: rgba(0, 0, 0, 0.50);
display: flex;
justify-content : center;
align-items: center;


p{
  position: relative;
  width: fit-content;
  text-align: center;
  background : #fff;
  font-size: 11px;
font-style: normal;
font-weight: 500;
line-height: 100%; /* 11px */
letter-spacing: 0.33px;
text-transform: uppercase;
z-index: 9;
padding: 0 1rem;
}

      &::before{
        content: "";
       display: block;
       width : 100%;
       height : 1px;
       position: absolute;
       top : 50%;
       background: rgba(0, 0, 0, 0.10);
       z-index: 9;
      }

    }

    .store {
      display: flex;
      padding: 1.6rem 1.6rem 2rem 1.6rem;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 16px;
      position: relative;
      overflow: visible;


      h3 {
        width: 72%;
        color: #000;
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 130%; /* 20.8px */
        letter-spacing: -0.64px;
      }

      .store-distance {
        padding: 1.6rem;
        font-size: 1.4rem;
        position: absolute;
        top: 0;
        right: 0;
        color: #000;
        font-style: normal;
        font-weight: 400;
        line-height: 90%; /* 12.6px */
        letter-spacing: -0.56px;
        z-index: 1;
        border-radius: 0 16px 0 8px;
      }

      .tag{
        border-radius: 4px;
background: rgba(5, 255, 0, 0.70);
padding : 0.2rem 0.3rem;
        color: #000;
font-size: 10px;
font-style: normal;
font-weight: 500;
line-height: 100%; /* 10px */
letter-spacing: -0.4px;
      }

      .store-info {
        margin: 0.4rem 0 4.8rem 0;
        display: flex;
        gap: 0.4rem;
        color: #000;
        font-size: 12px;
        font-style: normal;
        line-height: 130%; /* 15.6px */
        font-weight: 500;
        line-height: 130%; /* 15.6px */
        letter-spacing: -0.24px;

        @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
          margin: 0.4rem 0 2.4rem 0;
        }


        .store-directions{
          padding-left: 1.6rem;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 130%; /* 15.6px */
          letter-spacing: -0.24px;
          text-decoration-line: underline;
        }
      }

      .store-opens-at {
        color: rgba(0, 0, 0, 0.8);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        letter-spacing: -0.56px;
      }

      .product-availability {
        color: #008d0f;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        letter-spacing: -0.56px;
      }

      .lg-none {
        display: inline-block !important;
        @media (min-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
          display: none !important;
        }
      }

      .sm-none {
        display: none !important;
        @media (min-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
          display: inline-block !important;
        }
      }

      .cta {
        display: inline-block;
        padding: 0.8rem;
        font-size: ${({theme:e})=>e.typographyV2.fontSize.extrasmall};
        font-weight: 500;
        cursor: pointer;

        margin-top: 12px;
        background: transparent;
        border: none;

        color: #000;
        text-align: center;
        font-style: normal;
        font-weight: 500;
        line-height: 16px; /* 123.077% */
        letter-spacing: -0.39px;

        &.primary {
          color: #000000;
          border-radius: 28px;
          background: rgba(0, 0, 0, 0.05);

          transition: all 0.2s ease-in-out;

          &:hover {
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
          }

          @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
            margin-top: 16px;
          }
        }

        &.secondry {
          color: #ffffff;
          font-size: 1.6rem;
          background: transparent;
          margin-top: 8px;

          img,
          svg {
            height: 9px;
            width: auto;
          }
        }
      }

      .uber{
        display : flex;
        flex-direction: row;
        gap: 0.4rem;
        position: absolute ;
        bottom: 0;
        right: 0;
        margin: 1.6rem;
        lineHeight: 1.8rem;
        justify-content: center;
        align-items: center;

        @media (min-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
          display: none !important;
        }

        p{
          display: inline;
        }

        img{
          object-fit: contain;
        }
      }

      .store-address {
        font-size: 1.8rem;
        color: #0e0e0e;
      }
    }
  }

  .load-more-container {
    position: sticky;
    bottom: 28px;
    z-index: 10;    
    display: flex;
    justify-content: center;
    padding: 1rem 0;

    @media (min-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
     bottom: 0;
    }

    .load-more-btn {
      margin: 0 auto;
      padding: 4px 8px;
      background: #000;
      color: white;
      border: none;
      border-radius: 28px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.20);
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.36px;
      cursor: pointer;
      opacity: 1;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
  }
`,ey=()=>{let{region:e}=(0,r.useContext)(S.RegionLocaleContext),[a,i]=(0,r.useState)(null),[n,o]=(0,r.useState)(null),[s,l]=(0,r.useState)(null);switch((0,r.useEffect)(()=>{n?.coords&&l("LOCATION_PERMISSION_GIVEN")},[]),(0,r.useEffect)(()=>{!a&&e&&i(e)},[e]),s){case"LOCATION_PERMISSION_GIVEN":case"LOCATION_PERMISSION_DENIED":return(0,t.jsx)(ex,{setCountry:i,setFlow:l,chosenCountry:a,userLoc:n});case null:return(0,t.jsx)(em,{setFlow:l,setUserLoc:o});case"COUNTRY_SELECTOR":return(0,t.jsx)(ex,{setFlow:l,setCountry:i,chosenCountry:a,userLoc:n});default:return null}};function ew(e="hero"){let{region:a}=(0,r.useContext)(S.RegionLocaleContext),i=(0,r.useContext)(ep.ModalContext),[n,o]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{if(!a)return;let e=!0;return fetch("/api/stores/countries").then(e=>e.json()).then(t=>{e&&o(t.countries.map(e=>e.iso).includes(a))}).catch(()=>{e&&o(!1)}),()=>{e=!1}},[a]),{hasStores:n,openStoreLocator:(0,r.useCallback)(()=>{L.analytics.track("footer"===e?"Find a store footer - CLICK":"Get it today - CLICK",{clicked:!0}),i.set((0,t.jsx)(ey,{})),i.setPortal(!0),i.setFullView(),i.setCloseButtonTheme("light"),i.show()},[i,e])}}e.s(["useRetailStoreLocator",0,ew],708173);let ev=String.fromCharCode(215),eC=[{label:"Ultrahuman Ring PRO",href:"/ring-pro/buy",badge:"new"},{labelId:"footer.products.uhRing",href:"/ring/buy"},{labelId:"footer.products.uhxDiesel",href:"/diesel-ultrahuman-ring"},{label:"Ultrahuman Ring Rare",href:"/rare"}],ek=[{labelId:"footer.products.uhM1",href:"/pricing"},{labelId:"footer.products.uhHome",href:"/home"},{label:"Ultrahuman Performance Lab",href:"/performance-lab"},{labelId:"footer.products.uhBloodVision",href:"/blood-vision"},{labelId:"footer.products.uhPhoton",href:"/photon",badge:"new"},{labelId:"footer.products.powerplugs",href:"/powerplugs"},{labelId:"footer.products.womensHealth",href:"/womens-health"},{labelId:"footer.products.uhx",href:"/x"},{label:"Ultrahuman Vision",href:"https://vision.ultrahuman.com/"},{labelId:"footer.products.allProducts",href:"/shop"}],eS=[{labelId:"footer.company.aboutUs",href:"https://www.linkedin.com/company/ultrahumanhq/"},{labelId:"footer.resources.pressNews",href:"https://cyborg.ultrahuman.com/press"},{labelId:"footer.resources.brandKit",href:"https://docs.google.com/spreadsheets/d/1jMCyNrG6zQTNYDEAl62ImYPzdfGsXkn7_SL466w0tjg/edit?usp=sharing",target:"_blank"},{labelId:"footer.company.careers",href:"https://ultrahuman.zohorecruit.in/jobs/Careers"}],ej=[{labelId:"common.footer.business.partnerships",href:"/partners"},{labelId:"common.footer.business.creators",href:"https://ultrahumanapp.typeform.com/to/RIksJbSH"}],e_=[{labelId:"footer.bottomSection.terms.ring",href:"/termsOfSale/UltrahumanRing/"},{labelId:"footer.bottomSection.terms.m1",href:"/termsOfSale/UltrahumanM1/"},{labelId:"footer.bottomSection.terms.privacy",href:"/privacyPolicy/"},{labelId:"footer.bottomSection.terms.termsOfUse",href:"/termsAndCondition/"}],eI=[{image:"/twitter.svg",link:"https://twitter.com/ultrahumanhq"},{image:"/linkedin.svg",link:"https://www.linkedin.com/company/ultrahumanhq/"},{image:"/insta.svg",link:"https://www.instagram.com/ultrahumanhq/"},{image:"/play.svg",link:"https://www.youtube.com/@UltrahumanOfficial"}],eE=[{image:"/appstoresvg.svg",href:"https://apps.apple.com/us/app/ultrahuman-meditation-sleep/id1491286709"},{image:"/googleplaysvg.svg",href:"https://play.google.com/store/apps/details?id=com.ultrahuman.android"}],eP=(e,t)=>e.labelId?t(e.labelId):e.label,eN=Y.default.footer.withConfig({componentId:"sc-7b02d9a3-0"})`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.85);
  padding: 0 16px 40px;

  &.dark {
    background-color: #000;
    color: rgba(255, 255, 255, 0.85);
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding: 0 80px 0;
  }
`,eA=Y.default.div.withConfig({componentId:"sc-7b02d9a3-1"})`
  max-width: 1440px;
  margin: 0 auto;
`,eR=Y.default.div.withConfig({componentId:"sc-7b02d9a3-2"})`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .dark & {
    border-bottom-color: rgba(255, 255, 255, 0.12);
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-top: 0;
  }
`,eT=Y.default.div.withConfig({componentId:"sc-7b02d9a3-3"})`
  padding: 0;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding: 60px 0 44px 0;
    border-right: 1px solid rgba(0, 0, 0, 0.06);

    .dark & {
      border-right-color: rgba(255, 255, 255, 0.08);
    }

    &:not(:first-child) {
      padding-left: 28px;
    }

    &:last-child {
      border-right: none;
    }
  }
`,eV=Y.default.p.withConfig({componentId:"sc-7b02d9a3-4"})`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 120%;
  color: rgba(0, 0, 0, 0.5);

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 13px;
  }

  .dark & {
    color: rgba(255, 255, 255, 0.5);
  }
`,eL=Y.default.div.withConfig({componentId:"sc-7b02d9a3-5"})`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 21px;
  margin-top: 20px;

  .dark & {
    border-top-color: rgba(255, 255, 255, 0.08);
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    ${({$inset:e})=>e&&`
      margin-left: -28px;
      padding-left: 28px;
    `}
  }
`,eU=Y.default.div.withConfig({componentId:"sc-7b02d9a3-6"})`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 20px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    gap: 2rem;
  }
`,e$=(0,Y.default)(P.default).withConfig({componentId:"sc-7b02d9a3-7"})`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 400;
  font-style: normal;
  line-height: 2.2rem;
  letter-spacing: -0.028rem;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }

  .dark & {
    color: rgba(255, 255, 255, 0.85);

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`,eM=Y.default.span.withConfig({componentId:"sc-7b02d9a3-8"})`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 8px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.7);
  line-height: normal;

  .dark & {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
  }
`,eO=Y.default.div.withConfig({componentId:"sc-7b02d9a3-9"})`
  margin-top: 20px;
  padding-bottom: 16px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding-bottom: 0;
  }
`,eW=Y.default.div.withConfig({componentId:"sc-7b02d9a3-10"})`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`,ez=Y.default.button.withConfig({componentId:"sc-7b02d9a3-11"})`
  cursor: pointer;
  background: transparent;
  border: 1px solid
    ${({$variant:e})=>"dark"===e?"rgba(255, 255, 255, 0.25)":"rgba(0, 0, 0, 0.15)"};
  border-radius: 999px;
  box-sizing: border-box;
  min-height: 28px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.14px;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  opacity: 1 !important;

  &:hover {
    background: ${({$variant:e})=>"dark"===e?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.04)"};
  }
`,eF=Y.default.div.withConfig({componentId:"sc-7b02d9a3-12"})`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 28px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .dark & {
    border-bottom-color: rgba(255, 255, 255, 0.12);
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    padding: 0;
  }
`,eD=Y.default.div.withConfig({componentId:"sc-7b02d9a3-13"})`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    padding: 28px 0;

    .dark & {
      border-right-color: rgba(255, 255, 255, 0.08);
    }

    &:not(:first-child) {
      padding-left: 28px;
    }

    &:last-child {
      border-right: none;
    }
  }
`,eq=Y.default.p.withConfig({componentId:"sc-7b02d9a3-14"})`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 120%;
  color: rgba(0, 0, 0, 0.5);

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 13px;
  }

  .dark & {
    color: rgba(255, 255, 255, 0.5);
  }
`,eB=Y.default.div.withConfig({componentId:"sc-7b02d9a3-15"})`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,eH=(0,Y.default)(P.default).withConfig({componentId:"sc-7b02d9a3-16"})`
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 400;
  font-style: normal;
  line-height: 2.2rem;
  letter-spacing: -0.028rem;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }

  .dark & {
    color: rgba(255, 255, 255, 0.85);

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`,eG=Y.default.div.withConfig({componentId:"sc-7b02d9a3-17"})`
  display: flex;
  gap: 24px;
  align-items: center;

  a img {
    width: 20px;
    height: 20px;
  }

  .light & img {
    filter: invert(1);
  }
`,eY=Y.default.div.withConfig({componentId:"sc-7b02d9a3-18"})`
  display: flex;
  gap: 8px;
  align-items: center;

  a img {
    width: 115px;
    height: 34px;
  }
`,eX=Y.default.div.withConfig({componentId:"sc-7b02d9a3-19"})`
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  .dark & {
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
`,eK=Y.default.p.withConfig({componentId:"sc-7b02d9a3-20"})`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  line-height: 17px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 12px;
  }

  .dark & {
    color: rgba(255, 255, 255, 0.5);
  }
`,eQ=Y.default.p.withConfig({componentId:"sc-7b02d9a3-21"})`
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  line-height: 18px;
  margin-top: 8px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 12px;
  }

  .dark & {
    color: rgba(255, 255, 255, 0.5);
  }
`,eJ=Y.default.div.withConfig({componentId:"sc-7b02d9a3-22"})`
  margin-top: 16px;
`,eZ=Y.default.div.withConfig({componentId:"sc-7b02d9a3-23"})`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 44px 0 40px;

  svg {
    width: 100%;
    height: auto;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding: 44px 0 60px;
  }
`,e0=Y.default.details.withConfig({componentId:"sc-7b02d9a3-24"})`
  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    &[open] > summary ~ * {
      display: flex;
    }
  }
`,e1=Y.default.summary.withConfig({componentId:"sc-7b02d9a3-25"})`
  cursor: pointer;
  list-style: none;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 120%;
  color: rgba(0, 0, 0, 0.5);

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 13px;
  }

  .dark & {
    color: rgba(255, 255, 255, 0.5);
  }

  &::marker {
    display: none;
  }

  svg {
    transition: transform 0.3s ease;
    transform: rotate(${({$isOpen:e})=>e?"0deg":"180deg"});
    fill: rgba(0, 0, 0, 0.3);

    .dark & {
      fill: rgba(255, 255, 255, 0.3);
    }
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    pointer-events: none;
    padding: 0;
    svg {
      display: none;
    }
  }
`,e2=Y.default.div.withConfig({componentId:"sc-7b02d9a3-26"})`
  padding-bottom: 8px;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding-bottom: 0;
    margin-top: 20px;
    gap: 2rem;
  }
`,e5=({title:e,links:a,openDefault:i,t:n})=>{let[o,s]=r.default.useState(i),l=r.default.useRef(null);return(0,t.jsxs)(e0,{ref:l,open:i,onToggle:()=>{l.current&&s(l.current.open)},children:[(0,t.jsxs)(e1,{$isOpen:o,children:[e,(0,t.jsx)(er.CaretUp,{width:10,height:7,fill:"currentColor",style:{marginLeft:8}})]}),(0,t.jsx)(e2,{children:a.map(e=>(0,t.jsxs)(e$,{href:e.href,target:e.target,children:[eP(e,n),"new"===e.badge?(0,t.jsx)(eM,{children:"New"}):null]},e.href))})]})};e.s(["Footer",0,()=>{let{t:e}=(0,i.useTranslation)("common"),{width:n}=(0,ed.useWindowSize)(),{region:o}=(0,r.useContext)(S.RegionLocaleContext),s=n>992,[l,d]=r.default.useState(!1),c=(0,a.useRouter)();r.default.useEffect(()=>{d(!0)},[]);let u=r.default.useMemo(()=>eu.footerThemeConfig[c.pathname]??eu.DEFAULT_FOOTER_THEME,[c.pathname]),p=r.default.useMemo(()=>o?el[o.toUpperCase()]??es:es,[o]),h=r.default.useMemo(()=>[{label:"support@ultrahuman.com",href:"mailto:support@ultrahuman.com"},{label:p,href:`tel:${p}`}],[p]),m=r.default.useMemo(()=>(0,K.getAssetUrl)("/Form_MGT_7_FY_2022-23.pdf"),[]),g=r.default.useMemo(()=>[{labelId:"footer.resources.ogdb",href:"/ogdb"},{labelId:"footer.resources.uhBlog",href:"/blog"},{labelId:"footer.resources.hero",href:"/heroes"},{label:"HSA/FSA",href:"/hsa-fsa"},{labelId:"footer.resources.science",href:"/science/studies"},{labelId:"footer.resources.ultraWork",href:"/for-work"},{label:`Ultrahuman ${ev} Clue`,href:"/ultrahuman-x-clue"},{label:`Ultrahuman ${ev} Les Mills`,href:"/ultrahuman-x-les-mills"},{labelId:"footer.resources.3dPrint",href:"/print-sizing-kit"},{label:"Blood Vision Cloud",href:"/blood-vision"},{labelId:"footer.resources.ringSizing",href:"/blog/how-to-use-the-ultrahuman-ring-sizing-kit/"},{label:"UltraSignal",href:"/ultrasignal"},{labelId:"common.footer.resources.apiTerms",href:"https://ultrahumanapp.notion.site/API-Agreement-for-Developers-and-Partners-120755317a9180999ce3edcfc1047f58"},{labelId:"footer.resources.annualReturn",href:m}],[m]),f=r.default.useMemo(()=>eC.map(e=>"Ultrahuman Ring PRO"===e.label&&"US"===o?{...e,href:"/ring-pro"}:e),[o]),b=r.default.useMemo(()=>ek.map(e=>"footer.products.uhBloodVision"===e.labelId&&"IN"===o?{...e,href:"/blood-vision/buy"}:"footer.products.uhM1"===e.labelId&&"US"===o?{...e,label:"Ultrahuman M2 Live",labelId:void 0}:e),[o]),{hasStores:x,openStoreLocator:y}=ew("footer"),{liteUI:w,footerDisabled:v}=(0,eo.useGlobalUI)();return w||v||eu.NO_HEADER_OR_FOOTER_PAGES.includes(c.pathname)||(0,eu.isOrderPage)(c.pathname)?null:(0,t.jsx)(eN,{className:u,children:(0,t.jsxs)(eA,{children:[l?(0,t.jsxs)(eR,{children:[(0,t.jsx)(eT,{children:s?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(eV,{children:"Smart Rings"}),(0,t.jsx)(eU,{children:f.map(r=>(0,t.jsxs)(e$,{href:r.href,target:r.target,children:[eP(r,e),"new"===r.badge?(0,t.jsx)(eM,{children:"New"}):null]},r.href))}),(0,t.jsxs)(eL,{children:[(0,t.jsx)(eV,{children:"Health Monitoring"}),(0,t.jsx)(eU,{children:b.map(r=>(0,t.jsx)(e$,{href:r.href,target:r.target,children:eP(r,e)},r.href))})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e5,{title:"Smart Rings",openDefault:!0,links:f,t:e}),(0,t.jsx)(e5,{title:"Health Monitoring",openDefault:!1,links:b,t:e})]})}),(0,t.jsx)(eT,{children:s?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(eV,{children:e("footer.resources.head")}),(0,t.jsx)(eU,{children:g.map(r=>(0,t.jsx)(e$,{href:r.href,target:r.target,children:eP(r,e)},r.href))})]}):(0,t.jsx)(e5,{title:e("footer.resources.head"),openDefault:!1,links:g,t:e})}),(0,t.jsx)(eT,{children:s?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(eV,{children:e("footer.company.head")}),(0,t.jsx)(eU,{children:eS.map(r=>(0,t.jsx)(e$,{href:r.href,target:r.target,children:eP(r,e)},r.href))}),(0,t.jsxs)(eL,{$inset:!0,children:[(0,t.jsx)(eV,{children:e("footer.business.head")}),(0,t.jsx)(eU,{children:ej.map(r=>(0,t.jsx)(e$,{href:r.href,target:r.target,children:eP(r,e)},r.href))})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e5,{title:e("footer.company.head"),openDefault:!1,links:eS,t:e}),(0,t.jsx)(e5,{title:e("footer.business.head"),openDefault:!1,links:ej,t:e})]})}),(0,t.jsx)(eT,{children:s?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(eV,{children:"Legal"}),(0,t.jsx)(eU,{children:e_.map(r=>(0,t.jsx)(e$,{href:r.href,target:r.target,children:eP(r,e)},r.href))}),(0,t.jsx)(eO,{children:(0,t.jsx)(P.default,{href:"/hsa-fsa",children:(0,t.jsx)(ei.CustomImage,{src:"web_v2/icons/hsa-fsa/hsa-fsa-white-outline.svg",alt:"HSA/FSA Eligible",width:"248",height:"81",style:{height:"27px",width:"auto",filter:"light"===u?"invert(1)":"none"}})})})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e5,{title:"Legal",openDefault:!1,links:e_,t:e}),(0,t.jsx)(eO,{children:(0,t.jsx)(P.default,{href:"/hsa-fsa",children:(0,t.jsx)(ei.CustomImage,{src:"web_v2/icons/hsa-fsa/hsa-fsa-white-outline.svg",alt:"HSA/FSA Eligible",width:"248",height:"81",style:{height:"27px",width:"auto",filter:"light"===u?"invert(1)":"none"}})})})]})})]}):null,(0,t.jsxs)(eF,{children:[(0,t.jsxs)(eD,{children:[(0,t.jsx)(eq,{children:"Contact"}),(0,t.jsx)(eB,{children:h.map(e=>(0,t.jsx)(eH,{href:e.href,children:e.label},e.href))})]}),(0,t.jsxs)(eD,{children:[(0,t.jsx)(eq,{children:"Follow Us"}),(0,t.jsx)(eG,{children:eI.map(e=>(0,t.jsx)(P.default,{href:e.link,children:(0,t.jsx)(en.default,{src:e.image,alt:e.link,width:20,height:20})},e.link))})]}),(0,t.jsxs)(eD,{children:[(0,t.jsx)(eq,{children:e("footer.downloadApp")}),(0,t.jsx)(eY,{children:eE.map(e=>(0,t.jsx)(P.default,{href:e.href,children:(0,t.jsx)(en.default,{src:e.image,alt:e.href,width:115,height:34})},e.href))})]})]}),(0,t.jsxs)(eX,{children:[(0,t.jsx)(eK,{children:e("footer.bottomSection.content")}),"IN"===o?(0,t.jsxs)(eQ,{children:["AM Chambers, 2nd & 3rd Floor, Sy No 49/1 & 49/3, Garvebhavipalya, 7th Mile, Hosur Main Road, Bengaluru, Karnataka 560068, India",(0,t.jsx)("br",{}),e("footer.content.cin")]}):null,(0,t.jsx)(eJ,{children:l&&x?(0,t.jsxs)(eW,{children:[(0,t.jsx)(ec.RegionSelector,{displayFormat:"name",theme:"dark"===u?"dark":"light"}),(0,t.jsx)(ez,{type:"button",$variant:"dark"===u?"dark":"light",onClick:y,"data-buttontype":"footer find a store","aria-label":e("footer.findStore.ariaLabel"),children:e("footer.findStore.label")})]}):(0,t.jsx)(ec.RegionSelector,{displayFormat:"name",theme:"dark"===u?"dark":"light"})})]}),(0,t.jsx)(eZ,{children:(0,t.jsx)(ea.UltrahumanWordmark,{fill:"dark"===u?"rgba(255, 255, 255, 0.06)":"rgba(0, 0, 0, 0.06)"})})]})})}],879865);let e4={src:e.i(934529).default,width:16,height:16,blurWidth:0,blurHeight:0};e.s(["default",0,e4],74481);let e3={src:e.i(214786).default,width:16,height:16,blurWidth:0,blurHeight:0};e.s(["default",0,e3],609097);let e8={src:e.i(423912).default,width:20,height:10,blurWidth:0,blurHeight:0};e.s(["default",0,e8],220358);let e9={src:e.i(250154).default,width:20,height:10,blurWidth:0,blurHeight:0};e.s(["default",0,e9],842319);let e7={src:e.i(658636).default,width:131,height:12,blurWidth:0,blurHeight:0};e.s(["default",0,e7],79377);let e6={src:e.i(730339).default,width:32,height:32,blurWidth:0,blurHeight:0},te={src:e.i(45346).default,width:32,height:32,blurWidth:0,blurHeight:0},tt=(0,Y.default)(({className:e,iconTheme:n})=>{let{t:o}=(0,i.useTranslation)("common"),s=(0,a.useRouter)(),l=(0,r.useContext)(E.CartContext),{regionSlug:d,region:c}=(0,r.useContext)(S.RegionLocaleContext),[u,p]=(0,r.useState)(!1),[h,m]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=s.pathname,t=("/blood-vision/buy"===e||e.startsWith("/blood-vision/buy/"))&&"IN"===c;if(!t)try{let e=localStorage.getItem("bloodVisionIndiaCart"),t=localStorage.getItem("bloodVisionIndiaPincode"),r=localStorage.getItem("bloodVisionIndiaCheckoutData");(e||t||r)&&(localStorage.removeItem("bloodVisionIndiaCart"),localStorage.removeItem("bloodVisionIndiaPincode"),localStorage.removeItem("bloodVisionIndiaCheckoutData"),sessionStorage.removeItem("bloodVisionActiveSession"),sessionStorage.removeItem("bloodVisionLastVisit"),sessionStorage.removeItem("blood_vision_india_pincode"))}catch(e){console.error("Error clearing Blood Vision cart:",e)}p(t);let r=()=>{try{let e=localStorage.getItem("bloodVisionIndiaCart");if(e){let t=JSON.parse(e),r=Object.values(t).reduce((e,t)=>e+(t.quantity||0),0);m(r)}else m(0)}catch(e){console.error("Error reading Blood Vision cart:",e),m(0)}};r();let a=e=>{"bloodVisionIndiaCart"===e.key&&r()};return window.addEventListener("storage",a),window.addEventListener("bloodVisionCartUpdated",r),()=>{window.removeEventListener("storage",a),window.removeEventListener("bloodVisionCartUpdated",r)}},[s.pathname,c]);let g=u?h:l.cart?.totalQuantity||0,f=g>0?o("header.openCartWithCount",{count:g}):o("header.openCart");return(0,t.jsx)("button",{type:"button",className:`${e}${"light"===n?" light":""}`,onClick:()=>{if(L.analytics.track("Cart Icon - CLICK"),u)try{let e=localStorage.getItem("bloodVisionIndiaPincode");if(e){let t=JSON.parse(e);t.pincode&&!t.is_default_pincode&&s.push(`/${d}/blood-vision/buy/checkout`)}}catch(e){console.error("Error reading pincode data:",e)}else l.showCart()},"aria-label":f,children:g>0?(0,t.jsx)("span",{className:"cart-count-badge","aria-hidden":"true",children:g}):null})}).withConfig({componentId:"sc-98b1ef79-0"})`
  display: inline-block;
  width: 32px;
  height: 32px;
  border: none;
  padding: 0;
  background: transparent;
  background-color: transparent;
  background-image: url(${e6.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  position: relative;
  cursor: pointer;
  opacity: 1 !important;

  &.light {
    background-image: url(${te.src});
  }

  .cart-count-badge {
    position: absolute;
    right: 6px;
    bottom: 6px;
    transform: translate(50%, 50%);
    font-weight: 500;
    font-size: 1rem;
    color: black;
    letter-spacing: 0;
    text-align: center;
    background-color: white;
    min-width: 16px;
    min-height: 16px;
    border-radius: 50%;
    padding-top: 2px;
  }

`;e.s(["CartIcon",0,tt],324298)},484586,e=>{"use strict";e.s(["isMobileDevice",0,()=>{let e="maxTouchPoints"in navigator&&navigator.maxTouchPoints>0;if(!e){let e=navigator.userAgent;return/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)}return e}])},5286,e=>{e.v({className:"graphikitalic_582c69ad-module__WbCy0a__className",variable:"graphikitalic_582c69ad-module__WbCy0a__variable"})},202962,602249,953031,e=>{"use strict";var t=e.i(391398);e.i(664157);var r=e.i(271179),a=e.i(940290),i=e.i(650303),n=e.i(563127),o=e.i(194111),s=e.i(54013),l=e.i(153147),d=e.i(519230),c=e.i(203828),u=e.i(191788),p=e.i(760814),h=e.i(657232),m=e.i(74481),g=e.i(609097),f=e.i(220358),b=e.i(842319),x=e.i(79377),y=e.i(111869),w=e.i(419231),v=e.i(957134),C=e.i(324298),k=e.i(963635),S=e.i(484586),j=e.i(25704),_=e.i(307959),I=e.i(546737),E=e.i(341476),P=e.i(912514),N=e.i(777658);let A=["/shop/","/sizing-kit","/x/","/ogdb","/rare","/heroes"],R=p.default.i.withConfig({componentId:"sc-f72a4041-0"})`
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 4px;
  transform: translateY(-2px);
  background: ${({theme:e})=>e.colorsV2.accent};
  color: #000000;
  letter-spacing: 1px;
  padding: 2px 4px 1px;
  border-radius: 50%;
  font-weight: 500;
  font-style: normal;
  font-size: 0.8rem;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    transform: translateY(-1px);
    width: 8px;
    height: 8px;
  }

  &.pre {
    display: none;
    margin-right: 4px;
    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      display: inline-block;
    }
  }

  &.post {
    margin-left: 6px;
    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      display: none;
    }
  }
`,T=({children:e,href:r,onClick:a,target:i,style:n,newTag:o})=>{var s;let d=(0,c.useRouter)();return(0,t.jsxs)(l.default,{href:{pathname:r},onClick:a,style:{...n,position:"relative",opacity:(s=d.pathname,"/"===r?s===r:s.startsWith(r))?"1":"0.5"},target:i,"data-buttontype":"header",children:[o?(0,t.jsx)(R,{className:"pre"}):null,e,o?(0,t.jsx)(R,{className:"post"}):null]})},V=p.default.nav.withConfig({componentId:"sc-f72a4041-1"})`
  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    width: 100%;
    list-style-type: none;
    list-style-type: disc;
    margin: 0;
    padding: 0;
    height: 100%;

    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      align-items: center;
    }
  }

  li {
    display: inline;
  }

  a,
  button {
    color: ${({theme:e})=>e.colorsV2.background};
    // font-size: ${({theme:e})=>e.typographyV2.fontSize.extrasmall};
    font-size: 1.2rem;

    :hover {
      text-shadow: none;
      opacity: 1 !important;
      transition: all 0.3s ease-in-out;
    }
  }

  li + li {
    margin-left: 18px;

    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      margin-left: 0;
    }
  }

  // Mobile
  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    transition: all 0.3s ease-out;
    opacity: 0;
    pointer-events: none;
    grid-column: 1 / -1;
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh; /* DO NOT USE THE VIEWPORT HEIGHT CSS VAR */
    width: 100vw;
    padding-top: 96px;
    background: rgba(0, 0, 0, 0.83);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 1;

    ul {
      flex-direction: column;
      justify-content: flex-start;
      gap: 20px;
      padding: 0 24px;
    }

    li {
      text-align: center;
    }

    a,
    button {
      font-size: 2rem;
      font-weight: ${({theme:e})=>e.typographyV2.fontWeight.semibold};
      opacity: 0.8;
      text-align: left;
      letter-spacing: -0.05rem;
    }

    &.mobileIsOpen {
      pointer-events: all;
      transition: all 0.3s ease-in;
      opacity: 1;
    }
  }
`,L=p.default.div.withConfig({componentId:"sc-f72a4041-2"})`
  background-image: url('${f.default.src}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 19px 10px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &.light {
    background-image: url('${b.default.src}');
  }

  &.mobileIsOpen {
    background-image: url('${m.default.src}');
    background-size: 16px 16px;
  }

  &.light.mobileIsOpen {
    background-image: url('${g.default.src}');
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 4px;
  }
`,U=p.default.div.withConfig({componentId:"sc-f72a4041-3"})`
  grid-column: 4 / -2;
  display: none;
  position: relative;

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    text-align: left;
    gap: 12px;
    flex-shrink: 0;
  }
`,$=p.default.div.withConfig({componentId:"sc-f72a4041-4"})`
  border-radius: 16px;
  border: 1px solid
    ${({$menuOpen:e})=>e?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.10)"};
`,M=p.default.div.withConfig({componentId:"sc-f72a4041-5"})`
  position: relative;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding: 48px 0;
  }
`,O=(0,p.default)(({className:e,headerTheme:n,onClick:o})=>{let{t:s}=(0,r.useTranslation)("common"),{width:d}=(0,h.useWindowSize)(),c=d>991?"dark"==n?(0,t.jsx)(a.CaretUp,{style:{transform:"translateY(-1px) rotate(90deg)"}}):(0,t.jsx)(i.CaretUpBlack,{style:{transform:"translateY(-1px) rotate(90deg)"}}):(0,t.jsx)(a.CaretUp,{style:{transform:"translateY(-1px) rotate(90deg)"}});return(0,t.jsxs)(w.Container,{className:`${e} ${n}`,children:[(0,t.jsxs)(l.default,{href:{pathname:"/partners"},"data-buttontype":"header",onClick:()=>{o&&o()},children:[(0,t.jsxs)("p",{children:[s("common.header.partners")," ",c]}),(0,t.jsx)("p",{children:s("common.header.partnersDescription")})]}),(0,t.jsxs)(l.default,{target:"_blank",href:"https://ultrahumanapp.typeform.com/to/RIksJbSH","data-buttontype":"header",onClick:()=>{o&&o()},children:[(0,t.jsxs)("p",{children:[s("header.businessDropdown.creators")," ",c]}),(0,t.jsx)("p",{children:s("header.businessDropdown.creatorsContent")})]})]})}).withConfig({componentId:"sc-f72a4041-6"})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
  // flex-wrap: wrap;
  justify-content: center;
  padding: 0;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 0px;
    justify-content: center;
    gap: 12px;
  }

  a {
    opacity: 0;

    max-width: 35%;

    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      max-width: unset;
      opacity: 0.5 !important;
    }

    animation: ${p.keyframes`
        from {
          opacity: 0;
          transform: translateY(-40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      `} 0.3s ease-in-out forwards;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.05s;
    }
    &:nth-child(3) {
      animation-delay: 0.1s;
    }
    &:nth-child(4) {
      animation-delay: 0.25s;
    }

    &:hover {
      p:first-child {
        text-decoration: underline;
      }
    }

    p {
      &:first-child {
        font-size: 1.6rem;
        // margin-bottom: 8px;
        font-weight: 500;

        @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
          font-size: 1.6rem;
        }

        svg,
        img {
          height: 0.8rem;
          width: auto;
        }
      }

      &:last-child {
        font-size: 1.4rem;
        line-height: 2rem;
        opacity: 0.5;
        display: none;

        @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
          display: block;
          font-size: 1.4rem;
        }
      }
    }
  }
`,W=(0,p.default)(({className:e})=>{var a;let i,{t:p}=(0,r.useTranslation)("common"),m=(0,c.useRouter)(),g=(0,u.useContext)(I.GlobalUIContext),{region:f,regionSlug:b}=(0,u.useContext)(_.RegionLocaleContext),[N,R]=(0,u.useState)(!1),[W,z]=(0,u.useState)("dark"),{width:F}=(0,h.useWindowSize)(),[D,q]=(0,u.useState)(null),B={business:(0,t.jsx)(O,{headerTheme:W,onClick:()=>{q(null),R(!1)}})},H=(0,u.useCallback)(()=>{R(e=>!e)},[]),G=(0,u.useCallback)(e=>{q(null),R(!1),e&&E.analytics.track(`header - ${e.currentTarget.textContent} - CLICK`)},[]),Y=(0,u.useContext)(v.ModalContext);(0,u.useEffect)(()=>{m.pathname in y.headerThemeConfig&&z(y.headerThemeConfig[m.pathname]),(m.pathname.startsWith("/shop")||m.pathname.startsWith("/ring/buy")||m.pathname.startsWith("/ring-pro/buy")||m.pathname.startsWith("/diesel-ultrahuman-ring/buy")||m.pathname.startsWith("/pricing"))&&z("light")},[m.pathname,m.asPath]);let X=N?"dark":W,K=(a=m.pathname,a.startsWith("/home")?{pathname:"/home/buy",labelKey:"header.buyNow"}:a.startsWith("/diesel-ultrahuman-ring")?{pathname:"/diesel-ultrahuman-ring/buy",labelKey:"header.buyNow"}:a.startsWith("/photon")?{pathname:"/photon/buy",labelKey:"header.buyNow"}:a.startsWith("/ring-pro")||"US"===f||"PR"===f?{pathname:"/ring-pro/buy",labelKey:"header.preOrderNow"}:{pathname:"/ring/buy",labelKey:"header.buyNow"}),Q=(0,P.useHandleBookNow)(),J="/performance-lab"===m.pathname?"string"==typeof(i=(0,P.getPerformanceLabCtaPath)(f,b))?i:i.pathname??"/performance-lab/buy":void 0,Z=(({pathname:e,country:t,t:r,headerBuyLink:a,showBookCallModal:i,handleUHAppClick:n,performanceLabBookHref:o,handlePerformanceLabBuyClick:s})=>{let l={type:"none",text:""},d=e=>({mobile:e,desktop:e}),c={type:"button",text:r("header.talkToExpert"),onClick:i,icon:"chat"},u="/blood-vision"===e&&"IN"===t?{type:"link",text:r("header.bookTest"),href:"/ring/buy",onClick:n}:void 0;if(e.startsWith("/performance-lab"))return"/performance-lab"===e&&o?{...d("IN"===t?{type:"link",text:r("header.exploreMore"),href:o,ariaLabel:r("header.exploreMoreAria")}:{type:"link",text:r("header.buyNow"),href:o,onClick:s,ariaLabel:r("header.buyNowAria")}),bloodVision:u}:{...d(l),bloodVision:u};if(e.endsWith("/buy")||e.includes("/buy/")||e.startsWith("/pricing"))return{mobile:l,desktop:c,bloodVision:u};if("/"===e)return"US"===t||"PR"===t?{...d({type:"link",text:r("header.preOrderNow"),href:"/ring-pro/buy"}),bloodVision:u}:{...d({type:"link",text:r("header.buyNow"),href:"/ring/buy"}),bloodVision:u};if(e.startsWith("/blood-vision"))return{...d({type:"link",text:r("header.bookTest"),href:"/blood-vision/buy"}),bloodVision:u};if(e.startsWith("/ring")||e.startsWith("/diesel-ultrahuman-ring")||e.startsWith("/home")||e.startsWith("/photon"))return{...d({type:"link",text:r(a.labelKey),href:a.pathname}),bloodVision:u};if(A.some(t=>e===t||e.startsWith(t)))return{mobile:l,desktop:c,bloodVision:u};let p="US"===t||"PR"===t;return{...d({type:"link",text:r(p?"header.preOrderNow":"header.buyNow"),href:p?"/ring-pro/buy":"/ring/buy"}),bloodVision:u}})({pathname:m.pathname,country:f,t:p,headerBuyLink:K,showBookCallModal:()=>{E.analytics.track("header talk to expert - CLICK");let e="website";window&&(e=window.location.hostname+window.location.pathname),Y.set((0,t.jsx)(s.BookCallTFComponentDiv,{trackingParams:{utm_source:e,utm_medium:"header-cta"}})),Y.setCloseButtonTheme("light"),Y.show()},handleUHAppClick:()=>{(0,S.isMobileDevice)()?window.open("https://ultrahuman.onelink.me/QqSM/0ncoj3us","_blank"):(Y.set((0,t.jsx)(j.UhAppModal,{text:p("common.header.installUltrahumanAppBloodVision"),link:"https://ultrahuman.onelink.me/QqSM/0ncoj3us",image:"web_v2/qr-codes/blood-vision-onelink.png"})),Y.show())},performanceLabBookHref:J,handlePerformanceLabBuyClick:Q}),ee=(e,r)=>"none"===e.type?null:"button"===e.type?(0,t.jsxs)("button",{className:"talk-to-spl",type:"button",onClick:e.onClick,"data-buttontype":"header","aria-label":e.ariaLabel,children:[(0,t.jsx)("span",{children:e.text})," ","chat"===e.icon?(0,t.jsx)(n.ChatBubbles,{}):null]}):(0,t.jsx)(l.default,{href:{pathname:e.href??"#"},className:r,"aria-label":e.ariaLabel,onClick:e.onClick?t=>{t.preventDefault(),e.onClick?.()}:void 0,children:e.text}),et=(0,u.useRef)(null),er=(0,u.useRef)(null),ea=(0,u.useRef)(0),ei=(0,u.useRef)(!1),en=(0,u.useRef)(!!g.headerVisible),eo=(0,u.useRef)(g.headerCollaspable),es=(0,u.useRef)(g.setHeaderVisible);return(0,u.useEffect)(()=>{en.current=!!g.headerVisible},[g.headerVisible]),(0,u.useEffect)(()=>{eo.current=g.headerCollaspable},[g.headerCollaspable]),(0,u.useEffect)(()=>{es.current=g.setHeaderVisible},[g.setHeaderVisible]),(0,u.useEffect)(()=>{ea.current=window.scrollY},[g.headerCollaspable]),(0,u.useEffect)(()=>{let e=()=>{ei.current||(ei.current=!0,requestAnimationFrame(()=>{if(ei.current=!1,!eo.current)return;let e=window.scrollY,t=ea.current;if(ea.current=e,e<48)return void es.current(!0);let r=e<t;r!==en.current&&es.current(r)}))};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),(0,t.jsxs)(t.Fragment,{children:[D&&(0,t.jsx)("div",{style:{position:"fixed",bottom:"0",left:"0",background:"rgba(0,0,0,0.4)",height:"100vh",padding:"10px",width:"100vw",zIndex:99,overscrollBehavior:"none",display:F<769?"none":"block"},onClick:()=>q(null),"aria-hidden":"true"}),(0,t.jsxs)("div",{ref:et,className:`${e} ${W} ${N?"mobile-menu-open":""} ${g.headerCollaspable?"header-collaspable":""} ${g.headerVisible?"header-visible":""} bg-active ${"/ring-pro"===m.pathname?"page-ring-pro":""}`,children:[(0,t.jsx)(k.MarketingBanner,{}),(0,t.jsx)("header",{ref:er,style:{backdropFilter:"/environment"===m.pathname?"blur(24px)":"",background:"/environment"===m.pathname?"rgba(255,255,255,0.6)":","},children:(0,t.jsxs)(w.Container,{children:[(0,t.jsxs)("div",{className:"left-pane",children:[(0,t.jsx)(l.default,{href:{pathname:`/${b}/`},className:`link-home ontop${m.pathname.includes("/buy")?" header-buy-route":""}`,onClick:G,"data-buttontype":"header","aria-label":p("header.goHome"),children:m.pathname.includes("/buy")?(0,t.jsxs)(t.Fragment,{children:["dark"===X?(0,t.jsx)(o.UHLogo,{fill:"#FFF",className:"logo logo-buy-desktop"}):(0,t.jsx)(o.UHLogo,{className:"logo logo-buy-desktop"}),(0,t.jsx)("img",{src:x.default.src,alt:"",className:"logo logo-buy-mobile-wordmark",width:131,height:12,"aria-hidden":!0})]}):"dark"===X?(0,t.jsx)(o.UHLogo,{fill:"#FFF",className:"logo"}):(0,t.jsx)(o.UHLogo,{className:"logo"})}),(0,t.jsx)(V,{className:N?"mobileIsOpen":void 0,children:(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/ring-pro/buy",onClick:G,children:p("header.ringPro")})}),"US"!==f&&"PR"!==f&&(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/ring/buy",onClick:G,children:p("header.ringAir")})}),(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/blood-vision/buy",onClick:G,children:p("header.bloodVision")})}),(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/performance-lab",onClick:G,children:p("header.performanceLab")})}),(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/home/buy",onClick:G,children:p("header.homeHealth")})}),(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/pricing",onClick:G,children:"US"===f?"M2 CGM":p("header.m1Cgm")})}),(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/womens-health",onClick:G,children:p("header.womenHealth")})}),(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/x",onClick:G,children:p("header.ultrahumanX")})}),"US"===f||"PR"===f?(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/hsa-fsa",onClick:G,children:p("header.hsaFsa")})}):null,(0,t.jsx)("li",{children:(0,t.jsx)(T,{href:"/shop",onClick:G,children:p("header.store")})}),"IN"===f?null:"US"!==f&&"PR"!==f?(0,t.jsx)("li",{children:F>991?(0,t.jsx)("button",{style:{cursor:"pointer",opacity:"business"==D?1:void 0},"data-buttontype":"header",onClick:()=>{null===D?q("business"):q(null)},children:p("common.header.partnerships")}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(T,{href:"javascript:void(0)",onClick:()=>void 0,style:{display:"block",pointerEvents:"none"},children:p("common.header.partnerships")}),B.business]})}):null]})})]}),(0,t.jsxs)(U,{className:"ontop",children:[Z.bloodVision&&(0,t.jsx)("div",{className:"mobile-show",children:ee(Z.bloodVision,"btn-accent mobile white")}),ee(Z.mobile,`btn-accent mobile${"/performance-lab"===m.pathname?" waitlist":""}`),(0,t.jsx)($,{$menuOpen:N,children:(0,t.jsx)(d.RegionSelector,{theme:X,hideRegionLabel:!0})}),!y.HEADER_CART_ICON_IN_ACTIVE_PAGES.includes(m.pathname)&&(0,t.jsx)(C.CartIcon,{iconTheme:X}),(0,t.jsx)(L,{role:"button",tabIndex:0,"aria-expanded":N,"aria-label":N?p("header.closeMenu"):p("header.openMenu"),onClick:H,onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),H())},className:`${X} ${N?"mobileIsOpen":void 0}`})]}),(0,t.jsxs)("div",{className:"mobile-hide extra-btns",children:[(0,t.jsx)(d.RegionSelector,{theme:W}),!y.HEADER_CART_ICON_IN_ACTIVE_PAGES.includes(m.pathname)&&(0,t.jsx)(C.CartIcon,{iconTheme:W}),ee(Z.desktop,`btn-accent${"/performance-lab"===m.pathname?" waitlist":""}`)]})]})}),D&&F>991&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(M,{children:B[D]})})]})]})}).withConfig({componentId:"sc-f72a4041-7"})`
  // --extreme-element-width: 80px;

  z-index: 1000;
  position: fixed;
  top: 0;
  transition: transform 0.3s ease-in-out;

  &.header-collaspable {
    transform: translateY(-100%);

    &.header-visible {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    transition: transform 0.2s ease-in-out;
    transform: translateY(-200px);
  }

  button {
    border: 0;
    background-color: transparent;
    opacity: 0.5;
  }

  &.dark {
    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      color: #ffffff;
      a,
      button {
        color: #ffffff;
      }
    }
  }

  &.light {
    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      color: #000000;
      a,
      button {
        color: #000000;
      }
    }
    &::before {
      background-color: rgba(255, 255, 255, 0.6);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
    }

    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      header {
        background: #fafafa;
        color: #151515;
      }
      &::before {
        background-color: rgba(250, 250, 250, 0.92);
        -webkit-backdrop-filter: blur(47px);
        backdrop-filter: blur(47px);
      }
    }

    &.mobile-menu-open {
      @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
        header {
          background: transparent;
          color: #fff;
        }
        &::before {
          background-color: rgba(0, 0, 0, 0.85);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }
        .logo-buy-mobile-wordmark {
          filter: invert(1);
        }
      }
    }
  }

  &.bg-active::before {
    transform: translate3d(0, 0, 0);
  }

  &.page-ring-pro::before {
    background-color: rgba(0, 0, 0, 0.9);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  header {
    width: 100vw;
    position: relative;
    // top: 0;
    color: #fff;

    height: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
        padding-left: 16px;
        padding-right: 16px;
        box-sizing: border-box;
      }

      .ontop {
        z-index: 100;
        position: relative;
      }
    }

    .link-home {
      margin: 0;
      // width: var(--extreme-element-width);
      width: fit-content;
      display: flex;
      align-items: center;
    }

    .logo-buy-mobile-wordmark {
      display: none;
    }

    .header-buy-route .logo-buy-desktop {
      @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
        display: none;
      }
    }

    .header-buy-route .logo-buy-mobile-wordmark {
      @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
        display: block;
        width: 131px;
        height: 12px;
        max-width: min(131px, 42vw);
        object-fit: contain;
        object-position: left center;
      }
    }

    .logo {
      height: 16px;
      pointer-events: none;
    }

    .left-pane {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
    }

    button.talk-to-spl {
      font-weight: 400;
      font-size: 16px;
      line-height: 17px;
      font-weight: 500;

      letter-spacing: -0.03em;

      background: transparent;
      border: none;
      cursor: pointer;

      display: flex;
      align-items: center;
      gap: 4px;

      color: black;

      background: rgba(238, 238, 238, 1);
      padding: 8px 12px;
      border-radius: 24px;
      cursor: pointer;
      opacity: 1;
      span {
        margin-right: 2px;
      }
    }

    .extra-btns {
      // width: var(--extreme-element-width);
      width: fit-content;
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
      justify-content: flex-end;

      & > * {
        flex-shrink: 0;
        flex-grow: 0;
      }
    }

    .btn-accent {
      background-color: ${({theme:e})=>e.colorsV2.primaryBlue};
      color: #ffffff;
      border: none;
      padding: 8px 16px 7px;
      border-radius: 24px;
      font-size: ${({theme:e})=>e.typographyV2.fontSize.mediumsmall};
      font-weight: ${({theme:e})=>e.typographyV2.fontWeight.semibold};
      display: inline-block;
      letter-spacing: -0.06rem;

      &.mobile {
        padding: 4px 12px;
        margin-right: 0;
      }

      &.white {
        background-color: #ffffff;
        color: #000000;
      }

      &.waitlist {
        background-color: #1539f5;
        font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        letter-spacing: 0;
        border-radius: 48px;
        padding: 10px 20px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }

    .mobile-show {
      display: none;
    }

    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      .mobile-hide {
        display: none;
      }
    }
    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      .mobile-show {
        display: block;
      }
    }
  }
`;e.s(["Header",0,()=>{let e=(0,u.useContext)(I.GlobalUIContext),r=(0,c.useRouter)();return e.liteUI||y.NO_HEADER_OR_FOOTER_PAGES.includes(r.pathname)||(0,y.isOrderPage)(r.pathname)||(0,N.usesPerformanceLabNavbar)(r.pathname)?null:(0,t.jsx)(W,{})}],202962);var z=e.i(429201);e.s(["RouteLoader",0,()=>{let[e,r]=(0,u.useState)(!1),[a,i]=(0,u.useState)(!0),n=(0,u.useRef)(!1),o=(0,c.useRouter)();return((0,u.useEffect)(()=>{let e=setTimeout(()=>{r(!0),i(!1)},800),t=e=>e.split("?")[0].split("#")[0].replace(/\/$/,""),a=e=>{e&&t(e)===t(window.location.pathname)||(n.current=!0,r(!1))},s=()=>{r(!0),setTimeout(()=>i(!1),100),n.current&&(n.current=!1,window.scrollTo(0,0))};return o.events.on("routeChangeStart",a),o.events.on("routeChangeComplete",s),o.events.on("routeChangeError",s),()=>{clearTimeout(e),o.events.off("routeChangeStart",a),o.events.off("routeChangeComplete",s),o.events.off("routeChangeError",s)}},[]),!(a||!e)||o.pathname.startsWith("/cycle-report/"))?null:(0,t.jsx)("div",{id:"loader",className:`${a?"cold":""} ${e?"loaded":""}`.trim(),children:(0,t.jsx)("img",{src:z.default.src,width:z.default.width,height:z.default.height,alt:"Loading..."})})}],602249);var F=e.i(5286);let D={className:F.default.className,style:{fontFamily:"'graphikItalic', system-ui, sans-serif"}};null!=F.default.variable&&(D.variable=F.default.variable),e.s(["graphikItalic",0,D],953031)},265217,e=>{"use strict";var t=e.i(391398),r=e.i(760814),a=e.i(191788);e.i(664157);var i=e.i(271179);let n=(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"31",height:"31",viewBox:"0 0 31 31",fill:"none",children:[(0,t.jsx)("rect",{x:"0.640625",y:"0.373047",width:"30",height:"30",rx:"15",fill:"#F2F2F7"}),(0,t.jsx)("path",{d:"M10.688 18.5551C10.377 18.8661 10.3706 19.4184 10.6943 19.7421C11.0244 20.0658 11.5766 20.0595 11.8813 19.7548L15.6391 15.997L19.3906 19.7485C19.708 20.0658 20.2539 20.0658 20.5776 19.7421C20.9013 19.412 20.9013 18.8725 20.584 18.5551L16.8325 14.8036L20.584 11.0458C20.9013 10.7284 20.9077 10.1825 20.5776 9.85884C20.2539 9.53514 19.708 9.53514 19.3906 9.85254L15.6391 13.6039L11.8813 9.85254C11.5766 9.54144 11.018 9.52874 10.6943 9.85884C10.3706 10.1825 10.377 10.7411 10.688 11.0458L14.4394 14.8036L10.688 18.5551Z",fill:"#3C3C43",fillOpacity:"0.6"})]}),o=(0,a.createContext)({set:()=>{},clear:()=>{},show:()=>{},hide:()=>{},setCloseButtonTheme:()=>{},setCloseBtnHidden:()=>{}}),s=(0,r.default)(({className:e,children:r,hideModal:o,closeBtnHidden:s=!1})=>{let{t:l}=(0,i.useTranslation)("common"),d=(0,a.useRef)(null),c=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let e=e=>{"Escape"===e.key&&o&&o()};return document.activeElement instanceof HTMLElement&&(c.current=document.activeElement),document.addEventListener("keydown",e),d.current&&!s&&d.current.focus(),()=>{document.removeEventListener("keydown",e),c.current&&c.current.focus()}},[o,s]),(0,t.jsx)("div",{className:e,"aria-hidden":"true",onClick:o,onScroll:e=>e.stopPropagation(),children:(0,t.jsx)("div",{className:"modal-container",children:(0,t.jsx)("div",{className:"modal",onScroll:e=>e.stopPropagation(),children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{id:"modal-title",className:"sr-only",children:l("magicModalNew.content.modalContent")}),(0,t.jsx)("div",{id:"modal-description",className:"sr-only",children:l("magicModalNew.content.modalDialogContent")}),r,!s&&(0,t.jsx)("div",{className:"btn-container",onClick:e=>e.stopPropagation(),onKeyDown:e=>e.stopPropagation(),role:"button",tabIndex:0,"aria-label":l("magicModalNew.content.ariaLabel.closeButtonContainer"),children:(0,t.jsxs)("button",{className:"closeBtn",onClick:()=>{o&&o()},ref:d,"aria-label":l("magicModalNew.button.ariaLabel.closeModal"),type:"button",children:[(0,t.jsx)("span",{className:"sr-only",children:l("magicModalNew.text.closeModal")}),n]})})]})})})})}).withConfig({componentId:"sc-9781d0d0-0"})`
  /* Screen reader only text */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  left: 0;
  color: white;
  overflow: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behaviour: contain;
  background: rgba(0, 0, 0, 0.48);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  z-index: 1001;

  &::-webkit-scrollbar {
    display: none;
  }

  & * {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  animation: ${r.keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
  `} 0.2s ease-in-out forwards;

  .modal-container {
    position: relative;
    width: 100vw;
    margin: 0 0 0 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 11;
    overscroll-behaviour: contain;

    .modal {
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: scroll;
      scroll-behavior: smooth;
      overscroll-behavior: contain;

      & > div,
      .btn-container {
        margin-top: 5vh;
        width: 90%;

        @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
          margin-top: 10vh;
          width: 89rem;
        }

        @media (min-width: ${({theme:e})=>e.globalV2.xxxl.minWidth}) {
          margin-top: 15vh;
        }
      }

      .btn-container {
        position: absolute;
        display: flex;
        justify-content: flex-end;
        z-index: 15;

        button {
          background: transparent;
          border: none;
          padding: 1rem 1.1rem;
          z-index: 15;

          @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
            padding: 1.34rem;
          }
        }
      }
    }
  }
`;e.s(["CrossLight",0,n,"MagicModalNewContext",0,o,"MagicModalNewProvider",0,({children:e})=>{let[r,i]=(0,a.useState)(!1),[n,l]=(0,a.useState)(null),[d,c]=(0,a.useState)(!1),[u,p]=(0,a.useState)(!1),h=(0,a.useCallback)(e=>{l(e)},[]),m=(0,a.useCallback)(e=>{i(!1),c(!1),p(!1),e&&"function"==typeof e&&"function"==typeof e&&e()},[]),g=(0,a.useCallback)(()=>{l(null),m()},[m]),f=(0,a.useCallback)(()=>{i(!0)},[]),b=(0,a.useCallback)(e=>{"dark"!=e&&c(!0)},[]),x=(0,a.useMemo)(()=>({set:h,clear:g,show:f,hide:m,setCloseButtonTheme:b,setCloseBtnHidden:p}),[h,g,f,m,b]);return(0,t.jsxs)(o.Provider,{value:x,children:[e,r&&(0,t.jsx)(s,{lightCloseButton:d,hideModal:m,closeBtnHidden:u,children:n})]})}])},37563,e=>{"use strict";e.i(350461);var t=e.i(391398);e.i(664157);var r=e.i(271179),a=e.i(133535),i=e.i(153147),n=e.i(958678),o=e.i(194182),s=e.i(307959),l=e.i(191788),d=e.i(75907),c=e.i(460997);function u(e,t){return(u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,u(e,t)}function h(e,t){return e.replace(RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var m=e.i(730943);let g=l.default.createContext(null);var f=function(e){return e.scrollTop},b="unmounted",x="exited",y="entering",w="entered",v="exiting",C=function(e){function t(t,r){var a,i=e.call(this,t,r)||this,n=r&&!r.isMounting?t.enter:t.appear;return i.appearStatus=null,t.in?n?(a=x,i.appearStatus=y):a=w:a=t.unmountOnExit||t.mountOnEnter?b:x,i.state={status:a},i.nextCallback=null,i}p(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&t.status===b?{status:x}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(e){var t=null;if(e!==this.props){var r=this.state.status;this.props.in?r!==y&&r!==w&&(t=y):(r===y||r===w)&&(t=v)}this.updateStatus(!1,t)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var e,t,r,a=this.props.timeout;return e=t=r=a,null!=a&&"number"!=typeof a&&(e=a.exit,t=a.enter,r=void 0!==a.appear?a.appear:t),{exit:e,enter:t,appear:r}},r.updateStatus=function(e,t){if(void 0===e&&(e=!1),null!==t)if(this.cancelNextCallback(),t===y){if(this.props.unmountOnExit||this.props.mountOnEnter){var r=this.props.nodeRef?this.props.nodeRef.current:m.default.findDOMNode(this);r&&f(r)}this.performEnter(e)}else this.performExit();else this.props.unmountOnExit&&this.state.status===x&&this.setState({status:b})},r.performEnter=function(e){var t=this,r=this.props.enter,a=this.context?this.context.isMounting:e,i=this.props.nodeRef?[a]:[m.default.findDOMNode(this),a],n=i[0],o=i[1],s=this.getTimeouts(),l=a?s.appear:s.enter;(e||r)&&1?(this.props.onEnter(n,o),this.safeSetState({status:y},function(){t.props.onEntering(n,o),t.onTransitionEnd(l,function(){t.safeSetState({status:w},function(){t.props.onEntered(n,o)})})})):this.safeSetState({status:w},function(){t.props.onEntered(n)})},r.performExit=function(){var e=this,t=this.props.exit,r=this.getTimeouts(),a=this.props.nodeRef?void 0:m.default.findDOMNode(this);t?(this.props.onExit(a),this.safeSetState({status:v},function(){e.props.onExiting(a),e.onTransitionEnd(r.exit,function(){e.safeSetState({status:x},function(){e.props.onExited(a)})})})):this.safeSetState({status:x},function(){e.props.onExited(a)})},r.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},r.setNextCallback=function(e){var t=this,r=!0;return this.nextCallback=function(a){r&&(r=!1,t.nextCallback=null,e(a))},this.nextCallback.cancel=function(){r=!1},this.nextCallback},r.onTransitionEnd=function(e,t){this.setNextCallback(t);var r=this.props.nodeRef?this.props.nodeRef.current:m.default.findDOMNode(this),a=null==e&&!this.props.addEndListener;if(!r||a)return void setTimeout(this.nextCallback,0);if(this.props.addEndListener){var i=this.props.nodeRef?[this.nextCallback]:[r,this.nextCallback],n=i[0],o=i[1];this.props.addEndListener(n,o)}null!=e&&setTimeout(this.nextCallback,e)},r.render=function(){var e=this.state.status;if(e===b)return null;var t=this.props,r=t.children,a=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,(0,c.default)(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return l.default.createElement(g.Provider,{value:null},"function"==typeof r?r(e,a):l.default.cloneElement(l.default.Children.only(r),a))},t}(l.default.Component);function k(){}C.contextType=g,C.propTypes={},C.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:k,onEntering:k,onEntered:k,onExit:k,onExiting:k,onExited:k},C.UNMOUNTED=b,C.EXITED=x,C.ENTERING=y,C.ENTERED=w,C.EXITING=v;var S=function(e,t){return e&&t&&t.split(" ").forEach(function(t){e.classList?e.classList.remove(t):"string"==typeof e.className?e.className=h(e.className,t):e.setAttribute("class",h(e.className&&e.className.baseVal||"",t))})},j=function(e){function t(){for(var t,r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];return(t=e.call.apply(e,[this].concat(a))||this).appliedClasses={appear:{},enter:{},exit:{}},t.onEnter=function(e,r){var a=t.resolveArguments(e,r),i=a[0],n=a[1];t.removeClasses(i,"exit"),t.addClass(i,n?"appear":"enter","base"),t.props.onEnter&&t.props.onEnter(e,r)},t.onEntering=function(e,r){var a=t.resolveArguments(e,r),i=a[0],n=a[1];t.addClass(i,n?"appear":"enter","active"),t.props.onEntering&&t.props.onEntering(e,r)},t.onEntered=function(e,r){var a=t.resolveArguments(e,r),i=a[0],n=a[1]?"appear":"enter";t.removeClasses(i,n),t.addClass(i,n,"done"),t.props.onEntered&&t.props.onEntered(e,r)},t.onExit=function(e){var r=t.resolveArguments(e)[0];t.removeClasses(r,"appear"),t.removeClasses(r,"enter"),t.addClass(r,"exit","base"),t.props.onExit&&t.props.onExit(e)},t.onExiting=function(e){var r=t.resolveArguments(e)[0];t.addClass(r,"exit","active"),t.props.onExiting&&t.props.onExiting(e)},t.onExited=function(e){var r=t.resolveArguments(e)[0];t.removeClasses(r,"exit"),t.addClass(r,"exit","done"),t.props.onExited&&t.props.onExited(e)},t.resolveArguments=function(e,r){return t.props.nodeRef?[t.props.nodeRef.current,e]:[e,r]},t.getClassNames=function(e){var r=t.props.classNames,a="string"==typeof r,i=a&&r?r+"-":"",n=a?""+i+e:r[e],o=a?n+"-active":r[e+"Active"],s=a?n+"-done":r[e+"Done"];return{baseClassName:n,activeClassName:o,doneClassName:s}},t}p(t,e);var r=t.prototype;return r.addClass=function(e,t,r){var a,i=this.getClassNames(t)[r+"ClassName"],n=this.getClassNames("enter").doneClassName;"appear"===t&&"done"===r&&n&&(i+=" "+n),"active"===r&&e&&f(e),i&&(this.appliedClasses[t][r]=i,a=i,e&&a&&a.split(" ").forEach(function(t){e.classList?e.classList.add(t):(e.classList?t&&e.classList.contains(t):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" "))||("string"==typeof e.className?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}))},r.removeClasses=function(e,t){var r=this.appliedClasses[t],a=r.base,i=r.active,n=r.done;this.appliedClasses[t]={},a&&S(e,a),i&&S(e,i),n&&S(e,n)},r.render=function(){var e=this.props,t=(e.classNames,(0,c.default)(e,["classNames"]));return l.default.createElement(C,(0,d.default)({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},t}(l.default.Component);j.defaultProps={classNames:""},j.propTypes={};var _=e.i(760814),I=e.i(546737),E=e.i(203828);let P="COOKIE_CONSENT",N="24px",A=e=>e?"calc(100% + 32px)":"0px",R=e=>e?"calc(100% + 32px)":"0px",T=e=>e?"calc(100% + 56px)":N,V=e=>e?"calc(100% + 56px)":N;(0,l.createContext)(!1).Provider;let L=(0,l.memo)(({className:e})=>{let{t:i}=(0,r.useTranslation)("common"),{cookieConsent:n,accept:o,reject:s}=(()=>{let[e,t]=(0,l.useState)(void 0);return(0,l.useEffect)(()=>{t(e=>{let t=q();return e===t?e:t})},[]),(0,l.useEffect)(()=>{void 0!==e&&(e&&window?.gtag?.("consent","update",{analytics_storage:"granted",ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"}),null!==e&&B(e))},[e]),{cookieConsent:e,accept:(0,l.useCallback)(()=>{t(!0)},[]),reject:(0,l.useCallback)(()=>{t(!1)},[])}})(),{liteUI:d}=(0,I.useGlobalUI)(),c=(0,E.useRouter)(),u=(0,l.useRef)(null),[p,h]=(0,l.useState)(!1),[m,g]=(0,l.useState)(!1),f=c.pathname.startsWith("/cycle-report/"),b=null===n&&!d;return(0,l.useEffect)(()=>{if(!b||m)return void h(!1);let e=()=>{let e=Math.max(window.scrollY??0,window.pageYOffset??0,document.documentElement?.scrollTop??0,document.body?.scrollTop??0)>100;h(t=>t===e?t:e)};e();let t={passive:!0};return window.addEventListener("scroll",e,t),()=>{window.removeEventListener("scroll",e,t)}},[b]),(0,t.jsxs)(t.Fragment,{children:[void 0===n||m||f?null:(0,t.jsx)(j,{in:b,timeout:200,classNames:"fade",unmountOnExit:!0,appear:!0,nodeRef:u,children:(0,t.jsx)(U,{ref:u,className:e,$isHiddenOnScroll:p,children:(0,t.jsxs)($,{children:[(0,t.jsxs)(M,{children:[i("cookieBanner.heading"),(0,t.jsx)(O,{type:"button","aria-label":i("cookieBanner.close","Close cookie banner"),onClick:()=>{g(!0)},children:(0,t.jsx)(a.CrossDark,{fill:"rgba(255, 255, 255, 0.5)"})})]}),(0,t.jsxs)(W,{children:[i("cookieBanner.description"),(0,t.jsx)(z,{href:"https://ultrahumanapp.notion.site/Cookie-Policy-ebcff6b1c95744fb9471ee874fc544e7",target:"_blank",rel:"noreferrer",children:i("cookieBanner.policyLink")})]}),(0,t.jsxs)(F,{children:[(0,t.jsx)(D,{type:"button",onClick:s,children:i("cookieBanner.REJECT")}),(0,t.jsx)(D,{className:"primary",type:"button",onClick:o,children:i("cookieBanner.ACCEPT")})]})]})})}),n?(0,t.jsx)(G,{}):null]})});L.displayName="CookieConsentBanner";let U=_.default.div.withConfig({componentId:"sc-36dbe881-0"})`
  position: fixed;
  left: 50%;
  right: unset;
  top: unset;
  bottom: 16px;
  transform: ${({$isHiddenOnScroll:e})=>`translateX(-50%) translateY(${A(e)})`};

  width: calc(100% - 32px);
  max-width: 400px;

  padding: 16px;
  border-radius: 24px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);

  z-index: 1000;
  opacity: 1;
  transition: opacity 200ms ease-out, transform 200ms ease-out;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    left: 16px;
    transform: ${({$isHiddenOnScroll:e})=>`translateY(${R(e)})`};
    width: min(400px, calc(100% - 32px));
  }

  &.bg-grad {
    background: rgb(41, 6, 118);
    background: -moz-linear-gradient(
      90deg,
      rgba(41, 6, 118, 1) 0%,
      rgba(195, 87, 177, 1) 100%
    );
    background: -webkit-linear-gradient(
      90deg,
      rgba(41, 6, 118, 1) 0%,
      rgba(195, 87, 177, 1) 100%
    );
    background: linear-gradient(
      90deg,
      rgba(41, 6, 118, 1) 0%,
      rgba(195, 87, 177, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#290676",endColorstr="#c357b1",GradientType=1);
  }

  &.fade-appear {
    opacity: 0;
    transform: ${({$isHiddenOnScroll:e})=>`translateX(-50%) translateY(${T(e)})`};

    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      transform: ${({$isHiddenOnScroll:e})=>`translateY(${V(e)})`};
    }
  }
  &.fade-appear-active,
  &.fade-appear-done {
    opacity: 1;
    transform: ${({$isHiddenOnScroll:e})=>`translateX(-50%) translateY(${A(e)})`};

    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      transform: ${({$isHiddenOnScroll:e})=>`translateY(${R(e)})`};
    }
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transform: ${({$isHiddenOnScroll:e})=>`translateX(-50%) translateY(${T(e)})`};

    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      transform: ${({$isHiddenOnScroll:e})=>`translateY(${V(e)})`};
    }
  }
`,$=_.default.div.withConfig({componentId:"sc-36dbe881-1"})`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,M=_.default.h2.withConfig({componentId:"sc-36dbe881-2"})`
  margin: 0;
  font-size: 1.6rem;
  line-height: 120%;
  letter-spacing: -0.24px;
  color: rgba(255, 255, 255, 1);
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,O=_.default.button.withConfig({componentId:"sc-36dbe881-3"})`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 4px;
  transition: all 0.2s ease-in-out;

  svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.2);
  }
`,W=_.default.p.withConfig({componentId:"sc-36dbe881-4"})`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  font-size: 1.4rem;
  line-height: 150%;
  letter-spacing: -0.21px;
  color: rgba(255, 255, 255, 0.7);
`,z=(0,_.default)(i.default).withConfig({componentId:"sc-36dbe881-5"})`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: underline;
`,F=_.default.span.withConfig({componentId:"sc-36dbe881-6"})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`,D=_.default.button.withConfig({componentId:"sc-36dbe881-7"})`
  background: rgba(255, 255, 255, 0.13);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 40px;
  flex: 1;

  text-align: center;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 100% */
  letter-spacing: -0.42px;

  transition: all 0.2s ease-in-out;

  &.primary {
    background: #ffffff;
    color: #000000;
  }

  &:hover {
    transform: scale(1.02);
  }
`,q=()=>{let e=window.localStorage.getItem(P);if(null===e)return null;try{return JSON.parse(e)}catch(e){return console.warn("Failed to parse cookie consent from localStorage:",e),null}},B=e=>{window.localStorage.setItem(P,JSON.stringify(e))},H=()=>((0,l.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search).get("fbclid");if(e){document.cookie=`_uh_fbclid=${encodeURIComponent(e)};path=/;max-age=2592000;SameSite=Lax`;let t=`fb.1.${Date.now()}.${e}`;document.cookie=`_fbc=${encodeURIComponent(t)};path=/;max-age=2592000;SameSite=Lax`}}catch{}},[]),null),G=()=>{let{t:e}=(0,r.useTranslation)("common"),{region:a}=(0,l.useContext)(s.RegionLocaleContext);return(0,t.jsxs)(l.default.Fragment,{children:[(0,t.jsxs)(n.default,{children:[(0,t.jsx)("link",{rel:"dns-prefetch",href:"//www.clarity.ms"}),(0,t.jsx)("link",{rel:"dns-prefetch",href:"//connect.facebook.net"}),(0,t.jsx)("link",{rel:"dns-prefetch",href:"//cdn.mxpnl.com"}),(0,t.jsx)("link",{rel:"dns-prefetch",href:"//js.hs-scripts.com"}),(0,t.jsx)("link",{rel:"dns-prefetch",href:"//analytics.tiktok.com"}),(0,t.jsx)("link",{rel:"dns-prefetch",href:"//static.cloudflareinsights.com"})]}),(0,t.jsx)(o.default,{src:"https://static.cloudflareinsights.com/beacon.min.js",strategy:"lazyOnload","data-cf-beacon":'{"token": "7bc460f8fbb94c3aa879de7aa35167e3"}',defer:!0}),(0,t.jsx)(o.default,{id:"clarity",strategy:"lazyOnload",dangerouslySetInnerHTML:{__html:`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "pyv20l9bkd");
        `}}),(0,t.jsx)(o.default,{id:"mixpanel",strategy:"lazyOnload",dangerouslySetInnerHTML:{__html:`
          (function (f, b) {
            if (!b.__SV) {
              var e, g, i, h;
              window.mixpanel = b;
              b._i = [];
              b.init = function (e, f, c) {
                function g(a, d) {
                  var b = d.split(".");
                  2 == b.length && ((a = a[b[0]]), (d = b[1]));
                  a[d] = function () {
                    a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
                  };
                }
                var a = b;
                "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel");
                a.people = a.people || [];
                a.toString = function (a) {
                  var d = "mixpanel";
                  "mixpanel" !== c && (d += "." + c);
                  a || (d += " (stub)");
                  return d;
                };
                a.people.toString = function () {
                  return a.toString(1) + ".people (stub)";
                };
                i =
                  "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(
                    " "
                  );
                for (h = 0; h < i.length; h++) g(a, i[h]);
                var j = "set set_once union unset remove delete".split(" ");
                a.get_group = function () {
                  function b(c) {
                    d[c] = function () {
                      call2_args = arguments;
                      call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
                      a.push([e, call2]);
                    };
                  }
                  for (
                    var d = {},
                      e = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)),
                      c = 0;
                    c < j.length;
                    c++
                  )
                    b(j[c]);
                  return d;
                };
                b._i.push([e, f, c]);
              };
              b.__SV = 1.2;
              e = f.createElement("script");
              e.type = "text/javascript";
              e.async = !0;
              e.src =
                "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL
                  ? MIXPANEL_CUSTOM_LIB_URL
                  : "file:" === f.location.protocol &&
                    "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)
                  ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
                  : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
              g = f.getElementsByTagName("script")[0];
              g.parentNode.insertBefore(e, g);
            }
          })(document, window.mixpanel || []);
          if (typeof window !== "undefined" && window.mixpanel) {
            window.mixpanel.init("8fcb55ee1f0db2ba6b2070374f9b4514", {
              debug: false,
              track_pageview: true,
              persistence: "localStorage",
            });
          }
        `}}),(0,t.jsx)(o.default,{src:"//js.hs-scripts.com/45759574.js",strategy:"lazyOnload",defer:!0,async:!0,onError:e=>{window.newrelic?.noticeError&&window.newrelic.noticeError(Error("hubspot-script-failed"),{script:"js.hs-scripts.com/45759574.js"}),console.warn("[3p-script] hubspot failed to load",e)}}),(0,t.jsx)(o.default,{id:"tiktok",strategy:"lazyOnload",dangerouslySetInnerHTML:{__html:`
        !function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('D25KTORC77UF7183DTR0');
  ttq.page();
}(window, document, 'ttq');
        `}}),(0,t.jsx)(o.default,{id:"meta",strategy:"lazyOnload",dangerouslySetInnerHTML:{__html:`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '528565525249930');
        fbq('track', 'PageView');
        `}}),(0,t.jsx)("noscript",{children:(0,t.jsx)("img",{height:"1",width:"1",style:{display:"none"},alt:e("cookieConsentBanner.image.alt.metaPixel"),src:"https://www.facebook.com/tr?id=528565525249930&ev=PageView&noscript=1"})}),"US"!==a?(0,t.jsx)(o.default,{id:"ascendia-prime",strategy:"lazyOnload",dangerouslySetInnerHTML:{__html:`(function(){
              try {
                var s = document.createElement("script");
                s.async = true;
                s.crossOrigin = "anonymous";
                s.onerror = function(){
                  try {
                    if (window.newrelic && window.newrelic.noticeError) {
                      window.newrelic.noticeError(
                        new Error('wewomedia-script-failed'),
                        { script: 'rtg.wewomedia.com/track/code.js' }
                      );
                    }
                  } catch (_) {}
                };
                s.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//rtg.wewomedia.com/track/code.js";
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(s, a);
              } catch (err) {
                try {
                  if (window.newrelic && window.newrelic.noticeError) {
                    window.newrelic.noticeError(err, { script: 'wewomedia-init' });
                  }
                } catch (_) {}
              }
            })();`}}):null,(0,t.jsx)(H,{})]})};e.s(["CookieConsentBanner",0,L,"useScript",0,e=>{(0,l.useEffect)(()=>{let t=document.createElement("script");return e.onload&&(t.onload=e.onload),t.type="text/javascript","src"in e?t.src=e.src:t.innerHTML=e.body,e.options&&Object.entries(e.options).forEach(([e,r])=>{t.setAttribute(e,r)}),e.head,document.body.appendChild(t),()=>{e.head,document.body.removeChild(t)}},[])}],37563)},447104,(e,t,r)=>{!function(){"use strict";var e={114:function(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function r(e,t){for(var r,a="",i=0,n=-1,o=0,s=0;s<=e.length;++s){if(s<e.length)r=e.charCodeAt(s);else if(47===r)break;else r=47;if(47===r){if(n===s-1||1===o);else if(n!==s-1&&2===o){if(a.length<2||2!==i||46!==a.charCodeAt(a.length-1)||46!==a.charCodeAt(a.length-2)){if(a.length>2){var l=a.lastIndexOf("/");if(l!==a.length-1){-1===l?(a="",i=0):i=(a=a.slice(0,l)).length-1-a.lastIndexOf("/"),n=s,o=0;continue}}else if(2===a.length||1===a.length){a="",i=0,n=s,o=0;continue}}t&&(a.length>0?a+="/..":a="..",i=2)}else a.length>0?a+="/"+e.slice(n+1,s):a=e.slice(n+1,s),i=s-n-1;n=s,o=0}else 46===r&&-1!==o?++o:o=-1}return a}var a={resolve:function(){for(var e,a,i="",n=!1,o=arguments.length-1;o>=-1&&!n;o--)o>=0?a=arguments[o]:(void 0===e&&(e=""),a=e),t(a),0!==a.length&&(i=a+"/"+i,n=47===a.charCodeAt(0));if(i=r(i,!n),n)if(i.length>0)return"/"+i;else return"/";return i.length>0?i:"."},normalize:function(e){if(t(e),0===e.length)return".";var a=47===e.charCodeAt(0),i=47===e.charCodeAt(e.length-1);return(0!==(e=r(e,!a)).length||a||(e="."),e.length>0&&i&&(e+="/"),a)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,r=0;r<arguments.length;++r){var i=arguments[r];t(i),i.length>0&&(void 0===e?e=i:e+="/"+i)}return void 0===e?".":a.normalize(e)},relative:function(e,r){if(t(e),t(r),e===r||(e=a.resolve(e))===(r=a.resolve(r)))return"";for(var i=1;i<e.length&&47===e.charCodeAt(i);++i);for(var n=e.length,o=n-i,s=1;s<r.length&&47===r.charCodeAt(s);++s);for(var l=r.length-s,d=o<l?o:l,c=-1,u=0;u<=d;++u){if(u===d){if(l>d){if(47===r.charCodeAt(s+u))return r.slice(s+u+1);else if(0===u)return r.slice(s+u)}else o>d&&(47===e.charCodeAt(i+u)?c=u:0===u&&(c=0));break}var p=e.charCodeAt(i+u);if(p!==r.charCodeAt(s+u))break;47===p&&(c=u)}var h="";for(u=i+c+1;u<=n;++u)(u===n||47===e.charCodeAt(u))&&(0===h.length?h+="..":h+="/..");return h.length>0?h+r.slice(s+c):(s+=c,47===r.charCodeAt(s)&&++s,r.slice(s))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var r=e.charCodeAt(0),a=47===r,i=-1,n=!0,o=e.length-1;o>=1;--o)if(47===(r=e.charCodeAt(o))){if(!n){i=o;break}}else n=!1;return -1===i?a?"/":".":a&&1===i?"//":e.slice(0,i)},basename:function(e,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');t(e);var a,i=0,n=-1,o=!0;if(void 0!==r&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var s=r.length-1,l=-1;for(a=e.length-1;a>=0;--a){var d=e.charCodeAt(a);if(47===d){if(!o){i=a+1;break}}else -1===l&&(o=!1,l=a+1),s>=0&&(d===r.charCodeAt(s)?-1==--s&&(n=a):(s=-1,n=l))}return i===n?n=l:-1===n&&(n=e.length),e.slice(i,n)}for(a=e.length-1;a>=0;--a)if(47===e.charCodeAt(a)){if(!o){i=a+1;break}}else -1===n&&(o=!1,n=a+1);return -1===n?"":e.slice(i,n)},extname:function(e){t(e);for(var r=-1,a=0,i=-1,n=!0,o=0,s=e.length-1;s>=0;--s){var l=e.charCodeAt(s);if(47===l){if(!n){a=s+1;break}continue}-1===i&&(n=!1,i=s+1),46===l?-1===r?r=s:1!==o&&(o=1):-1!==r&&(o=-1)}return -1===r||-1===i||0===o||1===o&&r===i-1&&r===a+1?"":e.slice(r,i)},format:function(e){var t,r;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+r:t+"/"+r:r},parse:function(e){t(e);var r,a={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return a;var i=e.charCodeAt(0),n=47===i;n?(a.root="/",r=1):r=0;for(var o=-1,s=0,l=-1,d=!0,c=e.length-1,u=0;c>=r;--c){if(47===(i=e.charCodeAt(c))){if(!d){s=c+1;break}continue}-1===l&&(d=!1,l=c+1),46===i?-1===o?o=c:1!==u&&(u=1):-1!==o&&(u=-1)}return -1===o||-1===l||0===u||1===u&&o===l-1&&o===s+1?-1!==l&&(0===s&&n?a.base=a.name=e.slice(1,l):a.base=a.name=e.slice(s,l)):(0===s&&n?(a.name=e.slice(1,o),a.base=e.slice(1,l)):(a.name=e.slice(s,o),a.base=e.slice(s,l)),a.ext=e.slice(o,l)),s>0?a.dir=e.slice(0,s-1):n&&(a.dir="/"),a},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,e.exports=a}},r={};function a(t){var i=r[t];if(void 0!==i)return i.exports;var n=r[t]={exports:{}},o=!0;try{e[t](n,n.exports,a),o=!1}finally{o&&delete r[t]}return n.exports}a.ab="/ROOT/node_modules/next/dist/compiled/path-browserify/",t.exports=a(114)}()},138018,(e,t,r)=>{t.exports={GENERATED_NAMESPACES:["cart","common","home","homepage","m1","marketing","performance-lab","performanceLabs","photon","powerPlugsRedeem","ring","ring-pro","uhHome","uhXLesMills"]}},47811,(e,t,r)=>{let a=e.r(447104),{GENERATED_NAMESPACES:i}=e.r(138018);t.exports={i18n:{locales:["en-US","ja","de","th","fr","zh","zh-TW"],defaultLocale:"en-US",localeDetection:!1,showSupportNotice:!1},defaultNS:"common",ns:[...i],localePath:a.resolve("./public/locales"),reloadOnPrerender:!1,fallbackLng:{default:["en-US"]},interpolation:{escapeValue:!1},react:{useSuspense:!1},debug:!1,load:"currentOnly",keySeparator:".",nsSeparator:":",returnEmptyString:!1,returnNull:!1,serializeConfig:!1}},261592,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useUntrackedPathname",{enumerable:!0,get:function(){return n}});let a=e.r(191788),i=e.r(470008);function n(){return!function(){if("u"<typeof window){let{workUnitAsyncStorage:t}=e.r(119202),r=t.getStore();if(!r)return!1;switch(r.type){case"prerender":case"prerender-client":case"prerender-ppr":case"validation-client":let a=r.fallbackRouteParams;return!!a&&a.size>0}}return!1}()?(0,a.useContext)(i.PathnameContext):null}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},916844,(e,t,r)=>{"use strict";function a(e,t=!0){return e.pathname+e.search+(t?e.hash:"")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createHrefFromUrl",{enumerable:!0,get:function(){return a}}),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},250251,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={handleHardNavError:function(){return o},useNavFailureHandler:function(){return s}};for(var i in a)Object.defineProperty(r,i,{enumerable:!0,get:a[i]});e.r(191788);let n=e.r(916844);function o(e){return!!(e&&"u">typeof window)&&!!window.next.__pendingUrl&&(0,n.createHrefFromUrl)(new URL(window.location.href))!==(0,n.createHrefFromUrl)(window.next.__pendingUrl)&&(console.error("Error occurred during navigation, falling back to hard navigation",e),window.location.href=window.next.__pendingUrl.toString(),!0)}function s(){}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},203216,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"handleISRError",{enumerable:!0,get:function(){return i}});let a="u"<typeof window?e.r(398401).workAsyncStorage:void 0;function i({error:e}){if(a){let t=a.getStore();if(t?.isStaticGeneration)throw e&&console.error(e),e}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},748429,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={ErrorBoundary:function(){return g},ErrorBoundaryHandler:function(){return m}};for(var i in a)Object.defineProperty(r,i,{enumerable:!0,get:a[i]});let n=e.r(952456),o=e.r(391398),s=n._(e.r(191788)),l=e.r(261592),d=e.r(68934);e.r(250251);let c=e.r(203216),u=e.r(47852),p=e.r(701085),h="u">typeof window&&(0,u.isBot)(window.navigator.userAgent);class m extends s.default.Component{static{this.contextType=p.AppRouterContext}constructor(e){super(e),this.reset=()=>{this.setState({error:null})},this.unstable_retry=()=>{(0,s.startTransition)(()=>{this.context?.refresh(),this.reset()})},this.state={error:null,previousPathname:this.props.pathname}}static getDerivedStateFromError(e){if((0,d.isNextRouterError)(e))throw e;return{error:e}}static getDerivedStateFromProps(e,t){let{error:r}=t;return e.pathname!==t.previousPathname&&t.error?{error:null,previousPathname:e.pathname}:{error:t.error,previousPathname:e.pathname}}render(){return this.state.error&&!h?((0,c.handleISRError)({error:this.state.error}),(0,o.jsxs)(o.Fragment,{children:[this.props.errorStyles,this.props.errorScripts,(0,o.jsx)(this.props.errorComponent,{error:this.state.error,reset:this.reset,unstable_retry:this.unstable_retry})]})):this.props.children}}function g({errorComponent:e,errorStyles:t,errorScripts:r,children:a}){let i=(0,l.useUntrackedPathname)();return e?(0,o.jsx)(m,{pathname:i,errorComponent:e,errorStyles:t,errorScripts:r,children:a}):(0,o.jsx)(o.Fragment,{children:a})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},365777,(e,t,r)=>{t.exports=e.r(879466)},318540,e=>{"use strict";var t,r,a=e.i(350461),i=e.i(391398),n=e.i(168489),o=e.i(958678),s=e.i(191788),l=e.i(760814),d=e.i(506504),c=e.i(957134),u=e.i(756453),p=e.i(751172),h=e.i(866809),m=e.i(879865),g=e.i(202962),f=e.i(719152),b=e.i(602249),x=e.i(651162),y=e.i(953031),w=e.i(150687),v=e.i(265217),C=e.i(37563),k=e.i(203828),S=e.i(777658);let j="AW-614890616",_=`${j}/obrZCPvL1MQcEPj4maUC`,I=()=>{let e=(0,k.useRouter)();return(0,S.isPerformanceLabRoute)(e.pathname)?(0,i.jsxs)(o.default,{children:[(0,i.jsx)("script",{async:!0,src:`https://www.googletagmanager.com/gtag/js?id=${j}`}),(0,i.jsx)("script",{dangerouslySetInnerHTML:{__html:`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${j}');
          `}}),(0,i.jsx)("script",{dangerouslySetInnerHTML:{__html:`
            gtag('config', '${_}', {
              'phone_conversion_number': '+918047282422'
            });
          `}})]}):null};var E=e.i(546737);e.i(664157);var P=e.i(91214),N=e.i(47811),A=e.i(748429),R=e.i(78198),T=e.i(365777),V=e.i(91147),L=e.i(214073),U=e.i(278490),$=e.i(591898),M=e.i(171225),O=e.i(859207),W=e.i(700228),z=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,F=(t=function(e){return z.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)},r=Object.create(null),function(e){return void 0===r[e]&&(r[e]=t(e)),r[e]}),D=e.i(307959);let q=(0,n.default)(()=>e.A(13830).then(e=>({default:e.DeferredVercelAnalytics})),{loadableGenerated:{modules:[785852]},ssr:!1}),B=(0,n.default)(()=>e.A(409135),{loadableGenerated:{modules:[314075]},ssr:!1}),H=l.createGlobalStyle`
  html {
    background-color: ${({theme:e})=>e.colorsV2.background};
	  font-size: 62.5%;

    * {
      font-family: var(--font-graphik), system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    --grid-column-width: ${({theme:e})=>e.globalV2.xxl.gridColumnWidth};
    --grid-column-gap: ${({theme:e})=>e.globalV2.xxl.gridColumnGap};
    --grid-column-spacing: ${({theme:e})=>e.globalV2.xxl.gridColumSpacing};

    @media (max-width: ${({theme:e})=>e.globalV2.xl.maxWidth}) {
      --grid-column-gap: ${({theme:e})=>e.globalV2.xl.gridColumnGap};
      --grid-column-spacing: ${({theme:e})=>e.globalV2.xl.gridColumSpacing};
    }
    @media (max-width: ${({theme:e})=>e.globalV2.lg.maxWidth}) {
      --grid-column-gap: ${({theme:e})=>e.globalV2.lg.gridColumnGap};
      --grid-column-spacing: ${({theme:e})=>e.globalV2.lg.gridColumSpacing};
    }
    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      --grid-column-gap: ${({theme:e})=>e.globalV2.md.gridColumnGap};
      --grid-column-spacing: ${({theme:e})=>e.globalV2.md.gridColumSpacing};
    }
    @media (max-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
      --grid-column-gap: ${({theme:e})=>e.globalV2.sm.gridColumnGap};
      --grid-column-spacing: ${({theme:e})=>e.globalV2.sm.gridColumSpacing};
    }
  }

  body {
    color: ${({theme:e})=>e.colorsV2.primary};
    max-width: 100vw;
    width: 100%;
    overflow-x: hidden;
    min-height: var(--viewportHeight, 100vh);

    .gtm > * {
      pointer-events: none;
    }
  }

  html, body {
    width: 100vw;
    max-width: 100vw;
}

  a {
    color: ${({theme:e})=>e.colorsV2.primary};
    text-decoration: none;
    cursor: pointer;

    // &:hover {
    //   text-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
    // }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--viewportHeight, 100vh);
    background-color: #000;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transition: opacity 0.3s ease-out;
    pointer-events: none;
  }

  #loader.loaded {
    opacity: 0;
    visibility: hidden;
  }

  @keyframes splashFade {
    0%,
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  #loader.cold {
    animation: splashFade 800ms ease-out forwards;
  }

  #main-content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  button {
    cursor: pointer;
  }

  button.transparent {
    background-color: transparent;
    border: none;
  }

  button, a {
    -webkit-tap-highlight-color: transparent;
  }
`,G=(e,t)=>"string"!=typeof t||F(e),Y=({children:e,regionLocale:t})=>(0,i.jsx)(D.RegionLocaleContext.Provider,{value:t,children:e}),X=JSON.stringify({"@context":"https://schema.org","@type":"Organization",name:"Ultrahuman",legalName:"Ultrahuman Inc.",url:"https://www.ultrahuman.com",logo:"https://www.ultrahuman.com/logo.png",description:"Ultrahuman is the world's most comprehensive self-quantification platform. Ultrahuman helps you track your sleep, movement, metabolism, recovery, and more.",foundingDate:"2019",founders:[{"@type":"Person",name:"Mohit Kumar"},{"@type":"Person",name:"Vatsal Singhal"}],contactPoint:["US","IN","GB","AE"].map(e=>({"@type":"ContactPoint",telephone:L.PHONE_NUMBER_BY_COUNTRY[e],contactType:"Customer Service",areaServed:e,email:"support@ultrahuman.com",availableLanguage:["en"]})),sameAs:["https://www.facebook.com/UltrahumanHQ","https://twitter.com/UltrahumanHQ","https://www.instagram.com/UltrahumanHQ","https://www.linkedin.com/company/ultrahuman","https://www.youtube.com/@ultrahuman"],address:{"@type":"PostalAddress",streetAddress:L.US_ADDRESS.streetAddress,addressLocality:L.US_ADDRESS.addressLocality,addressRegion:L.US_ADDRESS.addressRegion,postalCode:L.US_ADDRESS.postalCode,addressCountry:L.US_ADDRESS.addressCountry}}),K=({Component:e,pageProps:t})=>{let r=(0,s.useCallback)(e=>{(window.innerWidth>w.TABLET_MAX_WIDTH_IN_PX||e)&&document.documentElement.style.setProperty("--viewportHeight",`${window.innerHeight}px`)},[]);(0,s.useEffect)(()=>{r(!0);let e=0,t=()=>{e||(e=requestAnimationFrame(()=>{e=0,r(!1)}))};return window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t),e&&cancelAnimationFrame(e)}},[]);let a=t.regionLocale||{region:"GLOBAL",language:"en",locale:"en-US",store:O.ShopifyStore.ROW,currency:W.Currency.usd,regionSlug:"global",flag:null,countryName:"Global",detectedRegionFromGeoIP:"XX"};return(0,i.jsx)(Y,{regionLocale:a,children:(0,i.jsx)(l.StyleSheetManager,{shouldForwardProp:G,enableVendorPrefixes:!0,children:(0,i.jsx)(l.ThemeProvider,{theme:w.theme,children:(0,i.jsxs)("div",{className:`${x.graphik.className} ${y.graphikItalic.variable}`,children:[(0,i.jsxs)(o.default,{children:[(0,i.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"}),(0,i.jsx)("link",{rel:"icon",type:"image/svg+xml",href:"/favicon.svg"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,i.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon.png"}),(0,i.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,i.jsx)("meta",{name:"msapplication-TileColor",content:"#000000"}),(0,i.jsx)("meta",{name:"theme-color",content:"#000000"}),(0,i.jsx)("meta",{httpEquiv:"Content-type",content:"text/html; charset=utf-8"}),(0,i.jsx)("meta",{httpEquiv:"X-UA-Compatible",content:"IE=Edge"}),(0,i.jsx)("meta",{name:"apple-itunes-app",content:"app-id=1491286709, app-argument=ultrahuman://"}),(0,i.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,i.jsx)("meta",{name:"twitter:site",content:"@ultrahumanhq"}),(0,i.jsx)("meta",{name:"twitter:creator",content:"@ultrahumanhq"}),(0,i.jsx)("meta",{name:"twitter:title",content:"Ultrahuman. Real-time sleep and recovery tracking."},"twitter-title"),(0,i.jsx)("meta",{name:"twitter:description",content:"Ultrahuman Ring AIR ® is the world’s most comfortable and compact smart ring that monitors your sleep, movement and recovery. Now HSA/FSA eligible."},"twitter-description"),(0,i.jsx)("meta",{name:"twitter:image",content:(0,R.getAssetUrl)("/web_v2/thumb/uh-icon-1000x1000.png")},"twitter-image"),(0,i.jsx)("meta",{name:"twitter:app:country",content:"in"}),(0,i.jsx)("meta",{name:"al:ios:app_name",content:"Ultrahuman"}),(0,i.jsx)("meta",{name:"al:ios:app_store_id",content:"1491286709"}),(0,i.jsx)("meta",{name:"twitter:app:name:iphone",content:"Ultrahuman"}),(0,i.jsx)("meta",{name:"twitter:app:id:iphone",content:"1491286709"}),(0,i.jsx)("meta",{name:"twitter:app:url:iphone",content:"https://ultrahuman.com"}),(0,i.jsx)("meta",{name:"twitter:app:name:ipad",content:"Ultrahuman"}),(0,i.jsx)("meta",{name:"twitter:app:id:ipad",content:"1491286709"}),(0,i.jsx)("meta",{name:"twitter:app:url:ipad",content:"https://ultrahuman.com"}),(0,i.jsx)("meta",{name:"twitter:app:name:googleplay",content:"Ultrahuman"}),(0,i.jsx)("meta",{name:"twitter:app:id:googleplay",content:"com.ultrahuman.android"}),(0,i.jsx)("meta",{name:"twitter:app:url:googleplay",content:"https://ultrahuman.com"}),(0,i.jsx)("meta",{property:"og:title",content:"Ultrahuman. Real-time sleep and recovery tracking."},"og-title"),(0,i.jsx)("meta",{property:"og:type",content:"website"}),(0,i.jsx)("meta",{property:"og:image",content:(0,R.getAssetUrl)("/web_v2/thumb/uh-icon-1000x1000.png")},"og-image"),(0,i.jsx)("meta",{name:"description",content:"Ultrahuman Ring AIR is the world’s most comfortable and compact smart ring that monitors your sleep, movement and recovery."},"description"),(0,i.jsx)("meta",{name:"keywords",content:"smart ring, sleep tracker, health ring, HRV monitor, Ultrahuman Ring AIR, Ultrahuman Home, recovery tracking"}),(0,i.jsx)("meta",{name:"google-site-verification",content:"goXdcs-BRzl1LZnYifn_4joxaeuwX1_YURq8waDCfB0"}),(0,i.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:`{
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Ultrahuman",
                  "url": "https://www.ultrahuman.com"
                }`}}),(0,i.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:X}})]}),(0,i.jsx)(I,{}),(0,i.jsx)(H,{}),(0,i.jsx)(b.RouteLoader,{}),(0,i.jsx)("div",{id:"main-content",children:(0,i.jsx)(A.ErrorBoundary,{errorComponent:()=>(0,i.jsx)(u.ApplicationErrorComponent,{}),children:(0,i.jsxs)(E.GlobalUIProvider,{children:[(0,i.jsx)(C.CookieConsentBanner,{}),(0,i.jsx)(f.ToastProvider,{children:(0,i.jsx)(p.UserAnalyticsProvider,{children:(0,i.jsx)(d.CartProvider,{initialCampaigns:t.initialCampaigns,children:(0,i.jsx)(c.ModalProvider,{children:(0,i.jsxs)(v.MagicModalNewProvider,{children:[(0,i.jsx)(g.Header,{}),(0,i.jsx)(e,{...t}),(0,i.jsx)(h.Cart,{}),(0,i.jsx)(m.Footer,{}),(0,i.jsx)(B,{})]})})})})})]})})}),(0,i.jsx)(q,{})]})})})})};K.getInitialProps=async e=>{let t,r,i,n,o,s,l=await T.default.getInitialProps(e),d=e.ctx.req,c=e.ctx.query,u=e=>Array.isArray(e)?e[0]:e,p=d&&u(d.headers["cf-ipcountry"])?.toUpperCase()||d&&u(d.headers["x-vercel-ip-country"])?.toUpperCase()||a.default.env.NEXT_PUBLIC_DEFAULT_COUNTRY||"XX";"PR"===p&&(p="US");let h=d&&u(d.headers["x-vercel-ip-city"])?.toUpperCase()||"XX",m=d&&u(d.headers["x-vercel-ip-country-region"])?.toUpperCase()||"XX",g=d?.headers["x-uh-region"],f=d?.headers["x-uh-language"],b=d?.headers["x-uh-locale"],x=d?.headers["x-uh-slug"],y=d?.headers["x-uh-store"],w=d?.headers["x-uh-currency"],v=d?.headers["x-uh-country-name"],C=g?.toUpperCase()||p,k=f||"en",S=function(e){let{baseCountry:t,queryLocale:r,queryCountry:a}=e,i=r?.toUpperCase()??a?.toUpperCase()??t,n=(0,$.isROWStore)(i)?"row":(i||"").toLowerCase();return"pr"===n&&(n="us"),n}({baseCountry:C,queryLocale:c.locale??void 0,queryCountry:c.country??void 0});if("th"!==S)try{let e=await (0,U.fetchCampaigns)(S,!0);t=e.fetchFailed?void 0:(0,U.getActiveCampaigns)(e.campaigns)}catch(e){t=void 0}if(y&&w&&x&&b)r=x,i=b,n=y,o=w,s=v||null;else{let e=(0,M.getRegionConfig)(C);r=(0,M.buildRegionLocaleSlug)(C,k),i="en"===k?"en-US":k,n=e.shopifyStore,o=e.currency,s=e.countryName}return{...l,pageProps:{...l.pageProps,geo:{country:p,city:h,region:m},regionLocale:{region:C,language:k,locale:i,store:n,currency:o,regionSlug:r,flag:(0,V.getFlagSrc)(C),countryName:s,detectedRegionFromGeoIP:p},initialCampaigns:t}}};let Q=(0,P.appWithTranslation)(K,N.default);e.s(["default",0,Q],318540)}]);