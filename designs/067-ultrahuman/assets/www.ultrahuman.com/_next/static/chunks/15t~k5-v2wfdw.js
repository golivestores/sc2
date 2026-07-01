(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,150687,e=>{"use strict";e.s(["PHONE_MAX_WIDTH_IN_PX",0,768,"TABLET_MAX_WIDTH_IN_PX",0,1024,"theme",0,{global:{desktop:{fontSize:"62.5%",gridColumnWidth:"128px",gridColumnGap:"48px",gridColumSpacing:"1fr"},laptop:{maxWidth:"1444px",fontSize:"55%",gridColumnWidth:"130px",gridColumnGap:"30px",gridColumSpacing:"1fr"},tablet:{maxWidth:"1024px",fontSize:"45%",gridColumnWidth:"60px",gridColumnGap:"24px",gridColumSpacing:"1fr"},phone:{maxWidth:"768px",fontSize:"40%",gridColumnWidth:"1fr",gridColumnGap:"12px",gridColumSpacing:"4px",negativeXMargin:"-16px"}},colors:{background:"#000000",primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.3)",accent:"#0279e8"},spacing:{xs:4,s:8,m:16,l:24,xl:48,xxl:96},typography:{font:{default:"Helvetica Neue, sans-serif"},fontWeight:{regular:400,semibold:500,bold:600},fontSize:{extrasmall:"1.4rem",mediumsmall:"1.7rem",small:"1.9rem",medium:"2.4rem",large:"3.2rem",extralarge:"6.4rem",xxlarge:"9.1rem",ultralarge:"12.5rem"}},globalV2:{xs:{minWidth:"400px",maxWidth:"576px",gridColumnWidth:"1fr",gridColumnGap:"8px",gridColumSpacing:"4px"},sm:{minWidth:"576px",maxWidth:"768px",gridColumnWidth:"1fr",gridColumnGap:"12px",gridColumSpacing:"4px"},md:{minWidth:"768px",maxWidth:"992px",gridColumnWidth:"1fr",gridColumnGap:"24px",gridColumSpacing:"1fr"},md_alt:{minWidth:"768px",maxWidth:"1024px",gridColumnWidth:"1fr",gridColumnGap:"24px",gridColumSpacing:"1fr"},lg:{minWidth:"992px",maxWidth:"1200px",gridColumnWidth:"1fr",gridColumnGap:"30px",gridColumSpacing:"1fr"},xl:{minWidth:"1200px",maxWidth:"1400px",gridColumnWidth:"1fr",gridColumnGap:"36px",gridColumSpacing:"1fr"},xxl:{minWidth:"1400px",gridColumnWidth:"1fr",gridColumnGap:"48px",gridColumSpacing:"1fr"},xxxl:{minWidth:"2100px",maxWidth:"2500px",gridColumnWidth:"1fr",gridColumnGap:"48px",gridColumSpacing:"1fr"}},colorsV2:{primary:"#000000",secondary:"rgba(0,0,0,0.6)",background:"#ffffff",accent:"rgba(5, 255, 0, 1)",primaryBlue:"rgb(0, 127, 245)"},typographyV2:{font:{default:"var(--font-graphik), system-ui, sans-serif",helvetica:"var(--font-helvetica-neue), Helvetica, sans-serif",playfair:"var(--font-playfair), serif",spaceGrotesk:"var(--font-space-grotesk), system-ui, sans-serif"},fontWeight:{regular:400,semibold:500,bold:600},fontSize:{extrasmall:"1.4rem",mediumsmall:"1.6rem",small:"1.9rem",medium:"2.4rem",large:"3.2rem",extralarge:"4.8rem",xlarge:"7.2rem",xxlarge:"9.6rem",ultralarge:"12.5rem"}}}])},402100,e=>{"use strict";var t=e.i(760814);t.css`
  @font-face {
    font-family: Graphik;
    font-weight: 300;
    src: url('/fonts/Graphik/Light.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 400;
    src: url('/fonts/Graphik/Regular.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 500;
    src: url('/fonts/Graphik/Medium.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 600;
    src: url('/fonts/Graphik/Semibold.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 700;
    src: url('/fonts/Graphik/Bold.otf') format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: Space Grotesk;
    font-weight: 400 500 700;
    src: url('/fonts/SpaceGrotesk/VariableFont.ttf') format('truetype');
    font-display: swap;
  }
`;let i=t.css`
  @font-face {
    font-family: Playfair;
    font-weight: 300 400;
    src: url('/fonts/Playfair/Regular.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: Playfair;
    font-weight: 300 400;
    src: url('/fonts/Playfair/Italic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: Playfair;
    font-weight: 500 600 700;
    src: url('/fonts/Playfair/Medium.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: Playfair;
    font-weight: 500 600 700;
    src: url('/fonts/Playfair/MediumItalic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }
`,r=t.css`
  @font-face {
    font-family: HelveticaNeue;
    font-weight: 300;
    src: url('/fonts/HelveticaNeue/Light.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 300;
    src: url('/fonts/HelveticaNeue/LightItalic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 400;
    src: url('/fonts/HelveticaNeue/Regular.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 400;
    src: url('/fonts/HelveticaNeue/Italic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 500 600 700;
    src: url('/fonts/HelveticaNeue/Medium.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 500 600 700;
    src: url('/fonts/HelveticaNeue/MediumItalic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }
`,a=t.css`
  display: grid;
  width: 100%;
  grid-template-columns:
    var(--grid-column-spacing) repeat(8, var(--grid-column-width))
    var(--grid-column-spacing);
  column-gap: var(--grid-column-gap);
  row-gap: 0;
`,o="700%",n=t.keyframes`
  0% {
    background-position: -${o} 0;
  }
  100% {
    background-position: ${o} 0;
  }
`,s=t.css`
  animation: ${n} 15s infinite linear;
  background-color: black;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(65, 65, 65, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: ${o} 100%;
`,l=t.css`
  animation: ${n} 15s infinite linear;
  background-color: black;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(2, 121, 232, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: ${o} 100%;
`,d=t.css`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  border: none;
  color: #ffffff;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: rgb(2, 121, 232);
`,c=t.css`
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`,u=t.css`
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB4GSURBVHgBXdzXziNFE4BhL2bJS845wxAWiQMu5L9sBEgcIJLIOefMwj9v6XusFiNZtmc6VFdXruo598wzz/zvtttuO/z555+nz6VLlw5XX3314fvvvz/ceOONh65+//DDD4crrrhinj3yyCNzr//d716/f/vtt8Mtt9xy+PLLL6df4918882H22+//fDKK6/MeL/++uu0q0/fDz/88OGzzz473HXXXYevvvrqcN111w0M9f3jjz/m+5prrpn7P//88+HOO++cOb/55pu5H/yvvfbazNHY995777SrfePX7ng8zvPuN3ZjmKvnXbUNPuu2vtbTVbv6dnX/wQcfPBwvXry4NWmfHvbg/Pnz0zng+v/vv//Ovauuuurw+++/z+/vvvvu8M8//5wGbZFffPHFLOzHH3+cZ/ULAXfcccfh448/nn71v3DhwjwPyOaoz6233nr4+++/Z47GaaG1v+yyy6ZPG9Z389WvPjfddNPMXdsrr7zy1LbxP/roo2nXxjRmsPj+6aefBq5+//LLLwPD119/PYhqM86dOzfra4Pvueeegac2iKtxG6s1Hffd3959993ZoQC5/vrrZ7CAr1OL6jfE/vXXXwNsnxB1//33z859++23M+G11157opIAbcK+A7bFNU7f3f/8889njp4FXOM05mOPPTYLaY42tu/aBlsfCwkJIS246te9G264YcaJ2iC0e5AXfK0pymvNUSGEBH9jNF6f2ofINqt+NjTYwlGUftypcUMJUUoA1zAkvPDCC7OTLTpgQ0QDtIi++7QLTdS9FtpEIbmdbaIWELD9DpAW39WcUUp9oyRjoYD69f/uu++eNiGl+y26MRq/qzFbvAXipMYP3p4Fe+NF9SEz7grhzd+6e46aQ0ywNEdjBU/rqX/3u9eY9R3R8Oijj241RmV2px188cUXB1AAQ2wD2PEADXmolyyJHRqr36im3a5vSGgxAfPQQw8NdTV3CGqO2C6EhLjmaQ6c0BUstW9h9W+OntmckFRfIoE81r97iYyQ1RjBEqU1ZzB0v982rd+tIXiDvfshveu4C/gt0m23GowiaZCnn356OoSoAAqp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')
    repeat;
  mix-blend-mode: darken;
`;t.css`
  // background: #f2d36f;
  background: linear-gradient(
    70deg,
    #915e08 0%,
    #915e08 8%,
    #b1852a 14%,
    #f2d36f 22%,
    #f2d36f 29%,
    #fdf4d0 32%,
    #ab7309 53%,
    #b17b13 69%,
    #dfc063 77%,
    #fbf1bb 90%,
    #905d07 100%
  );
`;let f=t.default.sup.withConfig({componentId:"sc-7cd40ee7-0"})`
  font-size: 0.35em;
  padding: 0 2px 0 1px;
`;t.css`
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
  }
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: '';
  }
  .slick-track:after {
    clear: both;
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
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }
`,e.s(["BlueButtonCss",0,d,"HelveticaNeueFontMixin",0,r,"NoiseBg",0,u,"PlayfairFontMixin",0,i,"Sup",0,f,"backgroundImageMixin",0,({webp:e,image:i})=>t.css`
  background-image: url('${i}');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  ${e&&t.css`
    /* Chrome 66+, Edge 79+, Opera 53+, Android Browser 80+ */
    @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
      @supports (background-image: -webkit-image-set(url('${e.src}') 1x)) {
        background-image: ${()=>`-webkit-image-set(url('${e.src}') 1x)`};
      }
    }

    /* FF 66+ */
    @supports (flex-basis: max-content) and (-moz-appearance: meterbar) {
      background-image: url('${e.src}');
    }
  `};
`,"gridMixin",0,a,"hideScrollbar",0,c,"maskImageMixin",0,({webp:e,image:i})=>t.css`
  mask-image: url('${i}');
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: cover;

  ${e&&t.css`
    /* Chrome 66+, Edge 79+, Opera 53+, Android Browser 80+ */
    @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
      @supports (mask-image: -webkit-image-set(url('${e}') 1x)) {
        mask-image: ${()=>`-webkit-image-set(url('${e}') 1x)`};
      }
    }

    /* FF 66+ */
    @supports (flex-basis: max-content) and (-moz-appearance: meterbar) {
      mask-image: url('${e}');
    }
  `};
`,"shimmerAnimate",0,s,"shimmerAnimateBlue",0,l])},78198,e=>{"use strict";let t="https://cdn.speedsize.com",i="https://public-web-assets.uh-static.com";e.s(["S3_URI",0,"https://s3.amazonaws.com/public-web-assets.ultrahuman.com","SPEEDSIZE_CDN",0,t,"UH_STATIC_URL",0,i,"getAssetUrl",0,e=>`${i}${e}`,"getCompressedAssetUrl",0,e=>`${t}/3f711f28-1488-44dc-b013-5e43284ac4b0/${i}${e}`])},663230,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"useMergedRef",{enumerable:!0,get:function(){return a}});let r=e.r(191788);function a(e,t){let i=(0,r.useRef)(null),a=(0,r.useRef)(null);return(0,r.useCallback)(r=>{if(null===r){let e=i.current;e&&(i.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(i.current=o(e,r)),t&&(a.current=o(t,r))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let i=e(t);return"function"==typeof i?i:()=>e(null)}}("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},215125,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return o},imageConfigDefault:function(){return n}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let o=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},813521,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"ImageConfigContext",{enumerable:!0,get:function(){return o}});let r=e.r(741705)._(e.r(191788)),a=e.r(215125),o=r.default.createContext(a.imageConfigDefault)},468816,(e,t,i)=>{"use strict";function r(e,t){let i=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e,t.qualities[0]):i}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"findClosestQuality",{enumerable:!0,get:function(){return r}})},213606,(e,t,i)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:i,blurHeight:a,blurDataURL:o,objectFit:n}){let s=i?40*i:e,l=a?40*a:t,d=s&&l?`viewBox='0 0 ${s} ${l}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===n?"xMidYMid":"cover"===n?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${o}'/%3E%3C/svg%3E`}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},866785,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(894470);let r=e.r(420262),a=e.r(213606),o=e.r(215125),n=["-moz-initial","fill","none","scale-down",void 0];function s(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:i=!1,priority:c=!1,preload:u=!1,loading:f,className:p,quality:g,width:m,height:h,fill:y=!1,style:b,overrideSrc:v,onLoad:w,onLoadingComplete:S,placeholder:x="empty",blurDataURL:P,fetchPriority:C,decoding:k="async",layout:A,objectFit:V,objectPosition:E,lazyBoundary:I,lazyRoot:R,...j},M){var W;let F,O,z,{imgConf:G,showAltText:U,blurComplete:Y,defaultLoader:B}=M,Q=G||o.imageConfigDefault;if("allSizes"in Q)F=Q;else{let e=[...Q.deviceSizes,...Q.imageSizes].sort((e,t)=>e-t),t=Q.deviceSizes.sort((e,t)=>e-t),i=Q.qualities?.sort((e,t)=>e-t);F={...Q,allSizes:e,deviceSizes:t,qualities:i}}if(void 0===B)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let N=j.loader||B;delete j.loader,delete j.srcSet;let L="__next_img_default"in N;if(L){if("custom"===F.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=N;N=t=>{let{config:i,...r}=t;return e(r)}}if(A){"fill"===A&&(y=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[A];e&&(b={...b,...e});let i={responsive:"100vw",fill:"100vw"}[A];i&&!t&&(t=i)}let q="",J=l(m),X=l(h);if((W=e)&&"object"==typeof W&&(s(W)||void 0!==W.src)){let t=s(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(O=t.blurWidth,z=t.blurHeight,P=P||t.blurDataURL,q=t.src,!y)if(J||X){if(J&&!X){let e=J/t.width;X=Math.round(t.height*e)}else if(!J&&X){let e=X/t.height;J=Math.round(t.width*e)}}else J=t.width,X=t.height}let K=!c&&!u&&("lazy"===f||void 0===f);(!(e="string"==typeof e?e:q)||e.startsWith("data:")||e.startsWith("blob:"))&&(i=!0,K=!1),F.unoptimized&&(i=!0),L&&!F.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(i=!0);let D=l(g),T=Object.assign(y?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:V,objectPosition:E}:{},U?{}:{color:"transparent"},b),H=Y||"empty"===x?null:"blur"===x?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:J,heightInt:X,blurWidth:O,blurHeight:z,blurDataURL:P||"",objectFit:T.objectFit})}")`:`url("${x}")`,Z=n.includes(T.objectFit)?"fill"===T.objectFit?"100% 100%":"cover":T.objectFit,_=H?{backgroundSize:Z,backgroundPosition:T.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:H}:{},$=function({config:e,src:t,unoptimized:i,width:a,quality:o,sizes:n,loader:s}){if(i){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,r.getDeploymentId)();if(e){let i=t.indexOf("?");if(-1!==i){let r=new URLSearchParams(t.slice(i+1));r.get("dpl")||(r.append("dpl",e),t=t.slice(0,i)+"?"+r.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:l,kind:d}=function({deviceSizes:e,allSizes:t},i,r){if(r){let i=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=i.exec(r);)a.push(parseInt(e[2]));if(a.length){let i=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*i),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof i?{widths:e,kind:"w"}:{widths:[...new Set([i,2*i].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,a,n),c=l.length-1;return{sizes:n||"w"!==d?n:"100vw",srcSet:l.map((i,r)=>`${s({config:e,src:t,quality:o,width:i})} ${"w"===d?i:r+1}${d}`).join(", "),src:s({config:e,src:t,quality:o,width:l[c]})}}({config:F,src:e,unoptimized:i,width:J,quality:D,sizes:t,loader:N}),ee=K?"lazy":f;return{props:{...j,loading:ee,fetchPriority:C,width:J,height:X,decoding:k,className:p,style:{...T,..._},sizes:$.sizes,srcSet:$.srcSet,src:v||$.src},meta:{unoptimized:i,preload:u||c,placeholder:x,fill:y}}}},803866,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return n}});let r=e.r(468816),a=e.r(420262);function o({config:e,src:t,width:i,quality:n}){let s=(0,a.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let i=new URLSearchParams(t.slice(e+1)),r=i.get("dpl");if(r){s=r,i.delete("dpl");let a=i.toString();t=t.slice(0,e)+(a?"?"+a:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let l=(0,r.findClosestQuality)(n,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${i}&q=${l}${t.startsWith("/")&&s?`&dpl=${s}`:""}`}o.__next_img_default=!0;let n=o},849194,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"Image",{enumerable:!0,get:function(){return w}});let r=e.r(741705),a=e.r(952456),o=e.r(391398),n=a._(e.r(191788)),s=r._(e.r(730943)),l=r._(e.r(280963)),d=e.r(866785),c=e.r(215125),u=e.r(813521);e.r(894470);let f=e.r(425479),p=r._(e.r(803866)),g=e.r(663230),m={deviceSizes:[640,750,828,1080,1200,1920,2048],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function h(e,t,i,r,a,o,n){let s=e?.src;e&&e["data-loaded-src"]!==s&&(e["data-loaded-src"]=s,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),i?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,a=!1;i.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function y(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,n.forwardRef)(({src:e,srcSet:t,sizes:i,height:r,width:a,decoding:s,className:l,style:d,fetchPriority:c,placeholder:u,loading:f,unoptimized:p,fill:m,onLoadRef:b,onLoadingCompleteRef:v,setBlurComplete:w,setShowAltText:S,sizesInput:x,onLoad:P,onError:C,...k},A)=>{let V=(0,n.useCallback)(e=>{e&&(C&&(e.src=e.src),e.complete&&h(e,u,b,v,w,p,x))},[e,u,b,v,w,C,p,x]),E=(0,g.useMergedRef)(A,V);return(0,o.jsx)("img",{...k,...y(c),loading:f,width:a,height:r,decoding:s,"data-nimg":m?"fill":"1",className:l,style:d,sizes:i,srcSet:t,src:e,ref:E,onLoad:e=>{h(e.currentTarget,u,b,v,w,p,x)},onError:e=>{S(!0),"empty"!==u&&w(!0),C&&C(e)}})});function v({isAppRouter:e,imgAttributes:t}){let i={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...y(t.fetchPriority)};return e&&s.default.preload?(s.default.preload(t.src,i),null):(0,o.jsx)(l.default,{children:(0,o.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...i},"__nimg-"+t.src+t.srcSet+t.sizes)})}let w=(0,n.forwardRef)((e,t)=>{let i=(0,n.useContext)(f.RouterContext),r=(0,n.useContext)(u.ImageConfigContext),a=(0,n.useMemo)(()=>{let e=m||r||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),i=e.deviceSizes.sort((e,t)=>e-t),a=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:i,qualities:a,localPatterns:"u"<typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:s,onLoadingComplete:l}=e,g=(0,n.useRef)(s);(0,n.useEffect)(()=>{g.current=s},[s]);let h=(0,n.useRef)(l);(0,n.useEffect)(()=>{h.current=l},[l]);let[y,w]=(0,n.useState)(!1),[S,x]=(0,n.useState)(!1),{props:P,meta:C}=(0,d.getImgProps)(e,{defaultLoader:p.default,imgConf:a,blurComplete:y,showAltText:S});return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(b,{...P,unoptimized:C.unoptimized,placeholder:C.placeholder,fill:C.fill,onLoadRef:g,onLoadingCompleteRef:h,setBlurComplete:w,setShowAltText:x,sizesInput:e.sizes,ref:t}),C.preload?(0,o.jsx)(v,{isAppRouter:!i,imgAttributes:P}):null]})});("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},288961,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r={default:function(){return c},getImageProps:function(){return d}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let o=e.r(741705),n=e.r(866785),s=e.r(849194),l=o._(e.r(803866));function d(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,i]of Object.entries(t))void 0===i&&delete t[e];return{props:t}}let c=s.Image},126019,(e,t,i)=>{t.exports=e.r(288961)},121666,e=>{"use strict";var t=e.i(391398),i=e.i(126019),r=e.i(191788),a=e.i(78198);let o=e=>`${a.SPEEDSIZE_CDN}/3f711f28-1488-44dc-b013-5e43284ac4b0/${a.UH_STATIC_URL}/${e}`,n=({src:e,width:t})=>{let i=o(e);return t&&/\.(png|jpe?g|webp)$/i.test(e)?`${i}/w_${t}`:i},s=({src:e})=>o(e),l=(0,r.forwardRef)(function({src:e,alt:r,...a},o){let l="string"==typeof e&&e.startsWith("/");return(0,t.jsx)(i.default,{ref:o,src:e,loader:l?void 0:a.priority?s:n,alt:r,...a})});e.s(["CustomImage",0,l])},657232,e=>{"use strict";var t=e.i(191788);let i=t.useLayoutEffect;e.s(["useWindowSize",0,()=>{let[e,r]=(0,t.useState)({width:0,height:0});return i(()=>{r({width:window.innerWidth,height:window.innerHeight})},[]),(0,t.useEffect)(()=>{let e=null,t=window.innerWidth,i=window.innerHeight;function a(){null===e&&(e=requestAnimationFrame(()=>{let a=window.innerWidth,o=window.innerHeight;(a!==t||o!==i)&&(t=a,i=o,r({width:a,height:o})),e=null}))}return window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a),null!==e&&cancelAnimationFrame(e)}},[]),e}])},37515,e=>{"use strict";var t=e.i(859207);let i={[t.ShopifyStore.IN]:{Year1:{variantId:"gid://shopify/ProductVariant/42410419650630",alternateVariantId:"gid://shopify/ProductVariant/42410419650630",price:2499},Year2:{variantId:"gid://shopify/ProductVariant/42458741243974",alternateVariantId:"gid://shopify/ProductVariant/42458741243974",price:3998,save:20}},[t.ShopifyStore.AE]:{Year1:{variantId:"gid://shopify/ProductVariant/52323624976755",alternateVariantId:"gid://shopify/ProductVariant/52323624976755",price:99.99},Year2:{variantId:"gid://shopify/ProductVariant/52355419963763",alternateVariantId:"gid://shopify/ProductVariant/52355419963763",price:159,save:20}},[t.ShopifyStore.EU]:{Year1:{variantId:"gid://shopify/ProductVariant/55121009639798",alternateVariantId:"gid://shopify/ProductVariant/55121009639798",price:29},Year2:{variantId:"gid://shopify/ProductVariant/55176328544630",alternateVariantId:"gid://shopify/ProductVariant/55176328544630",price:46,save:21}},[t.ShopifyStore.GB]:{Year1:{variantId:"gid://shopify/ProductVariant/55121009639798",alternateVariantId:"gid://shopify/ProductVariant/55121009639798",price:25},Year2:{variantId:"gid://shopify/ProductVariant/55176328544630",alternateVariantId:"gid://shopify/ProductVariant/55176328544630",price:40,save:20}},[t.ShopifyStore.ROW]:{Year1:{variantId:"gid://shopify/ProductVariant/42449043783740",alternateVariantId:"gid://shopify/ProductVariant/42449043783740",price:24},Year2:{variantId:"gid://shopify/ProductVariant/42493701947452",alternateVariantId:"gid://shopify/ProductVariant/42493701947452",price:38,save:21}},[t.ShopifyStore.US]:{Year1:{variantId:"gid://shopify/ProductVariant/41515248222304",alternateVariantId:"gid://shopify/ProductVariant/41515248222304",price:24},Year2:{variantId:"gid://shopify/ProductVariant/41559589814368",alternateVariantId:"gid://shopify/ProductVariant/41559589814368",price:38,save:21}},[t.ShopifyStore.AU]:{Year1:{variantId:"gid://shopify/ProductVariant/55121009639798",alternateVariantId:"gid://shopify/ProductVariant/55121009639798",price:39},Year2:{variantId:"gid://shopify/ProductVariant/55176328544630",alternateVariantId:"gid://shopify/ProductVariant/55176328544630",price:59,save:24}},[t.ShopifyStore.CA]:{Year1:{variantId:"gid://shopify/ProductVariant/41515248222304",alternateVariantId:"gid://shopify/ProductVariant/41515248222304",price:35},Year2:{variantId:"gid://shopify/ProductVariant/41559589814368",alternateVariantId:"gid://shopify/ProductVariant/41559589814368",price:49,save:30}},[t.ShopifyStore.SA]:{Year1:{variantId:"gid://shopify/ProductVariant/55121009639798",alternateVariantId:"gid://shopify/ProductVariant/55121009639798",price:103},Year2:{variantId:"gid://shopify/ProductVariant/55176328544630",alternateVariantId:"gid://shopify/ProductVariant/55176328544630",price:165,save:41}},[t.ShopifyStore.MX]:{Year1:{variantId:"gid://shopify/ProductVariant/55121009639798",alternateVariantId:"gid://shopify/ProductVariant/55121009639798",price:442},Year2:{variantId:"gid://shopify/ProductVariant/55176328544630",alternateVariantId:"gid://shopify/ProductVariant/55176328544630",price:699,save:185}},[t.ShopifyStore.ZA]:{Year1:{variantId:"gid://shopify/ProductVariant/55121009639798",alternateVariantId:"gid://shopify/ProductVariant/55121009639798",price:599},Year2:{variantId:"gid://shopify/ProductVariant/55176328544630",alternateVariantId:"gid://shopify/ProductVariant/55176328544630",price:999,save:199}}};e.s(["CardioAdaptibilityShopifyMap",0,i])},310640,e=>{"use strict";var t=e.i(859207);let i={[t.ShopifyStore.IN]:{Year1:"gid://shopify/ProductVariant/42178684354630",Year2:"gid://shopify/ProductVariant/42189944815686",Month3:"gid://shopify/ProductVariant/44331688067142"},[t.ShopifyStore.AE]:{Year1:"gid://shopify/ProductVariant/51627504140659",Year2:"gid://shopify/ProductVariant/51628981518707",Month3:"gid://shopify/ProductVariant/62359756374387"},[t.ShopifyStore.ROW]:{Year1:"gid://shopify/ProductVariant/42199560552508",Year2:"gid://shopify/ProductVariant/42216495448124",Month3:"gid://shopify/ProductVariant/40908419989564"},[t.ShopifyStore.US]:{Year1:"gid://shopify/ProductVariant/41322443374688",Year2:"gid://shopify/ProductVariant/41333972074592",Month3:"gid://shopify/ProductVariant/40200379727968"},[t.ShopifyStore.GB]:{Year1:"gid://shopify/ProductVariant/50437365563710",Year2:"gid://shopify/ProductVariant/50461136355646",Month3:"gid://shopify/ProductVariant/49202073993534"},[t.ShopifyStore.EU]:{Year1:"gid://shopify/ProductVariant/50437365563710",Year2:"gid://shopify/ProductVariant/50461136355646",Month3:"gid://shopify/ProductVariant/49202073993534"},[t.ShopifyStore.AU]:{Year1:"gid://shopify/ProductVariant/50437365563710",Year2:"gid://shopify/ProductVariant/50461136355646",Month3:"gid://shopify/ProductVariant/49202073993534"},[t.ShopifyStore.CA]:{Year1:"gid://shopify/ProductVariant/41322443374688",Year2:"gid://shopify/ProductVariant/41333972074592",Month3:"gid://shopify/ProductVariant/40200379727968"},[t.ShopifyStore.SA]:{Year1:"gid://shopify/ProductVariant/50437365563710",Year2:"gid://shopify/ProductVariant/50461136355646",Month3:"gid://shopify/ProductVariant/49202073993534"},[t.ShopifyStore.MX]:{Year1:"gid://shopify/ProductVariant/50437365563710",Year2:"gid://shopify/ProductVariant/50461136355646",Month3:"gid://shopify/ProductVariant/49202073993534"},[t.ShopifyStore.ZA]:{Year1:"gid://shopify/ProductVariant/50437365563710",Year2:"gid://shopify/ProductVariant/50461136355646",Month3:"gid://shopify/ProductVariant/49202073993534"}};e.s(["uhxVariantIds",0,i])},640077,e=>{"use strict";let t=new Set([e.i(859207).ShopifyStore.GB]);e.s(["isM1UhxBundlingEnabled",0,function(e){return!!e&&!t.has(e)}])},562591,e=>{"use strict";e.s(["getCookie",0,function(e){let t={};return document.cookie.split(";").forEach(function(e){let[i,r]=e.split("=");t[i.trim()]=r}),t[e]},"setCookie",0,function(e,t,i=30){document.cookie=`${e}=${encodeURIComponent(t)};path=/;max-age=${86400*i};SameSite=Lax`}])}]);