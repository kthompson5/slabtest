(function(){
  const form = document.getElementById('submit-form');
  const summary = document.getElementById('submit-summary');
  if (!form || !summary) return;
  function renderSummary(d){
    summary.innerHTML = `
      <div class="card print-summary">
        <h3>Submission Summary</h3>
        <p><strong>Name:</strong> ${d.name}<br/>
        <strong>Email:</strong> ${d.email}<br/>
        <strong>Service:</strong> ${d.service}</p>
        <p><strong>Card:</strong> ${d.player} — ${d.set} ${d.number} (${d.variant||''})</p>
        <p><strong>Notes:</strong> ${d.notes||'-'}</p>
      </div>`;
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    renderSummary(data);
    window.scrollTo({ top: summary.offsetTop - 20, behavior: 'smooth' });
  });
})();
