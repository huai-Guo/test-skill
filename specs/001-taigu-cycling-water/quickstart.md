# Quickstart: 醍醐的补水骑行

## Run locally

From the repository root, start a local static server:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173` in a browser.

## Browser acceptance walkthrough

1. At a desktop width, confirm the page identifies 醍醐 and the ride scene is visually balanced.
2. Watch at least three ride/drink cycles; confirm the rider, wheels, bottle, and scenery move coherently without snapping.
3. Pause, resume, and manually trigger a water break. Confirm the manual action returns to the previous animation state.
4. Use Tab, Enter, and Space to operate every control; confirm focus is visible and state labels update.
5. Set the viewport to 360 px wide; confirm no horizontal scrolling and all controls remain reachable.
6. Enable the operating system's reduced-motion preference and reload; confirm continuous animation stops while content and controls remain usable.
7. Check the browser console for errors and confirm the page does not request remote assets.
