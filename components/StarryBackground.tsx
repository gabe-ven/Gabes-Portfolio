"use client";

export default function StarryBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base star layers */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="stars4"></div>

      {/* Twinkling stars */}
      <div className="twinkle-stars"></div>
    </div>
  );
}




