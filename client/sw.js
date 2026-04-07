const CACHE_NAME = "academic-wrapped-cache-v7";
const urlsToCache = [
  "/",
  "/style.css",
  "/js/app.js",
  "/js/timer.js",
  "/js/navigation.js",
  "/js/api.js",
  "/js/utils.js",
  "/js/ws.js",
  "/js/sw-register.js",
  "/js/components/feed-post.mjs",
  "/js/components/goal-card.mjs",
  "/js/auth.js",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.includes("/api/")) {
        return fetch(event.request);
      }
      const cached = await caches.match(event.request);
      return cached || fetch(event.request);
    })(),
  );
});
