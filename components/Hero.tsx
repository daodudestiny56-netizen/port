"use client";

import { portfolioData } from "@/lib/data";
import { Block, Command, Line } from "@/components/ui/Transcript";

const years = portfolioData.stats[0].value;

export default function Hero() {
  return (
    <section id="hero" className="mx-auto w-full max-w-3xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
      <Block className="space-y-4">
        <Line className="text-sm text-muted">guest@daodu — session opened</Line>

        <Command text="whoami" />

        <Line className="pt-2 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[4rem]" as="div">
          Daodu Destiny
        </Line>

        <Line className="max-w-xl text-[17px] leading-relaxed text-dim">
          Software engineer, {years} years in. I build production web applications, APIs and real-time interfaces — and
          keep them fast and easy to change long after launch.
        </Line>

        <Line as="div" className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            available for work
          </span>
          <span>remote-friendly</span>
          <span>{portfolioData.email}</span>
        </Line>
      </Block>
    </section>
  );
}
