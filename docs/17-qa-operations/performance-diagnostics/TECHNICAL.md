# Performance Diagnostics - Technical

**Current specification:** v2.89. Runtime code: `perf-lab.js` loaded before `script.js`, plus named hooks in `script.js`.

## Hidden diagnostics

`dev perf` (v2.86) reports per-scene sampled render-call FPS, visibility, DPR, WebGL draw calls and skipped offscreen frames; `window.__MIPPI_RUNTIME__.snapshot().three.perf` holds comparable values. This is not actual display presentation FPS.

`window.MippiPerfLab` (v2.87 onward) provides opt-in timing/report infrastructure. Ordinary `help` does not list profiling commands.

### DEV command surface

`dev profile help`, `boot`, `sample 15` (5–40s), `start`, `stop`, `report`, `export`, `reset`.

Presentation isolate toggles: `hud`, `hudfx`, `themefx`, `cursorfx`, `ambient` followed by `off/on`. Note `ambient` hides a canvas, not its update logic.

v2.88 logic isolates: `hero`, `about`, `ambientlogic`, `projectiles`, `hudlogic` followed by `off/on`. They suspend corresponding updates, potentially leaving gameplay shots or displayed HUD data stale.

v2.89: `dev profile objectiveclock off/on` pauses **only visible countdown text updates**, not objective deadlines, failure timers, success or rewards.

## Recording and export

Capture rAF interval distribution (mean, p50, p95, p99, max), counts >=33/50/100ms, slow callbacks, browser long tasks/long animation frames, startup FCP/DOM/HUD mount, CSS animation count, and targeted DOM mutations. v2.88 adds `raw.systems` e.g. `hero.update`, `hero.renderCall`, `ambient.update`, `ambient.renderCall`, `about.update`, `about.renderCall`, `projectiles.update`, `director.evaluate`, `objectives.tick`, `cursor.rainbowSparks`, `cursor.commandParticle` and `hud.*`. Avoid adding nested `raf.*` and child costs as if non-overlapping.

v2.89 adds `raw.timerEvents`, `systems['timer.*']`, `systems['objectives.clockUpdate']`, `domEvents`, `domTotals`, `uiSnapshots`, `initialUI`, `finalUI`, `spikes[].nearbyTimers`, `spikes[].nearbyDomChanges`, `longFrames[].scripts`, and `isolationSkipped.objectiveclock`.

Timer wrappers capture registration source and requested interval while preserving arguments, handles and exceptions. Named rAF matcher handles versioned `script.js?v=2.89:line:column` locations. `#dynamic-objective`, `#system-toast-stack`, `#site-game-hud` are mutation targets. The objective countdown write is sampled approximately every 200ms. Each spike correlates timers/DOM activity from ~110ms before to 15ms after: proximity is **not causation**.

## Startup/overhead caveat

v2.87 profiler was mostly idle outside recording; v2.89 timer wrappers are installed at startup to name future callbacks and may incur a small registration-time overhead even when not capturing. Chromium attribution may be missing/partial. Do not present the instrumentation as zero-cost or as a confirmed fix.

## Next diagnostic experiment

At Epic Hero with matched resolution, mouse and game state, run repeated:
A baseline; B timed objective; C objective present but `objectiveclock off`; D restored baseline. `dev profile sample 15`, then `report` and `export` per run. Check `isolationSkipped.objectiveclock`; if zero, the isolate wasn't exercised. Repeat suspicious comparisons and, if inconclusive, record a real browser Performance trace. Restore `dev profile reset`.


## v2.90–v2.92 Combat Lab and Geometry

Permanent opt-in `combat-lab.js` now adds five stress scenarios and a diagnostic adapter to production combat. v2.91 adds geometry cache A/B; v2.92 uses animation-clock authored motion positions in optimized mode, with legacy and cache fallback retained. Five-scenario performance results and limitations are documented in [Combat Benchmark QA](../../QA/COMBAT_BENCHMARK_V2_92.md). The current documented Combat Lab specification is v2.92.


## v2.93–v2.94 Current Update

v2.93 profiler snapshots record pinned visual and geometry modes, production `explodeAt()` effect calls/particle request/emission/suppression, active/peak DOM node counts and `testLabel`. v2.94 adds `combat.particles.canvasSpawn` and `combat.particles.canvasFrame`, backend-specific physical counts, `rendererMode`, Canvas snapshot totals and `sessionAgeMs`. Rendering callback cost is CPU JS time, not browser paint/compositor/GPU presentation. Renderer and geometry choices remain independent of `dev profile reset`.
