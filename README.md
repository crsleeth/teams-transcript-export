# Teams Transcript Export

Status: Working script, published | Next: Test against future Teams UI changes

A small browser-console script that copies the full transcript of a Microsoft Teams meeting to your clipboard as plain text.

Teams only renders the part of a long transcript that's on screen, so selecting and copying by hand misses most of it. This script scrolls through the whole transcript, collects each entry once, and copies everything in order.

## Requirements

- Teams opened in a desktop web browser (Chrome, Edge, or Firefox) — for example at teams.microsoft.com. The desktop Teams app doesn't expose a console.
- A meeting with a transcript you're allowed to view.

## How to use

1. Open the meeting in Teams on the web and go to its **Transcript** (usually under the meeting's **Recap** tab).
2. Make sure the transcript entries are visible on screen.
3. Open the browser's developer console:
   - Chrome / Edge: `Cmd+Option+J` (Mac) or `Ctrl+Shift+J` (Windows)
   - Firefox: `Cmd+Option+K` (Mac) or `Ctrl+Shift+K` (Windows)
4. Copy the contents of [`teams-transcript-export.js`](teams-transcript-export.js), paste it into the console, and press **Enter**.
   - The first time, Chrome may ask you to type `allow pasting` before it lets you paste. Type that, press Enter, then paste again.
5. Wait while the transcript scrolls by itself. Long meetings can take a minute.
6. When it finishes, the console shows `N entries copied to clipboard`. Paste into any text editor.

If the console instead says `entries stored; run copy(__t)`, type this and press Enter:

```js
copy(__t)
```

## Troubleshooting

- **`scroll container not found`** — the transcript isn't on screen yet. Open the transcript panel, scroll it a little, and run the script again.
- **Entries are missing** — your connection may be slow. In the script, raise the `wait(700)` value to `wait(1500)` and run it again.
- **Duplicate lines are dropped** — entries with exactly the same text (speaker, time, and words) are only kept once. This is rare in practice since each entry includes a timestamp.

## How it works

- Finds transcript entries (`.ms-List-cell` or `[role="listitem"]`), keeping only the outermost match so nested elements aren't counted twice.
- Walks up from the first entry to find the scrollable container.
- Scrolls from top to bottom in steps of 80% of the visible height, reading entries after each step.
- Stops when scrolling no longer moves, joins the entries with line breaks, and copies them.

Everything runs locally in your browser. Nothing is sent anywhere.

## Note

Teams changes its page layout from time to time, which may break the selectors. Respect your organization's policies and meeting participants' privacy when exporting transcripts.

## License

MIT — see [LICENSE](LICENSE).
