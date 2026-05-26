"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const NAV = [
  { label: "GITHUB",   href: "https://github.com/gabe-ven",                                                           ext: true  },
  { label: "LINKEDIN", href: "https://linkedin.com/in/gabriel-venezia",                                                ext: true  },
  { label: "RESUME",   href: "https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing",  ext: true  },
  { label: "EMAIL",    href: "mailto:gabrielvenezia6@gmail.com",                                                        ext: false },
];

const SPRING = { type: "spring" as const, stiffness: 350, damping: 20 };

function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export default function StoryHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F3]/92 backdrop-blur-sm border-b border-black h-[49px]">
      <div className="flex items-center justify-between px-6 sm:px-10 h-full gap-6">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 select-none group shrink-0">
          <span className="flex gap-[3px]">
            <motion.span
              className="w-2 h-2 bg-black inline-block"
              whileHover={{ backgroundColor: "#fee21e", scale: 1.2 }}
              transition={SPRING}
            />
            <motion.span
              className="w-2 h-2 bg-black inline-block"
              whileHover={{ backgroundColor: "#ff2d87", scale: 1.2 }}
              transition={SPRING}
            />
          </span>
          <span className="font-mono text-[0.58rem] tracking-widest">GV // L</span>
        </a>

        {/* Clock */}
        <span className="hidden sm:block font-mono text-[0.48rem] tracking-widest text-black/22">
          <LiveClock />
        </span>

        {/* Spring-fill nav */}
        <nav className="flex items-center shrink-0">
          {NAV.map(({ label, href, ext }, i) => (
            <span key={label} className="flex items-center">
              {i > 0 && (
                <span className="font-mono text-[0.5rem] text-black/20 px-0.5" aria-hidden>|</span>
              )}
              <motion.a
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noreferrer" : undefined}
                className="relative overflow-hidden px-2.5 py-1 font-mono text-[0.52rem] tracking-widest"
                initial="idle"
                whileHover="hovered"
              >
                <motion.span
                  className="absolute inset-0 bg-[#fee21e] origin-left"
                  variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                  transition={SPRING}
                />
                <span className="relative z-10">{label}</span>
              </motion.a>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
