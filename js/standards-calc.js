(function(){
  const form = document.getElementById('sm-calc');
  const out = {
    front: document.getElementById('out-front'),
    back:  document.getElementById('out-back'),
    sm:    document.getElementById('out-sm')
  };
  function val(id){ return parseFloat(document.getElementById(id).value || '0') || 0; }
  function fmt(n){ return (Math.round(n*100)/100).toFixed(2); }

  function compute(){
    const Sf = val('Sf'), Cf = val('Cf'), Ef = val('Ef'), Kf = val('Kf');
    const Sb = val('Sb'), Cb = val('Cb'), Eb = val('Eb'), Kb = val('Kb');
    const front = (Sf+Cf+Ef+Kf)/4;
    const back  = (Sb+Cb+Eb+Kb)/4;
    const sm    = 0.80*front + 0.20*back;
    out.front.textContent = fmt(front);
    out.back.textContent  = fmt(back);
    out.sm.textContent    = fmt(sm);
    const ring = document.querySelector('[data-ring]');
    if (ring && window.Slab && Slab.animateRing){
      Slab.animateRing(ring, Math.max(0, Math.min(100, (sm/10)*100)), 600);
      document.querySelector('[data-ring-out]').textContent = fmt(sm);
    }
  }
  if (form) form.addEventListener('input', compute);
  compute();
})();
