# Theme Cycling - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Theme Cycling > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Allows unlocked rarity themes to be changed without altering the player's actual progression state.

> This page is the canonical technical documentation for **Theme Cycling** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Control

The theme-cycle element is referenced by:

```js
themeCycle
```

The control text is synchronized through:

```js
updateThemeCycleControl()
```

## Available Modes

```js
function availableThemeModes(){
  const modes=['rare'];

  const epicUnlocked =
    unlockedAchievements.size===ACHIEVEMENT_KEYS.length;

  if(epicUnlocked)
    modes.push('epic');

  if(epicUnlocked && legendaryUnlocked)
    modes.push('legendary');

  return modes;
}
```

## Cycle Function

```js
function cycleThemeMode(){
  telemetryCount('modes','themeAttempts');

  const modes=availableThemeModes();

  if(modes.length===1){
    showTransientToast(...);
    return;
  }

  const current=currentThemeMode();
  const index=Math.max(0,modes.indexOf(current));
  const next=modes[(index+1)%modes.length];

  telemetryCount('modes','themeChanges');
  telemetryUnique('modes','themeModes',next);
  telemetryMeaningful('theme_changed',{mode:next});

  applyThemeMode(next);

  consolePrint(
    `THEME // ${next.toUpperCase()}`,
    'good'
  );
}
```

## Control Label

`updateThemeCycleControl()` writes:

```text
Theme: Rare
Theme: Epic
Theme: Legendary
```

It also stores:

```js
themeCycle.dataset.theme = mode;
```

and updates `aria-label`.

## Tooltip States

Current tooltip logic:

### Rare only

```text
Explore more of the site to unlock additional themes.
```

### Rare + Epic

```text
Rare and Epic are unlocked. Something rarer is still hidden.
```

### All three

```text
Click to cycle Rare, Epic, and Legendary themes.
```

## Persistence

`applyThemeMode()` writes:

```text
mippi-theme-mode-v1
```

and compatibility state into older theme keys.

## Preferred Startup Theme

`preferredUnlockedTheme()`:

1. checks the primary theme-mode key,
2. validates it against currently unlocked modes,
3. falls back through legacy preferences,
4. returns Rare if no stored preference is valid.

## No Reload

Theme switching is class-driven.

Three.js scenes poll body classes in their animation loops.

Other UI uses CSS selectors and theme-change events.

A page reload is not required.

## Telemetry

Theme cycling tracks:

```text
modes.themeAttempts
modes.themeChanges
modes.themeModes
meaningful: theme_changed
```

## QA

- Fresh state: only Rare is available.
- Click theme control and verify explanatory toast.
- Force Epic.
- Cycle Rare -> Epic -> Rare.
- Force Legendary.
- Cycle Rare -> Epic -> Legendary -> Rare.
- Reload on each selected theme and verify preference.
- Confirm cycling does not alter gameplay unlocks.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
