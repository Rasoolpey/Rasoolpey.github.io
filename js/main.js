/* ============================================================
   main.js — Entry Point
   PCB Portfolio · rasoolpeykarporsan.me · REV A

   Phase 1 · Step 4: GSAP + Lenis + ScrollTrigger initialization
   ============================================================ */

'use strict';

// ---- 1. GSAP plugin registration ----
gsap.registerPlugin(ScrollTrigger);

// ---- 2. Lenis smooth scroll ----
const lenis = new Lenis({
  duration:    1.2,
  easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// Tie Lenis scroll events to GSAP ScrollTrigger so pinning works correctly
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis from GSAP's requestAnimationFrame ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ---- 3. Layer navigation ----
const layers   = document.querySelectorAll('.layer[data-layer]');
const navItems = document.querySelectorAll('.layer-nav__item');

// Click a nav bar → Lenis smooth-scrolls to that layer
navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = document.getElementById(`layer-${item.dataset.layer}`);
    if (target) lenis.scrollTo(target, { duration: 1.2 });
  });
});

// Highlight the layer currently in view
const setActiveLayer = (layerNum) => {
  navItems.forEach((item) => item.classList.remove('is-active'));
  const active = document.querySelector(
    `.layer-nav__item[data-layer="${layerNum}"]`
  );
  if (active) active.classList.add('is-active');
};

// Use ScrollTrigger per section — fires reliably with Lenis
layers.forEach((layer) => {
  ScrollTrigger.create({
    trigger:    layer,
    start:      'top center',
    end:        'bottom center',
    onEnter:      () => setActiveLayer(layer.dataset.layer),
    onEnterBack:  () => setActiveLayer(layer.dataset.layer),
  });
});
