/* Sun Metalon — feature-cards sticky horizontal scroll
   Ported 1:1 from _nuxt/B63jgYxe.js FeatureCards module.
     - On resize, size .wrapper to hold the sticky travel range.
     - On scroll, translate-x each card independently toward its
       equidistant target, clamped per-card. */

(function () {
  const gsap   = window.gsap;
  const wrap   = document.getElementById('wrapper');
  const row    = document.getElementById('cards');
  const cards  = Array.from(row.children);
  if (!gsap || !row || cards.length === 0) return;

  /* Per-card quickTo("x") accessors. quickTo coalesces rapid set()
     calls into a single tweened transform — matches the original
     `f.quickTo(e, "x", { duration: .15 })` line. */
  const setX = cards.map(el => gsap.quickTo(el, 'x', { duration: 0.15 }));

  const isMobile = () => window.matchMedia('(max-width: 766px)').matches;

  function sizeWrapper() {
    const firstCardW = cards[0].clientWidth;
    const sidePad    = (window.innerWidth - firstCardW) / 2;
    let h = row.scrollWidth - sidePad;
    if (isMobile()) h = row.scrollWidth + window.innerWidth;
    wrap.style.height = h + 'px';
  }

  function onScroll() {
    /* d = scroll past the wrapper's top.
       n = wrapper-row top relative to viewport; sticky is engaged when
       n <= 0 (the original code checks `n <= 0` exactly the same way). */
    const u = wrap.offsetTop;
    const n = row.getBoundingClientRect().top;
    const d = window.scrollY - u;
    const W = cards.length - 1;

    cards.forEach((el, h) => {
      const k = window.innerWidth - el.clientWidth;     // total travel
      const T = (k / W) * h;                            // final equidistant x
      /* GSAP's clamp(min, max, value): treat min=T-offsetLeft (a negative
         number, the card's stop position), max=0 (no rightward drift),
         value=-d (current scroll-driven candidate). */
      const y = gsap.utils.clamp(T - el.offsetLeft, 0, -d);
      setX[h](n <= 0 ? y : 0);
    });
  }

  sizeWrapper();
  window.addEventListener('resize', sizeWrapper);
  window.addEventListener('scroll', onScroll, { passive: true });
  /* Run once so initial paint matches the pinned state if the user
     refreshes mid-scroll. */
  onScroll();
})();
