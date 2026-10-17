# Boss UFO - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Boss UFO > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the normal multi-hit boss encounter and satisfies the normal Finale's boss requirement.

> This page is the canonical design documentation for **Boss UFO** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The normal Boss is the first major escalation of the arcade thread.

Regular UFOs teach:

- one-hit targets,
- cursor dodging,
- airborne timing.

After ten successful contacts, the Boss asks the player to sustain attention for several hits.

It should feel larger without becoming a separate full-screen game.

## Six-Hit Core

The Boss has:

```text
6 core integrity
```

Both visual health bar and explicit text communicate remaining health.

This is intentionally redundant.

The player should not have to infer Boss durability from animation alone.

## Escalating Volleys

The Boss becomes more aggressive as health falls.

Early health uses a relatively simple volley.

Mid health adds spread pressure.

Low health uses a wider three-part pattern.

This creates escalation inside the encounter without changing the control vocabulary.

## Flight Window

The Boss still travels through the page.

The encounter is therefore time-limited.

The player can:

- defeat it,
- let it escape,
- continue using the rest of the portfolio.

## Escape Recovery

Letting the Boss escape is not treated as a hard failure.

The next Boss opportunity is moved closer.

The player generally needs only four additional regular UFO contacts instead of another full 10-kill cycle.

This respects the effort already invested in the encounter.

## Reward

Boss defeat awards:

```text
3 Rupees
```

and creates an eight-second airspace calm period.

It also satisfies the normal Finale's Boss requirement.

The normal Boss therefore has both:

- economy value,
- meta-progression value.

## Super Boss Relationship

The total number of successful Boss victories advances the longer three-contact arc.

Every third successful Boss slot becomes the Super Boss.

A normal Boss therefore matters beyond its immediate reward.

## Star Power

Star Power cursor contact can damage the Boss.

A short contact lockout prevents the 70 ms Star Power poll from deleting all six health points instantly.

## Design Rules

- Boss has six visible hit points.
- Boss stays on the portfolio layer rather than taking over the screen.
- Attack pressure rises as health falls.
- Escape never removes existing progression.
- Escape shortens reacquisition.
- Defeat gives 3 Rupees.
- Defeat satisfies normal Finale Boss requirement.
- Star Power can damage the Boss through a controlled repeat-contact cadence.

## Success Criteria

The Boss feels like the earned payoff of the ten-UFO cycle and teaches sustained combat before the later Super Boss encounter.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current v3.01 Behavior

v3.01 regular Boss follows top/right/bottom/left diamond movement until killed or its escape timer, and takes six hits. Guaranteed Heart and physical Rupee drops spawn on defeat. Earlier generic fly-across descriptions are historical.

See [Release History](../../RELEASE_HISTORY.md) for historical changes and superseded values.
