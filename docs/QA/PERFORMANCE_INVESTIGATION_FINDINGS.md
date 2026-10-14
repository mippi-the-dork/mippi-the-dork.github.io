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
