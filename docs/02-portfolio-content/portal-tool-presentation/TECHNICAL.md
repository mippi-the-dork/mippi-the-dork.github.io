# Portal Tool Presentation - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Portal Tool Presentation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Portal using the official Portal icon and its current project status within the Unreal Tools catalog.

> This page is the canonical technical documentation for **Portal Tool Presentation** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

Portal is currently represented by:

```html
<article class="tool-card wireframe"
         data-status="wip public">
  <img class="tool-icon"
       src="assets/tool-icons/portal.png"
       alt="" />
  <span class="tool-state">WIP · PUBLIC</span>
  <strong>Portal</strong>
  <small>Blueprint named reroutes</small>
  <a class="tool-github-link in-card"
     href="https://github.com/mippi-the-dork/Portal"
     target="_blank"
     rel="noreferrer">GitHub ↗</a>
</article>
```

## Asset

Canonical website asset:

```text
assets/tool-icons/portal.png
```

The v2.78 asset was replaced with the official user-supplied Portal icon.

## Filtering

Machine-readable state is:

```text
wip public
```

Therefore Portal appears for:

- All
- WIP
- Public

and is hidden for:

- Released
- Private

## Link Behavior

The only current public action is the GitHub repository.

The card itself is not wrapped in a release/store link.

## Styling

`.wireframe` distinguishes public WIP cards from released cards.

The icon uses the shared `.tool-icon` sizing and theme treatment.

## Future Release Migration

When Portal releases:

1. update `data-status` to `released public`,
2. remove WIP wireframe presentation if appropriate,
3. change visible `.tool-state`,
4. add FAB link only if a real listing exists,
5. retain GitHub link,
6. re-test filters.

## QA

- Confirm official icon loads.
- Confirm WIP/Public filtering.
- Confirm GitHub link.
- Confirm no false FAB action appears.
- Confirm icon remains legible in Rare, Epic, and Legendary themes.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
