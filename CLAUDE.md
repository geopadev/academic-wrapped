# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic Wrapped is a mobile-first SPA for university students — a focus timer + task manager + social feed + "Spotify Wrapped"-style weekly analytics dashboard. Built for a university module with strict technology constraints.

## Architecture

Pure client-side SPA with no build step. Open `client/index.html` directly in a browser or serve it with any static file server. There are no dependencies to install for the frontend.

```
client/
  index.html   — single HTML file, no <html>/<head>/<body> tags (HTML5 optional syntax, intentional)
  style.css    — all styles, BEM naming, CSS custom properties in :root
  script.js    — all JS, type="module", no bundler
```

The SPA pattern: all views exist in the HTML simultaneously, hidden via `.view--hidden` (`display: none`). `showView(id)` hides all views then removes the hidden class from the target.

## Strict Rules (from AI_RULES.md — must be followed at all times)

**Banned JS:** `var`, `XMLHttpRequest`, `document.write()`, `require()`, `alert()`, `prompt()`, `confirm()`

**Required:** `const`/`let` only. `fetch()` for HTTP. ES6 `import`/`export` for modules. `document.createElement` for DOM creation.

**No frameworks:** No React, Vue, Angular, Tailwind, Bootstrap. Vanilla JS, HTML5, native CSS only.

**CSS:** BEM strictly — `.block`, `.block__element`, `.block--modifier`. No generic class names.

**Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` appropriately.

## Current State (Phase 2 in progress)

**Done:**
- Full mobile UI shell (fixed header, bottom tab nav, scrollable main, timer modal)
- Navigation logic — `showView()`, `data-target` nav links, `.bottom-nav__item--active` toggling
- Timer modal open/close — CTA button opens, backdrop closes
- Pomodoro timer — `startPomodoro()`, `startTicking()`, phase transitions (work→break→work), `BREAKS` object, `playBeep()` via Web Audio API
- `formatTime(seconds)` → `MM:SS` string
- `showElement(el, className)` / `hideElement(el, className)` helper functions

**In progress:**
- Refactoring timer UI: countdown moves to `site-header__countdown` in the header (replaces `site-header__title` during active session), CTA button repurposed as stop button (`isTimerRunning` flag controls dual behaviour)
- Flowtime (count-up + break suggestion) and Feynman (checklist) not yet implemented

**Pending:**
- Dummy JS array for sessions + `renderSessions()` with `document.createElement`
- Phase 3: Express server, REST API, `fetch()` integration
- Phase 4: WebSockets, PWA, PostgreSQL/Prisma

## Key JS State Variables

```js
let timeRemaining    // seconds left in current phase
let intervalId       // setInterval return value, null when stopped
let currentPhase     // "work" | "break"
let completedSessions // increments each time a work phase ends
let isTimerRunning   // boolean, controls CTA button dual behaviour
```

## Key Constants

```js
DURATIONS = { pomodoro: 1500, flowtime: null, feynman: null }
BREAKS    = { pomodoro: { short: 300, long: 900 } }
```
Long break triggers when `completedSessions % 4 === 0`.

## Socratic Tutor Mode

This project is being built as a learning exercise. Claude's role is defined in `AI_RULES.md`: explain concepts and architecture, never write complete functions or code blocks for the user. The user writes all syntax themselves.
