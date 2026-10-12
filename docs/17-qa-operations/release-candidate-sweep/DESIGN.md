# Release Candidate Sweep - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Release Candidate Sweep > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Defines the final packaging, validation, local smoke, hosted smoke, and signoff sequence for a shippable portfolio release.

> This page is the canonical design documentation for **Release Candidate Sweep** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Release Candidate Sweep is the final answer to:

> We think this build is done. What happens before it becomes public?

It is not a replacement for the extensive QA plan.

It is the final high-value pass after the candidate has already survived feature testing.

The sweep focuses on:

- packaging correctness,
- startup,
- current version,
- public-only file set,
- major progression,
- high-risk regressions,
- hosted reality.

## Candidate Freeze

Once the release sweep begins, avoid opportunistic unrelated polish.

Every late change restarts at least the relevant portion of the sweep.

A release candidate should be a stable target.

## Step 1: Package Hygiene

Verify:

- correct package version,
- no `__pycache__`,
- no `.pyc`,
- no local preview scripts,
- no debug HTML,
- no `*_DEV.md`,
- no clearly unused dead assets.

## Step 2: Static Validation

Run:

- JavaScript syntax checks,
- duplicate ID checks,
- CSS brace validation,
- local asset reference checks,
- startup mock,
- DOM-enabled startup mock.

## Step 3: Clean Local Cold Load

Launch a fresh:

```text
PreviewLocal.bat
```

session.

Do not rely on an already-open server tab.

Verify:

- correct v2.80 version,
- no startup Console errors,
- current CSS/JS visible,
- Three.js either loads or gracefully falls back,
- Heavy Water visualizer works independently.

## Step 4: Reset Verification

Use public reset.

Confirm:

- storage clears,
- scroll returns top,
- page performs real reload,
- Three.js restarts,
- no stale postgame state remains.

## Step 5: Fast DEV State Sweep

Use hidden DEV commands to cover:

- Rare,
- Epic,
- Legendary,
- Finale-ready,
- postgame,
- Music,
- Bosses,
- Objectives,
- Director states,
- attention cues.

DEV exists to make this practical.

## Step 6: Natural Critical Path

Perform at least one natural progression run through:

```text
Rare Signals
-> Epic
-> Shooting Star
-> Blueprint failure
-> repair
-> validated Wish
-> Legendary
-> normal Finale
-> postgame reveal
```

It does not need to naturally earn every postgame achievement every release if the extensive plan already covered those states, but the main progression flow must be real.

## Step 7: Responsive / Layout Smoke

Check:

- desktop,
- narrow desktop/tablet,
- mobile-width layout.

High-risk fixed surfaces:

- bottom-right modes,
- Hint,
- left discovery dock,
- progress HUD,
- Optional Objective,
- Music Player,
- Finale buttons.

## Step 8: Hosted Deployment Smoke

After publishing, open a fresh production session.

The hosted site is the final truth.

Verify:

- correct version,
- current assets,
- no missing-case paths,
- current Three.js behavior,
- no dev-only files exposed by deployment package,
- core external links,
- persistence,
- reset.

## Signoff Standard

Release only when there are no known:

- startup blockers,
- progression blockers,
- stuck overlays,
- stale projectiles,
- inaccessible controls,
- broken public links,
- broken reset paths,
- unexplained Console errors.

Minor cosmetic issues can be triaged separately only if they do not break readability or progression.

## Design Rules

- Freeze candidate before final sweep.
- Validate package contents.
- Cold-load locally.
- Test public reset.
- Use DEV for state breadth.
- Use natural flow for progression truth.
- Verify responsive fixed UI.
- Smoke the actual hosted site.
- Any startup/progression blocker fails release.
- Any uncaught runtime error requires investigation.

## Success Criteria

The release candidate is not merely "working on my machine"; it is packaged correctly, boots cold, survives reset, covers the major progression path, and works on the actual hosted URL.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
