# Achievement Toasts - Design Documentation

## Current v3.25.2 verified update

v3.16 introduces individual recognizable SVG glyphs for the ten Rare, nine Epic and one Legendary achievements. Their owned rarity colors persist across global themes, and achievement toasts reuse the same visual identity while leaving unlock behavior unchanged.

---

## Original historical reference

**Hierarchy:** Documentation Home > Achievements and Discovery > Achievement Toasts > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides transient achievement, hint, and system notifications without requiring the Ledger to be open.

> This page is the canonical design documentation for **Achievement Toasts** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Achievement Toasts provide immediate feedback without forcing the player into a modal screen.

They should answer:

- what happened,
- why it matters,
- whether it was a Rare, Epic, or Legendary achievement.

The toast should feel celebratory but lightweight.

## Presentation Priority

Toasts are lower priority than:

- Finale,
- Super Boss,
- Shop,
- Blueprint repair,
- authored Wish overlays.

They should not obscure the controls of those larger experiences.

## Information Hierarchy

A toast can contain:

- rarity,
- achievement title,
- short description,
- completion or reward context.

The title should be the strongest element.

## Rarity Treatment

Toast rarity is based on the achievement being unlocked, not the current global theme.

This is important.

A Rare achievement unlocked while the page is Legendary still appears as Rare.

## Duration

Toasts should stay long enough to be read but leave automatically.

The player should not need to close routine achievement feedback.

## Stack Behavior

The system should avoid creating an unreadable pile when several achievements resolve at once.

Where possible, unlocks should sequence or reuse one toast surface.

## Relationship to Ledger

The toast is immediate feedback.

The Ledger is long-term reference.

Anything important enough to be persistent should appear in the Ledger even after the toast is gone.

## Design Rules

- Never require toast interaction for progression.
- Do not place critical instructions only in a disappearing toast.
- Match toast rarity to achievement rarity.
- Preserve readability over visual spectacle.
- Do not let global theme overwrite achievement rarity identity.
- Keep the toast above normal page content and below focused modal experiences.

## Success Criteria

The player notices a newly earned achievement without losing control of the page or needing to open the Ledger immediately.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
