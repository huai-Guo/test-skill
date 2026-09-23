# Research: 醍醐的补水骑行

## Decisions

### Static HTML/CSS/JavaScript with inline SVG

- **Decision**: Use a dependency-free static page and draw the original scene with inline SVG plus CSS.
- **Rationale**: The repository has no existing application or framework. A static scene is quick to load, easy to host from GitHub Pages, and avoids remote image or font failures.
- **Alternatives considered**: React/Vite would add setup and dependencies without improving this single-page interaction; remote illustration assets would reduce control over the animation and require network access.

### CSS keyframes for continuous movement, JavaScript for state changes

- **Decision**: Animate wheel rotation, rider bob, scenery drift, and the ride/drink sequence with transform/opacity keyframes. Use JavaScript to coordinate play/pause and manual water breaks.
- **Rationale**: CSS keyframes are efficient for repeated motion; JavaScript is only needed to coordinate user-triggered state and preserve prior play/pause state.
- **Alternatives considered**: A frame-by-frame canvas loop would make the scene harder to scale, inspect, and support with reduced-motion settings.

### Manual browser end-to-end verification

- **Decision**: Verify the shipped page in a real browser at desktop and narrow mobile sizes, test controls with keyboard/pointer, and enable reduced motion during the run.
- **Rationale**: The principal acceptance criteria are visual choreography, usability, responsive composition, and user control. Browser inspection directly verifies them without installing an unnecessary test framework in an otherwise dependency-free project.
- **Alternatives considered**: A browser automation dependency would add a package manager and runtime to a static project; it is unnecessary for this small user-requested visual proof.
