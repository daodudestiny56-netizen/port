"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkTouchAndMotion = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(hasTouch);
      setIsReducedMotion(reducedMotion);
    };

    checkTouchAndMotion();
    window.addEventListener("resize", checkTouchAndMotion);
    return () => window.removeEventListener("resize", checkTouchAndMotion);
  }, []);

  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const updatePosition = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      cursorPos.current.x += (targetX - cursorPos.current.x) * 0.35;
      cursorPos.current.y += (targetY - cursorPos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 10}px, ${cursorPos.current.y - 10}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isReducedMotion]);

  if (isMobile || isReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[99999] will-change-transform rounded-none select-none"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      {/* Fixed-Size Dual-Layer Brutalist Square with Blueprint Blue (#2B4EFF) */}
      <div className="relative w-full h-full bg-[#2B4EFF] border-3 border-[#0D0D0D] outline outline-2 outline-[#FFFFFF] shadow-[3px_3px_0px_#0D0D0D] flex items-center justify-center">
        {/* Inner High-Visibility White Core Point */}
        <div className="w-1.5 h-1.5 bg-[#FFFFFF] border border-[#0D0D0D]" />
      </div>
    </div>
  );
}
