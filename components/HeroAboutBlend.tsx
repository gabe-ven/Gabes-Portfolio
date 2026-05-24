"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import "./HeroAboutBlend.css";

type HeroAboutBlendContextValue = {
  aboutRef: RefObject<HTMLElement | null>;
  smoothProgress: MotionValue<number>;
  darkVeilOpacity: MotionValue<number>;
  particlesOpacity: MotionValue<number>;
  exitFadeOpacity: MotionValue<number>;
};

const HeroAboutBlendContext = createContext<HeroAboutBlendContextValue | null>(
  null,
);

export function HeroAboutBlendProvider({ children }: { children: ReactNode }) {
  const aboutRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    // Longer blend window — finishes before snap lands
    offset: ["start end", "start 0.15"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 28,
    mass: 0.9,
    restDelta: 0.001,
  });

  const darkVeilOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.8, 0.2, 0.15],
  );

  const particlesOpacity = useTransform(
    smoothProgress,
    [0, 0.22, 0.55, 0.88, 1],
    [0, 0.06, 0.35, 0.72, 1],
  );

  const exitFadeOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.75, 1],
    [0.28, 0.55, 0.85, 1],
  );

  return (
    <HeroAboutBlendContext.Provider
      value={{
        aboutRef,
        smoothProgress,
        darkVeilOpacity,
        particlesOpacity,
        exitFadeOpacity,
      }}
    >
      {children}
    </HeroAboutBlendContext.Provider>
  );
}

export function useHeroAboutBlend() {
  const ctx = useContext(HeroAboutBlendContext);
  if (!ctx) {
    throw new Error("useHeroAboutBlend must be used within HeroAboutBlendProvider");
  }
  return ctx;
}
