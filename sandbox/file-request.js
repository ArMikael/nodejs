var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('sandbox/fs');

var ROOT = __dirname + "public";

http.createServer(function (req, res) {
    if (!checkAccess(req)) {
        res.statusCode = 403;
        res.end('Tell me the secret to access');
        return;
    }

    sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess(req) {
    // В реальной жизни проверку нужно делать с помощью кукиз/БД
    return url.parse(req.url, true).query.secret == 'ZXZQ';
}

function sendFileSafe(filePath, res) {
    try {
        // Превращаем закодированные символы из ссылки в обычные - Декодируем.
        filePath = decodeURIComponent(filePath);
    } catch (e) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }

    if (~filePath.indexOf('\0')) {
        res.statusCode = 400;
        res.end("Bad Request");
    }

    // normalize - убириает из пути все лишние знаки, такие как: ".", "..", "//"
    filePath = path.normalize(path.join(ROOT, filePath));

    // Проверяем из какого пути идет запрос, авторизирован ли пользователь?
    if (filePath.indexOf(ROOT) != 0) {
        res.statusCode = 400;
        res.end("File not found");
    }

    fs.stat(filePath, function (err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end("Page not found");
            return;
        }
    });

    sendFile(filePath, res);
}

function sendFile(filePath, res) {
    // Для отправки файлов клиенту лучше использовать потоки, а не readFile
    fs.readFile(filePath, function (err, content) {
        if (err) { throw err }

        // Позволяет определить тип контента, чтобы в итоге указать его в загаловках ответа
        var mime = require('mime').lookup(filePath); // npm install mime
        res.setHeader('Content-Type', mime + "; charset=utf-8"); // text/html, image/jpeg
        res.end(content);
    });
}

