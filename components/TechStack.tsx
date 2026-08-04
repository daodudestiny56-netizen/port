"use client";

import { motion } from "framer-motion";
import { Cpu, CheckCircle2, Zap } from "lucide-react";

interface SpecItem {
  name: string;
  category: string;
  spec: string;
  status: string;
  isBlackBg: boolean;
}

const SPEC_SHEET: SpecItem[] = [
  { name: "NEXT.JS 14", category: "FRAMEWORK", spec: "App Router / SSR / Edge Middleware", status: "VERIFIED 100%", isBlackBg: false },
  { name: "REACT 18", category: "LIBRARY", spec: "Concurrent Mode / Server Components", status: "VERIFIED 100%", isBlackBg: true },
  { name: "TYPESCRIPT", category: "LANGUAGE", spec: "Strict Null Checks / Generics / AST", status: "STRICT MODE", isBlackBg: false },
  { name: "TAILWIND CSS", category: "STYLING", spec: "Custom Tokens / JIT Engine / Directives", status: "ZERO CONFLICT", isBlackBg: true },
  { name: "FRAMER MOTION", category: "ANIMATION", spec: "Physics Springs / Layout Animations", status: "60 FPS GUARANTEE", isBlackBg: false },
  { name: "GSAP 3", category: "ANIMATION", spec: "ScrollTrigger / Timeline Offload", status: "GPU ACCEL", isBlackBg: true },
  { name: "WEBGL / CANVAS", category: "GRAPHICS", spec: "Custom Shaders / Halftone Matrix", status: "SUB-16MS FRAME", isBlackBg: false },
  { name: "WEBSOCKETS", category: "NETWORK", spec: "Real-time PCM Audio / Ring Buffers", status: "SUB-85MS LATENCY", isBlackBg: true },
];

export default function TechStack() {
  return (
    <section id="toolkit" className="w-full px-4 sm:px-6 md:px-10 py-16 grid-border-bottom bg-[#FFFFFF] text-[#0D0D0D]">
      {/* Section Header */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 pb-4 border-b-4 border-[#0D0D0D]"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-sm mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#2B4EFF]" />
            <span>MY TECH STACK <span className="text-[#2B4EFF]">{"//"}</span> TOOLS & SKILLS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#0D0D0D]">
            MY TOOLKIT
          </h2>
        </div>

        <span className="font-mono text-xs font-bold text-[#FFFFFF] uppercase bg-[#0D0D0D] px-3 py-1 border-2 border-[#0D0D0D]">
          SKILLS INDEX <span className="text-[#2B4EFF]">v2.4</span>
        </span>
      </motion.div>

      {/* Punch Card Spec Sheet Grid with Terminal Line Readout Stagger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {SPEC_SHEET.map((item, idx) => {
          const cardClass = item.isBlackBg
            ? "bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist hover:shadow-brutalist-blueprint"
            : "bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#0D0D0D] shadow-brutalist hover:shadow-brutalist-blueprint";

          return (
            <motion.div
              key={item.name}
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0, y: 15 }}
              whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className={`p-5 flex flex-col justify-between h-full select-none transition-all duration-200 ${cardClass}`}
            >
              {/* Top Punch Hole & Category */}
              <div className="flex justify-between items-center pb-3 border-b-2 border-current">
                <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase opacity-80">
                  {item.category}
                </span>
                <div className="w-3 h-3 border-2 border-current bg-[#2B4EFF]" />
              </div>

              {/* Spec Item Name */}
              <div className="my-6">
                <span className="font-mono text-xs text-[#2B4EFF] font-bold block mb-1">
                  SKILL_0{idx + 1}
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
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3] text-[#2B4EFF]" />
                  {item.status}
                </span>
                <Zap className="w-3.5 h-3.5 stroke-[3] text-[#2B4EFF]" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
