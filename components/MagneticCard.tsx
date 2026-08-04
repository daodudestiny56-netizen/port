"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  shadowColor?: string;
}

export default function MagneticCard({
  children,
  className = "",
  onClick,
  shadowColor = "#0D0D0D",
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Max 10px magnetic pull offset
    const pullX = (distanceX / (rect.width / 2)) * 10;
    const pullY = (distanceY / (rect.height / 2)) * 10;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      animate={{
        boxShadow: isHovered
          ? `10px 10px 0px ${shadowColor}`
          : `4px 4px 0px ${shadowColor}`,
      }}
      transition={{ duration: 0.15 }}
      className={`border-3 border-[#0D0D0D] transition-transform duration-100 ease-out select-none cursor-pointer ${className}`}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}
