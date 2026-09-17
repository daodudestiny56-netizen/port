"use client";

import Image from "next/image";
import { portfolioData } from "@/lib/data";

// Deterministic barcode widths so server and client render the same bars.
const BARS = Array.from({ length: 34 }, (_, i) => ((i * 7919) % 5) + 1);

export default function IdBadge() {
  const years = portfolioData.stats.find((s) => s.label.includes("YEARS"))?.value ?? 3;

  return (
    <div className="relative w-[230px] sm:w-[250px] bg-[#FFFFFF] text-[#0D0D0D] border-3 border-[#0D0D0D] shadow-brutalist-blueprint-lg group">
      {/* Lanyard slot */}
      <div className="flex justify-center pt-3 pb-2 bg-[#0D0D0D]">
        <span className="w-14 h-3 bg-[#FFFFFF] border-2 border-[#FFFFFF]" />
      </div>
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0D0D0D] text-[#FFFFFF] font-mono text-[10px] font-extrabold uppercase tracking-widest">
        <span>ACCESS PASS</span>
        <span className="text-[#2B4EFF]">ENG-{String(years).padStart(2, "0")}</span>
      </div>

      <div className="relative m-3 aspect-[4/5] border-3 border-[#0D0D0D] overflow-hidden bg-[#161616]">
        <Image
          src="/images/portrait.jpg"
          alt={`${portfolioData.name}, software engineer`}
          fill
          sizes="250px"
          priority
          className="object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#2B4EFF] text-[#FFFFFF] border-2 border-[#0D0D0D] font-mono text-[9px] font-extrabold uppercase">
          VERIFIED
        </span>
      </div>

      <div className="px-3 pb-3">
        <p className="font-display font-extrabold text-lg uppercase leading-none tracking-tight">Daodu Destiny</p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider mt-1">
          Software Engineer <span className="text-[#2B4EFF]">·</span> {years} YRS
        </p>
        <div className="mt-3 pt-2 border-t-2 border-[#0D0D0D] flex items-end justify-between gap-2">
          <svg aria-hidden="true" viewBox="0 0 120 28" className="h-7 w-28">
            {BARS.reduce<{ x: number; els: JSX.Element[] }>(
              (acc, w, i) => {
                if (i % 2 === 0) acc.els.push(<rect key={i} x={acc.x} y="0" width={w} height="28" fill="#0D0D0D" />);
                acc.x += w + 0.6;
                return acc;
              },
              { x: 0, els: [] }
            ).els}
          </svg>
          <span className="font-mono text-[9px] font-extrabold uppercase text-right leading-tight">
            REMOTE
            <br />
            <span className="text-[#2B4EFF]">OPEN</span>
          </span>
        </div>
      </div>
    </div>
  );
}
