---
name: project-context
description: Portfolio redesign branch state — sections, components, key decisions as of May 2026
metadata:
  type: project
---

Portfolio is on the `redesign` branch of `/Users/gabrielvenezia/Developer/Gabes-Portfolio`.

## Page structure (app/page.tsx order)
1. HeroSection
2. AboutSection
3. ExperienceSection — ScrollStack with Lenis, 5 colored cards, scroll handoff via scrollIntoView
4. ProjectsSection — Aceternity carousel (`components/ui/carousel.tsx`) with infinite loop (2 clones per end), flip cards (`ProjectFlipCard.tsx`) showing description/tags/links on back
5. GlobeSection — "WHERE I SHOOT" travel log; uses `three-globe` + Three.js (`components/ui/globe.tsx`) via `dynamic` import (ssr:false); Aceternity-style globe with white polygon continents, arcs, atmosphere; SF marker; photo gallery drawer
6. ContactSection

## Key components
- `components/ui/carousel.tsx` — infinite carousel, `SlideData = Omit<FlipProject,"image"> & { src }`, CLONES=2, transitionEnd guard (`e.target !== e.currentTarget`)
- `components/ProjectFlipCard.tsx` — flip card with front (image) and back (description, tags, GitHub/demo links)
- `components/ui/globe.tsx` — World component using three-globe + OrbitControls; fetches country GeoJSON from GitHub at runtime
- `components/GlobeSection.tsx` — section wrapper; left text panel + right globe; photo gallery drawer (AnimatePresence slide-in)
- `components/ExperienceSection.tsx` — scroll handoff: going up lets native scroll handle it; going down uses scrollIntoView({behavior:"smooth"}) with 900ms cooldown

## Dependencies added this session
- `cobe` (installed but replaced by three-globe approach)
- `react-globe.gl` + `three-globe` (npm install --legacy-peer-deps)

## Known issues / pre-existing TS errors (not introduced by us)
- StarBorder.tsx — children type error
- Waves.tsx — null checks
- TargetCursor.tsx — comparison overlap

**Why:** These were pre-existing and not blocking the build.
**How to apply:** Don't try to fix these unless user asks; they don't affect functionality.
