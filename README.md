# Jonard Rustique — Portfolio

Personal portfolio of **Jonard Roa Rustique**, UI/UX Designer & Frontend Developer and BS Computer Science student at Cavite State University – Bacoor City Campus.

**Live site:** https://jonardecoder.github.io/Website-Portfolio/

Sections: **Home · About · Projects · Certificates · Contact**

## Tech stack

| Area | Choice |
| --- | --- |
| Build tool | [Vite 7](https://vite.dev) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), design tokens in `src/styles/main.css` |
| Fonts | Jost (a free Futura-style geometric typeface) for headings, Open Sans for body text. Both are self-hosted through Fontsource |
| Hosting | GitHub Pages via GitHub Actions |

### How it works

All content lives in typed data files under `src/content/`. At build time, a small Vite plugin (`vite.config.ts`) renders those files into **static HTML** inside `index.html`. Visitors and search engines get the full page without waiting for JavaScript. The ~6 kB TypeScript bundle in `src/scripts/` only adds interactivity: scroll reveals, the header, the image lightbox and contact form validation.

```
src/
  content/     ← edit these to update the site (profile, skills, projects, certificates, timeline)
  templates/   ← HTML templates for each section (rendered at build time)
  scripts/     ← browser behaviour (header, motion, lightbox, contact form)
  styles/      ← Tailwind entry + design tokens + animations
public/images/ ← optimized WebP images
scripts/optimize-images.mjs ← converts new photos to WebP
```

### Design system

Three-colour palette:

- **Moss** `#1A2419` (primary): dark surfaces, and text on light surfaces
- **Sage** `#A3B19B` (secondary): accents, highlights, the contact band
- **White** `#F7F8F4` / `#FFFFFF` (tertiary): light sections and cards

Brand: the **JR monogram** (`public/favicon.svg`) and the tagline *"Build it sturdy. Make it calm."*

## Running locally

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`).

One-time setup: in the GitHub repository, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The build uses relative asset paths (`base: './'`), so the same `dist/` folder also works on Netlify or Vercel without changes.

## Maintenance plan

| When | Task |
| --- | --- |
| **After every new project** | Add an entry to `src/content/projects.ts`, plus images via `npm run images`. Add the skills it shows to `src/content/skills.ts`. |
| **After every new certificate** | Optimize the scan (see below) and add an entry to `src/content/certificates.ts`. It is sorted by date automatically. |
| **Monthly** | Review content for accuracy, check that every external link still works and update `lastUpdated` in `src/content/profile.ts`. |
| **Each semester** | Update the year level, the timeline and the "Currently" note in the hero. Run `npm outdated` and update dependencies. |
| **After the thesis defense** | Change SCRAP-WISE's status from `In progress` to `Completed`, then add results, final photos and screenshots of the information system. |
| **Every release** | Run `npm run build`, check the site on desktop and mobile (Chrome, Safari, Firefox, Edge), bump `version` in `profile.ts`, and log the change in `CHANGELOG.md`. |

### Adding an image

```bash
npm run images -- path/to/photo.png public/images/certificates/my-new-award
# → creates my-new-award.webp (1600px) and my-new-award-thumb.webp (640px)
```

Then reference `images/certificates/my-new-award.webp` in the content file, with descriptive `alt` text.

### Planned improvements

- SCRAP-WISE: add screenshots of the management information system and a short demo video once testing is done
- APM Customs Brokerage: add design screenshots and wireframes
- Add a downloadable résumé (PDF)
- Add case-study pages for the coursework projects
