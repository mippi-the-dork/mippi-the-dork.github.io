# Keyboard and Focus Behavior - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Keyboard and Focus Behavior > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines keyboard access, focus states, modal focus expectations, and non-mouse interaction for interactive controls.

> This page is the canonical design documentation for **Keyboard and Focus Behavior** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The professional portfolio must be navigable without precise pointer interaction.

Keyboard support is also part of the site's identity because the Dev Console and hidden commands intentionally reward keyboard use.

The design should distinguish between:

- standard web keyboard accessibility,
- authored keyboard shortcuts,
- game-like secret input.

Standard accessibility always takes priority.

## Standard Keyboard Path

A keyboard visitor should be able to:

- reveal and use Skip to Content,
- Tab through header navigation,
- activate links and buttons,
- see a strong focus indicator,
- operate the compact Menu,
- reach Return to Top,
- use visible modal actions.

## Skip Link

The first focusable page control is Skip to Content.

It remains visually hidden until focused, then appears near the top-left of the viewport.

This prevents keyboard users from having to traverse the full header on every visit.

## Focus Presentation

The default focus language is a clear accent outline.

Specialized controls can add their own theme-aware focus treatment, but they should not remove all visible focus feedback.

## Dev Console Keyboard Behavior

The Console intentionally supports:

- backtick or tilde to toggle,
- automatic focus of the command input when opened,
- Up and Down arrows for command history,
- Escape to close.

These are enhancements, not replacements for the visible console access control.

## Escape Behavior

Escape closes several active overlays when appropriate, including Shop, gift, selected Wish popups, compile popup, Blueprint, and Dev Console.

Systems that cannot safely close immediately may ignore Escape until they reach a valid exit state.

## Secret Input

The Konami sequence is listened for globally and can unlock its achievement.

Secret keyboard input must not interfere with typing into normal controls.

## Modal Expectations

Modal-style experiences should:

- visually communicate focus,
- provide an obvious close or continue path,
- restore usable page interaction after dismissal.

## Current Accessibility Limitation

The site has several elements with `role="dialog"` and `aria-modal="true"`, but it does not yet implement one centralized, universal focus-trap and focus-return manager for every modal.

Selected experiences, such as the Azure gallery, explicitly move focus, while other overlays rely more heavily on visible actions and page interaction blocking.

This should be treated as a known technical limitation rather than assumed complete modal accessibility.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
