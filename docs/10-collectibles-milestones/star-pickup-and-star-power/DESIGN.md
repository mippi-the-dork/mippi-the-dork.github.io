# Star Pickup and Star Power - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Star Pickup and Star Power > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Grants a temporary power state that affects movement, arcade interactions, and selected system-combo behavior.

> This page is the canonical design documentation for **Star Pickup and Star Power** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Star Power temporarily changes the player's relationship with moving game-layer objects.

Normally the player has to click a target precisely.

During Star Power, cursor contact itself becomes the collection interaction.

This makes the page feel briefly overpowered.

## Activation

Collecting a Star immediately starts Star Power.

The player receives:

- a rainbow cursor aura,
- rainbow sparks,
- automatic cursor-contact collection,
- temporary system-combo opportunities.

## Duration

Base duration:

```text
3.6 seconds
```

With Star Extender:

```text
5.6 seconds
```

The duration is intentionally short enough to feel like a burst state.

## Automatic Contact

During Star Power, the system checks what is currently under the cursor.

Supported contact targets include:

- Shooting Stars,
- standard game pickups,
- Doug Bones,
- UFO targets.

This lets the player sweep across moving opportunities instead of clicking each one.

## Arcade Interaction

Star Power creates special combinations.

Examples include:

### Star Power + UFO

Cursor contact can destroy regular UFO targets.

### Star Power + Boss

Cursor contact can damage a Boss with a brief repeat-contact lockout.

### Star Power + Doug

Collecting a Bone while powered gives a much larger Coolness increase.

These combinations are surfaced as one-time system-combo discoveries.

## Doug Bone Value

Normal Bone:

```text
+25 Coolness
```

Star-powered Bone:

```text
+50 Coolness
```

## Visual Language

Star Power uses a rainbow presentation even when the site is currently using a rarity theme.

The surrounding aura can still receive Legendary-specific treatment, but the rainbow identity remains important because it visually distinguishes temporary invulnerability/power from page rarity.

## Design Rules

- Temporary state only.
- Cursor contact replaces precision clicking for supported targets.
- Star Extender affects duration.
- Recollecting Star should restart the timer cleanly.
- Supported Boss interactions need a contact cooldown so one stationary overlap does not deal infinite damage.
- Combo announcements should occur once per combo discovery.
- Star Power does not persist through reload.

## Success Criteria

The player immediately feels a temporary "break the rules" power state and can discover satisfying interactions between previously separate systems.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## v3.05–v3.10 Current Specification

v3.05 restores rotating rainbow hue to the Star Power cursor contact ring. Its diameter still derives from Mushroom-scaled --cursor-click-radius; the ring's transform is not animated and reduced motion disables hue rotation.
