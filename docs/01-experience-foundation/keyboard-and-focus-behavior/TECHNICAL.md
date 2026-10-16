# Keyboard and Focus Behavior - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Keyboard and Focus Behavior > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines keyboard access, focus states, modal focus expectations, and non-mouse interaction for interactive controls.

> This page is the canonical technical documentation for **Keyboard and Focus Behavior** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Global Focus Styling

The core stylesheet defines:

```css
:focus-visible {
  outline: 2px solid var(--accent-bright);
  outline-offset: 3px;
}
```

Feature-specific controls may add their own `:focus-visible` rules.

## Skip Link

Markup:

```html
<a class="skip-link" href="#main">Skip to content</a>
```

CSS positions the link above the viewport until focus:

```css
.skip-link:focus { top: 12px; }
```

The target is `main#main`.

## Navigation

The compact Menu is a real button with:

- `aria-expanded`,
- `aria-controls="site-nav"`.

JavaScript synchronizes `aria-expanded` when opening and closing the navigation.

## Console Keyboard Handling

The console input listens for:

- `ArrowUp` to move backward through command history,
- `ArrowDown` to move forward through command history.

A global keydown handler:

- toggles the Dev Console on backtick or tilde when the console input is not already focused,
- handles Escape for supported open overlays,
- processes the Konami sequence.

Opening the Console schedules focus to `#console-input`.

## Focused Modal Example

The Azure gallery explicitly focuses its close control after opening with:

```js
azureGalleryClose?.focus({ preventScroll: true });
```

This is not yet abstracted into a general modal utility.

## Interaction Suppression

Some high-attention states disable pointer interaction on underlying content, but this does not automatically create a full keyboard focus trap. New modal implementations should not assume `pointer-events: none` is sufficient accessibility behavior.

## Recommended Technical Direction

If modal count continues to grow, centralize:

- previously focused element capture,
- initial focus selection,
- Tab containment,
- Escape policy,
- focus restoration,
- `aria-hidden` or inert handling for background content.

This should replace one-off focus behavior over time.

## QA

Keyboard-only sweep:

1. Reload at top.
2. Press Tab and confirm Skip to Content appears first.
3. Activate it and verify focus/position moves to main content.
4. Tab through header links.
5. At narrow width, open and close Menu with keyboard.
6. Open Dev Console with visible control and with backtick.
7. Verify input focus and command history.
8. Open major modal surfaces and confirm their close/continue actions are keyboard reachable.
9. Confirm Escape behavior for each supported overlay.
10. Confirm visible focus remains readable in Rare, Epic, and Legendary themes.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.98 Current Behavior

v2.98 Scoped enlarged cursor explicitly styles the body and interactive controls rather than applying `body.cursor-grown *` across the page. Native pointer fallback is attached directly to visible gallery, debrief, Finale, Compile, Shop, Blueprint, Wish, Unreal gift and Mippi Bird modal surfaces, avoiding legacy parent `:has()` matching. On blur/exit or with `native off`, the visitor should see the normal system pointer; input focus and keyboard navigation continue unaffected. The Legacy mode remains a test option.
