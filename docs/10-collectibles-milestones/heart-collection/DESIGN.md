# Heart Collection - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Heart Collection > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks up to five Hearts as a visible collectible progression meter.

> This page is the canonical design documentation for **Heart Collection** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Hearts deliberately use one of the most familiar videogame collectible languages and then refuse to become player health.

They are a progression collectible, not a combat stat.

The player collects up to five Hearts.

The five-Heart payoff is a professional/community reward instead of more hit points.

This redirects a conventional game symbol toward the identity of the portfolio.

## Progression

Heart count runs from:

```text
0 / 5
```

to:

```text
5 / 5
```

The persistent Heart HUD appears after the first Heart is found.

Each collected Heart fills one icon.

## No Combat Health

The Heart meter does not control:

- UFO damage,
- Super Boss health,
- Mippi Bird collision health,
- any player death state.

The system is intentionally collectible-only.

## Fifth Heart

The fifth Heart does not automatically open the reward.

Instead it changes the meter into a claim-ready control.

This preserves player attention and lets the player choose when to view the reward.

## Extra Hearts

If a Heart is collected after reaching 5/5:

- count stays at five,
- the Console jokes about hoarding health,
- no additional reward stack is created.

## Postgame

Reaching 5/5 is enough for the Epic achievement:

`Full Hearts`.

The separate community reward claim is part of normal Finale readiness in the current progression design.

This creates a distinction between:

- collectible completion,
- reward claim.

## Persistence

Heart count survives reloads.

The reward-claimed state is persisted separately.

This allows a player to reach 5/5, leave, return later, and still find the Hearts meter waiting to be claimed.

## Design Rules

- Maximum count is five.
- Hearts are not player health.
- Meter appears after first Heart.
- Fifth Heart arms claim state instead of auto-opening reward.
- Extra Hearts do not increase count.
- Heart completion survives reload.
- Claim state survives reload until reward is claimed.
- The collectible remains optional to professional content.

## Success Criteria

The player initially reads Hearts as familiar game language, then discovers that their actual reward points back toward the game-development community.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
