var firstCache = 'v-1';

let url = [
    '/',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',

];
self.addEventListener('install',  (event) => {

    event.waitUntil(
        caches.open(firstCache).then( (cache) => {
            return cache.addAll(url);
        })
    );
});

self.addEventListener('activate',  (event) => {
    event.waitUntil(
        caches.keys().then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter( (cacheName) => {
                    return cacheName.startsWith('v-') &&
                        cacheName != firstCache;
                }).map( (cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch',  (event) => {
    event.respondWith(
        caches.match(event.request).then( (response) => {
            return response || fetch(event.request);
        })
    );
});