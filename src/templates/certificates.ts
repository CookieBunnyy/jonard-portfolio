import { sortedCertificates } from '../content/certificates';
import { icon } from './icons';
import { each, esc, pad, sectionHeading } from './utils';

export function renderCertificates(): string {
  return `
  <section id="certificates" aria-labelledby="certificates-title" class="section bg-paper text-moss-900">
    <div class="container-x">
      ${sectionHeading({
        index: 3,
        id: 'certificates-title',
        label: 'Certificates',
        title: 'Recognition along the way',
        intro: 'Certificates from leadership roles, school events and university work. Select one to view it in full.',
        tone: 'light',
      })}

      <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${each(sortedCertificates, (c, i) => `
          <li data-reveal style="--d:${(i % 3) * 80}ms">
            <button type="button" class="cert-card group flex h-full w-full flex-col overflow-hidden border border-sage-200 bg-white text-left"
              data-lightbox="certificates" data-index="${i}" data-src="${c.image.src}" data-alt="${esc(c.image.alt)}"
              data-caption="${esc(`${c.kind} — ${c.title} · ${c.date}`)}" aria-label="View certificate: ${esc(c.title)}">
              <span class="relative block bg-sage-100 p-5 sm:p-6">
                <img src="${c.image.thumb}" width="640" height="${Math.round((640 * c.image.height) / c.image.width)}" loading="lazy" decoding="async" alt="${esc(c.image.alt)}"
                  class="cert-img aspect-[10/7] w-full object-cover shadow-[0_6px_20px_-8px_rgba(26,36,25,.35)]" />
                <span class="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-moss-900 px-3 py-1.5 text-xs font-semibold text-mist opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">${icon('expand', 'size-3.5')} View</span>
              </span>
              <span class="flex flex-1 flex-col p-6">
                <span class="eyebrow text-moss-600">${esc(c.kind)}</span>
                <span class="mt-3 font-display text-xl font-medium leading-snug">${esc(c.title)}</span>
                <span class="mt-2 text-sm leading-relaxed text-moss-600">${esc(c.description)}</span>
                <span class="mt-auto flex items-end justify-between gap-4 border-t border-sage-200 pt-4 text-xs text-moss-600">
                  <span>${esc(c.issuer)}</span>
                  <time datetime="${c.isoDate}" class="shrink-0 font-semibold text-moss-900">${esc(c.date)}</time>
                </span>
              </span>
            </button>
          </li>`)}
        <li class="flex flex-col justify-between border border-dashed border-sage-500 p-8" data-reveal style="--d:160ms">
          <p class="font-display text-7xl font-medium tabular-nums text-sage-500">${pad(sortedCertificates.length)}</p>
          <div>
            <p class="font-display text-xl font-medium">Certificates and counting</p>
            <p class="mt-2 text-sm leading-relaxed text-moss-600">This list is updated as new recognitions and course certifications come in.</p>
          </div>
        </li>
      </ul>
    </div>
  </section>`;
}
