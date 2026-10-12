# Mippi Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Mippi Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets wishes involving Mippi as a route to the contact panel.

> This page is the canonical technical documentation for **Mippi Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

First branch in validated Wish resolution:

```js
/mippi|mippithedork/
```

On match:

```js
telemetryWishBranch('mippi');
```

Console prints the granted message.

A transient toast appears.

Then:

```js
window.setTimeout(
  openWishContact,
  450
);
```

## Popup

Static root:

```text
#wish-contact-popup
.wish-contact-popup
.wish-special-popup
```

It uses:

```html
role="dialog"
aria-modal="true"
```

## Actions

Current destinations:

- Discord user link,
- LinkedIn profile,
- `mailto:` email.

## Close Paths

The popup closes through:

- close button,
- click on popup backdrop,
- Escape.

## Attention Blocking

Because it uses:

```text
.wish-special-popup.open
```

it participates in focused-attention suppression used by Finale and Director logic.

## QA

- Wish `Mippi`,
- Wish `mippithedork`,
- Wish `Mippi port my game to Unreal`,
- verify Mippi branch wins,
- test all three contact actions,
- close by button/backdrop/Escape.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
