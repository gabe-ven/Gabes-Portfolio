"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

// ── pixel palette ──────────────────────────────────────────────────────────────
const K = "#111111"; // outline
const W = "#FFFFFF"; // white body
const O = "#E8921A"; // orange beak + feet
const G = "#C8C8C8"; // wing grey
const _ = null;

type Px = string | null;

// ── sprite maps — 16 cols × 14 rows, duck faces RIGHT ─────────────────────────
const DUCK_BODY: Px[][] = [
  // row  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
  /*  0 */ [_,_,_,_,_,_,_,K,K,K,K,_,_,_,_,_],  // head top
  /*  1 */ [_,_,_,_,_,_,K,W,W,W,W,K,_,_,_,_],  // head
  /*  2 */ [_,_,_,_,_,_,K,W,W,K,W,W,K,O,O,_],  // eye (col 9) + beak
  /*  3 */ [_,_,_,_,_,_,K,W,W,W,W,W,K,O,O,_],  // beak row 2
  /*  4 */ [_,_,_,_,_,K,W,W,W,W,W,W,K,_,_,_],  // neck
  /*  5 */ [_,_,_,_,K,W,W,W,W,W,W,W,W,K,_,_],  // body top
  /*  6 */ [_,_,_,K,W,W,W,G,G,W,W,W,W,W,K,_],  // wing row 1
  /*  7 */ [_,_,K,W,W,W,G,G,G,G,W,W,W,W,W,K],  // widest row
  /*  8 */ [_,_,K,W,W,W,W,G,G,W,W,W,W,W,K,_],  // wing row 2
  /*  9 */ [_,_,_,K,W,W,W,W,W,W,W,W,W,K,_,_],  // body
  /* 10 */ [_,_,_,_,K,K,W,W,W,W,W,K,K,_,_,_],  // tail base
  /* 11 */ [_,_,_,_,_,_,K,K,K,K,K,_,_,_,_,_],  // bottom edge
];

// walk frame A — legs apart
const LEGS_A: Px[][] = [
  [_,_,_,_,_,O,O,_,_,O,O,_,_,_,_,_],
  [_,_,_,_,O,O,O,_,_,O,O,O,_,_,_,_],
];

// walk frame B — legs in stride
const LEGS_B: Px[][] = [
  [_,_,_,_,_,_,O,O,O,O,_,_,_,_,_,_],
  [_,_,_,_,_,O,O,O,O,O,O,_,_,_,_,_],
];

// idle — planted stance
const LEGS_IDLE: Px[][] = [
  [_,_,_,_,O,O,O,_,_,O,O,O,_,_,_,_],
  [_,_,_,O,O,O,O,_,_,O,O,O,O,_,_,_],
];

const SPRITE_W = 16;
const SPRITE_H = DUCK_BODY.length + LEGS_A.length; // 14 rows total
const PX = 4; // CSS px per sprite pixel → 64 × 56 on screen

// ── canvas-based sprite renderer — no grid lines ──────────────────────────────
function DuckSprite({ walkFrame, petState }: { walkFrame: 0 | 1; petState: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const legs =
      petState === "walking"
        ? walkFrame === 0
          ? LEGS_A
          : LEGS_B
        : LEGS_IDLE;

    const rows = [...DUCK_BODY, ...legs];
    ctx.clearRect(0, 0, SPRITE_W, rows.length);

    rows.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1); // 1 native px → scaled up via CSS
        }
      });
    });
  }, [walkFrame, petState]);

  return (
    <canvas
      ref={ref}
      width={SPRITE_W}
      height={SPRITE_H}
      style={{
        width: SPRITE_W * PX,
        height: SPRITE_H * PX,
        imageRendering: "pixelated",
        display: "block",
      }}
    />
  );
}

// ── click quacks ───────────────────────────────────────────────────────────────
const QUACKS = [
  "quack!",
  "QUACK!!",
  "> quack.exe",
  "npm quack",
  "git quack",
  "404: pond",
  "sudo quack",
  ":wquack!",
];
let quackIdx = 0;

// ── main component ─────────────────────────────────────────────────────────────
export default function PagePet() {
  const [walkFrame, setWalkFrame] = useState<0 | 1>(0);
  const [petState, setPetState]   = useState<"walking" | "idle" | "typing">("walking");
  const [dir, setDir]             = useState<1 | -1>(1);
  const [exclaim, setExclaim]     = useState(false);
  const [bubble, setBubble]       = useState<string | null>(null);

  const controls    = useAnimationControls();
  const posRef      = useRef(24);
  const mounted     = useRef(false);
  const stateTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const frameTimer  = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startLegs = useCallback(() => {
    clearInterval(frameTimer.current);
    frameTimer.current = setInterval(
      () => setWalkFrame((f) => (f === 0 ? 1 : 0)),
      200,
    );
  }, []);

  const stopLegs = useCallback(() => {
    clearInterval(frameTimer.current);
    setWalkFrame(0);
  }, []);

  // ── walk loop ────────────────────────────────────────────────────────────────
  const walk = useCallback(
    async (d: 1 | -1) => {
      if (!mounted.current) return;

      const petW   = SPRITE_W * PX + 16;
      const target = d === 1 ? window.innerWidth - petW - 24 : 24;
      const dist   = Math.abs(target - posRef.current);

      setPetState("walking");
      setDir(d);
      startLegs();

      await controls.start({
        x: target,
        transition: { duration: dist / 65, ease: "linear" },
      });
      if (!mounted.current) return;

      posRef.current = target;
      stopLegs();

      setPetState("idle");
      await new Promise<void>((r) => {
        stateTimer.current = setTimeout(r, 1400 + Math.random() * 1200);
      });
      if (!mounted.current) return;

      if (Math.random() > 0.5) {
        setPetState("typing");
        await new Promise<void>((r) => {
          stateTimer.current = setTimeout(r, 700 + Math.random() * 700);
        });
        if (!mounted.current) return;
      }

      walk(d === 1 ? -1 : 1);
    },
    [controls, startLegs, stopLegs],
  );

  useEffect(() => {
    mounted.current = true;
    controls.set({ x: 24 });
    walk(1);
    return () => {
      mounted.current = false;
      clearTimeout(stateTimer.current);
      clearTimeout(bubbleTimer.current);
      clearInterval(frameTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── hover ────────────────────────────────────────────────────────────────────
  const onEnter = useCallback(() => {
    controls.stop();
    stopLegs();
    clearTimeout(stateTimer.current);
    setPetState("idle");
    setExclaim(true);
  }, [controls, stopLegs]);

  const onLeave = useCallback(() => {
    setExclaim(false);
    walk(dir);
  }, [dir, walk]);

  // ── click ────────────────────────────────────────────────────────────────────
  const onClick = useCallback(() => {
    const msg = QUACKS[quackIdx % QUACKS.length];
    quackIdx++;
    setBubble(msg);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 2000);
    controls.start({
      y: [0, -18, 0],
      transition: { duration: 0.36, ease: [0.33, 1.7, 0.68, 1] },
    });
    // eslint-disable-next-line no-console
    console.log(`%c${msg}`, "color:#E8921A;background:#0d0800;padding:4px 10px;font-family:monospace;font-size:12px;");
  }, [controls]);

  // ── bob animation ─────────────────────────────────────────────────────────────
  const bobAnim =
    petState === "idle"
      ? { y: [0, -PX, 0], transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" } }
      : petState === "typing"
      ? { y: [0, -PX, 0], transition: { repeat: Infinity, duration: 0.26, ease: "linear" } }
      : petState === "walking"
      ? { y: [0, -2, 0], transition: { repeat: Infinity, duration: 0.4, ease: "linear" } }
      : {};

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <motion.div
        animate={controls}
        style={{ position: "absolute", bottom: 0, pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {/* flip direction — no tween, pixel art is instant */}
        <motion.div
          animate={{ scaleX: dir }}
          transition={{ duration: 0 }}
          style={{ originX: "50%" }}
        >
          <motion.div animate={bobAnim} style={{ position: "relative" }}>

            {/* ! on hover */}
            <AnimatePresence>
              {exclaim && (
                <motion.div
                  key="exclaim"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.07 }}
                  style={{
                    position: "absolute",
                    top: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "monospace",
                    fontSize: 14,
                    fontWeight: 900,
                    color: O,
                    pointerEvents: "none",
                  }}
                >
                  !
                </motion.div>
              )}
            </AnimatePresence>

            {/* speech bubble */}
            <AnimatePresence>
              {bubble && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.07 }}
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 6px)",
                    left: "50%",
                    transform: `translateX(-50%) scaleX(${dir})`,
                    backgroundColor: "#0d0800",
                    outline: `2px solid ${O}`,
                    padding: "3px 8px",
                    whiteSpace: "nowrap",
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: O,
                    pointerEvents: "none",
                  }}
                >
                  {bubble}
                </motion.div>
              )}
            </AnimatePresence>

            {/* typing dots */}
            <AnimatePresence>
              {petState === "typing" && !exclaim && (
                <motion.div
                  key="dots"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.07 }}
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 3,
                    pointerEvents: "none",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -PX, 0] }}
                      transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.13, ease: "linear" }}
                      style={{ width: PX, height: PX, backgroundColor: O }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <DuckSprite walkFrame={walkFrame} petState={petState} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
