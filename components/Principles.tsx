"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

export default function Principles() {
  return (
    <section id="approach" className="border-y border-line/10 bg-surface">
      <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          command="cat principles.md"
          title="How I work"
          description="The rules I bring to every codebase, whether it's mine or inherited."
        />

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {portfolioData.principles.map((principle) => (
            <div key={principle.title} className="border-t border-line/10 pt-5">
              <dt className="text-[15px] font-medium tracking-[-0.01em]">
                {principle.title.charAt(0) + principle.title.slice(1).toLowerCase()}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-dim">{principle.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
