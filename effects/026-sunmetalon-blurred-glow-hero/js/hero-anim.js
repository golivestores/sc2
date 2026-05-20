/* Sun Metalon hero entry timeline + scroll-linked figure tilt.
   Ported 1:1 from sunmetalon.com bundle _nuxt/B-7h_iCS.js — same eases,
   stagger config, and labels (SVG / SPLIT / IMAGE). GSAP's CustomEase
   "cubic.inOut" is not built-in; we map it to power3.inOut which is
   the same Bezier (.65, 0, .35, 1) up to a hair of rounding. */

(function () {
  const s = window.gsap;
  if (!s) return;

  const section  = document.querySelector('section.page-header');
  const h5       = section.querySelector('h5');
  const logoSVG  = section.querySelector('svg.large-logo');
  const logoPath = section.querySelectorAll('svg.large-logo path');
  const graphic  = section.querySelector('div.graphic');
  const figure   = section.querySelector('figure');
  const glow     = section.querySelector('.glow');

  /* Hand-rolled split: wrap every glyph of left + right span in
     <span class="char"> so GSAP can stagger them. The site uses
     gsap-split-text for the same job. */
  function wrapChars(spanEl) {
    const txt = spanEl.textContent;
    spanEl.textContent = '';
    const chars = [];
    for (const ch of txt) {
      const w = document.createElement('span');
      w.className = 'char';
      w.style.display = 'inline-block';
      w.textContent = ch === ' ' ? ' ' : ch;
      spanEl.appendChild(w);
      if (ch !== ' ') chars.push(w);
    }
    return chars;
  }
  const chars = [
    ...wrapChars(h5.querySelector('span.left')),
    ...wrapChars(h5.querySelector('span.right'))
  ];

  s.set(chars, { opacity: 0 });
  h5.classList.remove('pre-anim');

  const isMobile = window.matchMedia('(max-width: 939px)').matches;
  const a = s.timeline();

  a.to(chars, {
    opacity: 1, stagger: 0.005, duration: 0.75, ease: 'power3.inOut'
  });

  a.add('SVG');
  a.fromTo(logoPath, { opacity: 0 }, {
    opacity: 1, duration: 1.25, ease: 'power3.inOut',
    stagger: { each: 0.075, from: 'end', axis: 'x' },
    onStart: () => logoSVG.classList.remove('pre-anim')
  }, '<30%');

  a.fromTo(glow, { opacity: 0 }, {
    opacity: 1, duration: 1.65, ease: 'power3.inOut',
    onStart: () => glow.classList.remove('pre-anim')
  }, 'SVG+=50%');

  a.add('SPLIT');
  a.to(graphic, {
    width: isMobile ? 14 : 'auto',
    flex: 1,
    duration: 1.25, ease: 'power3.inOut'
  }, 'SVG+=10%');

  a.add('IMAGE');
  a.fromTo(figure, { opacity: 0 }, {
    opacity: 1, duration: 0.35,
    onStart: () => figure.classList.remove('pre-anim')
  }, '<60%');
  a.fromTo(figure, { scale: 0.98, rotateZ: 5 }, {
    scale: 1, rotateZ: 0, duration: 0.95, ease: 'power3.out'
  }, '<');

  /* Scroll-linked tilt: 1 deg per 100 px of scroll, clamped to +/-15.
     The live site runs all wheel input through Lenis (lerp 0.1,
     smoothWheel true, wheelMultiplier 1 — the defaults), so the
     scrollState the rotate reads is a lerp-smoothed value, not the
     native scrollY that jumps by 100px per wheel notch. We do the
     same here: if Lenis loaded, take wheel control and listen to its
     scroll event; otherwise fall back to native scroll. */
  const Lenis = window.Lenis;
  function applyTilt(y) {
    s.set(figure, { rotateZ: s.utils.clamp(-15, 15, y * -0.01) });
  }
  if (Lenis) {
    const lenis = new Lenis();          // defaults: smoothWheel, lerp .1
    lenis.on('scroll', e => applyTilt(e.scroll));
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } else {
    window.addEventListener('scroll',
      () => applyTilt(window.scrollY), { passive: true });
  }
})();
