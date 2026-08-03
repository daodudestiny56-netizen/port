"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { portfolioData } from "@/lib/data";
import ClipText from "@/components/ui/ClipText";
import FadeUp from "@/components/ui/FadeUp";
import { usePreloader } from "@/context/PreloaderContext";

interface StatBlockProps {
  value: number;
  label: string;
  suffix?: string;
}

function StatBlock({ value, label, suffix = "" }: StatBlockProps) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 border-t border-border pt-4 sm:pt-6 select-none"
    >
      <span className="font-display font-[300] text-[clamp(2rem,6vw,3.25rem)] text-primaryText tracking-tighter leading-none">
        {count}
        {suffix}
      </span>
      <span className="font-mono text-[clamp(9px,2.5vw,11px)] font-[300] tracking-widest text-secondaryText leading-snug">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const stats = portfolioData.stats;
  const { isLoaded } = usePreloader();

  return (
    <section id="about" className="w-full px-4 sm:px-6 md:px-12 py-[clamp(2.5rem,6vw,5rem)] bg-transparent select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
        {/* Left Column: Headline & Paragraph */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            {isLoaded && (
              <>
                <ClipText
                  text="Philosophy & history"
                  lineClassName="font-mono text-xs font-[300] tracking-widest text-[#3FE8F5]"
                />
                <ClipText
                  text="Work principle."
                  lineClassName="font-display font-[300] text-[clamp(1.5rem,4vw+0.5rem,2.5rem)] text-primaryText tracking-tight"
                  delay={0.08}
                />
              </>
            )}
          </div>

          <FadeUp delay={0.15}>
            <p className="font-sans text-[clamp(0.95rem,2vw,1.125rem)] text-secondaryText leading-[1.8] font-[300]">
              I focus on core frontend engineering: clean component architecture, predictable state management, and optimized asset delivery. By combining strict TypeScript typing with hardware-accelerated motion, I build web applications that load fast, scale cleanly, and deliver reliable user experiences.
            </p>
          </FadeUp>
        </div>

        {/* Right Column: Counter Stat Blocks */}
        <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 md:gap-y-10 md:pt-10">
          {stats.map((stat, index) => (
            <StatBlock
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
