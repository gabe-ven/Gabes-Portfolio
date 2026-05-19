---
name: project-overview
description: Gabriel's portfolio site — stack, structure, branch, key files
metadata:
  type: project
---

Next.js 15 portfolio on branch `redesign`. Dark background with `DarkVeil` WebGL fluid animation. Fonts loaded: `JetBrains_Mono` (var --font-jetbrains-mono), `Press_Start_2P` (var --font-press-start), `Space_Grotesk` (var --font-space-grotesk). Body defaults to `font-mono` (JetBrains Mono).

**Key files:**
- `app/page.tsx` — root layout: DarkVeil bg, Header, HeroSection, AboutSection, ExperienceSection, TechStackSection, ProjectsSection, ContactSection, Footer
- `app/layout.tsx` — font loading
- `app/globals.css` — Tailwind v4 (`@import "tailwindcss"`), global type styles, star animations, `--font-press-start` etc.
- `components/HeroSection.tsx` — dark glass terminal card, Shuffle name animation, Dock with GitHub/LinkedIn/Resume
- `components/Header.tsx` — file-tab navbar (about.md, index.js, etc.), NO traffic-light dots (removed), uses Next.js `Link` + `usePathname`
- `components/AboutSection.tsx` — see [[about-section]]

**Why:** Portfolio redesign on `redesign` branch, not yet merged to `main`.
**How to apply:** Any changes should stay on `redesign` branch. Header traffic-light dots were intentionally removed — do not re-add.
