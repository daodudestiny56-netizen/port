"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, Terminal } from "lucide-react";
import { Project } from "@/lib/data";
import MagneticCard from "./MagneticCard";

interface ProjectCardProps {
  project: Project;
  onSelectProject?: (project: Project) => void;
  index?: number;
}

export default function ProjectCard({ project, onSelectProject, index = 0 }: ProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onSelectProject) {
      e.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <MagneticCard
      onClick={handleClick}
      shadowColor="#FFFFFF"
      className="w-full bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between h-full min-h-[380px] group relative overflow-hidden"
    >
      {/* Card Header: Category Chip + Case Study Label */}
      <div className="relative z-10 flex flex-wrap justify-between items-start gap-2 pb-4 border-b-2 border-[#FFFFFF]/30">
        <span className="px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase bg-[#FFFFFF] text-[#0D0D0D] border-2 border-[#0D0D0D]">
          {project.category}
        </span>
        <span className="text-[11px] font-mono font-bold tracking-wider text-[#FFFFFF] uppercase flex items-center gap-1.5 bg-[#0D0D0D] px-2 py-0.5 border border-[#FFFFFF]">
          <BookOpen className="w-3.5 h-3.5" /> CASE STUDY #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card Image preview */}
      {project.image && (
        <div className="relative w-full h-40 my-4 border-2 border-[#FFFFFF]/30 overflow-hidden bg-[#161616]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#0D0D0D]/40 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      )}

      {/* Title & Description */}
      <div className="relative z-10 flex flex-col gap-3 mt-auto pt-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#FFFFFF] uppercase">
            {project.name}
          </h3>
          <div className="w-10 h-10 border-2 border-[#0D0D0D] bg-[#FFFFFF] text-[#0D0D0D] flex items-center justify-center shrink-0 group-hover:bg-[#0D0D0D] group-hover:text-[#FFFFFF] group-hover:border-[#FFFFFF] transition-colors duration-300">
            <ArrowUpRight className="w-6 h-6 stroke-[3]" />
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#FFFFFF]/85 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Pills in JetBrains Mono */}
        {project.caseStudy?.metrics && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.caseStudy.metrics.slice(0, 3).map((m, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#FFFFFF] text-[#0D0D0D] border border-[#0D0D0D]"
              >
                {m.label}: {m.value}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#FFFFFF] uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>VIEW TECHNICAL CASE STUDY & CODE</span>
        </div>
      </div>
    </MagneticCard>
  );
}
