// Minimal interactivity: theme switch, reveal-on-scroll, and small niceties

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const yearEl = document.getElementById('year');
  const themeToggle = document.getElementById('themeToggle');

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme handling
  const KEY = 'theme';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saved = localStorage.getItem(KEY);
  if (saved) body.setAttribute('data-theme', saved);

  function cycleTheme() {
    const next = body.getAttribute('data-theme') === 'sunset' ? 'ocean' : 'sunset';
    if (next === 'ocean') body.removeAttribute('data-theme'); else body.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  }

  if (themeToggle) themeToggle.addEventListener('click', cycleTheme);

  // Reveal on scroll
  const toReveal = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    toReveal.forEach(el => io.observe(el));
  } else {
    // Fallback
    toReveal.forEach(el => el.classList.add('visible'));
  }

  // Subtle parallax for background blobs
  if (!prefersReduced) {
    const blobs = Array.from(document.querySelectorAll('.blob'));
    window.addEventListener('mousemove', (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 8; // -4 to 4
      const y = (e.clientY / h - 0.5) * 8;
      blobs.forEach((b, i) => {
        const scale = 1 + i * 0.02;
        b.style.transform = `translate(${x*(i+1)}px, ${y*(i+1)}px) scale(${scale})`;
      });
    });
  }
});
