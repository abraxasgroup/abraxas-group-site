/* WhatsApp number */
const WA = "5493417400299";

/* i18n básico */
const STRINGS = {
  es: {
    "nav.offer":"Oferta",
    "nav.books":"Libros",
    "nav.web":"Web",
    "nav.about":"Acerca",
    "nav.schedule":"Agendar",

    "hero.titleA":"Acceso real a",
    "hero.energy":"energía",
    "hero.mining":"minería",
    "hero.and":"y",
    "hero.agro":"agro",
    "hero.titleB":"— con validación y ejecución.",
    "hero.subtitle":"Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k). Sin humo, con compliance.",
    "cta.whatsapp":"Hablar por WhatsApp",
    "cta.viewOffer":"Ver oferta",
    "cta.reserve":"Reservar por WhatsApp",

    "services.title":"¿Qué ofrecemos?",
    "s1.title":"All In Gas — Acceso directo, sin humo",
    "s1.li1":"Mandatos reales en Houston, Fujairah y Ámsterdam",
    "s1.li2":"Operaciones CIF/FOB verificadas",
    "s1.li3":"Validación de tanque / compliance AML",
    "s1.li4":"Tratos con traders y refinerías directas",

    "s2.title":"Minería — Donde se define el valor",
    "s2.li1":"Acceso directo a productores y brokers regulados",
    "s2.li2":"Dueños de concesiones en venta",
    "s2.li3":"Joint ventures y financiamiento",
    "s2.li4":"Litio, oro, cobre y tierras raras",

    "s3.title":"Comercio Exterior — Validación y ejecución",
    "s3.li1":"Due diligence de contrapartes y rutas",
    "s3.li2":"Estructuras seguras de pago y entrega",
    "s3.li3":"Documentación, compliance y seguros",
    "s3.li4":"Optimización de costos logísticos",

    "s4.title":"Agro — Aceites y granos",
    "s4.li1":"Origen auditado y contratos estandarizados",
    "s4.li2":"Operaciones spot y a término",
    "s4.li3":"QA/QC independiente y control de calidad",
    "s4.li4":"Integración con trading y logística portuaria",

    "services.note":"* Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k).",

    "mentoring.title":"Reservar mentoría / Due diligence express",
    "mentoring.lead":"Pagás por adelantado y coordinamos inmediatamente. Sin límite de tiempo por llamada; nos quedamos hasta resolver el objetivo.",
    "mentoring.opt1":"Validación inicial",
    "mentoring.opt1a":"Revisión de documentos y contraparte",
    "mentoring.opt1b":"Mapa de pasos y riesgos",
    "mentoring.opt2":"Estructura de trato",
    "mentoring.opt2a":"Term-sheet / flujo CIF/FOB",
    "mentoring.opt2b":"Checklist compliance & pagos",
    "mentoring.opt3":"Acompañamiento",
    "mentoring.opt3a":"Negociación y due diligence continuo",
    "mentoring.opt3b":"Soporte hasta la firma",

    "books.title":"Libros",
    "books.buy":"Comprar en Amazon",

    "web.title":"Desarrollo web · SEO · Branding",
    "web.lead":"Tu presencia digital lista para vender más.",
    "web.basic":"Web básica",
    "web.b1":"Hasta 5 secciones",
    "web.b2":"Responsive + WhatsApp",
    "web.b3":"Formulario de contacto",
    "web.b4":"Entrega: 7–10 días",
    "web.corp":"Web corporativa",
    "web.c1":"Hasta 10 secciones",
    "web.c2":"Branding + Blog",
    "web.c3":"SEO inicial + Analytics",
    "web.c4":"Entrega: 15–25 días",
    "web.prem":"Web premium / e-commerce",
    "web.p1":"Tienda (hasta 50 productos)",
    "web.p2":"Pagos integrados (PayPal/Stripe/MercadoPago)",
    "web.p3":"SEO avanzado + CRM",
    "web.p4":"Entrega: 30–45 días"
  },
  en: {
    "nav.offer":"Offer",
    "nav.books":"Books",
    "nav.web":"Web",
    "nav.about":"About",
    "nav.schedule":"Schedule",

    "hero.titleA":"Real access to",
    "hero.energy":"energy",
    "hero.mining":"mining",
    "hero.and":"and",
    "hero.agro":"agro",
    "hero.titleB":"— with validation and execution.",
    "hero.subtitle":"We work with owners and supply/trading directors (ticket ≥ USD 500k). No smoke, full compliance.",
    "cta.whatsapp":"Chat on WhatsApp",
    "cta.viewOffer":"See offer",
    "cta.reserve":"Reserve on WhatsApp",

    "services.title":"What do we offer?",
    "s1.title":"All In Gas — Direct access, no smoke",
    "s1.li1":"Real mandates in Houston, Fujairah & Amsterdam",
    "s1.li2":"Verified CIF/FOB operations",
    "s1.li3":"Tank validation / AML compliance",
    "s1.li4":"Deals with traders and refineries",

    "s2.title":"Mining — Where value is defined",
    "s2.li1":"Direct access to producers and regulated brokers",
    "s2.li2":"Mine owners with concessions for sale",
    "s2.li3":"Joint ventures and financing",
    "s2.li4":"Lithium, gold, copper and rare earths",

    "s3.title":"Foreign Trade — Validation & execution",
    "s3.li1":"Counterparty & route due diligence",
    "s3.li2":"Secure payment & delivery structures",
    "s3.li3":"Documentation, compliance & insurance",
    "s3.li4":"Logistics cost optimization",

    "s4.title":"Agro — Oils & grains",
    "s4.li1":"Audited origin & standardized contracts",
    "s4.li2":"Spot and forward operations",
    "s4.li3":"Independent QA/QC & quality control",
    "s4.li4":"Integration with trading & port logistics",

    "services.note":"* We work with owners and trading directors (ticket ≥ USD 500k).",

    "mentoring.title":"Book mentorship / Express due diligence",
    "mentoring.lead":"Pay upfront and we coordinate immediately. No time limit per call; we stay until the objective is met.",
    "mentoring.opt1":"Initial validation",
    "mentoring.opt1a":"Docs & counterparty review",
    "mentoring.opt1b":"Risk map & next steps",
    "mentoring.opt2":"Deal structuring",
    "mentoring.opt2a":"Term-sheet / CIF-FOB flow",
    "mentoring.opt2b":"Compliance & payments checklist",
    "mentoring.opt3":"Hands-on support",
    "mentoring.opt3a":"Negotiation & ongoing due diligence",
    "mentoring.opt3b":"Support until signing",

    "books.title":"Books",
    "books.buy":"Buy on Amazon",

    "web.title":"Web development · SEO · Branding",
    "web.lead":"Your digital presence ready to sell more.",
    "web.basic":"Basic website",
    "web.b1":"Up to 5 sections",
    "web.b2":"Responsive + WhatsApp",
    "web.b3":"Contact form",
    "web.b4":"Delivery: 7–10 days",
    "web.corp":"Corporate website",
    "web.c1":"Up to 10 sections",
    "web.c2":"Branding + Blog",
    "web.c3":"Starter SEO + Analytics",
    "web.c4":"Delivery: 15–25 days",
    "web.prem":"Premium / e-commerce",
    "web.p1":"Store (up to 50 products)",
    "web.p2":"Integrated payments (PayPal/Stripe/MercadoPago)",
    "web.p3":"Advanced SEO + CRM",
    "web.p4":"Delivery: 30–45 days"
  }
};

/* Idioma actual */
let lang = 'es';
const $ = sel => document.querySelector(sel);

/* Aplicar idioma */
function applyI18n(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const str = (STRINGS[lang] && STRINGS[lang][key]) || '';
    if (str) el.innerHTML = str;
  });
}

/* WhatsApp links */
function setWA(){
  const link = `https://wa.me/${WA}`;
  $('#ctawhats')?.setAttribute('href', link);
  $('#ctawhats2')?.setAttribute('href', link);
  $('#wafloat')?.setAttribute('href', link);
}

/* Reveal on scroll */
function revealOnScroll(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal, .pricing__card, .book').forEach(el=>io.observe(el));
}

/* Video fallback para iOS si no carga */
function ensureVideo(){
  const v = $('#bgvideo');
  if(!v) return;
  let done=false;
  const markNoVideo = ()=>{ if(!done){ document.querySelector('.hero')?.classList.add('no-video'); done=true; } };
  const timer = setTimeout(markNoVideo, 1800);
  v.addEventListener('canplay', ()=>{ clearTimeout(timer); });
  v.addEventListener('error', markNoVideo);
}

/* Eventos UI */
function bindUI(){
  $('#btnES')?.addEventListener('click', ()=>{ lang='es'; $('#btnES').classList.add('chip--on'); $('#btnEN').classList.remove('chip--on'); applyI18n(); });
  $('#btnEN')?.addEventListener('click', ()=>{ lang='en'; $('#btnEN').classList.add('chip--on'); $('#btnES').classList.remove('chip--on'); applyI18n(); });
  $('#year').textContent = new Date().getFullYear();
}

/* Init */
document.addEventListener('DOMContentLoaded', ()=>{
  setWA();
  bindUI();
  applyI18n();
  revealOnScroll();
  ensureVideo();
});
