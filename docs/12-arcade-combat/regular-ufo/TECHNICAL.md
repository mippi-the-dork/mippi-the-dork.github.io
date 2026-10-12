# Regular UFO - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Regular UFO > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the baseline hostile arcade target and begins the site's invasion escalation loop.

> This page is the canonical technical documentation for **Regular UFO** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Spawn Function

Regular UFO creation is handled by:

```js
spawnGalaga(force=false)
```

The function returns false when a normal spawn is currently illegal.

## Threat Tier

```js
function ufoThreatTier(){
  const progress=
    ufoCycleProgress();

  if(progress>=7)
    return 3;

  if(progress>=4)
    return 2;

  return 1;
}
```

Therefore the current cycle maps approximately as:

```text
0 to 3 kills   Tier 1
4 to 6 kills   Tier 2
7 to 9 kills   Tier 3
```

## DOM

The UFO is:

```html
<button class="
  galaga-secret
  fly
  ufo-threat-N
">
```

It receives:

```text
data-telemetry-kind="ufo"
data-threat="<1|2|3>"
```

## Flight

The UFO uses:

```js
randomEdgeFlight(120)
```

Base durations:

```text
Tier 1   6.50 s + random 0 to 4.10 s
Tier 2   6.15 s + random 0 to 4.10 s
Tier 3   5.80 s + random 0 to 4.10 s
```

The shared flight-duration helper then applies:

- Adaptive Director flight multiplier,
- Slowpoke,
- Slowmo.

## Fire Cadence

Base interval before Director hostile-cadence multiplier:

```text
Tier 1   900 to 1259 ms
Tier 2   700 to 979 ms
Tier 3   560 to 789 ms
```

First attack begins after:

```text
Tier 1   440 ms
Tier 2   360 ms
Tier 3   280 ms
```

## Fire Pattern

### Tier 1

One projectile.

### Tier 2

One projectile.

32 percent chance of another after:

```text
150 ms
```

### Tier 3

Two immediate projectile calls.

58 percent chance of another after:

```text
120 ms
```

## Kill

Clicking the UFO:

1. resolves collection method,
2. calculates current center,
3. explodes,
4. calls:
   - `registerUfoKill(method,cx,cy)`,
5. stops fire interval,
6. removes the UFO.

## Kill Registration

`registerUfoKill()`:

- increments `ufoKills`,
- records arcade destroy telemetry,
- handles Star Power combo,
- rolls 30 percent Rupee drop,
- prints cycle progress,
- updates Invasion meter,
- checks Boss threshold.

## Rupee Drop

```js
Math.random()<.30
```

awards:

```text
1 Rupee
```

through the shared arcade reward path.

## Cycle Feedback

At current-cycle contact 5:

- Console warning,
- transient escalation toast.

At 8:

- Console warns that something larger is paying attention.

At 10:

- Boss contact is queued.

## Escape

On animation end:

```js
telemetryCount(
  'arcade',
  'ufoEscaped'
);
```

Fire interval is cleared.

The shared flight-end removal then removes the node.

## QA

- Force regular UFO at each threat tier through cycle state.
- Compare cadence and visual treatment.
- Kill with click.
- Kill with Star Power.
- Kill with Legendary projectile.
- Let one escape.
- Validate 30 percent Rupee reward over a reasonable sample.
- Confirm only successful kills advance the Boss threshold.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
