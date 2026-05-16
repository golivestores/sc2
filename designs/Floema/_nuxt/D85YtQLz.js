import{_ as B,au as C,m as P,r as b,q as j,h as H,c as N,o,j as i,k as p,a as d,d as E,u as e,K as c,N as v,av as G,L as _,aw as q,ax as L,X as S,Y as u,$ as T,a0 as V,ad as F,W as I,a1 as M,a2 as O,b as R,a3 as z,a4 as D,a5 as K}from"./BL6O4IjF.js";import{u as Q}from"./DYyzkNkO.js";import{F as U}from"./NIufRzW5.js";import{P as W}from"./CwSMczxQ.js";import{h as X}from"./DOTWEdil.js";const Y={"data-component":"article-page",class:"inner-page"},J={__name:"Article",props:{metadata:{type:[Boolean,Object],default:!1},sections:{type:[Boolean,Array],default:!1},gallery:{type:[Boolean,Object],default:!1}},setup(s){const{$preview:a}=C(),r=P(),l=b(!1);r.on("gallery-open",()=>n()),r.on("gallery-close",()=>n());function n(){l.value=!l.value}return j(()=>{}),H(()=>{r.emit("change-menu-theme","main")}),(h,g)=>(o(),N("div",Y,[e(a)?(o(),i(e(W),{key:0})):p("",!0),e(l)?(o(),i(e(G),c(v({key:1},s.gallery)),null,16)):p("",!0),d(e(q),c(_({...s.sections[0],...s.gallery})),null,16),E("main",null,[d(e(L),c(_(s.sections[1])),null,16)]),d(e(U))]))}},Z=B(J,[["__scopeId","data-v-76af37bf"]]),ee=`
	_type == "articleHeader" => {
		"category": ^.presentation.category->{
			name,
			"slug": slug.current
		},
		title,
		date,
		figure {
			...,
			${u()}
		},
		"readTime": ^.sections[1]{
			"time":round(length(pt::text(content)) / 5 / 180 ),
		}.time
	}
`,ae=`
	_type == "articleContent" => {
		"type": ^._type,
		"readingTime": round(length(pt::text(content)) / 5 / 180 ),
		content[]{
			...,
			_type == 'block' => {
				...,
				markDefs[]{
					...,
					...${X()}
				}
			},
			_type == "figure" => {
				...,
				${u()}
			},
			_type == "figureSet" => {
				...,
				figures[]{
					...,
					${u()}
				}
			},
		}
	}
`,te=`
	gallery {
		title,
		images[]{
			description,
			${u()}
		}
	}
`;function se(s,a="pt"){return T`
	*[_type == 'page.article' && metadata.slug.current == "${s}" && lang == '${a}'][0] {
		_type,
		"metadata": metadata{...${S()}},
		"sections": sections[] {
			_type,
			${ee},
			${ae},
		},
		"gallery": ${te}
	}
	`}const me={__name:"[slug]",async setup(s){var y,f;let a,r;const{locales:l,locale:n,setLocale:h}=V(),g=F(),{slug:$}=g.params,A=se($,n.value),{data:t,pending:k,error:m}=([a,r]=I(()=>K(A)),a=await a,r(),a);if(m.value)throw M({statusCode:((y=m.value)==null?void 0:y.statusCode)||500,statusMessage:((f=m.value)==null?void 0:f.message)||"An error occurred"});!k.value&&t.value,Q(t.value.metadata,n);const{onEnter:x,onLeave:w}=z();return O({bodyAttrs:{class:t.value.metadata.slug}}),(re,ne)=>(o(),i(e(D),{slug:e(t).metadata.slug,name:e(t).metadata.name,metadata:e(t).metadata,"transition-enter":e(x),"transition-leave":e(w)},{default:R(()=>[e(t)?(o(),i(e(Z),c(v({key:0},e(t))),null,16)):p("",!0)]),_:1},8,["slug","name","metadata","transition-enter","transition-leave"]))}};export{me as default};
