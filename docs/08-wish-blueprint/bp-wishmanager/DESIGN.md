# BP_WishManager - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > BP_WishManager > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the deliberately broken Blueprint-themed repair screen used as the central Epic-to-Legendary progression puzzle.

> This page is the canonical design documentation for **BP_WishManager** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

BP_WishManager turns a familiar Unreal Engine runtime mistake into a playable portfolio puzzle.

The joke is recognizable to Unreal developers:

`Accessed None trying to read property WishFulfillment.`

The actual interaction remains simple enough that a visitor does not need to be a programmer.

The player is shown:

- Wish Event,
- Grant Wish,
- one suspicious direct execution path,
- a visible `+`,
- a hint to insert Is Valid.

## Puzzle Structure

The intended path is:

1. player has a Wish charge,
2. player tries `wish`,
3. Wish fails with Accessed None,
4. Console offers `FIX NOW`,
5. BP_WishManager opens,
6. player sees a possible runtime error,
7. player clicks `+`,
8. Is Valid is inserted,
9. graph rewires visually,
10. player closes the Blueprint,
11. player tries `wish` again.

The repair is not a syntax exercise.

It is a visual diagnosis joke.

## Visual Authenticity

The popup uses Unreal-like concepts:

- Event Graph title,
- toolbar,
- Event node,
- utility node,
- function node,
- execution pins,
- spline wires,
- graph status.

It intentionally stops before becoming a fake full Blueprint editor.

The goal is recognition, not simulation fidelity.

## Direct Wire vs Validated Wire

Before repair, Wish Event appears directly connected to Grant Wish.

After repair, the direct route is visually superseded by:

```text
Wish Event -> Is Valid -> Grant Wish
```

This makes the repair legible even without reading technical text.

## Status Communication

Broken:

`GRAPH STATUS // 1 POSSIBLE RUNTIME ERROR // CLICK + TO INSERT Is Valid`

Validated:

`GRAPH STATUS // WISH REFERENCE VALIDATED`

## Accessibility

The `+` is a real button with:

- accessible label,
- descriptive hint relationship.

The graph itself is largely visual, so the status line and Console repair text carry the important semantic information.

## Persistence Philosophy

The repair is session-scoped.

This fits the fiction that the player repaired the active runtime graph rather than permanently editing a real project asset.

The celestial charge is more persistent so failure remains recoverable.

## Design Rules

- Opening the Blueprint is allowed before failure.
- The broken state remains understandable without Unreal expertise.
- The `+` is visually obvious and centered.
- Repair happens with one deliberate action.
- Repair clears Console error attention.
- The Blueprint can be closed without losing same-session repair.
- The feature never modifies professional site content.
- The popup must remain readable in all three rarity themes.

## Success Criteria

An Unreal developer laughs at the reference, while a non-programmer can still infer "click plus to fix the broken path."
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
