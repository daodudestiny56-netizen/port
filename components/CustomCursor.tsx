"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const updatePosition = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Exact dot tracking
      dotPos.current.x = targetX;
      dotPos.current.y = targetY;

      // 0.12 lerp ring tracking
      const easeFactor = 0.12;
      ringPos.current.x += (targetX - ringPos.current.x) * easeFactor;
      ringPos.current.y += (targetY - ringPos.current.y) * easeFactor;

      // Position from center (dot width = 10px => offset = 5px, ring width = 36px => offset = 18px)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 5}px, ${dotPos.current.y - 5}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    // Watch for mouse hovering interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.getAttribute("data-cursor") === "hover" ||
        target.closest('[data-cursor="hover"]');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* 10px filled dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#00F0FF] pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      >
        <div
          className="w-full h-full rounded-full bg-[#00F0FF] transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "scale(0)" : "scale(1)",
          }}
        />
      </div>

      {/* 36px ring with 1px border */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      >
        <div
          className="w-full h-full rounded-full border border-[#00F0FF] transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "scale(2.5)" : "scale(1)",
          }}
        />
      </div>
    </>
  );
}
