# Objective Catalog

**Implementation baseline:** Mippi Portfolio v2.78

Canonical v2.78 pool:

```text
23 timed Optional Objectives
```

Only one can be active at a time.

## Catalog

| ID | Category | Objective | Goal | Reward | Time | Eligibility summary | Advanced |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| `signal-sweep` | DISCOVERY | Find one more hidden Signal. | 1 | 2 | 120s | 1 to 9 Rare Signals | No |
| `field-trip` | EXPLORATION | Visit three unexplored sections. | 3 | 2 | 90s | At least 3 of 6 professional sections unvisited | No |
| `inspection` | EXPLORATION | Inspect one annotated element. | 1 | 1 | 50s | At least 1 Rare Signal | No |
| `command-line` | EXPLORATION | Run one valid Dev Console command. | 1 | 1 | 50s | At least 1 Rare Signal | No |
| `theme-shift` | EXPLORATION | Change the rarity theme once. | 1 | 1 | 40s | 10/10 Rare Signals | No |
| `pickup-catch` | COLLECTION | Catch any flying pickup. | 1 | 1 | 45s | Epic, motion allowed | No |
| `pickup-double` | COLLECTION | Catch two flying pickups. | 2 | 2 | 60s | Epic, motion allowed | No |
| `pickup-variety` | COLLECTION | Collect two different pickup types. | 2 | 2 | 70s | Epic, motion allowed, at least 2 prior flying collections | No |
| `heart-signal` | COLLECTION | Collect one Heart. | 1 | 1 | 55s | Epic, under 5 Hearts, motion allowed | No |
| `rupee-hunt` | COLLECTION | Collect one flying Rupee. | 1 | 1 | 55s | Epic, motion allowed | No |
| `bone-run` | MORALE | Collect two Doug Bones. | 2 | 2 | 65s | Doug In Command, motion allowed | No |
| `doug-pet` | MORALE | Pet Doug three times. | 3 | 1 | 45s | Doug card available | No |
| `castle-check` | EXPLORATION | Check the active Castle. | 1 | 2 | 50s | Castle quest active or Castle present | No |
| `airspace-one` | ARCADE | Destroy one regular UFO. | 1 | 1 | 50s | Epic, motion allowed, no Boss/Super Boss/calm | No |
| `airspace` | ARCADE | Destroy two regular UFOs. | 2 | 2 | 75s | Epic, motion allowed, no Boss/Super Boss/calm | No |
| `contact-damage` | SYSTEM COMBO | Destroy a UFO with Star Power contact. | 1 | 3 | 6s | Epic, Star Power active, legal UFO state | Yes |
| `system-combo` | SYSTEM COMBO | Trigger any System Combo. | 1 | 2 | 70s | Epic | Yes |
| `legendary-shot` | MASTERY | Hit a flying target with a Legendary shot. | 1 | 2 | 50s | Legendary, motion allowed | Yes |
| `legendary-double` | MASTERY | Land two Legendary shots. | 2 | 3 | 70s | Legendary, motion allowed | Yes |
| `field-test` | LOADOUT | Collect a pickup with a Shop modifier equipped. | 1 | 1 | 50s | Gameplay modifier equipped, Epic, motion allowed | No |
| `loadout` | LOADOUT | Equip one owned gameplay upgrade. | 1 | 1 | 45s | Owned gameplay item, none equipped | No |
| `shop-buy` | LOADOUT | Buy one Shop item. | 1 | 2 | 70s | At least one affordable available item | No |
| `slowmo-test` | SYSTEMS | Toggle Slowmo once. | 1 | 1 | 45s | At least 1 Rare Signal | No |

## Advanced Selection Rule

Under normal pacing, `advanced:true` objectives are naturally offered only when the Adaptive Director is:

```text
engaged
mastery
```

Easy Mode can bypass that natural selection restriction.

Current advanced IDs:

```text
contact-damage
system-combo
legendary-shot
legendary-double
```

## Completion Event Map

| Objective | Primary meaningful event |
| --- | --- |
| `signal-sweep` | `achievement_unlocked` |
| `field-trip` | `section_first_visit` |
| `inspection` | `inspect_target` |
| `command-line` | valid `console_command` |
| `theme-shift` | `theme_changed` |
| `pickup-catch` | `flying_collected` friendly kind |
| `pickup-double` | `flying_collected` friendly kind |
| `pickup-variety` | unique friendly `flying_collected` kinds |
| `heart-signal` | `heart_collected` |
| `rupee-hunt` | Rupee `flying_collected` |
| `bone-run` | Bone `flying_collected` |
| `doug-pet` | `doug_pet` |
| `castle-check` | `castle_checked` |
| `airspace-one` | UFO `flying_collected` |
| `airspace` | UFO `flying_collected` |
| `contact-damage` | UFO `flying_collected` with `star_power` method |
| `system-combo` | `system_combo` |
| `legendary-shot` | `flying_collected` with `legendary` method |
| `legendary-double` | `flying_collected` with `legendary` method |
| `field-test` | friendly `flying_collected` while gameplay modifier equipped |
| `loadout` | `shop_equip` |
| `shop-buy` | `shop_purchase` |
| `slowmo-test` | `slowmo` |

## Timer Behavior

Every objective owns its authored duration.

The HUD displays:

```text
progress / goal // M:SS
```

The bar represents **time remaining**, not completion progress.

Resolution:

### Complete

- timers stop,
- Rupees awarded,
- completion ID stored for current session,
- card remains approximately 3.2 seconds.

### Failed

- no Rupees,
- failed ID recorded,
- objective can return later,
- card remains approximately 2.7 seconds.

### Dismissed

- no penalty,
- ID removed from normal current-session rotation,
- minimum next-objective cooldown.

## Opportunity Seeding

Timed objectives that depend on ambient actors can seed a real legal opportunity.

Current seed families:

```text
friendly pickup
Heart
Rupee
Doug Bone
regular UFO
Legendary-shot target
Castle
```

Seeding never auto-completes the objective.

## Contact Damage Special Case

When Star Power begins and there is no active objective, the runtime can attempt:

```text
contact-damage
```

after about:

```text
80 ms
```

The UFO seed for that objective begins around:

```text
220 ms
```

because the entire challenge lasts only 6 seconds.

## Selection Diversity

Natural selection tries to avoid:

- repeating the most recently failed objective immediately,
- repeating the same category when alternatives exist.

Categories with fewer prior offers receive additional weighting entries.

## Session Persistence

Objective telemetry lives inside:

```text
mippi-session-telemetry-v1
```

Important branches:

```text
offeredIds
completedIds
dismissedIds
failedIds
categoryCounts
```

## DEV

```text
dev objective random
dev objective complete
dev objective fail
dev objective <objective-id>
```

Every ID in the catalog above is directly forceable.

## Maintenance Rule

Any new objective requires updates to:

- `OBJECTIVE_DEFS`,
- event handling,
- seeding if necessary,
- this catalog,
- `14-dynamic-runtime-systems`,
- QA plan.
