"use client";

import { motion } from "framer-motion";
import { staggerChildVariants } from "@/lib/animations";

export default function LiveMetric() {
  return (
    <motion.div
      variants={staggerChildVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative flex flex-col justify-between h-full w-full bg-surface border border-border rounded-[12px] p-7 card-hover-shadow group select-none"
    >
      <div>
        <h4 className="font-display text-[11px] font-[300] tracking-widest text-secondaryText uppercase mb-6">
          CURRENT FOCUS
        </h4>

        <div className="flex flex-col gap-1.5">
          <span className="text-lg font-[300] text-primaryText uppercase tracking-tight">
            INTERACTIVE WEBGL
          </span>
          <p className="text-xs text-secondaryText leading-relaxed">
            Experimenting with shaders, custom materials, and real-time graphics on the web.
          </p>
        </div>
      </div>

      {/* Animated visual equalizer/waveform mock */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-[10px] text-secondaryText uppercase tracking-wider mb-2.5">
          <span>WebGL Status</span>
          <span className="text-[#E8FF47] font-[300] animate-pulse">ACTIVE</span>
        </div>
        
        {/* Equalizer lines */}
        <div className="h-8 w-full rounded-[6px] border border-border bg-[#0D0D0D] flex items-end justify-center gap-1.5 p-1.5 overflow-hidden">
          {[
            { delay: 0.1, duration: 1.1, minScale: 0.15, maxScale: 0.75 },
            { delay: 0.3, duration: 0.8, minScale: 0.2, maxScale: 0.95 },
            { delay: 0.2, duration: 1.3, minScale: 0.1, maxScale: 0.6 },
            { delay: 0.5, duration: 0.7, minScale: 0.3, maxScale: 0.9 },
            { delay: 0.4, duration: 1.0, minScale: 0.15, maxScale: 0.8 },
            { delay: 0.6, duration: 1.2, minScale: 0.25, maxScale: 0.7 },
            { delay: 0.15, duration: 0.9, minScale: 0.1, maxScale: 0.85 },
            { delay: 0.35, duration: 1.4, minScale: 0.2, maxScale: 0.9 },
            { delay: 0.25, duration: 0.6, minScale: 0.3, maxScale: 0.75 },
            { delay: 0.45, duration: 1.1, minScale: 0.15, maxScale: 0.95 },
            { delay: 0.55, duration: 1.0, minScale: 0.2, maxScale: 0.65 },
            { delay: 0.05, duration: 1.2, minScale: 0.1, maxScale: 0.8 },
          ].map((bar, i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: [bar.minScale, bar.maxScale, bar.minScale],
              }}
              transition={{
                duration: bar.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.delay,
              }}
              style={{ originY: 1 }}
              className="w-[4px] h-full bg-[#E8FF47] rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
