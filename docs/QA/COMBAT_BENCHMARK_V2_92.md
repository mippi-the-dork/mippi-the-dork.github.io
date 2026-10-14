# Combat Benchmark QA - v2.90 to v2.92

**Basis:** v2.90/2.91/2.92 handoffs plus separately uploaded user profiler analyses. **Status:** Real Windows v2.92 confirmation pending.

## Preconditions

Use an HTTP server and Windows Edge with matching theme, viewport, refresh rate, power mode, cursor motion, and site state. Confirm latest runtime loads `perf-lab.js`, `combat-lab.js`, then `script.js`. With the Console open (`~`), `dev combat` gives instructions. The ordinary player Help does not list the harness.

Run scenarios `idle`, `player`, `ufo`, `combined`, `explosions`, each using `dev combat run <mode> 30`. Record `dev combat report` and `dev combat export` after each capture. Durations accepted: 10–45s. Only player-created benchmark objects should be removed on stop. After any isolation test, run `dev profile reset`.

## Geometry Comparison

1. At Legendary theme, 2151×1307 viewport and a fixed scroll/pointer, run `dev combat geometry off` then `dev combat run combined 30`; export.
2. Run `dev combat geometry on` with identical settings; export.
3. Reverse order and repeat: optimized, then legacy (ABBA).
4. Verify same hostile shot count, comparable player shot attempts, consistent frame distributions (mean/p95/p99, >=33ms/100ms, long task count/duration), active peaks, spawn/cleanup.
5. Observe `combat.geometry.target.read`, `emitter.read`, `modelHit`, `effect.modelHit`, `animation.lookup` and inclusive nested scope warnings.
6. Test v2.92 modeled flight center accuracy for moving UFO, Boss, Star, Heart, Rupee, Doug Bone and benchmark targets. Compare three or more animation positions per object, at normal and Slowmo duration and after resize/scroll.
7. Stop early; verify all lab-tagged entities removed but organic active pickups/shots remain; normal Director spawning resumes; rewards/achievements unchanged. Verify `geometry` switch cannot change during a running capture.

## Evidence available from uploaded analyses

| Test | Observed result | Caveat |
| --- | --- | --- |
| v2.90 idle | 59.4 approximate rAF FPS | Not GPU-present FPS |
| v2.90 player | 35.7 | Synthetic high-rate shots |
| v2.90 UFO | 29.8 | Fixed synthetic emitters |
| v2.90 combined | 11.7 | Saturating load, not ordinary gameplay |
| v2.90 explosions | 50.3 | CSS/compositing may be a separate bottleneck |
| v2.91 legacy combined | 313 frames/30s, ~10.4 FPS | Test was sequential |
| v2.91 cached combined | 563 frames/30s, ~18.8 FPS | Different objective presence; repeat ABBA |
| v2.92 headless parity | 105 player and 164 hostile shots each mode (10s) | Does not verify Windows smoothness |

**Do not claim the FPS regression is solved.** `requestAnimationFrame` counts and synchronous `renderer.render()` durations do not measure the final compositor/presentation frame timing. For unexplained stalls, capture Chromium Performance traces.

## Export Version Hygiene

Confirm `version`, `diagnosticHarness`, downloaded filename, `version` Console command, runtime asset query suffixes and preview URL all agree. Historical v2.90 and v2.91 examples had filename/metadata mismatches. Do not silently recast those exports as clean v2.92 results.