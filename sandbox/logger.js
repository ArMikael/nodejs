// var log = require('logger')(module);

// module.exports = function () {
//     return function () {
//         var args = [module.filename].concat([].slice.call(arguments));
//         console.log.apply(console, args);
//     }
// };

const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);

        // Raise an event
        this.emit(message, { id: 1, url: 'http://' });
    }
}

module.exports = Logger;