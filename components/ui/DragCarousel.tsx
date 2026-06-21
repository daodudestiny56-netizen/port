"use client";

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface DragCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export interface DragCarouselRef {
  scrollLeft: () => void;
  scrollRight: () => void;
}

const DragCarousel = forwardRef<DragCarouselRef, DragCarouselProps>(
  ({ children, className = "" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraintsRight, setConstraintsRight] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const x = useMotionValue(0);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      
      // Update constraints for desktop dragging
      const updateConstraints = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const scrollWidth = containerRef.current.scrollWidth;
          setConstraintsRight(containerWidth - scrollWidth);
        }
      };
      
      // Tiny delay to let elements render and calculate sizes
      const timer = setTimeout(updateConstraints, 100);

      window.addEventListener("resize", updateConstraints);
      return () => {
        window.removeEventListener("resize", checkMobile);
        window.removeEventListener("resize", updateConstraints);
        clearTimeout(timer);
      };
    }, [children]);

    useImperativeHandle(ref, () => ({
      scrollLeft: () => {
        if (isMobile) {
          containerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
        } else {
          const currentX = x.get();
          const targetX = Math.min(currentX + 320, 0);
          animate(x, targetX, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
        }
      },
      scrollRight: () => {
        if (isMobile) {
          containerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
        } else {
          const currentX = x.get();
          const targetX = Math.max(currentX - 320, constraintsRight);
          animate(x, targetX, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
        }
      }
    }));

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full scroll-smooth overflow-x-auto touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-hidden md:cursor-grab md:active:cursor-grabbing",
          className
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <motion.div
          drag={isMobile ? false : "x"}
          dragConstraints={{ right: 0, left: constraintsRight }}
          dragElastic={0.1}
          style={{ x }}
          className="flex gap-6 w-max select-none will-change-transform"
          whileTap={isMobile ? {} : { cursor: "grabbing" }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);

DragCarousel.displayName = "DragCarousel";

export default DragCarousel;
