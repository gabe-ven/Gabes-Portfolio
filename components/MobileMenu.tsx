"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

const menuItems = [
  { name: "Home", id: "hero" },
  { name: "About Me", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
];

const SECTION_COLORS = [
  { id: "hero", color: "#E63946" },
  { id: "about", color: "#10b981" },
  { id: "experience", color: "#a855f7" },
  { id: "tech", color: "#22d3ee" },
  { id: "projects", color: "#f59e0b" },
  { id: "contact", color: "#1d4ed8" },
];

function useSectionAccent() {
  const [accent, setAccent] = useState(SECTION_COLORS[0]);

  const computeAccent = useMemo(() => {
    return () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.35;
      for (const section of SECTION_COLORS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (scrollMid >= top && scrollMid < bottom) {
          setAccent(section);
          return;
        }
      }
    };
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const handle = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        computeAccent();
      });
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [computeAccent]);

  return accent;
}

export default function MobileMenu({
  isOpen,
  onClose,
  scrollToSection,
}: MobileMenuProps) {
  const accent = useSectionAccent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed overlay - clickable to close menu */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md h-full p-12 overflow-y-auto z-50 shadow-2xl"
            style={{
              backgroundColor: accent.color,
              transition: "background-color 0.25s ease",
            }}
            initial={{ x: "100%", rotateY: 45 }}
            animate={{ x: 0, rotateY: 0 }}
            exit={{ x: "100%", rotateY: 45 }}
            transition={{
              type: "spring",
              duration: 0.8,
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="flex flex-col h-full">
              {/* Social Section */}
              <div className="mb-16">
                <h3 className="text-white/60 uppercase tracking-wider text-sm mb-6">
                  Social
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://github.com/gabe-ven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white text-xl hover:translate-x-2 transition-transform"
                  >
                    Github
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gabriel-venezia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white text-xl hover:translate-x-2 transition-transform"
                  >
                    Linkedin
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white text-xl hover:translate-x-2 transition-transform"
                  >
                    RESUME
                  </a>
                </div>
              </div>

              {/* Menu Section */}
              <div className="mb-auto">
                <h3 className="text-white/60 uppercase tracking-wider text-sm mb-6">
                  Menu
                </h3>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 text-white text-xl hover:translate-x-2 transition-transform w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-16">
                <h3 className="text-white/60 uppercase tracking-wider text-sm mb-4">
                  Get in Touch
                </h3>
                <a
                  href="mailto:gabrielvenezia6@gmail.com"
                  className="text-white text-lg hover:underline"
                >
                  gabrielvenezia6@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}





