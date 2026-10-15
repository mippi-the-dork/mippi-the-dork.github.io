# Cursor Lab Windows QA (v2.97)

**Objective:** Isolate cursor visual size, global descendant CSS, native SVG and associated effects while holding true Mushroom gameplay power constant. **Status:** v2.97 controls passed headless smoke; native Windows Edge A/B and visual affordance testing remain open.

## Shared conditions

Use Microsoft Edge, Legendary, Hero visible, fixed viewport and 100% zoom. Refresh and warm up 60 seconds **before every trial**. Keep the window visible/focused with a stationary mouse for the first comparison. Do **not** collect Mushrooms; ensure actual `cursorPowerLevel` and the Legendary `55px * level` acquisition bonus stay unchanged.

After each refresh issue individually:

```text
dev combat geometry on
dev combat renderer canvas
dev combat visual all on
dev cursor reset
```

Run a 30-second `dev combat run combined 30`; after completion run `dev profile export`. Confirm identical theme/viewport/benchmark conditions and inspect `raw.cursorInitial` and `raw.cursorFinal`.

## First four captures

| Test | Cursor configuration | Commands after reset |
| --- | --- | --- |
| A | Normal visual, original styling | `dev cursor size normal` |
| B | Big visual, original universal styling | `dev cursor size big` |
| C | Big visual, experimental inherited body rule | `dev cursor size big`, `dev cursor style inherit` |
| D | Very-big visual, original styling | `dev cursor size verybig` |

All cases: `dev cursor status`, `dev combat run combined 30`, then export. Compare rAF frame delivery, p95/p99, delayed frames, long tasks, visual affordances and projectile counts. The inherited-body rule is an **experimental isolation**, not the standard production style.

If a grown-cursor condition is reproducibly slow, repeat it with `dev cursor native off`, then isolate `aura`, `glow`, `trail`, `starsparks` one at a time. `native off` includes an explicit CSS override so it is not a perfectly isolated image-only control. Trail and Star sparks require **controlled pointer motion or active Star Power**; a stationary benchmark may not exercise them.

## Required safety checks

- [ ] Visual override changes only image/size/classes, not collected Mushrooms, saved state, lives, hits, rewards or Legendary acquisition radius.
- [ ] Native-off always shows a usable browser pointer; no invisible cursor over modals/inputs.
- [ ] Test original universal vs inherited styling on buttons, links, hover/keyboard focus, inputs, overlays, and the expanded/collapsed music player.
- [ ] `dev cursor reset` restores size `gameplay`, style `universal`, all cosmetic switches ON; `dev profile reset` does not change Cursor Lab overrides.
- [ ] Profile filename and metadata record version 2.97, cursor visual level/style/native mode and actual initial/final state.
- [ ] No test changes core particle renderer, geometry, Three.js scenes, gameplay or soundtrack assets.

The eight v2.96 recordings correlate the most severe slowdowns with `cursor-grown` classes, but do **not** establish that cursor styles cause those slowdowns. Do not document an FPS fix until a repeatable, controlled Windows A/B identifies a specific cost.

See [Cursor Rendering Lab](../17-qa-operations/cursor-rendering-lab/TECHNICAL.md).