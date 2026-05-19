"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
  experience: {
    title: string;
    company: string;
    period: string;
  };
  index: number;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      className="cursor-target group p-6 rounded-xl border border-white/5 cursor-pointer will-change-transform"
      whileHover={{
        x: 8,
        borderColor: "rgba(168, 85, 247, 0.5)",
        backgroundColor: "rgba(168, 85, 247, 0.03)",
        transition: { duration: 0.15 },
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <div>
          <h3 className="text-xl font-bold mb-1 transition-colors duration-100 group-hover:text-[#a855f7]">
            {experience.company}
          </h3>
          <p className="text-gray-400">{experience.title}</p>
        </div>
        <span
          className="text-sm font-medium whitespace-nowrap"
          style={{ color: "#a855f7" }}
        >
          {experience.period}
        </span>
      </div>
    </motion.div>
  );
}
