/* Footer year */
document.getElementById('year')?.append(new Date().getFullYear());

/* Language Switch (ES/EN) */
(function(){
  const BTN = document.getElementById('langToggle');
  const saved = localStorage.getItem('abraxas_lang');
  const browserIsEN = (navigator.language || 'es').toLowerCase().startsWith('en');
  const initial = saved || (browserIsEN ? 'en' : 'es');
  function apply(lang){
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('abraxas_lang', lang);
    if(BTN){ BTN.textContent = (lang === 'es' ? 'EN' : 'ES'); }
  }
  BTN?.addEventListener('click', ()=>{
    const current = document.documentElement.getAttribute('lang') || initial;
    apply(current === 'es' ? 'en' : 'es');
  });
  apply(initial);
})();

/* Wavy gold background — robust y atrás del contenido */
(function(){
  const canvas=document.getElementById('wavyHero'); if(!canvas) return;
  const ctx=canvas.getContext('2d'); let W=0,H=0, raf, last=0;
  const MAX_FPS=60, GOLD1='rgba(200,163,74,.85)', GOLD2='rgba(224,192,107,.55)', GOLD3='rgba(255,223,127,.20)';
  function resize(){
    const dpr=Math.max(1,window.devicePixelRatio||1);
    const w=canvas.clientWidth, h=canvas.clientHeight;
    canvas.width=Math.max(1,w*dpr); canvas.height=Math.max(1,h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); W=w; H=h;
  }
  function wave(y,a,f,s,t,p){ ctx.beginPath();
    for(let x=0;x<=W;x+=2){ const yv=y+Math.sin((x*f)+(t*s)+p)*a+Math.sin((x*f*.5)+(t*s*1.3)-p)*(a*.5); x===0?ctx.moveTo(x,yv):ctx.lineTo(x,yv); } }
  function draw(t){ if(t-last<1000/MAX_FPS){ raf=requestAnimationFrame(draw); return; } last=t; ctx.clearRect(0,0,W,H); const time=performance.now()/1000;
    ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.strokeStyle=GOLD3; ctx.lineWidth=14;
    wave(H*0.62,22,.012,1.2,time,.4); ctx.stroke(); wave(H*0.66,26,.010,1.05,time,1.1); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.strokeStyle=GOLD2; ctx.lineWidth=3; wave(H*0.64,18,.014,1.25,time,.8); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.shadowColor='rgba(255,236,170,.65)'; ctx.shadowBlur=18; ctx.strokeStyle=GOLD1; ctx.lineWidth=2; wave(H*0.64,20,.016,1.35,time,.2); ctx.stroke(); ctx.restore();
    raf=requestAnimationFrame(draw); }
  const ro=new ResizeObserver(resize); ro.observe(canvas); resize(); cancelAnimationFrame(raf); draw(0);
  window.addEventListener('visibilitychange',()=>{ if(document.hidden) cancelAnimationFrame(raf); else { last=0; raf=requestAnimationFrame(draw); }});
})();

/* Books: tilt suave (mouse + touch) */
(function(){
  const cards=document.querySelectorAll('.card3d'); if(!cards.length) return;
  const maxTilt=8;
  cards.forEach(card=>{
    const inner=card.querySelector('.card3d-inner');
    function move(x,y){ const r=card.getBoundingClientRect();
      const rx=((y-r.top)/r.height-.5)*-2*maxTilt; const ry=((x-r.left)/r.width-.5)*2*maxTilt;
      inner.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`; }
    function reset(){ inner.style.transform='rotateX(0) rotateY(0)'; }
    card.addEventListener('mousemove', e=>move(e.clientX,e.clientY));
    card.addEventListener('mouseenter', ()=> inner.style.transition='transform .08s linear');
    card.addEventListener('mouseleave', ()=>{ inner.style.transition='transform .25s ease'; reset(); });
    card.addEventListener('touchstart', e=>{ const t=e.touches[0]; inner.style.transition='transform .08s linear'; move(t.clientX,t.clientY); }, {passive:true});
    card.addEventListener('touchmove', e=>{ const t=e.touches[0]; move(t.clientX,t.clientY); }, {passive:true});
    card.addEventListener('touchend', ()=>{ inner.style.transition='transform .25s ease'; reset(); }, {passive:true});
  });
})();

/* Testimonials: carrusel SOLO-TEXTO (sin imágenes) */
(function(){
  const cards=[...document.querySelectorAll('.t-card')];
  if(cards.length<=1) return;
  const prev=document.getElementById('tPrev');
  const next=document.getElementById('tNext');
  const dotsWrap=document.getElementById('tDots');
  let i=0, timer=null, AUTOPLAY=5500;

  // inicia: solo muestra el primero
  function show(k){
    i=(k+cards.length)%cards.length;
    cards.forEach((c,idx)=> c.style.display = (idx===i?'block':'none'));
    [...dotsWrap.children].forEach((d,idx)=> d.classList.toggle('is-active', idx===i));
  }

  // dots
  cards.forEach((_,idx)=>{
    const b=document.createElement('button');
    b.addEventListener('click', ()=>{ show(idx); play(); });
    dotsWrap.appendChild(b);
  });

  function play(){ stop(); timer=setInterval(()=> show(i+1), AUTOPLAY); }
  function stop(){ if(timer) clearInterval(timer); }

  prev?.addEventListener('click',()=>{ show(i-1); play(); });
  next?.addEventListener('click',()=>{ show(i+1); play(); });

  const cont=document.getElementById('testimonios');
  cont?.addEventListener('mouseenter', stop);
  cont?.addEventListener('mouseleave', play);
  cont?.addEventListener('touchstart', stop, {passive:true});
  cont?.addEventListener('touchend', play, {passive:true});

  show(0); play();
})();
