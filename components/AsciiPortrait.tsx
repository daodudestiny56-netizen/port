"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiPortraitProps {
  imageSrc?: string;
  className?: string;
}

const DENSITY_RAMP = " .:-=+*#%@";

export default function AsciiPortrait({
  imageSrc = "/images/portrait.jpg",
  className = "",
}: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Mouse interaction coordinates
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
  }, [imageSrc]);

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !containerRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;
    const img = imgRef.current;

    if (!ctx) return;

    let animationFrameId: number;

    // Determine columns based on container width
    const getGridConfig = (width: number) => {
      if (width < 480) return { cols: 55, fontSize: 7 };
      if (width < 768) return { cols: 80, fontSize: 8 };
      if (width < 1024) return { cols: 110, fontSize: 8.5 };
      return { cols: 130, fontSize: 9 };
    };

    const drawAscii = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const { cols, fontSize } = getGridConfig(width);

      const charWidth = fontSize * 0.6;
      const charHeight = fontSize * 0.95;

      const rows = Math.floor((cols * (img.height / img.width)) * (charWidth / charHeight));
      
      const canvasWidth = cols * charWidth;
      const canvasHeight = rows * charHeight;

      // Set canvas display resolution & DPR handling
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.scale(dpr, dpr);

      // Offscreen canvas for pixel sampling
      const offCanvas = document.createElement("canvas");
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext("2d");

      if (!offCtx) return;

      // Draw downscaled image onto offscreen canvas
      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      // Clear main canvas with dark background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = "top";

      const mouse = mouseRef.current;

      // Render character matrix
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];

          // Standard Luminance calculation
          const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          const posX = c * charWidth;
          const posY = r * charHeight;

          // Interactive distance check to cursor
          let highlight = 0;
          if (mouse.active) {
            const dx = posX - mouse.x;
            const dy = posY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 90;
            if (dist < radius) {
              highlight = (1 - dist / radius);
            }
          }

          // Adjust brightness with mouse highlight
          const adjustedBrightness = Math.min(1, brightness + highlight * 0.4);
          const rampIndex = Math.floor(adjustedBrightness * (DENSITY_RAMP.length - 1));
          const char = DENSITY_RAMP[rampIndex] || " ";

          if (char !== " ") {
            if (highlight > 0.1) {
              // Signal Cyan highlight near cursor
              ctx.fillStyle = `rgba(0, 240, 255, ${0.4 + highlight * 0.6})`;
            } else {
              // Soft monochrome gray / white mapping
              const alpha = Math.max(0.15, brightness);
              ctx.fillStyle = `rgba(245, 245, 245, ${alpha * 0.9})`;
            }
            ctx.fillText(char, posX, posY);
          }
        }
      }
    };

    const render = () => {
      drawAscii();
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center p-3 rounded-[16px] bg-[#0E0E0E] border border-border overflow-hidden select-none group/ascii ${className}`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* ASCII Halftone Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 cursor-crosshair rounded-[8px] transition-transform duration-300 group-hover/ascii:scale-[1.01]"
      />

      {/* Top Monospace Label Badge */}
      <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-[#161616]/90 border border-border text-[9px] font-mono text-[#3FE8F5] tracking-wider uppercase backdrop-blur-md">
        HALFTONE MATRIX · 130 COLS
      </div>
    </div>
  );
}
