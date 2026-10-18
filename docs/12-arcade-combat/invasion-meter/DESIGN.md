# Invasion Meter - Design Documentation

## Current v3.25.2 verified update

Invasion escalation uses staged thresholds: first five regular UFO kills, then ten more, then fifteen more, resulting in a recurring Super Boss encounter. The meter expresses cumulative stage position out of thirty while Boss escapes retain a reduced reacquisition path.

---

## Original historical reference

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Invasion Meter > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks arcade escalation toward larger encounters and communicates progress toward the Super Boss.

> This page is the canonical design documentation for **Invasion Meter** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Before the Invasion meter existed, the Super Boss escalation was mathematically real but visually invisible.

The player could keep destroying UFOs without knowing:

- whether the activity was building toward anything,
- how far they were from the next Boss,
- why the Super Boss suddenly appeared.

The Invasion meter exposes that long arc.

## Readable Structure

The meter represents a three-Boss escalation arc.

Each Boss stage is conceptually worth one third of the full meter.

Within each stage, the current regular-UFO cycle fills another 0 to 10 contact segment.

The visible result is a 0 to 100 percent progression bar.

## Mental Model

The player-facing rule is:

```text
10 UFO kills -> Boss
Every third Boss -> Super Boss
```

The tooltip states this directly.

That is intentionally much simpler than the internal threshold math.

## Example Progression

Approximate arc:

```text
0 Boss wins, 0 UFO kills     0%
0 Boss wins, 10 contacts    33%

1 Boss win, 0 contacts      33%
1 Boss win, 10 contacts     67%

2 Boss wins, 0 contacts     67%
2 Boss wins, 10 contacts   100%
```

The third large contact is the Super Boss.

## Contact State

When the Super Boss is actively present:

- meter fills completely,
- numeric percentage is replaced by:
  - `CONTACT`,
- the meter uses a warning treatment.

This makes the HUD reflect that escalation has become an active encounter.

## Visibility

The Invasion meter is an Epic gameplay HUD element.

It appears after Epic gameplay is unlocked.

It does not require the player to display the Epic visual theme.

## Reset After Victory

After the third Boss victory in the cycle, the long arc effectively starts another three-victory rotation.

This keeps the arcade system repeatable.

## Design Rules

- Hidden before Epic gameplay.
- Explain 10-UFO and every-third-Boss relationship clearly.
- Use percentage during buildup.
- Use CONTACT during active Super Boss.
- Follow world rarity theme while preserving contact warning state.
- Do not require exact internal math to understand the arc.
- Meter should help the player decide whether to continue the arcade thread or return to portfolio browsing.

## Success Criteria

The player always understands whether they are early, mid, or late in the current Super Boss escalation cycle.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current Release Note (v2.89)

v2.81's current bounded wave counts ten regular UFO kills and queues only one Boss. An escaped Boss leaves wave progress ready for short reacquisition (~4 additional kills). Victory resolves current wave while every third Boss victory escalates the Super Boss. The compact Gameplay HUD meter communicates wave/contact/retry in tooltip, without visually regressing during rapid kills.
