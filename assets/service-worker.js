 const CACHE_NAME = 'paw-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './assets/MyFont.woff2'
  // 필요하면 추가 리소스(PNG, JS 등)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
