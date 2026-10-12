# 13. Interaction and Debug Modes

**Hierarchy:** Documentation Home > Interaction and Debug Modes

Documents the modes that alter how the user interacts with, inspects, or visually interprets the portfolio without changing its core content.

## Purpose

This category groups the canonical documentation for **Interaction and Debug Modes**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Interact Mode** | Lets the player suppress normal portfolio clicks while hunting game-layer interactions and is unlocked through the Shop. | [Design](interact-mode/DESIGN.md) | [Technical](interact-mode/TECHNICAL.md) |
| **Inspect Mode** | Exposes annotated implementation or inspection targets without replacing normal portfolio behavior. | [Design](inspect-mode/DESIGN.md) | [Technical](inspect-mode/TECHNICAL.md) |
| **Design Mode** | Adds design-intent commentary after the Shop capstone is purchased. | [Design](design-mode/DESIGN.md) | [Technical](design-mode/TECHNICAL.md) |
| **Vibe AI Mode** | Provides the site's playful AI-flavored presentation mode and supports the authored AI Wish corruption sequence. | [Design](vibe-ai-mode/DESIGN.md) | [Technical](vibe-ai-mode/TECHNICAL.md) |
| **Lumen Visualization** | Provides a console-driven parody visualization state inspired by Unreal Engine rendering debug views. | [Design](lumen-visualization/DESIGN.md) | [Technical](lumen-visualization/TECHNICAL.md) |
| **Nanite Visualization** | Provides a console-driven triangle visualization state inspired by Unreal Engine Nanite debug views. | [Design](nanite-visualization/DESIGN.md) | [Technical](nanite-visualization/TECHNICAL.md) |
| **Particle Boost** | Provides a temporary presentation modifier that increases the site's screen-space particle emphasis. | [Design](particle-boost/DESIGN.md) | [Technical](particle-boost/TECHNICAL.md) |
| **Stat Overlay** | Displays FPS or unit-style runtime statistics as an optional diagnostic overlay. | [Design](stat-overlay/DESIGN.md) | [Technical](stat-overlay/TECHNICAL.md) |
| **Control Strip Ordering** | Defines the persistent screen-space control order as Design Mode, Inspect Mode, Interact Toggle, then Hint. | [Design](control-strip-ordering/DESIGN.md) | [Technical](control-strip-ordering/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
