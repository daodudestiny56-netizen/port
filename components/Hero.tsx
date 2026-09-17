"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Move3d } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { usePreloader } from "@/context/PreloaderContext";
import HangingCard from "@/components/ui/HangingCard";
import IdBadge from "@/components/IdBadge";

const BrutalistScene = dynamic(() => import("@/components/three/BrutalistScene"), { ssr: false });

const HEADLINE: { word: string; accent?: boolean }[] = [
  { word: "ENGINEERING" },
  { word: "SOFTWARE", accent: true },
  { word: "THAT" },
  { word: "SCALES," },
  { word: "SHIPS" },
  { word: "&" },
  { word: "LASTS." },
];

function RotatingSticker() {
  const text = "OPEN TO ROLES • REMOTE FRIENDLY • ";
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="sticker-circle" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="fill-accent stroke-ink" strokeWidth="4" />
        <text fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="19" className="fill-bone" letterSpacing="2">
          <textPath href="#sticker-circle">{text + text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid place-items-center w-12 h-12 bg-bone border-3 border-ink font-display font-extrabold text-lg text-ink">
          {portfolioData.stats[0].value}Y
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { isLoaded } = usePreloader();
  const sectionRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const state = isLoaded ? "show" : "hidden";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-bone text-ink board-grid-bone"
    >
      <motion.div
        style={{ scale: contentScale, y: contentY }}
        className="relative flex flex-col min-h-[100svh] px-4 sm:px-6 md:px-10 pt-28 sm:pt-32 pb-6 origin-top"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center my-auto w-full">
          {/* Left: headline */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 min-w-0">
            <motion.div
              initial="hidden"
              animate={state}
              variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs font-extrabold uppercase"
            >
              <span className="px-2.5 py-1.5 bg-ink text-bone border-3 border-ink">
                SOFTWARE ENGINEER
              </span>
              <span className="px-2.5 py-1.5 bg-bone border-3 border-ink shadow-brutalist-sm">
                <span className="text-accent">{portfolioData.stats[0].value}+ YRS</span> SHIPPING PRODUCTION CODE
              </span>
            </motion.div>

            <h1 className="font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[clamp(2.7rem,7.4vw,7rem)]">
              {HEADLINE.map(({ word, accent }, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.2em] pb-[0.06em] pt-[0.04em]">
                  <motion.span
                    className={`inline-block ${
                      accent ? "bg-accent text-bone px-[0.12em] border-[0.05em] border-ink shadow-[0.07em_0.07em_0_rgb(var(--ink))]" : ""
                    } ${word === "&" ? "text-outline-ink" : ""}`}
                    initial="hidden"
                    animate={state}
                    variants={{
                      hidden: { y: "110%", rotate: 6, scale: 1.3 },
                      show: { y: "0%", rotate: accent ? -2 : 0, scale: 1 },
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.07 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial="hidden"
              animate={state}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl font-sans text-base sm:text-lg font-medium leading-relaxed border-l-[6px] border-accent pl-4"
            >
              {`I'm Daodu Destiny — a software engineer with ${portfolioData.stats[0].value} years building production web applications, APIs and real-time interfaces. I design architecture that stays clean, fast and easy to change long after launch.`}
            </motion.p>

            <motion.div
              initial="hidden"
              animate={state}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 pt-2"
            >
              <motion.a
                href="#work"
                whileHover={{ x: -3, y: -3 }}
                whileTap={{ scale: 0.96, x: 3, y: 3 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="min-h-[52px] px-6 bg-ink text-bone font-mono text-sm font-extrabold uppercase border-3 border-ink shadow-brutalist-accent-lg flex items-center justify-center gap-3"
                data-cursor="hover"
              >
                VIEW CASE STUDIES
                <ArrowDownRight className="w-5 h-5 stroke-[3] text-accent-light" />
              </motion.a>
              <motion.a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: -3, y: -3 }}
                whileTap={{ scale: 0.96, x: 3, y: 3 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="min-h-[52px] px-6 bg-bone text-ink font-mono text-sm font-extrabold uppercase border-3 border-ink shadow-brutalist-lg flex items-center justify-center gap-3"
                data-cursor="hover"
              >
                GITHUB
                <ArrowUpRight className="w-5 h-5 stroke-[3] text-accent" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right: three.js window with the pinned ID badge */}
          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0, scale: 0.6, rotate: 8 }, show: { opacity: 1, scale: 1, rotate: 0 } }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.55 }}
            className="lg:col-span-5 relative w-full max-w-[560px] mx-auto lg:mr-0"
          >
            <div className="absolute -bottom-12 -right-3 sm:-right-8 z-20">
              <RotatingSticker />
            </div>

            <div className="relative bg-bone border-3 border-ink shadow-brutalist-lg">
              <div className="flex items-center justify-between gap-2 px-3 py-2 bg-ink text-bone font-mono text-[10px] sm:text-[11px] font-extrabold uppercase">
                <span className="flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-2.5 h-2.5 bg-accent" />
                    <span className="w-2.5 h-2.5 bg-bone" />
                    <span className="w-2.5 h-2.5 border border-bone" />
                  </span>
                  scene.tsx <span className="text-accent-light">— three.js</span>
                </span>
                <span ref={hudRef} className="tabular-nums text-bone/70">-- FPS</span>
              </div>
              <div className="relative h-[360px] sm:h-[440px] lg:h-[480px] overflow-hidden">
                <motion.div style={{ scale: sceneScale }} className="absolute inset-0 origin-center">
                  <BrutalistScene variant="hero" hudRef={hudRef} />
                </motion.div>
                {/* Corner registration marks */}
                {["top-2 left-2 border-t-3 border-l-3", "top-2 right-2 border-t-3 border-r-3", "bottom-2 left-2 border-b-3 border-l-3", "bottom-2 right-2 border-b-3 border-r-3"].map((c) => (
                  <span key={c} aria-hidden="true" className={`pointer-events-none absolute w-4 h-4 border-accent ${c}`} />
                ))}
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t-3 border-ink font-mono text-[10px] sm:text-[11px] font-extrabold uppercase">
                <span className="hidden sm:inline text-accent">WEBGL</span>
                <span className="flex items-center gap-1.5 ml-auto pr-24 sm:pr-28">
                  <Move3d className="w-4 h-4 text-accent" /> DRAG TO SPIN
                </span>
              </div>
            </div>

            {/* Pinned access badge */}
            <div className="relative -mt-24 ml-auto mr-2 w-fit lg:absolute lg:mt-0 lg:-left-12 lg:top-[50%] lg:mr-0 z-10">
              <HangingCard attachment="clip" attachmentColor="accent" tilt={-4} swayAngle={2.2} swayDuration={4.5} delay={0.2}>
                <IdBadge />
              </HangingCard>
            </div>
          </motion.div>
        </div>

        {/* Spec bar */}
        <motion.dl
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 border-3 border-ink bg-bone font-mono text-[10px] sm:text-xs font-extrabold uppercase shadow-brutalist"
        >
          {[
            { k: "EXPERIENCE", v: `${String(portfolioData.stats[0].value).padStart(2, "0")} YEARS` },
            { k: "FOCUS", v: "FULL-STACK WEB" },
            { k: "CORE STACK", v: "TS / REACT / NODE" },
            { k: "STATUS", v: "OPEN TO ROLES" },
          ].map((item, i) => (
            <div
              key={item.k}
              className={`px-3 sm:px-4 py-3 ${i % 2 === 0 ? "border-r-3" : "md:border-r-3"} ${i < 2 ? "border-b-3 md:border-b-0" : ""} last:border-r-0 border-ink ${
                i === 3 ? "bg-ink text-bone" : ""
              }`}
            >
              <dt className="opacity-60">{item.k}</dt>
              <dd className={`mt-0.5 ${i === 3 ? "text-accent-light" : ""}`}>{item.v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
