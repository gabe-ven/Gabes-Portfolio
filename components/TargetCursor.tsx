"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
}

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.12,
  parallaxOn = true,
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<Element> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const isActiveRef = useRef(false);
  const activeTargetRef = useRef<Element | null>(null);
  const targetCornerPositionsRef = useRef<Array<{ x: number; y: number }> | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  // Used as a plain-object GSAP tween target — GSAP tweens .current directly
  const activeStrengthRef = useRef(0);

  const constants = useMemo(() => ({ cornerSize: 8 }), []);

  const getLockPadding = useCallback((target: Element) => {
    const attr = target.getAttribute("data-cursor-pad");
    if (attr != null && attr !== "") {
      const parsed = Number.parseInt(attr, 10);
      if (!Number.isNaN(parsed)) return parsed;
    }
    if (target.classList.contains("cursor-target-tight")) return 6;
    return 0;
  }, []);

  const getTargetRect = useCallback((target: Element) => {
    const rects = target.getClientRects();
    if (rects.length > 0) {
      return rects[0];
    }
    return target.getBoundingClientRect();
  }, []);

  const updateTargetCorners = useCallback(
    (target: Element) => {
      if (!cursorRef.current) return;
      const rect = getTargetRect(target);
      const pad = getLockPadding(target);
      const { cornerSize } = constants;
      // Bracket arms extend outward from wrap; inset so the L hugs the element edge
      const inset = cornerSize * 0.5 + pad;
      targetCornerPositionsRef.current = [
        { x: rect.left + inset, y: rect.top + inset },
        { x: rect.right - inset, y: rect.top + inset },
        { x: rect.right - inset, y: rect.bottom - inset },
        { x: rect.left + inset, y: rect.bottom - inset },
      ];
    },
    [constants, getLockPadding, getTargetRect]
  );

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    return (hasTouchScreen && isSmallScreen) || mobileRegex.test(navigator.userAgent.toLowerCase());
  }, []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.set(cursorRef.current, { x, y });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner-wrap");

    let activeTarget: Element | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: Element) => {
      if (currentLeaveHandler) target.removeEventListener("mouseleave", currentLeaveHandler);
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      spinTl.current?.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };
    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) return;
      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      if (activeTargetRef.current) {
        updateTargetCorners(activeTargetRef.current);
      }

      const cursorX = lastMouseRef.x;
      const cursorY = lastMouseRef.y;

      Array.from(cornersRef.current).forEach((corner, i) => {
        const targetX = targetCornerPositionsRef.current![i].x - cursorX;
        const targetY = targetCornerPositionsRef.current![i].y - cursorY;
        if (!parallaxOn) {
          gsap.set(corner, { x: targetX, y: targetY });
          return;
        }
        const currentX = gsap.getProperty(corner, "x") as number;
        const currentY = gsap.getProperty(corner, "y") as number;
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? 0.2 : 0.05;
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto",
        });
      });
    };
    tickerFnRef.current = tickerFn;

    const lastMouseRef = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const moveHandler = (e: MouseEvent) => {
      lastMouseRef.x = e.clientX;
      lastMouseRef.y = e.clientY;
      moveCursor(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const el = document.elementFromPoint(lastMouseRef.x, lastMouseRef.y);
      const still = el && (el === activeTarget || el.closest(targetSelector) === activeTarget);
      if (!still && currentLeaveHandler) currentLeaveHandler();
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current || !cursorRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.15 });
      gsap.to(cursorRef.current, { scale: 0.85, duration: 0.1 });
    };
    const mouseUpHandler = () => {
      if (!dotRef.current || !cursorRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.15 });
    };
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      let current: Element | null = e.target as Element;
      let target: Element | null = null;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) { target = current; break; }
        current = current.parentElement;
      }
      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;
      if (activeTarget) cleanupTarget(activeTarget);
      if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }

      activeTarget = target;
      activeTargetRef.current = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach((c) => gsap.killTweensOf(c));

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      updateTargetCorners(target);
      const cursorX = lastMouseRef.x;
      const cursorY = lastMouseRef.y;

      isActiveRef.current = true;
      if (tickerFnRef.current) gsap.ticker.add(tickerFnRef.current);

      // Tween the ref object itself — GSAP sets activeStrengthRef.current from 0 → 1
      gsap.to(activeStrengthRef, { current: 1, duration: hoverDuration, ease: "power2.out" });

      corners.forEach((c, i) => {
        const x = targetCornerPositionsRef.current![i].x - cursorX;
        const y = targetCornerPositionsRef.current![i].y - cursorY;
        if (parallaxOn) {
          gsap.to(c, { x, y, duration: 0.2, ease: "power2.out" });
        } else {
          gsap.set(c, { x, y });
        }
      });

      const leaveHandler = () => {
        if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.killTweensOf(activeStrengthRef);
        activeStrengthRef.current = 0;
        activeTarget = null;
        activeTargetRef.current = null;

        if (cornersRef.current) {
          const cs = Array.from(cornersRef.current);
          gsap.killTweensOf(cs);
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5,  y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5,  y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];
          const tl = gsap.timeline();
          cs.forEach((c, idx) => {
            tl.to(c, { x: positions[idx].x, y: positions[idx].y, duration: 0.3, ease: "power3.out" }, 0);
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const rot = (gsap.getProperty(cursorRef.current, "rotation") as number) % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
            gsap.to(cursorRef.current, {
              rotation: rot + 360,
              duration: spinDuration * (1 - rot / 360),
              ease: "none",
              onComplete: () => spinTl.current?.restart(),
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target!);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [
    targetSelector,
    spinDuration,
    moveCursor,
    constants,
    hideDefaultCursor,
    isMobile,
    hoverDuration,
    parallaxOn,
    updateTargetCorners,
  ]);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration, isMobile]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner-wrap">
        <div className="target-cursor-corner corner-tl" />
      </div>
      <div className="target-cursor-corner-wrap">
        <div className="target-cursor-corner corner-tr" />
      </div>
      <div className="target-cursor-corner-wrap">
        <div className="target-cursor-corner corner-br" />
      </div>
      <div className="target-cursor-corner-wrap">
        <div className="target-cursor-corner corner-bl" />
      </div>
    </div>
  );
};

export default TargetCursor;
