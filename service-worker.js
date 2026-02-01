const CACHE_NAME = 'my-pwa-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './KyoboHandwriting2024psw.woff2',
  './KyoboHandwriting2024psw.woff',
  './icon-192.png',
  './icon-512.png'
];

// 설치 시 캐시
self.addEventListener('install', event => {
  console.log('[ServiceWorker] 설치됨');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 활성화
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] 활성화됨');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// fetch 이벤트 처리
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
