"use client";

import Image from "next/image";
import ScrollVelocity from "./ScrollVelocity";
import CardSwap, { Card } from "./CardSwap";

const EXPERIENCES = [
  {
    index: "01",
    company: "BS Code",
    role: "Software Engineer Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Tokyo, Japan",
    logo: "/logos/bscode-logo.png",
    tags: ["TypeScript", "React", "Software Engineering"],
    upcoming: true,
  },
  {
    index: "02",
    company: "GenServe.AI",
    role: "AI Platform Testing Intern",
    period: "Jan 2026 – Apr 2026",
    location: "Remote",
    logo: "/logos/genserve.jpeg",
    tags: ["AI", "Testing", "QA"],
  },
  {
    index: "03",
    company: "AI Collective",
    role: "Software Engineer Associate",
    period: "Oct 2025 – Present",
    location: "Davis, CA",
    logo: "/logos/aicollective.png",
    tags: ["AI", "LLMs", "Python", "Next.js"],
  },
  {
    index: "04",
    company: "#include at Davis",
    role: "Frontend Developer",
    period: "Oct 2025 – Present",
    location: "Davis, CA",
    logo: "/logos/include.jpeg",
    circular: true,
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    index: "05",
    company: "NASA JPL",
    role: "Software Engineer Intern",
    period: "Feb 2025 – Sep 2026",
    location: "Pasadena, CA",
    logo: "/logos/nasa_jpl.jpg",
    tags: ["Python", "C++", "Systems"],
  },
  {
    index: "06",
    company: "Mathnasium",
    role: "Math Instructor",
    period: "Aug 2022 – Aug 2024",
    location: "La Cañada, CA",
    logo: "/logos/mathnasium-logo-freelogovectors.net_.png",
    tags: ["Teaching", "Curriculum Design"],
  },
] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      className="flex flex-col overflow-hidden"
      style={{ background: "var(--color-bg)", minHeight: "100svh", transition: "background 0.3s ease" }}
    >
      {/* Title — fixed at the top, never overlapped */}
      <div className="shrink-0 pt-14 pb-2 pointer-events-none select-none">
        <ScrollVelocity
          texts={["Experience ✦", "Experience ✦"]}
          velocity={60}
          className="font-bold text-[#0d0d0d] dark:text-[#F5F5F3]"
          parallaxStyle={{ fontFamily: "var(--font-space-grotesk)" }}
          scrollerStyle={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
          damping={40}
          stiffness={300}
          numCopies={5}
          velocityMapping={{ input: [0, 800], output: [0, 8] }}
        />
      </div>

      {/* Card area — flex-1 fills remaining height; CardSwap anchors to its bottom-right.
          No overflow constraint here — cards stack upward via GSAP and must not be clipped. */}
      <div className="flex-1 relative" style={{ minHeight: "580px" }}>
        <CardSwap
          width={860}
          height={640}
          cardDistance={48}
          verticalDistance={52}
          delay={3500}
          pauseOnHover={false}
          skewAmount={5}
          easing="elastic"
        >
        {EXPERIENCES.map((exp) => (
          <Card
            key={exp.company}
            style={{
              background: "#141210",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="h-full flex flex-col overflow-hidden"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {/* ── Header bar — always visible above stacked cards ── */}
              <div
                className="shrink-0 flex items-center gap-3 px-6 py-[14px]"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#D97D5B] shrink-0" />
                <p className="text-sm font-semibold text-white truncate leading-none">
                  {exp.company}
                </p>
                <span className="text-white/20 text-xs">·</span>
                <p className="text-xs text-white/45 truncate leading-none flex-1">
                  {exp.role}
                </p>
                {"upcoming" in exp && exp.upcoming && (
                  <span
                    className="shrink-0 text-[8px] font-semibold tracking-widest uppercase
                      px-2 py-0.5 rounded-full border border-[#D97D5B]/50 text-[#D97D5B]"
                    style={{ background: "rgba(217,125,91,0.08)" }}
                  >
                    Soon
                  </span>
                )}
              </div>

              {/* ── White logo area — fills middle ── */}
              <div className="relative flex-1 bg-white overflow-hidden">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  fill
                  className={"circular" in exp && exp.circular
                    ? "object-contain p-10"
                    : "object-contain p-8"}
                  sizes="860px"
                />
              </div>

              {/* ── Footer ── */}
              <div
                className="shrink-0 px-6 py-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-mono text-white/40 tabular-nums">{exp.period}</p>
                  <p className="text-xs text-white/25">{exp.location}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2.5 py-0.5 rounded-full text-white/35"
                      style={{ border: "1px solid rgba(255,255,255,0.09)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
        </CardSwap>
      </div>
    </section>
  );
}
