# Performance Profiling - v2.89 QA Procedure

**Current diagnostic baseline:** Mippi Portfolio v2.89.

**Status:** FPS regression investigation is **open**. This is not an optimization signoff.

## Starting Conditions

Use Windows Edge or Chrome at a consistent viewport (ideally 1710 x 1307), zoom, Epic Hero scroll position, site state, and hardware acceleration. Let assets/Three.js initialize, then record. Do not open DevTools profiling simultaneously with the internal sampler. Prefer a repeated baseline / intervention / baseline sequence.

Open Dev Console (`~`). `dev perf` gives Hero/Ambient/About sampled renderer-call rate and visibility, **not measured GPU-presented FPS**. To record, `dev profile sample 15` closes Console and waits 0.4s before recording 15 seconds (allowed 5–40 seconds). Afterward, reopen Console and run `dev profile report` followed by `dev profile export` for local JSON.

## Recommended v2.89 Four-Recording Set

| Capture | Setup | Action | Filename |
| --- | --- | --- | --- |
| A: normal | `dev profile reset`, no objective visible | `dev profile sample 15` | `v289_A_BASE.json` |
| B: objective active | `dev profile reset`; `dev objective random` | `dev profile sample 15` | `v289_B_OBJECTIVE.json` |
| C: objective clock isolated | `dev profile objectiveclock off`; `dev objective random` | `dev profile sample 15` | `v289_C_OBJECTIVECLOCK_OFF.json` |
| D: baseline repeated | `dev profile reset`, no objective | `dev profile sample 15` | `v289_D_BASE2.json` |

If objective expires mid-recording, repeat with a newly forced objective. **The clock isolate freezes only displayed countdown text**; the actual deadline, reward and failure logic stay active. Confirm `isolationSkipped.objectiveclock > 0` during C or the experiment did not exercise the isolate.

## Alternate Isolation Matrix

| Command | Scope / side effect |
| --- | --- |
| `dev profile hud off/on` | Hide HUD paint, preserve underlying JS |
| `dev profile hudfx off/on` | Disable HUD cosmetic effects |
| `dev profile themefx off/on` | Reduce broad CSS visual effects, keep rarity/scene geometry |
| `dev profile cursorfx off/on` | Disable cosmetic pointer particles, not game pointer logic |
| `dev profile ambient off/on` | Hide Ambient canvas (not its internal logic) |
| `dev profile hero off/on` | Suspend Hero update/render |
| `dev profile about off/on` | Suspend About update/render |
| `dev profile ambientlogic off/on` | Suspend Ambient scene logic |
| `dev profile projectiles off/on` | Suspend active shot simulation; don't clear shots |
| `dev profile hudlogic off/on` | Stop selected HUD update routines, so display may become stale |
| `dev profile objectiveclock off/on` | Stop only 200ms countdown text writes |
| `dev profile reset` | Restore all isolates, **not** gameplay save reset |

Use matched A/B/A runs. The v2.87 rollout first tested HUD, theme, cursor and Ambient paint; v2.88 added logic isolates; v2.89 added Objective-clock and timer attribution.

## Interpret Captures

Examine frame interval p50/p95/p99 and >=33/50/100ms stalls. In JSON:

- `raw.systems`: named costs such as `hero.update`, `hero.renderCall`, `projectiles.update`, `director.evaluate`, `objectives.tick`, `hud.*`.
- `raw.timerEvents` / `systems['timer.*']`: timer callback source, frequency and duration.
- `systems['objectives.clockUpdate']`: visible clock-update time.
- `raw.domEvents`, `domTotals`: objective, toast, HUD changes.
- `raw.uiSnapshots`, `initialUI`, `finalUI`: what was happening while sampling.
- `raw.spikes[].nearbyTimers`, `nearbyDomChanges`: activity within about 110ms before and 15ms after spike.
- `raw.longFrames[].scripts`: Chromium attribution if supported, may be absent.
- `raw.isolationSkipped.objectiveclock`: proof isolation ran.

`renderer.render()` measured synchronous JS time, **not GPU execution or compositor presentation**. Nearby callbacks/DOM events are correlation only, not causation. The profiler itself adds cost, including startup registration wrappers in v2.89. For persistent unexplained stalls, obtain Chrome/Edge Performance trace with detailed JS/style/paint/GPU evidence.

## Release Test

Finish with `dev profile reset` and reload before natural progression QA. The performance result is **inconclusive until tested on the author's real browser/hardware**. Do not report v2.86–v2.89 as a resolved FPS fix.
