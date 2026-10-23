"use client";

import ProjectCard from "./ProjectCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData, Project } from "@/lib/data";

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

export default function Work({ onSelectProject }: WorkProps) {
  const projects = [portfolioData.featuredProject, ...portfolioData.projects];

  return (
    <section id="work" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="01"
        kicker="Selected work"
        title="Case studies"
        description="Six builds, each with the problem it solved and the code behind it. Select one to read the detail."
      />

      <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2">
        {projects.map((project, idx) => (
          <Reveal key={project.name} delay={Math.min(idx, 3) * 0.05} className="h-full">
            <ProjectCard project={project} index={idx} onSelectProject={onSelectProject} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
