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

     function show(delta) {
      if (!currentGroup.length) return;
      currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
      openAt(currentGroup, currentIndex);
    }

    document.querySelectorAll('.shot-grid, .shot-grid--stack').forEach((grid) => {
      const imgs = usableImgs(Array.from(grid.querySelectorAll('.shot img')));
      imgs.forEach((img, i) => {
        img.addEventListener('click', function () { openAt(imgs, i); });
      });
    });
    // Cert thumbnails: each treated as its own single-image group
    document.querySelectorAll('.cert-card__thumb img').forEach((img) => {
      img.addEventListener('click', function () {
        if (img.classList.contains('is-hidden') || img.style.display === 'none') return;
        openAt([img], 0);
      });
    });

    function closeLightbox() { lightbox.classList.remove('is-open'); lightboxImg.src = ''; currentGroup = []; }
    const lightboxCloseEl = document.getElementById('lightboxClose');
    if (lightboxCloseEl) lightboxCloseEl.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', function (e) { e.stopPropagation(); show(-1); });
    if (lightboxNext) lightboxNext.addEventListener('click', function (e) { e.stopPropagation(); show(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  }
