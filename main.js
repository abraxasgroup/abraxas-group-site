// ===== WhatsApp CTAs =====
const waNumber = '5493417400299';
const waTextES = encodeURIComponent('Hola Abraxas, quiero validar una operación y agendar una mentoría.');
const waTextEN = encodeURIComponent('Hi Abraxas, I want to validate an operation and book a mentorship.');
const $wa = (msg) => `https://wa.me/${waNumber}?text=${msg}`;

const btn1 = document.getElementById('ctaWhats');
const btn2 = document.getElementById('ctaWhats2');
const waFloat = document.getElementById('waFloat');

// ===== Video autoplay robusto (iOS) =====
(function(){
  const v = document.getElementById('bgVideo');
  if(!v) return;
  v.muted = true;
  v.setAttribute('playsinline','');
  const tryPlay = () => v.play().catch(()=>{});
  if (document.readyState !== 'loading') tryPlay();
  else document.addEventListener('DOMContentLoaded', tryPlay);
  window.addEventListener('load', tryPlay, {once:true});
  window.addEventListener('touchstart', tryPlay, {once:true});
  window.addEventListener('pointerdown', tryPlay, {once:true});
})();

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// ===== Año footer =====
document.getElementById('y').textContent = new Date().getFullYear();

// ===== i18n =====
const dict = {
  es: {
    "nav.offer":"Oferta","nav.books":"Libros","nav.about":"Acerca","nav.schedule":"Agendar",
    "hero.titleA":"Acceso real a energía, minería y agro","hero.titleB":"— con validación y ejecución.",
    "hero.subtitle":"Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k). Sin humo, con compliance.",
    "cta.whatsapp":"Hablar por WhatsApp","cta.viewOffer":"Ver oferta",
    "services.title":"¿Qué ofrecemos?","services.note":"* Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k).",
    "s1.title":"All In Gas — Acceso directo, sin humo",
    "s1.i1":"Mandatos reales en Houston, Fujairah y Ámsterdam",
    "s1.i2":"Operaciones CIF/FOB verificadas",
    "s1.i3":"Validación de tanque / compliance AML",
    "s1.i4":"Tratos con traders y refinerías directas",
    "s2.title":"Minería — Donde se define el valor",
    "s2.i1":"Acceso directo a productores y brokers regulados",
    "s2.i2":"Dueños de concesiones en venta",
    "s2.i3":"Joint ventures y financiamiento",
    "s2.i4":"Litio, oro, cobre y tierras raras",
    "s3.title":"Comercio Exterior — Validación y ejecución",
    "s3.i1":"Due diligence de contrapartes y rutas",
    "s3.i2":"Estructuras seguras de pago y entrega",
    "s3.i3":"Documentación, compliance y seguros",
    "s3.i4":"Optimización de costos logísticos",
    "s4.title":"Agro — Aceites y granos",
    "s4.i1":"Origen auditado y contratos estandarizados",
    "s4.i2":"Operaciones spot y a término",
    "s4.i3":"QA/QC independiente y control de calidad",
    "s4.i4":"Integración con trading y logística portuaria",
    "books.title":"Libros","books.buy":"Comprar en Amazon",
    "about.title":"Acerca de Abraxas",
    "about.p1":"Abraxas es la síntesis de la dualidad que gobierna los negocios y la vida: riesgo y control, velocidad y rigor, oportunidad y validación.",
    "about.p2":"Operamos como puente entre origen y demanda global, con foco en ejecución, compliance y resultados medibles.",
    "agenda.title":"Reservar mentoría / Book mentorship",
    "agenda.p1":"Escríbenos para coordinar agenda y alcance.",
    "footer.rights":"Todos los derechos reservados."
  },
  en: {
    "nav.offer":"Offer","nav.books":"Books","nav.about":"About","nav.schedule":"Book",
    "hero.titleA":"Real access to energy, mining and agro","hero.titleB":"— with validation and execution.",
    "hero.subtitle":"We work with owners and supply/trading directors (ticket ≥ USD 500k). No fluff, with compliance.",
    "cta.whatsapp":"Chat on WhatsApp","cta.viewOffer":"View offer",
    "services.title":"What we offer","services.note":"* We engage with supply/trading owners and directors (ticket ≥ USD 500k).",
    "s1.title":"All In Gas — Direct access, no fluff",
    "s1.i1":"Real mandates in Houston, Fujairah and Amsterdam",
    "s1.i2":"Verified CIF/FOB operations",
    "s1.i3":"Tank validation / AML compliance",
    "s1.i4":"Deals with traders and direct refineries",
    "s2.title":"Mining — Where value is defined",
    "s2.i1":"Direct access to producers and regulated brokers",
    "s2.i2":"Concession owners willing to sell",
    "s2.i3":"Joint ventures and financing",
    "s2.i4":"Lithium, gold, copper and rare earths",
    "s3.title":"Foreign Trade — Validation and execution",
    "s3.i1":"Counterparty and route due diligence",
    "s3.i2":"Secure payment & delivery structures",
    "s3.i3":"Documentation, compliance & insurance",
    "s3.i4":"Logistics cost optimization",
    "s4.title":"Agri — Oils & grains",
    "s4.i1":"Audited origin and standardized contracts",
    "s4.i2":"Spot and forward operations",
    "s4.i3":"Independent QA/QC and quality control",
    "s4.i4":"Integration with trading and port logistics",
    "books.title":"Books","books.buy":"Buy on Amazon",
    "about.title":"About Abraxas",
    "about.p1":"Abraxas embodies the duality ruling business and life: risk & control, speed & rigor, opportunity & validation.",
    "about.p2":"We bridge origin and global demand with execution, compliance and measurable results.",
    "agenda.title":"Book mentorship",
    "agenda.p1":"Text us to coordinate scope and schedule.",
    "footer.rights":"All rights reserved."
  }
};

// Estado de idioma
let lang = 'es';
const applyLang = () => {
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const t = (dict[lang] && dict[lang][key]) || '';
    if(t) el.innerHTML = t;
  });
  // WhatsApp copy según idioma
  if(btn1) btn1.href = $wa(lang==='es'?waTextES:waTextEN);
  if(btn2) btn2.href = $wa(lang==='es'?waTextES:waTextEN);
  if(waFloat) waFloat.href = $wa(lang==='es'?waTextES:waTextEN);
  // toggle chips
  document.getElementById('btnES').classList.toggle('chip--on', lang==='es');
  document.getElementById('btnEN').classList.toggle('chip--on', lang==='en');
};
document.getElementById('btnES').addEventListener('click', ()=>{ lang='es'; applyLang(); history.replaceState(null,'','#'); });
document.getElementById('btnEN').addEventListener('click', ()=>{ lang='en'; applyLang(); history.replaceState(null,'','#'); });

// Inicial
applyLang();
