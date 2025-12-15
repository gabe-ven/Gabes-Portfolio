"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

const menuItems = [
  { name: "Home", id: "hero", color: "bg-yellow-400" },
  { name: "About Me", id: "about", color: "bg-blue-500" },
  { name: "Experience", id: "experience", color: "bg-cyan-400" },
  { name: "Projects", id: "projects", color: "bg-blue-600" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  scrollToSection,
}: MobileMenuProps) {
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
            className="fixed top-0 right-0 bottom-0 w-full max-w-md h-full bg-orange-500 p-12 overflow-y-auto z-50 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
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
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
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



