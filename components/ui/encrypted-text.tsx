"use client";

import { ElementType, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Restrained set — glyphs you'd actually find in a terminal. */
const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/\\|<>[]{}=+*#$%&~^_";

const SCRAMBLABLE = /[A-Za-z0-9]/;

export interface EncryptedTextProps {
  text: string;
  /** Milliseconds between each character locking into place. */
  revealDelayMs?: number;
  /** Milliseconds between scramble flips of the not-yet-revealed characters. */
  flipDelayMs?: number;
  /** Milliseconds to wait after entering view before the reveal starts. */
  startDelayMs?: number;
  characters?: string;
  /** Fraction of the element that must be visible before it runs. */
  amount?: number;
  className?: string;
  /** Applied to characters that are still scrambling. */
  scrambledClassName?: string;
  as?: ElementType;
}

// useLayoutEffect warns during SSR; this keeps the pre-paint swap on the client only.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scrambled text that decodes itself once, the first time it scrolls into view.
 *
 * Renders the real text on the server and on the first client paint, so hydration
 * matches; the scramble is applied in a layout effect before the browser paints.
 * Assistive technology always reads the real string via aria-label.
 */
export default function EncryptedText({
  text,
  revealDelayMs = 40,
  flipDelayMs = 50,
  startDelayMs = 0,
  characters = DEFAULT_CHARACTERS,
  amount = 0.4,
  className,
  scrambledClassName,
  as: Tag = "span",
}: EncryptedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<number>();
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount });

  // How many leading characters have locked in. text.length means "done".
  const [revealed, setRevealed] = useState(text.length);
  const [tick, setTick] = useState(0);

  const animates = !reduceMotion;

  const randomChar = useCallback(
    () => characters[Math.floor(Math.random() * characters.length)] ?? "#",
    [characters]
  );

  // Scramble before the first paint after mount, so the real text is never flashed.
  useIsomorphicLayoutEffect(() => {
    if (!animates) {
      setRevealed(text.length);
      return;
    }
    setRevealed(0);
  }, [text, animates]);

  useEffect(() => {
    if (!animates || !isInView) return;

    let start: number | null = null;
    let lastFlip = 0;
    let lastRevealed = -1;

    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - startDelayMs;

      if (elapsed < 0) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }

      const nextRevealed = Math.min(text.length, Math.floor(elapsed / revealDelayMs));

      // Repaint when a character locks in, or when the scramble is due to flip.
      if (nextRevealed !== lastRevealed || now - lastFlip >= flipDelayMs) {
        lastRevealed = nextRevealed;
        lastFlip = now;
        setRevealed(nextRevealed);
        setTick((t) => t + 1);
      }

      if (nextRevealed < text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = undefined; // Settled — stop the loop for good.
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    };
  }, [animates, isInView, text, revealDelayMs, flipDelayMs, startDelayMs]);

  const characterNodes = useMemo(
    () =>
      text.split("").map((char, i) => {
        const isRevealed = i < revealed;
        // Spaces and punctuation stay put, so word shapes read through the scramble.
        if (isRevealed || !SCRAMBLABLE.test(char)) {
          return (
            <span key={i} className={char === " " ? undefined : "transition-colors duration-150"}>
              {char}
            </span>
          );
        }
        return (
          <span key={i} className={cn("text-muted", scrambledClassName)}>
            {randomChar()}
          </span>
        );
      }),
    // `tick` drives the per-frame re-roll of the scrambled glyphs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, revealed, tick, scrambledClassName, randomChar]
  );

  return (
    <Tag
      ref={ref}
      aria-label={text}
      data-state={revealed >= text.length ? "revealed" : "scrambling"}
      className={cn("inline-block", className)}
    >
      <span aria-hidden="true">{characterNodes}</span>
    </Tag>
  );
}
