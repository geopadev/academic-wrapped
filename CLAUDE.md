# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic Wrapped is a mobile-first SPA for university students — a focus timer + task manager + social feed + "Spotify Wrapped"-style weekly analytics dashboard. Built for a university module with strict technology constraints.

## Architecture

Pure client-side SPA with no build step. Open `client/index.html` directly in a browser or serve it with any static file server. There are no dependencies to install for the frontend.

```
client/
  index.html        — single HTML file, no <html>/<head>/<body> tags (HTML5 optional syntax, intentional)
  style.css         — all styles, BEM naming, CSS custom properties in :root
  js/
    app.js          — entry point, imports and initialises all modules
    timer.js        — Pomodoro logic, state variables, setupTimer()
    navigation.js   — showView(), setupNavigation()
    api.js          — renderFeedPosts(), postSession()
    utils.js        — showElement(), hideElement()
server.mjs          — Express server, GET/POST /api/sessions, static file serving
data.json           — persistent session store (temporary, replaces with better-sqlite3 in Phase 4)
```

The SPA pattern: all views exist in the HTML simultaneously, hidden via `.view--hidden` (`display: none`). `showView(id)` hides all views then removes the hidden class from the target.

## Strict Rules (from AI_RULES.md — must be followed at all times)

**Banned JS:** `var`, `XMLHttpRequest`, `document.write()`, `require()`, `alert()`, `prompt()`, `confirm()`

**Required:** `const`/`let` only. `fetch()` for HTTP. ES6 `import`/`export` for modules. `document.createElement` for DOM creation.

**No frameworks:** No React, Vue, Angular, Tailwind, Bootstrap. Vanilla JS, HTML5, native CSS only.

**CSS:** BEM strictly — `.block`, `.block__element`, `.block--modifier`. No generic class names.

**Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` appropriately.

## Current State (Phase 4 complete, starting Phase 5)

**Done:**
- Full mobile UI shell (fixed header, bottom tab nav, scrollable main, timer modal)
- Navigation logic — `showView()`, `data-target` nav links, `.bottom-nav__item--active` toggling
- Timer modal open/close — CTA button opens, backdrop closes
- Pomodoro timer — `startPomodoro()`, `startTicking()`, phase transitions (work→break→work), `BREAKS` object, `playBeep()` via Web Audio API
- Timer UI in header — countdown replaces title during active session, CTA button doubles as stop button via `isTimerRunning` flag
- `formatTime(seconds)` → `MM:SS` string
- `showElement(el, className)` / `hideElement(el, className)` helper functions in `js/utils.js`
- `renderFeedPosts()` — fetches from `GET /api/sessions`, builds each `<article>` with `document.createElement`, appends to `.activity-feed`
- `postSession()` — POSTs completed session to `POST /api/sessions`, re-renders feed on success
- Express server (`server.mjs`) with `GET /api/sessions` and `POST /api/sessions` routes, SQLite persistence via `better-sqlite3`, `try/catch` error handling
- Modular client JS: `js/app.js` (entry), `js/timer.js`, `js/navigation.js`, `js/api.js`, `js/utils.js`
- WebSockets (`ws` library) — server broadcasts `newSession` events to all connected clients; client handles in `js/ws.js`
- PWA: Service Worker (`sw.js`) with cache-first strategy, `manifest.json`, offline support via `localStorage`
- Stub functions for `startFlowtime()` and `startFeynman()` (deferred to Phase 9)

**Known issues:**
- `DURATIONS.pomodoro` in `js/timer.js` may be set to `5` (seconds) for testing — **must be restored to `1500` before any demo or submission**.

**Pending:**
- Phase 5: Web Components & Templates (`<feed-post>`, `<goal-card>` Custom Elements, Shadow DOM, `<template>`)
- Phase 6: Authentication & User Profiles (SQLite `users` table, login/register, `localStorage` session token, History API)
- Phase 7: Social Graph — Follow System & Privacy (`follows` table, visibility on sessions, filtered Explore feed)
- Phase 8: Messaging & Notifications (SQLite `messages` table, extended WebSocket message types, in-app toasts)
- Phase 9: Rich Content & Study Techniques (Flowtime, Feynman, 52/17, Weekly Wrapped story cards)
- Phase 10: Search, Discovery & Linting (user search endpoint, debounced search bar, ESLint with `eslint-config-portsoc`)
- Phase 11: UI Polish & Animations (CSS transitions, responsive breakpoints, dark/light mode, Lighthouse audit)

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

## Lecturer Reference Repos

### portsoc/staged-simple-message-board (primary reference)
- Stage 1: 4-line Express static server (`express.static('client')`, `app.listen(8080)`)
- Stage 2: GET route returning in-memory array as JSON (`app.get('/messages', getMessages)`)
- Stage 3: POST route with `express.json()` middleware, client uses `fetch` with `method: 'POST'`, `Content-Type: application/json`, `JSON.stringify`
- Stage 4: Objects with unique IDs via `uuid-random`, parameterised routes (`/messages/:id`), `req.params.id`
- Stage 5: Refactor data logic into separate module (`messageboard.js`) using ES6 `export`/`import`, server only handles HTTP
- Stage 6: PUT route for editing, `express.static('client', { extensions: ['html'] })`
- Stage 7: Added CSS styling, dark/light mode
- Stage 8: Replace in-memory array with `better-sqlite3`, SQL migration files in `migrations-sqlite/` folder, `db-utils.js` with promise wrapper and `migrate()` function, `messageboard.js` now runs SQL queries (`SELECT`, `INSERT`, `UPDATE`)
- Stage 9: Web Components — `<editable-message>` custom element with Shadow DOM, loads HTML template via `fetch`, replaces inline editing
- Stage 10: Full component architecture — `<message-board>`, `<message-list>`, `<editable-message>` all as web components, `ShadowElement` base class with `loadTemplate()`, `clearShadow()`, `showTemplate()`, CSS variables for theming across components

### portsoc/hsww (Hello Service Worker World)
- Stage 3: Register service worker with `navigator.serviceWorker.register('./sw.js')`
- Stage 5: `sw.js` uses `install` event to open a cache and `cache.addAll()` a list of URLs
- Stage 6: `fetch` event listener serves from cache only (`caches.match`)
- Stage 8: Serve from cache immediately, update cache in background with `evt.waitUntil(updateCache(evt.request))`
- Stage 9: `manifest.json` with `name`, `short_name`, `icons` (192px), `display: standalone`, `start_url`, `background_color`, `theme_color`
- Stage 10: Additional Lighthouse requirements, 512px icon

### portsoc/simple-spa
- Minimal `index.html` — just `<header>`, empty `<main>`, `<footer>`, `<template>` elements
- `pages` array defines all screens, JS builds nav buttons dynamically with `document.createElement`
- Screen content fetched at runtime from `.inc` files using `fetch`
- `<template id="tmp-screen">` cloned with `template.content.cloneNode(true)` for each screen
- History API: `history.pushState(state, title, url)` on every view change, `window.onpopstate` restores state
- Login stored in `localStorage.setItem('user', userid)`, retrieved with `localStorage.getItem('user')`
- `hideElement`/`showElement` utility pattern for toggling visibility

### portsoc/custom-elements
- Templates: `<template>` defined in HTML, cloned with `template.content.cloneNode(true)`, content manipulated before appending to DOM
- Shadow DOM: `element.attachShadow({ mode: 'open' })`, scoped styles only affect shadow contents, `mode: 'closed'` prevents external JS access
- Custom Elements: `customElements.define('tag-name', ClassName)`, class extends `HTMLElement`, constructor calls `super()` then `attachShadow`
- Lifecycle callbacks: `connectedCallback()` (element added to DOM), `disconnectedCallback()` (removed), `attributeChangedCallback(name, oldVal, newVal)` with static `observedAttributes` getter
- Examples progress from simple templates → shadow DOM → full custom elements with external module files, scoped CSS, and lifecycle methods

### portsoc/server101
- Progression from raw `http.createServer` with manual request/response handling → Express
- `server-1`: manual URL checking, `res.statusCode`, `res.end()`
- `server-3`: file serving from a web root folder using `fs.readFile`
- `server-5`: Express static server in 4 lines
- `server-6`: Express with dynamic route + static middleware combined

### portsoc/fetch101
- Error handling pattern: always check `response.ok` before parsing
- Response headers: `response.headers.get('content-type')` to decide `response.json()` vs `response.text()`
- DOM feedback on error: update `textContent` and toggle CSS class, never use `alert()`

### Lecture PDF key concepts for exam
- **Banned code:** `var`, `XMLHttpRequest`, `document.write()`, `require()` on frontend, `alert()`/`prompt()`/`confirm()`
- **WebSocket theory:** HTTP upgrade handshake (101 Switching Protocols), frames, full-duplex, bidirectional, low latency vs AJAX polling. `ws://` and `wss://` protocols
- **REST:** Stateless, use correct HTTP verbs (GET/POST/PUT/DELETE), appropriate status codes, cache when possible, server provides resources at URL endpoints
- **Modern web architecture:** Client maintains application state, server reduced to API functions, JS modules allow client-side architecture, SPAs indistinguishable from native apps
- **PWA requirements:** HTTPS (except localhost), Service Worker for caching, JSON manifest for installability
- **localStorage:** Synchronous, string-only, persistent until cleared, `setItem`/`getItem`/`removeItem`, use `JSON.stringify`/`JSON.parse` for objects
