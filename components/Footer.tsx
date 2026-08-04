"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Check } from "lucide-react";
import { portfolioData } from "@/lib/data";

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("PLEASE ENTER A VALID EMAIL ADDRESS.");
      return;
    }
    if (!message || message.trim().length < 5) {
      setError("MESSAGE MUST BE AT LEAST 5 CHARACTERS.");
      return;
    }

    setError("");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail("");
      setMessage("");
    }, 4000);
  };

  const socialChips = [
    { name: "EMAIL", href: `mailto:${portfolioData.email}`, icon: Mail, bg: "bg-[#0D0D0D]", text: "text-[#FFFFFF]" },
    { name: "GITHUB", href: portfolioData.socials.github, icon: GithubIcon, bg: "bg-[#FFFFFF]", text: "text-[#0D0D0D]" },
    { name: "LINKEDIN", href: portfolioData.socials.linkedin, icon: LinkedinIcon, bg: "bg-[#0D0D0D]", text: "text-[#FFFFFF]" },
    { name: "TWITTER", href: portfolioData.socials.twitter, icon: TwitterIcon, bg: "bg-[#FFFFFF]", text: "text-[#0D0D0D]" },
    { name: "WHATSAPP", href: portfolioData.socials.whatsapp || "#", icon: MessageCircle, bg: "bg-[#0D0D0D]", text: "text-[#FFFFFF]" },
  ];

  return (
    <footer id="contact" className="w-full px-4 sm:px-6 md:px-10 py-16 bg-[#FFFFFF] text-[#0D0D0D]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 pb-4 border-b-4 border-[#0D0D0D]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] text-xs font-mono font-bold uppercase shadow-brutalist-sm mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT CONTACT // NO INTERMEDIARIES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#0D0D0D]">
            INITIATE CONTACT
          </h2>
        </div>

        <span className="font-mono text-xs font-bold text-[#FFFFFF] uppercase bg-[#0D0D0D] px-3 py-1 border-2 border-[#0D0D0D]">
          RESPONSE TIME: &lt;24 HOURS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
        {/* Left Column: Direct Stamped Chip Links */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <p className="font-sans text-base font-bold text-[#0D0D0D] leading-relaxed">
            Direct channels for hiring managers, technical recruiters, and team leads. Click any chip below to connect immediately.
          </p>

          {/* Stamped Chip Grid */}
          <div className="flex flex-wrap gap-4">
            {socialChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <motion.a
                  key={chip.name}
                  href={chip.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -2, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`px-5 py-3 border-3 border-[#0D0D0D] shadow-brutalist flex items-center gap-2.5 font-mono text-xs font-extrabold uppercase ${chip.bg} ${chip.text}`}
                  data-cursor="hover"
                >
                  <Icon />
                  <span>{chip.name}</span>
                </motion.a>
              );
            })}
          </div>

          <div className="p-4 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist font-mono text-xs font-bold uppercase">
            <span>EMAIL DIRECTLY: {portfolioData.email}</span>
          </div>
        </div>

        {/* Right Column: Direct Validated Quick Form */}
        <div className="lg:col-span-6 border-4 border-[#0D0D0D] bg-[#FFFFFF] p-6 sm:p-8 shadow-brutalist-lg">
          <h3 className="font-mono text-xs font-extrabold uppercase text-[#0D0D0D] mb-4 pb-2 border-b-3 border-[#0D0D0D]">
            TRANSMIT QUICK DISPATCH
          </h3>

          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase mb-1 text-[#0D0D0D]">
                YOUR EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className="w-full px-4 py-3 bg-[#FFFFFF] border-3 border-[#0D0D0D] font-mono text-xs text-[#0D0D0D] font-bold focus:bg-[#0D0D0D] focus:text-[#FFFFFF] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase mb-1 text-[#0D0D0D]">
                PROJECT DETAILS / ROLE INQUIRY
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="We are looking for a Senior Frontend Developer..."
                className="w-full px-4 py-3 bg-[#FFFFFF] border-3 border-[#0D0D0D] font-mono text-xs text-[#0D0D0D] font-bold focus:bg-[#0D0D0D] focus:text-[#FFFFFF] focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <span className="font-mono text-xs font-bold text-red-600 bg-red-100 p-2 border-2 border-red-600">
                {error}
              </span>
            )}

            {sent ? (
              <div className="p-3 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] font-mono text-xs font-extrabold flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>DISPATCH RECEIVED. WILL RESPOND SHORTLY!</span>
              </div>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ x: -2, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="px-6 py-3.5 bg-[#0D0D0D] text-[#FFFFFF] border-3 border-[#0D0D0D] shadow-brutalist font-mono text-xs font-extrabold uppercase flex items-center justify-center gap-2 min-h-[44px]"
                data-cursor="hover"
              >
                <span>TRANSMIT DISPATCH</span>
                <Send className="w-4 h-4 stroke-[3]" />
              </motion.button>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom Stamp */}
      <div className="mt-16 pt-6 border-t-4 border-[#0D0D0D] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs font-bold uppercase text-[#0D0D0D]">
        <span>© {new Date().getFullYear()} DAODU DESTINY OLUWATOBILOBA. ALL RIGHTS RESERVED.</span>
        <span className="bg-[#0D0D0D] text-[#FFFFFF] px-2.5 py-1 border-2 border-[#0D0D0D]">
          BUILT WITH NEXT.JS 14, TAILWIND CSS & FRAMER MOTION
        </span>
      </div>
    </footer>
  );
}
