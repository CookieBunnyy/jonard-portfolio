/**
 * Decorative, purely visual pieces (all aria-hidden).
 * The slant angle is shared with CSS (--slant in main.css) so every slanted
 * edge on the page runs parallel.
 */

/** Slowly rotating topographic rings — the looping background motif. */
export function ambientRings(position: string, size = 'w-[900px]'): string {
  const rings = Array.from({ length: 9 }, (_, i) => {
    const r = 70 + i * 52;
    return `<ellipse cx="${400 + i * 7}" cy="${400 - i * 5}" rx="${r}" ry="${r * 0.86}" />`;
  }).join('');
  return `
    <div class="ambient pointer-events-none absolute ${position} ${size} aspect-square" aria-hidden="true">
      <svg viewBox="0 0 800 800" class="ambient-a size-full" fill="none" stroke="currentColor" stroke-width="1">${rings}</svg>
      <svg viewBox="0 0 800 800" class="ambient-b absolute inset-0 size-full" fill="none" stroke="currentColor" stroke-width="1">${rings}</svg>
    </div>`;
}

/**
 * Slanted bands over the top and bottom edges of the hero portrait.
 * Coordinates use a 100 × 125 box (the portrait's 4:5 ratio); the image itself
 * is clipped with the same slant in CSS (.slant-portrait).
 */
export function portraitBands(): string {
  return `
    <svg class="portrait-bands pointer-events-none absolute inset-0 size-full overflow-visible" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
      <polygon class="band-top fill-sage-400" points="28,12.6 112,-2.1 112,-9.6 28,5.1" />
      <line class="band-top" x1="40" y1="6.2" x2="112" y2="-6.4" stroke="#1A2419" stroke-width="1.5" vector-effect="non-scaling-stroke" />
      <polygon class="band-bottom fill-none stroke-sage-400" points="-12,127.1 72,112.4 72,119.9 -12,134.6" stroke-width="1.5" vector-effect="non-scaling-stroke" />
      <polygon class="band-bottom-fill fill-sage-400/25" points="-12,127.1 72,112.4 72,119.9 -12,134.6" />
    </svg>`;
}
