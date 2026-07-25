document.addEventListener('DOMContentLoaded', function () {
  const preview = document.getElementById('preview');
  const rows = document.querySelectorAll('.work-row');
  const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFine && preview) {
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        preview.style.background = row.dataset.color;
        preview.textContent = row.dataset.label;
        preview.classList.add('show');
      });
      row.addEventListener('mousemove', (e) => {
        preview.style.left = e.clientX + 'px';
        preview.style.top = e.clientY + 'px';
      });
      row.addEventListener('mouseleave', () => {
        preview.classList.remove('show');
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  const sections = ['experience', 'projects', 'info']
    .map(id => document.getElementById(id));
  const navLinks = document.querySelectorAll('.sb-nav a, .topbar nav a');
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`a[href="#${entry.target.id}"]`)
          .forEach(l => l.classList.add('active'));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => s && navIO.observe(s));
});