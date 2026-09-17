"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Mirror the CSS rule that hides the native cursor: fine pointer, motion allowed.
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest?.('a, button, input, textarea, [role="button"], [data-cursor="hover"]');
      if (innerRef.current) {
        innerRef.current.style.transform = interactive ? "scale(1.9) rotate(45deg)" : "scale(1) rotate(0deg)";
      }
    };

    const handleDown = () => {
      if (innerRef.current) innerRef.current.style.boxShadow = "0px 0px 0px rgb(var(--ink))";
    };
    const handleUp = () => {
      if (innerRef.current) innerRef.current.style.boxShadow = "3px 3px 0px rgb(var(--ink))";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    let animationFrameId: number;
    const updatePosition = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.35;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.35;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 10}px, ${cursorPos.current.y - 10}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[100001] will-change-transform select-none"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full bg-accent border-3 border-ink outline outline-2 outline-bone flex items-center justify-center transition-transform duration-200 ease-out"
        style={{ boxShadow: "3px 3px 0px rgb(var(--ink))" }}
      >
        <div className="w-1.5 h-1.5 bg-bone border border-ink" />
      </div>
    </div>
  );
}
