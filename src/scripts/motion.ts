import { $$, prefersReducedMotion } from './dom';

/** Fade elements marked with [data-reveal] up into place as they scroll into view. */
export function initReveal(): void {
  const items = $$('[data-reveal]');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  items.forEach((el) => observer.observe(el));
}

/** Subtle vertical drift for elements with [data-parallax="speed"] on larger screens. */
export function initParallax(): void {
  const items = $$('[data-parallax]');
  if (!items.length || prefersReducedMotion()) return;
  const desktop = window.matchMedia('(min-width: 1024px)');
  let ticking = false;

  const update = () => {
    items.forEach((el) => {
      const speed = Number(el.dataset.parallax) || 0;
      el.style.transform = desktop.matches ? `translate3d(0, ${window.scrollY * speed}px, 0)` : '';
    });
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
  desktop.addEventListener('change', update);
}
