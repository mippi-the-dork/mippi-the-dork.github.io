# Doug Interaction - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug Interaction > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the core petting interaction chain on Doug's About card, including reactions, paws, the Best Boy achievement, and progression toward command state.

> This page is the canonical design documentation for **Doug Interaction** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Doug starts as a studio companion in the About section.

The player can simply read the callout and move on.

If they pet him, the site responds.

If they keep petting him, the responses continue changing.

If they keep going beyond the achievement, the interaction eventually becomes a real system.

This is deliberate escalation.

Doug is not a one-click easter egg.

## Physical Affordance

Doug's photo uses a grab cursor.

Hovering enlarges and rotates the image.

The interaction is meant to read like petting or grabbing the dog rather than clicking a conventional button.

## Reaction Chain

Doug has a sequence of short reactions that escalate with repeated petting.

Current reaction copy includes:

- Doug notices you.
- Head tilt engaged.
- You have his full attention now.
- This is becoming a meeting.
- Morale check passed.
- Doug would like this task deprioritized.
- Pet break has entered the sprint.
- Doug has assumed command.

The system advances approximately every two pets.

## Best Boy Achievement

At five pets, the player unlocks:

`Best Boy`

This is the early discovery payoff.

It proves that repeated interaction matters.

The interaction continues to have value after the achievement.

## Command Progression

At twelve pets in the current runtime session, the Doug card enters command state.

That unlocks Doug's spawn-assist behavior.

This is important design-wise:

> the achievement is not the end of the interaction chain.

## Paw Feedback

Every pet emits visible paw particles from the Doug source.

The number increases under Epic/complete presentation.

Paws are immediate feedback that the interaction registered.

## Shared Pet Function

Petting from the About card and petting popup Doug use the same core interaction function.

This ensures:

- same counter,
- same reactions,
- same achievement threshold,
- same command progression.

## Telemetry and Player Model

Doug petting contributes to:

- interaction telemetry,
- player-model behavior,
- Session Report commentary.

Doug is therefore recognized as a meaningful style of play.

## Design Rules

- First pet gives immediate reaction.
- Reactions continue across repeated pets.
- Best Boy unlocks at five.
- Interaction remains useful after Best Boy.
- Command mechanics activate at twelve.
- Popup Doug uses the same pet chain.
- Every pet has visible feedback.
- Doug never blocks access to About content.

## Success Criteria

The player learns that Doug is not just decorative and that continuing to interact can reveal deeper system behavior.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
