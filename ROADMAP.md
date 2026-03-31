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
- [ ] **[HIGH]** Add `response.ok` check to `postSession()` and re-render feed after successful POST.
- [ ] **[HIGH]** Add `try/catch` to `server.mjs` file operations with appropriate HTTP error status codes.
- [ ] **[MEDIUM]** Fix subject scope — capture `#subject-input` value and store in module-level variable when timer starts.
- [ ] **[MEDIUM]** Clear `.activity-feed` before re-rendering in `renderFeedPosts()` to prevent duplicate posts.
- [ ] **[MEDIUM]** Modularise `client/script.js` into ES6 modules: `js/timer.js`, `js/navigation.js`, `js/api.js`, `js/app.js`.
- [ ] **[LOW]** Pretty-print `data.json` using `JSON.stringify(sessions, null, 2)`.
- [ ] **[LOW]** Fix `package.json` `main` field to point to `server.mjs`.
- [ ] **[LOW]** Update `CLAUDE.md` to reflect Phase 3 complete and new module structure.

## Phase 4: Real-Time & Advanced Features

- [ ] Set up WebSockets (`ws` library) on the server to push live studying notifications to the client.
- [ ] Add a Service Worker and `manifest.json` to make the app an installable PWA with offline support via `localStorage`.
- [ ] (Final Step) Replace `data.json` with PostgreSQL and Prisma.

## Phase 5: Additional Study Techniques

- [ ] Implement Flowtime technique (count-up timer + scaled break suggestions based on elapsed time).
- [ ] Implement Feynman technique (4-step guided checklist with checkboxes, no timer).
- [ ] Richer session objects — capture total work time, total break time, number of sessions. User chooses public (visible on Explore + Profile) or private (Profile only).
