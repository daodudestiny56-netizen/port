"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

export default function Principles() {
  return (
    <section id="principles" className="border-y border-ink/10 bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="03"
          kicker="How I work"
          title="Engineering principles"
          description="The rules I apply to every codebase I touch."
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={Math.min(i, 3) * 0.05}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
