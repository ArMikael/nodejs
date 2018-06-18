var http = require('http');
var fs = require('fs');

new http.Server(function (req, res) {
    // res instance of http.ServerResponse < stream.Writable

    if (req.url === '/big.html') {
        var file = new fs.ReadStream('big.html');
        sendFileModernWay(file, res);
    }
}).listen(3000);

function sendFile(file, res) {
    file.on('readable', write);
    
    function write() {
        var fileContent = file.read(); // считать

        if (fileContent && !res.write(fileContent)) { // отправить
            file.removeListener('readable', write);

            res.once('drain', function () { // подождать
               file.on('readable', write);
               write();
            });
        }
    }

    file.on('end', function () {
       res.end();
    });
}

// Всё то же самое, что выше, только короче и удобней.
function sendFileModernWay(file, res) {
    file.pipe(res); // file - откуда читать, res - куда писать
    file.pipe(process.stdout); // можно параллельно выводить результат в несколько потоков

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server Error');
        conole.error(err);
    });

    // Защита на случай, если соединение было прерванно и стрим не закрылся
    res.on('close', function () {
       file.destroy(); // Закрываем файл и освобождаем все ресурсы
    });
}