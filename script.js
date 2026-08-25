  // ============================================================
  // EDIT THIS: your résumé's Google Drive share link
  // ============================================================
  const RESUME_LINK = "https://docs.google.com/document/d/1QXiAnBYrRhauo6_rETuVBrLUF6KQZAHgu0mvw9DSLVE/edit?usp=sharing";
  const resumeLinkEl = document.getElementById('resumeLink');
  if (resumeLinkEl) resumeLinkEl.setAttribute('href', RESUME_LINK);

  // ---- Theme toggle ----
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('portfolio-theme', t); } catch (e) {}
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ---- Active nav highlight on scroll ----
  const sections = document.querySelectorAll('main .section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  function setActive(id) {
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === id));
  }
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  // ---- Lightbox for screenshots ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.shot img, .cert-card__thumb img', .snapshot-document img').forEach((img) => {
      img.addEventListener('click', function () {
        if (this.classList.contains('is-hidden') || this.style.display === 'none') return;
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('is-open');
      });
    });
    function closeLightbox() { lightbox.classList.remove('is-open'); lightboxImg.src = ''; }
    const lightboxCloseEl = document.getElementById('lightboxClose');
    if (lightboxCloseEl) lightboxCloseEl.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }
