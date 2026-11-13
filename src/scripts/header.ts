import { $, $$ } from './dom';

/**
 * Header behaviour: solid background after scrolling, hide on scroll down /
 * show on scroll up, scroll progress bar, active-section highlighting,
 * mobile menu and back-to-top button.
 */
export function initHeader(): void {
  const header = $('#site-header');
  const progress = $('#scroll-progress');
  const backToTop = $('#back-to-top');
  const toggle = $<HTMLButtonElement>('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  let menuOpen = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.dataset.scrolled = String(y > 24);
    header.dataset.hidden = String(!menuOpen && y > 400 && y > lastY);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (backToTop) backToTop.dataset.visible = String(y > 800);
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();

  // Mobile menu
  const setMenu = (open: boolean) => {
    menuOpen = open;
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('.menu-icon-open', toggle)?.classList.toggle('hidden', open);
    $('.menu-icon-close', toggle)?.classList.toggle('hidden', !open);
    mobileNav.hidden = !open;
    header.dataset.menu = open ? 'open' : 'closed';
    if (open) header.dataset.hidden = 'false';
  };
  toggle?.addEventListener('click', () => setMenu(!menuOpen));
  if (mobileNav) $$('a', mobileNav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenu(false);
      toggle?.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setMenu(false));

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
    $<HTMLAnchorElement>('#site-header a')?.focus({ preventScroll: true });
  });

  // Highlight the nav link of the section currently in view
  const links = $$<HTMLAnchorElement>('[data-nav]');
  const sections = $$('main > section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.dataset.nav === entry.target.id;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
}
