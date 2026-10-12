# Is Valid Repair - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Is Valid Repair > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the player insert an Is Valid node to repair the intentionally broken Wish reference path.

> This page is the canonical technical documentation for **Is Valid Repair** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Click Handler

The repair button uses:

```js
blueprintAddValid?.addEventListener('click',()=>{
  ...
});
```

## First Validation Telemetry

If the graph was not already valid:

```js
telemetryCount('wish','validInserted');
telemetryMeaningful('blueprint_validated');
```

runs once for the transition.

## State Mutation

The handler sets:

```js
wishHasIsValid=true;
wishBlueprintErrorActive=false;
```

## Session Persistence

It writes:

```js
sessionStorage.setItem(
  WISH_VALID_KEY,
  '1'
);
```

where:

```text
WISH_VALID_KEY = mippiWishHasIsValid
```

## UI Refresh

The handler then calls:

```js
updateBlueprintState();
updateConsoleAttention();
```

and schedules another wire update after 40 ms.

## Console Output

The repair prints:

```text
Blueprint graph updated: Is Valid inserted between Wish Event and Grant Wish.
```

## Graph Status

`updateBlueprintState()` toggles:

```text
validated
```

on the Blueprint stage.

Validated text becomes:

```text
GRAPH STATUS // WISH REFERENCE VALIDATED
```

The add-node hint receives:

```text
aria-hidden="true"
```

## Console Attention Result

Because:

```js
wishBlueprintErrorActive=false
```

the red Blueprint repair attention clears immediately.

If the preserved celestial charge still exists, `consoleAttentionState()` falls back to the normal Wish-ready cue.

## Idempotence

Clicking again while valid does not increment `validInserted`.

The handler still leaves the state valid.

## QA

1. Force `dev blueprint broken`.
2. Verify repair cue.
3. Click `+`.
4. Verify valid path and status.
5. Verify FIX WISH cue disappears.
6. Verify WISH READY cue appears if charged.
7. Close and reopen Blueprint.
8. Verify validated state.
9. Click `+` again.
10. Verify no duplicate first-validation telemetry.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
