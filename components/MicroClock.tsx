"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";
import { Sun, Moon, MapPin, Compass } from "lucide-react";

function getNigerianTimeParts(date: Date) {
  const watMs = date.getTime() + 1 * 60 * 60 * 1000;
  const watDate = new Date(watMs);

  const hours = watDate.getUTCHours();
  const minutes = String(watDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(watDate.getUTCSeconds()).padStart(2, "0");

  const hhmm = `${String(hours).padStart(2, "0")}:${minutes}`;
  
  // Calculate solar daylight progress (06:00 to 18:00 WAT)
  const isDay = hours >= 6 && hours < 18;
  const solarProgress = isDay 
    ? Math.min(Math.max(((hours - 6) * 60 + watDate.getUTCMinutes()) / 720, 0), 1)
    : 0;

  return { hhmm, ss: seconds, hours, isDay, solarProgress };
}

export default function MicroClock() {
  const [mounted, setMounted] = useState(false);
  const [hhmm, setHhmm] = useState("00:00");
  const [ss, setSs] = useState("00");
  const [isDay, setIsDay] = useState(true);
  const [solarProgress, setSolarProgress] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const { hhmm: h, ss: s, isDay: d, solarProgress: p } = getNigerianTimeParts(new Date());
      setHhmm(h);
      setSs(s);
      setIsDay(d);
      setSolarProgress(p);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="relative flex flex-col justify-between h-full w-full bg-surface border border-border rounded-[12px] p-5 md:p-7 card-hover-shadow group select-none cursor-pointer overflow-hidden"
    >
      {/* Ambient Solar Halo Glow */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-60"
        style={{
          background: isDay 
            ? "radial-gradient(circle, rgba(0,240,255,0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(63,232,245,0.2) 0%, transparent 70%)"
        }}
      />

      <div>
        {/* Header: Title + Solar Mode Indicator */}
        <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap mb-4">
          <h4 className="font-mono text-[10px] sm:text-[11px] font-[300] tracking-wider sm:tracking-widest text-secondaryText flex items-center gap-1.5 shrink min-w-0">
            <Compass className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
            <span className="truncate">Lagos Solar Station</span>
          </h4>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border bg-[#161616] text-[8px] sm:text-[9px] font-mono text-[#3FE8F5] shrink-0">
            {isDay ? <Sun className="w-3 h-3 text-[#00F0FF]" /> : <Moon className="w-3 h-3 text-[#3FE8F5]" />}
            <span>{isDay ? "Daylight" : "Night cycle"}</span>
          </div>
        </div>

        {/* Live Clock Display */}
        <div className="flex items-center font-mono text-[clamp(1.5rem,5vw,2.25rem)] font-[300] text-primaryText tracking-tighter leading-none h-[44px]">
          <span>{hhmm}</span>
          <span className="mx-0.5 text-[#00F0FF] animate-pulse">:</span>
          <div className="overflow-hidden relative h-[44px] w-[42px] sm:w-[50px] inline-flex items-center justify-start">
            <AnimatePresence mode="popLayout">
              {mounted && (
                <motion.span
                  key={ss}
                  initial={{ y: "80%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-80%", opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative font-mono text-[clamp(1.5rem,5vw,2.25rem)] font-[300] text-primaryText block"
                >
                  {ss}
                </motion.span>
              )}
            </AnimatePresence>
            {!mounted && <span className="font-mono text-secondaryText opacity-40">00</span>}
          </div>
        </div>
      </div>

      {/* Solar Dial Trajectory & Interactive Coordinates (Hover / Tap reveal) */}
      <div className="mt-6 pt-4 border-t border-border/80 flex flex-col gap-3 w-full max-w-full">
        {/* Solar Orbit Arc Progress Bar */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-secondaryText gap-1">
            <span className="shrink-0">Sunrise 06:00</span>
            <span className="text-[#3FE8F5] truncate text-center">Solar position</span>
            <span className="shrink-0">Sunset 18:00</span>
          </div>
          <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#00F0FF] to-[#3FE8F5] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(solarProgress * 100, 5)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Dynamic Coordinates Reveal on Hover or Mobile Tap */}
        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center text-[10px] font-mono text-[#3FE8F5] pt-1"
            >
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#00F0FF]" />
                6.5244° N, 3.3792° E
              </span>
              <span className="text-secondaryText">NIGERIA · WAT (UTC+1)</span>
            </motion.div>
          ) : (
            <div className="flex justify-between items-center text-[10px] font-mono text-secondaryText pt-1">
              <span>NIGERIA · WAT (UTC+1)</span>
              <span className="text-[9px] text-[#00F0FF] opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                TAP FOR COORDS &rarr;
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
