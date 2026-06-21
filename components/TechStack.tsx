"use client";

import { portfolioData } from "@/lib/data";
import Marquee from "@/components/ui/Marquee";
import { motion } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";

const NextjsLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5l-3.3-4.3v4.3H8.3V7.5h1.4l3.3 4.3V7.5h1.4v9h-1.4z" fill="currentColor" />
  </svg>
);

const ReactLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const TypeScriptLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M8 10h4M10 10v6" />
    <path d="M13.5 15c0 .6.4 1 1 1h1.5c.6 0 1-.4 1-1v-1.5c0-.6-.4-1-1-1H15c-.6 0-1-.4-1-1V11c0-.6.4-1 1-1h1.5c.6 0 1 .4 1 1" />
  </svg>
);

const TailwindCSSLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 2-1.7 3.2-1.4.9.2 1.5.7 2.1 1.3 1 1 2.1 1.8 3.8 1.8 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-2 1.7-3.2 1.4-.7-.1-1.1-.6-1.7-1.2-1.1-1.1-2.1-1.9-4.2-1.9zm-4.5 5.4c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 2-1.7 3.2-1.4.7.1 1.1.6 1.7 1.2 1.1 1.1 2.1 1.9 4.2 1.9 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-2 1.7-3.2 1.4-.9-.2-1.5-.7-2.1-1.3-1-1-2.1-1.8-3.8-1.8z" />
  </svg>
);

const FramerMotionLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3h14L12 10H5z" />
    <path d="M5 10h7l7 7H5z" />
    <path d="M12 17h7l-7 4z" />
  </svg>
);

const GSAPLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v5.5M12 16.5V22M2 12h5.5M16.5 12H22M4.9 4.9l3.9 3.9M15.2 15.2l3.9 3.9M19.1 4.9l-3.9 3.9M8.8 15.2l-3.9 3.9" />
  </svg>
);

const WebGLLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
    <path d="M12 22V12M4 7l8 5 8-5" />
  </svg>
);

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "next.js":
      return NextjsLogo;
    case "react":
      return ReactLogo;
    case "typescript":
      return TypeScriptLogo;
    case "tailwindcss":
      return TailwindCSSLogo;
    case "framer motion":
      return FramerMotionLogo;
    case "gsap":
      return GSAPLogo;
    case "webgl":
      return WebGLLogo;
    default:
      return WebGLLogo;
  }
};

export default function TechStack() {
  const tools = portfolioData.toolkit;

  return (
    <motion.div
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative flex flex-col justify-between h-full w-full bg-surface border border-border rounded-[12px] p-5 md:p-7 card-hover-shadow group select-none"
    >
      <div>
        <h4 className="font-display text-[11px] font-[300] tracking-widest text-secondaryText uppercase mb-6">
          TOOLKIT
        </h4>
        
        {/* Infinite marquee of pills */}
        <Marquee speed="20s" direction="left" className="py-1">
          {tools.map((tool, index) => {
            const IconComponent = getIcon(tool.name);
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[12px] text-xs font-[300] text-primaryText transition-all duration-300 ease-portfolio-ease hover:-translate-y-0.5 hover:border-[#E8FF47] shrink-0 group/pill"
              >
                <IconComponent className="w-3.5 h-3.5 text-secondaryText transition-colors duration-300 group-hover/pill:text-[#E8FF47]" />
                <span>{tool.name}</span>
              </div>
            );
          })}
        </Marquee>
      </div>
      
      <p className="text-[11px] text-secondaryText font-[300] uppercase tracking-wider mt-8">
        Always extending the tech matrix
      </p>
    </motion.div>
  );
}
