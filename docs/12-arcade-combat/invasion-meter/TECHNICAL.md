# Invasion Meter - Technical Documentation

## Current v3.25.2 verified update

`ufoWaveGoal()` returns 5/10/15 according to `totalBossVictories()%3`, `ufoCompletedWavesKills()` returns 0/5/15, and `invasionWaveKills` tracks the current stage. Hoisted functions prevent v3.15.1's historical temporal-dead-zone crash on return visits before late const initialization. `maybeSpawnUfoBoss()` gates normal vs Super Boss and respects pending state.

---

## Original historical reference

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Invasion Meter > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks arcade escalation toward larger encounters and communicates progress toward the Super Boss.

> This page is the canonical technical documentation for **Invasion Meter** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## DOM

The HUD element is:

```html
<div class="invasion-meter"
     id="invasion-meter"
     aria-label="Invasion progress: 0 percent"
     title="Ten UFO kills call a Boss. Every third Boss is a Super Boss.">
```

## Visibility

`updateInvasionMeter()` first checks:

```js
const epic=
  epicGameplayUnlocked();
```

Then:

```js
invasionMeter.classList.toggle(
  'visible',
  epic
);
```

## Boss Stage

```js
const victories=
  totalBossVictories();

const bossStage=
  victories%3;
```

This yields:

```text
0
1
2
```

for the current three-victory arc.

## Current Contact

```js
const currentContact=
  ufoBossActive
    ? 10
    : Math.max(
        0,
        Math.min(
          10,
          ufoCycleProgress()
        )
      );
```

Because `ufoBossActive` is also true during Super Boss, active large contact counts as a full ten-contact segment.

## Point Model

```js
const points=
  Math.max(
    0,
    Math.min(
      30,
      bossStage*10+
      currentContact
    )
  );
```

Percentage:

```js
const pct=
  Math.round(
    points/30*100
  );
```

## Super Boss Display

During active Super Boss:

```text
CONTACT
```

is displayed instead of the percentage.

Fill width becomes:

```text
100%
```

and class:

```text
contact
```

is applied.

## Accessibility

Normal:

```text
Invasion progress: N percent
```

Super Boss:

```text
Invasion progress full. Super Boss contact active.
```

## Contact Styling

`.invasion-meter.contact` switches to a red/orange warning treatment and runs a short alternate pulse.

This warning treatment intentionally overrides ordinary rarity colors.

## DEV

Useful commands:

```text
dev invasion 0
dev invasion 33
dev invasion 66
dev invasion near
dev superboss
```

`near` configures:

- two Boss victories,
- nine current regular UFO kills,
- next threshold at ten.

## Current Persistence Nuance

Boss-victory totals are read from session telemetry.

The current `ufoKills` sub-cycle is runtime-only.

A reload can therefore preserve the broad one-third or two-thirds Boss stage while resetting the current contact portion.

## QA

- Fresh Epic state: 0 percent.
- Reach ten contacts: approximately first third and Boss inbound.
- Defeat Boss: meter begins next third.
- Reach second Boss win: approximately 67 percent base.
- Use `dev invasion near`, kill one UFO, verify Super Boss warning.
- Spawn Super Boss and verify CONTACT presentation.
- Defeat it and verify the repeating arc resets appropriately.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.81 authoritative live wave uses `invasionWaveKills` bounded 0–10, `invasionEncounterPending`, `invasionSpawnQueued`, `invasionBossRetryKills` typically four. After 10 regular kills, queue one Boss; more kills cannot overflow wave. Escape retains wave, requiring reacquisition; victory resets only current wave. Every third Boss victory still escalates Super Boss. `nextBossKillThreshold` remains only for legacy DEV compatibility, not real meter progress.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).


## Current v3.01 Behavior

v3.00 dev invasion 0/33/66/near sets stage, resets wave/pending state and invalidates previously queued encounter spawns.
