"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollZoomTextProps {
  text: string;
  /** "in" grows toward the reader, "out" shrinks back into place. */
  direction?: "in" | "out";
  className?: string;
  sizeClass?: string;
}

/** Oversized display text whose scale is tied to its scroll position. */
export default function ScrollZoomText({ text, direction = "in", className = "", sizeClass = "text-[clamp(4rem,17vw,16rem)] tracking-tight" }: ScrollZoomTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = direction === "in" ? [0.55, 1.25] : [1.6, 0.9];
  const scale = useTransform(scrollYProgress, [0, 1], range);
  const x = useTransform(scrollYProgress, [0, 1], direction === "in" ? ["-6%", "6%"] : ["6%", "-6%"]);

  return (
    <div ref={ref} aria-hidden="true" className="relative w-full overflow-hidden py-4 pointer-events-none">
      <motion.div
        style={{ scale, x }}
        className={`font-display font-extrabold uppercase whitespace-nowrap text-center leading-none ${sizeClass} ${className}`}
      >
        {text}
      </motion.div>
    </div>
  );
}
