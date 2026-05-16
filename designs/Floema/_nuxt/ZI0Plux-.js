const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./C4rlixGp.js","./HDMkL_YV.js","./BL6O4IjF.js","./entry.CGK2sg1U.css","./Images.O475T3iD.css","./DyyhZqXi.js","./ShadowsPortal.5xHEzB4Z.css"])))=>i.map(i=>d[i]);
import{_ as V,p as re,q as F,h as G,c as y,o as u,d as t,j as O,k as T,t as x,u as n,a6 as be,V as $e,a as v,B as Ce,F as M,A as j,e as ue,a7 as xe,n as we,r as I,x as qe,g as e,i as se,E as Pe,b as D,G as de,H as pe,a8 as Ee,O as me,U as ke,a9 as ge,D as z,Q as Se,s as X,S as fe,N,P as Ie,I as Te,y as _e,m as Le,aa as Be,X as Oe,Y as K,Z as Re,ab as le,$ as ze,a0 as He,W as Me,a1 as he,a2 as je,a3 as Fe,a4 as De,a5 as Ve,K as Ue,L as Ne}from"./BL6O4IjF.js";import{u as Ge}from"./DYyzkNkO.js";import{S as Z}from"./n_eiQhs4.js";import{A as We}from"./u-TollBj.js";import{R as ie}from"./2BDvSOkA.js";import{F as Ye}from"./NIufRzW5.js";import{L as Xe}from"./BVxzag9G.js";const Qe={class:"header"},Ke={class:"-body-big-medium"},Ze={class:"image-wrapper"},Je={class:"explore-button"},et={class:"available-options"},tt={key:0,class:"colors"},at={class:"-body-medium"},ot={class:"colors-list"},lt={key:0,class:"-caption-medium more-colors"},st={key:1,class:"sizes"},nt={class:"-body-medium"},rt={class:"sizes-list"},it={class:"label"},ct={key:0,class:"-caption-medium more-sizes"},ut={__name:"ProductCardFeatured",props:{isFeatured:{type:[Boolean],default:!1},title:{type:[String,Object],default:!1},collection:{type:[Boolean,Object],default:!1},mainImage:{type:[Boolean,Object],default:!1},availableColors:{type:[Boolean,Object],default:!1},availableSizes:{type:[Boolean,Object],default:!1},uniqueSize:{type:[Boolean,Object],default:!1}},setup(o){const r=o,h=I(null),d=re(),c=qe(()=>{if(!r.mainImage||!r.mainImage.width||!r.mainImage.height)return"";const g=r.mainImage.width/r.mainImage.height;return g>1.2?"horizontal":g<.8?"vertical":"square"});return F(()=>{}),G(()=>{}),(g,f)=>{const p=xe;return u(),y("div",{ref_key:"el",ref:h,"data-component":"product-card-featured",class:ue(`${n(c)} ${o.isFeatured?"featured":"normal"}`)},[t("div",Qe,[t("p",Ke,x(o.title),1),o.collection?(u(),O(n(be),{key:0,collection:o.collection,type:"product",size:"medium",forceActive:o.isFeatured},null,8,["collection","forceActive"])):T("",!0)]),t("div",Ze,[o.mainImage.url?(u(),O(n($e),{key:0,asset:o.mainImage,class:"featured-image",alt:o.title},null,8,["asset","alt"])):T("",!0)]),t("div",Je,[v(n(Ce),{label:"Explore",theme:"dark",icon:"arrow-right",iconPlacement:"front",onClick:f[0]||(f[0]=()=>g.clearWishlist())})]),t("div",et,[o.availableColors&&o.availableColors.length>1?(u(),y("div",tt,[t("p",at,x(n(d)("colors")),1),t("div",ot,[(u(!0),y(M,null,j(o.availableColors.slice(0,4),(a,b)=>{var _,C,E;return u(),y("div",{class:ue(["color",{"has-image":!!((_=a==null?void 0:a.image)!=null&&_.url)}]),key:b},[(C=a==null?void 0:a.image)!=null&&C.url?(u(),O(p,{key:0,provider:"ipx",src:a.image.url,alt:"Color Image"},null,8,["src"])):T("",!0),(E=a==null?void 0:a.colorValue)!=null&&E.value?(u(),y("span",{key:1,class:"color-circle",style:we({backgroundColor:a.colorValue.value})},null,4)):T("",!0)],2)}),128)),o.availableColors.length>4?(u(),y("p",lt,"+"+x(o.availableColors.length-4),1)):T("",!0)])])):T("",!0),!o.uniqueSize&&o.availableSizes&&o.availableSizes.length>1?(u(),y("div",st,[t("p",nt,x(n(d)("sizes")),1),t("div",rt,[(u(!0),y(M,null,j(o.availableSizes.slice(0,4),(a,b)=>(u(),y("div",{class:"size",key:b},[t("p",it,x(a.label),1)]))),128)),o.availableSizes.length>4?(u(),y("p",ct,"+"+x(o.availableSizes.length-4),1)):T("",!0)])])):T("",!0)])],2)}}},dt=V(ut,[["__scopeId","data-v-d2b72111"]]),pt={class:"g-row"},mt={class:"g-col xxl-14 sm-22"},gt={class:"-title-2-medium title"},yt={class:"floating-images"},ft={__name:"Intro",props:{title:{type:[Boolean,String],default:!1},mediaAsset:{type:[Boolean,Array],default:!1}},setup(o){e.registerPlugin(Z);const r=de(()=>me(()=>import("./C4rlixGp.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),h=se("pageContext"),d=I(null);let c,g,f;const p=()=>{if(!d.value)return;const b=d.value.querySelector(".title");g=new Z(b,{type:"lines, words",linesClass:"line",wordsClass:"word",autoSplit:!0}),f=g.lines,e.set(b,{opacity:1}),e.set(f,{yPercent:-100,opacity:0});const _=Array.from(d.value.querySelectorAll(".slider-image img"));e.set(_,{scale:0,yPercent:60,xPercent:60,opacity:0}),c=e.timeline({paused:!0}),c.to(_,{scale:1,opacity:1,yPercent:0,xPercent:0,duration:.6,stagger:.1,ease:"circ.out"}).to(f,{opacity:1,yPercent:0,opacity:1,stagger:.1,duration:.8,ease:"circ.out"},"-=1")},a=()=>{if(!d.value)return;c.play();const b=Ee.ScrollTrigger.create({trigger:'[data-component="intro"]',start:"top top",end:"bottom top",pin:!0,pinSpacing:!1});F(()=>{b.kill()})};return F(()=>{}),G(()=>{Array.from(d.value.querySelectorAll("img")).forEach(b=>{h.$page.loader.deferLoad(Pe(b))}),h.$page.loader.loaded.then(()=>p()),h.$page.loader.ready.then(()=>a())}),(b,_)=>{const C=pe;return u(),y("header",{ref_key:"el",ref:d,"data-component":"intro"},[t("div",pt,[t("div",mt,[t("h1",gt,x(o.title),1)])]),t("div",yt,[v(C,null,{default:D(()=>[v(n(r),{images:o.mediaAsset},null,8,["images"])]),_:1})])],512)}}},_t=V(ft,[["__scopeId","data-v-068e8402"]]),ht={class:"content"},vt={class:"title-wrapper"},bt={class:"-title-8-medium"},$t={class:"image-wrapper"},wt={__name:"Card",props:{collection:{type:[Boolean,Object],default:!1}},setup(o){const r=re(),h=I(null),d=I(!1);return F(()=>{}),G(()=>{}),(c,g)=>(u(),y("div",{ref_key:"el",ref:h,"data-component":"card",onMouseenter:g[0]||(g[0]=f=>d.value=!0),onMouseleave:g[1]||(g[1]=f=>d.value=!1)},[v(n(ge),{href:o.collection.catalogue.file,title:`${o.collection.catalogue.smallTitle}`},{default:D(()=>[t("div",ht,[t("div",vt,[t("p",bt,x(o.collection.catalogue.smallTitle),1)]),v(n(ke),{hover:n(d),label:n(r)("downloadNow"),size:"small",icon:"download",iconPlacement:"front",class:"button"},null,8,["hover","label"])]),t("div",$t,[v(n($e),{asset:o.collection.catalogue.catalogueCover[0],sizes:"xsmall:300px xlarge:500px"},null,8,["asset"])])]),_:1},8,["href","title"])],544))}},kt=V(wt,[["__scopeId","data-v-05bb6279"]]),St={class:"-body-small-medium main-label"},At={class:"-body-small-medium scroll-label"},Ct={class:"media"},xt={class:"media-inner"},qt={class:"g-row"},Pt={class:"upper-content"},Et={class:"-body-small-medium index"},It={class:"-body-small-medium collection-upper"},Tt={class:"lower-content"},Lt={class:"title-wrapper"},Bt={class:"-title-4-medium title"},Ot=.25,ve=.05,Rt=1.03,zt=-180,Ht={__name:"CollectionsCta",props:{smallTagline:{type:[Boolean,String],default:!1},scrollLabel:{type:[Boolean,String],default:!1},collections:{type:[Boolean,Array],default:!1}},setup(o){e.registerPlugin(z,Z);const r=I(null),h=I(null),d=I(null),c=I([]),g=re(),f=($,m)=>{$?c.value[m]=$:c.value[m]=null};F(()=>{z.getAll().forEach($=>$.kill()),b.length&&b.forEach($=>{try{$.revert()}catch{}})});let p=0;const a={index:[],collectionUpper:[],label:[],title:[],button:[],card:[]},b=[];let _=null;const C=()=>{z.create({trigger:r.value,start:"top top",end:"bottom bottom",scrub:!0,onUpdate:i=>{const s=h.value.querySelector(".progress");s&&e.set(s,{width:`${i.progress*100}%`})}});const $=r.value,m=d.value.querySelectorAll(".collection"),l=i=>{Object.values(a).forEach(s=>{const w=s[i];w&&w.pause(0)})};m.forEach(i=>i.classList.remove("is-active")),m[0]&&m[0].classList.add("is-active"),m.forEach((i,s)=>{var q,J,U,ee,te,ne,R,S,L,B;const w=i.querySelector(".media"),A=i.querySelector(".media-inner"),k=i.querySelector(".g-row");if(s===0?e.set(w,{css:{"--reveal":"0%"}}):e.set(w,{css:{"--reveal":"100%"}}),A&&e.set(A,{scale:1,y:0}),e.set(i,{opacity:1}),k){e.set(k,{opacity:s===0?1:0});const H=i.querySelector(".index"),Q=i.querySelector(".collection-upper"),ae=i.querySelector(".title"),W=i.querySelector(".special-button"),Y=i.querySelector(".brochure-card");if(H&&e.set(H,{autoAlpha:0,yPercent:-100,scaleY:1.5}),W&&e.set(W,{opacity:0,yPercent:35}),Y&&e.set(Y,{autoAlpha:0}),s!==0&&((J=(q=c.value[s])==null?void 0:q.prepare)==null||J.call(q)),ae){const P=new Z(ae,{type:"lines,words",linesClass:"split-line",wordsClass:"split-word"});b[s]=P,e.set(P.words,{yPercent:20,opacity:0})}a.index[s]=e.timeline({paused:!0}),H&&a.index[s].to(H,{autoAlpha:1,yPercent:0,scaleY:1,duration:.7,ease:"expo.out",force3D:!0},0),a.collectionUpper[s]=e.timeline({paused:!0}),Q&&a.collectionUpper[s].to(Q,{autoAlpha:1,duration:.4,ease:"expo.out",force3D:!0},0),a.title[s]=e.timeline({paused:!0}),b[s]&&a.title[s].to(b[s].words,{yPercent:0,opacity:1,duration:.8,ease:"expo.out",stagger:.02},0),a.button[s]=e.timeline({paused:!0}),W&&a.button[s].to(W,{autoAlpha:1,yPercent:0,duration:.4,ease:"power1.out"},"+=0.3"),a.card[s]=e.timeline({paused:!0}),Y&&a.card[s].to(Y,{autoAlpha:1,duration:.3,ease:"power1.out"},.2),s===0&&((U=a.index[s])==null||U.progress(1),(ee=a.collectionUpper[s])==null||ee.progress(1),(te=a.label[s])==null||te.progress(1),(ne=a.title[s])==null||ne.progress(1),(R=a.button[s])==null||R.progress(1),(S=a.card[s])==null||S.progress(1)),(L=a.collectionUpper[s])==null||L.eventCallback("onStart",()=>{var P,oe;(oe=(P=c.value[s])==null?void 0:P.play)==null||oe.call(P)}),(B=a.collectionUpper[s])==null||B.eventCallback("onReverseComplete",()=>{var P,oe;(oe=(P=c.value[s])==null?void 0:P.prepare)==null||oe.call(P)})}}),z.create({trigger:$,start:"top top",end:"bottom bottom",scrub:!0,onUpdate:i=>{var k,q,J,U,ee,te,ne;const s=m.length;if(s<=1)return;const w=1/(s-1);let A=Math.round(i.progress/w);if(A=e.utils.clamp(0,s-1,A),m.forEach((R,S)=>{const L=R.querySelector(".media"),B=R.querySelector(".media-inner"),H=w*S,Q=.15,ae=Math.max(0,w*(S-1-Q)),W=Math.min(1,w*(S+Q)),Y=e.utils.clamp(0,1,e.utils.normalize(ae,W,i.progress)),P=S===0?0:H-w,oe=H+w,ye=e.utils.clamp(0,1,e.utils.normalize(P,oe,i.progress));if(L&&S!==0){const ce=100-Y*100;e.set(L,{css:{"--reveal":`${ce}%`}})}if(B){const ce=1+(Rt-1)*ye,Ae=zt*ye;e.set(B,{scale:ce,y:Ae})}}),A!==p){if(p>=0){const S=m[p],L=S==null?void 0:S.querySelector(".g-row"),B=S==null?void 0:S.querySelector(".g-row .title");(q=(k=c.value[p])==null?void 0:k.prepare)==null||q.call(k),e.killTweensOf([L,B]),L&&e.to(L,{opacity:0,duration:.25,ease:"power1.out"}),B&&e.to(B,{opacity:0,duration:.25,ease:"power1.out"}),(J=a.index[p])==null||J.reverse(),(U=a.collectionUpper[p])==null||U.reverse(),(ee=a.title[p])==null||ee.reverse(),(te=a.button[p])==null||te.reverse(),(ne=a.card[p])==null||ne.reverse(),S==null||S.classList.remove("is-active")}_&&(_.kill(),_=null);const R=A;_=e.delayedCall(Ot,()=>{var H,Q,ae,W,Y;const S=m[R];S==null||S.classList.add("is-active");const L=S==null?void 0:S.querySelector(".g-row"),B=S==null?void 0:S.querySelector(".g-row .title");(Q=(H=c.value[R])==null?void 0:H.prepare)==null||Q.call(H),e.killTweensOf([L,B]),L&&e.set(L,{opacity:0}),B&&e.set(B,{opacity:0}),L&&e.to(L,{opacity:1,duration:.4,ease:"expo.out"}),B&&e.to(B,{opacity:1,duration:.4,ease:"expo.out"}),l(R),(ae=a.index[R])==null||ae.restart(!0),(W=a.button[R])==null||W.restart(!0),(Y=a.card[R])==null||Y.restart(!0),e.delayedCall(ve*2,()=>{var P;return(P=a.collectionUpper[R])==null?void 0:P.restart(!0)}),e.delayedCall(ve*2,()=>{var P;return(P=a.title[R])==null?void 0:P.restart(!0)})}),p=A}}})},E=se("pageContext");return G(()=>{E.$page.loader.ready.then(()=>C())}),($,m)=>(u(),y("section",{ref_key:"el",ref:r,"data-component":"collections-cta",style:we({height:(o.collections.length+1)*150+"vh"})},[t("div",{ref_key:"lineWrapper",ref:h,class:"line-wrapper"},[m[1]||(m[1]=t("span",{class:"line"},[t("span",{class:"progress"})],-1)),t("p",St,x(n(g)("madeToLast")),1),t("p",At,[Se(x(n(g)("scrollToExplore"))+" ",1),m[0]||(m[0]=t("span",null,"↓",-1))])],512),t("div",{ref_key:"wrapper",ref:d,class:"collections-wrapper"},[(u(!0),y(M,null,j(o.collections,(l,i)=>(u(),y("div",{class:"collection",key:i},[t("div",Ct,[t("div",xt,[v(n(X),{media:l.mediaAsset,sizes:"xsmall:600px medium:1200px xlarge:1700px"},null,8,["media"])])]),t("div",qt,[t("div",Pt,[t("p",Et,"0"+x(i+1),1),t("p",It,[l.collection?(u(),O(n(be),{key:0,ref_for:!0,ref:s=>f(s,i),collection:l.collection,type:"product",size:"medium"},null,8,["collection"])):T("",!0)])]),t("div",Tt,[t("div",Lt,[t("h4",Bt,x(l.title),1),!l.globalCta.link&&l.globalCta.label?(u(),O(n(fe),{key:0,label:l.globalCta?l.globalCta.label:n(g)("learnMore"),theme:"light",icon:l.collection.name.toLowerCase(),iconPlacement:"front",class:"special-button",to:{name:"products-category",params:{category:l.collection.name.toLowerCase()}}},null,8,["label","icon","to"])):T("",!0),l.globalCta.link&&l.globalCta.label?(u(),O(n(fe),{key:1,label:l.globalCta.label,theme:"light",icon:l.collection.name.toLowerCase(),iconPlacement:"front",class:"special-button",to:{name:"journal-category-slug",params:{category:l.globalCta.link.category,slug:l.globalCta.link.slug}}},null,8,["label","icon","to"])):T("",!0)])])]),l.collection.catalogue.file?(u(),O(kt,{key:0,class:"brochure-card",collection:l.collection},null,8,["collection"])):T("",!0)]))),128))],512)],4))}},Mt=V(Ht,[["__scopeId","data-v-435ca9aa"]]),jt={class:"g-row"},Ft={class:"g-col xxl-16 sm-24"},Dt={class:"tagline-image"},Vt={class:"-title-7-medium left-label"},Ut={class:"-title-3-medium title"},Nt={class:"g-col xxl-8 sm-24"},Gt={class:"content"},Wt={class:"-body-smaller-medium right-label"},Yt={class:"recent-news"},Xt={__name:"CompanyHighlight",props:{label:{type:[Boolean,String],default:!1},mediaAsset:{type:[Boolean,Object],default:!1},title:{type:[Boolean,String],default:!1},recentArticles:{type:[Boolean,Array],default:!1}},setup(o){e.registerPlugin(z,Z);const r=I(null),h=I(null),d=re();let c,g,f,p,a;const b=()=>{const $=r.value.querySelectorAll(".top-line"),m=r.value.querySelector(".left-label"),l=r.value.querySelector(".right-label"),i=r.value.querySelector(".title"),s=r.value.querySelectorAll(".article-card");f=new Z(i,{type:"lines, words",linesClass:"line",wordsClass:"word",autoSplit:!0}),p=f.lines,e.set(i,{opacity:1}),e.set(p,{yPercent:50,opacity:0}),e.set($,{width:0}),e.set(m,{opacity:0}),e.set(l,{opacity:0}),e.set(i,{opacity:1}),e.set(p,{yPercent:50,opacity:0}),e.set(s,{yPercent:20,opacity:0})},_=()=>{c=e.timeline({paused:!0,delay:.5}),g=z.create({trigger:r.value,start:"top 70%",toggleActions:"play none none none",once:!0,onEnter:()=>c.play(0)});const $=r.value.querySelectorAll(".top-line"),m=r.value.querySelector(".left-label"),l=r.value.querySelector(".right-label");r.value.querySelector(".title");const i=r.value.querySelectorAll(".article-card");c.to($,{width:"100%",stagger:.1,duration:2,ease:"expo.inOut"},"<"),c.to(m,{opacity:1,duration:.7,ease:"circ.out"},"-=2"),c.to(l,{opacity:1,duration:.7,ease:"circ.out"},"<"),c.to(p,{opacity:1,yPercent:0,opacity:1,stagger:.03,duration:.8,ease:"circ.out"},"-=1.6"),c.to(i,{yPercent:0,opacity:1,stagger:.1,duration:.8,ease:"circ.out"},"<")},C=se("pageContext"),E=()=>{var i,s;const $=h.value;if(!$)return;const m=(i=$.getTriggerEl)==null?void 0:i.call($);if(!m)return;const l=((s=$.getStart)==null?void 0:s.call($))||"70%";a=z.create({trigger:m,start:`top ${l}`,toggleActions:"play none none none",once:!0,onEnter:()=>$.play(0)})};return G(()=>{C.$page.loader.loaded.then(()=>b()),C.$page.loader.ready.then(()=>{_(),E()})}),F(()=>{f&&f.revert(),g.kill(),c.kill(),a&&a.kill()}),($,m)=>(u(),y("section",{ref_key:"el",ref:r,"data-component":"company-highlight"},[t("div",jt,[t("div",Ft,[m[1]||(m[1]=t("span",{class:"top-line"},null,-1)),t("div",Dt,[t("h4",Vt,x(o.label),1),v(n(ie),{ref_key:"highlightImage",ref:h,controlled:!0,backgroundColor:"stoneBrown800"},{default:D(()=>[v(n(X),{media:o.mediaAsset},null,8,["media"])]),_:1},512)]),t("h2",Ut,[m[0]||(m[0]=t("span",{class:"spacer"},null,-1)),Se(x(o.title),1)])]),t("div",Nt,[m[2]||(m[2]=t("span",{class:"top-line"},null,-1)),t("div",Gt,[t("p",Wt,x(n(d)("recentNews"))+" ↓",1),t("div",Yt,[(u(!0),y(M,null,j(o.recentArticles,(l,i)=>(u(),O(n(We),N({key:i},{ref_for:!0},{...l.presentation,...l.metadata},{class:"article-card"}),null,16))),128))])])])])],512))}},Qt=V(Xt,[["__scopeId","data-v-4d2de5ce"]]),Kt={class:"g-row"},Zt={class:"g-col xxl-24"},Jt={class:"-body-smaller-medium"},ea={class:"products-wrapper"},ta={__name:"FeaturedProducts",props:{products:{type:[Boolean,Array],default:!1}},setup(o){const r=re(),h=I(null);return F(()=>{}),G(()=>{}),(d,c)=>(u(),y("section",{ref_key:"el",ref:h,"data-component":"featured-products"},[t("div",Kt,[t("div",Zt,[t("p",Jt,x(n(r)("recentAddings"))+" ↓",1)])]),t("div",ea,[(u(!0),y(M,null,j(o.products,(g,f)=>(u(),y("div",{class:"product",key:f},[v(n(ge),{to:{name:"products-category-slug",params:{category:g.productSetup.collection.slug,slug:g.metadata.slug.current}}},{default:D(()=>[v(n(dt),N({ref_for:!0},{...g.sections[0],...g.productSetup},{isFeatured:!0}),null,16)]),_:2},1032,["to"])]))),128))])],512))}},aa=V(ta,[["__scopeId","data-v-858d409b"]]),oa={class:"-body-smaller-medium"},la={class:"collections-wrapper"},sa=["onMouseenter","onMouseleave"],na={key:0,class:"media-wrapper"},ra={key:1,class:"media-wrapper -nature"},ia={class:"-title-2-medium"},ca={class:"-title-2"},ua={key:3,class:"media-wrapper"},da=.14,pa=.9,ma=.2,ga={__name:"CollectionsOverview",props:{title:{type:[Boolean,String],default:!1},collections:{type:[Boolean,Array],default:!1}},setup(o){const r=de(()=>me(()=>import("./DyyhZqXi.js"),__vite__mapDeps([5,1,2,3,6]),import.meta.url));e.registerPlugin(z);const h=Ie(),d=I(null);let c=[],g=[],f=[],p=[],a=[];const b=l=>{if((h==null?void 0:h.width)<_e.sm)return;const i=f[l];a[l]&&(a[l].kill(),a[l]=null),i&&(a[l]=e.delayedCall(ma,()=>{i.timeScale(pa).restart(!0),a[l]=null}))},_=l=>{if((h==null?void 0:h.width)<_e.sm)return;a[l]&&(a[l].kill(),a[l]=null);const i=f[l];if(i){i.pause(0);const s=p[l];s&&s.length>1&&(e.set(s,{autoAlpha:0}),e.set(s[0],{autoAlpha:1}))}},C=()=>{},E=()=>{const l=d.value.querySelectorAll(".collection");l.forEach((i,s)=>{const w=e.timeline({paused:!0});c.push(w);const A=z.create({trigger:i,start:"top 80%",toggleActions:"play none none none",once:!0,onEnter:()=>c[s].play(0)});g.push(A)}),l.forEach((i,s)=>{const w=c[s];e.set(i,{y:50,autoAlpha:0,pointerEvents:"none"}),w.to(i,{y:0,autoAlpha:1,duration:.8,ease:"power3.out"});const A=i.querySelector(".media");A&&(e.set(A,{y:30,autoAlpha:0}),w.to(A,{y:0,autoAlpha:1,duration:.6,ease:"power2.out",onComplete:()=>{e.set(i,{pointerEvents:"all"})}},"-=0.7"));const k=i.querySelectorAll(".media");if(p[s]=k,k.length>1){e.set(k,{autoAlpha:0});const q=e.timeline({paused:!0,repeat:-1,repeatDelay:0,defaults:{ease:"none"}}),J=da;for(let U=1;U<k.length;U++){const ee=k[U-1],te=k[U];q.add(()=>{e.set(te,{autoAlpha:1})}),q.add(()=>{e.set(ee,{autoAlpha:0})},"+=0"),q.to({},{duration:J})}q.add(()=>{e.set(k,{autoAlpha:0}),e.set(k[0],{autoAlpha:1})}),q.eventCallback("onRepeat",()=>{e.set(k,{autoAlpha:0}),e.set(k[0],{autoAlpha:1})}),f[s]=q}else f[s]=null})},$=se("pageContext"),m=I();return G(()=>{$.$page.loader.loaded.then(()=>C()),$.$page.loader.ready.then(()=>E()),e.to(m.value,{yPercent:-20,ease:"none",scrollTrigger:{trigger:d.value,start:"top bottom",end:"bottom top",scrub:!0}})}),F(()=>{g.forEach(l=>l.kill()),c.forEach(l=>l.kill()),f.forEach(l=>l&&l.kill()),a.forEach(l=>l&&l.kill()),a=[],p=[]}),(l,i)=>{const s=pe;return u(),y("section",{ref_key:"el",ref:d,"data-component":"collections-overview"},[t("div",{ref_key:"shadows",ref:m,class:"shadows"},[v(s,null,{default:D(()=>[v(n(r),{type:"collections"})]),_:1})],512),t("p",oa,x(o.title),1),t("div",la,[(u(!0),y(M,null,j(o.collections,(w,A)=>(u(),O(n(ge),{key:A,to:{name:"products-category",params:{category:w.collectionRef.slug}},title:`${w.collectionRef.slug} collection link`},{default:D(()=>[t("div",{class:"collection",onMouseenter:k=>b(A),onMouseleave:k=>_(A)},[A===3?(u(),y("div",na,[(u(!0),y(M,null,j(w.mediaAsset,(k,q)=>(u(),O(n(X),{media:[k],key:q},null,8,["media"]))),128))])):T("",!0),v(n(Te),{class:"icon",slug:w.collectionRef.name.toLowerCase()},null,8,["slug"]),A===1?(u(),y("div",ra,[(u(!0),y(M,null,j(w.mediaAsset,(k,q)=>(u(),O(n(X),{media:[k],key:q},null,8,["media"]))),128))])):T("",!0),t("h3",ia,x(w.collectionRef.name),1),A===0||A===4?(u(),y("div",{key:2,class:ue(["media-wrapper",A===4?"-details":""])},[(u(!0),y(M,null,j(w.mediaAsset,(k,q)=>(u(),O(n(X),{media:[k],key:q},null,8,["media"]))),128))],2)):T("",!0),t("h3",ca,"("+x(String(w.collectionRef.count).padStart(2,"0"))+")",1),A===2?(u(),y("div",ua,[(u(!0),y(M,null,j(w.mediaAsset,(k,q)=>(u(),O(n(X),{media:[k],key:q},null,8,["media"]))),128))])):T("",!0)],40,sa)]),_:2},1032,["to","title"]))),128))])],512)}}},ya=V(ga,[["__scopeId","data-v-47d2097f"]]),fa={class:"g-row"},_a={class:"g-col xxl-14 sm-24 left-col"},ha={class:"top-row"},va={class:"author-wrapper"},ba={class:"name-role"},$a={class:"-title-8-medium"},wa={class:"-title-9-medium"},ka={class:"description"},Sa={class:"-title-9-medium"},Aa={class:"quote-wrapper"},Ca={class:"-title-2-medium quote"},xa={class:"g-col xxl-10 sm-24"},qa={class:"-body-medium label"},Pa={__name:"LeadershipHighlight",props:{description:{type:[Boolean,String],default:!1},quote:{type:[Boolean,String],default:!1},author:{type:[Boolean,Object],default:!1},mediaAsset:{type:[Boolean,Object],default:!1},button:{type:[Boolean,Object],default:!1}},setup(o){e.registerPlugin(z,Z);const r=I(null),h=I(null),d=I(null);let c,g,f,p;const a=()=>{c=e.timeline({paused:!0}),g=z.create({trigger:r.value,start:"top 70%",toggleActions:"play none none none",once:!0,onEnter:()=>c.play(0)});const C=r.value.querySelector(".section-bg"),E=r.value.querySelector(".name-role"),$=r.value.querySelector(".description"),m=r.value.querySelector(".image-wrapper .label"),l=r.value.querySelector(".quote"),i=r.value.querySelector(".button");f=new Z(l,{type:"lines, words",linesClass:"line",wordsClass:"word",autoSplit:!0}),p=f.lines,e.set(l,{opacity:1}),e.set(p,{yPercent:50,opacity:0}),e.set(C,{scaleY:0}),e.set(E,{yPercent:10,opacity:0}),e.set($,{yPercent:30,opacity:0}),e.set(m,{opacity:0}),e.set(i,{yPercent:100,opacity:0})},b=()=>{var w,A;const C=r.value.querySelector(".section-bg"),E=r.value.querySelector(".name-role"),$=r.value.querySelector(".description"),m=r.value.querySelector(".image-wrapper .label"),l=r.value.querySelector(".button"),i=(w=h.value)==null?void 0:w.getTimeline(),s=(A=d.value)==null?void 0:A.getTimeline();c.to(C,{scaleY:1,duration:.7,ease:"power1.out"}),i&&c.add(i,"-=0.3"),c.to(E,{opacity:1,yPercent:0,duration:.7,ease:"circ.out"},"<"),c.to($,{opacity:.7,yPercent:0,duration:.7,ease:"circ.out"},"<"),s&&c.add(s,"<"),c.to(m,{opacity:1,duration:.7,delay:.5,ease:"circ.out"},"-=0.5"),c.to(p,{opacity:1,yPercent:0,opacity:1,stagger:.06,duration:.8,ease:"circ.out"},"-=1"),c.to(l,{opacity:1,yPercent:0,duration:1,ease:"circ.out"},"<")},_=se("pageContext");return G(()=>{_.$page.loader.loaded.then(()=>a()),_.$page.loader.ready.then(()=>b())}),F(()=>{f&&f.revert(),g.kill(),c.kill()}),(C,E)=>(u(),y("section",{ref_key:"el",ref:r,"data-component":"leadership-highlight"},[E[0]||(E[0]=t("span",{class:"section-bg"},null,-1)),t("div",fa,[t("div",_a,[t("div",ha,[t("div",va,[v(n(ie),{ref_key:"authorImage",ref:h,controlled:!0,backgroundColor:"yellow"},{default:D(()=>[v(n(X),{media:o.author.mediaAsset},null,8,["media"])]),_:1},512),t("div",ba,[t("p",$a,x(o.author.name),1),t("p",wa,x(o.author.role),1)])]),t("div",ka,[t("p",Sa,x(o.description),1)])]),t("div",Aa,[t("h2",Ca,'"'+x(o.quote)+'"',1),o.button.label&&o.button.slug?(u(),O(n(ke),{key:0,class:"button",label:o.button.label,size:"medium",icon:"arrow-right",type:"internal",to:`/${o.button.slug}`},null,8,["label","to"])):T("",!0)])]),t("div",xa,[v(n(ie),{ref_key:"mainImage",ref:d,controlled:!0,backgroundColor:"yellow"},{default:D(()=>[v(n(X),{media:o.mediaAsset},null,8,["media"]),t("p",qa,x(o.mediaAsset[0].alt),1)]),_:1},512)])])],512))}},Ea=V(Pa,[["__scopeId","data-v-4e02a2c2"]]),Ia={class:"g-row"},Ta={class:"inner"},La={class:"text-content"},Ba={class:"-title-8-medium title"},Oa={class:"-body-big-medium description"},Ra={__name:"WorkflowOverview",props:{workflow:{type:[Boolean,Array],default:!1}},setup(o){e.registerPlugin(z);const r=I(null),h=I([]);let d,c;const g=()=>{r.value.querySelectorAll(".inner").forEach((b,_)=>{e.set(b,{opacity:0,yPercent:40*(_+1)})})},f=()=>{d=e.timeline({paused:!0,delay:.5}),c=z.create({trigger:r.value,start:"top 70%",toggleActions:"play none none none",once:!0,onEnter:()=>d.play(0)});const a=r.value.querySelectorAll(".inner"),b=h.value.map(_=>{var C;return(C=_==null?void 0:_.getTimeline)==null?void 0:C.call(_)}).filter(Boolean);d.to(a,{opacity:1,yPercent:0,duration:1,stagger:.05,ease:"circ.out"}),b.length&&(d.addLabel("image-reveal","-=0.6"),b.forEach((_,C)=>{d.add(_,`image-reveal+=${C*.1}`)}))},p=se("pageContext");return G(()=>{p.$page.loader.loaded.then(()=>g()),p.$page.loader.ready.then(()=>f())}),F(()=>{c.kill(),d.kill()}),(a,b)=>(u(),y("section",{ref_key:"el",ref:r,"data-component":"workflow-overview"},[t("div",Ia,[(u(!0),y(M,null,j(o.workflow,(_,C)=>(u(),y("div",{class:"g-col xxl-8 sm-24",key:C},[t("div",Ta,[v(n(ie),{ref_for:!0,ref_key:"imageReveals",ref:h,controlled:!0,backgroundColor:"yellow"},{default:D(()=>[v(n(X),{media:_.mediaAsset},null,8,["media"])]),_:2},1536),t("div",La,[t("p",Ba,x(_.title),1),t("p",Oa,x(_.description),1)])])]))),128))])],512))}},za=V(Ra,[["__scopeId","data-v-83a649a5"]]),Ha={"data-component":"home-page",class:"inner-page"},Ma={class:"bottomGroup"},ja={class:"bottomGroupCanvasContainer"},Fa={__name:"Home",props:{metadata:{type:[Boolean,Object],default:!1},sections:{type:[Boolean,Array],default:!1}},setup(o){const r=de(()=>me(()=>import("./DyyhZqXi.js"),__vite__mapDeps([5,1,2,3,6]),import.meta.url)),h=o;Le();const d=c=>h.sections.find(g=>g._type==c);return F(()=>{}),Be(()=>{}),G(()=>{}),(c,g)=>{const f=pe;return u(),y("div",Ha,[v(n(_t),N(d("intro"),{"data-section-intersect":"dark"}),null,16),t("main",null,[v(n(Mt),N(d("collectionsCta"),{"data-section-intersect":"light"}),null,16),v(n(Qt),N(d("companyHighlight"),{"data-section-intersect":"dark"}),null,16),v(n(aa),N(d("featuredProducts"),{"data-section-intersect":"dark"}),null,16),v(n(ya),N(d("collectionsOverview"),{"data-section-intersect":"dark"}),null,16),v(n(Ea),N(d("leadershipHighlight"),{"data-section-intersect":"fluor"}),null,16),t("div",Ma,[t("data",ja,[v(f,null,{default:D(()=>[v(n(r),{type:"madeToLast"})]),_:1})]),v(n(za),N(d("workflowOverview"),{"data-section-intersect":"dark"}),null,16),v(n(Xe),N(d("lowerTagline"),{"data-section-intersect":"dark"}),null,16)])]),v(n(Ye))])}}},Da=V(Fa,[["__scopeId","data-v-8bba1744"]]),Va=`
	_type == "intro" => {
		title,
		${K()},
	}
`,Ua=`
	_type == "collectionsCta" => {
		smallTagline,
		scrollLabel,
		collections[]{
			collection->{
				name,
				"icon": icon.asset->.url,
				catalogue {
					"file": file.asset->.url,
					smallTitle,
					${Re("catalogueCover")},
				}
			},
			title,
			${K()},

			globalCta{
				label,
				"link": link[0]{
					_type,
					url,
					"document": ^.link[0]->._type,
					"slug": "/" + ^.link[0]->metadata.slug.current,
					"category": ^.link[0]->.presentation.category->.slug.current,
					"lang":  ^.link[0]->.lang,
				}
			}

		},
	}
`,Na=`
	_type == "companyHighlight" => {
		label,
		${K()},
		title,
		recentArticles[]->{
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
				${K()}
			}

		},
	}
`,Ga=`
	_type == "featuredProducts" => {
		products[]->{
			...,
			"sections": sections[]{
				_type == "productDetails" => {
					title,

					"mainImage": modelObjectRef->mainImage{
						...${le()}
					},

				},
			},
			"productSetup": productSetup{
					"collection": collection->{
						name,
						"slug":slug.current,
						icon {
							...${le()}
						},
						featuredImage {
							...${le()}
						},
						subCategories[]->{
							name
						}
					},

					"subCollection": subCollection->,

					availableColors[]->{
						...,
						image{
							...${le()}
						},
					},
					availableMaterials[]->{
						...,
						image{
							...${le()}
						},
					},
					availableSizes[]{
						name,
						label,
						dimensions,
						technicalImage {
							...${le()}
						},
					},
				}
		},
	}
`;function Wa(o="pt"){return`
	_type == "collectionsOverview" => {
		title,
		collections[]{
			collectionRef->{
				_id,
				name,
				icon,
				'slug':slug.current,
				"count": count(*[
					_type == "page.product"
					&& !(_id in path("drafts.**"))
					&& productSetup.collection._ref == ^._id
					&& lang == '${o}'
				])
			},
			${K()},
		}
	}
`}const Ya=`
	_type == "leadershipHighlight" => {
		author {
			${K()},
			name,
			role,
		},
		description,
		quote,
		button {
			label,
			"slug": page->{
				"slug": metadata.slug.current
			}.slug
		},
		${K()},
	}
`,Xa=`
	_type == "workflowOverview" => {
		workflow[]{
			${K()},
			title,
			description,
		}
	}
`,Qa=`
	_type == "lowerTagline" => {
     	title,
    }
`;function Ka(o="pt"){return ze`
	*[_type == 'page.home' && !(_id in path("drafts.**")) && lang == '${o}'][0] {
		_type,
		"metadata": metadata{...${Oe()}},
		"sections": sections[] {
			_type,
			${Va},
			${Ua},
			${Na},
			${Ga},
			${Wa(o)},
			${Ya},
			${Xa},
			${Qa},
		},
	}
	`}const Za={__name:"index",async setup(o){var C,E;let r,h;const{locales:d,locale:c,setLocale:g}=He(),f=Ka(c.value),{data:p,error:a}=([r,h]=Me(()=>Ve(f)),r=await r,h(),r);if(console.log(p),console.log(p),a.value)throw he({statusCode:((C=a.value)==null?void 0:C.statusCode)||500,statusMessage:((E=a.value)==null?void 0:E.message)||"An error occurred"});if(!p.value)throw he({statusCode:404,statusMessage:"Page not found"});Ge(p.value.metadata,c);const{onEnter:b,onLeave:_}=Fe();return je({bodyAttrs:{class:p.value.metadata.slug.current}}),($,m)=>(u(),O(n(De),{slug:n(p).metadata.slug,name:n(p).metadata.name,metadata:n(p).metadata,"transition-enter":n(b),"transition-leave":n(_)},{default:D(()=>[v(n(Da),Ue(Ne(n(p))),null,16)]),_:1},8,["slug","name","metadata","transition-enter","transition-leave"]))}},no=V(Za,[["__scopeId","data-v-0954f11e"]]);export{no as default};
