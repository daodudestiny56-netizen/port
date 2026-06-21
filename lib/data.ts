export interface Project {
  name: string;
  category: string;
  image: string;
  link: string;
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
    description: "An automated platform that handles attendance tracking and class livestreaming for educational institutions — all in one place.",
  },
  projects: [
    {
      name: "VELORAIL",
      category: "TYPESCRIPT / FRONTEND",
      image: "/images/velorail.png",
      link: "https://github.com/daodudestiny56-netizen/Velorail",
      description: "A Telegram bot that lets users send, receive, and manage crypto transactions without leaving their chat — bringing on-chain finance to a familiar interface.",
    },
    {
      name: "COCODB WAITLIST",
      category: "REACT / DATABASE",
      image: "/images/cocodb.png",
      link: "https://github.com/daodudestiny56-netizen/cocoDB-waitlist",
      description: "A lightweight relational database layer built on top of PostgreSQL, part of the broader CocoBase ecosystem — designed to simplify data modeling and querying for modern web apps.",
    },
    {
      name: "ZEDX ORIGINAL",
      category: "TYPESCRIPT / WEB APP",
      image: "/images/zedx.png",
      link: "https://github.com/daodudestiny56-netizen/zedx-original",
      description: "A full-featured e-commerce storefront built for speed and simplicity — covering product listings, cart management, and checkout in a clean, performant interface.",
    },
    {
      name: "MEDIQUICK",
      category: "JAVASCRIPT / WEB APP",
      image: "/images/mediquick.png",
      link: "https://github.com/daodudestiny56-netizen/MediQuick",
      description: "A web app that delivers step-by-step first aid and emergency procedure guidance — built for fast access when every second counts.",
    },
    {
      name: "EDGE",
      category: "TYPESCRIPT / UTILITY",
      image: "/images/edge.png",
      link: "https://github.com/daodudestiny56-netizen/edge",
      description: "A prediction markets platform where users can stake positions on real-world outcomes — combining live data, dynamic odds, and a clean trading-style UI.",
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
