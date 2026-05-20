"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

export interface MasonryItem {
  id: string;
  img: string;
  height?: number;
  naturalWidth?: number;
  naturalHeight?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

const preloadImages = (urls: string[]) =>
  Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
}: MasonryProps) {
  const columns = useMedia(
    ["(min-width:1200px)", "(min-width:900px)", "(min-width:600px)"],
    [4, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, totalHeight } = useMemo(() => {
    if (!width) return { grid: [], totalHeight: 0 };
    const colHeights = new Array(columns).fill(0) as number[];
    const columnWidth = width / columns;
    const g = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const h = child.naturalWidth && child.naturalHeight
        ? (child.naturalHeight / child.naturalWidth) * columnWidth
        : (child.height ?? 400) / 2;
      const y = colHeights[col];
      colHeights[col] += h;
      return { ...child, x, y, w: columnWidth, h };
    });
    return { grid: g, totalHeight: Math.max(...colHeights) };
  }, [columns, items, width]);

  const hasMounted = useRef(false);
  const containerRefLocal = containerRef;

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-masonry-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        let fromX = item.x;
        let fromY = item.y;
        const dir = animateFrom === "random"
          ? (["top", "bottom", "left", "right"] as const)[Math.floor(Math.random() * 4)]
          : animateFrom;

        if (dir === "top") fromY = -200;
        else if (dir === "bottom") fromY = (typeof window !== "undefined" ? window.innerHeight : 800) + 200;
        else if (dir === "left") fromX = -200;
        else if (dir === "right") fromX = (typeof window !== "undefined" ? window.innerWidth : 1200) + 200;

        gsap.fromTo(
          selector,
          { opacity: 0, x: fromX, y: fromY, width: item.w, height: item.h, ...(blurToFocus && { filter: "blur(10px)" }) },
          { opacity: 1, ...animationProps, ...(blurToFocus && { filter: "blur(0px)" }), duration: 0.8, ease: "power3.out", delay: index * stagger }
        );
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: "auto" });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady]);

  const handleMouseEnter = (_e: React.MouseEvent, item: (typeof grid)[0]) => {
    if (scaleOnHover) {
      gsap.to(`[data-masonry-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (_e: React.MouseEvent, item: (typeof grid)[0]) => {
    if (scaleOnHover) {
      gsap.to(`[data-masonry-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <div ref={containerRefLocal} className="masonry-list" style={{ height: totalHeight }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-masonry-key={item.id}
          className="masonry-item"
          onMouseEnter={(e) => handleMouseEnter(e, item)}
          onMouseLeave={(e) => handleMouseLeave(e, item)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.img}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
}
