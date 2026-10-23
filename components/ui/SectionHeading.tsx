"use client";

import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  description?: string;
  tone?: "ink" | "bone";
}

export default function SectionHeading({ index, kicker, title, description, tone = "bone" }: SectionHeadingProps) {
  const isInk = tone === "ink";

  return (
    <Reveal className="max-w-2xl">
      <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${isInk ? "text-bone/45" : "text-ink/45"}`}>
        {index} — {kicker}
      </p>
      <h2
        className={`mt-4 font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08] ${
          isInk ? "text-bone" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isInk ? "text-bone/65" : "text-ink/60"}`}>{description}</p>
      )}
    </Reveal>
  );
}
