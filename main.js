// Año en footer
document.getElementById('y').textContent = new Date().getFullYear();

// Activar animaciones suaves al entrar en viewport
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold: .1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Video del hero: solo en pantallas grandes y si no hay ahorro de datos
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const isSmall = window.matchMedia('(max-width: 820px)').matches;
  const video = document.getElementById('bgvideo');

  if (!video) return;

  // Si es móvil/ahorro de datos/reduced motion → no cargamos video
  if (prefersReduced || saveData || isSmall) return;

  // Carga diferida (cuando el hero entra en viewport)
  const start = () => {
    if (video.dataset.loaded) return;
    video.src = '/img/galaxy.mp4'; // usa SOLO esta ruta en el repo
    video.addEventListener('loadeddata', () => {
      video.play().catch(()=>{});
      video.style.opacity = '1';
    }, {once:true});
    video.dataset.loaded = '1';
  };

  const vIO = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ start(); vIO.disconnect(); }});
  },{rootMargin:'200px 0px'});
  vIO.observe(document.querySelector('#hero'));
})();
