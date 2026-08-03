"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { EASE_PORTFOLIO } from "@/lib/animations";
import { usePreloader } from "@/context/PreloaderContext";
import ClipText from "@/components/ui/ClipText";
import Navbar from "@/components/Navbar";

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
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between px-4 sm:px-6 md:px-12 py-6 md:py-10 bg-transparent select-none overflow-hidden">
      {/* Top Header Row (Navbar) */}
      <Navbar />

      {/* Center Typography — staggered clip mask reveal heading */}
      <div className="flex flex-col justify-center items-start my-auto py-8 sm:py-12 w-full">
        {isLoaded && (
          <ClipText
            text={words}
            typewriterLineIndex={1}
            lineClassName="font-display font-[300] text-[clamp(2.25rem,8vw+0.5rem,6rem)] leading-[0.95] text-primaryText uppercase select-none origin-bottom tracking-tight"
          />
        )}

        {/* Hero description */}
        <motion.p
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="mt-6 md:mt-8 max-w-xl text-[clamp(0.95rem,2vw,1.125rem)] text-secondaryText font-[300] leading-relaxed will-change-transform"
        >
          {portfolioData.role}
        </motion.p>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-row justify-between items-end w-full mt-auto z-10 gap-4 pt-4">
        {/* CTA links */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="flex gap-4 sm:gap-6 md:gap-8 items-center"
        >
          <a
            href="#work"
            className="group relative flex items-center min-h-[44px] text-xs md:text-sm font-[300] tracking-wider text-primaryText uppercase transition-colors"
            data-cursor="hover"
          >
            View Work <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">&rarr;</span>
            <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-accent transition-all duration-500 ease-portfolio-ease group-hover:w-full" />
          </a>
          <a
            href="#contact"
            className="group relative flex items-center min-h-[44px] text-xs md:text-sm font-[300] tracking-wider text-primaryText uppercase transition-colors"
            data-cursor="hover"
          >
            Contact <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">&rarr;</span>
            <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-accent transition-all duration-500 ease-portfolio-ease group-hover:w-full" />
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
