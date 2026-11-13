import { featuredProjects, otherProjects } from '../content/projects';
import type { FeaturedProject } from '../content/types';
import { ambientRings } from './decor';
import { icon } from './icons';
import { each, esc, pad, sectionHeading } from './utils';

function meta(p: FeaturedProject, withStatus = true): string {
  const rows = [
    { label: 'Type', value: p.kind },
    { label: 'Role', value: p.role },
    { label: 'Year', value: p.year },
  ];
  const status = withStatus
    ? `<span class="status-pill mb-8" data-status="${esc(p.status)}"><span class="status-dot" aria-hidden="true"></span>${esc(p.status)}</span>`
    : '';
  return `
    ${status}
    <dl class="space-y-4 text-sm">
      ${each(rows, (r) => `
        <div>
          <dt class="eyebrow mb-1 text-sage-500">${esc(r.label)}</dt>
          <dd class="text-mist">${esc(r.value)}</dd>
        </div>`)}
    </dl>`;
}

const stackList = (stack: string[]): string => `
  <ul class="flex flex-wrap gap-2" aria-label="Tools and techniques">
    ${each(stack, (s) => `<li class="tag-dark">${esc(s)}</li>`)}
  </ul>`;

function gallery(p: FeaturedProject): string {
  if (!p.gallery?.length) return '';
  // Expanding panels: the active photo widens to show its caption, the others
  // narrow to a vertical label. On small screens the panels stack.
  return `
    <div class="panels mt-14 flex flex-col gap-3 md:h-[min(76vh,640px)] md:flex-row md:gap-4" data-panels data-reveal>
      ${each(p.gallery, (img, i) => `
        <button type="button" class="panel group relative h-80 overflow-hidden bg-moss-800 text-left sm:h-[26rem] md:h-auto" data-active="${i === 0}"
          data-lightbox="${p.id}" data-index="${i}" data-src="${img.src}" data-alt="${esc(img.alt)}" data-caption="${esc(img.caption ?? '')}"
          aria-label="Enlarge photo: ${esc(img.caption ?? img.alt)}">
          <img src="${img.thumb}" srcset="${img.thumb} 640w, ${img.src} ${img.width}w" sizes="(min-width: 768px) 60vw, 100vw"
            width="${img.width}" height="${img.height}" loading="lazy" decoding="async" alt="${esc(img.alt)}"
            style="object-position:${img.focus ?? '50% 50%'}" class="panel-img absolute inset-0 size-full object-cover" />
          <span class="panel-shade absolute inset-0" aria-hidden="true"></span>

          <span class="absolute left-5 top-5 font-display text-sm font-medium tabular-nums text-mist sm:left-6 sm:top-6">${pad(i + 1)}<span class="text-mist/50"> / ${pad(p.gallery!.length)}</span></span>

          <span class="panel-label pointer-events-none absolute bottom-6 left-1/2 hidden whitespace-nowrap font-display text-lg font-medium text-mist md:block">${esc(img.label ?? '')}</span>

          <span class="panel-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-7">
            <span>
              <span class="eyebrow block text-sage-400">Fig. ${pad(i + 1)} · ${esc(img.label ?? '')}</span>
              <span class="mt-2 block max-w-sm text-sm leading-snug text-mist sm:text-base">${esc(img.caption ?? '')}</span>
            </span>
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-sage-400 text-moss-900 transition-transform duration-500 ease-out-expo group-hover:scale-110">${icon('expand', 'size-4')}</span>
          </span>
        </button>`)}
    </div>`;
}

function caseSections(p: FeaturedProject, cols: string): string {
  return `
    <div class="grid gap-10 ${cols}">
      ${each(p.sections, (s, i) => `
        <div data-reveal style="--d:${i * 80}ms">
          <h4 class="mb-3 flex items-baseline gap-3 font-display text-lg font-medium text-mist">
            <span class="text-sm text-sage-500 tabular-nums">${pad(i + 1)}</span>${esc(s.heading)}
          </h4>
          <p class="leading-relaxed text-mist-muted">${esc(s.body)}</p>
        </div>`)}
    </div>`;
}

function projectLink(p: FeaturedProject): string {
  if (!p.link) return '';
  return `<a href="${p.link.href}" target="_blank" rel="noopener noreferrer" class="btn btn-sage">${esc(p.link.label)} ${icon('arrowUpRight', 'size-4 btn-arrow')}<span class="sr-only">(opens in a new tab)</span></a>`;
}

function renderThesis(p: FeaturedProject): string {
  return `
    <article id="${p.id}" aria-labelledby="${p.id}-title" class="border-t border-moss-700 pt-12">
      <div class="grid gap-10 md:grid-cols-12 md:gap-8">
        <div class="md:col-span-4" data-reveal>${meta(p)}</div>
        <div class="md:col-span-8">
          <h3 id="${p.id}-title" class="font-display text-5xl font-semibold tracking-tight sm:text-7xl" data-reveal>${esc(p.title)}</h3>
          <p class="mt-4 font-display text-xl leading-snug text-sage-400 sm:text-2xl" data-reveal style="--d:60ms">${esc(p.subtitle)}</p>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-mist-muted" data-reveal style="--d:120ms">${esc(p.summary)}</p>
        </div>
      </div>
      ${gallery(p)}
      <div class="mt-16 md:pl-[calc(33.333%+1rem)]">
        ${caseSections(p, 'sm:grid-cols-3')}
        <div class="mt-10" data-reveal>${stackList(p.stack)}</div>
      </div>
    </article>`;
}

function cover(p: FeaturedProject): string {
  const img = p.cover;
  if (!img) return '';
  const [first, ...rest] = p.title.split(' ');
  const lines = [`${first} ${rest.slice(0, -1).join(' ')}`.trim(), rest.at(-1) ?? ''].filter(Boolean);
  return `
    <div class="cover relative w-full min-h-[540px] overflow-hidden bg-moss-800 sm:min-h-[560px] md:aspect-[21/9] md:min-h-[520px]" data-reveal>
      <img src="${img.src}" srcset="${img.thumb} 640w, ${img.src} ${img.width}w" sizes="100vw"
        width="${img.width}" height="${img.height}" loading="lazy" decoding="async" alt="${esc(img.alt)}"
        style="object-position:${img.focus ?? '50% 50%'}" class="cover-img absolute inset-0 size-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-950/55 to-moss-950/5" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-moss-950/85 via-moss-950/30 to-transparent" aria-hidden="true"></div>

      <div class="absolute right-5 top-14 flex items-center gap-3 sm:right-8 sm:top-10">
        <span class="status-pill bg-moss-950/60 backdrop-blur-sm" data-status="${esc(p.status)}"><span class="status-dot" aria-hidden="true"></span>${esc(p.status)}</span>
      </div>

      <div class="absolute inset-x-0 bottom-0 p-6 pb-10 sm:p-10 sm:pb-16 lg:p-14 lg:pb-20">
        <p class="eyebrow cover-line text-sage-400"><span class="line-inner" style="--l:0">${esc(p.kind)} · ${esc(p.role)}</span></p>
        <h3 id="${p.id}-title" class="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-mist sm:text-7xl lg:text-8xl">
          ${lines.map((l, i) => `<span class="cover-line block"><span class="line-inner" style="--l:${i + 1}">${esc(l)}</span></span>`).join('')}
        </h3>
        <div class="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p class="cover-line max-w-md font-display text-lg leading-snug text-mist/85 sm:text-xl"><span class="line-inner" style="--l:3">${esc(p.subtitle)}</span></p>
          <div class="cover-line shrink-0"><span class="line-inner block" style="--l:4">${projectLink(p)}</span></div>
        </div>
      </div>
    </div>`;
}

function renderClient(p: FeaturedProject): string {
  return `
    <article id="${p.id}" aria-labelledby="${p.id}-title" class="mt-28">
      ${cover(p)}
      <div class="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
        <div class="md:col-span-4" data-reveal>${meta(p, false)}</div>
        <p class="max-w-2xl text-lg leading-relaxed text-mist-muted md:col-span-8" data-reveal style="--d:80ms">${esc(p.summary)}</p>
      </div>
      <div class="mt-14 md:pl-[calc(33.333%+1rem)]">
        ${caseSections(p, 'sm:grid-cols-3')}
        <div class="mt-10" data-reveal>${stackList(p.stack)}</div>
      </div>
    </article>`;
}

function renderOtherProjects(): string {
  return `
    <div class="mt-28">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4" data-reveal>
        <h3 class="font-display text-3xl font-medium tracking-tight">More projects</h3>
        <p class="text-mist-muted">Academic work — select a row for details.</p>
      </div>
      <div class="border-t border-moss-700">
        ${each(otherProjects, (p, i) => `
          <details class="project-row group border-b border-moss-700" data-reveal style="--d:${i * 60}ms">
            <summary class="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[3rem_1fr_10rem_2.5rem] sm:gap-6">
              <span class="font-display text-sm text-sage-500 tabular-nums">${pad(i + 1)}</span>
              <span>
                <span class="block font-display text-xl font-medium text-mist transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-2xl">${esc(p.title)}</span>
                <span class="mt-1 block text-sm text-mist-muted">${esc(p.summary)}</span>
              </span>
              <span class="hidden text-sm text-mist-muted sm:block">${esc(p.category)}</span>
              <span class="row-icon grid size-10 place-items-center rounded-full border border-moss-700 text-sage-400 transition duration-300">${icon('plus', 'size-4')}</span>
            </summary>
            <div class="row-body grid gap-6 pb-8 sm:grid-cols-[3rem_1fr_10rem_2.5rem] sm:gap-6">
              <span class="hidden sm:block"></span>
              <div>
                <p class="max-w-2xl leading-relaxed text-mist-muted">${esc(p.details)}</p>
                <div class="mt-5">${stackList(p.stack)}</div>
              </div>
            </div>
          </details>`)}
      </div>
    </div>`;
}

export function renderWork(): string {
  const [thesis, client] = featuredProjects;
  return `
  <section id="work" aria-labelledby="work-title" class="section relative overflow-hidden bg-moss-900 text-mist">
    ${ambientRings('-left-[420px] top-[38%] text-sage-400 opacity-[0.07]', 'w-[1000px]')}
    <div class="container-x relative">
      ${sectionHeading({
        index: 2,
        id: 'work-title',
        label: 'Projects',
        title: 'Selected work',
        intro: 'Two projects built for real users outside the classroom: a thesis machine for a working restaurant, and a client website that is live today.',
        tone: 'dark',
      })}
      ${thesis ? renderThesis(thesis) : ''}
      ${client ? renderClient(client) : ''}
      ${renderOtherProjects()}
    </div>
  </section>`;
}
