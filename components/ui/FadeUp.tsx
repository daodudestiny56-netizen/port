"use client";

import { motion } from "framer-motion";
import { usePreloader } from "@/context/PreloaderContext";
import { EASE_PORTFOLIO } from "@/lib/animations";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}: FadeUpProps) {
  const { isLoaded } = usePreloader();

  return (
    <motion.div
      initial="hidden"
      whileInView={isLoaded ? "visible" : "hidden"}
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: EASE_PORTFOLIO,
            delay,
          },
        },
      }}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}
