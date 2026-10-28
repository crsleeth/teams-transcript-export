# Teams Transcript Export

Status: Working | Next: Fix if a Teams update breaks it

Copies a full Microsoft Teams meeting transcript to your clipboard. Teams only loads the part of the transcript on screen, so this script scrolls through all of it for you.

## Use

1. Open the meeting's transcript in Teams in your web browser.
2. Open the developer console (F12, then the Console tab).
3. Paste in [`teams-transcript-export.js`](teams-transcript-export.js) and press Enter. If the browser asks, type `allow pasting` first.
4. Wait for `N entries copied to clipboard`, then paste the transcript anywhere.

If it says `run copy(__t)` instead, type `copy(__t)` and press Enter.

## Troubleshooting

- `scroll container not found`: open the transcript so it's on screen, then run it again.
- Missing entries: change `wait(700)` to `wait(1500)` in the script.

Runs entirely in your browser; nothing is sent anywhere.

## License

MIT
