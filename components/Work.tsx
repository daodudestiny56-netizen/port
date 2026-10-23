"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData, Project } from "@/lib/data";

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

/** Shortens "NEXT.JS / VOICE-AUTH" to the lowercase stack line used in the list. */
const stackLabel = (category: string) => category.toLowerCase().replace(/\s*\/\s*/g, ", ");

export default function Work({ onSelectProject }: WorkProps) {
  const projects = [portfolioData.featuredProject, ...portfolioData.projects];
  const [preview, setPreview] = useState<Project>(projects[0]);

  return (
    <section id="work" className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        command="ls ./work"
        title="Case studies"
        description="Six builds. Each one opens with the problem it solved, the approach, and the code that did the work."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <ul className="border-t border-line/10">
          {projects.map((project) => (
            <li key={project.name}>
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setPreview(project)}
                onFocus={() => setPreview(project)}
                className="group grid w-full gap-y-3 border-b border-line/10 py-5 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6"
              >
                <span className="text-lg font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                  {project.name.toLowerCase()}
                </span>

                <span className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted sm:justify-end">
                  <span>{stackLabel(project.category)}</span>
                  <span className="w-9 text-right text-accent opacity-0 transition-opacity group-hover:opacity-100">open</span>
                </span>

                {/* Mobile and tablet preview — the hover panel is desktop-only. */}
                <span className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-line/10 bg-surface sm:col-span-3 lg:hidden">
                  <Image src={project.image} alt="" fill sizes="(max-width: 1024px) 100vw, 0px" className="object-cover opacity-70" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="glass relative aspect-[4/3] overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={preview.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={preview.image}
                    alt={`${preview.name} interface`}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-page via-page/80 to-transparent px-4 pb-4 pt-10 font-mono text-xs text-dim">
                    {stackLabel(preview.category)}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-dim">{preview.description.split(" — ")[0]}.</p>
            <p className="mt-3 font-mono text-xs text-muted">Select a row to read the case study.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
