(function(){
  const ambientVideo=document.getElementById('ambientVideo');
  const ambientCanvas=document.getElementById('ambientCanvas');
  const ambientContext=ambientCanvas.getContext('2d',{alpha:true});
  const particles=[];
  const pointer={x:-9999,y:-9999,active:false};
  let ambientFrame=0,ambientWidth=0,ambientHeight=0,ambientDpr=1;

  function resizeAmbient(){
    ambientDpr=Math.min(devicePixelRatio||1,1.5);
    ambientWidth=innerWidth;ambientHeight=innerHeight;
    ambientCanvas.width=Math.round(ambientWidth*ambientDpr);
    ambientCanvas.height=Math.round(ambientHeight*ambientDpr);
    ambientContext.setTransform(ambientDpr,0,0,ambientDpr,0,0);
    particles.length=0;
    const gap=innerWidth<760?30:24;
    for(let y=-gap;y<ambientHeight+gap;y+=gap){
      for(let x=-gap;x<ambientWidth+gap;x+=gap){
        particles.push({x:x+(Math.random()-.5)*8,y:y+(Math.random()-.5)*8,seed:Math.random()*Math.PI*2});
      }
    }
  }
  function drawVideoCover(alpha){
    if(ambientVideo.readyState<2)return;
    const vw=ambientVideo.videoWidth||16,vh=ambientVideo.videoHeight||9;
    const scale=Math.max(ambientWidth/vw,ambientHeight/vh);
    const w=vw*scale,h=vh*scale;
    ambientContext.globalAlpha=alpha;
    ambientContext.drawImage(ambientVideo,(ambientWidth-w)/2,(ambientHeight-h)/2,w,h);
    ambientContext.globalAlpha=1;
  }
  function drawAmbient(now){
    ambientContext.clearRect(0,0,ambientWidth,ambientHeight);
    ambientContext.fillStyle='#050505';ambientContext.fillRect(0,0,ambientWidth,ambientHeight);
    drawVideoCover(.11);
    const lobes=[
      {x:.5+.34*Math.sin(now*.00007),y:.46+.25*Math.cos(now*.000052),r:260},
      {x:.5+.38*Math.sin(now*.000052+2.1),y:.5+.28*Math.cos(now*.000041+4.3),r:220},
      {x:.5+.3*Math.sin(now*.00009+4.2),y:.5+.22*Math.cos(now*.000066+1.4),r:190}
    ];
    ambientContext.save();ambientContext.beginPath();
    lobes.forEach(l=>ambientContext.arc(l.x*ambientWidth,l.y*ambientHeight,l.r,0,Math.PI*2));
    if(pointer.active)ambientContext.arc(pointer.x,pointer.y,165,0,Math.PI*2);
    ambientContext.clip();drawVideoCover(pointer.active?.52:.34);ambientContext.restore();
    particles.forEach(p=>{
      let x=p.x+Math.sin(now*.0005+p.seed)*2.2,y=p.y+Math.cos(now*.00042+p.seed)*2.2;
      let energy=.12;
      if(pointer.active){const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy)||1;if(d<175){const push=(1-d/175)*48;x+=dx/d*push;y+=dy/d*push;energy+=1-d/175}}
      ambientContext.beginPath();ambientContext.arc(x,y,1.05+energy*1.4,0,Math.PI*2);
      ambientContext.fillStyle=`rgba(${150+Math.round(70*energy)},${166+Math.round(55*energy)},${195+Math.round(40*energy)},${.27+energy*.32})`;
      ambientContext.fill();
    });
    ambientFrame=requestAnimationFrame(drawAmbient);
  }
  addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;pointer.active=true},{passive:true});
  addEventListener('pointerleave',()=>pointer.active=false);
  addEventListener('resize',resizeAmbient);
  resizeAmbient();
  ambientVideo.play().catch(()=>{});
  ambientFrame=requestAnimationFrame(drawAmbient);

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
