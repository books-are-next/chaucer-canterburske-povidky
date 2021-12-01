/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-7f164af';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./canterburske_povidky_001.html","./canterburske_povidky_002.html","./canterburske_povidky_003.html","./canterburske_povidky_005.html","./canterburske_povidky_006.html","./canterburske_povidky_007.html","./canterburske_povidky_008.html","./canterburske_povidky_009.html","./canterburske_povidky_010.html","./canterburske_povidky_011.html","./canterburske_povidky_012.html","./canterburske_povidky_013.html","./canterburske_povidky_014.html","./canterburske_povidky_015.html","./canterburske_povidky_016.html","./canterburske_povidky_017.html","./canterburske_povidky_018.html","./canterburske_povidky_019.html","./canterburske_povidky_020.html","./canterburske_povidky_021.html","./canterburske_povidky_022.html","./canterburske_povidky_023.html","./canterburske_povidky_024.html","./canterburske_povidky_025.html","./canterburske_povidky_026.html","./canterburske_povidky_027.html","./canterburske_povidky_028.html","./canterburske_povidky_029.html","./canterburske_povidky_030.html","./canterburske_povidky_031.html","./canterburske_povidky_032.html","./canterburske_povidky_033.html","./canterburske_povidky_034.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./resources.html","./resources/image001.jpg","./resources/image002.png","./resources/index.xml","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
