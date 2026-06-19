export interface Project {
  name: string;
  category: string;
  image: string;
  link: string;
}

export interface Role {
  company: string;
  title: string;
  years: string;
  description: string;
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
  experience: Role[];
  stats: Stat[];
}

export const portfolioData: PortfolioData = {
  name: "DAODU DESTINY OLUWATOBILOBA",
  role: "Frontend developer engineering fluid interfaces, interactive materials, and accessible digital products.",
  status: "Available for work",
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
  },
  projects: [
    {
      name: "VELORAIL",
      category: "TYPESCRIPT / FRONTEND",
      image: "/images/velorail.png",
      link: "https://github.com/daodudestiny56-netizen/Velorail",
    },
    {
      name: "COCODB WAITLIST",
      category: "REACT / DATABASE",
      image: "/images/cocodb.png",
      link: "https://github.com/daodudestiny56-netizen/cocoDB-waitlist",
    },
    {
      name: "ZEDX ORIGINAL",
      category: "TYPESCRIPT / WEB APP",
      image: "/images/zedx.png",
      link: "https://github.com/daodudestiny56-netizen/zedx-original",
    },
    {
      name: "MEDIQUICK",
      category: "JAVASCRIPT / WEB APP",
      image: "/images/mediquick.png",
      link: "https://github.com/daodudestiny56-netizen/MediQuick",
    },
    {
      name: "EDGE",
      category: "TYPESCRIPT / UTILITY",
      image: "/images/edge.png",
      link: "https://github.com/daodudestiny56-netizen/edge",
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
  experience: [
    {
      company: "STRIPE",
      title: "Senior Creative Engineer",
      years: "2024 — PRESENT",
      description: "Led design systems integration, created high-performance WebGL landing pages, and crafted interactive materials for Stripe Sessions.",
    },
    {
      company: "VERCEL",
      title: "Interactive Developer",
      years: "2022 — 2024",
      description: "Built immersive interfaces for Next.js conferences, optimized package load times, and worked closely with the Developer Relations team.",
    },
    {
      company: "DESTRUCT STUDIO",
      title: "Frontend Developer",
      years: "2020 — 2022",
      description: "Engineered smooth, accessible websites for digital design clients using React, TailwindCSS, and GSAP.",
    },
  ],
  stats: [
    { value: 2, label: "YEARS OF EXPERIENCE" },
    { value: 10, label: "PROJECTS SHIPPED" },
    { value: 50, label: "OPEN SOURCE PRs" },
    { value: 99, label: "LIGHTHOUSE SCORE AVG", suffix: "%" },
  ],
};
