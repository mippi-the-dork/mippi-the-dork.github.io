# Objective Catalog - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective Catalog > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the v2.78 set of 23 timed Optional Objectives, including goals, rewards, durations, eligibility, and advanced-state requirements.

> This page is the canonical design documentation for **Objective Catalog** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Objective Catalog should cover the breadth of the portfolio without becoming a checklist of every mechanic.

The current pool deliberately spans several kinds of play:

- discovery,
- exploration,
- collection,
- Doug morale,
- arcade combat,
- system combinations,
- Legendary mastery,
- Shop/loadout use,
- system toggles.

The catalog gives the Objective system enough variety to avoid repeatedly asking for the same interaction style.

## Current Pool Size

v2.78 contains:

```text
23 objectives
```

## Categories

The current categories are:

- DISCOVERY
- EXPLORATION
- COLLECTION
- MORALE
- ARCADE
- SYSTEM COMBO
- MASTERY
- LOADOUT
- SYSTEMS

These categories are used for:

- player-facing kicker text,
- telemetry frequency,
- anti-repetition weighting.

## Rewards

Rewards are intentionally small:

```text
1 to 3 Rupees
```

One-step broadly available tasks tend to award 1.

Longer, multi-step, or mechanically specific tasks award 2 or 3.

## Durations

Durations range from:

```text
6 seconds
```

to:

```text
120 seconds
```

The timer is authored around the action, not normalized to one generic duration.

## Advanced Flag

Four current objectives use `advanced:true`:

- Star Power contact damage,
- System Combo,
- one Legendary shot,
- two Legendary shots.

Under normal pacing they are reserved for Engaged/Mastery Director states.

## Catalog

| ID | Category | Goal | Reward | Time | Key eligibility |
| --- | --- | ---: | ---: | ---: | --- |
| `signal-sweep` | Discovery | 1 | 2 | 120s | 1 to 9 Rare Signals |
| `field-trip` | Exploration | 3 | 2 | 90s | at least 3 major sections unvisited |
| `inspection` | Exploration | 1 | 1 | 50s | at least 1 Rare Signal |
| `command-line` | Exploration | 1 | 1 | 50s | at least 1 Rare Signal |
| `theme-shift` | Exploration | 1 | 1 | 40s | all 10 Rare Signals |
| `pickup-catch` | Collection | 1 | 1 | 45s | Epic, motion allowed |
| `pickup-double` | Collection | 2 | 2 | 60s | Epic, motion allowed |
| `pickup-variety` | Collection | 2 kinds | 2 | 70s | Epic, 2 prior flying collections |
| `heart-signal` | Collection | 1 | 1 | 55s | Epic, under 5 Hearts |
| `rupee-hunt` | Collection | 1 | 1 | 55s | Epic |
| `bone-run` | Morale | 2 | 2 | 65s | Doug In Command |
| `doug-pet` | Morale | 3 | 1 | 45s | Doug available |
| `castle-check` | Exploration | 1 | 2 | 50s | active/pending Castle |
| `airspace-one` | Arcade | 1 | 1 | 50s | Epic, no active Boss/calm |
| `airspace` | Arcade | 2 | 2 | 75s | Epic, no active Boss/calm |
| `contact-damage` | System Combo | 1 | 3 | 6s | advanced, Star Power already active |
| `system-combo` | System Combo | 1 | 2 | 70s | advanced, Epic |
| `legendary-shot` | Mastery | 1 | 2 | 50s | advanced, Legendary |
| `legendary-double` | Mastery | 2 | 3 | 70s | advanced, Legendary |
| `field-test` | Loadout | 1 | 1 | 50s | gameplay modifier equipped, Epic |
| `loadout` | Loadout | 1 | 1 | 45s | owned gameplay item, none equipped |
| `shop-buy` | Loadout | 1 | 2 | 70s | at least one affordable available item |
| `slowmo-test` | Systems | 1 | 1 | 45s | at least 1 Rare Signal |

## Event-Driven Completion

Objectives react to actual runtime events.

Examples:

- achievement unlocked,
- first section visit,
- inspected target,
- valid Console command,
- theme changed,
- flying object collected,
- Doug pet,
- Castle checked,
- Shop equip,
- Shop purchase,
- Slowmo toggle.

This avoids polling arbitrary DOM states for most task progress.

## Unique Progress

Objectives that require variety keep a small per-objective `Set`.

Examples:

- three different section first-visits,
- two different pickup types.

The same event cannot count twice where uniqueness matters.

## Design Rules

- Catalog should span multiple play styles.
- Do not make every system into an objective.
- Eligibility should prevent impossible or nonsensical offers.
- Reward and timer should match specificity.
- Advanced interactions remain later-stage.
- Catalog can evolve without changing the Objective HUD architecture.
- IDs are canonical telemetry/DEV identifiers.

## Success Criteria

The catalog feels varied enough that Optional Objectives expose the site's breadth without reading like a linear tutorial sequence.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
