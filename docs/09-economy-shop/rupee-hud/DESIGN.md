# Rupee HUD - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Rupee HUD > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Displays the current wallet and becomes an attention cue when the player can afford at least one available unowned Shop item.

> This page is the canonical design documentation for **Rupee HUD** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Rupee HUD has two jobs:

- show current spending power,
- act as the doorway into the Shop.

It should not occupy space before the economy is discovered.

Once visible, it becomes part of the persistent progression HUD.

## Discovery State

The HUD appears after the player has entered the economy.

That can happen through:

- earning a Rupee,
- already owning a Shop item on a returning session,
- restored wallet state.

## Interaction

The Rupee meter is clickable.

Clicking it opens the Shop.

This makes the wallet itself the obvious economy control rather than introducing a separate permanent Shop button.

The Dev Console `shop` command remains an alternate route.

## Affordability State

When at least one currently available, unowned item is affordable, the HUD pulses.

This gives the wallet actionable meaning.

The cue should answer:

> I have enough currency to do something.

It should not pulse merely because the wallet is nonzero.

## Shop-Open Suppression

The pulse stops while the Shop is already open.

The player is already looking at the destination.

## Accessibility

The Rupee HUD updates its accessible label.

Normal state communicates:

- wallet amount,
- ability to open Shop.

Affordable state additionally communicates:

- number of affordable items.

The tooltip also includes the cheapest currently affordable price.

## Design Rules

- Hidden before economy discovery.
- Always show current wallet once revealed.
- Click opens Shop.
- Pulse only for actionable affordability.
- Stop pulse while Shop is open.
- Follow current world theme for the HUD frame.
- Do not use the HUD pulse as the sole communication of Shop availability.

## Success Criteria

The player can understand both current wallet value and whether opening the Shop is immediately useful.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
