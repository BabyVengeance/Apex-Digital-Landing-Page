const CACHE_NAME = 'apex-cache-v23';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/chatbot-rag.js',
  '/case-studies/',
  '/case-studies/index.html',
  '/case-studies/styles.css',
  '/case-studies/app.js',
  '/assets/images/logo-dark.webp',
  '/assets/images/logo-light.webp',
  '/assets/images/logo-dark-no-text.webp',
  '/assets/images/logo-light-no-text.webp'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // CRITICAL: Never intercept POST requests or backend API endpoints
  if (e.request.method !== 'GET' || e.request.url.includes('/api/')) {
    return;
  }

  try {
    const url = new URL(e.request.url);
    const pathname = url.pathname;

    if (
      e.request.mode === 'navigate' ||
      pathname.endsWith('.js') ||
      pathname.endsWith('.html') ||
      pathname.endsWith('.css') ||
      pathname === '/'
    ) {
      e.respondWith(
        fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => caches.match(e.request))
      );
    } else {
      e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
          return cachedResponse || fetch(e.request);
        })
      );
    }
  } catch (_) {
    // Pass through directly if URL parsing fails
  }
});
