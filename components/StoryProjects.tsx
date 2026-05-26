"use client";

import { motion } from "motion/react";
import projectsData from "@/app/data/projects.json";

const SPRING_IN    = { type: "spring" as const, stiffness: 55,  damping: 18 };
const SPRING_HOVER = { type: "spring" as const, stiffness: 300, damping: 25 };

type Project = (typeof projectsData.projects)[number];

// ── Blueprint grids ───────────────────────────────────────────────────────────

function TwiiceBlueprint() {
  return (
    <svg viewBox="0 0 400 320" aria-hidden className="w-full h-full">
      {/* Coordinate grid */}
      {Array.from({ length: 14 }, (_, i) => i * 25).map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="320" stroke="black" strokeWidth="0.4" strokeDasharray="2 10" />
      ))}
      {Array.from({ length: 14 }, (_, i) => i * 25).map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="black" strokeWidth="0.4" strokeDasharray="2 10" />
      ))}

      {/* CLIP pipeline nodes */}
      {[
        { x: 30,  y: 60,  label: ["IMAGE", "INPUT"] },
        { x: 120, y: 60,  label: ["CLIP", "ENCODER"] },
        { x: 220, y: 60,  label: ["512-DIM", "EMBEDDING"] },
        { x: 320, y: 60,  label: ["FAISS", "ANN"] },
        { x: 370, y: 140, label: ["MATCH", "RESULT"] },
        { x: 220, y: 180, label: ["WARDROBE", "DB"] },
        { x: 80,  y: 180, label: ["EXPO", "UI"] },
      ].map(({ x, y, label }) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 36} y={y - 16} width={72} height={32} rx={1} fill="none" stroke="black" strokeWidth="0.6" />
          {label.map((ln, i) => (
            <text
              key={ln}
              x={x}
              y={y + (label.length > 1 ? i * 9 - 3 : 5)}
              textAnchor="middle"
              fontSize="5.5"
              fill="black"
              fontFamily="monospace"
            >
              {ln}
            </text>
          ))}
        </g>
      ))}

      {/* Connectors */}
      <line x1="66"  y1="60"  x2="84"  y2="60"  stroke="black" strokeWidth="0.5" />
      <line x1="156" y1="60"  x2="184" y2="60"  stroke="black" strokeWidth="0.5" />
      <line x1="256" y1="60"  x2="284" y2="60"  stroke="black" strokeWidth="0.5" />
      <line x1="320" y1="76"  x2="340" y2="110" stroke="black" strokeWidth="0.5" />
      <line x1="220" y1="76"  x2="220" y2="164" stroke="black" strokeWidth="0.5" strokeDasharray="3 4" />
      <line x1="184" y1="180" x2="116" y2="180" stroke="black" strokeWidth="0.5" />

      {/* Callout dots at key intersections */}
      <circle cx="120" cy="60"  r="4" fill="none" stroke="black" strokeWidth="0.8" />
      <circle cx="320" cy="60"  r="4" fill="none" stroke="black" strokeWidth="0.8" />
      <circle cx="220" cy="180" r="4" fill="none" stroke="black" strokeWidth="0.8" />

      {/* Metric annotations */}
      <text x="161" y="50" fontSize="4.5" fill="black" fontFamily="monospace">512-DIM SPACE</text>
      <text x="285" y="50" fontSize="4.5" fill="black" fontFamily="monospace">&lt;50ms SEARCH</text>
      <text x="225" y="145" fontSize="4" fill="black" fontFamily="monospace">ANN LOOKUP</text>

      {/* Coordinate labels */}
      <text x="2"   y="10" fontSize="4" fill="black" fontFamily="monospace">0,0</text>
      <text x="378" y="10" fontSize="4" fill="black" fontFamily="monospace">1,0</text>
      <text x="2"   y="316" fontSize="4" fill="black" fontFamily="monospace">0,1</text>
      <text x="378" y="316" fontSize="4" fill="black" fontFamily="monospace">1,1</text>
    </svg>
  );
}

function YesterdayBlueprint() {
  return (
    <svg viewBox="0 0 340 200" aria-hidden className="w-full h-full">
      {Array.from({ length: 12 }, (_, i) => i * 30).map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="black" strokeWidth="0.4" strokeDasharray="2 10" />
      ))}
      {Array.from({ length: 8 }, (_, i) => i * 28).map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="340" y2={y} stroke="black" strokeWidth="0.4" strokeDasharray="2 10" />
      ))}
      {[
        { x: 40,  y: 60,  label: ["NEXT.JS", "PAGES"] },
        { x: 130, y: 60,  label: ["CART", "STATE"] },
        { x: 220, y: 60,  label: ["API", "LAYER"] },
        { x: 300, y: 60,  label: ["VERCEL"] },
        { x: 170, y: 140, label: ["5K+", "MONTHLY"] },
      ].map(({ x, y, label }) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 30} y={y - 14} width={60} height={28} rx={1} fill="none" stroke="black" strokeWidth="0.55" />
          {label.map((ln, i) => (
            <text key={ln} x={x} y={y + (label.length > 1 ? i * 9 - 3 : 5)} textAnchor="middle" fontSize="5" fill="black" fontFamily="monospace">
              {ln}
            </text>
          ))}
        </g>
      ))}
      <line x1="70"  y1="60" x2="100" y2="60" stroke="black" strokeWidth="0.5" />
      <line x1="160" y1="60" x2="190" y2="60" stroke="black" strokeWidth="0.5" />
      <line x1="250" y1="60" x2="270" y2="60" stroke="black" strokeWidth="0.5" />
      <line x1="170" y1="74" x2="170" y2="126" stroke="black" strokeWidth="0.5" strokeDasharray="3 4" />
      <circle cx="130" cy="60" r="3.5" fill="none" stroke="black" strokeWidth="0.7" />
      <text x="2" y="10" fontSize="4" fill="black" fontFamily="monospace">0,0</text>
      <text x="318" y="10" fontSize="4" fill="black" fontFamily="monospace">1,0</text>
    </svg>
  );
}

function LabLinkBlueprint() {
  return (
    <svg viewBox="0 0 340 200" aria-hidden className="w-full h-full">
      {Array.from({ length: 12 }, (_, i) => i * 30).map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="black" strokeWidth="0.4" strokeDasharray="2 10" />
      ))}
      {Array.from({ length: 8 }, (_, i) => i * 28).map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="340" y2={y} stroke="black" strokeWidth="0.4" strokeDasharray="2 10" />
      ))}
      {[
        { x: 40,  y: 60,  label: ["STUDENT", "QUERY"] },
        { x: 130, y: 40,  label: ["TF-IDF"] },
        { x: 130, y: 80,  label: ["BM25"] },
        { x: 225, y: 60,  label: ["PROF", "DB"] },
        { x: 305, y: 60,  label: ["RANKED", "RESULTS"] },
      ].map(({ x, y, label }) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 30} y={y - 14} width={60} height={28} rx={1} fill="none" stroke="black" strokeWidth="0.55" />
          {label.map((ln, i) => (
            <text key={ln} x={x} y={y + (label.length > 1 ? i * 9 - 3 : 5)} textAnchor="middle" fontSize="5" fill="black" fontFamily="monospace">
              {ln}
            </text>
          ))}
        </g>
      ))}
      <line x1="70"  y1="55" x2="100" y2="45" stroke="black" strokeWidth="0.5" />
      <line x1="70"  y1="65" x2="100" y2="75" stroke="black" strokeWidth="0.5" />
      <line x1="160" y1="45" x2="190" y2="55" stroke="black" strokeWidth="0.5" />
      <line x1="160" y1="75" x2="190" y2="65" stroke="black" strokeWidth="0.5" />
      <line x1="255" y1="60" x2="275" y2="60" stroke="black" strokeWidth="0.5" />
      <text x="2" y="10" fontSize="4" fill="black" fontFamily="monospace">0,0</text>
      <text x="318" y="10" fontSize="4" fill="black" fontFamily="monospace">1,0</text>
    </svg>
  );
}

const SHOWCASE_BLUEPRINTS: Record<number, React.ComponentType> = {
  10: YesterdayBlueprint,
  0:  LabLinkBlueprint,
  1:  LabLinkBlueprint,
};

// ── Shared atoms ──────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="font-mono text-[0.4rem] tracking-[0.16em] text-black/28 uppercase">
      {label}
    </span>
  );
}

function EditorialLink({ href, label, accent = "#fee21e" }: {
  href: string; label: string; accent?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative overflow-hidden inline-flex border border-black/22
                 px-3.5 py-1.5 font-mono text-[0.46rem] tracking-widest"
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

// ── 01 Featured — full-screen viewport slot with blueprint grid ───────────────
function FeaturedProject({ project }: { project: Project }) {
  return (
    <motion.div
      className="relative min-h-[90svh] flex flex-col justify-between py-20 lg:py-28 overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={SPRING_IN}
    >
      {/* Blueprint grid — right half, resting state */}
      <motion.div
        className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.09 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1.6 }}
      >
        <TwiiceBlueprint />
      </motion.div>

      {/* Top: label + metric strip */}
      <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
        <p className="font-mono text-[0.46rem] tracking-widest text-black/28">
          01 / <span className="ml-2 text-black/18">FEATURED BUILD</span>
        </p>
        <div className="flex gap-8">
          {["CLIP EMBEDDINGS", "FAISS ANN", "<50ms SEARCH"].map((m) => (
            <span key={m} className="font-mono text-[0.38rem] tracking-widest text-black/20">{m}</span>
          ))}
        </div>
      </div>

      {/* Center: massive title */}
      <div className="relative z-10 my-auto py-12">
        <motion.div
          className="relative w-fit overflow-hidden cursor-default"
          initial="idle"
          whileHover="hovered"
        >
          <motion.span
            className="absolute inset-0 bg-[#fee21e] origin-left pointer-events-none"
            variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
            transition={SPRING_HOVER}
          />
          <motion.h3
            className="relative z-10 font-black uppercase"
            style={{
              fontFamily:    "var(--font-space-grotesk)",
              fontSize:      "clamp(4.5rem, 12vw, 14rem)",
              letterSpacing: "-0.03em",
              lineHeight:    0.84,
            }}
            variants={{ idle: { x: 0 }, hovered: { x: 12 } }}
            transition={SPRING_HOVER}
          >
            {project.title}
          </motion.h3>
        </motion.div>
      </div>

      {/* Bottom: description + tags + CTAs */}
      <div className="relative z-10">
        <motion.div
          className="border-t border-black/10 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-20 pt-8">
          <p className="font-mono text-[0.7rem] leading-[1.9] text-black/48">
            {project.description}
          </p>
          <div className="flex flex-col gap-5 justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {project.tags.map((t) => <Tag key={t} label={t} />)}
            </div>
            <div className="flex gap-3 flex-wrap">
              {project.github && (
                <EditorialLink href={project.github} label="VIEW SOURCE →" />
              )}
              {"demo" in project && project.demo && (
                <EditorialLink href={project.demo as string} label="LIVE ↗" accent="#ff2d87" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── 02–04 Showcase — mechanical switch hover effect ───────────────────────────
function ShowcaseProject({ project, index }: { project: Project; index: number }) {
  const num      = String(index + 2).padStart(2, "0");
  const isRight  = index % 2 === 1;
  const Blueprint = SHOWCASE_BLUEPRINTS[project.id];

  return (
    <motion.div
      className="border-t border-black/8 py-20 lg:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...SPRING_IN, delay: index * 0.06 }}
    >
      <p className="font-mono text-[0.46rem] tracking-widest text-black/25 mb-7">
        {num} /
      </p>

      {/* Mechanical switch title — black backing shadow revealed on press */}
      <div className={isRight ? "lg:pl-[18%]" : ""}>
        <div className="relative w-fit">
          {/* Hard black shadow — always below */}
          <div
            className="absolute bg-black"
            style={{ inset: 0, transform: "translate(5px, 5px)" }}
          />
          {/* Title card — snaps into shadow on hover */}
          <motion.div
            className="relative z-10 bg-[#F5F5F3] overflow-hidden cursor-default"
            initial="idle"
            whileHover="hovered"
          >
            {/* Yellow flood inside the card */}
            <motion.span
              className="absolute inset-0 bg-[#fee21e] origin-left pointer-events-none"
              variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
              transition={SPRING_HOVER}
            />
            <motion.h3
              className="relative z-10 font-black uppercase px-1"
              style={{
                fontFamily:    "var(--font-space-grotesk)",
                fontSize:      "clamp(2.6rem, 7vw, 8.5rem)",
                letterSpacing: "-0.03em",
                lineHeight:    0.86,
              }}
              variants={{ idle: { x: 0, y: 0 }, hovered: { x: 5, y: 5 } }}
              transition={SPRING_HOVER}
            >
              {project.title}
            </motion.h3>
          </motion.div>
        </div>
      </div>

      {/* Blueprint ghost behind the copy block */}
      <div className="relative mt-8">
        {Blueprint && (
          <motion.div
            className="absolute right-0 top-0 w-[38%] h-full opacity-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.09 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.4 }}
          >
            <Blueprint />
          </motion.div>
        )}

        <motion.div
          className="border-t border-black/10 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 pt-8 ${isRight ? "" : "lg:pl-[8%]"}`}>
          <p className="font-mono text-[0.68rem] leading-[1.9] text-black/45 max-w-lg">
            {project.description}
          </p>
          <div className="flex flex-col gap-5 shrink-0 justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {project.tags.slice(0, 5).map((t) => <Tag key={t} label={t} />)}
              {project.tags.length > 5 && (
                <span className="font-mono text-[0.4rem] text-black/18">
                  +{project.tags.length - 5}
                </span>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              {project.github && (
                <EditorialLink href={project.github} label="GITHUB ↗" />
              )}
              {"demo" in project && project.demo && (
                <EditorialLink href={project.demo as string} label="LIVE ↗" accent="#ff2d87" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
const FEATURED_ID  = 9;
const SHOWCASE_IDS = [10, 0, 1];

export default function StoryProjects() {
  const featured = projectsData.projects.find((p) => p.id === FEATURED_ID)!;
  const showcase = SHOWCASE_IDS
    .map((id) => projectsData.projects.find((p) => p.id === id))
    .filter(Boolean) as Project[];

  return (
    <section
      id="projects"
      className="px-6 sm:px-10 lg:px-16 border-t border-black/8 pt-28 pb-24"
    >
      {/* Chapter marker */}
      <motion.div
        className="flex items-center gap-6 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <span className="font-mono text-[0.42rem] tracking-[0.28em] text-black/22">
          // CHAPTER 02
        </span>
        <div className="flex-1 border-t border-black/8" />
        <span className="font-mono text-[0.5rem] tracking-[0.24em] text-black/32">
          SELECTED BUILDS
        </span>
      </motion.div>

      <FeaturedProject project={featured} />

      <div>
        {showcase.map((project, i) => (
          <ShowcaseProject key={project.id} project={project} index={i} />
        ))}
        <div className="border-t border-black/8" />
      </div>
    </section>
  );
}
