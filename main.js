/* Año dinámico */
document.getElementById('year')?.append(new Date().getFullYear());

/* Toggle ES/EN */
(() => {
  const btn = document.getElementById('langToggle');
  const saved = localStorage.getItem('abraxas_lang');
  const browserIsEN = (navigator.language || 'es').toLowerCase().startsWith('en');
  const initial = saved || (browserIsEN ? 'en' : 'es');
  const apply = (lang) => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('abraxas_lang', lang);
    if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
  };
  btn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') || initial;
    apply(current === 'es' ? 'en' : 'es');
  });
  apply(initial);
})();

/* Carrusel Testimonios (1 tarjeta + autoplay + swipe) */
(() => {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const cards = [...slider.querySelectorAll('.t-card')];
  const dotsWrap = document.getElementById('tDots');
  const btnPrev = document.getElementById('tPrev');
  const btnNext = document.getElementById('tNext');

  let i = 0;
  const N = cards.length;
  let autoTimer = null;
  const autoplayMs = Number(slider.getAttribute('data-autoplay') || 6000);

  // Bullets
  for (let k = 0; k < N; k++) {
    const b = document.createElement('button');
    b.addEventListener('click', () => { i = k; show(i); restart(); });
    dotsWrap?.appendChild(b);
  }

  function show(idx){
    i = (idx+N)%N;
    cards.forEach((c,ix)=> c.classList.toggle('is-active', ix===i));
    [...(dotsWrap?.children||[])].forEach((d,ix)=> d.classList.toggle('is-active', ix===i));
  }
  function next(){ show(i+1); }
  function prev(){ show(i-1); }
  function play(){ autoTimer = setInterval(next, autoplayMs); }
  function stop(){ if (autoTimer) clearInterval(autoTimer); }
  function restart(){ stop(); play(); }

  btnPrev?.addEventListener('click', ()=>{ prev(); restart(); });
  btnNext?.addEventListener('click', ()=>{ next(); restart(); });

  // Gestos táctiles
  let x0 = null;
  slider.addEventListener('touchstart', (e)=>{ x0 = e.touches[0].clientX; stop(); }, {passive:true});
  slider.addEventListener('touchmove', (e)=>{
    if (x0===null) return;
    const dx = e.touches[0].clientX - x0;
    if (Math.abs(dx) > 40) { dx>0 ? prev() : next(); x0=null; }
  }, {passive:true});
  slider.addEventListener('touchend', ()=>{ x0=null; play(); }, {passive:true});

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', play);

  show(0); play();
})();

/* Sparkles dorado (Canvas), estilo Aceternity pero sin React */
(() => {
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('sparklesCanvas');
  if (!canvas || prefersReduce) return;

  const ctx = canvas.getContext('2d',{alpha:true});
  let w=0,h=0,dpr=Math.min(window.devicePixelRatio||1,2);
  let particles=[];
  let rafId=null, last=0;

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    w = Math.floor(rect.width);
    h = Math.floor(rect.height);
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    canvas.style.width = w+'px';
    canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    init();
  }

  function baseCount(){
    const area = w*h;
    if (area < 400*600) return 90;
    if (area < 800*900) return 140;
    return 200;
  }

  function init(){
    particles.length = 0;
    const N = baseCount();
    for(let i=0;i<N;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.25,
        vy: (Math.random()*0.6)+0.15,
        r: Math.random()*1.6+0.4,
        life: Math.random()*100,
      });
    }
  }

  function draw(now){
    rafId = requestAnimationFrame(draw);
    if (now - last < 22) return; // ~45fps
    last = now;

    ctx.clearRect(0,0,w,h);

    for (const p of particles){
      p.x += p.vx; p.y += p.vy; p.life += 0.5;

      // wrap
      if (p.y > h+10){ p.y = -10; p.x = Math.random()*w; }
      if (p.x > w+10){ p.x = -10; }
      if (p.x < -10){ p.x = w+10; }

      const alpha = 0.4 + 0.3*Math.sin(p.life*0.1);

      const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      grd.addColorStop(0, `rgba(240,210,131,${alpha})`);
      grd.addColorStop(1, 'rgba(240,210,131,0)');

      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();

      // Halo leve
      ctx.shadowColor = '#f0d283';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#e0c06b';
      ctx.globalAlpha = 0.25;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*2,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    }
  }

  function onVis(){
    if (document.hidden){ cancelAnimationFrame(rafId); rafId=null; }
    else { last=0; rafId=requestAnimationFrame(draw); }
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVis);

  resize();
  rafId=requestAnimationFrame(draw);
})();
