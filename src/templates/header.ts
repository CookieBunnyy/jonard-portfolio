import { profile } from '../content/profile';
import { icon, logoMark } from './icons';
import { each, esc } from './utils';

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
] as const;

export function renderHeader(): string {
  return `
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-moss-900">Skip to content</a>
  <header id="site-header" class="site-header fixed inset-x-0 top-0 z-50 text-mist" data-scrolled="false">
    <div class="container-x flex h-16 items-center justify-between gap-6 md:h-20">
      <a href="#home" class="group flex items-center gap-3" aria-label="${esc(profile.name)} — back to top">
        ${logoMark('size-9')}
        <span class="font-display text-[1.05rem] font-medium tracking-tight">${esc(profile.name)}</span>
      </a>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-1">
          ${each(navItems, (item) => `
            <li><a href="#${item.id}" class="nav-link" data-nav="${item.id}">${esc(item.label)}</a></li>`)}
        </ul>
      </nav>

      <a href="mailto:${esc(profile.email)}" class="btn btn-ghost-dark hidden md:inline-flex">
        Let’s talk ${icon('arrowUpRight', 'size-4 btn-arrow')}
      </a>

      <button id="menu-toggle" type="button" class="-mr-2 grid size-11 place-items-center rounded-full md:hidden" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
        <span class="menu-icon-open">${icon('menu', 'size-6')}</span>
        <span class="menu-icon-close hidden">${icon('close', 'size-6')}</span>
      </button>
    </div>

    <nav id="mobile-nav" aria-label="Mobile" class="mobile-nav md:hidden" hidden>
      <ul class="container-x flex flex-col pb-8 pt-2">
        ${each(navItems, (item, i) => `
          <li class="border-b border-moss-700/70">
            <a href="#${item.id}" class="flex items-baseline justify-between py-4 font-display text-2xl" data-nav="${item.id}">
              ${esc(item.label)} <span class="text-xs text-sage-500 tabular-nums">0${i + 1}</span>
            </a>
          </li>`)}
      </ul>
    </nav>
    <div id="scroll-progress" class="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-sage-400" aria-hidden="true"></div>
  </header>`;
}
