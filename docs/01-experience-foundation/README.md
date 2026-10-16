# 01. Experience Foundation

**Hierarchy:** Documentation Home > Experience Foundation

Defines the overall portfolio shell, navigation, page structure, layout behavior, persistence, motion rules, and baseline interaction expectations.

## Purpose

This category groups the canonical documentation for **Experience Foundation**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Portfolio Experience** | The complete portfolio is treated as both a professional website and an optional game-like discovery experience without allowing the game layer to obscure the core work. | [Design](portfolio-experience/DESIGN.md) | [Technical](portfolio-experience/TECHNICAL.md) |
| **Site Shell and Page Layout** | Defines the global page structure, content containers, spacing rules, fixed UI layers, and the relationship between portfolio content and game-space UI. | [Design](site-shell-and-page-layout/DESIGN.md) | [Technical](site-shell-and-page-layout/TECHNICAL.md) |
| **Header Identity Block** | Presents the Mippi logo, name, role, and persistent identity treatment at the top of the site. | [Design](header-identity-block/DESIGN.md) | [Technical](header-identity-block/TECHNICAL.md) |
| **Primary Navigation** | Provides direct navigation between the six major portfolio sections while remaining compatible with the site game layer. | [Design](primary-navigation/DESIGN.md) | [Technical](primary-navigation/TECHNICAL.md) |
| **Major Portfolio Sections** | Defines the six tracked professional sections: Games, Career, Consulting, Crafting Play, Tools, and About. | [Design](major-portfolio-sections/DESIGN.md) | [Technical](major-portfolio-sections/TECHNICAL.md) |
| **Section Visit Tracking** | Records meaningful visits to the six major sections for progression, telemetry, Finale eligibility, and postgame completion. | [Design](section-visit-tracking/DESIGN.md) | [Technical](section-visit-tracking/TECHNICAL.md) |
| **Intro Quick Profile** | Provides an immediately scannable summary of role, experience, and specialization near the top of the page. | [Design](intro-quick-profile/DESIGN.md) | [Technical](intro-quick-profile/TECHNICAL.md) |
| **Footer and Return to Top** | Provides site closure, copyright information, and a safe return-to-top action that avoids collisions with fixed HUD controls. | [Design](footer-and-return-to-top/DESIGN.md) | [Technical](footer-and-return-to-top/TECHNICAL.md) |
| **Responsive Layout** | Adapts the portfolio, fixed controls, overlays, and game systems across desktop and narrower viewport sizes. | [Design](responsive-layout/DESIGN.md) | [Technical](responsive-layout/TECHNICAL.md) |
| **Keyboard and Focus Behavior** | Defines keyboard access, focus states, modal focus expectations, and non-mouse interaction for interactive controls. | [Design](keyboard-and-focus-behavior/DESIGN.md) | [Technical](keyboard-and-focus-behavior/TECHNICAL.md) |
| **Motion Policy** | Defines which motion is decorative, meaningful, suppressible, or replaced when reduced-motion preferences are active. | [Design](motion-policy/DESIGN.md) | [Technical](motion-policy/TECHNICAL.md) |
| **Persistent Save State** | Stores long-term progression and feature unlocks locally while separating them from temporary per-session state. | [Design](persistent-save-state/DESIGN.md) | [Technical](persistent-save-state/TECHNICAL.md) |
| **Full Reset** | Clears all persistent and session progression and reloads the site into a true first-visit state. | [Design](full-reset/DESIGN.md) | [Technical](full-reset/TECHNICAL.md) |
| **Unified Bottom HUD** | Four-column responsive HUD for progress, gameplay, modes and utilities. | [Design](unified-bottom-hud/DESIGN.md) | [Technical](unified-bottom-hud/TECHNICAL.md) |

| **Scoped Mushroom Cursor** | v2.98 scoped CSS cursor default, preserving native SVG visuals with reversible Legacy comparison. | [Design](scoped-mushroom-cursor/DESIGN.md) | [Technical](scoped-mushroom-cursor/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
