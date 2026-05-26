import{x as E,C as k,T as A,t as z}from"./libs-CFvlTRJz.js";import{e as n,c as $,o as f,p as L}from"./file-input.astro_astro_type_script_index_0_lang-CJVABS5o.js";import{c as g,e as W}from"./petit-kit-DNrI3lPJ.js";import"./ogl-DYa94y7C.js";import"./gsap-Bc2aDPd5.js";import"./ClientRouter.astro_astro_type_script_index_0_lang-CUYf2et0.js";const d=(o,e=document)=>e.querySelector(o),U=(o,e=document)=>Array.from(e.querySelectorAll(o)),M=()=>E()==="/";let m=!1,c=null;function b(o,e){o&&(e.forEach(t=>{t?.set&&(t.set("active",!1),(t.$?t.$("c-tag"):[]).forEach(s=>{s?.setColor&&s.setColor("none")}))}),o?.set&&(o.set("active",!0),(o.$?o.$("c-tag"):[]).forEach(r=>{r?.setColor&&r.setColor("var(--color-white)")})))}function S(){if(m)return;m=!0;const o=d("#section__services__content"),e=d("#section__services__content__card");if(!o||!e)return;const t=U("c-service-card");t.forEach(i=>{i.addEventListener("mouseenter",()=>b(i,t),{passive:!0})});let r=!1,s=0;c=i=>{s=i.clientX,!r&&(r=!0,requestAnimationFrame(()=>{const v=s,h=W(300,Math.max(301,window.innerWidth-300),v,0,1),a=Math.max(window.innerWidth/5,380),u=window.innerWidth-(710+a*4);e.style.transform=`translateX(${h*u}px)`,r=!1}))},e.addEventListener("mousemove",c);const l=t[0];l&&b(l,t)}function q(){if(!m)return;m=!1;const o=d("#section__services__content__card");o&&c&&o.removeEventListener("mousemove",c),c=null}document.addEventListener("astro:page-load",()=>{M()&&S()});document.addEventListener("astro:after-swap",()=>{q()});class R extends k{constructor(){super({plugins:[A,z],props:{index:0,active:{type:"boolean",default:!1,reflect:!0},title:"",subtitle:"",copy:"",points:"",tags:[],video_path:"",bg:"",params:{}},styles:`
          c-service-card {
            user-select: none;
          }
          c-service-card * {
            user-select: none;
          }
          c-service-card .service-card-line {
            border-right: 1px solid;
            border-image: linear-gradient(to bottom, var(--color-dark), var(--color-white)) 1 100%;
            transition: opacity 300ms ${n};
          }
          .dark c-service-card .service-card-line {
            border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--color-purple)) 1 100%;
          }
        `})}onUpdate(){if(this.props.active&&this.props?.params?.colors?.[0]){const e=d("#section__services__top");e&&(e.style.backgroundColor=this.props.params.colors[0])}}onMount(){const e=()=>this.update();window.addEventListener("resize",e),this._onResize=e,this._modeUnsub=$.subscribe(()=>{this.update()}),this.plugins.timeout(()=>{const t=this.$?this.$("video"):null,r=Array.isArray(t)?t[0]:t;r&&r.play&&(r.muted=!0,r.play().catch(()=>{}))},100)}onUnmount(){if(this._onResize&&(window.removeEventListener("resize",this._onResize),this._onResize=null),this._modeUnsub){try{this._modeUnsub()}catch{}this._modeUnsub=null}}render(){const e=$.get(),t=!!this.props.active,r=Math.max(window.innerWidth/5,260),s=t?710:r,l=t?"var(--color-white)":this.props.params?.colors?.[0]||"var(--color-dark)",i=t?"var(--color-white)":"none",v=t?"'Wide' 10":"'Wide' 0",h=`radial-gradient(circle at top left, var(--c-tl) 40%, transparent 70%),
        radial-gradient(circle at top right, var(--c-tr) 40%, transparent 70%),
        radial-gradient(circle at bottom left, var(--c-bl) 40%, transparent 70%),
        radial-gradient(circle at bottom right, var(--c-br) 40%, transparent 70%);`,a=t?[this.props.params?.colors?.[0],this.props.params?.colors?.[1],this.props.params?.colors?.[3],this.props.params?.colors?.[2]]:e==="light"?["var(--color-white)","var(--color-white)","var(--color-white)","var(--color-white)"]:["var(--color-midnight)","var(--color-midnight)","var(--color-midnight)","var(--color-midnight)"],u=t?1:.5,w=t?"var(--color-white)":"none",y=t?"var(--color-white)":"none",x=Array.isArray(this.props.tags)?this.props.tags:[];return this.tpl(g`
        <div
          class="relative h-full px-[60px] py-[20px] flex flex-col gap-[20px] xl:gap-0"
          style="
            min-width: 380px;
            width: ${s}px; transition: all 500ms ${f};
            background-image: ${h};
            --c-tl: ${a[0]};
            --c-tr: ${a[1]};
            --c-bl: ${a[2]};
            --c-br: ${a[3]};
          "
        >
          <div>
            <div class="pb-[20px]">
              <h2
                class="font-[Lemon] w-full max-w-[490px] h-[140px] xl:h-[260px] text-[60px] xl:text-[80px] font-[500] text-left uppercase leading-[100%] pb-[20px] flex justify-center items-start flex-col"
                style="color: ${l}; font-variation-settings: ${v}; transition: font-variation-settings 500ms ${f}, color 300ms ${n};"
              >
                ${this.props.title.split("_").map((p,_)=>{const C=_>0?"block":"";return g`<span class="${C}">${p}</span>`})}
              </h2>
              <div class="flex flex-wrap gap-[10px] mt-[20px] min-h-[60px]">
                ${(t?x:x.slice(0,2)).map(p=>g`<c-tag
                    key=${String(p)}
                    content=${String(p)}
                    borderColor=${w}
                    color=${y}
                  ></c-tag>`)}
              </div>
            </div>

            <div
              class="w-full text-2xl text-left relative w-fit font-['Alte-Haas-Grotesk'] text-dark dark:text-white mb-[20px] mt-[60px]"
              style="color: ${i}; transition: color 300ms ${n}, font-weight 300ms ${n}; font-weight: ${t?700:400};"
            >
              <img
                class="absolute right-0 top-0 scale-${u*100} -translate-y-[40%] z-0 cover"
                style="transition: scale 300ms ${n};"
                src="${this.props.bg}"
                alt=""
              />
              <span class="relative z-10">${this.props.subtitle}</span>
            </div>
          </div>

          <div
            class="${L} w-[590px] text-left text-white"
            style="display: ${t?"block":"none"};"
          >
            ${this.props.copy}
          </div>

          <video
            autoplay
            muted
            loop
            playsinline
            preload="auto"
            class="h-[25vh] max-h-[222px] rounded-[10px] object-cover"
            style="transition: opacity 300ms ${n}, margin-bottom 300ms ${f}; opacity: ${t?0:1}; margin-bottom: ${t?-50:0}px;"
            src="${this.props.video_path}"
            alt=""
          ></video>

          <div
            class="service-card-line absolute w-[1px] h-full top-0 right-0"
            style="opacity: ${t?0:1};"
          ></div>
        </div>
      `)}}customElements.get("c-service-card")||customElements.define("c-service-card",R);
