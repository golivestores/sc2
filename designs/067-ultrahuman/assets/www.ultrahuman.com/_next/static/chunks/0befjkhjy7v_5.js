(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,371588,t=>{t.q("assets/www.ultrahuman.com/_next/static/media/chat-bubbles.0z74dy7uy5-o8.svg")},869752,t=>{t.q("assets/www.ultrahuman.com/_next/static/media/cross-icon.13ug0ju.wqzop.svg")},902756,t=>{"use strict";var e=t.i(391398),i=t.i(760814);let o={src:t.i(371588).default,width:28,height:28,blurWidth:0,blurHeight:0};var a=t.i(126019),n=t.i(191788),r=t.i(111869),l=t.i(957134),s=t.i(981022);let d={src:t.i(869752).default,width:16,height:16,blurWidth:0,blurHeight:0};var p=t.i(940290),c=t.i(203828);function h(t,e){return RegExp("^"+e.split("*").map(t=>t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")).join(".*")+"$").test(t)}t.i(664157);var b=t.i(271179);let m=(0,i.default)(({className:t,trackingParams:i})=>{let{t:o}=(0,b.useTranslation)("common");return(0,e.jsx)("div",{className:t,children:(0,e.jsx)(s.TypeformSnippet,{typeformId:"yOi1E7Wy",frameTitle:o("wAChatbot.typeformSnippet.frameTitle.bookCall"),className:"typeform-container",trackingParams:i})})}).withConfig({componentId:"sc-5908e670-0"})`
  height: 80vh;
  width: calc(100vw - 48px);

  @media (min-width: ${({theme:t})=>t.global.tablet.maxWidth}) {
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
`,u=()=>(0,e.jsx)(g,{}),g=(0,i.default)(({className:t})=>{let{t:i}=(0,b.useTranslation)("common"),s=(0,c.useRouter)(),u=(0,n.useContext)(l.ModalContext),[g,x]=(0,n.useState)(!1);if(r.NO_WA_CHATBOT_PAGES.some(t=>s.pathname.startsWith(t)))return null;let f=r.WA_CHATBOT_ALTERNATE_MOBILE_UI_PAGES.map(t=>RegExp(`^${t.replace("*",".*")}$`)).some(t=>t.test(s.pathname))&&!r.WA_CHATBOT_ALTERNATE_MOBILE_UI_EXCEPTIONS.includes(s.pathname);return(0,e.jsxs)("div",{className:`${t} ${f?"alternate-mobile":""}`,children:[(0,e.jsx)("div",{className:`chatbot-container ${g?"active":""}`,children:h(s.pathname,"/performance-lab*")?(0,e.jsxs)("button",{onClick:()=>window.open("tel:+918047282422"),children:[i("wAChatbot.button.talkToSpecialist"),(0,e.jsx)(p.CaretUp,{style:{transform:"rotate(90deg)"}})]}):h(s.pathname,"/ring/order*")||h(s.pathname,"/ring/claim*")?(0,e.jsxs)("button",{onClick:()=>{window.open("mailto:support@ultrahuman.com","_blank")},children:[i("wAChatbot.button.emailSupport"),(0,e.jsx)(p.CaretUp,{style:{transform:"rotate(90deg)"}})]}):(0,e.jsxs)("button",{onClick:()=>{let t="website";window&&(t=window.location.hostname+window.location.pathname),u.set((0,e.jsx)(m,{trackingParams:{utm_source:t,utm_medium:"float-button"}})),u.setCloseButtonTheme("light"),u.show(),x(!1)},children:[i("wAChatbot.button.prePurchaseConsultation"),(0,e.jsx)(p.CaretUp,{style:{transform:"rotate(90deg)"}})]})}),(0,e.jsx)("button",{onClick:()=>x(!g),className:"chatbot-toggle-button",style:{background:g?"transparent":"",backdropFilter:g?"none":void 0,border:g?"none":void 0},children:g?(0,e.jsx)(a.default,{src:d,className:"crossbtn",alt:"chat_bot_icon"}):(0,e.jsx)(a.default,{src:o,alt:"chat_bot_icon"})})]})}).withConfig({componentId:"sc-5908e670-1"})`
  --cb-btn-w: 50px;

  z-index: 100;

  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px;
  width: 60px;
  height: 60px;

  .chatbot-container {
    position: absolute;
    bottom: 16px;
    right: 16px;
    transition: all 0.3s ease-in-out;
    clip-path: circle(0% at 85% 85%);

    background: rgba(0, 0, 0, 0.7);
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    // filter: invert(100%);
    width: calc(100vw - 32px);
    padding: 24px;
    border-radius: 24px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (min-width: ${({theme:t})=>t.globalV2.md.maxWidth}) {
      width: 300px;
    }

    &.active {
      clip-path: circle(200% at 100% 100%);
    }

    button {
      padding: 8px 0px;
      border: none;
      background: none;
      color: #ffffff;
      font-size: 1.6rem;
      text-align: left;
      cursor: pointer;

      &:hover {
        svg {
          transform: translate(4px) rotate(90deg) !important;
        }
      }

      svg {
        display: inline-block;
        height: 1rem;
        width: auto;
        margin-left: 8px;
        transition: all 0.2s ease-in-out;
      }
    }
  }
  .chatbot-toggle-button {
    position: absolute;
    bottom: 16px;
    right: 16px;
    border: 1px solid #ffffff40;
    width: var(--cb-btn-w);
    height: var(--cb-btn-w);
    padding: 1px;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    cursor: pointer;
    border-radius: 50%;

    background: rgba(0, 0, 0, 0.8);
    // filter: invert(100%);

    img,
    svg {
      width: calc(var(--cb-btn-w) - 24px);
      transform: translateY(2px);
      height: auto;
      padding: 1px;
    }

    .crossbtn {
      position: relative;
      width: 16px;
    }
  }

  &.alternate-mobile {
    @media (max-width: ${({theme:t})=>t.globalV2.md.maxWidth}) {
      .chatbot-toggle-button {
        right: 0;
        border-radius: 50% 0 0 50%;
        bottom: 112px;
        height: 54px;
        width: 54px;
      }
    }

    @media (min-width: ${({theme:t})=>t.globalV2.md.maxWidth}) {
      .chatbot-toggle-button {
        bottom: 72px;
      }
    }
  }
`;t.s(["BookCallTFComponentDiv",0,m,"ChatBot",0,u,"default",0,u],902756)},314075,t=>{t.n(t.i(902756))}]);