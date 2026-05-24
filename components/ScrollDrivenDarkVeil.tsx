"use client";

import { useState, useEffect, type ComponentType } from "react";
import { motion } from "motion/react";
import { useHeroAboutBlend } from "./HeroAboutBlend";
import type { DarkVeilProps } from "./DarkVeil";

// DarkVeil uses ogl (~6MB vendor chunk). Lazy-load it so ogl is never in the
// initial HTML manifest — the hero content (z-10) renders on top regardless.
export default function ScrollDrivenDarkVeil() {
  const { darkVeilOpacity } = useHeroAboutBlend();
  const [DarkVeilComp, setDarkVeilComp] = useState<ComponentType<DarkVeilProps> | null>(null);

  useEffect(() => {
    import("./DarkVeil").then((m) => {
      setDarkVeilComp(() => m.default as ComponentType<DarkVeilProps>);
    });
  }, []);

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
      {DarkVeilComp ? (
        <DarkVeilComp speed={0.4} noiseIntensity={0.06} warpAmount={0.3} resolutionScale={0.45} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "#09090e" }} />
      )}
    </motion.div>
  );
}
