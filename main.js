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
