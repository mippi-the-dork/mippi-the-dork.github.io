# Stats Commands - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Stats Commands > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides FPS, unit timing, session stats, and other readable runtime information through console commands and overlays.

> This page is the canonical technical documentation for **Stats Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Overlay State

Current runtime variables:

```js
let statOverlay = null;
let statTimer = null;
let statMode = null;
```

FPS sampling also uses:

```js
let statFpsRaf = null;
let statFpsFrames = 0;
let statFpsWindowStart = 0;
let statFpsMeasured = null;
let statFpsMeasuredAt = 0;
```

## Commands

`stat fps` toggles FPS mode.

`stat unit` toggles Unit mode.

`stat none` clears any active stat overlay.

## Update Cadence

The stat overlay refreshes through a timer approximately every:

```text
180 ms
```

## FPS Display

If a recent real measurement exists:

```text
STAT FPS // LIVE
```

Otherwise:

```text
STAT FPS // EST
```

The estimate uses a small randomized range near 60 FPS.

## Unit Display

Current simulated categories:

```text
Frame
Game
Draw
GPU
RHIT
Morale
```

`Morale` reports current Doug Bone count.

## General Stats

The `stats` command calls the session statistics printer.

That output derives from local telemetry rather than the compact stat overlay.

## Cleanup

Changing stat mode should stop or replace the previous timers/RAF sampling.

`stat none` removes the overlay state.

## QA

- toggle FPS on/off,
- verify LIVE after sampling stabilizes,
- background the tab and return,
- inspect EST fallback behavior,
- toggle Unit,
- verify `stat none`,
- run `stats`,
- verify no persistent overlay remains after mode off.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
