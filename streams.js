var fs = require('fs');

var stream = new fs.ReadStream('./db/ru.json');

stream.on('readable', function () {
    var data = stream.read();
    if (data) {
        console.log(data.toString());
    } else {
        console.log(data);
    }
});

stream.on('end', function () {
   console.log('The End');
});

stream.on('error', function (err) {
    if (err.code == 'ENOENT') {
        console.log('File not found, kick your admin to upload it.');
    } else {
        console.error(err);
    }

});