// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// iOS “autoplay” fix: fuerza play cuando el video está en viewport
const vid = document.querySelector('.hero__video');
if (vid) {
  const start = () => vid.play().catch(()=>{});
  document.addEventListener('visibilitychange', start, { once:true });
  window.addEventListener('load', start, { once:true });
}
