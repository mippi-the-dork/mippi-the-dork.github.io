# Continue Exploring - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Continue Exploring > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Returns the player to the full portfolio after the Finale or Session Report without resetting any progression.

> This page is the canonical technical documentation for **Continue Exploring** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Finale Continue

Listener:

```js
finaleContinue?.addEventListener(
  'click',
  () => {
    telemetryMeaningful(
      'finale_continue'
    );

    endFinale();
    schedulePostgameAchievementReveal();
  }
);
```

## Session Report Continue

Listener:

```js
sessionDebriefContinue
  ?.addEventListener(
    'click',
    () => {
      telemetryMeaningful(
        'session_debrief_continue'
      );

      closeSessionDebrief();
      schedulePostgameAchievementReveal();
    }
  );
```

## Report Close Button

The X button also schedules postgame reveal:

```js
sessionDebriefClose
  ?.addEventListener(
    'click',
    () => {
      closeSessionDebrief();
      schedulePostgameAchievementReveal();
    }
  );
```

It does not log the explicit `session_debrief_continue` event because it is the close route rather than the dedicated Continue control.

## State Preservation

Neither handler touches:

- localStorage progression keys,
- session telemetry progression values,
- Shop state,
- wallet,
- theme,
- current scroll position.

## Finale Seen

`finaleSeen` was already persisted at Finale start.

Continue does not separately mark the ending as seen.

## Five-Second Delay

Both continue paths call the same:

```js
schedulePostgameAchievementReveal()
```

which schedules reveal after:

```text
5000 ms
```

when not already revealed.

## No Reload

There is no:

```text
location.reload
location.replace
```

in Continue Exploring.

## QA

- Continue directly from Finale.
- Verify no page reload.
- Verify current scroll position is preserved.
- Verify Shop/wallet/theme remain intact.
- Wait five seconds and verify Ledger reveal.
- Repeat through Session Report Continue.
- Repeat through Session Report X close.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
