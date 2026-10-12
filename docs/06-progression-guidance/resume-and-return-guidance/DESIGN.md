# Resume and Return Guidance - Design Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Resume and Return Guidance > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Restores enough context on later visits that returning players can understand what they were doing without replaying the entire introduction.

> This page is the canonical design documentation for **Resume and Return Guidance** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Persistence creates a new UX problem.

A player can return days later with:

- Epic unlocked,
- a partially completed Shop,
- a Wish charge,
- Castle progress,
- incomplete Finale requirements,
- postgame goals.

The site should not assume they remember the exact next step.

At the same time, it should not replay the entire onboarding sequence every visit.

Resume and Return Guidance exists to restore context without treating the visitor like a first-time player.

## Return Philosophy

A returning player should be able to answer three questions quickly:

1. What major progression have I already earned?
2. Is anything actionable right now?
3. What broad direction remains?

The answer can come from the existing UI:

- Achievement Ledger.
- theme availability.
- progression meters.
- Shop ownership.
- Trace HUD.
- attention cues.
- Finale-ready brand mark.
- Music Player if already completed.

## No Forced Recap

The site should not force a full-screen recap on every return.

A portfolio visitor may only want to check a project or resume.

Persistent game guidance should remain ambient unless the player actively engages with it.

## Actionable Return States

Examples of especially useful resume cues:

### Wish Charge Held

Dev Console should pulse.

### Blueprint Repair Needed

Dev Console should show the repair-oriented cue.

### Shop Purchase Available

Rupee HUD should pulse if the player can afford an available item.

### Hearts or Castles Ready

The completed meter should display claim state.

### Finale Ready

Mippi logo should pulse.

### Postgame Incomplete

Ledger and Hint systems should expose remaining mastery goals.

## Design Rules

- Do not replay first-discovery tutorial every visit.
- Use current state rather than chronological assumptions.
- Prioritize immediately actionable states.
- Preserve professional browsing freedom.
- Avoid forced modals on normal return.
- Persistent completion should remain visually legible.

## Success Criteria

A returning player can reorient themselves within seconds without the site replaying an onboarding sequence they already understand.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
