"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

export default function TechStack() {
  return (
    <section id="toolkit" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="02"
        kicker="Toolkit"
        title="Tools I reach for"
        description="What I use day to day, and what I use it for."
      />

      <div className="mt-14 grid gap-x-12 gap-y-12 sm:mt-16 md:grid-cols-3">
        {portfolioData.toolkit.map((group, groupIdx) => (
          <Reveal key={group.group} delay={groupIdx * 0.06}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">{group.group}</h3>
            <ul className="mt-5 border-t border-ink/10">
              {group.items.map((item) => (
                <li key={item.name} className="border-b border-ink/10 py-4">
                  <p className="text-base font-medium tracking-tight">{item.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/55">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
