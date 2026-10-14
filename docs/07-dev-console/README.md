# 07. Dev Console and Command Surface

**Hierarchy:** Documentation Home > Dev Console and Command Surface

Documents the diegetic developer console, its command discovery surface, special command states, hidden toys, and temporary QA tooling.

## Purpose

This category groups the canonical documentation for **Dev Console and Command Surface**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Dev Console** | Provides the site's command-line interaction surface for navigation, toys, debugging, progression hooks, and secret systems. | [Design](dev-console/DESIGN.md) | [Technical](dev-console/TECHNICAL.md) |
| **Console Input and History** | Handles command submission, command history, scrolling, focus, and pending multi-step command states. | [Design](console-input-and-history/DESIGN.md) | [Technical](console-input-and-history/TECHNICAL.md) |
| **Help Command** | Lists player-facing commands by category and supports direct command execution by clicking command names. | [Design](help-command/DESIGN.md) | [Technical](help-command/TECHNICAL.md) |
| **Special Help Styling** | Preserves special treatments such as the rainbow Wish command and the red Blueprint repair state inside clickable Help output. | [Design](special-help-styling/DESIGN.md) | [Technical](special-help-styling/TECHNICAL.md) |
| **Console Attention Cue** | Pulses the Dev Console control when a meaningful console action such as a charged Wish or Blueprint repair is waiting. | [Design](console-attention-cue/DESIGN.md) | [Technical](console-attention-cue/TECHNICAL.md) |
| **Console Navigation Commands** | Provides command shortcuts for major portfolio sections, projects, resumes, and external destinations. | [Design](console-navigation-commands/DESIGN.md) | [Technical](console-navigation-commands/TECHNICAL.md) |
| **Stats Commands** | Provides FPS, unit timing, session stats, and other readable runtime information through console commands and overlays. | [Design](stats-commands/DESIGN.md) | [Technical](stats-commands/TECHNICAL.md) |
| **Real FPS Sampling** | Uses actual requestAnimationFrame timing for browser-tab FPS when available and falls back to the existing estimate when necessary. | [Design](real-fps-sampling/DESIGN.md) | [Technical](real-fps-sampling/TECHNICAL.md) |
| **Reset Command** | Provides a two-step full reset flow that clears progression and performs a true page reload. | [Design](reset-command/DESIGN.md) | [Technical](reset-command/TECHNICAL.md) |
| **Blueprint Command** | Opens BP_WishManager and becomes visually urgent when the Wish path is broken. | [Design](blueprint-command/DESIGN.md) | [Technical](blueprint-command/TECHNICAL.md) |
| **Wish Command** | Consumes or requests a celestial charge and enters the console's special Wish input state. | [Design](wish-command/DESIGN.md) | [Technical](wish-command/TECHNICAL.md) |
| **Console Toy Commands** | Collects playful commands such as compile, shipit, joke, Lumen, Nanite, and other non-critical experiments. | [Design](console-toy-commands/DESIGN.md) | [Technical](console-toy-commands/TECHNICAL.md) |
| **Hidden Console Commands** | Defines deliberately undocumented commands such as god mode, please, and I know Mippi as optional easter eggs. | [Design](hidden-console-commands/DESIGN.md) | [Technical](hidden-console-commands/TECHNICAL.md) |
| **Temporary DEV Commands** | Provides hidden state-forcing commands for rapid QA without advertising them in the normal Help command. | [Design](temporary-dev-commands/DESIGN.md) | [Technical](temporary-dev-commands/TECHNICAL.md) |
| **DEV Snapshot** | Prints the current progression and runtime state so testers can verify what the site believes is active. | [Design](dev-snapshot/DESIGN.md) | [Technical](dev-snapshot/TECHNICAL.md) |
| **DEV Clean and Fresh** | Provides quick cleanup and clean-reset testing paths without requiring manual browser state management. | [Design](dev-clean-and-fresh/DESIGN.md) | [Technical](dev-clean-and-fresh/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
