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
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        background: "rgb(var(--bone) / <alpha-value>)",
        border: "rgb(var(--ink) / <alpha-value>)",
      },
      borderWidth: {
        3: "3px",
        6: "6px",
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
        "brutalist-sm": "3px 3px 0px rgb(var(--ink))",
        brutalist: "5px 5px 0px rgb(var(--ink))",
        "brutalist-lg": "8px 8px 0px rgb(var(--ink))",
        "brutalist-white-sm": "3px 3px 0px rgb(var(--bone))",
        "brutalist-white": "5px 5px 0px rgb(var(--bone))",
        "brutalist-white-lg": "8px 8px 0px rgb(var(--bone))",
        "brutalist-accent": "5px 5px 0px rgb(var(--accent))",
        "brutalist-accent-lg": "8px 8px 0px rgb(var(--accent))",
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
