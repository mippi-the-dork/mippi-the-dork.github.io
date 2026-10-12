# Music Player Persistence - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Persistence > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Persists Music Player entitlement across visits until the public full reset clears the portfolio save state.

> This page is the canonical technical documentation for **Music Player Persistence** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Storage Key

```text
mippi-music-player-unlocked-v1
```

Constant:

```js
const MUSIC_UNLOCK_KEY=
  'mippi-music-player-unlocked-v1';
```

## Startup Load

At early runtime initialization:

```js
musicPlayerUnlocked=
  localStorage.getItem(
    MUSIC_UNLOCK_KEY
  )==='1';
```

This occurs alongside other postgame persistent state.

## Initialization

Near startup completion:

```js
initMusicPlayer();
```

runs.

Inside:

```js
musicPlayer.hidden=
  !musicPlayerUnlocked;
```

If unlocked:

```js
selectMusicTrack(0);
```

prepares the first file.

## Unlock Write

`unlockMusicPlayer()` always writes:

```js
localStorage.setItem(
  MUSIC_UNLOCK_KEY,
  '1'
);
```

even when the runtime already believed the player was unlocked.

## Nonpersistent Runtime Fields

Not written to storage:

```text
musicTrackIndex
musicCurrentAvailable
collapsed class
audio currentTime
audio paused/playing state
```

## Public Reset

The public `reset` command is a full Mippi-state reset.

Its confirmation copy explicitly describes clearing:

- Signals,
- themes,
- Shop purchases,
- currency,
- Wishes,
- Doug progress,
- Castle progress,
- Finale state,
- telemetry,
- session progress.

The reset path clears Mippi-prefixed local/session storage state and reloads.

The Music key matches that namespace and is removed.

## DEV Fresh

QA reset helpers can also clear Mippi storage and reload, returning Music to locked state.

## Browser Scope

Because this uses `localStorage`, persistence is tied to:

- site origin,
- browser/profile storage.

It is not synchronized across devices.

## QA

- Natural unlock.
- Reload same origin.
- Close browser and reopen site.
- Confirm entitlement persists.
- Collapse, select track, play.
- Reload and verify only entitlement persists, not media state.
- Run public full reset.
- Confirm Music key and player are gone.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
