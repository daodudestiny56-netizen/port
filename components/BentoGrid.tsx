"use client";

import ProjectCard from "./ProjectCard";
import { portfolioData, Project } from "@/lib/data";
import { Terminal } from "lucide-react";

interface BentoGridProps {
  onSelectProject?: (project: Project) => void;
}

export default function BentoGrid({ onSelectProject }: BentoGridProps) {
  return (
    <section id="work" className="w-full px-4 sm:px-6 md:px-10 py-16 grid-border-bottom bg-[#0D0D0D] text-[#FFFFFF]">
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 pb-4 border-b-4 border-[#FFFFFF]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-white-sm mb-3">
            <Terminal className="w-3.5 h-3.5 text-[#2B4EFF]" />
            <span>FEATURED PROJECTS <span className="text-[#2B4EFF]">{"//"}</span> CASE STUDIES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#FFFFFF]">
            MY PROJECTS
          </h2>
        </div>

        <span className="font-mono text-xs font-bold text-[#0D0D0D] uppercase bg-[#FFFFFF] px-3 py-1 border-2 border-[#0D0D0D]">
          {portfolioData.projects.length + 1} PROJECTS BUILT
        </span>
      </div>

      {/* Grid of Projects (2-col desktop, 1-col mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Featured Project */}
        <ProjectCard
          project={portfolioData.featuredProject}
          onSelectProject={onSelectProject}
          index={0}
        />

        {/* Remaining Projects */}
        {portfolioData.projects.map((project, idx) => (
          <ProjectCard
            key={project.name}
            project={project}
            onSelectProject={onSelectProject}
            index={idx + 1}
          />
        ))}
      </div>
    </section>
  );
}
