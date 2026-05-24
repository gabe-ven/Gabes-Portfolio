"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    subtitle?: string;
    meta?: string;
    description: string;
    content?: React.ReactNode;
    accentColor?: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / content.length);
    const closest = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? i : acc;
    }, 0);
    setActiveCard(closest);
  });

  const activeColor = content[activeCard].accentColor ?? "#ffffff";

  return (
    <div ref={ref} className="relative flex gap-16 px-6 md:px-16 lg:px-24">
      {/* Left: scrolling text */}
      <div className="flex-1 max-w-xl">
        {content.map((item, index) => {
          const isActive = activeCard === index;
          const yOffset = index < activeCard ? -12 : index > activeCard ? 12 : 0;

          return (
            <div key={index} className="flex items-center min-h-screen">
              <div className="py-20">
                <motion.p
                  animate={{ opacity: isActive ? 0.4 : 0.15 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs font-mono tracking-[0.2em] uppercase mb-4"
                  style={{ color: item.accentColor ?? "#fff" }}
                >
                  {index === 0 ? "Current" : index === content.length - 1 ? "Previously" : "Experience"}
                </motion.p>

                <motion.h2
                  animate={{ opacity: isActive ? 1 : 0.2, y: yOffset }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </motion.h2>

                {item.subtitle && (
                  <motion.p
                    animate={{ opacity: isActive ? 0.85 : 0.15, y: yOffset }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.04 }}
                    className="text-base font-semibold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)", color: item.accentColor ?? "#fff" }}
                  >
                    {item.subtitle}
                  </motion.p>
                )}

                {item.meta && (
                  <motion.p
                    animate={{ opacity: isActive ? 0.4 : 0.1, y: yOffset }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                    className="text-xs font-mono text-white/50 mb-4 tracking-wide"
                  >
                    {item.meta}
                  </motion.p>
                )}

                <motion.p
                  animate={{ opacity: isActive ? 0.7 : 0.15, y: yOffset }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
                  className="text-sm font-mono text-white/70 leading-relaxed max-w-sm"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: sticky logo panel */}
      <div className="hidden lg:block sticky top-[15vh] self-start h-[70vh] w-[38vw] max-w-md shrink-0">
        <motion.div
          animate={{ borderColor: activeColor + "55" }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative h-full w-full overflow-hidden rounded-2xl border",
            contentClassName,
          )}
          style={{ background: "#0a0a0a" }}
        >
          {/* Brand color glow on the left edge */}
          <motion.div
            animate={{ background: activeColor }}
            transition={{ duration: 0.6 }}
            className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
          />
          {content[activeCard].content ?? null}
        </motion.div>
      </div>
    </div>
  );
};
