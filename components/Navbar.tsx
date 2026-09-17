"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { usePreloader } from "@/context/PreloaderContext";

const LINKS = [
  { id: "work", label: "WORK", index: "01" },
  { id: "toolkit", label: "TOOLKIT", index: "02" },
  { id: "principles", label: "PRINCIPLES", index: "03" },
  { id: "about", label: "ABOUT", index: "04" },
  { id: "contact", label: "CONTACT", index: "05" },
];

export default function Navbar() {
  const { isLoaded } = usePreloader();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const goingDown = y > lastY.current;
    setHidden(goingDown && y > 480);
    lastY.current = y;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: "-160%" }}
        animate={{ y: isLoaded && !(hidden && !isOpen) ? "0%" : "-160%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28, delay: isLoaded && lastY.current === 0 ? 0.6 : 0 }}
        className="fixed top-3 inset-x-3 sm:top-4 sm:inset-x-6 z-[1000]"
      >
        <nav
          aria-label="Primary"
          className="relative flex items-center justify-between gap-3 bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#0D0D0D] shadow-brutalist pl-2 pr-2 py-2"
        >
          <a href="#hero" className="flex items-center gap-2.5 min-w-0" data-cursor="hover">
            <span className="grid place-items-center w-10 h-10 shrink-0 bg-[#2B4EFF] text-[#FFFFFF] border-3 border-[#0D0D0D] font-display font-extrabold text-sm">
              DD
            </span>
            <span className="hidden sm:flex flex-col leading-none min-w-0">
              <span className="font-display font-extrabold text-sm uppercase tracking-tight truncate">Daodu Destiny</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#2B4EFF]">Software Engineer</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-extrabold uppercase tracking-wider border-2 transition-colors duration-150 ${
                      isActive
                        ? "bg-[#0D0D0D] text-[#FFFFFF] border-[#0D0D0D]"
                        : "border-transparent hover:border-[#0D0D0D] hover:bg-[#2B4EFF] hover:text-[#FFFFFF]"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                    data-cursor="hover"
                  >
                    <span className={isActive ? "text-[#2B4EFF]" : "opacity-50"}>{link.index}</span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden md:flex items-center gap-2 px-3 py-2 border-2 border-[#0D0D0D] font-mono text-[11px] font-extrabold uppercase">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 bg-[#2B4EFF] animate-ping" />
                <span className="relative w-2.5 h-2.5 bg-[#2B4EFF] border border-[#0D0D0D]" />
              </span>
              AVAILABLE
            </span>
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] font-mono text-xs font-extrabold uppercase hover:bg-[#2B4EFF] transition-colors"
              data-cursor="hover"
            >
              HIRE ME <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </a>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-11 h-11 border-3 border-[#0D0D0D] bg-[#0D0D0D] text-[#FFFFFF] active:scale-95 transition-transform"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              data-cursor="hover"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>

          {/* Scroll progress rail */}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute left-0 right-0 -bottom-[3px] h-[5px] bg-[#2B4EFF] origin-left"
          />
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] bg-[#0D0D0D] text-[#FFFFFF] board-dots-ink flex flex-col justify-end p-5 pb-8 lg:hidden"
          >
            <ul className="flex flex-col gap-3">
              {LINKS.map((link, idx) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 40, rotate: 4 }}
                  animate={{ opacity: 1, x: 0, rotate: idx % 2 ? 1 : -1 }}
                  transition={{ delay: 0.15 + idx * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 border-3 font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight ${
                      idx % 2 ? "bg-[#FFFFFF] text-[#0D0D0D] border-[#0D0D0D] shadow-brutalist-blueprint" : "bg-[#0D0D0D] text-[#FFFFFF] border-[#FFFFFF] shadow-brutalist-blueprint"
                    }`}
                  >
                    <span>
                      <span className="font-mono text-sm text-[#2B4EFF] mr-3 align-middle">{link.index}</span>
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-7 h-7 stroke-[3] text-[#2B4EFF]" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 pt-4 border-t-3 border-[#FFFFFF] font-mono text-xs font-bold uppercase break-all">
              {portfolioData.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
