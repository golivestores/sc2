/* Sun Metalon — stacking-cards 3D fold + briquette drift.
   Ported 1:1 from _nuxt/ktxii4yA.js. */

(function () {
  const gsap = window.gsap;
  const ST   = window.ScrollTrigger;
  if (!gsap || !ST) return;
  gsap.registerPlugin(ST);

  const section = document.getElementById('section');
  const cards   = Array.from(document.querySelectorAll('#cards .card'));
  const brick1  = document.getElementById('brick1');
  const brick2  = document.getElementById('brick2');
  if (!section || cards.length === 0) return;

  /* Per-card 3D fold under the next card.
     Runs on every scroll tick (passive). The values come straight from
     the original Nuxt source:
       r = clamp(0, 1, nextCard.top / currentCard.height)
       scale   = 0.8 + 0.2 * r     // 1 -> 0.8 as it gets covered
       opacity = 1   *       r     // 1 -> 0
       rotateX = 15 - 15 *   r     // 0 -> 15deg
       rotateY = 15 - 15 *   r     // 0 -> 15deg
     Tilt feels 3D because the parent .cards has  perspective: 50em. */
  function onScroll() {
    for (const t of cards) {
      const a = t.nextElementSibling;
      if (!a) continue;
      const f = t.clientHeight;
      const B = a.getBoundingClientRect().top;
      const r = gsap.utils.clamp(0, 1, B / f);
      if (r < 1) t.classList.add('falling');
      else       t.classList.remove('falling');
      gsap.set(t, {
        scale:   0.8 + 0.2 * r,
        opacity: 1 * r,
        rotateX: 15 - 15 * r,
        rotateY: 15 - 15 * r
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Briquette scrollTrigger drift — bound to the whole section's
     viewport range, scrub-eased for that lazy float feel. */
  const trig = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2, fastScrollEnd: true };
  if (brick1) gsap.to(brick1, { yPercent: -100, rotate: -25, scrollTrigger: trig });
  if (brick2) gsap.to(brick2, { yPercent:  100, rotateZ: 50,  scrollTrigger: trig });

  /* The original code dispatches a resize + ScrollTrigger.refresh() 500ms
     after mount to let images settle — matches the fixture's behaviour. */
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    ST.refresh();
  }, 500);
})();
