"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-pinned "zoom tunnel": an ink panel grows from a tilted tile to the
 * full viewport while the headline inside zooms out to rest, handing off
 * seamlessly to the ink section that follows.
 */
export default function ZoomPortal({ title, subtitle }: { title: string; subtitle: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const panelScale = useTransform(scrollYProgress, [0, 0.65], [0.14, 1]);
  const panelRotate = useTransform(scrollYProgress, [0, 0.65], [-14, 0]);
  const panelShadow = useTransform(scrollYProgress, [0, 0.6, 0.65], [18, 18, 0]);
  const shadow = useTransform(panelShadow, (v) => `${v}px ${v}px 0px rgb(var(--accent))`);

  const textScale = useTransform(scrollYProgress, [0.12, 0.8], [3.2, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.35], [0, 1]);
  const subOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.7, 0.88], [30, 0]);

  const frameA = useTransform(scrollYProgress, [0, 0.5], [0.35, 1.6]);
  const frameB = useTransform(scrollYProgress, [0, 0.5], [0.6, 2.4]);
  const frameC = useTransform(scrollYProgress, [0, 0.5], [0.85, 3.2]);
  const frameRotate = useTransform(scrollYProgress, [0, 0.5], [6, -10]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} aria-label={title} className="relative h-[260vh] bg-bone">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center board-grid-bone">
        {/* Tunnel frames */}
        {[frameA, frameB, frameC].map((scale, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            style={{ scale, rotate: frameRotate }}
            className={`absolute w-[60vmin] h-[60vmin] border-4 ${i === 1 ? "border-accent" : "border-ink"}`}
          />
        ))}

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs font-extrabold uppercase tracking-widest text-ink bg-bone border-3 border-ink px-3 py-1.5 shadow-brutalist-sm whitespace-nowrap"
        >
          SCROLL TO ZOOM ↓
        </motion.p>

        <motion.div
          style={{ scale: panelScale, rotate: panelRotate, boxShadow: shadow }}
          className="absolute inset-0 bg-ink flex flex-col items-center justify-center board-dots-ink will-change-transform"
        >
          <motion.h2
            style={{ scale: textScale, opacity: textOpacity }}
            className="font-display font-extrabold uppercase text-bone text-[clamp(3.5rem,15vw,15rem)] leading-[0.85] tracking-tight text-center px-4"
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className={`block ${i % 2 === 1 ? "text-outline-bone" : ""}`}>
                {word}
              </span>
            ))}
          </motion.h2>
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mt-8 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-widest text-bone bg-accent border-3 border-bone px-4 py-2"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
