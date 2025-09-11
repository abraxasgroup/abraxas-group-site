// ===== Nav móvil =====
const navToggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');
if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', (!expanded).toString());
    menu.style.display = expanded ? 'none' : 'flex';
  });
}

// ===== Idiomas (ES/EN) =====
const ES='es', EN='en';
const langES=document.getElementById('langES');
const langEN=document.getElementById('langEN');

const I18N = {
  es: {
    "meta.title": "Abraxas — Donde el Riesgo Encuentra la Oportunidad",
    "meta.description": "Abraxas: negocios claros y rentables en minería y commodities estratégicos. De la mina a tu bolsillo. Agenda tu llamada estratégica.",
    "og.title": "Abraxas — Donde el Riesgo Encuentra la Oportunidad",
    "og.description": "Trading & facilitación en minería y commodities con transparencia total.",

    "nav.services":"Servicios","nav.cases":"Casos","nav.process":"Proceso","nav.resources":"Recursos","nav.faq":"FAQ","nav.book":"Agendar",
    "nav.about":"Sobre mí","nav.books":"Libros","nav.testimonials":"Testimonios",

    "hero1.title":"Abraxas: Donde el <span>Riesgo</span> encuentra la <span>Oportunidad</span>",
    "hero1.subtitle":"De la mina al mercado global — negocios claros y rentables en minería y commodities estratégicos.",
    "hero2.title":"De la mina a tu bolsillo: <span>Transparencia</span> que convierte incertidumbre en <span>rentabilidad</span>",
    "hero2.subtitle":"Acceso a litio, cobre, acero y combustibles con procesos legales, seguros y veloces.",
    "hero3.title":"Abraxas: el poder de la <span>dualidad</span> al servicio de tus negocios",
    "hero3.subtitle":"Unimos legal + comercial, activo + demanda, riesgo + control.",

    "cta.book_call":"Agendar llamada estratégica","cta.download_checklist":"Descargar checklist","cta.reserve_diagnostic":"Reservar diagnóstico","cta.view_cases":"Ver casos","cta.talk_now":"Hablar ahora","cta.explore_resources":"Explorar recursos",

    "badges.projects":"20+ proyectos mineros LATAM","badges.hubs":"Houston · Rotterdam · Dubái","badges.compliance":"Compliance & AML",

    "sections.services":"Servicios","sections.cases":"Casos & Resultados","sections.testimonials":"Testimonios","sections.process":"El Proceso Abraxas","sections.resources":"Checklist gratuito","sections.faq":"FAQ","sections.book":"Convertí incertidumbre en claridad",

    "services.mining.title":"Facilitación Minera","services.mining.desc":"Acceso a concesiones (litio, cobre, oro) con due diligence, NI 43-101/JORC y acuerdos claros.",
    "services.trading.title":"Trading de Commodities","services.trading.desc":"HMS1/2, acero, combustibles (EN590, Jet A-1), logística y contratos SIF/FOB verificados.",
    "services.legal.title":"Legal & Compliance","services.legal.desc":"NDA, NCNDA, KYC/AML, contratos internacionales, auditorías de contraparte.",

    "cases.case1.title":"Litio — Salta",
    "cases.case1.text":"<strong>Problema:</strong> acceso fragmentado a activos confiables.<br/><strong>Proceso:</strong> due diligence técnica + legal + deal de prueba.<br/><strong>Resultado:</strong> pipeline de inversión escalable. <em>(Sin datos sensibles)</em>",
    "cases.case2.title":"Acero — LATAM → UE",
    "cases.case2.text":"<strong>Problema:</strong> riesgo de proveedores.<br/><strong>Proceso:</strong> verificación multi-etapa + escrow.<br/><strong>Resultado:</strong> contratos recurrentes con variación de volumen.",
    "cases.case3.title":"Combustibles — Houston",
    "cases.case3.text":"<strong>Problema:</strong> ruido y “humo” en el mercado.<br/><strong>Proceso:</strong> filtro documental + deal de escritorio.<br/><strong>Resultado:</strong> incremento de tasa de cierre con compradores serios.",

    "about.title":"Sobre mí",
    "about.headline":"Abraxas: la dualidad que convierte el riesgo en oportunidad",
    "about.p1":"Soy Oscar Esteban Chinchilla. En Abraxas operamos donde otros dudan: en la línea fina entre lo técnico y lo comercial, entre la mina y el mercado, entre la tradición y el futuro. Esa dualidad no es un dilema: es nuestra ventaja.",
    "about.p2":"He trabajado con proyectos reales de litio, cobre, acero y combustibles. Entiendo el lenguaje del geólogo y el del CFO; el de la perforación y el del contrato. De eso se trata Abraxas: traducir dos mundos para cerrar negocios claros y rentables.",
    "about.d1":"Legal + Comercial","about.d2":"Activo + Demanda","about.d3":"Riesgo + Control","about.d4":"LatAm + Global",
    "about.p3":"Si buscás acceso serio a oportunidades en minería y commodities, hablemos. Te muestro la otra cara del mercado.",
    "about.cta":"Agendar llamada estratégica",

    "books.title":"Libros","books.intro":"Te comparto mis publicaciones y lecturas recomendadas. Si sos nuevo en Oil & Gas, empezá por la “Biblia de Oil & Gas”.",
    "promo.title":"BONO 7 DÍAS — Oil & Gas","promo.copy":"Agenda una llamada por Oil & Gas y recibí gratis la Biblia de Oil & Gas (ebook).","promo.ends_in":"Termina en","promo.cta":"Agendar Oil & Gas ahora","promo.note":"Mostrá el código OILBIBLE al confirmar.",

    "form.name":"Nombre","form.email":"Email","form.cta":"Recibir checklist",
    "agenda.left":"Quedan","agenda.right":"cupos esta semana.","agenda.micro":"Al confirmar, contanos en 1 frase tu mayor reto actual.",
    "footer.claim":"De la mina a tu bolsillo","legal.privacy":"Privacidad","legal.terms":"Términos"
  },
  en: {
    "meta.title":"Abraxas — Where Risk Meets Opportunity",
    "meta.description":"Abraxas: clear, profitable deals in mining and strategic commodities. From mine to your pocket. Book your strategy call.",
    "og.title":"Abraxas — Where Risk Meets Opportunity",
    "og.description":"Trading & facilitation in mining and commodities with full transparency.",

    "nav.services":"Services","nav.cases":"Cases","nav.process":"Process","nav.resources":"Resources","nav.faq":"FAQ","nav.book":"Book",
    "nav.about":"About","nav.books":"Books","nav.testimonials":"Testimonials",

    "hero1.title":"Abraxas: Where <span>Risk</span> Meets <span>Opportunity</span>",
    "hero1.subtitle":"From mine to global markets — clear, profitable deals in mining & strategic commodities.",
    "hero2.title":"From mine to your pocket: <span>Transparency</span> that turns uncertainty into <span>profitability</span>",
    "hero2.subtitle":"Access to lithium, copper, steel and fuels with legal, safe and fast processes.",
    "hero3.title":"Abraxas: the power of <span>duality</span> at the service of your business",
    "hero3.subtitle":"We unite legal + commercial, asset + demand, risk + control.",

    "cta.book_call":"Book strategy call","cta.download_checklist":"Download checklist","cta.reserve_diagnostic":"Reserve diagnostic","cta.view_cases":"View cases","cta.talk_now":"Talk now","cta.explore_resources":"Explore resources",

    "badges.projects":"20+ LATAM mining projects","badges.hubs":"Houston · Rotterdam · Dubai","badges.compliance":"Compliance & AML",

    "sections.services":"Services","sections.cases":"Cases & Results","sections.testimonials":"Testimonials","sections.process":"The Abraxas Process","sections.resources":"Free checklist","sections.faq":"FAQ","sections.book":"Turn uncertainty into clarity",

    "services.mining.title":"Mining Facilitation","services.mining.desc":"Access to concessions (lithium, copper, gold) with due diligence, NI 43-101/JORC and clear agreements.",
    "services.trading.title":"Commodity Trading","services.trading.desc":"HMS1/2, steel, fuels (EN590, Jet A-1), logistics and verified SIF/FOB contracts.",
    "services.legal.title":"Legal & Compliance","services.legal.desc":"NDA, NCNDA, KYC/AML, international contracts, counterparty audits.",

    "cases.case1.title":"Lithium — Salta",
    "cases.case1.text":"<strong>Problem:</strong> fragmented access to reliable assets.<br/><strong>Process:</strong> technical + legal due diligence + pilot deal.<br/><strong>Result:</strong> scalable investment pipeline. <em>(No sensitive data)</em>",
    "cases.case2.title":"Steel — LATAM → EU",
    "cases.case2.text":"<strong>Problem:</strong> supplier risk.<br/><strong>Process:</strong> multi-stage verification + escrow.<br/><strong>Result:</strong> recurring contracts with volume variation.",
    "cases.case3.title":"Fuels — Houston",
    "cases.case3.text":"<strong>Problem:</strong> noise and smoke in the market.<br/><strong>Process:</strong> document filter + desktop deal.<br/><strong>Result:</strong> higher close rate with serious buyers.",

    "about.title":"About",
    "about.headline":"Abraxas: the duality that turns risk into opportunity",
    "about.p1":"I’m Oscar Esteban Chinchilla. At Abraxas we operate where others hesitate: on the fine line between technical and commercial, between mine and market, between tradition and future. That duality isn’t a dilemma—it’s our edge.",
    "about.p2":"I’ve worked on real projects in lithium, copper, steel, and fuels. I speak both the geologist’s language and the CFO’s; drilling and contracts. That’s Abraxas: translating two worlds to close clear, profitable deals.",
    "about.d1":"Legal + Commercial","about.d2":"Asset + Demand","about.d3":"Risk + Control","about.d4":"LatAm + Global",
    "about.p3":"If you seek serious access to opportunities in mining and commodities, let’s talk. I’ll show you the other side of the market.",
    "about.cta":"Book strategy call",

    "books.title":"Books","books.intro":"Here are my publications and recommended readings. If you’re new to Oil & Gas, start with the “Oil & Gas Bible”.",

    "promo.title":"7-DAY BONUS — Oil & Gas","promo.copy":"Book an Oil & Gas call and get the Oil & Gas Bible (ebook) for free.","promo.ends_in":"Ends in","promo.cta":"Book Oil & Gas now","promo.note":"Mention code OILBIBLE when confirming.",

    "form.name":"Name","form.email":"Email","form.cta":"Get checklist",
    "agenda.left":"There are","agenda.right":"slots left this week.","agenda.micro":"Once confirmed, tell us your biggest challenge in one sentence.",
    "footer.claim":"From mine to your pocket","legal.privacy":"Privacy","legal.terms":"Terms"
  }
};

function applyI18n(lang){
  const dict=I18N[lang]||I18N.es;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if (dict[key]!==undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
    const spec=el.getAttribute('data-i18n-attr');
    const [attr,key]=spec.split(':');
    if (attr && key && dict[key]!==undefined) el.setAttribute(attr, dict[key]);
  });
  document.documentElement.lang = lang;
  langES?.setAttribute('aria-pressed', String(lang===ES));
  langEN?.setAttribute('aria-pressed', String(lang===EN));
}

const stored=localStorage.getItem('abraxas_lang');
let currentLang=stored || (navigator.language||'es').slice(0,2).toLowerCase();
if (currentLang!==EN) currentLang=ES;
applyI18n(currentLang);
langES?.addEventListener('click',()=>{ currentLang=ES; localStorage.setItem('abraxas_lang',ES); applyI18n(ES); });
langEN?.addEventListener('click',()=>{ currentLang=EN; localStorage.setItem('abraxas_lang',EN); applyI18n(EN); });

// ===== Activar 1 variante de hero =====
(function activateHeroVariant() {
  const variants = Array.from(document.querySelectorAll('.hero'));
  if (!variants.length) return;
  variants.forEach(v => v.style.display = 'none');
  const choice = Math.floor(Math.random() * variants.length);
  variants[choice].style.display = 'grid';
  try { window.dataLayer = window.dataLayer || []; dataLayer.push({event:'ver_hero', variant: choice+1}); } catch(e){}
})();

// ===== Form lead: descarga PDF según idioma =====
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = (document.getElementById('name')||{}).value?.trim();
    const email= (document.getElementById('email')||{}).value?.trim();
    const msg  = document.getElementById('formMsg');
    if(!name || !email){
      if(msg) msg.textContent = (currentLang===EN ? 'Please fill name and email.' : 'Por favor, completá nombre y email.');
      return;
    }
    if(msg) msg.textContent = (currentLang===EN ? 'All set! Check your downloads.' : '¡Listo! Revisá tus descargas.');
    try { window.dataLayer=window.dataLayer||[]; dataLayer.push({event:'enviar_form', name, email}); } catch(e){}
    const a = currentLang===EN ? document.getElementById('downloadEN') : document.getElementById('downloadES');
    a?.click();
    leadForm.reset();
  });
}

// ===== Año + cupos (faux scarcity) =====
document.getElementById('year')?.append(new Date().getFullYear());
const cuposEl = document.getElementById('cupos');
if (cuposEl) {
  const slots = [3,4,5,5,6];
  cuposEl.textContent = slots[new Date().getDay() % slots.length];
}

// ===== Promo Oil & Gas (7 días) =====
const PROMO_START = new Date(); // hoy
const PROMO_END = new Date(PROMO_START.getTime() + 7*24*60*60*1000);

function updatePromoCountdown(){
  const el = document.getElementById('promoCountdown');
  if(!el) return;
  const now = new Date();
  let diff = PROMO_END - now;
  if(diff <= 0){ el.textContent = (currentLang==='en'?'Expired':'Finalizado'); return; }
  const d = Math.floor(diff / (24*60*60*1000)); diff -= d*24*60*60*1000;
  const h = Math.floor(diff / (60*60*1000));    diff -= h*60*60*1000;
  const m = Math.floor(diff / (60*1000));       diff -= m*60*1000;
  const s = Math.floor(diff / 1000);
  const fmt = (n)=> String(n).padStart(2,'0');
  el.textContent = `${fmt(d)}d:${fmt(h)}h:${fmt(m)}m:${fmt(s)}s`;
}
setInterval(updatePromoCountdown, 1000);
updatePromoCountdown();

// UTM en CTA Oil & Gas
(function wirePromoUTM(){
  const a = document.getElementById('ctaOil');
  if(!a) return;
  const url = new URL(a.href);
  url.searchParams.set('utm_source','promo_oilgas');
  url.searchParams.set('utm_campaign','OILBIBLE');
  url.searchParams.set('promo','OILBIBLE');
  a.href = url.toString();
})();

// ===== GA4 simple (tracking de clicks con data-track) =====
document.addEventListener('click',(e)=>{
  const t = e.target.closest('[data-track]'); if(!t) return;
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({event: t.getAttribute('data-track')});
});

// ===== 3D Tilt (Libros) =====
(function threeDTilt(){
  const cards = document.querySelectorAll('.threed-card');
  const maxTilt = 12;
  cards.forEach(card=>{
    const body = card.querySelector('.threed-card__body');
    const items = card.querySelectorAll('[data-z]');
    const rectRef = {w:0,h:0,l:0,t:0};
    const setRect = ()=>{ const r = body.getBoundingClientRect(); rectRef.w=r.width;rectRef.h=r.height;rectRef.l=r.left;rectRef.t=r.top; };
    setRect(); window.addEventListener('resize', setRect, {passive:true});
    card.addEventListener('mousemove', (e)=>{
      const x=e.clientX-rectRef.l, y=e.clientY-rectRef.t;
      const rx=((y/rectRef.h)-.5)*-2*maxTilt, ry=((x/rectRef.w)-.5)*2*maxTilt;
      body.style.transform=`rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      items.forEach(el=>{
        const z = Number(el.getAttribute('data-z')||0);
        el.style.transform = `translateZ(${z}px)`;
      });
    });
    card.addEventListener('mouseenter', ()=>{ body.style.transition='transform .08s linear'; });
    card.addEventListener('mouseleave', ()=>{
      body.style.transition='transform .25s ease';
      body.style.transform = 'rotateX(0deg) rotateY(0deg)';
      items.forEach(el=>{ el.style.transform='translateZ(0)' });
    });
  });
})();

// ===== Vortex dorado (Libros) =====
(function goldVortex(){
  const canvas = document.getElementById('vortexBooks');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let W=0,H=0, particles=[], raf;
  const COUNT = 420;
  const GOLD_H = 44;            // tono dorado (HSL)
  const SPEED = .6;
  const CENTER_FORCE = .0028;
  const NOISE = .002;

  function resize(){
    const dpr = Math.max(1, window.devicePixelRatio||1);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W*dpr; canvas.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function spawn(){
    particles = [];
    const cx=W/2, cy=H/2;
    for(let i=0;i<COUNT;i++){
      const a = Math.random()*Math.PI*2;
      const r = Math.random()*Math.max(W,H)*.55;
      particles.push({
        x: cx + Math.cos(a)*r,
        y: cy + Math.sin(a)*r,
        vx: -Math.sin(a)*SPEED,
        vy:  Math.cos(a)*SPEED,
        life: Math.random()*200+60,
        size: Math.random()*1.6+0.6,
        hue: GOLD_H + (Math.random()*10-5)
      });
    }
  }
  function step(){
    ctx.clearRect(0,0,W,H);
    const cx=W/2, cy=H/2;
    ctx.globalCompositeOperation='lighter';
    for(const p of particles){
      const dx = cx - p.x, dy = cy - p.y;
      p.vx += dx*CENTER_FORCE + (Math.random()-.5)*NOISE;
      p.vy += dy*CENTER_FORCE + (Math.random()-.5)*NOISE;

      const x2 = p.x + p.vx;
      const y2 = p.y + p.vy;

      const grd = ctx.createLinearGradient(p.x,p.y,x2,y2);
      grd.addColorStop(0, `hsla(${p.hue},100%,60%,0)`);
      grd.addColorStop(1, `hsla(${p.hue},100%,60%,0.65)`);

      ctx.strokeStyle = grd;
      ctx.lineWidth = p.size;
      ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(x2,y2); ctx.stroke();

      p.x=x2; p.y=y2;
      p.life--;
      if(p.life<=0 || p.x<0||p.x>W||p.y<0||p.y>H){
        const a = Math.random()*Math.PI*2;
        const r = Math.random()*Math.max(W,H)*.55;
        p.x = cx + Math.cos(a)*r;
        p.y = cy + Math.sin(a)*r;
        p.vx = -Math.sin(a)*SPEED;
        p.vy =  Math.cos(a)*SPEED;
        p.life = Math.random()*200+60;
        p.size = Math.random()*1.6+0.6;
        p.hue  = GOLD_H + (Math.random()*10-5);
      }
    }
    ctx.globalCompositeOperation='source-over';
    raf = requestAnimationFrame(step);
  }
  function start(){ resize(); spawn(); cancelAnimationFrame(raf); step(); }
  start();
  window.addEventListener('resize', ()=>{ start(); }, {passive:true});
})();

// ===== Testimonios (animados tipo Aceternity) =====
(function testimonials(){
  const stackImgs = Array.from(document.querySelectorAll('.t-stack__img'));
  const nameEl = document.getElementById('tName');
  const roleEl = document.getElementById('tRole');
  const quoteEl = document.getElementById('tQuote');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (!stackImgs.length || !nameEl || !roleEl || !quoteEl) return;

  const data = [
    {
      name: "María Fernanda",
      role: "Gerente de Abastecimiento · Monterrey",
      quote: "Con Abraxas logramos pasar de promesas a contratos reales. La claridad legal nos ahorró semanas de ida y vuelta.",
      srcIndex: 0
    },
    {
      name: "James Carter",
      role: "Procurement Lead · Houston",
      quote: "They speak both the engineer’s and the CFO’s language. That duality is rare—and it’s why deals get done.",
      srcIndex: 1
    },
    {
      name: "Lucía Romero",
      role: "Legal Counsel · Madrid",
      quote: "KYC/AML impecable y contratos limpios. Reducimos riesgo y ganamos velocidad sin sacrificar compliance.",
      srcIndex: 2
    },
    {
      name: "Ahmed Khan",
      role: "Trading Partner · Dubai",
      quote: "From brief to match to call in days. Clear validation and a low-risk pilot deal—we scaled with confidence.",
      srcIndex: 3
    },
    {
      name: "Carlos Reyes",
      role: "Operaciones · Santiago",
      quote: "Primera vez que veo un ‘deal de escritorio’ que corta el humo del mercado. Menos fricción, más resultados.",
      srcIndex: 4
    }
  ];

  let active = 0;
  const autoplay = true;
  let timer;

  function setActive(i){
    active = (i + data.length) % data.length;
    stackImgs.forEach((img,idx)=>{
      img.classList.toggle('is-active', idx===data[active].srcIndex);
      img.style.zIndex = (idx===data[active].srcIndex) ? 40 : (10+idx);
      img.style.transform = (idx===data[active].srcIndex) ? 'scale(1)' : 'scale(.95) rotate(' + ((idx-active)*2) + 'deg)';
      img.style.opacity = (idx===data[active].srcIndex) ? '1' : '.7';
    });
    nameEl.textContent = data[active].name;
    roleEl.textContent = data[active].role;
    animateWords(data[active].quote);
  }

  function animateWords(text){
    // limpia
    quoteEl.innerHTML = '';
    const words = text.split(' ').map(w=>{
      const span = document.createElement('span');
      span.textContent = w + ' ';
      span.className = 'word';
      quoteEl.appendChild(span);
      return span;
    });
    // anima progresivo
    words.forEach((w,i)=>{
      setTimeout(()=>{ w.classList.add('in'); }, 20 * i);
    });
  }

  function next(){ setActive(active+1); restart(); }
  function prev(){ setActive(active-1); restart(); }

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);

  function restart(){
    if(!autoplay) return;
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  setActive(0);
  if (autoplay) timer = setInterval(next, 5000);
})();
