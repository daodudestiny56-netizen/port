"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiPortraitProps {
  imageSrc?: string;
  className?: string;
}

// 69-step high-resolution density ramp for subtle luminance shifts in shadow and midtones
const DENSITY_RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export default function AsciiPortrait({
  imageSrc = "/images/portrait.jpg",
  className = "",
}: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

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

    const getGridConfig = (width: number) => {
      if (width < 480) return { cols: 65, fontSize: 6.5 };
      if (width < 768) return { cols: 95, fontSize: 7.5 };
      if (width < 1024) return { cols: 120, fontSize: 8 };
      return { cols: 145, fontSize: 8.5 };
    };

    const drawAscii = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const { cols, fontSize } = getGridConfig(width);

      const charWidth = fontSize * 0.58;
      const charHeight = fontSize * 0.92;

      const rows = Math.floor((cols * (img.height / img.width)) * (charWidth / charHeight));
      
      const canvasWidth = cols * charWidth;
      const canvasHeight = rows * charHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.scale(dpr, dpr);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext("2d");

      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      // First Pass: Extract normalized luminance values
      const luminances = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          luminances[r * cols + c] = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        }
      }

      // Helper function to safely sample luminance with boundary clamping
      const getLum = (r: number, c: number) => {
        const clampedR = Math.max(0, Math.min(rows - 1, r));
        const clampedC = Math.max(0, Math.min(cols - 1, c));
        return luminances[clampedR * cols + clampedC];
      };

      // Solid stark ink background
      ctx.fillStyle = "#0D0D0D";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = "top";

      const mouse = mouseRef.current;
      const GAMMA = 0.58; // Gamma correction (0.58) expands facial shadow and midtone contrast

      // Second Pass: Apply unsharp mask + gamma curve and render characters
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const centerLum = getLum(r, c);
          const top = getLum(r - 1, c);
          const bottom = getLum(r + 1, c);
          const left = getLum(r, c - 1);
          const right = getLum(r, c + 1);

          // Lightweight Laplacian unsharp mask for local edge contrast (eyes, nose, mouth contours)
          const edge = 4 * centerLum - top - bottom - left - right;
          const sharpenedLum = Math.max(0, Math.min(1, centerLum + edge * 0.45));

          // Gamma boost lifts dark facial shadows while unsharp mask preserves facial features
          const gammaLum = Math.pow(centerLum, GAMMA);
          const finalLum = Math.max(0, Math.min(1, gammaLum * 0.68 + sharpenedLum * 0.32));

          const posX = c * charWidth;
          const posY = r * charHeight;

          let highlight = 0;
          if (mouse.active) {
            const dx = posX - mouse.x;
            const dy = posY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 85;
            if (dist < radius) {
              highlight = (1 - dist / radius);
            }
          }

          const adjustedLum = Math.min(1, finalLum + highlight * 0.35);
          const rampIndex = Math.floor(adjustedLum * (DENSITY_RAMP.length - 1));
          const char = DENSITY_RAMP[rampIndex] || " ";

          if (char !== " ") {
            if (highlight > 0.15) {
              // Blueprint Blue mouse interaction highlight
              ctx.fillStyle = "#2B4EFF";
            } else {
              // Smooth high-contrast monochrome mapping
              const alpha = Math.max(0.3, finalLum);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
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

    window.addEventListener("resize", render);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", render);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center p-3 bg-[#0D0D0D] border-3 border-[#0D0D0D] shadow-brutalist overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="relative z-10 block"
      />
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#FFFFFF] border-2 border-[#0D0D0D] text-[9px] font-mono font-bold text-[#2B4EFF] uppercase shadow-brutalist-sm">
        MATRIX_HALFTONE // LIVE
      </div>
    </div>
  );
}
