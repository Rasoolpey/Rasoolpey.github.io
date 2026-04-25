/* ============================================================
   main.js — Entry Point
   PCB Portfolio · rasoolpeykarporsan.me · REV A

   Phase 1 · Step 1: Layer nav scroll highlighting
   ============================================================ */

'use strict';

// ---- Layer Navigation: scroll-based active state ----
(function initLayerNav() {
  const navItems = document.querySelectorAll('.layer-nav__item');
  const layers   = document.querySelectorAll('.layer[data-layer]');

  if (!navItems.length || !layers.length) return;

  // Click a nav bar → smooth-scroll to that layer
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = document.getElementById(`layer-${item.dataset.layer}`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // IntersectionObserver → mark which layer is in view
  const setActive = (layerNum) => {
    navItems.forEach((item) => item.classList.remove('is-active'));
    const active = document.querySelector(
      `.layer-nav__item[data-layer="${layerNum}"]`
    );
    if (active) active.classList.add('is-active');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.dataset.layer);
        }
      });
    },
    { threshold: 0.5 }
  );

  layers.forEach((layer) => observer.observe(layer));
})();
