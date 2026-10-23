"use client";

import Image from "next/image";
import EncryptedText from "@/components/ui/encrypted-text";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

const years = portfolioData.stats[0].value;

export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading command="cat about.md" title="A little background" />

      <div className="mt-14 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-xl border border-line/10 bg-surface">
          <Image
            src="/images/portrait.png"
            alt={`${portfolioData.name}, software engineer`}
            fill
            sizes="(max-width: 1024px) 60vw, 260px"
            className="object-cover"
          />
        </div>

        <div className="max-w-xl">
          <p className="text-lg leading-relaxed tracking-[-0.01em]">
            <EncryptedText text="I build things that hold up." className="text-fg" revealDelayMs={38} />{" "}
            <span className="text-dim">
              {`That's ${years} years of shipping web applications end to end — API design, data flow, and the interfaces people actually touch.`}
            </span>
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-dim">
            <p>
              My work spans real-time voice streaming, offline-first apps, encrypted client storage and live market data.
              The common thread is systems that stay fast and predictable as they grow.
            </p>
            <p>
              I write strict, typed code, measure before optimising, and treat accessibility and performance as
              requirements rather than polish. Currently open to software engineering roles, remote-friendly.
            </p>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-line/10 pt-6">
            {portfolioData.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[15px] text-fg">
                  {stat.value}
                  {stat.suffix ?? ""}
                </dt>
                <dd className="mt-1 font-mono text-xs text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
