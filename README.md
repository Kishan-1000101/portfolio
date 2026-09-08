# Portfolio — Kishan Sobhee

Editorial-style single-page portfolio. React + Vite + Tailwind v4.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Where to edit content

Everything you'd normally want to change lives in the `CONFIG` object at the top of
`src/Portfolio.jsx`. Nothing below the "Below this line is layout and behaviour"
comment needs touching to add content.

| To do this | Edit |
| --- | --- |
| Add a case study | Push an object onto `CONFIG.projects` — numbering, the accordion row and the problem/approach/result layout are generated. `url` + `urlLabel` add the live link |
| Add smaller shipped work | Push onto `CONFIG.alsoLive.items` — renders as a compact linked row under the case studies |
| Add NDA-bound work | Push onto `CONFIG.earlier.items`. This block exists so employer/agency work can be shown by role and technology without naming end clients |
| Add a skill | Add to the relevant `CONFIG.skills.groups[].items`. `level` is 1–3, `used` is a list of project `id`s and renders the "shipped in" tags |
| Add a skill category | Push a new group onto `CONFIG.skills.groups` — the column and its number appear automatically |
| Change a stat | Edit `CONFIG.stats.counters` — the count-up animation reads `value`, `decimals` and `suffix` |
| Change the tech split | Edit `CONFIG.stats.breakdown.items`, keeping `weight` totals near 100 |
| Update the heatmap / timeline | Edit `CONFIG.engagements`. Both the density heatmap and the timeline bars are derived from it, so they can't drift apart. Set `end: null` for ongoing work (the bar then stops at today's date automatically), and widen `CONFIG.timelineRange` as years pass. `role` and `focus` populate the hover detail strip |
| Change contact details | `CONFIG.identity` and `CONFIG.contact` |
| Change the easter egg word | `CONFIG.easterEgg.sequence` |

Design tokens (colours, fonts) are in `src/index.css` under `@theme`. The blueprint
easter egg works by remapping those same variables, so any new component built with
`text-ink` / `bg-paper` / `text-accent` flips with it for free.

## Blueprint view

The "Blueprint view" button in the header inverts the site to a dark technical
wireframe with section labels and dashed bounding boxes. Typing `grid` anywhere
still works as a shortcut, and `Esc` exits.

## One-page scrolling

`src/index.css` applies `scroll-snap-type: y proximity` at 1024px and above.
Proximity rather than mandatory is deliberate: the work, capability and numbers
sections are taller than a viewport, and mandatory snapping would fight the reader
inside them. Short sections settle into place; tall ones scroll freely. The rule
marks down the right edge track position and jump between sections.

## Deploying to GitHub Pages

This site is published from the `gh-pages` branch (static `dist/` output).

```bash
npm ci
$env:VITE_BASE="/portfolio/"; npm run build   # PowerShell
# VITE_BASE=/portfolio/ npm run build         # bash
```

Then publish `dist/` to the `gh-pages` branch (done automatically when pushing from this agent setup). Site URL:

`https://Kishan-1000101.github.io/portfolio/`

In the repo: **Settings → Pages → Deploy from a branch → `gh-pages` / `/ (root)`**.

## Deploying to OVH

`npm run build` produces a fully static `dist/`. Upload the contents of `dist/` to your web root.

For a subdirectory deploy without GitHub Actions, keep or set `base: "./"` in `vite.config.js`.

## Accessibility / performance notes

- All motion is gated behind `prefers-reduced-motion`; the hero canvas renders a
  single static frame instead of animating when reduced motion is on.
- Scroll reveals and counters use `IntersectionObserver` and disconnect after firing.
- The hero canvas allocates its grid once per resize, not per frame.
- Total production bundle is roughly 58 kB gzipped, most of which is React itself.
