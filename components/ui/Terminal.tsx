"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** `$ command` line — the recurring typographic device across the site. */
export function Prompt({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[13px] text-muted", className)}>
      <span className="select-none text-accent" aria-hidden="true">
        ${" "}
      </span>
      {children}
    </p>
  );
}

/** Blinking block cursor. Decorative only. */
export function Caret({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("caret ml-1", className)} />;
}

interface TerminalPanelProps {
  /** Shown at the left of the title bar, e.g. a file path. */
  label: string;
  /** Optional right-hand status text. */
  status?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/** Glass panel with a thin title bar. Used sparingly — three places on the page. */
export function TerminalPanel({ label, status, children, className, bodyClassName }: TerminalPanelProps) {
  return (
    <div className={cn("glass overflow-hidden rounded-xl", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-line/10 px-4 py-2.5">
        <span className="truncate font-mono text-xs text-dim">{label}</span>
        {status && <span className="shrink-0 font-mono text-xs text-muted">{status}</span>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
