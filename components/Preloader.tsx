"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";

const DURATION_MS = 1500;
const BOOT_LINES = ["COMPILING INTERFACE", "MOUNTING 3D RUNTIME", "HANGING THE CARDS", "READY"];

export default function Preloader() {
  const { isLoaded, setIsLoaded } = usePreloader();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsLoaded(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    let frame: number;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setIsLoaded(true);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = "";
    };
  }, [setIsLoaded]);

  useEffect(() => {
    if (isLoaded) document.documentElement.style.overflow = "";
  }, [isLoaded]);

  const line = BOOT_LINES[Math.min(Math.floor((count / 100) * BOOT_LINES.length), BOOT_LINES.length - 1)];

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[100000] bg-ink text-bone flex flex-col justify-between p-5 sm:p-10 overflow-hidden"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        >
          <div className="flex justify-between items-start font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
            <span>DAODU DESTINY <span className="text-accent-light">{"//"}</span> SOFTWARE ENGINEER</span>
            <span className="hidden sm:inline">PORTFOLIO BUILD</span>
          </div>

          <motion.div
            exit={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-end justify-center"
          >
            <span className="font-display font-extrabold leading-none tracking-tighter text-[clamp(7rem,28vw,22rem)] tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
            <span className="font-display font-extrabold text-accent-light text-[clamp(2rem,6vw,5rem)] leading-none mb-[0.2em]">%</span>
          </motion.div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              <span>
                &gt; {line}
                <span className="animate-blink">_</span>
              </span>
              <span className="text-accent-light">3 YRS / 6 PROJECTS</span>
            </div>
            <div className="grid gap-1 h-4" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={`border-2 border-bone ${i < Math.round(count / 5) ? "bg-accent" : "bg-transparent"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
