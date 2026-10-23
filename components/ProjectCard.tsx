"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

export default function ProjectCard({ project, index, onSelectProject }: ProjectCardProps) {
  const open = () => onSelectProject(project);

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
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
            {String(index + 1).padStart(2, "0")} · {project.category}
          </p>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition-colors group-hover:text-accent" />
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{project.name}</h3>
        <p className="text-sm leading-relaxed text-ink/60">{project.description}</p>

        {project.caseStudy && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-3">
            {project.caseStudy.metrics.slice(0, 3).map((m) => (
              <li key={m.label} className="rounded-full bg-ink/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/55">
                {m.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
