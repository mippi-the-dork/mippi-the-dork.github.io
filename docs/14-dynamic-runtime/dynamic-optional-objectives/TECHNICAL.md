# Dynamic Optional Objectives - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Dynamic Optional Objectives > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Offers one short, timed, Director-paced challenge at a time to turn the site's many optional systems into lightweight invitations without creating a mandatory quest log.

> This page is the canonical technical documentation for **Dynamic Optional Objectives** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Core Runtime

Objective runtime state:

```js
const objectiveRuntime={
  active:null,
  nextEligibleAt:
    Date.now()+32000,
  lastCategory:null,
  lastFailedId:null,
  started:false,
  clockTimer:null,
  failTimer:null
};
```

The initial eligibility window therefore begins approximately 32 seconds after runtime initialization.

## Objective Definition Shape

Every definition in:

```js
OBJECTIVE_DEFS
```

can contain:

```text
id
category
title
goal
reward
duration
eligible()
detail
optional advanced flag
```

## Session-Scoped Completion State

Completed and dismissed objective IDs live in the session telemetry branch:

```text
sessionTelemetry.objectives.completedIds
sessionTelemetry.objectives.dismissedIds
```

Failed IDs are recorded separately but are not excluded permanently.

## Offer Pool

`objectiveEligiblePool()` filters out:

- completed objectives,
- dismissed objectives,
- ineligible current-state objectives.

For an `advanced:true` objective, normal eligibility additionally requires Director state:

```text
engaged
mastery
```

unless Easy Mode is enabled.

## Variety Selection

`objectiveChoose()` applies several diversity rules.

### Avoid Immediate Failed Repeat

If another option exists, the most recently failed objective is temporarily removed from the candidate pool.

### Alternate Category

If an objective from another category is available, it prefers a category different from the previous objective.

### Category Usage Weighting

Each candidate is copied into a weighted array based on prior session category usage:

```js
copies =
  Math.max(
    1,
    3-
    Math.min(
      2,
      uses
    )
  );
```

This means less-used categories can receive up to three times the selection entries of heavily used categories.

## Offer Conditions

`objectiveCanOffer()` rejects an offer when:

- another objective is active,
- the objective cooldown has not expired,
- page is hidden,
- the Director attention budget is blocked.

Under normal pacing it also requires:

```text
active session time >= 32 seconds
```

and at least one of:

```text
Director gameScore >= 4
2 or more Rare achievements unlocked
```

Easy Mode bypasses those activity gates.

## Offer Loop

`startDynamicObjectives()`:

- installs the objective event sink,
- binds dismiss,
- binds resize positioning,
- attempts an offer after 9 seconds,
- runs `objectiveTick()` every 2 seconds.

Because `nextEligibleAt` begins 32 seconds in the future, the 9-second attempt normally does nothing until the eligibility window is reached.

## Completion

`objectiveFinish()`:

1. stops timer,
2. marks complete,
3. forces progress to goal,
4. increments completed telemetry,
5. records earned objective Rupees,
6. records unique completion ID,
7. emits `objective_completed`,
8. awards Rupees,
9. prints Console success,
10. schedules next eligibility,
11. leaves the completed card visible for 3.2 seconds.

## Failure

`objectiveFail()`:

1. stops timer,
2. marks failed,
3. stores `lastFailedId`,
4. increments failure telemetry,
5. records unique failed ID,
6. emits `objective_failed`,
7. awards nothing,
8. schedules a shorter retry cooldown,
9. leaves failure card visible for 2.7 seconds.

## Manual Dismissal

Dismiss:

- records telemetry,
- stores the objective ID in `dismissedIds`,
- removes card immediately,
- uses a minimum 45-second cooldown.

## DEV

Useful commands:

```text
dev objective random
dev objective complete
dev objective fail
dev objective <objective-id>
```

Forced replacement uses cancellation reason:

```text
dev_replace
```

## QA Hook

Browser DevTools:

```js
window.__MIPPI_OBJECTIVES__
  .snapshot()
```

returns:

- active objective,
- progress,
- goal,
- reward,
- complete/failed state,
- remaining milliseconds,
- next eligibility time,
- pool size,
- telemetry copy.

## QA

- Complete one objective and confirm it does not return that session.
- Dismiss one and confirm it does not return that session.
- Fail one and confirm it can return later.
- Force an advanced objective in Quiet for DEV testing.
- Test natural advanced selection in Engaged and Mastery.
- Enable reduced motion and confirm moving-target objectives are excluded.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
