# Objective Timer and Failure - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective Timer and Failure > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Runs the visible countdown, linear draining bar, completion freeze, and timeout behavior for Optional Objectives.

> This page is the canonical technical documentation for **Objective Timer and Failure** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Duration Clamp

When an objective starts:

```js
const duration =
  Math.max(
    5000,
    Number(def.duration) ||
      60000
  );
```

This enforces a hard minimum of 5 seconds.

## Active Time Data

The active object stores:

```text
startedAt
endsAt
duration
```

with:

```js
endsAt =
  now + duration;
```

## Remaining Time

```js
function objectiveRemainingMs(
  active=objectiveRuntime.active
){
  if(
    !active ||
    active.complete ||
    active.failed
  )
    return 0;

  return Math.max(
    0,
    active.endsAt-Date.now()
  );
}
```

## Clock Label

The display uses:

```js
Math.ceil(
  remainingMs/1000
)
```

then formats:

```text
M:SS
```

## Timer Start

`objectiveStartTimer(active)`:

1. clears old objective timers,
2. calculates remaining milliseconds,
3. sets bar to 100 percent with no transition,
4. forces layout,
5. applies:
   - `width <remaining>ms linear`,
6. sets bar to 0 percent,
7. starts clock-text interval,
8. schedules failure timeout.

## Clock Refresh

Text refreshes every:

```text
200 ms
```

## Failure Timeout

Timeout:

```js
window.setTimeout(
  () =>
    objectiveFail(
      'time_expired'
    ),
  remaining+30
);
```

The extra 30 ms ensures the visual bar can reach the end before the failure handler.

## Secondary Tick

Global objective tick runs every:

```text
2000 ms
```

If the objective is unresolved and:

```js
objectiveRemainingMs(active)<=0
```

it calls the same failure function.

## Completion

`objectiveFinish()` begins:

```js
objectiveClearTimers();
```

and sets:

```js
active.complete=true;
active.progress=active.goal;
```

## Failure

`objectiveFail()` also begins by clearing timers and sets:

```js
active.failed=true;
```

It records actual progress and goal in the failure event detail.

## Dismiss

`objectiveDismissActive()` clears timers before removing active state.

## Card Removal Delays

Success:

```text
3200 ms
```

Failure:

```text
2700 ms
```

## QA

- Test the 6-second contact objective.
- Test a 120-second objective with DEV forcing.
- Background the browser near timeout.
- Return and verify the secondary tick/timeout resolves correctly.
- Complete in the final second and confirm one result only.
- Dismiss immediately before timeout and verify no delayed failure.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
