(function(){
  const ring = document.querySelector('[data-ring]');
  const out  = document.querySelector('[data-ring-out]');
  if (!ring || !out) return;
  // Example value; can be replaced via dataset later
  const pct = parseFloat(ring.dataset.pct || '87'); // 0..100
  const score = (pct/10).toFixed(2); // 0..10.00
  out.textContent = score;
  if (window.Slab && Slab.animateRing) Slab.animateRing(ring, pct, 900);
})();
