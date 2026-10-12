# Persistent Save State - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Persistent Save State > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Stores long-term progression and feature unlocks locally while separating them from temporary per-session state.

> This page is the canonical technical documentation for **Persistent Save State** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Storage Model

The site uses two browser storage scopes.

### `localStorage`

Used for long-lived progression and preferences that should survive browser restarts.

### `sessionStorage`

Used for per-tab or per-session information that should naturally disappear when the browser session ends.

Most access is wrapped in `try/catch` so storage restrictions do not crash the page.

## Current Long-Lived Keys

Important `localStorage` keys include:

| Key | Purpose |
| --- | --- |
| `mippi-achievements-v2` | Rare achievement unlocks |
| `mippi-theme-mode-v1` | selected rarity theme |
| `mippi-completion-theme` | legacy Epic theme migration support |
| `mippi-legendary-unlocked` | Legendary progression unlock |
| `mippi-legendary-theme` | legacy Legendary theme preference |
| `mippi-heart-pickups-v1` | Heart count |
| `mippi-heart-reward-v1` | Heart reward claimed |
| `mippi-rupee-wallet-v1` | Rupee wallet |
| `mippi-rupee-discovered-v1` | Rupee/Shop discovery |
| `mippi-shop-state-v1` | Shop ownership and equipped item |
| `mippi-design-mode-unlocked-v1` | Design Mode entitlement |
| `mippi-inspect-mode` | Inspect preference |
| `mippi-design-mode` | Design preference |
| `mippi-finale-seen-v1` | Finale viewed |
| `mippi-finale-wish-v1` | Finale Wish requirement |
| `mippi-finale-boss-v1` | Finale Boss requirement |
| `mippi-wish-charge-v1` | Shooting Star Wish charge |
| `mippiWishUnlocked` | Wish command/progression unlock |
| `mippi-mushroom-progress-v1` | Mushroom life progress |
| `mippi-bird-mushroom-lives-v1` | banked Mippi Bird lives |
| `mippi-castle-run-progress-v1` | Castle run progress |
| `mippi-postgame-sections-v1` | persistent major-section visits |
| `mippi-postgame-cool-maxed-v1` | historical Coolness max |
| `mippi-postgame-castle-complete-v1` | historical Castle completion |
| `mippi-postgame-superboss-v1` | historical Super Boss defeat |
| `mippi-postgame-achievements-revealed-v1` | postgame tier reveal state |
| `mippi-postgame-achievements-v1` | postgame achievement unlocks |
| `mippi-music-player-unlocked-v1` | permanent Music Player reward |

## Current Session Keys

Important `sessionStorage` keys include:

| Key | Purpose |
| --- | --- |
| `mippi-session-telemetry-v1` | local telemetry session |
| `mippi-doug-cool-progress-v1` | current Coolness meter progress |
| `mippiWishHasIsValid` | Blueprint repair state |
| `mippi-achievement-intro-hint-v1` | first-session achievement onboarding |
| `mippi-epic-airspace-welcome-v1` | one-session Epic welcome |

## Initialization

At startup, `script.js`:

1. loads persistent postgame state,
2. creates or restores session telemetry,
3. loads achievements and rarity unlocks,
4. loads economy state,
5. loads Wish, Mushroom, Castle, and Design state,
6. migrates selected legacy Shop and theme data where needed,
7. updates derived runtime state and UI.

Stored values are validated or clamped where practical. Examples include Heart count, Wish charge, Mushroom progress, and Castle progress.

## Migration Examples

Current code contains compatibility behavior for:

- older Epic/Legendary theme toggles,
- renamed Shop items.

This indicates that persisted state should be treated as a versioned public contract once shipped.

## Failure Behavior

Storage reads and writes are broadly wrapped in `try/catch`.

If browser storage is unavailable:

- the site should still render,
- progression may not persist,
- no server fallback is attempted.

## QA

Persistence sweep:

1. `dev fresh`.
2. Create a known state with DEV commands.
3. `dev snapshot`.
4. Reload.
5. Verify long-term state remains.
6. Verify expected session-only state behavior.
7. Close and reopen the browser session if validating session storage.
8. Use the public `reset` command.
9. Confirm all `mippi` keys are removed from both storage scopes.
10. Confirm unrelated storage belonging to another application would not be targeted by the prefix-based reset function.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
