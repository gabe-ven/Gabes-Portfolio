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

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <motion.div
      className="group flex items-center gap-4 cursor-pointer will-change-transform"
      whileHover={{ x: 8, transition: { duration: 0.1 } }}
    >
      <motion.div
        className="w-12 h-12 flex-shrink-0"
        style={{ color: skill.color }}
        whileHover={{ scale: 1.15, transition: { duration: 0.15 } }}
      >
        {getIcon(skill.icon)}
      </motion.div>
      <span className="text-xl font-medium text-white transition-colors duration-75 group-hover:text-[#22d3ee]">
        {skill.name}
      </span>
    </motion.div>
  );
}
