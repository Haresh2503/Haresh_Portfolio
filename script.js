/* Portfolio interactions. Each block is independent and commented. */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);

  // 1. Mobile menu toggle (also closes when a link is clicked or Esc is pressed)
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // 2. Solid navbar and back-to-top button after scrolling
  const nav = $('#nav'), top = $('#top');
  const onScroll = () => {
    nav.classList.toggle('solid', window.scrollY > 40);
    top.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 3. Scroll reveal animation
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // 4. Active navigation highlighting
  const links = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  // 5. GitHub placeholder: stop the "#" link from jumping until you add your URL
  const gh = $('#gh');
  gh.addEventListener('click', (e) => {
    if (gh.getAttribute('href') === '#') { e.preventDefault(); alert('Add your GitHub URL in index.html (id="gh").'); }
  });

  // 6. Contact form validation. Opens the visitor's email app with the message prefilled.
  const form = $('#form'), status = $('#status');
  const rules = {
    name: (v) => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address, like name@example.com.',
    subject: (v) => v.trim().length >= 3 || 'Enter a subject (at least 3 characters).',
    message: (v) => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
  };
  const check = (id) => {
    const input = $('#' + id), res = rules[id](input.value);
    $('#e-' + id).textContent = res === true ? '' : res;
    input.classList.toggle('bad', res !== true);
    input.setAttribute('aria-invalid', res !== true);
    return res === true;
  };
  Object.keys(rules).forEach((id) => $('#' + id).addEventListener('blur', () => check(id)));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { status.textContent = ''; return; }
    const d = Object.fromEntries(new FormData(form));
    const body = `${d.message}\n\nFrom: ${d.name} (${d.email})`;
    window.location.href = `mailto:hareshh971@gmail.com?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app. Press send there to deliver the message.';
    form.reset();
  });

  // 7. Footer year
  $('#year').textContent = new Date().getFullYear();
})();
