import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { renderPage } from './src/templates/page';

/**
 * Renders every section from the typed content files into index.html at
 * build time. The shipped page is plain static HTML (fast first paint, fully
 * crawlable), and the TypeScript bundle only adds interactivity.
 */
function prerender(): Plugin {
  return {
    name: 'portfolio-prerender',
    // 'post' runs after Vite's own HTML asset handling, so image paths that live in
    // /public are left untouched.
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace('<!--app-->', renderPage()),
    },
  };
}

export default defineConfig({
  // Relative base keeps asset URLs working on GitHub Pages sub-paths, Netlify and Vercel alike.
  base: './',
  plugins: [tailwindcss(), prerender()],
  build: { target: 'es2022' },
});
