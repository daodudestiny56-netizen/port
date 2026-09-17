"use client";

import { themeColor } from "@/lib/theme";

type Tone = "ink" | "bone";

const INK = themeColor("ink");
const BONE = themeColor("bone");
const ACCENT = themeColor("accent");

interface AttachmentProps {
  tone?: Tone;
  color?: "accent" | "ink" | "bone";
  className?: string;
}

const fillFor = (color: AttachmentProps["color"]) =>
  color === "ink" ? INK : color === "bone" ? BONE : ACCENT;

// SVG presentation attributes can't resolve CSS variables, so colours go through `style`.

/** Top-down pushpin with a hard offset shadow. */
export function Pushpin({ tone = "bone", color = "accent", className = "" }: AttachmentProps) {
  const stroke = tone === "ink" && color === "ink" ? BONE : INK;
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={`w-9 h-9 ${className}`}>
      <circle cx="23" cy="23" r="13" style={{ fill: tone === "ink" ? ACCENT : INK }} opacity={tone === "ink" ? 0.55 : 1} />
      <circle cx="19" cy="19" r="13" style={{ fill: fillFor(color), stroke }} strokeWidth="3" />
      <circle cx="19" cy="19" r="5" style={{ fill: color === "bone" ? INK : BONE, stroke }} strokeWidth="2" />
      <path d="M11 13 A10 10 0 0 1 17 9" style={{ stroke: color === "bone" ? INK : BONE }} strokeWidth="2.5" fill="none" strokeLinecap="square" />
    </svg>
  );
}

/** Binder clip whose body bites over the top edge of the card. */
export function BinderClip({ tone = "bone", color = "ink", className = "" }: AttachmentProps) {
  const wire = tone === "ink" ? BONE : INK;
  const bodyStroke = color === "ink" && tone === "ink" ? BONE : INK;
  return (
    <svg aria-hidden="true" viewBox="0 0 56 52" className={`w-14 h-[52px] ${className}`}>
      {/* Wire handles */}
      <path d="M17 26 L13 6 Q12.5 2 17 2 H24 Q27 2 26 6 L24 26" fill="none" style={{ stroke: wire }} strokeWidth="3" strokeLinejoin="miter" />
      <path d="M39 26 L43 6 Q43.5 2 39 2 H32 Q29 2 30 6 L32 26" fill="none" style={{ stroke: wire }} strokeWidth="3" strokeLinejoin="miter" />
      {/* Hard shadow */}
      <path d="M10 25 H50 L46 50 H14 Z" style={{ fill: tone === "ink" ? ACCENT : INK }} />
      {/* Clip body */}
      <path d="M6 21 H48 L43 46 H11 Z" style={{ fill: fillFor(color), stroke: bodyStroke }} strokeWidth="3" strokeLinejoin="miter" />
      <line x1="10" y1="29" x2="44" y2="29" style={{ stroke: color === "bone" ? INK : BONE }} strokeWidth="2" />
    </svg>
  );
}

/** Strip of torn tape. */
export function Tape({ color = "accent", className = "" }: AttachmentProps) {
  const bg = color === "ink" ? "bg-ink/85" : color === "bone" ? "bg-bone/85" : "bg-accent/85";
  return (
    <div
      aria-hidden="true"
      className={`w-28 h-8 border-y-2 border-ink ${bg} ${className}`}
      style={{
        clipPath:
          "polygon(0% 8%, 4% 0%, 8% 10%, 12% 0%, 100% 0%, 96% 12%, 100% 25%, 96% 45%, 100% 62%, 96% 80%, 100% 100%, 8% 100%, 4% 88%, 0% 100%, 3% 70%, 0% 50%, 3% 30%)",
      }}
    />
  );
}
