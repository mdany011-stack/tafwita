self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('tafwita-shell').then(function(cache) {
      return cache.addAll([
        './patient.html',
        './manifest.webmanifest'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
