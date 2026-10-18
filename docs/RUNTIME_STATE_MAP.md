# Runtime State Map

**Current documented state:** Mippi Portfolio v2.89

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
Music Repeat mode
Music Shuffle enabled
```

Music Repeat and Shuffle are v2.80 localStorage preferences. They do not change the Music Player unlock requirement.

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

### Music Transport and Lyrics

```text
selected track index
track availability cache
currentTime
playing/paused
collapsed/expanded
pending autoplay flag
Shuffle bag
Shuffle navigation history
Shuffle history position
lyrics track index
parsed lyrics data
lyrics request generation
active lyric line
```

v2.80 persists only the broad Music settings:

```text
Music Player entitlement
Repeat mode
Shuffle enabled/disabled
```

The exact listening session, random order/history, lyrics view, and current lyric highlight are rebuilt on reload.

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


## v2.81–v2.89 State Updates

- **Invasion:** live per-session `invasionWaveKills` bounded 0–10, `invasionEncounterPending`, `invasionSpawnQueued`, `invasionBossRetryKills` (normally 4). Retained Boss victories are telemetry/progression history; do not incorrectly persist the current wave across reloads.
- **Hearts:** first five Hearts are progression, extras feed the **existing** `mushroomBankLives` Mippi Bird life bank. No new bank storage key or sixth Heart.
- **Documentation:** persistent `mippi-docs-discovered-v1` records visited docs shortcut. Access via HUD additionally requires Design Mode unlocked; attention additionally requires active Design Mode and unvisited state.
- **Music:** Repeat and Shuffle settings remain persisted from v2.80, but current click order becomes `off → track → playlist → off` in v2.85. Seek time, Full/Single view preference, lyric render state and shuffle bag/history are runtime state unless separately documented as persisted.
- **Performance laboratory:** `window.MippiPerfLab`, per-capture measurements and isolate toggles are developer runtime state. `dev profile reset` resets these toggles **without clearing gameplay**. JSON export writes a downloaded file, not analytics. v2.89 timer wrappers register at startup, even when capture isn't running.
- **Early rewards:** pre-Epic Rare naturally schedules low-impact Rupee/Heart pickups; progression flags are unchanged. The descriptive PROFESSIONAL Player Model is **not** spawn or Director authority.

See [Persistence Key Registry](PERSISTENCE_KEY_REGISTRY.md) and [Performance Diagnostics](17-qa-operations/performance-diagnostics/TECHNICAL.md).

## v3.25.2 runtime authority and equipment correction

**Shop:** Current equipped gameplay modifiers are a `Set<string>` in the main script and a `string[]` in persistent JSON. Multiple simultaneously equipped items are normal. Passive entitlement is determined by **ownership**, whereas `insert-coin`, `celestial-beacon` and `arcade-bounty` effects depend on **equipment**. A purchase does not require a single active-slot swap.

**Arcade permission:** `arcadeCombatUnlocked()` is derived from completed original Rare achievements (Epic) **or** an equipped Insert Coin. This does not alter achievement counts or grant other Epic entitlements. The natural wave timer, director blockers and boss/calm states remain independent.

**Mippi Bird:** The worker owns live round position, velocity, pipe list, life sources, score and Game Over; these values are not browser-persistent or writable shared page objects. The renderer receives state snapshots and applies worker result events. The main thread retains the purchased refill bank, session high score and saved Shop ownership. The worker only exists while Bird is open and is terminated on close. Worker simulation suspends under the game's focus/manual pause conditions, without catch-up bursts. The old `flappyState` main-thread ownership documented in earlier features is superseded by v3.25.2.

**Storage denied:** The primary script's memory-backed storage adapters preserve page-lifetime state but not promised cross-reload persistence. The status must be documented separately from genuine `localStorage`/`sessionStorage` writes.

**Client-side trust:** A Web Worker isolates the game from trivial direct page-level modification but is not server authority; do not claim cryptographic protection or tamper-proof competitive results.
