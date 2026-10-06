import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* ═══════════════════════════════════════════════════════════════════════
   CONFIG: This is the only object you need to edit.
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
    availableNote: "Available for the right brief",
    focus: ["Skip the backlog.", "Ship the system."],
  },

  hero: {
    eyebrow: "Ops → product → production",
    // Each string is its own masked reveal line.
    headline: ["I build the systems", "businesses actually", "run on."],
    emphasis: 2,
    intro:
      "My craft pays me. The same craft pays clients back in time and revenue. I map the operation first, ignore the backlog theatre, and design software that runs the business. End to end, into production.",
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
    lead:
      "Businesses do not need another ticket-taker. They need someone who sees the whole operation and ships the system that holds it together.",
    body: [
      "Corporate theatre does not interest me. The win is practical: hours returned to the team, fewer mistakes, customers served faster, revenue unblocked. I care whether the person at the counter can finish the job, and I start from the real workflow, not a feature wishlist.",
      "Tools are flexible. Outcomes are not. I pick the stack that gets the business to a cleaner day faster, and I still own the result: architecture, debugging, deployment and what happens after launch.",
    ],
    pullQuote:
      "If it does not save time or help someone earn, it is decoration.",
    facts: [
      { k: "Based", v: "Vacoas, Mauritius" },
      { k: "Working with", v: "Mauritius · Réunion · France · UK · NZ · Australia · Remote" },
      { k: "Education", v: "BSc (Hons) Software Engineering, UTM" },
      { k: "Languages", v: "English · French · Creole" },
    ],
  },

  education: {
    label: "Education",
    note: "Degree, programmes and earlier training.",
    entries: [
      {
        org: "Huawei",
        items: [{ title: "Seeds For The Future Program", period: "2023 - 2024" }],
      },
      {
        org: "University of Technology, Mauritius",
        items: [{ title: "BSc (Hons) Software Engineering", period: "Sep 2021 - 2025" }],
      },
      {
        org: "Sir Abdool Raman Osman State College, Phoenix",
        items: [
          { title: "Higher School Certificate", period: "Jan 2019 - Jun 2021" },
          { title: "School Certificate", period: "Jan 2017 - Nov 2018" },
        ],
      },
      {
        org: "Wisdom In Tech",
        items: [
          { title: "Multimedia Technologies", period: "May 2018 - Apr 2019" },
          { title: "Graphic Technologies", period: "Sep 2017 - Jun 2018" },
          { title: "Office Applications, Advanced", period: "Jan 2017 - Aug 2017" },
          { title: "Office Applications, Intermediate", period: "May 2016 - Dec 2016" },
          { title: "ICT Principle", period: "Sep 2015 - Apr 2016" },
        ],
      },
    ],
  },

  /* Case studies for systems with a public URL / deep dive. */
  workIntro:
    "Live products. Open a row to see what was slow, what I built, and how it pays back in time and money.",

  projects: [
    {
      id: "keycars",
      title: "KeyCars",
      subtitle: "Multi-tenant car rental platform",
      client: "Agence ISCL (Linar)",
      period: "Jun 2025 - Present",
      role: "Sole full-stack developer",
      featured: true,
      url: "https://keycars.fr/",
      urlLabel: "keycars.fr",
      problem:
        "Rental desks were burning hours on paper and Excel: quotes, contracts, vehicle checks and parking, each branch inventing its own ritual.",
      approach:
        "A multi-tenant product where each company owns fleets, agencies, limits and roles. Pricing picks the right daily rate from plans, duration tiers, packages and seasons. Camera OCR feeds customer records. Quotes, contracts and invoices write themselves. Agents mark damage on diagrams with photos and dual signatures.",
      result:
        "Staff finish a rental in one path instead of chasing paperwork. Less desk time per booking, fewer errors, faster turnaround from quote to keys.",
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
      period: "Oct 2025 - Present",
      role: "Project manager & co-developer",
      featured: true,
      url: "https://zilmall.mu/",
      urlLabel: "zilmall.mu",
      problem:
        "Sellers needed a way to trade online the way Mauritius actually trades: shops and solo sellers, wholesale, local payouts and VAT, without fighting a foreign template.",
      approach:
        "One Laravel and React codebase, three surfaces: storefront, seller portal and admin. Dual onboarding, documents, payouts and VAT behind approval queues. I own scope and what ships when.",
      result:
        "Sellers list, price and sell in one place, including wholesale. Admins clear approvals and catalogue work without leaving the product. More sales capacity with less admin drag.",
      stack: ["Laravel 12", "React 19", "Inertia", "TypeScript", "MySQL"],
      highlights: [
        { k: "Applications", v: "Storefront · Seller · Admin" },
        { k: "Seller types", v: "Business & individual" },
        { k: "Also", v: "PM · pair development" },
      ],
    },
    {
      id: "mrprod",
      title: "MR Production",
      subtitle: "Studio booking platform",
      client: "MR Production Co Ltd",
      period: "Feb 2026 - Present",
      role: "Sole full-stack developer",
      featured: true,
      url: "https://mineshramchurn.com/",
      urlLabel: "mineshramchurn.com",
      problem:
        "The studio booked over chat, double-booked risk was constant, and every site tweak meant paying a developer again.",
      approach:
        "Public site plus booking on a live Mauritius-timezone calendar: blocked dates, multi-day and multi-location work, budget options. Filament admin for bookings, crew, availability, portfolio and content.",
      result:
        "Clients book without a message thread. The studio runs its own calendar and pages. Fewer missed slots, less admin, more billable shoots.",
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
      period: "Jun 2025 - Present",
      role: "Sole full-stack developer",
      featured: true,
      url: "https://tracking-dashboard.fr/",
      urlLabel: "tracking-dashboard.fr",
      problem:
        "The agency was burning billable hours pasting revenue, Analytics and social numbers into decks that were stale on arrival.",
      approach:
        "White-label multi-tenant dashboards on React and Supabase: per-client routes, editable layouts, branding. n8n feeds data on a schedule so periods compare without rebuilding slides.",
      result:
        "Reporting stopped being a monthly scramble. The team reclaims hours and clients see numbers while they still matter.",
      stack: ["React", "TypeScript", "Supabase", "n8n", "Tailwind", "WordPress"],
      highlights: [
        { k: "Tenancy", v: "Per-client slugs" },
        { k: "Data", v: "Scheduled ingestion" },
        { k: "Phase", v: "Built part-time, Jun-Oct 2025" },
      ],
    },
    {
      id: "syul",
      title: "Safyr Utilis",
      subtitle: "Corporate website",
      client: "Safyr Utilis",
      period: "Feb 2025 - Nov 2025",
      role: "Sole developer",
      featured: true,
      url: "https://syul.mu/",
      urlLabel: "syul.mu",
      problem:
        "They needed a credible public face on mobile, without paying for a developer every time the copy changed.",
      approach:
        "Design, build and deploy end to end: light pages, responsive layout, editable structure after handover.",
      result:
        "Live at syul.mu. The company updates itself. No ticket queue for small edits.",
      stack: ["HTML/CSS", "JavaScript", "Responsive design"],
      highlights: [
        { k: "Delivery", v: "Sole developer" },
        { k: "Status", v: "In production" },
      ],
    },
  ],

  /* LinkedIn-style experience: company → each position (title, type, dates) → what I did. */
  experience: {
    label: "Experience",
    note: "Where I have delivered work. Inside-employer client systems stay unnamed.",
    companies: [
      {
        id: "iscl",
        org: "Agence ISCL (Linar)",
        location: "Réunion · Remote",
        roles: [
          {
            title: "Full Stack Developer",
            type: "Freelance",
            period: "Sep 2026 - Present",
            bullets: [
              "Retained for upcoming projects (on call)",
            ],
          },
          {
            title: "Full Stack Developer",
            type: "Full-time",
            period: "Oct 2025 - Sep 2026",
            bullets: [
              "Built KeyCars (keycars.fr): multi-tenant car rental SaaS in Laravel, React and TypeScript. Pricing, OCR, contracts/invoices, vehicle inspections, parking editor",
              "QA on rentflo.fr, a related rental product",
            ],
          },
          {
            title: "Full Stack Developer",
            type: "Part-time",
            period: "Jun 2025 - Oct 2025",
            bullets: [
              "Built tracking-dashboard.fr (React, Supabase, n8n) and WordPress plugins for the agency",
            ],
          },
        ],
      },
      {
        id: "zilmall-co",
        org: "ZilMall",
        location: "Mauritius · Hybrid",
        roles: [
          {
            title: "Full Stack Developer & Project Manager",
            type: "Freelance",
            period: "Oct 2025 - Present",
            bullets: [
              "Building a Mauritius multi-vendor marketplace (Laravel, React, Inertia): storefront, seller portal, admin and commerce flows",
              "Managing scope and release priorities with stakeholders",
            ],
          },
        ],
      },
      {
        id: "mrprod-co",
        org: "MR Production Co Ltd",
        location: "Remote",
        roles: [
          {
            title: "Full Stack Developer",
            type: "Freelance",
            period: "Feb 2026 - Present",
            bullets: [
              "Studio website and booking platform (Laravel, Filament, React) live on OVH",
            ],
          },
        ],
      },
      {
        id: "agileum",
        org: "Agileum",
        location: "Mauritius",
        roles: [
          {
            title: "Full Stack Web Developer",
            type: "Freelance",
            period: "Oct 2025 - Apr 2026",
            bullets: [
              "Continued client delivery after the full-time role: features, integrations and fixes",
            ],
          },
          {
            title: "Associate Software Engineer",
            type: "Full-time",
            period: "Jan 2025 - Oct 2025",
            bullets: [
              "Built and maintained apps across Laravel, PHP, Node.js, Angular, Python and Drupal",
              "AI chatbot, document automation, proposals, deployments (Docker, Nginx, Jenkins), .NET Core migration support",
            ],
          },
        ],
      },
      {
        id: "safyr",
        org: "Safyr Utilis",
        location: "Mauritius · Remote",
        roles: [
          {
            title: "Web Developer",
            type: "Freelance",
            period: "Feb 2025 - Nov 2025",
            bullets: [
              "Designed, built and deployed the company site (syul.mu) as sole developer",
            ],
          },
        ],
      },
      {
        id: "pc-break",
        org: "Career break: PC building",
        location: "Mauritius",
        roles: [
          {
            title: "Custom PC builds",
            type: "Personal",
            period: "Oct 2024 - Dec 2024",
            bullets: [
              "Built and sold custom gaming PCs on Facebook Marketplace",
            ],
          },
        ],
        /* Gallery rendered under this company when `builds` is set. */
        buildsKey: "careerBreak",
      },
      {
        id: "bfl",
        org: "Business Force Limited",
        location: "Curepipe, Mauritius · Hybrid",
        roles: [
          {
            title: "Information System Engineer",
            type: "Full-time",
            period: "Feb 2023 - Sep 2024",
            bullets: [
              "Salesforce delivery (Apex, SOQL, Flows, Omnistudio), PL/SQL investigation, production support across time zones",
              "Laravel/API work and mentoring two interns",
            ],
          },
        ],
      },
    ],
  },

  /* Career break builds: referenced from experience via buildsKey. */
  careerBreak: {
    builds: [
      {
        name: "Build 01",
        title: "Gaming PC Bundle · RTX 3060",
        spec: "MSI Z590 · 16GB DDR4 · RTX 3060 12GB · 512GB",
        image: "./builds/build-01.jpg",
        url: "https://www.facebook.com/marketplace/item/1184770826446411",
      },
      {
        name: "Build 02",
        title: "Full setup · Ryzen 5 1500X",
        spec: "Ryzen 5 1500X · GTX 1650 OC · peripherals",
        image: "./builds/build-02.jpg",
        url: "https://www.facebook.com/marketplace/item/1864597417679724/",
      },
      {
        name: "Build 03",
        title: "Full setup · Ryzen 7 2700",
        spec: "Ryzen 7 2700 · GTX 1060 6GB · RGB case",
        image: "./builds/build-03.jpg",
        url: "https://www.facebook.com/marketplace/item/591497393373766/",
      },
      {
        name: "Build 04",
        title: "Full setup · i7-12700",
        spec: "i7-12700 · GTX 1080 Ti · dual-monitor desk",
        image: "./builds/build-04.jpg",
        url: "https://www.facebook.com/marketplace/item/472324075339632/",
      },
    ],
  },

  /* Capability index. `level`: 3 = daily, 2 = builds with, 1 = prior/enterprise.
     Capability index: honest tiers against current delivery. */
  skills: {
    label: "Capability index",
    note: "Hover a skill, a live system or a workplace. The wires show where that capability earned its keep. Click a live system to open its case study, or a workplace to jump to Experience. Three is weekly use. One is prior experience.",
    workplaces: [
      { id: "iscl", name: "Agence ISCL", kind: "Agency · Réunion" },
      { id: "agileum", name: "Agileum", kind: "Employer · Mauritius" },
      { id: "bfl", name: "Business Force", kind: "Enterprise" },
    ],
    groups: [
      {
        name: "Backend",
        items: [
          { name: "PHP", level: 3, used: ["keycars", "zilmall", "mrprod"], orgs: ["iscl", "zilmall-co", "mrprod-co", "agileum"] },
          { name: "Laravel", level: 3, used: ["keycars", "zilmall", "mrprod"], orgs: ["iscl", "zilmall-co", "mrprod-co", "agileum", "bfl"] },
          { name: "MySQL / SQL", level: 3, used: ["keycars", "zilmall", "mrprod"], orgs: ["iscl", "zilmall-co", "mrprod-co", "agileum"] },
          { name: "REST / Web APIs", level: 3, used: ["keycars", "zilmall", "analytics"], orgs: ["iscl", "zilmall-co", "agileum", "bfl"] },
          { name: "Node.js", level: 2, used: [], orgs: ["agileum"] },
          { name: "Python", level: 2, used: [], orgs: ["agileum"] },
          { name: "PostgreSQL / Supabase", level: 2, used: ["analytics"], orgs: ["iscl"] },
          { name: "Oracle / PL/SQL", level: 1, used: [], orgs: ["bfl"] },
          { name: "MongoDB", level: 1, used: [], orgs: ["agileum"] },
          { name: ".NET / C# / ASP.NET", level: 1, used: [], orgs: ["agileum"] },
        ],
      },
      {
        name: "Frontend",
        items: [
          { name: "React / React.js", level: 3, used: ["keycars", "zilmall", "mrprod", "analytics"], orgs: ["iscl", "zilmall-co", "mrprod-co"] },
          { name: "JavaScript / TypeScript", level: 3, used: ["keycars", "zilmall", "analytics"], orgs: ["iscl", "zilmall-co", "agileum"] },
          { name: "Inertia.js", level: 3, used: ["zilmall", "mrprod"], orgs: ["zilmall-co", "mrprod-co"] },
          { name: "Tailwind CSS", level: 3, used: ["mrprod", "analytics"], orgs: ["mrprod-co", "iscl"] },
          { name: "Filament", level: 3, used: ["mrprod"], orgs: ["mrprod-co"] },
          { name: "HTML / CSS / Web design", level: 3, used: ["syul"], orgs: ["safyr"] },
          { name: "WordPress", level: 2, used: ["analytics"], orgs: ["iscl"] },
          { name: "MUI", level: 2, used: ["keycars"], orgs: ["iscl"] },
          { name: "Angular / AngularJS", level: 1, used: [], orgs: ["agileum"] },
          { name: "Drupal", level: 1, used: [], orgs: ["agileum"] },
        ],
      },
      {
        name: "Systems & domains",
        items: [
          { name: "Multi-tenant architecture", level: 3, used: ["keycars", "analytics"], orgs: ["iscl"] },
          { name: "Role-based access control", level: 3, used: ["keycars", "zilmall"], orgs: ["iscl", "zilmall-co"] },
          { name: "Pricing engines", level: 3, used: ["keycars"], orgs: ["iscl"] },
          { name: "Booking & scheduling", level: 3, used: ["mrprod", "keycars"], orgs: ["mrprod-co", "iscl"] },
          { name: "Marketplace commerce", level: 3, used: ["zilmall"], orgs: ["zilmall-co"] },
          { name: "Document / PDF automation", level: 3, used: ["keycars"], orgs: ["iscl", "agileum"] },
          { name: "OCR pipelines", level: 2, used: ["keycars"], orgs: ["iscl"] },
          { name: "AI chatbots & automation", level: 2, used: ["analytics"], orgs: ["iscl", "agileum"] },
          { name: "Salesforce (Apex, SOQL, Flows)", level: 1, used: [], orgs: ["bfl"] },
          { name: "Software testing / QA", level: 2, used: ["keycars"], orgs: ["iscl"] },
        ],
      },
      {
        name: "Delivery & tooling",
        items: [
          { name: "Git / GitLab", level: 3, used: [], orgs: ["iscl", "agileum", "bfl"] },
          { name: "AI-assisted dev (Cursor)", level: 3, used: ["keycars", "zilmall", "mrprod"], orgs: ["iscl", "zilmall-co", "mrprod-co"] },
          { name: "OVH / Linux deployment", level: 3, used: ["mrprod", "keycars"], orgs: ["mrprod-co", "iscl"] },
          { name: "Docker", level: 2, used: [], orgs: ["agileum"] },
          { name: "Nginx", level: 2, used: ["mrprod"], orgs: ["mrprod-co", "agileum"] },
          { name: "Jenkins / CI", level: 2, used: [], orgs: ["agileum"] },
          { name: "n8n automation", level: 2, used: ["analytics"], orgs: ["iscl"] },
          { name: "Jira", level: 2, used: [], orgs: ["agileum", "bfl"] },
          { name: "Insomnia / SoapUI", level: 2, used: [], orgs: ["agileum", "bfl"] },
          { name: "Flutter / Android (prior)", level: 1, used: [], orgs: [] },
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
      { value: 3.5, suffix: "+", decimals: 1, label: "Years turning skill into products", sub: "Since Feb 2023" },
      { value: 5, suffix: "", decimals: 0, label: "Live systems you can visit", sub: "Linked in Selected work" },
      { value: 6, suffix: "", decimals: 0, label: "Organisations shipped for", sub: "Agency, product and enterprise" },
      { value: 6, suffix: "", decimals: 0, label: "Markets served", sub: "Mauritius · Réunion · France · UK · NZ · Australia" },
    ],
    // Relative weight of where delivery time goes. Keep total near 100.
    breakdown: {
      label: "Where the work goes",
      items: [
        { name: "Backend: Laravel / PHP", weight: 34 },
        { name: "Frontend: React / TypeScript", weight: 28 },
        { name: "Data modelling & SQL", weight: 14 },
        { name: "Integrations, OCR & automation", weight: 12 },
        { name: "Deployment & production support", weight: 12 },
      ],
    },
    heatmap: {
      label: "Engagement density",
      note: "How many client engagements ran in parallel each month, from the timeline below.",
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
      end: [2025, 10],
      kind: "Full-time",
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
      end: [2025, 10],
      kind: "Part-time",
      role: "Full-stack developer",
      focus: "WordPress · analytics · n8n",
    },
    {
      name: "Agence ISCL",
      start: [2025, 10],
      end: [2026, 9],
      kind: "Full-time",
      role: "Full-stack developer",
      focus: "KeyCars SaaS · analytics",
    },
    {
      name: "Agileum",
      start: [2025, 10],
      end: [2026, 4],
      kind: "Freelance",
      role: "Full stack web developer",
      focus: "Continued client delivery",
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
    {
      name: "Agence ISCL",
      start: [2026, 9],
      end: null,
      kind: "Freelance",
      role: "Full-stack developer",
      focus: "Retained, upcoming projects on call",
    },
  ],
  timelineRange: { from: 2023, to: 2026 },

  contact: {
    label: "Contact",
    heading: ["Want time back", "and faster revenue?"],
    blurb:
      "Tell me what is slow, expensive or stuck in your operation. I will come back with a scope, a timeline and a price.",
    cta: "Talk about a project",
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
    const compute = () => {
      const saveData = !!navigator.connection?.saveData;
      const cores = navigator.hardwareConcurrency || 8;
      const mem = navigator.deviceMemory || 8;
      // Older / constrained machines: fewer cores or low RAM.
      const lowEnd = saveData || cores <= 2 || mem <= 4;
      setReduced(mq.matches || lowEnd);
    };
    compute();
    mq.addEventListener("change", compute);
    return () => mq.removeEventListener("change", compute);
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
      { threshold: options.threshold ?? 0.08, rootMargin: options.rootMargin ?? "0px 0px -4% 0px" }
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
 *  `free` sections: normal scroll; crossing top/bottom boundary advances.
 *  `align: "center"` lands the viewport on the middle of a tall page. */
const SCROLL_PLAN = [
  { id: "top", mode: "page", label: "Intro" },
  { id: "about", mode: "page", label: "About" },
  { id: "work", mode: "free", label: "Work" },
  { id: "capability", mode: "page", label: "Capability" },
  { id: "numbers", mode: "free", label: "Numbers" },
  { id: "contact", mode: "page", label: "Contact" },
];

function sectionScrollY(el, plan, { pin, dir } = {}) {
  const absTop = el.getBoundingClientRect().top + window.scrollY;
  if (plan?.align === "center") {
    return Math.max(0, absTop + el.offsetHeight / 2 - window.innerHeight / 2);
  }
  if (pin !== "start" && dir === "up" && plan?.mode === "free") {
    return Math.max(0, absTop + el.offsetHeight - window.innerHeight);
  }
  return Math.max(0, absTop);
}

function useImmersiveScroll(reduced) {
  const [curtain, setCurtain] = useState(null); // { direction, label, index }
  const locked = useRef(false);
  const touchY = useRef(0);
  const goToRef = useRef(null);

  const currentIndex = useCallback(() => {
    const mid = window.scrollY + window.innerHeight * 0.35;
    let idx = 0;
    SCROLL_PLAN.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= mid) idx = i;
    });
    return idx;
  }, []);

  const goTo = useCallback(
    async (targetId, direction, { pin } = {}) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      if (locked.current) return;

      const from = currentIndex();
      const to = SCROLL_PLAN.findIndex((s) => s.id === targetId);
      const plan = to >= 0 ? SCROLL_PLAN[to] : null;
      if (to < 0 || to === from) {
        window.scrollTo({
          top: sectionScrollY(el, plan, { pin, dir: direction }),
          behavior: reduced ? "smooth" : "instant",
        });
        return;
      }
      const dir = direction || (to > from ? "down" : "up");
      const label = plan?.label ?? targetId;
      const index = String(to).padStart(2, "0");

      if (reduced) {
        window.scrollTo({
          top: sectionScrollY(el, plan, { pin, dir }),
          behavior: "smooth",
        });
        return;
      }

      locked.current = true;
      setCurtain({ direction: dir, label, index });
      // Faster cover (~38% of 480ms)
      await new Promise((r) => setTimeout(r, 185));
      window.scrollTo({
        top: sectionScrollY(el, plan, { pin, dir }),
        behavior: "instant",
      });
      await new Promise((r) => setTimeout(r, 310));
      setCurtain(null);
      await new Promise((r) => setTimeout(r, 40));
      locked.current = false;
    },
    [currentIndex, reduced]
  );

  goToRef.current = goTo;

  /** Same band curtain as section hops: call `atCovered` while the screen is fully covered. */
  const runCurtain = useCallback(
    async ({ direction = "down", label, index, atCovered }) => {
      if (reduced) {
        await atCovered?.();
        return;
      }
      if (locked.current) return;
      locked.current = true;
      setCurtain({ direction, label, index });
      await new Promise((r) => setTimeout(r, 185));
      await atCovered?.();
      await new Promise((r) => setTimeout(r, 310));
      setCurtain(null);
      await new Promise((r) => setTimeout(r, 40));
      locked.current = false;
    },
    [reduced]
  );

  const navigateTo = useCallback((targetId) => {
    if (document.body.dataset.modalOpen === "1") return;
    goToRef.current?.(targetId, undefined, { pin: "start" });
  }, []);

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const atSectionEdge = (el, dir) => {
      const top = el.getBoundingClientRect().top;
      const bottom = el.getBoundingClientRect().bottom;
      if (dir === "down") return bottom <= window.innerHeight + 4;
      return top >= -4;
    };

    /** Curtain only at page hops. Adjacent `free` sections still scroll as one
     *  chapter; Capability is a centered page again. */
    const shouldCurtain = (i, dir) => {
      const next = dir === "down" ? i + 1 : i - 1;
      if (next < 0 || next >= SCROLL_PLAN.length) return false;
      const here = SCROLL_PLAN[i];
      const there = SCROLL_PLAN[next];
      if (here.mode === "page") return true;
      return there.mode === "page";
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
      if (document.body.dataset.modalOpen === "1") {
        const preview = e.target.closest?.(".project-modal-preview");
        if (preview) {
          const canDown = preview.scrollTop + preview.clientHeight < preview.scrollHeight - 2;
          const canUp = preview.scrollTop > 2;
          if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) return;
        }
        e.preventDefault();
        return;
      }

      const i = currentIndex();
      const section = SCROLL_PLAN[i];
      const el = document.getElementById(section.id);
      if (!el) return;

      const dir = e.deltaY > 0 ? "down" : "up";
      if (Math.abs(e.deltaY) < 8) return;

      if (section.mode === "page") {
        if (!shouldCurtain(i, dir)) return;
        e.preventDefault();
        advance(dir);
        return;
      }

      if (atSectionEdge(el, dir) && shouldCurtain(i, dir)) {
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
        if (!shouldCurtain(i, "down")) return;
        if (section.mode === "page" || (el && atSectionEdge(el, "down"))) {
          e.preventDefault();
          advance("down");
        }
      }
      if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        const i = currentIndex();
        const section = SCROLL_PLAN[i];
        const el = document.getElementById(section.id);
        if (!shouldCurtain(i, "up")) return;
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
      if (!shouldCurtain(i, dir)) return;
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
  }, [goTo, currentIndex, reduced]);

  return { curtain, navigateTo, runCurtain };
}

function PageCurtain({ curtain }) {
  if (!curtain) return null;
  const { direction, label, index } = curtain;
  return (
    <div className="page-curtain" aria-hidden="true" data-dir={direction}>
      <div className="page-curtain-shade" />
      <div className="page-curtain-bands">
        <span className="band band-1" />
        <span className="band band-2" />
        <span className="band band-3" />
        <span className="band band-4" />
        <span className="band band-5" />
      </div>
      <div className="page-curtain-grid" />
      <div className="page-curtain-slash" />
      <div className="page-curtain-meta">
        <span className="page-curtain-index">{index}</span>
        <span className="page-curtain-rule" />
        <span className="page-curtain-label">{label}</span>
      </div>
    </div>
  );
}

/** Type CONFIG.easterEgg.sequence anywhere to toggle blueprint mode.
 *  Defaults to blueprint on: the site's intended first impression. */
function useBlueprintMode(sequence) {
  const [on, setOn] = useState(true);
  const buffer = useRef("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape") {
        if (document.body.dataset.modalOpen === "1") return;
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
      className="mb-7 flex items-baseline gap-4 border-b border-[var(--color-rule)] pb-3 md:mb-8"
    >
      <span className="font-mono text-[12px] font-medium tracking-[0.22em] text-accent md:text-[13px]">
        {index}
      </span>
      <span className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-ink md:text-[13px]">
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
      const dpr = Math.min(window.devicePixelRatio || 1, reduced ? 1 : 1.5);
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

const HERO_MODULES = [
  { label: "Laravel", orbit: 0, phase: 0.04 },
  { label: "React", orbit: 0, phase: 0.37 },
  { label: "SQL", orbit: 0, phase: 0.71 },
  { label: "OCR", orbit: 1, phase: 0.12 },
  { label: "Pricing", orbit: 1, phase: 0.45 },
  { label: "Deploy", orbit: 1, phase: 0.79 },
];

const HERO_ORBITS = [
  { r: 300, tilt: 0.4, yaw: 0.18, speed: 0.08 },
  { r: 445, tilt: 0.2, yaw: -0.31, speed: -0.05 },
];

/**
 * Immersive hero field: receding lattice, gyroscopic core, orbiting
 * modules and packet traffic. Biased to the right so the headline stays clear.
 * Nav (top) and marquee (bottom) are kept empty.
 */
function HeroCore({ reduced, blueprint, hostRef, titleRef, ruleRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    let running = true;
    let visible = true;
    const t0 = performance.now();
    const pointer = { x: 0.72, y: 0.36, tx: 0.72, ty: 0.36, on: false };
    const spin = {
      R: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      prevV: null,
      grabbing: false,
      near: false,
    };

    const matId = () => [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const matMul = (a, b) => {
      const r = new Array(9);
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          r[i * 3 + j] =
            a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
        }
      }
      return r;
    };
    const matApply = (m, x, y, z) => ({
      x: m[0] * x + m[1] * y + m[2] * z,
      y: m[3] * x + m[4] * y + m[5] * z,
      z: m[6] * x + m[7] * y + m[8] * z,
    });
    const matAxisAngle = (ax, ay, az, ang) => {
      const len = Math.hypot(ax, ay, az) || 1;
      const x = ax / len;
      const y = ay / len;
      const z = az / len;
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      const t = 1 - c;
      return [
        t * x * x + c,
        t * x * y - s * z,
        t * x * z + s * y,
        t * x * y + s * z,
        t * y * y + c,
        t * y * z - s * x,
        t * x * z - s * y,
        t * y * z + s * x,
        t * z * z + c,
      ];
    };
    const sphereVec = (lx, ly, radius) => {
      let x = (lx - layout.cx) / radius;
      let y = (layout.cy - ly) / radius;
      const d2 = x * x + y * y;
      if (d2 > 1) {
        const n = Math.sqrt(d2);
        x /= n;
        y /= n;
        return [x, y, 0];
      }
      return [x, y, Math.sqrt(1 - d2)];
    };
    const rotFromTo = (a, b) => {
      const cx = a[1] * b[2] - a[2] * b[1];
      const cy = a[2] * b[0] - a[0] * b[2];
      const cz = a[0] * b[1] - a[1] * b[0];
      const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      const ang = Math.atan2(Math.hypot(cx, cy, cz), dot);
      if (ang < 1e-5) return matId();
      return matAxisAngle(cx, cy, cz, ang);
    };
    const layout = { cx: 0, cy: 0, ruleY: 0, titleRight: 0, floorNearY: 0, mobile: true };
    const ripples = [];
    const packets = [];
    HERO_ORBITS.forEach((orb, oi) => {
      for (let i = 0; i < 4; i++) {
        packets.push({
          orbit: oi,
          t: i / 4 + oi * 0.11,
          speed: 0.08 + i * 0.012 + oi * 0.02,
          spoke: i % 2 === 0,
        });
      }
    });
    HERO_MODULES.forEach((_, i) => {
      packets.push({
        spoke: true,
        from: i,
        t: (i * 0.17) % 1,
        speed: 0.22 + (i % 3) * 0.04,
      });
    });

    const palette = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        ink: s.getPropertyValue("--stroke-ink").trim() || "20, 17, 15",
        accent: s.getPropertyValue("--stroke-accent").trim() || "11, 118, 159",
      };
    };
    let { ink, accent } = palette();

    const PAD_T = 78;
    const PAD_B = 62;

    const measureCopy = () => {
      const host = hostRef.current;
      const title = titleRef?.current;
      const rule = ruleRef?.current;
      const mq = host?.querySelector(".marquee");
      const hr = host?.getBoundingClientRect();
      layout.floorNearY = mq && hr ? mq.getBoundingClientRect().top - hr.top : h - 52;
      if (!host || !title || !hr || w < 720) {
        layout.mobile = true;
        layout.cx = w * 0.5;
        layout.cy = h * 0.4;
        layout.ruleY = h * 0.58;
        layout.titleRight = 0;
        return;
      }
      const tr = title.getBoundingClientRect();
      const rr = rule?.getBoundingClientRect();
      const titleRight = tr.right - hr.left;
      const gap = Math.max(52, Math.min(96, (w - titleRight) * 0.12));
      layout.mobile = false;
      layout.titleRight = titleRight;
      layout.cx = Math.min(w - 170, titleRight + gap + 90);
      layout.cy = (tr.top + tr.bottom) / 2 - hr.top;
      layout.ruleY = rr ? rr.top - hr.top : layout.cy + 90;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, reduced ? 1 : 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureCopy();
    };

    const project = (x, y, z, px, py) => {
      const fl = Math.max(520, Math.min(w, h) * 0.92);
      const zz = z + fl;
      const cx = layout.cx + px * 22;
      const cy = layout.cy + py * 14;
      return {
        x: cx + (x * fl) / zz,
        y: cy + (y * fl) / zz,
        s: fl / zz,
        z,
      };
    };

    const easeOut = (t) => 1 - (1 - t) ** 3;

    const drawBracket = (x, y, dx, dy, len) => {
      ctx.beginPath();
      ctx.moveTo(x, y + dy * len);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * len, y);
      ctx.stroke();
    };

    const drawRing = (yaw, tilt, radius, z, dash, a, lw) => {
      ctx.beginPath();
      const n = reduced ? 40 : 64;
      for (let i = 0; i <= n; i++) {
        const ang = (i / n) * Math.PI * 2;
        const x0 = Math.cos(ang) * radius;
        const y0 = Math.sin(ang) * radius * tilt;
        const z0 = Math.sin(ang) * radius * 0.34;
        const xr = x0 * Math.cos(yaw) - z0 * Math.sin(yaw);
        const zr = x0 * Math.sin(yaw) + z0 * Math.cos(yaw);
        const sp = matApply(spin.R, xr, y0, zr);
        const p = project(sp.x, sp.y, z + sp.z, pointer.x - 0.5, pointer.y - 0.5);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.setLineDash(dash);
      ctx.lineWidth = lw;
      ctx.globalAlpha = a;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    };

    const modulePos = (mod, time) => {
      const orb = HERO_ORBITS[mod.orbit];
      const ang = (mod.phase + time * orb.speed) * Math.PI * 2;
      const x0 = Math.cos(ang) * orb.r;
      const y0 = Math.sin(ang) * orb.r * orb.tilt;
      const z0 = Math.sin(ang) * orb.r * 0.34;
      const xr = x0 * Math.cos(orb.yaw) - z0 * Math.sin(orb.yaw);
      const zr = x0 * Math.sin(orb.yaw) + z0 * Math.cos(orb.yaw);
      const sp = matApply(spin.R, xr, y0, zr);
      return { x: sp.x, y: sp.y, z: 420 + sp.z };
    };

    const draw = (now) => {
      if (!running) return;
      if (!visible) {
        // Stop the loop while off-screen; restart when visibility returns.
        raf = 0;
        return;
      }

      ink = palette().ink;
      accent = palette().accent;
      measureCopy();

      const t = (now - t0) / 1000;
      const boot = reduced ? 1 : easeOut(Math.min(1, t / 1.35));
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      if (spin.grabbing) {
        const radius = Math.max(150, Math.min(w, h) * 0.3);
        const next = sphereVec(pointer.tx * w, pointer.ty * h, radius);
        if (spin.prevV) spin.R = matMul(rotFromTo(spin.prevV, next), spin.R);
        spin.prevV = next;
      } else {
        spin.prevV = null;
      }
      const px = pointer.x - 0.5;
      const py = pointer.y - 0.5;

      ctx.clearRect(0, 0, w, h);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const warp = (p) => {
        if (!pointer.on) return p;
        const dx = p.x - pointer.x * w;
        const dy = p.y - pointer.y * h;
        const d = Math.hypot(dx, dy);
        const inf = Math.exp(-(d * d) / (220 * 220));
        return { x: p.x - dx * inf * 0.06, y: p.y - inf * 18 };
      };

      // Plane vanishes on the spinner's centre dot.
      const core = project(0, 0, 420, px, py);
      const vx = core.x;
      const vy = core.y;
      const nearY = layout.floorNearY;
      const rows = 20;
      const cols = 28;
      const floorPt = (u, across) => {
        const xL = vx + (0 - vx) * (1 - u);
        const xR = vx + (w - vx) * (1 - u);
        const raw = {
          x: xL + (xR - xL) * across,
          y: nearY + (vy - nearY) * u,
        };
        const warped = warp(raw);
        const keep = 1 - u;
        return {
          x: raw.x + (warped.x - raw.x) * keep,
          y: raw.y + (warped.y - raw.y) * keep,
        };
      };

      const vg = ctx.createRadialGradient(vx, vy, 6, vx, vy, Math.max(w, h) * 0.55);
      vg.addColorStop(0, `rgba(${accent}, ${0.22 * boot})`);
      vg.addColorStop(1, `rgba(${accent}, 0)`);
      ctx.fillStyle = vg;
      ctx.beginPath();
      ctx.arc(vx, vy, Math.max(w, h) * 0.55, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i <= rows; i++) {
        const u = (i / rows) ** 1.25;
        const a = (0.08 + (1 - u) * 0.32) * boot;
        const p0 = floorPt(u, 0);
        const p1 = floorPt(u, 1);
        ctx.strokeStyle = `rgba(${accent}, ${a})`;
        ctx.lineWidth = u < 0.15 ? 1.25 : 0.75;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      for (let j = 0; j <= cols; j++) {
        const across = j / cols;
        const p0 = floorPt(0, across);
        const p1 = floorPt(1, across);
        ctx.strokeStyle = `rgba(${ink}, ${0.1 * boot})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      if (!reduced) {
        const sweep = (t * 0.28) % 1;
        const p0 = floorPt(sweep ** 1.15, 0);
        const p1 = floorPt(sweep ** 1.15, 1);
        ctx.strokeStyle = `rgba(${accent}, ${0.32 * boot})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // Gyroscopic rings — same seat, larger
      ctx.strokeStyle = `rgba(${accent}, 1)`;
      drawRing(t * 0.35, 0.55, 150 * boot, 420, [], 0.72, 2);
      drawRing(t * -0.22 + 0.6, 0.28, 228 * boot, 420, [5, 7], 0.54, 1.4);
      drawRing(t * 0.12 + 1.1, 0.72, 300 * boot, 420, [2, 10], 0.4, 1.2);

      const pulse = reduced ? 1 : 0.72 + Math.sin(t * 2.4) * 0.28;
      ctx.save();
      ctx.shadowColor = `rgba(${accent}, 0.85)`;
      ctx.shadowBlur = 28 * pulse;
      ctx.fillStyle = `rgba(${accent}, ${0.95 * boot})`;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 8 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = `rgba(${accent}, ${0.45 * boot})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 22 + pulse * 5, 0, Math.PI * 2);
      ctx.stroke();

      // Hex around core
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.4;
        const hx = Math.cos(a) * 56 * boot;
        const hy = Math.sin(a) * 32 * boot;
        const sp = matApply(spin.R, hx, hy, 0);
        const p = project(sp.x, sp.y, 420 + sp.z, px, py);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${accent}, ${0.35 * boot})`;
      ctx.stroke();

      // Orbiting modules (z-sort)
      const mods = HERO_MODULES.map((m) => {
        const pos = modulePos(m, reduced ? 0.15 : t);
        const p = project(pos.x, pos.y, pos.z, px, py);
        return { ...m, pos, p };
      }).sort((a, b) => b.p.z - a.p.z);

      mods.forEach((m) => {
        ctx.strokeStyle = `rgba(${accent}, ${0.12 + 0.18 * boot})`;
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(core.x, core.y);
        ctx.lineTo(m.p.x, m.p.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Packets along spokes and orbits
      if (boot > 0.4) {
        packets.forEach((pk) => {
          if (reduced) return;
          pk.t = (pk.t + pk.speed * 0.016) % 1;
          let p;
          if (pk.from != null) {
            const src = HERO_MODULES[pk.from];
            if (!src) return;
            const pos = modulePos(src, reduced ? 0.15 : t);
            const from = project(pos.x, pos.y, pos.z, px, py);
            const u = pk.t;
            p = {
              x: from.x + (core.x - from.x) * u,
              y: from.y + (core.y - from.y) * u,
            };
          } else {
            const dummy = {
              label: "",
              orbit: pk.orbit,
              phase: pk.t,
            };
            const pos = modulePos(dummy, 0);
            p = project(pos.x, pos.y, pos.z, px, py);
          }
          const glow = 0.45 + (pk.from != null ? 0.4 : 0.15);
          ctx.fillStyle = `rgba(${accent}, ${glow * boot})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pk.from != null ? 2.2 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      mods.forEach((m) => {
        const s = Math.max(0.75, Math.min(1.3, m.p.s * 1.15));
        const bw = 98 * s;
        const bh = 28 * s;
        const x = m.p.x - bw / 2;
        const y = m.p.y - bh / 2;
        const hot =
          pointer.on &&
          Math.hypot(m.p.x - pointer.x * w, m.p.y - pointer.y * h) < 90;
        ctx.fillStyle = hot
          ? `rgba(${accent}, ${0.16 * boot})`
          : `rgba(${ink}, ${0.04 * boot})`;
        ctx.strokeStyle = hot
          ? `rgba(${accent}, ${0.85 * boot})`
          : `rgba(${accent}, ${0.38 * boot})`;
        ctx.lineWidth = hot ? 1.3 : 1;
        ctx.beginPath();
        ctx.roundRect(x, y, bw, bh, 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgba(${accent}, ${0.9 * boot})`;
        ctx.beginPath();
        ctx.arc(x + 8, m.p.y, 2.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `500 ${Math.round(10 * s)}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = hot
          ? `rgba(${accent}, ${boot})`
          : `rgba(${ink}, ${0.72 * boot})`;
        ctx.fillText(m.label, x + 14, m.p.y + 0.5);
        ctx.globalAlpha = 1;
      });

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.rad += 3.2;
        r.life -= 0.018;
        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${accent}, ${r.life * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      // HUD chrome — inside nav/marquee clearances
      const hx0 = 22;
      const hy0 = PAD_T + 8;
      const hx1 = w - 52;
      const hy1 = h - PAD_B - 10;
      ctx.strokeStyle = `rgba(${accent}, ${0.45 * boot})`;
      ctx.lineWidth = 1.15;
      drawBracket(hx0, hy0, 1, 1, 18);
      drawBracket(hx1, hy0, -1, 1, 18);
      drawBracket(hx0, hy1, 1, -1, 18);
      drawBracket(hx1, hy1, -1, -1, 18);

      ctx.font = `500 10px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillStyle = `rgba(${accent}, ${0.72 * boot})`;
      const pkt = Math.floor(48 + (t * 23) % 80);
      ctx.fillText("CORE · ONLINE", hx1 - 8, hy0 + 6);
      ctx.fillStyle = `rgba(${ink}, ${0.42 * boot})`;
      ctx.fillText(`PKT  ${pkt}/s`, hx1 - 8, hy0 + 22);
      ctx.fillText(`BUILD  0.${90 + Math.floor((t * 7) % 9)}`, hx1 - 8, hy0 + 36);

      ctx.textAlign = "left";
      ctx.fillStyle = `rgba(${ink}, ${0.38 * boot})`;
      const gx = String(Math.round(pointer.x * 1000)).padStart(3, "0");
      const gy = String(Math.round(pointer.y * 1000)).padStart(3, "0");
      ctx.fillText(`X ${gx}  Y ${gy}`, hx0 + 8, hy1 - 18);
      ctx.fillStyle = `rgba(${accent}, ${0.55 * boot})`;
      ctx.fillText("SYS  KS-01", hx0 + 8, hy1 - 32);

      // Operator reticle
      if (pointer.on) {
        const rx = pointer.x * w;
        const ry = pointer.y * h;
        ctx.strokeStyle = `rgba(${accent}, 0.55)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rx, ry, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(rx - 22, ry);
        ctx.lineTo(rx - 8, ry);
        ctx.moveTo(rx + 8, ry);
        ctx.lineTo(rx + 22, ry);
        ctx.moveTo(rx, ry - 22);
        ctx.lineTo(rx, ry - 8);
        ctx.moveTo(rx, ry + 8);
        ctx.lineTo(rx, ry + 22);
        ctx.stroke();
        ctx.fillStyle = `rgba(${accent}, 0.9)`;
        ctx.beginPath();
        ctx.arc(rx, ry, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      measureCopy();
      pointer.tx = layout.cx / Math.max(1, w);
      pointer.ty = layout.cy / Math.max(1, h);
      draw(t0 + 1600);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const grabZone = () => Math.max(150, Math.min(w, h) * 0.3);
    const localFromEvent = (e) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, r };
    };
    const nearSpinner = (lx, ly) => Math.hypot(lx - layout.cx, ly - layout.cy) < grabZone();
    const setSpinCursor = () => {
      host.classList.toggle("is-spin-grab", spin.grabbing);
      host.classList.toggle("is-spin-near", spin.near && !spin.grabbing);
    };

    const onResize = () => {
      resize();
      if (reduced) draw(t0 + 1600);
    };
    const onMove = (e) => {
      const { x, y, r } = localFromEvent(e);
      if (!spin.grabbing && (e.clientY < r.top || e.clientY > r.bottom)) return;
      pointer.tx = Math.min(1, Math.max(0, x / r.width));
      pointer.ty = Math.min(1, Math.max(0, y / r.height));
      pointer.on = true;
      spin.near = nearSpinner(x, y);
      setSpinCursor();
    };
    const onLeave = () => {
      if (spin.grabbing) return;
      pointer.on = false;
      spin.near = false;
      setSpinCursor();
    };
    const onDown = (e) => {
      const { x, y, r } = localFromEvent(e);
      ripples.push({
        x,
        y,
        rad: 8,
        life: 1,
      });
      if (reduced || !nearSpinner(x, y)) return;
      spin.grabbing = true;
      spin.near = true;
      spin.prevV = null;
      pointer.tx = Math.min(1, Math.max(0, x / r.width));
      pointer.ty = Math.min(1, Math.max(0, y / r.height));
      try {
        host.setPointerCapture(e.pointerId);
      } catch {
        /* capture is optional */
      }
      setSpinCursor();
    };
    const onUp = () => {
      if (!spin.grabbing) return;
      spin.grabbing = false;
      spin.prevV = null;
      setSpinCursor();
    };
    let inView = true;
    let pageVis = document.visibilityState !== "hidden";
    const syncVisible = () => {
      const next = inView && pageVis;
      const was = visible;
      visible = next;
      if (!was && next && running && !reduced && !raf) {
        raf = requestAnimationFrame(draw);
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncVisible();
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    window.addEventListener("resize", onResize);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", onUp);
    const onVis = () => {
      pageVis = document.visibilityState !== "hidden";
      syncVisible();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      spin.grabbing = false;
      spin.near = false;
      setSpinCursor();
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced, blueprint, hostRef, titleRef, ruleRef]);

  return (
    <div className="hero-core" aria-hidden>
      <canvas ref={canvasRef} />
      <div className="hero-core-veil" />
      <div className="hero-core-scan" />
    </div>
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

/** Fixed rule-marks down the right edge: position indicator and jump nav. */
function SectionRail({ active, onNavigate }) {
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
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.(s.id);
            }}
            className="group flex items-center justify-end gap-2.5 py-1"
          >
            <span
              className={`bg-paper/90 px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 ${
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

/** Theme-style square toggle: same placement pattern as dark-mode switches
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

function Nav({ progress, active, blueprintOn, onToggleBlueprint, onNavigate }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    onNavigate?.(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        solid || menuOpen ? "bg-paper/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-12 md:py-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("top");
          }}
          className="group flex items-center gap-3"
        >
          <span className="font-display text-[2rem] leading-none md:text-[2.35rem]">KS</span>
          <span className="hidden font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink-soft sm:inline md:text-[13px]">
            {CONFIG.identity.role}
          </span>
        </a>
        <nav className="flex items-center gap-2.5 md:gap-4 lg:gap-7">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
              className={`group relative hidden font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors md:block lg:text-[12px] lg:tracking-[0.14em] ${
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
            className="hidden border border-ink px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-ink hover:text-paper sm:inline-flex"
          >
            Get in touch
          </a>
          <BlueprintToggle on={blueprintOn} onToggle={onToggleBlueprint} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-[var(--color-rule)] md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="font-mono text-[13px] tracking-[0.08em]">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--color-rule)] bg-paper px-5 py-4 md:hidden">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  className={`block py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.14em] ${
                    active === item.id ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`mailto:${CONFIG.identity.email}`}
                className="inline-flex border border-ink px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      )}

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
  const hostRef = useRef(null);
  const titleRef = useRef(null);
  const ruleRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 90);
    return () => clearTimeout(t);
  }, []);

  const { hero, identity } = CONFIG;
  const marquee = [...hero.marquee, ...hero.marquee];

  return (
    <section
      ref={hostRef}
      id="top"
      className="panel-page relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden"
    >
      <HeroCore
        reduced={reduced}
        blueprint={blueprint}
        hostRef={hostRef}
        titleRef={titleRef}
        ruleRef={ruleRef}
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pt-14 pb-4 md:px-12 md:pt-16 md:pb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            {identity.available && !reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-ink-soft md:text-[13px]">
            {hero.eyebrow}
          </p>
        </div>

        <h1
          ref={titleRef}
          className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
        >
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

        <div
          ref={ruleRef}
          className="hero-rule mt-8 grid gap-8 border-t border-[var(--color-rule)] pt-5 md:grid-cols-12"
        >
          <p
            className="max-w-[54ch] text-[16px] leading-[1.65] text-ink-soft transition-all duration-1000 md:col-span-6 md:text-[17px]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transitionDelay: "520ms",
            }}
          >
            {hero.intro}
          </p>
          <dl
            className="mt-1 grid grid-cols-1 gap-x-6 gap-y-3 transition-all duration-1000 sm:grid-cols-3 md:col-span-6 md:justify-items-end"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transitionDelay: "640ms",
            }}
          >
            {[
              { k: "Location", v: identity.location },
              { k: "Status", v: identity.availableNote },
              { k: "Focus", v: identity.focus },
            ].map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                  {f.k}
                </dt>
                <dd className="mt-1 text-[15px] font-medium leading-snug text-ink">
                  {Array.isArray(f.v)
                    ? f.v.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    : f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="marquee relative z-[1] shrink-0 overflow-hidden border-y border-[var(--color-rule)] py-3.5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {marquee.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink-faint"
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

const KEY_LEGENDS = [
  "Esc",
  "Tab",
  "Ctrl",
  "Alt",
  "Fn",
  "{}",
  "[]",
  "<>",
  "()",
  ";:",
  "/=",
  "&&",
  "||",
  "=>",
  "::",
  "0x",
  "nil",
  "var",
  "fn",
  "git",
  "ssh",
  "npm",
  "SQL",
  "API",
  "{}",
  "</>",
  "$",
  "#",
  "~/",
  "..",
];

const GLOW_PALETTE = [
  [111, 211, 255], // cyan
  [168, 85, 247], // violet
  [52, 211, 153], // emerald
  [244, 114, 182], // pink
  [251, 146, 60], // orange
  [250, 204, 21], // yellow
  [96, 165, 250], // blue
  [244, 63, 94], // rose
];

/** Full-bleed mechanical keyboard: coding legends + RGB glow under the cursor. */
function AboutKeyboard({ reduced, sectionRef }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let keys = [];
    let w = 0;
    let h = 0;
    let nextPress = 0;

    const rootStyle = getComputedStyle(document.documentElement);
    const inkRGB = rootStyle.getPropertyValue("--stroke-ink").trim() || "20, 17, 15";
    const accentRGB = rootStyle.getPropertyValue("--stroke-accent").trim() || "111, 211, 255";

    const pickGlow = (seed) => GLOW_PALETTE[seed % GLOW_PALETTE.length];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, reduced ? 1 : 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gapX = w < 700 ? 48 : 56;
      const gapY = w < 700 ? 48 : 54;
      const keyW = gapX - 9;
      const keyH = gapY - 11;
      const cols = Math.ceil(w / gapX) + 1;
      const rows = Math.ceil(h / gapY) + 1;
      keys = [];
      for (let r = 0; r < rows; r++) {
        const stagger = (r % 2) * (gapX * 0.22);
        for (let c = 0; c < cols; c++) {
          const seed = (r * 17 + c * 31) % 997;
          keys.push({
            x: c * gapX + stagger - gapX * 0.15,
            y: r * gapY - gapY * 0.1,
            w: keyW,
            h: keyH,
            press: 0,
            glow: 0,
            seed,
            legend: KEY_LEGENDS[seed % KEY_LEGENDS.length],
            color: pickGlow(seed),
          });
        }
      }
    };

    const drawKey = (k, lit) => {
      const sink = Math.max(k.press, lit * 0.55) * 2.4;
      const x = k.x;
      const y = k.y + sink;
      const rw = k.w;
      const rh = k.h - sink * 0.35;
      const [cr, cg, cb] = k.color;
      const g = Math.min(1, lit);

      if (g > 0.04) {
        ctx.save();
        ctx.shadowColor = `rgba(${cr}, ${cg}, ${cb}, ${0.55 * g})`;
        ctx.shadowBlur = 18 * g;
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.12 * g})`;
        ctx.beginPath();
        ctx.roundRect(x - 2, y - 2, rw + 4, rh + 4, 6);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = `rgba(${inkRGB}, ${0.05 + g * 0.04})`;
      ctx.beginPath();
      ctx.roundRect(x + 1.5, y + 3, rw, rh, 4);
      ctx.fill();

      ctx.fillStyle =
        g > 0.05
          ? `rgba(${cr}, ${cg}, ${cb}, ${0.08 + g * 0.22})`
          : `rgba(${inkRGB}, 0.04)`;
      ctx.strokeStyle =
        g > 0.05
          ? `rgba(${cr}, ${cg}, ${cb}, ${0.35 + g * 0.55})`
          : `rgba(${accentRGB}, 0.2)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, rw, rh, 4);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle =
        g > 0.05
          ? `rgba(${cr}, ${cg}, ${cb}, ${0.15 + g * 0.25})`
          : `rgba(${accentRGB}, 0.07)`;
      ctx.beginPath();
      ctx.roundRect(x + 3, y + 3, rw - 6, rh - 6, 2.5);
      ctx.stroke();

      // Coding legend
      ctx.font = `500 ${Math.max(8, Math.min(11, rw * 0.22))}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle =
        g > 0.08
          ? `rgba(${cr}, ${cg}, ${cb}, ${0.55 + g * 0.4})`
          : `rgba(${accentRGB}, 0.28)`;
      ctx.fillText(k.legend, x + rw / 2, y + rh / 2 + 0.5);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const k of keys) drawKey(k, 0);
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);

      if (!reduced && now > nextPress && keys.length) {
        const n = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < n; i++) {
          const k = keys[Math.floor(Math.random() * keys.length)];
          k.press = 1;
          // Occasional ambient glow pulse in a random palette color
          if (Math.random() > 0.55) {
            k.color = pickGlow(Math.floor(Math.random() * 64));
            k.glow = Math.max(k.glow, 0.55);
          }
        }
        nextPress = now + 220 + Math.random() * 480;
      }

      const p = pointer.current;
      const radius = Math.min(w, h) * 0.18;

      for (const k of keys) {
        if (k.press > 0) k.press = Math.max(0, k.press - 0.05);

        let target = 0;
        if (p.active) {
          const cx = k.x + k.w / 2;
          const cy = k.y + k.h / 2;
          const d = Math.hypot(cx - p.x, cy - p.y);
          if (d < radius) {
            target = Math.pow(1 - d / radius, 1.35);
            // Re-roll glow color as keys enter the hotspot for a random mix
            if (k.glow < 0.15 && target > 0.2) {
              k.color = pickGlow(Math.floor(Math.random() * 128 + k.seed));
            }
          }
        }

        k.glow += (target - k.glow) * (target > k.glow ? 0.28 : 0.12);
        drawKey(k, Math.max(k.glow, k.press * 0.7));
      }

      raf = requestAnimationFrame(draw);
    };

    build();
    if (reduced) {
      drawStatic();
    } else {
      nextPress = performance.now() + 300;
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      build();
      if (reduced) drawStatic();
    };

    const onMove = (e) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };

    window.addEventListener("resize", onResize);
    section?.addEventListener("pointermove", onMove, { passive: true });
    section?.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      section?.removeEventListener("pointermove", onMove);
      section?.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, sectionRef]);

  return (
    <div className="about-keyboard" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function About() {
  const { about } = CONFIG;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="panel-page relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-20 md:px-12 md:py-24"
    >
      <AboutKeyboard reduced={reduced} sectionRef={sectionRef} />

      <div className="relative z-[1] mx-auto w-full max-w-[1400px]">
        <SectionLabel index="01">{about.label}</SectionLabel>

        <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <Reveal className="md:col-span-7">
            <p className="font-display text-[clamp(1.85rem,3.4vw,3rem)] font-normal leading-[1.12] tracking-[-0.015em] text-ink">
              {about.lead}
            </p>
            <div className="mt-7 space-y-4 text-[16px] leading-[1.7] text-ink/80 md:text-[17px]">
              {about.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-5">
            <figure className="relative pl-0">
              <span className="about-quote-rule mb-5 block h-[2px] w-14 bg-accent" />
              <blockquote className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] italic leading-[1.25] text-ink">
                “{about.pullQuote}”
              </blockquote>
            </figure>
            <dl className="mt-8 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {about.facts.map((f) => (
                <div
                  key={f.k}
                  className="group flex items-baseline justify-between gap-4 py-3 sm:gap-6"
                >
                  <dt className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint transition-colors group-hover:text-accent">
                    {f.k}
                  </dt>
                  <dd className="text-right text-[14px] font-medium text-ink sm:text-[15px]">{f.v}</dd>
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

/** Sized like a normal desktop browser (16:10), never stretched tall with empty gray. */
function BrowserFrame({ url, urlLabel, title }) {
  const hostRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const sync = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (width < 2 || height < 2) return;
      const ratio = 16 / 10;
      let w = width;
      let h = w / ratio;
      if (h > height) {
        h = height;
        w = h * ratio;
      }
      setSize({ w: Math.round(w), h: Math.round(h) });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="case-browser-host flex h-full min-h-0 w-full items-center justify-center">
      <div
        className="case-browser flex flex-col overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-deep)]"
        style={size.w ? { width: size.w, height: size.h } : { width: "100%", aspectRatio: "16 / 10" }}
      >
        <div className="case-browser-chrome flex shrink-0 items-center gap-2 border-b border-[var(--color-rule)] px-3 py-1.5">
          <span className="flex gap-1.5">
            <span className="case-browser-dot h-1.5 w-1.5 rounded-full bg-ink/20" />
            <span className="case-browser-dot h-1.5 w-1.5 rounded-full bg-ink/20" />
            <span className="case-browser-dot h-1.5 w-1.5 rounded-full bg-ink/20" />
          </span>
          <span className="min-w-0 truncate font-mono text-[10px] tracking-[0.08em] text-ink-faint">
            {urlLabel}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="case-browser-open ml-auto shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint"
          >
            Open site ↗
          </a>
        </div>
        <div className="case-browser-stage relative min-h-0 flex-1 overflow-hidden">
          <iframe
            key={url}
            title={`Live preview: ${title}`}
            src={url}
            className="h-full w-full border-0 bg-paper"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <span className="case-browser-scan" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project }) {
  const narrative = [
    { k: "Situation", v: project.problem },
    { k: "Build", v: project.approach },
    { k: "Payoff", v: project.result },
  ];

  return (
    <div className="case-study grid h-full min-h-0 gap-4 md:grid-cols-12 md:gap-5 lg:gap-6">
      <aside className="case-study-rail flex min-h-0 min-w-0 flex-col gap-2.5 overflow-hidden md:col-span-5 lg:col-span-4">
        <dl className="case-study-meta shrink-0">
          {[
            { k: "Client", v: project.client },
            { k: "Role", v: project.role },
            { k: "Period", v: project.period },
          ].map((m, i) => (
            <div
              key={m.k}
              className="case-study-meta-row group"
              style={{ "--case-i": i }}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint transition-colors duration-300 group-hover:text-accent">
                {m.k}
              </dt>
              <dd className="text-[15px] leading-snug transition-colors duration-300 group-hover:text-ink md:text-[16px]">
                {m.v}
              </dd>
            </div>
          ))}
          {project.url && (
            <div
              className="case-study-meta-row"
              style={{ "--case-i": 3 }}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Live
              </dt>
              <dd>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="case-live-link group/link inline-flex max-w-full items-center gap-1.5 text-[15px] text-accent md:text-[16px]"
                >
                  <span className="min-w-0 truncate border-b border-accent/40 transition-colors group-hover/link:border-accent">
                    {project.urlLabel}
                  </span>
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              </dd>
            </div>
          )}
          <div className="case-study-stack flex flex-wrap gap-1.5" style={{ "--case-i": 4 }}>
            {project.stack.map((s) => (
              <span key={s} className="case-stack-chip">
                {s}
              </span>
            ))}
          </div>
        </dl>

        <div className="case-study-narrative min-h-0 flex-1 space-y-2.5 overflow-hidden border-t border-[var(--color-rule)] pt-3">
          {narrative.map((block, i) => (
            <div
              key={block.k}
              className="case-narrative-block group"
              style={{ "--case-i": i + 5 }}
            >
              <h4 className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                <span className="case-narrative-rule h-px w-3 bg-accent transition-all duration-300 group-hover:w-5" />
                {block.k}
              </h4>
              <p className="text-[14px] leading-snug text-ink-soft transition-colors duration-300 group-hover:text-ink md:text-[15px] md:leading-[1.45]">
                {block.v}
              </p>
            </div>
          ))}
        </div>

        {project.highlights?.length > 0 && (
          <dl className="case-study-highlights shrink-0 space-y-1 border-t border-[var(--color-rule)] pt-2.5">
            {project.highlights.map((h, i) => (
              <div
                key={h.k}
                className="case-highlight-row group flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5"
                style={{ "--case-i": i + 8 }}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint transition-colors duration-300 group-hover:text-accent">
                  {h.k}
                </dt>
                <dd className="min-w-0 font-mono text-[13px] transition-colors duration-300 group-hover:text-ink md:text-[14px]">
                  {h.v}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </aside>

      <div
        className="project-modal-preview case-study-preview min-h-[42vw] w-full min-w-0 sm:min-h-[280px] md:col-span-7 md:h-full md:min-h-0 lg:col-span-8"
        style={{ "--case-i": 2 }}
      >
        {project.featured && project.url ? (
          <BrowserFrame url={project.url} urlLabel={project.urlLabel} title={project.title} />
        ) : (
          <div className="case-preview-empty flex h-full min-h-[180px] items-center justify-center border border-dashed border-[var(--color-rule)] px-6 text-center">
            <p className="max-w-[36ch] text-[13px] leading-relaxed text-ink-faint">
              No live site for this engagement. Details stay on the left.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectRow({ project, index, onOpen }) {
  const num = String(index + 1).padStart(2, "0");
  const hasPreview = !!(project.featured && project.url);
  const [hot, setHot] = useState(false);

  return (
    <Reveal
      as="article"
      delay={index * 60}
      className="work-card group relative mb-4 overflow-hidden md:mb-5"
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHot(false);
      }}
    >
      <button
        onClick={onOpen}
        className="relative flex w-full cursor-pointer items-stretch gap-4 px-4 py-5 text-left sm:gap-6 sm:px-6 md:gap-8 md:px-8 md:py-6"
      >
        <span className="mt-1.5 font-mono text-[12px] font-medium tracking-[0.16em] text-ink-faint transition-colors duration-300 group-hover:text-accent md:text-[13px]">
          {num}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-[clamp(1.85rem,4vw,3.2rem)] leading-none tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint md:text-[12px]">
              {project.period}
            </span>
          </span>
          <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[15px] text-ink-soft md:text-base">
              <span className="font-medium text-ink">{project.client}</span>
              <span className="text-ink-faint"> · </span>
              {project.subtitle}
            </span>
            {project.urlLabel && (
              <span className="font-mono text-[11px] tracking-[0.06em] text-ink-faint md:text-[12px]">
                {project.urlLabel}
              </span>
            )}
          </span>
          <span className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                className="work-stack-chip border border-[var(--color-rule)] px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.06em] text-ink-faint"
              >
                {s}
              </span>
            ))}
          </span>
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-accent">
            Open case study
            <Icon
              name="arrow"
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </span>

        <span
          className="work-mini-preview relative hidden w-[210px] shrink-0 self-center lg:block xl:w-[250px]"
          aria-hidden
        >
          <span className="block overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-deep)] shadow-[0_12px_40px_-18px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <span className="flex items-center gap-1.5 border-b border-[var(--color-rule)] px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
              <span className="ml-1 truncate font-mono text-[8px] tracking-[0.06em] text-ink-faint">
                {project.urlLabel || project.title}
              </span>
            </span>
            {hasPreview ? (
              <span className="relative block aspect-[16/10] overflow-hidden bg-[var(--color-paper-deep)]">
                {hot ? (
                  <iframe
                    title=""
                    src={project.url}
                    tabIndex={-1}
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-paper"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                    Preview
                  </span>
                )}
              </span>
            ) : (
              <span className="flex aspect-[16/10] items-center justify-center px-3 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                No live site
              </span>
            )}
          </span>
        </span>
      </button>
    </Reveal>
  );
}

const WORK_CODE_SNIPPETS = [
  "const tenant = await Company.find(scopeId)",
  "router.post('/checkout', RateLimiter)",
  "deploy --host ovh --branch main",
  "SELECT * FROM bookings WHERE day = ?",
  "useMultiTenant(session.companyId)",
  "pdf.render(contract, { signed: true })",
  "n8n.trigger('client.report.weekly')",
  "git commit -m 'ship pricing engine'",
  "OCR.parse(mrz).then(fillCustomer)",
  "Inertia::render('Storefront', props)",
  "filament()->panel('studio')",
  "// ownership: after payment, IP assigns",
  "if (role === 'admin') return gate.open()",
  "redis.cache(`fleet:${companyId}`)",
  "await Mail::queue(new DevisSent($id))",
  "zod.object({ email: z.string().email() })",
  "tsx watch src/server.ts",
  "php artisan migrate --force",
  "npm run build && rsync dist/ ovh:",
  "WHERE status IN ('paid','active')",
  "const rate = resolvePricing(plan, days)",
  "Webhook::verify(signature, payload)",
  "docker compose up -d nginx php",
  "jwt.verify(token, process.env.SECRET)",
  "store.dispatch(cart.add(item))",
  "->whereBelongsTo($tenant)->get()",
  "cron: 0 6 * * 1 report:weekly",
  "fetch('/api/availability?from=')",
  "Schema::create('agencies', fn ($t))",
  "try { ship(scope) } catch (e) { log(e) }",
  "vite build --mode production",
  "ssh deploy@ovh 'systemctl reload php'",
  "const slots = calendar.free(range)",
  "Policy::denies('update', $booking)",
  "tail -f storage/logs/laravel.log",
  "export type TenantId = Brand<string>",
  "Queue::push(new GenerateInvoice($id))",
  "grep -R 'TODO' app/ --include='*.php'",
  "curl -X POST /webhooks/stripe",
  "composer require laravel/sanctum",
  "React.lazy(() => import('./Admin'))",
  "ALTER TABLE fleets ADD INDEX (plate)",
  "env('APP_URL') === 'https://keycars.fr'",
  "onConflict('sku').merge(['price'])",
  "await prisma.order.create({ data })",
  "scp -r public/builds deploy@host:/var/",
];

function tokenizeCodeLine(text) {
  const nodes = [];
  let key = 0;
  let match;
  const re =
    /(\/\/.*)|(`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*")|(\b(?:const|let|var|await|async|return|if|else|try|catch|new|typeof|export|type|from|function|class|import|SELECT|FROM|WHERE|AND|OR|IN|ADD|INDEX|ALTER|TABLE|CREATE|fn|true|false|null)\b)|(\b\d+\b)|(\b[A-Za-z_$][\w$]*(?=\s*\())|([.:;,(){}[\]<>=!?&|+\-*/%$]+)|(\s+)|([A-Za-z_$][\w$]*)|([^\s])/gi;
  re.lastIndex = 0;
  while ((match = re.exec(text)) !== null) {
    const [, comment, string, keyword, number, fn, punct, space, ident, other] = match;
    let kind = "plain";
    let value = ident || other;
    if (comment) {
      kind = "comment";
      value = comment;
    } else if (string) {
      kind = "string";
      value = string;
    } else if (keyword) {
      kind = "keyword";
      value = keyword;
    } else if (number) {
      kind = "number";
      value = number;
    } else if (fn) {
      kind = "fn";
      value = fn;
    } else if (punct) {
      kind = "punct";
      value = punct;
    } else if (space) {
      kind = "space";
      value = space;
    } else if (ident) {
      kind = "plain";
      value = ident;
    }
    nodes.push(
      <span key={key++} className={kind === "space" ? undefined : `code-tok code-tok-${kind}`}>
        {value}
      </span>
    );
  }
  return nodes;
}

function WorkCodeField() {
  const reduced = usePrefersReducedMotion();
  const fieldRef = useRef(null);
  const [travelPx, setTravelPx] = useState(1200);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return undefined;
    const measure = () => {
      // Travel the full #work height so lines start at the top edge and exit at the bottom.
      setTravelPx(Math.max(el.offsetHeight + 48, 800));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const lines = useMemo(() => {
    const out = [];
    const passes = reduced ? 1 : 3;
    for (let pass = 0; pass < passes; pass++) {
      WORK_CODE_SNIPPETS.forEach((text, i) => {
        const n = pass * WORK_CODE_SNIPPETS.length + i;
        const depth = n % 3;
        // Side gutters only (left 0–22% / right 78–100%).
        const onLeft = n % 2 === 0;
        const left = onLeft ? 1 + (n * 5.3) % 20 : 79 + (n * 4.7) % 19;
        out.push({
          id: `${pass}-${i}`,
          text,
          left: `${left}%`,
          // Stagger spawn just above the section top edge.
          top: `${-4 - (n % 10) * 1.8}%`,
          duration: `${90 + (n % 9) * 10}s`,
          delay: `${-((n * 4.2) % 80)}s`,
          depth,
          driftX: (onLeft ? 1 : -1) * (5 + depth * 4),
          opacity: depth === 0 ? 0.52 : depth === 1 ? 0.32 : 0.18,
        });
      });
    }
    return out;
  }, [reduced]);

  return (
    <div ref={fieldRef} className="work-code-field" aria-hidden>
      <div className="work-code-glow work-code-glow-a" />
      <div className="work-code-glow work-code-glow-b" />
      <div className="work-screen">
        <div className="work-screen-grid" />
        <div className="work-screen-plane">
          {lines.map((line) => (
            <span
              key={line.id}
              className={`work-code-line work-code-depth-${line.depth}`}
              style={{
                left: line.left,
                top: line.top,
                "--travel": `${travelPx + line.depth * 40}px`,
                "--drift-x": `${line.driftX}px`,
                "--line-op": String(line.opacity),
                animationDuration: reduced ? undefined : line.duration,
                animationDelay: reduced ? undefined : line.delay,
              }}
            >
              {tokenizeCodeLine(line.text)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}) {
  const hasPrev = index > 0;
  const hasNext = index < total - 1;
  const num = String(index + 1).padStart(2, "0");
  const prevProject = hasPrev ? CONFIG.projects[index - 1] : null;
  const nextProject = hasNext ? CONFIG.projects[index + 1] : null;

  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  onCloseRef.current = onClose;
  onPrevRef.current = onPrev;
  onNextRef.current = onNext;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (hasNext) {
          e.preventDefault();
          onNextRef.current();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (hasPrev) {
          e.preventDefault();
          onPrevRef.current();
        }
      }
    };

    let coolUntil = 0;
    let acc = 0;
    const onWheel = (e) => {
      // Let the live preview iframe (and its chrome) handle its own scroll.
      if (e.target.closest?.(".project-modal-preview, iframe")) return;
      // Don't steal wheel from interactive controls.
      if (e.target.closest?.("a, button, input, textarea, select")) return;
      // Let the left narrative column scroll when it has overflow.
      const scrollPane = e.target.closest?.(".project-modal-body aside, .project-modal-body");
      if (scrollPane) {
        const canDown = scrollPane.scrollTop + scrollPane.clientHeight < scrollPane.scrollHeight - 2;
        const canUp = scrollPane.scrollTop > 2;
        if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (Date.now() < coolUntil) {
        acc = 0;
        return;
      }

      acc += e.deltaY;
      if (Math.abs(acc) < 40) return;

      const dir = acc > 0 ? "down" : "up";
      acc = 0;
      coolUntil = Date.now() + 650;
      if (dir === "down") {
        if (hasNext) onNextRef.current();
      } else if (hasPrev) {
        onPrevRef.current();
      }
    };

    let touchY = 0;
    let touchOnPreview = false;
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY;
      touchOnPreview = !!e.target.closest?.(".project-modal-preview, iframe");
    };
    const onTouchEnd = (e) => {
      if (touchOnPreview) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      if (Date.now() < coolUntil) return;
      coolUntil = Date.now() + 650;
      if (dy > 0) {
        if (hasNext) onNextRef.current();
      } else if (hasPrev) {
        onPrevRef.current();
      }
    };

    window.addEventListener("keydown", onKey);
    // Capture so we win over page immersive-scroll outside the preview.
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [hasNext, hasPrev]);

  return createPortal(
    <div className="project-modal" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="project-modal-backdrop" onClick={onClose} aria-label="Close" />
      <div className="project-modal-panel">
        <div className="project-modal-header case-modal-header flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-rule)] bg-paper/95 px-5 py-2.5 backdrop-blur-sm md:px-8">
          <div className="case-modal-title min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{num}</span>
              <h2 className="font-display text-lg md:text-xl">{project.title}</h2>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:inline">
                {project.period}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[12px] text-ink-soft">
              {project.client} · {project.subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="case-nav-btn hidden items-center gap-1.5 border border-[var(--color-rule)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] disabled:pointer-events-none disabled:opacity-30 sm:inline-flex"
              aria-label={prevProject ? `Previous: ${prevProject.title}` : "No previous project"}
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="case-nav-btn hidden items-center gap-1.5 border border-[var(--color-rule)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] disabled:pointer-events-none disabled:opacity-30 sm:inline-flex"
              aria-label={nextProject ? `Next: ${nextProject.title}` : "No next project"}
            >
              Next →
            </button>
            <span className="hidden font-mono text-[10px] tracking-[0.12em] text-ink-faint md:inline">
              {num} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              className="case-nav-btn case-nav-close flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--color-rule)] font-mono text-sm"
              aria-label="Close case study"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="project-modal-body">
          <div className="min-h-0 flex-1" key={project.id}>
            <ProjectCaseStudy project={project} />
          </div>
        </div>

        <div className="case-modal-mobile-nav flex shrink-0 items-center justify-between gap-3 border-t border-[var(--color-rule)] px-5 py-2.5 sm:hidden">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="case-nav-btn border-0 bg-transparent px-0 py-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft disabled:opacity-30"
          >
            ← {prevProject?.title ?? "Prev"}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className="case-nav-btn border-0 bg-transparent px-0 py-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft disabled:opacity-30"
          >
            {nextProject?.title ?? "Next"} →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Work({ runCurtain }) {
  const [openId, setOpenId] = useState(null);
  const transitioning = useRef(false);
  const lockY = useRef(0);
  const openIdRef = useRef(null);
  const historyPushedRef = useRef(false);
  openIdRef.current = openId;
  const openProject = CONFIG.projects.find((p) => p.id === openId);
  const openIndex = CONFIG.projects.findIndex((p) => p.id === openId);

  const projectUrl = useCallback((id) => {
    const { pathname, search } = window.location;
    return `${pathname}${search}#work/${id}`;
  }, []);

  const workUrl = useCallback(() => {
    const { pathname, search } = window.location;
    return `${pathname}${search}#work`;
  }, []);

  const lockPage = useCallback(() => {
    if (document.body.dataset.modalOpen === "1") return;
    lockY.current = window.scrollY;
    document.body.dataset.modalOpen = "1";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }, []);

  const unlockPage = useCallback(() => {
    if (document.body.dataset.modalOpen !== "1") return;
    const y = lockY.current;
    delete document.body.dataset.modalOpen;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, y);
  }, []);

  useEffect(() => () => unlockPage(), [unlockPage]);

  const performClose = useCallback(async () => {
    if (transitioning.current || !openIdRef.current) return;
    transitioning.current = true;
    try {
      await runCurtain({
        direction: "up",
        label: "Work",
        index: "02",
        atCovered: () => {
          setOpenId(null);
          unlockPage();
        },
      });
    } finally {
      transitioning.current = false;
    }
  }, [runCurtain, unlockPage]);

  const closeModal = useCallback(() => {
    if (historyPushedRef.current) {
      historyPushedRef.current = false;
      window.history.back();
      return;
    }
    void performClose().then(() => {
      window.history.replaceState(null, "", workUrl());
    });
  }, [performClose, workUrl]);

  const openAt = useCallback(
    async (id, direction = "down") => {
      if (transitioning.current) return;
      const index = CONFIG.projects.findIndex((p) => p.id === id);
      const project = CONFIG.projects[index];
      if (!project) return;
      transitioning.current = true;
      lockPage();
      try {
        await runCurtain({
          direction,
          label: project.title,
          index: String(index + 1).padStart(2, "0"),
          atCovered: () => {
            setOpenId(id);
            const url = projectUrl(id);
            if (historyPushedRef.current || window.history.state?.projectModal) {
              window.history.replaceState({ projectModal: id }, "", url);
            } else {
              window.history.pushState({ projectModal: id }, "", url);
              historyPushedRef.current = true;
            }
          },
        });
      } finally {
        transitioning.current = false;
      }
    },
    [runCurtain, lockPage, projectUrl]
  );

  // Browser Back closes the case study and returns to the site.
  useEffect(() => {
    const onPopState = () => {
      if (!openIdRef.current) return;
      historyPushedRef.current = false;
      void performClose();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [performClose]);

  // Deep link: #work/keycars opens that case study on load.
  useEffect(() => {
    const match = window.location.hash.match(/^#work\/([\w-]+)/);
    if (!match) return;
    const id = match[1];
    if (!CONFIG.projects.some((p) => p.id === id)) return;
    lockPage();
    setOpenId(id);
    historyPushedRef.current = false;
    window.history.replaceState({ projectModal: id }, "", projectUrl(id));
  }, [lockPage, projectUrl]);

  // Capability (and anywhere else) can request a case study open.
  useEffect(() => {
    const onOpen = (e) => {
      const id = e.detail?.id;
      if (!id || !CONFIG.projects.some((p) => p.id === id)) return;
      void openAt(id, "down");
    };
    window.addEventListener("ks:open-case-study", onOpen);
    return () => window.removeEventListener("ks:open-case-study", onOpen);
  }, [openAt]);

  const goPrev = useCallback(() => {
    if (openIndex <= 0) return;
    openAt(CONFIG.projects[openIndex - 1].id, "up");
  }, [openIndex, openAt]);

  const goNext = useCallback(() => {
    if (openIndex < 0 || openIndex >= CONFIG.projects.length - 1) return;
    openAt(CONFIG.projects[openIndex + 1].id, "down");
  }, [openIndex, openAt]);

  return (
    <section id="work" className="panel-free relative overflow-hidden pb-14 pt-24 md:pb-20 md:pt-28">
      <WorkCodeField />

      <div className="relative z-[1] mx-auto max-w-[1400px] px-5 md:px-12">
        <SectionLabel index="02">Selected work</SectionLabel>
        <Reveal className="mb-8 max-w-[62ch] text-[16px] leading-[1.65] text-ink-soft md:mb-10 md:text-[17px]">
          {CONFIG.workIntro}
        </Reveal>

        <div className="space-y-0">
          {CONFIG.projects.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              index={i}
              onOpen={() => openAt(p.id, "down")}
            />
          ))}
        </div>

        <Reveal id="experience" className="work-experience">
          <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink-faint md:text-[13px]">
            {CONFIG.experience.label}
          </h3>
          <p className="mt-2 mb-8 max-w-[62ch] text-[15px] leading-[1.65] text-ink-soft">
            {CONFIG.experience.note}
          </p>

          <div className="space-y-10 border-t border-[var(--color-rule)] pt-8">
            {CONFIG.experience.companies.map((company) => {
              const builds =
                company.buildsKey === "careerBreak" ? CONFIG.careerBreak.builds : null;
              return (
                <article
                  key={company.id ?? company.org}
                  id={company.id ? `experience-${company.id}` : undefined}
                  className="experience-entry px-1"
                >
                  <div className="experience-company flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-display text-[1.5rem] leading-none md:text-[1.75rem]">
                      {company.org}
                    </h4>
                    {company.location && (
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
                        {company.location}
                      </span>
                    )}
                  </div>

                  <div className="experience-roles mt-5 space-y-6 border-l border-[var(--color-rule)] py-0.5 pl-4 pr-2 md:pl-5 md:pr-3">
                    {company.roles.map((role) => (
                      <div key={`${role.title}-${role.type}-${role.period}`}>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h5 className="text-[15px] font-semibold text-ink md:text-base">
                            {role.title}
                          </h5>
                          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                            {role.type}
                          </span>
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                          {role.period}
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {role.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex gap-3 text-[15px] leading-[1.65] text-ink-soft"
                            >
                              <span className="mt-[9px] h-[2px] w-3 shrink-0 bg-accent" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {builds && (
                    <ul className="experience-builds mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                      {builds.map((build) => (
                        <li key={build.url}>
                          <a
                            href={build.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block overflow-hidden border border-[var(--color-rule)] transition-colors hover:border-accent"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-deep)]">
                              <img
                                src={build.image}
                                alt={build.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                              />
                              <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80" />
                              <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/90">
                                {build.name}
                              </span>
                            </div>
                            <div className="px-3 py-3">
                              <p className="font-display text-[15px] leading-snug transition-colors group-hover:text-accent">
                                {build.title}
                              </p>
                              <p className="mt-1 font-mono text-[9.5px] leading-relaxed tracking-[0.04em] text-ink-faint">
                                {build.spec}
                              </p>
                              <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint group-hover:text-accent">
                                Marketplace
                                <Icon
                                  name="arrow"
                                  className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal id="education" className="work-education mt-14 md:mt-16">
          <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink-faint md:text-[13px]">
            {CONFIG.education.label}
          </h3>
          <p className="mt-2 mb-8 max-w-[62ch] text-[15px] leading-[1.65] text-ink-soft">
            {CONFIG.education.note}
          </p>
          <div className="space-y-8 border-t border-[var(--color-rule)] pt-8">
            {CONFIG.education.entries.map((entry) => (
              <article key={entry.org} className="education-entry px-1">
                <h4 className="font-display text-[1.35rem] leading-none md:text-[1.5rem]">
                  {entry.org}
                </h4>
                <ul className="mt-3 space-y-2.5 border-l border-[var(--color-rule)] pl-4 md:pl-5">
                  {entry.items.map((item) => (
                    <li key={`${item.title}-${item.period}`}>
                      <p className="text-[15px] font-medium text-ink md:text-base">{item.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        {item.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          index={openIndex}
          total={CONFIG.projects.length}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}

/* ------------------------------- capability ------------------------------- */

function schematicPath(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  if (dx > dy) {
    const bend = Math.max(48, dx * 0.42);
    return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
  }
  const drop = Math.max(36, dy * 0.45);
  return `M ${x1} ${y1} C ${x1} ${y1 + drop}, ${x2} ${y2 - drop}, ${x2} ${y2}`;
}

function Capability({ onNavigate }) {
  const { skills } = CONFIG;
  const reduced = usePrefersReducedMotion();
  const boardRef = useRef(null);
  const skillPortRefs = useRef({});
  const projectPortRefs = useRef({});
  const workplacePortRefs = useRef({});
  const [focus, setFocus] = useState(null);
  const [wires, setWires] = useState([]);
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });

  const projectsById = useMemo(
    () => Object.fromEntries(CONFIG.projects.map((p) => [p.id, p])),
    []
  );
  const workplaces = skills.workplaces ?? [];
  const workplaceIds = useMemo(() => new Set(workplaces.map((w) => w.id)), [workplaces]);
  const workplacesById = useMemo(
    () => Object.fromEntries(workplaces.map((w) => [w.id, w])),
    [workplaces]
  );
  const orgsOf = (item) => (item?.orgs ?? []).filter((id) => workplaceIds.has(id));

  const skillsByProject = useMemo(() => {
    const map = {};
    skills.groups.forEach((g) => {
      g.items.forEach((item) => {
        item.used.forEach((id) => {
          if (!map[id]) map[id] = [];
          map[id].push(item.name);
        });
      });
    });
    return map;
  }, [skills.groups]);

  const skillsByWorkplace = useMemo(() => {
    const map = {};
    skills.groups.forEach((g) => {
      g.items.forEach((item) => {
        orgsOf(item).forEach((id) => {
          if (!map[id]) map[id] = [];
          map[id].push(item.name);
        });
      });
    });
    return map;
  }, [skills.groups, workplaceIds]);

  const skillByName = useMemo(() => {
    const map = {};
    skills.groups.forEach((g) => g.items.forEach((item) => (map[item.name] = item)));
    return map;
  }, [skills.groups]);

  const linkedSkillNames = useMemo(() => {
    if (!focus) return null;
    if (focus.type === "skill") return new Set([focus.name]);
    if (focus.type === "workplace") return new Set(skillsByWorkplace[focus.id] ?? []);
    return new Set(skillsByProject[focus.id] ?? []);
  }, [focus, skillsByProject, skillsByWorkplace]);

  const linkedProjectIds = useMemo(() => {
    if (!focus) return null;
    if (focus.type === "project") return new Set([focus.id]);
    if (focus.type === "skill") return new Set(skillByName[focus.name]?.used ?? []);
    return new Set();
  }, [focus, skillByName]);

  const linkedWorkplaceIds = useMemo(() => {
    if (!focus) return null;
    if (focus.type === "workplace") return new Set([focus.id]);
    if (focus.type === "skill") return new Set(orgsOf(skillByName[focus.name]));
    return new Set();
  }, [focus, skillByName, workplaceIds]);

  const recomputeWires = useCallback(() => {
    const board = boardRef.current;
    if (!board || !focus) {
      setWires([]);
      return;
    }
    const br = board.getBoundingClientRect();
    setBoardSize({ w: br.width, h: br.height });

    const pairs = [];
    const fromSkill = (name, toEl, key) => {
      const fromEl = skillPortRefs.current[name];
      if (!fromEl || !toEl) return;
      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();
      pairs.push({
        key,
        d: schematicPath(
          fr.left + fr.width / 2 - br.left,
          fr.top + fr.height / 2 - br.top,
          tr.left + tr.width / 2 - br.left,
          tr.top + tr.height / 2 - br.top
        ),
      });
    };

    if (focus.type === "skill") {
      const skill = skillByName[focus.name];
      if (!skill) {
        setWires([]);
        return;
      }
      skill.used.forEach((id) =>
        fromSkill(focus.name, projectPortRefs.current[id], `${focus.name}-p-${id}`)
      );
      orgsOf(skill).forEach((id) =>
        fromSkill(focus.name, workplacePortRefs.current[id], `${focus.name}-w-${id}`)
      );
    } else if (focus.type === "project") {
      (skillsByProject[focus.id] ?? []).forEach((name) =>
        fromSkill(name, projectPortRefs.current[focus.id], `${name}-p-${focus.id}`)
      );
    } else {
      (skillsByWorkplace[focus.id] ?? []).forEach((name) =>
        fromSkill(name, workplacePortRefs.current[focus.id], `${name}-w-${focus.id}`)
      );
    }
    setWires(pairs);
  }, [focus, skillByName, skillsByProject, skillsByWorkplace]);

  useLayoutEffect(() => {
    recomputeWires();
  }, [recomputeWires]);

  useEffect(() => {
    if (!focus) return;
    const onResize = () => recomputeWires();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [focus, recomputeWires]);

  const clearFocus = () => setFocus(null);
  const toggleSkill = (name) =>
    setFocus((prev) => (prev?.type === "skill" && prev.name === name ? null : { type: "skill", name }));
  const openCaseStudy = (e, id) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("ks:open-case-study", { detail: { id } }));
  };
  const openExperience = (e) => {
    e.preventDefault();
    onNavigate?.("experience");
  };

  const nodeState = (name) => {
    if (!linkedSkillNames) return "";
    if (linkedSkillNames.has(name)) return "is-lit";
    return "is-dim";
  };

  const projectState = (id) => {
    if (!linkedProjectIds) return "";
    if (linkedProjectIds.has(id)) return "is-lit";
    return "is-dim";
  };

  const workplaceState = (id) => {
    if (!linkedWorkplaceIds) return "";
    if (linkedWorkplaceIds.has(id)) return "is-lit";
    return "is-dim";
  };

  return (
    <section
      id="capability"
      className="panel-page relative flex min-h-[100svh] flex-col justify-center overflow-x-clip px-5 py-12 md:px-8 md:py-14 lg:px-10 lg:py-16"
    >
      <div className="capability-sheet" aria-hidden="true">
        <span className="capability-sheet-grid" />
        <span className="capability-sheet-mark tl">03 · SCHEMATIC</span>
        <span className="capability-sheet-mark br">A3 · 1:1</span>
      </div>
      <div className="relative z-[1] mx-auto w-full max-w-none">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-[var(--color-rule)] pb-3 md:mb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[12px] font-medium tracking-[0.22em] text-accent md:text-[13px]">
              03
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-ink md:text-[13px]">
              {skills.label}
            </span>
          </div>
          <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-2">
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
          </div>
        </div>

        <p className="capability-intro mb-4 text-[14px] leading-[1.45] text-ink-soft md:mb-5 md:text-[15px] lg:text-[15.5px]">
          {skills.note}
        </p>

        <div
          ref={boardRef}
          className={`capability-board${focus ? " has-focus" : ""}`}
          onMouseLeave={clearFocus}
        >
          <svg
            className="capability-wires"
            width={boardSize.w}
            height={boardSize.h}
            viewBox={`0 0 ${boardSize.w || 1} ${boardSize.h || 1}`}
            aria-hidden="true"
          >
            {wires.map((w, i) => (
              <path
                key={w.key}
                d={w.d}
                className={`capability-wire${reduced ? " is-static" : ""}`}
                style={{ animationDelay: `${i * 40}ms` }}
              />
            ))}
          </svg>

          <div className="capability-main">
            <div className="capability-modules">
              {skills.groups.map((group, gi) => (
                <Reveal key={group.name} delay={gi * 60} className="capability-module">
                  <div className="capability-module-frame" aria-hidden="true">
                    <span className="cm-corner tl" />
                    <span className="cm-corner tr" />
                    <span className="cm-corner bl" />
                    <span className="cm-corner br" />
                  </div>
                  <header className="capability-module-head">
                    <span className="font-mono text-[10px] text-accent">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[15px] md:text-base">{group.name}</span>
                    <span className="capability-module-tag">MODULE</span>
                  </header>
                  <ul className="capability-node-list">
                    {group.items.map((item) => {
                      const active =
                        focus?.type === "skill" && focus.name === item.name;
                      return (
                        <li key={item.name}>
                          <button
                            type="button"
                            className={`capability-node ${nodeState(item.name)}${
                              active ? " is-active" : ""
                            }`}
                            onMouseEnter={() => setFocus({ type: "skill", name: item.name })}
                            onFocus={() => setFocus({ type: "skill", name: item.name })}
                            onClick={() => toggleSkill(item.name)}
                            aria-pressed={active}
                            aria-label={`${item.name}, level ${item.level} of 3${
                              item.used.length
                                ? `, used in ${item.used.map((id) => projectsById[id]?.title ?? id).join(", ")}`
                                : ""
                            }${
                              orgsOf(item).length
                                ? `, at ${orgsOf(item).map((id) => workplacesById[id]?.name ?? id).join(", ")}`
                                : ""
                            }`}
                          >
                            <span
                              ref={(el) => {
                                skillPortRefs.current[item.name] = el;
                              }}
                              className="capability-port"
                              aria-hidden="true"
                            />
                            <span className="capability-node-name">{item.name}</span>
                            <span className="capability-level" aria-hidden="true">
                              {[1, 2, 3].map((n) => (
                                <span
                                  key={n}
                                  className={n <= item.level ? "is-on" : ""}
                                />
                              ))}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal delay={220} className="capability-bus capability-bus-deliverable">
              <div className="capability-bus-rail" aria-hidden="true" />
              <header className="capability-bus-head">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Deliverable bus
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                  Live systems
                </span>
              </header>
              <ul className="capability-projects">
                {CONFIG.projects.map((project) => {
                  const active = focus?.type === "project" && focus.id === project.id;
                  const count = skillsByProject[project.id]?.length ?? 0;
                  return (
                    <li key={project.id} className={`capability-project ${projectState(project.id)}${active ? " is-active" : ""}`}>
                      <a
                        href={`#work/${project.id}`}
                        className="capability-project-hit"
                        onMouseEnter={() => setFocus({ type: "project", id: project.id })}
                        onFocus={() => setFocus({ type: "project", id: project.id })}
                        onClick={(e) => openCaseStudy(e, project.id)}
                        aria-label={`${project.title}, linked to ${count} capabilities. Open case study.`}
                      >
                        <span
                          ref={(el) => {
                            projectPortRefs.current[project.id] = el;
                          }}
                          className="capability-port capability-port-bus"
                          aria-hidden="true"
                        />
                        <span className="capability-project-copy">
                          <span className="capability-project-title">{project.title}</span>
                          <span className="capability-project-sub">{project.subtitle}</span>
                          <span className="capability-project-jump">Open in Work</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={280} className="capability-bus capability-bus-workplace">
            <div className="capability-bus-rail" aria-hidden="true" />
            <header className="capability-bus-head">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Workplace bus
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                Employers
              </span>
            </header>
            <ul className="capability-projects capability-workplaces">
              {workplaces.map((place) => {
                const active = focus?.type === "workplace" && focus.id === place.id;
                const count = skillsByWorkplace[place.id]?.length ?? 0;
                return (
                  <li
                    key={place.id}
                    className={`capability-project ${workplaceState(place.id)}${active ? " is-active" : ""}`}
                  >
                    <a
                      href="#experience"
                      className="capability-project-hit"
                      onMouseEnter={() => setFocus({ type: "workplace", id: place.id })}
                      onFocus={() => setFocus({ type: "workplace", id: place.id })}
                      onClick={openExperience}
                      aria-label={`${place.name}, linked to ${count} capabilities. Jump to Experience.`}
                    >
                      <span
                        ref={(el) => {
                          workplacePortRefs.current[place.id] = el;
                        }}
                        className="capability-port capability-port-bus"
                        aria-hidden="true"
                      />
                      <span className="capability-project-copy">
                        <span className="capability-project-title">{place.name}</span>
                        <span className="capability-project-sub">{place.kind}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- numbers -------------------------------- */

function Counter({ stat, index }) {
  const [ref, value] = useCountUp(stat.value, { decimals: stat.decimals, duration: 2100 });
  return (
    <Reveal delay={index * 110} className="numbers-stat border-t-2 border-ink pt-4">
      <div ref={ref} className="numbers-stat-value font-display text-[clamp(2.8rem,6vw,4.6rem)] leading-none">
        <span className="numbers-stat-glow" aria-hidden />
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
            <div className="numbers-bar h-[6px] w-full bg-[var(--color-paper-deep)]">
              <div
                className="numbers-bar-fill h-full bg-accent transition-[width] duration-[1400ms] ease-out"
                style={{
                  width: shown ? `${item.weight}%` : "0%",
                  transitionDelay: `${i * 140}ms`,
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
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();
  const boxRef = useRef(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (reduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

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
    <div ref={boxRef}>
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
            {row.cells.map((cell, ci) => {
              const ratio = cell.count / max;
              return (
                <span
                  key={`${cell.year}-${cell.month}`}
                  onMouseEnter={() => setTip(cell)}
                  onMouseLeave={() => setTip(null)}
                  className={`heatmap-cell h-[clamp(12px,2.1vw,22px)] w-[clamp(12px,2.1vw,22px)] cursor-crosshair transition-transform duration-200 hover:scale-110${
                    reduced ? " is-static" : ""
                  }`}
                  style={{
                    background:
                      cell.count === 0
                        ? "var(--color-paper-deep)"
                        : `rgba(var(--stroke-accent), ${0.18 + ratio * 0.72})`,
                    outline: tip === cell ? "1px solid var(--color-ink)" : "none",
                    animationDelay: !reduced ? `${(row.year - from) * 90 + ci * 18}ms` : undefined,
                    animationPlayState: shown || reduced ? "running" : "paused",
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
               : {tip.count} active {tip.count === 1 ? "engagement" : "engagements"}
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
      CONFIG.engagements.map((e, i) => {
        const startIdx = (e.start[0] - from) * 12 + (e.start[1] - 1);
        // Ongoing engagements stop at today, not at the end of the chart.
        const endIdx = e.end ? (e.end[0] - from) * 12 + e.end[1] : nowIdx;
        return {
          ...e,
          id: `${e.name}-${e.start[0]}-${e.start[1]}-${e.kind}-${i}`,
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
            Up to <span className="text-accent">{peak} engagements running at once</span>:
            freelance products beside salaried seasons, plus a degree.
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
              key={r.id}
              onMouseEnter={() => setActive(r.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === r.id ? null : r.id)}
              className="flex h-12 cursor-pointer flex-col justify-center pr-2"
            >
              <span
                className={`truncate text-[12.5px] leading-tight transition-colors duration-200 ${
                  active === r.id ? "text-accent" : ""
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
              className="timeline-now absolute top-6 bottom-0 border-l border-dashed border-accent/50"
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
            const isActive = active === r.id;
            const dim = active && !isActive;
            return (
              <div
                key={r.id}
                onMouseEnter={() => setActive(r.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === r.id ? null : r.id)}
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

      {/* Detail strip: fixed height so hovering never shifts layout */}
      <div className="mt-5 flex h-14 items-start border-t border-[var(--color-rule)] pt-3">
        {active ? (
          (() => {
            const r = rows.find((x) => x.id === active);
            return (
              <div className="text-[12.5px] leading-relaxed">
                <span className="text-accent">{r.role}</span>
                <span className="text-ink-faint">
                  {" "}
                 : {formatMonth(r.start)} to {r.end ? formatMonth(r.end) : "present"} ·{" "}
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

function Numbers({ reduced, blueprint }) {
  return (
    <section
      id="numbers"
      className="panel-free relative overflow-hidden border-y border-[var(--color-rule)] bg-[var(--color-paper-deep)]/40"
    >
      <InkField reduced={reduced} blueprint={blueprint} />

      <div className="relative z-[1] mx-auto max-w-[1400px] px-5 pb-14 pt-24 md:px-12 md:pb-20 md:pt-28">
        <SectionLabel index="04">{CONFIG.stats.label}</SectionLabel>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CONFIG.stats.counters.map((stat, i) => (
            <Counter key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-20">
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

const QUEUE_TICKETS = [
  { label: "EXCEL", pts: 10, rgb: "34, 197, 94" },
  { label: "PAPER", pts: 12, rgb: "212, 168, 92" },
  { label: "OCR", pts: 14, rgb: "14, 165, 233" },
  { label: "PRICE", pts: 16, rgb: "234, 179, 8" },
  { label: "BOOK", pts: 12, rgb: "167, 139, 250" },
  { label: "DEPLOY", pts: 20, rgb: "11, 118, 159" },
  { label: "AI", pts: 22, rgb: "244, 114, 182" },
  { label: "LLM", pts: 20, rgb: "56, 189, 248" },
  { label: "AGENT", pts: 24, rgb: "132, 204, 22" },
  { label: "RAG", pts: 18, rgb: "251, 146, 60" },
  { label: "CLOUD", pts: 16, rgb: "125, 211, 252" },
  { label: "GPU", pts: 22, rgb: "251, 113, 133" },
  { label: "EDGE", pts: 16, rgb: "45, 212, 191" },
  { label: "VECTOR", pts: 18, rgb: "129, 140, 248" },
  { label: "MCP", pts: 20, rgb: "52, 211, 153" },
  { label: "TOKEN", pts: 14, rgb: "250, 204, 21" },
];

function queueBest() {
  try {
    return Number(window.localStorage.getItem("ks-queue-best") || 0);
  } catch {
    return 0;
  }
}

function writeQueueBest(n) {
  try {
    window.localStorage.setItem("ks-queue-best", String(n));
  } catch {
    /* ignore */
  }
}

/** Catch falling backlog tickets. Ambient mode auto-plays; fullscreen is you. */
function QueueArcade({ reduced, playing, onExit }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [hud, setHud] = useState(() => ({
    score: 0,
    lives: 3,
    combo: 0,
    best: 0,
  }));
  const [over, setOver] = useState(false);
  const restartRef = useRef(() => {});

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    let running = true;
    let last = 0;
    const ship = { x: 0.5 };
    const keys = { left: false, right: false };
    const pointer = { x: 0.5, on: false };
    let tickets = [];
    let sparks = [];
    let spawn = 0;
    let score = 0;
    let lives = 3;
    let combo = 0;
    let dead = false;
    let best = queueBest();

    const palette = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        ink: s.getPropertyValue("--stroke-ink").trim() || "20, 17, 15",
        accent: s.getPropertyValue("--stroke-accent").trim() || "11, 118, 159",
      };
    };

    const syncHud = () => setHud({ score, lives, combo, best });

    const reset = () => {
      tickets = [];
      sparks = [];
      spawn = 0;
      score = 0;
      lives = 3;
      combo = 0;
      dead = false;
      ship.x = 0.5;
      setOver(false);
      syncHud();
    };
    restartRef.current = reset;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, reduced ? 1 : 1.5);
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnOne = () => {
      const job = QUEUE_TICKETS[Math.floor(Math.random() * QUEUE_TICKETS.length)];
      const speed = (playing ? 155 : 62) + Math.random() * 40 + score * (playing ? 1.1 : 0.25);
      tickets.push({
        label: job.label,
        pts: job.pts,
        rgb: job.rgb,
        x: 0.1 + Math.random() * 0.8,
        y: -30,
        vy: reduced ? speed * 0.45 : speed,
        w: Math.max(playing ? 86 : 72, job.label.length * (playing ? 8.6 : 7.4) + 18),
        h: playing ? 28 : 22,
      });
    };

    if (playing) reset();
    else {
      best = queueBest();
      syncHud();
      for (let i = 0; i < 4; i++) {
        spawnOne();
        tickets[i].y = 40 + i * (h / 5 || 80);
      }
    }

    const burst = (x, y, rgb, n = 8) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * (40 + Math.random() * 80),
          vy: Math.sin(a) * (40 + Math.random() * 80),
          life: 1,
          rgb,
        });
      }
    };

    const draw = (now) => {
      if (!running) return;
      const dt = last ? Math.min(0.033, (now - last) / 1000) : 0.016;
      last = now;
      const { ink, accent } = palette();

      if (!dead && !reduced) {
        spawn += dt;
        const gap = playing ? Math.max(0.28, 0.72 - score * 0.004) : 1.15;
        if (spawn > gap) {
          spawn = 0;
          spawnOne();
        }
      } else if (reduced && tickets.length < 3) {
        spawnOne();
      }

      const shipW = playing ? 108 : 86;
      const shipY = h - (playing ? 58 : 48);

      if (!dead) {
        if (playing) {
          if (keys.left) ship.x -= dt * 1.35;
          if (keys.right) ship.x += dt * 1.35;
          if (pointer.on) ship.x += (pointer.x - ship.x) * 0.28;
        } else {
          let threat = null;
          let threatY = -999;
          tickets.forEach((t) => {
            if (t.y > threatY) {
              threat = t;
              threatY = t.y;
            }
          });
          const target = threat ? threat.x : 0.5;
          ship.x += (target - ship.x) * (reduced ? 0 : 0.1);
        }
        ship.x = Math.min(0.92, Math.max(0.08, ship.x));
      }

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = `rgba(${accent}, ${playing ? 0.14 : 0.2})`;
      ctx.lineWidth = 1;
      for (let x = 40; x < w; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(${accent}, ${playing ? 0.45 : 0.22})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(16, shipY + 18);
      ctx.lineTo(w - 16, shipY + 18);
      ctx.stroke();
      ctx.setLineDash([]);

      tickets.forEach((t) => {
        if (!dead && !reduced) t.y += t.vy * dt;
        const tx = t.x * w;
        const caught =
          !dead &&
          t.y + t.h > shipY - 10 &&
          t.y < shipY + 14 &&
          Math.abs(tx - ship.x * w) < shipW * 0.52 + t.w * 0.35;

        if (caught) {
          t.gone = true;
          combo += 1;
          score += t.pts * Math.max(1, combo);
          if (score > best) {
            best = score;
            if (playing) writeQueueBest(best);
          }
          burst(tx, t.y + t.h / 2, t.rgb, 10);
          if (playing) syncHud();
          return;
        }

        if (t.y > h + 20) {
          t.gone = true;
          if (playing && !dead) {
            combo = 0;
            lives -= 1;
            burst(tx, h - 24, t.rgb, 6);
            syncHud();
            if (lives <= 0) {
              dead = true;
              setOver(true);
            }
          }
          return;
        }

        const rgb = t.rgb || accent;
        const glow = playing ? 0.88 : 0.72;
        ctx.save();
        ctx.shadowColor = `rgba(${rgb}, ${playing ? 0.95 : 0.8})`;
        ctx.shadowBlur = playing ? 18 : 14;
        ctx.fillStyle = `rgba(${rgb}, ${playing ? 0.16 : 0.14})`;
        ctx.strokeStyle = `rgba(${rgb}, ${glow})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.roundRect(tx - t.w / 2, t.y, t.w, t.h, 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = `rgba(${rgb}, ${playing ? 1 : 0.92})`;
        ctx.font = `600 ${playing ? 11 : 9}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(t.label, tx, t.y + t.h / 2 + 0.5);
      });
      tickets = tickets.filter((t) => !t.gone);

      sparks.forEach((s) => {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= dt * 1.8;
        ctx.fillStyle = `rgba(${s.rgb || accent}, ${Math.max(0, s.life)})`;
        ctx.fillRect(s.x, s.y, 2, 2);
      });
      sparks = sparks.filter((s) => s.life > 0);

      const sx = ship.x * w;
      ctx.save();
      ctx.translate(sx, shipY);
      ctx.fillStyle = `rgba(${accent}, ${playing ? 0.95 : 0.55})`;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(shipW / 2, 10);
      ctx.lineTo(-shipW / 2, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = `rgba(${ink}, ${playing ? 0.8 : 0.45})`;
      ctx.font = `600 9px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.fillText("SHIP", sx, shipY + 6);

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    const onMove = (e) => {
      if (!playing) return;
      const r = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.on = true;
    };
    const onKey = (e) => {
      if (!playing) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = e.type === "keydown";
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = e.type === "keydown";
    };

    window.addEventListener("resize", onResize);
    wrap.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [reduced, playing]);

  return (
    <div
      ref={wrapRef}
      className={`queue-arcade${playing ? " is-play" : ""}`}
      aria-hidden={!playing}
    >
      <canvas ref={canvasRef} />
      {!playing && <div className="queue-arcade-veil" />}
      {playing && (
        <div className="queue-hud">
          <div className="queue-hud-top">
            <div className="queue-hud-stat">
              Hours saved
              <strong>{hud.score}</strong>
            </div>
            <div className="queue-hud-stat" style={{ textAlign: "center" }}>
              Combo
              <strong>×{Math.max(1, hud.combo)}</strong>
            </div>
            <div className="queue-hud-stat" style={{ textAlign: "right" }}>
              Best {hud.best}
              <strong>{"●".repeat(Math.max(0, hud.lives))}{"○".repeat(Math.max(0, 3 - hud.lives))}</strong>
            </div>
          </div>
          <div className="queue-hud-bottom">
            <span className="queue-hud-stat">Move · A D or pointer</span>
            <button type="button" onClick={onExit}>
              Close · Esc
            </button>
          </div>
        </div>
      )}
      {playing && over && (
        <div className="queue-over">
          <h3>Queue leaked</h3>
          <p>Score {hud.score} · Best {hud.best}</p>
          <div className="mt-2 flex gap-3">
            <button type="button" onClick={() => restartRef.current()}>
              Play again
            </button>
            <button type="button" onClick={onExit}>
              Back to contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const { contact, identity } = CONFIG;
  const reduced = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  useEffect(() => {
    if (!playing) return undefined;
    const y = window.scrollY;
    document.body.dataset.modalOpen = "1";
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      setPlaying(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      delete document.body.dataset.modalOpen;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [playing]);

  return (
    <section
      id="contact"
      className="panel-page relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden"
    >
      <QueueArcade reduced={reduced} playing={playing} onExit={() => setPlaying(false)} />
      {!playing && (
        <button type="button" className="queue-start" onClick={() => setPlaying(true)}>
          <span className="queue-start-side" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="queue-start-label">Start game</span>
          <span className="queue-start-side is-end" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </button>
      )}

      <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col justify-center overflow-y-auto px-5 py-6 md:overflow-visible md:px-12 md:py-10">
        <SectionLabel index="05">{contact.label}</SectionLabel>

        <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-[clamp(1.85rem,5.5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]">
              {contact.heading[0]}
              <br />
              <span className="italic text-accent">{contact.heading[1]}</span>
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-ink-soft md:mt-5 md:text-[16px]">
              {contact.blurb}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-7 md:gap-4">
              <a
                href={`mailto:${identity.email}`}
                className="group relative overflow-hidden border border-ink px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] md:px-7 md:py-3.5"
              >
                <span className="relative z-10 transition-colors duration-400 group-hover:text-paper">
                  {contact.cta}
                </span>
                <span className="absolute inset-0 -translate-y-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
              <a
                href={`${import.meta.env.BASE_URL}cv/Kishan-Sobhee-Resume.docx`}
                download="Kishan-Sobhee-Resume.docx"
                className="border border-[var(--color-rule)] px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] transition-colors hover:border-accent hover:text-accent md:px-7 md:py-3.5"
              >
                Download CV
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
                    className="group flex items-center justify-between gap-3 py-2.5 sm:gap-6"
                  >
                    {Row}
                  </a>
                ) : (
                  <div key={row.k} className="group flex items-center justify-between gap-3 py-2.5 sm:gap-6">
                    {Row}
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </div>

      <footer className="relative z-[1] shrink-0 border-t border-[var(--color-rule)] px-5 py-3.5 md:px-12 md:py-4">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint md:text-[10px]">
            © {new Date().getFullYear()} {CONFIG.identity.fullName}
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint md:text-[10px]">
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
  const { curtain, navigateTo, runCurtain } = useImmersiveScroll(reduced);

  return (
    <div className="relative min-h-screen">
      <PageCurtain curtain={curtain} />
      {blueprintOn && (
        <div className="sheet-frame" aria-hidden>
          <span className="tl" />
          <span className="tr" />
          <span className="bl" />
          <span className="br" />
        </div>
      )}
      <Nav
        progress={progress}
        active={active}
        blueprintOn={blueprintOn}
        onToggleBlueprint={() => setBlueprintOn((v) => !v)}
        onNavigate={navigateTo}
      />
      <SectionRail active={active} onNavigate={navigateTo} />
      <main>
        <Hero reduced={reduced} blueprint={blueprintOn} />
        <About />
        <Work runCurtain={runCurtain} />
        <Capability onNavigate={navigateTo} />
        <Numbers reduced={reduced} blueprint={blueprintOn} />
        <Contact />
      </main>
    </div>
  );
}
