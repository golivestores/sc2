(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,630042,e=>{e.q("/_next/static/media/splash.138gdi.~c4jhe.webp")},934529,e=>{e.q("/_next/static/media/close.0ar81gzs6juhw.svg")},214786,e=>{e.q("/_next/static/media/header-mobile-close-light.17z6jgu8q2uk2.svg")},423912,e=>{e.q("/_next/static/media/header-mobile-menu-dark.10m0cvww8341a.svg")},250154,e=>{e.q("/_next/static/media/header-mobile-menu.0q20k7b5eln8o.svg")},658636,e=>{e.q("/_next/static/media/header-mobile-wordmark-buy.1830fory~haf9.svg")},730339,e=>{e.q("/_next/static/media/header-mobile-cart-dark.149ks_rhtxs5g.svg")},45346,e=>{e.q("/_next/static/media/header-mobile-cart.0dct2ryj3~67c.svg")},958678,(e,t,n)=>{t.exports=e.r(280963)},754134,e=>{"use strict";var t=e.i(391398),n=e.i(958678),r=e.i(203828),i=e.i(191788),o=e.i(307959),a=e.i(171225);let l="https://www.ultrahuman.com";function s(e){return e.endsWith("/")?e:e+"/"}e.s(["SEO",0,({title:e,description:c,image:d,canonical:u,basePath:m,hreflangOverrides:p,nonIndexable:f,robots:h})=>{let g,{asPath:b}=(0,r.useRouter)(),{regionSlug:x}=(0,i.useContext)(o.RegionLocaleContext);if(u)g=u;else if(m)g=`${l}/${x}${s(m)}`;else{let e=b.split("?")[0].split("#")[0];g=`${l}${e}`}let y=!!m,w=p?._default??m,v=m?`${l}/global${s(w??m)}`:void 0,C=y?(0,a.getAllRegionSlugs)():[];return(0,t.jsxs)(n.default,{children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("meta",{name:"twitter:title",content:e},"twitter-title"),(0,t.jsx)("meta",{property:"og:title",content:e},"og-title"),(0,t.jsx)("meta",{name:"twitter:description",content:c},"twitter-description"),(0,t.jsx)("meta",{name:"description",content:c},"description"),(0,t.jsx)("meta",{property:"og:description",content:c},"og-description"),(0,t.jsx)("meta",{property:"og:url",content:g},"og-url"),(0,t.jsx)("meta",{property:"og:site_name",content:"Ultrahuman"},"og-site-name"),d&&(0,t.jsx)("meta",{name:"twitter:image",content:d},"twitter-image"),d&&(0,t.jsx)("meta",{property:"og:image",content:d},"og-image"),(0,t.jsx)("link",{rel:"canonical",href:g},"canonical"),v&&(0,t.jsx)("link",{rel:"alternate",hrefLang:"x-default",href:v},"hreflang-x-default"),C.map(e=>{let n,r,i=(0,a.parseRegionLocale)(e),o=p?.[i.region],c=`${l}/${e}${s(o??m)}`;if("GLOBAL"===i.region)return null;let d=(n=i.region.toUpperCase(),r=(0,a.getDefaultLanguageForRegion)(n).split("-")[0],`${r}-${n}`),u=e.includes("-")?`${i.language}-${i.region}`:d;return(0,t.jsx)("link",{rel:"alternate",hrefLang:u,href:c},`hreflang-${e}`)}),f&&(0,t.jsx)("meta",{name:"google",content:"nositelinkssearchbox"},"sitelinks"),f&&(0,t.jsx)("meta",{name:"google",content:"notranslate"},"notranslate"),h?(0,t.jsx)("meta",{name:"robots",content:h},"robots"):f&&(0,t.jsx)("meta",{name:"robots",content:"noindex,nofollow"},"robots")]})}])},546737,e=>{"use strict";var t=e.i(391398),n=e.i(203828),r=e.i(191788);let i=(0,r.createContext)({pageTheme:"dark",setPageTheme:()=>void 0,headerCollaspable:!1,setHeaderCollaspable:()=>void 0,headerVisible:!0,setHeaderVisible:()=>void 0,headerHeight:80,liteUI:!1,setLiteUI:()=>void 0,footerDisabled:!1,setFooterDisabled:()=>void 0});e.s(["GlobalUIContext",0,i,"GlobalUIProvider",0,({children:e})=>{let o=(0,n.useRouter)(),[a,l]=(0,r.useState)("dark"),[s,c]=(0,r.useState)(!1),[d,u]=(0,r.useState)(!1),[m,p]=(0,r.useState)(!0),[f,h]=(0,r.useState)(!1);(0,r.useEffect)(()=>{l(e=>"dark"!==e?"dark":e),c(e=>!1===e&&e),u(e=>!1===e&&e),p(e=>!0!==e||e)},[o.pathname]);let g=(0,r.useMemo)(()=>({pageTheme:a,setPageTheme:l,headerCollaspable:s,setHeaderCollaspable:c,headerVisible:m,setHeaderVisible:p,headerHeight:80,liteUI:d,setLiteUI:u,footerDisabled:f,setFooterDisabled:h}),[a,l,s,c,m,p,80,d,u,f,h]);return(0,t.jsx)(i.Provider,{value:g,children:e})},"useGlobalUI",0,e=>{let t=(0,r.useContext)(i),o=(0,n.useRouter)();return(0,r.useEffect)(()=>{if(e){let n=e.pageTheme?e.pageTheme:"dark";t.pageTheme!==n&&t.setPageTheme(n);let r=!!e.liteUI&&e.liteUI;t.liteUI!==r&&t.setLiteUI(r);let i=!!e.headerCollaspable&&e.headerCollaspable;t.headerCollaspable!==i&&t.setHeaderCollaspable(i);let o=!!e.footerDisabled;t.footerDisabled!==o&&t.setFooterDisabled(o)}else"dark"!==t.pageTheme&&t.setPageTheme("dark"),!1!==t.liteUI&&t.setLiteUI(!1),!1!==t.headerCollaspable&&t.setHeaderCollaspable(!1),!1!==t.footerDisabled&&t.setFooterDisabled(!1)},[e,o.asPath]),t}])},257706,e=>{"use strict";var t=e.i(153147),n=e.i(760814);let r=(0,n.default)(t.default).withConfig({componentId:"sc-87d441a3-0"})`
  // letter-spacing: -0.6px; */

  // padding: 12px 14px;
  // transition: all 0.2s ease-in-out;
  // text-align: center;
  align-items: center;
  justify-content: center;
  display: flex !important;
  margin: auto;

  --border: none;
  border: var(--border);
  //   width: 100%;
  padding: 10px 14px;
  border-radius: 40px;
  background: #007ff5 !important;
  color: #fff !important;
  text-align: center;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  cursor: pointer;
  font-size: 14px;

  //  &:hover {
  //       box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
  //   }
  @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
    font-size: 15px;
    padding: 12px 16px;
    border-radius: 200px;
  }
`,i=n.default.button.withConfig({componentId:"sc-87d441a3-1"})`
  --border: none;
  border: var(--border);
  padding: 10px 14px;
  border-radius: 40px;
  background: ${({color:e})=>"black"===e?"#000":"#007ff5"} !important;
  color: ${({color:e})=>"#fff"} !important;
  text-align: center;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  cursor: pointer;
  font-size: 15px;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.4);
    cursor: not-allowed;
  }

  &:disabled {
    filter: brightness(80%);
    background-color: rgba(0, 0, 0, 0.2) !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }

  &:not(:disabled) {
    box-shadow: 0px 1px 4px 0px
      ${({color:e})=>"black"===e?"#333":"#6fbaff"} inset;
  }

  @media (min-width: 992px) {
    font-size: 15px;
    padding: 12px 16px;
    border-radius: 200px;
  }
`,o=n.default.button.withConfig({componentId:"sc-87d441a3-2"})`
  padding: 10px 14px;
  border-radius: 40px;
  background: transparent;
  color: #000 !important;
  text-align: center;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  cursor: pointer;
  border: 1.5px solid #000;
  transition: all 0.2s ease-in-out;
  font-size: 15px;

  &:hover {
    background-color: #00000011;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.6);
    cursor: not-allowed;
  }

  @media (min-width: 992px) {
    font-size: 15px;
    padding: 12px 16px;
    border-radius: 200px;
  }
`,a=n.default.button.withConfig({componentId:"sc-87d441a3-3"})`
  --border: none;
  //   width: 100%;
  padding: 10px 14px;
  color: #000 !important;
  text-align: center;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  cursor: pointer;
  position: relative;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  border-radius: 0;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  svg {
    position: relative;
    margin-left: 10px;
    bottom: -3.5px;

    @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
      bottom: -2px;
    }
  }

  &:hover {
    box-shadow: 0 -1px 0 #000 inset;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.4);
    cursor: not-allowed;
  }

  &:disabled {
    filter: brightness(80%);
    background-color: rgba(0, 0, 0, 0.2) !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }

  @media (min-width: 992px) {
    font-size: 15px;
    padding: 12px 16px;
  }
`,l=(0,n.default)(t.default).withConfig({componentId:"sc-87d441a3-4"})`
  --border: none;
  --color: ${({color:e="#000"})=>e};
  padding: 10px 14px;
  color: ${({color:e="#000"})=>e};
  text-align: center;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  cursor: pointer;
  position: relative;
  border: none;
  border-bottom: 1px solid rgba(var(--color), 0.2);
  background: transparent;
  border-radius: 0;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  svg {
    position: relative;
    margin-left: 0.8rem;
    bottom: -3.5px;

    @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
      bottom: -2px;
    }
  }

  &:hover {
    box-shadow: 0 -1px 0 currentColor inset;
  }

  &:disabled {
    background-color: rgba(currentColor, 0.1);
    color: rgba(currentColor, 0.4);
    cursor: not-allowed;
  }

  @media (min-width: 992px) {
    font-size: 15px;
    padding: 12px 16px;
  }
`,s=n.default.button.withConfig({componentId:"sc-87d441a3-5"})`
    font-size: ${({theme:e})=>e.typographyV2.fontSize.mediumsmall};
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    border: none;
    
    @media (min-width: ${({theme:e})=>e.globalV2.xxxl.minWidth}) {
        font-size: ${({theme:e})=>e.typographyV2.fontSize.small};
    }
    
    letter-spacing: -0.6px; */
    color: #000000;
    background: #ffffff;
    border-radius: 50px;
    padding: 12px 14px;
    transition: all 0.2s ease-in-out;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex !important;
    // &:hover {
    //     box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
    // }
    @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
        margin-top: 16px;
        padding: 12px 24px;
        display: inline-block !important;
    }

    &.primary {
        border: none;
        background: #007ff5;
        -webkit-backdrop-filter: blur(27px);
        backdrop-filter: blur(27px);
        color: #fff;
    }

    &.flat{
     position : relative;
     border: none;
     border-bottom: 1px solid rgba(0, 0, 0, 0.20);
     background: transparent;
     border-radius: 0;
     color : #000;
     white-space: nowrap;

     svg{
      position : relative;
      margin-left : 10px;
      bottom: 2px;

       @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
         bottom: -2px;
       }
     }

      &:hover {
        box-shadow: none;
    }
    }
     
`,c=n.css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px;
  font-size: ${({theme:e})=>e.typographyV2.fontSize.mediumsmall};
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  letter-spacing: -0.42px;

  @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
    font-size: 16px;
  }
`;n.default.button.withConfig({componentId:"sc-87d441a3-6"})`
  ${c};
  padding: 12px 24px;
  color: #ffffff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  gap: 1rem;

  &:hover {
    border-color: rgba(255, 255, 255, 0.55);
  }

  svg {
    flex-shrink: 0;
  }

  &.sm-none {
    display: none;
    @media (min-width: ${({theme:e})=>e.globalV2.sm.maxWidth}) {
      display: inline-flex !important;
    }
  }
`;let d=(0,n.default)(t.default).withConfig({componentId:"sc-87d441a3-7"})`
  ${c};
  padding: 12px 24px;
  color: #000000;
  background: #ffffff;

  &:hover {
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
  }

  @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
    width: 154px;
  }
`;e.s(["BuyNowButton",0,d,"CTAButton",0,s,"CTALink",0,r,"FlatButton",0,a,"FlatLink",0,l,"PrimaryCTA",0,i,"SecondaryCTA",0,o])},486332,e=>{"use strict";var t=e.i(391398),n=e.i(191788),r=e.i(760814),i=e.i(153147),o=e.i(257706);let a=r.css`
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
`,l=(0,r.default)(o.CTAButton).withConfig({componentId:"sc-9dff9bcb-0"})`
  /* Ensure icon and text align perfectly */
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  gap: 10px;
  line-height: 1;
  vertical-align: middle;
  margin-top: 0 !important; /* Override inherited margin from CTAButton */

  svg {
    display: block; /* remove baseline gaps */
  }

  ${({variant:e})=>{switch(e){case"white":return r.css`
          background: #ffffff;
          color: #000000;

          &:disabled {
            background: #f0f0f0;
            color: #b3b3b3;
            cursor: not-allowed;
            opacity: 0.6;
          }
        `;case"blue":case void 0:return r.css`
          background: #0882ff;
          color: #ffffff;

          &:disabled {
            background: #0882ff;
            color: #ffffff;
            cursor: not-allowed;
            opacity: 0.4;
          }
        `;case"transparentDark":return r.css`
          background: rgba(0, 0, 0, 0.07);
          color: #000000;
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);

          &:disabled {
            background: rgba(0, 0, 0, 0.04);
            color: #000000;
            cursor: not-allowed;
            opacity: 0.4;
          }
        `;case"transparentLight":return r.css`
          background: rgba(255, 255, 255, 0.13);
          color: #ffffff;
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);

          &:disabled {
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
            cursor: not-allowed;
            opacity: 0.4;
          }
        `;case"glassLight":return r.css`
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          ${a}

          &:disabled {
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            cursor: not-allowed;
            opacity: 0.4;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
        `;case"glassDark":return r.css`
          background: rgba(255, 255, 255, 0.08);
          color: #000000;
          ${a}

          &:disabled {
            background: rgba(255, 255, 255, 0.05);
            color: #000000;
            cursor: not-allowed;
            opacity: 0.4;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
        `;case"black":return r.css`
          background: #000000;
          color: #ffffff;

          &:disabled {
            background: #000000;
            color: #ffffff;
            cursor: not-allowed;
            opacity: 0.4;
          }
        `;case"flat":return r.css`
          background: transparent;
          color: #000000;
          borderradius: 0;

          &:disabled {
            color: #000000;
            cursor: not-allowed;
            opacity: 0.7;
          }
        `}}}
  &:not(:disabled):hover {
    transform: scale(1.02);
  }
`,s=r.default.span.withConfig({componentId:"sc-9dff9bcb-1"})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  margin: 0 !important; /* spacing handled by parent gap */
  pointer-events: none; /* ensure clicks pass through to button */
`,c=r.default.span.withConfig({componentId:"sc-9dff9bcb-2"})`
  display: inline-flex;
  align-items: center;
  line-height: 1; /* avoid extra baseline space */
  pointer-events: none; /* ensure clicks pass through to button */
`,d=n.default.forwardRef(({children:e,label:n,href:r,linkProps:o,componentType:a,onClick:d,startIcon:u,endIcon:m,...p},f)=>{let h=(a??(r?"link":"button"))==="link",g=(0,t.jsxs)(l,{ref:f,onClick:d,...p,type:p.type??"button",children:[u?(0,t.jsx)(s,{side:"start",children:u}):null,(0,t.jsx)(c,{children:n??e}),m?(0,t.jsx)(s,{side:"end",children:m}):null]});return h&&r?(0,t.jsx)(i.default,{href:r,...o,children:g}):g});d.displayName="ButtonV2",e.s(["ButtonV2",0,d])},101814,e=>{"use strict";var t=e.i(391398);e.i(191788);var n=e.i(700228),r=e.i(591898);let i=null,o=new Proxy({},{get:(e,o)=>(!i&&(i={[n.Currency.inr]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.inr)}),[n.Currency.eur]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.eur)}),[n.Currency.gbp]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.gbp)}),[n.Currency.aed]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.aed)}),[n.Currency.usd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.usd)}),[n.Currency.ch]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.ch)}),[n.Currency.hk_usd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.hk_usd)}),[n.Currency.aud]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.aud)}),[n.Currency.bgn]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.bgn)}),[n.Currency.brl]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.brl)}),[n.Currency.cad]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.cad)}),[n.Currency.clp]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.clp)}),[n.Currency.cny]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.cny)}),[n.Currency.cop]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.cop)}),[n.Currency.czk]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.czk)}),[n.Currency.dkk]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.dkk)}),[n.Currency.egp]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.egp)}),[n.Currency.hkd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.hkd)}),[n.Currency.huf]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.huf)}),[n.Currency.idr]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.idr)}),[n.Currency.ils]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.ils)}),[n.Currency.jpy]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.jpy)}),[n.Currency.krw]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.krw)}),[n.Currency.kzt]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.kzt)}),[n.Currency.mxn]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.mxn)}),[n.Currency.myr]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.myr)}),[n.Currency.ngn]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.ngn)}),[n.Currency.nok]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.nok)}),[n.Currency.nzd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.nzd)}),[n.Currency.pen]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.pen)}),[n.Currency.php]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.php)}),[n.Currency.pkr]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.pkr)}),[n.Currency.pln]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.pln)}),[n.Currency.qar]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.qar)}),[n.Currency.ron]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.ron)}),[n.Currency.rub]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.rub)}),[n.Currency.sar]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.sar)}),[n.Currency.sek]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.sek)}),[n.Currency.sgd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.sgd)}),[n.Currency.thb]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.thb)}),[n.Currency.try]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.try)}),[n.Currency.twd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.twd)}),[n.Currency.tzs]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.tzs)}),[n.Currency.vnd]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.vnd)}),[n.Currency.zar]:(0,t.jsx)(t.Fragment,{children:(0,r.getCurrencySymbolFromEnum)(n.Currency.zar)})}),i)[o]});e.s(["CurrencySymbol",0,o,"formatPriceWithComma",0,e=>{let t=Math.floor(Math.round(100*e))/100;return t?.toLocaleString("en-IN",{minimumFractionDigits:0,maximumFractionDigits:2})}])},661791,e=>{"use strict";var t=e.i(760814);let n=t.default.h2.withConfig({componentId:"sc-daf797e4-0"})`
  font-size: 1.6rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-bottom: 2.4rem;
`,r=t.default.h2.withConfig({componentId:"sc-daf797e4-1"})`
  font-size: 4.4rem;
  line-height: 5.2rem;
  font-weight: 500;
  color: ${({color:e})=>e??"rgba(255, 255, 255, 1)"};
  margin-bottom: 2.4rem;
  text-align: center;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    font-size: 5.2rem;
    line-height: 6.4rem;
    text-align: center;
  }

  @media (min-width: ${({theme:e})=>e.global.laptop.maxWidth}) {
    font-size: 6.4rem;
    line-height: 7.2rem;
  }
`;t.default.h3.withConfig({componentId:"sc-daf797e4-2"})`
  font-size: 5.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 2.4rem;

  @media (min-width: ${({theme:e})=>e.global.laptop.maxWidth}) {
    font-size: 7.2rem;
  }
`;let i=t.default.p.withConfig({componentId:"sc-daf797e4-3"})`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 1.6rem;
  text-align: center;
  line-height: 120%;

  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    font-size: 2rem;
  }
`,o=t.css`
  padding: 4.8rem 0;
  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    padding: 9.6rem 0;
  }
`,a=t.css`
  padding: 1rem 0 8rem 0;
  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    padding: 0 0 12rem 0;
  }
`;e.s(["H2",0,n,"H2Large",0,r,"P",0,i,"productSectionPadding",0,a,"sectionPadding",0,o])},772218,e=>{"use strict";var t=e.i(391398),n=e.i(958678);e.s(["JsonLd",0,({data:e,id:r})=>{if(!e)return null;try{let i=JSON.stringify(e);return(0,t.jsx)(n.default,{children:(0,t.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:i},...r&&{id:r}})})}catch(e){return null}}])},566243,e=>{"use strict";e.s(["generateBreadcrumbSchema",0,function(e){return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:e.map((e,t)=>({"@type":"ListItem",position:t+1,name:e.name,item:e.url}))}}])},509674,e=>{"use strict";var t=e.i(391398);e.s(["PlayWhite",0,e=>(0,t.jsx)("svg",{style:e.style,className:e.className,width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M28.99 21.7425L13.0825 30.9725C11.7325 31.755 10 30.8075 10 29.23V10.77C10 9.195 11.73 8.245 13.0825 9.03L28.99 18.26C29.2971 18.4353 29.5524 18.6887 29.7299 18.9945C29.9075 19.3003 30.001 19.6476 30.001 20.0012C30.001 20.3549 29.9075 20.7022 29.7299 21.008C29.5524 21.3138 29.2971 21.5672 28.99 21.7425V21.7425Z",fill:e.fill??"white"})})])},451549,e=>{e.v({className:"inter_f001008d-module__pQvp4G__className",variable:"inter_f001008d-module__pQvp4G__variable"})},236330,e=>{"use strict";var t=e.i(451549);let n={className:t.default.className,style:{fontFamily:"'Inter', system-ui, sans-serif",fontStyle:"normal"}};null!=t.default.variable&&(n.variable=t.default.variable),e.s(["inter",0,n],236330)},185546,e=>{"use strict";var t=e.i(700228),n=e.i(859207);let r={[n.ShopifyStore.US]:{[t.Currency.usd]:479},[n.ShopifyStore.ROW]:{[t.Currency.usd]:479},[n.ShopifyStore.CA]:{[t.Currency.cad]:659},[n.ShopifyStore.GB]:{[t.Currency.gbp]:429},[n.ShopifyStore.EU]:{[t.Currency.eur]:499},[n.ShopifyStore.AU]:{[t.Currency.aud]:749},[n.ShopifyStore.IN]:{[t.Currency.inr]:44999},[n.ShopifyStore.AE]:{[t.Currency.aed]:1759},[n.ShopifyStore.SA]:{[t.Currency.sar]:2069},[n.ShopifyStore.MX]:{[t.Currency.mxn]:9879},[n.ShopifyStore.ZA]:{[t.Currency.zar]:9269}};async function i(){return{campaign_active:!1,active_tier:"",total_orders:0,orders_in_current_tier:0,tier_info:{}}}e.s(["fetchTierCampaignData",0,i,"getDiscountForStore",0,function(e,t){return"number"==typeof e?e:e[t]??e.ROW??0},"getRingProBasePrice",0,function(e,t){return r[e]?.[t]}])},914681,e=>{"use strict";var t=e.i(191788);function n(e){return"[object Object]"===Object.prototype.toString.call(e)||Array.isArray(e)}function r(e,t){let i=Object.keys(e),o=Object.keys(t);return i.length===o.length&&JSON.stringify(Object.keys(e.breakpoints||{}))===JSON.stringify(Object.keys(t.breakpoints||{}))&&i.every(i=>{let o=e[i],a=t[i];return"function"==typeof o?`${o}`==`${a}`:n(o)&&n(a)?r(o,a):o===a})}function i(e){return e.concat().sort((e,t)=>e.name>t.name?1:-1).map(e=>e.options)}function o(e){return"number"==typeof e}function a(e){return"string"==typeof e}function l(e){return"boolean"==typeof e}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function c(e){return Math.abs(e)}function d(e){return Math.sign(e)}function u(e){return h(e).map(Number)}function m(e){return e[p(e)]}function p(e){return Math.max(0,e.length-1)}function f(e,t=0){return Array.from(Array(e),(e,n)=>t+n)}function h(e){return Object.keys(e)}function g(e,t){return void 0!==t.MouseEvent&&e instanceof t.MouseEvent}function b(){let e=[],t={add:function(n,r,i,o={passive:!0}){let a;return"addEventListener"in n?(n.addEventListener(r,i,o),a=()=>n.removeEventListener(r,i,o)):(n.addListener(i),a=()=>n.removeListener(i)),e.push(a),t},clear:function(){e=e.filter(e=>e())}};return t}function x(e=0,t=0){let n=c(e-t);function r(n){return n<e||n>t}return{length:n,max:t,min:e,constrain:function(n){return r(n)?n<e?e:t:n},reachedAny:r,reachedMax:function(e){return e>t},reachedMin:function(t){return t<e},removeOffset:function(e){return n?e-n*Math.ceil((e-t)/n):e}}}function y(e){let t=e;function n(e){return o(e)?e:e.get()}return{get:function(){return t},set:function(e){t=n(e)},add:function(e){t+=n(e)},subtract:function(e){t-=n(e)}}}function w(e,t){let n="x"===e.scroll?function(e){return`translate3d(${e}px,0px,0px)`}:function(e){return`translate3d(0px,${e}px,0px)`},r=t.style,i=null,o=!1;return{clear:function(){!o&&(r.transform="",t.getAttribute("style")||t.removeAttribute("style"))},to:function(t){if(o)return;let a=Math.round(100*e.direction(t))/100;a!==i&&(r.transform=n(a),i=a)},toggleActive:function(e){o=!e}}}let v={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function C(e,t,n){let r,i,k,j,S,$,F,_,E=e.ownerDocument,I=E.defaultView,L=function(e){function t(e,t){return function e(t,n){return[t,n].reduce((t,n)=>(h(n).forEach(r=>{let i=t[r],o=n[r],a=s(i)&&s(o);t[r]=a?e(i,o):o}),t),{})}(e,t||{})}return{mergeOptions:t,optionsAtMedia:function(n){let r=n.breakpoints||{},i=h(r).filter(t=>e.matchMedia(t).matches).map(e=>r[e]).reduce((e,n)=>t(e,n),{});return t(n,i)},optionsMediaQueries:function(t){return t.map(e=>h(e.breakpoints||{})).reduce((e,t)=>e.concat(t),[]).map(e.matchMedia)}}}(I),z=(_=[],{init:function(e,t){return(_=t.filter(({options:e})=>!1!==L.optionsAtMedia(e).active)).forEach(t=>t.init(e,L)),t.reduce((e,t)=>Object.assign(e,{[t.name]:t}),{})},destroy:function(){_=_.filter(e=>e.destroy())}}),N=b(),T=(i={},k={init:function(e){r=e},emit:function(e){return(i[e]||[]).forEach(t=>t(r,e)),k},off:function(e,t){return i[e]=(i[e]||[]).filter(e=>e!==t),k},on:function(e,t){return i[e]=(i[e]||[]).concat([t]),k},clear:function(){i={}}}),{mergeOptions:A,optionsAtMedia:V,optionsMediaQueries:P}=L,{on:M,off:O,emit:W}=T,B=!1,D=A(v,C.globalOptions),U=A(D),R=[];function H(t,n){B||(U=V(D=A(D,t)),R=n||R,function(){let{container:t,slides:n}=U;$=(a(t)?e.querySelector(t):t)||e.children[0];let r=a(n)?$.querySelectorAll(n):n;F=[].slice.call(r||$.children)}(),j=function t(n){let r=function(e,t,n,r,i,s,v){var C,k;let j,S,$,F,_,E,I,L,z,N,T,A,V,P,{align:M,axis:O,direction:W,startIndex:B,loop:D,duration:U,dragFree:R,dragThreshold:H,inViewThreshold:q,slidesToScroll:Z,skipSnaps:G,containScroll:X,watchResize:Y,watchSlides:Q,watchDrag:J,watchFocus:K}=s,ee={measure:function(e){let{offsetTop:t,offsetLeft:n,offsetWidth:r,offsetHeight:i}=e;return{top:t,right:n+r,bottom:t+i,left:n,width:r,height:i}}},et=ee.measure(t),en=n.map(ee.measure),er=(S="rtl"===W,F=($="y"===O)||!S?1:-1,_=$?"top":S?"right":"left",E=$?"bottom":S?"left":"right",{scroll:$?"y":"x",cross:$?"x":"y",startEdge:_,endEdge:E,measureSize:function(e){let{height:t,width:n}=e;return $?t:n},direction:function(e){return e*F}}),ei=er.measureSize(et),eo={measure:function(e){return e/100*ei}},ea=(C=M,k=ei,j={start:function(){return 0},center:function(e){return(k-e)/2},end:function(e){return k-e}},{measure:function(e,t){return a(C)?j[C](e):C(k,e,t)}}),el=!D&&!!X,{slideSizes:es,slideSizesWithGaps:ec,startGap:ed,endGap:eu}=function(e,t,n,r,i,o){let{measureSize:a,startEdge:l,endEdge:s}=e,d=n[0]&&i,u=function(){if(!d)return 0;let e=n[0];return c(t[l]-e[l])}(),f=d?parseFloat(o.getComputedStyle(m(r)).getPropertyValue(`margin-${s}`)):0,h=n.map(a),g=n.map((e,t,n)=>{let r=t===p(n);return t?r?h[t]+f:n[t+1][l]-e[l]:h[t]+u}).map(c);return{slideSizes:h,slideSizesWithGaps:g,startGap:u,endGap:f}}(er,et,en,n,D||!!X,i),em=function(e,t,n,r,i,a,l,s){let{startEdge:d,endEdge:f,direction:h}=e,g=o(n);return{groupSlides:function(e){return g?u(e).filter(e=>e%n==0).map(t=>e.slice(t,t+n)):e.length?u(e).reduce((n,o,u)=>{let g=m(n)||0,b=o===p(e),x=i[d]-a[g][d],y=i[d]-a[o][f],w=r||0!==g?0:h(l),v=c(y-(!r&&b?h(s):0)-(x+w));return u&&v>t+2&&n.push(o),b&&n.push(e.length),n},[]).map((t,n,r)=>{let i=Math.max(r[n-1]||0);return e.slice(i,t)}):[]}}}(er,ei,Z,D,et,en,ed,eu),{snaps:ep,snapsAligned:ef}=function(e,t,n,r,i){let{startEdge:o,endEdge:a}=e,{groupSlides:l}=i,s=l(r).map(e=>m(e)[a]-e[0][o]).map(c).map(t.measure),d=r.map(e=>n[o]-e[o]).map(e=>-c(e)),u=l(d).map(e=>e[0]).map((e,t)=>e+s[t]);return{snaps:d,snapsAligned:u}}(er,ea,et,en,em),eh=-m(ep)+m(ec),{snapsContained:eg,scrollContainLimit:eb}=function(e,t,n,r){let i,o,a=x(-t+e,0),l=n.map((e,t)=>{let{min:r,max:i}=a,o=a.constrain(e),l=t===p(n);return t?l||function(e,t){return 1>=c(e-t)}(r,o)?r:function(e,t){return 1>=c(e-t)}(i,o)?i:o:i}).map(e=>parseFloat(e.toFixed(3))),s=(i=l[0],o=m(l),x(l.lastIndexOf(i),l.indexOf(o)+1));return{snapsContained:function(){if(t<=e+2)return[a.max];if("keepSnaps"===r)return l;let{min:n,max:i}=s;return l.slice(n,i)}(),scrollContainLimit:s}}(ei,eh,ef,X),ex=el?eg:ef,{limit:ey}=(I=ex[0],{limit:x(D?I-eh:m(ex),I)}),ew=function e(t,n,r){let{constrain:i}=x(0,t),o=t+1,a=l(n);function l(e){return r?c((o+e)%o):i(e)}function s(){return e(t,a,r)}let d={get:function(){return a},set:function(e){return a=l(e),d},add:function(e){return s().set(a+e)},clone:s};return d}(p(ex),B,D),ev=ew.clone(),eC=u(n),ek=function(e,t,n,r){let i=b(),o=1e3/60,a=null,l=0,s=0;function c(e){if(!s)return;a||(a=e,n(),n());let i=e-a;for(a=e,l+=i;l>=o;)n(),l-=o;r(l/o),s&&(s=t.requestAnimationFrame(c))}function d(){t.cancelAnimationFrame(s),a=null,l=0,s=0}return{init:function(){i.add(e,"visibilitychange",()=>{e.hidden&&(a=null,l=0)})},destroy:function(){d(),i.clear()},start:function(){s||(s=t.requestAnimationFrame(c))},stop:d,update:n,render:r}}(r,i,()=>(({dragHandler:e,scrollBody:t,scrollBounds:n,options:{loop:r}})=>{r||n.constrain(e.pointerDown()),t.seek()})(eP),e=>(({scrollBody:e,translate:t,location:n,offsetLocation:r,previousLocation:i,scrollLooper:o,slideLooper:a,dragHandler:l,animation:s,eventHandler:c,scrollBounds:d,options:{loop:u}},m)=>{let p=e.settled(),f=!d.shouldConstrain(),h=u?p:p&&f,g=h&&!l.pointerDown();g&&s.stop();let b=n.get()*m+i.get()*(1-m);r.set(b),u&&(o.loop(e.direction()),a.loop()),t.to(r.get()),g&&c.emit("settle"),h||c.emit("scroll")})(eP,e)),ej=ex[ew.get()],eS=y(ej),e$=y(ej),eF=y(ej),e_=y(ej),eE=function(e,t,n,r,i){let o=0,a=0,l=i,s=.68,u=e.get(),m=0;function p(e){return l=e,h}function f(e){return s=e,h}let h={direction:function(){return a},duration:function(){return l},velocity:function(){return o},seek:function(){let t=r.get()-e.get(),i=0;return l?(n.set(e),o+=t/l,o*=s,u+=o,e.add(o),i=u-m):(o=0,n.set(r),e.set(r),i=t),a=d(i),m=u,h},settled:function(){return .001>c(r.get()-t.get())},useBaseFriction:function(){return f(.68)},useBaseDuration:function(){return p(i)},useFriction:f,useDuration:p};return h}(eS,eF,e$,e_,U),eI=function(e,t,n,r,i){let{reachedAny:o,removeOffset:a,constrain:l}=r;function s(e){return e.concat().sort((e,t)=>c(e)-c(t))[0]}function u(t,r){let i=[t,t+n,t-n];if(!e)return t;if(!r)return s(i);let o=i.filter(e=>d(e)===r);return o.length?s(o):m(i)-n}return{byDistance:function(n,r){let s=i.get()+n,{index:d,distance:m}=function(n){let r=e?a(n):l(n),{index:i}=t.map((e,t)=>({diff:u(e-r,0),index:t})).sort((e,t)=>c(e.diff)-c(t.diff))[0];return{index:i,distance:r}}(s),p=!e&&o(s);if(!r||p)return{index:d,distance:n};let f=n+u(t[d]-m,0);return{index:d,distance:f}},byIndex:function(e,n){let r=u(t[e]-i.get(),n);return{index:e,distance:r}},shortcut:u}}(D,ex,eh,ey,e_),eL=function(e,t,n,r,i,o,a){function l(i){let l=i.distance,s=i.index!==t.get();o.add(l),l&&(r.duration()?e.start():(e.update(),e.render(1),e.update())),s&&(n.set(t.get()),t.set(i.index),a.emit("select"))}return{distance:function(e,t){l(i.byDistance(e,t))},index:function(e,n){let r=t.clone().set(e);l(i.byIndex(r.get(),n))}}}(ek,ew,ev,eE,eI,e_,v),ez=function(e){let{max:t,length:n}=e;return{get:function(e){return n?-((e-t)/n):0}}}(ey),eN=b(),eT=(z={},N=null,T=null,A=!1,{init:function(){L=new IntersectionObserver(e=>{A||(e.forEach(e=>{z[n.indexOf(e.target)]=e}),N=null,T=null,v.emit("slidesInView"))},{root:t.parentElement,threshold:q}),n.forEach(e=>L.observe(e))},destroy:function(){L&&L.disconnect(),A=!0},get:function(e=!0){if(e&&N)return N;if(!e&&T)return T;let t=h(z).reduce((t,n)=>{let r=parseInt(n),{isIntersecting:i}=z[r];return(e&&i||!e&&!i)&&t.push(r),t},[]);return e&&(N=t),e||(T=t),t}}),{slideRegistry:eA}=function(e,t,n,r,i,o){let a,{groupSlides:l}=i,{min:s,max:c}=r;return{slideRegistry:(a=l(o),1===n.length?[o]:e&&"keepSnaps"!==t?a.slice(s,c).map((e,t,n)=>{let r=t===p(n);return t?r?f(p(o)-m(n)[0]+1,m(n)[0]):e:f(m(n[0])+1)}):a)}}(el,X,ex,eb,em,eC),eV=function(e,t,n,r,i,a,s,c){let d={passive:!0,capture:!0},u=0;function m(e){"Tab"===e.code&&(u=new Date().getTime())}return{init:function(p){c&&(a.add(document,"keydown",m,!1),t.forEach((t,m)=>{a.add(t,"focus",t=>{(l(c)||c(p,t))&&function(t){if(new Date().getTime()-u>10)return;s.emit("slideFocusStart"),e.scrollLeft=0;let a=n.findIndex(e=>e.includes(t));o(a)&&(i.useDuration(0),r.index(a,0),s.emit("slideFocus"))}(m)},d)}))}}}(e,n,eA,eL,eE,eN,v,K),eP={ownerDocument:r,ownerWindow:i,eventHandler:v,containerRect:et,slideRects:en,animation:ek,axis:er,dragHandler:function(e,t,n,r,i,o,a,s,u,m,p,f,h,y,w,v,C,k){let{cross:j,direction:S}=e,$=["INPUT","SELECT","TEXTAREA"],F={passive:!1},_=b(),E=b(),I=x(50,225).constrain(y.measure(20)),L={mouse:300,touch:400},z={mouse:500,touch:600},N=w?43:25,T=!1,A=0,V=0,P=!1,M=!1,O=!1,W=!1;function B(e){if(!g(e,r)&&e.touches.length>=2)return D(e);let t=o.readPoint(e),n=o.readPoint(e,j),a=c(t-A),l=c(n-V);if(!M&&!W&&(!e.cancelable||!(M=a>l)))return D(e);let d=o.pointerMove(e);a>v&&(O=!0),m.useFriction(.3).useDuration(.75),s.start(),i.add(S(d)),e.preventDefault()}function D(e){var t;let n,r,i=p.byDistance(0,!1).index!==f.get(),a=o.pointerUp(e)*(w?z:L)[W?"mouse":"touch"],l=(t=S(a),n=f.add(-1*d(t)),r=p.byDistance(t,!w).distance,w||c(t)<I?r:C&&i?.5*r:p.byIndex(n.get(),0).distance),s=function(e,t){var n,r;if(0===e||0===t||c(e)<=c(t))return 0;let i=(n=c(e),r=c(t),c(n-r));return c(i/e)}(a,l);M=!1,P=!1,E.clear(),m.useDuration(N-10*s).useFriction(.68+s/50),u.distance(l,!w),W=!1,h.emit("pointerUp")}function U(e){O&&(e.stopPropagation(),e.preventDefault(),O=!1)}return{init:function(e){k&&_.add(t,"dragstart",e=>e.preventDefault(),F).add(t,"touchmove",()=>void 0,F).add(t,"touchend",()=>void 0).add(t,"touchstart",s).add(t,"mousedown",s).add(t,"touchcancel",D).add(t,"contextmenu",D).add(t,"click",U,!0);function s(s){(l(k)||k(e,s))&&function(e){let l,s=g(e,r);if((W=s,O=w&&s&&!e.buttons&&T,T=c(i.get()-a.get())>=2,!s||0===e.button)&&(l=e.target.nodeName||"",!$.includes(l))){let r;P=!0,o.pointerDown(e),m.useFriction(0).useDuration(0),i.set(a),r=W?n:t,E.add(r,"touchmove",B,F).add(r,"touchend",D).add(r,"mousemove",B,F).add(r,"mouseup",D),A=o.readPoint(e),V=o.readPoint(e,j),h.emit("pointerDown")}}(s)}},destroy:function(){_.clear(),E.clear()},pointerDown:function(){return P}}}(er,e,r,i,e_,function(e,t){let n,r;function i(e){return e.timeStamp}function o(n,r){let i=r||e.scroll,o=`client${"x"===i?"X":"Y"}`;return(g(n,t)?n:n.touches[0])[o]}return{pointerDown:function(e){return n=e,r=e,o(e)},pointerMove:function(e){let t=o(e)-o(r),a=i(e)-i(n)>170;return r=e,a&&(n=e),t},pointerUp:function(e){if(!n||!r)return 0;let t=o(r)-o(n),a=i(e)-i(n),l=i(e)-i(r)>170,s=t/a;return a&&!l&&c(s)>.1?s:0},readPoint:o}}(er,i),eS,ek,eL,eE,eI,ew,v,eo,R,H,G,J),eventStore:eN,percentOfView:eo,index:ew,indexPrevious:ev,limit:ey,location:eS,offsetLocation:eF,previousLocation:e$,options:s,resizeHandler:function(e,t,n,r,i,o,a){let s,d,u=[e].concat(r),m=[],p=!1;function f(e){return i.measureSize(a.measure(e))}return{init:function(i){o&&(d=f(e),m=r.map(f),s=new ResizeObserver(n=>{(l(o)||o(i,n))&&function(n){for(let o of n){if(p)return;let n=o.target===e,a=r.indexOf(o.target),l=n?d:m[a];if(c(f(n?e:r[a])-l)>=.5){i.reInit(),t.emit("resize");break}}}(n)}),n.requestAnimationFrame(()=>{u.forEach(e=>s.observe(e))}))},destroy:function(){p=!0,s&&s.disconnect()}}}(t,v,i,n,er,Y,ee),scrollBody:eE,scrollBounds:function(e,t,n,r,i){let o=i.measure(10),a=i.measure(50),l=x(.1,.99),s=!1;function d(){return!s&&!!e.reachedAny(n.get())&&!!e.reachedAny(t.get())}return{shouldConstrain:d,constrain:function(i){if(!d())return;let s=e.reachedMin(t.get())?"min":"max",u=c(e[s]-t.get()),m=n.get()-t.get(),p=l.constrain(u/a);n.subtract(m*p),!i&&c(m)<o&&(n.set(e.constrain(n.get())),r.useDuration(25).useBaseFriction())},toggleActive:function(e){s=!e}}}(ey,eF,e_,eE,eo),scrollLooper:function(e,t,n,r){let{reachedMin:i,reachedMax:o}=x(t.min+.1,t.max+.1);return{loop:function(t){if(!(1===t?o(n.get()):-1===t&&i(n.get())))return;let a=-1*t*e;r.forEach(e=>e.add(a))}}}(eh,ey,eF,[eS,eF,e$,e_]),scrollProgress:ez,scrollSnapList:ex.map(ez.get),scrollSnaps:ex,scrollTarget:eI,scrollTo:eL,slideLooper:function(e,t,n,r,i,o,a,l,s){let c=u(i),d=u(i).reverse(),m=h(f(d,a[0]),n,!1).concat(h(f(c,t-a[0]-1),-n,!0));function p(e,t){return e.reduce((e,t)=>e-i[t],t)}function f(e,t){return e.reduce((e,n)=>p(e,t)>0?e.concat([n]):e,[])}function h(i,a,c){let d=o.map((e,n)=>({start:e-r[n]+.5+a,end:e+t-.5+a}));return i.map(t=>{let r=c?0:-n,i=c?n:0,o=d[t][c?"end":"start"];return{index:t,loopPoint:o,slideLocation:y(-1),translate:w(e,s[t]),target:()=>l.get()>o?r:i}})}return{canLoop:function(){return m.every(({index:e})=>.1>=p(c.filter(t=>t!==e),t))},clear:function(){m.forEach(e=>e.translate.clear())},loop:function(){m.forEach(e=>{let{target:t,translate:n,slideLocation:r}=e,i=t();i!==r.get()&&(n.to(i),r.set(i))})},loopPoints:m}}(er,ei,eh,es,ec,ep,ex,eF,n),slideFocus:eV,slidesHandler:(P=!1,{init:function(e){Q&&(V=new MutationObserver(t=>{!P&&(l(Q)||Q(e,t))&&function(t){for(let n of t)if("childList"===n.type){e.reInit(),v.emit("slidesChanged");break}}(t)})).observe(t,{childList:!0})},destroy:function(){V&&V.disconnect(),P=!0}}),slidesInView:eT,slideIndexes:eC,slideRegistry:eA,slidesToScroll:em,target:e_,translate:w(er,t)};return eP}(e,$,F,E,I,n,T);return n.loop&&!r.slideLooper.canLoop()?t(Object.assign({},n,{loop:!1})):r}(U),P([D,...R.map(({options:e})=>e)]).forEach(e=>N.add(e,"change",q)),U.active&&(j.translate.to(j.location.get()),j.animation.init(),j.slidesInView.init(),j.slideFocus.init(Y),j.eventHandler.init(Y),j.resizeHandler.init(Y),j.slidesHandler.init(Y),j.options.loop&&j.slideLooper.loop(),$.offsetParent&&F.length&&j.dragHandler.init(Y),S=z.init(Y,R)))}function q(e,t){let n=X();Z(),H(A({startIndex:n},e),t),T.emit("reInit")}function Z(){j.dragHandler.destroy(),j.eventStore.clear(),j.translate.clear(),j.slideLooper.clear(),j.resizeHandler.destroy(),j.slidesHandler.destroy(),j.slidesInView.destroy(),j.animation.destroy(),z.destroy(),N.clear()}function G(e,t,n){U.active&&!B&&(j.scrollBody.useBaseFriction().useDuration(!0===t?0:U.duration),j.scrollTo.index(e,n||0))}function X(){return j.index.get()}let Y={canScrollNext:function(){return j.index.add(1).get()!==X()},canScrollPrev:function(){return j.index.add(-1).get()!==X()},containerNode:function(){return $},internalEngine:function(){return j},destroy:function(){B||(B=!0,N.clear(),Z(),T.emit("destroy"),T.clear())},off:O,on:M,emit:W,plugins:function(){return S},previousScrollSnap:function(){return j.indexPrevious.get()},reInit:q,rootNode:function(){return e},scrollNext:function(e){G(j.index.add(1).get(),e,-1)},scrollPrev:function(e){G(j.index.add(-1).get(),e,1)},scrollProgress:function(){return j.scrollProgress.get(j.offsetLocation.get())},scrollSnapList:function(){return j.scrollSnapList},scrollTo:G,selectedScrollSnap:X,slideNodes:function(){return F},slidesInView:function(){return j.slidesInView.get()},slidesNotInView:function(){return j.slidesInView.get(!1)}};return H(t,n),setTimeout(()=>T.emit("init"),0),Y}function k(e={},n=[]){let o=(0,t.useRef)(e),a=(0,t.useRef)(n),[l,s]=(0,t.useState)(),[c,d]=(0,t.useState)(),u=(0,t.useCallback)(()=>{l&&l.reInit(o.current,a.current)},[l]);return(0,t.useEffect)(()=>{r(o.current,e)||(o.current=e,u())},[e,u]),(0,t.useEffect)(()=>{!function(e,t){if(e.length!==t.length)return!1;let n=i(e),o=i(t);return n.every((e,t)=>r(e,o[t]))}(a.current,n)&&(a.current=n,u())},[n,u]),(0,t.useEffect)(()=>{if("u">typeof window&&window.document&&window.document.createElement&&c){C.globalOptions=k.globalOptions;let e=C(c,o.current,a.current);return s(e),()=>e.destroy()}s(void 0)},[c,s]),[d,l]}C.globalOptions=void 0,k.globalOptions=void 0,e.s(["default",0,k],914681)},46031,e=>{"use strict";var t=e.i(391398),n=e.i(191788),r=e.i(760814);let i=r.default.button.withConfig({componentId:"sc-89dce803-0"})`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 3rem;
  height: 3rem;
  @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
    width: 4rem;
    height: 4rem;
  }

  /* Border radius variants */
  ${({rounded:e="full"})=>{switch(e){case"sm":return r.css`
          border-radius: 8px;
        `;case"lg":return r.css`
          border-radius: 16px;
        `;default:return r.css`
          border-radius: 50%;
        `}}}

  /* Theme and fill variants */
  ${({variant:e="light",fill:t=!0})=>"glass"===e?r.css`
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
        border-radius: 40px;
        transform: translateZ(0);

        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.7);
          transform: translateZ(0) scale(1.05);
        }

        svg {
          color: #000;
          path {
            fill: #000;
          }
        }
      `:"light"===e?r.css`
        background: ${t?"#C2C2C2":"transparent"};

        &:hover:not(:disabled) {
          background: rgba(0, 0, 0, 1);
          transform: scale(1.05);

          svg {
            color: #ffffff;
            path {
              fill: #ffffff;
            }
          }
        }

        svg {
          color: #000;
          path {
            fill: #000;
          }
        }
      `:r.css`
        background: ${t?"rgba(255, 255, 255, 0.07)":"transparent"};

        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);

          svg {
            color: #000000;
            path {
              fill: #000000;
            }
          }
        }

        svg {
          color: #fff;
          path {
            fill: rgba(255, 255, 255, 0.2);
          }
        }
      `}

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    @media (min-width: ${({theme:e})=>e.globalV2.lg.minWidth}) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`,o=n.default.forwardRef(({direction:e="next",variant:n="light",rounded:r="full",fill:o=!0,...a},l)=>{let s="next"===e?"0deg":"180deg";return(0,t.jsx)(i,{ref:l,type:"button",variant:n,rounded:r,fill:o,direction:e,...a,children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"19",height:"14",viewBox:"0 0 19 14",fill:"none",style:{transform:`rotate(${s})`},children:(0,t.jsx)("path",{d:"M1.60144 6.01647C1.12405 6.01647 0.73705 6.40347 0.73705 6.88086C0.73705 7.35825 1.12405 7.74525 1.60144 7.74525V6.88086V6.01647ZM18.365 7.49208C18.7025 7.15451 18.7025 6.60721 18.365 6.26964L12.864 0.768697C12.5265 0.431131 11.9792 0.431131 11.6416 0.768697C11.304 1.10626 11.304 1.65356 11.6416 1.99113L16.5313 6.88086L11.6416 11.7706C11.304 12.1082 11.304 12.6555 11.6416 12.993C11.9792 13.3306 12.5265 13.3306 12.864 12.993L18.365 7.49208ZM1.60144 6.88086V7.74525H17.7538V6.88086V6.01647H1.60144V6.88086Z",fill:"black"})})})});o.displayName="CarouselButton",e.s(["CarouselButton",0,o])},713691,e=>{"use strict";let t={active:!0,breakpoints:{},delay:4e3,jump:!1,playOnInit:!0,stopOnFocusIn:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null};function n(e={}){let r,i,o,a,l=null,s=0,c=!1,d=!1,u=!1,m=!1;function p(){if(!o){if(g()){u=!0;return}c||i.emit("autoplay:play"),function(){let{ownerWindow:e}=i.internalEngine();e.clearTimeout(s),s=e.setTimeout(v,a[i.selectedScrollSnap()]),l=new Date().getTime(),i.emit("autoplay:timerset")}(),c=!0}}function f(){o||(c&&i.emit("autoplay:stop"),function(){let{ownerWindow:e}=i.internalEngine();e.clearTimeout(s),s=0,l=null,i.emit("autoplay:timerstopped")}(),c=!1)}function h(){if(g())return u=c,f();u&&p()}function g(){let{ownerDocument:e}=i.internalEngine();return"hidden"===e.visibilityState}function b(){d||f()}function x(){d||p()}function y(){d=!0,f()}function w(){d=!1,p()}function v(){let{index:e}=i.internalEngine(),t=e.clone().add(1).get(),n=i.scrollSnapList().length-1,o=r.stopOnLastSnap&&t===n;if(i.canScrollNext()?i.scrollNext(m):i.scrollTo(0,m),i.emit("autoplay:select"),o)return f();p()}return{name:"autoplay",options:e,init:function(l,s){var c,d,u,g;let v,C;i=l;let{mergeOptions:k,optionsAtMedia:j}=s,S=k(t,n.globalOptions);if(r=j(k(S,e)),i.scrollSnapList().length<=1)return;m=r.jump,o=!1,c=i,d=r.delay,v=c.scrollSnapList(),a="number"==typeof d?v.map(()=>d):d(v,c);let{eventStore:$,ownerDocument:F}=i.internalEngine(),_=!!i.internalEngine().options.watchDrag,E=(u=i,g=r.rootNode,C=u.rootNode(),g&&g(C)||C);$.add(F,"visibilitychange",h),_&&i.on("pointerDown",b),_&&!r.stopOnInteraction&&i.on("pointerUp",x),r.stopOnMouseEnter&&$.add(E,"mouseenter",y),r.stopOnMouseEnter&&!r.stopOnInteraction&&$.add(E,"mouseleave",w),r.stopOnFocusIn&&i.on("slideFocusStart",f),r.stopOnFocusIn&&!r.stopOnInteraction&&$.add(i.containerNode(),"focusout",p),r.playOnInit&&p()},destroy:function(){i.off("pointerDown",b).off("pointerUp",x).off("slideFocusStart",f),f(),o=!0,c=!1},play:function(e){void 0!==e&&(m=e),p()},stop:function(){c&&f()},reset:function(){c&&p()},isPlaying:function(){return c},timeUntilNext:function(){return l?a[i.selectedScrollSnap()]-(new Date().getTime()-l):null}}}n.globalOptions=void 0,e.s(["default",0,n])},852488,e=>{"use strict";var t=e.i(391398);e.s(["ReplayIcon",0,e=>(0,t.jsx)("svg",{className:e.className,style:e.style,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",width:"32px",height:"32px",children:(0,t.jsx)("path",{fill:e.fill??"#000000",d:"M 16 4 L 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 12.734375 7.585938 9.851563 10 8.03125 L 10 13 L 12 13 L 12 5 L 4 5 L 4 7 L 8.09375 7 C 5.59375 9.199219 4 12.417969 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z"})})])},555825,377414,774105,769869,e=>{"use strict";var t=e.i(391398),n=e.i(760814);n.css`
  padding: 9.6rem 0;
  @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
    padding: 15rem 0;
  }
`;let r=n.css`
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
  text-transform: uppercase;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 13px;
    line-height: 120%;
  }
`,i=n.css`
  font-size: 36px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -1.8px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 40px;
    line-height: 120%;
    letter-spacing: -2px;
  }
`,o=n.css`
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.32px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    font-size: 16px;
    line-height: 130%;
    letter-spacing: -0.32px;
  }
`,a=n.default.div.withConfig({componentId:"sc-83552663-0"})`
  padding-top: ${({$hasVerticalMargin:e})=>e?"8px":"0"};
  padding-bottom: ${({$hasVerticalMargin:e})=>e?"8px":"0"};
`;e.s(["BannerCaptionStyles",0,r,"BannerSubtitleStyles",0,o,"BannerTitleStyles",0,i,"SectionWrapper",0,a],377414);var l=e.i(419231),s=e.i(121666),c=e.i(486332),d=e.i(191788);e.i(664157);var u=e.i(271179),m=e.i(852488);let p=n.default.button.withConfig({componentId:"sc-f7e88f3c-0"})`
  position: absolute;
  bottom: 24px;
  left: 12px;
  background: transparent;
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  color: #ffffff99;
  border-radius: 24px;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  z-index: 9999;
  pointer-events: auto;

  &:focus {
    outline: 2px solid ${({theme:e})=>e.colors?.primary||"#00e0ff"};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(0, 224, 255, 0.3);
  }

  @media (min-width: ${({theme:e})=>e.globalV2?.md?.minWidth}) {
    left: 24px;
  }

  svg {
    height: 16px;
    width: auto;
    transform: translateY(1.5px);
    opacity: 0.7;
  }
`,f=n.default.div.withConfig({componentId:"sc-f7e88f3c-1"})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`,h=d.default.forwardRef(({src:e,poster:n,autoPlay:r=!0,loop:i=!0,muted:o=!0,playsInline:a=!0,playOnce:l=!1,visibilityThreshold:s=.1,showReplayButton:c=!1,style:h},g)=>{let{t:b}=(0,u.useTranslation)("homepage"),x=d.default.useRef(null),y=d.default.useRef(!1),w=d.default.useCallback(e=>{x.current=e,"function"==typeof g?g(e):g&&(g.current=e)},[g]);d.default.useEffect(()=>{let e=x.current;if(!e)return;let t=new IntersectionObserver(t=>{if(t[0].intersectionRatio<s||l&&y.current)return void e.pause();let n=e.play();n&&"function"==typeof n.catch&&n.catch(()=>void 0)},{threshold:[0,s,.25,.5,.75,1]});t.observe(e);let n=()=>{l&&(y.current=!0)};return e.addEventListener("ended",n),()=>{t.disconnect(),e.removeEventListener("ended",n)}},[s,l]);let v=d.default.useCallback(()=>{x.current&&(x.current.currentTime=0,x.current.play().catch(()=>{}))},[]);return(0,t.jsxs)(f,{children:[(0,t.jsx)("video",{ref:w,src:e,poster:n,preload:"metadata",autoPlay:r,loop:!l&&i,muted:o,playsInline:a,style:h}),c&&(0,t.jsx)(p,{onClick:v,"data-buttontype":"animation replay","aria-label":b("homepage.backgroundVideo.button.replayHeroAnimation","Replay hero animation"),title:b("homepage.backgroundVideo.button.replayAnimation","Replay animation"),children:(0,t.jsx)(m.ReplayIcon,{fill:"#ffffff"})})]})});h.displayName="BackgroundVideo",e.s(["BackgroundVideo",0,h],774105);var g=e.i(78198),b=e.i(657232);let x=n.default.div.withConfig({componentId:"sc-9d259d77-0"})`
  position: relative;
  color: #fff;
  overflow: hidden;
  ${({$foregroundFullBleedOnMobile:e})=>e&&n.css`
      @media (max-width: 768px) {
        overflow: visible;
      }
    `}
  height: 90vh;
  height: 90svh;
  display: grid;
  /* When foreground image is used, stretch content to fill so the foreground can flex */
  /* Otherwise place the content grid cell according to vertical alignment */
  ${({$position:e,$hasForegroundImage:t})=>t?n.css`
          align-items: stretch;
          & > * {
            min-height: 0;
          }
        `:n.css`
          align-items: ${e.includes("top")?"start":e.includes("bottom")?"end":"center"};
        `}
  /* Add safe offset from the viewport edge in full mode when aligned to top/bottom */
  padding-top: ${({$position:e,$inGrid:t})=>!t&&e.includes("top")?"80px":"0"};
  padding-bottom: ${({$position:e,$inGrid:t})=>!t&&e.includes("bottom")?"96px":"0"};

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    padding-top: ${({$position:e,$inGrid:t})=>!t&&e.includes("top")?"90px":"0"};
    padding-bottom: ${({$position:e,$inGrid:t})=>!t&&e.includes("bottom")?"120px":"0"};
  }
`,y=n.default.div.withConfig({componentId:"sc-9d259d77-1"})`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  img,
  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`,w=n.default.div.withConfig({componentId:"sc-9d259d77-2"})`
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`,v=n.default.div.withConfig({componentId:"sc-9d259d77-3"})`
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: bottom center;
  }

  ${({$fullBleedOnMobile:e})=>e&&n.css`
      @media (max-width: 768px) {
        width: 100vw;
        margin-left: calc(-50vw + 50%);

        img {
          object-fit: cover;
          object-position: bottom center;
        }
      }
    `}
`,C=n.default.div.withConfig({componentId:"sc-9d259d77-4"})`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({theme:e})=>e.globalV2.md.maxWidth}) {
    gap: 16px;
    padding-inline: 32px;
    padding-top: ${({$position:e,$inGrid:t})=>t?"64px":e.includes("top")?"0":"120px"};
    padding-bottom: ${({$position:e,$inGrid:t})=>t?"64px":e.includes("bottom")?"0":"120px"};
  }

  padding-top: ${({$position:e,$inGrid:t})=>t?"64px":e.includes("top")?"0":"96px"};
  padding-bottom: ${({$position:e,$inGrid:t})=>t?"64px":e.includes("bottom")?"0":"96px"};
  padding-inline: 16px;

  ${({$position:e})=>{let t=e.includes("left")?"flex-start":e.includes("right")?"flex-end":"center";return n.css`
      align-items: ${t};
      text-align: ${"flex-start"===t?"left":"flex-end"===t?"right":"center"};
    `}}
`,k=n.default.div.withConfig({componentId:"sc-9d259d77-5"})`
  display: flex; /* text content wrapper */
  flex-direction: column;
  gap: 4px; /* 4px gap between text elements */
  align-self: stretch;
  align-items: ${({$align:e})=>"left"===e?"flex-start":"right"===e?"flex-end":"center"};
`,j=n.default.div.withConfig({componentId:"sc-9d259d77-6"})`
  color: ${({$color:e})=>e??"#fff"};
  ${r}
  margin: 0;
`,S=n.default.h2.withConfig({componentId:"sc-9d259d77-7"})`
  margin: 0;
  color: ${({$color:e})=>e??"#fff"};
  ${i}
`,$=n.default.p.withConfig({componentId:"sc-9d259d77-8"})`
  margin: 0;
  color: ${({$color:e})=>e??"#fff"};
  ${o}
  max-width: 420px;
`,F=n.default.div.withConfig({componentId:"sc-9d259d77-9"})`
  display: flex; /* button wrapper */
  align-items: center;
  gap: 12px;
`,_=n.default.p.withConfig({componentId:"sc-9d259d77-10"})`
  font-size: 11px;
  font-weight: 400;
  color: ${({$color:e})=>e??"rgba(0, 0, 0, 0.6)"};
  margin: 8px 0 0;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`,E=n.default.div.withConfig({componentId:"sc-9d259d77-11"})`
  display: flex;
  width: 100%;
  max-width: 400px;
  padding: 32px 16px 32px 16px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  background-blend-mode: overlay;
  -webkit-backdrop-filter: blur(22px);
  backdrop-filter: blur(22px);

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    max-width: none;
    margin: 0 16px;
    padding: 24px 16px 24px 16px;
    min-height: auto;
  }
`,I=({caption:e,title:n,subtitle:r,cta:i,ctaAlt:o,horizontalAlign:a,contentColor:l,note:s})=>(0,t.jsxs)(E,{children:[(e||n||r)&&(0,t.jsxs)(k,{$align:a,children:[!!e&&(0,t.jsx)(j,{$color:l,children:e}),!!n&&(0,t.jsx)(S,{$color:l,children:n}),!!r&&(0,t.jsx)($,{$color:l,children:r})]}),(i||o)&&(0,t.jsxs)(F,{children:[!!i&&(0,t.jsx)(c.ButtonV2,{...i,children:i.children}),!!o&&(0,t.jsx)(c.ButtonV2,{...o,children:o.children})]}),!!s&&(0,t.jsx)(_,{$color:l,children:s})]}),L=({caption:e,title:n,subtitle:r,cta:i,ctaAlt:o,inGrid:a,horizontalAlign:l,contentColor:s,note:d})=>(0,t.jsxs)(t.Fragment,{children:[(e||n||r)&&(0,t.jsxs)(k,{$align:l,children:[!!e&&(0,t.jsx)(j,{$color:s,children:e}),!!n&&(0,t.jsx)(S,{$inGrid:a,$color:s,children:n}),!!r&&(0,t.jsx)($,{$inGrid:a,$color:s,children:r})]}),(i||o)&&(0,t.jsxs)(F,{children:[!!i&&(0,t.jsx)(c.ButtonV2,{...i,children:i.children}),!!o&&(0,t.jsx)(c.ButtonV2,{...o,children:o.children})]}),!!d&&(0,t.jsx)(_,{$color:s,children:d})]}),z=({className:e,id:n,caption:r,title:i,subtitle:o,cta:c,ctaAlt:d,position:u="center",background:m,foregroundImage:p,foregroundImageFullBleedOnMobile:f,backgroundStyles:k,contentContainerStyles:j,inGrid:S,eagerBackground:$,contentColor:F="#fff",sectionStyles:_,contentStyle:E="default",hasVerticalMargin:z,note:N,CustomContentComponent:T,CustomBackgroundComponent:A,...V})=>{let{width:P}=(0,b.useWindowSize)(),M=u.includes("left")?"left":u.includes("right")?"right":"center",O=e=>{if(e)return"string"==typeof e?e:P&&P<768?e.mobile:e.web},W=e=>{if(!e)return;if(/^(https?:)?\/\//.test(e))return e;let t=e.startsWith("/")?e:`/${e}`;return(0,g.getCompressedAssetUrl)(t)},B=e=>{if(!e)return;if(/^(https?:)?\/\//.test(e))return e;let t=e.startsWith("/")?e:`/${e}`;return(0,g.getCompressedAssetUrl)(t)},D=V["aria-label"],U="string"==typeof i?`${i} banner`:"string"==typeof r?`${r} banner`:void 0,R=D??U;return(0,t.jsx)(a,{as:S?"div":"section",id:n,$hasVerticalMargin:z,"aria-label":R,role:V.role??(S&&R?"region":void 0),...V,children:(0,t.jsxs)(x,{className:e,$position:u,$inGrid:S,$hasForegroundImage:!!p,$foregroundFullBleedOnMobile:f,style:_,children:[(m||A)&&(0,t.jsx)(y,{"aria-hidden":!0,children:A?(0,t.jsx)(A,{background:m,selectSrc:O,resolveVideoSrc:W,resolveImageSrc:B,backgroundStyles:k}):m?.type==="image"?(0,t.jsx)(s.CustomImage,{src:O(m.src),alt:m.alt??"",fill:!0,priority:$??!S,sizes:"100vw",style:{objectFit:"cover",...k}}):m?.type==="video"?(0,t.jsx)(h,{src:W(O(m.src)),poster:B(O(m.poster)),autoPlay:m.autoPlay??!0,loop:m.loop??!0,muted:m.muted??!0,playsInline:m.playsInline??!0,playOnce:m.playOnce??!1,visibilityThreshold:m.visibilityThreshold??.1,showReplayButton:m.showReplayButton??!1,style:k}):m?.type==="color"?(0,t.jsx)("div",{style:{position:"absolute",inset:0,backgroundColor:m.color,...k},"aria-hidden":!0}):null}),p?(0,t.jsxs)(w,{children:[(0,t.jsx)(l.Container,{children:(0,t.jsx)(C,{$position:u,$inGrid:S,style:j,children:T?(0,t.jsx)(T,{caption:r,title:i,subtitle:o,cta:c,ctaAlt:d,position:u,inGrid:S,horizontalAlign:M,contentColor:F,contentContainerStyles:j,note:N}):(()=>{let e={caption:r,title:i,subtitle:o,cta:c,ctaAlt:d,position:u,inGrid:S,horizontalAlign:M,contentColor:F,contentContainerStyles:j,note:N};switch(E){case"default":default:return(0,t.jsx)(L,{...e});case"blurred-card":return(0,t.jsx)(I,{...e})}})()})}),(0,t.jsx)(v,{"aria-hidden":!0,$fullBleedOnMobile:f,children:(0,t.jsx)(s.CustomImage,{src:O(p.src),alt:p.alt??"",fill:!0,priority:!S,sizes:"100vw",style:{objectFit:"contain",objectPosition:"bottom center"}})})]}):(0,t.jsx)(l.Container,{children:(0,t.jsx)(C,{$position:u,$inGrid:S,style:j,children:T?(0,t.jsx)(T,{caption:r,title:i,subtitle:o,cta:c,ctaAlt:d,position:u,inGrid:S,horizontalAlign:M,contentColor:F,contentContainerStyles:j,note:N}):(()=>{let e={caption:r,title:i,subtitle:o,cta:c,ctaAlt:d,position:u,inGrid:S,horizontalAlign:M,contentColor:F,contentContainerStyles:j,note:N};switch(E){case"default":default:return(0,t.jsx)(L,{...e});case"blurred-card":return(0,t.jsx)(I,{...e})}})()})})]})})};e.s(["default",0,z],769869),e.s(["Banner",0,z],555825)},139529,e=>{"use strict";var t=e.i(391398),n=e.i(958678);let r={futura:"https://use.typekit.net/ibm8mvt.css",dharma:"https://use.typekit.net/xaw6xmn.css"};e.s(["default",0,({kits:e})=>(0,t.jsxs)(n.default,{children:[(0,t.jsx)("link",{rel:"preconnect",href:"https://use.typekit.net",crossOrigin:"anonymous"},"typekit-preconnect"),e.map(e=>(0,t.jsx)("link",{rel:"stylesheet",href:r[e]},e))]})])},501311,e=>{e.v({className:"twkeverett_2253a465-module__0irMDW__className",variable:"twkeverett_2253a465-module__0irMDW__variable"})},385852,e=>{"use strict";var t=e.i(501311);let n={className:t.default.className,style:{fontFamily:"'twkEverett', 'twkEverett Fallback', system-ui, sans-serif"}};null!=t.default.variable&&(n.variable=t.default.variable),e.s(["twkEverett",0,n],385852)},558602,e=>{"use strict";var t=e.i(391398);e.s(["CountdownTimer",0,e=>(0,t.jsxs)("svg",{className:e.className,style:e.style,width:"13",height:"12",viewBox:"0 0 13 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{d:"M5.99556 11.9933C9.31131 11.9933 11.9933 9.30912 11.9933 5.99775C11.9933 2.6842 9.31577 0 5.99775 0C5.59745 0 5.3506 0.233506 5.3506 0.616011V2.61971C5.3506 2.94662 5.58192 3.19347 5.9088 3.19347C6.23349 3.19347 6.46034 2.94662 6.46034 2.61971V0.558192L5.87546 1.31875C8.51965 1.26093 10.6434 3.37361 10.6434 5.99775C10.6434 8.5641 8.57968 10.6479 5.99556 10.6479C3.41141 10.6479 1.34099 8.5641 1.34544 5.99775C1.34766 4.9192 1.72795 3.90733 2.35507 3.11786C2.60637 2.75314 2.66419 2.41289 2.36619 2.12824C2.07931 1.84803 1.61675 1.88139 1.32098 2.28169C0.502596 3.30022 0 4.59897 0 5.99775C0 9.30912 2.68198 11.9933 5.99556 11.9933Z",fill:e.fill??"#000"}),(0,t.jsx)("path",{d:"M5.9958 6.99604C6.54954 6.99604 6.99652 6.54906 6.99652 5.99751C6.99652 5.66171 6.82973 5.34818 6.54066 5.15912L3.93871 3.39339C3.55398 3.14431 3.19594 3.50681 3.43834 3.89598L5.12403 6.48899C5.31974 6.80256 5.6355 6.99604 5.9958 6.99604Z",fill:e.fill??"#000"})]})])},657758,e=>{"use strict";var t=e.i(391398);e.i(664157);var n=e.i(271179),r=e.i(914681),i=e.i(191788),o=e.i(760814),a=e.i(402100),l=e.i(661791),s=e.i(419231),c=e.i(121666),d=e.i(46031);let u=(0,o.default)(({className:e,data:n,advisorId:r})=>(0,t.jsx)("div",{className:e,children:(0,t.jsx)("div",{className:"element-content",children:(0,t.jsx)("div",{className:"element-image",children:(0,t.jsx)(c.CustomImage,{src:n.thumb,alt:n.name,fill:!0,style:{objectFit:"cover",objectPosition:n.logo.position??"center"},className:"img",loading:"lazy"})})})})).withConfig({componentId:"sc-ec299436-0"})`
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  width: calc(100% - 10px);
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${({theme:e})=>e.global.phone.maxWidth}) {
    width: 100%;
    margin-right: unset;
  }

  @media (min-width: ${({theme:e})=>e.global.laptop.maxWidth}) {
    min-width: unset;
  }

  .element-content {
    position: relative;
    width: 100%;

    .element-image {
      position: relative;
      width: 100%;
      aspect-ratio: 150/109;
      overflow: hidden;
      border-radius: 8px;

      @media (max-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        aspect-ratio: 3/4;
      }

      @media (min-width: ${({theme:e})=>e.global.laptop.maxWidth}) {
        height: 450px;
        aspect-ratio: unset;
      }

      @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
        height: 410px;
        aspect-ratio: unset;
      }

      .img {
        object-fit: cover;
      }
    }

    .element-image::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }

  & .text-content {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2.4rem 1.8rem 1.6rem;

    .name {
      margin-top: 1.3rem;
      font-size: 22px;
      font-weight: 500;
    }
  }
`,m=[{name:"Team UAE Emirates",logo:{src:"web_v2/home/sports-team-UAE/UAE-emirates-logo.webp",width:40,height:48},thumb:"web_v2/home/sports-team-UAE/1.webp/w_900",description:'"The Ultrahuman Ring is a great tool to better understand things like sleep quality and HRV which are important considerations when preparing your fueling needs."'},{name:"UAE Team ADQ",logo:{src:"web_v2/home/sports-team-UAE/uae-team-adq.png",width:132,height:38,position:"right"},thumb:"web_v2/home/sports-team-UAE/uae-team-adq.png/w_900",description:'"This collaboration will assist us in optimizing our training and preparation so that we can continue to compete at the highest level."'},{name:"Roojai Insurance Cycling Team",logo:{src:"web_v2/home/sports-team-UAE/Bahrain-victorious-logo.webp",width:132,height:38,position:"right"},thumb:"web_v2/home/sports-team-UAE/3.jpg/w_900",description:`"Ultrahuman's innovative training and coaching platform will help the athletes achieve their performance goals. Athletes will get data-backed interventions to improve their performance and recovery protocols."

    `}],p=o.css`
  /* Slider */
  .slick-slider {
    position: relative;
    display: block;
    box-sizing: border-box;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;

    @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
      width: calc(100vw - 24px);
    }
  }

  // custom
  .slick-slider button {
    position: absolute;
    z-index: 1;
    cursor: pointer;

    bottom: -60px;

    border-radius: 50%;

    border: none;
    background-color: transparent;
    color: #ffffff;
    @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
      display: none;
    }

    &:first-child {
      top: -10.5%;
      left: 94%;
      height: 6.4rem;
      transform: translateX(-100%);

      &:hover .circle-blur-btn {
        transform: translateX(-10%);
      }
    }

    &:last-child {
      top: -10.5%;
      height: 6.4rem;
      right: 5%;
      transform: translateX(100%);

      &:hover .circle-blur-btn {
        transform: translateX(10%);
      }
    }

    .circle-blur-btn {
      height: 5.3rem;
      width: 5.3rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: rgba(0, 0, 0, 0.1);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      transition: all 0.2s cubic-bezier(0.25, 0.25, 0.25, 1);
      transform: none;
      border: 1px solid #00000060 !important;
    }

    &:active .circle-blur-btn {
      // filter: brightness(20%);
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .slick-list {
    position: relative;

    display: block;
    overflow-x: hidden;

    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: none;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }

  .slick-slider .slick-track,
  .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;

    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .slick-track:before,
  .slick-track:after {
    display: table;

    content: '';
  }
  .slick-track:after {
    clear: both;
  }
  .slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slide {
    display: none;
    float: left;

    height: 100%;
    min-height: 1px;
  }
  [dir='rtl'] .slick-slide {
    float: right;
  }

  .slick-slide img {
    display: block;
    // border : 5px solid red;
    // custom
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  .slick-slide.slick-loading img {
    display: none;
    border: 5px solid blue;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-loading .slick-slide {
    visibility: hidden;
  }
  .slick-vertical .slick-slide {
    display: block;

    height: auto;

    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-slide {
    width: 100%;
  }

  .slids-thumbs-container {
    margin-top: 0.8rem;
    max-width: 100%;
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 0 0.8rem;
    flex-wrap: nowrap;
    overflow-x: auto;

    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    img {
      height: 4.8rem;
      width: 8.6rem;
      object-fit: cover;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      flex-shrink: 0;

      &:not(.active) {
        opacity: 0.4;
      }
    }
  }
`,f=o.css`
  .embla {
    position: relative;
    overflow: hidden;

    @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
      width: calc(100vw - 24px);
    }
  }

  .embla__container {
    display: flex;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
  }

  .embla__slide {
    flex: 0 0 50%;
    min-width: 0;
    padding-left: 10px;
    padding-right: 10px;

    @media (max-width: 878px) {
      flex: 0 0 calc(100% - 36px);
      padding-left: 2px;
      padding-right: 2px;
    }
  }

  .embla__button {
    position: absolute;
    z-index: 10;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #ffffff;

    @media (max-width: ${({theme:e})=>e.global.phone.maxWidth}) {
      display: none;
    }

    &.embla__button--prev {
      top: -10.5%;
      left: 94%;
      height: 6.4rem;
      transform: translateX(-100%);
    }

    &.embla__button--next {
      top: -10.5%;
      height: 6.4rem;
      right: 5%;
      transform: translateX(100%);
    }
  }
`,h=(0,o.default)(({className:e})=>{let[o,a]=(0,r.default)({loop:!0,align:"start",slidesToScroll:1,breakpoints:{"(max-width: 878px)":{align:"center",containScroll:"trimSnaps"}}}),c=(0,i.useCallback)(()=>{a&&a.scrollPrev()},[a]),m=(0,i.useCallback)(()=>{a&&a.scrollNext()},[a]),{t:p}=(0,n.useTranslation)("home"),f=[{name:p("home.athleteSectionNew.athletes.a.teamName","Team UAE Emirates"),logo:{src:"web_v2/home/sports-team-UAE/UAE-emirates-logo.webp",width:40,height:48},thumb:"web_v2/home/sports-team-UAE/1.webp/w_900",description:`"${p("home.athleteSectionNew.athletes.a.description","The Ultrahuman Ring is a great tool to better understand things like sleep quality and HRV which are important considerations when preparing your fueling needs.")}"`},{name:p("home.athleteSectionNew.athletes.c.teamName","Roojai Insurance Cycling Team"),logo:{src:"web_v2/home/sports-team-UAE/Bahrain-victorious-logo.webp",width:132,height:38,position:"right"},thumb:"web_v2/home/sports-team-UAE/3.jpg/w_900",description:`"${p("home.athleteSectionNew.athletes.c.description","Ultrahuman's innovative training and coaching platform will help the athletes achieve their performance goals. Athletes will get data-backed interventions to improve their performance and recovery protocols.")}"`},{name:p("home.athleteSectionNew.athletes.b.teamName","UAE Team ADQ"),logo:{src:"web_v2/home/sports-team-UAE/uae-team-adq.png",width:132,height:38,position:"right"},thumb:"web_v2/home/sports-team-UAE/uae-team-adq.png/w_900",description:`"${p("home.athleteSectionNew.athletes.b.description","This collaboration will assist us in optimizing our training and preparation so that we can continue to compete at the highest level.")}"`}];return(0,t.jsx)("section",{className:e,children:(0,t.jsx)(s.Container,{children:(0,t.jsxs)("div",{className:"content",children:[(0,t.jsxs)(l.H2Large,{children:[p("home.athleteSectionNew.title.a","Powering world")," ",(0,t.jsx)("br",{})," ",p("home.athleteSectionNew.title.b","champions")]}),(0,t.jsxs)("div",{className:"carousal-container",children:[(0,t.jsx)("div",{className:"embla",ref:o,children:(0,t.jsx)("div",{className:"embla__container",children:f.map((e,n)=>(0,t.jsx)("div",{className:"embla__slide",children:(0,t.jsxs)("div",{className:"element-parent",children:[(0,t.jsx)(u,{data:e},e.name),(0,t.jsxs)("div",{className:"text-container",children:[(0,t.jsx)("div",{className:"name",children:e.name}),(0,t.jsx)("div",{className:"desc",children:e.description})]})]})},n))})}),(0,t.jsx)("div",{className:"embla__button embla__button--prev",role:"button","aria-label":p("home.athletesSection.aria.previous","Previous"),children:(0,t.jsx)(d.CarouselButton,{onClick:c,variant:"light",rounded:"full",fill:!0,direction:"prev","aria-label":p("home.athletesSection.aria.previous","Previous")})}),(0,t.jsx)("div",{className:"embla__button embla__button--next",role:"button","aria-label":p("home.athletesSection.aria.next","Next"),children:(0,t.jsx)(d.CarouselButton,{onClick:m,variant:"light",rounded:"full",fill:!0,direction:"next","aria-label":p("home.athletesSection.aria.next","Next")})})]})]})})})}).withConfig({componentId:"sc-ec299436-1"})`
  padding: 8rem 0;
  background-color: #eee;

  @media (min-width: ${({theme:e})=>e.global.phone.maxWidth}) {
    padding: 150px 0;
    .mobile-hidden {
      display: inline;
    }
  }

  .mobile-hidden {
    display: none;
  }

  & .content {
    h2 {
      text-align: left;
      letter-spacing: -3px;
      color: ${({theme:e})=>e.colorsV2.primary};

      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        margin: 0 2.4rem;
        font-size: 8rem;
        line-height: 8rem;
      }
    }

    p {
      width: 100%;
      text-align: center;
      font-size: 1.8rem;
      color: rgb(255, 255, 255, 0.7);

      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        width: 75%;
        padding: 0 0rem;
        text-align: center;
        font-size: 2.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }
  .carousal-container {
    ${a.hideScrollbar}
    ${f}
    position: relative;

    overflow: hidden;

    @media (min-width: ${({theme:e})=>e.global.phone.maxWidth}) {
      overflow: visible;
    }

    .element-parent {
      position: relative;
      flex-shrink: 0;
      position: relative;
      margin-top: 1.6rem;
      overflow-x: auto;
      ${a.hideScrollbar}
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
        flex-shrink: initial;
      }

      .text-container {
        width: 100%;

        position: relative;
        bottom: 0;
        left: 0;

        font-weight: 500;
        text-align: left;
        padding-left: 0.4rem;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
        padding-top: 1.4rem;

        @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
          bottom: 0rem;
          padding-top: 1.6rem;
          padding-bottom: 0.2rem;
          padding: 1.6rem 1.2rem 0.2rem;
        }

        .name {
          font-size: 3.2rem;
          letter-spacing: -1.2px;
          max-width: calc(100% - 24px);

          @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
            font-size: 4rem;
            letter-spacing: -1.6px;
            max-width: unset;
          }
        }
        .desc {
          font-size: 1.6rem;
          color: #00000080;
          padding-top: 0.8rem;
          font-weight: 400;
          max-width: calc(100% - 24px);
          letter-spacing: -0.1px;

          @media (min-width: ${({theme:e})=>e.global.tablet.maxWidth}) {
            font-size: 2rem;
            max-width: unset;
            letter-spacing: -0.2px;
          }
        }
      }
    }
  }
`;e.s(["Arrow",0,({className:e,style:n,onClick:r,children:i})=>(0,t.jsx)("button",{className:e,style:n,onClick:()=>{r&&r()},children:i}),"AtheletesSectionNew",0,h,"athletes",0,m,"emblaStyles",0,f,"sliderStyle",0,p])},89057,e=>{"use strict";var t=e.i(391398);e.s(["RingAirIcon",0,e=>(0,t.jsx)("svg",{width:"100%",height:"100%",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid meet",className:e.className,style:e.style,children:(0,t.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM11 2.2C6.13989 2.2 2.2 6.13989 2.2 11C2.2 15.8601 6.13989 19.8 11 19.8C15.8601 19.8 19.8 15.8601 19.8 11C19.8 6.13989 15.8601 2.2 11 2.2ZM15.9494 17.601C14.5707 18.6365 12.857 19.25 11 19.25C9.14311 19.25 7.4295 18.6365 6.05079 17.6012L15.9494 17.601Z",fill:e.fill??"#ffffff"})})])},995458,e=>{"use strict";var t=e.i(391398);e.s(["M1Icon",0,e=>(0,t.jsx)("svg",{width:"100%",height:"100%",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid meet",className:e.className,style:e.style,children:(0,t.jsx)("path",{d:"M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM5.88281 7V10.4854H7.96387L4.5 13.4199L7.0166 16L11 12.625L14.9834 16L17.5 13.4199L14.0361 10.4854H16.1123V7H5.88281Z",fill:e.fill??"#ffffff"})})])},14760,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={BailoutToCSRError:function(){return a},isBailoutToCSRError:function(){return l}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let o="BAILOUT_TO_CLIENT_SIDE_RENDERING";class a extends Error{constructor(e){super(`Bail out to client-side rendering: ${e}`),this.reason=e,this.digest=o}}function l(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===o}},968115,e=>{"use strict";var t=e.i(391398);e.s(["HomeIcon",0,e=>(0,t.jsxs)("svg",{width:"100%",height:"100%",viewBox:"0 0 25 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid meet",className:e.className,style:e.style,children:[(0,t.jsx)("rect",{width:"25",height:"11",rx:"1",fill:e.fill??"#ffffff"}),(0,t.jsx)("path",{d:"M0 13.0703C0 12.7942 0.223858 12.5703 0.5 12.5703H24.5C24.7761 12.5703 25 12.7942 25 13.0703V13.659C25 13.7856 24.9519 13.9075 24.8655 14.0001L23.593 15.3636C23.2148 15.7689 22.6852 15.999 22.1309 15.999H12.5H2.54135C1.8887 15.999 1.2771 15.6806 0.902851 15.1459L0.0903752 13.9851C0.0315516 13.9011 0 13.801 0 13.6984V13.0703Z",fill:e.fill??"#ffffff"})]})])},627681,e=>{"use strict";var t=e.i(391398);e.s(["BloodVisionIcon",0,e=>(0,t.jsx)("svg",{width:"100%",height:"100%",viewBox:"0 0 15 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid meet",className:e.className,style:e.style,children:(0,t.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.1667 0C14.5758 0 14.916 0.294792 14.9866 0.683541L15 0.833333V3.33333C15 6.23701 13.3496 8.75547 10.9357 10.0018C13.3496 11.2445 15 13.763 15 16.6667V19.1667L14.9866 19.3165C14.916 19.7052 14.5758 20 14.1667 20C13.7064 20 13.3333 19.6269 13.3333 19.1667V18.75H1.66667V19.1667L1.65324 19.3165C1.58268 19.7052 1.24243 20 0.833333 20C0.373096 20 0 19.6269 0 19.1667V16.6667L0.0106062 16.2652C0.102278 14.5337 0.784963 12.9122 1.93247 11.6416C3.3452 10.0772 5.35033 9.16667 7.5 9.16667C9.48107 9.16667 11.2316 8.17889 12.286 6.66903L2.71266 6.66746C2.85214 6.8672 3.00459 7.05889 3.16939 7.24138C3.47785 7.58294 3.45102 8.1099 3.10945 8.41836C2.76789 8.72683 2.24093 8.69999 1.93247 8.35843C0.784963 7.08778 0.102278 5.46634 0.0106062 3.73477L0 3.33333V0.833333C0 0.373096 0.373096 0 0.833333 0C1.24243 0 1.58268 0.294792 1.65324 0.683541L1.66667 0.833333V1.25H13.3333V0.833333C13.3333 0.373096 13.7064 0 14.1667 0ZM13.0918 15.0004L1.90815 14.9999C1.74956 15.5331 1.66667 16.0933 1.66667 16.6667V17.0833H13.3333V16.6667L13.3247 16.3466C13.2995 15.8813 13.2198 15.4304 13.0918 15.0004ZM7.5 10.8333C5.82684 10.8333 4.26935 11.5406 3.16939 12.7586C3.00414 12.9416 2.85131 13.1338 2.71152 13.3342L12.2871 13.3326C11.2329 11.8218 9.4818 10.8333 7.5 10.8333ZM13.3333 2.91667H1.66667V3.33333C1.66667 3.9073 1.74973 4.46801 1.90864 5.00181L13.0913 5.00131C13.2196 4.57074 13.2995 4.11932 13.3247 3.65337L13.3333 3.33333V2.91667Z",fill:e.fill??"#ffffff"})})])},611829,(e,t,n)=>{"use strict";function r(e,t){var n=e.length;for(e.push(t);0<n;){var r=n-1>>>1,i=e[r];if(0<a(i,t))e[r]=t,e[n]=i,n=r;else break}}function i(e){return 0===e.length?null:e[0]}function o(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;for(var r=0,i=e.length,o=i>>>1;r<o;){var l=2*(r+1)-1,s=e[l],c=l+1,d=e[c];if(0>a(s,n))c<i&&0>a(d,s)?(e[r]=d,e[c]=n,r=c):(e[r]=s,e[l]=n,r=l);else if(c<i&&0>a(d,n))e[r]=d,e[c]=n,r=c;else break}}return t}function a(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(n.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var l,s=performance;n.unstable_now=function(){return s.now()}}else{var c=Date,d=c.now();n.unstable_now=function(){return c.now()-d}}var u=[],m=[],p=1,f=null,h=3,g=!1,b=!1,x=!1,y=!1,w="function"==typeof setTimeout?setTimeout:null,v="function"==typeof clearTimeout?clearTimeout:null,C="u">typeof setImmediate?setImmediate:null;function k(e){for(var t=i(m);null!==t;){if(null===t.callback)o(m);else if(t.startTime<=e)o(m),t.sortIndex=t.expirationTime,r(u,t);else break;t=i(m)}}function j(e){if(x=!1,k(e),!b)if(null!==i(u))b=!0,S||(S=!0,l());else{var t=i(m);null!==t&&N(j,t.startTime-e)}}var S=!1,$=-1,F=5,_=-1;function E(){return!!y||!(n.unstable_now()-_<F)}function I(){if(y=!1,S){var e=n.unstable_now();_=e;var t=!0;try{e:{b=!1,x&&(x=!1,v($),$=-1),g=!0;var r=h;try{t:{for(k(e),f=i(u);null!==f&&!(f.expirationTime>e&&E());){var a=f.callback;if("function"==typeof a){f.callback=null,h=f.priorityLevel;var s=a(f.expirationTime<=e);if(e=n.unstable_now(),"function"==typeof s){f.callback=s,k(e),t=!0;break t}f===i(u)&&o(u),k(e)}else o(u);f=i(u)}if(null!==f)t=!0;else{var c=i(m);null!==c&&N(j,c.startTime-e),t=!1}}break e}finally{f=null,h=r,g=!1}}}finally{t?l():S=!1}}}if("function"==typeof C)l=function(){C(I)};else if("u">typeof MessageChannel){var L=new MessageChannel,z=L.port2;L.port1.onmessage=I,l=function(){z.postMessage(null)}}else l=function(){w(I,0)};function N(e,t){$=w(function(){e(n.unstable_now())},t)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(e){e.callback=null},n.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<e?Math.floor(1e3/e):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},n.unstable_requestPaint=function(){y=!0},n.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},n.unstable_scheduleCallback=function(e,t,o){var a=n.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?a+o:a,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=0x3fffffff;break;case 4:s=1e4;break;default:s=5e3}return s=o+s,e={id:p++,callback:t,priorityLevel:e,startTime:o,expirationTime:s,sortIndex:-1},o>a?(e.sortIndex=o,r(m,e),null===i(u)&&e===i(m)&&(x?(v($),$=-1):x=!0,N(j,o-a))):(e.sortIndex=s,r(u,e),b||g||(b=!0,S||(S=!0,l()))),e},n.unstable_shouldYield=E,n.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},252659,(e,t,n)=>{"use strict";t.exports=e.r(611829)},56464,e=>{"use strict";var t=e.i(391398),n=e.i(760814);e.i(664157);var r=e.i(271179),i=e.i(558602),o=e.i(101814),a=e.i(185546);let l="#AF8C00",s=n.default.div.withConfig({componentId:"sc-852578dc-0"})`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-transform: uppercase;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 14px;
    font-size: 15px;
  }
`,c=n.default.span.withConfig({componentId:"sc-852578dc-1"})`
  color: #000;
`,d=n.default.span.withConfig({componentId:"sc-852578dc-2"})`
  display: none;
  color: rgba(0, 0, 0, 0.3);
  font-size: 10px;

  @media (min-width: 768px) {
    display: inline;
  }
`,u=n.default.span.withConfig({componentId:"sc-852578dc-3"})`
  text-decoration: line-through;
  color: rgba(0, 0, 0, 0.5);
`,m=n.default.span.withConfig({componentId:"sc-852578dc-4"})`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${l};

  svg {
    width: 16px;
    height: 16px;
    display: flex;
    align-self: center;
  }
`;e.s(["TierCampaignChip",0,function({tierCampaign:e,basePrice:n,currencySymbol:p,store:f,className:h}){let{t:g}=(0,r.useTranslation)("ring-pro");if(!e||!e.campaign_active)return null;let b=e.tier_info[e.active_tier];if(!b)return null;let x=(0,a.getDiscountForStore)(b.discount_value,f),y=null!==b.max_order_count,w=y?(b.max_order_count??0)-e.total_orders:0;return(0,t.jsxs)(s,{className:h,children:[(0,t.jsxs)(c,{children:[b.title," ",g("ring-pro.tierCampaign.at")," ",x>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(u,{children:[p,(0,o.formatPriceWithComma)(n)]})," "]}),p,(0,o.formatPriceWithComma)(n-x)]}),y&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{children:"•"}),(0,t.jsxs)(m,{children:[(0,t.jsx)(i.CountdownTimer,{fill:l}),(0,o.formatPriceWithComma)(w)," ",g("ring-pro.tierCampaign.left")]})]})]})}])},648761,e=>{e.v(t=>Promise.all(["static/chunks/0n..hexfw6r85.js"].map(t=>e.l(t))).then(()=>t(493594)))},828805,e=>{e.v(e=>Promise.resolve().then(()=>e(879466)))},260501,e=>{e.v(t=>Promise.all(["static/chunks/0z~n7bkh79f7h.js","static/chunks/0kh71qzm98ehn.js","static/chunks/124wj_sfq37ps.css"].map(t=>e.l(t))).then(()=>t(297611)))},826413,e=>{e.v(t=>Promise.all(["static/chunks/039uv2ku~mz87.js"].map(t=>e.l(t))).then(()=>t(24453)))},328152,e=>{e.v(t=>Promise.all(["static/chunks/15phut5cq1_6e.js","static/chunks/0.z2m2oupig9c.js","static/chunks/04fppgc.17tzy.js","static/chunks/0_7cipgluy3_r.js","static/chunks/00xliov4797vi.js","static/chunks/05idag3qwpte7.js"].map(t=>e.l(t))).then(()=>t(640008)))},776218,e=>{e.v(e=>Promise.resolve().then(()=>e(973528)))},285138,e=>{e.v(t=>Promise.all(["static/chunks/15myc7-5hsb7u.js","static/chunks/15phut5cq1_6e.js","static/chunks/15_nm._.syxj_.js","static/chunks/0dx995gvcywc..js"].map(t=>e.l(t))).then(()=>t(228755)))},336770,e=>{e.v(t=>Promise.all(["static/chunks/16r1yh1vwl_wf.js"].map(t=>e.l(t))).then(()=>t(131449)))},13830,e=>{e.v(t=>Promise.all(["static/chunks/0b4ejdhlo4ruk.js","static/chunks/0ckdfko8nlkn-.js"].map(t=>e.l(t))).then(()=>t(785852)))},409135,e=>{e.v(t=>Promise.all(["static/chunks/0befjkhjy7v_5.js"].map(t=>e.l(t))).then(()=>t(314075)))},283061,e=>{e.v(t=>Promise.all(["static/chunks/0ou_pkmjg9hc9.js"].map(t=>e.l(t))).then(()=>t(274691)))},811820,e=>{e.v(t=>Promise.all(["static/chunks/0smlix67a0063.js"].map(t=>e.l(t))).then(()=>t(616196)))}]);