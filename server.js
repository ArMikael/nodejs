var User = require('./user');

function run() {
    var michael = new User('Michael');
    var nataly = new User('Nataly');

    michael.hello(nataly);
}


if (module.parent) { // Если этот модуль был вызван другим модулем
    exports.run = run;
} else { // Если файл был запущен сам по себе
    run();
}