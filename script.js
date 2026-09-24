// ===== منع القائمة اليمين =====
document.addEventListener('contextmenu', e => e.preventDefault());

// ===== منع اختصارات لوحة المفاتيح =====
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && ['U','S','P'].includes(e.key.toUpperCase()))
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

// ===== كشف DevTools (حماية إضافية) =====
let devtoolsOpen = false;
const threshold = 160;
setInterval(() => {
  const widthDiff = window.outerWidth - window.innerWidth > threshold;
  const heightDiff = window.outerHeight - window.innerHeight > threshold;
  if ((widthDiff || heightDiff) && !devtoolsOpen) {
    devtoolsOpen = true;
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;
                  background:#0a0a1a;color:#00c8ff;font-family:Cairo,sans-serif;
                  text-align:center;flex-direction:column;">
        <h1 style="font-size:60px;">⚠️</h1>
        <h2>ممنوع فتح أدوات المطور</h2>
        <p style="color:#888;margin-top:20px;">هذا الموقع محمي</p>
      </div>`;
  } else if (!widthDiff && !heightDiff) {
    devtoolsOpen = false;
  }
}, 1000);

// ===== تأثير ظهور العناصر عند التمرير =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .feature').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition = '0.8s';
  observer.observe(el);
});

// ===== تمرير سلس =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== رسالة ترحيب =====
console.log('%c👋 مرحباً! هذا الموقع محمي',
  'color:#00c8ff;font-size:20px;font-weight:bold;');