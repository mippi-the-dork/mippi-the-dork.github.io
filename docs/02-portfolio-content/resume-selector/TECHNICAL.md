# Resume Selector - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Resume Selector > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Offers short, medium, and long resume paths so visitors can choose the depth of career detail they want.

> This page is the canonical technical documentation for **Resume Selector** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The selector is contained in:

```html
<div class="resume-panel" aria-label="Resume links">
```

It includes `.resume-panel-copy` and `.resume-links`.

The current links point to three Google Docs documents.

The Long resume link has:

```html
class="resume-long"
```

## Achievement Hook

`script.js` listens for clicks on `.resume-long` and calls:

```js
showAchievement('lore')
```

This unlocks `The Whole Story`.

## External Tab Behavior

All resume anchors have:

```html
target="_blank"
rel="noreferrer"
```

The script also installs a best-effort handler for ordinary unmodified left clicks.

It attempts:

```js
window.open(anchor.href, '_blank')
```

Then:

- clears `opener` where possible,
- blurs the new window,
- requests focus back to the portfolio.

Browser policy ultimately controls foreground/background tab behavior.

If scripted opening is blocked, the implementation creates a temporary `_blank` anchor and falls back to normal browser behavior.

Modifier-click behavior is not overridden.

## Failure Behavior

If JavaScript is unavailable, the original `_blank` links still work.

The special attempt to retain portfolio focus is enhancement only.

## QA

1. Click each resume normally.
2. Ctrl-click or Cmd-click each resume and confirm modifier behavior is not intercepted.
3. Verify popup-blocked fallback still opens the document.
4. Confirm Long awards `The Whole Story`.
5. Confirm the other two do not award that achievement.
6. Verify links remain usable with JavaScript disabled.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
