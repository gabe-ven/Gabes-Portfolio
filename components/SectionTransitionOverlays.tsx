"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { SECTION_PALETTE, type SectionId } from "@/lib/sectionPalette";

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
  /** Current section — used for bottom exit wash */
  section?: SectionId;
  /** Section above — top entry wash color */
  fromSection?: SectionId;
  topColor?: string;
  bottomColor?: string;
  topHeight?: string;
  bottomHeight?: string;
  showTop?: boolean;
  showBottom?: boolean;
}

export default function SectionTransitionOverlays({
  sectionRef,
  section,
  fromSection,
  topColor,
  bottomColor,
  topHeight = "38vh",
  bottomHeight = "38vh",
  showTop = true,
  showBottom = true,
}: Props) {
  const resolvedTop =
    topColor ?? (fromSection ? SECTION_PALETTE[fromSection].wash : SECTION_PALETTE.hero.wash);
  const resolvedBottom =
    bottomColor ?? (section ? SECTION_PALETTE[section].wash : "rgba(0,0,0,0.9)");

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

  // Entry: previous section washes in, then clears
  const topOpacity = useTransform(smooth, [0, 0.28, 0.52, 1], [1, 0.55, 0.12, 0]);

  // Exit: next section wash builds as we leave
  const bottomOpacity = useTransform(smooth, [0, 0.48, 0.72, 1], [0, 0.12, 0.55, 1]);

  return (
    <>
      {showTop && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: topHeight,
            zIndex: 3,
            pointerEvents: "none",
            opacity: topOpacity,
            background: `linear-gradient(to bottom, ${resolvedTop} 0%, transparent 100%)`,
          }}
        />
      )}
      {showBottom && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: bottomHeight,
            zIndex: 3,
            pointerEvents: "none",
            opacity: bottomOpacity,
            background: `linear-gradient(to top, ${resolvedBottom} 0%, transparent 100%)`,
          }}
        />
      )}
    </>
  );
}
