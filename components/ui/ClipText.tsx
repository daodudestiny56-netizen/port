"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";
import { EASE_PORTFOLIO } from "@/lib/animations";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  isStart?: boolean;
}

function Typewriter({ text, delay = 0, speed = 80, isStart = true }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isStart) return;

    setDisplayText("");
    setIsDone(false);
    let timerId: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      timerId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsDone(true);
          clearInterval(timerId);
        }
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      if (timerId) clearInterval(timerId);
    };
  }, [text, delay, speed, isStart]);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      {!isDone && (
        <span className="inline-block w-[0.06em] h-[0.85em] bg-[#00F0FF] ml-[0.05em] animate-pulse shrink-0" />
      )}
    </span>
  );
}

interface ClipTextProps {
  text: string | string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  typewriterLineIndex?: number;
}

export default function ClipText({
  text,
  className = "",
  lineClassName = "",
  delay = 0,
  typewriterLineIndex,
}: ClipTextProps) {
  const { isLoaded } = usePreloader();
  const lines = Array.isArray(text) ? text : [text];

  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.85,
        ease: EASE_PORTFOLIO,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={isLoaded ? "visible" : "hidden"}
      viewport={{ once: false, margin: "-50px" }}
      variants={parentVariants}
    >
      {lines.map((line, idx) => {
        const isTypewriter = idx === typewriterLineIndex;
        return (
          <div key={idx} className="overflow-hidden clip-mask" style={{ display: "block" }}>
            {isTypewriter ? (
              <span className={`inline-block select-none ${lineClassName}`}>
                <Typewriter text={line} delay={delay + idx * 0.15} speed={100} isStart={isLoaded} />
              </span>
            ) : (
              <motion.span
                className={`inline-block will-change-transform ${lineClassName}`}
                variants={childVariants}
              >
                {line}
              </motion.span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
