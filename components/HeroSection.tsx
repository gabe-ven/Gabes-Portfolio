"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Segment = {
  text: string;
  className?: string;
};

function useSegmentedTypewriter(
  segments: Segment[],
  speed = 30,
  startDelay = 0
) {
  const totalLength = useMemo(
    () => segments.reduce((acc, seg) => acc + seg.text.length, 0),
    [segments]
  );
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCharCount((prev) => {
          if (prev >= totalLength) {
            if (interval) clearInterval(interval);
            setDone(true);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [speed, startDelay, totalLength]);

  const displayedSegments = useMemo(() => {
    let remaining = charCount;
    return segments.map((seg) => {
      if (remaining <= 0) return { ...seg, display: "" };
      if (remaining >= seg.text.length) {
        remaining -= seg.text.length;
        return { ...seg, display: seg.text };
      }
      const partial = seg.text.slice(0, remaining);
      remaining = 0;
      return { ...seg, display: partial };
    });
  }, [segments, charCount]);

  return { displayedSegments, done, totalLength };
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typewriter setup
  const titleSpeed = 35;
  const descSpeed = 16;

  const line1 = useSegmentedTypewriter(
    [{ text: "GABRIEL", className: "text-[#E63946]" }],
    titleSpeed,
    150
  );

  const line2Delay = 200 + line1.totalLength * titleSpeed;
  const line2 = useSegmentedTypewriter(
    [{ text: "VENEZIA" }],
    titleSpeed,
    line2Delay
  );

  const descDelay = line2Delay + line2.totalLength * titleSpeed + 250;
  const descSegments: Segment[] = [
    { text: "Computer Science + Tech Management @ UC Davis. " },
    { text: "Building software and fighting merge conflicts." },
  ];
  const desc = useSegmentedTypewriter(descSegments, descSpeed, descDelay);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <motion.div className="max-w-6xl w-full" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="leading-[0.95]">
              <div>
                {line1.displayedSegments.map((seg, idx) => (
                  <span key={idx} className={seg.className}>
                    {seg.display}
                  </span>
                ))}
              </div>
              <div>
                {line2.displayedSegments.map((seg, idx) => (
                  <span key={idx} className={seg.className}>
                    {seg.display}
                  </span>
                ))}
              </div>
            </div>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed min-h-[3.5rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {desc.displayedSegments.map((seg, idx) => (
              <span key={idx} className={seg.className}>
                {seg.display}
              </span>
            ))}
          </motion.p>

          <motion.a
            href="https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-white font-semibold rounded-lg relative overflow-hidden group hover:scale-105 active:scale-98 transition-all duration-100 shadow-none hover:shadow-[0_0_30px_rgba(230,57,70,0.7)]"
            style={{ backgroundColor: "#E63946" }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={
              desc.done
                ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
                : { opacity: 0, y: 30, scale: 0.96, pointerEvents: "none" }
            }
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Animated shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

            {/* Button text */}
            <span className="relative z-10">RESUME</span>
          </motion.a>

          {/* Scroll hint arrow - appears after typing finishes */}
          <motion.div
            className="mt-12 text-center pointer-events-none select-none"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{
              opacity: desc.done ? 1 : 0,
              y: desc.done ? 0 : 10,
              scale: desc.done ? 1 : 0.95,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.svg
              aria-hidden="true"
              width="96"
              height="64"
              viewBox="0 0 96 64"
              fill="none"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto"
            >
              <path d="M12 18 L48 46 L84 18" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
