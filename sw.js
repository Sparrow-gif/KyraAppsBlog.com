const CACHE_NAME = "qmath-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/css/butterfly.css",
  "/JS/main.js",
  "/assets/favicon.png"
];

// Install → cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch → serve from cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
