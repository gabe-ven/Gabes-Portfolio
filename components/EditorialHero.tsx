"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Noise from "@/components/Noise";
import { TypingAnimation } from "@/components/ui/typing-animation";

const BLOB_CLIP_ID = "hero-blob-clip";

function BlobDef() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden
    >
      <defs>
        <clipPath id={BLOB_CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d="
            M 1,0
            L 1,1
            L 0,1
            C 0.05,0.88  0.24,0.74  0.18,0.58
            C 0.10,0.42  -0.05,0.28  0.22,0.14
            C 0.38,0.04  1,0.0  1,0
            Z
          " />
        </clipPath>
      </defs>
    </svg>
  );
}

interface EditorialHeroProps {
  phase: "typing" | "transition";
  setPhase: (phase: "typing" | "transition") => void;
}

export default function EditorialHero({ phase, setPhase }: EditorialHeroProps) {
  const settled = phase !== "typing";

  return (
    <section
      className="relative bg-[#D97D5B] text-[#F5F5F3] overflow-hidden"
      style={{
        minHeight: settled ? "calc(100svh + 3rem)" : "100svh",
        transition: "min-height 700ms cubic-bezier(0.16,1,0.3,1)",
      }}
      aria-label="Hero"
    >
      <BlobDef />

      {/*
        Grid switches instantly — no layout transition.
        Animating grid-template-columns triggers per-frame layout recalculation
        AND causes the h1 to word-wrap mid-animation (visually snappy).
        Instead: switch instantly, fade the h1 back in after the switch.
      */}
      <div
        className={`w-full grid grid-cols-1 items-center lg:items-stretch ${settled ? "lg:grid-cols-[48%_52%]" : "lg:grid-cols-[100%_0%]"
          }`}
        style={{ minHeight: settled ? "calc(100svh + 3rem)" : "100svh" }}
      >
        {/* Left column */}
        <div
          className={`flex flex-col justify-center w-full pt-28 pb-20 lg:py-0 px-8 sm:px-14 lg:px-20 ${settled
            ? "items-center lg:items-start text-center lg:text-left"
            : "items-center text-center"
            }`}
        >
          <h1
            className="font-bold leading-[0.9] tracking-tighter text-[#F5F5F3] select-none"
            style={{
              fontSize: "clamp(3.8rem, 9.5vw, 8.5rem)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {!settled ? (
              <TypingAnimation
                duration={70}
                delay={300}
                showCursor={true}
                blinkCursor={true}
                onAnimationComplete={() => {
                  setTimeout(() => setPhase("transition"), 650);
                }}
              >
                hi, i&apos;m gabe
              </TypingAnimation>
            ) : (
              /* Fade in after grid has already switched — hides the word-wrap frame */
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
              >
                hi, i&apos;m gabe
              </motion.span>
            )}
          </h1>

          {settled && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.3 }}
              className="w-full flex flex-col items-center lg:items-start"
            >
              <p
                className="mt-6 max-w-sm text-[#F5F5F3]/70 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
              >
                Frontend engineer &amp; CS student at UC Davis. Focused on building fast,
                intentional web and mobile systems. Previously shipped software at NASA JPL.
              </p>

              <a
                href="#projects"
                className="mt-8 inline-flex items-center gap-2 bg-[#F5F5F3] text-[#1a1a1a] font-semibold px-7 py-3.5 rounded-full hover:bg-white hover:scale-[0.97] transition-all duration-200"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
              >
                View Work ↓
              </a>
            </motion.div>
          )}
        </div>

        {/* Right column — portrait */}
        {settled && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 18, mass: 0.8, delay: 0.05 }}
            className="relative h-[60vw] max-h-[50vh] lg:max-h-none lg:h-full w-full min-h-[36vh] lg:min-h-0" style={{ transform: "translateX(5%)" }}
          >
            <div className="relative w-full h-full lg:absolute lg:top-14 lg:bottom-0 lg:left-0 lg:right-0">
              <div
                className="w-full h-full"
                style={{
                  clipPath: `url(#${BLOB_CLIP_ID})`,
                  WebkitClipPath: `url(#${BLOB_CLIP_ID})`,
                }}
              >
                <Image
                  src="/logos/portrait.png"
                  alt="Gabriel Venezia"
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: "50% 35%", transform: "scaleX(-1)" }}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <Noise patternAlpha={22} patternRefreshInterval={3} />
              </div>

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10 text-[#F5F5F3] dark:text-[#1c1c1c]"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                fill="none"
                overflow="hidden"
                aria-hidden
              >
                <motion.path
                  d="M 1.06,0 L 1.06,1 L 0,1 C 0.05,0.88 0.24,0.74 0.18,0.58 C 0.10,0.42 -0.05,0.28 0.22,0.14 C 0.38,0.04 1,0.0 1.06,0 Z"
                  stroke="currentColor"
                  strokeWidth="8"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray={5000}
                  initial={{ strokeDashoffset: -5000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
