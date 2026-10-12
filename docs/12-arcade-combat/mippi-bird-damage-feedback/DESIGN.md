# Mippi Bird Damage Feedback - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Damage Feedback > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Communicates shield loss, invulnerability, crashes, and recovery clearly during the minigame.

> This page is the canonical design documentation for **Mippi Bird Damage Feedback** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

When Mippi Bird hits a pipe or boundary, the player needs to know immediately which of two things happened:

### A life absorbed the hit

The run continues.

### No life remained

The run ended.

Those outcomes must never look similar.

## Absorbed Hit

If an Extra Life is available:

- the correct life source is consumed,
- Mippi is stabilized,
- temporary invulnerability begins,
- the Mippi logo blinks rapidly,
- footer help text names the life that was spent,
- Console confirms the hit.

The player should understand:

> I was hit, but the game intentionally saved me.

## Invulnerability

The recovery window is approximately:

```text
1.65 seconds
```

During that time:

- further pipe/boundary collision does not consume another life,
- the logo blinks,
- the player can reposition.

This prevents one collision from immediately cascading into another death.

## Velocity Recovery

After an absorbed hit, the game applies a controlled upward recovery velocity.

The vertical position is also clamped inside a safe canvas margin.

This avoids cases where a saved player remains physically embedded outside the valid play area.

## Visual Philosophy

Invulnerability is communicated by blinking the Mippi logo.

The renderer deliberately avoids applying a broad glow to the already-painted canvas.

A previous player-art path could make the logo read like a square.

The current implementation keeps the logo crisp.

## Game Over

When no life absorbs the hit:

- game state becomes over,
- death telemetry records,
- canvas darkens,
- `GAME OVER` appears,
- `CLICK TO RESTART` appears,
- footer reports:
  - `CRASHED AT <score>`.

The player can restart with one click.

## Boundary and Pipe Consistency

The same Extra Life logic handles:

- pipe collision,
- top/bottom boundary collision.

The only difference is the recorded hit reason.

## Design Rules

- Life absorption and death must look clearly different.
- Invulnerability prevents immediate chain loss.
- Blink should be obvious but not obscure logo identity.
- Footer names Shop or Mushroom source.
- Console mirrors source use.
- Game Over must show score and restart action.
- Restart requires one click.
- Collision recovery should never place Mippi outside safe bounds.

## Success Criteria

The player never wonders whether a collision was ignored, shielded, or fatal.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
