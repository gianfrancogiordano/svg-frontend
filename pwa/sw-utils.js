

// Guardar en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {

    if( res ) {
        return caches.open( dynamicCache ).then( cache => {
            cache.put( req, res.clone() );
            return res.clone();
        });

    } else {

        return res;
    }


}

// Limpia el cache que se le envie
function limpiarCache( cacheName, numeroItems ) {

    caches.open( cacheName )
        .then( cache => {

            return cache.keys()
                .then( keys => {
                    
                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });

            
        });
}

