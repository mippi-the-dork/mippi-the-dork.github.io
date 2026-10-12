# Music Player Header Placement - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Header Placement > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Anchors the postgame Music Player directly below the sticky header and aligns its left edge with the Mippi logo/header content inset.

> This page is the canonical technical documentation for **Music Player Header Placement** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## DOM Location

The player is a direct child of:

```html
<header class="site-header">
```

after the primary navigation.

Selector:

```text
.site-header > .music-player
```

is therefore the authoritative v2.78 placement rule.

## Header Overflow

v2.78 sets:

```css
.site-header{
  overflow:visible;
}
```

This allows expanded Music content to extend below the sticky header bounds.

## Desktop Position

```css
.site-header > .music-player{
  position:absolute;
  top:calc(100% + 1px);
  left:max(
    20px,
    calc(
      (100vw - var(--max))/2
    )
  );
  right:auto;
  bottom:auto;
}
```

## Header Content Inset

The header itself uses:

```css
padding:
  12px
  max(
    20px,
    calc(
      (100vw - var(--max))/2
    )
  );
```

The Music Player placement intentionally mirrors the same responsive content-inset expression.

The v2.78 product decision is that this aligns the player with the Mippi logo square rather than the brand text.

## Width

Expanded desktop:

```text
min(
  326px,
  calc(100vw - 40px)
)
```

Collapsed:

```text
min(
  266px,
  calc(100vw - 40px)
)
```

## Height

Maximum expanded height:

```css
min(
  520px,
  calc(
    100vh -
    var(--header) -
    18px
  )
)
```

Overflow becomes scrollable when necessary.

## Transform Origin

```text
top left
```

is explicitly set.

The current implementation does not animate expansion with transform, but this reinforces the top-left anchoring contract.

## Mobile

At:

```text
max-width:760px
```

both expanded and collapsed variants use:

```text
left:12px
right:12px
width:auto
max-width:none
```

Top anchoring remains inherited from the header-specific desktop rule.

## Z-Index

Header Music Player:

```text
24
```

inside the sticky header stacking context.

The site header itself uses a much higher page-level stack than ordinary content.

## Legacy Rule Note

The generic `.music-player` rule still declares:

```text
position:fixed
right:18px
bottom:64px
```

from the older bottom-right design.

Because the actual node is a direct child of `.site-header`, the later and more specific header rule overrides:

- position mode,
- left/right,
- top/bottom,
- width,
- palette.

## QA

- Unlock Music.
- Scroll through every section.
- Confirm Music follows sticky header.
- Expand/collapse and confirm top edge does not move.
- Compare player left edge to Mippi logo square.
- Resize desktop width around `--max`.
- Test below 760 px.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
