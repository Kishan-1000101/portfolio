import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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
    eyebrow: "Full-stack developer — Mauritius & Réunion",
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
      { k: "Working with", v: "Mauritius · Réunion · Remote" },
      { k: "Education", v: "BSc (Hons) Software Engineering, UTM" },
      { k: "Languages", v: "English (fluent) · French (working)" },
    ],
  },

  /* Case studies. Add an object here and a new numbered row appears. */
  projects: [
    {
      id: "keycars",
      title: "KeyCars",
      subtitle: "Multi-tenant car rental platform",
      client: "Agence ISCL",
      year: "2025 —",
      role: "Lead developer",
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
      year: "2025 —",
      role: "Full-stack developer & project manager",
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
      year: "2026 —",
      role: "Full-stack developer",
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
      client: "Agence ISCL",
      year: "2025 —",
      role: "Full-stack developer",
      problem:
        "The agency rebuilt every client report by hand each month, pulling revenue, Google Analytics and social performance into slides that were stale the moment they were sent.",
      approach:
        "A white-label multi-tenant dashboard on React and Supabase, with per-client routing, editable layouts, custom metrics and agency branding. Scheduled n8n workflows collect marketing and operational data into Supabase continuously, and saved dashboard versions let anyone compare periods.",
      result:
        "Client reporting became continuous instead of a monthly manual exercise, with historical snapshots for period-over-period comparison.",
      stack: ["React", "TypeScript", "Supabase", "n8n", "Tailwind"],
      highlights: [
        { k: "Tenancy", v: "Per-client slugs" },
        { k: "Data", v: "Scheduled ingestion" },
        { k: "History", v: "Versioned snapshots" },
      ],
    },
  ],

  /* Capability index. `level`: 3 = daily, 2 = builds with, 1 = prior/enterprise.
     `used` cross-references project ids above. */
  skills: {
    label: "Capability index",
    note: "Levelled honestly. Everything at three, I use every week and can be interviewed on.",
    groups: [
      {
        name: "Backend",
        items: [
          { name: "PHP", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "Laravel", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "MySQL", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "REST APIs", level: 3, used: ["keycars", "zilmall", "analytics"] },
          { name: "Node.js", level: 2, used: [] },
          { name: "Python", level: 2, used: [] },
          { name: "PostgreSQL / Supabase", level: 2, used: ["analytics"] },
          { name: "PL/SQL", level: 1, used: [] },
        ],
      },
      {
        name: "Frontend",
        items: [
          { name: "React", level: 3, used: ["keycars", "zilmall", "mrprod", "analytics"] },
          { name: "TypeScript", level: 3, used: ["keycars", "zilmall", "analytics"] },
          { name: "Inertia.js", level: 3, used: ["zilmall", "mrprod"] },
          { name: "Tailwind CSS", level: 3, used: ["mrprod", "analytics"] },
          { name: "Filament", level: 3, used: ["mrprod"] },
          { name: "MUI", level: 2, used: ["keycars"] },
          { name: "Angular", level: 1, used: [] },
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
        ],
      },
      {
        name: "Delivery & tooling",
        items: [
          { name: "Git", level: 3, used: [] },
          { name: "AI-assisted dev (Cursor)", level: 3, used: ["keycars", "zilmall", "mrprod"] },
          { name: "OVH deployment", level: 3, used: ["mrprod", "keycars"] },
          { name: "n8n automation", level: 2, used: ["analytics"] },
          { name: "Docker", level: 2, used: [] },
          { name: "Nginx / Linux", level: 2, used: ["mrprod"] },
          { name: "Salesforce (Apex, SOQL)", level: 1, used: [] },
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
      { value: 6, suffix: "", decimals: 0, label: "Production systems shipped", sub: "Live and maintained" },
      { value: 6, suffix: "", decimals: 0, label: "Organisations delivered for", sub: "Agency, product & enterprise" },
      { value: 3, suffix: "", decimals: 0, label: "Markets served", sub: "Mauritius · Réunion · France" },
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
    { name: "Business Force Limited", start: [2023, 2], end: [2024, 9], kind: "Full-time" },
    { name: "Agileum", start: [2025, 1], end: [2026, 4], kind: "Full-time → freelance" },
    { name: "Safyr Utilis", start: [2025, 2], end: [2025, 11], kind: "Freelance" },
    { name: "Agence ISCL", start: [2025, 6], end: null, kind: "Full-time → freelance" },
    { name: "ZilMall", start: [2025, 10], end: null, kind: "Freelance" },
    { name: "MR Production", start: [2026, 2], end: null, kind: "Freelance" },
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
    hint: "Type “grid”",
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

/** Type CONFIG.easterEgg.sequence anywhere to toggle blueprint mode. */
function useBlueprintMode(sequence) {
  const [on, setOn] = useState(false);
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

function Nav({ progress }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-bp="header"
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        solid ? "bg-paper/85 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl leading-none">KS</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint sm:inline">
            {CONFIG.identity.role}
          </span>
        </a>
        <nav className="flex items-center gap-5 md:gap-7">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative hidden font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink sm:block"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-400 group-hover:w-full" />
            </a>
          ))}
          <a
            href={`mailto:${CONFIG.identity.email}`}
            className="border border-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Get in touch
          </a>
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
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28"
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
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-36"
    >
      <SectionLabel index="01">{about.label}</SectionLabel>

      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-7">
          <p className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.15] tracking-[-0.01em]">
            {about.lead}
          </p>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft">
            {about.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="md:col-span-5">
          <figure className="border-l-2 border-accent pl-6">
            <blockquote className="font-display text-2xl italic leading-snug">
              “{about.pullQuote}”
            </blockquote>
          </figure>
          <dl className="mt-10 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {about.facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {f.k}
                </dt>
                <dd className="text-right text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- work ---------------------------------- */

function ProjectRow({ project, index, open, onToggle }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Reveal
      as="article"
      delay={index * 60}
      className="group border-b border-[var(--color-rule)]"
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-start gap-5 py-7 text-left md:gap-10"
      >
        <span
          className={`mt-2 font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 ${
            open ? "text-accent" : "text-ink-faint"
          }`}
        >
          {num}
        </span>

        <span className="flex-1">
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3
              className={`font-display text-[clamp(1.8rem,4.4vw,3.4rem)] leading-none tracking-[-0.01em] transition-colors duration-300 ${
                open ? "text-accent" : "group-hover:text-accent"
              }`}
            >
              {project.title}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              {project.year}
            </span>
          </span>
          <span className="mt-2 block text-sm text-ink-soft">{project.subtitle}</span>
        </span>

        <span aria-hidden="true" className="relative mt-4 h-6 w-6 shrink-0">
          <span
            className={`absolute top-1/2 left-0 h-px w-6 transition-colors duration-300 ${
              open ? "bg-accent" : "bg-ink"
            }`}
          />
          <span
            className={`absolute top-1/2 left-0 h-px w-6 origin-center rotate-90 transition-all duration-500 ${
              open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100 bg-ink"
            }`}
          />
        </span>
      </button>

      <div className={`collapse-grid ${open ? "is-open" : ""}`}>
        <div className="collapse-inner">
          <div className="pb-10">
            <div className="grid gap-8 md:grid-cols-12 md:gap-10">
              <dl className="md:col-span-3">
                {[
                  { k: "Client", v: project.client },
                  { k: "Role", v: project.role },
                ].map((m) => (
                  <div key={m.k} className="mb-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      {m.k}
                    </dt>
                    <dd className="mt-1 text-sm">{m.v}</dd>
                  </div>
                ))}
                <div className="mt-6 flex flex-wrap gap-1.5">
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

              <div className="grid gap-7 md:col-span-9 md:grid-cols-3">
                {[
                  { k: "Problem", v: project.problem },
                  { k: "Approach", v: project.approach },
                  { k: "Result", v: project.result },
                ].map((block, i) => (
                  <div key={block.k}>
                    <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      <span className="h-px w-4 bg-accent" />
                      {block.k}
                    </h4>
                    <p className="text-[13.5px] leading-relaxed text-ink-soft">{block.v}</p>
                  </div>
                ))}
              </div>
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
      </div>
    </Reveal>
  );
}

function Work() {
  const [openId, setOpenId] = useState(CONFIG.projects[0]?.id ?? null);
  return (
    <section
      id="work"
      data-bp="work"
      className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
    >
      <SectionLabel index="02">Selected work</SectionLabel>
      <Reveal className="mb-10 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
        Four systems currently in production. Each one replaced a manual process that
        someone was doing by hand every week.
      </Reveal>

      <div className="border-t border-[var(--color-rule)]">
        {CONFIG.projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            open={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
          />
        ))}
      </div>
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
      className="group/skill border-b border-[var(--color-rule)] py-2.5"
    >
      <div className="flex items-center gap-3">
        <span className="flex-1 text-[13.5px] transition-colors duration-200 group-hover/skill:text-accent">
          {item.name}
        </span>
        <span className="flex gap-1" aria-label={`Level ${item.level} of 3`}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-[3px] w-5 transition-all duration-300 ${
                n <= item.level ? "bg-accent" : "bg-[var(--color-rule)]"
              } ${isHovered && n <= item.level ? "h-[5px]" : ""}`}
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
      className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
    >
      <SectionLabel index="03">{skills.label}</SectionLabel>

      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <Reveal className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
          {skills.note} Hover any capability to see where it shipped.
        </Reveal>
        <Reveal delay={80} className="flex flex-wrap gap-x-6 gap-y-2">
          {skills.legend.map((l) => (
            <div key={l.level} className="flex items-center gap-2">
              <span className="flex gap-1">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={`h-[3px] w-4 ${
                      n <= l.level ? "bg-accent" : "bg-[var(--color-rule)]"
                    }`}
                  />
                ))}
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                {l.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {skills.groups.map((group, gi) => (
          <Reveal key={group.name} delay={gi * 90}>
            <h3 className="mb-4 flex items-baseline gap-3 border-b border-ink pb-2">
              <span className="font-mono text-[10px] text-accent">
                {String(gi + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl">{group.name}</span>
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

function Timeline() {
  const { from, to } = CONFIG.timelineRange;
  const span = (to + 1 - from) * 12;
  return (
    <Reveal className="mt-8 border-t border-[var(--color-rule)] pt-8 md:mt-16">
      <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
        Engagement timeline
      </h3>
      <ul className="space-y-3">
        {CONFIG.engagements.map((e, i) => {
          const startVal = (e.start[0] - from) * 12 + (e.start[1] - 1);
          const endVal = e.end ? (e.end[0] - from) * 12 + e.end[1] : span;
          const left = (startVal / span) * 100;
          const width = ((endVal - startVal) / span) * 100;
          const ongoing = !e.end;
          return (
            <li key={e.name} className="grid grid-cols-12 items-center gap-3">
              <span className="col-span-4 truncate text-[12.5px] md:col-span-3">{e.name}</span>
              <span className="col-span-8 md:col-span-9">
                <span className="relative block h-[7px] w-full bg-[var(--color-paper-deep)]">
                  <span
                    className="absolute top-0 h-full transition-all duration-1000 ease-out"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background: ongoing ? "var(--color-accent)" : "var(--bar-past)",
                      transitionDelay: `${i * 80}ms`,
                    }}
                  />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex justify-between font-mono text-[9px] text-ink-faint">
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </Reveal>
  );
}

function Numbers() {
  return (
    <section
      id="numbers"
      data-bp="numbers"
      className="relative border-y border-[var(--color-rule)] bg-[var(--color-paper-deep)]/40"
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
    <section
      id="contact"
      data-bp="contact"
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-36"
    >
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
              { k: "Email", v: identity.email, href: `mailto:${identity.email}` },
              { k: "Phone", v: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}` },
              { k: "LinkedIn", v: identity.linkedinLabel, href: identity.linkedin },
              { k: "GitHub", v: identity.githubLabel, href: identity.github },
              { k: "Location", v: identity.location, href: null },
            ].map((row) => (
              <div key={row.k} className="group flex items-baseline justify-between gap-6 py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {row.k}
                </dt>
                <dd className="text-right text-sm">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="transition-colors group-hover:text-accent"
                    >
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer({ blueprintOn, onToggleBlueprint }) {
  return (
    <footer
      data-bp="footer"
      className="relative border-t border-[var(--color-rule)] px-6 py-8 md:px-12"
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          © {new Date().getFullYear()} {CONFIG.identity.fullName}
        </span>
        <button
          onClick={onToggleBlueprint}
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-accent"
          title="Toggle blueprint mode"
        >
          {blueprintOn ? "Blueprint on — Esc to exit" : `${CONFIG.easterEgg.hint} ↴`}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          Built in Mauritius
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------- root ---------------------------------- */

export default function Portfolio() {
  const reduced = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const [blueprintOn, setBlueprintOn] = useBlueprintMode(CONFIG.easterEgg.sequence);

  return (
    <div className="relative min-h-screen">
      <Nav progress={progress} />
      <main>
        <Hero reduced={reduced} blueprint={blueprintOn} />
        <About />
        <Work />
        <Capability />
        <Numbers />
        <Contact />
      </main>
      <Footer blueprintOn={blueprintOn} onToggleBlueprint={() => setBlueprintOn((v) => !v)} />
    </div>
  );
}
