
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', navLinks?.classList.contains('open') ? 'true' : 'false');
});

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
