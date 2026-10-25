document.addEventListener('DOMContentLoaded', () => {
  const range = document.getElementById('calcRange');
  if (!range) return;

  const amountLabel = document.getElementById('calcAmountLabel');
  const resultAmount = document.getElementById('calcResultAmount');
  const termLabel = document.getElementById('calcTermLabel');
  const waBtn = document.getElementById('calcWa');
  const waLabel = document.getElementById('calcWaLabel');
  const termBtns = document.querySelectorAll('.term-btn');

  const PHONE = '27630360726';
  let currentTerm = 3;

  function formatZAR(n) {
    return 'R' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function update() {
    const amount = parseInt(range.value, 10);
    const amountStr = formatZAR(amount);

    if (amountLabel) amountLabel.textContent = amountStr;
    if (resultAmount) resultAmount.textContent = amountStr;
    if (termLabel) termLabel.textContent = currentTerm + (currentTerm === 1 ? ' Month' : ' Months');
    if (waLabel) waLabel.textContent = 'Request quotation for ' + amountStr;

    const min = Number(range.min);
    const max = Number(range.max);
    const pct = ((amount - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0EA5E9 0%, #0284C7 ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`;

    if (waBtn) {
      const msg = encodeURIComponent(
        `Good day, Pfukani Cash Loans. I am interested in a ${currentTerm}-month loan of ${amountStr}. Please guide me on requirements and written quotation.`
      );
      waBtn.href = `https://wa.me/${PHONE}?text=${msg}`;
    }
  }

  range.addEventListener('input', update);

  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTerm = parseInt(btn.dataset.term, 10);
      update();
    });
  });

  update();
});