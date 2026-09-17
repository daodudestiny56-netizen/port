"use client";

import ProjectCard from "./ProjectCard";
import HangingCard, { AttachmentKind } from "@/components/ui/HangingCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioData, Project } from "@/lib/data";

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

const HANGERS: { attachment: AttachmentKind; color: "blue" | "bone"; tilt: number }[] = [
  { attachment: "pin", color: "blue", tilt: -1.5 },
  { attachment: "clip", color: "bone", tilt: 1.2 },
  { attachment: "tape", color: "blue", tilt: 1 },
  { attachment: "pin", color: "bone", tilt: -1 },
  { attachment: "clip", color: "blue", tilt: -1.4 },
];

export default function Work({ onSelectProject }: WorkProps) {
  const total = portfolioData.projects.length + 1;

  return (
    <section id="work" className="relative w-full px-4 sm:px-6 md:px-10 pt-10 pb-28 bg-[#0D0D0D] text-[#FFFFFF] board-dots-ink">
      <SectionHeading
        index="01"
        kicker="SELECTED WORK"
        title="CASE STUDIES"
        tone="ink"
        aside={
          <>
            {String(total).padStart(2, "0")} BUILDS <span className="text-[#2B4EFF]">·</span> CLICK A CARD FOR THE DEEP DIVE
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20 w-full">
        <HangingCard
          attachment="clips"
          attachmentColor="blue"
          tone="ink"
          swayAngle={0.5}
          swayDuration={7}
          className="md:col-span-2"
        >
          <ProjectCard project={portfolioData.featuredProject} index={0} featured onSelectProject={onSelectProject} />
        </HangingCard>

        {portfolioData.projects.map((project, idx) => {
          const hanger = HANGERS[idx % HANGERS.length];
          return (
            <HangingCard
              key={project.name}
              attachment={hanger.attachment}
              attachmentColor={hanger.color}
              tone="ink"
              tilt={hanger.tilt}
              swayAngle={0.9}
              swayDuration={5 + (idx % 3)}
              delay={0.08 * (idx % 2)}
              className={idx === portfolioData.projects.length - 1 && idx % 2 === 0 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}
            >
              <ProjectCard project={project} index={idx + 1} onSelectProject={onSelectProject} />
            </HangingCard>
          );
        })}
      </div>
    </section>
  );
}
