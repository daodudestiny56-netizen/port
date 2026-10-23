"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

const BIO = [
  `I'm a software engineer with ${portfolioData.stats[0].value} years of experience building web applications end to end — from API design and data flow to the interfaces people actually touch.`,
  "My work spans real-time voice streaming, offline-first apps, encrypted client storage and live market data. The common thread: systems that stay fast, predictable and easy to change as they grow.",
  "I write strict, typed code, measure before I optimise, and treat accessibility and performance as requirements rather than polish.",
];

export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading index="04" kicker="About" title="A little about me" />

      <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-soft">
            <Image
              src="/images/portrait.png"
              alt={`${portfolioData.name}, software engineer`}
              fill
              sizes="(max-width: 1024px) 80vw, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={0.06}>
            <div className="space-y-5">
              {BIO.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-lg leading-relaxed sm:text-xl" : "text-base leading-relaxed text-ink/60"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-8 sm:grid-cols-4">
              {portfolioData.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl font-semibold tracking-tight">
                    {stat.value}
                    {stat.suffix ?? "+"}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
