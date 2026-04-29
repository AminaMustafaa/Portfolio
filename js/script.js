// ── THEME TOGGLE ──
const html = document.documentElement;
function toggleTheme() {
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  document.getElementById('themeIcon').textContent = isDark ? '☾' : '☀';
  localStorage.setItem('theme', html.dataset.theme);
}
// Restore saved theme
(function() {
  const saved = localStorage.getItem('theme') || 'light';
  html.dataset.theme = saved;
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '☾';
})();

// ── LANGUAGE ──
let lang = 'en';
function setLang(l) {
  lang = l;
  document.getElementById('btnEN').classList.toggle('on', l === 'en');
  document.getElementById('btnES').classList.toggle('on', l === 'es');

  // Update all elements with data-en / data-es
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (!val) return;
    el.innerHTML = val;
  });

  // Update list items inside .ti-list
  document.querySelectorAll('.ti-list').forEach(ul => {
    const key = 'data-' + l + '-items';
    const raw = ul.getAttribute(key);
    if (!raw) return;
    const items = raw.split('|');
    const lis = ul.querySelectorAll('li');
    lis.forEach((li, i) => {
      if (items[i]) li.innerHTML = items[i];
    });
  });

  localStorage.setItem('lang', l);
}
// Restore saved lang
(function() {
  const saved = localStorage.getItem('lang') || 'en';
  if (saved !== 'en') setTimeout(() => setLang(saved), 0);
})();

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── ACTIVE NAV ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const onScroll = () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
