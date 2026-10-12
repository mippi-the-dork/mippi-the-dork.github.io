# Rupee Pickup - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Rupee Pickup > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a flying collectible that directly increases the player's wallet.

> This page is the canonical design documentation for **Rupee Pickup** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Rupee Pickup is the simplest friendly flying collectible.

Its job is to teach the economy loop:

1. notice flying object,
2. click it,
3. receive currency,
4. see wallet,
5. discover Shop.

It should be visually readable as a gem-like currency object without relying on an external game franchise identity.

## Presentation

The pickup uses a faceted blue Rupee shape.

Its palette follows the active site rarity treatment while preserving the same recognizable geometry.

The object travels across the viewport like the other friendly pickups.

## Value

Each ordinary Rupee pickup awards:

```text
1 Rupee
```

The value is intentionally simple.

Larger Rupee rewards can come from systems such as arcade or Castle completion.

## Spawn Relationship

Rupees participate in the general friendly pickup schedule after Epic gameplay is available.

They are one member of the pickup pool alongside:

- Hearts,
- Mushrooms,
- Stars,
- Keys.

## Lucky Charm Relationship

Lucky Charm changes relative pickup weighting.

It does not directly increase the number of Rupees received per Rupee pickup.

Because Hearts and Stars become relatively more likely, Rupees can become relatively less frequent in the non-Key selection pool while Lucky Charm is equipped.

This is a useful tradeoff.

## Interaction

Clicking the moving pickup:

- records collection,
- creates a small explosion,
- adds one Rupee,
- removes the pickup.

Missing it has no penalty beyond losing that opportunity.

## Design Rules

- Value is one.
- Missing is low cost.
- The pickup uses the shared flying-object timing system.
- Slowpoke can extend its time on screen.
- Legendary cursor shots can collect it.
- Interact Mode should leave the game-layer pickup clickable.
- Pickup should never cover the page permanently.

## Success Criteria

The first Rupee pickup immediately teaches the existence of the wallet and creates a reason to inspect the Shop.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
