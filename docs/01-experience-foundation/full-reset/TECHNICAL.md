# Full Reset - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Full Reset > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Clears all persistent and session progression and reloads the site into a true first-visit state.

> This page is the canonical technical documentation for **Full Reset** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Public Command Flow

The `reset` console command does not immediately delete data.

It sets a pending confirmation state and prints:

- a destructive-action warning,
- a summary of affected progression,
- the instruction to type `RESET` to confirm.

While `consolePending === 'reset_confirmation'`, the next submitted line is interpreted as the confirmation response.

Input comparison is case-insensitive because the raw input is converted to lower case before comparing with `reset`.

Any nonmatching input cancels.

## Storage Clearing

`clearMippiStorage(storage)` enumerates all keys in the supplied Storage object.

It collects and removes only keys where:

```js
key.toLowerCase().startsWith('mippi')
```

The function is called for both:

```js
localStorage
sessionStorage
```

This prefix rule is why all Mippi-owned persistence keys must continue to use the `mippi` prefix.

## Reload Path

`performFullReset()` currently:

1. clears `localStorage`,
2. clears `sessionStorage`,
3. attempts `history.scrollRestoration = 'manual'`,
4. scrolls to `0,0`,
5. prints confirmation output,
6. waits 420ms,
7. removes the URL hash with `history.replaceState`,
8. calls `location.reload()`.

The explicit `location.reload()` is important. Earlier same-URL replacement behavior could leave Three.js scenes unavailable until a manual refresh.

## DEV Shortcut

`dev fresh` performs:

```js
clearMippiStorage(localStorage);
clearMippiStorage(sessionStorage);
location.reload();
```

It skips the public confirmation flow and exists only for QA.

## What Reset Does Not Do

The function does not call `localStorage.clear()` or `sessionStorage.clear()`.

It intentionally avoids deleting unrelated keys that do not begin with `mippi`.

## Failure Handling

`clearMippiStorage` is wrapped in `try/catch`.

History manipulation is also guarded.

A browser that blocks storage should still proceed to reload.

## QA

Public flow:

1. Create broad progression with `dev legendary`, Rupees, Shop, Hearts, Castle, and postgame state.
2. Confirm Music Player unlock if testing true-completion persistence.
3. Type `reset`.
4. Type a different word and verify cancellation.
5. Type `reset` again.
6. Type `RESET`.
7. Verify the page returns to the top and reloads.
8. Verify Three.js initializes without a manual second refresh.
9. Verify Rare starting state, empty Shop, zeroed progression, no Finale state, and no Music Player unlock.
10. Verify `window.__MIPPI_TELEMETRY__.snapshot()` represents a new session.

Storage inspection:

- confirm no keys beginning with `mippi` remain from the previous state,
- confirm unrelated browser storage is not deliberately removed.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
