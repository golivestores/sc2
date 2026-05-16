import{_ as J,p as de,c as y,o as l,d as o,k as x,u as a,x as A,j as B,V as Ae,I as Te,t as q,e as Q,q as ee,h as X,s as xe,ay as Pe,a6 as Be,B as qe,r as F,g as z,i as ce,az as ie,w as re,E as ze,Q as ae,F as M,A as N,b as le,af as Ie,v as ne,aA as T,D as oe,T as Fe,a as U,N as se,a9 as ue,P as Ee,m as Re,aB as Me,C as He,K as We,L as Oe,y as je,X as Ce,$ as $e,ab as R,Y as ve,Z as De}from"./BL6O4IjF.js";import{S as he}from"./n_eiQhs4.js";import{S as we}from"./D0szDOTE.js";import{P as _e}from"./BF4WLTFl.js";import{F as Ve}from"./NIufRzW5.js";const Ne={class:"image-wrapper"},Ze={key:0,width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},Ke={class:"image-clipper"},Ye={class:"text-wrapper"},Ue={key:1,class:"label"},Qe={key:2,width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},Xe={key:0,class:"temp-message"},Je={class:"message"},Ge={class:"-caption-medium"},et={__name:"ProductTag",props:{hasLink:{type:Boolean,default:!1},collection:{type:Object,default:null},size:{type:String,default:"full"},displayLabel:{type:Boolean,default:!0}},setup(r){const n=r,d=de(),f=A(()=>n.size==="full"),v=A(()=>n.size==="full-small"),h=A(()=>{var C,i;return!!((i=(C=n.collection)==null?void 0:C.icon)!=null&&i.url)}),_=A(()=>{var C,i;return!!((i=(C=n.collection)==null?void 0:C.featuredImage)!=null&&i.url)}),S=A(()=>{var C;return n.displayLabel&&!!((C=n.collection)!=null&&C.name)});function m(C){return String(C).trim().toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9_-]/g,"")}const $=A(()=>{var i;const C=(i=n.collection)==null?void 0:i.name;return C?`-${m(C)}`:null}),b=A(()=>[$.value,n.hasLink?"has-link":"no-link"].filter(Boolean)),L=A(()=>["inner",`-${n.size}`]);return(C,i)=>(l(),y("div",{"data-component":"product-tag",class:Q(a(b))},[o("div",{class:Q(a(L))},[i[2]||(i[2]=o("span",{class:"border"},null,-1)),o("div",Ne,[a(f)?(l(),y("svg",Ze,[...i[0]||(i[0]=[o("path",{d:"M10 18C14.4182 18 18 14.4182 18 10C18 5.58172 14.4182 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4182 5.58172 18 10 18Z",fill:"#241F21"},null,-1),o("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.1207 8.02566L8.86034 13.0355L6 10.3114L7.03448 9.22517L8.17069 10.3073C8.5569 10.6751 9.16379 10.6751 9.55 10.3073L13.0862 6.93945L14.1207 8.02566Z",fill:"white"},null,-1)])])):x("",!0),o("div",Ke,[a(_)?(l(),B(a(Ae),{key:0,asset:r.collection.featuredImage,class:"featured-image",sizes:"xsmall:60px medium:160px xlarge:200px"},null,8,["asset"])):x("",!0)])]),o("div",Ye,[a(h)?(l(),B(a(Te),{key:0,class:"icon",slug:r.collection.name.toLowerCase(),size:"medium"},null,8,["slug"])):x("",!0),a(S)?(l(),y("p",Ue,q(r.collection.name),1)):x("",!0),a(v)?(l(),y("svg",Qe,[...i[1]||(i[1]=[o("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M18 10C18 14.4182 14.4182 18 10 18C5.58172 18 2 14.4182 2 10C2 5.58172 5.58172 2 10 2C14.4182 2 18 5.58172 18 10ZM8.86034 13.0355L14.1207 8.02566L13.0862 6.93945L9.55 10.3073C9.16379 10.6751 8.5569 10.6751 8.17069 10.3073L7.03448 9.22517L6 10.3114L8.86034 13.0355Z",fill:"#241F21"},null,-1)])])):x("",!0)])],2),a(f)&&r.hasLink?(l(),y("div",Xe,[o("div",Je,[i[3]||(i[3]=o("svg",{width:"8",height:"9",viewBox:"0 0 8 9",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},[o("path",{d:"M6.90384 7.02585L7.98914 5.94055L7.3883 1.10091L2.55855 0.509971L1.47326 1.59527L4.54627 1.9448C4.82741 1.98021 4.98741 2.03782 5.09622 2.14663C5.2347 2.28512 5.22134 2.47653 5.04728 2.65059L0.204405 7.49347L1.00564 8.2947L5.84852 3.45182C6.02258 3.27776 6.2041 3.25451 6.35247 3.40289C6.45139 3.50181 6.50901 3.66181 6.54441 3.94294L6.90384 7.02585Z",fill:"#241F21"})],-1)),o("p",Ge,q(a(d)("onOldSite")),1)])])):x("",!0)],2))}},G=J(et,[["__scopeId","data-v-410be210"]]),tt=["data-source"],at={class:"media"},ot={key:1,src:Pe,alt:""},st={class:"info"},lt={class:"top-row"},rt={key:0,class:"-body-big-medium"},nt={key:1,class:"-body-big-medium"},ct={class:"bottom-row"},it={class:"-title-6-medium"},ut={__name:"CaseStudyCard",props:{caseStudy:{type:[Boolean,Object],default:!1},source:{type:String,default:"auto"}},setup(r){const n=r,d=F(null),f=A(()=>{var m,$,b;if(n.source&&n.source!=="auto")return n.source;const _=(m=n.caseStudy)==null?void 0:m.source;if(_==="catalogue"||_==="caseStudy")return _;const S=($=n.caseStudy)==null?void 0:$._id;return typeof S=="string"&&S.startsWith("catalogue-")||(b=n.caseStudy)!=null&&b.file?"catalogue":"caseStudy"}),v=A(()=>f.value==="catalogue"?"download":"arrow-right"),h=A(()=>{var S,m,$,b,L;const _=((S=n.caseStudy)==null?void 0:S._id)||((b=($=(m=n.caseStudy)==null?void 0:m.metadata)==null?void 0:$.slug)==null?void 0:b.current)||((L=n.caseStudy)==null?void 0:L.file)||"";return`${f.value}-${_}`});return ee(()=>{}),X(()=>{}),(_,S)=>{var m,$,b,L;return l(),y("div",{ref_key:"el",ref:d,"data-component":"case-study-card","data-source":a(f)},[o("div",at,[S[0]||(S[0]=o("span",{class:"bg"},null,-1)),(m=r.caseStudy.presentation)!=null&&m.mediaAsset?(l(),B(a(xe),{key:0,media:r.caseStudy.presentation.mediaAsset},null,8,["media"])):(l(),y("img",ot))]),o("div",st,[o("div",lt,[(b=($=r.caseStudy.presentation)==null?void 0:$.category)!=null&&b.name?(l(),y("p",rt,q(r.caseStudy.presentation.category.name),1)):a(f)==="catalogue"?(l(),y("p",nt,"PDF")):x("",!0),r.caseStudy.collection?(l(),B(a(Be),{key:2,collection:r.caseStudy.collection,type:"product",size:"medium"},null,8,["collection"])):x("",!0)]),o("div",ct,[o("p",it,q(((L=r.caseStudy.presentation)==null?void 0:L.title)||r.caseStudy.title),1),(l(),B(a(qe),{key:a(h),theme:"light",icon:a(v)},null,8,["icon"]))])])],8,tt)}}},dt=J(ut,[["__scopeId","data-v-b4754af7"]]),pt={class:"g-row"},yt={class:"xxl-14 sm-22 g-col"},ft={class:"-title-4-medium title"},gt={__name:"Header",props:{title:{type:[Boolean,String],default:!1}},setup(r){z.registerPlugin(he);const n=F(null);let d,f,v;const h=()=>{if(!n.value)return;const m=n.value.querySelector(".title");f=new he(m,{type:"lines, words",linesClass:"line",wordsClass:"word",autoSplit:!0}),v=f.lines,z.set(m,{opacity:1}),z.set(v,{yPercent:-100,opacity:0}),d=z.timeline({paused:!0}),d.to(v,{opacity:1,yPercent:0,opacity:1,stagger:.05,duration:.8,ease:"circ.out"})},_=()=>{n.value&&d.play()},S=ce("pageContext");return ee(()=>{}),X(()=>{S.$page.loader.loaded.then(()=>h()),S.$page.loader.ready.then(()=>_())}),(m,$)=>(l(),y("header",{ref_key:"el",ref:n,"data-component":"products-header"},[o("div",pt,[o("div",yt,[o("h1",ft,q(r.title),1)])])],512))}},mt=J(gt,[["__scopeId","data-v-dd80f6ce"]]),vt={class:"g-row main-categories"},ht={class:"xxl-24 g-col"},_t={class:"titles-wrapper"},Ct={class:"-body-smaller-medium label"},$t={class:"-body-smaller-medium label"},wt={class:"tags-wrapper"},St={class:"g-row sub-categories"},bt={class:"xxl-8 g-col product-count"},kt={class:"-body-smaller-medium label"},Lt={key:0,class:"xxl-16 g-col sub-wrapper"},At={__name:"CategorySelector",props:{products:{type:[Boolean,Array],default:!1},collections:{type:[Boolean,Array],default:!1},productTypes:{type:[Boolean,Array],default:!1}},setup(r){const n=r,d=F(null),f=de(),v=ce("pageContext"),{availableProducts:h,productFilter:_,filteredProducts:S,productTypeHasResults:m,setActiveCategory:$,setActiveSubCollection:b}=ie(n.products),L=A(()=>{const w=h.value.length,I=S.value.length;return`${f("showing")} ${I} ${f("of")} ${w} ${f("results")} ↓`}),C=A(()=>{if(_.value.collections.length>0){const w=_.value.collections[0];if(Array.isArray(n.collections)){const I=n.collections.find(Z=>Z.name===w);return I&&I.subCategories?I.subCategories:[]}}return[]}),i=A(()=>JSON.stringify(C.value.map(w=>w.name)));let H,P;const W=()=>{d.value&&(z.set(d.value.querySelector(".titles-wrapper").children,{yPercent:-100,opacity:0}),z.set(d.value.querySelector(".tags-wrapper").children,{yPercent:-50,opacity:0}),z.set(d.value.querySelector(".product-count").children,{yPercent:-100,opacity:0}),H=z.timeline({paused:!0}),H.to(d.value.querySelector(".tags-wrapper").children,{yPercent:0,opacity:1,stagger:.02,duration:.8,ease:"circ.out"}).to(d.value.querySelector(".titles-wrapper").children,{yPercent:0,opacity:1,duration:1.2,ease:"power4.out"},"-=0.4").to(d.value.querySelector(".product-count").children,{yPercent:0,opacity:1,duration:.8,ease:"power4.out"},"-=0.8"))},D=async()=>{if(!d.value||C.value.length===0)return;await ne();const w=d.value.querySelector(".sub-wrapper");!w||w.children.length===0||(P&&P.kill(),z.set(w.children,{yPercent:35,opacity:0}),P=z.timeline(),P.to(w.children,{yPercent:0,opacity:1,stagger:.04,duration:.6,ease:"power3.out",overwrite:"auto"}))},V=()=>{d.value&&H.play()};return re(i,()=>{var w,I;if((I=(w=v==null?void 0:v.$page)==null?void 0:w.loader)!=null&&I.ready){v.$page.loader.ready.then(()=>D());return}D()},{immediate:!0,flush:"post"}),ee(()=>{}),X(()=>{Array.from(d.value.querySelectorAll(".tags-wrapper img")).forEach(w=>{v.$page.loader.deferLoad(ze(w))}),v.$page.loader.loaded.then(()=>W()),v.$page.loader.ready.then(()=>V())}),(w,I)=>{const Z=Ie;return l(),y("div",{ref_key:"el",ref:d,"data-component":"category-selector"},[o("div",vt,[o("div",ht,[o("div",_t,[o("p",Ct,[o("span",null,q(a(f)("filter")),1),ae(" "+q(a(f)("byCollections")),1)]),o("p",$t,[o("span",null,q(a(f)("filter")),1),ae(" "+q(a(f)("byProducts")),1)])]),o("div",wt,[(l(!0),y(M,null,N(r.collections,(p,g)=>(l(),y(M,null,[p.oldCatalogue?x("",!0):(l(),B(a(G),{key:g,collection:p,size:"full",active:a(_).collections[0]===p.name,onClick:e=>a($)(p.name,"collections")},null,8,["collection","active","onClick"])),p.oldCatalogue?(l(),B(Z,{to:p.oldCatalogue,key:g,target:"_blank"},{default:le(()=>[(l(),B(a(G),{key:g,collection:p,size:"full","has-link":!0},null,8,["collection"]))]),_:2},1032,["to"])):x("",!0)],64))),256)),(l(!0),y(M,null,N(r.productTypes,(p,g)=>(l(),B(a(G),{key:g,collection:p,size:"full",active:a(_).productTypes[0]===p.name,class:Q({"-disabled":!a(m)(p.name)}),onClick:e=>a($)(p.name,"productTypes")},null,8,["collection","active","class","onClick"]))),128))])])]),o("div",St,[o("div",bt,[o("p",kt,q(L.value),1)]),C.value.length>0?(l(),y("div",Lt,[(l(!0),y(M,null,N(C.value,(p,g)=>(l(),B(a(we),{key:g,label:p.name,active:a(_).subCollections.includes(p.name),onClick:e=>a(b)(p.name)},null,8,["label","active","onClick"]))),128))])):x("",!0)])],512)}}},Tt=J(At,[["__scopeId","data-v-42ca5119"]]),xt={class:"main"},Pt={class:"collection-filter"},Bt={class:"-body-smaller-medium"},qt={class:"tags-wrapper"},zt={class:"product-filter"},It={class:"-body-smaller-medium"},Ft={class:"tags-wrapper"},Et={key:0,class:"dividor"},Rt={key:1,class:"sub"},Mt={class:"product-count"},Ht={class:"-body-smaller-medium"},Wt={class:"button-wrapper"},Ot={class:"-caption-semibold"},jt={key:0,class:"-caption-semibold category"},Dt={__name:"CategorySelectorFloat",props:{products:{type:[Boolean,Array],default:!1},collections:{type:[Boolean,Array],default:!1},productTypes:{type:[Boolean,Array],default:!1},enabled:{type:Boolean,default:!1}},setup(r){T.registerPlugin(oe);const n=r,d=F(null),f=de(),v=ce("$scroller",null),{productFilter:h,productTypeHasResults:_,setActiveCategory:S,setActiveSubCollection:m}=ie(n.products),$=async()=>{await ne(),requestAnimationFrame(()=>{var c,u,k;const p=document.querySelector('[data-component="product-list"]');if(!p)return;const g=((u=(c=v==null?void 0:v.value)==null?void 0:c.getScrollerInstance)==null?void 0:u.call(c).value)||null,t=(typeof(g==null?void 0:g.animatedScroll)=="number"?g.animatedScroll:window.scrollY||window.pageYOffset||0)+p.getBoundingClientRect().top-200,s=Math.max(0,Math.round(t));if((k=v==null?void 0:v.value)!=null&&k.scrollTo){v.value.scrollTo(s,1,!1),oe.refresh();return}window.scrollTo({top:s,behavior:"smooth"})})},b=(p,g)=>{var t,s;const e=(s=(t=h.value)==null?void 0:t[g])==null?void 0:s[0];S(p,g),e!==p&&$()},L=A(()=>{if(h.value.collections.length>0){const p=h.value.collections[0];if(Array.isArray(n.collections)){const g=n.collections.find(e=>e.name===p);return g&&g.subCategories?g.subCategories:[]}}return[]}),C=A(()=>h.value.collections.length>0?h.value.collections[0]:h.value.productTypes.length>0?h.value.productTypes[0]:""),i=F(!1),H=F("body"),P=F(null),W=F(null),D=F(null),V=F(null),w=()=>{i.value&&(T.to(P.value,{duration:.5,y:50,opacity:0,ease:"power2.out",onStart:()=>{P.value.classList.remove("open")},onComplete:()=>{i.value=!1,T.set(d.value,{pointerEvents:"none"})}}),T.fromTo(W.value,{y:-50,opacity:0},{duration:.5,y:0,opacity:1,ease:"power2.out"}),T.fromTo(D.value,{scale:1,opacity:1},{duration:.5,scale:0,opacity:0,ease:"power2.out"}))},I=()=>{i.value?w():(i.value=!0,T.set(d.value,{pointerEvents:"all"}),T.fromTo(P.value,{y:50,opacity:0},{duration:.5,y:0,opacity:1,ease:"power2.out",onStart:()=>{P.value.classList.add("open"),T.set(P.value,{clearProps:"pointerEvents"})}}),T.fromTo(W.value,{y:0,opacity:1},{duration:.5,y:-50,opacity:0,ease:"power2.out"}),T.fromTo(D.value,{scale:0,opacity:0},{duration:.5,scale:1,opacity:1,ease:"power2.out"}))};re(()=>n.enabled,p=>{p?T.to(d.value,{duration:.5,y:0,opacity:1,ease:"power2.out",onStart:()=>{}}):(w(),T.to(d.value,{duration:.5,y:50,opacity:0,ease:"power2.out",onComplete:()=>{T.set(d.value,{pointerEvents:"none"})}}))}),re(()=>L.value.length,async(p,g)=>{const e=P.value;if(!e)return;const t=e.offsetHeight;if(await ne(),p>0&&V.value){const c=V.value.children;T.set(c,{opacity:0,y:8})}const s=e.offsetHeight;T.set(e,{height:t,overflow:"hidden"}),T.to(e,{height:s,duration:.5,ease:"power2.out",onComplete:()=>{if(T.set(e,{clearProps:"height,overflow"}),p>0&&V.value){const c=V.value.children;T.to(c,{opacity:1,y:0,duration:.35,stagger:.06,ease:"power2.out"})}}})});const Z=p=>{p.key==="Escape"&&i.value&&w()};return ee(()=>{window.removeEventListener("keydown",Z)}),X(()=>{{const p=document.querySelector('.inner-page[data-component="products-page"]');p&&(H.value=p)}T.set(d.value,{y:50,opacity:0}),!i.value&&P.value&&T.set(P.value,{opacity:0,y:50}),window.addEventListener("keydown",Z)}),(p,g)=>(l(),y("div",{ref_key:"el",ref:d,"data-component":"category-selector-float"},[(l(),B(Fe,{to:H.value},[o("span",{class:Q(["click-outside",{active:i.value}]),onClick:w},null,2)],8,["to"])),o("div",{ref_key:"categoriesWrapper",ref:P,class:"categories-wrapper"},[o("div",xt,[o("div",Pt,[o("p",Bt,[o("span",null,q(a(f)("filter")),1),ae(" "+q(a(f)("byCollections")),1)]),o("div",qt,[(l(!0),y(M,null,N(r.collections,(e,t)=>(l(),y(M,null,[e.oldCatalogue?x("",!0):(l(),B(a(G),{key:t,collection:e,size:"full-small",active:a(h).collections[0]===e.name,onClick:s=>b(e.name,"collections")},null,8,["collection","active","onClick"])),e.oldCatalogue?(l(),y("div",{class:"-disabled",key:t},[U(a(G),{collection:e,size:"full-small catalogue",oldWebsite:!0},null,8,["collection"])])):x("",!0)],64))),256))])]),o("div",zt,[o("p",It,[o("span",null,q(a(f)("filter")),1),ae(" "+q(a(f)("byProducts")),1)]),o("div",Ft,[(l(!0),y(M,null,N(r.productTypes,(e,t)=>(l(),B(a(G),{key:t,collection:e,size:"full-small",active:a(h).productTypes[0]===e.name,class:Q({"-disabled":!a(_)(e.name)}),onClick:s=>b(e.name,"productTypes")},null,8,["collection","active","class","onClick"]))),128))])])]),L.value.length>0?(l(),y("div",Et,[...g[0]||(g[0]=[o("span",{class:"line"},null,-1)])])):x("",!0),L.value.length>0?(l(),y("div",Rt,[o("div",Mt,[o("p",Ht,q(a(f)("subFilter"))+" Urban",1)]),o("div",{ref_key:"subWrapper",ref:V,class:"sub-wrapper"},[(l(!0),y(M,null,N(L.value,(e,t)=>(l(),B(a(we),{key:t,label:e.name,active:a(h).subCollections.includes(e.name),onClick:s=>a(m)(e.name)},null,8,["label","active","onClick"]))),128))],512)])):x("",!0)],512),o("div",Wt,[o("button",{class:"button",onClick:I},[o("div",{ref_key:"filtering",ref:W,class:"filtering"},[g[1]||(g[1]=o("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[o("path",{d:"M2.00391 12.6686V3.33529C2.00391 2.59891 2.60086 2.00195 3.33724 2.00195H12.6706C13.407 2.00195 14.0039 2.59891 14.0039 3.33529V12.6686C14.0039 13.405 13.407 14.002 12.6706 14.002H3.33724C2.60086 14.002 2.00391 13.405 2.00391 12.6686Z",stroke:"#241F21","stroke-width":"1.5"}),o("path",{d:"M5.33594 9.33464L8.0026 6.66797L10.6693 9.33464",stroke:"#241F21","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),o("p",Ot,[ae(q(a(f)("filter"))+" ",1),C.value?(l(),y("span",jt,q(C.value),1)):x("",!0)])],512),o("div",{ref_key:"close",ref:D,class:"close"},[...g[2]||(g[2]=[o("svg",{width:"25",height:"24",viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[o("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7.72798 6.16667C7.43509 5.87377 6.96021 5.87377 6.66732 6.16667C6.37443 6.45956 6.37443 6.93443 6.66732 7.22733L10.3781 10.9381C10.9639 11.5239 10.9639 12.4736 10.3781 13.0594L6.66412 16.7734C6.37123 17.0663 6.37122 17.5411 6.66412 17.834C6.95701 18.1269 7.43189 18.1269 7.72478 17.834L11.4387 14.1201C12.0245 13.5343 12.9743 13.5343 13.5601 14.1201L17.2739 17.8339C17.5668 18.1268 18.0417 18.1268 18.3346 17.8339C18.6275 17.541 18.6275 17.0662 18.3346 16.7733L14.6207 13.0594C14.0349 12.4736 14.0349 11.5239 14.6207 10.9381L18.3314 7.22744C18.6243 6.93455 18.6243 6.45967 18.3314 6.16678C18.0385 5.87389 17.5636 5.87389 17.2707 6.16678L13.5601 9.87743C12.9743 10.4632 12.0245 10.4632 11.4387 9.87743L7.72798 6.16667Z",fill:"black"})],-1)])],512)])])],512))}},Vt=J(Dt,[["__scopeId","data-v-06fb3510"]]),Nt={class:"g-row"},Zt={class:"xxl-24 g-col"},Kt={key:0,class:"grid-layout squared-grid"},Yt={__name:"ProductList",props:{products:{type:[Boolean,Array],default:!1},collections:{type:[Boolean,Array],default:!1}},setup(r){const n=r,d=F(null),{filteredProducts:f,productFilter:v}=ie(n.products),h=A(()=>{if(!Array.isArray(n.collections))return null;const e=v.value.collections[0];return e&&n.collections.find(t=>t.name===e)||null}),_=e=>(Array.isArray(e==null?void 0:e.caseStudyList)?e.caseStudyList:[]).filter(Boolean).map(s=>({...s,collection:e,source:"caseStudy"})),S=e=>{const t=e==null?void 0:e.catalogue;if(!(t!=null&&t.file))return null;const s=t.title||t.smallTitle||"Catalogue";return{_id:`catalogue-${(e==null?void 0:e.name)||"collection"}`,file:t.file,title:s,mediaAsset:t.mediaAsset,presentation:{title:s,mediaAsset:t.mediaAsset},collection:e,source:"catalogue"}},m=A(()=>{if(!Array.isArray(n.collections))return[];if(!h.value)return n.collections.flatMap(s=>_(s));const e=_(h.value),t=S(h.value);return t?[t,...e]:e}),$=F([...f.value]),b=A(()=>[...$.value]),L={layout1:{areas:[["square1","vertical","square2","square3"],["square4","vertical","horizontal","horizontal"]]},layout2:{areas:[["horizontal","horizontal","square1","square2"]]},layout3:{areas:[["horizontal","horizontal","vertical","square1"],["square2","square3","vertical","square4"]]},layout4:{areas:[["square1","square2","horizontal","horizontal"]]}},C={layout2:["horizontal"],layout4:["horizontal"]};function i(e){const t=new Set;e.areas.forEach(u=>{u.forEach(k=>t.add(k))});const s=t.size,c={square:0,vertical:0,horizontal:0};return t.forEach(u=>{u.startsWith("square")?c.square++:u.startsWith("vertical")?c.vertical++:u.startsWith("horizontal")&&c.horizontal++}),{total:s,counts:c}}for(const[e,t]of Object.entries(L))i(t);const H=A(()=>b.value.map(e=>{const t=e.sections&&e.sections[0]&&e.sections[0].mainImage;let s=null;if(t&&t.width&&t.height){const c=t.width/t.height;c>2&&(s="horizontal"),c<.9&&(s="vertical"),c<1.2&&c>.99&&(s="square")}return{...e,aspectRatio:s}}));function P(e,t){let s=[...t],c=[],u=new Set,k=[];for(const E of e.areas)for(const O of E)u.has(O)||(u.add(O),k.push(O));for(const E of k){const O=E.replace(/[0-9]/g,"");let K=s.findIndex(te=>te.aspectRatio===O),j=null;K>=0&&(j=s[K],s.splice(K,1)),c.push({product:j,area:E})}return{assignments:c,remaining:s}}const W=A(()=>{let e=[...H.value],t={},s=[...m.value];for(const[c,u]of Object.entries(L)){const k=P(u,e),E=C[c]||[],O=[...k.remaining],K=k.assignments.map(j=>{if(!(E.includes(j.area)&&s.length))return j;const Y=s.shift();return j.product&&O.push(j.product),{...j,product:null,caseStudy:Y,source:(Y==null?void 0:Y.source)||"caseStudy"}});t[c]=K,e=O}return{templatesAssignments:t,remainingProducts:e}}),D=(e,t)=>{var K,j,te,Y,pe,ye,fe,ge,me;if(!e)return`${t}-empty`;const s=e.area||"area",c=(te=(j=(K=e.caseStudy)==null?void 0:K.metadata)==null?void 0:j.slug)==null?void 0:te.current;if(c)return`${t}-${s}-case-${c}`;const u=(Y=e.caseStudy)==null?void 0:Y.file;if(u)return`${t}-${s}-case-${u}`;const k=(pe=e.caseStudy)==null?void 0:pe._id;if(k)return`${t}-${s}-case-${k}`;const E=(ge=(fe=(ye=e.product)==null?void 0:ye.metadata)==null?void 0:fe.slug)==null?void 0:ge.current;if(E)return`${t}-${s}-product-${E}`;const O=(me=e.product)==null?void 0:me._id;return O?`${t}-${s}-product-${O}`:`${t}-${s}-empty`},V=(e,t)=>{var s,c,u;return((c=(s=e==null?void 0:e.metadata)==null?void 0:s.slug)==null?void 0:c.current)||(e==null?void 0:e._id)||((u=e==null?void 0:e.slug)==null?void 0:u.current)||(e==null?void 0:e.slug)||`product-${t}`},w=e=>{var t,s,c,u,k;return e!=null&&e.file?{href:e.file}:{to:{name:"journal-category-slug",params:{category:(c=(s=(t=e==null?void 0:e.presentation)==null?void 0:t.category)==null?void 0:s.slug)==null?void 0:c.current,slug:(k=(u=e==null?void 0:e.metadata)==null?void 0:u.slug)==null?void 0:k.current}}}};let I;re(()=>f.value,async e=>{if(!d.value)return;const t=Array.from(d.value.querySelectorAll(".product"));z.killTweensOf(t),await new Promise(c=>{z.to(t,{autoAlpha:0,y:30,duration:.35,ease:"power1.out",onComplete:c})}),$.value=e,await ne();const s=Array.from(d.value.querySelectorAll(".product"));z.set(s,{autoAlpha:0,y:30}),await new Promise(c=>{z.to(s,{delay:.1,autoAlpha:1,y:0,duration:.45,ease:"power2.out",onComplete:c})})});const Z=()=>{if(!d.value)return;const e=Array.from(d.value.querySelectorAll(".product")).slice(0,6);z.set(e,{y:200,opacity:0}),I=z.timeline({paused:!0}),I.to(e,{y:0,opacity:1,duration:.8,stagger:.1,delay:.4,ease:"circ.out"})},p=()=>{d.value&&I.play()},g=ce("pageContext");return ee(()=>{}),X(()=>{g.$page.loader.loaded.then(()=>Z()),g.$page.loader.ready.then(()=>p())}),(e,t)=>(l(),y("section",{ref_key:"el",ref:d,"data-component":"product-list"},[o("div",Nt,[o("div",Zt,[(l(!0),y(M,null,N(W.value.templatesAssignments,(s,c)=>(l(),y("div",{class:Q(["grid-layout",c]),key:c},[(l(!0),y(M,null,N(s,u=>{var k,E;return l(),y("div",{class:Q(["product",[{"-case-study":u.caseStudy},u.area]]),key:D(u,c)},[u.caseStudy?(l(),B(a(ue),se({key:0,ref_for:!0},w(u.caseStudy),{class:"case-study-card",title:!1}),{default:le(()=>[(l(),B(a(dt),se({key:D(u,c)+"-"+(h.value?h.value.name:"all")},{ref_for:!0},u),null,16))]),_:2},1040)):(l(),y(M,{key:1},[u.product&&((E=(k=u.product.metadata)==null?void 0:k.slug)!=null&&E.current)?(l(),B(a(ue),{key:0,to:{name:"products-category-slug",params:{category:u.product.productSetup.collection.slug,slug:u.product.metadata.slug.current}},title:!1},{default:le(()=>[U(a(_e),se({ref_for:!0},{...u.product.sections[0],...u.product.productSetup}),null,16)]),_:2},1032,["to"])):x("",!0)],64))],2)}),128))],2))),128)),W.value.remainingProducts.length?(l(),y("div",Kt,[(l(!0),y(M,null,N(W.value.remainingProducts,(s,c)=>{var u,k;return l(),y("div",{key:V(s,c),class:"product"},[(k=(u=s.metadata)==null?void 0:u.slug)!=null&&k.current?(l(),B(a(ue),{key:0,to:{name:"products-category-slug",params:{category:s.productSetup.collection.slug,slug:s.metadata.slug.current}}},{default:le(()=>[U(a(_e),se({ref_for:!0},{...s.sections[0],...s.productSetup},{class:"square"}),null,16)]),_:2},1032,["to"])):x("",!0)])}),128))])):x("",!0)])])],512))}},Ut=J(Yt,[["__scopeId","data-v-8786bf20"]]),Qt={"data-component":"products-page",class:"inner-page"},Xt=200,Jt=2e3,Gt={__name:"Products",props:{metadata:{type:[Boolean,Object],default:!1},sections:{type:[Boolean,Array],default:!1},products:{type:[Boolean,Array],default:!1},collections:{type:[Boolean,Array],default:!1},productTypes:{type:[Boolean,Array],default:!1}},setup(r){z.registerPlugin(oe);const n=r,d=Ee(),f=Re(),v=Me(),{clearFilters:h}=ie(n.products),_=F(!1),S=F(null);let m=null,$=null,b=null;const L=()=>{$&&($(),$=null),b&&(clearTimeout(b),b=null)};X(()=>{let i=S.value;i&&i.$el&&(i=i.$el),oe.create({trigger:i,start:"top center",end:"bottom bottom",onEnter:()=>{_.value=!0},onLeave:()=>{_.value=!1},onEnterBack:()=>{_.value=!0},onLeaveBack:()=>{_.value=!1}})});const C=()=>{m&&(m(),m=null),m=v.afterEach((i,H,P)=>{if(m){const W=m;m=null,W()}P||(L(),$=f.on("transition-enter-complete",()=>{L(),setTimeout(()=>{h({suppressQuerySync:!0})},Xt)}),b=setTimeout(()=>{L(),h({suppressQuerySync:!0})},Jt))})};return He(i=>{`${(i==null?void 0:i.name)||""}`.startsWith("products-category-slug")||C()}),ee(()=>{oe.getAll().forEach(i=>i.kill())}),X(()=>{f.emit("change-menu-theme","main")}),(i,H)=>(l(),y("div",Qt,[U(a(Vt),{products:r.products,collections:r.collections,productTypes:r.productTypes,enabled:_.value},null,8,["products","collections","productTypes","enabled"]),U(a(mt),We(Oe(r.sections[0])),null,16),o("main",null,[a(d).width>a(je).sm?(l(),B(a(Tt),{key:0,products:r.products,collections:r.collections,productTypes:r.productTypes},null,8,["products","collections","productTypes"])):x("",!0),U(a(Ut),{ref_key:"productListRef",ref:S,products:r.products,collections:r.collections},null,8,["products","collections"])]),U(a(Ve))]))}},la=J(Gt,[["__scopeId","data-v-c9ed495b"]]);function Se(r="pt"){return`
		*[ _type == "page.product" && lang == '${r}' && !(_id in path("drafts.**"))]{
			...,
			"sections": sections[]{
				_type == "productDetails" => {
					title,

					"mainImage": modelObjectRef->mainImage{
						...${R()}
					},
				},
			},
			"productSetup": productSetup{
				"collection": collection->{
					name,
					"slug":slug.current,
					icon {
						...${R()}
					},
					featuredImage {
						...${R()}
					},
					subCategories[]->{
						name
					}
				},
				"subCollections": subCollections[]->,
				"productType": productType->,


				availableColors[]->{
					...,
					image{
						...${R()}
					},
				},
				structureOptions[]->{
					...,
					image{
						...${R()}
					},
				},
				availableSizes[]{
					name,
					label,
					dimensions,
					technicalImage {
						...${R()}
					},
				},
				displayOptions[]->{
					...,
					image{
						...${R()}
					},
				},
				availableHPLColors[]->{
					...,
					image{
						...${R()}
					},
				},
			}
		}
    `}function be(r="pt"){return`
		*[ _type == "collection" && lang == '${r}' && !(_id in path("drafts.**"))]{
			name,
			subCategories[]->{
				name
			},
			featuredImage {
				...${R()}
			},
			icon {
				...${R()}
			},
			caseStudyList[]->{
				metadata,
				presentation{
					...,
					category->,
					${ve()},
				}
			},
			catalogue {
				"file": file.asset->.url,
				title,
				${ve()},
				smallTitle,
				${De("catalogueCover")},
			},
			oldCatalogue,
		}
    `}function ke(r="pt"){return`
		*[ _type == "productType" && lang == '${r}' && !(_id in path("drafts.**"))]{
			name,
			featuredImage {
				...${R()}
			},
		}
    `}function ra(r,n="pt"){return $e`*[_type == "collection" && slug.current == "${r}" && lang == '${n}' && !(_id in path("drafts.**"))][0] {
			
			"metadata": *[_type == 'page.products' && !(_id in path("drafts.**")) && lang == '${n}'][0].metadata {
				...${Ce()}
			},
			"metadataCollection": {
				name,
				"description": "This is test hardocded in the query",
				featuredImage {
					...${R()}
				},
			},
			

			"sections": *[_type == 'page.products' && !(_id in path("drafts.**")) && lang == '${n}'][0].sections[] {
					_type,
					${Le},
			},


			"products": ${Se(n)},
			"collections": ${be(n)},
			"productTypes": ${ke(n)}
		}
	`}const Le=`
	_type == "productsHeader" => {
		title,
	}
`;function na(r="pt"){return $e`
	*[_type == 'page.products' && !(_id in path("drafts.**")) && lang == '${r}'][0] {
		_type,
		"metadata": metadata{...${Ce()}},
		"sections": sections[] {
			_type,
			${Le},
		},
		"products": ${Se(r)},
		"collections": ${be(r)},
		"productTypes": ${ke(r)}
	}
	`}export{la as P,ra as c,na as p};
