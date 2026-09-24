# Implementation Plan: 鹈鹕河岸饮水动画

**Branch**: `feat/pelican-water-animation` | **Date**: 2026-09-24 | **Spec**: [spec.md](spec.md)

## Summary

Replace the cyclist landing page with a more polished editorial-style scene centered on an original pelican at a riverbank. Redraw the inline SVG illustration, choreograph a visible dip-and-swallow loop, and retain accessible playback controls.

## Technical Context

**Language/Version**: HTML5, CSS3, modern browser JavaScript

**Primary Dependencies**: None; inline SVG artwork

**Storage**: N/A

**Testing**: Browser walkthrough at desktop and 360px width; interaction and reduced-motion checks

**Target Platform**: Current desktop and mobile browsers

**Project Type**: Static web page

**Constraints**: No remote resources or build step; honor reduced motion

**Scope**: One Chinese landing page, one original scene and playback controls

## Design

- Keep semantic page structure in `index.html`, visual layout and animation in `styles.css`, and state coordination in `app.js`.
- Use inline SVG for the pelican and layered riverbank so the page remains self-contained and the action parts can animate.
- Use CSS transforms and opacity for motion; use JavaScript only to coordinate loop timing, manual triggers, pause state, keyboard input and reduced-motion changes.
- Build a clear responsive hierarchy with a compact navigation row, expressive headline, dominant illustrated scene, and concise controls.

## Constitution Check

- Visual quality: the animal scene and composition are the primary deliverable.
- Accessibility: semantic headings, SVG description, keyboard-operable buttons, visible focus and live status.
- Motion: pause and reduced-motion behavior remain available.
- Simplicity: no framework, external dependencies or remote assets.
