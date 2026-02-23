# Academic Wrapped - Project Roadmap

## Phase 1: The Mobile-First Prototype (UI Shell)
- [x] Create `client/index.html` with Semantic HTML5.
- [ ] Create `client/style.css` using a CSS Reset.
- [ ] Define CSS Custom Properties (`:root` variables) for the color scheme.
- [ ] Build the mobile layout using Flexbox/Grid (sticky header, bottom nav bar).
- [ ] Style the "Study Sessions" feed and "Start Timer" button with dummy HTML data.

## Phase 2: Client-Side Interactivity (The SPA)
*Rule: Strict modern JS only. No frameworks.*
- [ ] Create `client/script.js` and link it to `index.html`.
- [ ] Build the Navigation Logic: Write JS to hide/show different `<article>` sections when nav buttons are clicked.
- [ ] Build the Focus Timer: Use `setInterval` to create a countdown timer.
- [ ] Create a dummy JSON array in JS to hold fake study sessions.
- [ ] Write a function to dynamically generate HTML for the study sessions and inject it into the DOM.

## Phase 3: The Backend Server & API
- [ ] Refactor `server/server.js` to serve the static files from the `client` folder.
- [ ] Create a `server/data.json` file to act as our temporary dummy database.
- [ ] Write a `GET /api/sessions` Express route to send the JSON data to the client.
- [ ] Write a `POST /api/sessions` Express route to save a new completed focus timer session.
- [ ] Update `client/script.js` to use the `fetch()` API to talk to these new endpoints.

## Phase 4: Real-Time & Advanced Features
- [ ] Set up WebSockets (`ws` library) on the server to push "Live Studying" notifications to the client.
- [ ] Add a Service Worker and `manifest.json` to make the app an installable PWA with offline support via `localStorage`.
- [ ] (Final Step) Replace `data.json` with PostgreSQL and Prisma.