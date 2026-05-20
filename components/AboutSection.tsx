"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import {
  motion,
  useAnimationControls,
} from "framer-motion";
import ScrambledText from "./ScrambledText";
import { useHeroAboutBlend } from "./HeroAboutBlend";
import Antigravity from "./Antigravity";
import BounceCards from "./BounceCards";
import Noise from "./Noise";
import TiltedCard from "./TiltedCard";
import StarBorder from "./StarBorder";

const ABOUT_PHOTO_SRC = encodeURI(
  "/Screenshot 2026-05-19 at 11.19.35\u202fAM.png",
);

const BOUNCE_CARD_PHOTOS = [
  "/IMG_0217.jpg",
  "/IMG_0216.jpg",
  "/headshot.JPG",
  "/Screenshot 2026-05-19 at 10.44.18\u202fAM.png",
].map(encodeURI);

const BOUNCE_CARD_TRANSFORMS = [
  "rotate(16deg) translate(-48px)",
  "rotate(10deg) translate(-10px)",
  "rotate(4deg) translate(42px)",
  "rotate(-4deg) translate(82px)",
];

// ─── Duck pixel maps ──────────────────────────────────────────────────────────
const K = "#111111", WW = "#FFFFFF", OO = "#E8921A", GG = "#C8C8C8";
const __ = null;
type Px = string | null;
const DUCK_BODY: Px[][] = [
  [__,__,__,__,__,__,__,K,K,K,K,__,__,__,__,__],
  [__,__,__,__,__,__,K,WW,WW,WW,WW,K,__,__,__,__],
  [__,__,__,__,__,__,K,WW,WW,K,WW,WW,K,OO,OO,__],
  [__,__,__,__,__,__,K,WW,WW,WW,WW,WW,K,OO,OO,__],
  [__,__,__,__,__,K,WW,WW,WW,WW,WW,WW,K,__,__,__],
  [__,__,__,__,K,WW,WW,WW,WW,WW,WW,WW,WW,K,__,__],
  [__,__,__,K,WW,WW,WW,GG,GG,WW,WW,WW,WW,WW,K,__],
  [__,__,K,WW,WW,WW,GG,GG,GG,GG,WW,WW,WW,WW,WW,K],
  [__,__,K,WW,WW,WW,WW,GG,GG,WW,WW,WW,WW,WW,K,__],
  [__,__,__,K,WW,WW,WW,WW,WW,WW,WW,WW,WW,K,__,__],
  [__,__,__,__,K,K,WW,WW,WW,WW,WW,K,K,__,__,__],
  [__,__,__,__,__,__,K,K,K,K,K,__,__,__,__,__],
];
const LEGS_A: Px[][] = [
  [__,__,__,__,__,OO,OO,__,__,OO,OO,__,__,__,__,__],
  [__,__,__,__,OO,OO,OO,__,__,OO,OO,OO,__,__,__,__],
];
const LEGS_B: Px[][] = [
  [__,__,__,__,__,__,OO,OO,OO,OO,__,__,__,__,__,__],
  [__,__,__,__,__,OO,OO,OO,OO,OO,OO,__,__,__,__,__],
];
const SPW = 16, SPH = 14, PXSC = 4;

function DuckSprite({ walkFrame }: { walkFrame: 0 | 1 }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const legs = walkFrame === 0 ? LEGS_A : LEGS_B;
    const rows = [...DUCK_BODY, ...legs];
    ctx.clearRect(0, 0, SPW, rows.length);
    rows.forEach((row, y) => row.forEach((color, x) => {
      if (color) { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); }
    }));
  }, [walkFrame]);
  return (
    <canvas ref={ref} width={SPW} height={SPH}
      style={{ width: SPW * PXSC, height: SPH * PXSC, imageRendering: "pixelated", display: "block" }} />
  );
}

const DUCK_W = SPW * PXSC;
const DUCK_H = SPH * PXSC;
const DUCK_TRACK_H = DUCK_H;

// ─── Duck walking on the card's top border ────────────────────────────────────
function TerminalDuck({ containerWidth }: { containerWidth: number }) {
  const [frame, setFrame] = useState<0 | 1>(0);
  const [dir, setDir]     = useState<1 | -1>(1);

  const controls = useAnimationControls();
  const mounted  = useRef(false);
  const walkGen  = useRef(0);
  const posRef   = useRef(0);
  const dirRef   = useRef<1 | -1>(1);
  const legTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const stTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const maxX = Math.max(0, containerWidth - DUCK_W);

  const startLegs = useCallback(() => {
    clearInterval(legTimer.current);
    legTimer.current = setInterval(() => setFrame(f => f === 0 ? 1 : 0), 200);
  }, []);
  const stopLegs = useCallback(() => {
    clearInterval(legTimer.current);
    setFrame(0);
  }, []);

  const walk = useCallback(async (d: 1 | -1, trackWidth: number, gen: number) => {
    if (!mounted.current || gen !== walkGen.current || trackWidth < DUCK_W) return;
    const limit = Math.max(0, trackWidth - DUCK_W);
    const target = d === 1 ? limit : 0;
    const dist   = Math.abs(target - posRef.current);

    dirRef.current = d;
    setDir(d);
    startLegs();
    await controls.start({
      x: target,
      transition: { duration: Math.max(0.1, dist / 70), ease: "linear" },
    });
    if (!mounted.current || gen !== walkGen.current) return;

    posRef.current = target;
    stopLegs();
    await new Promise<void>(r => { stTimer.current = setTimeout(r, 500 + Math.random() * 600); });
    if (!mounted.current || gen !== walkGen.current) return;
    walk(d === 1 ? -1 : 1, trackWidth, gen);
  }, [controls, startLegs, stopLegs]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      walkGen.current += 1;
      clearInterval(legTimer.current);
      clearTimeout(stTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mounted.current || containerWidth < DUCK_W) return;

    walkGen.current += 1;
    const gen = walkGen.current;

    const clamped = Math.min(Math.max(posRef.current, 0), maxX);
    posRef.current = clamped;
    controls.set({ x: clamped });

    controls.stop();
    stopLegs();
    clearTimeout(stTimer.current);
    walk(dirRef.current, containerWidth, gen);
  }, [containerWidth, maxX, controls, stopLegs, walk]);

  if (containerWidth < DUCK_W) return null;

  return (
    <motion.div
      animate={controls}
      style={{ position: "absolute", bottom: 0, left: 0, pointerEvents: "none" }}
    >
      <div style={{ position: "relative", width: DUCK_W }}>
        <motion.div animate={{ scaleX: dir }} transition={{ duration: 0 }} style={{ transformOrigin: "center" }}>
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
          >
            <DuckSprite walkFrame={frame} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── README content ───────────────────────────────────────────────────────────
type Line =
  | { kind: "h1";   text: string }
  | { kind: "h2";   text: string }
  | { kind: "rule" }
  | { kind: "blank" }
  | { kind: "body"; text: string };

const README: Line[] = [
  { kind: "h1",   text: "# About Me" },
  { kind: "blank" },
  { kind: "body", text: "I'm a student at UC Davis studying Computer Science alongside Technology Management. I love building things that are fast, clean, and actually useful." },
  { kind: "blank" },
  { kind: "body", text: "I've interned at NASA JPL, built AI tools, and contributed to student organizations that bring together engineers and entrepreneurs on campus." },
  { kind: "blank" },
  { kind: "body", text: "I care about good engineering and thoughtful design — the best software is invisible and just works." },
  { kind: "blank" },
  { kind: "body", text: "Always learning. Always shipping." },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const LINE_V = {
  hidden: { opacity: 0, x: -32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const BODY_V = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const LH = "1.65rem";

const W = {
  hi:  "rgba(255,255,255,0.92)",
  mid: "rgba(255,255,255,0.55)",
  lo:  "rgba(255,255,255,0.28)",
  dim: "rgba(255,255,255,0.14)",
};

// ─── Main section ─────────────────────────────────────────────────────────────
const CARD_ENTER = {
  hidden: { opacity: 0, x: -48, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const PHOTO_ENTER = {
  hidden: { opacity: 0, x: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutSection() {
  const { aboutRef } = useHeroAboutBlend();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w > 0) setCardWidth(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="overflow-hidden relative flex items-center py-24 px-4 sm:px-8"
      style={{ height: "100svh" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">

        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* ── Left: README card ─────────────────────────────────────────── */}
          <motion.div
            className="flex-1 min-w-0 w-full"
            variants={CARD_ENTER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div
              ref={cardRef}
              className="relative rounded-xl"
              style={{ overflow: "visible" }}
            >
              <motion.div
                className="rounded-xl overflow-hidden"
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "rgba(9,9,14,0.87)",
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
                {/* Tab bar */}
                <div className="flex items-center justify-between px-4 py-[10px]"
                  style={{ background: "rgba(16,16,24,0.96)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-[5px] h-[5px] rounded-full" style={{ background: W.lo }} />
                    <span className="font-mono" style={{ fontSize: "0.63rem", color: W.lo }}>about.md</span>
                  </div>
                  <span className="font-mono uppercase tracking-widest" style={{ fontSize: "0.52rem", color: W.dim }}>
                    Markdown
                  </span>
                </div>

                {/* Body */}
                <div className="flex" style={{ minHeight: 0 }}>
                  {/* Line numbers */}
                  <div className="font-mono shrink-0 select-none py-4 text-right"
                    style={{
                      color: W.dim, borderRight: "1px solid rgba(255,255,255,0.04)",
                      fontSize: "0.55rem", lineHeight: LH,
                      paddingLeft: "0.5rem", paddingRight: "0.65rem", minWidth: "2.4rem",
                    }}
                    aria-hidden="true">
                    {README.map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>

                  {/* Markdown content */}
                  <motion.div
                    className="flex-1 py-4 px-7 min-w-0"
                    variants={STAGGER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.35, margin: "-8% 0px" }}
                  >
                    {README.map((line, i) => {
                      const isBody = line.kind === "body";
                      return (
                      <motion.div
                        key={i}
                        variants={isBody ? BODY_V : LINE_V}
                        style={{
                          minHeight: LH,
                          height: line.kind === "blank" ? LH : isBody ? "auto" : LH,
                          lineHeight: LH,
                          display: "flex",
                          alignItems: isBody ? "flex-start" : "center",
                          paddingBottom: isBody ? "0.35rem" : undefined,
                        }}
                      >
                        {line.kind === "h1" && (
                          <span style={{
                            fontFamily: "var(--font-press-start)",
                            fontSize: "0.72rem",
                            color: W.hi,
                            letterSpacing: "0.02em",
                          }}>
                            {line.text}
                          </span>
                        )}
                        {line.kind === "h2" && (
                          <span style={{
                            fontFamily: "var(--font-press-start)",
                            fontSize: "0.5rem",
                            color: W.mid,
                          }}>
                            {line.text}
                          </span>
                        )}
                        {line.kind === "rule" && (
                          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.09)" }} />
                        )}
                        {line.kind === "body" && (
                          <ScrambledText
                            className="about-scramble-line"
                            radius={100}
                            duration={1.2}
                            speed={0.5}
                            scrambleChars=".:"
                            style={{
                              fontFamily: '"JetBrains Mono","Fira Code",monospace',
                              fontSize: "0.82rem",
                              color: W.mid,
                              lineHeight: "1.55",
                              width: "100%",
                            }}
                          >
                            {line.text}
                          </ScrambledText>
                        )}
                        {line.kind === "blank" && null}
                      </motion.div>
                    );
                    })}
                  </motion.div>
                </div>
              </motion.div>

              {/* Duck track: sits above the card top edge, clipped to card width */}
              {cardWidth >= DUCK_W && (
                <motion.div
                  style={{
                    position: "absolute",
                    top: -DUCK_TRACK_H,
                    left: 0,
                    width: cardWidth,
                    height: DUCK_TRACK_H,
                    overflow: "hidden",
                    zIndex: 50,
                    pointerEvents: "none",
                  }}
                  aria-hidden
                >
                  <TerminalDuck containerWidth={cardWidth} />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Right: photo panel ────────────────────────────────────────── */}
          <motion.div
            className="shrink-0 w-full md:w-auto relative"
            variants={PHOTO_ENTER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >

            <StarBorder
              as="div"
              color="rgba(255,255,255,0.85)"
              speed="5s"
              thickness={2}
              innerClassName="inner-content--photo"
              style={{
                display: "block",
                width: "clamp(280px, 42vw, 480px)",
                margin: "0 auto",
                borderRadius: "17px",
              }}
            >
              <div
                className="about-photo-card"
                style={{
                  position: "relative",
                  zIndex: 1,
                  overflow: "visible",
                  width: "100%",
                  aspectRatio: "1254 / 1096",
                  borderRadius: "15px",
                  filter:
                    "drop-shadow(0 28px 80px rgba(0,0,0,0.55)) drop-shadow(0 6px 24px rgba(0,0,0,0.4))",
                }}
              >
                <TiltedCard
                  imageSrc={ABOUT_PHOTO_SRC}
                  altText="Gabriel Venezia"
                  containerWidth="100%"
                  containerHeight="100%"
                  imageWidth="100%"
                  imageHeight="100%"
                  imageFit="contain"
                  rotateAmplitude={12}
                  scaleOnHover={1.08}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                />
                <Noise
                  patternSize={250}
                  patternRefreshInterval={2}
                  patternAlpha={38}
                />
              </div>
            </StarBorder>

            {/* BounceCards sit on the outer motion.div so StarBorder's overflow:hidden doesn't clip them */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.15rem",
                right: "-1.35rem",
                zIndex: 20,
                transform: "rotate(-8deg)",
                transformOrigin: "100% 100%",
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <BounceCards
                className="about-photo-bounce"
                images={BOUNCE_CARD_PHOTOS}
                containerWidth={228}
                containerHeight={118}
                animationDelay={0.12}
                animationStagger={0.09}
                easeType="elastic.out(1, 0.55)"
                entranceDuration={1}
                transformStyles={BOUNCE_CARD_TRANSFORMS}
                animateOnView
                enableHover
                hoverPushOffset={48}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
