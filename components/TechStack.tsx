"use client";

import { portfolioData } from "@/lib/data";
import { Block, Command, Line } from "@/components/ui/Transcript";

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <Block className="space-y-4">
        <Command text="cat stack.md" />

        {portfolioData.toolkit.map((group) => (
          <Line as="div" key={group.group} className="pt-6">
            <p className="text-sm text-accent">{group.group.toLowerCase()}</p>
            <ul className="mt-3 divide-y divide-line/10 border-t border-line/10">
              {group.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-x-8 gap-y-1 py-3 sm:flex-row sm:items-baseline">
                  <span className="w-44 shrink-0 text-[17px]">{item.name}</span>
                  <span className="text-[15px] text-dim">{item.note}</span>
                </li>
              ))}
            </ul>
          </Line>
        ))}
      </Block>
    </section>
  );
}
