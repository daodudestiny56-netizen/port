"use client";

import EncryptedText from "./encrypted-text";
import { Prompt } from "./Terminal";

interface SectionHeadingProps {
  /** The terminal command that stands in for a section label. */
  command: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ command, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-xl">
      <Prompt>{command}</Prompt>
      <h2 className="mt-5 text-[1.75rem] font-medium leading-tight tracking-[-0.02em] sm:text-4xl">
        <EncryptedText text={title} revealDelayMs={38} />
      </h2>
      {description && <p className="mt-4 text-[15px] leading-relaxed text-dim sm:text-base">{description}</p>}
    </div>
  );
}
