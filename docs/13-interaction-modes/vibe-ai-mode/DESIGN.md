# Vibe AI Mode - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Vibe AI Mode > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the playful runtime AI Mode overlay with animated screen treatment and rotating overconfident status messages.

> This page is the canonical design documentation for **Vibe AI Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Vibe AI Mode is a deliberately unserious "AI is working on it" presentation layer.

It represents the modern development experience of watching an agent confidently claim progress while the human quietly wonders what changed.

The player-facing Console command is:

```text
vibe
```

The visible mode calls itself:

`AI MODE`

## Separation from the AI Wish

Vibe AI Mode and the AI Vibe Refactor Wish are related but not identical.

### Vibe AI Mode

A reversible presentation mode.

It adds:

- a status agent,
- screen grid,
- scan treatment,
- rotating AI messages.

It does not corrupt page copy or disable links.

### AI Vibe Refactor Wish

A larger authored Wish sequence.

It deliberately corrupts content and requires:

`UNDO AI`.

That sequence temporarily uses Vibe AI Mode as part of its presentation.

Keeping these concepts separate is important for documentation and testing.

## Status Agent

When enabled, a small AI status surface appears and rotates through lines such as:

- making it more scalable,
- confidently renaming a variable,
- fixed the bug, probably,
- 93% confidence, comprehension pending,
- found three bugs, introduced four,
- one more refactor before shipping.

The writing is the feature.

The mode should feel alive even though it has no progression effect.

## Screen Treatment

The entire page receives:

- scanning light,
- subtle grid,
- scan lines,
- rarity-aware color shifts.

The effect is screen-space and noninteractive.

It should not block the site.

## Runtime Nature

Vibe AI Mode is not persisted.

Reloading returns to normal.

This is appropriate because it is a toy/debug presentation state rather than a player entitlement.

## State Preservation for AI Wish

The AI Wish remembers whether Vibe Mode was already on before it began.

Undo only turns Vibe off if the Wish had turned it on.

This protects the player's existing toy-mode choice.

## Design Rules

- Runtime-only toggle.
- No progression effect.
- Do not disable content in ordinary Vibe Mode.
- Keep rotating status copy readable.
- AI Wish can borrow the mode without owning the player's prior preference.
- Global rarity should recolor the screen treatment.
- Reload safely returns to normal.

## Success Criteria

Vibe AI Mode makes the whole screen feel like an overconfident agent is actively "helping" without actually changing portfolio content.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
