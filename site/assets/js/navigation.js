document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobileMenu');
  if (!toggle || !drawer) return;

  const iconOpen = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  const iconClose = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
    toggle.innerHTML = drawer.classList.contains('open') ? iconClose : iconOpen;
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.innerHTML = iconOpen;
    });
  });
});