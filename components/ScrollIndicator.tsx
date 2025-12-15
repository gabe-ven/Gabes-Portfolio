"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const SECTION_COLORS = [
  { id: "hero", color: "#E63946", shadow: "rgba(230, 57, 70, 0.8)" },
  { id: "about", color: "#22c55e", shadow: "rgba(34, 197, 94, 0.8)" },
  { id: "experience", color: "#a855f7", shadow: "rgba(168, 85, 247, 0.8)" },
  { id: "tech", color: "#22d3ee", shadow: "rgba(34, 211, 238, 0.8)" },
  { id: "projects", color: "#f59e0b", shadow: "rgba(245, 158, 11, 0.8)" },
  { id: "contact", color: "#1d4ed8", shadow: "rgba(29, 78, 216, 0.8)" },
];

function useSectionAccent() {
  const [accent, setAccent] = useState(SECTION_COLORS[0]);

  const computeAccent = useMemo(() => {
    return () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.35;
      for (const section of SECTION_COLORS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (scrollMid >= top && scrollMid < bottom) {
          setAccent(section);
          return;
        }
      }
    };
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const handle = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        computeAccent();
      });
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [computeAccent]);

  return accent;
}

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const accent = useSectionAccent();

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
      <div className="relative w-1 h-40 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: scrollHeight,
            backgroundColor: accent.color,
            boxShadow: `0 0 10px ${accent.shadow}`,
            transition: "background-color 0.25s ease, box-shadow 0.25s ease",
          }}
        />
      </div>
    </div>
  );
}
