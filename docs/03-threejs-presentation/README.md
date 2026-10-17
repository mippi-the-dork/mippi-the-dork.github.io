# 03. Three.js and Interactive 3D Presentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation

Covers the 3D presentation layer, runtime loading, scene interaction, navigation behavior, and resilience when external runtime loading is slow or unavailable.

## Purpose

This category groups the canonical documentation for **Three.js and Interactive 3D Presentation**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Three.js Runtime** | Loads and maintains the shared Three.js runtime used by all 3D scenes and provides recovery behavior when initialization fails. | [Design](three-js-runtime/DESIGN.md) | [Technical](three-js-runtime/TECHNICAL.md) |
| **Runtime Health and Startup Watchdog** | Tracks startup state and retries or reports 3D initialization problems without allowing one failed load to permanently disable the experience. | [Design](runtime-health-and-startup-watchdog/DESIGN.md) | [Technical](runtime-health-and-startup-watchdog/TECHNICAL.md) |
| **Hero 3D Scene** | Provides the large interactive 3D hero presentation at the top of the site. | [Design](hero-3d-scene/DESIGN.md) | [Technical](hero-3d-scene/TECHNICAL.md) |
| **Hero Signal Navigation** | Turns hero-scene 3D objects into navigational signals that jump to meaningful portfolio sections. | [Design](hero-signal-navigation/DESIGN.md) | [Technical](hero-signal-navigation/TECHNICAL.md) |
| **Ambient 3D Layer** | Adds supporting ambient 3D motion and depth outside the primary hero interaction. | [Design](ambient-3d-layer/DESIGN.md) | [Technical](ambient-3d-layer/TECHNICAL.md) |
| **About 3D Scene** | Provides the dedicated interactive 3D presentation used in the About section. | [Design](about-3d-scene/DESIGN.md) | [Technical](about-3d-scene/TECHNICAL.md) |
| **3D Interaction Input** | Defines drag, hover, click, pointer, and viewport behavior shared by the site's interactive 3D scenes. | [Design](3d-interaction-input/DESIGN.md) | [Technical](3d-interaction-input/TECHNICAL.md) |
| **Three.js Rendering Budget** | Offscreen WebGL culling, static theme caching and GPU adapter preference. | [Design](rendering-budget/DESIGN.md) | [Technical](rendering-budget/TECHNICAL.md) |

| **Hero Navigation Fallback** | Accessible real-link navigation when Three.js initialization or context fails. | [Design](hero-navigation-fallback/DESIGN.md) | [Technical](hero-navigation-fallback/TECHNICAL.md) |

| **Graphics Capability Fallback** | Detects unavailable/software WebGL and offers lightweight 2D navigation and browser guidance. | [Design](graphics-capability-fallback/DESIGN.md) | [Technical](graphics-capability-fallback/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
