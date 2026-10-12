# Music Player Persistence - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Persistence > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Persists Music Player entitlement across visits until the public full reset clears the portfolio save state.

> This page is the canonical design documentation for **Music Player Persistence** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Music Player is the final reward.

A reward that disappears on reload would feel temporary and accidental.

Once the player reaches 100 percent completion, Music should become part of the portfolio interface until they deliberately erase the whole experience.

## What Persists

The entitlement persists:

```text
Music Player unlocked
```

That means on a later load:

- player is visible,
- six track slots exist,
- track one is selected for availability check.

## What Does Not Persist

v2.78 intentionally does not persist:

- current selected track,
- current playback position,
- playing/paused state,
- collapsed/expanded state,
- current availability cache.

Those are runtime/media states.

Reload reconstructs them.

## Reset Boundary

The public Dev Console:

`reset`

is the intended way to return the site to a completely fresh progression state.

That reset clears Mippi-owned storage.

Music entitlement is part of that reset.

This gives the reward a clear lifetime:

```text
100% Complete
-> persistent reward
-> full reset
```

## Independence from Postgame Screen

Once unlocked, the Music Player does not need the Achievement Ledger to remain open.

It is its own persistent UI surface.

The player can browse normally and use Music at any time.

## Theme Independence

Unlock persists regardless of current selected theme.

The player can return later using Rare, Epic, or Legendary visual presentation.

## Browser Storage Scope

The entitlement is local to the browser storage context.

It is not an account-bound cloud reward.

Different browsers or cleared site storage naturally have separate states.

## Design Rules

- Persist entitlement only.
- Do not persist media transport state.
- Full reset clears entitlement.
- Theme changes never clear entitlement.
- Player remains independent from Ledger visibility.
- Do not require the player to replay Finale each visit.
- Storage remains browser-local.

## Success Criteria

After 100 percent completion, the player can leave and return later and still find the Music Player attached to the header until they intentionally reset the entire experience.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
