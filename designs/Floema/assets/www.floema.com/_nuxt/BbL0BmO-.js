import{_ as h,a0 as B,p as j,i as H,q as x,h as v,c,o,d as s,t as f,r as C,F as I,A as N,a as m,ag as P,a9 as b,m as T,N as y,u as e,X as E,$ as F,ad as q,W as z,a1 as V,a2 as D,j as w,b as M,a3 as K,a4 as O,a5 as Q,k as R,K as U}from"./BL6O4IjF.js";import{u as W}from"./DYyzkNkO.js";import{F as X}from"./NIufRzW5.js";import{h as G}from"./DOTWEdil.js";const J={class:"g-row title-row"},Y={class:"g-col xxl-9 xxl-offset-9 md-16 md-offset-7 sm-20 sm-offset-4 xs-offset-2 xs-22"},Z={class:"-title-3-medium title"},ee={class:"g-row subtitle-row"},te={class:"xxl-9 xxl-offset-9 md-16 md-offset-7 sm-20 sm-offset-4 xs-offset-2 xs-22 g-col"},ae={class:"-title-8-medium subtitle"},se={__name:"Header",props:{title:{type:[Boolean,String],default:!1},subtitle:{type:[Boolean,String],default:!1}},setup(t){const{locale:a}=B();j();const n=H("pageContext"),d=C(null),r=()=>{d.value},p=()=>{};return x(()=>{}),v(()=>{n.$page.loader.loaded.then(()=>r()),n.$page.loader.ready.then(()=>p())}),(u,i)=>(o(),c("header",{ref_key:"el",ref:d,"data-component":"legal-header"},[s("div",J,[s("div",Y,[s("h1",Z,f(t.title),1)])]),s("div",ee,[s("div",te,[s("h2",ae,f(t.subtitle),1)])])],512))}},oe=h(se,[["__scopeId","data-v-41c3a4aa"]]),ne={class:"g-row content-row"},le={class:"xxl-9 xxl-offset-9 md-16 md-offset-7 sm-20 sm-offset-4 xs-offset-2 xs-22 g-col"},re={class:"content"},ce={key:0,class:"-body-medium left-title"},ie={key:1,class:"-body-medium left-title"},de={__name:"Content",props:{content:{type:[Boolean,Array],default:!1}},setup(t){const a={marks:{externalLink:b,internalLink:b}},n=r=>`${String(r+1).padStart(2,"0")}.`,d=C(null);return x(()=>{}),v(()=>{}),(r,p)=>{const u=P;return o(),c("section",{ref_key:"el",ref:d,"data-component":"legal-content"},[s("div",ne,[s("div",le,[s("div",re,[(o(!0),c(I,null,N(t.content,(i,_)=>(o(),c("div",{key:_,class:"block"},[i.leftTitle?(o(),c("p",ce,f(i.leftTitle),1)):(o(),c("p",ie,f(n(_)),1)),m(u,{blocks:i.textBlock,serializers:a},null,8,["blocks"])]))),128))])])])],512)}}},ue=h(de,[["__scopeId","data-v-7258e733"]]),_e={"data-component":"legal-page",class:"inner-page"},me={__name:"Legal",props:{metadata:{type:[Boolean,Object],default:!1},sections:{type:[Boolean,Array],default:!1}},setup(t){return T(),x(()=>{}),v(()=>{}),(a,n)=>(o(),c("div",_e,[m(e(oe),y(t.sections[0],{"data-section-intersect":"dark"}),null,16),s("main",null,[m(e(ue),y(t.sections[1],{"data-section-intersect":"dark"}),null,16)]),m(e(X))]))}},fe=h(me,[["__scopeId","data-v-0a918902"]]),pe=`
	_type == "header" => {
		title,
		subtitle,
		_updatedAt,

	}
`,ge=`
	_type == "content" => {
		"type": ^._type,
		leftTitle,
		content[]{
			...,
			_type == 'block' => {
				...,
				markDefs[]{
					...,
					...${G()}
				}
			},
		}
	}
`;function ye(t,a="pt"){return F`
	*[_type == 'page.legal' && metadata.slug.current == "${t}" && lang == '${a}' && !(_id in path("drafts.**"))][0] {
		_type,
		"metadata": metadata{...${E()}},
		"sections": sections[] {
			_type,
			${pe},
			${ge},
		},
	}
	`}const we={__name:"[slug]",async setup(t){var k,$;let a,n;const{locales:d,locale:r,setLocale:p}=B(),u=q(),{slug:i}=u.params,_=ye(i,r.value),{data:l,pending:S,error:g}=([a,n]=z(()=>Q(_)),a=await a,n(),a);if(g.value)throw V({statusCode:((k=g.value)==null?void 0:k.statusCode)||500,statusMessage:(($=g.value)==null?void 0:$.message)||"An error occurred"});!S.value&&l.value,W(l.value.metadata,r);const{onEnter:L,onLeave:A}=K();return D({bodyAttrs:{class:l.value.metadata.slug}}),(he,xe)=>(o(),w(e(O),{slug:e(l).metadata.slug,name:e(l).metadata.name,metadata:e(l).metadata,"transition-enter":e(L),"transition-leave":e(A)},{default:M(()=>[e(l)?(o(),w(e(fe),U(y({key:0},e(l))),null,16)):R("",!0)]),_:1},8,["slug","name","metadata","transition-enter","transition-leave"]))}};export{we as default};
