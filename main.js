// WhatsApp links
const WA_NUMBER = "5493417400299";
const WA_TEXT = encodeURIComponent(
  "Hola Abraxas Group, quiero agendar una mentoría."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

function setWA() {
  const a = document.getElementById("ctaWhats");
  if (a) a.href = WA_URL;
  const b = document.getElementById("ctaWhatsBottom");
  if (b) b.href = WA_URL;
  const fab = document.getElementById("waFab");
  if (fab) fab.href = WA_URL;
}

// Video autoplay en iOS + fallbacks
function bootHeroVideo() {
  const v = document.getElementById("heroVideo");
  if (!v) return;

  const tryPlay = () => v.play().catch(() => {});
  tryPlay();

  ["touchstart", "pointerdown", "click", "scroll"].forEach((evt) => {
    window.addEventListener(
      evt,
      () => {
        tryPlay();
      },
      { once: true, passive: true }
    );
  });

  // Si no carga en 3s, oculta video (usa poster)
  setTimeout(() => {
    if (v.readyState < 2) v.style.display = "none";
  }, 3000);
}

// I18N simple
const STR = {
  es: {
    "nav.offer": "Oferta",
    "nav.books": "Libros",
    "nav.about": "Acerca",
    "nav.schedule": "Agendar",

    "hero.leadA": "Acceso real a",
    "hero.leadB": " — con validación y ejecución.",
    "hero.subtitle":
      "Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k). Sin humo, con compliance.",

    "cta.whatsapp": "Hablar por WhatsApp",
    "cta.viewOffer": "Ver oferta",

    "services.title": "¿Qué ofrecemos?",
    "services.note":
      "* Trabajamos con dueños y directores de supply/trading (ticket ≥ USD 500k).",

    "s1.title": "All In Gas — Acceso directo, sin humo",
    "s1.l1": "Mandatos reales en Houston, Fujairah y Ámsterdam",
    "s1.l2": "Operaciones CIF/FOB verificadas",
    "s1.l3": "Validación de tanque / compliance AML",
    "s1.l4": "Tratos con traders y refinerías directas",

    "s2.title": "Minería — Donde se define el valor",
    "s2.l1": "Acceso directo a productores y brokers regulados",
    "s2.l2": "Dueños de concesiones en venta",
    "s2.l3": "Joint ventures y financiamiento",
    "s2.l4": "Litio, oro, cobre y tierras raras",

    "s3.title": "Comercio Exterior — Validación y ejecución",
    "s3.l1": "Due diligence de counterparties y rutas",
    "s3.l2": "Estructuras seguras de pago y entrega",
    "s3.l3": "Documentación, compliance y seguros",
    "s3.l4": "Optimización de costos logísticos",

    "s4.title": "Agro — Aceites y granos",
    "s4.l1": "Origen auditado y contratos estandarizados",
    "s4.l2": "Operaciones spot y a término",
    "s4.l3": "QA/QC independiente y control de calidad",
    "s4.l4": "Integración con trading y logística portuaria",

    "books.title": "Libros",
    "books.minen": "How to be an Intermediary in the Mining Business (EN)",
    "books.mines": "Cómo ser Intermediario en el Negocio de la Minería (ES)",
    "books.oilgas": "La Biblia del Oil & Gas (ES)",
    "books.cta": "Comprar en Amazon",

    "about.title": "Acerca de Abraxas",
    "about.p1":
      "Abraxas simboliza la dualidad y el equilibrio: riesgo y control, visión y ejecución. Nacimos en operaciones reales y llevamos esa práctica a cada proyecto de energía, minería y agro.",
    "about.p2":
      "Conectamos actores serios, validamos operaciones y ejecutamos con estructuras seguras. WeTrade · WeConnect · WeWork.",

    "schedule.title": "Reservar mentoría · Book mentorship",
    "schedule.p":
      "Escríbenos por WhatsApp para coordinar; trabajamos con agenda priorizada."
  },

  en: {
    "nav.offer": "Offer",
    "nav.books": "Books",
    "nav.about": "About",
    "nav.schedule": "Book",

    "hero.leadA": "Real access to",
    "hero.leadB": " — with validation and execution.",
    "hero.subtitle":
      "We work with owners and supply/trading directors (ticket ≥ USD 500k). No smoke, full compliance.",

    "cta.whatsapp": "Chat on WhatsApp",
    "cta.viewOffer": "View offer",

    "services.title": "What do we offer?",
    "services.note":
      "* We work with owners and supply/trading directors (ticket ≥ USD 500k).",

    "s1.title": "All In Gas — Direct access, no smoke",
    "s1.l1": "Real mandates in Houston, Fujairah and Amsterdam",
    "s1.l2": "Verified CIF/FOB operations",
    "s1.l3": "Tank validation / AML compliance",
    "s1.l4": "Deals with traders and refineries",

    "s2.title": "Mining — Where value is defined",
    "s2.l1": "Direct access to producers and regulated brokers",
    "s2.l2": "Mining concessions for sale",
    "s2.l3": "Joint ventures and financing",
    "s2.l4": "Lithium, gold, copper and rare earths",

    "s3.title": "International Trade — Validation and execution",
    "s3.l1": "Counterparty and route due diligence",
    "s3.l2": "Secure payment & delivery structures",
    "s3.l3": "Documentation, compliance & insurance",
    "s3.l4": "Logistics cost optimization",

    "s4.title": "Agri — Oils & Grains",
    "s4.l1": "Audited origin and standardized contracts",
    "s4.l2": "Spot and forward operations",
    "s4.l3": "Independent QA/QC and quality control",
    "s4.l4": "Integration with trading and port logistics",

    "books.title": "Books",
    "books.minen": "How to be an Intermediary in the Mining Business (EN)",
    "books.mines": "How to be an Intermediary in the Mining Business (ES)",
    "books.oilgas": "The Oil & Gas Bible (ES)",
    "books.cta": "View on Amazon",

    "about.title": "About Abraxas",
    "about.p1":
      "Abraxas symbolizes duality and balance: risk and control, vision and execution. We were born in real operations and bring that practice to every energy, mining and agri project.",
    "about.p2":
      "We connect serious players, validate deals and execute with secure structures. WeTrade · WeConnect · WeWork.",

    "schedule.title": "Book mentorship · Reservar mentoría",
    "schedule.p":
      "Message us on WhatsApp to schedule; we work with a prioritized calendar."
  }
};

let currentLang = "es";

function applyI18N(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const str = STR[lang][key];
    if (typeof str === "string") el.innerHTML = str;
  });

  // chips
  document.getElementById("btnES")?.classList.toggle("chip-on", lang==="es");
  document.getElementById("btnEN")?.classList.toggle("chip-on", lang==="en");
}

function wireLang(){
  document.getElementById("btnES")?.addEventListener("click",()=>applyI18N("es"));
  document.getElementById("btnEN")?.addEventListener("click",()=>applyI18N("en"));
}

// Footer year
function setYear(){
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
}

// Boot
document.addEventListener("DOMContentLoaded", () => {
  setWA();
  bootHeroVideo();
  wireLang();
  applyI18N("es");
  setYear();
});
