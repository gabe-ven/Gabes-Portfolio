"use client";

import { motion } from "motion/react";

const SPRING_IN    = { type: "spring" as const, stiffness: 55,  damping: 18 };
const SPRING_HOVER = { type: "spring" as const, stiffness: 350, damping: 20 };

// ── Blueprint wireframe SVGs — shown at ~10% opacity behind each entry ────────

function BlueprintRAG() {
  return (
    <svg viewBox="0 0 300 100" aria-hidden className="w-full h-full">
      {/* Grid */}
      {[0, 25, 50, 75, 100].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="300" y2={y} stroke="black" strokeWidth="0.4" strokeDasharray="3 8" />
      ))}
      {[0, 60, 120, 180, 240, 300].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="black" strokeWidth="0.4" strokeDasharray="3 8" />
      ))}
      {/* Pipeline nodes */}
      {[
        { x: 18,  label: ["QUERY"] },
        { x: 78,  label: ["EMBED"] },
        { x: 138, label: ["VECTOR", "DB"] },
        { x: 198, label: ["LLM"] },
        { x: 258, label: ["RESP-", "ONSE"] },
      ].map(({ x, label }) => (
        <g key={x}>
          <rect x={x - 22} y={36} width={44} height={28} rx={1} fill="none" stroke="black" strokeWidth="0.5" />
          {label.map((ln, i) => (
            <text key={ln} x={x} y={52 + i * 8} textAnchor="middle" fontSize="5" fill="black" fontFamily="monospace">
              {ln}
            </text>
          ))}
        </g>
      ))}
      {/* Arrows */}
      {[40, 100, 160, 220].map((x) => (
        <g key={x}>
          <line x1={x} y1={50} x2={x + 14} y2={50} stroke="black" strokeWidth="0.5" />
          <polygon points={`${x + 14},47 ${x + 14},53 ${x + 20},50`} fill="black" />
        </g>
      ))}
      {/* Accent callout dots */}
      <circle cx="78"  cy="50" r="3" fill="black" />
      <circle cx="198" cy="50" r="3" fill="black" />
      {/* Corner coords */}
      <text x="2" y="8"  fontSize="4" fill="black" fontFamily="monospace">0,0</text>
      <text x="276" y="8" fontSize="4" fill="black" fontFamily="monospace">1,0</text>
    </svg>
  );
}

function BlueprintStack() {
  return (
    <svg viewBox="0 0 300 100" aria-hidden className="w-full h-full">
      {[0, 25, 50, 75, 100].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="300" y2={y} stroke="black" strokeWidth="0.4" strokeDasharray="3 8" />
      ))}
      {[0, 75, 150, 225, 300].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="black" strokeWidth="0.4" strokeDasharray="3 8" />
      ))}
      {/* Layers — stacked vertically to show full-stack */}
      {[
        { x: 50,  y: 22, label: ["REACT UI"] },
        { x: 150, y: 22, label: ["REST API"] },
        { x: 250, y: 22, label: ["POSTGRES"] },
        { x: 50,  y: 62, label: ["ENTERPRISE", "CLIENT"] },
        { x: 150, y: 62, label: ["NODE.JS"] },
        { x: 250, y: 62, label: ["AWS"] },
      ].map(({ x, y, label }) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 30} y={y} width={60} height={20} rx={1} fill="none" stroke="black" strokeWidth="0.5" />
          {label.map((ln, i) => (
            <text key={ln} x={x} y={y + 13 + i * 7} textAnchor="middle" fontSize="4.5" fill="black" fontFamily="monospace">
              {ln}
            </text>
          ))}
        </g>
      ))}
      {/* Bidirectional connectors */}
      {[80, 180].map((x) => (
        <g key={x}>
          <line x1={x} y1={30} x2={x + 20} y2={30} stroke="black" strokeWidth="0.5" />
          <line x1={x} y1={72} x2={x + 20} y2={72} stroke="black" strokeWidth="0.5" />
        </g>
      ))}
      <text x="2" y="8" fontSize="4" fill="black" fontFamily="monospace">0,0</text>
      <text x="276" y="8" fontSize="4" fill="black" fontFamily="monospace">1,0</text>
    </svg>
  );
}

function BlueprintCLIP() {
  return (
    <svg viewBox="0 0 300 100" aria-hidden className="w-full h-full">
      {[0, 25, 50, 75, 100].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="300" y2={y} stroke="black" strokeWidth="0.4" strokeDasharray="3 8" />
      ))}
      {[0, 60, 120, 180, 240, 300].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="black" strokeWidth="0.4" strokeDasharray="3 8" />
      ))}
      {/* CLIP pipeline — circles to distinguish from RAG */}
      {[
        { cx: 22,  label: ["IMG"] },
        { cx: 80,  label: ["CLIP"] },
        { cx: 150, label: ["512D", "EMBD"] },
        { cx: 220, label: ["FAISS", "ANN"] },
        { cx: 278, label: ["MATCH"] },
      ].map(({ cx, label }) => (
        <g key={cx}>
          <circle cx={cx} cy={50} r={16} fill="none" stroke="black" strokeWidth="0.5" />
          {label.map((ln, i) => (
            <text key={ln} x={cx} y={50 + (label.length > 1 ? i * 7 - 2 : 4)} textAnchor="middle" fontSize="4.5" fill="black" fontFamily="monospace">
              {ln}
            </text>
          ))}
        </g>
      ))}
      {/* Dashed connectors */}
      {[38, 96, 166, 236].map((x) => (
        <line key={x} x1={x} y1={50} x2={x + 12} y2={50} stroke="black" strokeWidth="0.5" strokeDasharray="2 2" />
      ))}
      <circle cx="80"  cy="50" r="3.5" fill="black" />
      <circle cx="220" cy="50" r="3.5" fill="black" />
      <text x="2" y="8" fontSize="4" fill="black" fontFamily="monospace">0,0</text>
      <text x="276" y="8" fontSize="4" fill="black" fontFamily="monospace">1,0</text>
    </svg>
  );
}

const BLUEPRINTS = [BlueprintRAG, BlueprintStack, BlueprintCLIP, BlueprintStack];

// ── Data ──────────────────────────────────────────────────────────────────────
const LOG = [
  {
    num:    "01",
    org:    "NASA JPL",
    role:   "Research Intern",
    period: "2025",
    desc:   "Built RAG chatbots and digital twins for planetary science data pipelines. NLP-driven Q&A over terabytes of mission datasets using LangChain and AWS.",
    tech:   ["Python", "LangChain", "NLP", "AWS", "Vector DBs"],
    link:   null as string | null,
  },
  {
    num:    "02",
    org:    "Genserve.AI",
    role:   "Software Intern",
    period: "2024–25",
    desc:   "Full-stack feature development on an AI-powered energy infrastructure platform. End-to-end API design and production React UI shipped to enterprise clients.",
    tech:   ["React", "Node.js", "REST APIs", "PostgreSQL"],
    link:   null as string | null,
  },
  {
    num:    "03",
    org:    "twiice",
    role:   "Lead Frontend",
    period: "2024",
    desc:   "Led frontend engineering on an AI wardrobe app reducing clothing overconsumption. CLIP multimodal embeddings + FAISS ANN similarity search.",
    tech:   ["React Native", "Expo", "TypeScript", "Flask", "CLIP", "FAISS"],
    link:   "https://github.com/AICollectiveDavis/clothing-overconsumption-preventer",
  },
  {
    num:    "04",
    org:    "#include at Davis",
    role:   "Web Developer",
    period: "2024",
    desc:   "Built product info pages and shopping cart for Yesterday Vintage. 5k+ monthly visitors in production at yesterdaydavis.com.",
    tech:   ["React", "Next.js", "TypeScript", "Tailwind"],
    link:   "https://github.com/include-davis/yesterday-vintage",
  },
];

// ── Experience row with blueprint behind ──────────────────────────────────────
function ExperienceRow({ entry, index }: { entry: (typeof LOG)[number]; index: number }) {
  const Blueprint = BLUEPRINTS[index % BLUEPRINTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...SPRING_IN, delay: index * 0.07 }}
    >
      <motion.div
        className="relative overflow-hidden border-t border-black/8 cursor-default"
        initial="idle"
        whileHover="hovered"
      >
        {/* Blueprint ghost — resting state only (covered by yellow on hover) */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[42%] opacity-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.08, duration: 1.4 }}
        >
          <Blueprint />
        </motion.div>

        {/* Yellow flood — above blueprint, below content */}
        <motion.div
          className="absolute inset-0 bg-[#fee21e] origin-left pointer-events-none z-[1]"
          variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
          transition={SPRING_HOVER}
        />

        {/* Content */}
        <motion.div
          className="relative z-[2] grid grid-cols-[72px_1fr] sm:grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr]
                     gap-6 sm:gap-10 lg:gap-16 py-12 sm:py-14"
          variants={{ idle: { x: 0 }, hovered: { x: 8 } }}
          transition={SPRING_HOVER}
        >
          {/* Period */}
          <div className="pt-1.5">
            <span className="font-mono text-[0.48rem] tracking-widest text-black/35">
              {entry.period}
            </span>
          </div>

          {/* Main */}
          <div>
            {/* Counter + org */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.4rem] tracking-[0.22em] text-black/22">
                {entry.num} //
              </span>
              <h3
                className="font-black tracking-tight"
                style={{
                  fontFamily:    "var(--font-space-grotesk)",
                  fontSize:      "clamp(1.6rem, 3vw, 2.6rem)",
                  letterSpacing: "-0.02em",
                  lineHeight:    0.96,
                }}
              >
                {entry.org}
              </h3>
            </div>

            <p className="font-mono text-[0.48rem] tracking-widest text-black/35 mt-2">
              {entry.role}
            </p>

            <p className="font-mono text-[0.68rem] leading-[1.9] text-black/45 mt-5 max-w-lg">
              {entry.desc}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4">
              {entry.tech.map((t) => (
                <span key={t} className="font-mono text-[0.4rem] tracking-wide text-black/28 uppercase">
                  {t}
                </span>
              ))}
            </div>

            {entry.link && (
              <motion.a
                href={entry.link}
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden inline-flex mt-6 border border-black/22
                           px-3.5 py-1.5 font-mono text-[0.46rem] tracking-widest"
                initial="idle"
                whileHover="hovered"
              >
                <motion.span
                  className="absolute inset-0 bg-black origin-left"
                  variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                  transition={SPRING_HOVER}
                />
                <motion.span
                  className="relative z-10"
                  variants={{ idle: { color: "#000" }, hovered: { color: "#fee21e" } }}
                  transition={{ duration: 0.1 }}
                >
                  VIEW REPO →
                </motion.span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function StoryExperience() {
  return (
    <section
      id="experience"
      className="px-6 sm:px-10 lg:px-16 pt-28 pb-24 border-t border-black/8"
    >
      {/* Chapter marker */}
      <motion.div
        className="flex items-center gap-6 mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <span className="font-mono text-[0.42rem] tracking-[0.28em] text-black/22">
          // CHAPTER 01
        </span>
        <div className="flex-1 border-t border-black/8" />
        <span className="font-mono text-[0.5rem] tracking-[0.24em] text-black/32">
          ARTIFACT LOGS
        </span>
      </motion.div>

      {/* Entries */}
      <div>
        {LOG.map((entry, i) => (
          <ExperienceRow key={entry.num} entry={entry} index={i} />
        ))}
        <div className="border-t border-black/8" />
      </div>
    </section>
  );
}
