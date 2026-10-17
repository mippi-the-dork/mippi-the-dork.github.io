# Hero Navigation Fallback - Design Documentation

**Introduced:** v3.07. **Current documented version:** v3.10.

## Intent

The Three.js Hero is an interactive portfolio navigation surface, not a requirement for navigating the website. If WebGL fails to initialize or its context is lost, visitors must still be able to reach the major professional sections using a functioning **2D signal-navigation fallback**, rather than decorative labels that look clickable but do nothing.

## Fallback navigation

Four real links are available in the Hero fallback:

| Signal | Destination |
| --- | --- |
| **Games** | `#games` |
| **Career** | `#career` |
| **Consulting** | `#consulting` |
| **Tools** | `#tools` |

These are actual keyboard-accessible anchors. Their activation preserves the meaningful Hero Signal navigation/achievement experience where appropriate, without requiring pointer raycasting or a WebGL context. The Three.js canvas is decorative to assistive technology and remains `aria-hidden`.

When the real 3D scene successfully initializes, it replaces the fallback; the fallback becomes active again if the context is lost or initialization throws. This is a resilience pathway, not a theme or graphics-quality setting.

## Acceptance

Simulate failed import/context initialization and later WebGL context loss. Test all four links with mouse and keyboard, ensure section navigation still works, no invisible canvas blocks clicks, and telemetry/Signal Acquired handling remains reasonable. The experience should remain usable even if no 3D rendering can recover.

See [Technical](TECHNICAL.md), [Runtime Health](../runtime-health-and-startup-watchdog/TECHNICAL.md), and [v3.10 QA](../../QA/V3_05_TO_V3_10_REGRESSION_QA.md).
