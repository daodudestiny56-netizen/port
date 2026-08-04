"use client";

import { Cpu, CheckCircle2, Zap } from "lucide-react";

interface SpecItem {
  name: string;
  category: string;
  spec: string;
  status: string;
  accent: "yellow" | "indigo" | "bone";
}

const SPEC_SHEET: SpecItem[] = [
  { name: "NEXT.JS 14", category: "FRAMEWORK", spec: "App Router / SSR / Edge Middleware", status: "VERIFIED 100%", accent: "yellow" },
  { name: "REACT 18", category: "LIBRARY", spec: "Concurrent Mode / Server Components", status: "VERIFIED 100%", accent: "indigo" },
  { name: "TYPESCRIPT", category: "LANGUAGE", spec: "Strict Null Checks / Generics / AST", status: "STRICT MODE", accent: "bone" },
  { name: "TAILWIND CSS", category: "STYLING", spec: "Custom Tokens / JIT Engine / Directives", status: "ZERO CONFLICT", accent: "yellow" },
  { name: "FRAMER MOTION", category: "ANIMATION", spec: "Physics Springs / Layout Animations", status: "60 FPS GUARANTEE", accent: "indigo" },
  { name: "GSAP 3", category: "ANIMATION", spec: "ScrollTrigger / Timeline Offload", status: "GPU ACCEL", accent: "bone" },
  { name: "WEBGL / CANVAS", category: "GRAPHICS", spec: "Custom Shaders / Halftone Matrix", status: "SUB-16MS FRAME", accent: "yellow" },
  { name: "WEBSOCKETS", category: "NETWORK", spec: "Real-time PCM Audio / Ring Buffers", status: "SUB-85MS LATENCY", accent: "indigo" },
];

export default function TechStack() {
  return (
    <section id="toolkit" className="w-full px-4 sm:px-6 md:px-10 py-16 grid-border-bottom">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 pb-4 border-b-4 border-[#0D0D0D]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3D5AFE] text-[#F5F3EE] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-sm mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL SPECIFICATIONS // PUNCH CARD</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#0D0D0D]">
            TOOLKIT & SPEC SHEET
          </h2>
        </div>

        <span className="font-mono text-xs font-bold text-[#0D0D0D] uppercase bg-[#FFDE59] px-3 py-1 border-2 border-[#0D0D0D]">
          SPECIFICATION INDEX v2.4
        </span>
      </div>

      {/* Punch Card Spec Sheet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {SPEC_SHEET.map((item, idx) => {
          const bgClass =
            item.accent === "yellow"
              ? "bg-[#FFDE59] text-[#0D0D0D]"
              : item.accent === "indigo"
              ? "bg-[#3D5AFE] text-[#F5F3EE]"
              : "bg-[#F5F3EE] text-[#0D0D0D]";

          return (
            <div
              key={item.name}
              className={`border-3 border-[#0D0D0D] p-5 shadow-brutalist flex flex-col justify-between h-full select-none ${bgClass}`}
            >
              {/* Top Punch Hole & Category */}
              <div className="flex justify-between items-center pb-3 border-b-2 border-current">
                <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase opacity-80">
                  {item.category}
                </span>
                {/* Punch Card Hole Indicator */}
                <div className="w-3 h-3 border-2 border-current bg-current opacity-70" />
              </div>

              {/* Spec Item Name */}
              <div className="my-6">
                <span className="font-mono text-xs opacity-75 font-bold block mb-1">
                  SPEC_0{idx + 1}
                </span>
                <h3 className="font-display font-extrabold text-2xl tracking-tight uppercase">
                  {item.name}
                </h3>
                <p className="font-mono text-xs font-bold mt-2 leading-relaxed opacity-90">
                  {item.spec}
                </p>
              </div>

              {/* Status Badge */}
              <div className="pt-3 border-t-2 border-current flex items-center justify-between font-mono text-[10px] font-extrabold uppercase">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  {item.status}
                </span>
                <Zap className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
