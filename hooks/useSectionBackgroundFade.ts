"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import type { RefObject } from "react";

type SectionBackgroundFadeOptions = {
  /** Scroll progress when layer reaches full opacity (default 0.22) */
  fadeInEnd?: number;
  /** Scroll progress when fade-out begins (default 0.78) */
  fadeOutStart?: number;
};

/**
 * Scroll-linked opacity for per-section effects (PixelSnow, DotGrid, etc.)
 * so they crossfade instead of popping in at full strength.
 */
export function useSectionBackgroundFade(
  sectionRef: RefObject<HTMLElement | null>,
  options?: SectionBackgroundFadeOptions,
) {
  const fadeInEnd = options?.fadeInEnd ?? 0.22;
  const fadeOutStart = options?.fadeOutStart ?? 0.78;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 52,
    damping: 28,
    mass: 0.9,
    restDelta: 0.001,
  });

  const opacity = useTransform(
    smooth,
    [0, fadeInEnd, fadeOutStart, 1],
    [0, 1, 1, 0],
  );

  /** Stronger at section edges — softens handoff to the next wash */
  const edgeWashOpacity = useTransform(
    smooth,
    [0, 0.35, 0.65, 1],
    [1, 0.35, 0.35, 1],
  );

  return { opacity, edgeWashOpacity, scrollYProgress: smooth };
}
