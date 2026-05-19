---
name: about-section
description: Current design and history of AboutSection.tsx — dark glass panel, Press Start 2P font, photo flush right
metadata:
  type: project
---

**Current design (as of last session):**
- Dark glass panel identical to hero (`rgba(9,9,14,0.87)` + backdrop blur + border + box-shadow)
- Minimal tab bar: `about.md` dot + `Preview` label
- Line number gutter (left), 11 lines
- Text content (left, flex-1) in **Press Start 2P** font (`var(--font-press-start)`)
- All text **monochromatic white/grey only** — no syntax highlight colors
- Content: `# Hi, I'm Gabriel.` heading (1.1rem), blank, 3 metadata lines, blank, horizontal rule, blank, 3 bio lines
- **NO skills section** (user explicitly removed it)
- Photo **flush right** — plain `<img>` with `object-cover object-top`, `alignSelf: stretch`, 280px wide, separated by a 1px border
- No TiltedCard, no ShapeBlur, no corner brackets on the photo

**Design history / what NOT to do:**
- Do NOT add skills back — user removed it
- Do NOT add a bounding box/card around the photo — it should be flush inside the panel
- Do NOT use syntax-highlight colors (purple #, blue ##, green tags) — user hated it
- Do NOT use ScrollReveal GSAP — it forces `clamp(1.8rem-3.2rem)` font size via `.scroll-reveal-text`
- Do NOT use TiltedCard for this section (user wants simple)
- The glass panel/card IS the right container — user confirmed they want this vs. open/floating layout

**Why:** After many iterations the user settled on: hero-style dark glass card + Press Start 2P font + monochrome white + photo flush right. Simple.
**How to apply:** Keep this exact structure. Only iterate on font sizes, spacing, or content text if asked.
