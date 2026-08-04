"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AsciiPortrait from "@/components/AsciiPortrait";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

interface HeroProps {
  currentTheme?: "bone" | "ink";
}

export default function Hero({ currentTheme = "bone" }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none grid-border-bottom">
      {/* Sticker Navigation Header */}
      <Navbar currentTheme={currentTheme} />

      {/* Main Hero Layout: Headline + ASCII Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center my-auto py-8 w-full">
        {/* Left Column: Big Headline & Concrete Positioning */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3D5AFE] text-[#F5F3EE] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-sm">
            <span>FRONTEND ARCHITECTURE</span>
            <span>{"//"}</span>
            <span>WCAG 2.1 AAA</span>
          </div>

          {/* Bricolage Grotesque Weight 800 Headline */}
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.92] text-[#0D0D0D] tracking-tight uppercase">
            ENGINEERING HIGH-PERFORMANCE WEB INTERFACES & DESIGN SYSTEMS
          </h1>

          {/* One-line Real Positioning Statement in Mono Type */}
          <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#0D0D0D] leading-relaxed max-w-2xl bg-[#FFDE59] p-3.5 border-3 border-[#0D0D0D] shadow-brutalist">
            DAODU DESTINY — Frontend engineer specializing in Next.js, React, and TypeScript. Building sub-second web applications, 60fps interaction physics, and resilient state architectures.
          </p>

          {/* Action CTAs with Hard Shadows */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Bold Primary CTA */}
            <motion.a
              href="#work"
              whileHover={{ x: -2, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-6 py-3.5 bg-[#FFDE59] text-[#0D0D0D] font-mono text-xs sm:text-sm font-extrabold uppercase border-3 border-[#0D0D0D] shadow-brutalist-lg flex items-center gap-2.5"
              data-cursor="hover"
            >
              <span>EXPLORE CASE STUDIES</span>
              <ArrowDownRight className="w-5 h-5 stroke-[3]" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: -2, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-6 py-3.5 bg-[#3D5AFE] text-[#F5F3EE] font-mono text-xs sm:text-sm font-extrabold uppercase border-3 border-[#0D0D0D] shadow-brutalist-lg flex items-center gap-2.5"
              data-cursor="hover"
            >
              <span>GITHUB REPOSITORY</span>
              <ArrowUpRight className="w-5 h-5 stroke-[3]" />
            </motion.a>
          </div>
        </div>

        {/* Right Column: ASCII Matrix Portrait */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <AsciiPortrait imageSrc="/images/portrait.jpg" />
        </div>
      </div>

      {/* Footer Spec Bar */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 border-t-3 border-[#0D0D0D] font-mono text-[10px] sm:text-xs font-bold uppercase">
        <span className="bg-[#F5F3EE] px-2 py-0.5 border-2 border-[#0D0D0D]">
          LOCATION: LAGOS, NIGERIA (UTC+1) // REMOTE AVAILABLE
        </span>
        <span className="bg-[#FFDE59] px-2 py-0.5 border-2 border-[#0D0D0D]">
          STATUS: OPEN TO FRONTEND ROLES
        </span>
      </div>
    </section>
  );
}
