# Performance Investigation Findings

**Evidence:** Four user-uploaded analysis documents: v2.78/v2.87 baseline comparison instructions, v2.88 three-test analysis, v2.90 combat workload analysis, and v2.91 legacy/cached geometry A/B analysis. These documents are contextual evidence, not code fixes.

## Baseline v2.78 vs v2.87

The instrumented v2.78 comparison preserves its original floating HUD and gameplay and ports compatible profiler hooks. Comparable system states, theme, viewport, browser, scroll and input cadence are required. In v2.78 offscreen canvases may continue rendering; in newer builds they can stop. `dev profile hud off` targets the old floating roots in v2.78 and unified dock in v2.87; those are not identical widgets.

## v2.88 Three-Test Report

| Statistic | Baseline | Hero off | HUD logic off |
| --- | ---: | ---: | ---: |
| Sample frames | 758 | 825 | 890 |
| Mean rAF interval (ms) | 19.79 | 18.18 | 16.85 |
| p95 (ms) | 33.4 | 33.3 | 16.8 |
| >=33ms frames | 91 | 47 | 6 |
| Long tasks | 31 | 10 | 4 |

The HUD-logic-off case was smoother **but no HUD update calls or skipped updates were recorded**, so it did not establish a causal HUD bottleneck. Disabling Hero did skip Hero updates and reduced stalls, but did not eliminate them. Some 200ms long-task cadence prompted additional objective-clock instrumentation in v2.89. No direct GPU/compositor trace was included.

## v2.90 Combat Workloads

In Legendary Windows Edge at 2151×1307 DPR1, thirty-second rAF delivery averages: idle 59.4, player 35.7, UFO 29.8, combined 11.7, explosions 50.3 FPS. Player acquisition (many animated target DOM reads) and hostile projectile creation (emitter DOM reads) are major timed paths under synthetic stress. Explosions may add CSS animation/paint cost, though measured JS spawn time is smaller.

## v2.91 A/B

The optimized combined run achieved ~18.8 rAF FPS vs ~10.4 legacy with equal **500 UFO shots**. Optimized emitter reads still cost ~1.32 seconds vs legacy ~8.23 seconds (500 calls). New player acquisition and target reads remain expensive and sample order/objective visibility confounded results. These measurements motivate v2.92 modeled geometry but do not certify its effects.

## Current Research Status

v2.92 implements intended authored motion geometry with cache fallback and legacy switch. Headless parity samples were reported, but Windows/Edge repeatable A/B and actual compositor trace have not yet been submitted in the handoff. Preserve permanent instrumentation and ensure version metadata remains internally consistent across the build. Cross-check [Combat Benchmark QA](COMBAT_BENCHMARK_V2_92.md) before declaring a performance outcome.

## v2.93 Combat Visual Isolation Findings

Five user-recorded 30-second Legendary combined runs (2151×1307, DPR1) returned rAF-equivalent frame rates: **30.4** with all visuals, **49.8** with explosion particle emission suppressed, **30.5** with player/UFO paint hidden, **24.3** with glow off, and **15.3** with explosion paint hidden. Corresponding long-task counts: **115, 22, 114, 184, 287**. In the all-on run, 4,144 animated DOM particles were emitted, compared with zero in emission-off. The fifth capture occurred much later in the browser session, so it does not establish that `visibility:hidden` caused worse performance. Distinguish DOM creation/animation/paint/composition as unresolved contributors, not isolated causal subcosts.

## v2.94 Renderer Follow-Up

The structural response is a shared Canvas2D default for `explodeAt()`, with original CSS/DOM mode retained as an explicit A/B comparison and fallback. This is **an implemented architectural change**, not a measured real-Windows improvement from the supplied evidence. Headless software-rendered smoke tests passed. Continue with the matched DOM→Canvas→Canvas→DOM 30-second comparison, preserving particle counts and visual parity across gameplay effects. See [v2.94 QA](COMBAT_VISUAL_RENDERING_V2_94.md).

## v2.94 Fresh-Page vs Same-Session Renderer Evidence

A fresh-page comparison at Legendary, 1973×1307 DPR1 (separate loads per case) delivered ~**30.6 rAF FPS** using DOM explosion particles, **54.7** using Canvas, and **56.1** with Canvas and explosion emission suppressed, supporting Canvas as the default for that fresh-state workload. A separate late-session v2.94 DOM→Canvas→Canvas→DOM sequence started ~38–42 minutes into one page and delivered **22.1, 18.8, 18.1, 10.7** rAF FPS respectively. That test showed about a **43x improvement in the instrumented explosion spawn function**, but did **not** demonstrate better overall delivered frames in that shared-session comparison. Browser state/test order and objectives differed. Neither proves a memory leak or GPU-present FPS improvement.

## v2.95 Long-Session Soak

The 14-cycle, ~9.7-minute auto-combat test completed, with first eight cycles averaging ~**51.2** rAF FPS, cycles 9–12 ~**24.4**, cycle 13 ~**6.4**, and cycle 14 recovery ~**52.7**. Canvas animation frames did not advance for an extended ~33-second interval while some timers continued and pending Canvas particles accumulated, then resumed and ultimately cleaned up. **The v2.95 capture lacked focus/visibility tracking.** Browser throttling, occlusion or scheduling remained plausible. Active diagnostic projectiles/canvases were zero after recovery; there was no established monotonic DOM, timer or heap leak.

## v2.96 Focus-Aware Confirmation

A short focus-interrupted test excluded a 72-frame partial attempt, waited for 1.5 seconds stable foreground, and completed three valid 30-second cycles at **53.07**, **52.70**, **52.07** rAF FPS, with protected cleanup. A separate **uninterrupted, zero-transition** 14-cycle test averaged **55.01** across cycles 1–8 versus **49.17** across cycles 9–14 (long tasks **42** vs **103**), a confirmed foreground callback-delivery step change not explained by monotonic diagnostic-resource buildup.

Eight 30-second performance runs across a 14.7–105.9-minute page session showed two severe runs at **18.5** and **23.6** rAF FPS with `cursor-grown cursor-power-1` and `cursor-power-2` respectively. Six normal-cursor runs delivered approximately **45.9–54.3**, including **53.0** and **54.3** later in the same session. Enlarged cursor styling is the most concrete observed **correlate**, not an isolated or proven cause. No independent compositor/GPU measurement establishes its cost.

## v2.97 Isolation Rather Than Performance Fix

v2.97 adds `dev cursor` visual-only size, universal-versus-inherited CSS, native SVG, aura, glow, trail and Star-spark isolation, plus `raw.cursorInitial`/`raw.cursorFinal` profile metadata. The production default remains universal cursor styling, with actual Mushroom level/Legendary acquisition unchanged. Syntax/headless controls passed, but controlled real-Windows performance A/B had not been supplied. See [Cursor Lab Windows QA](CURSOR_LAB_V2_97.md).

**Overall:** retain Canvas and permanent diagnostics. Distinguish short or focus-contaminated runs from valid foreground tests; measure before changing cursor CSS or rendering quality. Do not claim the reported performance regression solved.
