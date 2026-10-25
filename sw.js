// Pulse service worker: offline-first cache of the app shell.
// Bump VERSION whenever you change any cached file.
const VERSION = 'pulse-v7';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'maskable-512.png', 'apple-touch-icon.png', 'favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Pages: network first, fall back to cache so updates show up but offline still works.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { caches.open(VERSION).then(c => c.put('index.html', res.clone())); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  // Everything else: cache first, then network.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
  })));
});
