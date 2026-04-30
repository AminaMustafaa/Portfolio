// ── THEME TOGGLE ──
const html = document.documentElement;

function toggleTheme() {
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = isDark ? '☾' : '☀';
  localStorage.setItem('theme', html.dataset.theme);
}

(function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  html.dataset.theme = saved;
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '☾';
})();

// ── LANGUAGE ──
let lang = 'en';

function setLang(l) {
  lang = l;
  const btnEN = document.getElementById('btnEN');
  const btnES = document.getElementById('btnES');
  if (btnEN) btnEN.classList.toggle('on', l === 'en');
  if (btnES) btnES.classList.toggle('on', l === 'es');

  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (!val) return;
    el.innerHTML = val;
  });

  document.querySelectorAll('.ti-list').forEach(ul => {
    const raw = ul.getAttribute('data-' + l + '-items');
    if (!raw) return;
    const items = raw.split('|');
    ul.querySelectorAll('li').forEach((li, i) => {
      if (items[i]) li.innerHTML = items[i];
    });
  });

  localStorage.setItem('lang', l);
}

(function initLang() {
  const saved = localStorage.getItem('lang') || 'en';
  if (saved !== 'en') setTimeout(() => setLang(saved), 0);
})();

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── ACTIVE NAV ON SCROLL ──
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const onScroll = () => {
  let current = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  allNavLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
};

window.addEventListener('scroll', onScroll, { passive: true });

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
