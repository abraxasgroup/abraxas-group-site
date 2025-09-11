/* Año */
document.getElementById('year')?.append(new Date().getFullYear());

/* Idioma */
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

/* Carrusel Testimonios — táctil + autoplay + botones + bullets */
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

  // Dots
  for (let k = 0; k < N; k++) {
    const b = document.createElement('button');
    b.addEventListener('click', () => { i = k; update(true); restart(); });
    dotsWrap?.appendChild(b);
  }

  function update(jump=false) {
    slider.style.setProperty('--i', i);
    [...(dotsWrap?.children||[])].forEach((d,idx)=> d.classList.toggle('is-active', idx===i));
    if (jump) slider.scrollTop = slider.scrollTop; // fuerza repaint en iOS
  }
  function next(){ i = (i+1)%N; update(); }
  function prev(){ i = (i-1+N)%N; update(); }

  // Autoplay
  const play = () => autoTimer = setInterval(next, autoplayMs);
  const stop = () => { if (autoTimer) clearInterval(autoTimer); };
  const restart = () => { stop(); play(); };

  // Botones
  btnPrev?.addEventListener('click', () => { prev(); restart(); });
  btnNext?.addEventListener('click', () => { next(); restart(); });

  // Gestos táctiles
  let x0 = null;
  slider.addEventListener('touchstart', (e)=>{ x0 = e.touches[0].clientX; stop(); }, {passive:true});
  slider.addEventListener('touchmove', (e)=>{
    if (x0===null) return;
    const dx = e.touches[0].clientX - x0;
    if (Math.abs(dx) > 40) {
      dx > 0 ? prev() : next();
      x0 = null;
    }
  }, {passive:true});
  slider.addEventListener('touchend', ()=>{ x0=null; play(); }, {passive:true});

  // Hover pausa (desktop)
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', play);

  update(true);
  play();
})();
