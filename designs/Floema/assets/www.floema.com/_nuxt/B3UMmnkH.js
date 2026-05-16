import{h as E,ap as _e,q,r as $,_ as W,g as v,i as H,c as _,o as m,d as c,t as k,ad as Ce,a0 as ae,ae as be,m as se,aq as $e,w as Y,D as N,a as S,u as g,x as T,F as A,A as D,j as F,y as G,p as oe,k as Z,U as xe,N as R,J as we,s as Se,B as Le,ar as Pe,aa as ke,X as le,Y as X,$ as re}from"./BL6O4IjF.js";import{S as K}from"./n_eiQhs4.js";import{S as Q}from"./D0szDOTE.js";import{A as ne}from"./u-TollBj.js";import{N as Be,L as Te}from"./BVxzag9G.js";import{F as Ae}from"./NIufRzW5.js";const Ee=e=>{const t=e.container,d=e.scrollbar,o=e.thumb,l=e.onScrollEnd;let f=$(!1),p=$(0),r=$(0),n=$(null);const s=()=>{const u=t.value,w=d.value,x=o.value;if(!u||!w||!x)return;const M=u.querySelector(".inner");if(!M)return;const B=u.clientWidth,J=M.clientWidth;if(!B||!J||B>=J){w.style.display="none",x.style.width="0px",x.style.left="0px";return}w.style.display="flex";const I=u.scrollWidth,V=w.clientWidth;if(!I||!V)return;const O=B/I*V;x.style.width=`${O}px`;const me=u.scrollLeft,U=I-B,he=V-O,ve=U>0?me/U*he:0;x.style.left=`${ve}px`},y=()=>{s(),l&&(clearTimeout(n.value),n.value=setTimeout(()=>{l()},300))},a=u=>{var w,x;return(w=u==null?void 0:u.touches)!=null&&w.length?u.touches[0].pageX:(x=u==null?void 0:u.changedTouches)!=null&&x.length?u.changedTouches[0].pageX:u.pageX},i=u=>{f.value=!0,p.value=a(u)-o.value.offsetLeft,r.value=t.value.scrollLeft,document.body.style.userSelect="none"},h=()=>{f.value=!1,document.body.style.userSelect=""},b=u=>{if(!f.value)return;u.cancelable&&u.preventDefault();const w=a(u)-d.value.offsetLeft,x=o.value.clientWidth,M=t.value.scrollWidth-t.value.clientWidth,B=(w-x/2)/(d.value.clientWidth-x);t.value.scrollLeft=B*M},L=u=>{i(u)},C=()=>{h()},P=u=>{b(u)},j=u=>{const w=d.value,x=o.value,M=w.clientWidth-x.clientWidth,B=u.pageX-w.offsetLeft-x.clientWidth/2,J=Math.min(Math.max(B,0),M),I=t.value.scrollWidth-t.value.clientWidth,V=J/M;t.value.scrollTo({left:V*I,behavior:"smooth"})};return E(()=>{const u=_e();!t.value||!o.value||!d.value||(t.value.addEventListener("scroll",y),o.value.addEventListener("mousedown",i),o.value.addEventListener("touchstart",L,{passive:!1}),document.addEventListener("mouseup",h),document.addEventListener("mousemove",b),document.addEventListener("touchend",C),document.addEventListener("touchcancel",C),document.addEventListener("touchmove",P,{passive:!1}),u.loader.ready.then(()=>s()))}),q(()=>{t.value&&t.value.removeEventListener("scroll",y),o.value&&o.value.removeEventListener("mousedown",i),o.value&&o.value.removeEventListener("touchstart",L),document.removeEventListener("mouseup",h),document.removeEventListener("mousemove",b),document.removeEventListener("touchend",C),document.removeEventListener("touchcancel",C),document.removeEventListener("touchmove",P)}),{handleScrollbarClick:j}},je={class:"g-row"},Me={class:"xxl-14 xs-24 g-col"},qe={class:"-body-smaller-medium label"},We={class:"-title-4-medium title"},Re={__name:"Header",props:{upperTitle:{type:[Boolean,String],default:!1},title:{type:[Boolean,String],default:!1}},setup(e){v.registerPlugin(K);const t=$(null),d=H("pageContext");let o,l,f;const p=()=>{if(!t.value)return;const n=t.value.querySelector(".title");l=new K(n,{type:"lines, words",linesClass:"line",wordsClass:"word",autoSplit:!0}),f=l.lines,v.set(n,{opacity:1}),v.set(f,{yPercent:-100,opacity:0});const s=t.value.querySelector(".label");v.set(s,{yPercent:-100,opacity:0}),o=v.timeline({paused:!0}),o.to(s,{yPercent:0,opacity:1,duration:1,ease:"circ.out"},"<").to(f,{opacity:1,yPercent:0,opacity:1,stagger:.1,duration:.7,ease:"circ.out"},"-=0.8")},r=()=>{t.value&&o.play()};return E(()=>{d.$page.loader.loaded.then(()=>p()),d.$page.loader.ready.then(()=>r())}),q(()=>{o&&o.kill()}),(n,s)=>(m(),_("header",{ref_key:"el",ref:t,"data-component":"journal-header"},[c("div",je,[c("div",Me,[c("h2",qe,k(e.upperTitle),1),c("h1",We,k(e.title),1)])])],512))}},Fe=W(Re,[["__scopeId","data-v-450d4f04"]]);v.registerPlugin(N);const z=()=>{const e=Ce(),{locale:t}=ae(),d=be(),o=se(),l=a=>a.split("?")[0].split("/").filter(Boolean),f=a=>{const i=l(a),h=i[0]===t.value?1:0;return i[h]||""};f(e.path);const p=()=>`/${f(e.path)}/`,r=$e("journalFilter",()=>({category:{name:"All",slug:"all"}})),n=$([]),s=a=>!a||a.slug==="all"?n.value:n.value.filter(i=>i.presentation.category&&i.presentation.category.slug===a.slug),y=a=>{r.value.category=a};return Y(()=>r.value.category&&r.value.category.slug,a=>{if(!a)return;const i=p(),h=a==="all"?i:`${i}${a}/`,b=d(h);e.path!==b&&window.history.replaceState({},"",b),o.emit("scroller-reset"),setTimeout(()=>{N.refresh()},100)}),Y(()=>r.value.category,a=>{console.log("Journal filter changed to:",a)}),{journalFilter:r,availableArticles:n,filteredArticles:s,setCategory:y}},Ne={class:"categories-wrapper"},He={__name:"CategorySelector",props:{categories:{type:[Boolean,Array],default:!1}},setup(e){const{journalFilter:t,setCategory:d}=z(),o=T(()=>t.value.category),l=$(null),f=H("pageContext");let p,r,n=!1;const s=()=>{if(!l.value)return;const a=l.value.querySelector(".categories-wrapper").children;r&&r.kill(),r=v.matchMedia();const i=G.xs,h=G.xs+1;r.add({isMobile:`(max-width: ${i}px)`,isDesktop:`(min-width: ${h}px)`},b=>{const{isMobile:L}=b.conditions;return v.set(a,{clearProps:"xPercent,yPercent,opacity"}),p=v.timeline({paused:!0}),L?(v.set(a,{xPercent:-20,opacity:0}),p.to(a,{xPercent:0,opacity:1,delay:.3,stagger:.05,duration:1,ease:"circ.out"},"<")):(v.set(a,{yPercent:-100,opacity:0}),p.to(a,{yPercent:0,opacity:1,delay:.3,stagger:.05,duration:1,ease:"circ.out"},"<")),n&&p.play(),()=>{p&&p.kill()}})},y=()=>{l.value&&(n=!0,p&&p.play())};return E(()=>{f.$page.loader.loaded.then(()=>s()),f.$page.loader.ready.then(()=>y())}),q(()=>{p&&p.kill(),r&&r.kill()}),(a,i)=>(m(),_("div",{ref_key:"el",ref:l,"data-component":"category-selector"},[c("div",Ne,[S(g(Q),{class:"button",label:"All",active:o.value.slug==="all",onClick:i[0]||(i[0]=h=>g(d)({name:"All",slug:"all"}))},null,8,["active"]),(m(!0),_(A,null,D(e.categories,(h,b)=>(m(),F(g(Q),{class:"button",key:b,label:h.name,active:o.value.slug===h.slug,onClick:L=>g(d)(h)},null,8,["label","active","onClick"]))),128))])],512))}},Ie=W(He,[["__scopeId","data-v-ef4aacb2"]]),Ve={class:"g-row"},De={class:"g-col xxl-24"},Xe={key:0,class:"-body-smaller-medium label"},Je={key:1,class:"category-title"},Ze={class:"-title-4-medium"},ze={class:"inner"},Oe={__name:"ArticlesSet",props:{highlighted:{type:[Boolean,String],default:"left"},type:{type:[Boolean,String],default:!1},category:{type:[Boolean,Object],default:!1},posts:{type:[Boolean,Array],default:!1}},setup(e){v.registerPlugin(N);const t=oe(),d=e,{setCategory:o}=z(),l=()=>{d.category&&o(d.category)},f=T(()=>{if(!Array.isArray(d.posts))return[];const C={bsm:["large","small","medium"],msb:["medium","small","large"],sbm:["small","large","medium"]},P=d.type==="latest"?C.bsm:C[d.highlighted]||C.bsm;return d.posts.map((j,u)=>P[u]??"small")}),p=$(null),r=$(null),n=$(null),{handleScrollbarClick:s}=Ee({container:p,scrollbar:r,thumb:n}),y=$(null);let a,i;const h=()=>{if(!y.value)return;let C;d.type==="latest"&&(C=y.value.querySelector(".label")),d.type==="latest-category"&&(C=y.value.querySelector(".category-title").children),v.set(C,{yPercent:100,opacity:0});const P=y.value.querySelector(".cards-wrapper .inner").children;v.set(P,{yPercent:100,opacity:0}),a=v.timeline({paused:!0}),d.type!=="latest"&&(i=N.create({trigger:y.value,start:"top 70%",end:"bottom 70%",once:!0,onEnter:()=>{a.play(0)}})),a.to(P,{yPercent:0,opacity:1,duration:1,ease:"circ.out"},"<").to(C,{yPercent:0,opacity:1,duration:1,ease:"circ.out"},"-=0.5")},b=()=>{y.value&&d.type==="latest"&&a.play(0)},L=H("pageContext");return E(()=>{L.$page.loader.loaded.then(()=>h()),L.$page.loader.ready.then(()=>b())}),q(()=>{i&&i.kill(),a&&a.kill()}),(C,P)=>(m(),_("section",{ref_key:"el",ref:y,"data-component":"articles-set"},[c("div",Ve,[c("div",De,[e.type==="latest"?(m(),_("p",Xe,k(g(t)("latestArticles","NEEDS TRANSLATION"))+" ↓",1)):Z("",!0),e.type==="latest-category"?(m(),_("div",Je,[c("h4",Ze,k(e.category.name),1),S(g(xe),{class:"view-more-btn",label:g(t)("viewAll","NEEDS TRANSLATION"),size:"medium",icon:"arrow-right",type:"internal",clickFunc:l},null,8,["label"])])):Z("",!0),c("div",{ref_key:"scrollContainerRef",ref:p,class:"cards-wrapper"},[c("div",ze,[(m(!0),_(A,null,D(e.posts,(j,u)=>(m(),F(g(ne),R({key:u},{ref_for:!0},{...j.presentation,...j.metadata},{class:g(f)[u]}),null,16,["class"]))),128))])],512),c("div",{ref_key:"scrollbarRef",ref:r,class:"custom-scrollbar",onMousedown:P[0]||(P[0]=(...j)=>g(s)&&g(s)(...j))},[c("div",{ref_key:"scrollThumbRef",ref:n,class:"scroll-thumb"},null,512)],544)])])],512))}},ee=W(Oe,[["__scopeId","data-v-94be86ab"]]),Ue={class:"g-row"},Ye={class:"g-col xxl-24"},Ge={class:"cards-wrapper"},Ke={__name:"ArticlesWithPag",props:{posts:{type:[Boolean,Array],default:!1}},setup(e){v.registerPlugin(N);const t=e,d=T(()=>{if(!Array.isArray(t.posts))return[];const s=[];for(let y=0;y<t.posts.length*3;y++){const a=Math.floor(y/3),i=y%3;a%3===0&&i===1||a%3===1&&i===0||a%3===2&&i===2?s.push("large"):s.push("")}return s}),o=$(null);let l,f;const p=()=>{if(!o.value)return;const s=o.value.querySelector(".cards-wrapper").children;v.set(s,{yPercent:100,opacity:0}),l=v.timeline({paused:!0}),t.type!=="latest"&&(f=N.create({trigger:o.value,start:"top 70%",end:"bottom 70%",once:!0,onEnter:()=>{l.play(0)}})),l.to(s,{yPercent:0,opacity:1,duration:1,ease:"circ.out"},"<")},r=()=>{o.value&&t.type==="latest"&&l.play(0)},n=H("pageContext");return E(()=>{n.$page.loader.loaded.then(()=>p()),n.$page.loader.ready.then(()=>r())}),q(()=>{f&&f.kill(),l&&l.kill()}),(s,y)=>(m(),_("section",{ref_key:"el",ref:o,"data-component":"articles-pagination"},[c("div",Ue,[c("div",Ye,[c("div",Ge,[(m(!0),_(A,null,D(e.posts,(a,i)=>(m(),F(g(ne),R({key:i},{ref_for:!0},{...a.presentation,...a.metadata},{class:[g(d)[i]]}),null,16,["class"]))),128))])])])],512))}},te=W(Ke,[["__scopeId","data-v-decae1fc"]]),Qe={class:"g-row"},et={class:"g-col xxl-12 xs-24"},tt={class:"-body-smaller-medium label"},at={class:"case-studies-wrapper"},st={class:"media-wrapper"},ot={class:"g-row"},lt={class:"-title-2-medium title"},rt={class:"category-description"},nt={class:"-body-small-medium category"},ct={class:"description"},it={class:"-title-8-regular"},ut={__name:"FeaturedCaseStudies",props:{upperTitle:{type:[Boolean,String],default:!1},featuredCaseStudies:{type:[Boolean,Array],default:!1}},setup(e){const t=oe(),d=$(null);let o=[],l=null;const f=()=>{o=d.value.querySelectorAll(".case-study"),o.forEach((r,n)=>{const s=r.querySelectorAll(" .title, .category, .description p, .description .button, .line");n!==0&&(r.querySelector(".media-wrapper").style.opacity=0),s.forEach((y,a)=>{y.style.opacity=0})}),l=v.timeline({repeat:-1,repeatDelay:0,paused:!0}),o.forEach((r,n)=>{const s=r.querySelector(".media-wrapper"),y=r.querySelector(".title"),a=r.querySelector(".category"),i=r.querySelector(".description p"),h=r.querySelector(".description .button"),b=r.querySelector(".line"),L=r.querySelector(".line .progress"),C=`item${n}`;l.addLabel(C),n!==0&&l.fromTo([s],{opacity:0,scale:1.1},{opacity:1,scale:1,duration:1,ease:"expo.out"}),l.fromTo([y],{opacity:0,yPercent:-50},{opacity:1,yPercent:0,duration:1,ease:"expo.out"},"<"),l.fromTo([a,i,h],{opacity:0,yPercent:40},{opacity:1,yPercent:0,delay:-.8,duration:.8,stagger:.12,ease:"expo.out"}),l.to(b,{opacity:1,delay:-.7,duration:.3,ease:"none"}),l.fromTo(L,{width:"0%"},{width:"100%",duration:7,ease:"none"},"<"),l.to(b,{opacity:0,duration:.3}),l.to([y],{opacity:0,yPercent:-50,delay:-.3,duration:1,ease:"expo.out"}),l.to([a,i,h],{opacity:0,yPercent:50,duration:1,ease:"expo.out"},"<"),n===o.length-1&&l.to([s],{opacity:0,scale:1.1,duration:1,ease:"expo.out"})})},p=()=>{l.play()};return H("pageContext"),q(()=>{}),E(()=>{f(),p()}),(r,n)=>(m(),_("section",{ref_key:"el",ref:d,"data-component":"featured-case-studies"},[c("div",Qe,[c("div",et,[c("p",tt,k(e.upperTitle),1)])]),c("div",at,[(m(!0),_(A,null,D([...e.featuredCaseStudies,...e.featuredCaseStudies],(s,y)=>(m(),_("div",{class:"case-study",key:y},[c("div",st,[S(g(Se),{media:s.presentation.mediaAsset},null,8,["media"])]),c("div",ot,[c("h4",lt,k(s.presentation.title),1),n[0]||(n[0]=c("span",{class:"line"},[c("span",{class:"progress"})],-1)),c("div",rt,[c("p",nt,k(s.presentation.category.name),1),c("div",ct,[c("p",it,k(s.presentation.description),1),S(g(Le),{to:{name:"journal-category-slug",params:{category:s.presentation.category.slug,slug:s.metadata.slug}},label:g(t)("learnMore","Saber mais"),theme:"light",icon:"arrow-right",iconPlacement:"front",class:"button"},null,8,["to","label"])])])])]))),128)),n[1]||(n[1]=we('<div class="navigation-buttons" data-v-02ab978f><svg width="93" height="44" viewBox="0 0 93 44" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-02ab978f><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 5.37258 5.37258 0 12 0H32C37.7762 0 42.5993 4.08117 43.7429 9.51729C44.0271 10.8684 45.1193 12 46.5 12C47.8807 12 48.9729 10.8684 49.2571 9.51729C50.4007 4.08117 55.2238 0 61 0H81C87.6274 0 93 5.37258 93 12V32C93 38.6274 87.6274 44 81 44H61C55.2238 44 50.4007 39.9188 49.2571 34.4827C48.9729 33.1316 47.8807 32 46.5 32C45.1193 32 44.0271 33.1316 43.7429 34.4827C42.5993 39.9188 37.7762 44 32 44H12C5.37258 44 0 38.6274 0 32V12Z" fill="white" data-v-02ab978f></path><path fill-rule="evenodd" clip-rule="evenodd" d="M72.0991 23.331C72.8339 22.5955 72.8338 21.4036 72.0988 20.6681C72.0987 20.668 72.0985 20.6679 72.0984 20.6677L68.702 17.2714C68.5207 17.09 68.5207 16.7959 68.702 16.6146L69.1059 16.2107C69.2873 16.0293 69.5813 16.0293 69.7627 16.2107L73.159 19.607L75.0214 21.4694L75.2233 21.6713C75.4047 21.8527 75.4047 22.1468 75.2233 22.3281L75.0214 22.5301L73.159 24.3924L69.7627 27.7888C69.5813 27.9701 69.2873 27.9701 69.1059 27.7888L68.702 27.3849C68.5207 27.2035 68.5207 26.9095 68.702 26.7281L72.0984 23.3318C72.0986 23.3315 72.0989 23.3313 72.0991 23.331Z" fill="#241F21" data-v-02ab978f></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.3319 24.393L22.7283 27.7893C22.9096 27.9707 23.2037 27.9707 23.3851 27.7893L23.7889 27.3854C23.9703 27.2041 23.9703 26.91 23.7889 26.7286L20.3926 23.3323C20.3923 23.3321 20.3921 23.3318 20.3919 23.3316C19.6572 22.5961 19.6572 21.4044 20.3919 20.6689C20.3921 20.6687 20.3924 20.6684 20.3926 20.6682L23.7889 17.2719C23.9703 17.0905 23.9703 16.7965 23.7889 16.6151L23.3851 16.2112C23.2037 16.0299 22.9096 16.0299 22.7283 16.2112L19.3319 19.6076L17.2676 21.6719C17.0863 21.8532 17.0863 22.1473 17.2676 22.3287L19.3311 24.3922C19.3314 24.3924 19.3317 24.3927 19.3319 24.393Z" fill="#241F21" data-v-02ab978f></path></svg></div>',1))])],512))}},dt=W(ut,[["__scopeId","data-v-02ab978f"]]),pt={class:"g-row centered"},yt={class:"g-col xxl-10 xs-24"},gt={class:"title-wrapper"},ft={class:"-title-3-medium title"},mt={__name:"Newsletter",props:{title:{type:[Boolean,String],default:!1}},setup(e){const d=Pe().public.sharedContentPayload,o=$(d);H("pageContext");const l=$(null),{locale:f}=ae(),p=T(()=>({...(o.value.find(s=>s.lang===f.value)||{}).newsletter||{newsletter:!1}}));return q(()=>{}),E(()=>{}),(r,n)=>(m(),_("section",{ref_key:"el",ref:l,"data-component":"newsletter"},[c("div",pt,[c("div",yt,[c("div",gt,[n[0]||(n[0]=c("svg",{width:"29",height:"43",viewBox:"0 0 29 43",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[c("path",{d:"M28.9968 0H0V43H6.94503V16.0516C6.94503 14.1452 9.21055 13.1937 10.5337 14.539L21.6968 25.8886L26.1084 21.4032L15.0357 10.1422C13.7126 8.79687 14.6485 6.49348 16.5235 6.49348H29V0H28.9968Z",fill:"#BEB9B0"})],-1)),c("h3",ft,k(e.title),1),S(g(Be),{theme:"journal",class:"newsletter",privacy:{privacyText:g(p).privacyText,privacyPage:g(p).privacyPage}},null,8,["privacy"])])])])],512))}},ht=W(mt,[["__scopeId","data-v-3bd7aedc"]]),vt={"data-component":"journal-page",class:"inner-page"},_t={__name:"Journal",props:{metadata:{type:[Boolean,Object],default:!1},sections:{type:[Boolean,Array],default:!1},latestPosts:{type:[Boolean,Array],default:!1},latestByCategory:{type:[Boolean,Array],default:!1},postsByCategory:{type:[Boolean,Array],default:!1},categories:{type:[Boolean,Array],default:!1},posts:{type:[Boolean,Array],default:!1},isCategoryPage:{type:[Boolean,String],default:!1}},setup(e){const t=e,d=se();ke(()=>{if(typeof t.isCategoryPage=="string"){const s=t.isCategoryPage,y=t.categories.find(a=>a.slug===s)||{};f.value.category=y}}),E(()=>{d.emit("change-menu-theme","main")});const o=["msb","bsm","sbm","msb"],l=T(()=>{if(t.latestByCategory)return t.latestByCategory.filter(s=>s.slug!=="case-studies")}),{journalFilter:f}=z(),p=T(()=>f.value.category),r=T(()=>{const s=t.postsByCategory.find(y=>y.slug===p.value.slug);return s?s.posts:[]}),n=T(()=>t.isCategoryPage&&p.value.slug===t.isCategoryPage);return(s,y)=>(m(),_("div",vt,[S(g(Fe),R(e.sections[0],{"data-section-intersect":"dark"}),null,16),c("main",null,[S(g(Ie),{categories:e.categories,"data-section-intersect":"dark"},null,8,["categories"]),n.value?(m(),F(g(te),{key:1,type:"category",category:p.value,posts:e.posts,"data-section-intersect":"dark"},null,8,["category","posts"])):(m(),_(A,{key:0},[p.value.slug==="all"?(m(),_(A,{key:0},[S(g(ee),{type:"latest",highlighted:"bsm",posts:e.latestPosts,"data-section-intersect":"dark"},null,8,["posts"]),S(g(ht),R(e.sections[1],{"data-section-intersect":"dark"}),null,16),S(g(dt),R(e.sections[2],{"data-section-intersect":"light"}),null,16),(m(!0),_(A,null,D(l.value,(a,i)=>(m(),_(A,null,[a.slug!=="case-studies"&&a.posts.length>=1?(m(),F(g(ee),{type:"latest-category",category:a,key:i,highlighted:o[i%o.length],posts:a.posts,"data-section-intersect":"dark"},null,8,["category","highlighted","posts"])):Z("",!0)],64))),256))],64)):(m(),F(g(te),{key:1,type:"category",category:p.value,posts:r.value,"data-section-intersect":"dark"},null,8,["category","posts"]))],64)),S(g(Te),R(e.sections[3],{"data-section-intersect":"dark"}),null,16)]),S(g(Ae))]))}},Lt=W(_t,[["__scopeId","data-v-28271b9c"]]);function ce(e="pt"){return`
		*[ _type == "journalCategory" && lang == '${e}' && !(_id in path("drafts.**"))]{
			name,
			"slug": slug.current
		}
	`}function ie(e="pt"){return`
		*[ _type == "journalCategory" && lang == '${e}' && !(_id in path("drafts.**"))]{
			name,
			"slug": slug.current,
			"posts": *[ _type == "page.article" && presentation.category._ref == ^._id && lang == '${e}' && !(_id in path("drafts.**"))] | order(presentation.date desc)[0..2] {
				metadata {
					"slug": slug.current
				},
				presentation {
					title,
					description,
					date,
					"category": category->{ 
						name,
						"slug": slug.current
					},
					${X()}
				}
			}
		}
	`}function ue(e="pt"){return`
		*[ _type == "journalCategory" && lang == '${e}' && !(_id in path("drafts.**"))]{
			name,
			"slug": slug.current,
			"posts": *[ _type == "page.article" && presentation.category._ref == ^._id && lang == '${e}' && !(_id in path("drafts.**"))] | order(presentation.date desc) {
				metadata {
					"slug": slug.current
				},
				presentation {
					title,
					description,
					date,
					"category": category->{ 
						name,
						"slug": slug.current
					},
					${X()}
				}
			}
		}
	`}function de(e="pt"){return`
		*[ _type == "page.article" && lang == '${e}' && !(_id in path("drafts.**"))] | order(presentation.date desc)[0..2] {
			metadata {
				"slug": slug.current
			},
			presentation {
				title,
				description,
				date,
				"category": category->{ 
					name,
					"slug": slug.current
				},
				${X()}
			}
		}
	`}function Pt(e,t="pt"){return re`*[_type == 'journalCategory' && slug.current == "${e}" && lang == '${t}' && !(_id in path("drafts.**"))][0] {
	"metadata": *[_type == 'page.journal' && lang == '${t}' && !(_id in path("drafts.**"))][0] {
		...metadata{...${le()}}
	},
	"sections": *[_type == 'page.journal' && lang == '${t}' && !(_id in path("drafts.**"))][0] { 
		sections[] {
			_type,
			${pe},
			${ye},
			${fe},
			${ge},
		},
	}.sections,

		
	"posts": *[ _type == "page.article" && presentation.category._ref == ^._id && lang == '${t}' && !(_id in path("drafts.**"))] | order(presentation.date desc) {
		metadata {
			"slug": slug.current
		},
		presentation {
			title,
			description,
			date,
			"category": category->{ 
				name,
				"slug": slug.current
			},
			${X()}
		}
	},

	"latestPosts": ${de(t)},
	"latestByCategory": ${ie(t)},
	"postsByCategory": ${ue(t)},
	"categories": ${ce(t)},	
  }
`}const pe=`
	_type == "journalHeader" => {
		upperTitle,
     	title,
    }
`,ye=`
	_type == "featuredCaseStudy" => {
     	upperTitle,
		featuredCaseStudies[]->{
			metadata{
				"slug": slug.current
			},
			presentation{
				title,
				description,
				${X()},
				"category": category-> {
					name, 
					"slug": slug.current
				}
			}
		}
    }
`,ge=`
	_type == "newsletter" => {
     	title,
    }
`,fe=`
	_type == "lowerTagline" => {
     	title,
    }
`;function kt(e="pt"){return re`
	*[_type == 'page.journal' && lang == '${e}' && !(_id in path("drafts.**"))][0] {
		_type,
		"metadata": metadata{...${le()}},
		"sections": sections[] {
			_type,
			${pe},
			${ye},
			${fe},
			${ge},
		},
		"latestPosts": ${de(e)},
		"latestByCategory": ${ie(e)},
		"postsByCategory": ${ue(e)},
		"categories": ${ce(e)},
	}
	`}export{Lt as J,Pt as c,kt as j};
