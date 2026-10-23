"use client";

import Image from "next/image";
import { portfolioData } from "@/lib/data";
import { Block, Command, Line } from "@/components/ui/Transcript";

const years = portfolioData.stats[0].value;

const BIO = [
  `${years} years of shipping web applications end to end — API design, data flow, and the interfaces people actually touch.`,
  "My work spans real-time voice streaming, offline-first apps, encrypted client storage and live market data. The common thread is systems that stay fast and predictable as they grow.",
  "I write strict, typed code, measure before optimising, and treat accessibility and performance as requirements rather than polish.",
];

export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <Block className="space-y-4">
        <Command text="cat about.md" />

        <Line as="div" className="panel overflow-hidden pt-0">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[13px] bg-surface">
            <Image
              src="/images/portrait.png"
              alt={portfolioData.name}
              fill
              sizes="(max-width: 768px) 100vw, 704px"
              className="object-cover object-[center_25%]"
            />
          </div>
        </Line>

        {BIO.map((paragraph, i) => (
          <Line key={i} className="max-w-2xl pt-2 text-[17px] leading-relaxed text-dim">
            {paragraph}
          </Line>
        ))}

        <Line as="div" className="flex flex-wrap gap-x-10 gap-y-3 pt-5 text-[15px]">
          {portfolioData.stats.map((stat) => (
            <span key={stat.label} className="text-muted">
              <span className="text-fg">
                {stat.value}
                {stat.suffix ?? ""}
              </span>{" "}
              {stat.label}
            </span>
          ))}
          <span className="text-muted">
            <span className="text-fg">open</span> to roles, remote-friendly
          </span>
        </Line>
      </Block>
    </section>
  );
}
