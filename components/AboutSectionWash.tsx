"use client";

import { motion, useTransform } from "framer-motion";
import { useHeroAboutBlend } from "./HeroAboutBlend";

/** Base + top wash so About matches hero exit without a hard edge */
export default function AboutSectionWash() {
  const { smoothProgress } = useHeroAboutBlend();

  const washOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 1],
    [0.92, 0.96, 1, 1],
  );

  const topFadeOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 1],
    [1, 0.75, 0.35, 0],
  );

  return (
    <>
      <motion.div
        className="about-section-wash"
        style={{ opacity: washOpacity }}
        aria-hidden
      />
      <motion.div
        className="about-section-wash__top"
        style={{ opacity: topFadeOpacity }}
        aria-hidden
      />
    </>
  );
}
