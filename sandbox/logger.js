// var log = require('logger')(module);

module.exports = function () {
    return function () {
        var args = [module.filename].concat([].slice.call(arguments));
        console.log.apply(console, args);
    }
};