# Objective HUD - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective HUD > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Displays the current Optional Objective as a compact card positioned above the persistent progression HUD.

> This page is the canonical technical documentation for **Objective HUD** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## DOM References

Current script references:

```text
#dynamic-objective
#objective-kicker
#objective-title
#objective-detail
#objective-progress-text
#objective-reward
#objective-progress-fill
#objective-dismiss
```

## Render

`objectiveRender()` handles all visual states.

No active objective:

```js
objectiveHud.classList.remove(
  'show',
  'complete',
  'failed',
  'attention-muted'
);

objectiveHud.setAttribute(
  'aria-hidden',
  'true'
);
```

Active objective:

```js
objectiveHud.classList.add(
  'show'
);
```

and:

```js
aria-hidden=false
```

## Kicker

Normal:

```text
OPTIONAL OBJECTIVE // <CATEGORY>
```

Success:

```text
OBJECTIVE COMPLETE
```

Failure:

```text
OBJECTIVE FAILED
```

## Title

Normal:

```text
definition title
```

Success:

```text
Signal resolved.
```

Failure:

```text
Time expired.
```

## Reward

Normal/success:

```text
REWARD // N RUPEE(S)
```

Failure:

```text
REWARD // MISSED
```

## Bar State

Success:

```text
100%
```

with transition disabled.

Failure:

```text
0%
```

with transition disabled.

## Dismiss

The close control is visible only during the unresolved active state.

It is hidden for:

- success,
- failure.

## Attention Muting

v2.66 explicitly removes:

```text
attention-muted
```

whenever an active card renders.

The design change means an already accepted timed objective stays fully legible even if another attention-owning surface appears.

## Positioning

The objective card uses:

```js
syncObjectiveHudPosition()
```

to calculate its bottom offset above the persistent progression HUD.

The system intentionally uses stable HUD anchors rather than animation-transformed screen rectangles.

## Resize / HUD Changes

The Objective HUD position is resynchronized on:

- window resize,
- progression HUD visibility/height changes,
- relevant transition completion,
- ResizeObserver-driven layout updates.

This includes the v2.63 and v2.64 collision fixes.

## QA

- Start an objective with minimal HUD.
- Reveal Hearts while it is active.
- Reveal Rupees.
- Reveal Coolness.
- Reveal Castles.
- Confirm objective moves upward each time.
- Expand/collapse Achievement Ledger.
- Open Shop/Console while objective runs.
- Confirm objective remains fully opaque and correctly anchored.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
