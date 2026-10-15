# Long-Session Stability QA (v2.95–v2.97)

**Current documented version:** v2.97. **Performance metric:** delivered rAF frames, not externally verified GPU presents.

## Test procedure

Use Windows Edge with a fixed viewport, zoom, Legendary theme, Hero visible, optimized geometry, Canvas particles and full visuals. Use `dev stability start`, `report`, `export`, `stop`; test `dev stability soak 10` (accepted 2–60 nominal minutes). Collect resource snapshots every five seconds; separate pending vs cumulative timer totals.

1. **Fresh baseline:** refresh, warm up 60 seconds, start Stability Lab, run `dev combat run combined 30`, then allow ~20 seconds recovery. Verify no benchmark targets/ships, projectile callbacks, cached targets or Canvas layer remain.
2. **Uninterrupted soak:** run `dev stability soak 10` and keep Edge foreground-focused throughout. For an approximately 10-minute session, expect **14 valid 30-second combat cycles**, each followed by ~10.5s recovery.
3. **Interruption test:** lose focus during a combat attempt, once while still visible and once by hiding the tab. Confirm partial attempt is excluded, cleaned up and restarted only after **1.5 seconds continuously foreground**. Losing focus during recovery should repeat recovery without invalidating an already completed cycle.
4. **Long natural session:** monitor 30–45 minutes and record time/state when an actual slowdown begins. Export standalone stability JSON and corresponding `dev profile export` where helpful.
5. **Stop/abort:** cancel a pending 400ms Combat Lab start and active benchmark; preserve unrelated normal-game projectiles; ensure monitoring and listeners stop.

## Historical measured evidence

| Source | Finding | Interpretation |
| --- | --- | --- |
| v2.95 14-cycle soak | First eight ~51.2 rAF FPS; cycles 9–12 ~24.4; cycle 13 ~6.4, followed by ~52.7 cycle 14 | Focus/visibility not yet measured; cannot attribute to foreground performance or a leak |
| v2.96 focus interruption, 3 cycles | 53.07, 52.70, 52.07 rAF FPS; one partial attempt excluded | Focus-aware interrupted/restarted accounting passed |
| v2.96 uninterrupted 14-cycle soak | First 8 **55.01** FPS; last 6 **49.17** FPS; long tasks **42** vs **103** | Valid 10.6% step-down remains unexplained; not a monotonic resource leak |
| v2.96 eight separate 30s runs | Normal-cursor 45.9–54.3; two enlarged-cursor runs **18.5** and **23.6** | Strong cursor-class correlation, not causal proof; led to v2.97 Cursor Lab |

## Resource acceptance

- Active diagnostic player/hostile projectiles and Lab target/ship counts return to zero after recovery; ordinary game objects may still exist.
- Canvas cumulative spawned/expired converges and no Canvas layer/loop remains when all effects expire.
- Compare **currently active** timeouts/intervals with baseline; never treat total scheduled timers as pending.
- Record DOM/heap counts, but fluctuations do not independently prove a memory leak.
- Check `raw.focusSummary` and `interruptedCycles`; exclude hidden and visible-unfocused samples from trustworthy foreground-combat averages.
- Avoid treating `samples[].focusDurationMs:0` as a failure when authoritative focus summary is populated. Flag this and differing time origins/cumulative interruption fields for later low-risk diagnostic polish.

If slowdown recurs in a **verified foreground** state, capture a short Edge DevTools Performance trace with main-thread scripts, style/layout, raster/paint and compositor work. Do not automatically rewrite the Canvas renderer or reduce visual quality.

See [Stability Lab Technical](../17-qa-operations/long-session-stability-lab/TECHNICAL.md) and [Performance Investigation Findings](PERFORMANCE_INVESTIGATION_FINDINGS.md).