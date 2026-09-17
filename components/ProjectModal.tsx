"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Check, CheckCircle2, Code2, Copy, X } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const cs = project?.caseStudy;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.name}
          className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0D0D0D]/85 backdrop-blur-sm board-dots-ink"
          />

          <motion.div
            initial={{ scale: 0.4, rotate: -8, y: 120, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: 6, y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFFFF] text-[#0D0D0D] border-4 border-[#0D0D0D] shadow-[14px_14px_0_#2B4EFF] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center gap-3 px-4 sm:px-6 py-3 bg-[#0D0D0D] text-[#FFFFFF] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="hidden sm:inline px-2 py-1 bg-[#2B4EFF] border-2 border-[#FFFFFF] font-mono text-[10px] font-extrabold uppercase">
                  CASE STUDY
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-3xl uppercase tracking-tight truncate">{project.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="grid place-items-center w-11 h-11 shrink-0 bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#FFFFFF] hover:bg-[#2B4EFF] hover:text-[#FFFFFF] hover:rotate-90 transition-all"
                aria-label="Close case study"
                data-cursor="hover"
              >
                <X className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            <div className="overflow-y-auto">
              {/* Hero image with zoom-out reveal */}
              <div className="relative h-52 sm:h-80 border-b-4 border-[#0D0D0D] overflow-hidden bg-[#161616]">
                <motion.div
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={project.image} alt={`${project.name} interface`} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
                </motion.div>
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-[#FFFFFF] border-3 border-[#0D0D0D] font-mono text-[11px] font-extrabold uppercase">
                  {project.category}
                </span>
              </div>

              <div className="p-4 sm:p-8 space-y-8">
                <p className="font-sans text-lg sm:text-2xl font-bold leading-snug max-w-3xl">{project.description}</p>

                {cs && (
                  <>
                    <dl className="grid grid-cols-1 sm:grid-cols-3 border-3 border-[#0D0D0D]">
                      {cs.metrics.map((m, idx) => (
                        <motion.div
                          key={m.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.08 }}
                          className={`p-4 ${idx < cs.metrics.length - 1 ? "border-b-3 sm:border-b-0 sm:border-r-3" : ""} border-[#0D0D0D] ${
                            idx === 1 ? "bg-[#0D0D0D] text-[#FFFFFF]" : ""
                          }`}
                        >
                          <dt className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-60">{m.label}</dt>
                          <dd className="font-display font-extrabold text-xl sm:text-2xl uppercase text-[#2B4EFF] mt-1">{m.value}</dd>
                        </motion.div>
                      ))}
                    </dl>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist-blueprint">
                        <span className="flex items-center gap-2 pb-2 mb-3 border-b-2 border-[#FFFFFF]/30 font-mono text-xs font-extrabold uppercase tracking-widest text-[#2B4EFF]">
                          <AlertTriangle className="w-4 h-4" /> 01 · The challenge
                        </span>
                        <p className="font-sans text-sm sm:text-base leading-relaxed">{cs.problem}</p>
                      </div>
                      <div className="p-5 bg-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist">
                        <span className="flex items-center gap-2 pb-2 mb-3 border-b-2 border-[#0D0D0D] font-mono text-xs font-extrabold uppercase tracking-widest text-[#2B4EFF]">
                          <CheckCircle2 className="w-4 h-4" /> 02 · The approach
                        </span>
                        <p className="font-sans text-sm sm:text-base leading-relaxed">{cs.approach}</p>
                      </div>
                    </div>

                    <div className="border-3 border-[#0D0D0D] bg-[#0D0D0D] shadow-brutalist">
                      <div className="flex justify-between items-center px-4 py-2.5 border-b-2 border-[#FFFFFF]/20 font-mono text-xs font-bold text-[#FFFFFF]">
                        <span className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 stroke-[3] text-[#2B4EFF]" />
                          <span className="text-[#2B4EFF]">03 ·</span> {cs.codeSnippet.filename}
                        </span>
                        <button
                          onClick={() => handleCopyCode(cs.codeSnippet.code)}
                          className="flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#2B4EFF] hover:text-[#FFFFFF] border-2 border-[#FFFFFF] text-[10px] font-extrabold uppercase transition-colors"
                          data-cursor="hover"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[3]" />}
                          {copied ? "COPIED" : "COPY"}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-[#FFFFFF] select-text">
                        <code>
                          {cs.codeSnippet.code.split("\n").map((line, i) => (
                            <span key={i} className="block">
                              <span className="inline-block w-8 pr-3 text-right text-[#FFFFFF]/30 select-none">{i + 1}</span>
                              {line}
                            </span>
                          ))}
                        </code>
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-t-4 border-[#0D0D0D] bg-[#FFFFFF] shrink-0">
              <span className="hidden sm:inline font-mono text-xs font-extrabold uppercase">
                SOURCE <span className="text-[#2B4EFF]">→</span> GITHUB
              </span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-[#0D0D0D] text-[#FFFFFF] hover:bg-[#2B4EFF] border-3 border-[#0D0D0D] shadow-brutalist-sm font-mono text-xs font-extrabold uppercase transition-colors"
                data-cursor="hover"
              >
                VIEW REPOSITORY <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
