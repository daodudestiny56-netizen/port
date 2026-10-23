"use client";

import Image from "next/image";
import { portfolioData, Project } from "@/lib/data";
import { Block, Command, Divider, Line } from "@/components/ui/Transcript";

const stackLabel = (category: string) => category.toLowerCase().replace(/\s*\/\s*/g, ", ");

function Entry({ project, index }: { project: Project; index: number }) {
  const cs = project.caseStudy;

  return (
    <Block className="space-y-5">
      <Line as="div" className="flex items-baseline justify-between gap-4 border-b border-line/10 pb-3">
        <span className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{project.name.toLowerCase()}</span>
        <span className="shrink-0 text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
      </Line>

      <Line as="div" className="panel overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[13px] bg-surface">
          <Image
            src={project.image}
            alt={`${project.name} interface`}
            fill
            sizes="(max-width: 768px) 100vw, 704px"
            className="object-cover"
          />
        </div>
      </Line>

      <Line className="text-sm text-muted">{stackLabel(project.category)}</Line>

      <Line className="max-w-2xl text-[17px] leading-relaxed text-dim">{project.description}</Line>

      {cs && (
        <>
          <Line as="div" className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-accent">problem</p>
              <p className="mt-2 text-[15px] leading-relaxed text-dim">{cs.problem}</p>
            </div>
            <div>
              <p className="text-sm text-accent">approach</p>
              <p className="mt-2 text-[15px] leading-relaxed text-dim">{cs.approach}</p>
            </div>
          </Line>

          <Line as="div" className="flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
            {cs.metrics.map((m) => (
              <span key={m.label} className="text-muted">
                {m.label.toLowerCase()} <span className="text-fg">{m.value.toLowerCase()}</span>
              </span>
            ))}
          </Line>
        </>
      )}

      <Line as="div">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          open repository
        </a>
      </Line>
    </Block>
  );
}

export default function Work() {
  const projects = [portfolioData.featuredProject, ...portfolioData.projects];

  return (
    <section id="work" className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <Block className="space-y-4">
        <Command text="ls ./work" />
        <Line className="text-[15px] text-muted">
          {projects.length} case studies — the problem, the approach, and the code that did the work.
        </Line>
      </Block>

      <div className="mt-14 space-y-16">
        {projects.map((project, idx) => (
          <div key={project.name} className="space-y-16">
            <Entry project={project} index={idx} />
            {idx < projects.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </section>
  );
}
