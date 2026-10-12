# Blender Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Blender Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets Blender-related wishes as a joke about uninstalling Blender from the current universe.

> This page is the canonical technical documentation for **Blender Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

Validated Wish checks:

```js
/blender/
```

Then:

```js
telemetryWishBranch('blender');
```

It prints success, shows a transient toast, and schedules:

```js
startBlenderUninstall()
```

after roughly 420 ms.

## Static Popup

Root:

```text
#blender-popup
.blender-popup
.wish-special-popup
```

## Start Function

`startBlenderUninstall()`:

- clears prior interval,
- resets progress to 0,
- resets bar to 0 percent,
- sets initial status,
- disables OK,
- opens popup.

## Progress

Every 55 ms:

```js
progress +=
  4 + Math.floor(Math.random()*9)
```

so each step adds approximately 4 to 12 percentage points.

Progress is clamped at 100.

## Status Thresholds

Below 28:

```text
Finding Blender installations...
```

Below 72:

```text
Removing Blender from local reality...
```

Below 100:

```text
Cleaning orphaned .blend files...
```

At 100:

```text
Uninstall Complete
```

## Completion

At 100:

- interval is cleared,
- OK becomes enabled,
- `.ready` is added.

## Close

OK closes only when not disabled.

Escape handling includes:

```js
if(blenderOk?.disabled)
  return;
```

Therefore Escape cannot close the sequence before completion.

## Cleanup

`closeBlenderPopup()`:

- clears interval,
- removes `.open`,
- sets `aria-hidden=true`.

## QA

- trigger Blender Wish,
- press Escape during progress,
- verify popup remains,
- wait for completion,
- verify OK becomes active,
- close with OK,
- repeat and close with Escape after completion.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
