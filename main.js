/* Año en footer */
document.getElementById('year')?.append(new Date().getFullYear());

/* ===== Wavy Gold Background (tipo Aceternity, vanilla) ===== */
(function wavyGoldHero(){
  const canvas = document.getElementById('wavyHero');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W=0,H=0, raf, last=0;
  const MAX_FPS = 60;
  const BG = '#0b0b0f';
  const GOLD1 = 'rgba(200,163,74,0.85)'; // línea principal
  const GOLD2 = 'rgba(224,192,107,0.55)'; // brillo suave
  const GOLD3 = 'rgba(255,223,127,0.20)'; // halo

  function resize(){
    const dpr = Math.max(1, window.devicePixelRatio||1);
    const { clientWidth: w, clientHeight: h } = canvas;
    canvas.width = Math.max(1, w*dpr);
    canvas.height= Math.max(1, h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    W = w; H = h;
  }

  function wave(yBase, amp, freq, speed, time, phase=0){
    ctx.beginPath();
    for(let x=0;x<=W;x+=2){
      const y = yBase + Math.sin((x*freq)+(time*speed)+phase)*amp
                      + Math.sin((x*freq*0.5)+(time*speed*1.3)-phase)*(amp*0.5);
      if(x===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
  }

  function draw(t){
    if(t - last < (1000/MAX_FPS)) { raf=requestAnimationFrame(draw); return; }
    last = t;

    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = BG; ctx.fillRect(0,0,W,H);

    const time = performance.now()/1000;

    // halo
    ctx.save();
    ctx.globalCompositeOperation='lighter';
    ctx.strokeStyle = GOLD3; ctx.lineWidth=14;
    wave(H*0.58,22,0.012,1.2,time,0.4); ctx.stroke();
    wave(H*0.62,26,0.010,1.05,time,1.1); ctx.stroke();
    ctx.restore();

    // línea suave
    ctx.save();
    ctx.globalCompositeOperation='lighter';
    ctx.strokeStyle = GOLD2; ctx.lineWidth=3;
    wave(H*0.60,18,0.014,1.25,time,0.8); ctx.stroke();
    ctx.restore();

    // línea principal con glow
    ctx.save();
    ctx.shadowColor='rgba(255,236,170,0.65)';
    ctx.shadowBlur=18;
    ctx.strokeStyle = GOLD1; ctx.lineWidth=2;
    wave(H*0.60,20,0.016,1.35,time,0.2); ctx.stroke();
    ctx.restore();

    raf=requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(()=>{ resize(); });
  ro.observe(canvas);
  resize(); cancelAnimationFrame(raf); draw(0);

  window.addEventListener('visibilitychange',()=>{
    if(document.hidden) cancelAnimationFrame(raf);
    else { last=0; raf=requestAnimationFrame(draw); }
  });
})();

/* ===== 3D Tilt para Libros (mouse + touch) ===== */
(function tiltCards(){
  const cards = document.querySelectorAll('.card3d');
  if(!cards.length) return;
  const maxTilt = 10;

  cards.forEach(card=>{
    const inner = card.querySelector('.card3d-inner');

    function move(x,y){
      const r = card.getBoundingClientRect();
      const offsetX = x - r.left;
      const offsetY = y - r.top;
      const rx = ((offsetY / r.height) - .5) * -2 * maxTilt;
      const ry = ((offsetX / r.width) - .5) *  2 * maxTilt;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function reset(){ inner.style.transform = `rotateX(0deg) rotateY(0deg)`; }

    // mouse
    card.addEventListener('mousemove', e=> move(e.clientX,e.clientY));
    card.addEventListener('mouseenter', ()=> inner.style.transition='transform .08s linear');
    card.addEventListener('mouseleave', ()=>{ inner.style.transition='transform .25s ease'; reset(); });

    // touch
    card.addEventListener('touchstart', e=>{
      inner.style.transition='transform .08s linear';
      const t = e.touches[0]; move(t.clientX,t.clientY);
    }, {passive:true});
    card.addEventListener('touchmove', e=>{
      const t = e.touches[0]; move(t.clientX,t.clientY);
    }, {passive:true});
    card.addEventListener('touchend', ()=>{ inner.style.transition='transform .25s ease'; reset(); }, {passive:true});
  });
})();

/* ===== Testimonios (autoplay + palabra a palabra + pausa al interactuar) ===== */
(function testimonials(){
  const imgEls = Array.from(document.querySelectorAll('.t-img'));
  const nameEl = document.getElementById('tName');
  const roleEl = document.getElementById('tRole');
  const quoteEl = document.getElementById('tQuote');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (!imgEls.length || !nameEl || !roleEl || !quoteEl) return;

  const data = [
    {
      name: "María Fernanda",
      role: "Gerente de Abastecimiento · Monterrey",
      quote: "Con Abraxas logramos pasar de promesas a contratos reales. La claridad legal nos ahorró semanas de ida y vuelta.",
      idx: 0
    },
    {
      name: "James Carter",
      role: "Procurement Lead · Houston",
      quote: "They speak both the engineer’s and the CFO’s language. That duality is rare—and it’s why deals get done.",
      idx: 1
    },
    {
      name: "Lucía Romero",
      role: "Legal Counsel · Madrid",
      quote: "KYC/AML impecable y contratos limpios. Reducimos riesgo y ganamos velocidad sin sacrificar compliance.",
      idx: 2
    },
    {
      name: "Ahmed Khan",
      role: "Trading Partner · Dubái",
      quote: "From brief to match to call in days. Clear validation and a low-risk pilot deal—we scaled with confidence.",
      idx: 3
    },
    {
      name: "Carlos Reyes",
      role: "Operaciones · Santiago",
      quote: "Un ‘deal de escritorio’ que corta el humo del mercado. Menos fricción, más resultados.",
      idx: 4
    }
  ];

  let active = 0;
  const AUTOPLAY_MS = 5000;
  let timer = null;

  function setActive(i){
    active = (i + data.length) % data.length;

    // fotos
    imgEls.forEach((img, idx)=>{
      img.classList.toggle('is-active', idx === data[active].idx);
      img.style.zIndex = idx === data[active].idx ? 40 : (10 + idx);
    });

    // texto
    nameEl.textContent = data[active].name;
    roleEl.textContent = data[active].role;
    animateWords(data[active].quote);
  }

  function animateWords(text){
    quoteEl.innerHTML = '';
    const parts = text.split(/\s+/);
    parts.forEach((word, i)=>{
      const span = document.createElement('span');
      span.className = 'word';
      span.innerHTML = word + '&nbsp;'; // evita colapso de espacios en Safari
      quoteEl.appendChild(span);
      setTimeout(()=>{ span.classList.add('in'); }, 20 * i);
    });
  }

  function next(){ setActive(active+1); restart(); }
  function prev(){ setActive(active-1); restart(); }

  function restart(){
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  // Controles
  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);

  // Pausa al pasar mouse o tocar
  const tWrap = document.querySelector('.t-wrap');
  const pause = () => clearInterval(timer);
  const play  = () => restart();
  tWrap?.addEventListener('mouseenter', pause);
  tWrap?.addEventListener('mouseleave', play);
  tWrap?.addEventListener('touchstart', pause, {passive:true});
  tWrap?.addEventListener('touchend', play, {passive:true});

  // init
  setActive(0);
  restart();
})();

/* === Fallback de imágenes: si /img/... falla, intenta /assets/images/... === */
(function imageFallback(){
  const imgs = document.querySelectorAll('img[data-fallback]');
  imgs.forEach(img=>{
    img.addEventListener('error', ()=>{
      if (img.dataset.tried === '1') return; // evita loop
      img.dataset.tried = '1';
      const altSrc = img.getAttribute('data-fallback');
      if (altSrc) img.src = altSrc;
    }, { once:true });
  });
})();
