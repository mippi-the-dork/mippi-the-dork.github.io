# System Combos - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > System Combos > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Recognizes meaningful interactions between independent systems such as Star Power, UFOs, Slowmo, Doug, Shop loadouts, and Legendary attacks.

> This page is the canonical technical documentation for **System Combos** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Session Set

At startup:

```js
const announcedSystemCombos=
  new Set(
    Array.isArray(
      sessionTelemetry.combos?.announced
    )
      ? sessionTelemetry.combos.announced
      : []
  );
```

This uses the session telemetry store.

## Announcement

```js
announceSystemCombo(
  id,
  title,
  detail
)
```

first checks:

```js
announcedSystemCombos.has(id)
```

If already announced, it returns.

Otherwise it:

1. adds the ID,
2. writes the ID into telemetry unique list,
3. records meaningful:
   - `system_combo`,
4. prints:
   - `SYSTEM COMBO // ...`,
5. shows transient toast.

## Current Explicit IDs

```text
star-power-ufo
star-power-boss
slowmo-hostile-fire
legendary-mushroom
star-power-doug
```

## Counters

Current telemetry counters include:

```text
combos.starPowerUfoKills
combos.starPowerBossHits
combos.slowmoHostileShots
combos.starPowerDoug
combos.legendaryMushroom
```

## Optional Objective

The Dynamic Optional Objective:

```text
system-combo
```

listens for meaningful event:

```text
system_combo
```

A first-time explicit combo can therefore complete that objective.

Because repeated combo announcements are suppressed, the objective is best tested with a combo that has not already been announced in the current session.

## Current Combination Details

### Star Power + UFO

`registerUfoKill('star_power',...)`

### Star Power + Boss

Boss click path with telemetry method `star_power`

### Slowmo + UFO

`fireUfoProjectile()` while Slowmo is active

### Mushroom + Legendary

`advanceCursorPower()` while Legendary visual class is active and cursor power is above zero

### Star Power + Doug

`collectDougBone()` while body has `star-power`

## Current Theme/Gameplay Nuance

The Mushroom + Legendary combo announcement currently checks:

```text
body.theme-legendary
```

inside cursor-power handling.

Legendary combat itself is progression-owned elsewhere.

If theme/gameplay separation is tightened further, this specific combo condition should be included in the audit.

## QA

Start a fresh session.

Trigger each explicit combo once.

Verify:

- Console line,
- toast,
- telemetry ID.

Repeat each.

Verify:

- mechanic still works,
- no duplicate System Combo toast.

Then start a new session and verify combo announcements can occur again.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
