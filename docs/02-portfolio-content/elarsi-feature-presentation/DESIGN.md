# Elarsi Feature Presentation - Design Documentation

**Introduced:** v3.05. **Current documented version:** v3.10.

## Purpose

Elarsi is the third featured side project in the Unreal Tools / side-project showcase, presented alongside Azure Altar and Unmark. It is an **audio utility**, not an Unreal Editor plugin. The feature gives visitors a concise explanation of a portable offline lyric-synchronization tool.

## Visitor presentation

The card describes line-by-line and word-by-word lyric timestamping, fixing existing timing, listening back to verify synchronization, and exporting **standard or enhanced LRC** files. Its title is **Elarsi**, with the identity **ELARSI // LRC STUDIO** and short labels for **LINE SYNC**, **WORD SYNC** and **LRC EXPORT**. The external **Explore Elarsi on GitHub** link opens `https://github.com/mippi-the-dork/Elarsi` in a new tab.

The illustration is a lightweight stylized waveform with lyric and timeline imagery, constructed using CSS rather than requiring another downloaded hero image or introducing another animation loop. This card respects Rare, Epic and Legendary site palette changes.

## Responsive layout

At desktop widths **1200px and wider**, Azure Altar, Unmark and Elarsi share a **three-column feature grid**. At narrower widths they reflow without clipped text, inaccessible links or uneven card hierarchy. The side-project cards should feel related without pretending all three tools have the same function or development status.

## Acceptance

Check that the three cards coexist in source order, Elarsi's external link works, all three theme treatments are legible, waveform art is decorative, and the layout retains complete copy at and around the 1200px breakpoint.

See [Technical](TECHNICAL.md) and [v3.10 QA](../../QA/V3_05_TO_V3_10_REGRESSION_QA.md).
