# Telemetry Foundation - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Telemetry Foundation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Maintains the browser-local session data used by the Director, Objectives, Player Model, stats, and Session Debrief without sending analytics to a server.

> This page is the canonical design documentation for **Telemetry Foundation** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio needs behavioral data because several systems adapt to the current session.

That does not mean it needs web analytics.

The Telemetry Foundation is intentionally:

- local,
- lightweight,
- aggregate-first,
- privacy-conscious,
- system-oriented.

Its purpose is to let the page understand its own current play session.

It is not a product analytics pipeline.

## Local Only

Telemetry is stored in the current browser session.

Nothing is sent to:

- a server,
- an analytics vendor,
- a database,
- the user's other devices.

Closing the browser session naturally resets the session model.

Persistent progression uses separate localStorage systems.

## Data Minimization

The telemetry intentionally does not store:

- Wish text,
- arbitrary invalid Console text,
- form contents,
- personal identifiers,
- full external URLs.

For external destinations, it stores broad categories such as:

- GitHub,
- FAB,
- LinkedIn,
- Discord,
- Steam,
- Unreal Source,
- Epic Learning,
- Resume,
- Other.

The system asks:

> What kind of action happened?

not:

> What private text did the visitor enter?

## Aggregate First

Most telemetry is stored as:

- counters,
- unique ID sets,
- maximum values,
- category counts.

The timeline is intentionally bounded and meaningful-event only.

There is no unlimited raw click log.

## Session Data

The foundation records:

- session ID,
- session start,
- page load count,
- active visible time,
- last active time,
- last meaningful interaction,
- maximum scroll depth,
- visibility changes.

## Major System Branches

Current session telemetry includes branches for:

- sections,
- interaction,
- achievements,
- Console,
- modes,
- flying objects,
- arcade,
- economy,
- Wish,
- Mippi Bird,
- system combos,
- portfolio interactions,
- assistance,
- Director,
- Objectives,
- Player Model,
- Debrief,
- timeline.

## Consumer Philosophy

Later systems should consume this shared telemetry rather than inventing parallel counters whenever practical.

This is important for consistency.

If the Director and Player Model each maintain a different definition of "UFO destroyed", the adaptive systems will drift apart.

The shared foundation provides one local session record.

## Professional Content Separation

Persistent facts such as:

- Shop ownership,
- wallet,
- achievements,
- Legendary entitlement,
- Hearts,
- postgame completion

continue to use their dedicated persistent storage.

Telemetry mirrors session behavior around those systems.

It does not replace authoritative progression state.

## Design Rules

- No network transmission.
- No personal identifiers.
- No freeform Wish storage.
- No arbitrary invalid-command text.
- No form-content capture.
- Keep meaningful timeline bounded.
- Use aggregate counters wherever possible.
- Keep persistent progression separate from session telemetry.
- Expose QA snapshots read-only.

## Success Criteria

Adaptive systems have enough local evidence to behave coherently without turning the portfolio into an analytics product.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
