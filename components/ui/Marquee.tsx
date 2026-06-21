"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: string; // e.g. "25s"
  direction?: "left" | "right";
  className?: string;
  gap?: string; // e.g. "1rem" or "1.5rem"
}

export default function Marquee({
  children,
  speed = "25s",
  direction = "left",
  className,
  gap = "1rem",
}: MarqueeProps) {
  return (
    <div
      className={cn("group relative overflow-hidden w-full select-none", className)}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max"
        style={{
          gap: gap,
          "--marquee-gap": gap,
        } as React.CSSProperties}
      >
        {/* Copy 1 */}
        <div
          className={cn(
            "flex shrink-0 items-center",
            direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
          )}
          style={{
            gap: gap,
            "--speed": speed,
          } as React.CSSProperties}
        >
          {children}
        </div>
        {/* Copy 2 */}
        <div
          className={cn(
            "flex shrink-0 items-center",
            direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
          )}
          aria-hidden="true"
          style={{
            gap: gap,
            "--speed": speed,
          } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

