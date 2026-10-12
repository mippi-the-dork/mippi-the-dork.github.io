# Castle Progression - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Castle Progression > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks the repeated Castle-check loop and turns the fourth completed Castle into a claim-ready milestone.

> This page is the canonical design documentation for **Castle Progression** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

One Key and one Castle is a joke.

Repeating it several times risks becoming pointless unless the repetition has a destination.

The Castle progression meter gives that repetition a payoff.

The loop is:

1. collect Key,
2. find Castle,
3. click Castle,
4. hear that the princess is in another Castle,
5. repeat,
6. reach four Castles,
7. claim fireworks and Rupees.

The system stays intentionally shallow.

It does not need a large quest tree.

## Progress Meter

Castle run progress is visible once the loop begins.

The meter runs:

```text
0 / 4
1 / 4
2 / 4
3 / 4
CLAIM
```

At 4/4, the meter stops being passive and becomes a claim button.

## Castle Search

Each Key places a Castle on one randomly selected major section.

The Castle itself is visually small and suspicious.

The player has to navigate or scroll to find it.

## Repeated Punchline

For the first three checks, the site uses the familiar "another castle" joke.

The fourth check changes the system state.

Instead of immediately firing the reward, it arms the Castle meter.

## Claim and Reset

After the player claims:

- fireworks play,
- three Rupees are awarded,
- the Castle run resets to zero,
- a new run can begin with another Key.

This makes Castle progression repeatable.

## Postgame History

The first time the player reaches 4/4, the site records Castle completion history for the postgame achievement:

`Another Castle`.

That historical milestone is recorded before reward claim.

The player does not need to repeat the whole run if postgame is revealed later.

## Persistence

The current Castle-run count is persistent.

A player can leave at 2/4 or 4/4 claim-ready and continue later.

## Design Rules

- One Castle check per Key.
- Four checks complete a run.
- 4/4 arms claim instead of auto-reward.
- Claim gives 3 Rupees and fireworks.
- Claim resets meter to zero.
- First 4/4 records postgame completion history.
- Progress survives reload.
- Castle locations stay tied to major portfolio sections.

## Success Criteria

The repeated gag gets a satisfying cadence and reward without growing into a disproportionate quest system.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
