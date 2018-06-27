const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer((req, res) => {
    let pathname = decodeURI(url.parse(req.url).pathname);
    // let stat = fs.statSync(pathname);

    res.writeHead(200, {
        'Content-Type': 'html/txt',
        // 'Content-Length': stat.size
    });

    let file = fs.createReadStream('new-server.js');
    file.pipe(res);

}).listen(4000);
