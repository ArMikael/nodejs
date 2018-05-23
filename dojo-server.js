const http = require('http');

http.createServer((req, res), function () {
    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end();

        case '/app.css':
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end();

        case '/app.js':
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end();

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Page not found.');
    }
});