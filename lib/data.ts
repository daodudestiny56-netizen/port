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
  toolkit: { name: string; category: string }[];
  stats: Stat[];
}

export const portfolioData: PortfolioData = {
  name: "Daodu Destiny Oluwatobiloba",
  role: "Frontend developer specializing in Next.js, React, and TypeScript. I build high-performance web applications focused on sub-second initial loads, 60fps animations, and strict WCAG accessibility standards.",
  status: "Open to frontend roles — Based in Lagos, remote-friendly",
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
    description: "Built real-time voice authentication and automated livestreaming architecture using Next.js and WebSockets — ensuring sub-100ms sync latency and zero session state loss under peak concurrency.",
    caseStudy: {
      problem: "Handling high-concurrency audio stream packets and live attendance verification in web clients caused frame stutter and UI thread locks under unstable network conditions.",
      approach: "Implemented a ring-buffered WebSocket audio packet queue combined with Web Audio API AudioWorklet offloading to process voice verification frames on a background thread without blocking the main React render loop.",
      codeSnippet: {
        filename: "useVoiceStreamQueue.ts",
        language: "typescript",
        code: `import { useRef, useCallback } from 'react';

// Ring-buffer queue processing voice PCM packets on a background thread
export function useVoiceStreamQueue(wsUrl: string) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const queueRef = useRef<Float32Array[]>([]);
  
  const processFrame = useCallback((frameData: ArrayBuffer) => {
    const pcmData = new Float32Array(frameData);
    queueRef.current.push(pcmData);
    
    // Drain ring buffer to AudioWorklet Node without React state re-renders
    if (queueRef.current.length > 5) {
      const chunk = queueRef.current.shift();
      audioCtxRef.current?.postMessage({ command: 'PLAY_CHUNK', chunk });
    }
  }, []);

  return { processFrame };
}`
      },
      metrics: [
        { label: "SYNC LATENCY", value: "<85ms" },
        { label: "PACKET LOSS DROPS", value: "0.02%" },
        { label: "MAIN THREAD FPS", value: "60 FPS" },
        { label: "LIGHTHOUSE SCORE", value: "98/100" }
      ]
    }
  },
  projects: [
    {
      name: "VELORAIL",
      category: "TYPESCRIPT / FRONTEND",
      image: "/images/velorail.png",
      link: "https://github.com/daodudestiny56-netizen/Velorail",
      description: "Engineered a Telegram WebApp interface using TypeScript and Web3 API bindings — handling encrypted client state persistence and instant transaction confirmation feedback.",
      caseStudy: {
        problem: "Telegram WebApp containers present severe memory and window execution constraints, leading to app restarts and lost wallet authorization tokens when switching chat views.",
        approach: "Built a persistent sessionStorage encryption wrapper using Web Crypto AES-GCM and atomic session tokens, paired with an optimistic RPC feedback pipeline.",
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
          { label: "SESSION RECOVERY", value: "100%" },
          { label: "CONFIRMATION FEEDBACK", value: "<150ms" },
          { label: "CONTAINER BUNDLE", value: "38 kB" }
        ]
      }
    },
    {
      name: "COCODB WAITLIST",
      category: "REACT / DATABASE",
      image: "/images/cocodb.png",
      link: "https://github.com/daodudestiny56-netizen/cocoDB-waitlist",
      description: "Architected a high-throughput landing page and queue management flow — optimizing JS bundle size to under 45kB and maintaining a 100/100 Lighthouse performance score.",
      caseStudy: {
        problem: "High surge traffic from developer product announcements caused layout shifts and API bottleneck delays during queue token generation.",
        approach: "Implemented static HTML route shell pre-rendering, edge API middleware rate limiting, and CSS GPU-composited animations.",
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
          { label: "LIGHTHOUSE SCORE", value: "100/100" },
          { label: "JS BUNDLE SIZE", value: "41 kB" },
          { label: "FIRST CONTENTFUL PAINT", value: "0.3s" }
        ]
      }
    },
    {
      name: "ZEDX ORIGINAL",
      category: "TYPESCRIPT / WEB APP",
      image: "/images/zedx.png",
      link: "https://github.com/daodudestiny56-netizen/zedx-original",
      description: "Implemented optimistic cart state mutations, client-side caching, and dynamic route prefetching in React — reducing page transition delay to under 50ms across catalog and checkout.",
      caseStudy: {
        problem: "E-commerce shoppers experience friction when cart updates rely on round-trip network requests before reflecting inventory changes visually.",
        approach: "Engineered an optimistic UI state machine backed by an in-memory action roll-back buffer and pre-fetched route boundaries using Next.js Link preload priorities.",
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
          { label: "TRANSITION DELAY", value: "<40ms" },
          { label: "CART CONVERSION", value: "+18%" },
          { label: "PREFETCH HIT RATE", value: "94%" }
        ]
      }
    },
    {
      name: "MEDIQUICK",
      category: "JAVASCRIPT / WEB APP",
      image: "/images/mediquick.png",
      link: "https://github.com/daodudestiny56-netizen/MediQuick",
      description: "Built an offline-first progressive WebApp with IndexedDB local caching and zero-dependency search — delivering sub-20ms query response times for emergency medical protocols.",
      caseStudy: {
        problem: "Users accessing medical emergency step-by-step guides in poor connection zones suffered from blank screen loads and network timeouts.",
        approach: "Designed a ServiceWorker caching layer paired with an in-memory Trie data structure backed by IndexedDB to search first-aid steps instantly offline.",
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
  search(prefix) { /* Sub-5ms in-memory lookup */ }
}`
        },
        metrics: [
          { label: "OFFLINE AVAILABILITY", value: "100%" },
          { label: "QUERY RESPONSE", value: "<15ms" },
          { label: "COLD START TIME", value: "0.4s" }
        ]
      }
    },
    {
      name: "EDGE",
      category: "TYPESCRIPT / UTILITY",
      image: "/images/edge.png",
      link: "https://github.com/daodudestiny56-netizen/edge",
      description: "Implemented dynamic order-book UI updates and live odds calculations via Server-Sent Events (SSE) — preventing layout shifts while streaming real-time price tick feeds.",
      caseStudy: {
        problem: "Rapidly fluctuating market odds caused heavy React DOM re-renders and cumulative layout shifts (CLS), resulting in missed user click targets on trading order books.",
        approach: "Created a batched DOM tick update scheduler using requestAnimationFrame and CSS transform layers to batch price updates every 16ms.",
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
          { label: "CLS SCORE", value: "0.00" },
          { label: "TICK THROUGHPUT", value: "2.4k/sec" },
          { label: "RENDER FRAME RATE", value: "60 FPS" }
        ]
      }
    },
  ],
  toolkit: [
    { name: "Next.js", category: "Framework" },
    { name: "React", category: "Library" },
    { name: "TypeScript", category: "Language" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "Framer Motion", category: "Animation" },
    { name: "GSAP", category: "Animation" },
    { name: "WebGL", category: "Graphics" },
  ],
  stats: [
    { value: 2, label: "YEARS OF EXPERIENCE" },
    { value: 10, label: "PROJECTS SHIPPED" },
    { value: 50, label: "OPEN SOURCE PRs" },
    { value: 99, label: "LIGHTHOUSE SCORE AVG", suffix: "%" },
  ],
};
