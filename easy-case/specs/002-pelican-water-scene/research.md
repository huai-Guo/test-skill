# Research: 鹈鹕河岸饮水动画

## Decisions

### Original inline SVG scene

- **Decision**: Draw the pelican, shoreline and water with inline SVG.
- **Rationale**: The repository is a self-contained static page; SVG remains crisp at all viewports and allows scene parts to animate independently.
- **Alternatives considered**: Remote illustration assets add network dependency and make the drinking motion difficult to coordinate; canvas reduces accessibility and editability.

### CSS motion coordinated by small JavaScript state machine

- **Decision**: Use CSS keyframes for the dip, swallow, water ripples and ambient scenery; use JavaScript timers for automatic/manual sequence and controls.
- **Rationale**: The action is a short repeating visual cycle, and CSS transforms keep motion lightweight.
- **Alternatives considered**: Frame-by-frame canvas animation adds unnecessary complexity for one scene.

### Browser-based acceptance review

- **Decision**: Verify the actual page in a browser at desktop and phone widths, then exercise controls and reduced-motion behavior.
- **Rationale**: Visual hierarchy and animation quality need direct rendering review.
- **Alternatives considered**: A new automation framework would add dependencies to a static page; no such framework exists in the project.
