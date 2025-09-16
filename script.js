// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open', !isOpen);
  });

  // Close menu on link click (mobile)
  navLinks.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    }
  });
}

// Contact form handler (demo-only)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if (form && statusEl) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name') || 'there';
    statusEl.textContent = `Thanks, ${name}! We’ll get back to you soon.`;
    form.reset();
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

