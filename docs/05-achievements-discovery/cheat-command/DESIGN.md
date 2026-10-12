# Cheat Command - Design Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Cheat Command > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Reveals the explicit solution for the next incomplete non-Legendary achievement without completing it automatically.

> This page is the canonical design documentation for **Cheat Command** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Cheat exists for players who no longer want a hint.

It converts the discovery experience into explicit instruction without directly granting the achievement.

That distinction preserves player action.

The command says:

> Here is what to do.

It does not say:

> Done for you.

## Rare Behavior

Before the normal Finale, Cheat can reveal explicit instructions for the next incomplete Rare Signal.

This is stronger than the Hint control.

## Postgame Behavior

After the postgame tier is revealed, Cheat can provide explicit instructions for the next incomplete Epic achievement.

The intended postgame behavior specifically excludes the Legendary capstone.

Legendary completion should remain the obvious result of finishing the Epic list and viewing the Finale.

## Legendary Exclusion

If all Epic achievements are complete and only `100 Percent Complete` remains, Cheat should not reveal or grant anything special for it.

The Legendary condition is already structurally visible.

## Design Rules

- Cheat never unlocks an achievement.
- Cheat gives one actionable next step.
- Cheat ignores the Legendary capstone.
- Cheat can be used repeatedly as progression changes.
- The command should remain undocumented enough to feel like a player-selected escape hatch rather than the default path.

## Success Criteria

A player who is completely stuck can continue the experience without needing an external guide.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
