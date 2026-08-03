"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background body scroll when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "WORK", href: "#work" },
    { name: "ABOUT", href: "#about" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header className="relative w-full z-40 flex justify-between items-center py-2 gap-4">
        {/* Brand Name */}
        <a
          href="#"
          className="font-display text-xs sm:text-sm md:text-base font-[300] tracking-wider md:tracking-widest text-secondaryText uppercase truncate hover:text-primaryText transition-colors"
          data-cursor="hover"
        >
          {portfolioData.name}
        </a>

        {/* Center/Right Status Badge & Desktop Navigation */}
        <div className="flex items-center gap-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-[10px] md:text-xs font-[300] tracking-wide shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryText opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primaryText"></span>
            </span>
            <span className="text-primaryText">{portfolioData.status}</span>
          </div>

          {/* Desktop Links (Hidden below 768px) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative py-1 text-xs font-[300] tracking-widest text-primaryText uppercase transition-colors"
                data-cursor="hover"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#E8FF47] transition-all duration-500 ease-portfolio-ease group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button (Hidden on 768px+) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border bg-[#111111]/90 text-primaryText hover:border-primaryText transition-colors focus:outline-none z-50 shrink-0"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            data-cursor="hover"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-[360px] bg-[#0A0A0A] border-l border-neutral-800 p-8 flex flex-col justify-between z-50 md:hidden shadow-2xl select-none"
            >
              {/* Top Header inside Drawer */}
              <div className="flex justify-between items-center pb-6 border-b border-border">
                <span className="font-display text-xs font-[300] tracking-widest text-secondaryText uppercase">
                  NAVIGATION
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-border bg-surface text-primaryText"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-6 my-auto py-8">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                    className="flex items-center justify-between text-2xl font-display font-[300] tracking-wider text-primaryText hover:text-[#E8FF47] transition-colors py-2 border-b border-neutral-900 min-h-[44px]"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-60" />
                  </motion.a>
                ))}
              </div>

              {/* Drawer Footer / Social Quick Links */}
              <div className="flex flex-col gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs font-mono text-secondaryText">
                  <span className="w-2 h-2 rounded-full bg-[#E8FF47]" />
                  <span>{portfolioData.email}</span>
                </div>
                {portfolioData.socials.whatsapp && (
                  <a
                    href={portfolioData.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-xs font-mono text-[#E8FF47] min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
