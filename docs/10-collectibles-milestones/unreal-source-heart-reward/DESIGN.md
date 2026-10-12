# Unreal Source Heart Reward - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Unreal Source Heart Reward > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses the claimed five-Heart milestone to present the Unreal Source reward instead of automatically interrupting the player.

> This page is the canonical design documentation for **Unreal Source Heart Reward** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The five-Heart reward turns a classic videogame collectible payoff into a professional community recommendation.

The reward line is:

`IT'S DANGEROUS TO GAME DEV ALONE! TAKE THIS.`

The "item" is Unreal Source.

The point is that the most valuable resource for game development is often other developers who have already solved the strange problem you just found.

## Reward Content

The popup includes:

- Full Hearts context,
- Unreal Source identity,
- a short community message,
- Accept,
- No Thanks.

Accept links to the Unreal Source Discord.

No Thanks simply closes the popup.

The player is never forced off-site.

## Player Agency

The reward only appears after the player:

1. reaches 5/5 Hearts,
2. clicks the claim-ready Hearts meter.

This is deliberate.

The community reward should feel earned without interrupting another activity.

## Professional Relationship

Unreal Source also appears normally in the Tools section.

The Heart reward is therefore a playful second route to a legitimate professional resource.

The game layer reinforces the portfolio rather than hiding the only useful link behind progression.

## Accept vs Decline

Both are valid outcomes.

Declining does not remove Heart completion or punish the player.

Accepting opens an external community link and closes the popup shortly afterward.

## Design Rules

- Reward is never automatic at 5/5.
- Accept is optional.
- Decline has no penalty.
- Professional resource remains available elsewhere.
- Popup must not imply affiliation beyond the existing public community recommendation.
- Full Hearts reward claim remains persistent after either choice.

## Success Criteria

The Heart arc ends with a memorable joke that also gives the player a real useful Unreal-development resource.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
