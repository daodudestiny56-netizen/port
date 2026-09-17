"use client";

import HangingCard, { AttachmentKind } from "@/components/ui/HangingCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollZoomText from "@/components/ui/ScrollZoomText";
import { portfolioData } from "@/lib/data";

const NOTES: { attachment: AttachmentKind; color: "blue" | "bone" | "ink"; tilt: number; card: string }[] = [
  { attachment: "pin", color: "blue", tilt: -2.5, card: "bg-[#FFFFFF] text-[#0D0D0D]" },
  { attachment: "tape", color: "bone", tilt: 2, card: "bg-[#2B4EFF] text-[#FFFFFF]" },
  { attachment: "pin", color: "bone", tilt: -1, card: "bg-[#FFFFFF] text-[#0D0D0D]" },
  { attachment: "tape", color: "blue", tilt: 1.8, card: "bg-[#FFFFFF] text-[#0D0D0D]" },
  { attachment: "pin", color: "blue", tilt: -2, card: "bg-[#FFFFFF] text-[#0D0D0D]" },
  { attachment: "pin", color: "bone", tilt: 2.4, card: "bg-[#2B4EFF] text-[#FFFFFF]" },
];

export default function Principles() {
  return (
    <section id="principles" className="relative w-full pt-16 pb-28 bg-[#0D0D0D] text-[#FFFFFF] board-dots-ink overflow-hidden">
      <ScrollZoomText text="HOW I WORK · HOW I WORK" className="text-outline-bone opacity-40" direction="out" sizeClass="text-[clamp(4rem,17vw,16rem)] tracking-wide" />

      <div className="px-4 sm:px-6 md:px-10 mt-6">
        <SectionHeading
          index="03"
          kicker="HOW I WORK"
          title="ENGINEERING PRINCIPLES"
          tone="ink"
          aside={<>SIX RULES I DON&apos;T BREAK</>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {portfolioData.principles.map((principle, i) => {
            const note = NOTES[i % NOTES.length];
            const number = String(i + 1).padStart(2, "0");
            return (
              <HangingCard
                key={principle.title}
                attachment={note.attachment}
                attachmentColor={note.color}
                tone="ink"
                tilt={note.tilt}
                swayAngle={1.4}
                swayDuration={4.5 + (i % 3)}
                delay={0.06 * (i % 3)}
              >
                <div className={`relative h-full min-h-[260px] border-3 border-[#0D0D0D] shadow-[8px_8px_0_#FFFFFF] p-6 flex flex-col ${note.card}`}>
                  <span
                    aria-hidden="true"
                    className={`font-display font-extrabold text-7xl leading-none ${
                      note.card.includes("2B4EFF") ? "text-outline-bone" : "text-outline-blue"
                    }`}
                  >
                    {number}
                  </span>
                  <h3 className="mt-4 font-display font-extrabold text-2xl uppercase leading-none tracking-tight">{principle.title}</h3>
                  <p className="mt-3 font-sans text-sm sm:text-base font-medium leading-relaxed opacity-90">{principle.body}</p>
                  {/* Folded corner */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-[#0D0D0D]"
                    style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                  />
                </div>
              </HangingCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
