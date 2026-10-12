# Finale Mippi Identity - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Finale Mippi Identity > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Resolves the ending onto a white Mippi logo, MIPPI THE DORK identity, role, and the current Player Model.

> This page is the canonical technical documentation for **Finale Mippi Identity** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The Finale contains:

```html
<img
  class="finale-mippi-logo"
  src="assets/mippi-logo-blue-large.png"
  alt="Mippi logo"
/>

<strong id="finale-line"></strong>
<span id="finale-subline"></span>
<b id="finale-profile"></b>
```

## Visibility

The logo is hidden by default:

```css
.final e-mippi-logo {
  display:none;
}
```

The actual stylesheet uses `.finale-mippi-logo`.

When the overlay receives:

```text
identity
```

the logo becomes visible.

## White Treatment

The source asset remains the blue large logo file.

CSS transforms it to white through:

```css
filter:
  brightness(0)
  invert(1)
  drop-shadow(
    0 0 22px
    rgba(255,255,255,.16)
  );
```

## Size

Logo width:

```text
min(126px, 28vw)
```

It remains responsive on narrow screens.

## Identity Text

At the 5700 ms Finale beat:

```js
finaleSet(
  'MIPPI THE DORK',
  'GAME DESIGNER',
  `PLAYER PROFILE // ${model.label}`
);
```

Then:

```js
finaleOverlay.classList.add(
  'identity'
);
```

## Theme Accent

The Player Profile line uses the Finale `<b>` styling.

Rare:

```text
cyan
```

Epic:

```text
pink
```

Legendary:

```text
gold
```

The logo itself remains white in all three.

## Cursor

During active Finale:

```text
cursor:auto
```

is forced over the overlay and its descendants.

The custom power cursor is hidden.

## QA

- Run Finale in Rare.
- Run in Epic.
- Run in Legendary.
- Verify white logo each time.
- Verify profile accent changes.
- Verify exact name/role text.
- Verify current Player Model matches `stats`.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
