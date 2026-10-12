# Footer and Return to Top - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Footer and Return to Top > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides site closure, copyright information, and a safe return-to-top action that avoids collisions with fixed HUD controls.

> This page is the canonical technical documentation for **Footer and Return to Top** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

```html
<footer class="site-footer">
  <span>© 2026 MIPPI THE DORK // DESIGN SYSTEM // ONLINE</span>
  <a href="#top" id="return-to-top">Return to top ↑</a>
</footer>
```

The anchor retains a valid `href="#top"` fallback.

## Base Layout

`.site-footer` uses the shared maximum width:

```css
width: min(var(--max), calc(100% - 40px));
```

It is a flex row at wider widths with a minimum height of 116px.

At `max-width: 720px`, it becomes a vertical column and receives a larger minimum height.

## Bottom Clearance

Current postgame polish adds:

```css
.site-footer {
  padding-bottom: 40px;
}

@media(max-width:760px) {
  .site-footer { padding-bottom: 52px; }
}
```

This protects the footer from fixed lower-screen controls.

## Return to Top JavaScript

`script.js` installs an explicit handler:

```js
document.querySelector('#return-to-top')?.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
```

The explicit handler exists because sticky-header and layout combinations can make ordinary anchor scrolling inconsistent across browser states.

## Fallback

If JavaScript does not run, the anchor still targets `#top`, which is the header ID.

## QA

- Scroll to the absolute bottom with the full progression HUD visible.
- Confirm copyright and Return to Top are not covered.
- Click Return to Top and verify smooth movement to `0,0`.
- Disable JavaScript and verify the anchor fallback still reaches the header.
- Test narrow viewport footer stacking.
- Test Rare, Epic, and Legendary link contrast.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
