"use client";

import { useEffect } from "react";

const LIGHT_THRESHOLD = 0.65;
const NAV_Y = 40; // probe point — middle of nav bar height

function luminance(r: number, g: number, b: number) {
  return 0.299 * (r / 255) + 0.587 * (g / 255) + 0.114 * (b / 255);
}

function isLightBg(el: Element): boolean | null {
  const bg = getComputedStyle(el).backgroundColor;
  const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  const lum = luminance(+m[1], +m[2], +m[3]);
  if (lum < 0.05 || lum > 0.95) return lum > LIGHT_THRESHOLD; // fully dark/light — trust it
  if (bg.startsWith("rgba") && +bg.split(",")[3] < 0.1) return null; // near-transparent
  return lum > LIGHT_THRESHOLD;
}

export default function NavColorController() {
  useEffect(() => {
    let raf = 0;
    let themeTimer: ReturnType<typeof setTimeout> | null = null;

    const update = () => {
      const isDark = document.documentElement.classList.contains("dark");

      // Dark mode: all sections are dark — nav is always white
      if (isDark) {
        document.documentElement.classList.remove("nav-over-light");
        return;
      }

      // Find which <section> the nav is sitting over by viewport position
      const sections = document.querySelectorAll("section");
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= NAV_Y && rect.bottom > NAV_Y) {
          const light = isLightBg(section);
          if (light !== null) {
            document.documentElement.classList.toggle("nav-over-light", light);
          }
          return;
        }
      }

      // No section covers the nav — we're in the hero (terracotta bg) → white nav
      document.documentElement.classList.remove("nav-over-light");
    };

    const applyThemeColor = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.remove("nav-over-light");
      } else {
        // Light mode heuristic: hero is ~1 full viewport tall
        const atHero = window.scrollY < window.innerHeight * 0.8;
        document.documentElement.classList.toggle("nav-over-light", !atHero);
      }
      // Re-confirm once the 300ms body bg transition has settled
      if (themeTimer) clearTimeout(themeTimer);
      themeTimer = setTimeout(update, 350);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const onNavThemeChange = (e: Event) => {
      applyThemeColor((e as CustomEvent<{ isDark: boolean }>).detail.isDark);
    };
    document.documentElement.addEventListener("nav-theme-change", onNavThemeChange);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    update();

    return () => {
      document.documentElement.removeEventListener("nav-theme-change", onNavThemeChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
      if (themeTimer) clearTimeout(themeTimer);
    };
  }, []);

  return null;
}
