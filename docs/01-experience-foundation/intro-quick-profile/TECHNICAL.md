# Intro Quick Profile - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Intro Quick Profile > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides an immediately scannable summary of role, experience, and specialization near the top of the page.

> This page is the canonical technical documentation for **Intro Quick Profile** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The Quick Profile is a semantic section:

```html
<section class="section intro-strip"
         aria-label="Quick profile">
  <div><strong>25+</strong><span>Years in Games</span></div>
  <div><strong>Design</strong><span>Direction + Systems</span></div>
  <div><strong>Indie</strong><span>Consultation</span></div>
  <div><strong>UE5</strong><span>Tools + Workflow</span></div>
</section>
```

It has no JavaScript dependency.

## Desktop Layout

`.intro-strip` is a four-column CSS grid:

```css
grid-template-columns: repeat(4, 1fr);
```

It uses the shared content width inherited from `.section`, removes the normal section padding, and uses borders to read as a single panel.

Each internal item uses a grid layout with a value and label.

## Narrow Layout

At `max-width: 720px`:

```css
.intro-strip {
  grid-template-columns: repeat(2, 1fr);
}
```

Borders are adjusted so the 2 by 2 grid remains visually coherent.

## Visual Behavior

The strip has minor theme and hover presentation in CSS, but its content and DOM structure do not change with progression.

## Accessibility

The section has `aria-label="Quick profile"`.

The content is real text rather than canvas or image text, so it remains available to assistive technology and copy/paste.

## QA

- Verify all four values are visible at desktop width.
- Verify a clean 2 by 2 layout at narrow width.
- Verify no horizontal overflow.
- Verify Rare, Epic, and Legendary themes preserve text contrast.
- Verify disabling JavaScript does not remove the Quick Profile.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
