"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

interface NavbarProps {
  currentTheme?: "bone" | "ink";
}

export default function Navbar({ currentTheme = "bone" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const stickerLinks = [
    { name: "WORK", href: "#work", bg: "bg-[#0D0D0D]", text: "text-[#FFFFFF]", rotate: "-2deg" },
    { name: "TOOLKIT", href: "#toolkit", bg: "bg-[#FFFFFF]", text: "text-[#0D0D0D]", rotate: "1.5deg" },
    { name: "ABOUT", href: "#about", bg: "bg-[#0D0D0D]", text: "text-[#FFFFFF]", rotate: "-1.5deg" },
    { name: "CONTACT", href: "#contact", bg: "bg-[#FFFFFF]", text: "text-[#0D0D0D]", rotate: "2deg" },
  ];

  const isInkTheme = currentTheme === "ink";

  return (
    <>
      <header className="relative w-full z-40 flex justify-between items-center py-2 sm:py-4 px-1 sm:px-4 gap-2">
        {/* Brand Name Tag */}
        <motion.a
          href="#"
          whileHover={{ rotate: 0, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{ transform: "rotate(-1deg)" }}
          className={`font-display text-xs sm:text-sm md:text-base font-extrabold px-2.5 sm:px-3 py-1 sm:py-1.5 uppercase tracking-wider border-3 border-[#0D0D0D] shadow-brutalist-sm transition-colors truncate max-w-[170px] xs:max-w-[220px] sm:max-w-none ${
            isInkTheme ? "bg-[#FFFFFF] text-[#0D0D0D]" : "bg-[#0D0D0D] text-[#FFFFFF]"
          }`}
          data-cursor="hover"
        >
          {portfolioData.name}
        </motion.a>

        {/* Status Chip & Desktop Sticker-Sheet Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
          {/* Status Chip */}
          <div
            className={`hidden xl:flex items-center gap-2 px-3 py-1 border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-sm ${
              isInkTheme ? "bg-[#0D0D0D] text-[#FFFFFF] border-[#FFFFFF]" : "bg-[#FFFFFF] text-[#0D0D0D]"
            }`}
          >
            <span className="w-2.5 h-2.5 bg-[#0D0D0D] border border-[#FFFFFF]" />
            <span className="truncate">{portfolioData.status}</span>
          </div>

          {/* Sticker Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {stickerLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                style={{ transform: `rotate(${link.rotate})` }}
                whileHover={{ rotate: 0, y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`px-3 lg:px-3.5 py-1.5 text-xs font-mono font-extrabold tracking-wider border-3 border-[#0D0D0D] shadow-brutalist-sm ${link.bg} ${link.text} block select-none`}
                data-cursor="hover"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] border-3 border-[#0D0D0D] bg-[#0D0D0D] text-[#FFFFFF] shadow-brutalist-sm focus:outline-none z-50 shrink-0"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            data-cursor="hover"
          >
            {isOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
          </button>
        </div>
      </header>

      {/* Mobile Sticker Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0D0D0D]/85 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-[340px] bg-[#FFFFFF] border-l-4 border-[#0D0D0D] p-5 sm:p-6 flex flex-col justify-between z-50 md:hidden shadow-brutalist-lg select-none"
            >
              <div className="flex justify-between items-center pb-4 border-b-3 border-[#0D0D0D]">
                <span className="font-mono text-xs font-bold tracking-widest text-[#0D0D0D] uppercase">
                  NAV_MENU
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center border-3 border-[#0D0D0D] bg-[#0D0D0D] text-[#FFFFFF]"
                >
                  <X className="w-6 h-6 stroke-[3]" />
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5 my-auto py-6">
                {stickerLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    style={{ transform: `rotate(${link.rotate})` }}
                    whileHover={{ rotate: 0 }}
                    className={`flex items-center justify-between p-3.5 sm:p-4 border-3 border-[#0D0D0D] text-base sm:text-lg font-mono font-extrabold shadow-brutalist min-h-[48px] ${link.bg} ${link.text}`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-6 h-6 stroke-[3]" />
                  </motion.a>
                ))}
              </div>

              <div className="pt-4 border-t-3 border-[#0D0D0D] font-mono text-[11px] sm:text-xs font-bold">
                <span className="block text-[#0D0D0D] uppercase break-all">CONTACT: {portfolioData.email}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
