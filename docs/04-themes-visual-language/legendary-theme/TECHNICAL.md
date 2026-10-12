# Legendary Theme - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Legendary Theme > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the gold, amber, and teal visual identity unlocked through the validated Wish progression.

> This page is the canonical technical documentation for **Legendary Theme** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Unlock Condition

Legendary visual availability requires:

```js
epicUnlocked && legendaryUnlocked
```

Legendary progression is set by the validated Wish path.

## Body State

Legendary uses both:

```text
theme-complete
theme-legendary
```

This is intentional.

CSS can inherit Epic completion structure while Legendary overrides visual identity.

## Primary Variables

Legendary overrides include:

```css
--bg:#0d0a05;
--bg-deep:#080603;
--bg-2:#171006;

--panel:rgba(35,25,10,.94);
--panel-2:rgba(45,31,11,.94);
--panel-3:rgba(20,14,6,.96);

--line:rgba(255,214,119,.14);
--line-strong:rgba(255,220,135,.27);
--line-blue:rgba(224,164,44,.48);

--text:#fffaf0;
--muted:#c9b88f;
--muted-2:#8f7d58;

--accent:#c78512;
--accent-bright:#ffc63d;
--accent-2:#ffe49a;
--accent-soft:rgba(218,151,25,.13);
```

## Body Background

Legendary adds:

- gold radial light,
- warm brown secondary radial light,
- warm dark base.

## Heading Gradient

Major headings use a warm gradient:

```text
white -> pale gold -> bright gold -> amber -> pale cream
```

This is applied through background clipping.

## Header

Legendary header overrides include:

- warmer background,
- gold bottom border,
- gold brand mark border,
- warm inset glow.

The Mippi logo is recolored with CSS filtering.

## 3D Hero

`script.js` creates a dedicated `legendaryFx` group.

It includes:

- wireframe shell,
- gold ring,
- teal ring,
- 12 tetrahedral shards.

The group is toggled live based on `theme-legendary`.

## Teal Cleanup

Legendary contains explicit overrides for remaining blue UI accents.

Examples include:

- timeline dates,
- credit-line accents,
- WIP tool note,
- project links,
- resource actions,
- Heavy Water camera treatment,
- Doug effects.

This avoids visual conflict between warm gold and default blue.

## Legendary Pickups

Legendary pickup SVGs use combinations such as:

Heart:

```text
orange fill
pale warm stroke
```

Rupee:

```text
teal fill
pale teal stroke
```

Key:

```text
gold fill
pale yellow stroke
```

Doug Bones:

```text
warm fill
teal stroke
```

## Finale Ready Cue

Legendary explicitly defines:

```css
body.theme-complete.theme-legendary.finale-ready .brand-mark
```

with:

- gold border,
- gold glow,
- teal secondary glow,
- brightness increase,
- scale pulse.

Animation:

```text
finale-logo-pulse-legendary
```

## Legendary Attention Cues

Examples:

- `rupee-shop-ready-legendary`
- `console-attention-legendary`
- `milestone-claim-ready-legendary`

These combine gold with teal support.

## Music Player

The Music Player follows the active theme.

Legendary treatment uses gold/teal while preserving the same header placement and controls.

Music Player unlock status is progression-owned and does not depend on Legendary being the currently selected visual theme.

## DEV Testing

Useful commands:

```text
dev legendary
dev finale ready
dev attention rupees
dev attention wish
```

Then cycle back to Rare and Epic to confirm Legendary progression remains active.

## QA

- Legendary unlock persists.
- active Legendary body has both classes.
- Hero Legendary geometry is visible.
- gold/teal palette is coherent.
- Finale-ready header glow is visible.
- Rupee, console, Heart, and Castle attention cues are visible.
- Rare and Epic rarity-owned entries keep their own colors.
- Legendary gameplay remains usable in Rare and Epic visual themes.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
