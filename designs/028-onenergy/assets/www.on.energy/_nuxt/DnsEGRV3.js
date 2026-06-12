const e=n=>n.split(`
`).filter(t=>!!t).map(t=>`<span>${t}</span>`).join("")??"",s=n=>n?.replaceAll("{{","<span>").replaceAll("}}","</span>")??"",a=n=>n?.content?.length?n.content.some(t=>t.type==="paragraph"?t.content&&t.content.length>0:!0):!1;export{a,s as h,e as s};
