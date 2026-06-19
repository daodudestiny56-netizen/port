"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Check, Copy, MessageCircle } from "lucide-react";
import { portfolioData } from "@/lib/data";
import ClipText from "@/components/ui/ClipText";
import Marquee from "@/components/ui/Marquee";
import { usePreloader } from "@/context/PreloaderContext";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { isLoaded } = usePreloader();

  // Scoped scroll tracking for the footer viewport entry
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Animation 10: Invert color scheme progressively using soft gray values to shield user eyes
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    ["#0A0A0A", "#1F1F1F", "#808080", "#B5B5B5"]
  );
  
  const primaryTextColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    ["#F5F5F5", "#F5F5F5", "#141414", "#0A0A0A"]
  );

  const secondaryTextColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    ["#6B6B6B", "#888888", "#333333", "#222222"]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    ["#1F1F1F", "#333333", "#8E8E8E", "#9C9C9C"]
  );

  const accentColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    ["#E8FF47", "#E8FF47", "#3E4A00", "#1A0A00"]
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.footer
      id="contact"
      ref={footerRef}
      style={{ backgroundColor, color: primaryTextColor }}
      className="relative w-full min-h-screen flex flex-col justify-between px-6 py-12 md:px-12 md:py-16 select-none overflow-hidden"
    >
      {/* Top Section: Subtitle & CTA */}
      <div className="flex flex-col gap-2 mt-8">
        {isLoaded && (
          <ClipText
            text="SAY HELLO"
            lineClassName="font-display text-xs font-[300] tracking-widest uppercase"
          />
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10 mt-2 self-start">
          {/* Email Copy Interaction */}
          <div className="flex items-center gap-3 group">
            <button
              onClick={handleCopyEmail}
              className="font-mono text-base md:text-lg border-b border-dashed border-current pb-0.5 hover:opacity-80 transition-opacity duration-200 flex items-center gap-2 cursor-none"
              data-cursor="hover"
            >
              {portfolioData.email}
            </button>
            
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current/10 bg-current/5 relative">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="w-3.5 h-3.5 opacity-60" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Micro-toast tooltip */}
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -28, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute px-2 py-1 text-[9px] font-display font-medium tracking-wider uppercase bg-[#111111] text-[#F5F5F5] rounded border border-neutral-800 pointer-events-none whitespace-nowrap"
                  >
                    COPIED
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* WhatsApp Direct Chat */}
          {portfolioData.socials.whatsapp && (
            <motion.a
              href={portfolioData.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor }}
              className="font-mono text-base md:text-lg border-b border-solid border-current pb-0.5 hover:opacity-80 transition-opacity duration-200 flex items-center gap-2 cursor-none"
              data-cursor="hover"
            >
              <MessageCircle className="w-4 h-4 text-current shrink-0" />
              {"LET'S CHAT ON WHATSAPP"}
            </motion.a>
          )}
        </div>
      </div>

      {/* Animation 2: Infinite Marquee Scrolling Rows moving in opposite directions */}
      <div className="w-full flex flex-col my-auto py-8">
        <Marquee speed="25s" direction="left" className="py-4 border-t border-b border-current/10">
          <div className="flex gap-16 font-display font-black text-6xl md:text-8xl tracking-tighter">
            <span>FORGE</span>
            <span>DEVELOP</span>
            <span>ENGINEER</span>
            <span>DESIGN</span>
            <span>ANIMATE</span>
          </div>
        </Marquee>
        <Marquee speed="30s" direction="right" className="py-4 border-b border-current/10">
          <div className="flex gap-16 font-display font-black text-6xl md:text-8xl tracking-tighter">
            <span>FLUID</span>
            <span>PREMIUM</span>
            <span>INTENTIONAL</span>
            <span>ACCESSIBLE</span>
            <span>INTERACTIVE</span>
          </div>
        </Marquee>
      </div>

      {/* Middle Section: Massive Typography Headline */}
      <div className="mb-12">
        {isLoaded && (
          <ClipText
            text="LET'S BUILD."
            lineClassName="font-display font-[300] text-[8vw] sm:text-[10vw] md:text-[11vw] lg:text-[12vw] leading-none tracking-tighter uppercase select-none"
          />
        )}
      </div>

      {/* Bottom Bar Section */}
      <motion.div
        style={{ borderColor }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 border-t"
      >
        {/* Left: Copyright */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-display tracking-widest font-[300] uppercase">
            {portfolioData.name}
          </span>
          <motion.span
            style={{ color: secondaryTextColor }}
            className="text-[10px] uppercase font-[300] tracking-wide"
          >
            &copy; {new Date().getFullYear()} — ALL RIGHTS RESERVED
          </motion.span>
        </div>

        {/* Right: Social Links with dynamic accent color underlines */}
        <div className="flex items-center gap-6 md:gap-8 flex-wrap">
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 text-xs md:text-sm font-[300] tracking-wider uppercase transition-colors flex items-center gap-1.5"
            data-cursor="hover"
          >
            <GithubIcon className="w-3.5 h-3.5 shrink-0" />
            <span>GITHUB</span>
            <motion.span
              style={{ backgroundColor: accentColor }}
              className="absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-500 ease-portfolio-ease group-hover:w-full"
            />
          </a>
          <a
            href={portfolioData.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 text-xs md:text-sm font-[300] tracking-wider uppercase transition-colors flex items-center gap-1.5"
            data-cursor="hover"
          >
            <TwitterIcon className="w-3.5 h-3.5 shrink-0" />
            <span>TWITTER</span>
            <motion.span
              style={{ backgroundColor: accentColor }}
              className="absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-500 ease-portfolio-ease group-hover:w-full"
            />
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative py-1 text-xs md:text-sm font-[300] tracking-wider uppercase transition-colors flex items-center gap-1.5"
            data-cursor="hover"
          >
            <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
            <span>LINKEDIN</span>
            <motion.span
              style={{ backgroundColor: accentColor }}
              className="absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-500 ease-portfolio-ease group-hover:w-full"
            />
          </a>
          {portfolioData.socials.whatsapp && (
            <a
              href={portfolioData.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative py-1 text-xs md:text-sm font-[300] tracking-wider uppercase transition-colors flex items-center gap-1.5"
              data-cursor="hover"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WHATSAPP</span>
              <motion.span
                style={{ backgroundColor: accentColor }}
                className="absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-500 ease-portfolio-ease group-hover:w-full"
              />
            </a>
          )}
        </div>
      </motion.div>
    </motion.footer>
  );
}
