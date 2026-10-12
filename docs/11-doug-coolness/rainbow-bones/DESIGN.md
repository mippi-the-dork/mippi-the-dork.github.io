# Rainbow Bones - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Rainbow Bones > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Transforms active and newly spawned Doug Bones into rainbow-trailing pickups while Doug is in Cool Mode.

> This page is the canonical design documentation for **Rainbow Bones** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Rainbow Bones make Cool Mode visible outside the Doug card and the HUD.

If the player is reading another section, a normal Cool portrait change may be offscreen.

A rainbow Bone crossing the viewport tells them:

> Doug's limit state is active right now.

The effect therefore combines spectacle with gameplay communication.

## Active and Future Bones

The system must update both:

- Bones already on screen when Cool Mode begins,
- Bones spawned while Cool Mode is active.

Otherwise the transition would feel inconsistent.

## Presentation

A Cool Bone:

- animates through rainbow hue treatment,
- uses a bright white internal bone shape,
- emits a short rainbow particle trail while flying.

The trail follows the moving Bone rather than filling the whole screen.

## State End

When Cool Mode ends:

- active Bone rainbow treatment is removed,
- trail intervals stop,
- future Bones return to normal rarity treatment.

The cleanup is immediate even if a Bone itself remains in flight.

## Performance

Each active Rainbow Bone owns one lightweight trail interval.

The interval self-terminates if:

- Bone is removed,
- Bone loses Cool class.

A WeakMap tracks interval ownership so duplicate intervals are not created for the same Bone.

## Design Rules

- Cool Mode controls Rainbow Bone state.
- Existing Bones update immediately on activation.
- New Bones inherit current state.
- Trail remains local to Bone movement.
- Normal rarity Bone colors return after Cool Mode.
- Collection cleanup stops the effect.
- The effect should remain readable without obscuring content.

## Success Criteria

The player can recognize Cool Mode from a flying Bone even when Doug and the Coolness meter are outside their immediate focus.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
