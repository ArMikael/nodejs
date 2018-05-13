var http = require('http');

var server = new http.Server(); // EventEmmiter
// http.Server -> net.Server -> EventEmitter

server.listen(1337, '127.0.0.1');

var counter = 0;

server.on('request', function (req, res) { // Из первого параметра читаем, во второй пишем
    res.end('WebServer is up and running! ' + ++counter);
});

