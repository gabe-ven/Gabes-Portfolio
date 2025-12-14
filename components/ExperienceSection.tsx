"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

const experiences = [
  {
    title: "Software Engineer Associate",
    company: "AI Student Collective",
    period: "Dec 2024 - Present",
  },
  {
    title: "Frontend Developer",
    company: "#include at Davis",
    period: "Oct 2023 - Nov 2024",
  },
  {
    title: "Software Engineer Intern",
    company: "NASA Jet Propulsion Laboratory",
    period: "Jun 2025 - Sep 2025",
  },
  {
    title: "Software Engineer Intern",
    company: "NASA Jet Propulsion Laboratory",
    period: "Feb 2025 - Jun 2025",
  },
  {
    title: "Math Instructor",
    company: "Mathnasium",
    period: "Aug 2022 - Aug 2024",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className="text-orange-500 text-4xl spin-slow">✦</div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
            My Experience
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

