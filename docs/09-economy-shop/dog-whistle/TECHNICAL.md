# Dog Whistle - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Dog Whistle > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that increases Doug Bone opportunities once Doug is in command.

> This page is the canonical technical documentation for **Dog Whistle** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'dog-whistle',
  cost:2,
  slot:'gameplay',
  rarity:'rare',
  tag:'MORALE'
}
```

## Doug Bone Gate

`spawnDougBone()` first requires:

```js
dougCard?.classList.contains(
  'doug-command'
)
```

Dog Whistle does not bypass this.

## Natural Delay

`nextNaturalDougBoneDelay()`:

### Easy Mode

```text
3 to 7 seconds
```

### Dog Whistle Equipped

Director-adjusted:

```text
4.3 to 9.3 seconds
```

### Normal

Director-adjusted:

```text
7 to 15 seconds
```

## Shared Director

Actual timing still runs through:

```js
directorDelay('bone',min,max)
```

so Adaptive Director state can modify cadence.

## Retry

If a scheduled Bone cannot spawn, the system retries sooner based on:

- Doug command state,
- motion policy,
- attention blocking.

## QA

- equip Whistle before Doug command: no Bones,
- activate Doug command,
- compare natural delay,
- unequip Whistle,
- compare normal delay,
- enable Easy Mode and verify Easy cadence supersedes Whistle timing.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
