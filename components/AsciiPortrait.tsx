"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiPortraitProps {
  imageSrc?: string;
  className?: string;
}

// 10-step graphic brutalist density ramp for posterized tonal clarity
const DENSITY_RAMP = " .:-=+*#%@$";

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
      if (width < 480) return { cols: 55, fontSize: 7.5 };
      if (width < 768) return { cols: 80, fontSize: 8.5 };
      if (width < 1024) return { cols: 105, fontSize: 9 };
      return { cols: 120, fontSize: 9.5 };
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

      // Draw source image onto offscreen canvas
      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      // Step 1: Raw Luminance Sampling
      const rawLuminance = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          rawLuminance[r * cols + c] = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        }
      }

      const getRaw = (r: number, c: number) => {
        const clampedR = Math.max(0, Math.min(rows - 1, r));
        const clampedC = Math.max(0, Math.min(cols - 1, c));
        return rawLuminance[clampedR * cols + clampedC];
      };

      // Step 2: Gaussian Blur / Spatial Smoothing to eliminate pixel static & noise
      const smoothedLuminance = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // 3x3 Gaussian smoothing kernel
          const val =
            getRaw(r - 1, c - 1) * 0.0625 + getRaw(r - 1, c) * 0.125 + getRaw(r - 1, c + 1) * 0.0625 +
            getRaw(r, c - 1) * 0.125 + getRaw(r, c) * 0.25 + getRaw(r, c + 1) * 0.125 +
            getRaw(r + 1, c - 1) * 0.0625 + getRaw(r + 1, c) * 0.125 + getRaw(r + 1, c + 1) * 0.0625;
          smoothedLuminance[r * cols + c] = val;
        }
      }

      // Stark Ink Canvas Background
      ctx.fillStyle = "#0D0D0D";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = "top";

      const mouse = mouseRef.current;

      // Step 3 & 4: Moderate Contrast Boost, Gentle Gamma, & Posterization into 10 Bands
      const CONTRAST_FACTOR = 1.25; // Expands dark vs light contrast
      const GENTLE_GAMMA = 0.82; // Mild shadow lift without muddying midtones
      const RAMP_MAX = DENSITY_RAMP.length - 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const smoothLum = smoothedLuminance[r * cols + c];

          // Expand contrast around mid-gray 0.5
          const contrastLum = Math.max(0, Math.min(1, 0.5 + (smoothLum - 0.5) * CONTRAST_FACTOR));

          // Gentle gamma adjustment
          const processedLum = Math.pow(contrastLum, GENTLE_GAMMA);

          const posX = c * charWidth;
          const posY = r * charHeight;

          let highlight = 0;
          if (mouse.active) {
            const dx = posX - mouse.x;
            const dy = posY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 80;
            if (dist < radius) {
              highlight = (1 - dist / radius);
            }
          }

          const finalLum = Math.min(1, processedLum + highlight * 0.35);

          // Posterize into discrete bands for graphic, poster-like clarity
          const quantized = Math.round(finalLum * RAMP_MAX) / RAMP_MAX;
          const rampIndex = Math.min(RAMP_MAX, Math.max(0, Math.round(quantized * RAMP_MAX)));
          const char = DENSITY_RAMP[rampIndex] || " ";

          if (char !== " ") {
            if (highlight > 0.15) {
              // Blueprint Blue hover highlight
              ctx.fillStyle = "#2B4EFF";
            } else {
              // Clean graphic contrast
              const alpha = Math.max(0.35, quantized);
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
