(function(){
  const track=document.getElementById('workTrack');
  const scenes=[...document.querySelectorAll('.scene')];
  const progressBar=document.getElementById('progressBar');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current=-1,ticking=false;

  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function render(){
    ticking=false;
    const rect=track.getBoundingClientRect();
    const range=Math.max(1,track.offsetHeight-innerHeight);
    const progress=clamp(-rect.top/range,0,1);
    const raw=progress*(scenes.length-1);
    const index=clamp(Math.round(raw),0,scenes.length-1);
    progressBar.style.transform=`scaleY(${progress})`;
    scenes.forEach((scene,i)=>{
      const distance=raw-i;
      const visibility=clamp(1-Math.abs(distance)*1.7,0,1);
      scene.classList.toggle('active',i===index || visibility>.02);
      scene.setAttribute('aria-hidden',visibility<.05?'true':'false');
      scene.style.opacity=visibility;
      const elements=scene.querySelectorAll('.scene-title,.scene-info,.media,.scene-index');
      elements.forEach((el,j)=>{
        if(reduced){el.style.opacity=visibility;return}
        const drift=(j%2?1:-1)*distance*(18+j*2);
        const scale=1-Math.min(.06,Math.abs(distance)*.035);
        el.style.opacity=clamp(visibility*(1-j*.018),0,1);
        el.style.translate=`0 ${drift}px`;
        el.style.scale=scale;
      });
      scene.querySelectorAll('video').forEach(v=>i===index?v.play().catch(()=>{}):v.pause());
    });
    if(index!==current){current=index;document.body.dataset.activeScene=scenes[index].dataset.scene}
  }
  function request(){if(!ticking){ticking=true;requestAnimationFrame(render)}}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request);
  const clock=document.getElementById('clock');
  function time(){clock.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false})}
  time();setInterval(time,30000);render();
  if(new URLSearchParams(location.search).get('demo')==='preview'){scrollTo(0,0)}
})();
