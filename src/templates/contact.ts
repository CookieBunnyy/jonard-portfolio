import { profile } from '../content/profile';
import { navItems } from './header';
import { icon, logoMark } from './icons';
import { each, esc, sectionHeading } from './utils';

const field = (id: string, label: string, control: string) => `
  <div>
    <label for="${id}" class="mb-2 block text-sm font-semibold text-moss-900">${label}</label>
    ${control}
    <p id="${id}-error" class="field-error mt-1.5 hidden text-sm text-[#9B2C2C]" role="alert"></p>
  </div>`;

export function renderContact(): string {
  return `
  <section id="contact" aria-labelledby="contact-title" class="section bg-sage-400 text-moss-900">
    <div class="container-x">
      ${sectionHeading({ index: 4, id: 'contact-title', label: 'Contact', title: 'Let’s build something durable.', tone: 'sage' })}

      <div class="grid gap-14 md:grid-cols-12 md:gap-8">
        <div class="md:col-span-5 lg:col-span-6" data-reveal>
          <p class="max-w-md text-lg leading-relaxed text-moss-800">
            I’m open to internships, freelance UI/UX work and collaborations on web projects. The quickest way to reach me is email.
          </p>
          <a href="mailto:${esc(profile.email)}" class="link-underline mt-10 inline-block break-all font-display text-2xl font-medium sm:text-3xl lg:text-4xl">${esc(profile.email)}</a>
          <ul class="mt-12 space-y-4">
            <li>
              <a href="${profile.github.href}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-4">
                <span class="grid size-11 place-items-center rounded-full border border-moss-900/30 transition duration-300 group-hover:bg-moss-900 group-hover:text-sage-400">${icon('github', 'size-5')}</span>
                <span class="font-semibold">${esc(profile.github.label)}</span>
                ${icon('arrowUpRight', 'size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5')}
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li class="inline-flex items-center gap-4">
              <span class="grid size-11 place-items-center rounded-full border border-moss-900/30">${icon('mapPin', 'size-5')}</span>
              <span class="font-semibold">${esc(profile.location)}</span>
            </li>
          </ul>
        </div>

        <div class="md:col-span-7 lg:col-span-6" data-reveal style="--d:100ms">
          <form id="contact-form" class="bg-paper p-6 shadow-[0_30px_60px_-30px_rgba(26,36,25,.45)] sm:p-10" novalidate data-email="${esc(profile.email)}">
            <div class="grid gap-6">
              ${field('name', 'Name', `<input id="name" name="name" type="text" autocomplete="name" required class="input" placeholder="Your name" aria-describedby="name-error" />`)}
              ${field('email', 'Email', `<input id="email" name="email" type="email" autocomplete="email" required class="input" placeholder="you@example.com" aria-describedby="email-error" />`)}
              ${field('message', 'Message', `<textarea id="message" name="message" rows="5" required class="input resize-y" placeholder="Tell me about your project or role" aria-describedby="message-error"></textarea>`)}
            </div>
            <button type="submit" class="btn btn-dark mt-8 w-full justify-center">Send message ${icon('send', 'size-4 btn-arrow')}</button>
            <p class="mt-4 text-center text-sm text-moss-600">Opens your email app with your message filled in.</p>
            <p id="form-status" class="mt-2 hidden text-center text-sm font-semibold text-moss-900" role="status"></p>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderFooter(): string {
  const year = profile.lastUpdated.iso.slice(0, 4);
  return `
  <footer class="bg-moss-950 py-16 text-mist">
    <div class="container-x">
      <div class="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <a href="#home" class="group inline-flex items-center gap-3">${logoMark('size-10')}<span class="font-display text-xl font-medium">${esc(profile.name)}</span></a>
          <p class="mt-4 font-display text-2xl text-sage-400">${esc(profile.tagline)}</p>
        </div>
        <nav aria-label="Footer">
          <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-muted">
            ${each(navItems, (n) => `<li><a href="#${n.id}" class="link-grow hover:text-mist">${esc(n.label)}</a></li>`)}
          </ul>
        </nav>
      </div>
      <div class="mt-12 flex flex-col gap-4 border-t border-moss-700 pt-8 text-sm text-mist-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© ${year} ${esc(profile.fullName)}. Designed and built by me.</p>
        <p>
          v${esc(profile.version)} · Last updated <time datetime="${profile.lastUpdated.iso}">${esc(profile.lastUpdated.label)}</time> ·
          <a href="${profile.repoUrl}#maintenance-plan" target="_blank" rel="noopener noreferrer" class="link-underline text-mist">Update plan<span class="sr-only"> (opens in a new tab)</span></a>
        </p>
      </div>
    </div>
  </footer>

  <button id="back-to-top" type="button" class="back-to-top btn-sage fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full" aria-label="Back to top">${icon('arrowUp', 'size-5')}</button>

  <dialog id="lightbox" class="lightbox" aria-label="Image viewer">
    <div class="flex h-full w-full flex-col">
      <div class="flex items-center justify-between gap-4 px-4 py-3 text-mist sm:px-6">
        <p id="lightbox-counter" class="font-display text-sm tabular-nums text-mist-muted"></p>
        <button type="button" data-lightbox-close class="grid size-11 place-items-center rounded-full border border-moss-700 transition hover:border-sage-400 hover:text-sage-400" aria-label="Close viewer">${icon('close', 'size-5')}</button>
      </div>
      <figure class="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:px-20">
        <img id="lightbox-img" src="" alt="" class="lightbox-img max-h-full min-h-0 w-auto max-w-full object-contain" />
        <figcaption id="lightbox-caption" class="max-w-2xl text-center text-sm text-mist-muted"></figcaption>
        <button type="button" data-lightbox-prev class="lightbox-nav left-2 sm:left-6" aria-label="Previous image">${icon('chevronLeft', 'size-6')}</button>
        <button type="button" data-lightbox-next class="lightbox-nav right-2 sm:right-6" aria-label="Next image">${icon('chevronRight', 'size-6')}</button>
      </figure>
    </div>
  </dialog>`;
}
