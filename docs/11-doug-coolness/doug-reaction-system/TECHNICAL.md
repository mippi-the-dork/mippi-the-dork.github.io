# Doug Reaction System - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug Reaction System > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Coordinates Doug's changing text, paw effects, image variants, offscreen responses, Console flavor, and system feedback across multiple Doug interactions.

> This page is the canonical technical documentation for **Doug Reaction System** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Core Reaction Function

```js
function reactDoug(message){
  if(!dougReaction)
    return;

  dougReaction.textContent=message;
  dougReaction.classList.add('show');

  window.clearTimeout(
    dougReactionTimer
  );

  dougReactionTimer=
    window.setTimeout(
      () =>
        dougReaction.classList.remove(
          'show'
        ),
      2200
    );
}
```

## Theme Image Maps

Normal:

```js
const DOUG_THEME_IMAGES={
  rare:'assets/doug.jpg',
  epic:'assets/doug-complete.webp',
  legendary:'assets/doug-legendary.jpg'
};
```

Cool:

```js
const DOUG_COOL_IMAGES={
  rare:'assets/doug-cool-rare.jpg',
  epic:'assets/doug-cool-epic.jpg',
  legendary:'assets/doug-cool-legendary.png'
};
```

Separate alt-text maps accompany both image sets.

## Image Selection

`getDougImageConfig({mode,current cool state})` selects image data.

`syncDougThemeVisuals()` updates:

- main `.doug-photo`,
- popup `.doug-peek img`.

The Cool decision includes:

```js
dougCoolActive
```

and relevant star-cool classes.

## Theme Updates

Global theme application calls:

```js
syncDougThemeVisuals();
```

so changing Rare, Epic, or Legendary immediately swaps the appropriate Doug source.

## Paw Particles

`burstDougPaws(count,sourceEl)` uses the active source image when possible.

It creates fixed-position:

```text
.doug-paw
```

elements with randomized travel and rotation.

Paw styling is rarity-aware.

## Bone Reaction

`collectDougBone()` checks whether Doug is currently visible.

Visible:

```js
reactDoug(...)
burstDougPaws(...)
```

Offscreen:

```js
showDougPeek(...)
```

## Console Command

Player-facing:

```text
doug
```

calls:

```js
reactDoug(
  randomLine([...])
);
burstDougPaws(4);
```

and prints a Console status line.

It does not call `petDoug()` and therefore does not increase the pet count.

## Star Power

Star-powered Bone collection changes reaction context and can display a Cool popup state.

It also records the `Star Power + Doug` system combo.

## Wish Review

Doug Executive Review uses a separate authored Wish sequence but reuses Doug identity and can ultimately force Coolness to 100.

Temporary Wish visuals are cleaned independently from the core Doug reaction bubble.

## QA

- switch all three themes and inspect normal Doug source,
- enter Cool Mode in all three themes and inspect Cool source,
- pet main card and inspect reaction lifetime,
- use Console `doug` and verify no pet-count achievement advancement,
- collect Bone on-screen and offscreen,
- verify paw particles originate from the correct surface,
- trigger Doug Wish review and verify core Doug state remains coherent afterward.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
