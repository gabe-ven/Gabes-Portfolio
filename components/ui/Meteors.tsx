"use client";

import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 10 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: "-40px", // Starts above the top edge
      left: Math.floor(Math.random() * 125) - 45 + "%", // Spawn from -45% to 80% to cover the left side perfectly
      animationDelay: Math.random() * (2.2 - 0.1) + 0.1 + "s",
      animationDuration: (Math.random() * (4.5 - 2.2) + 2.2).toFixed(2) + "s", // Slow, premium floating glide speeds
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className="meteor-core animate-meteor-effect"
          style={{
            ...style,
            animationDuration: style.animationDuration,
          }}
        />
      ))}
    </>
  );
};
