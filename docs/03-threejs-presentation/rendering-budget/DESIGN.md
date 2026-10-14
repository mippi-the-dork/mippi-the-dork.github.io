# Three.js Rendering Budget - Design

**Introduced:** v2.86. **Current specification:** v2.89.

The Hero, Ambient, and About WebGL scenes remain part of portfolio presentation. v2.86 reduced unnecessary work without redesigning geometry, lighting or particle counts. These changes are **optimizations to reduce wasted work**, not proof that the reported real-device frame stutter has been fully resolved.

- Skip rendering a scene while its canvas is offscreen or the browser tab is hidden.
- Resume scene rendering when it becomes visible, preserving theme-correct appearance.
- Apply static theme/material constants on rarity changes, not on every frame.
- Remove redundant full-canvas CSS post-filters from Ambient and About; Three.js materials already encode rarity colors.
- Ask browsers for a high-performance GPU adapter consistently, recognizing the browser may ignore the hint.
- Keep animation and other legitimately changing values updating on rendered frames.

v2.87–v2.89 then added measurement tools to distinguish JS, scene, DOM and compositor costs; they are covered in [Performance Diagnostics](../../17-qa-operations/performance-diagnostics/DESIGN.md).

## Acceptance

At Hero, About and offscreen positions, test Rare/Epic/Legendary, scrolling, tab hide/show, and theme changes while About is offscreen. Invisible scenes should not continue GPU drawing. Run real Windows browser comparisons before concluding overall FPS has improved.
