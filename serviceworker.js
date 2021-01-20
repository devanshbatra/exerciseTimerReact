const Cache_name = "version_1";
const PAGES = [
    "/static/css/main.296b52d9.chunk.css",
    "/static/js/main.9aea91de.chunk.js",
    "/static/js/main.9aea91de.chunk.js.map",
    "/static/js/runtime-main.cf147236.js",
    "/static/js/runtime-main.cf147236.js.map",
    "/static/js/2.b6dcfcd1.chunk.js",
    "/static/js/2.b6dcfcd1.chunk.js.map",
    "/static/js/3.048f9a0e.chunk.js",
    "/static/js/3.048f9a0e.chunk.js.map",
    "/index.html",
    "/static/css/main.296b52d9.chunk.css.map",
    "/static/js/2.b6dcfcd1.chunk.js.LICENSE.txt",
    "/static/media/perc-hollow.56a8f67f.wav",
    "/static/media/ride-acoustic02.44e63854.wav"
];

// installing the service worker
this.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(Cache_name)
            .then(cache=>{
                console.log("opened cache");
                return cache.addAll(PAGES);
            })
            .then(()=>console.log("caches added successfully"))
    )
});

// handling fetch request
this.addEventListener("fetch", event=>{
    event.respondWith(
        caches.match(event.request)
            .then(r=>{
                console.log("fetching request: "+event.request.url);
                return r || fetch(event.request).then(response=>{
                    return caches.open(Cache_name).then(cache=>{
                        cache.put(event.request, response.clone());
                        return response;
                    })
                })
            })
    );
});

// Deleting not-needed caches (activating th SW)
this.addEventListener("activate", (event)=>{
    const cache_whitelist = [];
    cache_whitelist.push(Cache_name);

    event.waitUntil(
        caches.keys().then(cachenames=>{
            return Promise.all(
                cachenames.map(cachename=>{
                    if(!cache_whitelist.includes(cachename)){
                        return caches.delete(cachename);
                    }
                })
            )
        })
    )
});