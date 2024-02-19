// Imports
importScripts('sw-utils.js');

const INMUTABLE_CACHE = 'inmutable-v12';
const STATIC_CACHE = 'static-v12';
const DYNAMIC_CACHE = 'dynamic-v12';
const CACHE_DYNAMIC_LIMIT = 51;

const APP_SHELL = [

    '/',
    'sw.js',
    'index.html',
    'favicon.ico',
    'sw-utils.js',
    './assets/js/custom.js',
    './assets/css/style.css',
    './assets/js/sidebarmenu.js',
    './assets/css/colors/blue.css',
    './assets/css/colors/blue-dark.css',
    './assets/css/colors/default-dark.css',
    './assets/css/colors/default.css',
    './assets/css/colors/green-dark.css',
    './assets/css/colors/green.css',
    './assets/css/colors/megna-dark.css',
    './assets/css/colors/megna.css',
    './assets/css/colors/purple-dark.css',
    './assets/css/colors/purple.css',
    './assets/css/colors/red-dark.css',
    './assets/css/colors/red.css',
];

const APP_SHELL_INMUTABLE = [

    './assets/js/mask.js',
    './assets/js/waves.js',
    './assets/plugins/jquery/jquery.min.js',
    './assets/plugins/bootstrap/js/popper.min.js',
    './assets/js/perfect-scrollbar.jquery.min.js',
    './assets/plugins/bootstrap/js/bootstrap.min.js',
    './assets/plugins/bootstrap/css/bootstrap.min.css',
    './assets/plugins/sparkline/jquery.sparkline.min.js',
    './assets/plugins/sticky-kit-master/dist/sticky-kit.min.js',
];


self.addEventListener('install', e => {

    // self.skipWaiting();
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            // inmutable
            if (key !== INMUTABLE_CACHE && key.includes('inmutable')) {
                return caches.delete(key);
            }

            // static
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            // dynamic
            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);
});

self.addEventListener('fetch', e => {

    // 6 - Caches with Network Fallback
    const respuesta = caches.match(e.request)
        .then(res => {

            // Devuelvo la respuesta desde el cache
            if (res) { return res;
            } else {

                return caches.open(DYNAMIC_CACHE).then( cache => {

                    return cache.match(e.request).then( dynamic => {

                        if (dynamic) { return dynamic;
                        } else {

                            // Si no existe el archivo en cache, voy a buscarlo en internet
                            return fetch(e.request).then( newResp => {

                                if (/\.(png|jpg|jpeg)$/i.test(e.request.url)) {
                                    const dynamicNew = actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newResp);
                                    limpiarCache( DYNAMIC_CACHE, CACHE_DYNAMIC_LIMIT );
                                    return dynamicNew;
                                } else {
                                    // Devolvemos lo que obtuvimos en internet
                                    return newResp;
                                }

                            });

                        }

                    });

                });

            }

        });

    e.respondWith(respuesta);

});

self.addEventListener('push', e => {

    const data = JSON.parse(e.data.text());
    const title = data.titulo;
    const options = {
        body: data.cuerpo,
        icon: 'assets/images/logo-icon.png',
        badge: 'favicon.ico',
        tag: 'renotify',
        renotify: true,
        vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600],
        data: {
            url: data.url,
        },
    };

    e.waitUntil(self.registration.showNotification(title, options));

});

self.addEventListener('notificationclick', e => {

    const notificacion = e.notification;

    const respuesta = clients.matchAll()
        .then(clientes => {

            let cliente = clientes.find(c => {
                return c.visibilityState === 'visible';
            });

            if (cliente !== undefined) {
                cliente.navigate(notificacion.data.url);
                cliente.focus();
            } else {
                clients.openWindow(notificacion.data.url);
            }

            return notificacion.close();

        });

    e.waitUntil(respuesta);

});
