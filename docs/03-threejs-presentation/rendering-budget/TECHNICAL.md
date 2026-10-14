# Three.js Rendering Budget - Technical

**Introduced:** v2.86. **Current specification:** v2.89.

## Culling

A shared `IntersectionObserver` monitors Hero, Ambient and About canvases with **100px preload margin**. Each scene's `requestAnimationFrame` callback continues so it can resume, but `renderer.render()` is skipped when offscreen/hidden. Ambient remains active when onscreen. Do not confuse 0 sampled renderer calls while offscreen with a Three.js loading failure.

## Theme updates

Rare/Epic/Legendary static material/light/particle values update once per theme change rather than at roughly 60Hz. Moving/flickering/opacity animation still updates per visible frame. Cached Hero node references avoid repeated scene-child lookup; Hero readout text changes only when value changes. About scene applies current theme when becoming visible.

## CSS and adapter policy

Ambient and About no longer apply whole-canvas hue-rotation, saturation, sepia or contrast CSS filters for Epic/Legendary; palette remains in Three.js materials. All three scene renderers request `powerPreference:'high-performance'`, which is an advisory hint.

## Inspection

`dev perf` reports sampled render-loop FPS/visibility/DPR/draw calls/offscreen skips, also reflected in `window.__MIPPI_RUNTIME__.snapshot().three.perf`. The richer `dev profile` family adds named update vs synchronous `renderer.render()` timings, **not** GPU-present latency.

## QA

Scroll Hero <-> About in each rarity, change themes while About is offscreen, minimize/restore, inspect `dev perf` after a 2s visible sample. Do not claim a general FPS fix without real-device measurements.
