# Legendary Unlock - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Legendary Unlock > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Unlocks Legendary progression after the player successfully completes the validated Wish path.

> This page is the canonical design documentation for **Legendary Unlock** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Legendary is the progression reward for successfully navigating the Wish system after completing Rare discovery.

It represents the transition from the midgame into the site's late-game systems.

The canonical player-facing path is:

1. complete all 10 Rare Signals,
2. enter Epic progression,
3. catch a Shooting Star,
4. attempt a Wish,
5. repair BP_WishManager,
6. retry the Wish,
7. succeed,
8. unlock Legendary.

## What Legendary Means

Legendary unlock is progression, not only a visual theme.

It can reveal or enable:

- Legendary theme choice,
- Legendary Shop content,
- Golden Trigger progression,
- late-game interactions,
- Finale eligibility,
- postgame Gold Standard condition.

## Automatic Theme Change

On first unlock, the site immediately applies Legendary presentation.

This makes the milestone obvious.

Afterward the player can cycle back to Rare or Epic without losing Legendary gameplay.

## Unlock Guard

Legendary cannot be granted through the normal helper unless all 10 original Rare achievements are complete.

This prevents bypassing the discovery chapter accidentally.

## Hidden Shortcut

The hidden `i know mippi` command can also invoke the Legendary unlock helper after 10/10 Signals.

That is an easter-egg bypass, not the canonical progression path.

## Design Rules

- Require all original Rare Signals.
- Canonical unlock follows successful validated Wish.
- Unlock is persistent.
- First unlock is celebratory.
- Active theme is switched to Legendary on unlock.
- Theme can later be changed freely.
- Legendary gameplay does not depend on staying visually Legendary.
- Repeated unlock attempts are harmless.

## Success Criteria

Legendary feels like a substantial new tier rather than merely a successful Console message.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
