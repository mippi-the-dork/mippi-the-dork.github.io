# Physical Reward Drops - Design

**Introduced:** v3.01. **Current documented version:** v3.01.

## Rupee economy

Rupees earned by meaningful player interactions and enemy defeats now **spawn as world pickups first**. They are propelled outward from the trigger, fall under gravity, bounce over the bottom hotbar, and wait for a real collection click before incrementing the wallet.

Natural interaction chance is about **24% for regular controls**, and **56% for external HTTP(S) link interactions**, which can produce **two or three** Rupees. These probabilities are not a payout guarantee. To prevent farming, an individual control has about an 11-second cooldown, a global 700ms minimum interval and at most 10 successful interaction drop events per rolling minute. Defeating a UFO can award a Rupee drop, and Boss/Super Boss rewards also arrive as physical pickups.

## Hearts

Hearts no longer occur in ordinary ambient random pickup selection. Natural Hearts come from defeated enemies only: regular UFO about **5%**, regular Boss **guaranteed 1**, Super Boss add about **10%**, defeated Super Boss **guaranteed 1**. Hearts physically fall and must be collected to progress their five-heart meter or award post-cap Bird lives.

The developer-only `dev pickup heart` path can force a Heart for testing. The old player command `hey listen` explains the new Heart source rather than spawning an ambient Heart. This does not contradict the enemy-only *natural* rule.

## Interaction contract

Drops are actual controls with click/touch targets, not automatic economy grants. They are non-hostile, do not become targets for the new upward-only player bullets, and should remain collectible near the HUD without colliding with navigation. Natural Hearts/Rupees, Star Power and Mushroom pathways have distinct sources and lifetimes.

See [Technical](TECHNICAL.md) and [Gameplay QA](../../QA/V3_00_V3_01_GAMEPLAY_QA.md).
