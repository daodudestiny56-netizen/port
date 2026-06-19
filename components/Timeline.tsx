"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First item open by default

  const experience = portfolioData.experience;

  useEffect(() => {
    // Register plugin inside useEffect (client-only code)
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    const items = itemsRef.current.filter((item): item is HTMLDivElement => item !== null);
    const container = containerRef.current;

    if (!line || !container || items.length === 0) return;

    // Create GSAP context to ensure scope and clean garbage collection on unmount
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });

      // Animate vertical accent line height
      tl.fromTo(line, { height: "0%" }, { height: "100%", ease: "none" });

      // Staggered roll animations linked to the scroll line progress
      items.forEach((item, index) => {
        const triggerPercent = items.length > 1 ? index / (items.length - 1) : 0;
        
        tl.fromTo(
          item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power1.out" },
          triggerPercent // position in timeline progress
        );
      });
    }, container);

    return () => {
      ctx.revert(); // clean up GSAP animations
    };
  }, []);

  return (
    <motion.div
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      ref={containerRef}
      className="relative flex flex-col justify-between h-full w-full bg-surface border border-border rounded-[12px] p-7 card-hover-shadow group select-none"
    >
      <div>
        <h4 className="font-display text-[11px] font-[300] tracking-widest text-secondaryText uppercase mb-5">
          EXPERIENCE
        </h4>

        {/* Timeline List */}
        <div className="relative pl-6">
          {/* Vertical Track Line */}
          <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[1px] bg-[#1F1F1F]" />

          {/* Animated Accent Line */}
          <div
            ref={lineRef}
            className="absolute left-[3px] top-1.5 w-[1px] bg-primaryText origin-top will-change-[height]"
          />

          <div className="flex flex-col gap-[18px]">
            {experience.map((role, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="relative flex flex-col gap-1 will-change-[transform,opacity]"
              >
                {/* Node indicator centered on the line (node width 6px, left 0 = center 3px) */}
                <div className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-[#111111] border border-border group-hover:border-primaryText transition-colors duration-300 z-10" />

                {/* Visible Header Row */}
                <div
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="flex flex-row justify-between items-center gap-4 cursor-pointer w-full group/header"
                  data-cursor="hover"
                >
                  <span className="text-sm font-[300] text-primaryText uppercase tracking-wider group-hover/header:text-[#E8FF47] transition-colors duration-300">
                    {role.company}
                  </span>
                  
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-[10px] text-secondaryText font-[300] uppercase">
                      {role.years}
                    </span>
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-base text-secondaryText font-sans select-none origin-center flex items-center justify-center w-4 h-4 leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                </div>

                {/* Expandable Accordion Body */}
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1.5 pb-0.5 flex flex-col gap-1 pr-2">
                        <span className="text-xs text-[#E8FF47] font-[300] uppercase tracking-wide">
                          {role.title}
                        </span>
                        <p className="text-[11px] text-secondaryText font-[300] leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-secondaryText font-[300] uppercase tracking-wider mt-6">
        Click to expand experience details
      </p>
    </motion.div>
  );
}
