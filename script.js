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

  // 7. Footer year
  $('#year').textContent = new Date().getFullYear();
})();
