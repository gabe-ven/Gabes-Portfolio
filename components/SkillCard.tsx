"use client";

import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
  };
  index: number;
}

const getIcon = (iconName: string) => {
  const iconComponents: {
    [key: string]: React.ComponentType<{ className?: string }>;
  } = { ...Si, ...Fa };
  const Icon = iconComponents[iconName];
  return Icon ? <Icon className="w-full h-full" /> : null;
};

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="group flex items-center gap-4 cursor-pointer will-change-transform"
      initial={{
        opacity: 0,
        x: -30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        duration: 0.5,
        delay: index * 0.015,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        x: 8,
        transition: {
          duration: 0.1,
        },
      }}
    >
      <motion.div
        className="w-12 h-12 flex-shrink-0 transition-transform duration-100"
        style={{
          color: skill.color,
          background: "transparent",
          backgroundColor: "transparent",
        }}
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.15 },
        }}
      >
        {getIcon(skill.icon)}
      </motion.div>
      <span className="text-xl font-medium text-white transition-colors duration-75 group-hover:text-[#22d3ee]">
        {skill.name}
      </span>
    </motion.div>
  );
}
