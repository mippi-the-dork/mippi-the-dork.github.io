# Scoped Mushroom Cursor - Technical Documentation

**Introduced:** v2.98. **Current documented version:** v2.98.

## State ownership

`script.js` owns `cursorDiagnostics.architecture` (`'scoped'` default), `cursorDiagnostics.visualLevel`, actual `cursorPowerLevel`, `updatePowerCursor()` and themed native cursor synchronization.

| Architecture | Element classes on enlarged state | CSS rule strategy |
| --- | --- | --- |
| **Scoped** (default) | `html.cursor-arch-scoped`, `body.cursor-scoped-grown`, `body.cursor-power-1/2` | Apply `--mippi-grown-cursor` on scoped body and explicit interactive descendants; **no** `body.cursor-grown` |
| **Legacy** (A/B control) | `body.cursor-grown`, `body.cursor-power-1/2` | Original `body.cursor-grown *` and `body.cursor-grown:has(...)` rules; legacy `universal/inherit` experiment |

When switching architecture, remove the other grown-state class immediately; never leave both active. Preserve generated native SVG cursor data URL, theme-specific palette, icon hotspot, cursor Aura, Trail, Glow and Star sparks. The old hidden `.power-cursor` DOM imitation remains hidden in either grown implementation.

## Scope of selectors and pointer safety

The new `style.css` section named `v2.98 // Scoped mushroom cursor architecture` applies the themed cursor via `html.cursor-arch-scoped body.cursor-scoped-grown` and explicit links, buttons, form controls, and role-based interaction targets, **without a page-wide `body *` selector**.

Native-pointer fallback targets visible modal surfaces directly (gallery, debrief, finale, compile, shop, blueprint, wish, Unreal gift, Mippi Bird), avoiding the old parent `:has()` dependency. `cursor-window-inactive` and `native off` continue to enforce a visible normal OS cursor when appropriate. All original Legacy CSS selectors remain for performance A/B and must not be prematurely deleted.

The `dev cursor style universal|inherit` state still appears in diagnostics/export, but is **ignored by Scoped selectors**, and active again under Legacy.

## Developer commands

```text
dev cursor architecture scoped
dev cursor architecture legacy
dev cursor size gameplay|normal|big|verybig
dev cursor style universal|inherit
dev cursor native on|off
dev cursor aura on|off
dev cursor glow on|off
dev cursor trail on|off
dev cursor starsparks on|off
dev cursor status
dev cursor reset
```

`dev cursor reset` now restores architecture `scoped`, visual override `gameplay`, all visual components ON. `dev profile reset` remains separate. Diagnostic settings are in-memory only.

**Invariant:** `cursorPowerLevel` is gameplay authority; the Legendary acquisition bonus is `55 * cursorPowerLevel` pixels. Visual override, architecture/style/native/cosmetic toggles must not change it.

## Profiler and build labeling

Build version, normal/debug HTML query suffixes, Dev Console `version`, Stability Lab export identity and profiler version identify **v2.98**. `raw.cursorInitial` and `raw.cursorFinal` add `architecture`. Filenames include `cursor-<visualLevel>-<architecture>-<style>-<native>`. The four subsequent exported performance analyses must be interpreted with the condition's actual JSON snapshot and objective/pointer activity, not filename alone: Trail status, for instance, was **not** included in its export filename.

The Combat Lab, Stability Lab, Canvas particle engine, projectile simulation and persistence remain otherwise unchanged in v2.98.

## Verification

v2.98 Node syntax and in-memory Chromium smoke checks passed for default Scoped, Legacy Universal/Inherited, Native Off, Big/Very Big, modal fallbacks, reset and export identity; computed native SVG data URL matched between architectures for equal visual state. Windows moving-pointer A/B/A later showed markedly better Scoped callback delivery but significant residual cost. The native cursor and visual effects should not be simplified without a controlled visual/functional comparison.

See [Design](DESIGN.md), [Cursor Lab Technical](../../17-qa-operations/cursor-rendering-lab/TECHNICAL.md) and [Cursor Architecture QA](../../QA/CURSOR_ARCHITECTURE_V2_98.md).