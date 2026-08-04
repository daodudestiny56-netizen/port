"use client";

import { UserCheck, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="w-full px-4 sm:px-6 md:px-10 py-16 grid-border-bottom">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 pb-4 border-b-4 border-[#0D0D0D]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] text-[#0D0D0D] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-sm mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>ENGINEER PROFILE // VERIFIED</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#0D0D0D]">
            ABOUT THE ENGINEER
          </h2>
        </div>

        <span className="font-mono text-xs font-bold text-[#F5F3EE] uppercase bg-[#3D5AFE] px-3 py-1 border-2 border-[#0D0D0D]">
          ENGINEERING DOSSIER
        </span>
      </div>

      {/* Concrete 3-Sentence Bio Container */}
      <div className="max-w-4xl mx-auto border-4 border-[#0D0D0D] bg-[#FFDE59] text-[#0D0D0D] p-6 sm:p-10 shadow-brutalist-lg">
        <div className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase mb-4 pb-2 border-b-3 border-[#0D0D0D]">
          <ShieldCheck className="w-4 h-4 stroke-[3]" />
          <span>CONFIRMED TECHNICAL BACKGROUND</span>
        </div>

        <p className="font-sans text-base sm:text-xl font-bold leading-relaxed text-[#0D0D0D]">
          I am a Frontend Developer with 2+ years of experience engineering web applications using Next.js, React, and TypeScript. My work focuses on optimizing core web vitals to sub-second load times, writing WCAG 2.1 AAA accessible UI components, and offloading heavy audio/visual computations to background web workers. Based in Lagos, Nigeria, I build production frontend architectures for global product teams and high-concurrency platforms.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-3 border-[#0D0D0D]">
          {portfolioData.stats.map((stat, idx) => (
            <div key={idx} className="bg-[#F5F3EE] border-3 border-[#0D0D0D] p-3 shadow-brutalist-sm">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] block">
                {stat.value}{stat.suffix || "+"}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#0D0D0D] uppercase block mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
