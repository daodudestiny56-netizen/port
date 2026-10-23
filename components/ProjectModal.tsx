"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
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
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-soft-lg"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-6 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">{project.category}</p>
                <h2 className="truncate font-display text-xl font-semibold tracking-tight">{project.name}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="relative aspect-[16/9] w-full bg-surface">
                <Image src={project.image} alt={`${project.name} interface`} fill sizes="768px" className="object-cover" />
              </div>

              <div className="space-y-8 p-6 sm:p-8">
                <p className="text-lg leading-relaxed">{project.description}</p>

                {cs && (
                  <>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-y border-ink/10 py-6 sm:grid-cols-3">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">{m.label}</dt>
                          <dd className="mt-1.5 text-sm font-medium">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">The challenge</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink/70">{cs.problem}</p>
                      </div>
                      <div>
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">The approach</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink/70">{cs.approach}</p>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-ink/10 bg-ink">
                      <div className="flex items-center justify-between gap-3 border-b border-bone/10 px-4 py-2.5">
                        <span className="font-mono text-[11px] text-bone/60">{cs.codeSnippet.filename}</span>
                        <button
                          onClick={() => handleCopyCode(cs.codeSnippet.code)}
                          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone/60 transition-colors hover:text-bone"
                        >
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-bone/85">
                        <code>{cs.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex shrink-0 justify-end border-t border-ink/10 px-6 py-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-accent"
              >
                View repository
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
