"use client";

import { portfolioData } from "@/lib/data";
import { Block, Command, Line } from "@/components/ui/Transcript";

export default function Principles() {
  return (
    <section id="approach" className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <Block className="space-y-4">
        <Command text="cat principles.md" />
        <Line className="text-[15px] text-muted">The rules I bring to every codebase, mine or inherited.</Line>

        <Line as="div" className="pt-6">
          <ul className="divide-y divide-line/10 border-t border-line/10">
            {portfolioData.principles.map((principle) => (
              <li key={principle.title} className="py-5">
                <p className="text-[17px] font-medium tracking-[-0.01em]">
                  {principle.title.charAt(0) + principle.title.slice(1).toLowerCase()}
                </p>
                <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-dim">{principle.body}</p>
              </li>
            ))}
          </ul>
        </Line>
      </Block>
    </section>
  );
}
