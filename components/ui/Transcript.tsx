"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The page is written as a terminal transcript. A Block waits until it scrolls
 * into view, then prints its children one line at a time, in order.
 */
export function Block({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const lineVariants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.16, ease: "linear" as const } },
};

/** One printed line of output. */
export function Line({ children, className, as = "p" }: { children: ReactNode; className?: string; as?: "p" | "div" | "li" | "span" }) {
  const Tag = motion[as];
  return (
    <Tag variants={lineVariants} className={className}>
      {children}
    </Tag>
  );
}

/** Prints character by character, the way a shell echoes a typed command. */
export function Command({ text, className, speed = 26 }: { text: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    let frame: number;
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const typed = Math.min(text.length, Math.floor((now - start) / speed));
      setCount(typed);
      if (typed < text.length) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, text, speed, reduceMotion]);

  const done = count >= text.length;

  return (
    <p ref={ref} className={cn("text-[15px] text-dim", className)}>
      <span aria-hidden="true" className="select-none text-accent">
        ${" "}
      </span>
      <span className="sr-only">Command: </span>
      {text.slice(0, count)}
      {!done && <span className="caret" aria-hidden="true" />}
    </p>
  );
}

/** Thin rule used to separate one printed section from the next. */
export function Divider({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-px w-full bg-gradient-to-r from-line/15 via-line/5 to-transparent", className)} />;
}
