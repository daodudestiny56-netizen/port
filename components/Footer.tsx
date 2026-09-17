"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MessageCircle, Send } from "lucide-react";
import { portfolioData } from "@/lib/data";
import HangingCard from "@/components/ui/HangingCard";
import ScrollZoomText from "@/components/ui/ScrollZoomText";

const BrutalistScene = dynamic(() => import("@/components/three/BrutalistScene"), { ssr: false });

const GithubIcon = () => (
  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon = () => <Mail className="w-5 h-5 shrink-0" />;
const WhatsappIcon = () => <MessageCircle className="w-5 h-5 shrink-0" />;

type Status = "idle" | "sending" | "sent" | "fallback";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const hudRef = useRef<HTMLSpanElement>(null);

  const mailtoHref = `mailto:${portfolioData.email}?subject=${encodeURIComponent(`Portfolio Inquiry from ${email}`)}&body=${encodeURIComponent(message)}`;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message || message.trim().length < 5) {
      setError("Please write a message with at least 5 characters.");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c381c850-8433-4f9e-a89c-e740d9cb5ed9",
          email,
          message,
          subject: `Portfolio Inquiry from ${email}`,
          to_email: portfolioData.email,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
        setMessage("");
      }, 5000);
    } catch {
      // Delivery failed — hand off to the visitor's mail client instead of claiming success.
      setStatus("fallback");
      window.location.href = mailtoHref;
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${portfolioData.email}`;
    }
  };

  const channels = [
    { name: "GITHUB", handle: "daodudestiny56-netizen", href: portfolioData.socials.github, icon: GithubIcon },
    { name: "LINKEDIN", handle: "daodu-destiny", href: portfolioData.socials.linkedin, icon: LinkedinIcon },
    { name: "X / TWITTER", handle: "@DaYouNGdeboss", href: portfolioData.socials.twitter, icon: XIcon },
    ...(portfolioData.socials.whatsapp
      ? [{ name: "WHATSAPP", handle: "Direct message", href: portfolioData.socials.whatsapp, icon: WhatsappIcon }]
      : []),
    { name: "EMAIL", handle: portfolioData.email, href: `mailto:${portfolioData.email}`, icon: MailIcon },
  ];

  return (
    <footer id="contact" className="relative w-full bg-ink text-bone board-dots-ink overflow-hidden">
      <div className="pt-16">
        <ScrollZoomText text="LET'S BUILD" direction="in" className="text-bone" />
        <ScrollZoomText text="SOMETHING THAT LASTS" direction="in" className="text-outline-accent-light" sizeClass="text-[clamp(2.2rem,8vw,7.5rem)] tracking-wider" />
      </div>

      <div className="px-4 sm:px-6 md:px-10 pt-16 pb-10">
        <div className="flex flex-wrap items-center gap-3 mb-16 font-mono text-xs font-extrabold uppercase tracking-widest">
          <span className="px-2 py-1 bg-accent border-2 border-bone">05</span>
          <span className="h-[3px] w-10 bg-bone" />
          <span>CONTACT</span>
          <span className="ml-auto px-3 py-1.5 bg-bone text-ink border-3 border-bone shadow-brutalist-accent">
            I USUALLY REPLY WITHIN <span className="text-accent">24 HOURS</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Form, clipped to the board */}
          <div className="lg:col-span-7">
            <HangingCard attachment="clips" attachmentColor="accent" tone="ink" tilt={-0.6} swayAngle={0.5} swayDuration={7}>
              <div className="bg-bone text-ink border-3 border-ink shadow-[12px_12px_0_rgb(var(--accent))] p-6 sm:p-10">
                <div className="flex items-center justify-between pb-3 mb-6 border-b-3 border-ink font-mono text-xs font-extrabold uppercase tracking-widest">
                  <span>NEW MESSAGE</span>
                  <span className="text-accent">TO: {portfolioData.email}</span>
                </div>

                <h3 className="font-display font-extrabold text-3xl sm:text-5xl uppercase leading-[0.9] tracking-tight mb-8">
                  Have a role or a project in mind?
                </h3>

                <form onSubmit={handleSend} className="flex flex-col gap-5" noValidate>
                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-[11px] font-extrabold uppercase mb-1.5">
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3.5 bg-bone border-3 border-ink font-mono text-sm font-bold text-ink placeholder:text-ink/40 focus:bg-ink focus:text-bone focus:shadow-brutalist-accent focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-[11px] font-extrabold uppercase mb-1.5">
                      Role, project or idea
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Destiny, we're hiring for..."
                      className="w-full px-4 py-3.5 bg-bone border-3 border-ink font-mono text-sm font-bold text-ink placeholder:text-ink/40 focus:bg-ink focus:text-bone focus:shadow-brutalist-accent focus:outline-none transition-all resize-y"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="font-mono text-xs font-bold text-bone bg-danger p-2.5 border-3 border-ink">
                      {error}
                    </p>
                  )}

                  {status === "sent" ? (
                    <p role="status" className="p-4 bg-accent text-bone border-3 border-ink font-mono text-xs font-extrabold uppercase flex items-center gap-2">
                      <Check className="w-5 h-5 stroke-[3]" /> Message delivered. I&apos;ll be in touch soon.
                    </p>
                  ) : status === "fallback" ? (
                    <p role="status" className="p-4 bg-ink text-bone border-3 border-ink font-mono text-xs font-bold uppercase leading-relaxed">
                      Couldn&apos;t send from here — your email app should open with the message ready.{" "}
                      <a href={mailtoHref} className="text-accent-light underline">
                        Open it manually
                      </a>
                    </p>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ x: -3, y: -3 }}
                      whileTap={{ scale: 0.97, x: 3, y: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="min-h-[56px] px-6 bg-ink text-bone border-3 border-ink shadow-brutalist-accent-lg font-mono text-sm font-extrabold uppercase flex items-center justify-center gap-3 disabled:opacity-70"
                      data-cursor="hover"
                    >
                      {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
                      <Send className="w-5 h-5 stroke-[3] text-accent-light" />
                    </motion.button>
                  )}
                </form>
              </div>
            </HangingCard>
          </div>

          {/* Channels + 3D knot */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative border-3 border-bone bg-ink">
              <div className="flex items-center justify-between px-3 py-2 bg-bone text-ink font-mono text-[10px] font-extrabold uppercase">
                <span>
                  knot.tsx <span className="text-accent">— drag me</span>
                </span>
                <span ref={hudRef} className="tabular-nums opacity-60">-- FPS</span>
              </div>
              <div className="relative h-56 sm:h-64">
                <BrutalistScene variant="knot" hudRef={hudRef} />
              </div>
            </div>

            <button
              onClick={copyEmail}
              className="group flex items-center justify-between gap-3 px-4 py-4 bg-accent text-bone border-3 border-bone shadow-[6px_6px_0_rgb(var(--bone))] hover:shadow-[10px_10px_0_rgb(var(--bone))] hover:-translate-x-1 hover:-translate-y-1 transition-all text-left"
              data-cursor="hover"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[10px] font-extrabold uppercase tracking-widest">{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
                <span className="block font-display font-extrabold text-lg sm:text-2xl truncate">{portfolioData.email}</span>
              </span>
              {copied ? <Check className="w-6 h-6 stroke-[3] shrink-0" /> : <Copy className="w-6 h-6 stroke-[3] shrink-0" />}
            </button>

            <ul className="border-3 border-bone">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.name} className="border-b-3 last:border-b-0 border-bone">
                    <a
                      href={c.href}
                      target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-4 px-4 py-4 overflow-hidden"
                      data-cursor="hover"
                    >
                      <span className="absolute inset-0 bg-bone origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                      <span className="relative flex items-center gap-4 min-w-0 flex-1 group-hover:text-ink transition-colors">
                        <Icon />
                        <span className="min-w-0">
                          <span className="block font-display font-extrabold text-lg uppercase leading-none">{c.name}</span>
                          <span className="block font-mono text-[11px] font-bold opacity-70 truncate">{c.handle}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="relative w-6 h-6 stroke-[3] text-accent-light group-hover:text-accent group-hover:rotate-45 transition-transform" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-6 border-t-4 border-bone flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[11px] sm:text-xs font-bold uppercase">
          <span>© {new Date().getFullYear()} Daodu Destiny Oluwatobiloba</span>
          <span className="opacity-70">Built with Next.js, Three.js &amp; Framer Motion</span>
          <a
            href="#hero"
            className="flex items-center gap-2 px-3 py-2 bg-bone text-ink border-3 border-bone hover:bg-accent hover:text-bone transition-colors"
            data-cursor="hover"
          >
            BACK TO TOP <ArrowUp className="w-4 h-4 stroke-[3]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
