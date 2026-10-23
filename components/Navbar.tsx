"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Section anchors live on the home page; hackathons is its own route. */
const LINKS = [
  { id: "work", label: "work", href: "/#work" },
  { id: "hackathons", label: "hackathons", href: "/hackathons" },
  { id: "stack", label: "stack", href: "/#stack" },
  { id: "about", label: "about", href: "/#about" },
  { id: "contact", label: "contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const onHackathons = pathname === "/hackathons";
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...LINKS.map((l) => l.id), "approach"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav aria-label="Primary" className="panel panel-glass mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full px-3 py-2">
        <a href="/" className="rounded-full px-2 py-1 text-[13px] text-dim transition-colors hover:text-fg">
          daodu<span className="text-muted">.dev</span>
        </a>

        <ul className="hidden items-center gap-0.5 sm:flex">
          {LINKS.map((link) => {
            const isActive = onHackathons ? link.id === "hackathons" : active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] transition-colors",
                    isActive ? "text-accent" : "text-dim hover:text-fg"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("transition-opacity", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40")}
                  >
                    [
                  </span>
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn("transition-opacity", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40")}
                  >
                    ]
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-full border border-line/15 px-3 py-1.5 text-[13px] text-dim transition-colors hover:text-fg sm:hidden"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="panel panel-glass mx-auto mt-2 max-w-3xl overflow-hidden rounded-xl p-1.5 sm:hidden"
          >
            <ul>
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-dim transition-colors hover:bg-line/5 hover:text-fg"
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
