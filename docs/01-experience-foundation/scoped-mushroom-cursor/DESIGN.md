# Scoped Mushroom Cursor - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Scoped Mushroom Cursor > Design  
**Introduced:** v2.98. **Current documented version:** v2.98.

## Goal

Mushroom pickups make the website's cursor grow from **Normal** to **Big** to **Very Big** and back. Its appearance is a playful reward, but should never turn optional combat or normal page interaction into a slow, unusable experience. **v2.98 makes Scoped cursor styling the default**, removing the enlarged-state styling dependency on a page-wide set of legacy cursor selectors while preserving the same themed SVG image, size, hotspot, aura, glow, Trail and Star Power sparks.

This is a CSS-architecture optimization, **not a new collectible, gameplay ability or proven final FPS fix**.

## Behavior and safeguards

- Picking up a Mushroom continues to advance actual cursor power; the **Legendary targeting bonus is +55px per actual level**, independent of which cursor size is visually forced by developer tests.
- Scoped Big and Very Big apply the native theme-colored SVG pointer via a small selection of targets, rather than matching every descendant of `body.cursor-grown`.
- Links, buttons, inputs, role-based controls and other interactive targets retain appropriate pointer behavior. Full-screen gallery, Session Debrief, Finale, Compile, Shop, Blueprint, Wish, Unreal gift and Mippi Bird overlays show a usable native pointer rather than a stuck enlarged sprite.
- Focus leaving the page, minimization and returning to Windows must not trap or hide the cursor.
- Rare, Epic and Legendary palettes, actual visual sizes, cursor hotspot and all normal interactive behaviors remain unchanged.
- The original Legacy implementation remains available to the hidden Cursor Lab for reproducible comparisons; visitors do not need to select it.

## Diagnostic choice vs production defaults

`dev cursor architecture scoped` uses the new default. `dev cursor architecture legacy` restores the older page-wide styling. The legacy `style universal|inherit` sub-option is meaningful **only in Legacy mode**. Testing `size normal|big|verybig` changes appearance, **not** real Mushroom progression.

`dev cursor reset` restores the **Scoped** architecture with gameplay-derived size and all original visual effects enabled. These diagnostic overrides are not saved.

## Evidence and interpretation

Seven v2.97 cursor tests showed normal-size visual states around 47–51 delivered rAF FPS and enlarged states around 24–26, even when native SVG art was disabled. This implicated an enlarged-state effect but did not isolate any single CSS rule.

Subsequent v2.98 three-run **moving-cursor** A/B/A recorded approximately **30.5 (Scoped)**, **10.0 (Legacy)** and **23.1 (Scoped)** delivered rAF FPS. Scoped performed markedly better in both comparisons but did **not** reach the target ~50–55 under those conditions. Mouse movement rate was not instrumented, and the runs differed in optional-objective state.

A separate v2.98 Trail-on/off comparison delivered ~30.9 vs ~41.1 rAF FPS but had different timed-objective activity and unmeasured pointer motion. It supports investigating the animated DOM trail, **not removing it permanently or claiming a 10 FPS causal gain**.

These are browser animation callback delivery measurements, not independent GPU-presented FPS readings.

## Acceptance

Preserve appearance and gameplay, modal focus/pointer safety, and theme behavior. Compare enlarged Scoped / Legacy at fixed viewport and real Mushroom level; validate real Windows pointer interaction. Keep unresolved Trail and browser rendering costs recorded in [Cursor Architecture Windows QA](../../QA/CURSOR_ARCHITECTURE_V2_98.md).

See [Technical Documentation](TECHNICAL.md) and [Cursor Rendering Lab](../../17-qa-operations/cursor-rendering-lab/DESIGN.md).