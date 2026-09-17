"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COLORS = { ink: "#0D0D0D", bone: "#FFFFFF", blue: "#2B4EFF" } as const;
type Swatch = keyof typeof COLORS;

/* -------------------------------------------------------------------------- */
/* Tape marquee — two crossing strips that also drift with scroll             */
/* -------------------------------------------------------------------------- */

interface TapeDividerProps {
  items: string[];
  background?: Swatch;
}

function TapeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 sm:px-8">{item}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="flex w-max animate-marquee"
      style={{ animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
    >
      {content}
      <div aria-hidden="true" className="flex">
        {content}
      </div>
    </div>
  );
}

export function TapeDivider({ items, background = "bone" }: TapeDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const driftA = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-44 sm:h-56 overflow-hidden"
      style={{ backgroundColor: COLORS[background] }}
    >
      <div className="absolute top-1/2 -left-[10%] w-[120%] -translate-y-1/2 rotate-[4deg]">
        <motion.div
          style={{ x: driftB }}
          className="bg-[#2B4EFF] text-[#FFFFFF] border-y-4 border-[#0D0D0D] py-3 font-mono font-extrabold text-sm sm:text-base uppercase overflow-hidden"
        >
          <TapeRow items={items} reverse />
        </motion.div>
      </div>
      <div className="absolute top-1/2 -left-[10%] w-[120%] -translate-y-1/2 -rotate-[3deg]">
        <motion.div
          style={{ x: driftA }}
          className="bg-[#0D0D0D] text-[#FFFFFF] border-y-4 border-[#0D0D0D] py-4 font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight overflow-hidden shadow-[0_8px_0_#2B4EFF]"
        >
          <TapeRow items={items} />
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hard-edged transitional edge between two colour zones                       */
/* -------------------------------------------------------------------------- */

interface EdgeDividerProps {
  from: Swatch;
  to: Swatch;
  shape?: "zigzag" | "steps";
  teeth?: number;
}

export function EdgeDivider({ from, to, shape = "zigzag", teeth = 28 }: EdgeDividerProps) {
  const width = teeth * 2;
  let points = `0,10 `;
  if (shape === "zigzag") {
    for (let i = 0; i <= width; i++) points += `${i},${i % 2 === 0 ? 10 : 0} `;
  } else {
    for (let i = 0; i < width; i += 2) points += `${i},10 ${i},3 ${i + 1},3 ${i + 1},10 `;
  }
  points += `${width},10`;

  return (
    <div aria-hidden="true" className="relative w-full overflow-hidden" style={{ backgroundColor: COLORS[from] }}>
      <motion.svg
        viewBox={`0 0 ${width} 10`}
        preserveAspectRatio="none"
        className="block w-full h-6 sm:h-9"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        style={{ transformOrigin: "50% 100%" }}
      >
        <polygon points={points} fill={COLORS[to]} />
      </motion.svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Circuit traces that draw themselves as you scroll                           */
/* -------------------------------------------------------------------------- */

const TRACES = [
  "M0 40 H220 L260 80 H540",
  "M0 120 H160 L200 160 H380 L420 110 H540",
  "M0 200 H300 L340 150 H540",
  "M660 60 H860 L900 20 H1200",
  "M660 120 H780 L820 170 H1000 L1040 120 H1200",
  "M660 180 H900 L940 220 H1200",
];
const NODES: [number, number][] = [
  [260, 80], [200, 160], [420, 110], [340, 150], [900, 20], [820, 170], [1040, 120], [940, 220],
];

export function CircuitDivider({ background = "bone", label = "SYS.BUS" }: { background?: Swatch; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 45%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const chipScale = useTransform(scrollYProgress, [0.5, 1], [0.6, 1]);
  const isInk = background === "ink";
  const stroke = isInk ? COLORS.bone : COLORS.ink;

  return (
    <div ref={ref} aria-hidden="true" className="relative w-full h-40 sm:h-56 overflow-hidden" style={{ backgroundColor: COLORS[background] }}>
      <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        {TRACES.map((d, i) => (
          <motion.path key={i} d={d} fill="none" stroke={stroke} strokeWidth="4" style={{ pathLength: draw }} />
        ))}
        {NODES.map(([cx, cy], i) => (
          <motion.rect
            key={i}
            x={cx - 7}
            y={cy - 7}
            width="14"
            height="14"
            fill={COLORS.blue}
            stroke={stroke}
            strokeWidth="3"
            style={{ scale: chipScale, transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
        <motion.g style={{ scale: chipScale, transformBox: "fill-box", transformOrigin: "center" }}>
          <rect x="548" y="48" width="120" height="152" fill={COLORS.ink} />
          <rect x="540" y="40" width="120" height="152" fill={COLORS.blue} stroke={COLORS.ink} strokeWidth="5" />
          {[70, 100, 130, 160].map((y) => (
            <g key={y}>
              <rect x="526" y={y - 4} width="14" height="8" fill={stroke} />
              <rect x="660" y={y - 4} width="14" height="8" fill={stroke} />
            </g>
          ))}
          <text x="600" y="122" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="18" fill={COLORS.bone}>
            {label}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
