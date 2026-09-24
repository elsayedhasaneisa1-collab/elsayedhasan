// ===== منع الكليك يمين =====
document.addEventListener('contextmenu', e => e.preventDefault());

// ===== منع اختصارات المطور =====
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && ['U','S'].includes(e.key.toUpperCase()))
  ) {
    e.preventDefault();
    return false;
  }
});

// ===== منع سحب الصور =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', e => e.preventDefault());
  img.addEventListener('mousedown', e => e.preventDefault());
});

// ===== كشف DevTools =====
let opened = false;
setInterval(() => {
  const wDiff = window.outerWidth - window.innerWidth > 160;
  const hDiff = window.outerHeight - window.innerHeight > 160;
  if ((wDiff || hDiff) && !opened) {
    opened = true;
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;
                  height:100vh;background:#0f172a;color:#00b4d8;
                  font-family:Cairo,sans-serif;text-align:center;flex-direction:column;">
        <h1 style="font-size:60px;">⚠️</h1>
        <h2>هذا الموقع محمي</h2>
      </div>`;
  }
}, 1000);

// ===== تأثير ظهور ناعم للعناصر =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .why-card, .about-content, .about-image')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

// ===== تمرير ناعم =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== تأثير الهيدر عند التمرير =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});