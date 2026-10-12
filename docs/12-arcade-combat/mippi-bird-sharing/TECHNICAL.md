# Mippi Bird Sharing - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Sharing > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the optional sharing behavior associated with the Mippi Bird experience.

> This page is the canonical technical documentation for **Mippi Bird Sharing** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## UI

Mippi Bird footer contains:

```html
<button
  type="button"
  id="flappy-share">
  SHARE
</button>
```

and:

```text
#flappy-share-menu
```

with buttons:

```text
x
linkedin
facebook
copy
```

## Menu Open

Clicking Share:

```js
telemetryCount(
  'flappy',
  'shares'
);
```

and:

```js
telemetryMeaningful(
  'flappy_share',
  {
    score:
      flappySessionHighScore
  }
);
```

Then the menu toggles:

```text
open
```

and updates `aria-hidden`.

Current telemetry therefore records opening the Share menu, not confirmed completion on a specific platform.

## Share Text

```js
const text=
  `I scored ${flappySessionHighScore} in Mippi Bird on Mippi's portfolio.`;
```

## URL

The current page URL uses:

```js
location.href
```

and is URI-encoded for external share links.

## X

Opens:

```text
https://twitter.com/intent/tweet
```

with encoded text and URL.

## LinkedIn

Opens:

```text
https://www.linkedin.com/sharing/share-offsite/
```

with the current URL.

## Facebook

Opens:

```text
https://www.facebook.com/sharer/sharer.php
```

with the current URL.

## Copy

Uses:

```js
navigator.clipboard?.writeText(
  `${text} ${location.href}`
);
```

The optional chaining means unsupported clipboard access fails silently rather than breaking the minigame.

## Window Safety

External sharing uses:

```text
_blank
noopener
```

## Close

After any share-menu choice:

```js
shareMenu.classList.remove(
  'open'
);

shareMenu.setAttribute(
  'aria-hidden',
  'true'
);
```

## No Native Share

There is no `navigator.share()` path in v2.78.

This matches the explicit product decision documented in `MIPPI_BIRD_DEV.md`.

## QA

- Open Share menu.
- Close/reopen through repeated Share button clicks.
- Test X destination.
- Test LinkedIn destination.
- Test Facebook destination.
- Test Copy in a secure clipboard-capable context.
- Verify menu closes after selection.
- Verify no Rupee or progression state changes.
- Verify current session high score is used in text.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
