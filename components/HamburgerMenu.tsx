"use client";

import { motion } from "framer-motion";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerMenuProps) {
  return (
    <motion.div
      className="fixed top-6 right-6 z-[60] w-12 h-12 flex flex-col items-center justify-center gap-2 cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="w-6 h-0.5 rounded-full"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 5 : 0,
          backgroundColor: isOpen ? "#ffffff" : "#ffffff",
        }}
        variants={{
          hover: { x: isOpen ? 0 : 3 },
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-6 h-0.5 rounded-full"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -5 : 0,
          backgroundColor: isOpen ? "#ffffff" : "#ffffff",
        }}
        variants={{
          hover: { x: isOpen ? 0 : -3 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}







