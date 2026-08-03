"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";



function getNigerianTimeParts(date: Date) {
  const watMs = date.getTime() + 1 * 60 * 60 * 1000;
  const watDate = new Date(watMs);

  const hours = String(watDate.getUTCHours()).padStart(2, "0");
  const minutes = String(watDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(watDate.getUTCSeconds()).padStart(2, "0");

  return { hhmm: `${hours}:${minutes}`, ss: seconds };
}

export default function MicroClock() {
  const [mounted, setMounted] = useState(false);
  const [hhmm, setHhmm] = useState("00:00");
  const [ss, setSs] = useState("00");

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const { hhmm: h, ss: s } = getNigerianTimeParts(new Date());
      setHhmm(h);
      setSs(s);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative flex flex-col justify-between h-full w-full bg-surface border border-border rounded-[12px] p-5 md:p-7 card-hover-shadow group select-none"
    >
      <div>
        <h4 className="font-display text-[11px] font-[300] tracking-widest text-secondaryText uppercase mb-6">
          LAGOS TIME
        </h4>

        {/* Live Clock Display */}
        <div className="flex items-center font-mono text-[clamp(1.75rem,5vw,2.25rem)] font-[300] text-primaryText tracking-tighter leading-none h-[44px]">
          <span>{hhmm}</span>
          <span className="mx-0.5 text-secondaryText animate-pulse">:</span>
          <div className="overflow-hidden relative h-[44px] w-[46px] sm:w-[50px] inline-flex items-center justify-start">
            <AnimatePresence mode="popLayout">
              {mounted && (
                <motion.span
                  key={ss}
                  initial={{ y: "80%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-80%", opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative font-mono text-[clamp(1.75rem,5vw,2.25rem)] font-[300] text-primaryText block"
                >
                  {ss}
                </motion.span>
              )}
            </AnimatePresence>
            {!mounted && <span className="font-mono text-secondaryText opacity-40">00</span>}
          </div>
        </div>
      </div>

      <div>
        <span className="block text-[11px] font-[300] text-secondaryText uppercase tracking-widest">
          NIGERIA · WAT (UTC+1)
        </span>
        <span className="text-[9px] text-[#444444] uppercase tracking-wider">
          West Africa Time
        </span>
      </div>
    </motion.div>
  );
}
