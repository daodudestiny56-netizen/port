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
      {/* Inner Card Container
          — mobile: carousel-card style (border, dimmer image, accent hover title)
          — desktop (md+): full featured hero treatment */}
      <div className="relative w-full h-full min-h-[350px] md:min-h-[380px] bg-surface
                      border border-border md:border-0
                      rounded-[12px] md:rounded-[11px]
                      p-5 md:p-7
                      overflow-hidden flex flex-col justify-between z-10">

        {/* Background Image — opacity-10 on mobile → opacity-20 on hover; opacity-40 on desktop */}
        <div className="absolute inset-0 w-full h-full
                        opacity-10 group-hover:opacity-20
                        md:opacity-40 md:group-hover:opacity-40
                        overflow-hidden pointer-events-none transition-opacity duration-500">
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

        {/* Content Top: Category Badge (+ "FEATURED PROJECT" hidden on mobile) */}
        <div className="relative z-20 flex justify-between items-start">
          {/* mobile: smaller badge pill matching carousel; desktop: slightly larger */}
          <span className="px-2.5 py-0.5 text-[9px] md:px-3 md:py-1 md:text-[11px] font-[300] tracking-wider uppercase bg-[#1A1A1A] border border-border rounded-full text-secondaryText">
            {project.category}
          </span>
          {/* "FEATURED PROJECT" label — hidden on mobile, visible on desktop hover */}
          <span className="hidden md:block text-[11px] font-[300] tracking-wider text-primaryText uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            FEATURED PROJECT
          </span>
        </div>

        {/* Content Bottom: Title, Description and Arrow */}
        <div className="relative z-20 flex flex-row justify-between items-end mt-auto pt-6 md:pt-12 gap-4">
          <div className="flex-1 flex flex-col gap-1.5 md:gap-0">
            {/* mobile: base text + accent on hover (carousel-style); desktop: xl text, no accent */}
            <h3 className="font-display font-[300]
                           text-base group-hover:text-[#E8FF47] transition-colors duration-300
                           md:text-2xl md:group-hover:text-primaryText
                           text-primaryText tracking-tight">
              {project.name}
            </h3>
            <p className="text-xs md:text-sm text-secondaryText mt-0 md:mt-2 font-[300] leading-relaxed normal-case">
              {project.description}
            </p>
            {/* "Click to view repository" — hidden on mobile, visible on desktop */}
            <p className="hidden md:block text-xs text-secondaryText/60 mt-2 font-[300] uppercase tracking-wide">
              Click to view repository
            </p>
          </div>

          {/* Arrow — w-8/h-4 on mobile (carousel-style); w-10/h-5 on desktop */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border bg-[#1A1A1A]/80 flex items-center justify-center text-primaryText group-hover:border-primaryText transition-colors duration-300 shrink-0 self-end">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
