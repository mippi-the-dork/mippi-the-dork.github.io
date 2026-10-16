# Cursor Rendering Lab - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Cursor Rendering Lab > Design

**Introduced:** v2.97. **Current documented version:** v2.97.

## Purpose

The Cursor Lab is a **permanent hidden developer diagnostic** for the Mushroom-enlarged cursor. Eight v2.96 combined-combat captures showed two severe slowdowns only while cursor growth classes were active, and later recovery when the cursor returned to normal. This was a **correlation**, not a demonstrated root cause.

The diagnostic must test the visual representation of the cursor without changing the actual collected Mushrooms, Legendary acquisition radius, gameplay interactions, or persisted player state. Ordinary visitors continue to see exactly the existing v2.96 cursor by default.

## Independent dimensions

- **Visual size:** `gameplay`, `normal`, `big`, `verybig`. Gameplay follows the real Mushroom level; the others override appearance only.
- **CSS application:** `universal` is the original global descendant styling and **current default**. `inherit` experimentally applies cursor styling to the body rather than each descendant; interactive controls may have different pointer affordances and this is **not a confirmed replacement**.
- **Native SVG artwork:** `on/off` compares a native colored SVG cursor with the normal browser pointer. Off must not hide the pointer.
- **Cosmetics:** `aura`, `glow`, `trail`, and `starsparks` can each be enabled or disabled. Disabling Trail/Star Sparks stops their **emission**, not just paint.

Each switch is independent and memory-only. `dev cursor reset` returns them all to original defaults. `dev profile reset` is unrelated and does not reset Cursor Lab choices.

## Visual vs actual game power

The true Mushroom level remains the authority for the Legendary target acquisition bonus: **55px per collected Mushroom power level**. Only the rendered cursor image/size changes under forced visual settings. Any benchmark claiming a rendering difference must keep actual Mushroom progression and Legendary shot behavior identical.

## Evidence and acceptance

The eight v2.96 profiles ranged from roughly 46–54 animation FPS in normal cursor state to **18.5 and 23.6** during two grown-cursor captures. Later normal-cursor captures reached ~53–54 FPS in the **same open page**. That weakens a simple session-age/leak story but does not separate image size, universal CSS, aura, or ambient gameplay conditions.

The v2.97 build passed syntax checks and headless control/export smoke tests. **No controlled Windows Edge four-condition A/B has yet verified an FPS improvement.** See [Technical](TECHNICAL.md) and [Windows Cursor QA](../../QA/CURSOR_LAB_V2_97.md).

## v2.98 Current Behavior

**v2.98 supersedes v2.97's default:** Cursor Lab now defaults to the **Scoped** cursor architecture instead of the Legacy universal descendant-selector implementation. `dev cursor architecture legacy` preserves the old approach for A/B testing. The `style universal|inherit` setting applies to Legacy only; Scoped uses explicit interactive-target cursor rules and direct modal native-pointer fallbacks. `dev cursor reset` restores Scoped/gameplay size and all visuals ON. v2.98 Windows moving-pointer A/B/A showed Scoped 30.5 and 23.1 rAF FPS versus Legacy 10.0, with uncontrolled pointer-event rate and objective differences. Trail ON/OFF showed 30.9 versus 41.1 with a timed-objective confound; avoid claiming the Trail is a proven sole cause.
