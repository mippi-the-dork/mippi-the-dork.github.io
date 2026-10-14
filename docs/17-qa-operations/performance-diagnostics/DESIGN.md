# Performance Diagnostics - Design

**Introduced:** v2.86; expanded v2.87, v2.88, v2.89.

## Purpose

The documented performance regression is **under investigation**, not solved. The v2.78 reference felt smoother than newer builds in some Windows/browser scenarios, even when Three.js showed approximately 60 render calls per second. A render-call count, a JS callback interval and a GPU-presented frame are different measurements.

The profiler is an intentionally hidden internal QA system. It should be preserved as documentation-worthy developer tooling, not advertised as a public achievement or promised FPS improvement.

## Instruments by release

| Version | Capability |
| --- | --- |
| 2.86 | `dev perf`: scene visibility, render-loop FPS, DPR, draw calls, offscreen skips |
| 2.87 | `perf-lab.js` opt-in recording: frame intervals p50/p95/p99/max, 33/50/100ms delays, long tasks/frames, HUD mutations, startup facts, JSON export, presentation isolate switches |
| 2.88 | Named Hero/Ambient/About/projectile/Director/objective/HUD subsystem timings, source-tagged rAF callbacks, 33.3ms spikes, logic isolate switches |
| 2.89 | Timers, 200ms objective clock cost, objective/toast/HUD DOM changes, one-second UI snapshots, browser Long Animation Frame scripts, spike correlation, objective clock isolate |

## Interpret responsibly

The visual goal is smooth interaction on real hardware. Do not claim this problem is fixed from these additions. `renderer.render()` wall-time is CPU submission, not GPU execution or presentation. Instrumentation itself adds overhead. Cross-release comparisons should use matching measurement harnesses, resolution, theme, scroll, browser, content state and input patterns.

Do not leave diagnostic isolation switches enabled during gameplay/progression QA. `dev profile reset` restores them; it is **not** the game's full reset.

## Acceptance

Capture repeated baseline/isolate/baseline JSON measurements. Note frame spikes, UI/DOM state and browser traces. A causal optimization is a future change, not implied by these logs.


## v2.93–v2.94 Current Update

v2.93 permanent Combat Visual Isolation distinguishes hidden projectile paint from suppressed particle emission, hidden particle paint and glow. Tests showed the strongest benefit when cosmetic particle creation was prevented; exact browser rendering subcost remains unisolated. v2.94 implements a shared Canvas2D default with preserved DOM fallback and permanent backend A/B controls. Neither diagnostic v2.93 nor headless v2.94 test proves a real Windows FPS fix.
