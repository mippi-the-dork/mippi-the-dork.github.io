# Runtime State Map

**Implementation baseline:** Mippi Portfolio v2.78

This document groups important portfolio state by lifetime and authority.

The same feature can have more than one state class.

Example:

```text
Doug Coolness current value
  session-persistent

Maximum Cool historical milestone
  long-term persistent

Cool Mode active timeout
  runtime-only
```

Understanding that split is essential to avoiding persistence bugs.

## Long-Term Persistent State

Stored in localStorage.

Major groups:

### Discovery / Theme

```text
Rare achievement keys
selected theme mode
legacy theme compatibility flags
Legendary gameplay entitlement
```

### Economy / Shop

```text
Rupee wallet
Rupee discovered state
Shop owned items
equipped gameplay item
Design Mode entitlement
```

### Collectibles

```text
Heart count
Heart reward claimed
Mushroom progress
banked Mippi Bird lives
Castle run progress
```

### Wish / Finale

```text
Wish command discovered
Wish charge
Finale Wish satisfied
Finale Boss satisfied
Finale seen
```

### Postgame

```text
persistent section history
Maximum Cool history
Castle-complete history
Super Boss history
postgame reveal
postgame achievement keys
Music Player entitlement
```

### Preferences

```text
Inspect Mode preference
Design Mode preference
```

Exact keys are in [Persistence Key Registry](PERSISTENCE_KEY_REGISTRY.md).

## Session-Persistent State

Stored in sessionStorage.

### Full Telemetry

```text
mippi-session-telemetry-v1
```

Contains:

- section visits/dwell,
- interactions,
- achievements,
- Console usage,
- modes,
- flying objects,
- arcade,
- economy,
- Wish,
- Mippi Bird,
- combos,
- portfolio behavior,
- assistance,
- Director,
- Objectives,
- Player Model,
- Debrief,
- timeline.

### Doug Coolness

```text
mippi-doug-cool-progress-v1
```

### Onboarding

```text
mippi-achievement-intro-hint-v1
mippi-epic-airspace-welcome-v1
```

### Blueprint Repair

```text
mippiWishHasIsValid
```

## Runtime-Only State

Lost on reload.

Important examples:

### Console

```text
open/closed DOM state
command history
history cursor
pending Wish input
pending reset confirmation
```

### Modes

```text
Interact Mode manual ON/OFF preference
Slowmo
Easy Mode
Particle Boost
Vibe AI
Lumen visualization
Nanite visualization
stat overlay mode
```

Inspect and Design preferences persist separately.

### Flying Runtime

```text
active pickups
active Shooting Stars
active Doug Bones
active regular UFOs
active Boss
flight timers
projectile nodes
```

### Arcade

```text
current regular-UFO kill sub-cycle
next Boss threshold
current Boss HP
current Super Boss state
Adds
projectiles
laser state
calm timeout
```

Boss victory history persists through telemetry/finale/postgame keys as appropriate.

### Star Power

```text
active class
duration timer
hover collection interval
Boss contact lockouts
```

### Mippi Bird

```text
panel open state
current run state
current score
current Shop shield availability
invulnerability timer
animation frame
current selected share menu state
```

Mushroom life bank and Shop ownership persist separately.

### Finale

```text
finaleReady
finaleRunning
active overlay stage
current sequence timeouts
```

`finaleSeen` persists.

### Music Transport

```text
selected track index
track availability cache
currentTime
playing/paused
collapsed/expanded
```

Only Music entitlement persists.

### Three.js

```text
import promise
loaded module source
live scene objects
renderers
camera controls
recovery timer
Nanite scene controllers
```

Three.js scene state is rebuilt on document startup.

## Derived State

Some state should never be stored separately because it can be reconstructed from authoritative values.

### Heart Claim Ready

Derived from:

```text
heartCount >= 5
and
heartRewardShown == false
```

### Castle Claim Ready

Derived from:

```text
castleRunProgress >= 4
```

### Shop Affordability Attention

Derived from:

```text
Shop discovery
wallet
current Shop availability
ownership
discount rules
Shop open/closed
```

### Finale Eligibility

Derived from seven current progression gates.

### True Completion

Derived from:

```text
postgame revealed
Finale seen
all 9 Epic postgame achievement keys
```

### Interact Effective Suppression

Derived from:

```text
player Interact Mode
OR
Super Boss temporary override
```

### Available Theme Modes

Derived from:

```text
Rare always
Epic after 10/10 Rare
Legendary after Legendary entitlement
```

## Historical State Pattern

Several systems intentionally persist historical completion separately from their repeatable current meter.

### Doug

```text
current:
Doug Coolness

history:
Maximum Cool reached
```

### Castle

```text
current:
0 to 4 run progress

history:
4/4 completed at least once
```

### Super Boss

```text
current:
encounter active/inactive

history:
Super Boss defeated at least once
```

This pattern is preferred when postgame achievements need to recognize a past transient milestone.

## Progression vs Presentation

Do not infer gameplay progression exclusively from CSS theme classes.

### Progression authorities

```text
unlockedAchievements
legendaryUnlocked
Shop ownership
Wish/Finale flags
postgame history
```

### Presentation authorities

```text
theme-complete
theme-legendary
theme mode selection
```

Some legacy feature code still has individual visual-class checks.

Those should be audited when tightening theme/gameplay separation.

## Reload Behavior

### Normal Reload

Preserves:

```text
localStorage
sessionStorage in same browser session
```

Rebuilds all runtime-only state.

### New Browser Session

Preserves:

```text
localStorage
```

Resets:

```text
sessionStorage
runtime state
```

### Public Full Reset

Clears both Mippi localStorage and sessionStorage keys, then performs a real document reload.

## Startup State Order

Any state that can be read through the initial HUD call graph must be initialized before the initial HUD refresh.

This is a runtime ordering constraint, not merely a style preference.

Returning saved states often activate more startup branches than a fresh state.

## State Authority Rule

When multiple state representations exist:

1. persistent authoritative value,
2. runtime variable loaded from it,
3. derived DOM class or visual state.

Do not make a CSS class the primary save authority.

## QA Matrix

For major stateful systems, test:

```text
fresh
active
complete
reload
new browser session
full reset
```

For transient-plus-historical systems, also test:

```text
complete milestone
allow transient state to end/reset
reveal postgame later
verify historical recognition
```
