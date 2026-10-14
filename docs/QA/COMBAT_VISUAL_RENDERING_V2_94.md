# Combat Visual Rendering QA: v2.93 to v2.94

**Current documented version:** v2.94. **Performance conclusion:** real Windows performance and visual parity require controlled testing; headless smoke checks alone do not prove either.

## v2.93 diagnostic evidence

All five recordings were 30-second Legendary combined-combat runs at 2151×1307, DPR 1, with optimized combat geometry. Delivered frame rates are calculated from requestAnimationFrame intervals, not GPU-present timings.

| Isolation | rAF frames | Approx. rAF FPS | Long tasks | Actual emitted DOM particle nodes |
| --- | ---: | ---: | ---: | ---: |
| All visuals enabled | 911 | 30.4 | 115 | 4,144 |
| Explosion emission disabled | 1,493 | 49.8 | 22 | 0 |
| Player and UFO paint hidden | 915 | 30.5 | 114 | 4,156 |
| Combat glow disabled | 730 | 24.3 | 184 | 4,012 |
| Explosion particle paint hidden | 458 | 15.3 | 287 | 3,567 |

**Interpretation:** disabling particle emission coincided with the strongest improvement while retaining 500 UFO shots. Hiding paint alone did not improve the later fifth run, but that recording started around 42 minutes into the session versus roughly 2–13 minutes for other conditions. Do not infer that `visibility:hidden` itself caused the poor result. The experiments do **not** distinguish JS DOM creation, CSS animation bookkeeping, style/layout, rendering or GPU compositing as the sole cause.

Legacy `explosions`/`particles` benchmark-specific fields are not total particle counts. Use `effectCalls`, `effectElementsRequested`, `effectElementsEmitted`, and `effectElementsSuppressed`. In v2.94, `effectElementsEmitted` is logical sprites, not DOM-only elements.

## v2.94 controlled ABBA performance experiment

In Windows Edge/Chrome, keep theme **Legendary**, Hero visible, viewport, zoom, pointer, background tabs and gameplay state consistent. Begin with `dev profile reset` and `dev combat geometry on`. Each run lasts 30 seconds and exports a unique named JSON.

| Order | Setup | Command |
| --- | --- | --- |
| A | `dev combat renderer dom` | `dev combat run combined 30` |
| B | `dev combat renderer canvas` | `dev combat run combined 30` |
| B | Keep Canvas selected | `dev combat run combined 30` |
| A | Return to DOM | `dev combat run combined 30` |

After each run use `dev combat report`, `dev profile export`. Compare rAF delivered count, p50/p95/p99 and >=33/50/100ms frame delays; Long Tasks and Long Animation Frames; matching UFO/player shots and hits; actual logical particle emission, DOM vs Canvas physical counts, peak active and `sessionAgeMs`; `combat.particles.canvasFrame` and `combat.particles.canvasSpawn`. Check nested costs before aggregating. Do not claim real GPU FPS or accept a single unusually good run as conclusive.

## Visual and gameplay parity

- [ ] Check Rare, Epic and Legendary square colors, easing, opacity, 180-degree rotation and shrinking to 20%, flight ranges, z-index and pointer-through behavior.
- [ ] Verify impact positions on moving UFOs, Legendary shots, Boss/Super Boss and flying pickups.
- [ ] Trigger all four Castle checks and compare nine large bursts, 34 squares per burst, 33px size, 560/450 ranges, 2150ms duration and existing friendly auto-collection.
- [ ] Change theme during active effects; resize window/DPR, switch tabs, recover after a long paused frame.
- [ ] Confirm DOM mode matches original `.arcade-pixel` behavior, including CSS animations and cleanup.
- [ ] Turn `dev combat visual explosions off`: both renderers suppress emitted particles but keep gameplay hits.
- [ ] Turn `dev combat visual explosionpaint off`: both renderers hide visuals but continue lifecycle/expiry.
- [ ] `dev profile reset` restores cosmetic modes but retains geometry and renderer choices.
- [ ] Ensure switching backend outside test clears only cosmetics; switching during benchmark is blocked.
- [ ] Confirm no idle Canvas, lingering rAF, timers or particle arrays after all effects expire; repeat ten or more tests.
- [ ] No changed targeting, damage, progression, Shop, Achievements, Wish, Finale, music or lyric content.

## Release acceptance

Automated JS syntax and headless Chromium smoke tests passed for the v2.94 implementation. Windows hardware A/B and visual review remain open. A real performance improvement requires repeatable reduced browser-frame cost **without degrading authored visuals**. Near-60 rAF FPS is a goal, not a guaranteed outcome. If results remain ambiguous, capture and compare real Edge Performance traces (scripting, layout, paint, raster, compositor, GPU).