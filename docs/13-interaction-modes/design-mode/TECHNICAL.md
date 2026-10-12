# Design Mode - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Design Mode > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Unlocks a late-game hover commentary layer explaining why systems were designed the way they were.

> This page is the canonical technical documentation for **Design Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Entitlement

Persistent entitlement key:

```text
mippi-design-mode-unlocked-v1
```

Runtime:

```js
let designModeUnlocked=false;
```

Startup loads the key.

Shop ownership of:

```text
design-mode-unlock
```

also repairs/migrates entitlement if necessary.

## Preference

Persistent on/off key:

```text
mippi-design-mode
```

Startup reads:

```js
designPref =
  localStorage.getItem(
    DESIGN_KEY
  ) === '1';
```

It only restores Design Mode when entitlement is currently valid.

## Body State

Design Mode toggles:

```text
design-mode
```

on `body`.

## Lock Check

`setDesignMode(true)` refuses activation when:

```js
!designModeUnlocked
```

and shows:

```text
DESIGN MODE // LOCKED
```

with Shop mastery guidance.

## Mutual Exclusion

When Design activates and Inspect is active:

```js
setInspectMode(
  false,
  {
    telemetry:false,
    skipDesign:true
  }
);
```

## Control Availability

`updateDesignModeAvailability()` sets:

```text
hidden
disabled
title
```

on:

```text
#design-toggle
```

When entitlement disappears during QA/reset, the function also turns off an active Design Mode.

## Control Text

Inactive:

```text
Design Mode
```

Active:

```text
Design Mode: On
```

## Annotation Attribute

Design targets use:

```text
data-design-note
```

A large `DESIGN_NOTES` selector table attaches multi-sentence rationale to many existing DOM surfaces at startup.

Some notes are authored directly in HTML.

## Shared Tooltip

The same `.inspect-tooltip` root is used.

When Design is active the runtime adds:

```text
design
```

to the tooltip.

The Design variant increases maximum readable width and applies theme-specific rationale styling.

## Hover Telemetry

New design targets record:

```text
modes.designHoverCount
modes.designTargets
meaningful: design_note
```

## Layout Neutrality

CSS explicitly removes target-level debug styling:

```css
body.design-mode
[data-design-note] {
  outline:0 !important;
}

body.design-mode
[data-design-note]::after {
  display:none !important;
  content:none !important;
}
```

## Console

Typed command:

```text
design
```

checks entitlement, then calls the same toggle.

Normal Help includes `design` only when unlocked.

## DEV

```text
dev mode design on
dev mode design off
```

can create entitlement for QA when forcing Design on.

## QA

- Verify control hidden before capstone.
- Type `design` before entitlement and verify lock message.
- Purchase capstone.
- Verify control appears but does not auto-enable.
- Enable Design and hover diverse targets.
- Verify Inspect shuts off.
- Reload and verify preference.
- Disable, reload, verify disabled preference.
- Full reset and verify entitlement/control are gone.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
