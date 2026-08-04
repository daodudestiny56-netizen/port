"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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

      // Tight lerp tracking
      cursorPos.current.x += (targetX - cursorPos.current.x) * 0.25;
      cursorPos.current.y += (targetY - cursorPos.current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 8}px, ${cursorPos.current.y - 8}px, 0) scale(${isHovered ? 2.2 : 1})`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

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
  }, [isMobile, isReducedMotion, isHovered]);

  if (isMobile || isReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-[#FFDE59] border-2 border-[#0D0D0D] pointer-events-none z-[99999] will-change-transform rounded-none mix-blend-difference"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        boxShadow: "2px 2px 0px #0D0D0D",
      }}
    />
  );
}
