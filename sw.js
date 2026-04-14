/* CODEX — Service Worker v7 (HTML never cached by SW) */
var CACHE_NAME = 'codex-v7';
var STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* Install: cache only static assets, never HTML */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* Activate: purge old caches */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) {
        return k !== CACHE_NAME;
      }).map(function(k) {
        return caches.delete(k);
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* Fetch strategies */
self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // GitHub API: network only, no interception
  if (url.indexOf('api.github.com') !== -1) return;

  // HTML / app shell: always network, never cache via SW
  // Browser's own HTTP cache handles offline scenarios
  if (event.request.mode === 'navigate' || url.indexOf('index.html') !== -1 || url.endsWith('/Codex/')) {
    return;
  }

  // Google Fonts: cache-first (stable, rarely change)
  if (url.indexOf('fonts.googleapis.com') !== -1 || url.indexOf('fonts.gstatic.com') !== -1) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
          }
          return response;
        });
      })
    );
    return;
  }

  // Static assets (icons, manifest): cache-first
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
        }
        return response;
      });
    })
  );
});
