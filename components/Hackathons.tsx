"use client";

import { portfolioData } from "@/lib/data";
import { Block, Command, Divider, Line } from "@/components/ui/Transcript";

export default function Hackathons() {
  const { hackathons } = portfolioData;

  return (
    <section id="hackathons" className="mx-auto w-full max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
      <Block className="space-y-4">
        <Line className="text-sm text-muted">guest@daodu — ~/hackathons</Line>

        <Command text="cat hackathons.md" />

        <Line className="pt-2 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[3rem]" as="div">
          Hackathons
        </Line>

        <Line className="max-w-xl text-[17px] leading-relaxed text-dim">
          {hackathons.length} events, each one a build under a deadline. Every entry below links to the code, and to the
          deployed app where there is one.
        </Line>
      </Block>

      <div className="mt-14 space-y-12">
        {hackathons.map((hackathon, idx) => (
          <div key={hackathon.event + hackathon.project} className="space-y-12">
            <Block className="space-y-4">
              <Line as="div" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{hackathon.event}</h2>
                {hackathon.date && <span className="text-sm text-muted">{hackathon.date}</span>}
              </Line>

              <Line as="div" className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span className="text-accent">{hackathon.project}</span>
                {hackathon.track && <span className="text-muted">{hackathon.track} track</span>}
              </Line>

              <Line className="max-w-2xl text-[17px] leading-relaxed text-dim">{hackathon.summary}</Line>

              <Line as="div" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                {hackathon.liveUrl && (
                  <a
                    href={hackathon.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    open live site
                  </a>
                )}
                <a
                  href={hackathon.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim underline decoration-line/20 underline-offset-4 transition-colors hover:text-fg"
                >
                  source
                </a>
              </Line>
            </Block>

            {idx < hackathons.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      <Block className="mt-16 space-y-3">
        <Command text="cd .." />
        <Line as="div">
          <a
            href="/"
            className="text-[15px] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            back to the portfolio
          </a>
        </Line>
      </Block>
    </section>
  );
}
