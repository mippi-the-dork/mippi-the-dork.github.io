# Feature Relationships

**Current documented state:** Mippi Portfolio v2.89

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

## Music Player Relationships

The v2.80 Music Player keeps the original True Completion unlock relationship and expands the reward itself.

```text
100% Complete
  |
  v
Music Player entitlement
  |
  +-- 12 installed MP3 tracks
  +-- Play / Pause / Previous / Next
  +-- Repeat: Off / Playlist / Track
  +-- Shuffle: Off / On
  +-- Per-track lyrics viewer
  +-- Per-track MP3 download
```

Repeat and Shuffle are playback preferences, not progression.

```text
mippi-music-repeat-v1
mippi-music-shuffle-v1
```

Lyrics are content-adjacent rather than progression-adjacent:

```text
song-XX.mp3
-> song-XX.lrc
-> optional untimed/timed lyric rendering
```

The lyrics `?` control is intentionally independent from track selection. Opening lyrics for another song does not change the selected or playing track.

The exact Shuffle bag/history, playback position, selected track, open lyrics view, and lyric highlight are runtime-only and rebuild on reload.

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


## Updated System Relationships (v2.81–v2.89)

**HUD:** Existing controls relocate into `#site-game-hud`. Progress/Games/Modes/Utilities group ownership is independent of each feature's original handlers. Timed objectives and up to three toast messages coordinate above the dock. Music remains attached to header with a sibling lyrics viewer.

**Hearts / Bird:** First five Hearts advance the meter; extra Hearts award one banked Bird life each (Shop shield still consumed before bank). Castle completion automatically collects only already-airborne friendly items, alongside its 3-Rupee and fireworks reward.

**Invasion:** Regular UFO kills fill a bounded ten-kill wave. A single queued Boss contact resolves by victory or escape/reacquisition. Every third confirmed Boss victory still leads toward Super Boss.

**Early discovery / Director:** Rare users now see Rupee and Heart pickups; the Player Model PROFESSIONAL is descriptive only. Only an **open** Mippi Bird panel blocks the Director, not its persistent closed DOM container. Genuine modal focus and hidden tabs remain relevant.

**Docs:** Public `docs` Console, About CTA and unlock-gated Modes button point to the separate public documentation experience. Icon attention exists only while Design Mode is active and the docs link remains undiscovered.

**Diagnostics:** `dev perf` and hidden `dev profile` run alongside production features but provide measurements and temporary test isolates, not new player-facing objectives. None of the v2.86–v2.89 diagnostic instrumentation is proof that the reported Windows FPS issue is fixed.


## Combat Geometry / Profiling v2.90–v2.92

`perf-lab.js` -> `combat-lab.js` -> `script.js` creates an optional laboratory exercising real combat creation/update paths through diagnostic-safe hooks. v2.91 shares DOM position reads between targeting, player shots and hostile emitters; v2.92 first uses authored animation-clock geometry for registered flying elements, then cached layout fallback; hidden geometry-off uses direct legacy reads. Synthetic targets cannot award progression. All laboratory entities are removed on stop, while organic gameplay continues. Captures document rAF/timer/DOM and combat counts, not GPU present time. See [Combat Lab](17-qa-operations/combat-performance-lab/TECHNICAL.md).


## v2.93–v2.94 Particle Renderer and Diagnostics

Normal collision/hit/reward paths invoke the existing `explodeAt()` entry point. v2.93 visual isolates can disable paint, glow or cosmetic emission independently, without changing projectile simulation or gameplay progression. v2.94 routes shared particle effects into a single Canvas2D renderer by default; the original per-particle DOM/CSS path remains a selectable/fallback implementation. Both paths must preserve Castle fireworks, Boss/UFO impacts and friendly pickup effects. `dev combat renderer` chooses the backend; `dev profile reset` resets visual isolates but not geometry/renderer selections. Benchmark exports identify renderer, geometry, visual modes and both logical/physical particle counts. See [Shared Canvas Particle Renderer](12-arcade-combat/shared-canvas-particle-renderer/TECHNICAL.md).


## v2.95–v2.97 Stability and Cursor Diagnostics

`stability-lab.js` loads before `perf-lab.js`, `particle-renderer.js`, `combat-lab.js`, and `script.js`. It observes pending timers, projectile cleanup and Canvas expiry. `dev stability soak` uses the protected production-path Combat Lab, while v2.96 focus awareness rejects incomplete visible-unfocused/hidden attempts. `MippiCursorLab` (v2.97) overrides only effective cursor visuals, with actual `cursorPowerLevel` remaining the sole Mushroom progression and Legendary acquisition bonus authority. Cursor Lab choices are independent of `dev profile reset` and never write storage. Performance results are rAF callback delivery, not GPU presents.


## v2.98 Scoped Cursor Styling

Actual `cursorPowerLevel` from Mushroom pickup is independent of the visual override and cursor CSS architecture. Scoped (default) applies `cursor-scoped-grown` without the broad `cursor-grown` descendant/`:has()` selector network, retaining theme SVG appearance, aura, glow, Trail, sparks and safe modal pointer behavior. Legacy remains available only as a diagnostic A/B path. The Legendary `55px * cursorPowerLevel` targeting bonus and actual progression are unaffected. The Cursor Lab exports architecture and original style/native settings; the `style` control has an effect only under Legacy. See [Scoped Cursor](01-experience-foundation/scoped-mushroom-cursor/TECHNICAL.md).
