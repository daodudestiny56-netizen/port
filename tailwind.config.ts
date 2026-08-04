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
        ink: "#0D0D0D",
        bone: "#FFFFFF",
        "raw-yellow": "#FFFFFF",
        "electric-indigo": "#0D0D0D",
        background: "#FFFFFF",
        surface: "#FFFFFF",
        border: "#0D0D0D",
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px",
      },
      boxShadow: {
        "brutalist-sm": "3px 3px 0px #0D0D0D",
        brutalist: "5px 5px 0px #0D0D0D",
        "brutalist-lg": "8px 8px 0px #0D0D0D",
        "brutalist-white-sm": "3px 3px 0px #FFFFFF",
        "brutalist-white": "5px 5px 0px #FFFFFF",
        "brutalist-white-lg": "8px 8px 0px #FFFFFF",
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
