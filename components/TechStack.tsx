"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading command="cat stack.md" title="What I build with" />

      <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
        {portfolioData.toolkit.map((group) => (
          <div key={group.group}>
            <p className="font-mono text-xs text-muted">{group.group.toLowerCase()}</p>
            <ul className="mt-5 space-y-5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <p className="text-[15px] font-medium tracking-[-0.01em]">{item.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
