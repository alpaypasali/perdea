
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

const closeMenu = () => {
  navLinks?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  menuBtn?.setAttribute('aria-label', 'Menüyü aç');
  if (menuBtn) menuBtn.textContent = '☰';
};

menuBtn?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open') ?? false;
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  menuBtn.textContent = isOpen ? '×' : '☰';
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const floatingWhatsapp = document.querySelector('.whatsapp');
const floatingCollisionMedia = window.matchMedia('(max-width:640px)');
const floatingCollisionZones = document.querySelectorAll('.benefit-grid, .use-list, .guide, .faq, .related-grid, .contact-info-grid, .map-grid, #teklif, #mesaj, footer');
const visibleCollisionZones = new Set();
const updateFloatingWhatsapp = () => {
  floatingWhatsapp?.classList.toggle('is-hidden', floatingCollisionMedia.matches && visibleCollisionZones.size > 0);
};
const floatingObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visibleCollisionZones.add(entry.target) : visibleCollisionZones.delete(entry.target));
      updateFloatingWhatsapp();
    })
  : null;
floatingCollisionZones.forEach((zone) => floatingObserver?.observe(zone));
floatingCollisionMedia.addEventListener?.('change', updateFloatingWhatsapp);

document.querySelectorAll('.product-quote-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const product = form.dataset.product || 'Perde';
    const msg = [
      `Merhaba Perdea, ${product} için teklif almak istiyorum.`,
      '',
      `Ad Soyad: ${String(d.get('name') || '').trim()}`,
      `Telefon: ${String(d.get('phone') || '').trim()}`,
      `E-posta: ${String(d.get('email') || '').trim()}`,
      `Ürün: ${product}`,
      `Not / Ölçü: ${String(d.get('message') || '').trim()}`
    ].join('\n');
    const toast = document.querySelector('.toast');
    toast?.classList.add('show');
    setTimeout(() => toast?.classList.remove('show'), 1600);
    window.open(`https://wa.me/905314308565?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  });
});
