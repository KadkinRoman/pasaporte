const C = 'pasaporte-us-v1';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.add('./')).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  const url = new URL(e.request.url), root = new URL(self.registration.scope);
  if (url.origin !== root.origin || ![root.pathname, root.pathname + 'index.html'].includes(url.pathname)) return;
  e.respondWith(fetch(e.request).then(async r => {
    if (r.ok) { const cache = await caches.open(C); await cache.put('./', r.clone()); }
    return r;
  }).catch(() => caches.match('./')));
});
