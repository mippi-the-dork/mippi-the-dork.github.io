# Mega Laser - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mega Laser > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the Super Boss beam attack that pauses boss movement while continuously tracking the player's cursor at a controlled rate.

> This page is the canonical technical documentation for **Mega Laser** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Function

```js
superBossMegaLaser()
```

returns immediately when:

- no encounter exists,
- encounter ended,
- another laser is already active.

It then sets:

```js
s.laserActive=true;
```

## Origin

The beam captures:

```js
const x=s.bossX;
const y=s.bossY;
```

at attack start.

Because the Boss movement clock pauses while `laserActive`, this origin remains coherent for the attack.

## Length

Beam length:

```js
Math.hypot(
  window.innerWidth,
  window.innerHeight
)*1.4
```

This is long enough to span the full viewport diagonal.

## Initial Angle

```js
let beamAngle=
  Math.atan2(
    s.cursorY-y,
    s.cursorX-x
  );
```

## Timing

Normal:

```text
Charge          900 ms
Active         1750 ms
Turn rate       0.88 rad/s
```

Slowmo:

```text
Charge         1250 ms
Active         2300 ms
Turn rate       0.62 rad/s
```

## Capped Tracking

Each frame:

```js
const targetAngle=
  Math.atan2(
    s.cursorY-y,
    s.cursorX-x
  );

const maxTurn=
  turnRate*dt;

const delta=
  angleDelta(
    beamAngle,
    targetAngle
  );

beamAngle +=
  clamp(
    delta,
    -maxTurn,
    maxTurn
  );
```

The beam therefore cannot instantly snap onto the cursor.

## Active Transition

After the charge interval:

```text
charging
```

class is removed and:

```text
active
```

is added.

## Collision

The active beam endpoint is calculated from angle and length.

Hit condition:

```js
distancePointToSegment(
  s.cursorX,
  s.cursorY,
  x,
  y,
  x2,
  y2
)<34
```

On collision:

```js
superBossImpact(
  x,
  y,
  165,
  'mega_laser'
);
```

## Boss Movement Freeze

The main encounter render loop only advances:

```js
state.bossMoveClock
```

when:

```js
!state.laserActive
```

This is the v2.68 correction that prevents post-laser movement teleport.

## End

After active duration:

- beam removes,
- `laserActive=false`,
- beam RAF cancels.

Encounter cleanup also cancels the beam RAF and removes any remaining laser node.

## QA

- Observe first laser after roughly 3.3 seconds.
- Keep cursor still and verify beam centers gradually.
- Move cursor continuously and verify capped tracking.
- Confirm Boss translation is frozen.
- Confirm Boss resumes from same movement phase.
- Toggle Slowmo and compare all three timing variables.
- Exit encounter during charge and during active beam.
- Verify no laser remains.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
