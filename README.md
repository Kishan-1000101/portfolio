# Kishan Sobhee — Portfolio

Full-stack developer based in Mauritius. Live site:

**[kishan-1000101.github.io/portfolio](https://Kishan-1000101.github.io/portfolio/)**

Built with React, Vite, and Tailwind CSS. Content and layout live in one place (`src/Portfolio.jsx`) so the site stays easy to update.

## What’s on the site

- **Intro** — interactive hero (trackball core) with blueprint / paper toggle
- **About** — positioning, markets, languages
- **Work** — live case studies, experience timeline, education
- **Capability** — skill schematic linked to systems and workplaces
- **Numbers** — engagement density and timeline
- **Contact** — email, LinkedIn, GitHub, and **Download CV**

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

## Edit content

Almost everything is driven by the `CONFIG` object near the top of `src/Portfolio.jsx`.

| Goal | Where |
| --- | --- |
| Case studies | `CONFIG.projects` |
| Experience / roles | `CONFIG.experience` |
| Education | `CONFIG.education` |
| Skills schematic | `CONFIG.skills` |
| Stats, heatmap, timeline | `CONFIG.stats`, `CONFIG.engagements` |
| Contact + identity | `CONFIG.identity`, `CONFIG.contact` |
| CV file | `public/cv/Kishan-Sobhee-Resume.pdf` |

Design tokens (colours, fonts) live in `src/index.css` under `@theme`. Blueprint mode remaps those same tokens.

## Navigation

On desktop, viewport-height sections use an immersive hop with a short curtain transition. Tall sections (Work, Numbers) scroll normally. Mobile uses standard scroll plus a hamburger menu.

## Performance

- Respects `prefers-reduced-motion`
- Also lights up a lite mode on low-end devices (Data Saver, ≤2 CPU cores, or ≤4 GB device memory)
- Hero canvas pauses when off-screen
- Scroll reveals and counters use `IntersectionObserver`

## Deploy (GitHub Pages)

Published from the `gh-pages` branch (static `dist/` output).

```powershell
npm ci
$env:VITE_BASE="/portfolio/"; npm run build
```

```bash
npm ci
VITE_BASE=/portfolio/ npm run build
```

Then publish the contents of `dist/` to `gh-pages` (root). In the repo:

**Settings → Pages → Deploy from a branch → `gh-pages` / `/ (root)`**

Live URL: `https://Kishan-1000101.github.io/portfolio/`

## Deploy (OVH or any static host)

`npm run build` (without `VITE_BASE`, or with `base: "./"`) produces a static `dist/`. Upload its contents to the web root or subdirectory.

## License

Personal portfolio. All rights reserved unless noted otherwise.
