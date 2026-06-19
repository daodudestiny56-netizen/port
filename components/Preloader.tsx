"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const { setIsLoaded } = usePreloader();

  useEffect(() => {
    // Check if session storage flag exists
    if (typeof window !== "undefined") {
      const shown = sessionStorage.getItem("portfolio-preloader-shown");
      if (shown === "true") {
        setIsVisible(false);
        setIsLoaded(true);
        if (onComplete) onComplete();
        setHasCheckedSession(true);
        return;
      }
      setHasCheckedSession(true);
    }
  }, [setIsLoaded, onComplete]);

  useEffect(() => {
    if (!hasCheckedSession || !isVisible) return;

    let current = 0;
    let timer: NodeJS.Timeout;

    const tick = () => {
      let delay = 30; // standard speed

      if (current >= 80 && current < 95) {
        // Slow down between 80 and 95
        delay = 80 + Math.random() * 120;
      } else if (current >= 95) {
        // Snap to 100
        delay = 40;
      } else {
        // Fast start
        delay = 10 + Math.random() * 30;
      }

      timer = setTimeout(() => {
        current += 1;
        if (current > 100) {
          // Slide number up out of clip mask
          setIsSlidingUp(true);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("portfolio-preloader-shown", "true");
          }

          // After sliding up, fade container out
          setTimeout(() => {
            setIsVisible(false);
            setIsLoaded(true);
            if (onComplete) onComplete();
          }, 800);
        } else {
          setCount(current);
          tick();
        }
      }, delay);
    };

    tick();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hasCheckedSession, isVisible, setIsLoaded, onComplete]);

  // If already shown in session, don't render preloader markup
  if (!isVisible && hasCheckedSession) {
    return null;
  }

  const formattedCount = count < 10 ? `0${count}` : `${count}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 bg-background z-[99999] flex items-center justify-center select-none"
        >
          <div className="overflow-hidden relative h-[96px] md:h-[120px] flex items-center justify-center">
            <motion.h1
              initial={{ y: 0 }}
              animate={isSlidingUp ? { y: "-110%" } : { y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[80px] md:text-[96px] font-display font-extrabold leading-none text-primaryText font-mono tracking-tighter"
            >
              {formattedCount}
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
