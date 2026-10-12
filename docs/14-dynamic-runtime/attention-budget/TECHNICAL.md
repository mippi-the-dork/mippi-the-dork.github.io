# Attention Budget - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Attention Budget > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prevents natural ambient opportunities and large encounters from spawning underneath high-attention UI or focused player tasks.

> This page is the canonical technical documentation for **Attention Budget** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Attention Function

```js
directorAttentionBlocked()
```

returns true when any current blocker is active.

## Immediate Blockers

### Super Boss

```js
if(superBossActive)
  return true;
```

### Hidden Page

```js
if(
  document.visibilityState !==
  'visible'
)
  return true;
```

### Active Form Input

```js
document.activeElement
  ?.matches?.(
    'input,textarea,select'
  )
```

### Achievement UI

Either:

```text
achievement toast is showing
Achievement Ledger is open
```

## Selector-Based Blockers

The runtime checks:

```text
.dev-console.open
.shop-popup.open
.blueprint-popup.open
.compile-popup.open
.wish-special-popup.open
.wish-sequence-overlay
.hal-overlay.show
.azure-gallery[aria-hidden="false"]
.flappy-game
.finale-overlay.show
.session-debrief.show
```

## Natural Ambient Gate

`directorAllowsAmbient(kind,{force=false})`:

```js
if(
  force ||
  easyModeEnabled
)
  return true;
```

Otherwise if attention is blocked:

1. increment:
   - `director.attentionBlocks`,
2. queue ambient kind,
3. schedule telemetry save,
4. return false.

## Deferred Queue

Tracked families:

```text
pickup
bone
shooting_star
ufo
```

Each queued counter is capped:

```js
Math.min(
  3,
  current+1
);
```

## Flush Priority

`directorFlushBlockedAmbient()` returns immediately if:

- attention still blocked,
- reduced motion active.

Then it attempts one family in this fixed order:

```text
shooting_star
pickup
bone
ufo
```

Only one successful deferred spawn is flushed per call.

The matching queued count is decremented.

## Flush Cadence

Director startup runs:

```js
setInterval(
  () => {
    directorFlushBlockedAmbient();
    directorLegendaryGuarantee();
  },
  900
);
```

## Boss Queue

Large Boss contacts use a separate calm-window retry helper.

If attention remains blocked, the Boss request is delayed rather than spawned underneath the active interaction.

## Objective Offer

`objectiveCanOffer()` directly rejects offers when:

```js
directorAttentionBlocked()
```

is true.

Objective opportunity seeding also retries when blocked.

## QA

- Open each blocker individually.
- Wait for natural pickup/UFO timers.
- Verify no new natural object appears.
- Close blocker.
- Verify at most one deferred opportunity flushes at a time.
- Open a text input and test the same.
- Hide browser tab and return.
- Confirm no spawn flood on visibility restoration.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
