/** Decorative, purely visual pieces (all aria-hidden or labelled links). */

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

/** Circular rotating text badge that overlaps the hero portrait and links to the work section. */
export function roleBadge(): string {
  return `
    <a href="#work" class="role-badge group absolute -bottom-10 -left-4 grid size-28 place-items-center rounded-full bg-sage-400 text-moss-900 sm:-left-10 sm:size-32" aria-label="See selected work">
      <svg viewBox="0 0 120 120" class="role-badge-text absolute inset-0 size-full" aria-hidden="true">
        <defs><path id="badge-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
        <text class="fill-moss-900 font-display text-[10px] font-medium uppercase" letter-spacing="1.6">
          <textPath href="#badge-circle" textLength="280">UI/UX Designer • Frontend Developer •</textPath>
        </text>
      </svg>
      <svg class="relative size-6 transition-transform duration-500 ease-out-expo group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
    </a>`;
}
