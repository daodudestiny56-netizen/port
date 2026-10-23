"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

const LightBulbScene = dynamic(() => import("@/components/three/LightBulbScene"), { ssr: false });

const FACTS = [
  { label: "Experience", value: `${portfolioData.stats[0].value} years` },
  { label: "Focus", value: "Full-stack web" },
  { label: "Core stack", value: "TypeScript · React · Node" },
  { label: "Availability", value: "Open to roles · Remote" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="hero" className="mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-12">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45"
          >
            Software engineer · {portfolioData.stats[0].value} years
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Engineering software that scales, ships and lasts.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            {`I'm Daodu Destiny — I build production web applications, APIs and real-time interfaces, with architecture that stays clean and easy to change long after launch.`}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-accent"
            >
              View selected work
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Interactive light bulb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative h-[340px] overflow-hidden rounded-3xl border border-ink/10 bg-card shadow-soft sm:h-[420px]">
            <LightBulbScene />
          </div>
        </motion.div>
      </div>

      <motion.dl
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-8 sm:mt-20 lg:grid-cols-4"
      >
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">{fact.label}</dt>
            <dd className="mt-2 text-sm font-medium sm:text-base">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
