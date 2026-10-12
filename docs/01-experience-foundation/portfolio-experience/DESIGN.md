# Portfolio Experience - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Portfolio Experience > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** The complete portfolio is both a professional website and an optional playable discovery layer, with the professional work remaining fully usable even when the visitor ignores every game system.

> This page is the canonical design documentation for **Portfolio Experience** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio must succeed first as a professional portfolio. The playable layer exists to demonstrate design thinking, reward curiosity, create memorable moments, and let visitors discover additional personality without making the professional content harder to evaluate.

The central design principle is **additive play**. A visitor can read projects, career history, consulting work, writing, tools, and contact information through conventional web interactions. A more curious visitor can also discover Signals, the Dev Console, collectibles, the Shop, Wishes, Doug systems, arcade encounters, the Finale, and the postgame completion layer.

The site should feel like it gradually reveals that it is more systemic than it first appears. It should not feel like a game that happens to contain a resume.

## Primary Audiences

The experience must support several visitor types at the same time:

- Recruiters and hiring managers who want a fast professional read.
- Developers and collaborators who want project and systems detail.
- Game designers who enjoy examining how the experience is constructed.
- Curious visitors who discover the hidden progression layer.
- Completion-oriented visitors who want to finish the full progression arc.
- Visitors who never engage with the game layer at all.

No audience should be required to play in order to reach the professional content.

## Experience Layers

### Professional Layer

The professional layer is always available and contains:

- Games and project work.
- Career history and resumes.
- Consulting work.
- Crafting Play material.
- Unreal Engine tools.
- About and contact information.

This layer uses normal links, buttons, headings, sections, cards, and external destinations.

### Discovery Layer

The discovery layer rewards exploration of ordinary portfolio surfaces. Examples include:

- Hidden Rare Signals.
- The Achievement Ledger.
- Hints and Cheat.
- The Dev Console.
- The Perspective Visualizer.
- Inspect Mode and Design Mode.

These systems should teach themselves through progressively clearer feedback.

### Play Layer

The play layer introduces active systems after the visitor has already encountered the professional site:

- Flying pickups.
- Rupees and Shop items.
- Hearts, Castles, Coolness, and Invasion.
- UFO combat.
- Mippi Bird.
- Shooting Stars and Wishes.
- Boss and Super Boss encounters.
- Dynamic Optional Objectives.

These systems may overlap the page, but must not permanently obstruct professional use.

### Closure and Postgame Layer

The site has an authored ending without becoming a one-way lockout:

- The normal Finale recognizes broad engagement.
- Continue Exploring returns the visitor to the portfolio.
- The post-Finale achievement tier reveals deeper completion goals.
- True completion unlocks the Music Player.
- The Music Player remains unlocked until a full reset.

## Core Design Rules

1. **Professional content is never gated by game progression.**
2. **Playful navigation is redundant with conventional navigation.**
3. **A game system may temporarily take attention, but it must provide an exit or resolve cleanly.**
4. **Failure should be low cost.**
5. **Progression should create curiosity rather than obligation.**
6. **The site can become increasingly strange, but the underlying information architecture remains stable.**
7. **Visual rarity and game state can decorate professional content, but they do not rewrite the content itself.**
8. **A visitor who does not understand a hidden system should still be able to use the website normally.**
9. **The Finale is an authored stopping point, not a content lock.**
10. **Reset must always provide a reliable path back to a first-visit state.**

## Discovery Philosophy

The opening experience should appear polished and professional before it reveals its deeper systems. The first discoveries are intentionally simple. The Mippi logo Signal is an example of a low-risk interaction that teaches the visitor that ordinary-looking surfaces may have secondary behavior.

As progression advances, systems can ask for more inference:

- Use a visualizer.
- notice an ambient object.
- use a hidden console.
- repair a fake Blueprint.
- understand a Wish prerequisite.
- build toward arcade escalation.
- recognize postgame completion goals.

The difficulty is primarily one of observation and system comprehension, not execution skill.

## Interruption Policy

Interruptions are allowed when they create a meaningful authored moment, but they should be scarce and readable.

Examples of valid interruption:

- A newly unlocked rarity.
- A Wish result.
- The Super Boss.
- The Finale.
- The post-Finale achievement reveal.

Examples of systems that should remain lightweight:

- Achievement toasts.
- Optional Objectives.
- Flying pickups.
- Shop affordability cues.
- Progress HUD attention glows.

The Adaptive Director and attention-budget systems exist partly to prevent too many playful systems from competing for the same moment.

## Graceful Degradation

The professional site must remain useful when optional technology fails.

If Three.js fails:

- Normal navigation remains available.
- Static professional content remains available.
- The Hero has a fallback presentation.
- The visitor can still evaluate the portfolio.

If local persistence is unavailable:

- The page should still load.
- The session may not retain progression, but the professional site must remain usable.

## Success Criteria

The Portfolio Experience is successful when:

- A professional visitor can understand the user's work without learning the game layer.
- A curious visitor can discover that the page contains deeper systems.
- Playful systems reinforce the identity of a game designer rather than distracting from it.
- Progression can be ignored, partially explored, or completed.
- The website remains understandable after theme changes, overlays, and late-game unlocks.
- The normal Finale feels like closure.
- True completion feels like a separate optional mastery layer.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
