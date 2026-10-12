# Theme and Gameplay Separation - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Theme and Gameplay Separation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Ensures changing visual rarity themes never grants or removes gameplay progression or feature unlocks.

> This page is the canonical technical documentation for **Theme and Gameplay Separation** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Progression Helpers

The current code uses progression helpers such as:

```js
function epicGameplayUnlocked(){
  return unlockedAchievements.size ===
         ACHIEVEMENT_KEYS.length;
}

function legendaryGameplayUnlocked(){
  return !!legendaryUnlocked;
}
```

These are distinct from:

```js
currentThemeMode()
```

## Current Theme

`currentThemeMode()` reads body classes.

It is intended for presentation decisions such as:

- Doug theme image,
- particle palette,
- UI visual treatment.

It should not be used as the authority for gameplay unlocks.

## Epic Gameplay

Systems that belong to Epic progression should query achievement completion.

Examples include:

- airspace,
- Invasion meter,
- selected pickup schedules,
- Shooting Star timing,
- Boss escalation.

Selecting Rare does not reduce:

```js
unlockedAchievements.size
```

so gameplay remains active.

## Legendary Gameplay

Legendary mechanics query:

```js
legendaryUnlocked
```

or:

```js
legendaryGameplayUnlocked()
```

instead of requiring:

```js
body.theme-legendary
```

The Golden Trigger description explicitly states that cursor improvements remain active in every visual theme once Legendary is unlocked.

## Theme Events

Theme changes dispatch presentation events.

Consumers should use them for:

- art swaps,
- live color updates,
- visual treatment.

They should not use the event as an unlock or revoke signal.

## Shop Availability

Shop requirement checks use progression fields such as:

```text
epic
legendary
shop-master
```

These resolve through unlock state, not the currently selected palette.

## Known Risk Pattern

The main regression risk is code written like:

```js
if(document.body.classList.contains('theme-legendary')){
  // enable Legendary mechanic
}
```

That is only safe when the block is purely visual.

If the code changes gameplay behavior, it should instead check Legendary progression state.

## QA

### Epic Separation

1. `dev epic`
2. confirm Epic gameplay unlocks,
3. cycle back to Rare,
4. confirm airborne systems still run.

### Legendary Separation

1. `dev legendary`
2. confirm Legendary systems,
3. cycle to Epic,
4. verify Legendary mechanics still work,
5. cycle to Rare,
6. verify again.

### Shop

Buy or force a higher-rarity item.

Switch visual theme.

Verify item remains owned/equipped and functional.

### Postgame

Unlock Music Player.

Switch to Rare.

Verify Music Player remains available and simply adopts Rare styling.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
