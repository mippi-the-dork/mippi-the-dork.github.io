# Continue Exploring - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Continue Exploring > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Returns the player to the full portfolio after the Finale or Session Report without resetting any progression.

> This page is the canonical design documentation for **Continue Exploring** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

A portfolio should never punish someone for wanting to keep looking.

The ending therefore does not create a locked credits state.

`CONTINUE EXPLORING`

means exactly that.

The player returns to the same page with:

- progression intact,
- Shop inventory intact,
- achievements intact,
- theme intact,
- current runtime systems still available,
- the postgame layer about to reveal if it has not already.

## Two Continue Paths

There are two ways the player can continue.

### Directly from Finale

Choose:

`CONTINUE EXPLORING`

### From Session Report

Choose:

`CONTINUE EXPLORING`

inside the report.

Both lead back to the live portfolio.

## No Reset

Continue Exploring must never:

- clear storage,
- reload the page,
- reset wallet,
- remove Legendary,
- remove Shop ownership,
- clear Finale seen,
- return the player to top automatically.

The system simply closes the focused ending/report surface.

## Postgame Reveal

If the postgame achievement tier has not been revealed yet, Continue Exploring starts the five-second reveal timer.

This creates a small calm gap between:

- authored closure,
- the next layer of completion.

After that gap the Achievement Ledger opens with the new postgame tier.

## Finale Re-entry

The Finale-ready runtime state remains true after ending.

The brand remains in its ready state during the current runtime.

The player can therefore potentially trigger the Finale again by clicking the mark.

The persistent `finaleSeen` state prevents the first-time readiness toast from being treated as new on later visits.

## Design Rules

- Always allow continued exploration.
- Never reset progression.
- Direct Finale continue schedules postgame reveal.
- Session Report continue schedules the same reveal.
- Keep transition simple.
- Do not auto-scroll.
- Do not force a new theme.
- Postgame reveal happens after a short gap, not instantly.

## Success Criteria

The Finale feels like closure without behaving like a dead end.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
