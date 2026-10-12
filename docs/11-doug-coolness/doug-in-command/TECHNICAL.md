# Doug In Command - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug In Command > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Turns repeated Doug petting into a spawn-assist system and makes petting increasingly useful after Doug assumes command.

> This page is the canonical technical documentation for **Doug In Command** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Pet Counter

Runtime state:

```js
let dougClicks=0;
```

The command class is added when:

```js
dougClicks>=12
```

through:

```js
dougCard?.classList.add(
  'doug-command'
);
```

## Momentum

Normal command-state pet momentum uses:

```js
let dougCommandPetMomentum=0;
```

Each pet outside Cool Mode increments it.

Spawn chance:

```js
const spawnNow =
  dougCommandPetMomentum>=3 ||
  Math.random() <
    (dougCommandPetMomentum*.12);
```

Therefore:

- first momentum pet: 12 percent random chance,
- second: 24 percent,
- third: guaranteed attempt.

If a spawn succeeds:

```js
dougCommandPetMomentum=0;
```

## Cool Mode

When:

```js
dougCoolActive
```

is true, the momentum branch is skipped.

The code immediately calls:

```js
spawnDougApprovedClickable(
  'cool_pet'
);
```

On success it records:

```text
economy.coolPetSpawns
```

and Doug reacts:

```text
Doug has authorized immediate air traffic.
```

## Normal Spawn Assist

Successful non-Cool command pet spawn records:

```text
economy.dougSpawnAssists
```

## Candidate Builder

`spawnDougApprovedClickable(source='command_pet')` constructs an array of legal spawn functions.

### Bone

If Doug is in command:

```js
spawnDougBone(true)
```

is added.

### Standard Pickup

If Epic gameplay is unlocked, two standard pickup entries are added:

```js
spawnGamePickup(null,true)
spawnGamePickup(null,true)
```

This effectively doubles ordinary pickup weighting relative to each single candidate.

### Shooting Star

Added only when:

```js
!hasWishCharge()
```

### UFO

Added only when all are true:

```js
!ufoBossActive
!superBossActive
Date.now()>=ufoCalmUntil
```

## Selection

One candidate is selected uniformly from the candidate array.

After invocation:

```js
telemetryMeaningful(
  'doug_spawn_assist',
  {
    source,
    options:choices.length,
    cool:dougCoolActive
  }
);
```

is recorded.

## Important Current Nuance

The helper invokes the selected spawn function and then returns true without checking the selected function's own return value.

The candidate list already filters major legality rules, but a deeper spawn helper can still theoretically reject due to an attention or Director gate.

For QA, evaluate the visible result rather than assuming every logged assist necessarily created an object.

## DEV

```text
dev doug command
```

adds the command class and force-spawns a Bone.

It does not simulate all twelve natural pets.

## QA

- pet to 11: no command class,
- pet to 12: command class,
- continue pets outside Cool Mode and verify bounded spawn momentum,
- enter Cool Mode and verify one spawn attempt per pet,
- test pre-Epic command state,
- test Epic state with charge held,
- test active Boss/Super Boss exclusions.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
