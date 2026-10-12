# AI Vibe Refactor Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > AI Vibe Refactor Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Temporarily corrupts the website with overconfident AI-driven changes and requires the player to use the dedicated Undo AI action.

> This page is the canonical technical documentation for **AI Vibe Refactor Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

Validated Wish checks:

```js
/(ai|llm|agi)/
```

Then:

```js
telemetryWishBranch('ai');
aiWishSpectacle();
```

## State Object

AI Wish uses:

```js
const aiWishState={
  active:false,
  originals:new Map(),
  nodes:[],
  timers:[],
  wasVibe:false
};
```

## Re-entry Safety

If already active:

```js
document.querySelector(
  '.ai-undo-button'
)?.focus();
```

and the function returns.

No second corruption layer is created.

## Startup of Spectacle

`aiWishSpectacle()`:

1. clears active shared Wish sequence,
2. sets `active=true`,
3. records whether Vibe was already enabled,
4. calls `setVibe(true)`,
5. shows a temporary intro spectacle,
6. prints Console output.

## Copy Corruption

`aiWishCorruptCopy()` selects a limited set of text-only elements such as:

- main `h2`,
- main `h3`,
- section kicker,
- eyebrow,
- selected nav text when matched.

Before replacement it stores:

```js
el.innerHTML
```

in:

```js
aiWishState.originals
```

The current replacement pool includes intentionally generic phrases such as:

```text
LEVERAGE SYNERGISTIC OUTCOMES
HOLISTIC EXPERIENCE OPTIMIZATION
BEST-IN-CLASS BUTTON STRATEGY
```

## Corruption Timing

At roughly 1250 ms:

- body gets `ai-wish-corrupted`,
- copy is replaced,
- five fake optimization badges are added,
- status panel is added,
- Console reports 47 files changed, 0 tests run.

At roughly 2500 ms:

- `UNDO AI` button is created,
- button is stored in `aiWishState.nodes`,
- button animates into view.

## Ongoing Console Output

A repeating timer every 2300 ms prints rotating AI refactor lines.

## CSS Corruption

`body.ai-wish-corrupted` changes presentation through rules such as:

- increased saturation,
- section translation/skew,
- selected card rotation,
- Hero heading distortion,
- nav transformation,
- disabled pointer events on main links/buttons,
- HUD transform,
- theme-control hue rotation.

## Undo

`undoAiWish()`:

1. clears timers,
2. restores stored original `innerHTML`,
3. clears original map,
4. removes all generated nodes,
5. removes `ai-wish-corrupted`,
6. disables Vibe only if it was off before the Wish,
7. sets `active=false`,
8. optionally prints success and toast.

## Persistence

No AI corruption state is written to local or session storage.

Reload is therefore an additional natural cleanup boundary.

## DEV Cleanup

`dev clean` calls:

```js
undoAiWish({announce:false})
```

to restore the page during QA.

## QA

- trigger AI Wish with Vibe initially off,
- verify Vibe turns on,
- verify copy and layout corruption,
- verify normal main links are partially disabled,
- verify Undo remains usable,
- click Undo,
- verify exact original copy returns,
- repeat with Vibe already on,
- Undo,
- verify Vibe remains on,
- reload during corruption,
- verify clean startup.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
