import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        bone: "rgb(var(--bone) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        background: "rgb(var(--bone) / <alpha-value>)",
        border: "rgb(var(--ink) / <alpha-value>)",
      },
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "10px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--ink) / 0.05), 0 8px 24px -16px rgb(var(--ink) / 0.25)",
        "soft-lg": "0 2px 4px rgb(var(--ink) / 0.05), 0 24px 48px -24px rgb(var(--ink) / 0.3)",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        sans: ["'Space Grotesk'", "'Inter'", "sans-serif"],
        body: ["'Space Grotesk'", "'Inter'", "sans-serif"],
      },
      transitionTimingFunction: {
        "portfolio-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
