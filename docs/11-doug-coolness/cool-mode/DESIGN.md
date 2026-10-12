# Cool Mode - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Cool Mode > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Temporarily turns a full Coolness meter into an active Doug limit state with special visuals, Rainbow Bones, and stronger pet-driven spawn behavior.

> This page is the canonical design documentation for **Cool Mode** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Cool Mode is the payoff for filling Doug's Coolness meter.

The meter is not decorative progress. Reaching the limit changes what Doug can do.

The intended loop is:

1. Doug assumes command through repeated petting.
2. Doug Bones begin appearing.
3. Bone pickups build Coolness.
4. Coolness reaches 100 percent.
5. Doug enters Cool Mode.
6. Bones become rainbow objects.
7. Petting Doug becomes much more powerful.
8. The state ends and the meter visibly drains back to zero.

This turns Doug from a one-off character joke into a temporary game-state modifier.

## Limit-State Philosophy

Cool Mode is deliberately temporary.

If maximum Coolness were permanent, the meter would stop creating anticipation after the first completion.

The temporary window gives the player a reason to act while the limit state is active.

During that window, each pet after Doug is in command can authorize an immediate legal flying interaction.

Outside Cool Mode, command-state pets only build spawn momentum.

This makes the limit state mechanically distinct rather than merely giving Doug sunglasses.

## Duration

The active Cool Mode window lasts approximately 10.5 seconds.

At the end of that window, Coolness drains rapidly back to zero instead of disappearing instantly.

The drain gives the player visual closure and makes the meter feel like a real temporary resource.

## Refresh Behavior

Collecting Coolness while Cool Mode is already active refreshes the active timer.

The player cannot build beyond 100 percent.

The meaningful reward for further Coolness during the limit state is more time, not a larger meter.

## Visual Identity

Cool Mode changes several Doug surfaces together:

- Doug's main image switches to the theme-specific Cool image.
- Offscreen Doug cameos can use the Cool presentation.
- Active and newly spawned Bones become rainbow Bones.
- The Coolness meter becomes a rainbow limit meter.
- Doug's reaction text can acknowledge maximum Coolness.

The result should read as one coherent system state.

## Theme Relationship

Cool Mode sits above the current global rarity theme.

Rare, Epic, and Legendary still determine which Doug Cool image is used.

The Coolness meter itself switches to a rainbow limit presentation so the active state is unmistakable in every rarity.

## Postgame Relationship

Reaching maximum Coolness at least once records the historical condition used by the Epic postgame achievement:

`Maximum Cool`

The player does not need to be in Cool Mode at the exact moment the postgame Ledger is revealed.

The milestone is historical.

## Design Rules

- Cool Mode begins at 100 percent.
- The meter never exceeds 100 percent.
- Active duration is temporary.
- Further Coolness while active refreshes the timer.
- Cool Mode changes behavior, not only appearance.
- Rainbow Bones exist only while Doug's Cool visual state is active.
- Maximum Cool history is persistent even though the active state is temporary.
- The active mode should never gate professional portfolio content.

## Success Criteria

Cool Mode succeeds when the player sees the meter approaching full, deliberately chases the final Bone, and immediately understands that Doug has entered a temporary higher-power state.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
