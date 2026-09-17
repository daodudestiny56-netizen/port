"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolioData, Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
  onSelectProject: (project: Project) => void;
}

export default function ProjectCard({ project, index, featured = false, onSelectProject }: ProjectCardProps) {
  const open = () => onSelectProject(project);
  const caseNo = String(index + 1).padStart(2, "0");

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      aria-label={`Open ${project.name} case study`}
      data-cursor="hover"
      className={`group relative h-full bg-bone text-ink border-3 border-ink shadow-[8px_8px_0_rgb(var(--accent))] hover:shadow-[14px_14px_0_rgb(var(--accent))] hover:-translate-x-1 hover:-translate-y-1 transition-[transform,box-shadow] duration-200 flex ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden border-ink bg-surface ${
          featured ? "h-60 sm:h-80 lg:h-auto lg:w-[55%] border-b-3 lg:border-b-0 lg:border-r-3" : "h-52 sm:h-56 border-b-3"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover grayscale-[70%] group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-500" />
        <span className="absolute top-3 left-3 px-2 py-1 bg-ink text-bone border-2 border-bone font-mono text-[10px] font-extrabold uppercase">
          CASE {caseNo}
        </span>
        {featured && (
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-accent text-bone border-2 border-ink font-mono text-[10px] font-extrabold uppercase -rotate-2">
            ★ FEATURED BUILD
          </span>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-col gap-4 p-5 sm:p-6 flex-1 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2 py-1 border-2 border-ink">
            {project.category}
          </span>
          <span className="grid place-items-center w-11 h-11 shrink-0 bg-ink text-bone border-3 border-ink group-hover:bg-accent group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight className="w-6 h-6 stroke-[3]" />
          </span>
        </div>

        <h3
          className={`font-display font-extrabold uppercase tracking-tight leading-[0.9] group-hover:text-accent transition-colors ${
            featured ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
          }`}
        >
          {project.name}
        </h3>

        <p className={`font-sans font-medium leading-relaxed text-ink/80 ${featured ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>
          {project.description}
        </p>

        {featured && project.caseStudy && (
          <p className="font-sans text-sm leading-relaxed border-l-[5px] border-accent pl-3">
            <span className="font-mono text-[10px] font-extrabold uppercase block text-accent">The challenge</span>
            {project.caseStudy.problem}
          </p>
        )}

        {project.caseStudy && (
          <ul className="flex flex-wrap gap-2 mt-auto pt-2">
            {project.caseStudy.metrics.map((m) => (
              <li key={m.label} className="px-2 py-1 bg-ink text-bone font-mono text-[10px] font-bold uppercase">
                <span className="text-accent-light">{m.label}</span> {m.value}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between pt-3 border-t-3 border-ink font-mono text-[11px] font-extrabold uppercase">
          <span className="relative">
            READ CASE STUDY
            <span className="absolute left-0 -bottom-0.5 h-[3px] w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </span>
          <span className="text-ink/50">{caseNo} / {String(portfolioData.projects.length + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </article>
  );
}
