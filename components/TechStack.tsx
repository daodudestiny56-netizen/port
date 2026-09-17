"use client";

import { motion } from "framer-motion";
import HangingCard from "@/components/ui/HangingCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData } from "@/lib/data";

const CARD_STYLES = [
  "bg-[#FFFFFF] text-[#0D0D0D]",
  "bg-[#0D0D0D] text-[#FFFFFF]",
  "bg-[#2B4EFF] text-[#FFFFFF]",
  "bg-[#FFFFFF] text-[#0D0D0D]",
];

export default function TechStack() {
  let counter = 0;

  return (
    <section id="toolkit" className="relative w-full px-4 sm:px-6 md:px-10 pt-24 pb-24 bg-[#FFFFFF] text-[#0D0D0D] board-grid-bone">
      <SectionHeading
        index="02"
        kicker="TOOLS & SKILLS"
        title="THE TOOLKIT"
        aside={
          <>
            CLIPPED TO THE LINE <span className="text-[#2B4EFF]">·</span> HOVER TO SWING
          </>
        }
      />

      <div className="flex flex-col gap-20 sm:gap-24">
        {portfolioData.toolkit.map((group, groupIdx) => (
          <div key={group.group} className="relative">
            {/* Group label nailed to the wall */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist-blueprint font-mono text-xs font-extrabold uppercase tracking-widest"
            >
              <span className="text-[#2B4EFF]">{String(groupIdx + 1).padStart(2, "0")}</span> {group.group}
            </motion.div>

            {/* The line: each cell draws its own segment, so rows stay continuous when they wrap */}
            <ul className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-14">
              {/* End anchors */}
              <span aria-hidden="true" className="absolute -left-1 top-[14px] w-4 h-4 bg-[#2B4EFF] border-3 border-[#0D0D0D] z-10" />
              <span aria-hidden="true" className="absolute -right-1 top-[14px] w-4 h-4 bg-[#2B4EFF] border-3 border-[#0D0D0D] z-10" />

              {group.items.map((item, i) => {
                counter += 1;
                const style = CARD_STYLES[(i + groupIdx) % CARD_STYLES.length];
                const id = `T-${String(counter).padStart(2, "0")}`;
                return (
                  <li key={item.name} className="relative px-2 sm:px-4">
                    <motion.span
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                      className="absolute left-0 right-0 top-5 h-[4px] bg-[#0D0D0D] origin-left"
                    />
                    <HangingCard
                      attachment="clip"
                      attachmentColor={i % 2 ? "blue" : "ink"}
                      tilt={i % 2 ? 2 : -2}
                      swayAngle={2}
                      swayDuration={3.8 + ((i + groupIdx) % 3) * 0.7}
                      delay={0.1 + i * 0.09}
                      className="pt-8"
                    >
                      <div className={`relative border-3 border-[#0D0D0D] shadow-brutalist p-4 sm:p-5 min-h-[190px] sm:min-h-[210px] flex flex-col ${style}`}>
                        <div className="flex items-center justify-between font-mono text-[10px] font-extrabold uppercase tracking-widest pb-2 border-b-2 border-current">
                          <span>{id}</span>
                          <span className="w-3 h-3 border-2 border-current" />
                        </div>
                        <h3 className="mt-4 font-display font-extrabold text-lg sm:text-2xl xl:text-3xl uppercase leading-[0.95] tracking-tight [overflow-wrap:anywhere]">
                          {item.name}
                        </h3>
                        <p className="mt-auto pt-4 font-mono text-[10px] sm:text-xs font-bold leading-snug opacity-80">{item.note}</p>
                      </div>
                    </HangingCard>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
