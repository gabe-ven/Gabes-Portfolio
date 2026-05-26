"use client";

import { motion } from "motion/react";

const SPRING_HOVER = { type: "spring" as const, stiffness: 350, damping: 20 };

const LINKS = [
  { label: "GITHUB",   href: "https://github.com/gabe-ven",                                                           ext: true  },
  { label: "LINKEDIN", href: "https://linkedin.com/in/gabriel-venezia",                                                ext: true  },
  { label: "RESUME",   href: "https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing",  ext: true  },
  { label: "EMAIL",    href: "mailto:gabrielvenezia6@gmail.com",                                                        ext: false },
];

function HatchRule() {
  return (
    <div className="flex items-stretch border-b border-black overflow-hidden">
      <span className="font-mono text-[0.6rem] px-6 sm:px-10 py-3 border-r border-black shrink-0 flex items-center text-black/30">
        +
      </span>
      <span
        className="font-mono text-[0.55rem] flex-1 overflow-hidden whitespace-nowrap py-3 px-4 leading-none
                   text-black/10 tracking-[0.18em] flex items-center"
        aria-hidden
      >
        {"/ ".repeat(600)}
      </span>
      <span className="font-mono text-[0.6rem] px-6 sm:px-10 py-3 border-l border-black shrink-0 flex items-center text-black/30">
        +
      </span>
    </div>
  );
}

export default function StoryFooter() {
  return (
    <footer>
      <HatchRule />

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">

        {/* Identity */}
        <div className="px-6 sm:px-10 py-10">
          <p
            className="font-black text-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Gabriel Lin Venezia.
          </p>
          <p className="font-mono text-[0.5rem] tracking-widest mt-2.5 text-black/30">
            // COMPUTER SCIENCE & FRONTEND ENGINEERING
          </p>
          <p className="font-mono text-[0.46rem] tracking-widest mt-1 text-black/18">
            UC DAVIS · 2026 · REV.02
          </p>

          <div className="mt-6 border border-black/12 px-3 py-2 inline-block">
            <p className="font-mono text-[0.42rem] tracking-widest text-black/18">38.5382° N · 121.7617° W</p>
            <p className="font-mono text-[0.42rem] tracking-widest text-black/13 mt-0.5">DAVIS, CALIFORNIA</p>
          </div>
        </div>

        {/* Links — spring fill on hover */}
        <div className="px-6 sm:px-10 py-10 flex flex-col justify-between">
          <p className="font-mono text-[0.5rem] tracking-widest text-black/25">// LINKS</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6">
            {LINKS.map(({ label, href, ext }) => (
              <motion.a
                key={label}
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noreferrer" : undefined}
                className="relative overflow-hidden font-mono text-[0.58rem] tracking-widest py-2.5 border-b border-black/10
                           flex items-center justify-between gap-2"
                initial="idle"
                whileHover="hovered"
              >
                <motion.span
                  className="absolute inset-0 bg-[#fee21e] origin-left"
                  variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                  transition={SPRING_HOVER}
                />
                <span className="relative z-10">{label}</span>
                <motion.span
                  className="relative z-10"
                  variants={{ idle: { opacity: 0.3 }, hovered: { opacity: 1 } }}
                  transition={{ duration: 0.1 }}
                >
                  ↗
                </motion.span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t-2 border-black grid grid-cols-3 divide-x divide-black">
        <div className="px-5 sm:px-8 py-2.5 flex items-center">
          <span className="font-mono text-[0.44rem] tracking-widest text-black/20">© 2026 GABRIEL VENEZIA</span>
        </div>
        <div className="px-5 sm:px-8 py-2.5 flex items-center justify-center">
          <span className="font-mono text-[0.44rem] tracking-widest text-black/16">gabriel-venezia.com</span>
        </div>
        <div className="px-5 sm:px-8 py-2.5 flex items-center justify-end">
          <span className="font-mono text-[0.44rem] tracking-widest text-black/16">V2.0.0 // DEPLOYED</span>
        </div>
      </div>
    </footer>
  );
}
