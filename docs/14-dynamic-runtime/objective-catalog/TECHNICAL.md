# Objective Catalog - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective Catalog > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the v2.78 set of 23 timed Optional Objectives, including goals, rewards, durations, eligibility, and advanced-state requirements.

> This page is the canonical technical documentation for **Objective Catalog** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Canonical Constant

All 23 definitions live in:

```js
const OBJECTIVE_DEFS=[
  ...
];
```

The QA snapshot reports:

```text
poolSize: OBJECTIVE_DEFS.length
```

which is 23 in v2.78.

## Friendly Object Set

Objective-compatible friendly kinds:

```js
new Set([
  'rupee',
  'heart',
  '1up',
  'star',
  'key',
  'bone',
  'shooting_star'
]);
```

## Major Section Set

Exploration objective section IDs:

```js
[
  'games',
  'career',
  'consulting',
  'crafting',
  'tools',
  'about'
]
```

Hero is intentionally not part of `field-trip`.

## Completion Event Mapping

`objectiveHandleEvent()` currently maps:

```text
signal-sweep      achievement_unlocked
field-trip        section_first_visit
inspection        inspect_target
command-line      console_command(valid)
theme-shift       theme_changed
pickup-catch      flying_collected(friendly)
pickup-double     flying_collected(friendly)
pickup-variety    flying_collected(unique friendly kind)
heart-signal      heart_collected
rupee-hunt        flying_collected(kind=rupee)
bone-run          flying_collected(kind=bone)
doug-pet          doug_pet
castle-check      castle_checked
airspace-one      flying_collected(kind=ufo)
airspace          flying_collected(kind=ufo)
contact-damage    flying_collected(kind=ufo, method=star_power)
system-combo      system_combo
legendary-shot    flying_collected(method=legendary)
legendary-double  flying_collected(method=legendary)
field-test        flying_collected(friendly) while shopEquipped
loadout           shop_equip
shop-buy          shop_purchase
slowmo-test       slowmo
```

## Contextual Trigger

The event:

```text
star_power
```

has one special rule.

If there is currently no objective:

```js
setTimeout(
  () =>
    objectiveTryContextual(
      'contact-damage'
    ),
  80
);
```

This lets the six-second Star Power task appear immediately while the temporary power is still useful.

## Advanced Definitions

Current `advanced:true` IDs:

```text
contact-damage
system-combo
legendary-shot
legendary-double
```

## Eligibility Safety

Examples of state-aware checks:

- Hearts only when `heartCount < 5`.
- Castle only when a Castle opportunity exists.
- UFO tasks reject active Boss, Super Boss, or calm window.
- Legendary tasks require Legendary gameplay.
- Loadout task requires owned gameplay gear and no active equipped item.
- Shop-buy requires a real affordable, available, unowned item.

## DEV

Every definition ID is directly forceable:

```text
dev objective <id>
```

The command uses `objectiveDef(id)` and prints the valid ID list for an unknown value.

## QA

Maintain a catalog test matrix with:

- eligibility true case,
- eligibility false case,
- natural completion event,
- forced DEV completion,
- timeout,
- reward value,
- seeded-opportunity behavior.

Any new objective should be added to that matrix when the catalog changes.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
