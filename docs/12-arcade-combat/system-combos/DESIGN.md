# System Combos - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > System Combos > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Recognizes meaningful interactions between independent systems such as Star Power, UFOs, Slowmo, Doug, Shop loadouts, and Legendary attacks.

> This page is the canonical design documentation for **System Combos** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

System Combos reward the player for discovering that the site's mechanics interact.

The portfolio contains many small systems.

Without explicit cross-system behavior, they would feel like isolated easter eggs.

System Combos communicate:

> The rules notice one another.

They are not another achievement tier.

The player should not feel obligated to collect every combo.

The reward is recognition.

## One-Time Feedback

Each recognized combo produces one session-scoped acknowledgement.

The player receives:

- Console feedback,
- a transient System Combo toast.

Repeating the same interaction continues to work mechanically but does not repeatedly interrupt the player.

## Current Explicit Combos

v2.78 explicitly announces five combinations.

### Star Power + UFO

Star Power cursor contact destroys a regular UFO.

### Star Power + Boss

Star Power cursor contact damages the normal Boss, with a short repeat-contact cooldown.

### Slowmo + UFO

New hostile UFO shots travel more slowly while Slowmo is active.

### Mushroom + Legendary

A larger Mushroom-powered cursor expands Legendary target-acquisition range.

### Star Power + Doug

Collecting a Doug Bone while Star Power is active gives a stronger Coolness increase.

## Broader Cross-System Behavior

Not every useful interaction receives a `SYSTEM COMBO` toast.

Other cross-system mechanics include:

- UFO kills awarding Rupees,
- Bosses awarding Rupees,
- Mippi Bird awarding Rupees,
- Shop loadouts changing flying-object timing,
- Golden Trigger modifying Legendary combat,
- Celestial Beacon changing Shooting Star cadence,
- Cool Mode changing Doug command behavior.

The explicit combo list is intentionally selective.

## No Achievement Checklist

System Combos do not create permanent achievements.

They do not appear as another 5/5 completion set.

They are session discoveries.

A Dynamic Optional Objective can ask the player to trigger any System Combo, but the combo system itself is not mandatory progression.

## Telemetry

Combo discovery contributes to the Player Model.

A player who experiments with interactions between mechanics can look more like a tinkerer or chaos-oriented player.

This is descriptive.

It does not alter the site's professional content.

## Design Rules

- Explicit combo feedback occurs once per session per combo ID.
- Repeated behavior remains functional.
- Combos are not achievements.
- No separate permanent completion checklist.
- Combo text explains the actual interaction discovered.
- Use combos for meaningful rule interactions, not every pair of active systems.
- Combo discovery can satisfy an Optional Objective.
- Theme changes do not change combo logic.

## Success Criteria

Players who experiment across systems are rewarded with confirmation that the interactions were intentional.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
