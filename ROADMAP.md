# Academic Wrapped - Project Roadmap

## Phase 1: The Mobile-First Prototype (UI Shell) ✅ COMPLETE

- [x] Create `client/index.html` with Semantic HTML5 and BEM class naming.
- [x] Create `client/style.css` using a CSS Reset.
- [x] Define CSS Custom Properties (`:root` variables) for the color scheme.
- [x] Build the mobile layout using Flexbox (fixed header, bottom tab bar, scrollable main).
- [x] Build the Timer Modal with subject input, study technique selector (Pomodoro, Flowtime, Feynman), and Start button. Hidden by default using `.timer-modal--hidden`.
- [x] Style all cards with consistent `rem`-based spacing, `box-shadow`, and `border-radius`.

## Phase 2: Client-Side Interactivity (The SPA)

_Rule: Strict modern JS only. No `var`. No frameworks. Use `const`/`let`, `fetch()`, and ES6 `import`/`export`._

### Prep (HTML & CSS — before writing any JS)

- [x] Decide final nav tab structure — max 5 tabs. Current plan: Home, Explore, ➕, Goals, Profile. (Stats moves into Home view as a card.)
- [x] Add a `<section id="view-home">` wrapping Home cards, `<section id="view-explore">` for the social feed, `<section id="view-goals">` for goals, `<section id="view-profile">` for profile — each a direct child of `<main>`.
- [x] Add `data-target` attributes to each nav `<a>` button linking it to its corresponding view (e.g. `data-target="view-home"`).
- [x] Add `.view--hidden` CSS modifier class to `style.css` (`display: none`) for toggling views.
- [x] Add `.bottom-nav__item--active` CSS modifier class to `style.css` to highlight the active nav tab.

### View Content (Dummy HTML)

- [x] **Home view** — motivational quote/streak card, today's tasks card, study time chart card (with Stats data), academic personality card.
- [x] **Explore view** — two distinct sections:
  - _Weekly Wrapped Stories row_ — horizontal scrollable `<ul>` of friend avatar buttons at the top of the view. Tapping one opens that friend's weekly Wrapped summary (total hours, top subject, streak, personality type).
  - _Activity Feed_ — chronological scroll of friend activity posts (Strava/BeReal style). Each post is an `<article>` showing: friend avatar, friend name, activity (e.g. "completed a Pomodoro session"), subject, duration, and timestamp.
- [x] **Goals view** — list of user-set study goals with progress indicators.
- [x] **Profile view** — user's own weekly Wrapped summary: total hours, sessions logged, favourite subject, current streak, academic personality type.

### JavaScript

- [x] Create `client/script.js` and link it to `index.html` using `<script type="module" defer>`.
- [x] Build Navigation Logic: select all nav buttons with `querySelectorAll`, attach click listeners, use "hide all then show one" pattern with `data-target` to toggle `.view--hidden`.
- [x] Build Timer Modal Logic: open modal when `+` button is clicked (remove `.timer-modal--hidden`), close when backdrop is clicked or modal is dismissed.
- [x] Build the Focus Timer: Pomodoro countdown with `setInterval`, phase transitions (work→break→work), long break every 4 sessions, audio notification via Web Audio API. Timer displays in site header; CTA button doubles as stop button. (Flowtime & Feynman deferred to Phase 5.)
- [x] Create a dummy JS array for past study sessions and friend activity posts.
- [x] Write a `renderFeedPosts()` function to dynamically generate `<article>` HTML for each session and inject into the Explore view using `document.createElement`.

## Phase 3: The Backend Server & API

- [x] Refactor `server.mjs` to serve static files from the `client` folder.
- [x] Create `data.json` to act as a temporary dummy database.
- [x] Write a `GET /api/sessions` Express route to send session data to the client.
- [x] Write a `POST /api/sessions` Express route to save a new completed focus session.
- [x] Update `client/script.js` to use the `fetch()` API to talk to these endpoints.

## Phase 3.1: Hardening & Modularisation

- [x] **[HIGH]** Add `response.ok` check and fallback to `renderFeedPosts()`.
- [x] **[HIGH]** Add `response.ok` check to `postSession()` and re-render feed after successful POST.
- [x] **[HIGH]** Add `try/catch` to `server.mjs` file operations with appropriate HTTP error status codes.
- [x] **[MEDIUM]** Fix subject scope — capture `#subject-input` value and store in module-level variable when timer starts.
- [x] **[MEDIUM]** Clear `.activity-feed` before re-rendering in `renderFeedPosts()` to prevent duplicate posts.
- [x] **[MEDIUM]** Modularise `client/script.js` into ES6 modules: `js/timer.js`, `js/navigation.js`, `js/api.js`, `js/app.js`.
- [x] **[LOW]** Pretty-print `data.json` using `JSON.stringify(sessions, null, 2)`.
- [x] **[LOW]** Fix `package.json` `main` field to point to `server.mjs`.
- [x] **[LOW]** Update `CLAUDE.md` to reflect Phase 3 complete and new module structure.

## Phase 4: Real-Time & Advanced Features

- [x] Set up WebSockets (`ws` library) on the server to push live studying notifications to the client.
- [x] Add a Service Worker and `manifest.json` to make the app an installable PWA with offline support via `localStorage`.
- [x] (Final Step) Replace `data.json` with better-sqlite3 using SQL migration files (following the lecturer's staged-simple-message-board stage 8 pattern).

## Phase 5: Web Components & Templates _(Curriculum: Weeks 6–7 — Custom Elements, Shadow DOM, Templates)_ ✅ COMPLETE

- [x] Refactor the activity feed post into a `<feed-post>` Custom Element (`customElements.define`, `class extends HTMLElement`).
- [x] Add a `<template id="feed-post-template">` in `index.html` for the feed post markup. Clone it with `template.content.cloneNode(true)` inside the component.
- [x] Attach Shadow DOM to `<feed-post>` with `attachShadow({ mode: 'open' })` and add scoped styles inside it.
- [x] Implement `connectedCallback` and `attributeChangedCallback` lifecycle methods on `<feed-post>`.
- [x] Refactor the goals list item into a `<goal-card>` Custom Element using the same template + Shadow DOM pattern.
- [x] Reference: lecturer's `custom-elements` repo (examples 0–8) and staged-simple-message-board stages 9–10.

## Phase 6: Authentication & User Profiles _(Curriculum: localStorage — Week 5, History API — Week 8, REST API design — Week 6)_

- [x] Add a `users` table to SQLite (id, username, email, password_hash).
- [x] Build login and register views in `index.html` with semantic `<form>` elements.
- [x] Implement simple session auth using `localStorage` to store a session token (`setItem`, `getItem`, `removeItem`, `JSON.parse`/`JSON.stringify`).
- [ ] Add History API support: `history.pushState()` on view changes, `window.onpopstate` to handle browser back/forward buttons. Reference: lecturer's Simple SPA.
- [ ] Build the complete profile view: editable username, bio, avatar upload (base64 or file path), stats display (total hours, sessions logged, favourite subject, streak — queried from SQLite).
- [ ] Add a settings view for account preferences (e.g., notification toggles, privacy defaults).
- [ ] Add `PUT /api/users/:id` Express route for profile edits and avatar changes.
- [ ] Add `GET /api/users/:id` Express route to fetch a user's public profile.

## Phase 7: Social Graph — Follow System & Privacy _(Curriculum: REST API design — Week 6, database relations — Week 5)_

- [ ] Add a `follows` table to SQLite (id, follower_id, following_id, status: `pending`/`accepted`, created_at).
- [ ] Add `POST /api/follows` route to send a follow request.
- [ ] Add `PUT /api/follows/:id` route to accept or reject a follow request.
- [ ] Add `DELETE /api/follows/:id` route to unfollow.
- [ ] Add `GET /api/users/:id/followers` and `GET /api/users/:id/following` routes.
- [ ] Display follower/following counts on the profile view.
- [ ] Add follow/unfollow/accept buttons on other users' profiles.
- [ ] Add `visibility` column to the `sessions` table (`public` or `private`). Let the user choose when posting a session.
- [ ] Filter the Explore feed to only show public sessions from accepted follows.

## Phase 8: Messaging & Notifications _(Curriculum: WebSockets advanced — Weeks 11–12, DOM manipulation — Week 2)_

- [ ] Add a `messages` table to SQLite (id, sender_id, receiver_id, content, created_at, read_at).
- [ ] Build a messages view with a conversation list and a chat interface.
- [ ] Extend WebSocket handling (`ws.js`) to support multiple message types: `newSession`, `newMessage`, `notification`.
- [ ] Deliver messages in real time over WebSockets.
- [ ] Build an in-app notification system using DOM manipulation (toast/banner elements, no `alert()`). Notify on: new follower, follow request accepted, new message.
- [ ] Add an unread message count badge on the messages nav item using `document.createElement` and `textContent`.

## Phase 9: Rich Content & Study Techniques _(Curriculum: fetch API — Week 3, DOM — Week 2, events — Week 2)_

- [ ] Implement Flowtime technique (count-up timer with scaled break suggestions based on elapsed time).
- [ ] Implement Feynman technique (4-step guided checklist with checkboxes, no timer).
- [ ] Add additional techniques: 52/17 rule, time-blocking.
- [ ] Richer session objects: total work time, total break time, session count, technique used.
- [ ] Add image upload for study sessions (send as base64 via `fetch`, store reference in SQLite).
- [ ] Build the Weekly Wrapped feature: aggregate 7 days of session data from SQLite, render a shareable "story" card with stats (total hours, top subject, streak, academic personality type), and post it to the Explore feed.

## Phase 10: Search, Discovery & Linting _(Curriculum: ESLint — Week 9, API design — Week 6)_

- [ ] Add `GET /api/users?q=searchterm` endpoint for user search.
- [ ] Build a search bar in the Explore view using an `input` event listener with a debounce function.
- [ ] Add user discovery/suggestions on the Explore view (e.g., "People you might know").
- [ ] Add basic content moderation: report and block functionality.
- [ ] Set up ESLint with `eslint-config-portsoc` — add config to `package.json`, fix all linting issues.
- [ ] Add `npm run lint` script to `package.json`.

## Phase 11: UI Polish & Animations _(Curriculum: Modern CSS — Week 10)_

- [ ] Add CSS transitions to the timer modal (open/close with `opacity` and `transform` instead of hard `display: none` snap).
- [ ] Add CSS transitions to feed posts appearing and card hover/active/focus states.
- [ ] Build a typographic scale using CSS custom properties.
- [ ] Add responsive breakpoints for tablet (`48rem`) and desktop (`64rem`) with `@media` queries.
- [ ] Style the Weekly Wrapped story cards with gradients and CSS animations.
- [ ] Add dark/light mode toggle using CSS custom properties and a `data-theme` attribute on the root element.
- [ ] Use CSS Grid layouts where appropriate (profile stats, settings page, message list).
- [ ] Final Lighthouse audit for PWA compliance, accessibility, and performance.
