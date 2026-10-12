# Telemetry Event Catalog

**Implementation baseline:** Mippi Portfolio v2.78

The portfolio telemetry foundation is browser-local.

Canonical session storage:

```text
mippi-session-telemetry-v1
```

No analytics package receives this data.

The event timeline stores only meaningful event records and is capped at:

```text
120
```

entries.

## Meaningful Event Types

v2.78 emits the following meaningful event names.

| Event | Domain | Meaning |
| --- | --- | --- |
| `achievement_unlocked` | Achievements / Progression | A Rare achievement/Signal was newly unlocked. |
| `azure_gallery_opened` | Portfolio / Navigation | Azure Altar gallery was opened. |
| `blueprint_opened` | Wish / Blueprint | BP_WishManager repair UI was opened. |
| `blueprint_validated` | Wish / Blueprint | Is Valid repair was successfully inserted/validated. |
| `boss_defeated` | Arcade | Normal Boss UFO was defeated. |
| `boss_escaped` | Arcade | Normal Boss UFO left the screen undefeated. |
| `boss_spawned` | Arcade | Normal Boss UFO encounter spawned. |
| `castle_checked` | Economy / Collectibles | Active Castle was found and clicked. |
| `castle_reward_claimed` | Economy / Collectibles | 4/4 Castle reward was explicitly claimed. |
| `castle_run_complete` | Economy / Collectibles | Castle run reached 4/4. |
| `cheat_requested` | Achievements / Progression | Player requested the next achievement solution through Cheat. |
| `console_command` | Console | A Console command was submitted and classified. |
| `console_opened` | Console | Dev Console was opened. |
| `design_mode` | Modes / Systems | Design Mode changed state. |
| `design_note` | Modes / Systems | Player hovered a Design Mode annotated target. |
| `doug_cool_mode` | Doug | Doug entered/refreshed Cool Mode. |
| `doug_interaction` | Doug | A Doug interaction was recorded. |
| `doug_pet` | Doug | Doug was petted through the shared pet path. |
| `doug_spawn_assist` | Doug | Doug In Command attempted/authorized a flying opportunity. |
| `easy_mode` | Modes / Systems | Easy Mode changed state. |
| `epic_airspace_welcome` | Portfolio / Navigation | Epic airspace onboarding was shown. |
| `epic_unlocked` | Achievements / Progression | All 10 Rare Signals completed and Epic unlocked. |
| `external_link` | Portfolio / Navigation | Player followed a categorized external/professional link. |
| `finale_continue` | Finale / Postgame | Player chose Continue Exploring directly from Finale. |
| `finale_ready` | Finale / Postgame | Normal Finale became eligible and armed. |
| `finale_report` | Finale / Postgame | Player chose View Session Report from Finale. |
| `finale_started` | Finale / Postgame | Finale sequence began. |
| `flappy_extra_life_used` | Mippi Bird | Mippi Bird collision consumed a Shop or Mushroom life. |
| `flappy_game_over` | Mippi Bird | A Mippi Bird run ended. |
| `flappy_opened` | Mippi Bird | Mippi Bird panel opened. |
| `flappy_rupee_milestone` | Mippi Bird | Mippi Bird score reached a one-time session Rupee milestone. |
| `flappy_share` | Mippi Bird | Mippi Bird Share menu was invoked. |
| `flappy_started` | Mippi Bird | A Mippi Bird run started. |
| `flying_collected` | Portfolio / Navigation | A flying/arcade target was collected with kind and method detail. |
| `godmode_used` | Achievements / Progression | Hidden God Mode path was used. |
| `heart_collected` | Economy / Collectibles | Heart count increased. |
| `heart_reward_claimed` | Economy / Collectibles | Full Hearts reward was claimed. |
| `heart_reward_unlocked` | Economy / Collectibles | Full Hearts reward became claim-ready. |
| `hero_signal` | Portfolio / Navigation | Hero 3D signal interaction occurred. |
| `hint_requested` | Achievements / Progression | Discovery Hint was requested. |
| `inspect_mode` | Modes / Systems | Inspect Mode changed state. |
| `inspect_target` | Modes / Systems | Player inspected an annotated target. |
| `interact_mode` | Modes / Systems | Interact Mode changed state. |
| `legendary_unlocked` | Achievements / Progression | Legendary gameplay entitlement was unlocked. |
| `mushroom_extra_life_earned` | Economy / Collectibles | 20-Mushroom cycle awarded one banked Bird life. |
| `objective_canceled` | Objectives | An objective was canceled by a non-player lifecycle reason such as DEV replacement. |
| `objective_completed` | Objectives | Timed Optional Objective completed. |
| `objective_dismissed` | Objectives | Player dismissed an active Optional Objective. |
| `objective_failed` | Objectives | Timed Optional Objective expired without success. |
| `objective_offered` | Objectives | Optional Objective became active. |
| `perspective_mode` | Portfolio / Navigation | Heavy Water Perspective Visualizer mode was selected. |
| `postgame_achievement_tier_revealed` | Finale / Postgame | Hidden postgame achievement tier was revealed. |
| `postgame_achievement_unlocked` | Finale / Postgame | A postgame Epic or Legendary achievement unlocked. |
| `rupee_collected` | Economy / Collectibles | A flying Rupee pickup was collected. |
| `rupee_reward` | Economy / Collectibles | Rupees were granted from a non-pickup reward source. |
| `section_first_visit` | Portfolio / Navigation | A tracked section received its first session visit. |
| `session_debrief_continue` | Finale / Postgame | Player used Continue Exploring from Session Report. |
| `session_debrief_opened` | Finale / Postgame | Session Report opened. |
| `session_debrief_share` | Finale / Postgame | Session Report sharing/copy flow was used. |
| `shop_equip` | Portfolio / Navigation | Gameplay Shop item was equipped. |
| `shop_open` | Portfolio / Navigation | Rupee Shop opened. |
| `shop_purchase` | Portfolio / Navigation | Shop item was purchased. |
| `shop_unequip` | Portfolio / Navigation | Gameplay Shop item was unequipped. |
| `slowmo` | Modes / Systems | Slowmo changed state. |
| `star_power` | Modes / Systems | Star Power activated. |
| `super_boss_add_destroyed` | Arcade | One Super Boss Add was destroyed. |
| `super_boss_cursor_hit` | Arcade | Super Boss attack hit the gameplay cursor. |
| `super_boss_defeated` | Arcade | Super Boss core reached zero HP. |
| `super_boss_exit` | Arcade | Super Boss encounter ended without victory through exit/escape/restart path. |
| `super_boss_hit` | Arcade | Super Boss core took a player hit. |
| `super_boss_spawned` | Arcade | Super Boss encounter started. |
| `system_combo` | Modes / Systems | A first-time session System Combo was recognized. |
| `theme_changed` | Modes / Systems | Visual rarity theme changed. |
| `tool_filter` | Portfolio / Navigation | Unreal Tools filter changed. |
| `ufo_projectile_hit` | Arcade | Standard hostile projectile hit the live cursor. |
| `unreal_source_reward_accepted` | Portfolio / Navigation | Player accepted the Full Hearts Unreal Source link. |
| `unreal_source_reward_declined` | Portfolio / Navigation | Player declined the Full Hearts Unreal Source link. |
| `wish_attempt` | Wish / Blueprint | Player submitted Wish text while a charge was active. |
| `wish_branch` | Wish / Blueprint | An authored Wish branch was selected. |
| `wish_charge_spent` | Wish / Blueprint | A celestial Wish charge was consumed. |
| `wish_command_unlocked` | Wish / Blueprint | Wish command was discovered by first Shooting Star charge. |
| `wish_failed` | Wish / Blueprint | Wish failed due to invalid Blueprint reference. |

Total canonical event names documented here:

```text
82
```

## Event Bus Relationship

`telemetryMeaningful(type, detail)` performs three jobs:

1. updates `session.lastMeaningfulAt`,
2. appends the event to the bounded local timeline,
3. forwards the event to the active Optional Objective event sink.

This is the central cross-system event bridge.

## Initial Telemetry Shape

The v2.78 session object contains these top-level branches:

```text
version
session
sections
interaction
achievements
console
modes
flying
arcade
economy
wish
flappy
combos
portfolio
assistance
director
objectives
playerModel
debrief
timeline
```

## Session Branch

Important fields:

```text
id
startedAt
lastActiveAt
lastMeaningfulAt
pageLoads
activeMs
maxScrollDepth
visibilityChanges
```

## Sections

Tracked section entries are created dynamically.

Current tracked IDs include:

```text
hero
games
career
consulting
crafting
tools
about
```

A section entry can contain:

```text
visits
firstSeenAt
dwellMs
```

## Interaction

Initial counters:

```text
clicks
navigationClicks
externalClicks
dougClicks
```

## Achievements

Initial fields:

```text
unlocks
keys[]
hints
introHints
cheats
godmodeUses
sources{}
```

## Console

Initial fields:

```text
opens
closes
commands
invalid
unique[]
commandCounts{}
hiddenCounts{}
```

The telemetry intentionally does not store arbitrary invalid command text.

## Modes

Initial counters include:

```text
inspectToggles
designToggles
themeChanges
themeModes[]
slowmoToggles
easyModeToggles
particleToggles
lumenToggles
naniteToggles
vibeToggles
```

## Flying

State:

```text
spawned{}
forced{}
collected{}
missed{}
methods{}
```

Kinds are added dynamically.

## Arcade

Initial counters include:

```text
ufoSpawned
ufoDestroyed
ufoEscaped
bossSpawned
bossHits
bossDefeated
bossEscaped
superBossSpawned
superBossHits
superBossDefeated
superBossEscaped
superBossAddsDestroyed
superBossRockets
superBossLasers
superBossCursorHits
hostileShots
playerShots
playerHits
```

## Economy

Initial counters include:

```text
rupeesEarned
rupeesSpent
shopOpens
shopPurchases
shopEquips
shopUnequips
shopDeflections
heartsCollected
keysCollected
castlesChecked
mushroomsCollected
mushroomLivesEarned
mushroomLivesSpent
starsCollected
bonesCollected
coolActivations
```

Additional economy counters can be added dynamically by system helpers.

## Wish

Initial fields:

```text
shootingStarsSpawned
shootingStarsCollected
commandUnlocks
attempts
failed
successful
blueprintOpens
validInserted
branches{}
```

Wish text itself is not stored in telemetry.

## Mippi Bird

Initial fields:

```text
opens
gamesStarted
deaths
highScore
shares
rupeesEarned
rupeeMilestones[]
shopLivesUsed
mushroomLivesUsed
hitsAbsorbed
```

## Combos

Initial fields:

```text
announced[]
starPowerUfoKills
starPowerBossHits
slowmoHostileShots
starPowerDoug
legendaryMushroom
```

## Portfolio

Initial fields:

```text
secondPersonToggles
heroSignalClicks
galleryOpens
galleryImagesViewed[]
filters{}
resumeClicks{}
externalDestinations{}
```

## Assistance

Initial fields:

```text
hintUses
cheatUses
easyModeUses
godmodeUses
hiddenCommands{}
```

Assistance is descriptive.

It does not invalidate completion.

## Director

Initial fields:

```text
state
evaluations
transitions
stateChanges[]
stateMs{}
attentionBlocks
droughtAssists
lastReason
```

## Objectives

Initial fields:

```text
offered
completed
failed
dismissed
canceled
rupeesEarned
offeredIds[]
completedIds[]
dismissedIds[]
failedIds[]
categoryCounts{}
```

## Player Model

Initial fields:

```text
evaluations
label
primary
secondary
confidence
evidence
lastUpdatedAt
history[]
```

## Debrief

Initial fields:

```text
opens
shares
copies
```

## Privacy Rules

The telemetry foundation intentionally avoids storing:

- Wish text,
- form contents,
- personal identifiers,
- full arbitrary external URL history,
- raw invalid Console text.

External link telemetry categorizes destination type rather than preserving a private browsing log.

## QA Snapshot

Real browser DevTools:

```js
window.__MIPPI_TELEMETRY__.snapshot()
```

returns a deep copy of current session telemetry.

## Maintenance Rule

When adding a new meaningful event:

1. add the event producer,
2. add it to this catalog,
3. determine whether Optional Objectives consume it,
4. determine whether Player Model recency should consume it,
5. add QA coverage if it affects progression or adaptive pacing.
