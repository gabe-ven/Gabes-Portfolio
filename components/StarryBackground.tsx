"use client";

import { useEffect, useState } from "react";

export default function StarryBackground() {
  const [shootingStars, setShootingStars] = useState<number[]>([]);

  useEffect(() => {
    const createShootingStar = () => {
      const id = Math.random();
      setShootingStars((prev) => [...prev, id]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((starId) => starId !== id));
      }, 3000);
    };

    // Create shooting stars at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        // 70% chance every interval
        createShootingStar();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base star layers */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="stars4"></div>

      {/* Twinkling stars */}
      <div className="twinkle-stars"></div>

      {/* Shooting stars */}
      <div className="shooting-stars-container">
        {shootingStars.map((id) => (
          <div
            key={id}
            className="shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
