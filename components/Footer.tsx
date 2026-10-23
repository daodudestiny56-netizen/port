"use client";

import { portfolioData } from "@/lib/data";
import { Block, Command, Line } from "@/components/ui/Transcript";

const CHANNELS: [string, string, string][] = [
  ["email", `mailto:${portfolioData.email}`, portfolioData.email],
  ["github", portfolioData.socials.github, "daodudestiny56-netizen"],
  ["linkedin", portfolioData.socials.linkedin, "daodu-destiny"],
  ["x", portfolioData.socials.twitter, "@DaYouNGdeboss"],
  ...(portfolioData.socials.whatsapp ? ([["whatsapp", portfolioData.socials.whatsapp, "direct message"]] as [string, string, string][]) : []),
];

export default function Footer() {
  return (
    <footer id="contact" className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <Block className="space-y-4">
        <Command text="contact --all" />

        <Line className="max-w-xl pt-2 text-[17px] leading-relaxed text-dim">
          Open to software engineering roles and remote-friendly teams. I reply within a day.
        </Line>

        <Line as="div" className="pt-4">
          <ul className="divide-y divide-line/10 border-y border-line/10">
            {CHANNELS.map(([name, href, handle]) => (
              <li key={name}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-accent"
                >
                  <span className="text-[17px]">{name}</span>
                  <span className="truncate text-[15px] text-muted transition-colors group-hover:text-accent">{handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </Line>

        <Line className="pt-10 text-sm text-muted">
          © {new Date().getFullYear()} {portfolioData.name} — session closed.
        </Line>
      </Block>
    </footer>
  );
}
