import { profile } from '../content/profile';
import { ambientRings } from './decor';

/** Vertical offset (px at desktop size) for each portrait strip. */
const sliceOffsets = [-30, 14, -12, 26, -20];
import { icon } from './icons';
import { each, esc } from './utils';

/** Wrap each word so it can slide up from behind a mask on load. */
const splitWords = (text: string, accent: string[] = []): string =>
  text
    .split(' ')
    .map((word, i) => {
      const isAccent = accent.includes(word.replace(/[.,]/g, ''));
      return `<span class="word-mask"><span class="word${isAccent ? ' text-sage-400' : ''}" style="--i:${i}">${esc(word)}</span></span>`;
    })
    .join(' ');

const facts = [
  { label: 'Currently', value: 'Building SCRAP-WISE, my undergraduate thesis' },
  { label: 'Studying', value: `${profile.program}, 4th year · CvSU Bacoor` },
  { label: 'Based in', value: profile.location },
];

const marqueeItems = ['UI/UX Design', 'Frontend Development', 'IoT Systems', 'Database Design', 'Responsive Web', 'Prototyping'];

export function renderHero(): string {
  const p = profile.portrait;
  return `
  <section id="home" aria-labelledby="hero-title" class="hero relative overflow-hidden bg-moss-900 pt-28 text-mist md:pt-36">
    <div class="hero-glow -right-40 top-0 size-[620px] sm:size-[820px] lg:-right-24 lg:-top-24 lg:size-[1000px]" aria-hidden="true"></div>
    <div class="hero-glow hero-glow-b -left-60 bottom-24 size-[520px] lg:size-[700px]" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"><span class="hero-grid-pulse"></span></div>
    ${ambientRings('-right-64 -top-40 text-sage-400 opacity-[0.09] lg:-right-40')}
    <div class="container-x relative">
      <div class="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="pb-4 lg:col-span-7 lg:pb-16">
          <p class="eyebrow hero-in mb-8 flex items-center gap-3 text-mist-muted" style="--i:0">
            <span class="relative flex size-2"><span class="absolute inline-flex size-full animate-ping rounded-full bg-sage-400 opacity-60"></span><span class="relative inline-flex size-2 rounded-full bg-sage-400"></span></span>
            Open to internships &amp; freelance work
          </p>
          <h1 id="hero-title">
            <span class="hero-in mb-5 block font-display text-lg font-normal text-mist-muted sm:text-xl" style="--i:1">${esc(profile.name)} — ${esc(profile.role)}</span>
            <span class="block font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">${splitWords('I design calm interfaces for complex systems.', ['calm'])}</span>
          </h1>
          <p class="hero-in mt-8 max-w-xl text-lg leading-relaxed text-mist-muted" style="--i:6">
            I’m a Computer Science student at Cavite State University – Bacoor who designs and builds for the web, from client websites to the information system behind an IoT food-waste machine. I care about structure that holds up and screens that stay quiet, even when the problem behind them isn’t.
          </p>
          <div class="hero-in mt-10 flex flex-wrap items-center gap-4" style="--i:7">
            <a href="#work" class="btn btn-sage">View selected work ${icon('arrowRight', 'size-4 btn-arrow')}</a>
            <a href="#contact" class="btn btn-ghost-dark">Get in touch</a>
          </div>
        </div>

        <figure class="hero-in relative mx-auto mb-10 w-full max-w-sm lg:col-span-5 lg:mb-20 lg:max-w-none" style="--i:3">
          <div class="sliced relative" data-parallax="0.05">
            <!-- Sliced portrait: one photo cut into five offset strips that line up on hover -->
            <div class="sliced-grid grid aspect-[4/5] grid-cols-5">
              ${each(sliceOffsets, (offset, i) => `
                <div class="slice relative overflow-hidden bg-moss-800" style="--n:${i};--o:${offset}">
                  <img src="${p.src}" srcset="${p.thumb} 640w, ${p.src} 900w" sizes="(min-width: 1024px) 40vw, 90vw"
                    width="${p.width}" height="${p.height}" ${i === 0 ? `alt="${esc(p.alt)}" fetchpriority="high"` : 'alt="" aria-hidden="true"'}
                    class="slice-img absolute top-0 h-full max-w-none object-cover object-[50%_62%]" />
                </div>`)}
            </div>
          </div>
        </figure>
      </div>

      <dl class="grid border-t border-moss-700 sm:grid-cols-3">
        ${each(facts, (f, i) => `
          <div class="hero-in border-b border-moss-700 py-6 sm:border-b-0 ${i > 0 ? 'sm:border-l sm:pl-8' : ''} sm:pr-8" style="--i:${8 + i}">
            <dt class="eyebrow mb-2 text-sage-500">${esc(f.label)}</dt>
            <dd class="text-[0.95rem] text-mist">${esc(f.value)}</dd>
          </div>`)}
      </dl>
    </div>

    <div class="marquee mt-4 border-y border-moss-950 bg-sage-400 py-4 text-moss-900 sm:mt-0" aria-hidden="true">
      <div class="marquee-track">
        ${[0, 1].map(() => `<div class="marquee-group">${each(marqueeItems, (m) => `<span class="font-display text-lg font-medium uppercase tracking-[0.12em]">${esc(m)}</span><span class="size-1.5 rotate-45 bg-moss-900"></span>`)}</div>`).join('')}
      </div>
    </div>
  </section>`;
}
