/* ============================================================
   transition.js — 90° Board Rotation Mechanic
   PCB Portfolio · rasoolpeykarporsan.me · REV A

   Architecture:
   - .scroll-driver  → tall element; its height = total scroll budget
   - .pcb-viewport   → position:sticky 100vh window (the "camera")
   - .layer          → all 5 layers stacked absolutely, same position
   - GSAP timeline   → scrubbed by ScrollTrigger across the driver height
   - Each transition: current layer rotateX 0→90°, edge overlay flashes,
                      next layer rotateX −90°→0°
   ============================================================ */

'use strict';

(function initBoardTransition() {

  /* ----- Elements ----- */
  const driver  = document.getElementById('scrollDriver');
  const layers  = Array.from(document.querySelectorAll('.layer'));
  const navItems = Array.from(document.querySelectorAll('.layer-nav__item'));
  const edgeEl  = document.getElementById('pcbEdge');

  if (!driver || !layers.length) return;

  const N  = layers.length; // 5
  const VH = window.innerHeight;

  /* ----- Scroll budget (in vh, converted to px) -----
   *  READ_VH  — scroll distance where the layer is flat & readable
   *  FLIP_VH  — scroll distance consumed by the actual rotation
   *  TAIL_VH  — extra reading time on the final layer (no outgoing flip)
   *
   *  Per-layer slot = READ_VH + FLIP_VH
   *  Total scroll   = (N-1) × slot + READ_VH + TAIL_VH
   */
  const READ_VH = 80;
  const FLIP_VH = 120;
  const TAIL_VH = 100;
  const SLOT_VH = READ_VH + FLIP_VH;                             // 200 vh

  const totalPx = ((SLOT_VH * (N - 1)) + READ_VH + TAIL_VH) * VH / 100;
  driver.style.height = `${totalPx}px`;

  /* ----- Fractions within one timeline "slot" (duration 1.0) -----
   *  0.0 → readFrac  : flat, reading zone (empty tween)
   *  readFrac → 0.85 : current layer folds away (rotateX 0 → 90)
   *  midpoint         : edge overlay briefly visible
   *  0.55 → 1.0      : next layer unfolds into view (rotateX −90 → 0)
   */
  const readFrac = READ_VH / SLOT_VH;  // 0.40
  const flipFrac = FLIP_VH / SLOT_VH;  // 0.60

  /* ----- Initial states -----
   * Layer 1 starts flat (rotateX:0). All others start folded behind
   * (rotateX:−90) so they're invisible until the flip brings them in.
   */
  layers.forEach((layer, i) => {
    gsap.set(layer, {
      rotateX:         i === 0 ? 0 : -90,
      transformOrigin: '50% 50% 0',
    });
  });
  gsap.set(edgeEl, { opacity: 0 });

  /* ----- Master timeline -----
   * Each slot occupies duration 1.0.
   * Timeline total duration = (N-1) + (READ_VH + TAIL_VH) / SLOT_VH
   *                         = 4 + 0.9 = 4.9 (for 5 layers)
   */
  const masterTL = gsap.timeline({ paused: true });

  for (let i = 0; i < N - 1; i++) {
    const cur  = layers[i];
    const next = layers[i + 1];
    const t    = i; // slot start position in the timeline

    // Reading zone — hold with an empty tween to allocate timeline space
    masterTL.to({}, { duration: readFrac }, t);

    // Phase A: current layer folds away (rotateX 0 → 90°, edge-on)
    masterTL.to(cur, {
      rotateX: 90,
      ease:    'power2.in',
      duration: flipFrac * 0.44,
    }, t + readFrac);

    // Edge overlay: fade in just as the layer goes edge-on (board is thin)
    masterTL
      .to(edgeEl, {
        opacity:  1,
        duration: flipFrac * 0.08,
        ease:     'none',
      }, t + readFrac + flipFrac * 0.42)
      .to(edgeEl, {
        opacity:  0,
        duration: flipFrac * 0.08,
        ease:     'none',
      }, t + readFrac + flipFrac * 0.50);

    // Phase B: next layer unfolds into view (rotateX −90° → 0)
    masterTL.to(next, {
      rotateX: 0,
      ease:    'power2.out',
      duration: flipFrac * 0.44,
    }, t + readFrac + flipFrac * 0.56);
  }

  // Reserve timeline space for the last layer's reading time
  masterTL.to({}, {
    duration: (READ_VH + TAIL_VH) / SLOT_VH,
  }, N - 1);

  /* ----- ScrollTrigger: scrub timeline across the full scroll driver -----
   * scrub:1.2 adds 1.2s of lag so the rotation follows the wheel, not
   * jumping ahead. Adjust if you want it snappier (scrub:0.8) or lazier.
   */
  ScrollTrigger.create({
    trigger:   driver,
    start:     'top top',
    end:       'bottom bottom',
    scrub:     1.2,
    animation: masterTL,
    onUpdate(self) {
      // Calculate which layer is currently active and sync the nav panel
      const totalSlots  = (N - 1) + (READ_VH + TAIL_VH) / SLOT_VH;
      const currentSlot = self.progress * totalSlots;
      const activeIdx   = Math.min(Math.floor(currentSlot), N - 1);
      _setActiveNav(activeIdx + 1);
    },
  });

  /* ----- Nav panel: click to jump to a layer's scroll position ----- */
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx       = parseInt(item.dataset.layer, 10) - 1; // 0-based
      const slotPx    = SLOT_VH * VH / 100;
      const targetY   = idx * slotPx;

      if (window.lenis) {
        window.lenis.scrollTo(targetY, { duration: 1.4 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

  /* ----- Helper: update layer nav active state ----- */
  function _setActiveNav(layerNum) {
    navItems.forEach((item) => item.classList.remove('is-active'));
    const active = document.querySelector(
      `.layer-nav__item[data-layer="${layerNum}"]`
    );
    if (active) active.classList.add('is-active');
  }

})();

