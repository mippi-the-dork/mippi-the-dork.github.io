# Cursor Rendering Lab - Technical Documentation

**Introduced and current:** v2.97.

## Runtime and command surface

`script.js` owns `MippiCursorLab`, actual `cursorPowerLevel`, `cursorDiagnostics.visualLevel`, `updatePowerCursor()`, and `syncNativeMushroomCursor()`. Diagnostic input uses hidden `dev cursor ...` command branch; it is discoverable from `dev help` and `dev cursor help`, not ordinary Help.

```text
dev cursor help
dev cursor status
dev cursor size gameplay|normal|big|verybig
dev cursor style universal|inherit
dev cursor native on|off
dev cursor aura on|off
dev cursor glow on|off
dev cursor trail on|off
dev cursor starsparks on|off
dev cursor reset
```

Defaults: size `gameplay`, style `universal`, all native/art/effects switches `on`. All overrides are session-memory only; no `localStorage`, achievement, telemetry or persistent Mushroom updates.

## State isolation

`cursorPowerLevel` is the true progression authority. The Legendary acquisition radius bonus remains **`55 * cursorPowerLevel` pixels**. A separate `cursorDiagnostics.visualLevel` determines visual classes and native SVG image selection. Forcing `normal`, `big`, or `verybig` must not change actual Mushroom level, available lives, hit testing, projectile range, or rewards. `gameplay` relinquishes the override.

## CSS comparison

Original selectors use `body.cursor-grown *` to apply themed native SVG cursor styles to descendants. v2.97 guards these with `html:not(.cursor-test-inheritance)` and adds experimental `html.cursor-test-inheritance body.cursor-grown` for body-only inheritance. Other `cursor-test-no-*` classes target native cursor, aura, glow, trail and star spark visuals. The `inherit` case must be tested on buttons, links, inputs, overlays and hover/focus because descendants can establish their own cursor styles.

`native off` makes the normal browser pointer visible with an explicit override, so it is **not** a pure native-artwork-only measurement with exactly identical CSS. `glow off` removes filters/shadows on ring/sparks but cannot change glow encoded into the SVG itself. Pointermove Trail and Star Power Sparks may not be active during stationary benchmark capture.

## Performance metadata

The permanent profiler includes `raw.cursorInitial` and `raw.cursorFinal` snapshots. Its summary prints `CURSOR LAB`. Export filename identifies initial visual level, style and native setting (for example `cursor-1-inherit-on`) with version, theme, condition and timestamp; payload `version`/`diagnosticHarness` identify **2.97**. Compare initial to final cursor state; a difference during the recording is a confound. No core combat/Canvas/Three.js resource or storage contract was altered.

## Validation

Node syntax and Chromium in-memory interaction/export smoke checks passed. Real Windows Edge comparative performance remains to be tested. Use [Cursor Lab QA](../../QA/CURSOR_LAB_V2_97.md); do not claim universal style inheritance or smaller artwork is a proven optimization.

## v2.98 Current Behavior

v2.98 adds `cursorDiagnostics.architecture` and `dev cursor architecture scoped|legacy`. Scoped (default) adds `html.cursor-arch-scoped`/`body.cursor-scoped-grown` and **never** adds `body.cursor-grown`; Legacy restores original `cursor-grown`, descendant and `:has()` selector behavior. `cursor-power-1/2` and native SVG/theme remain available in both. The legacy `style universal|inherit` state is serialized but only affects Legacy. Reset now restores Scoped (not Legacy), gameplay-derived visual size and effects ON. `raw.cursorInitial`/`raw.cursorFinal` and export filenames carry architecture. Size overrides do not alter `cursorPowerLevel` or `55 * cursorPowerLevel` targeting. [Scoped Cursor Technical](../../01-experience-foundation/scoped-mushroom-cursor/TECHNICAL.md).
