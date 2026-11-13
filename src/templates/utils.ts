const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape text before placing it inside HTML. */
export const esc = (value: string | number): string =>
  String(value).replace(/[&<>"']/g, (ch) => ENTITIES[ch] ?? ch);

/** Join an array of HTML fragments. */
export const each = <T>(items: readonly T[], render: (item: T, index: number) => string): string =>
  items.map(render).join('');

/** Two-digit index: 1 -> "01". */
export const pad = (n: number): string => String(n).padStart(2, '0');

/** Shared section heading: number, label, title and optional intro. */
export function sectionHeading(opts: {
  index: number;
  label: string;
  title: string;
  intro?: string;
  tone: 'dark' | 'light' | 'sage';
  id: string;
}): string {
  const muted = { dark: 'text-mist-muted', light: 'text-moss-600', sage: 'text-moss-800' }[opts.tone];
  const rule = { dark: 'bg-moss-700', light: 'bg-sage-200', sage: 'bg-moss-900/30' }[opts.tone];
  const num = opts.tone === 'sage' ? 'text-moss-900' : 'text-sage-500';
  return `
    <div class="mb-14 grid gap-6 md:grid-cols-12 md:gap-8">
      <div class="md:col-span-4" data-reveal>
        <p class="eyebrow flex items-center gap-3 ${muted}">
          <span class="font-display ${num} tabular-nums">${pad(opts.index)}</span>
          <span class="h-px w-10 ${rule}" aria-hidden="true"></span>
          ${esc(opts.label)}
        </p>
      </div>
      <div class="md:col-span-8">
        <h2 id="${opts.id}" class="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl" data-reveal>${esc(opts.title)}</h2>
        ${opts.intro ? `<p class="mt-5 max-w-2xl text-lg leading-relaxed ${muted}" data-reveal style="--d:80ms">${esc(opts.intro)}</p>` : ''}
      </div>
    </div>`;
}
