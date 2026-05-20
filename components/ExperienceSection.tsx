"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type Lenis from "lenis";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import SplitText from "./SplitText";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "BS Code",
    period: "Jun 2026 – Aug 2026",
    location: "Tokyo, Japan",
    bg: "#0055ff",
  },
  {
    title: "Software Engineer Associate",
    company: "AI Collective",
    period: "Oct 2025 – Present",
    location: "Davis, CA",
    bg: "#e82020",
  },
  {
    title: "Frontend Developer",
    company: "#include at Davis",
    period: "Oct 2025 – Present",
    location: "Davis, CA",
    bg: "#f5a800",
  },
  {
    title: "Software Engineer Intern",
    company: "NASA Jet Propulsion Laboratory",
    period: "Feb 2025 – Sep 2026",
    location: "Pasadena, CA",
    bg: "#00a85a",
  },
  {
    title: "Math Instructor",
    company: "Mathnasium",
    period: "Aug 2022 – Aug 2024",
    location: "La Cañada, CA",
    bg: "#ff5c00",
  },
];

const SCROLL_EDGE = 32;
const HANDOFF_COOLDOWN = 900; // ms — ignore repeat wheel events after a handoff

/** Space between cards so only the active one is visible until you scroll */
function useCardGap() {
  const [gap, setGap] = useState(480);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      setGap(Math.round(vh * 0.48));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return gap;
}

export default function ExperienceSection() {
  const lenisRef = useRef<Lenis | null>(null);
  const stackEndReachedRef = useRef(false);
  const handingOffRef = useRef(false);
  const itemDistance = useCardGap();
  const [titleDone, setTitleDone] = useState(false);
  const [stackReady, setStackReady] = useState(false);

  const handleLenisReady = useCallback((lenis: Lenis) => {
    lenisRef.current = lenis;
    setStackReady(true);
  }, []);

  useEffect(() => {
    if (!stackReady || !titleDone) return;

    const scroller = document.querySelector(
      "#experience .experience-scroll-stack",
    );
    if (!(scroller instanceof HTMLElement)) return;

    const onWheel = (event: WheelEvent) => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      const goingUp = event.deltaY < 0;
      const goingDown = event.deltaY > 0;
      const scrollY = lenis.scroll;
      const limit = lenis.limit;
      if (limit < SCROLL_EDGE) return;

      const atTop = scrollY <= SCROLL_EDGE;
      const atBottom =
        stackEndReachedRef.current || scrollY >= limit - SCROLL_EDGE;

      const shouldHandoff = (goingUp && atTop) || (goingDown && atBottom);
      if (!shouldHandoff) return;

      event.preventDefault();
      event.stopPropagation();

      if (handingOffRef.current) return;
      handingOffRef.current = true;
      setTimeout(() => { handingOffRef.current = false; }, HANDOFF_COOLDOWN);

      // Scroll directly to the adjacent section so the snap fires immediately
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const expSection = document.getElementById("experience");
      const idx = sections.indexOf(expSection!);
      const target = goingDown ? sections[idx + 1] : sections[idx - 1];
      target?.scrollIntoView({ behavior: "smooth" });
    };

    scroller.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => scroller.removeEventListener("wheel", onWheel, { capture: true });
  }, [stackReady, titleDone]);

  return (
    <section
      id="experience"
      className="relative"
      style={{
        height: "100svh",
        overflow: "visible",
      }}
    >
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "11vh", zIndex: 5, textAlign: "center" }}
      >
        <SplitText
          text="Experience"
          tag="p"
          splitType="chars"
          delay={60}
          duration={0.7}
          ease="power3.out"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          textAlign="center"
          onLetterAnimationComplete={() => setTitleDone(true)}
          className="experience-section-label"
          style={{
            fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.45)",
            margin: 0,
            fontFamily: "var(--font-space-grotesk)",
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 z-10 experience-stack-wrap"
        style={{
          opacity: titleDone ? 1 : 0,
          transform: titleDone ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: titleDone ? undefined : "none",
        }}
      >
        <ScrollStack
          className="experience-scroll-stack h-full w-full"
          itemDistance={itemDistance}
          stackPosition="30%"
          onLenisReady={handleLenisReady}
          onStackEndReached={(reached) => {
            stackEndReachedRef.current = reached;
          }}
        >
          {experiences.map((exp, index) => (
            <ScrollStackItem
              key={`${exp.company}-${exp.period}`}
              style={{
                padding: 0,
                background: "transparent",
                boxShadow: "none",
                border: "none",
              }}
            >
              <motion.div
                initial={{ rotateX: 20, scale: 0.97, opacity: 0 }}
                animate={
                  titleDone
                    ? { rotateX: 0, scale: 1, opacity: 1 }
                    : { rotateX: 20, scale: 0.97, opacity: 0 }
                }
                transition={{
                  duration: 1.25,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "40px",
                  background: exp.bg,
                  padding: "3rem",
                  boxShadow: `0 0 35px 8px ${exp.bg}66, 0 12px 40px rgba(0,0,0,0.4)`,
                  color: "#ffffff",
                  transformOrigin: "50% 0%",
                  willChange: "transform",
                }}
              >
                <h2>{exp.company}</h2>
                <p style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                  {exp.title} · {exp.period}
                </p>
                <p style={{ color: "rgba(255, 255, 255, 0.85)" }}>{exp.location}</p>
              </motion.div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
