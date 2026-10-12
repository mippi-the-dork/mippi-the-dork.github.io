# Epic Theme - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Epic Theme > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the purple, pink, and cyan visual identity unlocked after completing the original Signal set.

> This page is the canonical technical documentation for **Epic Theme** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Unlock Condition

Epic visual availability is derived from:

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

The original set contains 10 Rare Signals.

## Body State

Epic is active when:

```text
theme-complete
```

is present and:

```text
theme-legendary
```

is absent.

Specific Epic-only selectors often use:

```css
body.theme-complete:not(.theme-legendary)
```

## Primary Variables

Epic overrides include:

```css
--bg:#0c0713;
--bg-deep:#07040d;
--bg-2:#171022;

--panel:rgba(27,17,39,.94);
--panel-2:rgba(34,21,49,.94);
--panel-3:rgba(17,10,27,.96);

--line:rgba(224,176,255,.16);
--line-strong:rgba(230,190,255,.30);
--line-blue:rgba(219,98,255,.52);

--text:#fbf7ff;
--muted:#c4b2d3;
--muted-2:#8d789f;

--accent:#b13cff;
--accent-bright:#e18cff;
--accent-soft:rgba(177,60,255,.18);
--accent-2:#67e8ff;
--hot-pink:#ff45bf;
```

## Background

The Epic body adds:

- violet radial light,
- cyan radial light,
- dark plum base.

The body scanline/grid treatment also becomes more visible.

## Heading Treatment

Major headings use a multi-color text gradient including:

- white,
- pale violet,
- bright violet,
- cyan,
- hot pink.

This treatment helps Epic read as a world-state upgrade rather than a single-variable accent change.

## Cursor Aura

`.completion-cursor-aura` becomes visible under:

```css
body.theme-complete
```

Cursor sparks use a short animation and screen blend.

The aura remains a visual-only fixed element with `pointer-events:none`.

## 3D Integration

Three.js scenes read `theme-complete` live each frame.

Epic affects:

- Hero core,
- Hero rings,
- Hero lights,
- Hero particles,
- Hero node colors,
- Ambient particles,
- About nodes,
- 3D motion intensity.

No scene reinitialization is required.

## Epic Pickup Styling

Epic-specific pickup styling appears under:

```css
body.theme-complete:not(.theme-legendary)
```

The intent is violet/pink/cyan with no accidental default-blue leftovers.

## Epic Attention Cues

Examples include:

Rupee Shop-ready pulse:

```css
rupee-shop-ready-epic
```

Console Wish-ready pulse:

```css
console-attention-epic
```

Milestone claim pulse:

```css
milestone-claim-ready-epic
```

These use hot pink plus cyan.

## Epic Achievement Rows

Postgame Epic achievement entries use:

```css
.ledger-entry.rarity-epic
```

with colors such as:

```text
#ff68ce
#c993df
#ff4fc8
```

These row colors are independent of active page theme.

## Epic Shop Sections

Epic Shop rarity variables include:

```css
--shop-rarity-primary:#b13cff;
--shop-rarity-secondary:#67e8ff;
--shop-rarity-hot:#ff4fc8;
```

Again, they are isolated from the active global theme.

## DEV Testing

Useful commands:

```text
dev epic
dev snapshot
```

Then cycle:

```text
Rare -> Epic
```

Verify Epic gameplay remains available even when Rare is selected.

## QA

- Epic unlock occurs at 10/10 Rare Signals.
- active Epic body has `theme-complete`.
- active Epic body does not require `theme-legendary`.
- Hero, Ambient, and About update without reload.
- fixed HUD and overlays use Epic palette.
- no accidental base-blue controls remain where they should be themed.
- rarity-owned Rare and Legendary items keep their own colors.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
