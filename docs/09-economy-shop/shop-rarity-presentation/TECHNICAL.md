# Shop Rarity Presentation - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Rarity Presentation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps Rare, Epic, and Legendary Shop cards tied to their item rarity instead of inheriting the active site theme.

> This page is the canonical technical documentation for **Shop Rarity Presentation** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Rarity Sections

`renderShop()` generates:

```text
.shop-rarity-section.rarity-rare
.shop-rarity-section.rarity-epic
.shop-rarity-section.rarity-legendary
```

## Card Classes

Each card receives:

```text
.shop-item
.rarity-<item.rarity>
```

plus state classes:

```text
owned
equipped
locked
```

## Local Custom Properties

Rare:

```css
--shop-rarity-primary:#2f93ff;
--shop-rarity-secondary:#67e8ff;
--shop-rarity-hot:#8fd6ff;
--shop-rarity-panel:rgba(6,12,19,.975);
--shop-rarity-line:rgba(93,174,255,.42);
--shop-rarity-text:#edf8ff;
--shop-rarity-muted:#8fa9c0;
```

Epic:

```css
--shop-rarity-primary:#b13cff;
--shop-rarity-secondary:#67e8ff;
--shop-rarity-hot:#ff4fc8;
--shop-rarity-panel:rgba(24,9,34,.978);
--shop-rarity-line:rgba(215,104,255,.44);
--shop-rarity-text:#fff2ff;
--shop-rarity-muted:#b59bc1;
```

Legendary:

```css
--shop-rarity-primary:#ff9d25;
--shop-rarity-secondary:#43e0dc;
--shop-rarity-hot:#ffc83d;
--shop-rarity-panel:rgba(30,18,5,.982);
--shop-rarity-line:rgba(255,192,64,.46);
--shop-rarity-text:#fff3c7;
--shop-rarity-muted:#c2ad83;
```

## Descendant Overrides

Nonlocked cards explicitly use the section's rarity variables for:

- border,
- background,
- grade text,
- title,
- description,
- price,
- button,
- hover,
- focus,
- owned state,
- equipped state.

The rules use strong specificity and selected `!important` declarations to prevent active site theme from leaking into semantic item rarity.

## Responsive

At narrow widths:

```css
.shop-rarity-grid {
  grid-template-columns:1fr;
}
```

Rarity grouping remains unchanged.

## QA

Open Shop in:

- Rare page theme,
- Epic page theme,
- Legendary page theme.

Verify all three inventory tiers retain their own palette every time.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
