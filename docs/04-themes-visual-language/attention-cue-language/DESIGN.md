# Attention Cue Language - Design Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Attention Cue Language > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the shared blink, pulse, flash, and glow language used to direct attention toward actionable progression UI.

> This page is the canonical design documentation for **Attention Cue Language** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio contains many systems competing for attention.

Attention cues must therefore be stateful.

A control should pulse because there is something useful to do now, not because the site wants everything to look exciting.

The core rule is:

> Pulse when clicking can immediately advance or claim a live system.

## Current Attention Uses

### Rupee HUD

The Rupee meter pulses when:

- Rupees have been discovered,
- at least one currently available Shop item is unowned,
- the wallet can afford at least one of those items,
- the Shop is not already open.

The cue stops when there is nothing actionable.

### Dev Console

The Dev Console control pulses when:

- a Wish charge is ready,
- or BP_WishManager requires repair.

Wish-ready follows the active theme.

Blueprint repair uses a warmer warning-oriented cue because it communicates a problem state.

### Hearts

At 5/5 Hearts, the Hearts meter becomes claim-ready.

The reward is not auto-opened.

The pulse teaches:

> this meter is now a button.

### Castles

At 4/4 Castles, the Castle meter becomes claim-ready.

Again, the reward waits for explicit click.

### Finale

When normal Finale eligibility is complete and attention is clear, the Mippi header icon pulses.

This reuses the brand mark as the final progression affordance.

### Coolness

Coolness has its own maxed feedback and can serve as a reference for how completed progression should attract attention without becoming an unrelated popup.

## Player Agency

Hearts and Castles intentionally changed from auto-reward behavior to claim-ready behavior.

This is a design improvement because the player controls when the reward takes over attention.

The same principle should be used for future milestone rewards unless immediate automatic presentation is essential.

## Theme Behavior

Attention cues respect the active page theme.

Rare:

- blue/cyan.

Epic:

- pink/violet/cyan.

Legendary:

- gold/teal.

Semantic warning cues may retain warm/orange/red support when appropriate.

## Intensity Rules

Attention animation should be:

- obvious enough to notice in peripheral vision,
- bounded to the actionable control,
- temporary when state resolves,
- not permanently flashing when no action exists.

The site already has ambient motion.

Attention cues should therefore be stronger than background motion but smaller than full authored overlays.

## Design Rules

- Do not pulse controls that are not actionable.
- Stop pulsing once the relevant destination is open.
- Stop pulsing after the state is resolved.
- Use theme-consistent color.
- Preserve semantic warning meaning where needed.
- Pair visual attention with updated text/title/ARIA state.
- Claim-ready meters must become actual interactive controls.
- Avoid adding multiple simultaneous high-intensity cues when attention budget can suppress or sequence them.

## Success Criteria

A player who becomes stuck should be able to notice the next actionable UI without the page turning into a field of blinking lights.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
