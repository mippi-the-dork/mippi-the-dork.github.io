# Cross-System Cohesion - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Cross-System Cohesion > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the runtime design principle that systems should share state, events, rewards, and interaction rules instead of behaving like isolated easter eggs.

> This page is the canonical technical documentation for **Cross-System Cohesion** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Shared Event Backbone

The most important cross-system event mechanism is:

```js
telemetryMeaningful(
  type,
  detail
);
```

In addition to recording the bounded timeline, it forwards the event to:

```js
objectiveEventSink
```

when Dynamic Objectives are active.

This lets existing systems drive objective progression without a second independent event framework.

## Shared Collection Paths

Flying objects record:

```js
telemetryFlyingCollect(
  kind,
  method
);
```

then route through their normal click/collection logic.

Alternate interaction methods set a collection-method marker before invoking the target's existing behavior.

Current methods include:

- direct,
- Star Power,
- Legendary projectile,
- `please`.

This preserves:

- reward,
- telemetry,
- achievement/progression side effects

across interaction methods.

## Shared Economy

All Rupee sources should ultimately call:

```js
awardRupees(...)
```

Current sources include:

- pickup,
- regular UFO reward,
- Boss reward,
- Super Boss reward,
- Castle run,
- Optional Objective,
- Mippi Bird.

This keeps wallet persistence and HUD updates centralized.

## Shared Shop State

Modifiers query central helpers such as:

```text
shopOwns(id)
shopHasEquipped(id)
shopItemAvailable(item)
shopPrice(item)
```

rather than maintaining feature-local copies of inventory state.

Examples:

- Slowpoke changes shared flight duration,
- Star Extender changes Star Power duration,
- Golden Trigger changes Legendary targeting,
- Celestial Beacon changes Shooting Star timing,
- Dog Whistle changes Bone cadence.

## Explicit System Combo IDs

Current first-time combo acknowledgements:

```text
star-power-ufo
star-power-boss
slowmo-hostile-fire
legendary-mushroom
star-power-doug
```

Announcement state is stored in the session telemetry combo branch.

## Shared Attention

Natural systems call:

```js
directorAllowsAmbient(...)
```

or equivalent attention checks.

Large authored systems use shared blockers so:

- objectives,
- UFOs,
- Shooting Stars,
- Boss contacts

do not all compete independently.

## Shared Interaction Suppression

Super Boss uses:

```text
superBossInteractOverride
```

inside the same:

```js
contentInteractionSuppressed()
```

logic as the Shop-unlocked Interact Mode.

The encounter does not implement a second CSS lock system.

## Shared Progression History

Transient runtime states can persist separate historical milestones.

Examples:

```text
mippi-postgame-cool-maxed-v1
mippi-postgame-castle-complete-v1
mippi-postgame-superboss-v1
```

This lets postgame achievements recognize earlier accomplishments without requiring transient states to remain active.

## Known Legacy-Cohesion Fix

v2.61 removed a stale hostile-projectile code path that still referenced the deleted Galaga Warranty Shop item.

The ReferenceError happened exactly before projectile cleanup and left shots stuck on screen.

The fix removed the obsolete cross-system dependency and added absolute cleanup guards.

This is a useful maintenance lesson:

> Removing or renaming one system requires auditing every cross-system reference, especially cleanup paths.

## QA Strategy

Cross-system QA should use matrices rather than isolated feature checks.

Examples:

### Star Power Matrix

- pickup,
- Shooting Star,
- regular UFO,
- Boss,
- Doug Bone.

### Shop Modifier Matrix

- owned vs equipped,
- Rare/Epic/Legendary theme,
- Slowmo on/off,
- Director state.

### Attention Matrix

- Shop,
- Console,
- Wish overlay,
- Mippi Bird,
- Finale,
- Objective already active.

### Persistence Matrix

- transient state,
- session state,
- local state,
- full reset.

The release candidate should include at least one natural end-to-end run in addition to DEV-forced subsystem tests.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
