// Teams transcript export
// Paste into the browser DevTools console while a Teams meeting transcript is open.
// Scrolls the transcript list from top to bottom, collects every entry once,
// and copies the full text to the clipboard (or stores it in window.__t).
(async () => {
  const cp = typeof copy === 'function' ? copy : null; // capture before first await
  const sel = '.ms-List-cell, [role="listitem"]';
  // keep only outermost matches so nested elements aren't captured twice
  const items = () => [...document.querySelectorAll(sel)]
    .filter(e => !e.parentElement?.closest(sel));
  let box = items()[0];
  while (box && !(box.scrollHeight > box.clientHeight + 10 &&
         /auto|scroll/.test(getComputedStyle(box).overflowY))) box = box.parentElement;
  if (!box) return console.log('scroll container not found');
  const seen = new Map(), wait = ms => new Promise(r => setTimeout(r, ms));
  const grab = () => items().forEach(e => {
    const t = e.innerText.trim(); if (t) seen.set(t, 1); });
  box.scrollTop = 0; await wait(800);
  let last = -1;
  while (box.scrollTop !== last) {
    grab(); last = box.scrollTop;
    box.scrollTop += box.clientHeight * 0.8; await wait(700);
  }
  grab();
  window.__t = [...seen.keys()].join('\n');
  if (cp) { cp(window.__t); console.log(seen.size + ' entries copied to clipboard'); }
  else console.log(seen.size + ' entries stored; run copy(__t)');
})();
