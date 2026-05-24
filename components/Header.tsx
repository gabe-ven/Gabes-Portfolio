"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TABS = [
  { label: "home",       id: "hero"       },
  { label: "about",      id: "about"      },
  { label: "experience", id: "experience" },
  { label: "projects",   id: "projects"   },
  { label: "photos",     id: "photos"     },
] as const;

export default function Header() {
  const [activeId, setActiveId] = useState<string>("hero");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.5;
      let current: (typeof TABS)[number]["id"] = TABS[0].id;
      for (const { id } of TABS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 pointer-events-none"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        className="pointer-events-auto flex items-stretch rounded-xl overflow-hidden overflow-x-auto scrollbar-none"
        style={{
          background: "rgba(11, 11, 17, 0.9)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
          scrollbarWidth: "none",
        }}
      >
        {TABS.map(({ label, id }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="cursor-target relative flex items-center px-4 py-2.5 shrink-0 font-mono text-[0.65rem] tracking-wide transition-colors duration-150"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.06)",
                background: isActive ? "rgba(255,255,255,0.055)" : "transparent",
                color: isActive ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.32)",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              {label}

              {isActive && (
                <motion.span
                  layoutId="header-tab-line"
                  className="absolute bottom-0 inset-x-0 h-px bg-white/50"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.38 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
