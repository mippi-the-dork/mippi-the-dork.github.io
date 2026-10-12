# Meta Progression - Design Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Meta Progression > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the overall progression chain from first visit through Rare Signals, Epic, Wish repair, Legendary, Finale, postgame, and 100 percent completion.

> This page is the canonical design documentation for **Meta Progression** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Meta Progression is the structure that turns the portfolio from a collection of isolated easter eggs into a coherent optional experience.

The player should not see the entire chain at first.

The system is designed to reveal itself in layers.

The intended broad path is:

1. First visit.
2. Discover the hidden achievement layer.
3. Complete the 10 Rare Signals.
4. Enter Epic progression.
5. Discover the Wish path.
6. Repair BP_WishManager.
7. Complete a validated Wish.
8. Unlock Legendary.
9. Satisfy broad Finale requirements.
10. View the normal Finale.
11. Reveal the postgame Epic achievement tier.
12. Complete the nine Epic mastery goals.
13. Earn the Legendary 100 Percent Complete capstone.
14. Unlock the Music Player.

## Core Philosophy

The progression system must remain optional.

A recruiter or collaborator should be able to use the site normally without learning any of this.

A curious visitor should be able to discover the progression organically.

A completion-oriented player should eventually understand the whole structure.

The progression system therefore shifts from hidden to explicit over time.

### Early Game

The player discovers that there are hidden Signals.

The experience should feel mysterious and exploratory.

### Mid Game

After 10/10 Rare Signals, Epic systems become more obvious.

The site can now expose stronger game mechanics because the player has demonstrated interest.

### Late Game

The Wish and Legendary sequence asks the player to understand multiple systems rather than simply click one secret.

### Normal Ending

The Finale recognizes broad engagement rather than total completion.

This creates an accessible authored ending.

### Postgame

The site reveals a clearer completion checklist.

At this point the player has already opted into the game layer and can be more directly told what mastery means.

## Progression Layers

### Layer 0: Professional Portfolio

Always available.

Contains the six major sections and normal navigation.

### Layer 1: Rare Discovery

10 hidden Signals.

This layer teaches the player that the page has secondary interactions.

### Layer 2: Epic Systems

Completing the Rare set unlocks Epic progression and stronger game-layer activity.

### Layer 3: Wish Repair

The player catches a Shooting Star, reaches the Wish path, encounters BP_WishManager failure, repairs it, and successfully validates a Wish.

### Layer 4: Legendary

Validated Wish progression unlocks Legendary systems and visual rarity.

### Layer 5: Normal Finale

A broad engagement gate checks multiple systems without demanding mastery of everything.

### Layer 6: Postgame

After the Finale, the nine Epic completion achievements and one Legendary capstone are revealed.

### Layer 7: True Completion

All nine Epic postgame achievements plus having viewed the Finale unlocks 100 Percent Complete and the Music Player.

## Broad Engagement vs Mastery

The normal Finale and true completion deliberately use different standards.

The normal Finale should be reachable by a player who has broadly engaged with the site.

True completion should require mastery of the whole experience.

This is why the normal Finale does not require:

- every Shop item,
- every section,
- max Coolness,
- Super Boss victory,
- all Castles,
- all postgame goals.

Those belong to the postgame.

## Failure Philosophy

The meta progression should not punish experimentation.

Examples:

- missing a transient object should only delay that opportunity,
- dying to an arcade encounter should not erase unrelated progress,
- an invalid Wish attempt should preserve enough context to recover,
- choosing a different theme should never remove progression,
- failing an Optional Objective should not block Finale or postgame.

## Player Recovery

The progression structure includes several recovery tools:

- Hint control,
- Cheat command,
- Progression Trace HUD,
- attention cues,
- contextual toasts,
- DEV commands for QA.

The player-facing tools should become more explicit as progression becomes more complex.

## Design Rules

- Professional content is never gated.
- The progression path should become clearer over time.
- Major unlocks should introduce new possibilities, not merely badges.
- Earlier progression should never need to be repeated after persistence.
- Normal ending and true completion remain distinct.
- Visual theme is not progression authority.
- Optional Objectives never become required meta progression.
- The player must always have a path to recover from uncertainty.

## Success Criteria

Meta Progression succeeds when a curious visitor can naturally move from one layer to the next without the portfolio feeling like a conventional quest log from the first page load.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
