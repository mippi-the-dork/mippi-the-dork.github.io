# Omni Tool Presentation - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Omni Tool Presentation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Omni using the official Omni icon and its current project status within the Unreal Tools catalog.

> This page is the canonical technical documentation for **Omni Tool Presentation** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

Omni is currently:

```html
<article class="tool-card wireframe"
         data-status="wip public">
  <img class="tool-icon"
       src="assets/tool-icons/omni.png"
       alt="" />
  <span class="tool-state">WIP · PUBLIC</span>
  <strong>Omni</strong>
  <small>Area navigation links</small>
  <a class="tool-github-link in-card"
     href="https://github.com/mippi-the-dork/Omni"
     target="_blank"
     rel="noreferrer">GitHub ↗</a>
</article>
```

## Asset

Canonical website asset:

```text
assets/tool-icons/omni.png
```

The v2.78 asset uses the official user-supplied Omni icon.

## Filtering

Machine-readable state:

```text
wip public
```

Omni therefore appears under All, WIP, and Public.

## External Link

Current public destination:

```text
https://github.com/mippi-the-dork/Omni
```

No FAB listing is shown.

## Future Migration

On release:

- set `data-status="released public"`,
- update `.tool-state`,
- remove or change `.wireframe`,
- add store link only if available,
- preserve GitHub access,
- re-test the filter matrix.

## QA

- Verify official icon.
- Verify GitHub link.
- Verify filter inclusion/exclusion.
- Verify no released/FAB styling is shown.
- Verify icon treatment across all three site themes.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
