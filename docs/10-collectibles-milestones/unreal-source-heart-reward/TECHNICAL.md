# Unreal Source Heart Reward - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Unreal Source Heart Reward > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses the claimed five-Heart milestone to present the Unreal Source reward instead of automatically interrupting the player.

> This page is the canonical technical documentation for **Unreal Source Heart Reward** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Claim Function

`claimHeartReward()` requires:

```js
heartCount>=5
```

and:

```js
!heartRewardShown
```

## Claim State

On claim:

```js
heartRewardShown=true;
```

Telemetry:

```text
heart_reward_unlocked
heart_reward_claimed
```

Persistence:

```text
mippi-heart-reward-v1
```

is set to `1`.

Then:

```js
updateHeartMeter();
openUnrealGift();
```

## Popup

Static root:

```text
#unreal-gift-popup
.unreal-gift-popup
.wish-special-popup
```

Dialog label:

```text
IT'S DANGEROUS TO GAME DEV ALONE! TAKE THIS.
```

## External Asset

The Unreal Source logo currently loads from:

```text
https://unrealsource.com/content/images/2024/04/site-logo.svg
```

The popup remains semantically readable if the external image fails.

## Accept

`#unreal-gift-accept` points to:

```text
https://discord.gg/unrealsource
```

with:

```text
target="_blank"
rel="noreferrer"
```

The click records:

```text
unreal_source_reward_accepted
```

then closes the popup after roughly 100 ms.

## Decline

`#unreal-gift-decline` records:

```text
unreal_source_reward_declined
```

then closes immediately.

## Close Model

The reward does not include a separate X button in v2.78.

The explicit choices are:

- Accept,
- No Thanks.

Global Escape handling also closes the Unreal gift popup.

## Finale Relationship

Normal Finale eligibility currently requires:

```js
heartCount>=5
```

in the direct eligibility helper shown in v2.78, while the experience also persists the reward-claimed state for claim flow and documentation.

Release QA should verify the intended product rule and the implementation remain aligned if Finale requirements are changed in a later version.

## QA

- reach 5/5,
- verify popup does not open automatically,
- claim,
- Accept,
- verify Discord destination,
- repeat from fresh state and choose No Thanks,
- verify Heart completion remains,
- reload and verify reward does not re-arm after claim.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
