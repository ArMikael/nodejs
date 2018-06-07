// File System module
var fs = require('fs');

fs.exists('db/ru.json', function () {
    // Проверяет, существует ли такой путь. Но не умеет определить, это папка или файл.
});

fs.stat('db/ru.json', function (err, stats) {
    // Позволяет проверить различные данные по указанному пути. Например, являтся ли он файлом.
    console.log('stats.isFile: ', stats.isFile());
    console.log('stats: ', stats);
});

// __filename
fs.readFile('db/ru.json', function(err, data) {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error(err.message);
        } else {
            console.error(err);
        }
    } else {
        console.log(data.toString()); // Внутри скобок указываем тип кодировки, по умолчанию utf-8.
    }
});

// 1) Название файла, 2) Внутренний контент - текст файла, callback
fs.writeFile('generated.json', '{ "writeFile": "success" }', function (err) {
    if (err) {
        throw err;
    }
});
