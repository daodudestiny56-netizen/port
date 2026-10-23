"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import EncryptedText from "@/components/ui/encrypted-text";
import { Caret, Prompt, TerminalPanel } from "@/components/ui/Terminal";

const LightBulbScene = dynamic(() => import("@/components/three/LightBulbScene"), { ssr: false });

const years = portfolioData.stats[0].value;

/** The page's one orchestrated entrance: the transcript prints itself, line by line. */
const line = (i: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const, delay: 0.12 + i * 0.14 },
});

export default function Hero() {
  return (
    <section id="hero" className="mx-auto w-full max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-36">
      <motion.div {...line(0)} className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
        <span className="text-muted">guest@portfolio:~</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line/15 px-2.5 py-1 text-dim">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          available for work
        </span>
      </motion.div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div>
          <motion.div {...line(1)}>
            <Prompt>whoami</Prompt>
            <h1 className="mt-4 text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
              <EncryptedText text="Daodu Destiny" revealDelayMs={45} startDelayMs={260} />
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-dim sm:text-base">
              Software engineer, {years} years in. I build production web applications, APIs and real-time interfaces — and
              keep them fast and easy to change long after launch.
            </p>
          </motion.div>

          <motion.div {...line(2)} className="mt-10">
            <Prompt>cat focus.txt</Prompt>
            <ul className="mt-4 max-w-lg space-y-2 text-[15px] text-dim sm:text-base">
              <li>Real-time interfaces that stay smooth under load.</li>
              <li>Offline-first apps for unreliable networks.</li>
              <li>Typed, tested code that outlives its first release.</li>
            </ul>
          </motion.div>

          <motion.div {...line(3)} className="mt-10">
            <Prompt>ls ./actions</Prompt>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-sm">
              <a
                href="#work"
                className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-accent transition-colors hover:bg-accent/20"
              >
                view work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-line/15 px-4 py-2 text-dim transition-colors hover:border-line/30 hover:text-fg"
              >
                get in touch
              </a>
              <Caret className="hidden sm:inline-block" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:pt-1"
        >
          <TerminalPanel label="~/filament.tsx" status="idle" className="h-[320px] lg:h-[400px]" bodyClassName="relative h-[calc(100%-41px)]">
            <LightBulbScene />
          </TerminalPanel>
        </motion.div>
      </div>
    </section>
  );
}
