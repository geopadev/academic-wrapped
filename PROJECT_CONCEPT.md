# Project Initiation Document (PID): Academic Wrapped

## 1. The Elevator Pitch

"Academic Wrapped" is a mobile-first, Single Page Application (SPA) designed for university students. It combines the utility of a focus timer and task manager with the social motivation of Strava, culminating in a highly visual "Spotify Wrapped"-style analytics dashboard at the end of each week.

## 2. Core Concept & Problem Solved

Students often struggle to quantify their study efforts until exam results arrive. This app gamifies the studying process by tracking active focus time, logging completed tasks, and allowing students to share their momentum with a follow-based social feed.

## 3. Key Features (Minimum Viable Product)

- **The Focus Engine:** A built-in countdown timer that logs the exact duration of a study session tied to a specific task or subject.
- **Task & Grade Tracker:** A dashboard to log upcoming assignments, exams, and the grades received.
- **The Social Feed ("Strava for Studying"):** A feed where users can see when the people they follow complete a study session.
- **Live Studying Status:** Real-time indicators showing if a friend is currently running a focus timer.
- **The Weekly "Wrapped":** A data visualization page aggregating the past 7 days of study data (e.g., total hours, most studied subject, longest streak).

## 4. Technical Architecture & Constraints

This project is built for a strict university module and must adhere to the following architecture:

- **Frontend UI:** Strictly Vanilla JavaScript, Semantic HTML5, and native CSS (using Grid, Flexbox, and CSS Variables). No frontend frameworks (React, Vue, Tailwind) are permitted.
- **Client Architecture:** A native Single Page Application (SPA) using DOM manipulation and the `fetch()` API.
- **Backend:** Node.js with Express.js.
- **Real-Time Data:** WebSockets (`ws` library) to power the "Live Studying Status".
- **Mobile & Offline:** Must be a Progressive Web App (PWA) utilizing Service Workers, `manifest.json`, and `localStorage` for offline capabilities.
- **Database:** PostgreSQL (accessed via Prisma ORM) to persist user, task, and session data.

## 5. Development Phases

1.  **Phase 1:** Mobile-first UI Prototype using HTML/CSS and dummy data.
2.  **Phase 2:** Client-side SPA interactivity (Timer logic, DOM navigation).
3.  **Phase 3:** Node/Express REST API creation and data integration.
4.  **Phase 4:** Advanced Features (WebSockets, PWA implementation, and Database integration).
