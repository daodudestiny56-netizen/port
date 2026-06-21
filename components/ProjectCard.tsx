"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { portfolioData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";

const MotionImage = motion(Image);

export default function ProjectCard() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mousePos = useMousePosition(cardRef);

  const project = portfolioData.featuredProject;

  // Animation 8: Scroll-linked image parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  // Transform mapped progress to translateY offset between -15% and 15%
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.a
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
      className="relative block h-full w-full p-[1px] rounded-[12px] overflow-hidden project-card-glow select-none group"
      data-cursor="hover"
    >
      {/* Inner Card Container */}
      <div className="relative w-full h-full min-h-[320px] md:min-h-[380px] bg-surface rounded-[11px] p-5 md:p-7 overflow-hidden flex flex-col justify-between z-10">
        
        {/* Background Image Container with Parallax Effect */}
        <div className="absolute inset-0 w-full h-full opacity-40 overflow-hidden pointer-events-none">
          <MotionImage
            src={project.image}
            alt={project.name}
            fill
            style={{ y, scale: 1.25 }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover will-change-transform"
          />
        </div>

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none z-10" />

        {/* Content Top: Category Badge */}
        <div className="relative z-20 flex justify-between items-start">
          <span className="px-3 py-1 text-[11px] font-[300] tracking-wider uppercase bg-[#1A1A1A] border border-border rounded-full text-secondaryText">
            {project.category}
          </span>
          <span className="text-[11px] font-[300] tracking-wider text-primaryText uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            FEATURED PROJECT
          </span>
        </div>

        {/* Content Bottom: Title, Description and Arrow */}
        <div className="relative z-20 flex flex-row justify-between items-end mt-auto pt-6 md:pt-12 gap-4">
          <div className="flex-1">
            <h3 className="font-display font-[300] text-xl md:text-2xl text-primaryText tracking-tight">
              {project.name}
            </h3>
            <p className="text-xs md:text-sm text-secondaryText mt-2 font-[300] leading-relaxed normal-case">
              {project.description}
            </p>
            <p className="text-[10px] md:text-xs text-secondaryText/60 mt-2 font-[300] uppercase tracking-wide">
              Click to view repository
            </p>
          </div>
          
          {/* Diagonal Arrow link indicator */}
          <div className="w-10 h-10 rounded-full border border-border bg-[#1A1A1A]/80 flex items-center justify-center text-primaryText group-hover:text-primaryText group-hover:border-primaryText transition-colors duration-300 shrink-0 self-end">
            <ArrowUpRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
