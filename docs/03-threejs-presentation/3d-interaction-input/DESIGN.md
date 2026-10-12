# 3D Interaction Input - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > 3D Interaction Input > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines drag, hover, click, pointer, and viewport behavior shared by the site's interactive 3D scenes.

> This page is the canonical design documentation for **3D Interaction Input** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

3D interaction on the portfolio should feel familiar enough that a visitor does not need a tutorial.

The primary input vocabulary is:

- move pointer to create subtle response,
- hover to discover interactive objects,
- drag to rotate,
- click to navigate.

The site deliberately avoids camera-control complexity such as:

- orbit-control widgets,
- zoom wheels,
- right-click camera modes,
- WASD movement,
- hidden modifier requirements.

The Hero is not a 3D editor.

## Input Ownership

Only the Hero scene is directly interactive.

The Ambient and About scenes respond visually but do not accept pointer input.

This separation prevents the whole page from feeling like an invisible canvas is stealing clicks.

## Pointer Feedback

The Hero uses three layers of feedback.

### Cursor

- `grab` over open scene space.
- `pointer` over a Signal.

### Mesh Response

Hovered Signal mesh scales up.

### Readout

The Hero readout changes from general scene state to the destination label.

These redundant cues matter because any one of them can be missed.

## Drag Behavior

Dragging rotates the Hero root.

The scene also has subtle passive pointer response, so the object feels alive before the visitor learns drag.

Drag input is intentionally low sensitivity.

The experience should feel like manipulating a presentation object, not controlling a first-person camera.

## Scroll Preservation

The Hero canvas uses:

```css
touch-action: pan-y;
```

The intent is to preserve vertical page scrolling while still allowing pointer interaction.

On narrow/touch contexts, normal portfolio scrolling remains more important than perfect 3D manipulation.

## Click Behavior

A click/release over a Signal navigates to the linked section.

Because the same surface supports drag and click, input handling must avoid accidental navigation where possible.

The current code does not yet classify drag distance separately, so this should remain in the QA matrix.

## Interact Mode

Interact Mode can intentionally disable professional interaction.

When active, the Hero canvas is disabled through CSS and the signal click handler also checks the mode.

This prevents the 3D canvas from bypassing the same interaction rules as normal links.

## Accessibility Rule

3D pointer input is optional enhancement.

Meaningful destinations remain available through standard HTML.

The canvas is `aria-hidden`, so assistive technology is not expected to interpret the 3D node layout.

This is intentional because semantic alternatives already exist.

## Viewport Behavior

The Hero and About scenes resize to their canvas bounds.

The Ambient scene resizes to the full viewport.

The input system should always calculate pointer position from the current Hero canvas rectangle rather than assume full-screen coordinates.

## Success Criteria

The interaction succeeds when:

- hover feels obvious,
- drag feels smooth,
- page scroll still works,
- Signals can be clicked accurately,
- noninteractive canvases never steal input,
- the site remains navigable without 3D pointer interaction.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
