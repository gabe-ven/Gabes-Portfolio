"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type Lenis from "lenis";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import DecryptedText from "./DecryptedText";

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
  const [animateIn, setAnimateIn] = useState(false);
  const [stackInteractive, setStackInteractive] = useState(false);
  const [stackReady, setStackReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const blockScrollRef = useRef(false);

  // Window-level wheel blocker. Registered once; the ref gates it.
  // This fires before Lenis's own listeners because we add it here first,
  // but we also call lenis.stop() directly as a second line of defence.
  useEffect(() => {
    const block = (e: WheelEvent) => {
      if (blockScrollRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("wheel", block, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", block, { capture: true });
  }, []);

  // Pop animation only plays when entering from above (About → Experience).
  // Everything — window wheel, lenis, pointer-events — is locked from the
  // instant the section enters view, not after the delay.
  useEffect(() => {
    let entryTimer: ReturnType<typeof setTimeout>;
    let interactTimer: ReturnType<typeof setTimeout>;
    const CARD_ANIM_MS = 900;

    const resetStack = () => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const fromBelow = entry.boundingClientRect.top > 0;
          if (fromBelow) {
            resetStack();
            blockScrollRef.current = true;
            setAnimateIn(true);
            entryTimer = setTimeout(() => {
              setTitleDone(true);
              interactTimer = setTimeout(() => {
                blockScrollRef.current = false;
                setStackInteractive(true);
              }, CARD_ANIM_MS);
            }, 900);
          } else {
            blockScrollRef.current = false;
            setAnimateIn(false);
            setTitleDone(true);
            setStackInteractive(true);
          }
        } else {
          clearTimeout(entryTimer);
          clearTimeout(interactTimer);
          blockScrollRef.current = false;
          setAnimateIn(false);
          setTitleDone(false);
          setStackInteractive(false);
        }
      },
      { threshold: 0.5 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); clearTimeout(entryTimer); clearTimeout(interactTimer); };
  }, []);

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
      const atBottom = stackEndReachedRef.current || scrollY >= limit - 10;

      const shouldHandoff = (goingUp && atTop) || (goingDown && atBottom);
      if (!shouldHandoff) return;

      // Always block the event during cooldown — returning early without
      // preventing lets fast scroll events overshoot the target section.
      event.preventDefault();
      event.stopPropagation();

      if (handingOffRef.current) return;
      handingOffRef.current = true;
      setTimeout(() => { handingOffRef.current = false; }, HANDOFF_COOLDOWN);

      const sections = Array.from(document.querySelectorAll("section[id]"));
      const expSection = document.getElementById("experience");
      const idx = sections.indexOf(expSection!);
      const target = goingUp ? sections[idx - 1] : sections[idx + 1];
      if (!target) return;

      // Pause mandatory snap so it doesn't fight the smooth scroll mid-animation.
      const html = document.documentElement;
      html.style.scrollSnapType = "none";

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // After smooth scroll completes: pin exactly to the target before re-enabling
      // snap, so mandatory snap can't choose the wrong section.
      setTimeout(() => {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        html.style.scrollSnapType = "";
      }, 800);
    };

    scroller.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => scroller.removeEventListener("wheel", onWheel, { capture: true });
  }, [stackReady, titleDone]);

  return (
    <section
      ref={sectionRef}
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
        <h2
          className="text-4xl md:text-5xl font-semibold tracking-[0.18em] uppercase text-center"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <DecryptedText
            text="EXPERIENCE"
            animateOn="view"
            sequential={true}
            revealDirection="center"
            speed={80}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            className="text-white/90"
            encryptedClassName="text-white/25"
          />
        </h2>
      </motion.div>

      <div
        className="absolute inset-0 z-10 experience-stack-wrap"
        style={{ pointerEvents: stackInteractive ? undefined : "none" }}
      >
        <ScrollStack
          className="experience-scroll-stack h-full w-full"
          itemDistance={itemDistance}
          stackPosition="30%"
          rotateXAmount={20}
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
                initial={{ opacity: index === 0 ? 0 : 1, y: index === 0 ? 80 : 0 }}
                animate={index === 0 ? { opacity: titleDone ? 1 : 0, y: titleDone ? 0 : 80 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: index === 0 && animateIn ? 0.9 : 0,
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
