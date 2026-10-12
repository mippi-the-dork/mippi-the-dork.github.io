# Telemetry Foundation - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Telemetry Foundation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Maintains the browser-local session data used by the Director, Objectives, Player Model, stats, and Session Debrief without sending analytics to a server.

> This page is the canonical technical documentation for **Telemetry Foundation** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Storage

Session telemetry key:

```text
mippi-session-telemetry-v1
```

Storage type:

```text
sessionStorage
```

Version:

```text
1
```

## Session Creation

`createTelemetrySession()` creates a structured object containing all current telemetry branches.

The session ID is generated from:

- current timestamp,
- random base-36 suffix.

## Load

`loadTelemetrySession()`:

1. reads session storage,
2. parses JSON,
3. validates telemetry version,
4. returns a new session on:
   - missing data,
   - parse failure,
   - version mismatch.

## Page Loads

Every document startup increments:

```text
session.pageLoads
```

while preserving the rest of the same browser-session telemetry.

## Save Debounce

`telemetryScheduleSave()` clears the previous pending save and schedules JSON serialization after:

```text
350 ms
```

This avoids writing sessionStorage on every individual counter change synchronously.

## Generic Helpers

### Counter

```js
telemetryCount(
  path,
  key,
  amount=1
)
```

### Maximum

```js
telemetryMax(
  path,
  key,
  value
)
```

### Unique Array

```js
telemetryUnique(
  path,
  key,
  value
)
```

### Meaningful Event

```js
telemetryMeaningful(
  type,
  detail={}
)
```

## Meaningful Timeline

Every meaningful event:

- updates `lastMeaningfulAt`,
- appends:
  - timestamp,
  - type,
  - supplied detail.

Maximum timeline length:

```text
120 events
```

Older entries are removed from the front.

## Objective Event Bus

After recording a meaningful event:

```js
if(objectiveEventSink)
  objectiveEventSink(
    type,
    detail
  );
```

This makes telemetry events the shared event feed for Optional Objective progress.

## Active Time

Visible active time is accumulated through:

```js
telemetryCommitActive()
```

Page visibility changes:

- commit active time on hide,
- pause section dwell,
- resume active timing and visible sections on return.

## Periodic Save

Every:

```text
10 seconds
```

while visible, the runtime:

- commits active time,
- writes current session telemetry.

## Pagehide

On pagehide:

- active time is committed,
- section dwell is committed,
- telemetry is synchronously saved.

## Section Tracking

With `IntersectionObserver`, major sections enter when:

```text
intersectionRatio >= .25
```

Threshold array:

```text
0
.25
.5
```

Fallback visible-section detection uses approximately:

```text
min(
  sectionHeight*.25,
  180 px
)
```

visible height.

Tracked sections include:

- Hero,
- Games,
- Career,
- Consulting,
- Crafting,
- Tools,
- About.

## External Destination Categorization

The telemetry stores destination category, not full URL.

Examples:

```text
github
fab
linkedin
discord
steam
crafting_play
unreal_source
epic_learning
resume
other
```

## Flying Methods

Collection methods currently include:

- direct,
- Star Power,
- Legendary projectile,
- `please`,
- other authored methods as passed by the target.

## QA Hook

Read-only browser snapshot:

```js
window.__MIPPI_TELEMETRY__
  .snapshot()
```

returns a deep copy.

## QA

- Inspect session storage during a full session.
- Verify no Wish text.
- Enter invalid Console text and verify the text itself is absent.
- Type into forms and verify content is absent.
- Follow several external links and inspect destination categories.
- Exceed 120 meaningful events and verify timeline remains bounded.
- Reload and verify pageLoads increments within the same browser session.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
