"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TABS = [
  { label: "index.js",        id: "hero",       ext: "js"   },
  { label: "about.md",        id: "about",      ext: "md"   },
  { label: "experience.json", id: "experience", ext: "json" },
  { label: "projects.ts",     id: "projects",   ext: "ts"   },
  { label: "contact.tsx",     id: "contact",    ext: "tsx"  },
] as const;

const EXT_COLOR: Record<string, string> = {
  js:   "#f7df1e",
  md:   "#9ca3af",
  json: "#a78bfa",
  ts:   "#60a5fa",
  tsx:  "#34d399",
};

export default function Header() {
  const [activeId, setActiveId] = useState<string>("hero");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let found = "hero";
      TABS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top + window.scrollY <= mid) found = id;
      });
      setActiveId(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
        {TABS.map(({ label, id, ext }) => {
          const isActive = activeId === id;
          const dotColor = EXT_COLOR[ext];
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="cursor-target relative flex items-center gap-1.5 px-3.5 py-2.5 shrink-0 font-mono text-[0.65rem] tracking-wide transition-colors duration-150"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.06)",
                background: isActive ? "rgba(255,255,255,0.055)" : "transparent",
                color: isActive ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.32)",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-150"
                style={{ background: isActive ? dotColor : "rgba(255,255,255,0.18)" }}
              />
              {label}

              {isActive && (
                <motion.span
                  layoutId="header-tab-line"
                  className="absolute bottom-0 inset-x-0 h-px"
                  style={{ background: dotColor }}
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
