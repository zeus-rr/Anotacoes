const CACHE_NAME = 'nine-anotacoes-v1';
const ASSETS = [
  './index.html',
  './ICON.gif',
  './manifest.json',
  'https://unpkg.com/dexie@3.2.4/dist/dexie.js'
];

// Instala o Service Worker e guarda os arquivos essenciais no cache do celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Executa o aplicativo usando o cache se estiver sem internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});