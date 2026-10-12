# Rarity Theme Framework - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Rarity Theme Framework > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the three-tier visual rarity system and the shared rules for switching and persisting the active site theme.

> This page is the canonical technical documentation for **Rarity Theme Framework** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Model

The active visual theme is represented primarily through body classes.

Rare:

```text
no theme-complete class
no theme-legendary class
```

Epic:

```text
theme-complete
```

Legendary:

```text
theme-complete
theme-legendary
```

Legendary intentionally includes `theme-complete` underneath it.

This lets the Legendary CSS layer inherit Epic-compatible structure while overriding the final palette.

## Current Theme Detection

`script.js` uses:

```js
function currentThemeMode(){
  if(document.body.classList.contains('theme-legendary'))
    return 'legendary';

  if(document.body.classList.contains('theme-complete'))
    return 'epic';

  return 'rare';
}
```

## Availability

Theme availability is derived from progression, not from the current body classes:

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

## Theme Application

`applyThemeMode(requestedMode, {persist=true})`:

1. builds the currently available mode list,
2. rejects unavailable requested modes back to Rare,
3. toggles `theme-complete`,
4. toggles `theme-legendary`,
5. synchronizes Doug theme art,
6. optionally persists the selected mode,
7. updates the theme-cycle control,
8. dispatches theme-change events.

## Persistence

Primary key:

```text
mippi-theme-mode-v1
```

Legacy compatibility keys:

```text
mippi-completion-theme
mippi-legendary-theme
```

The current mode is written to the primary key.

The legacy keys are also updated so returning visitors from older versions retain expected behavior.

## Events

Applying a theme dispatches:

```text
mippi-theme-change
mippi-legendary-change
```

`mippi-theme-change` detail includes:

```js
{
  active: mode !== 'rare',
  legendary: mode === 'legendary',
  mode
}
```

These events allow dependent UI to react without polling storage.

## CSS Architecture

Rare is the base stylesheet.

Epic overrides use:

```css
body.theme-complete
```

or:

```css
body.theme-complete:not(.theme-legendary)
```

when a rule must specifically exclude Legendary.

Legendary uses:

```css
body.theme-complete.theme-legendary
```

for high-specificity final overrides.

## Default Tokens

Rare root variables include values such as:

```css
--bg:#0a0d12;
--panel:rgba(18,23,31,.92);
--text:#f3f5f8;
--muted:#9ca7b7;
--accent:#0070e0;
--accent-bright:#2f93ff;
--accent-2:#5daeff;
```

## Epic Tokens

Epic overrides include:

```css
--bg:#0c0713;
--panel:rgba(27,17,39,.94);
--text:#fbf7ff;
--muted:#c4b2d3;
--accent:#b13cff;
--accent-bright:#e18cff;
--accent-2:#67e8ff;
--hot-pink:#ff45bf;
```

## Legendary Tokens

Legendary overrides include:

```css
--bg:#0d0a05;
--panel:rgba(35,25,10,.94);
--text:#fffaf0;
--muted:#c9b88f;
--accent:#c78512;
--accent-bright:#ffc63d;
--accent-2:#ffe49a;
```

Teal/cyan is used as the cool complementary color for Legendary-specific treatment.

## Visual Coverage

The current theme audit covers:

- header,
- Hero,
- achievement toast,
- Ledger,
- Hint,
- theme selector,
- progression HUD,
- Dynamic Objectives,
- Console,
- stat overlays,
- Vibe,
- Inspect,
- Blueprint chrome,
- Wish surfaces,
- gift surfaces,
- Shop,
- Mippi Bird,
- Doug,
- pickups,
- Shooting Star,
- UFOs,
- Mushroom cursor,
- Lumen,
- Azure gallery,
- hardware warning,
- Design Mode,
- Castle,
- Super Boss,
- Music Player.

## QA

Use:

```text
dev epic
dev legendary
```

and the theme-cycle control to inspect:

- Rare,
- Epic,
- Legendary.

For every new UI surface, verify:

- rest,
- hover,
- focus,
- active,
- disabled,
- success,
- warning,
- locked,
- modal.

Also confirm gameplay does not disappear when selecting an earlier visual theme.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
