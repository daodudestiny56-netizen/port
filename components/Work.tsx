"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolioData, Project } from "@/lib/data";
import { Block, Command, Divider, Line } from "@/components/ui/Transcript";

function Entry({ project, index }: { project: Project; index: number }) {
  return (
    <Block className="space-y-5">
      <Line as="div" className="flex items-baseline justify-between gap-4 border-b border-line/10 pb-3">
        <span className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{project.name.toLowerCase()}</span>
        <span className="shrink-0 text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
      </Line>

      <Line as="div" className="panel overflow-hidden">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[13px] bg-surface">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 704px"
              className="object-cover object-top"
            />
          </div>
        </a>
      </Line>

      <Line className="text-sm text-muted">
        {project.stack}
        {project.hackathon && <span className="text-accent"> · {project.hackathon}</span>}
      </Line>

      <Line className="max-w-2xl text-[17px] leading-relaxed text-dim">{project.description}</Line>

      <Line as="div">
        <ul className="max-w-2xl space-y-1.5 text-[15px] text-dim">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="select-none text-accent">
                —
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </Line>

      <Line as="div" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          open live site
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim underline decoration-line/20 underline-offset-4 transition-colors hover:text-fg"
        >
          source
        </a>
      </Line>
    </Block>
  );
}

export default function Work() {
  const { projects } = portfolioData;

  return (
    <section id="work" className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <Block className="space-y-4">
        <Command text="ls ./work --live" />
        <Line className="text-[15px] text-muted">
          {projects.length} projects, every one of them deployed and reachable right now.
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

      <Block className="mt-20 space-y-4">
        <Command text="cd ./hackathons" />
        <Line className="max-w-xl text-[15px] text-muted">
          {portfolioData.hackathons.length} of these were built under a deadline, at events like Zecathon and the OpenAI
          WebMCP Challenge.
        </Line>
        <Line as="div">
          <Link
            href="/hackathons"
            className="text-[15px] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            read the hackathon log
          </Link>
        </Line>
      </Block>
    </section>
  );
}
