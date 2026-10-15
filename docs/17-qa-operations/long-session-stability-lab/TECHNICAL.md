# Long-Session Stability Lab - Technical Documentation

**Introduced:** v2.95, **focus-aware revision:** v2.96, **current documentation:** v2.97.

## Modules and start order

Both HTML entrypoints initialize deferred scripts in this order:

```text
stability-lab.js
perf-lab.js
particle-renderer.js
combat-lab.js
script.js
```

The Stability Lab installs lightweight timer bookkeeping early, followed by the profiler's source-label wrappers. `window.MippiStabilityLab` provides `start()`, `stop()`, `report()`, `exportData()`, `soakStart(minutes)`, `snapshot()`, `help()`, and getters `active`, `soaking`. `MippiPerfLab.lastMetrics()` supplies compact end-of-cycle frame/long-task reports. `MippiCombatLab` owns production-path benchmark entities and their cleanup.

## Console

```text
dev stability help
dev stability start
dev stability report
dev stability export
dev stability stop
dev stability soak 10
```

Soak duration accepts 2–60 minutes. Approximate cycles = `round(N*60/41.5)`; each is 30 seconds of combined combat plus roughly 10.5 seconds recovery. This is a **cycle selection**, not an exact wall-clock deadline or a promise of exactly N minutes. `soak 2` can produce three valid cycles.

The monitor records every ~5 seconds and retains at most **1,500** snapshots, then drops oldest samples and marks `truncated`. The 5-second sampling/independent rAF loop runs only while monitoring. The timer-ID wrappers remain installed even when monitoring is inactive.

## Snapshot and lifecycle data

`raw.samples[*]` includes `atMs`, `elapsedSec`, note, combat activity, renderer/geometry, total DOM elements and temporary target/emitter counts, `cssAnimations`, current pending timeouts and intervals, **cumulative** scheduled timers (different meaning), timeout age buckets, `projectileLifecycle` (all/diagnostic hostile and player shots, cached target counts), Canvas `active`/`mounted` plus totals, and `jsHeapBytes` where available.

`dev stability report` reads **live state**, not just the previous 5-second point. The regular profile's JSON adds `stabilityInitial` / `stabilityFinal`. Standalone downloads have a `mippi-stability-v2.97-<timestamp>.json` identity (latest build label).

v2.95 cleanup hardening maintains a Set of live hostile projectile removal callbacks, with a separately tagged diagnostic subset. Each removal cancels the corresponding rAF and lifetime guard. Combat teardown removes only diagnostic hostile/player shots and tagged targets; ordinary live shots survive. The shared player rAF cancels when empty. A tracked 400ms queued benchmark start is cancelled if stopped before actual run, avoiding orphaned starts. Cumulative scheduled timers are not pending timers.

## Focus-aware state machine (v2.96)

State priority: `document.hidden` gives `hidden`; otherwise if `!document.hasFocus()`, `visible-unfocused`; otherwise `foreground`. `visibilitychange`/`focus`/`blur` listeners record timestamped transitions; a 5-second check reconciles missed events. State accounting uses `performance.now()` and includes the active state's partial duration.

A separate single rAF chain captures per-state callback counts, interval means, maximum gaps, and >=33.3/100ms delays. Cross-state intervals are **not** assigned to either state. First frame after return and following 5-second recovery cadence are recorded; interrupted recoveries are labeled.

- Focus loss **during combat**: cancel+cleanup, write an `interruptedCycles` partial record, do not increment valid-cycle count; after **1.5s continuous foreground**, restart the same cycle.
- Focus loss **during recovery**: retain completed combat metrics and restart only the ~10.5s recovery.
- A completed soak leaves monitoring active for post-test reporting/export. `stop` cancels the queued or live diagnostic cycle and monitoring and unregisters observers/listeners.

## Export fields and caps

Standalone Stability JSON has `diagnosticHarness: v2.97-stability` build labeling and retains existing `raw.cycles`, `raw.soak`/`soakSummary`. v2.96 added `raw.focusSummary` (state durations, rAF, transitions, recoveries), `raw.focus.events`, `raw.samples[*].visibility/windowFocused/isDocumentHidden`, `raw.interruptedCycles`, and per-cycle `validForeground`. Focus event cap **500**, interrupted attempt cap **250**. The protocol stores only **valid foreground** completed cycles in the performance mean.

## Known reporting cautions

The analyses observed a few low-priority inconsistencies: `focusSummary.foregroundMs` is cumulative while some nested `focus.durationMs` values look like a partial snapshot; `recoveries[].atMs` and `returnedAt` may use differing time origins; `interruptedAttemptsBeforeCompletion` appears cumulative across cycles; `soak.currentCycle` appears to be the **next** index; `samples[].focusDurationMs` was zero in an otherwise valid uninterrupted 14-cycle run. Treat them as **field-definition/reporting questions**, not evidence the focus-aware control failed.

Use the [Stability QA](../../QA/LONG_SESSION_STABILITY_V2_97.md) for acceptance, including foreground-only comparisons and the unresolved v2.96 phase change.