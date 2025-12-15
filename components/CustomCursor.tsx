"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;
    setEnabled(true);

    const handleMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
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
      }}
    />
  );
}

