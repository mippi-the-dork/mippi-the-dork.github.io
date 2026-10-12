# Doug In Command - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug In Command > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Turns repeated Doug petting into a spawn-assist system and makes petting increasingly useful after Doug assumes command.

> This page is the canonical design documentation for **Doug In Command** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Doug In Command is the point where repeated petting stops being only reactive flavor and begins influencing the live game layer.

The progression is intentionally absurd:

- petting Doug starts as a joke,
- repeated pets unlock Best Boy,
- enough pets put Doug in command,
- command-state pets begin authorizing air traffic.

This makes character interaction mechanically cumulative.

## Command Threshold

Doug's command mechanics become active after twelve pet interactions in the current runtime session.

The reaction copy continues progressing beyond that threshold, eventually reaching:

`Doug has assumed command.`

The mechanical command state itself begins at twelve.

## Normal Command Behavior

Outside Cool Mode, every command-state pet builds spawn momentum.

The player may receive a legal flying interaction early through a random chance.

If not, the third momentum pet guarantees a spawn attempt.

The player therefore gets:

- possible immediate response,
- bounded waiting,
- no endless bad-luck streak.

## Cool Mode Behavior

During Cool Mode, the momentum system is bypassed.

Every pet attempts one immediate legal flying interaction.

This is the strongest mechanical expression of Doug's limit state.

## Legal Air Traffic

Doug only chooses from systems that are currently legal.

Possible options include:

- Doug Bone once command state exists,
- standard flying pickup after Epic,
- Shooting Star after Epic if no Wish charge is held,
- regular UFO when arcade state permits it.

Boss states, Super Boss state, Wish charge state, and UFO cooldown state are respected.

Doug does not blindly spawn an illegal object.

## Weighted Choice

When Epic is available, standard flying pickups receive two entries in the candidate list.

This gives ordinary friendly traffic a slightly higher selection weight than each single special candidate.

## Dog Whistle Relationship

Dog Whistle changes the natural Bone scheduler.

It does not cause Doug to enter command sooner.

Command status still comes from petting.

## Persistence

Doug command state is runtime/session behavior in v2.78.

The CSS class is not stored as a long-term entitlement.

Reloading resets the pet counter and command-state buildup.

This keeps the system playful rather than making Doug command a permanent progression gate.

## Design Rules

- Command requires repeated petting.
- Command is not a normal achievement gate.
- Outside Cool Mode, pet momentum is bounded.
- During Cool Mode, every pet attempts immediate traffic.
- Spawn candidates must be legal at the moment of selection.
- Command state can exist before Epic, in which case Bones are the primary legal traffic.
- The system should never spawn Boss-illegal UFO traffic.
- Professional content remains unaffected.

## Success Criteria

The player discovers that continuing to pet Doug after Best Boy still matters and can actively shape the site's ambient game layer.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
