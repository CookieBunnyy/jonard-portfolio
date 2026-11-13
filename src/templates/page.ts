import { renderAbout } from './about';
import { renderCertificates } from './certificates';
import { renderContact, renderFooter } from './contact';
import { renderHeader } from './header';
import { renderHero } from './hero';
import { renderWork } from './work';

/** Full page body. Called at build time by the prerender plugin in vite.config.ts. */
export function renderPage(): string {
  return [
    renderHeader(),
    '<main id="main">',
    renderHero(),
    renderAbout(),
    renderWork(),
    renderCertificates(),
    renderContact(),
    '</main>',
    renderFooter(),
  ].join('\n');
}
