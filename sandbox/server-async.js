var http = require('http');
var fs = require('sandbox/fs');

http.createServer(function(req, res) {
    if (req.url == '/') {
        fs.readFile('index.html', function(err, info) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("Server Error");
                return;
            }

            res.end(info);

        });
    } else {
        // 404
    }
}).listen(3000);