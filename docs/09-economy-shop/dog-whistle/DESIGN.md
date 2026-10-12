# Dog Whistle - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Dog Whistle > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that increases Doug Bone opportunities once Doug is in command.

> This page is the canonical design documentation for **Dog Whistle** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Dog Whistle is the Doug-focused gameplay modifier.

It gives players who want to pursue Coolness a way to bias the ambient system toward Doug Bone opportunities.

## Dependency

The Whistle does nothing meaningful until Doug is in command.

This is intentional.

The item improves a system rather than bypassing its prerequisite.

## Effect

When equipped and Doug command state is active:

- natural Doug Bone opportunities occur more frequently.

The Whistle does not:

- spawn Bones continuously,
- auto-collect Bones,
- increase Bone value,
- activate Doug command itself.

## Slot

Dog Whistle uses the one gameplay slot.

The player therefore chooses between:

- faster Doug progression,
- collectible weighting,
- longer Star Power,
- slower pickups,
- stronger Legendary targeting.

## Cost

```text
2 Rupees
```

It is cheap enough to experiment with early.

## Design Rules

- No effect before Doug command.
- Increase frequency, not reward value.
- Respect Adaptive Director blocking.
- Respect Easy Mode and other global scheduling rules.
- Unequipping restores normal cadence.

## Success Criteria

A player deliberately pursuing Doug systems can make Bones noticeably more available without making the screen constantly fill with them.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
