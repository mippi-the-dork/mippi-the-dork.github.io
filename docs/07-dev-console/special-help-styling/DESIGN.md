# Special Help Styling - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Special Help Styling > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Preserves special treatments such as the rainbow Wish command and the red Blueprint repair state inside clickable Help output.

> This page is the canonical design documentation for **Special Help Styling** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Help is not only a command list.

It can communicate live state.

Two commands are especially important:

- Wish
- Blueprint

The command names should visually communicate when those systems are actionable.

## Wish Styling

`wish` is always intended to remain readable.

It receives animated rainbow text treatment as a special command identity.

When a Shooting Star charge exists, the styling becomes more energetic.

The key requirement is:

> the letters themselves remain visible.

Glow must never replace the glyph fill.

## Blueprint Error Styling

When BP_WishManager is broken, `blueprint` should look like an error or repair requirement.

The command becomes a warm red/orange attention state.

It should still be clickable.

## Live Updating

If Help is already visible when Wish or Blueprint state changes, the visible command buttons should update in place.

The player should not need to clear and rerun Help.

## Design Rules

- Wish remains legible in all states.
- Rainbow treatment applies to glyphs, not only text shadow.
- Blueprint error is clearly different from normal command text.
- Hover/focus styling does not wipe special command styling.
- State styling updates live.
- Styling does not change command behavior.

## Success Criteria

The Help list doubles as a lightweight live status surface without sacrificing readability.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
