# Test Skill Constitution

## Core Principles

### I. Intentional Visual Design
Every user-facing page MUST have a clear visual hierarchy, deliberate typography, coherent spacing, and a purposeful color system. Shipped interfaces MUST replace placeholder content and visibly reflect the requested concept.

### II. Accessible Interaction
Interactive controls MUST use semantic elements, remain keyboard operable, and expose understandable labels and state. Text and controls MUST remain legible at supported viewport sizes.

### III. Motion With User Control
Animation MUST be smooth at ordinary desktop and mobile sizes, avoid unnecessary layout work, and respect `prefers-reduced-motion`. Any persistent motion MUST have a clear way to pause or reduce it.

### IV. Verifiable Behavior
Every user-visible interaction MUST have an observable expected result. Changes MUST be checked in a browser at desktop and narrow mobile widths; interaction and animation controls MUST be exercised before delivery.

### V. Minimal, Maintainable Implementation
Choose the simplest implementation that meets the experience requirements. Add dependencies only when they materially improve the result, and keep source organized so visual behavior can be adjusted without fragile workarounds.

## Technical Constraints

- The initial project is an empty repository. Prefer a self-contained static web page unless the feature needs a framework or build tool.
- Create original in-project SVG/CSS artwork when no user-provided visual assets exist; do not depend on remote assets for the core scene.
- Keep layout and animation responsive. Provide a reduced-motion presentation.

## Development Workflow

- Describe user outcomes and acceptance criteria in the feature specification before implementation.
- Review the plan and task list for coverage of accessibility, responsive behavior, motion control, and browser verification.
- Run the repository's checks and perform a browser review before creating a PR.
- Keep the main branch as the base; deliver the feature from a dedicated branch and do not merge it.

## Governance

This constitution applies to user-facing work in this repository. Feature specifications, plans, implementation, and reviews MUST comply with its principles. Amendments MUST be made deliberately and versioned: increment MAJOR for incompatible governance changes, MINOR for new principles or material additions, and PATCH for clarifications. Review each pull request for visual quality, accessibility, motion preferences, and evidence that the relevant checks passed.

**Version**: 1.0.0 | **Ratified**: 2026-09-23 | **Last Amended**: 2026-09-23
