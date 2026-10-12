# Slowpoke - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Slowpoke > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that keeps newly spawned flying objects on screen longer.

> This page is the canonical design documentation for **Slowpoke** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Slowpoke is the accessibility-through-loadout modifier.

It does not change what appears.

It gives the player more time to react to moving objects.

This can help with:

- Rupees,
- Hearts,
- Stars,
- Mushrooms,
- Keys,
- Shooting Stars,
- Doug Bones,
- UFO-related flying opportunities that use the shared duration system.

## Effect

Newly assigned flying durations are multiplied by:

```text
1.35
```

or about 35 percent longer.

## Interaction with Slowmo

Slowpoke and Slowmo can stack.

This is intentional.

Slowpoke is a Shop loadout decision.

Slowmo is a Console mode.

Together they create a stronger reaction-time assist.

## Spawn-Time Rule

Slowpoke affects duration when the object's flight time is assigned.

It should not be expected to retroactively lengthen an object that was already spawned before the equipment change unless the shared duration refresh path explicitly reapplies it.

## Slot

Slowpoke occupies the one gameplay slot.

## Cost

```text
3 Rupees
```

## Design Rules

- 35 percent longer, not slower movement with same lifetime.
- Effect applies through shared flight timing where supported.
- Stack with Director pacing and Slowmo.
- Does not alter spawn frequency.
- Only active while equipped.

## Success Criteria

Players who struggle with moving opportunities can make the site more forgiving without globally enabling Easy Mode.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
