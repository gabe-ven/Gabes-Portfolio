"use client";

import { useRef, useEffect, useId } from "react";
import "./CurvedLoop.css";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  className?: string;
  fill?: string;
  fontSize?: number;
  letterSpacing?: number;
  fontFamily?: string;
}

const REPEATS = 8;
const SVG_W = 1440;
const SVG_H = 90;

export default function CurvedLoop({
  marqueeText = "SOFTWARE ENGINEER  ✦  CS + TECH MANAGEMENT  ✦  UC DAVIS  ✦  ",
  speed = 1,
  curveAmount = -30,
  direction = "left",
  interactive = true,
  className = "",
  fill = "rgba(255,255,255,0.4)",
  fontSize = 14,
  letterSpacing = 5,
  fontFamily = "var(--font-space-grotesk), sans-serif",
}: CurvedLoopProps) {
  const rawId = useId().replace(/[^a-z0-9]/gi, "");
  const pathId = `clp-${rawId}`;

  const pathRef = useRef<SVGPathElement>(null);
  const measRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const animRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const segLenRef = useRef<number>(300);
  const dragRef = useRef({ active: false, lastX: 0, velocity: 0 });

  const midY = SVG_H / 2;
  const pathD = `M-100,${midY} Q${SVG_W / 2},${midY + curveAmount} ${SVG_W + 100},${midY}`;
  const fullText = Array(REPEATS).fill(marqueeText).join("");

  useEffect(() => {
    if (measRef.current) {
      const measured = measRef.current.getComputedTextLength();
      if (measured > 0) segLenRef.current = measured;
    } else if (pathRef.current) {
      segLenRef.current = pathRef.current.getTotalLength() / REPEATS;
    }

    const dir = direction === "left" ? 1 : -1;

    const step = () => {
      if (!dragRef.current.active) {
        offsetRef.current += speed * dir * 0.4;
      }
      offsetRef.current += dragRef.current.velocity;
      dragRef.current.velocity *= 0.92;

      const seg = segLenRef.current;
      offsetRef.current = ((offsetRef.current % seg) + seg) % seg;

      textPathRef.current?.setAttribute("startOffset", String(offsetRef.current));
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, [speed, direction]);

  const sharedProps = { fontSize, letterSpacing, fill, fontFamily } as const;

  const startDrag = (x: number) => {
    if (!interactive) return;
    dragRef.current = { active: true, lastX: x, velocity: 0 };
  };
  const moveDrag = (x: number) => {
    if (!interactive || !dragRef.current.active) return;
    dragRef.current.velocity = (x - dragRef.current.lastX) * 0.6;
    dragRef.current.lastX = x;
  };
  const endDrag = () => { dragRef.current.active = false; };

  return (
    <div className={`curved-loop-outer ${className}`}>
      {/* Hidden measurement element — gives text advance in SVG user units */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ position: "absolute", visibility: "hidden", pointerEvents: "none", width: SVG_W, height: SVG_H }}
      >
        <text ref={measRef} {...sharedProps} x={0} y={midY}>
          {marqueeText}
        </text>
      </svg>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="curved-loop-svg"
        aria-hidden="true"
        style={{ cursor: interactive ? "grab" : "default" }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
      >
        <defs>
          <path id={pathId} d={pathD} ref={pathRef} />
        </defs>
        <text {...sharedProps} style={{ userSelect: "none" }}>
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0">
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
