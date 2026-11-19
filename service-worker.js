const CACHE_NAME = "portfolio-cache-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./about.html",
    "./projects.html",
    "./contact.html",
    "./offline.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.json",
    "./icons/icon-192.svg",
    "./icons/icon-512.svg"
];


// Install Event
self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(function(cache) {

            console.log("Caching Files");

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});


// Activate Event
self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(function(cacheNames) {

            return Promise.all(

                cacheNames.map(function(cacheName) {

                    if (cacheName !== CACHE_NAME) {

                        return caches.delete(cacheName);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


// Fetch Event
self.addEventListener("fetch", function(event) {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        caches.match(event.request)

        .then(function(response) {

            if (response) {

                return response;

            }

            return fetch(event.request)

            .catch(function() {

                if (event.request.mode === "navigate") {

                    return caches.match("./offline.html");

                }

            });

        })

    );

});