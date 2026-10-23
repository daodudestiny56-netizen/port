"use client";

import { useState } from "react";
import { portfolioData } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import { TerminalPanel } from "@/components/ui/Terminal";

type Status = "idle" | "sending" | "sent" | "fallback";

const CHANNELS = [
  { name: "github", handle: "daodudestiny56-netizen", href: portfolioData.socials.github },
  { name: "linkedin", handle: "daodu-destiny", href: portfolioData.socials.linkedin },
  { name: "x", handle: "@DaYouNGdeboss", href: portfolioData.socials.twitter },
  ...(portfolioData.socials.whatsapp ? [{ name: "whatsapp", handle: "direct message", href: portfolioData.socials.whatsapp }] : []),
];

const fieldClass =
  "w-full rounded-lg border border-line/12 bg-page/40 px-3.5 py-3 font-mono text-sm text-fg placeholder:text-muted transition-colors focus:border-accent/40 focus:outline-none";

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
      setError("That email address looks incomplete.");
      return;
    }
    if (!message || message.trim().length < 5) {
      setError("Add a line or two about what you need.");
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
      }, 6000);
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

  return (
    <footer id="contact" className="border-t border-line/10 bg-surface">
      <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          command="mail --to destiny"
          title="Start a conversation"
          description="Open to software engineering roles and remote-friendly teams. I reply within a day."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <TerminalPanel label="~/message.txt" status={status === "sending" ? "sending" : "draft"} bodyClassName="p-5 sm:p-6">
            <form onSubmit={handleSend} className="space-y-5" noValidate>
              <div>
                <label htmlFor="contact-email" className="mb-2 block font-mono text-xs text-muted">
                  from
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
                <label htmlFor="contact-message" className="mb-2 block font-mono text-xs text-muted">
                  message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Destiny — we're hiring for..."
                  className={`${fieldClass} resize-y leading-relaxed`}
                />
              </div>

              {error && (
                <p role="alert" className="font-mono text-xs text-danger">
                  {error}
                </p>
              )}

              {status === "sent" ? (
                <p role="status" className="font-mono text-sm text-accent">
                  Sent. I&apos;ll be in touch shortly.
                </p>
              ) : status === "fallback" ? (
                <p role="status" className="font-mono text-xs leading-relaxed text-dim">
                  That didn&apos;t send from here — your mail app should open with the message ready.{" "}
                  <a href={mailtoHref} className="text-accent underline underline-offset-2">
                    Open it manually
                  </a>
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
                >
                  {status === "sending" ? "sending…" : "send message"}
                </button>
              )}
            </form>
          </TerminalPanel>

          <div>
            <button
              onClick={copyEmail}
              className="group w-full rounded-lg border border-line/12 px-4 py-3.5 text-left transition-colors hover:border-line/25"
            >
              <span className="block font-mono text-xs text-muted">{copied ? "copied" : "email"}</span>
              <span className="mt-1 block truncate font-mono text-sm text-fg group-hover:text-accent">{portfolioData.email}</span>
            </button>

            <ul className="mt-6 border-t border-line/10">
              {CHANNELS.map((channel) => (
                <li key={channel.name}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-4 border-b border-line/10 py-3.5 font-mono text-sm text-dim transition-colors hover:text-accent"
                  >
                    <span>{channel.name}</span>
                    <span className="truncate text-xs text-muted">{channel.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-20 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {portfolioData.name} — built with Next.js, Three.js and Framer Motion
        </p>
      </div>
    </footer>
  );
}
