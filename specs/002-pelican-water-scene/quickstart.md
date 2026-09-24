# Quickstart: 鹈鹕河岸饮水动画

## Preview

From the repository root:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`.

## Acceptance walkthrough

1. Confirm the first screen clearly presents an original pelican by a river.
2. Observe three automatic dip, swallow and reset cycles; check for visible jumps.
3. Trigger the drink action manually and confirm it returns to the previous play/pause state.
4. Pause and resume with the button and with Space when focus is outside controls.
5. At 360px width, confirm no horizontal page overflow and all content/control remains usable.
6. Enable reduced motion and reload; confirm automatic animation stops while the manual control remains usable.
7. Check the browser console for errors and network panel for unexpected remote requests.
