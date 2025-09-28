// Mobile nav toggle
(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.style.display = open ? 'none' : 'flex';
  });
})();

// Intersection reveal (adds .is-visible to .reveal if needed)
(function(){
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
  }, { threshold: .2 });
  els.forEach(el => io.observe(el));
})();

// Grade ring helper
function animateRing(el, pct, ms){
  if (!el) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = performance.now();
  const from = parseFloat(getComputedStyle(el).getPropertyValue('--angle')) || 0;
  const to = Math.max(0, Math.min(100, pct));
  if (reduce){ el.style.setProperty('--angle', to + '%'); return; }
  (function frame(t0){
    const t = Math.min(1, (t0 - start) / (ms||900));
    const eased = 1 - Math.pow(1 - t, 3);
    const v = from + (to - from) * eased;
    el.style.setProperty('--angle', v.toFixed(2) + '%');
    if (t < 1) requestAnimationFrame(frame);
  })(start);
}
window.Slab = Object.assign(window.Slab||{}, { animateRing });
