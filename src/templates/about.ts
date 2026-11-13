import { profile } from '../content/profile';
import { skillGroups } from '../content/skills';
import { timeline } from '../content/timeline';
import { each, esc, pad, sectionHeading } from './utils';

const facts = [
  { label: 'Focus', value: 'UI/UX design & frontend development' },
  { label: 'Program', value: `${profile.program}, 4th year` },
  { label: 'University', value: profile.school },
  { label: 'Location', value: profile.location },
];

export function renderAbout(): string {
  return `
  <section id="about" aria-labelledby="about-title" class="section bg-paper text-moss-900">
    <div class="container-x">
      ${sectionHeading({ index: 1, id: 'about-title', label: 'About', title: 'A computer science student who designs by habit.', tone: 'light' })}

      <div class="grid gap-12 md:grid-cols-12 md:gap-8">
        <dl class="order-2 space-y-0 md:order-1 md:col-span-4" data-reveal>
          ${each(facts, (f) => `
            <div class="border-t border-sage-200 py-4 last:border-b">
              <dt class="eyebrow mb-1 text-moss-600">${esc(f.label)}</dt>
              <dd class="font-medium">${esc(f.value)}</dd>
            </div>`)}
        </dl>
        <div class="order-1 space-y-6 text-lg leading-relaxed text-moss-700 md:order-2 md:col-span-8">
          <p class="font-display text-2xl leading-snug text-moss-900 sm:text-[1.7rem]" data-reveal>
            I started in tech the practical way: as a senior high ICT student giving technical support at school events, and later leading the student government as SSG President. Both taught me that a system only matters if people can actually use it.
          </p>
          <p data-reveal style="--d:80ms">
            Today I’m in my fourth year of BS Computer Science at Cavite State University – Bacoor. I design user interfaces, build responsive frontends, and work across the stack when a project needs it, whether that means normalizing a database, wiring up an IoT device or turning a client’s service list into a page that brings in inquiries.
          </p>
          <p data-reveal style="--d:160ms">
            My thesis, <a href="#scrap-wise" class="link-underline font-semibold text-moss-900">SCRAP-WISE</a>, brings those threads together: a food-waste machine for a real restaurant, and the information system that makes its data useful.
          </p>
        </div>
      </div>

      <!-- Skills -->
      <div class="mt-24">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-4" data-reveal>
          <h3 class="font-display text-3xl font-medium tracking-tight">Skills, with proof</h3>
          <p class="max-w-sm text-moss-600">Each skill is paired with a place I’ve actually used it.</p>
        </div>
        <div class="grid gap-px overflow-hidden rounded-sm border border-sage-200 bg-sage-200 sm:grid-cols-2 lg:grid-cols-4">
          ${each(skillGroups, (g, i) => `
            <article class="skill-card group bg-white p-7" data-reveal style="--d:${i * 70}ms">
              <p class="mb-6 font-display text-sm text-sage-600 tabular-nums">${pad(i + 1)}</p>
              <h4 class="font-display text-xl font-medium">${esc(g.title)}</h4>
              <p class="mt-2 text-sm leading-relaxed text-moss-600">${esc(g.summary)}</p>
              <ul class="mt-6 space-y-4">
                ${each(g.skills, (s) => `
                  <li class="skill-item">
                    <p class="font-semibold text-moss-900">${esc(s.name)}</p>
                    <p class="text-sm text-moss-600"><span class="text-sage-600" aria-hidden="true">↳</span> <span class="sr-only">Used in:</span>${esc(s.usedIn)}</p>
                  </li>`)}
              </ul>
            </article>`)}
        </div>
      </div>

      <!-- Education & leadership -->
      <div class="mt-24">
        <h3 class="mb-10 font-display text-3xl font-medium tracking-tight" data-reveal>Education &amp; leadership</h3>
        <ol class="border-t border-moss-900">
          ${each(timeline, (t) => `
            <li class="timeline-row grid gap-3 border-b border-sage-200 py-8 md:grid-cols-12 md:gap-8" data-reveal>
              <p class="font-display text-sm tabular-nums text-moss-600 md:col-span-3">${esc(t.period)}</p>
              <div class="md:col-span-4">
                <h4 class="font-display text-xl font-medium">${esc(t.title)}</h4>
                <p class="mt-1 text-sm text-moss-600">${esc(t.org)}</p>
              </div>
              <ul class="space-y-2 text-moss-700 md:col-span-5">
                ${each(t.points, (pt) => `<li class="flex gap-3"><span class="mt-[0.7em] h-px w-3 shrink-0 bg-sage-500" aria-hidden="true"></span>${esc(pt)}</li>`)}
              </ul>
            </li>`)}
        </ol>
      </div>
    </div>
  </section>`;
}
