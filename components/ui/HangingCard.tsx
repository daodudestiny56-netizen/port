"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { BinderClip, Pushpin, Tape } from "./Attachments";

export type AttachmentKind = "pin" | "clip" | "clips" | "tape" | "none";

interface HangingCardProps {
  children: React.ReactNode;
  attachment?: AttachmentKind;
  attachmentColor?: "accent" | "ink" | "bone";
  /** Background the card hangs on — decides attachment contrast. */
  tone?: "ink" | "bone";
  /** Resting tilt in degrees. */
  tilt?: number;
  /** Idle sway amplitude in degrees. */
  swayAngle?: number;
  swayDuration?: number;
  delay?: number;
  className?: string;
}

/**
 * A card that hangs from a pin, clip or tape. It drops in on first view,
 * sways idly like a pendulum, and swings in response to cursor movement.
 */
export default function HangingCard({
  children,
  attachment = "pin",
  attachmentColor = "accent",
  tone = "bone",
  tilt = 0,
  swayAngle = 1.1,
  swayDuration = 6,
  delay = 0,
  className = "",
}: HangingCardProps) {
  const reduceMotion = useReducedMotion();
  const target = useMotionValue(0);
  const rotate = useSpring(target, { stiffness: 70, damping: 5, mass: 0.9 });
  const settleTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const push = Math.max(-8, Math.min(8, e.movementX * 0.55));
    if (Math.abs(push) < 0.4) return;
    target.set(push);
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => target.set(0), 90);
  };

  const handleMouseLeave = () => {
    clearTimeout(settleTimer.current);
    target.set(0);
  };

  const dropSign = tilt >= 0 ? 1 : -1;

  return (
    <motion.div
      initial={reduceMotion ? false : { y: -90, rotate: tilt + dropSign * 9, opacity: 0 }}
      whileInView={{ y: 0, rotate: tilt, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 7,
        mass: 0.8,
        delay,
        opacity: { duration: 0.2, delay },
      }}
      style={{ transformOrigin: "50% 0%" }}
      className={`relative pt-5 ${className}`}
    >
      <div
        className="hang-sway h-full"
        style={
          {
            "--sway-angle": `${swayAngle}deg`,
            "--sway-duration": `${swayDuration}s`,
            animationDelay: `${-((delay * 7) % swayDuration)}s`,
          } as React.CSSProperties
        }
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotate, transformOrigin: "50% 0%" }}
          className="relative h-full"
        >
          {attachment === "pin" && (
            <Pushpin tone={tone} color={attachmentColor} className="absolute -top-4 left-1/2 -translate-x-1/2 z-30" />
          )}
          {attachment === "clip" && (
            <BinderClip tone={tone} color={attachmentColor} className="absolute -top-8 left-1/2 -translate-x-1/2 z-30" />
          )}
          {attachment === "clips" && (
            <>
              <BinderClip tone={tone} color={attachmentColor} className="absolute -top-8 left-[18%] -translate-x-1/2 z-30" />
              <BinderClip tone={tone} color={attachmentColor} className="absolute -top-8 left-[82%] -translate-x-1/2 z-30" />
            </>
          )}
          {attachment === "tape" && (
            <Tape color={attachmentColor} className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 z-30" />
          )}
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
