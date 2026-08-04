"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Globe } from "lucide-react";

interface ProfessionalPortraitProps {
  imageSrc?: string;
  className?: string;
}

export default function ProfessionalPortrait({
  imageSrc = "/images/portrait.jpg",
  className = "",
}: ProfessionalPortraitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-md mx-auto group select-none ${className}`}
    >
      {/* Outer Brutalist Frame */}
      <div className="relative w-full bg-[#0D0D0D] border-4 border-[#0D0D0D] shadow-brutalist-lg hover:shadow-brutalist-blueprint-lg transition-all duration-300 overflow-hidden">
        {/* Top Header Stamp */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D0D0D] border-b-4 border-[#FFFFFF] text-[#FFFFFF] font-mono text-[11px] font-extrabold uppercase">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2B4EFF]" />
            <span>ENGINEER PROFILE <span className="text-[#2B4EFF]">{"//"}</span> VERIFIED</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#FFFFFF] text-[#0D0D0D] text-[10px]">
            <Activity className="w-3 h-3 text-[#2B4EFF]" />
            <span>LIVE</span>
          </div>
        </div>

        {/* High-Resolution Professional Image Wrapper */}
        <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
          <Image
            src={imageSrc}
            alt="Daodu Destiny - Frontend Developer"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 transform group-hover:scale-105"
          />

          {/* Vignette & High-Contrast Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Decorative Corner Bracket Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-3 border-l-3 border-[#2B4EFF]" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-3 border-r-3 border-[#2B4EFF]" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-3 border-l-3 border-[#2B4EFF]" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-3 border-r-3 border-[#2B4EFF]" />
        </div>

        {/* Bottom Metadata Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D] border-t-4 border-[#FFFFFF] text-[#FFFFFF] font-mono text-xs font-bold uppercase">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#2B4EFF]" />
            <span>REMOTE AVAILABLE</span>
          </div>
          <span className="bg-[#FFFFFF] text-[#0D0D0D] px-2 py-0.5 text-[10px] font-extrabold border border-[#0D0D0D]">
            FRONTEND ARCHITECT
          </span>
        </div>
      </div>
    </motion.div>
  );
}
