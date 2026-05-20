"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Dock from "./Dock";
import type { DockItemData } from "./Dock";
import Shuffle from "./Shuffle";
import { useHeroAboutBlend } from "./HeroAboutBlend";
import LogoLoop from "./LogoLoop";
import { buildSkillLogos } from "@/lib/skillLogos";
import { ContainerScroll } from "./ui/container-scroll-animation";

const SKILL_LOGOS = buildSkillLogos();

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Constants ────────────────────────────────────────────────────────────────

const TAGS = ["Software Engineer", "CS + Tech Management", "UC Davis"] as const;


const DOCK_ITEMS: DockItemData[] = [
  {
    label: "GitHub",
    onClick: () => window.open("https://github.com/gabrielvenezia", "_blank"),
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    onClick: () => window.open("https://linkedin.com/in/gabriel-venezia", "_blank"),
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Resume",
    onClick: () =>
      window.open(
        "https://drive.google.com/file/d/1M2f4Jtjt3ClnlvAFg-0S6XKrEl72Tk_H/view?usp=sharing",
        "_blank"
      ),
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

// One Dark Pro palette tokens
const C = {
  comment: "#4d5566",
  keyword: "#c678dd",
  variable: "#e5c07b",
  string: "#98c379",
  punct: "#abb2bf",
  fn: "#61afef",
  dim: "rgba(255,255,255,0.16)",
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function BlockCursor() {
  return (
    <span
      className="inline-block w-[0.52em] h-[1.05em] align-middle relative top-[-0.05em] bg-current"
      style={{ animation: "blink 1.1s step-start infinite" }}
      aria-hidden="true"
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  useHeroAboutBlend(); // keep context subscription active for sibling components
  const [tagsVisible, setTagsVisible]     = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTagsVisible(true), 1450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!tagsVisible) return;
    const t = setTimeout(() => setPromptVisible(true), 900);
    return () => clearTimeout(t);
  }, [tagsVisible]);

  const statusLn = promptVisible ? 9 : tagsVisible ? 3 : 1;

  return (
    <section
      id="hero"
      className="snap-start overflow-hidden relative flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-4"
      style={{ height: "100vh", scrollSnapStop: "always" }}
    >
      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* ══════════════════════════════════════════════
            Terminal Window (wrapped in ContainerScroll for 3D entrance)
        ══════════════════════════════════════════════ */}
        <ContainerScroll mode="inline">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "rgba(9, 9, 14, 0.87)",
            backdropFilter: "blur(28px) saturate(1.5)",
            WebkitBackdropFilter: "blur(28px) saturate(1.5)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03) inset," +
              "0 1px 0 rgba(255,255,255,0.07) inset," +
              "0 28px 90px rgba(0,0,0,0.65)," +
              "0 6px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* ── Title Bar ─────────────────────────────── */}
          <div
            className="flex items-center px-4 py-[10px] gap-3"
            style={{
              background: "rgba(16, 16, 24, 0.96)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span
                className="w-3 h-3 rounded-full bg-[#ff5f57]"
                style={{ boxShadow: "0 0 7px rgba(255,95,87,0.55)" }}
              />
              <span
                className="w-3 h-3 rounded-full bg-[#febc2e]"
                style={{ boxShadow: "0 0 7px rgba(254,188,46,0.45)" }}
              />
              <span
                className="w-3 h-3 rounded-full bg-[#28c840]"
                style={{ boxShadow: "0 0 7px rgba(40,200,64,0.45)" }}
              />
            </div>
            <div className="flex-1 flex justify-center">
              <span
                className="font-mono text-[0.62rem] tracking-[0.14em] select-none"
                style={{ color: C.dim }}
              >
                ~/portfolio/gabriel.dev{" "}
                <span style={{ color: "rgba(255,255,255,0.1)" }}>— bash</span>
              </span>
            </div>
            <div className="w-[3.25rem]" aria-hidden="true" />
          </div>

          {/* ── Name Panel ────────────────────────────── */}
          {/* Big pixel-font name via Shuffle — the visual centrepiece */}
          <div
            className="flex flex-col items-center px-6 pt-4 pb-3 gap-0 select-none"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* "// name" hint */}
            <span
              className="font-mono text-[0.6rem] mb-3 self-start"
              style={{ color: C.comment }}
              aria-hidden="true"
            >
              {"// name"}
            </span>

            {/* GABRIEL */}
            <div
              className="text-white"
              style={{
                fontSize: "clamp(1.3rem, 5vw, 2.4rem)",
                lineHeight: 1.3,
                letterSpacing: "0.06em",
                textShadow: "0 0 40px rgba(255,255,255,0.08)",
              }}
            >
              <Shuffle
                text="GABRIEL"
                tag="span"
                textAlign="center"
                shuffleDirection="right"
                animationMode="evenodd"
                stagger={0.04}
                duration={0.42}
                threshold={0.05}
                rootMargin="0px"
                triggerOnce={true}
                triggerOnHover={true}
              />
            </div>

            {/* VENEZIA */}
            <div
              className="text-white"
              style={{
                fontSize: "clamp(1.3rem, 5vw, 2.4rem)",
                lineHeight: 1.3,
                letterSpacing: "0.06em",
                textShadow: "0 0 40px rgba(255,255,255,0.08)",
              }}
            >
              <Shuffle
                text="VENEZIA"
                tag="span"
                textAlign="center"
                shuffleDirection="left"
                animationMode="evenodd"
                stagger={0.04}
                duration={0.42}
                threshold={0.05}
                rootMargin="0px"
                triggerOnce={true}
                triggerOnHover={true}
                onShuffleComplete={() => setTagsVisible(true)}
              />
            </div>
          </div>

          {/* ── Code Panel ────────────────────────────── */}
          <div
            className="relative font-mono"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            <div className="flex text-xs sm:text-sm">
              {/* Line numbers */}
              <div
                className="select-none py-3 pl-3 pr-3 text-right leading-6 shrink-0"
                style={{
                  color: C.dim,
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  minWidth: "2.6rem",
                  fontSize: "0.6rem",
                }}
                aria-hidden="true"
              >
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i + 1}>{i + 1}</div>
                ))}
              </div>

              {/* Code lines */}
              <div className="py-3 pl-5 pr-5 sm:pr-8 flex-1 leading-6 overflow-x-auto">

                {/* L1 */}
                <div>
                  <span style={{ color: C.comment }}>
                    {"// portfolio.dev — gabriel venezia"}
                  </span>
                </div>

                {/* L2 blank */}
                <div aria-hidden="true">&nbsp;</div>

                {/* L3-L7 tags array */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: tagsVisible ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* L3 */}
                  <div>
                    <span style={{ color: C.keyword }}>const </span>
                    <span style={{ color: C.variable }}>tags </span>
                    <span style={{ color: C.punct }}>= [</span>
                  </div>
                  {/* L4-L6 */}
                  {TAGS.map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{
                        opacity: tagsVisible ? 1 : 0,
                        x: tagsVisible ? 0 : -8,
                      }}
                      transition={{
                        duration: 0.26,
                        delay: tagsVisible ? 0.08 + i * 0.1 : 0,
                      }}
                    >
                      <span style={{ color: C.punct }}>&nbsp;&nbsp;</span>
                      <span style={{ color: C.string }}>&quot;{tag}&quot;</span>
                      <span style={{ color: C.punct }}>,</span>
                    </motion.div>
                  ))}
                  {/* L7 */}
                  <div>
                    <span style={{ color: C.punct }}>];</span>
                  </div>
                </motion.div>

                {/* L8 blank */}
                <div aria-hidden="true">&nbsp;</div>

                {/* L9 prompt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: promptVisible ? 1 : 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <span style={{ color: C.string }}>gabriel</span>
                  <span style={{ color: C.punct }}>@</span>
                  <span style={{ color: C.fn }}>ucdavis</span>
                  <span style={{ color: C.punct }}>:~$ </span>
                  {promptVisible && <BlockCursor />}
                </motion.div>

              </div>
            </div>
          </div>

          {/* ── Status Bar ────────────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-[5px] font-mono"
            style={{
              background: "rgba(12, 12, 20, 0.98)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="flex items-center gap-3.5 text-[0.57rem] tracking-wider"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              <span className="flex items-center gap-1">
                <span style={{ color: C.string }}>⬡</span>
                main
              </span>
              <span>TypeScript</span>
            </div>
            <div
              className="flex items-center gap-3.5 text-[0.57rem] tracking-wider"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              <span>UTF-8</span>
              <span>Ln {statusLn}, Col 1</span>
            </div>
          </div>
        </div>
        </ContainerScroll>

        {/* ══════════════════════════════════════════════
            Dock
        ══════════════════════════════════════════════ */}
        <motion.div
          className="mt-3 w-full"
          style={{ height: 90 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Dock
            items={DOCK_ITEMS}
            panelHeight={48}
            baseItemSize={40}
            magnification={58}
            dockHeight={90}
            distance={160}
          />
        </motion.div>

        {/* ══════════════════════════════════════════════
            Skills marquee
        ══════════════════════════════════════════════ */}
        <motion.div
          className="mt-5 mx-auto w-full max-w-3xl"
          style={{ height: 64 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoLoop
            logos={SKILL_LOGOS}
            speed={80}
            direction="left"
            logoHeight={44}
            gap={56}
            pauseOnHover={false}
            constantVelocity
            scaleOnHover
            className="hero-skills-loop"
            ariaLabel="Skills and technologies"
          />
        </motion.div>

        {/* ══════════════════════════════════════════════
            Scroll hint
        ══════════════════════════════════════════════ */}
        <motion.div
          className="mt-2 flex justify-center pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.div
            animate={{ y: [0, 7, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/35"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
