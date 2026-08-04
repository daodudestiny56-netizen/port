"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/lib/data";
import CountUpNumber from "./CountUpNumber";

export default function About() {
  return (
    <section id="about" className="w-full px-4 sm:px-6 md:px-10 py-16 grid-border-bottom bg-[#0D0D0D] text-[#FFFFFF]">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 pb-4 border-b-4 border-[#FFFFFF]"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-white-sm mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#2B4EFF]" />
            <span>FRONTEND DEVELOPER {"//"} MY PROFILE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#FFFFFF]">
            ABOUT ME
          </h2>
        </div>

        <span className="font-mono text-xs font-bold text-[#0D0D0D] uppercase bg-[#FFFFFF] px-3 py-1 border-2 border-[#0D0D0D]">
          EXPERIENCE SUMMARY
        </span>
      </motion.div>

      {/* Concrete 3-Sentence Bio Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto border-4 border-[#FFFFFF] bg-[#FFFFFF] text-[#0D0D0D] p-6 sm:p-10 shadow-brutalist-white-lg"
      >
        <div className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase mb-4 pb-2 border-b-3 border-[#0D0D0D] text-[#2B4EFF]">
          <ShieldCheck className="w-4 h-4 stroke-[3]" />
          <span>WHAT I DO</span>
        </div>

        <p className="font-sans text-base sm:text-xl font-bold leading-relaxed text-[#0D0D0D]">
          I am a Frontend Developer with 2+ years of experience building web applications using Next.js, React, and TypeScript. I focus on creating fast page loads, accessible user interfaces, and smooth performance for web apps. Based in Lagos, Nigeria, I build production frontend interfaces for product teams worldwide.
        </p>

        {/* Dynamic Metric Count-Up Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-3 border-[#0D0D0D]">
          {portfolioData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] p-3 shadow-brutalist-sm hover:border-[#2B4EFF] transition-colors"
            >
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#2B4EFF] block">
                <CountUpNumber value={stat.value} suffix={stat.suffix || "+"} />
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#FFFFFF]/85 uppercase block mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
