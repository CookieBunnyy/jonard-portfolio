import { $, $$ } from './dom';

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Accessible image viewer built on the native <dialog> element.
 * Any button with data-lightbox="group" opens it; buttons sharing a group
 * can be browsed with the arrow buttons, arrow keys or swipe gestures.
 */
export function initLightbox(): void {
  const dialog = $<HTMLDialogElement>('#lightbox');
  const img = $<HTMLImageElement>('#lightbox-img');
  const caption = $('#lightbox-caption');
  const counter = $('#lightbox-counter');
  const prev = $<HTMLButtonElement>('[data-lightbox-prev]');
  const next = $<HTMLButtonElement>('[data-lightbox-next]');
  if (!dialog || !img || !caption || !counter || !prev || !next) return;

  let slides: Slide[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + slides.length) % slides.length;
    const slide = slides[index];
    if (!slide) return;
    img.src = slide.src;
    img.alt = slide.alt;
    caption.textContent = slide.caption;
    counter.textContent = slides.length > 1 ? `${index + 1} / ${slides.length}` : '';
    prev.hidden = next.hidden = slides.length < 2;
    // Restart the zoom-in animation for each new image
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = '';
  };

  const open = (button: HTMLElement) => {
    const group = button.dataset.lightbox;
    const buttons = $$(`[data-lightbox="${group}"]`);
    slides = buttons.map((b) => ({
      src: b.dataset.src ?? '',
      alt: b.dataset.alt ?? '',
      caption: b.dataset.caption ?? '',
    }));
    opener = button;
    show(buttons.indexOf(button));
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  $$('[data-lightbox]').forEach((btn) => btn.addEventListener('click', () => open(btn)));
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  $('[data-lightbox-close]', dialog)?.addEventListener('click', () => dialog.close());

  // Clicking the dark area around the image closes the viewer
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || (e.target as HTMLElement).tagName === 'FIGURE') dialog.close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  let touchX = 0;
  dialog.addEventListener('touchstart', (e) => (touchX = e.touches[0]?.clientX ?? 0), { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX;
    if (Math.abs(dx) > 50 && slides.length > 1) show(index + (dx < 0 ? 1 : -1));
  });

  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    opener?.focus();
  });
}
