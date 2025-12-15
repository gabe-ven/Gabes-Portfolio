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

export default function ExperienceCard({
  experience,
  index,
}: ExperienceCardProps) {
  return (
    <motion.div
      className="group p-6 rounded-xl border border-white/5 cursor-pointer will-change-transform"
      initial={{
        opacity: 0,
        x: -30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: false, amount: 0.3, margin: "0px 0px -50px 0px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        x: 8,
        borderColor: "rgba(230, 57, 70, 0.5)",
        backgroundColor: "rgba(230, 57, 70, 0.03)",
        transition: {
          duration: 0.15,
        },
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <div>
          <h3
            className="text-xl font-bold mb-1 transition-colors duration-100 group-hover:text-[#E63946]"
          >
            {experience.company}
          </h3>
          <p className="text-gray-400">{experience.title}</p>
        </div>
        <span
          className="text-sm font-medium whitespace-nowrap"
          style={{ color: "#E63946" }}
        >
          {experience.period}
        </span>
      </div>
    </motion.div>
  );
}





