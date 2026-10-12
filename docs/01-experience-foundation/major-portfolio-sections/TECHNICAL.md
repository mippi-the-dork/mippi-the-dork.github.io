# Major Portfolio Sections - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Major Portfolio Sections > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the six tracked professional sections: Games, Career, Consulting, Crafting Play, Tools, and About.

> This page is the canonical technical documentation for **Major Portfolio Sections** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Canonical IDs

The six tracked sections are:

| Section | DOM ID | `data-scene` |
| --- | --- | --- |
| Games | `games` | `games` |
| Career | `career` | `career` |
| Consulting | `consulting` | `consulting` |
| Crafting Play | `crafting` | `crafting` |
| Tools | `tools` | `tools` |
| About | `about` | `about` |

All six are semantic `<section>` elements in `index.html`.

## CSS Structure

Most sections use `.section`.

Consulting and Tools currently also use `.alt`, which expands the visual background to full width while preserving central content alignment.

`.section` provides:

- shared maximum width,
- horizontal inset,
- large vertical padding,
- anchor `scroll-margin-top`.

## Dependency Surface

These IDs are referenced by:

- Primary Navigation.
- Dev Console navigation commands.
- Three.js Hero signal navigation.
- telemetry section tracking.
- Optional Objectives.
- normal Finale eligibility.
- postgame Grand Tour achievement.
- Player Model calculations.
- Session Report metrics.

Changing an ID requires a coordinated migration across these systems.

## Tracking Set

Session tracking includes the six major sections plus the Hero.

Postgame persistent section tracking uses:

```js
const POSTGAME_MAJOR_SECTIONS =
  ['games','career','consulting','crafting','tools','about'];
```

The Hero is intentionally not part of postgame completion.

## QA

After changing section structure:

1. Run every header link.
2. Run console navigation commands for the affected section.
3. Click Hero signal navigation where applicable.
4. Use `dev snapshot` to inspect section state.
5. Scroll naturally and verify section visit telemetry.
6. Verify the Finale broad-engagement check.
7. Verify Grand Tour requires all six.
8. Confirm no section content became progression-gated.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
