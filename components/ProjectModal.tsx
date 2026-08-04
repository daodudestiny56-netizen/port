"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Copy, Check, Code2, Cpu, AlertTriangle, CheckCircle2 } from "lucide-react";
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
        {/* Hard Overlay Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D0D0D]/90 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFFFF] border-4 border-[#0D0D0D] shadow-brutalist-lg flex flex-col z-10 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b-4 border-[#0D0D0D] bg-[#0D0D0D] text-[#FFFFFF] shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-mono font-extrabold uppercase bg-[#FFFFFF] text-[#0D0D0D] border-2 border-[#0D0D0D]">
                {project.category}
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#FFFFFF] truncate">
                {project.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 border-3 border-[#0D0D0D] bg-[#FFFFFF] hover:bg-[#2B4EFF] hover:text-[#FFFFFF] flex items-center justify-center text-[#0D0D0D] transition-colors"
              aria-label="Close modal"
              data-cursor="hover"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-[#0D0D0D]">
            {/* Overview */}
            <div className="border-3 border-[#0D0D0D] bg-[#0D0D0D] text-[#FFFFFF] p-5 shadow-brutalist">
              <h3 className="font-mono text-xs font-bold text-[#2B4EFF] tracking-widest uppercase mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> PROJECT OVERVIEW
              </h3>
              <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {cs && (
              <>
                {/* Real Metrics Grid */}
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0D0D0D] mb-3">
                    PROJECT METRICS
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {cs.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-4 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist-sm flex flex-col gap-1"
                      >
                        <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#2B4EFF] tracking-tight">
                          {m.value}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider text-[#FFFFFF]/80 uppercase">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem & Approach Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem */}
                  <div className="p-5 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist flex flex-col gap-2">
                    <span className="font-mono text-xs text-[#2B4EFF] tracking-widest uppercase font-extrabold flex items-center gap-1.5 pb-2 border-b border-[#FFFFFF]/30">
                      <AlertTriangle className="w-4 h-4" /> THE CHALLENGE
                    </span>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#FFFFFF]/90">
                      {cs.problem}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="p-5 bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#0D0D0D] shadow-brutalist flex flex-col gap-2">
                    <span className="font-mono text-xs text-[#2B4EFF] tracking-widest uppercase font-extrabold flex items-center gap-1.5 pb-2 border-b border-[#0D0D0D]">
                      <CheckCircle2 className="w-4 h-4" /> HOW I BUILT IT
                    </span>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#0D0D0D]">
                      {cs.approach}
                    </p>
                  </div>
                </div>

                {/* Code Architecture Snippet */}
                <div className="border-3 border-[#0D0D0D] bg-[#0D0D0D] shadow-brutalist overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-[#0D0D0D] text-[#FFFFFF] border-b-3 border-[#FFFFFF]/30 font-mono text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 stroke-[3] text-[#2B4EFF]" />
                      <span className="uppercase text-[#2B4EFF]">{cs.codeSnippet.filename}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(cs.codeSnippet.code)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#2B4EFF] hover:text-[#FFFFFF] border-2 border-[#0D0D0D] text-[10px] font-mono font-bold uppercase transition-colors"
                      data-cursor="hover"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 stroke-[3]" />
                          <span>COPY CODE</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-xs text-[#FFFFFF] leading-relaxed bg-[#0D0D0D]">
                    <code>{cs.codeSnippet.code}</code>
                  </pre>
                </div>
              </>
            )}
          </div>

          {/* Sticky Footer Bar */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-t-4 border-[#0D0D0D] bg-[#FFFFFF] shrink-0">
            <span className="font-mono text-xs font-bold text-[#0D0D0D] uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2B4EFF]" />
              PRODUCTION READY
            </span>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#0D0D0D] text-[#FFFFFF] hover:bg-[#2B4EFF] border-3 border-[#0D0D0D] shadow-brutalist-sm text-xs font-mono font-extrabold uppercase flex items-center gap-2 transition-colors"
              data-cursor="hover"
            >
              <span>GITHUB REPO</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
