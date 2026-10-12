# Interact Mode - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Interact Mode > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the player suppress ordinary portfolio interaction while keeping game-layer targets available for focused hunting and combat.

> This page is the canonical design documentation for **Interact Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Interact Mode solves a problem created by layering a game over a professional website.

The player can be trying to click:

- a flying pickup,
- a UFO,
- a Doug cameo,
- a Castle,
- another game-layer opportunity,

while the same pointer is also passing over:

- portfolio links,
- project cards,
- navigation controls,
- external resources,
- buttons.

Without a focus mode, hunting game-layer objects can accidentally activate ordinary website controls.

Interact Mode gives the player an explicit answer:

```text
INTERACT // ON
INTERACT // OFF
```

The label refers to normal portfolio interaction.

When it reads `OFF`, ordinary content is suppressed and the game layer remains available.

## Unlock

Interact Mode is not visible from the beginning.

It is unlocked by purchasing the Epic passive Shop item:

`Interact Toggle`

The unlock is permanent until full reset.

The player is therefore introduced to the mode only after they have already engaged with the game layer enough for the problem to make sense.

## What Interact Off Does

When normal portfolio interaction is OFF:

- main content becomes dimmer,
- ordinary links and controls stop accepting pointer input,
- game-layer interactions remain available,
- Castles remain clickable,
- Hero and Perspective canvases are visually suppressed as normal portfolio interaction surfaces,
- offscreen Doug cameo remains active and highlighted.

This makes the state feel like a dedicated "hunt the playful systems" layer.

## What It Does Not Do

Interact Mode does not:

- hide the portfolio,
- destroy layout,
- disable scrolling,
- disable the fixed game HUD,
- remove achievements,
- pause game timers,
- alter progression,
- change the active rarity theme.

It is a pointer-interaction filter.

## Player Ownership

The normal Interact setting belongs to the player.

They can toggle it whenever the Shop entitlement is owned.

That player preference is separate from temporary encounter overrides.

## Super Boss Override

The Super Boss temporarily uses the same suppression language.

If the player entered the encounter with ordinary portfolio interaction ON:

- the encounter forces it OFF,
- manual Interact changes are rejected,
- the original state is restored after the encounter.

If the player had already turned interaction OFF:

- the Super Boss does not create a second conflicting state,
- the player's preference remains intact afterward.

This reuse is intentional.

The encounter borrows an existing interaction rule rather than inventing another page-lock concept.

## Visual Treatment

The Interact control is part of the fixed bottom-right mode strip.

It follows the active world rarity:

- Rare: blue/cyan,
- Epic: pink/violet/cyan,
- Legendary: gold/teal.

The active suppressed state receives a stronger highlight.

## Accessibility

The control updates:

- visible text,
- tooltip,
- `aria-pressed`.

The control is completely hidden before entitlement rather than shown as a permanently disabled button.

## Design Rules

- Hide the control before Shop ownership.
- `INTERACT // OFF` means ordinary portfolio interaction is suppressed.
- Game-layer interactions must remain available.
- Do not change layout when toggling the mode.
- Do not disable document scrolling.
- Super Boss override has temporary priority.
- Restore the player's prior state after Super Boss.
- Mode does not affect progression or theme.
- The control remains usable through pointer and keyboard input.

## Success Criteria

Interact Mode succeeds when the player can deliberately hunt game-layer objects without accidentally opening professional links and can return to normal browsing with one click.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
