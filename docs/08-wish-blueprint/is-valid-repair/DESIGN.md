# Is Valid Repair - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Is Valid Repair > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the player insert an Is Valid node to repair the intentionally broken Wish reference path.

> This page is the canonical design documentation for **Is Valid Repair** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The repair is intentionally one action.

The puzzle is about recognizing the problem, not reproducing an actual Blueprint editing workflow.

The player already did the meaningful reasoning when they followed:

`Accessed None -> Blueprint -> suspicious reference -> Is Valid`.

The interaction itself should then be immediate.

## Repair Action

The player clicks the `+` between Wish Event and Grant Wish.

The graph inserts or activates the Is Valid node.

The status changes from warning to validated.

The execution path visually becomes:

```text
Wish Event
  -> Is Valid
  -> Grant Wish
```

## Feedback

Repair feedback occurs in several places:

- graph wire state,
- graph status line,
- hint disappearance,
- Console output,
- Console repair pulse clears,
- Wish-ready attention returns if charge is still present.

This redundancy is intentional.

## Why Charge Remains

Repair would feel pointless if the player then had to wait for another celestial event.

Because the failed Wish preserved the charge, completing the repair immediately creates a clear action:

`try wish again`.

## Session Scope

The repair belongs to the current browser session.

This is acceptable because the repair is part of a fictional runtime graph.

Long-term progression is recorded only after a successful Wish.

## Design Rules

- One click completes the repair.
- Do not require drag-and-drop Blueprint editing.
- Repair cannot consume the Wish charge.
- Repair clears Blueprint error attention.
- Repair should be visually legible.
- Repeated repair clicks should be harmless.
- Validated state should persist across reload within the session.

## Success Criteria

The player immediately understands that the graph is fixed and knows to retry the Wish.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
