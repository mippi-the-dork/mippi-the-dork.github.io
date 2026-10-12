# NDA Project Card - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > NDA Project Card > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Communicates an unannounced project without violating confidentiality while still supporting the Classified discovery interaction.

> This page is the canonical technical documentation for **NDA Project Card** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The NDA project is:

```html
<article class="career-nda">
  <div class="nda-copy">...</div>
  <button class="nda-logo-slot nda-secret"
          type="button"
          aria-label="Unannounced project identity hint">
    <img src="assets/mob-pixel-logo.png"
         alt="Mob Entertainment pixel-art logo" />
    <span>PROJECT IDENTITY // CLASSIFIED</span>
  </button>
</article>
```

The interactive portion is a semantic button, not a clickable `div`.

## Achievement Hook

`script.js` registers:

```js
document.querySelector('.nda-secret')
  ?.addEventListener('click', () => showAchievement('nda'));
```

The `nda` achievement maps to `Classified`.

The achievement system owns persistence. The NDA card itself has no dedicated save key.

## Inspect / Design Notes

The card uses `data-dev-note` to explain its confidentiality constraint inside Inspect Mode.

Additional design notes may be injected by the Design Mode system.

## Asset

The identity image is:

```text
assets/mob-pixel-logo.png
```

The alt text identifies the already-public studio, not the unannounced project.

## Accessibility

The button has an explicit accessible label.

The copy is normal text and does not depend on redaction graphics.

Keyboard activation triggers the same achievement path as pointer activation.

## QA

1. Verify all displayed copy remains NDA-safe.
2. Verify no hidden DOM attribute, tooltip, alt text, or console output exposes project identity.
3. Activate `.nda-secret` by mouse.
4. Activate it by keyboard.
5. Confirm `Classified` unlocks only as an achievement and does not expose additional protected text.
6. Confirm the card remains readable with the image blocked.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
