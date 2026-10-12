# Control Strip Ordering - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Control Strip Ordering > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps the bottom-right mode controls in the final Design, Inspect, Interact, Hint order while separating console and theme controls into the left discovery dock.

> This page is the canonical design documentation for **Control Strip Ordering** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio accumulated several fixed controls over time.

Without deliberate grouping, the bottom of the screen can become a row of unrelated debug buttons competing with:

- achievement notifications,
- progression HUD,
- Optional Objectives,
- Dev Console discovery,
- theme selection.

The final v2.78 organization separates controls by purpose.

## Bottom-Right Mode Strip

The interaction and analysis controls are visually ordered:

```text
DESIGN
INSPECT
INTERACT
HINT
```

Not every player sees every item.

### Design

Hidden until the Shop capstone is purchased.

### Inspect

Always available.

### Interact

Hidden until Interact Toggle is purchased.

### Hint

Always available and remains the rightmost affordance.

This produces a stable conceptual order even as conditional controls appear.

## Why This Order

### Design Before Inspect

The two commentary modes belong together.

Design is the more advanced late-game layer and appears immediately beside Inspect once unlocked.

### Interact After Commentary Modes

Interact changes what the player can click.

It is an input/focus mode rather than an explanation mode.

Placing it after Design and Inspect separates those mental models.

### Hint Rightmost

Hint is not a mode.

It is an assistance action.

Keeping it at the far right makes it visually distinct from the three mode toggles.

## Left Discovery Dock

The bottom-left dock contains discovery/progression access such as:

- Achievement Ledger trigger,
- Theme selector,
- Dev Console visible tip.

The Dev Console tip was deliberately moved out of the Ledger.

The Console is too important to remain hidden inside an expanded panel.

## Notification Relationship

The mode controls are positioned below the toaster-notification region.

This reduces overlap between persistent controls and transient notices.

## Separate DOM, Unified Visual Row

HINT is not inside the `.play-mode-controls` DOM container.

It is independently fixed at the far right.

The mode cluster is positioned just to its left.

This makes the visual sequence:

```text
Design -> Inspect -> Interact -> Hint
```

while preserving Hint's existing independent behavior.

## Mobile Behavior

On smaller screens:

- the mode cluster shifts inward,
- it can wrap,
- Hint stays right-aligned,
- button sizing reduces slightly.

The controls should remain usable without taking the full width of the page.

## Design Rules

- Visual order is Design, Inspect, Interact, Hint.
- Design and Interact disappear when not entitled.
- Inspect remains available.
- Hint remains rightmost.
- Theme and Console discovery stay in the left dock.
- Do not place Design or Inspect back inside Achievement Ledger controls.
- Fixed controls must not obscure toaster notifications.
- Mobile can wrap rather than shrink to illegibility.
- Mode controls follow rarity theme.

## Success Criteria

A player can understand the bottom fixed UI at a glance: explanation modes first, interaction focus next, help last.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
