# Feature Relationships

**Implementation baseline:** Mippi Portfolio v2.78

This document maps the major cross-system dependencies in the portfolio.

Feature-level behavior remains canonical in the numbered category folders. This document answers the higher-level question:

> What depends on what?

## Primary Progression Spine

The main experience spine is:

```text
Professional Portfolio
    |
    v
10 Rare Signals
    |
    v
Epic Gameplay
    |
    v
Shooting Star
    |
    v
Wish Charge + BP_WishManager
    |
    v
Is Valid Repair
    |
    v
Validated Wish
    |
    v
Legendary Gameplay
    |
    v
Normal Finale Eligibility
    |
    v
Finale
    |
    v
Postgame Reveal
    |
    v
9 Epic Postgame Achievements
    |
    v
100% Complete
    |
    v
Music Player
```

The active visual theme can be Rare, Epic, or Legendary independently of several gameplay entitlements. Theme selection is presentation. Progression state is authority.

## Normal Finale Relationship

The normal Finale is a broad-engagement gate.

It requires:

```text
10/10 Rare Signals
Legendary unlocked
validated Wish completed
Boss requirement satisfied
5 Hearts
at least 1 Shop item
at least 5 of 6 professional sections visited
```

It does **not** require:

```text
all Shop items
Super Boss
Maximum Cool
4/4 Castle run
all 6 professional sections
postgame achievements
100% completion
```

This separation is deliberate.

## True Completion Relationship

True Completion is the postgame mastery gate.

It requires all nine Epic postgame achievements:

```text
Signal Saturation
Maximum Cool
Gold Standard
Reality Validated
Full Hearts
Buy the Store
Another Castle
Grand Tour
Air Superiority
```

plus:

```text
Finale seen
postgame tier revealed
```

The result is:

```text
100% Complete
-> Music Player entitlement
```

## Discovery Relationships

### Rare Signals -> Epic

All 10 original Rare achievements unlock Epic gameplay.

The original Signal set is:

```text
Curious Mind
Second Perspective
Signal Acquired
Under Construction
Ghost in the Machine
The Whole Story
Best Boy
Unmarked
Classified
Old Habits
```

### Hint

Hint provides context-sensitive guidance.

It does not complete a Signal.

### Cheat

Cheat reveals the next Rare or Epic postgame solution.

It does not solve the Legendary capstone.

### Achievement Ledger

The Ledger is both:

- progress history,
- post-Finale reveal surface.

After postgame reveal, the Legendary capstone and nine Epic postgame entries are inserted above the original Rare tier.

## Wish Relationships

```text
Epic
  |
  v
Shooting Star
  |
  v
mippi-wish-charge-v1 = 1
  |
  v
wish command
  |
  +-- Blueprint invalid --> charge preserved
  |                         |
  |                         v
  |                     BP_WishManager
  |                         |
  |                         v
  |                     Is Valid repair
  |
  +-- Blueprint valid --> authored Wish branch
                            |
                            v
                      successful Wish
                            |
                            v
                      Legendary unlock
```

Wish charge is currency-like progression, not a one-time command unlock.

The command can remain known while celestial charge returns to zero.

## Economy Relationships

Rupees connect otherwise separate systems.

Current Rupee sources include:

```text
flying Rupee pickup
regular UFO chance reward
Boss reward
Super Boss reward
Castle reward
Optional Objectives
Mippi Bird score milestones
```

The shared wallet feeds:

```text
Shop
```

Shop then feeds back into gameplay through:

```text
Lucky Charm
Dog Whistle
Star Extender
Slowpoke
Interact Toggle
Mippi Bird Extra Life
Production Discount
Celestial Beacon
Golden Trigger
Design Mode Unlocked
```

## Shop Modifier Relationships

| Item | Primary relationships |
| --- | --- |
| Lucky Charm | Friendly pickup weighting, Hearts, Keys, Stars |
| Dog Whistle | Doug In Command, Doug Bone cadence, Coolness |
| Star Extender | Star Power duration |
| Slowpoke | Shared flying-object duration |
| Interact Toggle | Interact Mode, Super Boss interaction override |
| Mippi Bird Extra Life | Mippi Bird collision recovery |
| Production Discount | Shop price calculation |
| Celestial Beacon | Shooting Star cadence/lifetime |
| Golden Trigger | Legendary cursor targeting and projectile speed |
| Design Mode Unlocked | Design Mode entitlement and Help visibility |

Only gameplay-slot items use the single equipped gameplay slot.

Passive items are owned effects.

## Collectible Relationships

### Hearts

```text
Heart pickup
-> Heart count
-> 5/5 claim-ready HUD
-> optional Unreal Source reward claim
-> Full Hearts postgame condition
-> normal Finale Heart condition
```

The normal Finale checks 5 Hearts, not Heart reward claimed.

### Keys and Castles

```text
Key
-> active Castle
-> Castle checked
-> Castle run progress
-> 4/4 claim-ready
-> fireworks + 3 Rupees
-> persistent Another Castle history
```

### Mushrooms

```text
Mushroom
-> cursor growth cycle
-> Mushroom progress
-> 20/20
-> banked Mippi Bird life
```

Mushroom bank is persistent.

Cursor growth is runtime-only.

### Star Power

```text
Star
-> temporary Star Power
-> cursor-contact collection
-> System Combos
-> stronger Doug Bone Coolness
```

## Doug Relationships

```text
Doug petting
-> Best Boy at 5 pets
-> Doug In Command at 12 pets
-> Bones become naturally relevant
-> Coolness
-> 100%
-> Cool Mode
-> Rainbow Bones
-> stronger command pet behavior
-> Maximum Cool historical milestone
```

Offscreen Doug cameo uses the same core pet function and pet counter as the About-card Doug interaction.

## Arcade Relationships

```text
Epic
-> regular UFOs
-> 10 kills
-> Boss contact
-> Boss victory
-> invasion stage
-> every third Boss-victory slot
-> Super Boss
```

Boss victory contributes to normal Finale.

Super Boss victory contributes to:

```text
normal Finale Boss satisfaction
Air Superiority postgame achievement
8 Rupee reward
```

## Combat Relationships

### Standard Hostile Projectiles

Used by:

```text
regular UFO
normal Boss
```

They target the cursor and produce cosmetic hit feedback.

### Super Boss Projectiles

Use a dedicated full-screen implementation with:

```text
bullets
Add bullets
homing rockets
Mega Laser
cursor knockback
```

### Legendary Cursor Combat

Outside the Super Boss, Legendary gameplay can fire cursor projectiles toward eligible flying targets.

### Super Boss Player Fire

Inside the Super Boss, left-click fire is always available, even without Legendary progression.

## System Combo Relationships

Current explicit one-time session combos:

```text
Star Power + UFO
Star Power + Boss
Slowmo + UFO
Mushroom + Legendary
Star Power + Doug
```

System Combos are recognition, not achievements.

The `system-combo` Optional Objective can listen for the same meaningful event.

## Optional Objective Relationships

Optional Objectives consume the shared telemetry event stream.

They do not implement a separate parallel event system.

Examples:

```text
achievement_unlocked -> Signal objective
section_first_visit -> Field Trip
inspect_target -> Inspection
console_command -> Command Line
flying_collected -> pickup / UFO / Legendary objectives
doug_pet -> Doug objective
castle_checked -> Castle objective
shop_purchase -> Shop Buy
shop_equip -> Loadout
slowmo -> Slowmo Test
system_combo -> System Combo
```

Timed objectives can seed a real opportunity, but the player still has to complete the real interaction.

## Adaptive Director Relationships

The Adaptive Director consumes local session telemetry and adjusts pacing.

It can influence:

```text
pickup delay
Shooting Star delay
UFO delay
Doug Bone delay
flight lifetime
hostile cadence
hostile projectile duration
Legendary target generosity
```

It must not change:

```text
achievement solutions
Rupee values
Shop prices
Wish validity
Finale validity
postgame requirements
professional content
```

Easy Mode overrides Director pacing rather than causing the Director to counteract assistance.

## Attention Budget Relationships

The attention budget coordinates new ambient activity around:

```text
Dev Console
Shop
Blueprint
Compile
Wish overlays
HAL overlay
Azure gallery
Mippi Bird
Finale
Session Debrief
Achievement Ledger
achievement toast
Super Boss
active form input
hidden browser tab
```

Natural ambient opportunities can be deferred.

An already active timed Optional Objective remains visible.

## Player Model Relationships

Player Model reads behavior from shared local telemetry.

It appears in:

```text
stats
Finale identity
Session Report
QA snapshot
```

It does not directly control Adaptive Director state.

The Director has its own purpose-built pacing classifier.

This prevents a comedic archetype label from becoming hidden difficulty.

## Interact Mode Relationships

When normal interaction is OFF:

```text
professional links/controls suppressed
game-layer targets remain active
```

Super Boss temporarily borrows the same suppression model.

It restores the player's prior state afterward.

## Theme Relationships

Theme cycling controls presentation.

Current theme modes:

```text
Rare
Epic
Legendary
```

Rarity-isolated components preserve semantic identity where needed.

Examples:

```text
Shop rarity cards
Achievement rarity entries
HAL red
hostile projectile white/cyan
money gold
Blueprint semantic node colors
```

Gameplay progression should not be inferred solely from body theme classes.

## Three.js Relationships

Three.js supports:

```text
Hero 3D
ambient 3D
About 3D
Nanite visualization registration
Particle Boost ambient response
```

It does not own core professional navigation.

If Three.js fails:

- HTML portfolio remains,
- standard navigation remains,
- Perspective Visualizer remains because it is dependency-free Canvas 2D,
- runtime recovery continues.

## Reset Relationship

Public `reset` clears all Mippi-prefixed localStorage and sessionStorage state, then performs:

```text
location.reload()
```

This resets:

- progression,
- themes,
- Shop,
- Wish,
- telemetry,
- postgame,
- Music,
- mode preferences,
- session onboarding.

Runtime-only state disappears as part of the real document reload.

## Documentation Authority

When resolving a conflict:

1. Exact identifiers: root reference catalogs.
2. Feature behavior: feature `DESIGN.md`.
3. Implementation details: feature `TECHNICAL.md`.
4. Release behavior: `17-qa-runtime-operations`.
5. QA execution: `QA/EXTENSIVE_QA_TEST_PLAN.md`.
