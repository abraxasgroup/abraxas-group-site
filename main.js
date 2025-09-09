
// Simple bilingual toggle
(function(){
  const btn = document.getElementById('langToggle');
  let lang = 'es';
  function sync(){
    document.querySelectorAll('[data-es]').forEach(el => {
      el.textContent = el.getAttribute(lang === 'es' ? 'data-es' : 'data-en');
    });
    btn.textContent = (lang === 'es') ? 'EN' : 'ES';
    document.documentElement.lang = lang;
  }
  btn.addEventListener('click', () => { lang = (lang === 'es') ? 'en' : 'es'; sync(); });
  sync();
})();
