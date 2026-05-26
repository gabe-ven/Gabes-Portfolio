"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface TextRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  /** Split by 'word' (default) or 'char' for large display headings */
  splitBy?: "word" | "char";
  /**
   * When true, fades the whole text block in as one piece the moment it
   * enters the viewport. No stagger — fires once, stays put.
   */
  autoplay?: boolean;
  /** Animation duration in seconds (autoplay mode only). Default 0.55. */
  duration?: number;
}

/* ── Autoplay: native IntersectionObserver + CSS transition, works inside overflow:hidden ── */
function AutoplayReveal({
  children,
  className = "",
  style,
  duration = 0.55,
}: Pick<TextRevealProps, "children" | "className" | "style" | "duration">) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <p style={style}>{children}</p>
    </div>
  );
}

/* ── Scroll-driven: per-token reveal tied to scroll progress ── */
function ScrollToken({
  children,
  progress,
  range,
  isChar,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  isChar: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [18, 0]);
  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
      className={isChar ? "" : "mr-[0.28em]"}
    >
      {children === " " ? " " : children}
    </motion.span>
  );
}

function ScrollReveal({
  children,
  className = "",
  style,
  splitBy = "word",
}: Pick<TextRevealProps, "children" | "className" | "style" | "splitBy">) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: ["start 0.85", "end 0.35"] as any,
  });

  const tokens =
    splitBy === "char"
      ? children.split("").map((ch) => (ch === " " ? " " : ch))
      : children.split(" ");

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <p
        className={`flex flex-wrap justify-start ${splitBy === "char" ? "tracking-tight" : ""}`}
        style={style}
        aria-label={children}
      >
        {tokens.map((token, i) => {
          const start = i / tokens.length;
          const end = Math.min((i + 1.5) / tokens.length, 1);
          return (
            <ScrollToken
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              isChar={splitBy === "char"}
            >
              {token}
            </ScrollToken>
          );
        })}
      </p>
    </div>
  );
}

/* ── Public export ── */
export function TextReveal({ autoplay = false, ...props }: TextRevealProps) {
  if (autoplay) return <AutoplayReveal {...props} />;
  return <ScrollReveal {...props} />;
}
