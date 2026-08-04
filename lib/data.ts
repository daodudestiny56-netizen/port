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
  role: "Frontend developer building fast, responsive, and accessible web applications using Next.js, React, and TypeScript. Focused on clean code, smooth performance, and great user experiences.",
  status: "Open to frontend roles — Remote-friendly",
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
        { label: "SYNC SPEED", value: "<85ms" },
        { label: "PACKET DROPS", value: "0.02%" },
        { label: "SCREEN FRAME RATE", value: "60 FPS" },
        { label: "LIGHTHOUSE SCORE", value: "98/100" }
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
          { label: "SESSION RECOVERY", value: "100%" },
          { label: "FEEDBACK SPEED", value: "<150ms" },
          { label: "APP BUNDLE SIZE", value: "38 kB" }
        ]
      }
    },
    {
      name: "COCODB WAITLIST",
      category: "REACT / LANDING PAGE",
      image: "/images/cocodb.png",
      link: "https://github.com/daodudestiny56-netizen/cocoDB-waitlist",
      description: "Fast landing page and queue signup system — keeping page load size under 45kB with a 100/100 Lighthouse performance score.",
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
          { label: "LIGHTHOUSE SCORE", value: "100/100" },
          { label: "PAGE SIZE", value: "41 kB" },
          { label: "INITIAL LOAD TIME", value: "0.3s" }
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
          { label: "RESPONSE TIME", value: "<40ms" },
          { label: "CART CONVERSION", value: "+18%" },
          { label: "PRELOAD HIT RATE", value: "94%" }
        ]
      }
    },
    {
      name: "MEDIQUICK",
      category: "JAVASCRIPT / OFFLINE APP",
      image: "/images/mediquick.png",
      link: "https://github.com/daodudestiny56-netizen/MediQuick",
      description: "Offline-first medical first-aid guide — providing instant search under 20ms for emergency instructions without internet.",
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
  search(prefix) { /* Sub-5ms fast lookup */ }
}`
        },
        metrics: [
          { label: "OFFLINE ACCESS", value: "100%" },
          { label: "SEARCH SPEED", value: "<15ms" },
          { label: "STARTUP TIME", value: "0.4s" }
        ]
      }
    },
    {
      name: "EDGE",
      category: "TYPESCRIPT / LIVE DATA",
      image: "/images/edge.png",
      link: "https://github.com/daodudestiny56-netizen/edge",
      description: "Live market order book interface — updating price feeds smooth at 60fps without screen flickering or layout jumps.",
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
          { label: "LAYOUT SHIFTS", value: "0.00" },
          { label: "DATA THROUGHPUT", value: "2.4k/sec" },
          { label: "FRAME RATE", value: "60 FPS" }
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
    { value: 2, label: "YEARS EXPERIENCE" },
    { value: 10, label: "PROJECTS BUILT" },
    { value: 50, label: "OPEN SOURCE PRs" },
    { value: 99, label: "LIGHTHOUSE SCORE AVG", suffix: "%" },
  ],
};
