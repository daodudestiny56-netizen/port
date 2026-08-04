"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProfessionalPortrait from "@/components/ProfessionalPortrait";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

interface HeroProps {
  currentTheme?: "bone" | "ink";
}

export default function Hero({ currentTheme = "bone" }: HeroProps) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between p-3 sm:p-6 md:p-10 select-none grid-border-bottom overflow-hidden bg-[#FFFFFF] text-[#0D0D0D]">
      {/* Sticker Navigation Header */}
      <Navbar currentTheme={currentTheme} />

      {/* Main Hero Layout: Headline + Concrete Positioning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center my-auto py-6 sm:py-8 w-full max-w-full">
        {/* Left Column: Big Headline & Simple Positioning */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-6 w-full max-w-full">
          {/* Tagline Badges */}
          <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] text-[10px] sm:text-xs font-mono font-bold uppercase shadow-brutalist-sm max-w-full">
            <span>FRONTEND ARCHITECTURE</span>
            <span className="hidden xs:inline text-[#2B4EFF]">{"//"}</span>
            <span>WCAG 2.1 AAA</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-[clamp(2rem,6.5vw,5.5rem)] leading-[0.94] text-[#0D0D0D] tracking-tight uppercase break-words w-full">
            ENGINEERING HIGH-PERFORMANCE WEB INTERFACES & DESIGN SYSTEMS
          </h1>

          {/* One-line Positioning Statement */}
          <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#FFFFFF] leading-relaxed w-full max-w-2xl bg-[#0D0D0D] p-3 sm:p-4 border-3 border-[#0D0D0D] shadow-brutalist">
            <span className="text-[#2B4EFF]">DAODU DESTINY</span> — Frontend Developer. I build fast, accessible, and smooth web applications using Next.js, React, and TypeScript.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 pt-2">
            {/* Primary CTA */}
            <motion.a
              href="#work"
              whileHover={{ x: -2, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full sm:w-auto min-h-[44px] px-5 sm:px-6 py-3 bg-[#0D0D0D] text-[#FFFFFF] font-mono text-xs sm:text-sm font-extrabold uppercase border-3 border-[#0D0D0D] shadow-brutalist-lg hover:shadow-brutalist-blueprint-lg flex items-center justify-center gap-2.5 transition-all duration-200"
              data-cursor="hover"
            >
              <span>VIEW MY WORK</span>
              <ArrowDownRight className="w-5 h-5 stroke-[3] text-[#2B4EFF] shrink-0" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: -2, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full sm:w-auto min-h-[44px] px-5 sm:px-6 py-3 bg-[#FFFFFF] text-[#0D0D0D] font-mono text-xs sm:text-sm font-extrabold uppercase border-3 border-[#0D0D0D] shadow-brutalist-lg hover:shadow-brutalist-blueprint-lg flex items-center justify-center gap-2.5 transition-all duration-200"
              data-cursor="hover"
            >
              <span>GITHUB REPOSITORY</span>
              <ArrowUpRight className="w-5 h-5 stroke-[3] text-[#2B4EFF] shrink-0" />
            </motion.a>
          </div>
        </div>

        {/* Right Column: Professional Portrait Photo Card */}
        <div className="lg:col-span-5 w-full flex items-center justify-center max-w-full overflow-hidden">
          <ProfessionalPortrait imageSrc="/images/portrait.jpg" />
        </div>
      </div>

      {/* Footer Spec Bar */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 pt-4 border-t-3 border-[#0D0D0D] font-mono text-[10px] sm:text-xs font-bold uppercase">
        <span className="bg-[#FFFFFF] text-[#0D0D0D] px-2.5 py-1 border-2 border-[#0D0D0D] text-center sm:text-left">
          LOCATION: LAGOS, NIGERIA (UTC+1) <span className="text-[#2B4EFF]">{"//"}</span> REMOTE AVAILABLE
        </span>
        <span className="bg-[#0D0D0D] text-[#FFFFFF] px-2.5 py-1 border-2 border-[#0D0D0D] text-center sm:text-right">
          STATUS: <span className="text-[#2B4EFF]">OPEN TO FRONTEND ROLES</span>
        </span>
      </div>
    </section>
  );
}
