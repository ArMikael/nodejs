let db = require('../db/index');
let User = require('../user/index');

function run() {
    let michael = new User('Michael');
    let nataly = new User('Nataly');

    michael.hello(nataly);

    console.log(db.getPhrase('Run successful'));
}


if (module.parent) { // Если этот модуль был вызван другим модулем
    exports.run = run;
} else { // Если файл был запущен сам по себе
    run();
}