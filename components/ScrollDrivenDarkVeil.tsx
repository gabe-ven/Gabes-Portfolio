"use client";

import { motion } from "motion/react";
import DarkVeil from "./DarkVeil";
import { useHeroAboutBlend } from "./HeroAboutBlend";

export default function ScrollDrivenDarkVeil() {
  const { darkVeilOpacity } = useHeroAboutBlend();

  return (
    <motion.div
      aria-hidden
      style={{
        opacity: darkVeilOpacity,
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        filter: "blur(2px)",
        transform: "scale(1.02)",
      }}
    >
      <DarkVeil speed={0.4} noiseIntensity={0.06} warpAmount={0.3} resolutionScale={0.45} />
    </motion.div>
  );
}
