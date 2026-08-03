"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import TechStack from "./TechStack";
import MicroClock from "./MicroClock";
import ClipText from "@/components/ui/ClipText";
import { usePreloader } from "@/context/PreloaderContext";
import { staggerContainerVariants } from "@/lib/animations";
import { Project } from "@/lib/data";

interface BentoGridProps {
  onSelectProject?: (project: Project) => void;
}

export default function BentoGrid({ onSelectProject }: BentoGridProps) {
  const { isLoaded } = usePreloader();

  return (
    <section id="work" className="w-full px-4 sm:px-6 md:px-12 py-[clamp(2.5rem,5vw,4.5rem)] bg-transparent select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Section Title */}
        <div className="flex flex-col gap-1 mb-2">
          {isLoaded && (
            <>
              <ClipText
                text="SELECTED WORK & INDEX"
                lineClassName="font-mono text-xs font-[300] tracking-widest text-[#3FE8F5] uppercase"
              />
              <ClipText
                text="THE ARCHIVE."
                lineClassName="font-display font-[300] text-[clamp(1.5rem,4vw+0.5rem,2.5rem)] text-primaryText tracking-tight"
                delay={0.08}
              />
            </>
          )}
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView={isLoaded ? "visible" : "hidden"}
          viewport={{ once: false, margin: "-50px" }}
          className="bento-grid w-full"
        >
          <div style={{ gridArea: "featured" }} className="w-full h-full">
            <ProjectCard onSelectProject={onSelectProject} />
          </div>
          
          <div style={{ gridArea: "clock" }} className="w-full h-full">
            <MicroClock />
          </div>
          
          <div style={{ gridArea: "stack" }} className="w-full h-full">
            <TechStack />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
