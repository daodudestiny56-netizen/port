"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { portfolioData } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "fallback";

const CHANNELS = [
  { name: "GitHub", handle: "daodudestiny56-netizen", href: portfolioData.socials.github },
  { name: "LinkedIn", handle: "daodu-destiny", href: portfolioData.socials.linkedin },
  { name: "X / Twitter", handle: "@DaYouNGdeboss", href: portfolioData.socials.twitter },
  ...(portfolioData.socials.whatsapp ? [{ name: "WhatsApp", handle: "Direct message", href: portfolioData.socials.whatsapp }] : []),
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:${portfolioData.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${email}`)}&body=${encodeURIComponent(message)}`;

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
          subject: `Portfolio enquiry from ${email}`,
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

  const fieldClass =
    "w-full rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-3.5 text-sm text-bone placeholder:text-bone/35 transition-colors focus:border-bone/40 focus:outline-none";

  return (
    <footer id="contact" className="bg-ink text-bone">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/45">05 — Contact</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                Let&apos;s build something that lasts.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-bone/60">
                Open to software engineering roles and remote-friendly teams. I usually reply within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <button
                onClick={copyEmail}
                className="group mt-9 flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-bone/15 px-4 py-4 text-left transition-colors hover:border-bone/40"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-bone/40">
                    {copied ? "Copied to clipboard" : "Email"}
                  </span>
                  <span className="mt-1 block truncate text-base font-medium">{portfolioData.email}</span>
                </span>
                {copied ? <Check className="h-5 w-5 shrink-0 text-accent-light" /> : <Copy className="h-5 w-5 shrink-0 text-bone/40" />}
              </button>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 max-w-md border-t border-bone/10">
                {CHANNELS.map((channel) => (
                  <li key={channel.name} className="border-b border-bone/10">
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent-light"
                    >
                      <span className="text-base font-medium">{channel.name}</span>
                      <span className="flex items-center gap-2 text-sm text-bone/45">
                        {channel.handle}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-6">
            <form onSubmit={handleSend} className="rounded-2xl border border-bone/12 bg-bone/[0.03] p-6 sm:p-8" noValidate>
              <h3 className="font-display text-lg font-semibold tracking-tight">Send a message</h3>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-bone/45">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-bone/45">
                    Role, project or idea
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Destiny, we're hiring for..."
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                {error && (
                  <p role="alert" className="rounded-xl bg-danger/15 px-4 py-3 text-sm text-danger">
                    {error}
                  </p>
                )}

                {status === "sent" ? (
                  <p role="status" className="flex items-center gap-2 rounded-xl border border-bone/15 px-4 py-3.5 text-sm">
                    <Check className="h-4 w-4 text-accent-light" /> Message sent — I&apos;ll be in touch soon.
                  </p>
                ) : status === "fallback" ? (
                  <p role="status" className="rounded-xl border border-bone/15 px-4 py-3.5 text-sm leading-relaxed text-bone/70">
                    Couldn&apos;t send from here — your email app should open with the message ready.{" "}
                    <a href={mailtoHref} className="text-accent-light underline">
                      Open it manually
                    </a>
                  </p>
                ) : (
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-bone px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-light disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                )}
              </div>
            </form>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-bone/10 pt-8 text-sm text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Daodu Destiny Oluwatobiloba</span>
          <span>Built with Next.js, Three.js and Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
