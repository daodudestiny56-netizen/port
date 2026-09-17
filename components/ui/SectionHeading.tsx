"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  aside?: React.ReactNode;
  tone?: "ink" | "bone";
}

export default function SectionHeading({ index, kicker, title, aside, tone = "bone" }: SectionHeadingProps) {
  const isInk = tone === "ink";
  const line = isInk ? "border-bone" : "border-ink";
  const words = title.split(" ");

  return (
    <div className={`relative flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 sm:mb-20 pb-6 border-b-4 ${line}`}>
      <div className="min-w-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-5 font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-widest"
        >
          <span className="px-2 py-1 bg-accent text-bone border-2 border-ink">{index}</span>
          <span className={`h-[3px] w-10 ${isInk ? "bg-bone" : "bg-ink"}`} />
          <span className={isInk ? "text-bone" : "text-ink"}>{kicker}</span>
        </motion.div>

        <h2
          className={`font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[clamp(2.6rem,8vw,6.5rem)] ${
            isInk ? "text-bone" : "text-ink"
          }`}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0 pb-[0.04em]">
              <motion.span
                className="inline-block"
                initial={{ y: "105%", scale: 1.4 }}
                whileInView={{ y: "0%", scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 * i }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>

      {aside && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.25 }}
          className={`shrink-0 font-mono text-[11px] sm:text-xs font-bold uppercase px-3 py-2 border-3 ${
            isInk
              ? "bg-bone text-ink border-bone shadow-brutalist-accent"
              : "bg-ink text-bone border-ink shadow-brutalist-accent"
          }`}
        >
          {aside}
        </motion.div>
      )}
    </div>
  );
}
