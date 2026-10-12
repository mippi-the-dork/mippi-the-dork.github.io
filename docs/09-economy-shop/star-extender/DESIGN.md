# Star Extender - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Star Extender > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that increases Star Power duration.

> This page is the canonical design documentation for **Star Extender** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Star Extender is the simplest direct power-up modifier.

It makes a familiar temporary state last long enough to create more opportunities for system combinations.

## Effect

Normal Star Power:

```text
about 3.6 seconds
```

With Star Extender:

```text
about 5.6 seconds
```

The increase is deliberately around two seconds.

That is long enough to notice without turning Star Power into a near-permanent state.

## Gameplay Value

A longer Star Power window helps with:

- arcade interactions,
- system combos,
- catching other active opportunities,
- experiencing Star-powered presentation.

## Slot

Star Extender uses the gameplay slot.

Equipping it sacrifices other gameplay modifiers.

## Cost

```text
3 Rupees
```

## Design Rules

- Only active while equipped.
- Does not increase Star pickup frequency.
- Does not change Star pickup lifetime.
- Does not persist Star Power through reload.
- Swapping item affects future activations, not already-ended states.

## Success Criteria

The difference in Star Power duration is immediately noticeable and creates more room for playful overlap between systems.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
