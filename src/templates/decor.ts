/** Decorative, purely visual pieces (all aria-hidden). */

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
