"use client";

import {
  FileCode,
  Cpu,
  Braces,
  Palette,
  Activity,
  LayoutTemplate,
} from "lucide-react";
import { portfolioData } from "@/lib/data";
import Marquee from "@/components/ui/Marquee";
import { motion } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "next.js":
      return LayoutTemplate;
    case "react":
      return Cpu;
    case "typescript":
      return FileCode;
    case "tailwindcss":
      return Palette;
    case "framer motion":
    case "gsap":
      return Activity;
    case "webgl":
      return Braces;
    default:
      return Braces;
  }
};

export default function TechStack() {
  const tools = portfolioData.toolkit;

  return (
    <motion.div
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative flex flex-col justify-between h-full w-full bg-surface border border-border rounded-[12px] p-7 card-hover-shadow group select-none"
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
                className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[12px] text-xs font-[300] text-primaryText transition-all duration-300 ease-portfolio-ease hover:-translate-y-0.5 hover:border-[#E8FF47] shrink-0"
              >
                <IconComponent className="w-3.5 h-3.5 text-secondaryText transition-colors duration-300" />
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
