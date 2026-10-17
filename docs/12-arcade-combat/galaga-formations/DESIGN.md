# Galaga Formations - Design Documentation

**Introduced:** v3.02. **Current version:** v3.04.

## Purpose

As invasion progress increases, regular UFOs appear more frequently and in recognizable coordinated Galaga-style formations instead of always arriving alone. Formations increase readable hostile pressure without removing the ordinary single-UFO encounters, progression, shot mechanics or reward chances.

A group shares one trajectory family while entering **one ship at a time**. Up to **four regular UFOs** belong to a formation and at most **six natural regular UFOs** may be active concurrently. These are natural-spawn limits, not a blanket ban on developer-forced encounters.

## Current timing and movement

- **v3.02 introduced formations:** shared motion, escalating opportunities with invasion, initially 280 ms between ships.
- **v3.03 corrected spacing:** **1,050 ms** between ships, with **one shared flight duration per formation** so later ships cannot catch and visually stack with the lead ship.
- Vertical sine UFOs also move inward with reduced horizontal amplitude to avoid clipped offscreen passes.

The progression should feel increasingly coordinated, but never like multiple sprites accidentally occupying the same place. All UFOs retain their individual ability to be hit, shoot and contribute to invasion, using the existing controls and physical reward-drop system.

## Acceptance

Verify single versus formed arrivals across invasion stages, per-formation spacing, independent UFO hit/cleanup, six-natural-UFO concurrency limit, viewport-safe sine motion, and consistent behavior with reduced motion, Boss spawns and developer force-spawns.

See [Technical](TECHNICAL.md) and [v3.04 Regression QA](../../QA/V3_02_TO_V3_04_QA.md).
