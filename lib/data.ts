export interface Project {
  name: string;
  /** Lowercase stack line, e.g. "next.js, websockets". */
  stack: string;
  image: string;
  /** Deployed app. Every project listed here has one. */
  liveUrl: string;
  repoUrl: string;
  description: string;
  /** Pulled from the project's own README — no invented claims. */
  highlights: string[];
  /** Set when the project was built for an event listed in `hackathons`. */
  hackathon?: string;
}

export interface Hackathon {
  /** The event, exactly as the project README names it. */
  event: string;
  track?: string;
  /** What was built. */
  project: string;
  date?: string;
  summary: string;
  repoUrl: string;
  liveUrl?: string;
}

export interface ToolGroup {
  group: string;
  items: { name: string; note: string }[];
}

export interface Principle {
  title: string;
  body: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  status: string;
  email: string;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    whatsapp?: string;
  };
  projects: Project[];
  hackathons: Hackathon[];
  toolkit: ToolGroup[];
  principles: Principle[];
  stats: Stat[];
}

export const portfolioData: PortfolioData = {
  name: "Daodu Destiny Oluwatobiloba",
  role: "Software Engineer building scalable, high-performance web applications, robust APIs, and interactive digital products. Focused on clean architecture, resilient engineering, and exceptional user experiences.",
  status: "Open to software engineering roles — Remote-friendly",
  email: "daodudestiny56@gmail.com",
  socials: {
    github: "https://github.com/daodudestiny56-netizen",
    twitter: "https://x.com/DaYouNGdeboss/",
    linkedin: "https://www.linkedin.com/in/daodu-destiny-a483a6298/",
    whatsapp: "https://wa.me/2347070126096",
  },

  projects: [
    {
      name: "Crit Studio",
      stack: "next.js, webmcp, typescript",
      image: "/images/crit-studio.png",
      liveUrl: "https://critstudio.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/webgm",
      description:
        "A design-review workspace that exposes a live canvas as WebMCP tools, so an AI agent doesn't just describe what's wrong with a layout — it flags, moves, resizes and rebalances the real elements.",
      highlights: [
        "Six tools registered through navigator.modelContext.registerTool()",
        "Works with a built-in chat panel or any native WebMCP host",
        "Agent reads exact element coordinates instead of guessing from a screenshot",
      ],
      hackathon: "OpenAI WebMCP Challenge 2026",
    },
    {
      name: "Turnstile",
      stack: "typescript, zcash, client-side analysis",
      image: "/images/turnstile.png",
      liveUrl: "https://turnstile-psi.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/turnstile",
      description:
        "Zcash's shielded pool hides you inside, but its doors are public. Turnstile measures how often that betrays people, warns you before a withdrawal gives you away, and plans an exit that blends in.",
      highlights: [
        "Every check runs on the visitor's own device, against public chain data",
        "No server learns what the user is about to do",
        "Methodology documented and open to inspection",
      ],
      hackathon: "Zecathon",
    },
    {
      name: "Repo Quality Reviewer",
      stack: "typescript, agents, github api",
      image: "/images/repo-reviewer.png",
      liveUrl: "https://mercor-eight.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/mercor",
      description:
        "Inspects a codebase the way a senior engineer would — architecture, tests, dependencies, commit hygiene, documentation accuracy, technical debt — and returns a verdict with every claim traceable to a real file, test result or commit.",
      highlights: [
        "Two tiers: benchmarked against hand-audited repos, or a live audit of any public repo",
        "Keeps the two kinds of claim visibly separate instead of blurring them",
        "Evidence-backed scoring rather than stars and vibes",
      ],
      hackathon: "micro1 Agentic Workflows Hackathon",
    },
    {
      name: "Constellation",
      stack: "typescript, vite, clinical ontology",
      image: "/images/constellation.png",
      liveUrl: "https://constellation-sand.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/constellation",
      description:
        "Clinical decision support that reads a patient's digital twin across every body system at once, mapping observations to Human Phenotype Ontology terms to surface patterns no single specialty would catch alone.",
      highlights: [
        "Findings plotted across ten anatomical systems in interactive event lanes",
        "Phenotype fingerprint radar built as a custom N-axis SVG chart",
        "Explainable differential diagnosis with live-monitored confirmation plans",
      ],
      hackathon: "Ontomorph Hackathon",
    },
    {
      name: "DarkPool.fi",
      stack: "daml, canton network, javascript",
      image: "/images/darkpool.png",
      liveUrl: "https://darkpoolfi.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/darkpool",
      description:
        "An institutional over-the-counter trading venue on the Canton Network, using Daml sub-transaction privacy so unfilled orders and collateralised loans stay visible only to the parties involved.",
      highlights: [
        "End-to-end atomic delivery-versus-payment settlement with RFQ fallback",
        "Private credit vault secured against double spending",
        "Selective read-only transparency for regulators",
      ],
      hackathon: "Private DeFi & Capital Markets track",
    },
    {
      name: "Fiberglass",
      stack: "react, typescript, fiber network",
      image: "/images/fiberglass.png",
      liveUrl: "https://fibreglass-demo-wallet.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/fibreglass",
      description:
        "A developer-experience layer for the Fiber Network: add payment invoices, QR codes, countdown timers and status tracking to a React app in a few lines, without learning the raw protocol.",
      highlights: [
        "Published to npm as fiberglass-react",
        "Drop-in components plus hooks for invoices and payments",
        "MIT licensed, with a live demo wallet",
      ],
      hackathon: "Gone in 60ms",
    },
    {
      name: "CarePoint",
      stack: "next.js, typescript, openstreetmap",
      image: "/images/carepoint.png",
      liveUrl: "https://hea22.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/hea22",
      description:
        "A symptom checker and clinic locator for Nigeria. Users pick symptoms, get a rule-based triage suggestion with its reasoning, then find nearby hospitals sorted by distance.",
      highlights: [
        "Red-flag rules checked first, with emergency guidance pointing to 112",
        "Holds out for an accurate GPS reading, warns when it is unsure, and lets users correct the pin",
        "Nothing the user enters is stored; location never leaves the browser",
      ],
    },
    {
      name: "Grupp",
      stack: "next.js, javascript, static",
      image: "/images/grupp.png",
      liveUrl: "https://grupp-landing-page.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/grupp-landing-page-",
      description:
        "Marketing site for a Nigerian banking-as-a-service platform used by community banks, microfinance institutions and cooperatives to run agent banking, POS terminals and digital lending in their own brand.",
      highlights: [
        "Twelve sections on one page, built to be demoed live in a pitch",
        "Server component shell with six small client islands",
        "All copy lives in one content file, prerendered as static output",
      ],
    },
    {
      name: "TLC OAU Fellowship",
      stack: "next.js 16, react 19, tailwind 4",
      image: "/images/tlc-oau.png",
      liveUrl: "https://tlccrmoau.vercel.app",
      repoUrl: "https://github.com/daodudestiny56-netizen/tlccrm",
      description:
        "A six-page site for a university campus fellowship: weekly gatherings, beliefs, staff advisers and an executive council directory with search, faculty filters and two view modes.",
      highlights: [
        "Content separated into data files so non-developers can edit it",
        "Palette taken from the ministry's own identity",
        "Directory switches between card and table views",
      ],
    },
  ],

  hackathons: [
    {
      event: "OpenAI WebMCP Challenge",
      project: "Crit Studio",
      date: "2026",
      summary:
        "Built a design canvas that registers itself as WebMCP tools, so an agent can act on a layout with exact spatial precision instead of writing a paragraph about it.",
      repoUrl: "https://github.com/daodudestiny56-netizen/webgm",
      liveUrl: "https://critstudio.vercel.app",
    },
    {
      event: "Zecathon",
      track: "Cross-Chain",
      project: "Turnstile",
      summary:
        "Measured how often Zcash shielded-pool withdrawals can be linked back to their deposits, then built a tool that warns users before a withdrawal gives them away. Everything runs client-side.",
      repoUrl: "https://github.com/daodudestiny56-netizen/turnstile",
      liveUrl: "https://turnstile-psi.vercel.app",
    },
    {
      event: "micro1 Agentic Workflows Hackathon",
      project: "Repo Quality Reviewer",
      summary:
        "An agent that audits a codebase like a senior engineer and backs every claim with a file, a test result or a commit — separating benchmarked verdicts from live ones rather than blurring them.",
      repoUrl: "https://github.com/daodudestiny56-netizen/mercor",
      liveUrl: "https://mercor-eight.vercel.app",
    },
    {
      event: "Sibyl Labs Hackathon",
      track: "Autonomous Agents",
      project: "Grudge",
      date: "1–10 September 2026",
      summary:
        "A solo build: an onchain procurement agent that remembers how every counterparty behaved and hardens its terms accordingly — from preferential rates for trusted vendors to walking away from repeat offenders. Settles via Virtuals ACP on Base Sepolia.",
      repoUrl: "https://github.com/daodudestiny56-netizen/sibyl",
    },
    {
      event: "Ontomorph Hackathon",
      project: "Constellation",
      summary:
        "Cross-system clinical decision support built on the HOLON Clinical Knowledge API, surfacing multi-organ patterns that single-specialty views miss.",
      repoUrl: "https://github.com/daodudestiny56-netizen/constellation",
      liveUrl: "https://constellation-sand.vercel.app",
    },
    {
      event: "Gone in 60ms — Fiber Network Infrastructure Hackathon",
      track: "Wallet and Payment UX Infrastructure",
      project: "Fiberglass",
      summary:
        "A React SDK that makes Fiber Network payments a few lines of code, published to npm with a live demo wallet.",
      repoUrl: "https://github.com/daodudestiny56-netizen/fibreglass",
      liveUrl: "https://fibreglass-demo-wallet.vercel.app",
    },
    {
      event: "Private DeFi & Capital Markets track",
      project: "DarkPool.fi",
      summary:
        "An institutional OTC venue on the Canton Network, replacing trust in a central operator with Daml sub-transaction privacy and atomic settlement.",
      repoUrl: "https://github.com/daodudestiny56-netizen/darkpool",
      liveUrl: "https://darkpoolfi.vercel.app",
    },
  ],

  toolkit: [
    {
      group: "Languages & frameworks",
      items: [
        { name: "TypeScript", note: "Primary language across my projects" },
        { name: "React", note: "Component architecture & state design" },
        { name: "Next.js", note: "App Router, SSR / SSG, middleware" },
        { name: "Node.js", note: "APIs, server logic & tooling" },
      ],
    },
    {
      group: "Platform & protocol",
      items: [
        { name: "WebMCP", note: "Exposing app state as agent-callable tools" },
        { name: "Daml / Canton", note: "Privacy-preserving settlement contracts" },
        { name: "Python", note: "Agents, data work and automation" },
        { name: "Web Crypto", note: "Client-side encryption and key handling" },
      ],
    },
    {
      group: "Interface & data",
      items: [
        { name: "Tailwind CSS", note: "Token-based design systems" },
        { name: "Framer Motion", note: "Scroll and state-driven motion" },
        { name: "SVG & Canvas", note: "Custom charts and interactive canvases" },
        { name: "OpenStreetMap", note: "Mapping and geolocation interfaces" },
      ],
    },
  ],

  principles: [
    {
      title: "Architecture first",
      body: "Clear boundaries and boring, proven patterns beat clever code. I design data flow before I design screens.",
    },
    {
      title: "Measure, then optimise",
      body: "Performance work starts with a profiler, not a hunch. Frame budgets, bundle sizes and network waterfalls guide every change.",
    },
    {
      title: "Types are contracts",
      body: "Strict types document intent and catch whole classes of bugs before they reach users or reviewers.",
    },
    {
      title: "Resilient by default",
      body: "Slow networks, dropped connections and offline users are the normal case. I build for them from day one.",
    },
    {
      title: "Accessible always",
      body: "Keyboard paths, focus states, reduced motion and contrast are requirements — not polish for later.",
    },
    {
      title: "Claims must be checkable",
      body: "If a project says something is true, the evidence should be one click away. I would rather show the limits than overstate the result.",
    },
  ],

  stats: [
    { value: 3, label: "years experience" },
    { value: 9, label: "live projects" },
    { value: 7, label: "hackathons" },
  ],
};
