# Doug Popup Cameo - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug Popup Cameo > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Summons an interactive offscreen Doug cameo after Bone pickups so Doug can react even when his About card is not visible.

> This page is the canonical design documentation for **Doug Popup Cameo** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Doug Bones can be collected anywhere on the site.

If Doug's only reaction existed inside the About section, a player collecting a Bone while reading Career or Tools would miss the character feedback.

The popup cameo solves that continuity problem.

If Doug's normal card is offscreen, Doug peeks up from the bottom of the viewport.

He remains pettable.

The reaction therefore follows the player instead of requiring the player to return to About.

## Trigger

The cameo appears after Bone collection when Doug's main card is not currently visible.

The message changes based on state.

### Normal Bone

`Doug approves this acquisition. Pet Doug.`

### Star Power Bone

`STAR POWER // Coolness surged. Pet the cool dog.`

### Cool Mode

`COOL MODE // Doug has reached maximum cool. Pet Doug.`

## Petting the Cameo

Popup Doug is not a decorative notification.

The entire visible cameo is an interaction surface.

Petting it:

- uses the same shared Doug pet chain,
- updates reaction copy,
- can advance Best Boy,
- can progress toward command state,
- can trigger command-state spawn behavior.

## Lifetime

A normal cameo remains visible for about 4.3 seconds.

If the player pets it, the cameo stays long enough to show the new reaction and then leaves sooner, after about 2.4 seconds.

## Interaction Mode

Popup Doug remains fully interactive during Interact Mode.

This is an important consistency rule.

Interact Mode suppresses normal professional content, but game-layer interactions the player is expected to touch must remain alive.

The cameo is explicitly lifted above the suppression treatment.

## Visual Treatment

Popup Doug uses:

- current rarity image treatment,
- Cool image when appropriate,
- hearts,
- theme-aware focus outline.

The button is deliberately stripped of native browser button chrome.

## Design Rules

- Only show cameo when main Doug is offscreen.
- Entire visible cameo is pettable.
- Use the shared Doug pet function.
- Remain interactive during Interact Mode.
- Change messaging for Star Power and Cool Mode.
- Respect current rarity and Cool image state.
- Remove itself automatically.
- Never cover the screen permanently.

## Success Criteria

Bone collection always feels connected to Doug, no matter which portfolio section the player is currently viewing.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
