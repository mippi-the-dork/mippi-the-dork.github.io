# Long-Session Stability Lab - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Long-Session Stability Lab > Design  
**Introduced:** v2.95. **Current specification:** v2.97 (focus-aware behavior introduced in v2.96).

## Intent

The **Stability Lab** is a permanent, opt-in diagnostic tool to observe performance and resource cleanup across extended browsing and repeated real combat workloads. It is not a player-facing game mode or achievement, and it must not award Rupees, progress Invasion, or change persistent gameplay state.

Short, fresh-page benchmarks cannot establish whether an animation system remains responsive after 10, 30, or 45 minutes. The tool therefore observes periodic resource snapshots and can orchestrate repeated 30-second **production-path combined combat** cycles separated by a cleanup/recovery window. It retains the [Combat Performance Lab](../combat-performance-lab/DESIGN.md) and its A/B geometry and renderer switches rather than replacing them.

## Experience

Hidden Console commands `dev stability help`, `start`, `report`, `export`, `stop`, and `soak 10` (2–60 nominal minutes) control the lab. Sampling begins only after explicit activation, roughly every five seconds. JSON exports remain local/downloaded, not auto-transmitted.

A soak runs **30 seconds of synthetic combined combat** per valid cycle, followed by approximately **10.5 seconds of recovery** to verify that projectiles, benchmark targets, Canvas particles, rAF callbacks and pending timers return to expected conditions. Report both active counts and cumulative allocations; a high lifetime timer count is not evidence of live leaks.

## Focus awareness (v2.96)

A page can be visible but not focused, or hidden/minimized, both of which can throttle animation callbacks. Since v2.96, only fully **foreground** cycles count toward the soak's valid performance average.

- **Foreground:** visible and window focused.
- **Visible-unfocused:** visible, but not the active window.
- **Hidden:** tab hidden or minimized.

When focus is lost during combat, cancel and clean up the partial diagnostic run, retain its measurements separately as an **interrupted attempt**, then restart the same numbered cycle after 1.5 continuous seconds of foreground focus. This is a new run, **not** a pause/resume of gameplay simulation. If focus is lost only during recovery, preserve the completed combat result and restart the recovery wait after refocusing. An interrupted soak can therefore take longer than the requested nominal time.

## Evidence and boundaries

A v2.96 short focus-interruption test completed three valid cycles around 52–53 delivered animation FPS after excluding a visible-unfocused interruption. A subsequent **uninterrupted foreground 14-cycle** run recorded 55.0 rAF FPS average for cycles 1–8 and 49.2 for cycles 9–14, about a 10.6% slowdown, with no accumulating benchmark projectiles or persistent Canvas layer at completion. Both findings are compatible: the short recovery logic works, yet another smaller long-session slowdown remains unexplained.

These statistics measure browser `requestAnimationFrame` delivery, **not monitor/GPU presentation FPS**, and they do not prove a memory leak, browser throttling, or an individual renderer cause. A v2.95 soak that had dramatic late collapses was recorded before focus-state accounting; it must not be treated as an uninterrupted foreground result.

## Acceptance

Correctly classify and account for focus/visibility; exclude interrupted attempts; restart only the affected cycle; preserve valid earlier work; stop and clean up queued and active diagnostics; report post-recovery resource states accurately; avoid uncontrolled capture growth; preserve progression and visuals. See [Technical](TECHNICAL.md), [Long-Session QA](../../QA/LONG_SESSION_STABILITY_V2_97.md), and [Investigation Findings](../../QA/PERFORMANCE_INVESTIGATION_FINDINGS.md).