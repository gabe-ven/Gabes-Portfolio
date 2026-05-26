"use client";

import { motion } from "motion/react";

const SPRING = { type: "spring" as const, stiffness: 360, damping: 28 };

const EXPERIENCE = [
  {
    num: "01",
    org: "NASA JPL",
    role: "Research Intern",
    period: "2025",
    desc: "Built RAG chatbots and digital twins for planetary science data pipelines. NLP-driven Q&A over terabytes of mission datasets.",
    tech: ["Python", "LangChain", "NLP", "AWS"],
    link: null as string | null,
  },
  {
    num: "02",
    org: "Genserve.AI",
    role: "Software Intern",
    period: "2024–25",
    desc: "Full-stack feature development on an AI-powered energy infrastructure platform. End-to-end API design and production React UI.",
    tech: ["React", "Node.js", "REST APIs", "PostgreSQL"],
    link: null as string | null,
  },
  {
    num: "03",
    org: "twiice",
    role: "Lead Frontend",
    period: "2024",
    desc: "AI wardrobe app reducing clothing overconsumption. CLIP multimodal embeddings + FAISS ANN similarity search at scale.",
    tech: ["React Native", "Expo", "Flask", "CLIP", "FAISS"],
    link: "https://github.com/AICollectiveDavis/clothing-overconsumption-preventer",
  },
  {
    num: "04",
    org: "#include",
    role: "Web Developer",
    period: "2024",
    desc: "Built product info pages and cart for Yesterday Vintage. 5k+ monthly visitors in production at yesterdaydavis.com.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
    link: "https://github.com/include-davis/yesterday-vintage",
  },
];

const DOT_MATRIX = {
  backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.09) 1px, transparent 1px)",
  backgroundSize: "10px 10px",
};

export default function NeoExperience() {
  return (
    <section id="experience" className="border-b-2 border-black">

      {/* Title block */}
      <div className="grid grid-cols-[1fr_auto] border-b border-black">
        <div className="flex items-center gap-3 px-6 sm:px-10 py-3 border-r border-black">
          <span className="font-mono text-[0.48rem] text-black/22">§</span>
          <span className="font-mono text-[0.6rem] tracking-widest">EXPERIENCE</span>
          <span className="font-mono text-[0.48rem] text-black/22 ml-2">/ INTERNSHIPS + PROJECTS</span>
        </div>
        <div className="flex items-center px-4 sm:px-6 py-3 gap-4">
          <span className="font-mono text-[0.48rem] tracking-widest text-black/22">SHEET EX-01</span>
          <span className="font-mono text-[0.48rem] tracking-widest text-black/16 hidden sm:block">REV.01</span>
        </div>
      </div>

      {/* Vertical label + cards */}
      <div className="flex">

        {/* Rotated side label */}
        <div
          className="hidden sm:flex shrink-0 w-10 border-r border-black items-center justify-center"
          style={{ writingMode: "vertical-rl" }}
        >
          <span
            className="font-mono text-[0.4rem] tracking-widest text-black/20 py-6 select-none"
            style={{ transform: "rotate(180deg)" }}
          >
            01 / EXPERIENCE · INTERNSHIPS &amp; PROFESSIONAL PATH
          </span>
        </div>

        {/* Cards grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          {EXPERIENCE.map(({ num, org, role, period, desc, tech, link }, i) => (
            <motion.div
              key={num}
              className="flex flex-col gap-4 px-6 sm:px-7 py-9 group relative overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...SPRING, delay: i * 0.1 }}
            >
              {/* Dot-matrix layer — reveals on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={DOT_MATRIX}
              />

              {/* Index + period */}
              <div className="flex items-center justify-between relative">
                <span className="font-mono text-[0.46rem] tracking-widest text-black/20">{num}</span>
                <span className="font-mono text-[0.46rem] tracking-widest text-black/20">{period}</span>
              </div>

              {/* Org + role */}
              <div className="relative">
                <p
                  className="font-black uppercase tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1rem, 2vw, 1.12rem)" }}
                >
                  {org}
                </p>
                <p className="font-mono text-[0.5rem] tracking-widest mt-1 text-black/36">{role}</p>
              </div>

              {/* Description */}
              <p className="font-mono text-[0.65rem] leading-relaxed flex-1 text-black/52 relative">{desc}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1 border-t border-black/10 pt-3 relative">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.44rem] tracking-wide border border-black/22 px-1.5 py-0.5
                               hover:bg-[#fee21e] hover:border-black cursor-default transition-colors duration-75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA — pops to yellow on group-hover */}
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="relative border border-black/28 px-3 py-1.5 font-mono text-[0.46rem] tracking-widest w-fit
                             group-hover:bg-[#fee21e] group-hover:border-black group-hover:text-black
                             transition-colors duration-75"
                >
                  VIEW DETAILS →
                </a>
              ) : (
                <span
                  className="relative border border-black/28 px-3 py-1.5 font-mono text-[0.46rem] tracking-widest w-fit
                             cursor-default
                             group-hover:bg-[#fee21e] group-hover:border-black group-hover:text-black
                             transition-colors duration-75"
                >
                  VIEW DETAILS →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom dimension line */}
      <div className="border-t border-black/10 flex items-center px-6 sm:px-10 py-2 gap-3">
        <span className="font-mono text-[0.4rem] text-black/13">|←</span>
        <div className="flex-1 border-t border-dashed border-black/10" />
        <span className="font-mono text-[0.4rem] text-black/18 tracking-widest">4 ENTRIES · 2024–2025</span>
        <div className="flex-1 border-t border-dashed border-black/10" />
        <span className="font-mono text-[0.4rem] text-black/13">→|</span>
      </div>
    </section>
  );
}
