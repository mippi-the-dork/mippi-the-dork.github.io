# Section Visit Tracking - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Section Visit Tracking > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Records meaningful visits to the six major sections for progression, telemetry, Finale eligibility, and postgame completion.

> This page is the canonical technical documentation for **Section Visit Tracking** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Session Telemetry State

Section state lives under:

```js
sessionTelemetry.sections[id]
```

Each section can record:

- `visits`
- `firstSeenAt`
- `dwellMs`

The session telemetry object is stored in `sessionStorage` under:

```text
mippi-session-telemetry-v1
```

## Persistent Postgame State

All-section completion uses a separate persistent set stored in `localStorage`:

```text
mippi-postgame-sections-v1
```

The canonical tracked set is:

```js
const POSTGAME_MAJOR_SECTIONS =
  ['games','career','consulting','crafting','tools','about'];
```

## Entry Function

`telemetrySectionEnter(id)`:

1. exits if the section is already considered active,
2. increments `visits`,
3. records `firstSeenAt` if missing,
4. stores the current `performance.now()` start time,
5. emits `section_first_visit` on the first session visit,
6. calls `markPostgameSectionVisit(id)`,
7. schedules telemetry persistence.

## Exit Function

`telemetrySectionExit(id)`:

1. gets the active start time,
2. adds elapsed time to `dwellMs`,
3. removes the section from the active map,
4. schedules persistence.

## Primary Observer

`initTelemetryFoundation()` creates an `IntersectionObserver` when supported.

Current threshold configuration:

```js
{ threshold: [0, .25, .5] }
```

A section enters when:

```js
entry.isIntersecting && entry.intersectionRatio >= .25
```

Otherwise it exits.

The tracked observer targets are:

- Hero.
- Games.
- Career.
- Consulting.
- Crafting.
- Tools.
- About.

## Resume and Fallback Visibility Check

`telemetryResumeVisibleSections()` measures pixel intersection using `getBoundingClientRect()`.

Current entry rule:

```js
visible >= Math.min(r.height * .25, 180)
```

This function is used:

- as the fallback when `IntersectionObserver` is unavailable,
- when the page becomes visible again,
- during initial telemetry setup.

## Visibility Lifecycle

On `visibilitychange`:

- hidden: active time is committed and active section timers are paused,
- visible: active session timing resumes and visible sections are reevaluated.

On `pagehide`, active section time is committed and telemetry is written immediately.

## Consumers

Section visits feed:

- Finale section count.
- Postgame Grand Tour.
- Player Model.
- Optional Objectives such as section exploration.
- Session Report.
- local telemetry summaries.

## QA

Natural test:

1. `dev fresh`.
2. Scroll until approximately a quarter of Games is visible.
3. Run `dev snapshot` or inspect `window.__MIPPI_TELEMETRY__.snapshot()`.
4. Confirm Games has at least one visit.
5. Switch tabs while a section is active.
6. Return and verify dwell time does not include hidden-tab time.
7. Visit all six sections.
8. Reload.
9. Confirm persistent postgame section state remains while session telemetry behavior follows session storage.

Known edge test:

- Use an unusually short viewport with a very tall section and compare observer behavior to visibility-resume behavior because the two thresholds are currently not identical.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
