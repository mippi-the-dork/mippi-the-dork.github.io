# Rare Theme - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Rare Theme > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the default blue and cyan visual identity used by the starting rarity tier.

> This page is the canonical technical documentation for **Rare Theme** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## CSS Ownership

Rare is the baseline stylesheet.

Most Rare rules do not require a body rarity class.

Theme-specific selectors often use:

```css
body:not(.theme-complete)
```

when they need to explicitly target only Rare.

## Root Variables

Important Rare defaults:

```css
--bg:#0a0d12;
--bg-deep:#07090d;
--bg-2:#10141b;

--panel:rgba(18,23,31,.92);
--panel-2:rgba(24,30,40,.92);
--panel-3:rgba(11,15,21,.94);

--line:rgba(255,255,255,.10);
--line-strong:rgba(255,255,255,.20);
--line-blue:rgba(0,112,224,.48);

--text:#f3f5f8;
--muted:#9ca7b7;
--muted-2:#6f7a8a;

--accent:#0070e0;
--accent-bright:#2f93ff;
--accent-soft:rgba(0,112,224,.14);
--accent-2:#5daeff;
```

## Body Background

Rare uses:

```css
radial-gradient(
  circle at 14% 0%,
  rgba(0,112,224,.13),
  transparent 34rem
)
```

plus a subtle top gradient and dark base color.

## Header

The base header uses:

- dark cool background,
- `--line` border,
- blue inset glow.

The brand mark uses:

```css
border:1px solid var(--line-blue);
```

with a blue-tinted panel.

## Hero

Rare Hero background:

```text
#0b0f15 -> #080b10
```

The Hero overlay is designed so the text remains independent of the Three.js palette.

## Three.js

Rare Three.js defaults are handled in `script.js`.

Examples:

- Hero core blue.
- Ambient points blue.
- About nodes blue.
- Rare Hero logo tint blue/white.
- Rare particles blue/cyan.

## Rare Pickup Styling

Selectors under:

```css
body:not(.theme-complete)
```

explicitly theme pickup SVG parts.

Examples:

Heart:

```css
fill:#2f93ff;
stroke:#b7e2ff;
```

Rupee:

```css
fill:#087bdc;
stroke:#72e8ff;
```

Key:

```css
fill:#5daeff;
stroke:#d8f3ff;
```

## Rare Achievement Rows

Ledger Rare rows use:

```css
.ledger-entry.rarity-rare
```

not a page-theme selector.

Their styling therefore survives Epic and Legendary active themes.

Important colors include:

```text
#67cfff
#8db9e8
#2f93ff
```

## Rare Shop Rarity

Rare Shop sections use local rarity custom properties:

```css
--shop-rarity-primary:#2f93ff;
--shop-rarity-secondary:#67e8ff;
--shop-rarity-hot:#8fd6ff;
```

These values are independent of the global page theme.

## DEV Testing

Use:

```text
dev epic
```

then cycle theme back to Rare.

Or use the theme selector after Epic is available.

A direct DEV state should be followed by a visual check that Epic/Legendary mechanics still remain active while Rare presentation is selected.

## QA

- first-load state is Rare,
- no higher-rarity class is present,
- blue/cyan palette is coherent,
- all professional text remains readable,
- Rare achievement rows remain blue under all active themes,
- Rare Shop cards remain blue under all active themes,
- Epic and Legendary gameplay still works if the visual theme is switched back to Rare.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
