"use client";

import { motion } from "framer-motion";
import { useHeroAboutBlend } from "./HeroAboutBlend";

/** Subtle gradient at the bottom of the hero that eases into the About palette */
export default function HeroExitBridge() {
  const { exitFadeOpacity } = useHeroAboutBlend();

  return (
    <motion.div
      className="hero-about-exit-fade absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
      style={{
        height: "min(52vh, 520px)",
        opacity: exitFadeOpacity,
      }}
      aria-hidden
    />
  );
}
