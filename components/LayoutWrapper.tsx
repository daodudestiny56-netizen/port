"use client";

import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <PreloaderProvider>
      <CustomCursor />
      
      {/* Global Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <StarsBackground className="opacity-45" />
        <ShootingStars className="opacity-30" starColor="#FFFFFF" trailColor="#FFFFFF" />
      </div>

      <motion.div
        className="relative z-10 w-full min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </PreloaderProvider>
  );
}
