const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DG7fYD9o.js","./BL6O4IjF.js","./entry.CGK2sg1U.css","./HDMkL_YV.js","./ModelView.CQYqBZLo.css"])))=>i.map(i=>d[i]);
import{_ as G,p as X,m as ne,P as ge,w as Q,q as J,j as I,o as s,a as b,b as W,c as o,k as p,n as pe,x,d as l,t as k,u as i,a9 as se,Q as be,I as ye,r as M,aC as _e,T as we,y as ke,aD as Ce,aE as re,aF as Be,aG as xe,h as Z,v as $e,F as P,A as q,ah as de,e as D,aH as Ae,aI as Se,aJ as Pe,a7 as ce,ao as Ie,a6 as Le,S as Oe,ag as Me,ac as Re,s as E,az as ze,B as oe,G as Te,H as Fe,J as qe,R as ue,V as je,M as Ve,O as De,ar as Ne,ay as Ee,af as He,N as K,au as We,K as le,X as Ue,ab as R,Y as ve,$ as Ze,a0 as Ge,ad as Ye,W as Je,a1 as Ke,a2 as Qe,a3 as Xe,a4 as et,a5 as tt}from"./BL6O4IjF.js";import{u as at}from"./DYyzkNkO.js";import{P as st}from"./BF4WLTFl.js";import{F as it}from"./NIufRzW5.js";import{P as lt}from"./CwSMczxQ.js";const nt={class:"message"},ot={class:"-body-small-semibold label"},ct=["aria-label"],rt={key:0,class:"timer","aria-hidden":"true"},dt={__name:"AddedToWishlist",props:{visible:{type:Boolean,default:!1},title:{type:[Boolean,String],default:!1},actionLabel:{type:[Boolean,String],default:!1},actionTo:{type:[Boolean,String,Object],default:"wishlist"},duration:{type:Number,default:5e3},autoClose:{type:Boolean,default:!0},showTimer:{type:Boolean,default:!0},closeLabel:{type:String,default:"Close"}},emits:["close","timeout"],setup(e,{emit:n}){const h=e,d=n,y=X(),B=ne(),c=ge(),g=x(()=>typeof h.title=="string"?h.title:y("itemSaved","Item saved!")),u=x(()=>typeof h.actionLabel=="string"?h.actionLabel:y("viewMyList","View my list")),t=x(()=>h.showTimer&&h.duration>0),a=x(()=>({"--timer-duration":`${Math.max(h.duration,0)}ms`})),r=x(()=>c.width<=ke.sm),m=M(0);let f=null;const _=()=>{f&&(clearTimeout(f),f=null)},w=()=>{_(),t.value&&(m.value+=1),!(!h.autoClose||h.duration<=0)&&(f=setTimeout(()=>{d("timeout"),d("close","timeout")},h.duration))},L=()=>{d("close","manual")},T=()=>{B.emit("wishlist-counter-play")};return Q(()=>h.visible,C=>{C?w():_()},{immediate:!0}),Q(()=>h.duration,()=>{h.visible&&w()}),J(()=>{_()}),(C,A)=>(s(),I(we,{to:"body",disabled:!r.value},[b(_e,{name:"wishlist-notice",onAfterLeave:T},{default:W(()=>[e.visible?(s(),o("div",{key:0,"data-component":"added-to-wishlist",style:pe(a.value),role:"status","aria-live":"polite"},[l("div",nt,[l("span",ot,k(g.value),1),u.value&&e.actionTo?(s(),I(i(se),{key:0,class:"-body-small-semibold action",to:e.actionTo,title:!1},{default:W(()=>[be(k(u.value),1)]),_:1},8,["to"])):p("",!0)]),l("button",{class:"close-btn",type:"button","aria-label":e.closeLabel,onClick:L},[b(i(ye),{slug:"close",size:"large"})],8,ct),t.value?(s(),o("span",rt,[(s(),o("span",{key:m.value,class:"timer-fill"}))])):p("",!0)],4)):p("",!0)]),_:1})],8,["disabled"]))}},ut=G(dt,[["__scopeId","data-v-9cce6942"]]),ae=Math.PI,Y=.5*ae,me=(e,n)=>Math.hypot(n[0]-e[0],n[1]-e[1]),he=(e,n)=>{const{x:h,y:d,width:y,height:B}=e.getBoundingClientRect(),c={x:h,y:d,width:y,height:B},g=[...n].map(u=>{const t=u.getBoundingClientRect();return{x:t.x-c.x,y:t.y-c.y,width:t.width,height:t.height,r:.34*t.height}});return[c,g]},mt=(e,n,h,d)=>{const y={x:0,y:0,width:0,height:0,r:0,index:h,pathString:"",node:e.querySelector(`[data-meta-row-rect="${h}"]`),clipNode:d?e.querySelector(`[data-meta-row-rect-clip="${h}"]`):null},B={set(c,g,u){const t=c[g];if(c[g]=u,u===t)return!0;const a=Ce(c.x,c.y,c.width,c.height,c.r);return c.pathString===a||(c.pathString=a,c.node.setAttribute("d",a),c.clipNode&&c.clipNode.setAttribute("d",a)),!0}};return Object.keys(n).forEach(c=>B.set(y,c,n[c])),new Proxy(y,B)},ht=1,ft=(e,n)=>{const h=[];for(let d=0,y=e.length-1;d<y;d++){const B=e[d].y+e[d].height*.5,c=e[d+1].y+e[d+1].height*.5,g=B<c?d:d+1,u=g===d?d+1:d,t={...e[g]};t.radius=t.width*.5,t.center=[t.x+t.radius,t.y+t.height-t.radius];const a={...e[u]};a.radius=a.width*.5,a.center=[a.x+a.radius,a.y+a.radius];const r=me(t.center,a.center),m=t.radius+a.radius;if(t.width<=0||t.height<=0||a.width<=0||a.height<=0||r>n+t.radius+a.radius||r<=Math.abs(t.radius-a.radius))continue;const f=Be(r,0,n+t.radius+a.radius*.9,.1,.4);t.u=r<m?Math.acos((Math.pow(t.radius,2)+Math.pow(r,2)-Math.pow(a.radius,2))/(2*t.radius*r)):0,a.u=r<m?Math.acos((Math.pow(a.radius,2)+Math.pow(r,2)-Math.pow(t.radius,2))/(2*a.radius*r)):0,t.angle=Math.atan((a.center[1]-t.center[1])/(a.center[0]-t.center[0])),a.angle=Math.acos((t.radius-a.radius)/r),t.angleA=t.angle+t.u+(a.angle-t.u)*f,t.angleB=t.angle-t.u-(a.angle-t.u)*f,a.angleA=t.angle+ae-a.u-(ae-a.u-a.angle)*f,a.angleB=t.angle-ae+a.u+(ae-a.u-a.angle)*f,t.attatchPosA=[t.center[0]+t.radius*Math.cos(t.angleA),t.center[1]+t.radius*Math.sin(t.angleA)+2.5],t.attatchPosB=[t.center[0]+t.radius*Math.cos(t.angleB),t.center[1]+t.radius*Math.sin(t.angleB)+2.5],a.attatchPosA=[a.center[0]+a.radius*Math.cos(a.angleA),a.center[1]+a.radius*Math.sin(a.angleA)-2.6],a.attatchPosB=[a.center[0]+a.radius*Math.cos(a.angleB),a.center[1]+a.radius*Math.sin(a.angleB)-2.6];const w=Math.min(f*ht,me(t.attatchPosA,a.attatchPosA)/m)*Math.min(1,r*2/m);t.radiusB=t.radius*w,a.radiusB=a.radius*w,t.attatchPosA_handle=[t.attatchPosA[0]+t.radiusB*Math.cos(t.angleA-Y),t.attatchPosA[1]+t.radiusB*Math.sin(t.angleA-Y)],a.attatchPosA_handle=[a.attatchPosA[0]+a.radiusB*Math.cos(a.angleA+Y),a.attatchPosA[1]+a.radiusB*Math.sin(a.angleA+Y)],a.attatchPosB_handle=[a.attatchPosB[0]+a.radiusB*Math.cos(a.angleB-Y),a.attatchPosB[1]+a.radiusB*Math.sin(a.angleB-Y)],t.attatchPosB_handle=[t.attatchPosB[0]+t.radiusB*Math.cos(t.angleB+Y),t.attatchPosB[1]+t.radiusB*Math.sin(t.angleB+Y)],h.push(`
			M${t.attatchPosA.join(" ")}
			${re(t.attatchPosA_handle,a.attatchPosA_handle,a.attatchPosA)}
			L${a.attatchPosB.join(" ")}
			${re(a.attatchPosB_handle,t.attatchPosB_handle,t.attatchPosB)}
			Z
		`)}return h},gt=(e,n,h,d,{mirrorToClip:y=!1,bridgeOffset:B=0}={})=>{const c=n.querySelector("[data-meta-row-shape-bridges]"),g=y?n.querySelector("[data-meta-row-shape-bridges-clip]"):null;let[u,t]=he(e,h),a=B;const r=(C,A,H,U)=>{n.setAttribute("viewBox",`${C} ${A} ${H} ${U}`)},m=()=>{if(!L)return;const A=ft(L,d).join(" ").replace(/\s\s+/g," ");c.setAttribute("d",A),g&&g.setAttribute("d",A)},f=()=>{t.forEach((C,A)=>{L[A].x=C.x+a,L[A].y=C.y,L[A].width=C.width,L[A].height=C.height})},_=()=>{[u,t]=he(e,h),r(0,0,u.width,u.height),f(),m()},w=(C,A,H,U,ee=!0)=>{const N=(F,V)=>typeof F=="number"?F:typeof F=="function"?F(V):V,O=N(C,0),S=N(A,0),$=N(H,u.width),j=N(U,u.height);r(O,S,$,j),ee&&(u.width=$,u.height=j)},L=t.map((C,A)=>mt(n,C,A,y));return r(0,0,u.width,u.height),f(),m(),{rects:L,nodeBounds:t,update:_,overrideViewBox:w,setBridgeOffset:C=>{a=C,f(),m()}}},pt=["data-meta-row-rect"],yt={__name:"MetaRowVertical",props:{gap:{type:[String,Number],default:0},detatchDistance:{type:Number,default:30},bridgeOffset:{type:Number,default:0},as:{type:String,default:"div"},className:{type:String,default:""}},setup(e){const n=e,h=xe(),d=M(null),y=M(null),B=x(()=>{if(n.detatchDistance!=null)return n.detatchDistance;const u=n.gap;return(typeof u=="number"?u:parseFloat(u)||0)*2}),c=u=>{const t=[],a=r=>{for(const m of r||[])if(m){if(Array.isArray(m)){a(m);continue}if(m.type===P&&Array.isArray(m.children)){a(m.children);continue}m.type===Se||m.type===Pe||t.push(m)}};return a(u),t},g=x(()=>{const u=h.default?h.default():[];return c(u).map((a,r)=>Ae(a,{"data-meta-row-node":r,key:a.key??r}))});return Z(()=>{let u;const t=()=>{const a=Array.from(d.value.children).filter(r=>!r.hasAttribute("data-meta-row-shape"));u=gt(d.value,y.value,a,B.value,{mirrorToClip:!!n.hasGradient,bridgeOffset:n.bridgeOffset})};$e(()=>{t(),new ResizeObserver(()=>{u&&u.update()}).observe(d.value),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{u&&u.update()}),Q(()=>[n.gap,B.value,g.value.length],()=>{u&&u.update()}),Q(()=>n.bridgeOffset,r=>{u&&u.setBridgeOffset(r)}),Q(()=>n.hasGradient,()=>{t()})})}),(u,t)=>(s(),I(de(e.as),{ref_key:"containerRef",ref:d,class:D(["meta-row-container",e.className]),style:pe({"--gap":typeof e.gap=="string"?e.gap:e.gap+"px"})},{default:W(()=>[(s(),o("svg",{ref_key:"svgRef",ref:y,viewBox:"0 0 1 1","data-meta-row-shape":""},[t[0]||(t[0]=l("path",{"data-meta-row-shape-bridges":""},null,-1)),(s(!0),o(P,null,q(g.value,(a,r)=>(s(),o("path",{key:r,"data-meta-row-rect":r,d:""},null,8,pt))),128))],512)),(s(!0),o(P,null,q(g.value,(a,r)=>(s(),I(de(a),{key:a.key??r}))),128))]),_:1},8,["class","style"]))}},vt=G(yt,[["__scopeId","data-v-f1b757fe"]]),bt={key:0,class:"unique-size"},_t={class:"drawings-wrapper"},wt={class:"-body-smaller-medium no-spacer"},kt={class:"drawings-wrapper switch"},Ct={class:"sizes-wrapper"},Bt={class:"sizes"},xt=["onClick"],$t={class:"-body-smaller-medium no-spacer"},At={__name:"TechnicalDrawing",props:{uniqueSize:{type:[Boolean,Object],default:!1},availableSizes:{type:[Boolean,Object],default:!1}},setup(e){const n=M(null),h=M(0),d=X();return J(()=>{}),Z(()=>{}),(y,B)=>{var g;const c=ce;return s(),o("div",{ref_key:"el",ref:n,"data-component":"technical-drawing"},[e.uniqueSize?(s(),o("div",bt,[l("div",_t,[(g=e.uniqueSize)!=null&&g.technicalImage?(s(),I(c,{key:0,provider:"ipx",src:e.uniqueSize.technicalImage.url,class:"image"},null,8,["src"])):p("",!0)]),l("p",wt,k(i(d)("specs","Specs"))+" ↓",1)])):(s(),o(P,{key:1},[l("div",kt,[(s(!0),o(P,null,q(e.availableSizes,(u,t)=>{var a;return s(),o(P,null,[(a=u==null?void 0:u.technicalImage)!=null&&a.url?(s(),I(c,{key:t,provider:"ipx",src:u.technicalImage.url,class:D(["image",{active:t===i(h)}])},null,8,["src","class"])):p("",!0)],64)}),256))]),l("div",Ct,[l("div",Bt,[(s(!0),o(P,null,q(e.availableSizes,(u,t)=>(s(),o("span",{key:t,onClick:a=>h.value=t},[l("p",{class:D(["label",{active:i(h)===t}])},k(u.label),3)],8,xt))),128))]),l("p",$t,k(i(d)("specs","Specs"))+" ↓",1)])],64))],512)}}},St=G(At,[["__scopeId","data-v-a7da4d3c"]]),ie={__name:"ProductDetailsLink",props:{to:{type:[Boolean,String,Object],default:!1},href:{type:[Boolean,String],default:!1},title:{type:[Boolean,String],default:!1},fileUrl:{type:[Boolean,String],default:!1},mark:{type:[Boolean,Object],default:!1},value:{type:[Boolean,Object],default:!1}},setup(e){const n=e,h=x(()=>n.value||n.mark||{}),d=x(()=>{var c;return n.to||((c=h.value)==null?void 0:c.to)||!1}),y=x(()=>{var c,g;return n.href||n.fileUrl||((c=h.value)==null?void 0:c.href)||((g=h.value)==null?void 0:g.fileUrl)||!1}),B=x(()=>{var c;return n.title||((c=h.value)==null?void 0:c.title)||!1});return(c,g)=>(s(),I(i(se),{class:"product-details-link",to:i(d),href:i(y),title:i(B),target:!0},{default:W(()=>[l("span",null,[Ie(c.$slots,"default")]),g[0]||(g[0]=l("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[l("g",{"clip-path":"url(#clip0_12265_12940)"},[l("path",{d:"M11.8737 11.3675L13.3208 9.92041L12.5197 3.46756L6.08003 2.67964L4.63296 4.1267L8.73032 4.59275C9.10516 4.63995 9.3185 4.71677 9.46358 4.86185C9.64822 5.0465 9.63041 5.30171 9.39833 5.53379L2.94116 11.991L4.00947 13.0593L10.4666 6.6021C10.6987 6.37003 10.9407 6.33902 11.1386 6.53686C11.2705 6.66875 11.3473 6.88208 11.3945 7.25693L11.8737 11.3675Z",fill:"#241F21"})]),l("defs",null,[l("clipPath",{id:"clip0_12265_12940"},[l("rect",{width:"16",height:"16",fill:"white"})])])],-1))]),_:3},8,["to","href","title"]))}},Pt={class:"g-row"},It={class:"g-col xxl-12 sm-24"},Lt={class:"g-col xxl-12 sm-24 content-description"},Ot={class:"height-wrapper"},Mt={class:"top-wrapper"},Rt={class:"tags"},zt={class:"-caption-medium"},Tt={class:"-title-2-medium title"},Ft={class:"description"},qt={class:"label -body-small-medium"},jt={class:"-title-7-medium text"},Vt={class:"selectors-wrapper"},Dt={class:"technical-drawing-wrapper"},Nt={class:"specifications"},Et={key:0,class:"single-specification"},Ht={class:"-body-small-medium main-label"},Wt={key:0,class:"label"},Ut={key:1,class:"label label--spacer","aria-hidden":"true"},Zt={class:"-body-medium"},Gt={key:1,class:"single-specification"},Yt={class:"-body-small-medium main-label"},Jt={class:"references sizes-list"},Kt={key:0,class:"label"},Qt={key:1,class:"label label--spacer","aria-hidden":"true"},Xt={class:"-body-medium"},ea={key:2,class:"single-specification"},ta={class:"-body-small-medium main-label"},aa={class:"references material-list two-col"},sa={class:"-body-medium"},ia={key:3,class:"single-specification"},la={class:"-body-small-medium main-label"},na={class:"references colors-list two-col"},oa={class:"content-wrapper color"},ca={key:1,width:"21",height:"20",viewBox:"0 0 21 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},ra=["fill"],da={class:"-body-medium"},ua={key:4,class:"single-specification"},ma={class:"-body-small-medium main-label"},ha={class:"references material-list two-col"},fa={class:"-body-medium"},ga={key:5,class:"single-specification"},pa={class:"-body-small-medium main-label"},ya={class:"references colors-list two-col"},va={class:"content-wrapper color"},ba={key:1,width:"21",height:"20",viewBox:"0 0 21 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},_a=["fill"],wa={class:"-body-medium"},ka={class:"-body-small-medium main-label"},Ca={key:0,class:"-body-medium"},Ba={key:6,class:"single-specification product-references-row"},xa={class:"-body-small-medium main-label"},$a={class:"-body-medium blocks product-references-content"},Aa={class:"-body-small-medium main-label"},Sa={class:"-body-medium blocks"},Pa=Object.assign({name:"ProductDetails"},{__name:"ProductDetails",props:{title:{type:[Boolean,String],default:!1},description:{type:[Boolean,String],default:!1},mainImage:{type:[Boolean,Object],default:!1},productImages:{type:[Boolean,Object],default:!1},additionalSpecifications:{type:[Boolean,Array],default:!1},productReferences:{type:[Boolean,Object],default:!1},additionalLinks:{type:[Boolean,Array],default:!1},modelFile:{type:[Boolean,String,Object],default:!1},modelObjectRef:{type:[Boolean,String,Object],default:!1},availableSizes:{type:[Boolean,Object],default:!1},structureOptions:{type:[Boolean,Object],default:!1},availableColors:{type:[Boolean,Object],default:!1},displayOptions:{type:[Boolean,Object],default:!1},availableHPLColors:{type:[Boolean,Object],default:!1},uniqueSize:{type:[Boolean,Object],default:!1},collection:{type:[Boolean,Object],default:!1},subCollection:{type:[Boolean,Object],default:!1},metadata:{type:[Boolean,Object],default:!1}},setup(e){const n=e,h={marks:{link:ie,href:ie,internalLink:ie,fileLink:ie}},d=X(),y=ne();ge();const B=M(null),c=M(null),g=M(!1),u=M(!1),t=x(()=>n.availableSizes||(n.uniqueSize?[n.uniqueSize]:[])),a=x(()=>t.value.length>0),r=x(()=>n.availableSizes&&n.availableSizes.some($=>$.printingArea)||!!n.uniqueSize&&!!n.uniqueSize.printingArea),m=x(()=>[...n.additionalSpecifications||[]]),f=x(()=>[...n.additionalLinks||[]]),_=x(()=>{var $;return Array.isArray(($=n.productReferences)==null?void 0:$.references)?n.productReferences.references:[]}),w=x(()=>_.value.length>0),L=x(()=>{var $;return(($=n.productReferences)==null?void 0:$.title)||d("references","References")}),T=x(()=>{var $,j;return(($=n.productReferences)==null?void 0:$.buttonLabel)||((j=n.productReferences)==null?void 0:j.title)||d("references","References")}),{hasItem:C}=Re(),A=x(()=>{var $,j;return(($=n==null?void 0:n.metadata)==null?void 0:$.slug)||((j=n==null?void 0:n.metadata)==null?void 0:j.slug)||null}),H=x(()=>u.value&&A.value?C(A.value):!1);function U(){y.emit("product-options-open",{...n,modalMode:"options"})}function ee(){w.value&&y.emit("product-options-open",{modalMode:"references",references:_.value,referencesTitle:L.value})}let N=null;const O=()=>{N&&(clearTimeout(N),N=null),g.value&&(g.value=!1),N=setTimeout(()=>{g.value=!0,N=null},500)};let S=null;return Z(()=>{u.value=!0,S=y.on("wishlist-notice-open",()=>{O()})}),J(()=>{S&&S(),N&&clearTimeout(N)}),($,j)=>{const F=ce,V=Me;return s(),o("header",{ref_key:"rootEl",ref:B,"data-component":"product-details"},[l("div",Pt,[l("div",It,[l("div",{ref_key:"mediaEl",ref:c,class:"media-wrapper"},[e.productImages||e.mainImage?(s(),I(i(Za),{key:0,productImages:e.productImages,mainImage:e.mainImage,modelFile:e.modelFile,collection:e.collection},null,8,["productImages","mainImage","modelFile","collection"])):p("",!0)],512)]),l("div",Lt,[l("div",Ot,[l("div",Mt,[l("div",Rt,[e.collection?(s(),I(i(se),{key:0,to:{name:"products-category",params:{category:e.collection.slug.current}}},{default:W(()=>[b(i(Le),{collection:e.collection,type:"product",size:"large"},null,8,["collection"])]),_:1},8,["to"])):p("",!0),i(H)?(s(),I(i(se),{key:1,to:{name:"wishlist"},class:"saved"},{default:W(()=>[l("p",zt,k(i(d)("savedToWishlist")),1)]),_:1})):p("",!0)]),l("h1",Tt,k(e.title),1),l("div",Ft,[l("span",qt,k(i(d)("whatIsIt","O que é")),1),l("p",jt,k(e.description),1)]),l("div",Vt,[b(i(Oe),{label:i(d)("addToWishlisht"),theme:"dark",icon:"bookmark-empty",onClick:U},null,8,["label"]),b(i(ut),{visible:i(g),onClose:j[0]||(j[0]=()=>g.value=!1)},null,8,["visible"])])]),l("div",Dt,[e.availableSizes||e.uniqueSize?(s(),I(St,{key:0,availableSizes:e.availableSizes,uniqueSize:e.uniqueSize},null,8,["availableSizes","uniqueSize"])):p("",!0)])]),l("div",Nt,[i(a)?(s(),o("div",Et,[l("p",Ht,k(i(d)("dimensions","Dimensões")),1),l("div",{class:D(["references sizes-list",e.uniqueSize?"single-sizing":""])},[(s(!0),o(P,null,q(i(t),(v,z)=>(s(),o("div",{class:"list",key:z},[e.uniqueSize?(s(),o("p",Ut)):(s(),o("p",Wt,k(v.label),1)),l("p",Zt,k(v.dimensions),1)]))),128))],2)])):p("",!0),i(r)?(s(),o("div",Gt,[l("p",Yt,k(i(d)("printingArea","Area de Impressão")),1),l("div",Jt,[(s(!0),o(P,null,q(i(t),(v,z)=>(s(),o("div",{class:"list",key:z},[e.uniqueSize?(s(),o("p",Qt)):(s(),o("p",Kt,k(v.label),1)),l("p",Xt,k(v.printingArea),1)]))),128))])])):p("",!0),e.structureOptions?(s(),o("div",ea,[l("p",ta,k(i(d)("structureOptions","Structure Options")),1),l("div",aa,[(s(!0),o(P,null,q(e.structureOptions,(v,z)=>(s(),o("div",{class:"list",key:z},[b(F,{provider:"ipx",src:v.image.url},null,8,["src"]),l("p",sa,k(v.name),1)]))),128))])])):p("",!0),e.availableColors?(s(),o("div",ia,[l("p",la,k(i(d)("structureColors","Structure Colors")),1),l("div",na,[(s(!0),o(P,null,q(e.availableColors,(v,z)=>{var te;return s(),o("div",{class:"list",key:z},[l("div",oa,[(te=v==null?void 0:v.image)!=null&&te.url?(s(),I(F,{key:0,provider:"ipx",src:v.image.url,alt:"Color Image"},null,8,["src"])):(s(),o("svg",ca,[l("circle",{cx:"10.7344",cy:"10",r:"10",fill:v.colorValue.value},null,8,ra)]))]),l("p",da,k(v.name),1)])}),128))])])):p("",!0),e.displayOptions?(s(),o("div",ua,[l("p",ma,k(i(d)("displayOptions","Display Options")),1),l("div",ha,[(s(!0),o(P,null,q(e.displayOptions,(v,z)=>(s(),o("div",{class:"list",key:z},[b(F,{provider:"ipx",src:v.image.url},null,8,["src"]),l("p",fa,k(v.name),1)]))),128))])])):p("",!0),e.availableHPLColors?(s(),o("div",ga,[l("p",pa,k(i(d)("HPLColors","HPL+ Colors")),1),l("div",ya,[(s(!0),o(P,null,q(e.availableHPLColors,(v,z)=>{var te;return s(),o("div",{class:"list",key:z},[l("div",va,[(te=v==null?void 0:v.image)!=null&&te.url?(s(),I(F,{key:0,provider:"ipx",src:v.image.url},null,8,["src"])):(s(),o("svg",ba,[l("circle",{cx:"10.7344",cy:"10",r:"10",fill:v.colorValue.value},null,8,_a)]))]),l("p",wa,k(v.name),1)])}),128))])])):p("",!0),(s(!0),o(P,null,q(i(m),(v,z)=>(s(),o("div",{class:"single-specification",key:z},[l("p",ka,k(v.specification),1),v.details?(s(),o("p",Ca,k(v.details),1)):p("",!0)]))),128)),i(w)?(s(),o("div",Ba,[l("p",xa,k(i(L)),1),l("div",$a,[l("button",{type:"button",class:"-body-medium product-references-trigger",onClick:ee},[l("span",null,k(i(T)),1),b(i(ye),{class:"icon",slug:"arrow-right",size:"medium"})])])])):p("",!0),(s(!0),o(P,null,q(i(f),(v,z)=>(s(),o("div",{class:"single-specification",key:z},[l("p",Aa,k(v.title),1),l("div",Sa,[v.details?(s(),I(V,{key:0,blocks:v.details,serializers:h},null,8,["blocks"])):p("",!0)])]))),128))])])])],512)}}}),Ia=G(Pa,[["__scopeId","data-v-fb441979"]]),La={class:"g-row"},Oa={class:"g-col xxl-24"},Ma={key:0,class:"-body-big-medium"},Ra={class:"g-col xxl-12 xs-24 left"},za={class:"g-col xxl-12 xs-24 right"},Ta={class:"g-col xxl-12 xs-24 left"},Fa={class:"g-col xxl-12 xs-24 right"},qa={__name:"InTheField",props:{title:{type:[Boolean,String],default:!1},images:{type:[Boolean,Array],default:!1},mediaAsset:{type:[Boolean,Array],default:!1}},setup(e){const n=e,h=M(null),d=x(()=>{switch(n.mediaAsset.length){case 2:return"-layout-2";case 3:return"-layout-3";case 4:return"-layout-4";case 5:return"-layout-5"}});return J(()=>{}),Z(()=>{}),(y,B)=>(s(),o("section",{ref_key:"el",ref:h,"data-component":"in-the-field"},[l("div",La,[l("div",Oa,[e.title?(s(),o("p",Ma,k(e.title),1)):p("",!0)])]),e.mediaAsset.length?(s(),o("div",{key:0,class:D(["g-row image-grid",i(d)])},[e.mediaAsset.length===2?(s(),o(P,{key:0},[l("div",{class:D(["g-col xxl-12 left",i(d)])},[b(i(E),{media:[e.mediaAsset[0]]},null,8,["media"])],2),l("div",{class:D(["g-col xxl-12 right",i(d)])},[b(i(E),{media:[e.mediaAsset[1]]},null,8,["media"])],2)],64)):p("",!0),e.mediaAsset.length===3?(s(),o(P,{key:1},[l("div",{class:D(["g-col xxl-12 xs-24 left",i(d)])},[b(i(E),{media:[e.mediaAsset[0]]},null,8,["media"]),b(i(E),{media:[e.mediaAsset[2]]},null,8,["media"])],2),l("div",{class:D(["g-col xxl-12 xs-24 right",i(d)])},[b(i(E),{media:[e.mediaAsset[1]]},null,8,["media"])],2)],64)):p("",!0),e.mediaAsset.length===4?(s(),o(P,{key:2},[l("div",Ra,[b(i(E),{media:[e.mediaAsset[0]]},null,8,["media"]),b(i(E),{media:[e.mediaAsset[2]]},null,8,["media"]),b(i(E),{media:[e.mediaAsset[3]]},null,8,["media"])]),l("div",za,[b(i(E),{media:[e.mediaAsset[1]]},null,8,["media"])])],64)):p("",!0),e.mediaAsset.length===5?(s(),o(P,{key:3},[l("div",Ta,[b(i(E),{media:[e.mediaAsset[0]]},null,8,["media"]),b(i(E),{media:[e.mediaAsset[3]]},null,8,["media"]),b(i(E),{media:[e.mediaAsset[4]]},null,8,["media"])]),l("div",Fa,[b(i(E),{media:[e.mediaAsset[1]]},null,8,["media"]),b(i(E),{media:[e.mediaAsset[2]]},null,8,["media"])])],64)):p("",!0)],2)):p("",!0)],512))}},ja=G(qa,[["__scopeId","data-v-f0546160"]]),Va={key:0,class:"side-navigation"},Da={class:"inner"},Na={key:0,width:"25",height:"24",viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Ea=["onClick"],Ha={class:"inner"},Wa={key:1,class:"arrow-navigation"},Ua={__name:"ProductMedia",props:{mainImage:{type:[Boolean,Object],default:!1},productImages:{type:[Boolean,Object],default:!1},modelFile:{type:[Boolean,String,Object],default:!1},collection:{type:[Boolean,String,Object],default:!1}},setup(e){const n=Te(()=>De(()=>import("./DG7fYD9o.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),h=e,d=ne(),y=X(),{productFilter:B}=ze(),c=Ne(),g=x(()=>{var O,S;return((S=(O=B.value)==null?void 0:O.collections)==null?void 0:S[0])||""}),u=x(()=>{var $,j,F;if(!g.value)return null;const O=($=c.public)==null?void 0:$.AVAILABLE_PRODUCTS;if(!Array.isArray(O))return null;const S=O.find(V=>{var v,z;return((z=(v=V==null?void 0:V.productSetup)==null?void 0:v.collection)==null?void 0:z.name)===g.value});return((F=(j=S==null?void 0:S.productSetup)==null?void 0:j.collection)==null?void 0:F.slug)||null}),t=x(()=>u.value?{name:"products-category",params:{category:u.value}}:{name:"products"}),a=M(null),r=M(null),m=M(null),f=M(0);Q(f,O=>{m.value.forEach((S,$)=>{S.style.display="none",$===O&&(S.style.display="flex")})});const _=()=>{const O=r.value.querySelectorAll(".image").length;f.value=(f.value-1+O)%O},w=()=>{const O=r.value.querySelectorAll(".image").length;f.value=(f.value+1)%O},L=O=>{f.value=O};Z(()=>{m.value=r.value.querySelectorAll(".image")});const T=M(),C=M(),A=M(),H=M(!1),U=M(!1),ee=()=>{U.value&&(H.value=!0)};d.on("model-view-ready",()=>{U.value=!0});const N=O=>{T.value.dispatchEvent(new PointerEvent("pointerdown",O))};return Z(()=>{h.modelFile&&C.value.addEventListener("pointerdown",N,{capture:!0,passive:!0})}),J(()=>{d.off("model-view-ready"),h.modelFile&&C.value.removeEventListener("pointerdown",N)}),(O,S)=>{const $=ce,j=Fe;return s(),o("div",{ref_key:"el",ref:a,"data-component":"product-media"},[b(i(oe),{theme:"outline",icon:"arrow-left",label:i(y)("products"),to:i(t),class:"go-back-btn"},null,8,["label","to"]),e.productImages?(s(),o("div",Va,[l("div",Da,[e.mainImage?(s(),o("div",{key:0,class:D(["model-image image",{active:i(f)===0}]),onClick:S[0]||(S[0]=F=>L(0))},[b($,{provider:"ipx",src:e.mainImage.url},null,8,["src"]),e.modelFile?(s(),o("svg",Na,[...S[1]||(S[1]=[l("path",{d:"M12.8682 7C7.34816 7 2.86816 9.24 2.86816 12C2.86816 14.24 5.80816 16.13 9.86816 16.77V18.79C9.86816 19.24 10.4082 19.46 10.7182 19.14L13.5082 16.35C13.7082 16.15 13.7082 15.84 13.5082 15.64L10.7182 12.85C10.4082 12.54 9.86816 12.76 9.86816 13.21V14.73C6.71816 14.17 4.86816 12.83 4.86816 12C4.86816 10.94 7.90816 9 12.8682 9C17.8282 9 20.8682 10.94 20.8682 12C20.8682 12.66 19.6682 13.68 17.5482 14.34C17.1382 14.47 16.8682 14.85 16.8682 15.28C16.8682 15.95 17.5182 16.44 18.1482 16.24C20.9782 15.36 22.8682 13.79 22.8682 12C22.8682 9.24 18.3882 7 12.8682 7Z",fill:"white"},null,-1)])])):p("",!0)],2)):p("",!0),e.productImages?(s(!0),o(P,{key:1},q(e.productImages.images,(F,V)=>(s(),o("div",{class:D(["image",{active:i(f)===(e.mainImage?V+1:V)}]),key:V,onClick:v=>L(e.mainImage?V+1:V)},[b($,{provider:"ipx",src:F.url},null,8,["src"])],10,Ea))),128)):p("",!0)])])):p("",!0),l("div",{ref_key:"displayContainer",ref:r,class:"display-container"},[l("div",Ha,[e.mainImage?(s(),o("div",{key:0,class:"image main-image",onPointerdown:ee,ref_key:"modelViewerMouseTargetRef",ref:T},[b(j,null,{default:W(()=>[e.modelFile?(s(),I(i(n),{key:0,model:e.modelFile,mouseTargetRef:i(T),zoomButtonsRef:i(A)},null,8,["model","mouseTargetRef","zoomButtonsRef"])):p("",!0)]),_:1}),e.modelFile?(s(),o("div",{key:0,class:D(["model-view-bt",{enter:i(U),active:i(H)}]),ref_key:"modelViewerRotationIndicatorBtRef",ref:C},[...S[2]||(S[2]=[qe('<span class="bg" data-v-d19724b1></span><svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d19724b1><path fill-rule="evenodd" clip-rule="evenodd" d="M50.0689 59.5018C50.0689 58.7376 50.7971 57.6599 52.8836 56.7035C54.8654 55.7953 57.6874 55.2018 60.8689 55.2018C64.0505 55.2018 66.8725 55.7953 68.8542 56.7035C70.9408 57.6599 71.6689 58.7376 71.6689 59.5018C71.6689 60.0068 71.3714 60.6482 70.4774 61.3433C69.5925 62.0314 68.2559 62.6568 66.5614 63.106C65.9208 63.2759 65.5392 63.9329 65.709 64.5735C65.8789 65.2141 66.5359 65.5957 67.1765 65.4259C69.0688 64.9242 70.7322 64.1853 71.9506 63.238C73.1599 62.2977 74.0689 61.0325 74.0689 59.5018C74.0689 57.2283 72.1108 55.5561 69.8542 54.5218C67.4928 53.4395 64.3149 52.8018 60.8689 52.8018C57.423 52.8018 54.2451 53.4395 51.8837 54.5218C49.6271 55.5561 47.6689 57.2283 47.6689 59.5018C47.6689 61.7752 49.6271 63.4475 51.8837 64.4817C53.2994 65.1306 55.0087 65.6197 56.8933 65.9074C58.0942 66.0907 58.7845 67.465 58.1107 68.4758L57.8705 68.8361C57.5029 69.3876 57.6519 70.1326 58.2033 70.5002C58.7547 70.8678 59.4998 70.7188 59.8674 70.1674L62.8674 65.6674C63.1361 65.2643 63.1361 64.7392 62.8674 64.3361L59.8674 59.8361C59.4998 59.2847 58.7547 59.1357 58.2033 59.5033C57.6519 59.8709 57.5029 60.616 57.8705 61.1674C58.5815 62.2339 57.7889 63.6486 56.5294 63.4112C55.1365 63.1485 53.8996 62.7656 52.8836 62.3C50.7971 61.3436 50.0689 60.2659 50.0689 59.5018Z" fill="#FFFFFF" data-v-d19724b1></path><path d="M58.8682 60.5L61.8682 65L58.8682 69.5" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="square" data-v-d19724b1></path><path d="M60.8682 65C54.2407 65 48.8682 62.5376 48.8682 59.5C48.8682 56.4624 54.2407 54 60.8682 54C67.4956 54 72.8682 56.4624 72.8682 59.5C72.8682 61.5358 70.455 63.3132 66.8682 64.2642" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="square" data-v-d19724b1></path></svg>',2)])],2)):p("",!0),e.modelFile?(s(),o("div",{key:1,class:D(["zoom-btns",{active:i(H)}]),ref_key:"modelViewerZoomBtnRef",ref:A},[b(i(vt),null,{default:W(()=>[b(i(ue),{theme:"light",icon:"plus",class:"button"}),b(i(ue),{theme:"light",icon:"minus",class:"button"})]),_:1})],2)):p("",!0),S[3]||(S[3]=l("span",{class:"bottom-gradient"},null,-1))],544)):p("",!0),e.productImages?(s(!0),o(P,{key:1},q(e.productImages.images,(F,V)=>(s(),o("div",{class:"image",key:V},[b(i(je),{asset:F},null,8,["asset"])]))),128)):p("",!0)])],512),e.productImages?(s(),o("div",Wa,[b(i(Ve),null,{default:W(()=>[b(i(oe),{theme:"light",icon:"chevron-left",onClick:_}),b(i(oe),{theme:"light",icon:"chevron-right",onClick:w})]),_:1})])):p("",!0)],512)}}},Za=G(Ua,[["__scopeId","data-v-d19724b1"]]),Ga={class:"g-row title-row"},Ya={class:"xxl-6 xs-24 g-col"},Ja={class:"-body-big-medium"},Ka={class:"g-row"},Qa={class:"card-wrapper"},Xa={class:"image-wrapper"},es={key:1,src:Ee},ts={class:"text-wrapper"},as={key:0,class:"-body-small-medium"},ss={class:"-body-big-medium"},is={__name:"Integrations",props:{caseStudyList:{type:[Boolean,Array],default:!1}},setup(e){const n=X(),h=M(null);return J(()=>{}),Z(()=>{}),(d,y)=>{const B=He;return s(),o("section",{ref_key:"el",ref:h,"data-component":"integrations"},[l("div",Ga,[l("div",Ya,[l("p",Ja,k(i(n)("integratedOnTheseProjects","Presente nestes Projectos"))+" ↓",1)])]),l("div",Ka,[(s(!0),o(P,null,q(e.caseStudyList,(c,g)=>{var u;return s(),o("div",{key:g,class:D(["xxl-6 xs-24 g-col",{"xxl-offset-6":g===2}])},[c.metadata&&((u=c.metadata)!=null&&u.slug)?(s(),I(B,{key:0,to:`/journal/${c.presentation.category.slug}/${c.metadata.slug}`},{default:W(()=>{var t,a;return[l("div",Qa,[l("div",Xa,[c.presentation.mediaAsset?(s(),I(i(E),{key:0,media:c.presentation.mediaAsset},null,8,["media"])):(s(),o("img",es))]),l("div",ts,[(a=(t=c.presentation)==null?void 0:t.category)!=null&&a.name?(s(),o("p",as,k(c.presentation.category.name),1)):p("",!0),l("p",ss,k(c.presentation.title),1)])])]}),_:2},1032,["to"])):p("",!0)],2)}),128))])],512)}}},ls=G(is,[["__scopeId","data-v-a0b03b1e"]]),ns={class:"g-row"},os={class:"xxl-6 sm-24 g-col"},cs={class:"-body-big-medium title"},rs={class:"xxl-18 sm-24 g-col"},ds={__name:"SameCollection",props:{productList:{type:[Boolean,Array],default:!1}},setup(e){const n=e,h=X(),d=M(null),y={layout1:{areas:[["square1","vertical","square2","square3"],["square4","vertical","horizontal","horizontal"]]}},B=r=>{const m=[...r];for(let f=m.length-1;f>0;f--){const _=Math.floor(Math.random()*(f+1));[m[f],m[_]]=[m[_],m[f]]}return m},c=x(()=>B(Array.isArray(n.productList)?n.productList:[]));function g(r){const m=new Set;r.areas.forEach(w=>{w.forEach(L=>m.add(L))});const f=m.size,_={square:0,vertical:0,horizontal:0};return m.forEach(w=>{w.startsWith("square")?_.square++:w.startsWith("vertical")?_.vertical++:w.startsWith("horizontal")&&_.horizontal++}),{total:f,counts:_}}for(const[r,m]of Object.entries(y))g(m);const u=x(()=>c.value.map(r=>{const m=r.sections&&r.sections[0]&&r.sections[0].mainImage;let f=null;if(m&&m.width&&m.height){const _=m.width/m.height;_>2&&(f="horizontal"),_<.9&&(f="vertical"),_<1.2&&_>.99&&(f="square")}return{...r,aspectRatio:f}}));function t(r,m){let f=[...m],_=[],w=new Set,L=[];for(const T of r.areas)for(const C of T)w.has(C)||(w.add(C),L.push(C));for(const T of L){const C=T.replace(/[0-9]/g,"");let A=f.findIndex(U=>U.aspectRatio===C),H=null;A>=0&&(H=f[A],f.splice(A,1)),_.push({product:H,area:T})}return{assignments:_,remaining:f}}const a=x(()=>{let r=[...u.value],m={};for(const[f,_]of Object.entries(y)){const w=t(_,r);m[f]=w.assignments,r=w.remaining}return{templatesAssignments:m,remainingProducts:r}});return J(()=>{}),Z(()=>{}),(r,m)=>(s(),o("section",{ref_key:"el",ref:d,"data-component":"same-collection"},[l("div",ns,[m[0]||(m[0]=l("span",{class:"border"},null,-1)),l("div",os,[l("p",cs,k(i(h)("inTheSameCollection","Na mesma Coleção")),1)]),l("div",rs,[(s(!0),o(P,null,q(i(a).templatesAssignments,(f,_)=>(s(),o("div",{class:D(["grid-layout",_]),key:_},[(s(!0),o(P,null,q(f,(w,L)=>{var T,C;return s(),o("div",{class:D(["product",w.area]),key:L},[w.product&&((C=(T=w.product.metadata)==null?void 0:T.slug)!=null&&C.current)?(s(),I(i(se),{key:0,to:{name:"products-category-slug",params:{category:w.product.productSetup.collection.slug,slug:w.product.metadata.slug.current}}},{default:W(()=>[b(i(st),K({ref_for:!0},{...w.product.sections[0],...w.product.productSetup},{class:"card"}),null,16)]),_:2},1032,["to"])):p("",!0)],2)}),128))],2))),128))])])],512))}},us=G(ds,[["__scopeId","data-v-fbbaceeb"]]),ms={"data-component":"product-page",class:"inner-page"},hs={__name:"Product",props:{metadata:{type:[Boolean,Object],default:!1},sections:{type:[Boolean,Array],default:!1},productSetup:{type:[Boolean,Object],default:!1},sameCollection:{type:[Boolean,Object],default:!1}},setup(e){const n=e,h=ne(),{$preview:d}=We(),y=B=>n.sections.find(c=>c._type==B);return J(()=>{}),Z(()=>{h.emit("change-menu-theme","main")}),(B,c)=>{var g;return s(),o("div",ms,[i(d)?(s(),I(i(lt),{key:0})):p("",!0),b(i(Ia),K({...y("productDetails"),...e.productSetup},{metadata:e.metadata}),null,16,["metadata"]),l("main",null,[y("inTheField")?(s(),I(i(ja),le(K({key:0},y("inTheField"))),null,16)):p("",!0),((g=y("integrations"))==null?void 0:g.caseStudyList.length)>=1?(s(),I(i(ls),le(K({key:1},y("integrations"))),null,16)):p("",!0),e.sameCollection?(s(),I(i(us),le(K({key:2},e.sameCollection)),null,16)):p("",!0)]),b(i(it))])}}},fs=G(hs,[["__scopeId","data-v-ddf3bee3"]]),gs=`
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
	uniqueSize{
		name,
		dimensions,
		printingArea,
		technicalImage {
			...${R()}
		},
	},
	availableSizes[]{
		name,
		label,
		dimensions,
		printingArea,
		technicalImage {
			...${R()}
		},
	},
}
`,ps=`
	_type == "productDetails" => {
		title,
		description,

		"mainImage":modelObjectRef->mainImage{
			...${R()}
		},
		"modelFile":modelObjectRef->modelFile{
			'asset': asset->.url, 
			scene
		},
		"productImages":modelObjectRef->productImages{
			images[]{
				...${R()}
			},
		},

		additionalSpecifications,
		productReferences,
		additionalLinks[]{
			...,
			details[]{
				...,
				_type == 'block' => {
					...,
					markDefs[]{
						...,
						"to": select(
							_type == "internalLink" && defined(href._ref) => href->metadata.slug.current,
							_type == "href" => null,
							defined(to._ref) => to->metadata.slug.current,
							to
						),
						"href": select(
							_type == "href" => to,
							_type == "fileLink" => file.asset->url,
							_type == "internalLink" => null,
							href
						)
					}
				},
			}
		},
	}
`,ys=`
	_type == "inTheField" => {
		title,
		images[]{
		 ...${R()}
		},
		${ve()},
}
`,vs=`
	_type == "integrations" => {
		title,
		caseStudyList[]->{
			metadata{
				"slug":slug.current
			},
			presentation{
				title,
				description,
				date,
				"category": category->{
					name,
					"slug": slug.current
				},
				${ve()},
			}
		},
	}
`,fe=`
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

		"subCollection": subCollection->,

		availableColors[]->{
			...,
			image{
				...${R()}
			},
		},
		availableStructure[]->{
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
		availableDisplay[]->{
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
	}`;function bs(e){return`
	"sameCollection": {
		"productList": coalesce(
			productList[]->{${fe}}, 
			*[_type == "page.product" && productSetup.collection._ref == ^.productSetup.collection._ref && lang == '${e}' && !(_id in path("drafts.**"))]{${fe}}
  		)
	}
`}function _s(e,n="pt"){return Ze`
	*[_type == 'page.product' && metadata.slug.current == "${e}" && lang == '${n}' && !(_id in path("drafts.**"))][0] {
		_type,
		"metadata": metadata{...${Ue()}},
		"sections": sections[] {
			_type,
			${ps},
			${ys},
			${vs},
		},
		${gs},
		${bs(n)},

	}
	`}const $s={__name:"[slug]",async setup(e){var _,w;let n,h;const{locales:d,locale:y,setLocale:B}=Ge(),c=Ye(),{slug:g}=c.params,u=_s(g,y.value),{data:t,pending:a,error:r}=([n,h]=Je(()=>tt(u)),n=await n,h(),n);if(r.value)throw Ke({statusCode:((_=r.value)==null?void 0:_.statusCode)||500,statusMessage:((w=r.value)==null?void 0:w.message)||"An error occurred"});!a.value&&t.value,at(t.value.metadata,y);const{onEnter:m,onLeave:f}=Xe();return Qe({bodyAttrs:{class:t.value.metadata.slug}}),(L,T)=>(s(),I(i(et),{slug:i(t).metadata.slug,name:i(t).metadata.name,metadata:i(t).metadata,"transition-enter":i(m),"transition-leave":i(f)},{default:W(()=>[i(t)?(s(),I(i(fs),le(K({key:0},i(t))),null,16)):p("",!0)]),_:1},8,["slug","name","metadata","transition-enter","transition-leave"]))}};export{$s as default};
