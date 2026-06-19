import { useEffect, useState, useRef } from "react";

export function useCountUp(
  target: number,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    let animationFrameId: number;
    let observer: IntersectionObserver;

    const startAnimation = () => {
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutQuart: 1 - Math.pow(1 - progress, 4)
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        setCount(Math.floor(easeProgress * target));

        if (elapsed < duration) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return { count, ref };
}
