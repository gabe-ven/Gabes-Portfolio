"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import DecryptedText from "./DecryptedText";
import ProjectFlipCard, { type FlipProject } from "./ProjectFlipCard";
import projectsData from "@/app/data/projects.json";

const { projects } = projectsData;

// Pad to 15 items (5 per row × 3 rows)
const products: FlipProject[] = Array.from({ length: 15 }, (_, i) => {
  const p = projects[i % projects.length];
  return {
    title: p.title,
    image: p.image,
    imageBg: (p as { imageBg?: string }).imageBg,
    description: p.description,
    tags: p.tags,
    github: p.github,
    demo: (p as { demo?: string }).demo,
  };
});

const firstRow  = products.slice(0, 5);
const secondRow = products.slice(5, 10);
const thirdRow  = products.slice(10, 15);

const HANDOFF_COOLDOWN = 700;

function ProductCard({
  project,
  translate,
}: {
  project: FlipProject;
  translate: MotionValue<number>;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      style={{ x: translate }}
      animate={{ y: flipped ? 0 : 0 }}
      className="h-72 w-[26rem] relative shrink-0"
    >
      <ProjectFlipCard
        project={project}
        isActive={true}
        flipped={flipped}
        onFlip={() => setFlipped((f) => !f)}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const handingOffRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Drive all parallax from the inner container's scroll
  const { scrollYProgress } = useScroll({ container: scrollRef });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );

  // Wheel handoff: at top → Experience, at bottom → Photos
  const handoff = useCallback((direction: "up" | "down") => {
    if (handingOffRef.current) return;
    handingOffRef.current = true;
    setTimeout(() => { handingOffRef.current = false; }, HANDOFF_COOLDOWN);

    const sections = Array.from(document.querySelectorAll("section[id]"));
    const idx = sections.indexOf(sectionRef.current!);
    const target = direction === "up" ? sections[idx - 1] : sections[idx + 1];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const atTop    = el.scrollTop <= 2;
      const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 2;

      if (e.deltaY < 0 && atTop)    { e.preventDefault(); handoff("up");   return; }
      if (e.deltaY > 0 && atBottom) { e.preventDefault(); handoff("down"); return; }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [handoff]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
      style={{ height: "100svh", zIndex: 1, scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      {/* Inner scroll container — perspective lives here so 3D applies to children */}
      <div
        ref={scrollRef}
        className="h-full w-full overflow-y-scroll [perspective:1000px] [transform-style:preserve-3d]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* 300vh of content so the parallax has room to animate */}
        <div className="h-[300vh] antialiased relative flex flex-col" style={{ paddingTop: "11vh", paddingBottom: "4rem" }}>

          {/* Header */}
          <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full">
            <h2
              className="text-4xl md:text-7xl font-semibold tracking-[0.12em] uppercase text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <DecryptedText
                text="PROJECTS"
                animateOn="view"
                sequential={true}
                revealDirection="center"
                speed={80}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                className="text-white/90"
                encryptedClassName="text-white/25"
              />
            </h2>
            <p
              className="max-w-xl text-base md:text-lg mt-6 text-white/45 leading-relaxed"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              A collection of things I&apos;ve built — from AI-powered apps to systems
              programming and interactive visualizations.
            </p>
          </div>

          {/* Parallax card rows */}
          <motion.div
            style={{ rotateX, rotateZ, translateY, opacity }}
          >
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-8">
              {firstRow.map((p, i) => (
                <ProductCard key={`${p.title}-${i}`} project={p} translate={translateX} />
              ))}
            </motion.div>
            <motion.div className="flex flex-row mb-8 space-x-8">
              {secondRow.map((p, i) => (
                <ProductCard key={`${p.title}-${i}`} project={p} translate={translateXReverse} />
              ))}
            </motion.div>
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-8">
              {thirdRow.map((p, i) => (
                <ProductCard key={`${p.title}-${i}`} project={p} translate={translateX} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
