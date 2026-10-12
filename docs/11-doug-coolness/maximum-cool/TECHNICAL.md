# Maximum Cool - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Maximum Cool > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Records the first time Doug reaches 100 percent Coolness as a lasting mastery milestone used by the postgame achievement system.

> This page is the canonical technical documentation for **Maximum Cool** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Historical State

At startup:

```js
let postgameCoolMaxed=false;
```

is loaded from:

```text
mippi-postgame-cool-maxed-v1
```

## Activation Write

Inside `activateDougCoolMode()`:

```js
if(!postgameCoolMaxed){
  postgameCoolMaxed=true;

  localStorage.setItem(
    POSTGAME_COOL_MAXED_KEY,
    '1'
  );
}
```

Then:

```js
evaluatePostgameAchievements();
```

runs immediately.

## Achievement Condition

The postgame condition resolver includes:

```js
case 'post_cool':
  return postgameCoolMaxed;
```

Therefore current `dougCoolProgress` is not required once history is recorded.

## Drain Independence

`finishDougCoolMode()` eventually sets:

```js
dougCoolProgress=0;
```

but does not clear `postgameCoolMaxed`.

## Doug Wish

Doug Executive Review sets:

```js
dougCoolProgress=100;
activateDougCoolMode({
  source:'wish'
});
```

which uses the same historical recording path.

## DEV

`devSetCool('max')` also sets the historical flag for QA and reevaluates postgame achievements.

Useful commands:

```text
dev cool max
dev doug cool
```

## Reset

The public full reset clears all `mippi*` local storage keys, including:

```text
mippi-postgame-cool-maxed-v1
```

## QA

- max Coolness before postgame reveal,
- allow Coolness to drain to zero,
- reveal postgame,
- verify Maximum Cool is complete,
- reload,
- verify completion remains,
- full reset,
- verify historical condition is gone.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
