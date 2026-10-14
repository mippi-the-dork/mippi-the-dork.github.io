# Combat Visual Isolation - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Combat Visual Isolation > Technical

**Introduced:** v2.93. **Current documented version:** v2.94.

## Ownership and API

`window.MippiCombatVisuals.enabled(kind)` checks a cosmetic category; `window.MippiCombatVisuals.snapshot()` returns all five modes. `window.MippiCombatLab.visual(kind, value)` validates Console requests, refuses mode changes during a running benchmark, and sets/removes diagnostic classes on `<html>`. `script.js` owns combat and `explodeAt()`; `combat-lab.js` owns benchmark settings/counters; `perf-lab.js` owns sampling/export.

| Mode | OFF class | Implementation |
| --- | --- | --- |
| `player` | `profile-hide-combat-player` | `visibility:hidden` on `.legendary-player-projectile` |
| `ufo` | `profile-hide-combat-ufo` | `visibility:hidden` on `.ufo-projectile` |
| `explosions` | `profile-no-combat-explosions` | `explodeAt` skips cosmetic emission, hides pre-existing particles |
| `explosionpaint` | `profile-hide-combat-explosionpaint` | DOM: hidden `.arcade-pixel`; Canvas: hide shared layer while particle lifecycle continues |
| `glow` | `profile-no-combat-glow` | Strip targeted shadow/filter/blend effects from combat visuals |

The explosionpaint override intentionally **does not remove** the particle workload. In DOM mode it keeps node insertions, CSS animation and removal timers. In Canvas mode it keeps particle records, updates and expiry even though the shared Canvas is hidden.

## Commands

```text
dev combat visual status
dev combat visual player off
dev combat visual ufo off
dev combat visual explosions off
dev combat visual explosionpaint off
dev combat visual glow off
dev combat visual all on
dev profile reset
```

Each visual toggle also accepts `on`. None persists across reload. `dev profile reset` resets all visual switches, but intentionally **does not** change selected geometry mode or Canvas/DOM renderer mode.

## Counter semantics and export identity

v2.93 adds `effectCalls`, `effectElementsRequested`, `effectElementsEmitted`, `effectElementsSuppressed` for **all production** `explodeAt()` events, rather than only bursts intentionally scheduled by Explosion benchmark mode. Previous `explosions` and `particles` benchmark counters remain backward-compatible, **not authoritative for total production emissions**.

Snapshots include `liveDom`, `peakDom`, player/UFO/particle DOM counts and the pinned `geometryMode` and `visualModes` for each benchmark, as well as JSON `testLabel`. Export filenames are unique and include version, rarity theme, test mode, geometry, disabled visuals, renderer (from v2.94), and UTC timestamp.

**v2.94 changes the meaning of `effectElementsEmitted`:** it counts logical emitted sprites across either backend, not necessarily created HTML elements. Use new `effectCanvasParticles` vs `effectDomParticles` to distinguish physical output. The `rendererMode` and `sessionAgeMs` fields help compare test conditions.

## Profiling caveats

Hidden bullet paint does not remove their simulation/DOM cost. Suppressing explosion emission removes that category's animated elements/timers **in DOM mode**, making it broader than paint-only isolation. Turning off glow changes selected styles, not global rarity theme effects. The five historical v2.93 captures ran sequentially: the fifth hidden-paint run occurred much later in the session and cannot establish a causal hidden-paint penalty.

Use [Performance Investigation Findings](../../QA/PERFORMANCE_INVESTIGATION_FINDINGS.md) and [Combat Visual Rendering QA](../../QA/COMBAT_VISUAL_RENDERING_V2_94.md) for the data and controlled comparisons.