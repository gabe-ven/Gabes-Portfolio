"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SPRING_HOVER = { type: "spring" as const, stiffness: 350, damping: 20 };
const SPRING_SLOW  = { type: "spring" as const, stiffness: 55,  damping: 18 };

// ── Velocity-reactive coordinate field ───────────────────────────────────────
function VelocityField() {
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const vel = useMotionValue(0);
  const sx  = useSpring(mx,  { stiffness: 90,  damping: 24 });
  const sy  = useSpring(my,  { stiffness: 90,  damping: 24 });
  const sv  = useSpring(vel, { stiffness: 50,  damping: 28 });
  const last = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const now = performance.now();
      const dt  = Math.max(now - last.current.t, 1);
      const dx  = e.clientX - last.current.x;
      const dy  = e.clientY - last.current.y;
      const spd = Math.sqrt(dx * dx + dy * dy) / dt;
      mx.set((e.clientX / window.innerWidth  - 0.5) * 44);
      my.set((e.clientY / window.innerHeight - 0.5) * 22);
      vel.set(Math.min(spd * 120, 1));
      last.current = { x: e.clientX, y: e.clientY, t: now };
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my, vel]);

  return (
    <div style={{ width: 200, height: 62 }} className="relative select-none">
      <svg width={200} height={62} viewBox="0 0 200 62" aria-hidden className="absolute inset-0">
        {/* Main axes */}
        <line x1={0}   y1={31} x2={200} y2={31} stroke="black" strokeOpacity={0.07} strokeWidth={0.55} />
        <line x1={100} y1={0}  x2={100} y2={62} stroke="black" strokeOpacity={0.07} strokeWidth={0.55} />
        {/* Orbit ring */}
        <circle cx={100} cy={31} r={22} fill="none" stroke="black" strokeOpacity={0.06} strokeWidth={0.5} strokeDasharray="2 5" />
        {/* Corner ticks */}
        <line x1={0}   y1={29} x2={0}   y2={33} stroke="black" strokeOpacity={0.1} strokeWidth={0.55} />
        <line x1={200} y1={29} x2={200} y2={33} stroke="black" strokeOpacity={0.1} strokeWidth={0.55} />
        <line x1={98}  y1={0}  x2={102} y2={0}  stroke="black" strokeOpacity={0.1} strokeWidth={0.55} />
        <line x1={98}  y1={62} x2={102} y2={62} stroke="black" strokeOpacity={0.1} strokeWidth={0.55} />
        {/* Coordinate labels */}
        <text x={3}   y={27}  fontSize={4.5} fill="black" fillOpacity={0.14} fontFamily="monospace">0,0</text>
        <text x={181} y={27}  fontSize={4.5} fill="black" fillOpacity={0.14} fontFamily="monospace">1,0</text>
        <text x={3}   y={60}  fontSize={4.5} fill="black" fillOpacity={0.14} fontFamily="monospace">0,1</text>
      </svg>
      {/* Velocity pulse ring — grows with cursor speed */}
      <motion.div
        className="absolute rounded-full border border-black/14 pointer-events-none"
        style={{ width: 30, height: 30, top: 31, left: 100, translateX: "-50%", translateY: "-50%", scale: sv }}
      />
      {/* Cursor dot — warps with position */}
      <motion.div
        className="absolute rounded-full bg-black/38 pointer-events-none"
        style={{ width: 5, height: 5, top: 31, left: 100, x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}

// ── Spring-fill CTA ───────────────────────────────────────────────────────────
function FillLink({ href, label, accent = "#fee21e", ext }: {
  href: string; label: string; accent?: string; ext?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noreferrer" : undefined}
      className="relative overflow-hidden border border-black px-6 py-3
                 font-mono text-[0.55rem] tracking-widest inline-flex items-center"
      initial="idle"
      whileHover="hovered"
    >
      <motion.span
        className="absolute inset-0 origin-left"
        style={{ background: accent }}
        variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
        transition={SPRING_HOVER}
      />
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function StoryHero() {
  return (
    <section
      id="hero"
      className="min-h-[calc(100svh-49px)] flex flex-col justify-between
                 px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-10"
    >
      <div>
        {/* Chapter marker + system tags */}
        <motion.div
          className="flex items-center flex-wrap gap-x-5 gap-y-1.5 mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[0.42rem] tracking-[0.28em] text-black/22">
            // CHAPTER 00 / GENESIS
          </span>
          <span className="w-px h-3 bg-black/10 shrink-0 hidden sm:block" />
          <span className="font-mono text-[0.42rem] tracking-[0.22em] text-black/18">// UCDAVIS CS</span>
          <span className="font-mono text-[0.42rem] tracking-[0.22em] text-black/18">// FULLSTACK ENGINEER</span>
          <span className="ml-auto font-mono text-[0.42rem] tracking-[0.22em] text-black/16">
            V2.0.0 // DEPLOYED
          </span>
        </motion.div>

        {/* Name — large-scale word reveal */}
        <motion.div
          aria-label="Gabriel Lin Venezia"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          {["GABRIEL LIN", "VENEZIA."].map((line) => (
            <div key={line} className="overflow-hidden leading-none">
              <motion.div
                className="font-black"
                style={{
                  fontFamily:    "var(--font-space-grotesk)",
                  fontSize:      "clamp(4.2rem, 11vw, 13.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight:    0.84,
                }}
                variants={{
                  hidden: { y: "108%", opacity: 0 },
                  show:   { y: "0%",   opacity: 1, transition: SPRING_SLOW },
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Asymmetric grid: coord graphic LEFT / description RIGHT */}
        <div className="mt-14 lg:grid lg:grid-cols-[1fr_1.7fr] lg:gap-20 lg:items-start">
          {/* LEFT — velocity field */}
          <motion.div
            className="mb-8 lg:mb-0 lg:pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.9 }}
          >
            <VelocityField />
          </motion.div>

          {/* RIGHT — tagline, CTAs, stack */}
          <div>
            <motion.p
              className="text-black/60 leading-[1.72]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize:   "clamp(0.96rem, 1.65vw, 1.26rem)",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 60, damping: 20 }}
            >
              Computer Science at UC Davis. Building high-performance web
              and mobile systems — React, Next.js, React Native — that ship
              to real users.
            </motion.p>

            <motion.div
              className="mt-8 flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.54, type: "spring", stiffness: 60, damping: 20 }}
            >
              <FillLink href="#experience" label="VIEW CHRONICLE ↓" />
              <FillLink href="https://github.com/gabe-ven" label="GITHUB ↗" ext />
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.68, duration: 0.55 }}
            >
              {["REACT", "NEXT.JS", "REACT NATIVE", "TYPESCRIPT", "NODE.JS", "PYTHON"].map((s) => (
                <span key={s} className="font-mono text-[0.38rem] tracking-widest text-black/20">
                  {s}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom metadata strip */}
      <motion.div
        className="flex items-end justify-between mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.78, duration: 0.6 }}
      >
        <span className="font-mono text-[0.44rem] tracking-widest text-black/18">
          PORTFOLIO · 2026
        </span>
        <a
          href="#experience"
          className="font-mono text-[0.44rem] tracking-widest text-black/20
                     hover:text-black transition-colors duration-100"
        >
          ↓ SCROLL
        </a>
      </motion.div>
    </section>
  );
}
