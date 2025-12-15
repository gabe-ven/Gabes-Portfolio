"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const updatePosition = (x: number, y: number) => {
    const next = { x, y };
    lastPos.current = next;
    setPos(next);
    setHidden(false);
  };

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;
    setEnabled(true);

    const handleMove = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    // Track wheel/trackpad scroll so the custom cursor relocates even
    // when the user scrolls before moving the mouse.
    const handleWheel = (e: WheelEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      // Force a re-render at the same logical pointer position so the cursor doesn't appear "stuck"
      setPos({ ...lastPos.current });
    };

    const handleLeave = () => setHidden(true);
    const handleEnter = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerenter", handleEnter);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerenter", handleEnter);
    };
  }, []);

  if (!enabled) return null;

  const size = 26;
  const radius = size / 2;

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate(${pos.x - radius}px, ${pos.y - radius}px)`,
        width: size,
        height: size,
        opacity: hidden ? 0 : 0.9,
      }}
    />
  );
}
