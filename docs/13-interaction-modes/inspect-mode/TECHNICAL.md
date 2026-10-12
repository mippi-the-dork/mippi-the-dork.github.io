# Inspect Mode - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Inspect Mode > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides an early, hover-driven explanation layer describing what annotated systems are doing without changing their layout or behavior.

> This page is the canonical technical documentation for **Inspect Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Toggle

The persistent key is:

```text
mippi-inspect-mode
```

Startup reads:

```js
inspectPref =
  localStorage.getItem(
    INSPECT_KEY
  ) === '1';
```

Then:

```js
setInspectMode(
  inspectPref,
  {telemetry:false}
);
```

## Body State

Inspect Mode toggles:

```text
inspect-mode
```

on `body`.

## Control

The fixed control is:

```text
#inspect-toggle
```

It is always available.

Inactive text:

```text
Inspect Mode
```

Active text:

```text
Inspect Mode: On
```

## Mutual Exclusion

When enabling Inspect:

```js
if(
  active &&
  !skipDesign &&
  document.body.classList.contains(
    'design-mode'
  )
){
  setDesignMode(
    false,
    {
      telemetry:false,
      skipInspect:true
    }
  );
}
```

## Persistence Write

Every mode change writes:

```js
localStorage.setItem(
  INSPECT_KEY,
  active ? '1' : '0'
);
```

## Telemetry

Actual state changes record:

```text
modes.inspectToggles
meaningful: inspect_mode
```

Hovering new targets records:

```text
modes.inspectHoverCount
modes.inspectTargets
meaningful: inspect_target
```

## Annotation Attribute

Inspect targets use:

```text
data-dev-note
```

Some are authored directly in HTML.

Others are attached during startup through a selector/note table.

## Shared Tooltip

One tooltip is created dynamically:

```js
const inspectTooltip =
  document.createElement(
    'div'
  );

inspectTooltip.className =
  'inspect-tooltip';

document.body.appendChild(
  inspectTooltip
);
```

## Pointer Resolution

A global passive `pointermove` listener checks whether:

```text
inspect-mode
```

or:

```text
design-mode
```

is active.

For Inspect it searches:

```js
event.target.closest(
  '[data-dev-note]'
)
```

## Positioning

The tooltip is fixed-position and follows the pointer.

Default offset is approximately:

```text
+16 px X
+18 px Y
```

The runtime:

- flips horizontally when needed,
- raises the tooltip when close to the viewport bottom,
- clamps final right/bottom overflow.

This keeps notes readable near viewport edges.

## Layout Neutrality

CSS explicitly neutralizes target decoration:

```css
body.inspect-mode
[data-dev-note] {
  outline:0 !important;
}

body.inspect-mode
[data-dev-note]::after {
  display:none !important;
  content:none !important;
}
```

The source comments explicitly state that annotation mode must not mutate positioning or target geometry.

## Console

Player command:

```text
inspect
```

toggles the same mode.

## DEV

Mode forcing is also available through the DEV mode command family.

## QA

- Enable from button.
- Enable from Console.
- Reload while active.
- Hover top-left, top-right, and bottom viewport targets.
- Verify tooltip clamps correctly.
- Hover complex fixed/absolute targets.
- Confirm no layout movement.
- Turn Design Mode on.
- Confirm Inspect turns off.
- Trigger the inspection Optional Objective.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
