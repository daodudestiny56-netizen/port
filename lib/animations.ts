import { Variants } from "framer-motion";

export const EASE_PORTFOLIO = [0.16, 1, 0.3, 1] as const;

export const transitionPortfolio = {
  duration: 0.8,
  ease: EASE_PORTFOLIO,
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_PORTFOLIO,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 0.7,
      ease: EASE_PORTFOLIO,
      delay: custom?.delay ?? 0,
    },
  }),
};
