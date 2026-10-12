# Persistence Key Registry

**Implementation baseline:** Mippi Portfolio v2.80

This is the authoritative v2.80 registry for Mippi-owned browser persistence identifiers.

Use exact spelling and case.

## Persistence Classes

### localStorage

Survives reloads and normal browser restarts for the same site origin.

Used for durable progression, unlocks, economy, and user preferences.

### sessionStorage

Survives reloads in the same browser tab/session but naturally resets with a new browser session.

Used for session telemetry, temporary onboarding, and short-lived repaired/runtime state.

### Runtime Only

Lives only in JavaScript memory or DOM classes.

Lost on document reload.

Runtime-only state is documented in [Runtime State Map](RUNTIME_STATE_MAP.md).

## localStorage Registry

| Key | Purpose | Value shape | Notes |
| --- | --- | --- | --- |
| `mippi-achievements-v2` | Rare achievement/Signal keys | JSON array | Primary 10-Signal persistence. |
| `mippi-theme-mode-v1` | Selected visual theme mode | `rare` / `epic` / `legendary` | Current canonical theme selector. |
| `mippi-completion-theme` | Legacy Epic theme flag | `0` / `1` | Compatibility key written alongside current theme mode. |
| `mippi-legendary-theme` | Legacy Legendary theme flag | `0` / `1` | Compatibility key written alongside current theme mode. |
| `mippi-legendary-unlocked` | Legendary gameplay entitlement | `1` when unlocked | Progression authority, independent of selected theme. |
| `mippi-heart-pickups-v1` | Heart count | Integer 0 to 5 | Collectible completion. |
| `mippi-heart-reward-v1` | Unreal Source Heart reward claimed | `1` when claimed | Separate from Heart count. |
| `mippi-rupee-wallet-v1` | Current Rupee wallet | Nonnegative integer | Persistent economy balance. |
| `mippi-rupee-discovered-v1` | Rupee/Shop discovery state | `1` when discovered | Keeps wallet/Shop discovery visible after spending to zero. |
| `mippi-shop-state-v1` | Shop ownership/equipment | JSON `{owned:[], equipped}` | Canonical Shop inventory state. |
| `mippi-inspect-mode` | Inspect Mode preference | `0` / `1` | Restored on reload. |
| `mippi-design-mode` | Design Mode preference | `0` / `1` | Restored only when entitlement is valid. |
| `mippi-design-mode-unlocked-v1` | Design Mode entitlement | `1` when unlocked | Shop capstone entitlement. |
| `mippi-finale-seen-v1` | Finale viewed | `1` when Finale starts | Used by True Completion. |
| `mippi-finale-wish-v1` | Validated Wish Finale condition | `1` when successful | Normal Finale requirement. |
| `mippi-finale-boss-v1` | Boss Finale condition | `1` after normal or Super Boss victory | Normal Finale requirement. |
| `mippi-wish-charge-v1` | Current Shooting Star wish charge | Integer 0 or 1 | One charge powers one Wish attempt. |
| `mippiWishUnlocked` | Wish command discovered | `1` after first Shooting Star charge | Legacy-style key name retained in v2.80. |
| `mippi-mushroom-progress-v1` | Mushrooms toward next Bird life | Integer 0 to 19 | Persistent 20-Mushroom cycle. |
| `mippi-bird-mushroom-lives-v1` | Banked Mippi Bird Mushroom lives | Nonnegative integer | Persistent consumable life bank. |
| `mippi-castle-run-progress-v1` | Current Castle run progress | Integer 0 to 4 | 4 is claim-ready. |
| `mippi-postgame-sections-v1` | Persistent Grand Tour section history | JSON array of section IDs | Separate from current-session Finale section count. |
| `mippi-postgame-cool-maxed-v1` | Maximum Cool historical milestone | `1` when reached | Survives Coolness drain. |
| `mippi-postgame-castle-complete-v1` | Four-Castle historical milestone | `1` when reached | Survives claim/reset of Castle meter. |
| `mippi-postgame-superboss-v1` | Super Boss historical milestone | `1` after victory | Air Superiority condition. |
| `mippi-postgame-achievements-revealed-v1` | Postgame tier revealed | `1` after delayed reveal | Prevents repeat reveal sequence. |
| `mippi-postgame-achievements-v1` | Unlocked postgame achievement keys | JSON array | Nine Epic plus Legendary capstone history. |
| `mippi-music-player-unlocked-v1` | Music Player entitlement | `1` when unlocked | Persists until full reset. |
| `mippi-music-repeat-v1` | Music repeat preference | `off` / `playlist` / `track` | Added in v2.80. Invalid/missing values default to `off`. |
| `mippi-music-shuffle-v1` | Music Shuffle preference | `1` / `0` | Added in v2.80. Only `1` loads as enabled. |

## sessionStorage Registry

| Key | Purpose | Value shape | Notes |
| --- | --- | --- | --- |
| `mippi-session-telemetry-v1` | Full current-session telemetry | JSON object, version 1 | Director, Objectives, Player Model, Stats, Debrief, session history. |
| `mippi-doug-cool-progress-v1` | Current Doug Coolness | Integer 0 to 100 | Session-persistent short-term meter progress. |
| `mippi-achievement-intro-hint-v1` | First discovery onboarding shown | `1` | Session-only onboarding suppression. |
| `mippi-epic-airspace-welcome-v1` | Epic airspace onboarding shown | `1` | Session-only onboarding suppression. |
| `mippiWishHasIsValid` | BP_WishManager Is Valid repair state | `1` when repaired | Session-only Blueprint repair state. |

## Defined But Not Active Persistence

| Identifier | Current status | Rule |
| --- | --- | --- |
| `mippiCompileStuck` | Defined as `COMPILE_STUCK_KEY` but not actively read or written in v2.80 `script.js`. | Do not treat as authoritative persisted state unless implementation begins using it. |

## Important Non-Storage `mippi-*` Names

These are not persistence keys.

### Custom Events

```text
mippi-theme-change
mippi-legendary-change
```

They are dispatched on `window` when visual theme state changes.

### Telemetry Source String

```text
mippi_bird
```

This is used as a Rupee reward source label, not browser storage.

## Reset Contract

Public full reset clears both storage objects using this namespace rule:

```text
key.toLowerCase().startsWith("mippi")
```

This means all active keys in this registry are removed by the public `reset` flow.

The reset then performs:

```text
location.reload()
```

so runtime-only state also returns to first-visit defaults.

## Canonical vs Legacy Theme Keys

Current selected theme authority:

```text
mippi-theme-mode-v1
```

Compatibility keys still written in v2.80:

```text
mippi-completion-theme
mippi-legendary-theme
```

New feature code should prefer the current theme-mode key rather than adding more theme booleans.

## Normal Finale vs Grand Tour Section Persistence

Normal Finale currently checks section visits from:

```text
mippi-session-telemetry-v1
```

for the six major professional sections.

Postgame Grand Tour uses persistent:

```text
mippi-postgame-sections-v1
```

These are intentionally different scopes in v2.80.

## Wish State Split

Wish progression uses three separate classes of state:

```text
mippiWishUnlocked
  persistent command discovery

mippi-wish-charge-v1
  persistent current celestial charge

mippiWishHasIsValid
  session-only Blueprint repair state
```

Validated Wish history is separately persisted for Finale:

```text
mippi-finale-wish-v1
```

Do not collapse these into one boolean.

## Coolness State Split

Current Coolness:

```text
mippi-doug-cool-progress-v1
sessionStorage
```

Historical "ever reached max" state:

```text
mippi-postgame-cool-maxed-v1
localStorage
```

The first can drain to zero.

The second must remain true.

## Castle State Split

Current repeatable Castle run:

```text
mippi-castle-run-progress-v1
```

Historical first 4/4 completion:

```text
mippi-postgame-castle-complete-v1
```

Claiming the reward resets the first and preserves the second.

## Music Persistence

v2.80 persists three Music Player values:

```text
mippi-music-player-unlocked-v1
  final reward entitlement

mippi-music-repeat-v1
  off / playlist / track

mippi-music-shuffle-v1
  1 / 0
```

The following remain runtime-only:

- current track index,
- current playback position,
- playing/paused state,
- collapsed/expanded state,
- track availability cache,
- Shuffle bag/order,
- Shuffle navigation history,
- open lyrics track,
- current lyric highlight.

The full reset clears all three Music keys because they share the existing `mippi` namespace.

## Migration Notes

`mippi-shop-state-v1` contains current migration logic for removed legacy Shop IDs:

```text
galaga-warranty -> bird-extra-life
tractor-beam -> interact-toggle
```

Legacy equipped references to those removed IDs are discarded rather than migrated into the gameplay slot.

## Registry Maintenance Rule

When adding a persistent state in a future release:

1. add the exact key here,
2. identify its storage class,
3. document value shape,
4. document reset behavior,
5. document migration if replacing an older key,
6. update the owning feature `TECHNICAL.md`.
