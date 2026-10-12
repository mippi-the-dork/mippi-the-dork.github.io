# Recent Behavior Window - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Recent Behavior Window > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds a four-minute recency-weighted layer to Player Model scoring so later behavior can meaningfully change the current archetype.

> This page is the canonical technical documentation for **Recent Behavior Window** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Function

```js
recentPlayerModelMomentum(
  windowMs=
    4*60*1000
)
```

uses:

```text
240,000 ms
```

by default.

## Event Source

The function iterates:

```text
sessionTelemetry.timeline
```

which is itself bounded to the 120 most recent meaningful events.

## Age Filter

Events are ignored when:

```text
age < 0
age > windowMs
```

## Weight Curve

For a valid event:

```js
const w =
  .35 +
  .65*
  (
    1-
    age/windowMs
  );
```

Therefore:

### Brand-new event

```text
weight 1.00
```

### At four-minute boundary

Approximately:

```text
weight .35
```

before the event is excluded after crossing the window.

## Momentum Buckets

The helper maintains:

```text
explorer
completionist
tinkerer
arcade
chaos
professional
correct
speedrunner
```

## Example Event Mapping

```text
section_first_visit
  Explorer +1.2*w
  Professional +1.1*w

external_link
  Professional +1.8*w

hero_signal / inspect_target / castle_checked
  Explorer +1.8*w

achievement_unlocked / objective_completed / heart_collected
  Completionist +1.8*w

shop_purchase
  Completionist +1.0*w
  Tinkerer +1.0*w

console_opened / inspect_mode / design_mode / blueprint_opened /
blueprint_validated / theme_changed / tool_filter
  Tinkerer +1.5*w

flying_collected ufo/boss/super_boss
  Arcade +1.8*w

boss_defeated / super_boss_defeated / flappy_started / flappy_game_over
  Arcade +2.0*w

doug_interaction / doug_pet / doug_cool_mode
  Correct +1.8*w

godmode_used / easy_mode
  Speedrunner +2.0*w
  Chaos +.9*w

cheat_requested
  Speedrunner +2.4*w

system_combo
  Tinkerer +1.0*w
  Chaos +.6*w
```

## Final Score Multipliers

Recent momentum is then amplified again inside cumulative archetype scoring.

Examples:

```text
Explorer       * 2.15
Completionist  * 2.00
Tinkerer       * 2.25
Arcade         * 2.25
Chaos          * 2.25
Professional   * 1.85
Correct        * 2.35
Speedrunner    * 2.20
```

This makes recent behavior strong enough to move the classification.

## Evaluation

Recorded Player Model recomputation occurs every:

```text
15 seconds
```

so recency changes become visible without requiring a page reload.

## QA

- Build a strong Professional profile.
- Spend four minutes using only arcade systems.
- Watch Player Model score transition.
- Repeat from Arcade toward Tinkerer.
- Inspect `recentMomentum` from the QA snapshot.
- Wait for old events to age out and confirm their recency contribution disappears.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
