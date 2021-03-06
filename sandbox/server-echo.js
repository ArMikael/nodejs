var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {
    console.log(req.method, req.url);

    var urlParsed = url.parse(req.url, true); // true - автоматически распарсит ссылку и превратит ее в объект с параметрами
    console.log(urlParsed);

    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.setHeader('Cache-control', 'no-cache');
        res.end(urlParsed.query.message + ' - ' + urlParsed.query.name);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }


});

server.listen(1337, '127.0.0.1');