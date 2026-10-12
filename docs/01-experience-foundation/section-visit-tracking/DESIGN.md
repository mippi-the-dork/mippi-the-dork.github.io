# Section Visit Tracking - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Section Visit Tracking > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Records meaningful visits to the six major sections for progression, telemetry, Finale eligibility, and postgame completion.

> This page is the canonical design documentation for **Section Visit Tracking** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Section tracking should answer a simple design question: **did the visitor meaningfully reach this part of the portfolio?**

It is not intended to prove that every paragraph was read.

The system supports:

- broad engagement for the normal Finale,
- all-section completion for postgame,
- session telemetry,
- Player Model interpretation,
- Dynamic Optional Objectives.

## What Counts as a Visit

The intended meaning of a visit is that a meaningful portion of the section entered the viewport while the tab was visible.

A visit does not require:

- clicking a card,
- clicking the navigation link,
- spending a fixed number of seconds,
- reaching the exact center of the section.

This keeps professional browsing natural.

## Repeated Visits

Session telemetry may count multiple entries into a section and accumulates dwell time.

Postgame completion only cares whether each of the six major sections has been visited at least once.

## Visibility and Hidden Tabs

Time spent while the browser tab is hidden should not count as active section dwell time.

When the tab becomes hidden:

- active section timers stop.

When the tab becomes visible:

- currently visible sections are reevaluated.

## Finale Relationship

The normal Finale intentionally asks for broad engagement rather than total section completion.

The postgame Grand Tour achievement asks for all six sections.

This distinction supports a satisfying normal ending without turning the first completion path into a checklist.

## Design Constraints

- Merely loading the page should not mark every section.
- Jumping directly by anchor should still count once the destination becomes visible.
- Three.js navigation and conventional navigation should produce the same visit result.
- A section visit must never require game-layer interaction.
- Persistent postgame section completion should survive reloads.
- Session dwell and visit counts should remain session-scoped.

## Current Implementation Caveat

The primary `IntersectionObserver` currently requires a literal 25 percent intersection ratio.

The resume/fallback visibility check uses a threshold of the smaller of 25 percent of section height or 180 pixels.

Those two paths are therefore not perfectly equivalent for very tall sections. This is a known implementation detail worth preserving in QA until the rules are unified.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
