/** Shared section atmosphere colors — keep in sync with PageBackground breakpoints */
export const SECTION_PALETTE = {
  hero: {
    base: "#000000",
    wash: "rgba(0,0,0,0.92)",
    glow: "rgba(55,12,130,0.35)",
  },
  about: {
    base: "#030018",
    wash: "rgba(3,0,24,0.88)",
    glow: "rgba(68,22,165,0.28)",
  },
  experience: {
    base: "#040100",
    wash: "rgba(8,2,0,0.85)",
    glow: "rgba(150,58,10,0.32)",
  },
  projects: {
    base: "#0a0400",
    wash: "rgba(10,4,0,0.82)",
    glow: "rgba(92,48,8,0.26)",
  },
  contact: {
    base: "#000618",
    wash: "rgba(0,6,24,0.88)",
    glow: "rgba(8,70,180,0.22)",
  },
} as const;

export type SectionId = keyof typeof SECTION_PALETTE;
