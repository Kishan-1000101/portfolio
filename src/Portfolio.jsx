import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   CONFIG — This is the only object you need to edit.
   Add a project, a skill, a stat or an engagement here and the layout
   picks it up automatically. Nothing below this block needs touching.
   ═══════════════════════════════════════════════════════════════════════ */

const CONFIG = {
  identity: {
    name: "Kishan Sobhee",
    fullName: "Kishan Kishore Sobhee",
    role: "Full-Stack Developer",
    location: "Vacoas, Mauritius",
    email: "kibee0506@gmail.com",
    phone: "+230 5905 4115",
    github: "https://github.com/Kishan-1000101",
    githubLabel: "github.com/Kishan-1000101",
    linkedin: "https://www.linkedin.com/in/ksobhee",
    linkedinLabel: "linkedin.com/in/ksobhee",
    available: true,
    availableNote: "Taking new projects",
  },

  hero: {
    eyebrow: "Full-stack developer — remote, worldwide",
    // Each string is its own masked reveal line.
    headline: ["I build the systems", "businesses actually", "run on."],
    emphasis: 2, // index of the line that gets the serif italic accent
    intro:
      "Multi-tenant SaaS, marketplaces, booking platforms and analytics — scoped, built, deployed and supported end to end. Usually as the only developer on the project.",
    marquee: [
      "Multi-tenant SaaS",
      "Marketplace commerce",
      "Booking & scheduling",
      "Pricing engines",
      "Document automation",
      "Analytics dashboards",
      "OCR pipelines",
      "Workflow automation",
    ],
  },

  about: {
    label: "About",
    lead: "I started in enterprise systems, and I never lost the habit of building things that have to work on a Monday morning.",
    body: [
      "Most of what I ship replaces something manual and fragile — a rental company quoting from a spreadsheet, an agency rebuilding the same client report every month, a studio taking bookings over WhatsApp with no view of its own calendar.",
      "My core stack is Laravel and React, but I work deliberately language-agnostic. I've delivered in PHP, JavaScript, TypeScript, Python, Salesforce/Apex and PL/SQL, and I pick the tools that fit the problem instead of the ones I already know. I use AI-assisted development to move fast, and I own the result — architecture, debugging, deployment and everything after launch.",
    ],
    pullQuote:
      "The interesting part was never the framework. It's the pricing rule nobody wrote down, and the paperwork somebody still fills in by hand.",
    facts: [
      { k: "Based", v: "Vacoas, Mauritius" },
      { k: "Working with", v: "Mauritius · Réunion · France · UK · Remote" },
      { k: "Education", v: "BSc (Hons) Software Engineering, UTM" },
      { k: "Languages", v: "English (fluent) · French (working)" },
    ],
  },

  /* Case studies. Add an object here and a new numbered row appears.
     `featured: true` shows a live site preview when the row is open.
     Organise like the CV: public systems first, then earlier engagements,
     then the career-break builds further down. */
  workIntro:
    "Systems currently in production, organised the same way as my CV. Client names sit inside each case study — Agence ISCL covers KeyCars and Client Analytics.",

  projects: [
    {
      id: "keycars",
      title: "KeyCars",
      subtitle: "Multi-tenant car rental platform",
      client: "Agence ISCL (Linar)",
      period: "Jun 2025 — Present",
      role: "Lead developer",
      featured: true,
      url: "https://keycars.fr/",
      urlLabel: "keycars.fr",
      problem:
        "Rental companies were running fleets on paper and spreadsheets. Quotes, contracts, vehicle condition reports and parking assignments were all manual, and every branch did them slightly differently.",
      approach:
        "Built a multi-tenant platform where each rental company gets scoped fleets, agencies, subscription limits and its own roles. Layered pricing resolves a correct daily rate from base plans, duration tiers, packages and seasonal windows. OCR with machine-readable-zone parsing fills customer records from a camera capture. Quotes, contracts and invoices generate and send themselves. A full vehicle inspection flow captures damage on multi-angle diagrams with annotated photos and signatures from both parties.",
      result:
        "A rental runs end to end in one system — quote to signed contract to vehicle handover — with the paperwork produced automatically rather than typed. A visual parking editor lets staff draw their site and locate any vehicle on it.",
      stack: ["Laravel 12", "React", "TypeScript", "MUI", "MySQL", "OCR", "PDF"],
      highlights: [
        { k: "Tenancy", v: "Company-scoped" },
        { k: "Roles", v: "Admin · Manager · Field agent" },
        { k: "Domain", v: "50+ models" },
      ],
    },
    {
      id: "zilmall",
      title: "ZilMall",
      subtitle: "Mauritius multi-vendor marketplace",
      client: "ZilMall",
      period: "Oct 2025 — Present",
      role: "Full-stack developer & project manager",
      featured: true,
      url: "https://zilmall.mu/",
      urlLabel: "zilmall.mu",
      problem:
        "Mauritian sellers had no marketplace built around how they actually trade — registered businesses alongside individual sellers, wholesale pricing, local payout methods and local VAT rules.",
      approach:
        "One Laravel and React codebase carrying three distinct applications: a public storefront with customer accounts, a seller portal, and an admin console. Dual onboarding handles registered shops and individual vendors, each with business registration and identity document capture, payout details and VAT settings, gated behind admin approval queues for both sellers and listings.",
      result:
        "Sellers onboard themselves, list and price products including wholesale tiers and promotional catalogues, and fulfil orders through a multi-seller cart and full order lifecycle. Admins run taxonomy, approvals, marketing mailings, support and bulk catalogue operations from one place.",
      stack: ["Laravel 12", "React 19", "Inertia", "TypeScript", "MySQL"],
      highlights: [
        { k: "Applications", v: "Storefront · Seller · Admin" },
        { k: "Seller types", v: "Business & individual" },
        { k: "Also", v: "Delivery ownership" },
      ],
    },
    {
      id: "mrprod",
      title: "MR Production",
      subtitle: "Studio booking platform",
      client: "MR Production Co Ltd",
      period: "Feb 2026 — Present",
      role: "Full-stack developer",
      featured: true,
      url: "https://mineshramchurn.com/",
      urlLabel: "mineshramchurn.com",
      problem:
        "A photography and videography studio took bookings through messages, with no shared view of availability, and needed a developer for every content change on its site.",
      approach:
        "Public site plus a multi-step booking flow running against a live Mauritius-timezone availability calendar, with blocked dates and time ranges, multi-day and multi-location events, and budget options per event type. A Filament back office puts bookings, team assignment, availability, portfolio and all site content in the studio's hands.",
      result:
        "Clients book against real availability instead of a message thread, and the studio edits its own portfolio, services and schedule without developer time. Live in production on OVH.",
      stack: ["Laravel 12", "Filament", "Inertia", "React", "Tailwind", "OVH"],
      highlights: [
        { k: "Booking", v: "Multi-day, multi-location" },
        { k: "Admin", v: "Self-service CMS" },
        { k: "Status", v: "In production" },
      ],
    },
    {
      id: "analytics",
      title: "Client Analytics",
      subtitle: "Multi-tenant marketing dashboards",
      client: "Agence ISCL (Linar)",
      period: "Jun 2025 — Present",
      role: "Full-stack developer",
      featured: true,
      url: "https://tracking-dashboard.fr/",
      urlLabel: "tracking-dashboard.fr",
      problem:
        "The agency rebuilt every client report by hand each month, pulling revenue, Google Analytics and social performance into slides that were stale the moment they were sent.",
      approach:
        "Started during the part-time phase at ISCL: a white-label multi-tenant dashboard on React and Supabase, with per-client routing, editable layouts, custom metrics and agency branding. Scheduled n8n workflows collect marketing and operational data into Supabase continuously, and saved dashboard versions let anyone compare periods.",
      result:
        "Client reporting became continuous instead of a monthly manual exercise, with historical snapshots for period-over-period comparison. Still live and maintained.",
      stack: ["React", "TypeScript", "Supabase", "n8n", "Tailwind", "WordPress"],
      highlights: [
        { k: "Tenancy", v: "Per-client slugs" },
        { k: "Data", v: "Scheduled ingestion" },
        { k: "Phase", v: "Built part-time, Jun–Oct 2025" },
      ],
    },
    {
      id: "syul",
      title: "Safyr Utilis",
      subtitle: "Corporate website",
      client: "Safyr Utilis",
      period: "Feb 2025 — Nov 2025",
      role: "Sole developer",
      featured: true,
      url: "https://syul.mu/",
      urlLabel: "syul.mu",
      problem:
        "The company needed a modern public site that presented its services cleanly, loaded well on mobile, and could be handed over without ongoing developer dependency for day-to-day content.",
      approach:
        "Designed, built and deployed the official website end to end as sole developer — responsive layout, performance-minded assets, and a structure the client could keep updating after go-live.",
      result:
        "Live at syul.mu and handed over in production.",
      stack: ["HTML/CSS", "JavaScript", "Responsive design"],
      highlights: [
        { k: "Delivery", v: "Sole developer" },
        { k: "Status", v: "In production" },
      ],
    },
  ],

  /* Work delivered inside employers' client engagements. Deliberately describes
     role and technology only — no end-client names or proprietary detail. */
  earlier: {
    label: "Earlier engagements",
    note: "Delivered inside employers' and agencies' client engagements. Described by role and technology only — end clients and their systems stay confidential. Matches the Agileum and Business Force sections on my CV.",
    items: [
      {
        org: "Agileum",
        period: "Jan 2025 — Apr 2026",
        role: "Associate software engineer → freelance",
        work: [
          "Secure AI chatbot with JWT and Google/Microsoft authentication",
          "Automated invoice processing and document data extraction",
          "Drupal content platforms plus Laravel, Angular and Node applications",
          "Release and environment management with Docker, Nginx and Jenkins",
          ".NET Core migration support",
        ],
      },
      {
        org: "Business Force Limited",
        period: "Feb 2023 — Sep 2024",
        role: "Information system engineer",
        work: [
          "Salesforce delivery using Apex, SOQL, Flows, Triggers and Omnistudio",
          "PL/SQL investigation and query optimisation on Oracle",
          "Off-hours production support for clients in other time zones",
          "Monthly and yearly closure cycle support",
          "Mentored two interns on PL/SQL and application debugging",
        ],
      },
    ],
  },

  /* Career break between BFL and Agileum — hardware builds sold on Marketplace. */
  careerBreak: {
    label: "Career break — PC building",
    period: "Oct 2024 — Dec 2024",
    note: "Between Business Force and Agileum I designed and built high-performance gaming PCs from scratch — component selection, assembly, testing and optimisation — and sold them on Facebook Marketplace.",
    builds: [
      {
        name: "Build 01",
        url: "https://www.facebook.com/marketplace/item/1184770826446411",
      },
      {
        name: "Build 02",
        url: "https://www.facebook.com/marketplace/item/1864597417679724/",
      },
      {
        name: "Build 03",
        url: "https://www.facebook.com/marketplace/item/591497393373766/",
      },
      {
        name: "Build 04",
        url: "https://www.facebook.com/marketplace/item/472324075339632/",
      },
    ],
  },

  /* Capability index. `level`: 3 = daily, 2 = builds with, 1 = prior/enterprise.
     Curated from LinkedIn + current delivery — not every skill ever listed. */
  skills: {
    label: "Capability index",
    note: "Levelled honestly against what I ship. Everything at three, I use every week and can be interviewed on. Drawn from LinkedIn and the work above — not a dump of every tool I've touched.",
    groups: [
      {
        name: "Backend",
        items: [
          { name: "PHP", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "Laravel", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "MySQL / SQL", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "REST / Web APIs", level: 3, used: ["keycars", "zilmall", "analytics"] },
          { name: "Node.js", level: 2, used: [] },
          { name: "Python", level: 2, used: [] },
          { name: "PostgreSQL / Supabase", level: 2, used: ["analytics"] },
          { name: "Oracle / PL/SQL", level: 1, used: [] },
          { name: "MongoDB", level: 1, used: [] },
          { name: ".NET / C# / ASP.NET", level: 1, used: [] },
        ],
      },
      {
        name: "Frontend",
        items: [
          { name: "React / React.js", level: 3, used: ["keycars", "zilmall", "mrprod", "analytics"] },
          { name: "JavaScript / TypeScript", level: 3, used: ["keycars", "zilmall", "analytics"] },
          { name: "Inertia.js", level: 3, used: ["zilmall", "mrprod"] },
          { name: "Tailwind CSS", level: 3, used: ["mrprod", "analytics"] },
          { name: "Filament", level: 3, used: ["mrprod"] },
          { name: "HTML / CSS / Web design", level: 3, used: ["syul"] },
          { name: "WordPress", level: 2, used: ["analytics"] },
          { name: "MUI", level: 2, used: ["keycars"] },
          { name: "Angular / AngularJS", level: 1, used: [] },
          { name: "Drupal", level: 1, used: [] },
        ],
      },
      {
        name: "Systems & domains",
        items: [
          { name: "Multi-tenant architecture", level: 3, used: ["keycars", "analytics"] },
          { name: "Role-based access control", level: 3, used: ["keycars", "zilmall"] },
          { name: "Pricing engines", level: 3, used: ["keycars"] },
          { name: "Booking & scheduling", level: 3, used: ["mrprod", "keycars"] },
          { name: "Marketplace commerce", level: 3, used: ["zilmall"] },
          { name: "Document / PDF automation", level: 3, used: ["keycars"] },
          { name: "OCR pipelines", level: 2, used: ["keycars"] },
          { name: "AI chatbots & automation", level: 2, used: ["analytics"] },
          { name: "Salesforce (Apex, SOQL, Flows)", level: 1, used: [] },
          { name: "Software testing / QA", level: 2, used: ["keycars"] },
        ],
      },
      {
        name: "Delivery & tooling",
        items: [
          { name: "Git / GitLab", level: 3, used: [] },
          { name: "AI-assisted dev (Cursor)", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "OVH / Linux deployment", level: 3, used: ["mrprod", "keycars"] },
          { name: "Docker", level: 2, used: [] },
          { name: "Nginx", level: 2, used: ["mrprod"] },
          { name: "Jenkins / CI", level: 2, used: [] },
          { name: "n8n automation", level: 2, used: ["analytics"] },
          { name: "Jira", level: 2, used: [] },
          { name: "Insomnia / SoapUI", level: 2, used: [] },
          { name: "Flutter / Android (prior)", level: 1, used: [] },
        ],
      },
    ],
    legend: [
      { level: 3, label: "Daily" },
      { level: 2, label: "Build with" },
      { level: 1, label: "Prior experience" },
    ],
  },

  stats: {
    label: "By the numbers",
    counters: [
      { value: 3.5, suffix: "+", decimals: 1, label: "Years building professionally", sub: "Since Feb 2023" },
      { value: 5, suffix: "", decimals: 0, label: "Live systems you can visit", sub: "Publicly linked above" },
      { value: 6, suffix: "", decimals: 0, label: "Organisations delivered for", sub: "Agency, product & enterprise" },
      { value: 4, suffix: "", decimals: 0, label: "Markets served", sub: "Mauritius · Réunion · France · UK" },
    ],
    // Relative weight of where delivery time goes. Keep total near 100.
    breakdown: {
      label: "Where the work goes",
      items: [
        { name: "Backend — Laravel / PHP", weight: 34 },
        { name: "Frontend — React / TypeScript", weight: 28 },
        { name: "Data modelling & SQL", weight: 14 },
        { name: "Integrations, OCR & automation", weight: 12 },
        { name: "Deployment & production support", weight: 12 },
      ],
    },
    heatmap: {
      label: "Engagement density",
      note: "Concurrent active client engagements per month, derived from the timeline below.",
    },
  },

  /* Drives the heatmap and the timeline. Months are inclusive, 1-indexed.
     Leave `end` null for an ongoing engagement. */
  engagements: [
    {
      name: "Business Force Limited",
      start: [2023, 2],
      end: [2024, 9],
      kind: "Full-time",
      role: "Information system engineer",
      focus: "Salesforce · PL/SQL · enterprise support",
    },
    {
      name: "PC building",
      start: [2024, 10],
      end: [2024, 12],
      kind: "Career break",
      role: "Custom PC builds",
      focus: "Design, assemble, test and sell gaming PCs",
    },
    {
      name: "Agileum",
      start: [2025, 1],
      end: [2026, 4],
      kind: "Full-time → freelance",
      role: "Associate software engineer",
      focus: "AI integration · Drupal · Laravel · DevOps",
    },
    {
      name: "Safyr Utilis",
      start: [2025, 2],
      end: [2025, 11],
      kind: "Freelance",
      role: "Web developer",
      focus: "Corporate website, sole developer",
    },
    {
      name: "Agence ISCL",
      start: [2025, 6],
      end: null,
      kind: "Part-time → full-time → freelance",
      role: "Full-stack developer",
      focus: "KeyCars SaaS · analytics · WordPress",
    },
    {
      name: "ZilMall",
      start: [2025, 10],
      end: null,
      kind: "Freelance",
      role: "Full-stack developer & PM",
      focus: "Multi-vendor marketplace",
    },
    {
      name: "MR Production",
      start: [2026, 2],
      end: null,
      kind: "Freelance",
      role: "Full-stack developer",
      focus: "Studio site & booking platform",
    },
  ],
  timelineRange: { from: 2023, to: 2026 },

  contact: {
    label: "Contact",
    heading: ["Have something", "that needs building?"],
    blurb:
      "Tell me what the system has to do and who has to use it. I'll come back with scope, a timeline and a price — not a discovery call that goes nowhere.",
    cta: "Start a conversation",
  },

  easterEgg: {
    sequence: "grid",
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   Below this line is layout and behaviour. You shouldn't need to edit it.
   ═══════════════════════════════════════════════════════════════════════ */

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ---------------------------------- hooks --------------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Adds `is-visible` once the element scrolls into view. */
function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options.threshold, options.rootMargin]);
  return ref;
}

/** Counts up to `target` when scrolled into view. */
function useCountUp(target, { decimals = 0, duration = 1600 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setDisplay(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const step = (now) => {
          if (!start) start = now;
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplay(target * eased);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, reduced]);

  return [ref, display.toFixed(decimals)];
}

/** Immersive section scroll for desktop.
 *  `page` sections: one wheel tick → next/prev with a curtain transition.
 *  `free` sections: normal scroll; crossing top/bottom boundary advances. */
const SCROLL_PLAN = [
  { id: "top", mode: "page" },
  { id: "about", mode: "page" },
  { id: "work", mode: "free" },
  { id: "capability", mode: "page" },
  { id: "numbers", mode: "free" },
  { id: "contact", mode: "page" },
];

function useImmersiveScroll(reduced) {
  const [curtain, setCurtain] = useState(null); // 'down' | 'up' | null
  const locked = useRef(false);
  const touchY = useRef(0);

  const goTo = useCallback(
    async (targetId, direction) => {
      if (locked.current || reduced) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      locked.current = true;
      setCurtain(direction);
      // Cover completes ~42% of 780ms ≈ 330ms; leave a little margin.
      await new Promise((r) => setTimeout(r, 360));
      const el = document.getElementById(targetId);
      if (el) {
        const plan = SCROLL_PLAN.find((s) => s.id === targetId);
        if (direction === "up" && plan?.mode === "free") {
          window.scrollTo({
            top: Math.max(0, el.offsetTop + el.offsetHeight - window.innerHeight),
            behavior: "instant",
          });
        } else {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }
      // Hold cover briefly, then let the exit half of the animation finish.
      await new Promise((r) => setTimeout(r, 480));
      setCurtain(null);
      await new Promise((r) => setTimeout(r, 80));
      locked.current = false;
    },
    [reduced]
  );

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const currentIndex = () => {
      const mid = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      SCROLL_PLAN.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) idx = i;
      });
      return idx;
    };

    const atSectionEdge = (el, dir) => {
      const top = el.getBoundingClientRect().top;
      const bottom = el.getBoundingClientRect().bottom;
      if (dir === "down") return bottom <= window.innerHeight + 4;
      return top >= -4;
    };

    const advance = (dir) => {
      const i = currentIndex();
      const next = dir === "down" ? i + 1 : i - 1;
      if (next < 0 || next >= SCROLL_PLAN.length) return;
      goTo(SCROLL_PLAN[next].id, dir);
    };

    const onWheel = (e) => {
      if (locked.current) {
        e.preventDefault();
        return;
      }
      // Don't hijack while a modal/dialog is open
      if (document.body.dataset.modalOpen === "1") return;

      const i = currentIndex();
      const section = SCROLL_PLAN[i];
      const el = document.getElementById(section.id);
      if (!el) return;

      const dir = e.deltaY > 0 ? "down" : "up";
      if (Math.abs(e.deltaY) < 8) return;

      if (section.mode === "page") {
        e.preventDefault();
        advance(dir);
        return;
      }

      // free: only leave at edges
      if (atSectionEdge(el, dir)) {
        e.preventDefault();
        advance(dir);
      }
    };

    const onKey = (e) => {
      if (locked.current || document.body.dataset.modalOpen === "1") return;
      if (["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey) {
        const i = currentIndex();
        const section = SCROLL_PLAN[i];
        const el = document.getElementById(section.id);
        if (section.mode === "page" || (el && atSectionEdge(el, "down"))) {
          e.preventDefault();
          advance("down");
        }
      }
      if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        const i = currentIndex();
        const section = SCROLL_PLAN[i];
        const el = document.getElementById(section.id);
        if (section.mode === "page" || (el && atSectionEdge(el, "up"))) {
          e.preventDefault();
          advance("up");
        }
      }
    };

    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (locked.current || document.body.dataset.modalOpen === "1") return;
      const dy = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 60) return;
      const dir = dy > 0 ? "down" : "up";
      const i = currentIndex();
      const section = SCROLL_PLAN[i];
      const el = document.getElementById(section.id);
      if (section.mode === "page" || (el && atSectionEdge(el, dir))) {
        advance(dir);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo, reduced]);

  return curtain;
}

function PageCurtain({ direction }) {
  if (!direction) return null;
  return (
    <div className="page-curtain" aria-hidden="true" data-dir={direction}>
      <div className="page-curtain-panel" />
      <div className="page-curtain-line" />
    </div>
  );
}

/** Type CONFIG.easterEgg.sequence anywhere to toggle blueprint mode.
 *  Defaults to blueprint on — the site's intended first impression. */
function useBlueprintMode(sequence) {
  const [on, setOn] = useState(true);
  const buffer = useRef("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape") {
        setOn(false);
        buffer.current = "";
        return;
      }
      if (e.key.length !== 1) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-sequence.length);
      if (buffer.current === sequence) {
        setOn((v) => !v);
        buffer.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sequence]);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("blueprint", on);
    return () => document.documentElement.classList.remove("blueprint");
  }, [on]);

  return [on, setOn];
}

/** Tracks which section currently occupies the middle of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Scroll progress 0 → 1 for the top rule. */
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? window.scrollY / h : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/* ------------------------------ shared atoms ------------------------------ */

function SectionLabel({ index, children }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      data-reveal
      className="mb-10 flex items-baseline gap-4 border-b border-[var(--color-rule)] pb-3"
    >
      <span className="font-mono text-[11px] tracking-[0.22em] text-accent">{index}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {children}
      </span>
    </div>
  );
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------- icons --------------------------------- */
/* Stroke-drawn to match the hairline rules; inherit currentColor. */

const ICON_PATHS = {
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1" />
      <path d="M2.8 5.4 10 11l7.2-5.6" />
    </>
  ),
  phone: (
    <path d="M6.4 2.8 8 6.1 6.4 7.7c.9 2 2.4 3.5 4.4 4.4l1.6-1.6 3.3 1.6v3.1c0 .7-.6 1.3-1.3 1.2C7.8 15.9 4.1 12.2 3.2 4.1c-.1-.7.5-1.3 1.2-1.3z" />
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="1.5" />
      <path d="M6.2 8.6v5.2M6.2 6.1v.1M9.6 13.8V8.6M9.6 10.7c0-1.2.8-2.1 2-2.1s2.2.9 2.2 2.4v2.8" />
    </>
  ),
  github: (
    <path d="M7.6 17c-3 .9-3-1.6-4.2-1.9m8.4 3.4v-2.9c0-.8-.1-1.1-.6-1.5 2.2-.2 4.4-1.1 4.4-4.8a3.7 3.7 0 0 0-1-2.6 3.5 3.5 0 0 0-.1-2.6s-.8-.2-2.7 1a9.2 9.2 0 0 0-4.8 0C5.1 4 4.3 4.2 4.3 4.2a3.5 3.5 0 0 0-.1 2.6 3.7 3.7 0 0 0-1 2.6c0 3.7 2.2 4.5 4.4 4.8-.3.3-.5.7-.6 1.2v2.1" />
  ),
  pin: (
    <>
      <path d="M16 8.3c0 4.2-6 9.2-6 9.2s-6-5-6-9.2a6 6 0 0 1 12 0z" />
      <circle cx="10" cy="8.2" r="2.1" />
    </>
  ),
  arrow: <path d="M5 15 15 5M7.4 5H15v7.6" />,
  grid: (
    <>
      <rect x="2.8" y="2.8" width="14.4" height="14.4" rx="1" />
      <path d="M7.6 2.8v14.4M12.4 2.8v14.4M2.8 7.6h14.4M2.8 12.4h14.4" />
    </>
  ),
  paper: (
    <>
      <rect x="4" y="2.5" width="12" height="15" rx="1" />
      <path d="M7 6.5h6M7 10h6M7 13.5h4" />
    </>
  ),
};

function Icon({ name, className = "h-4 w-4" }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {path}
    </svg>
  );
}

/* -------------------------------- hero field ------------------------------ */
/**
 * A field of short ink strokes that turn toward the cursor. Cheap: one canvas,
 * one rAF loop, no per-particle allocation after setup.
 */
function InkField({ reduced, blueprint }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999, cx: -9999, cy: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let cells = [];
    let w = 0;
    let h = 0;

    // Read palette from CSS so the field follows blueprint mode.
    const rootStyle = getComputedStyle(document.documentElement);
    const inkRGB = rootStyle.getPropertyValue("--stroke-ink").trim() || "20, 17, 15";
    const accentRGB = rootStyle.getPropertyValue("--stroke-accent").trim() || "11, 118, 159";

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = w < 640 ? 34 : 42;
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      cells = [];
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          cells.push({
            x: i * gap + gap / 2,
            y: j * gap + gap / 2,
            a: -Math.PI / 2,
            len: 7,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const p = pointer.current;
      p.cx += (p.x - p.cx) * 0.09;
      p.cy += (p.y - p.cy) * 0.09;
      const radius = 230;

      for (const c of cells) {
        const dx = p.cx - c.x;
        const dy = p.cy - c.y;
        const dist = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - dist / radius);

        const targetA = influence > 0 ? Math.atan2(dy, dx) : -Math.PI / 2;
        // shortest-path angle lerp
        let diff = targetA - c.a;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        c.a += diff * (0.06 + influence * 0.18);

        const targetLen = 6 + influence * 16;
        c.len += (targetLen - c.len) * 0.12;

        const alpha = 0.13 + influence * 0.5;
        ctx.strokeStyle =
          influence > 0.45
            ? `rgba(${accentRGB}, ${alpha})`
            : `rgba(${inkRGB}, ${alpha * 0.75})`;
        ctx.lineWidth = influence > 0.6 ? 1.35 : 1;
        ctx.beginPath();
        ctx.moveTo(c.x - Math.cos(c.a) * c.len * 0.5, c.y - Math.sin(c.a) * c.len * 0.5);
        ctx.lineTo(c.x + Math.cos(c.a) * c.len * 0.5, c.y + Math.sin(c.a) * c.len * 0.5);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(${inkRGB}, 0.12)`;
      ctx.lineWidth = 1;
      for (const c of cells) {
        ctx.beginPath();
        ctx.moveTo(c.x, c.y - 3.5);
        ctx.lineTo(c.x, c.y + 3.5);
        ctx.stroke();
      }
    };

    const onResize = () => {
      build();
      if (reduced) drawStatic();
    };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    };

    build();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, blueprint]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* ---------------------------------- nav ----------------------------------- */

const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "capability", label: "Capability" },
  { id: "numbers", label: "Numbers" },
  { id: "contact", label: "Contact" },
];

const RAIL = [{ id: "top", label: "Intro" }, ...NAV];
const RAIL_IDS = RAIL.map((s) => s.id);

/** Fixed rule-marks down the right edge — position indicator and jump nav. */
function SectionRail({ active }) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
    >
      {RAIL.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={on ? "true" : undefined}
            className="group flex items-center justify-end gap-2.5 py-1"
          >
            {/* Label only on hover — at rest the rail stays inside the page
                margin instead of sitting on top of the content column. */}
            <span
              className={`bg-paper/90 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 ${
                on ? "text-accent" : "text-ink-soft"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-px transition-all duration-400 ${
                on ? "w-7 bg-accent" : "w-3.5 bg-ink/35 group-hover:w-5 group-hover:bg-ink"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}

/** Theme-style square toggle — same placement pattern as dark-mode switches
 *  on most product sites (trailing edge of the nav, after the primary CTA). */
function BlueprintToggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? "Switch to paper view" : "Switch to blueprint view"}
      title={on ? "Paper view (Esc)" : "Blueprint view"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300 ${
        on
          ? "border-accent text-accent hover:bg-accent/10"
          : "border-ink/30 text-ink-soft hover:border-accent hover:text-accent"
      }`}
    >
      <Icon name={on ? "paper" : "grid"} className="h-4 w-4" />
      <span className="sr-only">{on ? "Paper view" : "Blueprint view"}</span>
    </button>
  );
}

function Nav({ progress, active, blueprintOn, onToggleBlueprint }) {
  const [solid, setSolid] = useState(false);
  const atHero = active === "top";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-bp={atHero ? undefined : "header"}
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        solid ? "bg-paper/85 backdrop-blur-sm" : "bg-transparent"
      } ${atHero ? "bp-quiet" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl leading-none">KS</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint md:inline">
            {CONFIG.identity.role}
          </span>
        </a>
        <nav className="flex items-center gap-4 md:gap-6">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group relative hidden font-mono text-[11px] uppercase tracking-[0.16em] transition-colors sm:block ${
                active === item.id ? "text-accent" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-400 ${
                  active === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
          <a
            href={`mailto:${CONFIG.identity.email}`}
            className="border border-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Get in touch
          </a>
          <BlueprintToggle on={blueprintOn} onToggle={onToggleBlueprint} />
        </nav>
      </div>
      <div className="h-px w-full bg-[var(--color-rule)]">
        <div
          className="h-px bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero({ reduced, blueprint }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 90);
    return () => clearTimeout(t);
  }, []);

  const { hero, identity } = CONFIG;
  const marquee = [...hero.marquee, ...hero.marquee];

  return (
    <section
      id="top"
      data-bp="hero"
      className="panel-page relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28"
    >
      <InkField reduced={reduced} blueprint={blueprint} />

      <div className="relative mx-auto w-full max-w-[1400px] flex-1 px-6 pt-10 md:px-12 md:pt-20">
        <div className="flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            {identity.available && !reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            {hero.eyebrow}
          </p>
        </div>

        <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(2.9rem,10vw,8.5rem)] leading-[0.92] tracking-[-0.02em]">
          {hero.headline.map((line, i) => (
            <span
              key={line}
              className={`line-mask ${mounted ? "is-visible" : ""}`}
              aria-hidden={false}
            >
              <span
                style={{ transitionDelay: `${i * 110}ms` }}
                className={i === hero.emphasis ? "italic text-accent" : ""}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-8 border-t border-[var(--color-rule)] pt-6 md:grid-cols-12">
          <p
            className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft transition-all duration-1000 md:col-span-6 md:text-base"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transitionDelay: "520ms",
            }}
          >
            {hero.intro}
          </p>
          <dl
            className="grid grid-cols-2 gap-x-6 gap-y-4 transition-all duration-1000 md:col-span-6 md:grid-cols-3 md:justify-items-end"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transitionDelay: "640ms",
            }}
          >
            {[
              { k: "Location", v: identity.location },
              { k: "Focus", v: "Systems that run operations" },
              { k: "Status", v: identity.availableNote },
            ].map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {f.k}
                </dt>
                <dd className="mt-1 text-sm leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="marquee relative mt-16 overflow-hidden border-y border-[var(--color-rule)] py-3">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {marquee.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint"
            >
              {item}
              <span className="text-accent">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- about --------------------------------- */

function About() {
  const { about } = CONFIG;
  return (
    <section
      id="about"
      data-bp="about"
      className="panel-page relative flex min-h-[100svh] flex-col justify-center px-6 py-20 md:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
      <SectionLabel index="01">{about.label}</SectionLabel>

      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-7">
          <p className="font-display text-[clamp(1.55rem,3vw,2.55rem)] leading-[1.15] tracking-[-0.01em]">
            {about.lead}
          </p>
          <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-soft md:text-[15px]">
            {about.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="md:col-span-5">
          <figure className="border-l-2 border-accent pl-6">
            <blockquote className="font-display text-xl italic leading-snug md:text-2xl">
              “{about.pullQuote}”
            </blockquote>
          </figure>
          <dl className="mt-8 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {about.facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {f.k}
                </dt>
                <dd className="text-right text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      </div>
    </section>
  );
}

/* ---------------------------------- work ---------------------------------- */

function ProjectCaseStudy({ project }) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <dl className="md:col-span-3">
        {[
          { k: "Client", v: project.client },
          { k: "Role", v: project.role },
          { k: "Period", v: project.period },
        ].map((m) => (
          <div key={m.k} className="mb-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              {m.k}
            </dt>
            <dd className="mt-1 text-sm">{m.v}</dd>
          </div>
        ))}
        {project.url && (
          <div className="mb-5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              Live
            </dt>
            <dd className="mt-1">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm text-accent"
              >
                <span className="border-b border-accent/40 transition-colors group-hover/link:border-accent">
                  {project.urlLabel}
                </span>
                <Icon
                  name="arrow"
                  className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            </dd>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="border border-[var(--color-rule)] px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
      </dl>

      <div className="md:col-span-9">
        {project.featured && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group/preview mb-7 block overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-deep)]"
          >
            <div className="flex items-center gap-2 border-b border-[var(--color-rule)] px-3 py-2">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink/20" />
                <span className="h-2 w-2 rounded-full bg-ink/20" />
                <span className="h-2 w-2 rounded-full bg-ink/20" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-ink-faint">
                {project.urlLabel}
              </span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1400`}
                alt={`Preview of ${project.title}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-paper/40 to-transparent opacity-60" />
            </div>
          </a>
        )}

        <div className="grid gap-7 md:grid-cols-3">
          {[
            { k: "Problem", v: project.problem },
            { k: "Approach", v: project.approach },
            { k: "Result", v: project.result },
          ].map((block) => (
            <div key={block.k}>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                <span className="h-px w-4 bg-accent" />
                {block.k}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-ink-soft">{block.v}</p>
            </div>
          ))}
        </div>

        {project.highlights?.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-[var(--color-rule)] pt-5">
            {project.highlights.map((h) => (
              <div key={h.k} className="flex items-baseline gap-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {h.k}
                </dt>
                <dd className="font-mono text-[11px]">{h.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

function ProjectRow({ project, index, onOpen }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Reveal
      as="article"
      delay={index * 60}
      className="group border-b border-[var(--color-rule)] px-4 md:px-6"
    >
      <button
        onClick={onOpen}
        className="flex w-full cursor-pointer items-start gap-5 py-7 text-left md:gap-10"
      >
        <span className="mt-2 font-mono text-[11px] tracking-[0.18em] text-ink-faint transition-colors duration-300 group-hover:text-accent">
          {num}
        </span>

        <span className="flex-1">
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-[clamp(1.8rem,4.4vw,3.4rem)] leading-none tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              {project.period}
            </span>
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm text-ink-soft">
              <span className="text-ink">{project.client}</span>
              <span className="text-ink-faint"> · </span>
              {project.subtitle}
            </span>
            {project.urlLabel && (
              <span className="font-mono text-[10px] tracking-[0.08em] text-ink-faint">
                {project.urlLabel}
              </span>
            )}
          </span>
        </span>

        <span
          aria-hidden="true"
          className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
        >
          Open ↗
        </span>
      </button>
    </Reveal>
  );
}

function ProjectModal({ project, index, onClose }) {
  useEffect(() => {
    document.body.dataset.modalOpen = "1";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      delete document.body.dataset.modalOpen;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="project-modal-backdrop" onClick={onClose} aria-label="Close" />
      <div className="project-modal-panel">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-rule)] bg-paper/95 px-6 py-4 backdrop-blur-sm md:px-12">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{num}</span>
            <h2 className="font-display text-2xl md:text-3xl">{project.title}</h2>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:inline">
              {project.period}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border border-[var(--color-rule)] font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            aria-label="Close case study"
          >
            ✕
          </button>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 md:py-12">
          <p className="mb-10 text-sm text-ink-soft">
            {project.client} · {project.subtitle}
          </p>
          <ProjectCaseStudy project={project} />
        </div>
      </div>
    </div>
  );
}

function Work() {
  const [openId, setOpenId] = useState(null);
  const openProject = CONFIG.projects.find((p) => p.id === openId);
  const openIndex = CONFIG.projects.findIndex((p) => p.id === openId);

  return (
    <section
      id="work"
      data-bp="work"
      className="panel-free relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
    >
      <SectionLabel index="02">Selected work</SectionLabel>
      <Reveal className="mb-10 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
        {CONFIG.workIntro}
      </Reveal>

      <div className="border-t border-[var(--color-rule)]">
        {CONFIG.projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            onOpen={() => setOpenId(p.id)}
          />
        ))}
      </div>

      <Reveal className="mt-16 px-1">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {CONFIG.earlier.label}
        </h3>
        <p className="mt-2 mb-6 max-w-[62ch] text-[13px] leading-relaxed text-ink-faint">
          {CONFIG.earlier.note}
        </p>
        <div className="grid gap-8 border-t border-[var(--color-rule)] pt-6 md:grid-cols-2 md:gap-12">
          {CONFIG.earlier.items.map((item) => (
            <div key={item.org} className="px-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h4 className="font-display text-xl">{item.org}</h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-[13px] text-ink-soft">{item.role}</p>
              <ul className="mt-4 space-y-2">
                {item.work.map((w) => (
                  <li key={w} className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
                    <span className="mt-[8px] h-[2px] w-3 shrink-0 bg-accent" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16 px-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {CONFIG.careerBreak.label}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {CONFIG.careerBreak.period}
          </span>
        </div>
        <p className="mt-2 mb-6 max-w-[62ch] text-[13px] leading-relaxed text-ink-soft">
          {CONFIG.careerBreak.note}
        </p>
        <ul className="grid gap-3 border-t border-[var(--color-rule)] pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONFIG.careerBreak.builds.map((build) => (
            <li key={build.url}>
              <a
                href={build.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 border border-[var(--color-rule)] px-4 py-3 transition-colors hover:border-accent"
              >
                <span className="font-display text-lg transition-colors group-hover:text-accent">
                  {build.name}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint group-hover:text-accent">
                  Marketplace
                  <Icon
                    name="arrow"
                    className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {openProject && (
        <ProjectModal
          project={openProject}
          index={openIndex}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}

/* ------------------------------- capability ------------------------------- */

function SkillRow({ item, projectsById, hovered, onHover }) {
  const isHovered = hovered === item.name;
  return (
    <li
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      className="group/skill border-b border-[var(--color-rule)] py-1.5"
    >
      <div className="flex items-center gap-3">
        <span className="flex-1 text-[12.5px] transition-colors duration-200 group-hover/skill:text-accent">
          {item.name}
        </span>
        <span className="flex gap-1" aria-label={`Level ${item.level} of 3`}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-[2.5px] w-4 transition-all duration-300 ${
                n <= item.level ? "bg-accent" : "bg-[var(--color-rule)]"
              } ${isHovered && n <= item.level ? "h-[4px]" : ""}`}
            />
          ))}
        </span>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-400"
        style={{ gridTemplateRows: isHovered && item.used.length ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.used.map((id) => (
              <a
                key={id}
                href="#work"
                className="bg-accent/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-accent"
              >
                {projectsById[id]?.title ?? id}
              </a>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function Capability() {
  const { skills } = CONFIG;
  const [hovered, setHovered] = useState(null);
  const projectsById = useMemo(
    () => Object.fromEntries(CONFIG.projects.map((p) => [p.id, p])),
    []
  );

  return (
    <section
      id="capability"
      data-bp="capability"
      className="panel-page relative flex min-h-[100svh] flex-col justify-center px-6 py-16 md:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
      <SectionLabel index="03">{skills.label}</SectionLabel>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <Reveal className="max-w-[56ch] text-[13.5px] leading-relaxed text-ink-soft">
          {skills.note} Hover any capability to see where it shipped.
        </Reveal>
        <Reveal delay={80} className="flex flex-wrap gap-x-5 gap-y-2">
          {skills.legend.map((l) => (
            <div key={l.level} className="flex items-center gap-2">
              <span className="flex gap-1">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={`h-[2.5px] w-3.5 ${
                      n <= l.level ? "bg-accent" : "bg-[var(--color-rule)]"
                    }`}
                  />
                ))}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                {l.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {skills.groups.map((group, gi) => (
          <Reveal key={group.name} delay={gi * 70}>
            <h3 className="mb-2 flex items-baseline gap-2.5 border-b border-ink pb-1.5">
              <span className="font-mono text-[10px] text-accent">
                {String(gi + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg">{group.name}</span>
            </h3>
            <ul>
              {group.items.map((item) => (
                <SkillRow
                  key={item.name}
                  item={item}
                  projectsById={projectsById}
                  hovered={hovered}
                  onHover={setHovered}
                />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

/* --------------------------------- numbers -------------------------------- */

function Counter({ stat, index }) {
  const [ref, value] = useCountUp(stat.value, { decimals: stat.decimals });
  return (
    <Reveal delay={index * 90} className="border-t-2 border-ink pt-4">
      <div ref={ref} className="font-display text-[clamp(2.8rem,6vw,4.6rem)] leading-none">
        {value}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <p className="mt-3 text-[13.5px] leading-snug">{stat.label}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
        {stat.sub}
      </p>
    </Reveal>
  );
}

function Breakdown() {
  const { breakdown } = CONFIG.stats;
  const ref = useReveal({ threshold: 0.3 });
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, ref]);

  return (
    <div ref={ref} data-reveal>
      <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
        {breakdown.label}
      </h3>
      <ul className="space-y-4">
        {breakdown.items.map((item, i) => (
          <li key={item.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4">
              <span className="text-[13px]">{item.name}</span>
              <span className="font-mono text-[11px] text-ink-faint">{item.weight}%</span>
            </div>
            <div className="h-[6px] w-full bg-[var(--color-paper-deep)]">
              <div
                className="h-full bg-accent transition-[width] duration-1000 ease-out"
                style={{
                  width: shown ? `${item.weight}%` : "0%",
                  transitionDelay: `${i * 110}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Month grid whose intensity is the count of concurrent engagements. */
function Heatmap() {
  const { heatmap } = CONFIG.stats;
  const { from, to } = CONFIG.timelineRange;
  const [tip, setTip] = useState(null);

  const grid = useMemo(() => {
    const rows = [];
    for (let y = from; y <= to; y++) {
      const cells = [];
      for (let m = 1; m <= 12; m++) {
        const active = CONFIG.engagements.filter((e) => {
          const startVal = e.start[0] * 12 + e.start[1];
          const endVal = e.end ? e.end[0] * 12 + e.end[1] : Infinity;
          const cur = y * 12 + m;
          return cur >= startVal && cur <= endVal;
        });
        cells.push({ year: y, month: m, count: active.length, names: active.map((a) => a.name) });
      }
      rows.push({ year: y, cells });
    }
    return rows;
  }, [from, to]);

  const max = useMemo(
    () => Math.max(1, ...grid.flatMap((r) => r.cells.map((c) => c.count))),
    [grid]
  );

  return (
    <div>
      <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
        {heatmap.label}
      </h3>
      <p className="mb-5 max-w-[44ch] text-[12px] leading-relaxed text-ink-faint">
        {heatmap.note}
      </p>

      <div className="relative">
        <div className="mb-1.5 flex gap-[3px] pl-9">
          {MONTHS.map((m, i) => (
            <span
              key={i}
              className="w-[clamp(12px,2.1vw,22px)] text-center font-mono text-[8px] text-ink-faint"
            >
              {m}
            </span>
          ))}
        </div>

        {grid.map((row) => (
          <div key={row.year} className="mb-[3px] flex items-center gap-[3px]">
            <span className="w-9 shrink-0 font-mono text-[9px] text-ink-faint">{row.year}</span>
            {row.cells.map((cell) => {
              const ratio = cell.count / max;
              return (
                <span
                  key={`${cell.year}-${cell.month}`}
                  onMouseEnter={() => setTip(cell)}
                  onMouseLeave={() => setTip(null)}
                  className="h-[clamp(12px,2.1vw,22px)] w-[clamp(12px,2.1vw,22px)] cursor-crosshair transition-transform duration-200 hover:scale-110"
                  style={{
                    background:
                      cell.count === 0
                        ? "var(--color-paper-deep)"
                        : `rgba(var(--stroke-accent), ${0.18 + ratio * 0.72})`,
                    outline: tip === cell ? "1px solid var(--color-ink)" : "none",
                  }}
                />
              );
            })}
          </div>
        ))}

        <div className="mt-4 flex h-12 items-start">
          {tip ? (
            <div className="font-mono text-[10px] leading-relaxed">
              <span className="text-accent">
                {MONTH_NAMES[tip.month - 1]} {tip.year}
              </span>
              <span className="text-ink-faint">
                {" "}
                — {tip.count} active {tip.count === 1 ? "engagement" : "engagements"}
              </span>
              {tip.names.length > 0 && (
                <div className="mt-0.5 text-ink-soft">{tip.names.join(" · ")}</div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                Less
              </span>
              {[0, 0.3, 0.55, 0.8, 1].map((r) => (
                <span
                  key={r}
                  className="h-3 w-3"
                  style={{
                    background:
                      r === 0
                        ? "var(--color-paper-deep)"
                        : `rgba(var(--stroke-accent), ${0.18 + r * 0.72})`,
                  }}
                />
              ))}
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                More
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDuration(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

function formatMonth([y, m]) {
  return `${MONTH_NAMES[m - 1].slice(0, 3)} ${y}`;
}

function Timeline() {
  const { from, to } = CONFIG.timelineRange;
  const span = (to + 1 - from) * 12;
  const [active, setActive] = useState(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (reduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Months elapsed since Jan of `from`, through the end of the current month.
  const nowIdx = useMemo(() => {
    const d = new Date();
    return Math.min(span, Math.max(0, (d.getFullYear() - from) * 12 + d.getMonth() + 1));
  }, [from, span]);

  const rows = useMemo(
    () =>
      CONFIG.engagements.map((e) => {
        const startIdx = (e.start[0] - from) * 12 + (e.start[1] - 1);
        // Ongoing engagements stop at today, not at the end of the chart.
        const endIdx = e.end ? (e.end[0] - from) * 12 + e.end[1] : nowIdx;
        return {
          ...e,
          startIdx,
          endIdx,
          ongoing: !e.end,
          left: (startIdx / span) * 100,
          width: ((endIdx - startIdx) / span) * 100,
          months: endIdx - startIdx,
        };
      }),
    [from, span, nowIdx]
  );

  const peak = useMemo(() => {
    let best = 0;
    for (let i = 0; i < span; i++) {
      const n = rows.filter((r) => i >= r.startIdx && i < r.endIdx).length;
      if (n > best) best = n;
    }
    return best;
  }, [rows, span]);

  const years = [];
  for (let y = from; y <= to + 1; y++) years.push(y);

  const nowPct = (nowIdx / span) * 100;

  return (
    <Reveal className="mt-10 border-t border-[var(--color-rule)] pt-8 md:mt-16">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            Engagement timeline
          </h3>
          <p className="mt-1.5 max-w-[56ch] text-[13px] leading-relaxed text-ink-soft">
            Up to <span className="text-accent">{peak} engagements running at once</span> — client
            projects delivered alongside full-time work and a degree.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {[
            { c: "var(--color-accent)", l: "Ongoing" },
            { c: "var(--bar-past)", l: "Completed" },
          ].map((k) => (
            <span key={k.l} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5" style={{ background: k.c }} />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                {k.l}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div ref={wrapRef} className="flex gap-3 md:gap-5">
        {/* Row labels */}
        <div className="w-[104px] shrink-0 sm:w-[150px] md:w-[190px]">
          <div className="h-6" />
          {rows.map((r) => (
            <div
              key={r.name}
              onMouseEnter={() => setActive(r.name)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === r.name ? null : r.name)}
              className="flex h-12 cursor-pointer flex-col justify-center pr-2"
            >
              <span
                className={`truncate text-[12.5px] leading-tight transition-colors duration-200 ${
                  active === r.name ? "text-accent" : ""
                }`}
              >
                {r.name}
              </span>
              <span className="hidden truncate font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint sm:block">
                {r.kind}
              </span>
            </div>
          ))}
        </div>

        {/* Track */}
        <div className="relative min-w-0 flex-1">
          {/* Year gridlines */}
          <div className="pointer-events-none absolute inset-0">
            {years.map((y, i) => (
              <div
                key={y}
                className="absolute top-0 bottom-0 border-l border-[var(--color-rule)]"
                style={{ left: `${(i / (years.length - 1)) * 100}%` }}
              />
            ))}
            <div
              className="absolute top-6 bottom-0 border-l border-dashed border-accent/50"
              style={{ left: `${nowPct}%` }}
            />
          </div>

          {/* Year scale */}
          <div className="relative h-6">
            {years.slice(0, -1).map((y, i) => (
              <span
                key={y}
                className="absolute top-0 pl-1.5 font-mono text-[9.5px] text-ink-faint"
                style={{ left: `${(i / (years.length - 1)) * 100}%` }}
              >
                {y}
              </span>
            ))}
            <span
              className="absolute top-0 hidden -translate-x-1/2 bg-[var(--color-paper-deep)] px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent md:inline"
              style={{ left: `${nowPct}%` }}
            >
              now
            </span>
          </div>

          {/* Bars */}
          {rows.map((r, i) => {
            const isActive = active === r.name;
            const dim = active && !isActive;
            return (
              <div
                key={r.name}
                onMouseEnter={() => setActive(r.name)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === r.name ? null : r.name)}
                className="relative flex h-12 cursor-pointer items-center"
              >
                <div
                  className="absolute h-[10px] transition-all duration-[900ms] ease-out"
                  style={{
                    left: `${r.left}%`,
                    width: shown ? `${r.width}%` : "0%",
                    transitionDelay: `${i * 90}ms`,
                    opacity: dim ? 0.28 : 1,
                    background: r.ongoing ? "var(--color-accent)" : "var(--bar-past)",
                    transform: isActive ? "scaleY(1.5)" : "scaleY(1)",
                  }}
                />
                {/* Duration label sits after the bar, or before it when the
                    bar runs close to the right edge. */}
                <span
                  className="absolute hidden font-mono text-[9.5px] whitespace-nowrap text-ink-faint transition-opacity duration-700 md:block"
                  style={
                    r.left + r.width > 78
                      ? {
                          right: `calc(${100 - r.left}% + 8px)`,
                          opacity: shown ? (dim ? 0.3 : 1) : 0,
                          transitionDelay: `${i * 90 + 500}ms`,
                        }
                      : {
                          left: `calc(${r.left + r.width}% + 8px)`,
                          opacity: shown ? (dim ? 0.3 : 1) : 0,
                          transitionDelay: `${i * 90 + 500}ms`,
                        }
                  }
                >
                  {formatDuration(r.months)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail strip — fixed height so hovering never shifts layout */}
      <div className="mt-5 flex h-14 items-start border-t border-[var(--color-rule)] pt-3">
        {active ? (
          (() => {
            const r = rows.find((x) => x.name === active);
            return (
              <div className="text-[12.5px] leading-relaxed">
                <span className="text-accent">{r.role}</span>
                <span className="text-ink-faint">
                  {" "}
                  — {formatMonth(r.start)} to {r.end ? formatMonth(r.end) : "present"} ·{" "}
                  {formatDuration(r.months)}
                </span>
                <div className="mt-0.5 text-ink-soft">{r.focus}</div>
              </div>
            );
          })()
        ) : (
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
            Hover or tap a row for role, dates and focus
          </p>
        )}
      </div>
    </Reveal>
  );
}

function Numbers() {
  return (
    <section
      id="numbers"
      data-bp="numbers"
      className="panel-free relative border-y border-[var(--color-rule)] bg-[var(--color-paper-deep)]/40"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <SectionLabel index="04">{CONFIG.stats.label}</SectionLabel>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CONFIG.stats.counters.map((stat, i) => (
            <Counter key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-20">
          <Breakdown />
          <Reveal delay={100}>
            <Heatmap />
          </Reveal>
        </div>

        <Timeline />
      </div>
    </section>
  );
}

/* --------------------------------- contact -------------------------------- */

function Contact() {
  const { contact, identity } = CONFIG;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  return (
    <section id="contact" data-bp="contact" className="panel-page relative flex min-h-[100svh] flex-col">
      <div className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-24 md:flex md:flex-col md:justify-center md:px-12 md:py-28">
        <SectionLabel index="05">{contact.label}</SectionLabel>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[0.95] tracking-[-0.02em]">
              {contact.heading[0]}
              <br />
              <span className="italic text-accent">{contact.heading[1]}</span>
            </h2>
            <p className="mt-7 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft">
              {contact.blurb}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${identity.email}`}
                className="group relative overflow-hidden border border-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em]"
              >
                <span className="relative z-10 transition-colors duration-400 group-hover:text-paper">
                  {contact.cta}
                </span>
                <span className="absolute inset-0 -translate-y-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
              <button
                onClick={copyEmail}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft underline decoration-[var(--color-rule)] underline-offset-4 transition-colors hover:text-accent"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-5">
            <dl className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {[
                { k: "Email", icon: "mail", v: identity.email, href: `mailto:${identity.email}` },
                {
                  k: "Phone",
                  icon: "phone",
                  v: identity.phone,
                  href: `tel:${identity.phone.replace(/\s/g, "")}`,
                },
                { k: "LinkedIn", icon: "linkedin", v: identity.linkedinLabel, href: identity.linkedin },
                { k: "GitHub", icon: "github", v: identity.githubLabel, href: identity.github },
                { k: "Location", icon: "pin", v: identity.location, href: null },
              ].map((row) => {
                const external = row.href?.startsWith("http");
                const Row = (
                  <>
                    <dt className="flex items-center gap-2.5 text-ink-faint transition-colors duration-300 group-hover:text-accent">
                      <Icon name={row.icon} className="h-[15px] w-[15px]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{row.k}</span>
                    </dt>
                    <dd className="flex items-center gap-2 text-right text-sm transition-colors duration-300 group-hover:text-accent">
                      {row.v}
                      {external && (
                        <Icon
                          name="arrow"
                          className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      )}
                    </dd>
                  </>
                );
                return row.href ? (
                  <a
                    key={row.k}
                    href={row.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-6 py-3.5"
                  >
                    {Row}
                  </a>
                ) : (
                  <div key={row.k} className="group flex items-center justify-between gap-6 py-3.5">
                    {Row}
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t border-[var(--color-rule)] px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            © {new Date().getFullYear()} {CONFIG.identity.fullName}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            Built in Mauritius · Working worldwide
          </span>
        </div>
      </footer>
    </section>
  );
}

/* ---------------------------------- root ---------------------------------- */

export default function Portfolio() {
  const reduced = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const active = useActiveSection(RAIL_IDS);
  const [blueprintOn, setBlueprintOn] = useBlueprintMode(CONFIG.easterEgg.sequence);
  const curtain = useImmersiveScroll(reduced);

  return (
    <div className="relative min-h-screen">
      <PageCurtain direction={curtain} />
      <Nav
        progress={progress}
        active={active}
        blueprintOn={blueprintOn}
        onToggleBlueprint={() => setBlueprintOn((v) => !v)}
      />
      <SectionRail active={active} />
      <main>
        <Hero reduced={reduced} blueprint={blueprintOn} />
        <About />
        <Work />
        <Capability />
        <Numbers />
        <Contact />
      </main>
    </div>
  );
}
