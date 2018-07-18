const EventEmitter = require('events').EventEmitter;

let server = new EventEmitter();

server.on('request', function (request) {
    request.approve = true;
});

server.on('request', function (request) {
   console.log(request);
});

server.on('logging', (arg) => {
    console.log(arg);
});

server.emit('request', {from: 'Client'});
server.emit('request', {from: 'Another client'});

server.emit('logging', {data: 'message' });
