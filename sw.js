
const PRECACHE = 'cache-v43';
const RUNTIME = 'runtime';
const path = '/'

const PRECACHE_URLS = [
    path + 'icon.png',
    path + 'barcode.png',
    path + 'content.png',
    path + 'example-signature.png',
    path + 'index.html',
    path + 'Lato-Bold.ttf',
    path + 'Lato-Regular.ttf',
    path + 'mysagov.jpeg',
    path + 'mysagov.webmanifest',
    path + 'pin.png',
    path + 'shake.js',
    path + 'state.png',
    path + 'title2.png',
    path + 'title3.png',
    path + 'validate.png',
    path + 'hammer.min.js',
    path + 'phone.jpeg',
    path + 'globe.jpeg',
    path + 'govfoot.jpg',
  path + 'photo.png'

];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => {
                return Promise.all(
                    PRECACHE_URLS.map(url => {
                        return cache.add(url).catch(err => {
                            console.error('Failed to cache', url, err);
                        });
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});


// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});
