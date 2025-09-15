// WhatsApp deep link
function openWA(){
  const msg = encodeURIComponent("Hola Abraxas, quiero agendar una mentoría.");
  window.open(`https://wa.me/5493417400299?text=${msg}`, "_blank");
}

// Year
document.getElementById('y').textContent = new Date().getFullYear();

// Bilingual toggler
const es = {
  "nav.offer":"Oferta","nav.books":"Libros","nav.payments":"Pagos","nav.about":"Acerca","nav.contact":"Contacto",
  "cta.book":"Agendar",
  "hero.h1a":"Acceso real","hero.h1b":"sin humo",
  "hero.sub":"Oil & Gas, Minería, Agro y Comercio Exterior. Ejecutamos con dueños y directores de supply/trading (ticket ≥ USD 500k).",
  "hero.cta1":"Ver oferta","hero.cta2":"Hablar por WhatsApp",
  "offer.title":"¿Qué ofrecemos?",
  "offer.gas.title":"All In Gas — Acceso directo, sin humo",
  "offer.gas.i1":"Mandatos reales en Houston, Fujairah y Ámsterdam",
  "offer.gas.i2":"Operaciones CIF/FOB verificadas",
  "offer.gas.i3":"Validación de tanque / compliance AML",
  "offer.gas.i4":"Tratos con traders y refinerías directas",
  "offer.mining.title":"Minería — Donde se define el valor",
  "offer.mining.i1":"Acceso directo a productores y brokers regulados",
  "offer.mining.i2":"Dueños de concesiones en venta",
  "offer.mining.i3":"Joint ventures y financiamiento",
  "offer.mining.i4":"Litio, oro, cobre y tierras raras",
  "offer.trade.title":"Comercio Exterior — Validación y ejecución",
  "offer.trade.i1":"Due diligence de counterparties y rutas",
  "offer.trade.i2":"Estructuras seguras de pago y entrega",
  "offer.trade.i3":"Documentación, compliance y seguros",
  "offer.trade.i4":"Optimización de costos logísticos",
  "offer.agro.title":"Agro — Aceites y granos",
  "offer.agro.i1":"Origen auditado y contratos estandarizados",
  "offer.agro.i2":"Operaciones spot y a término",
  "offer.agro.i3":"QA/QC independiente y control de calidad",
  "offer.agro.i4":"Integración con trading y logística portuaria",
  "offer.note":"* Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k).",
  "books.title":"Libros","books.buy":"Comprar en Amazon",
  "pay.title":"Reservar mentoría · Pago anticipado","pay.payoneer":"Transferencia bancaria (Payoneer/USD)","pay.cta":"Enviar comprobante y agendar",
  "about.p1":"Abraxas es la dualidad hecha método: riesgo y control, intuición y proceso. Nacimos en operaciones reales y llevamos deals desde el origen hasta la liquidación.",
  "about.p2":"Nuestro sello: acceso directo, compliance sin excusas y ejecución silenciosa. Operamos con mandatarios en Oil & Gas, productores y brokers regulados en Minería, y cadenas auditadas en Agro.",
  "about.p3":"Si buscás ruido y promesas, no somos tu socio. Si buscás cerrar bien, a la primera, hablemos.",
  "about.role":"CEO · Abraxas Group",
  "contact.title":"Contacto","contact.whatsapp":"Escribir por WhatsApp"
};

const en = {
  "nav.offer":"Offer","nav.books":"Books","nav.payments":"Payments","nav.about":"About","nav.contact":"Contact",
  "cta.book":"Book a call",
  "hero.h1a":"Real access","hero.h1b":"no smoke",
  "hero.sub":"Oil & Gas, Mining, Agri and Foreign Trade. We execute with owners and supply/trading directors (ticket ≥ USD 500k).",
  "hero.cta1":"See offer","hero.cta2":"Chat on WhatsApp",
  "offer.title":"What we offer",
  "offer.gas.title":"All In Gas — Direct access, no smoke",
  "offer.gas.i1":"Real mandates in Houston, Fujairah and Amsterdam",
  "offer.gas.i2":"Verified CIF/FOB operations",
  "offer.gas.i3":"Tank validation / AML compliance",
  "offer.gas.i4":"Deals with traders and direct refineries",
  "offer.mining.title":"Mining — Where value is defined",
  "offer.mining.i1":"Direct access to producers & regulated brokers",
  "offer.mining.i2":"Owners of concessions for sale",
  "offer.mining.i3":"Joint ventures & financing",
  "offer.mining.i4":"Lithium, gold, copper and rare earths",
  "offer.trade.title":"Foreign Trade — Validation & execution",
  "offer.trade.i1":"Counterparty & route due diligence",
  "offer.trade.i2":"Secure payment & delivery structures",
  "offer.trade.i3":"Documentation, compliance & insurance",
  "offer.trade.i4":"Logistics cost optimization",
  "offer.agro.title":"Agri — Oils & grains",
  "offer.agro.i1":"Audited origin & standard contracts",
  "offer.agro.i2":"Spot and forward operations",
  "offer.agro.i3":"Independent QA/QC and quality control",
  "offer.agro.i4":"Integration with trading & port logistics",
  "offer.note":"* We work with owners and supply/trading directors (ticket ≥ USD 500k).",
  "books.title":"Books","books.buy":"Buy on Amazon",
  "pay.title":"Book mentorship · Prepayment","pay.payoneer":"Bank transfer (Payoneer/USD)","pay.cta":"Send receipt & schedule",
  "about.p1":"Abraxas is duality turned method: risk & control, intuition & process. Born in real operations, we drive deals end-to-end.",
  "about.p2":"Our mark: direct access, zero-excuse compliance and silent execution. Oil & Gas mandates, regulated Mining producers/brokers and audited Agri chains.",
  "about.p3":"If you want noise and promises, we’re not your partner. If you want to close right, the first time, let’s talk.",
  "about.role":"CEO · Abraxas Group",
  "contact.title":"Contact","contact.whatsapp":"Message on WhatsApp"
};

const $ = (s)=>document.querySelectorAll(`[data-i18n="${s}"]`);
function setLang(lang){
  const dict = (lang==='en')? en : es;
  document.documentElement.lang = (lang==='en')?'en':'es';
  for(const key in dict){
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => el.textContent = dict[key]);
  }
  localStorage.setItem('ax_lang', lang);
  document.getElementById('btnES').classList.toggle('active', lang!=='en');
  document.getElementById('btnEN').classList.toggle('active', lang==='en');
}

// Hook buttons
document.getElementById('btnES').onclick = ()=>setLang('es');
document.getElementById('btnEN').onclick = ()=>setLang('en');

// Init
setLang(localStorage.getItem('ax_lang') || 'es');
