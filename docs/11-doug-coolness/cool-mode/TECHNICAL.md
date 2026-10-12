# Cool Mode - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Cool Mode > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Temporarily turns a full Coolness meter into an active Doug limit state with special visuals, Rainbow Bones, and stronger pet-driven spawn behavior.

> This page is the canonical technical documentation for **Cool Mode** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

Relevant variables:

```js
let dougCoolProgress=0;
let dougCoolActive=false;
let dougCoolTimer=null;
let dougCoolDrainTimer=null;
```

## Activation

`activateDougCoolMode({source='meter'})` performs the limit-state transition.

It first cancels an in-progress drain timer, then forces:

```js
dougCoolProgress=100;
```

It records the historical max-Cool condition if necessary, evaluates postgame achievements, and sets:

```js
dougCoolActive=true;
```

The main Doug card receives:

```text
doug-star-cool
```

Any active popup Doug cameo receives:

```text
star-cool
```

## Dependent Visual Refresh

Activation calls:

```js
syncDougThemeVisuals();
syncDougBoneCoolVisuals(true);
updateCoolMeter();
updateProgressHudVisibility();
persistDougCoolProgress();
```

This keeps:

- Doug image,
- Rainbow Bones,
- Coolness HUD,
- persistent session progress

in sync.

## First Activation Feedback

If the mode was not already active:

```js
telemetryCount(
  'economy',
  'coolActivations'
);
```

and:

```js
telemetryMeaningful(
  'doug_cool_mode',
  {source}
);
```

are recorded.

The player receives:

```text
COOL METER // FULL
Doug has entered Cool Mode. This is now a real progression system.
```

Console output:

```text
COOL METER FULL // DOUG COOL MODE ACTIVATED.
```

## Active Duration

The active timer is:

```js
window.setTimeout(
  finishDougCoolMode,
  10500
);
```

or approximately 10.5 seconds.

Calling `activateDougCoolMode()` again while active clears and replaces this timeout.

## Coolness While Active

`addDougCoolness()` begins with:

```js
if(dougCoolActive){
  activateDougCoolMode({
    source:'refresh'
  });
  return;
}
```

Therefore incoming Coolness does not exceed 100.

It refreshes the active state instead.

## End and Drain

`finishDougCoolMode()`:

1. clears the active timeout,
2. clears any prior drain interval,
3. sets `dougCoolActive=false`,
4. starts a 16-step drain.

Drain cadence:

```text
75 ms per step
```

Approximate drain duration:

```text
1.2 seconds
```

Progress is calculated from a starting value of 100 down to zero.

## Final Cleanup

At the end of the 16 steps:

```js
dougCoolProgress=0;
```

The runtime removes:

```text
doug-star-cool
star-cool
```

from Doug surfaces.

It then:

```js
syncDougThemeVisuals();
syncDougBoneCoolVisuals(false);
updateCoolMeter();
updateProgressHudVisibility();
persistDougCoolProgress();
```

Console output confirms that Doug returned to standard operating Coolness.

## Session Persistence

Coolness progress is stored in:

```text
mippi-doug-cool-progress-v1
```

using `sessionStorage`.

The active timeout itself is runtime-only.

A reload can restore the numeric Coolness value but does not reconstruct the previous active timer.

## Historical Postgame State

First max activation persists:

```text
mippi-postgame-cool-maxed-v1
```

in local storage.

This is the authority used by the postgame `Maximum Cool` achievement.

## DEV

Useful commands:

```text
dev cool max
dev doug cool
dev cool 50
dev cool 0
```

## QA

- Force 75 percent and collect one normal Bone.
- Verify 100 percent activates Cool Mode.
- Time the roughly 10.5 second active window.
- Collect another Bone during Cool Mode.
- Verify the active timer refreshes.
- Let the mode expire.
- Verify rapid visible drain to zero.
- Verify Rainbow Bones return to normal.
- Reload after maxing Coolness and confirm historical postgame condition remains.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
