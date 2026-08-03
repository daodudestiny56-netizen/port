"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { portfolioData, Project } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";

const MotionImage = motion(Image);

interface ProjectCardProps {
  onSelectProject?: (project: Project) => void;
}

export default function ProjectCard({ onSelectProject }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition(cardRef);

  const project = portfolioData.featuredProject;

  // Scroll-linked image parallax (desktop only)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleClick = (e: React.MouseEvent) => {
    if (onSelectProject) {
      e.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <>
      {/* MOBILE CARD (hidden on md+) */}
      <motion.div
        variants={staggerChildVariants}
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={handleClick}
        className="md:hidden flex flex-col justify-between w-full min-h-[280px] h-auto bg-surface border border-border rounded-[12px] p-5 select-none group relative overflow-hidden card-hover-shadow cursor-pointer"
        data-cursor="hover"
      >
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none z-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Top: category badge */}
        <div className="relative z-10 flex justify-between items-start">
          <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#1A1A1A] border border-border rounded-full text-[#3FE8F5]">
            {project.category}
          </span>
          <span className="text-[9px] font-mono tracking-wider text-[#00F0FF] uppercase flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> CASE STUDY
          </span>
        </div>

        {/* Bottom: title, description, arrow */}
        <div className="relative z-10 flex flex-row justify-between items-end mt-auto gap-4 pt-6">
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            <h3 className="font-display font-[300] text-base text-primaryText tracking-tight group-hover:text-[#00F0FF] transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-xs text-secondaryText font-[300] leading-relaxed normal-case line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-border bg-[#1A1A1A]/80 flex items-center justify-center text-primaryText group-hover:border-[#00F0FF] transition-colors duration-300 shrink-0 self-end">
            <ArrowUpRight className="w-4 h-4 text-[#00F0FF]" />
          </div>
        </div>
      </motion.div>

      {/* DESKTOP CARD (hidden on mobile) */}
      <motion.div
        variants={staggerChildVariants}
        whileHover={{ scale: 1.02, y: -4 }}
        ref={cardRef}
        onClick={handleClick}
        style={{
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
        } as React.CSSProperties}
        className="hidden md:block relative h-full w-full p-[1px] rounded-[12px] overflow-hidden project-card-glow select-none group cursor-pointer"
        data-cursor="hover"
      >
        {/* Inner Card Container */}
        <div className="relative w-full h-full min-h-[380px] bg-surface rounded-[11px] p-7 overflow-hidden flex flex-col justify-between z-10">

          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 w-full h-full opacity-35 overflow-hidden pointer-events-none">
            <MotionImage
              src={project.image}
              alt={project.name}
              fill
              style={{ y, scale: 1.25 }}
              sizes="(max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover will-change-transform"
            />
          </div>

          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none z-10" />

          {/* Content Top: Category Badge */}
          <div className="relative z-20 flex justify-between items-start">
            <span className="px-3 py-1 text-[11px] font-mono tracking-wider uppercase bg-[#1A1A1A] border border-border rounded-full text-[#3FE8F5]">
              {project.category}
            </span>
            <span className="text-[11px] font-mono tracking-wider text-[#00F0FF] uppercase flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <BookOpen className="w-3.5 h-3.5" /> READ TECHNICAL CASE STUDY
            </span>
          </div>

          {/* Content Bottom: Title, Description and Arrow */}
          <div className="relative z-20 flex flex-row justify-between items-end mt-auto pt-12 gap-4">
            <div className="flex-1">
              <h3 className="font-display font-[300] text-2xl text-primaryText tracking-tight group-hover:text-[#00F0FF] transition-colors duration-300">
                {project.name}
              </h3>
              <p className="text-sm text-secondaryText mt-2 font-[300] leading-relaxed normal-case">
                {project.description}
              </p>
              <p className="text-xs font-mono text-[#3FE8F5] mt-3 font-[300] uppercase tracking-wide flex items-center gap-1">
                <span>VIEW CASE STUDY & CODE ARCHITECTURE</span> &rarr;
              </p>
            </div>

            <div className="w-10 h-10 rounded-full border border-border bg-[#1A1A1A]/80 flex items-center justify-center text-primaryText group-hover:border-[#00F0FF] transition-colors duration-300 shrink-0 self-end">
              <ArrowUpRight className="w-5 h-5 text-[#00F0FF] transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
