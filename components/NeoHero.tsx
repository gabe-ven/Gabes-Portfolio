"use client";

import { motion } from "motion/react";

const SPRING = { type: "spring" as const, stiffness: 380, damping: 26 };

const LABELS = [
  "// COMPUTER SCIENCE",
  "// FRONTEND ENGINEER",
  "// GRADUATING JUNE 2026",
];

const STACK = [
  "React · Next.js · React Native",
  "TypeScript · Python · C++",
  "Flask · AWS · PostgreSQL",
];

export default function NeoHero() {
  return (
    <section
      id="hero"
      className="border-b-2 border-black min-h-[calc(100svh-5.5rem)] flex flex-col"
    >
      {/* Axis bar */}
      <div className="flex items-center gap-3 border-b border-black px-6 sm:px-10 py-2">
        <span className="font-mono text-[0.5rem] tracking-widest text-black/22">×001</span>
        <div className="flex-1 border-t border-dashed border-black/10" />
        <span className="font-mono text-[0.5rem] tracking-widest text-black/22">FRONTEND ENG / COMP SCI</span>
        <span className="font-mono text-[0.5rem] text-black/13 ml-3 hidden sm:block">[+]</span>
      </div>

      {/* Two-column body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

        {/* LEFT: name + bio + CTAs */}
        <div className="flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-12 pb-8 lg:border-r-2 lg:border-black">
          <div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.13 } } }}
            >
              {(["GABRIEL LIN", "VENEZIA."] as const).map((word) => (
                <motion.div
                  key={word}
                  className="font-black leading-[0.85] overflow-hidden"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "clamp(2.8rem, 9vw, 8.5rem)",
                    letterSpacing: "-0.025em",
                  }}
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    show:   { y: "0%",   opacity: 1, transition: SPRING },
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="border-t-2 border-black mt-6 mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="font-mono text-[0.7rem] leading-relaxed text-black/52 max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, ...SPRING }}
            >
              Computer Science student &amp; frontend engineer. Focused on building
              high-performance web and mobile products — React, Next.js, React Native.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, ...SPRING }}
          >
            <a
              href="#experience"
              className="border-2 border-black px-7 py-3.5 font-mono text-[0.62rem] tracking-widest font-bold
                         bg-black text-[#F5F5F3]
                         shadow-[4px_4px_0_0_#fee21e]
                         hover:bg-[#fee21e] hover:text-black hover:shadow-none hover:translate-x-1 hover:translate-y-1
                         transition-[transform,box-shadow,background-color,color] duration-75"
            >
              VIEW WORK ↓
            </a>
            <a
              href="https://github.com/gabe-ven"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-black px-7 py-3.5 font-mono text-[0.62rem] tracking-widest font-bold
                         bg-[#fee21e] text-black
                         shadow-[4px_4px_0_0_#000]
                         hover:bg-[#ff2d87] hover:border-[#ff2d87] hover:text-white hover:shadow-none hover:translate-x-1 hover:translate-y-1
                         transition-[transform,box-shadow,background-color,color,border-color] duration-75"
            >
              GITHUB ↗
            </a>
          </motion.div>
        </div>

        {/* RIGHT: labels + stack index + version */}
        <motion.div
          className="hidden lg:flex flex-col justify-between px-10 pt-12 pb-8"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22, ...SPRING }}
        >
          {/* Accent labels */}
          <div className="flex flex-col gap-2.5">
            {LABELS.map((label) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="w-4 h-px bg-black/20 inline-block shrink-0" />
                <span className="font-mono text-[0.56rem] tracking-widest text-black/36">{label}</span>
              </div>
            ))}
          </div>

          {/* Stack index */}
          <div className="border border-black/15 p-4">
            <p className="font-mono text-[0.44rem] tracking-widest text-black/22 mb-3">// STACK</p>
            <div className="flex flex-col gap-1.5">
              {STACK.map((line, i) => (
                <div key={line} className="flex items-center gap-2">
                  <span className="font-mono text-[0.38rem] text-black/18 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.5rem] text-black/40 tracking-wide">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[0.46rem] tracking-widest text-black/28">V1.39.0 // DEPLOYED</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom registration bar */}
      <div className="flex items-center justify-between border-t border-black px-6 sm:px-10 py-2">
        <span className="font-mono text-[0.44rem] text-black/13">[+]</span>
        <span className="font-mono text-[0.46rem] tracking-widest text-black/20">
          REV.01 · GABRIEL VENEZIA · 2026
        </span>
        <span className="font-mono text-[0.44rem] text-black/13">[+]</span>
      </div>
    </section>
  );
}
