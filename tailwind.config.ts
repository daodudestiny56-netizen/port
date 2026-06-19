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
        background: "#0A0A0A",
        surface: "#111111",
        border: "#1F1F1F",
        primaryText: "#F5F5F5",
        secondaryText: "#6B6B6B",
        accent: "#F5F5F5",
      },
      fontFamily: {
        sans: ["'Bricolage Grotesque'", "sans-serif"],
        display: ["'Bricolage Grotesque'", "sans-serif"],
        mono: ["'Bricolage Grotesque'", "monospace"],
      },
      transitionTimingFunction: {
        "portfolio-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
