import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates a number from its previous displayed value to `target` using
 * requestAnimationFrame (easeOutCubic). No dependencies. Respects
 * prefers-reduced-motion by snapping straight to the target.
 */
export function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(0);
  const displayRef = useRef(0);
  displayRef.current = value;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const from = displayRef.current;
    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}
