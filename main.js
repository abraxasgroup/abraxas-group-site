/* Año footer */
document.getElementById('year')?.append(new Date().getFullYear());

/* Idioma ES/EN */
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

/* HERO — ondas doradas */
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
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) cancelAnimationFrame(raf); else { last=0; raf=requestAnimationFrame(draw); }});
})();

/* SPARKLES — motor base (oro) */
function makeSparkles(canvas, opts={}){
  if(!canvas) return {destroy:()=>{}};
  const ctx = canvas.getContext('2d');
  let W=canvas.clientWidth, H=canvas.clientHeight, raf;
  const DPR = Math.max(1, window.devicePixelRatio||1);
  function resize(){
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.max(1, W*DPR); canvas.height = Math.max(1, H*DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  resize();
  const density = opts.density ?? 220;   // cantidad base
  const min = opts.min ?? 0.6;           // tamaño mínimo
  const max = opts.max ?? 1.8;           // tamaño máximo
  const speed = opts.speed ?? 0.25;      // velocidad base
  const palette = opts.colors ?? ["#c8a34a","#e0c06b","#f0d283","#ffde96"];

  const COUNT = Math.round((W*H)/8000 * (density/220));
  const particles = new Array(Math.max(30, COUNT)).fill(0).map(()=>({
    x: Math.random()*W,
    y: Math.random()*H,
    r: min + Math.random()*(max-min),
    c: palette[(Math.random()*palette.length)|0],
    vx: (Math.random()*2-1)*speed,
    vy: (Math.random()*2-1)*speed,
    a: Math.random()*Math.PI*2, // fase para titilar
  }));

  function step(){
    ctx.clearRect(0,0,W,H);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy; p.a += 0.04 + Math.random()*0.02;
      if(p.x< -10) p.x=W+10; if(p.x>W+10) p.x=-10;
      if(p.y< -10) p.y=H+10; if(p.y>H+10) p.y=-10;
      const alpha = 0.35 + 0.35*Math.sin(p.a); // titilar
      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.globalAlpha = alpha;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(step);
  }
  const ro = new ResizeObserver(()=>{ cancelAnimationFrame(raf); resize(); step(); });
  ro.observe(canvas);
  step();
  return {destroy:()=>{ cancelAnimationFrame(raf); ro.disconnect(); }};
}

/* Sparkles global (suave) */
makeSparkles(document.getElementById('sparklesPage'), {density:120, min:.5, max:1.4, speed:.15});

/* Sparkles en Testimonios (intenso + máscara radial) */
(function(){
  const c = document.getElementById('sparklesTestis'); if(!c) return;
  makeSparkles(c, {density:420, min:.6, max:1.8, speed:.25});
})();

/* Tilt suave para Libros */
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

/* Carrusel de Testimonios (texto) */
(function(){
  const cards=[...document.querySelectorAll('.t-card')];
  if(cards.length<=1) return;
  const prev=document.getElementById('tPrev');
  const next=document.getElementById('tNext');
  const dotsWrap=document.getElementById('tDots');
  let i=0, timer=null, AUTOPLAY=6000;

  function show(k){
    i=(k+cards.length)%cards.length;
    cards.forEach((c,idx)=> c.style.display = (idx===i?'block':'none'));
    [...dotsWrap.children].forEach((d,idx)=> d.classList.toggle('is-active', idx===i));
  }

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
