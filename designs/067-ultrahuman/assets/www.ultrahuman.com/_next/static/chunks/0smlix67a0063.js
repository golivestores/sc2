(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,731732,e=>{"use strict";e.s(["emailRegex",0,/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/])},893966,e=>{"use strict";e.i(191788);var i=e.i(700228);e.i(101814);var t=e.i(591898);let n=e=>{switch(e){case i.Currency.inr:return"en-IN";case i.Currency.gbp:return"en-GB";case i.Currency.eur:return"de-DE";case i.Currency.aed:return"ar-AE";case i.Currency.usd:default:return"en-US"}},a=(e,t=i.Currency.usd,a={})=>{let o="string"==typeof t?t.toLowerCase():t;if(o===i.Currency.inr)return e>=1e7?`${(e/1e7).toFixed(2*(e%1e7!=0))} Cr`:e>=1e5?`${(e/1e5).toFixed(2*(e%1e5!=0))} L`:new Intl.NumberFormat("en-IN").format(e);return o===i.Currency.aed?new Intl.NumberFormat(n(o),{maximumFractionDigits:0,...a}).format(e):new Intl.NumberFormat(n(o),{style:a.style||"decimal",maximumFractionDigits:a.maximumFractionDigits??0,...a}).format(e)};e.s(["formatPrice",0,a,"formatPriceWithSymbol",0,(e,n=i.Currency.usd,o={})=>{let r="string"==typeof n?n.toLowerCase():n,l=(0,t.getCurrencySymbolFromString)(r),d=a(e,r,o);return r===i.Currency.aed?`${d} ${l}`:`${l}${d}`}])},555037,e=>{"use strict";var i=e.i(391398);e.s(["Lightning",0,({className:e,style:t,fill:n="white",width:a=16,height:o=16})=>(0,i.jsxs)("svg",{className:e,style:t,width:a,height:o,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,i.jsx)("g",{"clip-path":"url(#clip0_3246_23431)",children:(0,i.jsx)("path",{d:"M13.5 6.77344H9L10 0.773438L2.5 9.77344H7L6 15.7734L13.5 6.77344Z",fill:n})}),(0,i.jsx)("defs",{children:(0,i.jsx)("clipPath",{id:"clip0_3246_23431",children:(0,i.jsx)("rect",{width:"16",height:"16",fill:n,transform:"translate(0 0.273438)"})})})]})])},415575,e=>{"use strict";let i={[e.i(859207).ShopifyStore.IN]:{variantId:"gid://shopify/ProductVariant/43919354626118",checkouturl:"https://ultrahumanstore.myshopify.com/cart/43919354626118:1?channel=buy_button",price:28499,offerPrice:28499,discountCode:""}};e.s(["GiftCartProductShopifyMap",0,i,"buildCheckoutUrl",0,(e,t,n,a)=>{let o=i[e];if(!o)return"";let r=new URL(o.checkouturl);return r.searchParams.set("attributes[giftee_name]",t),r.searchParams.set("attributes[giftee_email]",n),a?r.searchParams.set("discount",a):r.searchParams.set("discount",o.discountCode),r.toString()}])},210670,e=>{"use strict";var i=e.i(391398),t=e.i(730943);e.i(664157);var n=e.i(271179),a=e.i(760814),o=e.i(486332),r=e.i(121666),l=e.i(415575),d=e.i(859207),s=e.i(700228),c=e.i(893966),p=e.i(191788),h=e.i(555037),g=e.i(78198),m=e.i(657232),f=e.i(153147);let x=a.default.section.withConfig({componentId:"sc-c0543480-0"})`
  ${({$isInsideModal:e})=>e?a.css`
          padding: 38px 0;
        `:a.css`
          padding: 120px 0;
        `}
`,u=a.default.div.withConfig({componentId:"sc-c0543480-1"})`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`,b=a.default.div.withConfig({componentId:"sc-c0543480-2"})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 80px;
  margin-top: 40px;
`,w=a.default.div.withConfig({componentId:"sc-c0543480-3"})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: -0.6px;
`,y=a.default.h2.withConfig({componentId:"sc-c0543480-4"})`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 32px */
  letter-spacing: -0.96px;
  margin: 0;
`,C=a.default.div.withConfig({componentId:"sc-c0543480-5"})`
  display: flex;
  justify-content: center;
`,j=a.default.div.withConfig({componentId:"sc-c0543480-6"})`
  display: flex;
  flex-direction: column;
  gap: 80px;
`,v=a.default.div.withConfig({componentId:"sc-c0543480-7"})`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`,I=a.default.div.withConfig({componentId:"sc-c0543480-8"})`
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px;
  border-radius: 24px;
  border: 3px solid rgba(0, 0, 0, 0.09);
  overflow: hidden;
`,k=a.default.img.withConfig({componentId:"sc-c0543480-9"})`
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
`,R=a.default.div.withConfig({componentId:"sc-c0543480-10"})`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
`,W=a.default.h3.withConfig({componentId:"sc-c0543480-11"})`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 28px */
  letter-spacing: -0.6px;
  margin: 0;
`,$=a.default.p.withConfig({componentId:"sc-c0543480-12"})`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: -0.6px;
  margin: 0;
`,z=a.default.div.withConfig({componentId:"sc-c0543480-13"})`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 92px;
`,P=a.default.h4.withConfig({componentId:"sc-c0543480-14"})`
  margin: 0 0 28px 0;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.6px;

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 14px;
  }
`,S=a.default.ol.withConfig({componentId:"sc-c0543480-15"})`
  padding-left: 24px;
  margin: 0;
  list-style-position: outside;

  /* Apply typography to the whole list so numbers and wrapped lines match exactly */
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.6px;

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 14px;
  }

  li {
    align-self: stretch;
    margin-bottom: 6px;
    color: rgba(0, 0, 0, 0.7);
  }
`,A=a.default.div.withConfig({componentId:"sc-c0543480-16"})`
  width: 100%;
  height: 1px;
  background: #000000;
  opacity: 0.1;
  margin: 92px 0;
`,G=[{title:"Step 1: Give the gift of better health",subtitle:"Surprise someone you care about with the Ring AIR Gift Card (with complimentary engraving).",image:"001.png"},{title:"Step 2: Easy redemption",subtitle:"The recipient gets a simple redemption link to personalise their Ring AIR — choosing their size, finish, and optional engraving. The gift card is valid for 1 year from purchase.",image:"002.png"},{title:"Step 3: Their ring, their story",subtitle:"Once redeemed, their Ultrahuman Ring AIR is made just for them — perfectly sized, engraved, and ready to take their health journey to the next level.",image:"003.png"}],M=({isInsideModal:e=!1})=>{let{t}=(0,n.useTranslation)("homepage"),a="Gift better health to the ones who matter most — a thoughtful surprise that doesn’t feel last-minute.",r=(0,m.useWindowSize)().width<768,l=(0,p.useMemo)(()=>G.map(e=>({...e,image:r?"mobile-new/"+e.image:"desktop-new/"+e.image})),[r]);return(0,i.jsx)(x,{"aria-labelledby":"gift-kit-title",$isInsideModal:e,children:(0,i.jsxs)(u,{children:[(0,i.jsxs)(b,{children:[(0,i.jsx)(y,{id:"gift-kit-title",children:t("homepage.howItWorks.title.giftCardWorks","How the Ring AIR Gift Card works")}),(0,i.jsxs)(w,{"aria-label":e?a:"Ships in 24 hours",children:[!e&&(0,i.jsx)(h.Lightning,{width:16,height:16,fill:"#000000","aria-hidden":"true"}),e?a:"SHIPS IN 24 HOURS"]}),!e&&(0,i.jsx)(C,{children:(0,i.jsx)(o.ButtonV2,{variant:"blue",href:"/gift","aria-label":t("homepage.howItWorks.aria.purchaseGiftKit","Purchase gift kit for Ring Air"),children:t("homepage.howItWorks.button.giftRingAir","Gift Ring AIR")})})]}),(0,i.jsx)(j,{role:"list","aria-label":t("homepage.howItWorks.aria.giftKitProcessSteps","Gift kit process steps"),children:l.map((e,t)=>(0,i.jsxs)(v,{role:"listitem",children:[(0,i.jsx)(I,{children:(0,i.jsx)(k,{src:(0,g.getCompressedAssetUrl)(`/web_v2/gift-card/how-to/${e.image}`),alt:`${e.title}: ${e.subtitle}`})}),(0,i.jsxs)(R,{children:[(0,i.jsx)(W,{children:e.title}),(0,i.jsx)($,{children:e.subtitle})]})]},t))}),(0,i.jsx)(A,{}),(0,i.jsxs)(z,{"aria-labelledby":"gift-card-terms-title",children:[(0,i.jsx)(P,{id:"gift-card-terms-title",children:t("homepage.howItWorks.terms.heading","Terms & Conditions")}),(0,i.jsxs)(S,{children:[(0,i.jsx)("li",{children:t("homepage.howItWorks.terms.priceAtPurchase","Gift the Ultrahuman Ring AIR via the Gift Card at the price available during purchase — includes any active discounts (e.g. 15% off).")}),(0,i.jsx)("li",{children:t("homepage.howItWorks.terms.applicableToRingAirOnly","The Gift Card is applicable to the Ultrahuman Ring AIR only.")}),(0,i.jsx)("li",{children:t("homepage.howItWorks.terms.includesFreeEngraving","The Gift Card includes free engraving, optional during redemption by the recipient.")}),(0,i.jsx)("li",{children:t("homepage.howItWorks.terms.validOneYear","The Gift Card is valid for 1 year from the date of purchase and is for one-time use only.")}),(0,i.jsxs)("li",{children:[t("homepage.howItWorks.terms.redeemableInIndia","The Gift Card is redeemable only in India via the")," ",(0,i.jsx)(f.default,{href:"/gift-card/claim","aria-label":t("homepage.howItWorks.aria.redemptionPage","Gift card redemption page"),style:{textDecoration:"underline",fontWeight:"400",color:"rgba(0, 0, 0)"},children:t("homepage.howItWorks.link.dedicatedRedemptionPage","dedicated redemption page")}),"."]})]})]})]})})};var T=e.i(402100),V=e.i(29282);let N=a.keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,L=a.keyframes`
  from {
    transform: translateY(80px);
  }
  to {
    transform: translateY(0);
  }
`,B=a.default.div.withConfig({componentId:"sc-ab123ec4-0"})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-backdrop-filter: blur(75px);
  backdrop-filter: blur(75px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
  padding: 0;
  transform: translateZ(0);

  animation: ${N} 0.3s ease-in-out;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding: 16px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.xl.maxWidth}) {
    padding: 24px;
  }
`,F=a.default.div.withConfig({componentId:"sc-ab123ec4-1"})`
  position: relative;
  width: 100%;
  min-height: calc(100svh - 64px);
  max-height: 100%;
  height: auto;
  background: rgba(238, 238, 238, 1);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  overflow-y: auto;
  overscroll-behavior: contain;

  animation: ${L} 0.3s ease-in-out;

  ${T.hideScrollbar};

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    border-radius: 20px;
    max-height: 100vh;
    min-height: 100vh;
    border-radius: 0;
  }

  .content-wrapper {
    @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      padding-bottom: 96px;
    }
  }
`,U=a.default.button.withConfig({componentId:"sc-ab123ec4-2"})`
  position: absolute;
  right: 16px;
  top: 16px;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  padding: 8px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #000;
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid #057ff0;
    outline-offset: 2px;
  }

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    right: 16px;
    top: 16px;
  }

  &.sm-hidden {
    display: none;

    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      display: flex;
    }
  }

  &.lg-hidden {
    display: flex;

    @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
      display: none;
    }
  }
`,_=a.default.div.withConfig({componentId:"sc-ab123ec4-3"})`
  width: 100%;
  padding-left: 192px;
  padding-right: 192px;

  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${({theme:e})=>e.globalV2.xl.maxWidth}) {
    padding-left: 82px;
    padding-right: 82px;
  }

  @media (max-width: ${({theme:e})=>e.globalV2.md.minWidth}) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    width: 100%;
    max-width: 1200px;
    padding-left: 16px;
    padding-right: 16px;
  }
`,E=a.default.div.withConfig({componentId:"sc-ab123ec4-4"})`
  position: sticky;
  top: 0;
  left: 0;
  display: block;
  background: rgba(250, 250, 250, 1);
  z-index: 10;
  padding-top: 64px;
  padding-bottom: 64px;

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    display: none;
  }
`,O=a.default.div.withConfig({componentId:"sc-ab123ec4-5"})`
  display: flex;
  align-items: center;
  gap: 20px;
`,D=a.default.div.withConfig({componentId:"sc-ab123ec4-6"})`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  flex-shrink: 0;

  @media (max-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
    width: 48px;
    height: 48px;
  }
`,H=a.default.div.withConfig({componentId:"sc-ab123ec4-7"})`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,K=a.default.div.withConfig({componentId:"sc-ab123ec4-8"})`
  flex-shrink: 0;
`,Z=a.default.b.withConfig({componentId:"sc-ab123ec4-9"})`
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #000000;
  margin: 0;
  display: block;

  @media (max-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
    font-size: 14px;
  }
`,Y=a.default.div.withConfig({componentId:"sc-ab123ec4-10"})`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  line-height: 100%;

  .old-price {
    color: rgba(0, 0, 0, 0.5);
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.43px;
    text-decoration-line: line-through;
  }

  .new-price {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
    letter-spacing: -0.28px;
  }
`,q=a.default.div.withConfig({componentId:"sc-ab123ec4-11"})`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
  padding-top: 16px;
  padding-bottom: 24px;

  background: rgba(0, 0, 0, 0.07);
  box-shadow: rgb(255, 255, 255) 0px 1px 2px 0px inset;
  border-top: 1px solid rgba(219, 219, 219, 0.3);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  @media (max-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    display: block;
  }
`,J=a.default.div.withConfig({componentId:"sc-ab123ec4-12"})`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`,Q=a.default.div.withConfig({componentId:"sc-ab123ec4-13"})`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;

    * {
      width: 100%;
    }
  }
`,X=a.default.div.withConfig({componentId:"sc-ab123ec4-14"})`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60%;

  @media (max-width: ${({theme:e})=>e.globalV2.md.minWidth}) {
    gap: 4px;
    width: 100%;
  }
`,ee=a.default.div.withConfig({componentId:"sc-ab123ec4-15"})`
  font-weight: 500;
  font-size: 20px;
  color: #000;
  letter-spacing: -0.54px;
  width: 100%;
  line-height: 1.2;
  min-height: 1.2em;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,ei=a.default.div.withConfig({componentId:"sc-ab123ec4-16"})`
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.42px;
  width: 100%;
  min-height: 1.2em;
  gap: 4px;

  b,
  strong {
    font-weight: 500;
  }

  .separator {
    color: rgba(0, 0, 0, 0.3);
    margin: 0 4px;
  }

  .old-price {
    color: rgba(0, 0, 0, 0.5);
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.43px;
    text-decoration-line: line-through;
    margin-right: 8px;
  }

  .new-price {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
    letter-spacing: -0.28px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,et=a.default.button.withConfig({componentId:"sc-ab123ec4-17"})`
  background: #057ff0;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 20px 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.2px;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: #0461c7;
  }

  &:focus {
    outline: 2px solid #057ff0;
    outline-offset: 2px;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    border-radius: 12px;
    padding: 16px;
    font-size: 14px;
  }
`;e.s(["default",0,({onClose:e,onCTA:a,ctaLabel:p="Gift Ring AIR",ctaDisabled:h=!1,closeOnCTA:g=!0,children:m})=>{let{t:f}=(0,n.useTranslation)("homepage"),x=(0,V.useCampaigns)(),u="Ring AIR Gift Card",b={...l.GiftCartProductShopifyMap[d.ShopifyStore.IN]},w=(0,V.getCampaignByProduct)(x.campaigns,"ring"),y=(0,V.getCampaignConfig)(w);y?.active&&(b.discountCode=y.discountCode,"percentage"===y.discountType?b.offerPrice=Math.trunc(b.price-b.price*y.discount/100):"flat"===y.discountType&&(b.offerPrice=b.price-y.discount));let C=b&&b.price!==b.offerPrice,j=(0,c.formatPriceWithSymbol)(b.price,s.Currency.inr),v=(0,c.formatPriceWithSymbol)(b.offerPrice,s.Currency.inr),I=(0,i.jsx)(B,{role:"dialog","aria-modal":"true","aria-labelledby":"modal-title","aria-describedby":"modal-description",children:(0,i.jsxs)(F,{children:[(0,i.jsx)(U,{onClick:e,className:"lg-hidden","aria-label":f("homepage.howItWorksModal.aria.closeModal","Close modal"),children:(0,i.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:(0,i.jsx)("path",{d:"M18 6L6 18M6 6l12 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,i.jsxs)(E,{children:[(0,i.jsx)(U,{onClick:e,className:"sm-hidden","aria-label":f("homepage.howItWorksModal.aria.closeModal","Close modal"),children:(0,i.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:(0,i.jsx)("path",{d:"M18 6L6 18M6 6l12 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,i.jsx)(_,{children:(0,i.jsxs)(O,{children:[(0,i.jsx)(D,{children:(0,i.jsx)(r.CustomImage,{src:"web_v2/gift-card/how-to/icon-new.png",alt:"Ring AIR Gift",width:1028,height:1028,style:{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",transform:"scale(1.5)"}})}),(0,i.jsxs)(H,{children:[(0,i.jsx)(Z,{id:"modal-title",children:u}),v&&(0,i.jsxs)(Y,{"aria-label":C?`Price reduced from ${j} to ${v}`:`Price ${v}`,children:[C&&j&&(0,i.jsx)("span",{className:"old-price",children:j}),(0,i.jsx)("span",{className:"new-price",children:v})]})]}),(0,i.jsx)(K,{children:(0,i.jsx)(o.ButtonV2,{variant:"blue",disabled:h,onClick:()=>{a&&a(),g&&e()},"aria-label":p,children:p})})]})})]}),(0,i.jsx)(_,{id:"modal-description",className:"content-wrapper",children:m??(0,i.jsx)(M,{isInsideModal:!0})}),(0,i.jsx)(q,{children:(0,i.jsx)(_,{children:(0,i.jsx)(J,{children:(0,i.jsxs)(Q,{children:[(0,i.jsxs)(X,{children:[(0,i.jsx)(ee,{children:u}),v&&(0,i.jsxs)(ei,{children:[C&&j&&(0,i.jsx)("span",{className:"old-price",children:j}),(0,i.jsx)("span",{className:"new-price",children:v})]})]}),(0,i.jsx)(et,{onClick:()=>{a&&a(),g&&e()},disabled:h,"aria-label":p,children:p})]})})})})]})});return"u">typeof document?t.default.createPortal(I,document.body):null}],210670)},224792,e=>{"use strict";var i=e.i(391398),t=e.i(191788),n=e.i(760814);e.i(664157);var a=e.i(271179),o=e.i(731732),r=e.i(210670),l=e.i(415575),d=e.i(859207),s=e.i(29282);let c=n.default.div.withConfig({componentId:"sc-220b8cce-0"})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 92px 0 120px;
`,p=n.default.h2.withConfig({componentId:"sc-220b8cce-1"})`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.96px;
  margin: 0;
`,h=n.default.p.withConfig({componentId:"sc-220b8cce-2"})`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.6px;
  margin: 0;
  max-width: 680px;
`,g=n.default.div.withConfig({componentId:"sc-220b8cce-3"})`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
`,m=n.default.p.withConfig({componentId:"sc-220b8cce-4"})`
  color: #ff0000;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  margin: 4px 0 0 0;
`,f=n.default.div.withConfig({componentId:"sc-220b8cce-5"})`
  display: flex;
  flex-direction: column;
`,x=n.default.input.withConfig({componentId:"sc-220b8cce-6"})`
  width: 100%;
  display: flex;
  padding: 20px;
  align-items: center;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid
    ${({hasError:e})=>e?"#ff0000":"rgba(0, 0, 0, 0.06)"};
  background: #f9f9f9;

  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.48px;
  leading-trim: both;
  text-edge: cap;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: -0.48px;
    leading-trim: both;
    text-edge: cap;
  }

  &:focus {
    outline: none;
    border-color: ${({hasError:e})=>e?"#ff0000":"rgba(0, 0, 0, 0.12)"};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
    background: #ffffff;
  }
`;e.s(["default",0,({visible:e,onClose:n})=>{let{t:u}=(0,a.useTranslation)("homepage"),b=(0,s.useCampaigns)(),[w,y]=(0,t.useState)(""),[C,j]=(0,t.useState)(""),[v,I]=(0,t.useState)(""),k=(0,s.getCampaignByProduct)(b.campaigns,"ring"),R=(0,s.getCampaignConfig)(k),W=(0,t.useMemo)(()=>w.trim().length>1&&o.emailRegex.test(C),[w,C]);return e?(0,i.jsx)(r.default,{onClose:n,onCTA:()=>{let e=R?.active?R?.discountCode:void 0,i=(0,l.buildCheckoutUrl)(d.ShopifyStore.IN,w,C,e);i&&(window.location.href=i)},ctaLabel:"Checkout",ctaDisabled:!W,closeOnCTA:!1,children:(0,i.jsxs)(c,{children:[(0,i.jsx)(p,{children:u("homepage.giftRecipientModal.title.whoIsItFor","Who is the Gift Card for?")}),(0,i.jsx)(h,{children:u("homepage.giftRecipientModal.subtitle.giftBetterHealth","Gift better health to the ones who matter most — a thoughtful surprise that doesn’t feel last-minute.")}),(0,i.jsxs)(g,{children:[(0,i.jsx)(f,{children:(0,i.jsx)(x,{"aria-label":u("homepage.giftRecipientModal.input.recipientName","Recipient name"),placeholder:u("homepage.giftRecipientModal.input.recipientName","Recipient name"),value:w,onChange:e=>y(e.target.value)})}),(0,i.jsxs)(f,{children:[(0,i.jsx)(x,{"aria-label":u("homepage.giftRecipientModal.input.recipientEmail","Recipient email"),placeholder:u("homepage.giftRecipientModal.input.recipientEmail","Recipient email"),value:C,onChange:e=>{let i=e.target.value;j(i),v&&I(""),i&&!o.emailRegex.test(i)&&I("Please enter a valid email address")},onBlur:()=>{C&&!o.emailRegex.test(C)&&I("Please enter a valid email address")},hasError:!!v,"aria-invalid":!!v,"aria-describedby":v?"email-error":void 0}),v&&(0,i.jsx)(m,{id:"email-error",role:"alert",children:v})]})]})]})}):null}])},616196,e=>{e.n(e.i(224792))}]);