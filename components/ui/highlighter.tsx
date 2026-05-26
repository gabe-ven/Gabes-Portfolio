"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";

type AnnotationAction =
  | "highlight" | "underline" | "box" | "circle"
  | "strike-through" | "crossed-off" | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  delay?: number;
  brackets?: ("left" | "right" | "top" | "bottom")[];
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 500,
  iterations = 1,
  padding = 2,
  multiline = true,
  delay = 0,
  brackets,
}: HighlighterProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const elementRef = useRef<HTMLSpanElement>(null);
  // useRef survives StrictMode cleanup/remount, so annotation fires exactly once
  const firedRef = useRef(false);
  const isInView = useInView(wrapperRef, { once: true, margin: "-5% 0px" });

  useEffect(() => {
    if (!isInView || firedRef.current) return;
    const element = elementRef.current;
    if (!element) return;
    firedRef.current = true;

    // rough-notation inserts its SVG as a sibling of `element` inside the wrapper.
    // The wrapper (position:relative) is the SVG's containing block, so positioning
    // is viewport-relative and works correctly with custom scroll containers.
    const annotation = annotate(element, {
      type: action, color, strokeWidth, animationDuration,
      iterations, padding, multiline,
      brackets: action === "bracket" ? (brackets || ["left", "right"]) : undefined,
    });

    const id = setTimeout(() => annotation.show(), delay);

    return () => {
      clearTimeout(id);
      annotation.remove();
    };
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={wrapperRef} style={{ position: "relative", display: "inline-block" }}>
      <span ref={elementRef} className="bg-transparent">
        {children}
      </span>
    </span>
  );
}
