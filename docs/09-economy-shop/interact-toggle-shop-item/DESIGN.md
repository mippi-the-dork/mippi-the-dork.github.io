# Interact Toggle Shop Item - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Interact Toggle Shop Item > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that unlocks the Interact Mode control.

> This page is the canonical design documentation for **Interact Toggle Shop Item** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Interact Toggle is a focus tool.

The portfolio contains many normal links and buttons underneath moving game-layer opportunities.

When the player is actively hunting those opportunities, ordinary page interaction can become accidental noise.

Interact Toggle gives the player control over that problem.

## Unlock

Purchasing the item reveals the Interact Mode control.

The item itself is passive.

The player does not equip it in the gameplay slot.

## Behavior

The control switches normal portfolio interaction between:

- ON,
- OFF.

When portfolio interaction is OFF:

- the page body is visually dimmed,
- normal links and controls are suppressed,
- game-layer interactions remain live.

This creates a deliberate "hunt" state.

## Super Boss Relationship

The Super Boss can temporarily force the same interaction suppression.

During that encounter:

- the player's prior setting is preserved,
- the encounter owns interaction state,
- the player cannot manually override it,
- the original setting returns afterward.

## Cost

```text
4 Rupees
```

## Requirement

The item requires Epic progression.

## Design Rules

- Purchase unlocks control permanently.
- Control is hidden before ownership.
- It does not consume gameplay slot.
- Interact OFF suppresses normal portfolio interaction, not game layer.
- Super Boss override wins temporarily.
- Player preference returns after encounter.

## Success Criteria

A player can intentionally enter a safe interaction-hunting state without permanently changing how the portfolio works.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
