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

/* Wavy gold background — behind content, no overlap */
(function(){
  const canvas=document.getElementById('wavyHero'); if(!canvas) return;
  const ctx=canvas.getContext('2d'); let W=0,H=0,raf,last=0;
  const MAX=60, GOLD1='rgba(200,163,74,.85)', GOLD2='rgba(224,192,107,.55)', GOLD3='rgba(255,223,127,.20)', BG='transparent';
  function resize(){
    const dpr = Math.max(1, window.devicePixelRatio||1);
    const {clientWidth:w, clientHeight:h} = canvas;
    canvas.width = Math.max(1,w*dpr); canvas.height=Math.max(1,h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); W=w; H=h;
  }
  function wave(y,a,f,s,t,p=0){
    ctx.beginPath();
    for(let x=0;x<=W;x+=2){
      const yv = y + Math.sin((x*f)+(t*s)+p)*a + Math.sin((x*f*0.5)+(t*s*1.3)-p)*(a*0.5);
      if(x===0) ctx.moveTo(x,yv); else ctx.lineTo(x,yv);
    }
  }
  function draw(t){
    if(t - last < (1000/MAX)) { raf=requestAnimationFrame(draw); return; }
    last=t; ctx.clearRect(0,0,W,H); ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
    const time=performance.now()/1000;
    ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.strokeStyle=GOLD3; ctx.lineWidth=14;
    wave(H*0.62,22,0.012,1.2,time,0.4); ctx.stroke(); wave(H*0.66,26,0.010,1.05,time,1.1); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.strokeStyle=GOLD2; ctx.lineWidth=3;
    wave(H*0.64,18,0.014,1.25,time,0.8); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.shadowColor='rgba(255,236,170,0.65)'; ctx.shadowBlur=18; ctx.strokeStyle=GOLD1; ctx.lineWidth=2;
    wave(H*0.64,20,0.016,1.35,time,0.2); ctx.stroke(); ctx.restore();
    raf=requestAnimationFrame(draw);
  }
  const ro=new ResizeObserver(()=>resize()); ro.observe(canvas); resize(); cancelAnimationFrame(raf); draw(0);
  window.addEventListener('visibilitychange',()=>{ if(document.hidden) cancelAnimationFrame(raf); else { last=0; raf=requestAnimationFrame(draw); }});
})();

/* Books: tilt (mouse + touch, mild to avoid nausea on mobile) */
(function(){
  const cards=document.querySelectorAll('.card3d'); if(!cards.length) return;
  const maxTilt=8;
  cards.forEach(card=>{
    const inner=card.querySelector('.card3d-inner');
    function move(x,y){
      const r=card.getBoundingClientRect();
      const rx=((y - r.top)/r.height - .5) * -2 * maxTilt;
      const ry=((x - r.left)/r.width - .5) *  2 * maxTilt;
      inner.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function reset(){ inner.style.transform='rotateX(0) rotateY(0)'; }
    card.addEventListener('mousemove', e=>move(e.clientX,e.clientY));
    card.addEventListener('mouseenter', ()=> inner.style.transition='transform .08s linear');
    card.addEventListener('mouseleave', ()=>{ inner.style.transition='transform .25s ease'; reset(); });
    card.addEventListener('touchstart', e=>{ const t=e.touches[0]; inner.style.transition='transform .08s linear'; move(t.clientX,t.clientY); }, {passive:true});
    card.addEventListener('touchmove', e=>{ const t=e.touches[0]; move(t.clientX,t.clientY); }, {passive:true});
    card.addEventListener('touchend', ()=>{ inner.style.transition='transform .25s ease'; reset(); }, {passive:true});
  });
})();

/* Testimonials: mobile-safe sizes + autoplay + controls */
(function(){
  const imgs=[...document.querySelectorAll('.t-img')];
  const nameEl=document.getElementById('tName');
  const roleEl=document.getElementById('tRole');
  const quoteEl=document.getElementById('tQuote');
  const prev=document.getElementById('tPrev');
  const next=document.getElementById('tNext');
  if(!imgs.length||!nameEl||!roleEl||!quoteEl) return;

  const data=[
    {n:"María Fernanda",r:"Gerente de Abastecimiento · Monterrey",q:"Con Abraxas pasamos de promesas a contratos reales. Claridad legal y velocidad."},
    {n:"James Carter",r:"Procurement Lead · Houston",q:"They speak both the engineer’s and the CFO’s language. That duality gets deals done."},
    {n:"Lucía Romero",r:"Legal Counsel · Madrid",q:"KYC/AML impecable y contratos limpios. Menos riesgo, más velocidad."},
    {n:"Ahmed Khan",r:"Trading Partner · Dubái",q:"From brief to match to call in days. Clear validation and a low-risk pilot deal."},
    {n:"Carlos Reyes",r:"Operaciones · Santiago",q:"Un deal ‘de escritorio’ que corta el humo del mercado. Menos fricción, más resultados."}
  ];
  let i=0, timer=null, AUTOPLAY=5000;

  function setActive(k){
    i=(k+data.length)%data.length;
    imgs.forEach((img,idx)=> img.classList.toggle('is-active', idx===i));
    nameEl.textContent=data[i].n; roleEl.textContent=data[i].r; quoteEl.textContent=data[i].q;
  }
  function play(){ stop(); timer=setInterval(()=> setActive(i+1), AUTOPLAY); }
  function stop(){ if(timer) clearInterval(timer); }

  prev?.addEventListener('click',()=>{ setActive(i-1); play(); });
  next?.addEventListener('click',()=>{ setActive(i+1); play(); });

  const wrap=document.querySelector('.t-wrap');
  wrap?.addEventListener('mouseenter', stop);
  wrap?.addEventListener('mouseleave', play);
  wrap?.addEventListener('touchstart', stop, {passive:true});
  wrap?.addEventListener('touchend', play, {passive:true});

  setActive(0); play();
})();

/* Image fallback: if /img/... fails, try /assets/images/... */
(function(){
  document.querySelectorAll('img[data-fallback]').forEach(img=>{
    img.addEventListener('error',()=>{
      if(img.dataset.tried==='1') return;
      img.dataset.tried='1';
      const alt=img.getAttribute('data-fallback'); if(alt) img.src=alt;
    },{once:true});
  });
})();
