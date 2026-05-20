"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

export interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  hoverPushOffset?: number;
  animateOnView?: boolean;
  entranceDuration?: number;
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = true,
  hoverPushOffset = 160,
  animateOnView = true,
  entranceDuration = 0.9,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  const primeCardsHidden = useCallback(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    images.forEach((_, i) => {
      const card = container.querySelector<HTMLElement>(`.card-${i}`);
      if (!card) return;
      gsap.set(card, {
        transform: transformStyles[i] ?? "none",
        scale: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    });
  }, [images.length, transformStyles]);

  useLayoutEffect(() => {
    primeCardsHidden();
  }, [primeCardsHidden]);

  const playEntrance = useCallback(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    const cards = container.querySelectorAll(".card");
    if (!cards.length) return;

    container.classList.remove("awaiting-entrance");

    gsap.killTweensOf(cards);
    primeCardsHidden();

    gsap.to(cards, {
      scale: 1,
      opacity: 1,
      duration: entranceDuration,
      stagger: animationStagger,
      ease: easeType,
      delay: animationDelay,
      overwrite: true,
    });
  }, [
    images.length,
    animationDelay,
    animationStagger,
    easeType,
    entranceDuration,
    primeCardsHidden,
  ]);

  useEffect(() => {
    if (animateOnView) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      playEntrance();
    }, container);

    return () => ctx.revert();
  }, [animateOnView, playEntrance]);

  useEffect(() => {
    if (!animateOnView) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          playEntrance();
        }
      },
      { threshold: 0.15, rootMargin: "0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [animateOnView, playEntrance, images.length]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    }
    if (transformStr === "none") {
      return "rotate(0deg)";
    }
    return `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    }
    if (baseTransform === "none") {
      return `translate(${offsetX}px)`;
    }
    return `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -hoverPushOffset : hoverPushOffset;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(target, {
          transform: pushedTransform,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || "none";
      gsap.to(target, {
        transform: baseTransform,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer awaiting-entrance ${className}`.trim()}
      ref={containerRef}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => (
        <div
          key={src}
          className={`card card-${idx}`}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className="image" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
}
