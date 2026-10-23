"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const cs = project?.caseStudy;
  const slug = project?.name.toLowerCase().replace(/\s+/g, "-");

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
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-page/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line/10 px-4 py-2.5">
              <span className="truncate font-mono text-xs text-dim">~/work/{slug}.md</span>
              <button
                onClick={onClose}
                className="rounded-full px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                close
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="relative aspect-[16/9] w-full bg-surface">
                <Image src={project.image} alt={`${project.name} interface`} fill sizes="768px" className="object-cover" />
              </div>

              <div className="space-y-8 p-5 sm:p-7">
                <div>
                  <h2 className="text-2xl font-medium tracking-[-0.02em]">{project.name.toLowerCase()}</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-dim">{project.description}</p>
                </div>

                {cs && (
                  <>
                    <dl className="grid gap-x-8 gap-y-4 border-y border-line/10 py-5 font-mono text-xs sm:grid-cols-3">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="text-muted">{m.label.toLowerCase()}</dt>
                          <dd className="mt-1.5 text-sm text-fg">{m.value.toLowerCase()}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-xs text-muted">the problem</p>
                        <p className="mt-3 text-sm leading-relaxed text-dim">{cs.problem}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted">the approach</p>
                        <p className="mt-3 text-sm leading-relaxed text-dim">{cs.approach}</p>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-line/10 bg-page/60">
                      <div className="flex items-center justify-between gap-3 border-b border-line/10 px-4 py-2.5">
                        <span className="font-mono text-xs text-dim">{cs.codeSnippet.filename}</span>
                        <button
                          onClick={() => copyCode(cs.codeSnippet.code)}
                          className="font-mono text-xs text-muted transition-colors hover:text-accent"
                        >
                          {copied ? "copied" : "copy"}
                        </button>
                      </div>
                      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-dim">
                        <code>{cs.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
                >
                  open repository
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
