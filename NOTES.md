# Portfolio notes / backlog

Last updated: 2026-10-06 · Live: https://Kishan-1000101.github.io/portfolio/

---

## Planned next (confirmed)

### 1. Education & certifications
- [x] Education block on site under Work (matches CV: Huawei, UTM, SARC, Wisdom In Tech). About fact lists UTM only.
- [ ] Capability credentials bus wiring (optional follow-up).
- About facts + Languages + Markets (NZ/AU) synced.

### 2. Copy options — section 9 and beyond
- Finish picking in `copy-options.md` from **§9** onward (Experience note, Capability note, Numbers labels, heatmap, timeline caption, Contact heading/blurb/CTA).
- Capability note options are **stale** vs the live schematic (workplaces bus + click-to-open). Rewrite options after the UI settles, then lock picks.
- After 9H, decide whether Experience bullets / About fact rows need 5-option passes too (called out at bottom of `copy-options.md`).

### 3. Markets served — NZ & Australia
- [x] Numbers + About list Mauritius · Réunion · France · UK · NZ · Australia.

---

## Real gaps (fix / ship-blocking)

| Item | Status / action |
| --- | --- |
| **PC build photos** | Referenced as `./builds/build-01.jpg` … `04` but files missing → cards broken. Add 4 images under `public/builds/` (or drop image UI until ready). |
| **Timeline React keys** | *Likely fixed* — rows now use `${name}-${start}-${kind}-${i}`. Re-check console once; if clean, close this. |
| **Open Graph / Twitter cards** | No `og:image` / twitter image in `index.html` → share previews are title-only. Add a 1200×630 social image + meta tags. |
| **README** | Updated for curtain nav, education, CV download, and gh-pages deploy. |

---

## Worth a pass before sending the link

- [x] **Phone / short-laptop layout:** hero, education, contact, capability checked at 390×844 and 1366×768 / 1024×800. Short-height panels no longer hard-clip.
- **Live iframes:** some sites block embedding (`X-Frame-Options` / CSP). Plan empty-state or screenshot fallback per project.
- **Paper (light) view:** blueprint is default — spot-check paper for contrast, veil, and modal.

---

## Optional (not blocking)

- Contact form (beyond mailto / copy email)
- [x] Downloadable CV beside Contact (`public/cv/Kishan-Sobhee-Resume.pdf`)
- Custom domain
- Headshot or mark beyond the KS wordmark
- Analytics (Plausible / Umami) if you care about visit signal
- `sitemap.xml` + canonical URL once the domain is final
- Accessibility pass: focus traps in case-study modal, skip link, reduced-motion already partly done

---

## Suggested order

1. Add **PC build photos** (or hide image UI)
2. Confirm **timeline keys** in console
3. **OG / Twitter** image + meta
4. **Education / certs** section + Capability bus wiring
5. **Copy options §9+** lock + apply
6. **Markets served** — add New Zealand & Australia (Business Force)
7. README refresh
8. 10-minute **phone check** (Capability + case study + nav)
9. Optional: CV download, contact form, domain

---

## Also missing (judgment)

Beyond the list above, the biggest credibility gaps for a Mauritius freelance studio site are:

1. **Proof assets** — build photos, and at least one real case-study screenshot fallback when iframes fail.
2. **Credentials on the schematic** — education/certs belong in Capability so the degree/program isn’t only a timeline caption.
3. **Share card** — first impression when you paste the link in WhatsApp/LinkedIn.
4. **Copy consistency** — Capability blurb and §9 options still describe an older schematic.

Not missing for v1: blog, testimonials carousel, CMS, dark-mode toggle beyond blueprint/paper.
