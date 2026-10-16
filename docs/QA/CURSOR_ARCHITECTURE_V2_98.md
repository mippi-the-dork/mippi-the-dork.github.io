# v2.98 Scoped Cursor Architecture: Windows QA and Evidence

**Current documented version:** v2.98.

## Architecture A/B/A

Use Windows Edge, Legendary, Hero visible, fixed dimensions/zoom, Canvas particles, geometry on, all combat visual effects on. Keep actual Mushroom level and targeting bonus unchanged; use **visual-only Big** size. Warm up before recording, keep page focused, and capture 30-second combined combat with `dev profile export`.

| Trial | Setup | Goal |
| --- | --- | --- |
| A1 | `dev cursor reset`; `dev cursor architecture scoped`; `dev cursor size big` | New scoped CSS default |
| B | `dev cursor architecture legacy`; `dev cursor style universal`; `dev cursor size big` | Original enlarged-state CSS selectors |
| A2 | `dev cursor architecture scoped`; `dev cursor size big` | Return-to-scoped control |

Allow about 20 seconds between trials for effect cleanup; do not refresh during an A/B/A series. Capture cursor snapshots and filename architecture identity.

## Results supplied after the v2.98 handoff

The user moved the physical pointer during most of each 30-second test (Legendary, 2403×1307, DPR1, one Edge session; actual Mushroom level 0 throughout):

| Metric | Scoped A1 | Legacy B | Scoped A2 |
| --- | ---: | ---: | ---: |
| Delivered rAF FPS | **30.5** | **10.0** | **23.1** |
| p95 frame interval | 66.7ms | 166.6ms | 83.3ms |
| Long tasks | 131 | 243 | 188 |
| Long-task duration | 8.373s | 26.757s | 12.550s |

Scoped outperformed Legacy in both comparisons, but its own repeated performance differed substantially. Cursor movements were not quantitatively tracked, and active objectives differed between runs. **This supports the new Scoped default, not a complete performance fix or isolation of the exact browser cost.**

## Subsequent Trail comparison

Two additional Scoped Big 30-second combined runs with physical cursor movement yielded **30.89 rAF FPS (Trail ON)** and **41.13 (Trail OFF)**, 133 vs 70 long tasks, and 85 vs 13 long animation frames. The Trail-on trial also had a timed objective active in 29/30 snapshots, while Trail-off had none, and cursor movement frequency/path length was not instrumented. Therefore **do not claim the Trail toggle alone caused all +10.24 FPS**.

The v2.98 DOM spark path creates short-lived `.cursor-spark` elements on `pointermove` (Legendary screen blending, animated glowing shadows and timers). This is an optimization candidate, **not grounds to remove the intended trail visuals**. A possible later Canvas-based trail is a proposal only, **not a v2.98 implemented feature**.

## v2.97 controls that motivated the update

Five-run visual-size comparison (2247×1307): Normal 51.4/46.9 rAF FPS, Big Universal 24.1, Big Inherit 25.8, Very Big Universal 24.9, with actual Mushroom level 0. Another Big Native-OFF comparison gave 25.2 versus Normal Native-ON 51.1 at equal actual Mushroom level 1 (+55px targeting). This shows that image rendering or inherited-style selector alone did not restore normal performance, but **does not prove a particular `:has()` or descendant rule caused the slowdown**.

## Visual and gameplay acceptance

- [ ] Match Big and Very Big SVG shape/hotspot/palette in Scoped and Legacy, across Rare/Epic/Legendary.
- [ ] Pointer appears on links, buttons, collectibles, forms and full-screen gallery, Shop, Console, Finale, Debrief, Compile, Wish/Blueprint, Mippi Bird.
- [ ] Blur/focus, alt-tab, minimize/restore retain a visible Windows pointer and recover site styling.
- [ ] `native off` gives native cursor with Big Scoped visual state.
- [ ] `dev cursor style universal/inherit` changes **Legacy only**, not Scoped.
- [ ] Actual Mushroom progression and `55px * cursorPowerLevel` bonus remain unchanged by all visual overrides.
- [ ] `dev cursor reset` restores Scoped, gameplay size, visual effects ON; `dev profile reset` does not alter it.
- [ ] Snapshot/export includes architecture, visual level and native switch; note Trail status from JSON.
- [ ] No changes to projectiles, pickups, progression, particle Canvas, music or lyrics.

All rAF FPS measurements here are animation callback delivery, **not externally measured GPU-presented FPS**. For residual stalls use Edge Performance traces and more controlled pointermove/objective instrumentation.