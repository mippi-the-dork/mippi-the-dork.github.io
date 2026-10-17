# Canvas-First 2D Cosmetic FX - Technical

**Introduced:** v2.99, retained and visually refined in v3.00. **Current documented version:** v3.01.

## Files and initialization

`fx-renderer.js` exposes `window.MippiFxRenderer` with `spawn`, `setMode`, `reset`, `clear`, `snapshot`, `report`, `help`. Include it before gameplay `script.js`. `script.js` owns emitters and calls FX Canvas first; on mode DOM or failed Canvas2D acquisition it uses existing CSS/DOM fallback emitters. `particle-renderer.js` independently renders combat explosions.

## Rendering pipeline

Two viewport-level pointer-transparent, aria-hidden layers (`low` / `high`) mount lazily and detach when particle counts reach zero. One active rAF loop updates records, renders cached image sprites and expires them with swap removal, rather than creating per-particle timers. Bounded `sprites` cache: **128**; total active cosmetic cap: **600** with tracked drop count. Canvas backings resize to viewport/DPR; cached color hues are quantized for reuse.

`low`: Trail, command particles. `high`: Star Power rainbow and Cool Doug Bone wake. Effects store position, velocity, lifetime, palette and opacity/size; none owns collision or game state.

The cursor aura remains DOM. Movement updates are coalesced into one rAF applying CSS individual `translate` instead of `left/top` each pointer event. Under Scoped cursor architecture, the invisible legacy power cursor stops receiving those writes.

## Commands and observability

```text
dev fx help
dev fx status
dev fx renderer canvas
dev fx renderer dom
dev fx reset
```

Mode is memory-only; blocked during active Combat Lab benchmarks. Switching clears **cosmetic** sprites from prior backend and does not end Star Power, Doug Coolness or combat. `dev combat renderer` is a **separate** explosion renderer switch.

Profiler v2.99+ captures `fxInitial`, `fxFinal`, per-kind spawn totals, dropped count and renderer Canvas update timings, plus a `POINTER` summary with event count and accumulated pixels moved during capture. Filename identifies `fx-canvas` or `fx-dom`. Snapshots are cumulative within page lifetime, so use before/after deltas for per-run comparisons.

## Release history and limitations

v2.99 uses cached radial glow sprites. v3.00 refines their cores and halo falloff toward the original DOM treatment; `fx-renderer.js` remains the default cosmetic backend. v2.99 in-memory Chromium smoke tests validated layers, reset, toggles and no console error, not full browser fidelity or sustained real-device FPS. No persistence schema, shooting or reward behavior changed in v2.99.

See [QA](../../QA/CANVAS_FX_V2_99.md).
