/**
 * Palette tokens. The actual values live as RGB channels on :root in app/globals.css,
 * so Tailwind classes, inline styles, SVGs and WebGL all read from one place.
 */
export type ThemeColor = "ink" | "bone" | "accent" | "accent-light" | "surface" | "danger";

/** CSS colour string for a token, e.g. for inline styles and SVG `style.fill`. */
export const themeColor = (name: ThemeColor, alpha?: number) =>
  alpha === undefined ? `rgb(var(--${name}))` : `rgb(var(--${name}) / ${alpha})`;

/** Resolve a token to a 0xRRGGBB number at runtime (three.js can't read CSS variables). */
export function readThemeHex(name: ThemeColor): number {
  const [r, g, b] = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
    .split(/\s+/)
    .map(Number);
  return (r << 16) | (g << 8) | b;
}
