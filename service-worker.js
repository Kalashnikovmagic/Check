const CACHE_NAME = "magic-checklist-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];


self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })

            );

        })
        .then(() => self.clients.claim())

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
        .then(response => {

            const clone = response.clone();

            caches.open(CACHE_NAME)
            .then(cache => {
                cache.put(event.request, clone);
            });

            return response;

        })
        .catch(() => {

            return caches.match(event.request);

        })

    );

});