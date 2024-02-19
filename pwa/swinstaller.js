let swLocation = 'sw.js';
let swReg;

if( navigator.serviceWorker ) {

    window.addEventListener('load', () => {

        navigator.serviceWorker.register( swLocation )
            .then( (reg) => {
                swReg = reg;
            });

    });

}
