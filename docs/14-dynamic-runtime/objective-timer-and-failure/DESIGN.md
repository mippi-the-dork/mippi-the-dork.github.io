# Objective Timer and Failure - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective Timer and Failure > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Runs the visible countdown, linear draining bar, completion freeze, and timeout behavior for Optional Objectives.

> This page is the canonical design documentation for **Objective Timer and Failure** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The timer converts an objective from a suggestion into a micro-challenge.

Without time pressure:

`Catch two pickups`

can sit passively for several minutes and stop feeling like an event.

With a visible limit, the same instruction creates a temporary play window.

## Authored Time Limits

Every objective owns its own duration.

Times are chosen based on:

- how much setup is required,
- whether the target is seeded,
- how many repetitions are required,
- whether navigation is involved,
- how specific the interaction is.

Current limits range from:

```text
6 seconds
```

for the contextual Star Power contact challenge to:

```text
120 seconds
```

for finding another hidden Signal.

## Visible Countdown

The footer shows both progress and time.

Format:

```text
N / GOAL // M:SS
```

The countdown rounds upward to the next whole second.

This avoids showing `0:00` too early while a few hundred milliseconds still remain.

## Draining Bar

The bar begins at 100 percent and drains linearly to zero over the remaining objective lifetime.

It is a time bar, not a completion-progress bar.

Completion progress is communicated by text.

This separation prevents a two-kill task from needing the bar to represent two different concepts at once.

## Completion Freeze

When the goal is reached:

- the timer stops,
- failure timeout is cleared,
- bar returns to full,
- state becomes complete.

The completed card remains for 3.2 seconds.

## Failure

At timeout:

- state becomes failed,
- progress remains whatever the player achieved,
- bar becomes empty,
- no Rupees are awarded.

The failure card remains for 2.7 seconds.

## Timer Resilience

The runtime has both:

- a timeout scheduled for the exact remaining duration,
- a 2-second objective tick that also checks whether the timer passed zero.

This provides a secondary safety check if a browser delay affects the main timeout.

## Manual Dismissal

Dismissal clears both timer handles immediately.

The objective cannot later fail after it has already been dismissed.

## Design Rules

- Timer always visible while active.
- Bar represents time remaining.
- Completion progress remains textual.
- Failure awards zero Rupees.
- Completed and failed timers cannot continue running.
- Dismissal cancels pending failure.
- Time limits are authored per objective.
- Browser timing delays should not create immortal objectives.

## Success Criteria

The player can tell exactly how much time remains and receives one unambiguous result when the timer resolves.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
