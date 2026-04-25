/* ============================================================
   main.js — Entry Point: GSAP + Lenis initialisation
   PCB Portfolio · rasoolpeykarporsan.me · REV A
   ============================================================ */

'use strict';

// ---- 1. Register GSAP plugins ----
gsap.registerPlugin(ScrollTrigger);

// ---- 2. Lenis smooth scroll ----
const lenis = new Lenis({
  duration:    1.2,
  easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// Expose globally so transition.js can call lenis.scrollTo()
window.lenis = lenis;

// Feed Lenis scroll events into ScrollTrigger (keeps pinning accurate)
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis from GSAP's unified RAF ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
