// WhatsApp
const WA = "5493417400299";
const whatsURL = (msg="Hola, vengo de la web de Abraxas.") =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

// Set enlaces
const ctaWhats = document.getElementById('ctaWhats');
const ctaMentor = document.getElementById('ctaMentor');
const ctaWeb   = document.getElementById('ctaWeb');
const fabWhats = document.getElementById('fabWhats');
[ctaWhats, ctaMentor, ctaWeb, fabWhats].forEach(el=>{
  if(!el) return;
  let text = el.id==='ctaWeb' ? 'Quiero cotizar mi web' : 'Hola, vengo de la web de Abraxas.';
  el.href = whatsURL(text);
});

// Año footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Fallback si el video no puede reproducir (autoplay bloqueado)
const v = document.getElementById('bgvideo');
if (v) {
  const playIt = () => v.play().catch(()=>{ v.style.display='none'; document.querySelector('.bgimg').style.display='block'; });
  if (document.visibilityState === 'visible') playIt();
  document.addEventListener('visibilitychange', () => document.visibilityState==='visible' && playIt());
}

// ======== I18N simple ========
const dict = {
  es: {
    'nav.offer':'Oferta','nav.books':'Libros','nav.about':'Acerca','nav.schedule':'Agendar',
    'hero.titleA':'Acceso real a','hero.energy':'energía','hero.mining':'minería','hero.and':'y','hero.agro':'agro','hero.titleB':' — con validación y ejecución.',
    'hero.sub':'Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k). Sin humo, con compliance.',
    'cta.whatsapp':'Hablar por WhatsApp','cta.seeOffer':'Ver oferta','cta.quote':'Quiero cotizar mi web',
    'services.title':'¿Qué ofrecemos?',
    's1.title':'All In Gas — Acceso directo, sin humo','s1.1':'Mandatos reales en Houston, Fujairah y Ámsterdam','s1.2':'Operaciones CIF/FOB verificadas','s1.3':'Validación de tanque / compliance AML','s1.4':'Tratos con traders y refinerías directas',
    's2.title':'Minería — Donde se define el valor','s2.1':'Acceso directo a productores y brokers regulados','s2.2':'Dueños de concesiones en venta','s2.3':'Joint ventures y financiamiento','s2.4':'Litio, oro, cobre y tierras raras',
    's3.title':'Comercio Exterior — Validación y ejecución','s3.1':'Due diligence de counterparties y rutas','s3.2':'Estructuras seguras de pago y entrega','s3.3':'Documentación, compliance y seguros','s3.4':'Optimización de costos logísticos',
    's4.title':'Agro — Aceites y granos','s4.1':'Origen auditado y contratos estandarizados','s4.2':'Operaciones spot y a término','s4.3':'QA/QC independiente y control de calidad','s4.4':'Integración con trading y logística portuaria',
    'web.title':'Estudio Web — SEO · Branding · Web',
    'books.title':'Libros','books.buyAmazon':'Comprar en Amazon',
    'about.title':'Acerca de Abraxas','about.story':'Abraxas nace de la dualidad: orden y caos, intuición y método. Operamos en esa tensión para convertir oportunidades complejas en acuerdos ejecutables. Nuestra obsesión: validar, ejecutar y entregar.',
    'agenda.title':'Reservar mentoría / Book mentorship','agenda.note':'Sin límite de tiempo por llamada. Validación y plan claro.'
  },
  en: {
    'nav.offer':'Offer','nav.books':'Books','nav.about':'About','nav.schedule':'Schedule',
    'hero.titleA':'Real access to','hero.energy':'energy','hero.mining':'mining','hero.and':'and','hero.agro':'agri','hero.titleB':' — with validation and execution.',
    'hero.sub':'We work with owners and trading/supply directors (ticket ≥ USD 500k). No smoke, with compliance.',
    'cta.whatsapp':'WhatsApp','cta.seeOffer':'See offer','cta.quote':'Get a web quote',
    'services.title':'What we offer',
    's1.title':'All In Gas — Direct access, no smoke','s1.1':'Real mandates in Houston, Fujairah and Amsterdam','s1.2':'Verified CIF/FOB operations','s1.3':'Tank validation / AML compliance','s1.4':'Deals with traders and refineries',
    's2.title':'Mining — Where value is defined','s2.1':'Direct access to producers and regulated brokers','s2.2':'Owners of concessions for sale','s2.3':'Joint ventures and financing','s2.4':'Lithium, gold, copper and rare earths',
    's3.title':'Foreign Trade — Validation & execution','s3.1':'Counterparty & route due diligence','s3.2':'Secure payment & delivery structures','s3.3':'Docs, compliance and insurance','s3.4':'Logistics cost optimization',
    's4.title':'Agri — Oils & grains','s4.1':'Audited origin & standardized contracts','s4.2':'Spot and term operations','s4.3':'Independent QA/QC','s4.4':'Integration with trading & port logistics',
    'web.title':'Web Studio — SEO · Branding · Web',
    'books.title':'Books','books.buyAmazon':'Buy on Amazon',
    'about.title':'About Abraxas','about.story':'Abraxas is born from duality: order and chaos, intuition and method. We operate in that tension to turn complex opportunities into executable deals. Our obsession: validate, execute and deliver.',
    'agenda.title':'Book mentorship','agenda.note':'No time limit per call. Validation and a clear plan.'
  }
};

// Cambiar idioma
const applyI18n = (lang='es')=>{
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const t = (dict[lang] && dict[lang][key]) || el.textContent;
    el.textContent = t;
  });
  document.getElementById('btnES').classList.toggle('chip-on', lang==='es');
  document.getElementById('btnEN').classList.toggle('chip-on', lang==='en');
  // Actualizar textos de CTAs (query ya seteada)
  if (lang==='en') {
    ctaWhats && (ctaWhats.textContent = dict.en['cta.whatsapp']);
    ctaMentor && (ctaMentor.textContent = dict.en['cta.whatsapp']);
    ctaWeb && (ctaWeb.textContent   = dict.en['cta.quote']);
  } else {
    ctaWhats && (ctaWhats.textContent = dict.es['cta.whatsapp']);
    ctaMentor && (ctaMentor.textContent = dict.es['cta.whatsapp']);
    ctaWeb && (ctaWeb.textContent   = dict.es['cta.quote']);
  }
};
applyI18n('es');

document.getElementById('btnES').addEventListener('click', ()=>applyI18n('es'));
document.getElementById('btnEN').addEventListener('click', ()=>applyI18n('en'));
