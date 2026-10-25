# Pulse - a satisfying habit tracker

A static, installable web app (PWA). No build step, no dependencies, no server.

## Features
- Numeric, done/not-done and stay-below-a-maximum habits, with custom units, days and quick steps
- Animated progress ring, water-glass animation, completion bursts, optional sound/haptics
- XP and levels (awarded once per habit per day), achievements, schedule-aware streaks
- 7-day chart, 5-week heatmap, per-habit totals
- Light/dark theme, reduced-motion option, JSON/CSV export, JSON import, delete-all
- Works offline after the first visit (service worker)

## Deploy on GitHub Pages
1. Create a repo and push these files to the root of the `main` branch.
2. Repo **Settings > Pages > Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`.
3. Open `https://<you>.github.io/<repo>/`.

All paths are relative, so it works under a repo sub-path. The service worker needs HTTPS (GitHub Pages provides it) or `localhost`.

## Run locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000 (opening `index.html` directly works too, but without offline/install support).

## Install
Chrome/Edge/Android: browser menu > *Install app*. iOS Safari: Share > *Add to Home Screen*.

## Updating
When you change any cached file, bump `VERSION` in `sw.js` so users get the new version.

## Limits (honest notes)
- Data is stored in each browser's localStorage: no accounts, no sync between devices. Clearing site data erases it, so use Export for backups.
- A PWA cannot provide real Android/iOS home-screen widgets or guaranteed background reminders. Those need a native build (e.g. Expo + WidgetKit / Android App Widgets).
- Pulse is a habit tool, not a medical device.

## Files
- `index.html` - the whole app (HTML, CSS, JS)
- `manifest.webmanifest` - install metadata
- `sw.js` - offline cache
- `icon-192.png`, `icon-512.png`, `maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` - icons (all in the repo root)
