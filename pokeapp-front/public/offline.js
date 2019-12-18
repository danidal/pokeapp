/* eslint-disable no-restricted-globals */
const isPokeApiResource = url =>
    url.startsWith("https://pokeapi.co/api/v2") ||
    url.startsWith("https://raw.githubusercontent.com/PokeAPI")

const isMyServerResource = url =>
    url.startsWith("http://localhost")

const isVerifiedUrl = url =>
    isPokeApiResource(url) || isMyServerResource(url)

const isValid = (request, response) =>
    !!response && 
    request.method === 'GET' && 
    (
        isVerifiedUrl(request.url) ||
        (response.status === 200 && response.type === 'basic')
    )

const getByCacheFallingBackByNetwork = (request, CACHE_NAME) =>
    caches.match(request)
    .then(response => {
        if (!!response) {
            return response
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = request.clone()

        return fetch(fetchRequest)
        .then(response => {
            if(!isValid(request, response)) {
                return response
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
            .then(cache => 
                cache.put(request, responseToCache)
            )
            .then(() => printStorageEstimate())

            return response
        })
    })

const getByNetworkFallingBackByCache = (request, CACHE_NAME, showAlert = false) =>
    caches.open(CACHE_NAME)
    .then((cache) => {
        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = request.clone()

        return fetch(fetchRequest)
        .then(response => {
            if(!isValid(request, response)) {
                return response
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone()

            cache.put(request, responseToCache)
            .then(() => printStorageEstimate())

            return response
        })
        .catch(() => {
            if (showAlert) {
                console.log('You are in offline mode. The data may be outdated.')
            }
            return caches.match(request)
        })
    })

const printStorageEstimate = () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then(({usage, quota}) => {
        console.log(`Storage usage estimation: Using ${usage} out of ${quota} bytes.`)
        })
    }
}

const CACHE_NAME = 'pokeapp'

self.addEventListener('install', e => {
    console.log('installing service worker!!')
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                '/favicon.ico',
                '/bwincon2.ico',
                '/manifest.json',
                'offline.js',
                'pokeball.png',
                'bwpokeball.png',
                'logo192.png',
                'logo512.png',
                'pokemon_logo.ico'
            ])
            .then(() => self.skipWaiting())
        })
    )
})

self.addEventListener('activate', event => {
    console.log('activating service worker')
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
    console.log(`fetching ${event.request.url}`)
    if (event.request.method == "GET") {
        event.respondWith(
            /* getByCacheFallingBackByNetwork(event.request, CACHE_NAME) */
            getByNetworkFallingBackByCache(event.request, CACHE_NAME, true)
        )
    }
})