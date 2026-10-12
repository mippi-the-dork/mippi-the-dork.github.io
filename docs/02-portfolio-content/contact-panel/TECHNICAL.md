# Contact Panel - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Contact Panel > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a dedicated way to reach Mippi and is also used as the payoff for the Mippi Wish branch.

> This page is the canonical technical documentation for **Contact Panel** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The popup root is:

```html
<div class="wish-contact-popup wish-special-popup"
     id="wish-contact-popup"
     aria-hidden="true">
```

The internal window is a semantic dialog:

```html
<div class="wish-special-window contact-window"
     role="dialog"
     aria-modal="true"
     aria-labelledby="wish-contact-title">
```

## Actions

Current destinations:

- Discord user route
- LinkedIn profile
- `mailto:` email link

External web links use `_blank` and `rel="noreferrer"`.

Email uses a standard `mailto:` anchor.

## Runtime References

`script.js` caches:

```js
const wishContactPopup = document.querySelector('#wish-contact-popup');
const wishContactClose = document.querySelector('#wish-contact-close');
```

Open:

```js
function openWishContact() {
  wishContactPopup?.classList.add('open');
  wishContactPopup?.setAttribute('aria-hidden','false');
}
```

Close:

```js
function closeWishContact() {
  wishContactPopup?.classList.remove('open');
  wishContactPopup?.setAttribute('aria-hidden','true');
}
```

## Close Inputs

The popup closes through:

- close button,
- click on the popup root outside the window,
- Escape through the global keydown handler.

## Attention Budget

The Contact Panel uses `.wish-special-popup`, so high-level attention checks can treat it as a focused overlay and suppress competing Finale or Director events.

## Current Accessibility Note

The dialog has semantic role and visible controls, but it does not currently use the same explicit focus-capture/restore pattern as Azure Altar Gallery.

If modal accessibility is centralized later, this popup should adopt the shared focus manager.

## QA

1. Trigger the Mippi Wish branch.
2. Verify popup becomes visible and `aria-hidden` changes.
3. Test Discord.
4. Test LinkedIn.
5. Test email.
6. Close with X.
7. Reopen and close by overlay click.
8. Reopen and close with Escape.
9. Verify no contact action fires automatically.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
