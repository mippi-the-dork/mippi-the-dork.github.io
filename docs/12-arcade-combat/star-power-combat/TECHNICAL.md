# Star Power Combat - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Star Power Combat > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets Star Power contact damage regular UFOs and interact with boss targets through explicit cooldown rules.

> This page is the canonical technical documentation for **Star Power Combat** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Poll

During Star Power, every:

```text
70 ms
```

the system calls:

```js
collectStarPowerHoverTarget();
```

## Target Query

The function uses:

```js
document.elementFromPoint(
  latestPointer.x,
  latestPointer.y
)
```

then searches for the nearest ancestor matching:

```text
.shooting-star
.galaga-secret
.game-pickup
.doug-bone
```

Regular UFOs and normal Bosses both use:

```text
.galaga-secret
```

## Duplicate Guard

Targets receive:

```text
data-star-power-hit="1"
```

before the click is invoked.

## Collection Method

The target receives:

```text
data-telemetry-collect-method=
  "star_power"
```

then:

```js
hit.click();
```

This routes through the existing target's normal interaction path.

## Regular UFO

`registerUfoKill()` detects method:

```text
star_power
```

and records:

```text
combos.starPowerUfoKills
```

Then it announces:

```text
Star Power + UFO
```

once per session.

## Normal Boss

The Star Power collector treats:

```js
hit.classList.contains(
  'boss-ufo'
)
```

as repeatable.

After the click:

```js
window.setTimeout(
  () => {
    if(hit?.isConnected)
      delete hit.dataset.starPowerHit;
  },
  700
);
```

This allows another hit after about 700 ms.

## Boss Telemetry

Boss click path records:

```text
combos.starPowerBossHits
```

and announces:

```text
Star Power + Boss
```

once per session.

## Super Boss

The full-screen core and Adds do not use `.galaga-secret`.

They are therefore not collected by this Star Power hover selector.

## QA

- Activate Star Power and touch regular UFO.
- Verify one-hit destruction.
- Verify first combo announcement.
- Touch Boss and remain overlapping.
- Verify hit cadence is about one per 700 ms.
- Move away and back.
- Verify normal hit logic resumes.
- Enter Super Boss with Star Power active and confirm dedicated encounter fire remains the combat method.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
