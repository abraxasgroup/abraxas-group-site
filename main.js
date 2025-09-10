// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Drawer
const drawer = document.getElementById('drawer');
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', ()=> drawer.classList.toggle('open'));
drawer.querySelectorAll('.close').forEach(a=>a.addEventListener('click', ()=>drawer.classList.remove('open')));

// Idioma
const langButtons = document.querySelectorAll('.lang-switch .chip');
const i18nPairs = {
  "nav.services":{"es":"Servicios","en":"Services"},
  "nav.books":{"es":"Libros","en":"Books"},
  "nav.about":{"es":"Acerca","en":"About"},
  "nav.mentoring":{"es":"Mentoría","en":"Mentoring"},
  "nav.contact":{"es":"Contacto","en":"Contact"},
  "hero.title.es":{"es":"Negocios internacionales con precisión y confidencialidad.","en":""},
  "hero.title.en":{"es":"", "en":"International deals with precision and confidentiality."},
  "hero.body.es":{"es":null,"en":null}, // textos ya están duplicados en HTML
  "hero.body.en":{"es":null,"en":null},
  "cta.mentor.es":{"es":"Reservar mentoría","en":"Book mentorship"},
  "cta.services.es":{"es":"Ver servicios","en":"See services"},
  "services.title.es":{"es":"Un solo equipo, tres frentes","en":""},
  "services.title.en":{"es":"", "en":"One team, three fronts"},
  "services.oil.title.es":{"es":"Oil & Gas","en":""},
  "services.oil.title.en":{"es":"", "en":"Oil & Gas"},
  "services.oil.body.es":{"es":"Mandatos, compliance KYC/AML, verificación técnica, logística y contratos. Productos: crudo, diésel, jet.","en":""},
  "services.oil.body.en":{"es":"", "en":"Mandates, KYC/AML compliance, technical verification, logistics & contracts. Products: crude, diesel, jet."},
  "services.agri.title.es":{"es":"Granos & Aceites","en":""},
  "services.agri.title.en":{"es":"", "en":"Grains & Oils"},
  "services.agri.body.es":{"es":"Origen verificado, calidad y términos Incoterms. Aceites vegetales, maíz, soja, subproductos.","en":""},
  "services.agri.body.en":{"es":"", "en":"Verified origin, quality and Incoterms. Vegetable oils, corn, soybean, by-products."},
  "services.mining.title.es":{"es":"Minería","en":""},
  "services.mining.title.en":{"es":"", "en":"Mining"},
  "services.mining.body.es":{"es":"Minerales, concentrados y concesiones. Reportes NI 43-101/JORC, due diligence legal y técnico.","en":""},
  "services.mining.body.en":{"es":"", "en":"Minerals, concentrates & concessions. NI 43-101/JORC reports, legal & technical due diligence."},
  "services.note.es":{"es":"Nombres de proyecto ilustrativos, bajo acuerdos de confidencialidad.","en":""},
  "services.note.en":{"es":"", "en":"Project names are illustrative; NDAs protect real parties."},
  "books.title.es":{"es":"Libros","en":""},
  "books.title.en":{"es":"", "en":"Books"},
  "about.title.es":{"es":"Por qué Abraxas","en":""},
  "about.title.en":{"es":"", "en":"Why Abraxas"},
  "about.body.es":{"es":null,"en":null},
  "about.body.en":{"es":null,"en":null},
  "about.foot.es":{"es":"Dirección ejecutiva y coordinación de mandatos internacionales.","en":""},
  "about.foot.en":{"es":"", "en":"Executive direction & coordination of international mandates."},
  "ment.title.es":{"es":"Reservar mentoría","en":""},
  "ment.title.en":{"es":"", "en":"Book mentorship"},
  "ment.body.es":{"es":"Acompañamiento estratégico sin límite de tiempo por call. Pago anticipado.","en":""},
  "ment.body.en":{"es":"", "en":"Strategic support, no time cap per call. Advance payment."},
  "ment.item1.es":{"es":"Oil & Gas, Agri, Minería","en":""},
  "ment.item1.en":{"es":"", "en":"Oil & Gas, Agri, Mining"},
  "ment.item2.es":{"es":"Due diligence, contratos, logística","en":""},
  "ment.item2.en":{"es":"", "en":"Due diligence, contracts, logistics"},
  "ment.item3.es":{"es":"3 calls / mes + WhatsApp","en":""},
  "ment.item3.en":{"es":"", "en":"3 calls / month + WhatsApp"},
  "ment.item4.es":{"es":"Pipeline, cierres y reporting","en":""},
  "ment.item4.en":{"es":"", "en":"Pipeline, closings & reporting"},
  "pay.title.es":{"es":"Formas de pago","en":""},
  "pay.title.en":{"es":"", "en":"Payment methods"},
  "contact.title.es":{"es":"Contacto","en":""},
  "contact.title.en":{"es":"", "en":"Contact"}
};

function setLang(lang){
  document.body.className = `lang-${lang}`;
  langButtons.forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  // Mostrar/ocultar duplicados
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const txt = i18nPairs[key]?.[lang];
    if (txt===null){ // ya hay textos duplicados en el DOM (ES y EN en etiquetas separadas)
      el.style.display = (key.endsWith(`.${lang}`)) ? '' : 'none';
    } else if (typeof txt==="string"){
      if (txt) el.textContent = txt;
      el.style.display = txt==="" ? 'none' : '';
    }
  });
}
langButtons.forEach(b=>b.addEventListener('click', ()=> setLang(b.dataset.lang)));
setLang('es');
