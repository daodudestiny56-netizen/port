"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Copy, Check, Code2, Cpu, CheckCircle2 } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [project]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-border rounded-[16px] overflow-hidden flex flex-col z-10 shadow-2xl"
        >
          {/* Sticky Header Bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-[#111111]/90 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase bg-[#1A1A1A] border border-border rounded-full text-[#3FE8F5]">
                {project.category}
              </span>
              <h2 className="font-display text-lg sm:text-xl font-[300] text-primaryText tracking-tight truncate">
                {project.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-border bg-surface hover:border-primaryText flex items-center justify-center text-primaryText transition-colors min-w-[44px] min-h-[44px]"
              aria-label="Close modal"
              data-cursor="hover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar font-sans">
            {/* Overview / Brief */}
            <div>
              <h3 className="font-mono text-xs text-[#3FE8F5] tracking-widest uppercase mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> TECHNICAL OVERVIEW
              </h3>
              <p className="text-sm md:text-base text-secondaryText leading-relaxed font-[300]">
                {project.description}
              </p>
            </div>

            {cs && (
              <>
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cs.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-[10px] bg-[#161616] border border-border flex flex-col gap-1"
                    >
                      <span className="font-mono text-xl sm:text-2xl font-bold text-[#00F0FF] tracking-tight">
                        {m.value}
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-secondaryText uppercase">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Problem & Approach Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem */}
                  <div className="p-5 rounded-[12px] bg-[#161616] border border-border flex flex-col gap-2">
                    <span className="font-mono text-xs text-red-400 tracking-widest uppercase font-semibold">
                      THE ARCHITECTURAL BOTTLENECK
                    </span>
                    <p className="text-xs sm:text-sm text-secondaryText leading-relaxed font-[300]">
                      {cs.problem}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="p-5 rounded-[12px] bg-[#161616] border border-border flex flex-col gap-2">
                    <span className="font-mono text-xs text-[#3FE8F5] tracking-widest uppercase font-semibold">
                      ENGINEERING STRATEGY
                    </span>
                    <p className="text-xs sm:text-sm text-secondaryText leading-relaxed font-[300]">
                      {cs.approach}
                    </p>
                  </div>
                </div>

                {/* Illustrative Code Architecture Snippet */}
                <div className="rounded-[12px] bg-[#0A0A0A] border border-border overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2.5 bg-[#141414] border-b border-border font-mono text-xs text-secondaryText">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#00F0FF]" />
                      <span className="text-primaryText">{cs.codeSnippet.filename}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(cs.codeSnippet.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1F1F1F] text-[10px] hover:text-primaryText transition-colors min-h-[36px]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                          <span className="text-[#00F0FF]">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY CODE</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm text-primaryText/90 leading-relaxed bg-[#0A0A0A]">
                    <code>{cs.codeSnippet.code}</code>
                  </pre>
                </div>
              </>
            )}
          </div>

          {/* Sticky Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-border bg-[#111111] shrink-0">
            <span className="font-mono text-xs text-secondaryText flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
              PRODUCTION READY
            </span>

            <div className="flex items-center gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-border bg-[#1A1A1A] hover:border-[#00F0FF] text-primaryText text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-2 min-h-[44px]"
              >
                <span>GITHUB REPO</span>
                <ArrowUpRight className="w-4 h-4 text-[#00F0FF]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
