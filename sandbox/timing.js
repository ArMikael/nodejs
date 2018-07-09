var http = require('http');

var server = new http.Server(function (res, req) {

}).listen(3000);

setTimeout(function () {
    // server.close(function () {
    //    clearInterval(timer);
    // });
    server.close();
}, 2500);

var timer = setInterval(function () {
    console.log(process.memoryUsage());
}, 1000);

// Говорит Ноде, что этот таймер является второстепенным и его не следует учитывать при проверке внутренних вотчеров перед завершением процесса.
timer.unref();