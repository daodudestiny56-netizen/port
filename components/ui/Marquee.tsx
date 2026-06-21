"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: string; // e.g. "25s"
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({
  children,
  speed = "25s",
  direction = "left",
  className,
}: MarqueeProps) {
  return (
    /*
     * The outer wrapper:
     *  - overflow-hidden clips the track
     *  - mask-image fades both edges so there is no hard cut
     *  - pointer-events-none on the mask layer allows hover on pills
     */
    <div
      className={cn("relative overflow-hidden w-full select-none", className)}
      style={{
        /* Soft fade on both sides — eliminates the hard clip edge */
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {/*
       * The track: two identical copies sit side-by-side with the same gap.
       * Animating translateX(-50%) moves exactly one copy's width, then
       * the animation restarts at 0 — the two copies are identical so
       * the seam is invisible.
       */}
      <div
        className="flex items-center animate-marquee"
        style={{
          "--speed": speed,
          "--marquee-gap": "1.5rem",   /* 24px — matches gap-6 between pills */
          animationDirection: direction === "right" ? "reverse" : "normal",
        } as React.CSSProperties}
      >
        {/* Copy 1 */}
        <div className="flex shrink-0 items-center gap-4 pr-4">
          {children}
        </div>
        {/* Copy 2 — identical, aria-hidden so screen-readers skip duplicate */}
        <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
