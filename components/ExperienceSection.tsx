"use client";

import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const experiences = [
  {
    title: "Software Engineer Associate",
    company: "AI Student Collective",
    period: "Oct 2025 – Present",
    index: "01",
    bg: "#1e0f45",
  },
  {
    title: "Frontend Developer",
    company: "#include at Davis",
    period: "Oct 2025 – Present",
    index: "02",
    bg: "#0f1e45",
  },
  {
    title: "Software Engineer Intern",
    company: "NASA Jet Propulsion Laboratory",
    period: "Jun 2025 – Sep 2025",
    index: "03",
    bg: "#1e0f36",
  },
  {
    title: "Software Engineer Intern",
    company: "NASA Jet Propulsion Laboratory",
    period: "Feb 2025 – Jun 2025",
    index: "04",
    bg: "#0f2036",
  },
  {
    title: "Math Instructor",
    company: "Mathnasium",
    period: "Aug 2022 – Aug 2024",
    index: "05",
    bg: "#20100f",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="snap-start relative"
      style={{ background: "#06000e", minHeight: "100vh" }}
    >
      {/* Purple radial glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 40%, rgba(168,85,247,0.14) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 85% 20%, rgba(139,92,246,0.07) 0%, transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section title */}
      <div className="relative z-10 flex items-center gap-4 px-8 pt-24">
        <motion.div
          style={{ color: "#a855f7" }}
          className="text-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
          My Experience
        </h2>
      </div>

      {/* ScrollStack — window scroll, one card visible at first */}
      <div className="relative z-10">
        <ScrollStack useWindowScroll={true}>
          {experiences.map((exp) => (
            <ScrollStackItem key={exp.index}>
              <div
                style={{
                  background: exp.bg,
                  height: "100%",
                  borderRadius: "40px",
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Top: index */}
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(168,85,247,0.5)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {exp.index} / {experiences.length.toString().padStart(2, "0")}
                </span>

                {/* Bottom: content */}
                <div>
                  <h3
                    className="font-bold text-white"
                    style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", marginBottom: "0.5rem", lineHeight: 1.2 }}
                  >
                    {exp.company}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span
                      className="font-mono text-white/50"
                      style={{ fontSize: "0.75rem", letterSpacing: "0.04em" }}
                    >
                      {exp.title}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.65rem",
                        color: "rgba(168,85,247,0.8)",
                        background: "rgba(168,85,247,0.12)",
                        border: "1px solid rgba(168,85,247,0.25)",
                        borderRadius: "999px",
                        padding: "0.2em 0.8em",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
