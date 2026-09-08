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
| Add a case study | Push an object onto `CONFIG.projects` — numbering, the accordion row and the problem/approach/result layout are generated |
| Add a skill | Add to the relevant `CONFIG.skills.groups[].items`. `level` is 1–3, `used` is a list of project `id`s and renders the "shipped in" tags |
| Add a skill category | Push a new group onto `CONFIG.skills.groups` — the column and its number appear automatically |
| Change a stat | Edit `CONFIG.stats.counters` — the count-up animation reads `value`, `decimals` and `suffix` |
| Change the tech split | Edit `CONFIG.stats.breakdown.items`, keeping `weight` totals near 100 |
| Update the heatmap / timeline | Edit `CONFIG.engagements`. Both the density heatmap and the timeline bars are derived from it, so they can't drift apart. Set `end: null` for ongoing work, and widen `CONFIG.timelineRange` as years pass |
| Change contact details | `CONFIG.identity` and `CONFIG.contact` |
| Change the easter egg word | `CONFIG.easterEgg.sequence` |

Design tokens (colours, fonts) are in `src/index.css` under `@theme`. The blueprint
easter egg works by remapping those same variables, so any new component built with
`text-ink` / `bg-paper` / `text-accent` flips with it for free.

## The easter egg

Type `grid` anywhere on the page to toggle blueprint mode — the site inverts to a
dark technical wireframe with section labels and dashed bounding boxes. `Esc` or
typing `grid` again exits. The footer hints at it.

## Deploying to OVH

`npm run build` produces a fully static `dist/`. `vite.config.js` sets `base: "./"`
so it works from a subdirectory too. Upload the contents of `dist/` to your web root.

If you serve it from a subpath and links break, that `base` value is the thing to change.

## Accessibility / performance notes

- All motion is gated behind `prefers-reduced-motion`; the hero canvas renders a
  single static frame instead of animating when reduced motion is on.
- Scroll reveals and counters use `IntersectionObserver` and disconnect after firing.
- The hero canvas allocates its grid once per resize, not per frame.
- Total production bundle is roughly 58 kB gzipped, most of which is React itself.
