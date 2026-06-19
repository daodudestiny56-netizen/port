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
  // Animation 3: custom count up hook over 2000ms
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 border-t border-border pt-6 select-none"
    >
      <span className="font-display font-[300] text-4xl md:text-5xl text-primaryText tracking-tighter">
        {count}
        {suffix}
      </span>
      <span className="font-display text-[10px] md:text-[11px] font-[300] tracking-widest text-secondaryText uppercase">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const stats = portfolioData.stats;
  const { isLoaded } = usePreloader();

  return (
    <section id="about" className="w-full px-6 py-20 md:px-12 bg-transparent select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left Column: Biography Paragraph */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            {isLoaded && (
              <>
                <ClipText
                  text="PHILOSOPHY & HISTORY"
                  lineClassName="font-display text-xs font-[300] tracking-widest text-primaryText uppercase"
                />
                <ClipText
                  text="WORK PRINCIPLE."
                  lineClassName="font-display font-[300] text-2xl sm:text-3xl md:text-4xl text-primaryText tracking-tight"
                  delay={0.08}
                />
              </>
            )}
          </div>

          <FadeUp delay={0.15}>
            <p className="font-sans text-base md:text-lg text-secondaryText leading-[1.8] font-[300]">
              I believe that every pixel of spacing, every line of layout logic, and every animation frame must earn its place.
              No visual noise, no generic templates, and no unnecessary bloat. Just pure typographic hierarchy, hardware-accelerated interactions, and deliberate motion.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.25}>
            <p className="font-sans text-sm md:text-base text-secondaryText/80 leading-[1.8] font-[300]">
              As a frontend engineer working at the intersection of design systems and high-performance web architecture, I bridge the gap between complex data states and flawless user interfaces. I specialize in crafting interactive applications, fluid motion pipelines, and deeply localized, accessible user systems that perform seamlessly on any device.
            </p>
          </FadeUp>
        </div>

        {/* Right Column: Counter Stat Blocks */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:pt-10">
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
