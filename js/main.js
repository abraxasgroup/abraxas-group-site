/* Abraxas Group — main.js (modo nuevo: logística/food/commodities)
   - Mobile nav (.is-open)
   - Smooth scroll
   - WhatsApp prefilled message
   - No incluye el minijuego viejo (Clarity) para evitar conflictos
*/

(function () {
  "use strict";

  // ========= Helpers =========
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ========= Mobile nav =========
  const nav = $("#nav");
  const navToggle = $("#navToggle");

  function openNav() {
    nav?.classList.add("is-open");
    navToggle?.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
  function toggleNav() {
    if (!nav) return;
    nav.classList.contains("is-open") ? closeNav() : openNav();
  }

  navToggle?.addEventListener("click", toggleNav);

  // Cerrar nav al clickear un link
  $$(".nav a").forEach((a) => {
    a.addEventListener("click", () => {
      // En mobile, cerramos
      closeNav();
    });
  });

  // Cerrar nav si click afuera (solo mobile)
  document.addEventListener("click", (e) => {
    if (!nav || !navToggle) return;
    const isOpen = nav.classList.contains("is-open");
    if (!isOpen) return;

    const clickedInsideNav = nav.contains(e.target);
    const clickedToggle = navToggle.contains(e.target);
    if (!clickedInsideNav && !clickedToggle) closeNav();
  });

  // ========= Smooth scroll (anclas) =========
  // Evita saltos bruscos + compensa header sticky
  const header = $(".site-header");
  const headerOffset = () => (header ? header.getBoundingClientRect().height : 64);

  function smoothToHash(hash) {
    const id = hash?.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerOffset() + 10);
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Intercepta clicks a anchors internas
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      history.pushState(null, "", href);
      smoothToHash(href);
    });
  });

  // Si cargás con hash, baja suave
  window.addEventListener("load", () => {
    if (window.location.hash) smoothToHash(window.location.hash);
  });

  // ========= WhatsApp prefilled =========
  // Usá el botón flotante .wb-float o cualquier link con data-wa
  const waBtn = $(".wb-float");
  const waPhone = "541126693072"; // tu número sin + ni espacios

  const defaultMsg =
    "Hola Abraxas Group. Estoy interesado en sus servicios de logística y commodities alimenticios. ¿Podrían brindarme más información sobre disponibilidad, zonas (Argentina/Paraguay/Bolivia/Perú) y próximos pasos?";

  function buildWhatsAppUrl(message) {
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${waPhone}?text=${text}`;
  }

  if (waBtn) {
    // Si el HTML ya trae href, lo reemplazamos por el prefilled
    waBtn.setAttribute("href", buildWhatsAppUrl(defaultMsg));
    waBtn.setAttribute("target", "_blank");
    waBtn.setAttribute("rel", "noopener");
  }

  // ========= Planet Defense guard (solo valida que exista canvas) =========
  // planet-defense.js ya se encarga del juego. Esto solo evita “silencios”:
  const pdCanvas = $("#planet-defense-canvas");
  const gameSection = $("#game");

  if (gameSection && !pdCanvas) {
    // Si no está el canvas, avisamos en consola (no rompe la web)
    console.warn(
      "[Abraxas] Falta <canvas id='planet-defense-canvas'> dentro de la sección #game. El juego no va a renderizar."
    );
  }

  // ========= Video background safeties =========
  // iOS/Safari a veces no auto-playea si no está muted/playsinline
  const bgVideo = $("#universe-bg");
  if (bgVideo && bgVideo.tagName === "VIDEO") {
    bgVideo.muted = true;
    bgVideo.setAttribute("muted", "");
    bgVideo.setAttribute("playsinline", "");
    // Intento de play sin romper si el browser lo bloquea
    const p = bgVideo.play?.();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }
})();
