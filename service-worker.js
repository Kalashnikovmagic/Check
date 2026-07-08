const CACHE_NAME = "magic-checklist-v1";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"

];



// Установка

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

        );

    }

);



// Загрузка файлов

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

        );

    }

);