# Reset Command - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Reset Command > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a two-step full reset flow that clears progression and performs a true page reload.

> This page is the canonical technical documentation for **Reset Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command

`reset()` sets:

```js
consolePending = 'reset_confirmation';
```

and prints two warning lines.

## Confirmation Parser

Before normal command parsing:

```js
if(consolePending === 'reset_confirmation')
```

the next raw line is consumed.

If:

```js
raw.toLowerCase() === 'reset'
```

then:

```js
performFullReset()
```

runs.

Otherwise the Console prints cancellation.

## Storage Clearing

`clearMippiStorage(storage)` enumerates keys and removes only keys beginning with:

```text
mippi
```

case-insensitively.

It is run for both:

```text
localStorage
sessionStorage
```

## Reload

`performFullReset()`:

1. clears both storage scopes,
2. sets `history.scrollRestoration='manual'` when supported,
3. scrolls to 0,0,
4. prints confirmation,
5. waits 420 ms,
6. removes hash through `history.replaceState`,
7. calls `location.reload()`.

## Three.js Regression

The explicit `location.reload()` replaced an earlier same-URL replacement approach.

Three.js scene bootstrap occurs during document startup, so a real reload is required for consistent reset behavior.

## QA

- type `reset`,
- type `no`,
- verify no state changed,
- type `reset`,
- type `RESET`,
- verify reload,
- verify no Mippi storage remains,
- verify Three.js initializes after reload,
- verify unrelated storage is untouched.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
