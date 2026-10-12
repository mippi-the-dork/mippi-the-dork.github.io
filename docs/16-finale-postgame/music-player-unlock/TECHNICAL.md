# Music Player Unlock - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Unlock > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Unlocks the six-slot soundtrack player as the persistent reward for the Legendary 100% Complete achievement.

> This page is the canonical technical documentation for **Music Player Unlock** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Persistent Key

```text
mippi-music-player-unlocked-v1
```

Loaded at startup into:

```js
let musicPlayerUnlocked=false;
```

## Natural Unlock Path

Inside `evaluatePostgameAchievements()`:

```js
if(
  postgameRevealed &&
  finaleSeen &&
  allEpic
){
  const legendaryNew=
    unlockPostgameAchievement(
      POSTGAME_LEGENDARY_KEY,
      {announce}
    );

  if(legendaryNew)
    unlockMusicPlayer(
      {announce}
    );
}
```

Therefore Music Player unlock is coupled to the first unlock transition of the Legendary capstone.

## Unlock Function

```js
function unlockMusicPlayer({
  announce=true
}={}){
  const first=
    !musicPlayerUnlocked;

  musicPlayerUnlocked=true;

  localStorage.setItem(
    MUSIC_UNLOCK_KEY,
    '1'
  );

  if(musicPlayer){
    musicPlayer.hidden=false;
    musicPlayer.classList.toggle(
      'new-unlock',
      first
    );
  }

  ...
}
```

## First-Unlock Feedback

When:

```text
first && announce
```

toast:

```text
MUSIC PLAYER UNLOCKED
100% complete. Six soundtrack slots are now permanently available until reset.
```

Console:

```text
LEGENDARY REWARD //
MUSIC PLAYER UNLOCKED //
persists until reset.
```

## Startup

`initMusicPlayer()` sets:

```js
musicPlayer.hidden=
  !musicPlayerUnlocked;
```

If already unlocked:

```js
selectMusicTrack(0);
```

prepares the first slot.

It does not autoplay.

## Unlock Animation

First unlock adds:

```text
new-unlock
```

The CSS animation runs:

```text
1 second
4 iterations
```

with strong glow.

The class remains after animation completion in v2.78, but the finite animation itself stops after four cycles.

## DEV

```text
dev music
```

calls:

```js
unlockMusicPlayer(
  {announce:false}
);
```

and prints a QA confirmation.

## Current Recovery Nuance

The natural unlock function is called only when the Legendary capstone is newly added during evaluation.

The separate Music unlock key is therefore the authoritative persistence for the player itself.

A manually inconsistent storage state where `post_complete` is already stored but `mippi-music-player-unlocked-v1` is missing is not automatically repaired by normal evaluation in v2.78.

This should be considered only a corrupted-storage QA edge case.

## QA

- Natural 100 percent unlock.
- Reload.
- Confirm player remains.
- Full reset.
- Confirm player disappears.
- Force `dev music`.
- Confirm no capstone progression is falsely added by the QA command.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
