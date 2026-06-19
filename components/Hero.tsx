"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { EASE_PORTFOLIO } from "@/lib/animations";
import { usePreloader } from "@/context/PreloaderContext";
import ClipText from "@/components/ui/ClipText";

export default function Hero() {
  const words = ["BUILDING", "DIGITAL", "EXPERIENCES"];
  const { isLoaded } = usePreloader();

  // Mobile duration reducer helper (30% reduction => factor of 0.7)
  const getDuration = (base: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return base * 0.7;
    }
    return base;
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getDuration(0.8),
        ease: EASE_PORTFOLIO,
        delay: 0.5,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 bg-transparent select-none overflow-hidden">
      {/* Top Header Row */}
      <div className="flex justify-between items-center w-full z-10 gap-4">
        <span className="font-display text-xs sm:text-sm md:text-base font-[300] tracking-wider md:tracking-widest text-secondaryText uppercase truncate">
          {portfolioData.name}
        </span>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-[10px] md:text-xs font-[300] tracking-wide shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryText opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primaryText"></span>
          </span>
          <span className="text-primaryText">{portfolioData.status}</span>
        </div>
      </div>

      {/* Center Typography — staggered clip mask reveal heading */}
      <div className="flex flex-col justify-center items-start my-auto w-full">
        {isLoaded && (
          <ClipText
            text={words}
            typewriterLineIndex={1}
            lineClassName="font-display font-[300] text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] leading-none text-primaryText uppercase select-none origin-bottom"
          />
        )}

        {/* Hero description */}
        <motion.p
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-secondaryText font-[300] leading-relaxed will-change-transform"
        >
          {portfolioData.role}
        </motion.p>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-row justify-between items-end w-full mt-auto z-10 gap-4">
        {/* CTA links */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="flex gap-6 md:gap-8 items-center"
        >
          <a
            href="#work"
            className="group relative py-1 text-xs md:text-sm font-[300] tracking-wider text-primaryText uppercase transition-colors"
            data-cursor="hover"
          >
            View Work <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-500 ease-portfolio-ease group-hover:w-full" />
          </a>
          <a
            href="#contact"
            className="group relative py-1 text-xs md:text-sm font-[300] tracking-wider text-primaryText uppercase transition-colors"
            data-cursor="hover"
          >
            Contact <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-500 ease-portfolio-ease group-hover:w-full" />
          </a>
        </motion.div>

        {/* Scroll Indicator (Slowly Rotating text) */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="relative hidden sm:flex items-center justify-center shrink-0 w-20 h-20 md:w-24 md:h-24 pointer-events-none"
        >
          <svg
            className="w-full h-full animate-spin-slow"
            viewBox="0 0 100 100"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
            />
            <text className="text-[7.5px] fill-secondaryText font-display tracking-[0.18em] font-[300] uppercase">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL TO EXPLORE · SCROLL TO EXPLORE ·
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
