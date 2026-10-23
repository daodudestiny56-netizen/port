export interface CaseStudy {
  problem: string;
  approach: string;
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
  metrics: { label: string; value: string }[];
}

export interface Project {
  name: string;
  category: string;
  image: string;
  link: string;
  description: string;
  caseStudy?: CaseStudy;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface ToolGroup {
  group: string;
  items: { name: string; note: string }[];
}

export interface Principle {
  title: string;
  body: string;
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
  featuredProject: Project;
  projects: Project[];
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
  featuredProject: {
    name: "PROOF",
    category: "NEXT.JS / VOICE-AUTH",
    image: "/images/proof.png",
    link: "https://github.com/daodudestiny56-netizen/proof-",
    description: "Real-time voice verification and streaming app built with Next.js and WebSockets — providing fast sync and reliable session connections.",
    caseStudy: {
      problem: "Playing live audio streams while verifying user voice data caused screen lag and app freezes on slow networks.",
      approach: "Built a background audio processing queue using the Web Audio API to handle voice data smoothly without freezing the screen.",
      codeSnippet: {
        filename: "useVoiceStreamQueue.ts",
        language: "typescript",
        code: `import { useRef, useCallback } from 'react';

// Audio queue processing voice packets in the background
export function useVoiceStreamQueue(wsUrl: string) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const queueRef = useRef<Float32Array[]>([]);
  
  const processFrame = useCallback((frameData: ArrayBuffer) => {
    const pcmData = new Float32Array(frameData);
    queueRef.current.push(pcmData);
    
    // Play audio chunks smoothly without blocking UI renders
    if (queueRef.current.length > 5) {
      const chunk = queueRef.current.shift();
      audioCtxRef.current?.postMessage({ command: 'PLAY_CHUNK', chunk });
    }
  }, []);

  return { processFrame };
}`
      },
      metrics: [
        { label: "STREAM ENGINE", value: "WEB AUDIO API" },
        { label: "PROTOCOL", value: "WEBSOCKETS" },
        { label: "STATE BUFFER", value: "PCM FLOAT32" }
      ]
    }
  },
  projects: [
    {
      name: "VELORAIL",
      category: "TYPESCRIPT / WEB APP",
      image: "/images/velorail.png",
      link: "https://github.com/daodudestiny56-netizen/Velorail",
      description: "Telegram WebApp interface built with TypeScript — keeping user state saved securely and giving instant feedback for transactions.",
      caseStudy: {
        problem: "Switching chats inside Telegram caused the web app to reload and lose the user's active session state.",
        approach: "Created an encrypted session storage wrapper with Web Crypto so user data stays saved even when switching screens.",
        codeSnippet: {
          filename: "telegramSessionStore.ts",
          language: "typescript",
          code: `export async function storeEncryptedState(key: CryptoKey, state: Record<string, unknown>) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(state));
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, key, encoded
  );
  window.Telegram.WebApp.CloudStorage.setItem(
    'vault_state', 
    JSON.stringify({ iv: Array.from(iv), data: Array.from(new Uint8Array(ciphertext)) })
  );
}`
        },
        metrics: [
          { label: "SECURITY", value: "AES-GCM" },
          { label: "STORAGE", value: "CLOUD STORAGE" },
          { label: "BUNDLE SIZE", value: "38 kB" }
        ]
      }
    },
    {
      name: "COCODB WAITLIST",
      category: "REACT / LANDING PAGE",
      image: "/images/cocodb.png",
      link: "https://github.com/daodudestiny56-netizen/cocoDB-waitlist",
      description: "Fast landing page and queue signup system — keeping page load size under 45kB with high Lighthouse performance.",
      caseStudy: {
        problem: "High visitor traffic during product launches caused slow response times and layout shifts on signups.",
        approach: "Used static pre-rendering, edge API rate limiting, and GPU-optimized CSS animations for fast page loads.",
        codeSnippet: {
          filename: "middleware.ts",
          language: "typescript",
          code: `import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  const token = await fetch(\`\${process.env.EDGE_RATELIMIT_URL}/check?ip=\${ip}\`);
  if (!token.ok) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  return NextResponse.next();
}`
        },
        metrics: [
          { label: "RENDERING", value: "STATIC SSG" },
          { label: "PAGE BUNDLE", value: "41 kB" },
          { label: "SECURITY", value: "EDGE RATELIMIT" }
        ]
      }
    },
    {
      name: "ZEDX ORIGINAL",
      category: "TYPESCRIPT / E-COMMERCE",
      image: "/images/zedx.png",
      link: "https://github.com/daodudestiny56-netizen/zedx-original",
      description: "Shopping cart and checkout interface — updating items instantly on click and pre-loading product pages for fast browsing.",
      caseStudy: {
        problem: "Shoppers experienced delay when cart updates waited for server responses before showing item changes.",
        approach: "Used optimistic UI state updates to show cart changes instantly while syncing with the server in the background.",
        codeSnippet: {
          filename: "useOptimisticCart.ts",
          language: "typescript",
          code: `import { useOptimistic, useTransition } from 'react';

export function useOptimisticCart(initialCart: CartItem[]) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCart, updateCart] = useOptimistic(
    initialCart,
    (state, action: { type: 'ADD' | 'REMOVE'; item: CartItem }) => {
      if (action.type === 'ADD') return [...state, action.item];
      return state.filter(i => i.id !== action.item.id);
    }
  );
  return { optimisticCart, updateCart, isPending, startTransition };
}`
        },
        metrics: [
          { label: "STATE HOOK", value: "USE OPTIMISTIC" },
          { label: "UPDATES", value: "INSTANT UI" },
          { label: "ROUTING", value: "PREFETCHING" }
        ]
      }
    },
    {
      name: "MEDIQUICK",
      category: "JAVASCRIPT / OFFLINE APP",
      image: "/images/mediquick.png",
      link: "https://github.com/daodudestiny56-netizen/MediQuick",
      description: "Offline-first medical first-aid guide — providing fast search for emergency instructions without internet.",
      caseStudy: {
        problem: "Users opening emergency first-aid guides in areas with poor network suffered blank screens and timeouts.",
        approach: "Built a ServiceWorker offline cache with an in-memory search index so first-aid steps open instantly offline.",
        codeSnippet: {
          filename: "trieSearch.ts",
          language: "javascript",
          code: `class MedicalProtocolTrie {
  constructor() { this.root = {}; }
  insert(keyword, protocolId) {
    let node = this.root;
    for (const char of keyword.toLowerCase()) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.protocolId = protocolId;
  }
  search(prefix) { /* Fast lookup */ }
}`
        },
        metrics: [
          { label: "CACHE ENGINE", value: "SERVICE WORKER" },
          { label: "SEARCH DATA", value: "TRIE INDEX" },
          { label: "NETWORK MODE", value: "OFFLINE FIRST" }
        ]
      }
    },
    {
      name: "EDGE",
      category: "TYPESCRIPT / LIVE DATA",
      image: "/images/edge.png",
      link: "https://github.com/daodudestiny56-netizen/edge",
      description: "Live market order book interface — updating price feeds smoothly without screen flickering or layout jumps.",
      caseStudy: {
        problem: "Rapid price updates caused screen re-renders and unexpected layout jumps, making buttons hard to click.",
        approach: "Scheduled price updates using requestAnimationFrame to batch updates every 16ms for smooth rendering.",
        codeSnippet: {
          filename: "useBatchTickScheduler.ts",
          language: "typescript",
          code: `import { useRef, useEffect } from 'react';

export function useBatchTickScheduler(onBatchRender: (ticks: MarketTick[]) => void) {
  const tickBuffer = useRef<MarketTick[]>([]);
  
  useEffect(() => {
    let frameId: number;
    const flushQueue = () => {
      if (tickBuffer.current.length > 0) {
        onBatchRender([...tickBuffer.current]);
        tickBuffer.current = [];
      }
      frameId = requestAnimationFrame(flushQueue);
    };
    frameId = requestAnimationFrame(flushQueue);
    return () => cancelAnimationFrame(frameId);
  }, [onBatchRender]);
}`
        },
        metrics: [
          { label: "SCHEDULER", value: "RAF BATCHING" },
          { label: "TARGET RATE", value: "60 FPS" },
          { label: "CLS SCORE", value: "0.00 SHIFT" }
        ]
      }
    },
  ],
  toolkit: [
    {
      group: "LANGUAGES & FRAMEWORKS",
      items: [
        { name: "TypeScript", note: "Primary language across my projects" },
        { name: "React", note: "Component architecture & state design" },
        { name: "Next.js", note: "App Router, SSR / SSG, middleware" },
        { name: "Node.js", note: "APIs, server logic & tooling" },
      ],
    },
    {
      group: "REAL-TIME & PLATFORM",
      items: [
        { name: "WebSockets", note: "Live sync for streaming interfaces" },
        { name: "Service Workers", note: "Offline-first caching strategies" },
        { name: "Web Audio API", note: "Background audio processing" },
        { name: "Web Crypto", note: "AES-GCM encrypted client storage" },
      ],
    },
    {
      group: "INTERFACE & MOTION",
      items: [
        { name: "Three.js", note: "3D scenes — including this site" },
        { name: "Framer Motion", note: "Springs, gestures & scroll motion" },
        { name: "GSAP", note: "Timeline-driven animation" },
        { name: "Tailwind CSS", note: "Token-based design systems" },
      ],
    },
  ],
  principles: [
    {
      title: "ARCHITECTURE FIRST",
      body: "Clear boundaries and boring, proven patterns beat clever code. I design data flow before I design screens.",
    },
    {
      title: "MEASURE, THEN OPTIMISE",
      body: "Performance work starts with a profiler, not a hunch. Frame budgets, bundle sizes and network waterfalls guide every change.",
    },
    {
      title: "TYPES ARE CONTRACTS",
      body: "Strict types document intent and catch whole classes of bugs before they reach users or reviewers.",
    },
    {
      title: "RESILIENT BY DEFAULT",
      body: "Slow networks, dropped connections and offline users are the normal case. I build for them from day one.",
    },
    {
      title: "ACCESSIBLE ALWAYS",
      body: "Keyboard paths, focus states, reduced motion and contrast are requirements — not polish for later.",
    },
    {
      title: "SHIP SMALL, SHIP OFTEN",
      body: "Small, reviewable changes keep momentum high and risk low. Leave every file cleaner than I found it.",
    },
  ],
  stats: [
    { value: 3, label: "years experience" },
    { value: 6, label: "projects shipped" },
  ],
};
