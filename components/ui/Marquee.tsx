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
    <div className={cn("overflow-hidden w-full flex select-none", className)}>
      <div
        className="flex shrink-0 items-center animate-marquee"
        style={{
          "--speed": speed,
          animationDirection: direction === "right" ? "reverse" : "normal",
        } as React.CSSProperties}
      >
        {/* Render children duplicated twice */}
        <div className="flex shrink-0 items-center gap-4 pr-4">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
