# Celestial Beacon - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Celestial Beacon > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that increases Shooting Star frequency and catchable duration after Epic unlock.

> This page is the canonical design documentation for **Celestial Beacon** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Celestial Beacon improves repeat-Wish usability.

The first Wish is exciting when the Shooting Star feels rare.

Once the player understands the system, repeatedly waiting close to a minute for another attempt can become friction.

Beacon reduces that friction without making Wishes free.

## Effect

The Beacon improves two variables.

### Frequency

Natural Shooting Stars appear more often.

### Lifetime

Each Shooting Star remains on screen longer.

This makes repeat Wishes both more frequent and more catchable.

## Progression Gate

The item requires Epic progression.

That matches the fact that natural Shooting Stars are themselves Epic content.

## Passive

Beacon is permanently active after purchase.

It does not consume the gameplay slot.

## Cost

```text
7 Rupees
```

It is one of the more expensive Epic items because it materially improves access to a major progression/resource loop.

## Interaction with Slowpoke

Slowpoke can further extend Shooting Star flight duration.

Beacon and Slowpoke therefore stack:

- Beacon changes base lifetime.
- Slowpoke multiplies shared flight duration.

## Interaction with Easy Mode

Easy Mode uses its own much shorter Shooting Star schedule.

Beacon does not need to further override that branch.

## Design Rules

- Requires Epic.
- Passive once owned.
- Improves frequency and catch time.
- Does not increase charge capacity.
- Does not auto-catch stars.
- Does not bypass Blueprint repair.
- Stacks with Slowpoke for lifetime.

## Success Criteria

Repeat Wishes become meaningfully less tedious while the celestial charge still remains a real collectible resource.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current implementation correction (v3.25.2)

**Current design (v3.25.2).** Celestial Beacon is no longer an always-active owned passive. It is an Epic gameplay modifier that can be equipped at the same time as every other gameplay modifier. When equipped it makes eligible Shooting Stars more frequent and keeps them catchable longer. Unequipping disables the bonus without losing ownership. Stars still retain their progression and Dev Console eligibility requirements.

For historical evolution and superseded rules see [v3.15–v3.25.2 Systems Integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Older sections above may describe the original implementation baseline; this section is the current release-specific override.
