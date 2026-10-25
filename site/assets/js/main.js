document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modal = document.getElementById('securityModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtns = document.querySelectorAll('.close-modal');

  if (modal) {
    openBtns.forEach(btn => btn.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }));
    closeBtns.forEach(btn => btn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
});

window.copyText = function (text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Copied';
    setTimeout(() => { btn.innerHTML = original; }, 1800);
  });
};