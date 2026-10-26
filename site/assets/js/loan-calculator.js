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
  const ALLOWED_TERMS = [1, 2, 3];
  const MIN_AMOUNT = 200;
  const MAX_AMOUNT = 10000;

  let currentTerm = 3;

  function clampAmount(raw) {
    const n = Number(raw);
    if (!Number.isFinite(n)) return MIN_AMOUNT;
    if (n < MIN_AMOUNT) return MIN_AMOUNT;
    if (n > MAX_AMOUNT) return MAX_AMOUNT;
    return Math.round(n);
  }

  function clampTerm(raw) {
    const n = parseInt(raw, 10);
    return ALLOWED_TERMS.includes(n) ? n : 3;
  }

  function formatZAR(n) {
    return 'R' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function update() {
    const amount = clampAmount(range.value);
    const amountStr = formatZAR(amount);

    if (amountLabel) amountLabel.textContent = amountStr;
    if (resultAmount) resultAmount.textContent = amountStr;
    if (termLabel) termLabel.textContent = currentTerm + (currentTerm === 1 ? ' Month' : ' Months');
    if (waLabel) waLabel.textContent = 'Request quotation for ' + amountStr;

    const min = Number(range.min) || MIN_AMOUNT;
    const max = Number(range.max) || MAX_AMOUNT;
    const pct = Math.min(100, Math.max(0, ((amount - min) / (max - min)) * 100));
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
      currentTerm = clampTerm(btn.dataset.term);
      update();
    });
  });

  update();
});