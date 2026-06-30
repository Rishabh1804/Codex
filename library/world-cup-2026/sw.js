/* World Cup 2026 dashboard — service worker.
   Network-first for navigation/HTML (never serve stale pages — Codex Canon 0034 spirit),
   cache-first for static assets (icons, wallpapers) for offline + install. */
const CACHE = 'wc2026-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    // network-first: always try fresh HTML, fall back to cache offline
    e.respondWith(fetch(req).then(r => {
      caches.open(CACHE).then(c => c.put(req, r.clone())).catch(() => {});
      return r;
    }).catch(() => caches.match(req).then(m => m || caches.match('./index.html'))));
    return;
  }
  // static assets: cache-first, then network (and cache the result)
  e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => {
    if (r && r.status === 200 && new URL(req.url).origin === location.origin) {
      const clone = r.clone(); caches.open(CACHE).then(c => c.put(req, clone)).catch(() => {});
    }
    return r;
  }).catch(() => m)));
});
