"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/lib/data";
import CountUpNumber from "./CountUpNumber";
import HangingCard from "@/components/ui/HangingCard";
import SectionHeading from "@/components/ui/SectionHeading";

const BIO = [
  `I'm Daodu Destiny, a software engineer with ${portfolioData.stats[0].value} years of experience building web applications end to end — from API design and data flow to the interfaces people actually touch.`,
  "My work spans real-time voice streaming, offline-first apps, encrypted client storage and live market data. The common thread: systems that stay fast, predictable and easy to change as they grow.",
  "I write strict, typed code, measure before I optimise, and treat accessibility and performance as requirements rather than polish. I'm open to software engineering roles and remote-friendly teams.",
];

export default function About() {
  const yearsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: yearsRef, offset: ["start end", "center center"] });
  const yearsScale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const yearsRotate = useTransform(scrollYProgress, [0, 1], [-20, -4]);

  const years = portfolioData.stats[0];

  return (
    <section id="about" className="relative w-full px-4 sm:px-6 md:px-10 pt-24 pb-28 bg-bone text-ink board-grid-bone overflow-x-clip">
      <SectionHeading
        index="04"
        kicker="PROFILE"
        title="ABOUT ME"
        aside={
          <>
            {years.value} YEARS <span className="text-accent-light">·</span> REMOTE FRIENDLY
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
        {/* Zooming years stamp */}
        <div className="lg:col-span-5 lg:self-stretch">
          <div ref={yearsRef} className="flex justify-center lg:sticky lg:top-40">
          <motion.div style={{ scale: yearsScale, rotate: yearsRotate }} className="relative">
            <div className="relative bg-accent text-bone border-4 border-ink shadow-[16px_16px_0_rgb(var(--ink))] px-8 sm:px-12 pt-6 pb-8">
              <span className="block font-mono text-xs font-extrabold uppercase tracking-widest">EXPERIENCE</span>
              <span className="block font-display font-extrabold leading-[0.8] text-[clamp(9rem,26vw,18rem)] tracking-tighter">
                <CountUpNumber value={years.value} duration={1400} className="tabular-nums" />
                <span className="text-outline-bone">+</span>
              </span>
              <span className="block font-display font-extrabold text-2xl sm:text-3xl uppercase leading-none">Years building software</span>
            </div>
            <span className="absolute -top-5 -right-6 rotate-12 px-3 py-1.5 bg-bone border-3 border-ink shadow-brutalist-sm font-mono text-[11px] font-extrabold uppercase">
              AND COUNTING
            </span>
          </motion.div>
          </div>
        </div>

        {/* Bio + stats */}
        <div className="lg:col-span-7 flex flex-col gap-16">
          <HangingCard attachment="tape" attachmentColor="accent" tilt={-0.8} swayAngle={0.4} swayDuration={8}>
            <div className="relative bg-bone border-3 border-ink shadow-brutalist-lg p-6 sm:p-10">
              <div className="flex items-center justify-between pb-3 mb-6 border-b-3 border-ink font-mono text-xs font-extrabold uppercase tracking-widest">
                <span>README.md</span>
                <span className="text-accent">WHAT I DO</span>
              </div>
              <div className="space-y-5">
                {BIO.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-sans leading-relaxed ${i === 0 ? "text-xl sm:text-2xl font-bold" : "text-base sm:text-lg font-medium text-ink/85"}`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </HangingCard>

          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-12">
            {portfolioData.stats.slice(1).map((stat, idx) => (
              <li key={stat.label}>
                <HangingCard
                  attachment="pin"
                  attachmentColor={idx % 2 ? "ink" : "accent"}
                  tilt={idx % 2 ? 2.5 : -2.5}
                  swayAngle={2}
                  swayDuration={4 + idx * 0.6}
                  delay={0.1 * idx}
                >
                  <div
                    className={`border-3 border-ink shadow-brutalist p-4 pt-6 ${
                      idx === 1 ? "bg-accent text-bone" : idx === 0 ? "bg-ink text-bone" : "bg-bone"
                    }`}
                  >
                    <span className="block font-display font-extrabold text-4xl sm:text-5xl leading-none tabular-nums">
                      <CountUpNumber value={stat.value} suffix={stat.suffix ?? "+"} />
                    </span>
                    <span className="block mt-2 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">{stat.label}</span>
                  </div>
                </HangingCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
