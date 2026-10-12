# Music Player Theme Treatment - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Theme Treatment > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Styles the unlocked Music Player to match the currently selected Rare, Epic, or Legendary site theme without changing music entitlement.

> This page is the canonical technical documentation for **Music Player Theme Treatment** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Base Header-Specific Treatment

The later authoritative Rare rule:

```css
.site-header >
.music-player
```

uses:

- blue border,
- dark blue background,
- cyan inset accent,
- pale blue text.

Example values:

```text
border:
rgba(47,147,255,.52)

background:
rgba(8,20,34,.98)
to
rgba(5,12,20,.98)

inset accent:
rgba(47,147,255,.52)
```

## Rare Internal Colors

Examples:

```text
head kicker    #67cfff
track title    #e9f6ff
status         #8fcfff
count          #a9c9e3
controls       #cae9ff
```

Active track:

```text
blue border/background
near-white text
```

## Epic

Selector:

```text
body.theme-complete
:not(.theme-legendary)
.site-header >
.music-player
```

uses:

- hot pink border,
- plum/blue-black background,
- cyan inset accent.

Examples:

```text
border:
rgba(255,79,200,.48)

kicker:
#67e8ff

title:
#ffdff7

status:
#d9a6ff

count:
#67e8ff
```

## Legendary

Selector:

```text
body.theme-complete
.theme-legendary
.site-header >
.music-player
```

uses:

- gold border,
- warm dark background,
- teal inset accent.

Examples:

```text
border:
rgba(255,200,61,.46)

kicker:
#55ddd9

title:
#fff0b5

status:
#9fdeda

count:
#d8c789
```

## Dynamic Theme Response

Theme changes are body-class based.

The player does not need a JavaScript theme callback to repaint itself.

Existing CSS selectors apply immediately.

## Unlock Independence

`musicPlayer.hidden` depends only on:

```js
musicPlayerUnlocked
```

not on:

```text
currentThemeMode()
```

or `theme-legendary`.

## QA

- Unlock Music once.
- Cycle Rare, Epic, Legendary.
- Verify panel, controls, active track, status, and numbering recolor.
- Verify player never hides.
- Toggle theme while audio is playing and verify playback is uninterrupted.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
