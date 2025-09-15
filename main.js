// año en footer
document.getElementById('year').textContent = new Date().getFullYear();

/* ====== REVEAL EN SCROLL ====== */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); }
  });
},{threshold:.18});
document.querySelectorAll('.reveal, .book').forEach(el=> io.observe(el));

/* ====== I18N ====== */
const T = {
  es:{ "nav.offer":"Oferta","nav.books":"Libros","nav.about":"Acerca","nav.contact":"Agendar",
    "hero.title":"Acceso real a energía, minería y agro — con validación y ejecución.",
    "hero.subtitle":"Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k). Sin humo, con compliance.",
    "cta.whatsapp":"Hablar por WhatsApp","cta.seeOffer":"Ver oferta","cta.backTop":"Volver arriba",
    "offer.title":"¿Qué ofrecemos?",
    "offer.oil.title":"All In Gas — Acceso directo, sin humo",
    "offer.oil.li1":"Mandatos reales en Houston, Fujairah y Ámsterdam",
    "offer.oil.li2":"Operaciones CIF/FOB verificadas",
    "offer.oil.li3":"Validación de tanque / compliance AML",
    "offer.oil.li4":"Tratos con traders y refinerías directas",
    "offer.mining.title":"Minería — Donde se define el valor",
    "offer.mining.li1":"Acceso directo a productores y brokers regulados",
    "offer.mining.li2":"Dueños de concesiones en venta",
    "offer.mining.li3":"Joint ventures y financiamiento",
    "offer.mining.li4":"Litio, oro, cobre y tierras raras",
    "offer.trade.title":"Comercio Exterior — Validación y ejecución",
    "offer.trade.li1":"Due diligence de contrapartes y rutas",
    "offer.trade.li2":"Estructuras seguras de pago y entrega",
    "offer.trade.li3":"Documentación, compliance y seguros",
    "offer.trade.li4":"Optimización de costos logísticos",
    "offer.agro.title":"Agro — Aceites y granos",
    "offer.agro.li1":"Origen auditado y contratos estandarizados",
    "offer.agro.li2":"Operaciones spot y a término",
    "offer.agro.li3":"QA/QC independiente y control de calidad",
    "offer.agro.li4":"Integración con trading y logística portuaria",
    "offer.legal":"* Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k).",
    "books.title":"Libros","books.buy":"Comprar en Amazon",
    "about.title":"Abraxas — Orden en la dualidad",
    "about.p1":"Abraxas simboliza la tensión creativa entre opuestos: riesgo y control, velocidad y rigor, intuición y data. Ahí operamos.",
    "about.p2":"Conectamos capital, producto y ejecución para cerrar deals reales. Sin humo. Con procesos claros, compliance y métricas.",
    "contact.title":"Agendá tu validación",
    "contact.copy":"Primero validamos encaje y objetivos. Si hay fit, avanzamos con la estructura adecuada."
  },
  en:{ "nav.offer":"Offer","nav.books":"Books","nav.about":"About","nav.contact":"Schedule",
    "hero.title":"Real access to Energy, Mining & Agro — with validation and execution.",
    "hero.subtitle":"We work with owners and supply/trading directors (ticket ≥ USD 500k). No fluff, full compliance.",
    "cta.whatsapp":"Chat on WhatsApp","cta.seeOffer":"See offer","cta.backTop":"Back to top",
    "offer.title":"What we offer",
    "offer.oil.title":"All In Gas — Direct access, no fluff",
    "offer.oil.li1":"Real mandates in Houston, Fujairah and Amsterdam",
    "offer.oil.li2":"Verified CIF/FOB operations",
    "offer.oil.li3":"Tank validation / AML compliance",
    "offer.oil.li4":"Deals with traders and direct refineries",
    "offer.mining.title":"Mining — Where value is defined",
    "offer.mining.li1":"Direct access to producers and regulated brokers",
    "offer.mining.li2":"Concession owners open to sell",
    "offer.mining.li3":"Joint ventures and financing",
    "offer.mining.li4":"Lithium, gold, copper & rare earths",
    "offer.trade.title":"Foreign Trade — Validation & execution",
    "offer.trade.li1":"Counterparty & route due diligence",
    "offer.trade.li2":"Secure payment & delivery structures",
    "offer.trade.li3":"Documentation, compliance & insurance",
    "offer.trade.li4":"Logistics cost optimization",
    "offer.agro.title":"Agro — Oils & grains",
    "offer.agro.li1":"Audited origin and standardized contracts",
    "offer.agro.li2":"Spot and forward operations",
    "offer.agro.li3":"Independent QA/QC and quality control",
    "offer.agro.li4":"Integration with trading and port logistics",
    "offer.legal":"* We work with supply/trading owners and directors (ticket ≥ USD 500k).",
    "books.title":"Books","books.buy":"Buy on Amazon",
    "about.title":"Abraxas — Order within duality",
    "about.p1":"Abraxas stands for the creative tension between opposites: risk & control, speed & rigor, intuition & data. That’s our arena.",
    "about.p2":"We connect capital, product and execution to close real deals. No fluff. Clear processes, compliance and metrics.",
    "contact.title":"Schedule your validation",
    "contact.copy":"First we validate fit and objectives. If aligned, we move forward with the right structure."
  }
};
const langBtn=document.getElementById('langToggle');
let lang='es';
function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n; if(T[lang][k]) el.textContent=T[lang][k];
  });
  langBtn.textContent=lang.toUpperCase();
  document.documentElement.lang=lang;
}
langBtn.addEventListener('click', ()=>{ lang=(lang==='es')?'en':'es'; applyLang(); });
applyLang();

/* ====== STARFIELD SUAVE ====== */
(function starfield(){
  const c=document.getElementById('stars'); const ctx=c.getContext('2d');
  function size(){ c.width=innerWidth; c.height=innerHeight; }
  size(); addEventListener('resize', size, {passive:true});
  const count=Math.min(160, Math.floor(innerWidth*innerHeight/12000));
  const stars=Array.from({length:count}).map(()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.1+.2,a:Math.random()*6.283,s:Math.random()*0.25+.05}));
  function frame(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const s of stars){
      s.a+=s.s*0.02; const t=(Math.sin(s.a)*0.5+0.5)*0.8+0.2;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,220,150,${t*0.9})`; ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ====== ESPIRAL GALÁCTICA (Mobile friendly) ====== */
(function galaxySpiral(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.getElementById('galaxyFx'); const ctx = c.getContext('2d',{alpha:true});
  let w,h,dpr;
  function resize(){
    dpr = Math.min(devicePixelRatio||1, 2);
    w = innerWidth; h = innerHeight;
    c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize(); addEventListener('resize', resize, {passive:true});

  const baseCount = Math.min(450, Math.floor(w*h/3200));
  const parts = [];
  for(let i=0;i<baseCount;i++){
    const r = Math.sqrt(Math.random()) * Math.min(w,h)*0.55;
    const a = Math.random()*Math.PI*2;
    const speed = (0.0005 + Math.random()*0.0012)*(i< baseCount*0.6 ? 1 : 0.6);
    const size = Math.random()*1.8 + 0.4;
    const hue = 220 + Math.random()*80; // violeta-azul
    parts.push({r,a,speed,size,hue});
  }
  ctx.globalCompositeOperation = 'lighter';
  let last=performance.now();
  function frame(now){
    const dt = Math.min(40, now-last); last=now;
    ctx.clearRect(0,0,w,h);

    // Glow central
    const cx=w/2, cy=h/2;
    const g = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*0.6);
    g.addColorStop(0,'rgba(255,220,170,.35)');
    g.addColorStop(1,'rgba(10,10,16,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,w,h);

    // Partículas en espiral
    for(const p of parts){
      p.a += p.speed * dt;
      const x = cx + Math.cos(p.a)*p.r;
      const y = cy + Math.sin(p.a)*p.r*0.68; // elipse sutil
      const grad = ctx.createRadialGradient(x,y,0,x,y,p.size*3);
      grad.addColorStop(0,`hsla(${p.hue},90%,70%,.9)`);
      grad.addColorStop(1,`hsla(${p.hue},90%,70%,0)`);
      ctx.fillStyle=grad;
      ctx.beginPath(); ctx.arc(x,y,p.size,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
