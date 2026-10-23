"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "principles", label: "Principles" },
  { id: "about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...LINKS.map((l) => l.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-ink/10 bg-card/85 px-3 py-2 shadow-soft backdrop-blur-md"
      >
        <a href="#hero" className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[11px] font-semibold text-bone">DD</span>
          <span className="text-sm font-medium tracking-tight">Daodu Destiny</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? "bg-ink/5 text-ink" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-bone transition-colors hover:bg-accent sm:block"
          >
            Get in touch
          </a>
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-ink/10 bg-card p-2 shadow-soft md:hidden"
          >
            <ul className="flex flex-col">
              {[...LINKS, { id: "contact", label: "Contact" }].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
