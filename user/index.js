var phrases = require('./ru');

function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    console.log(phrases.Hello + ', ' + who.name);
};

console.log('user.js is up and running!');

//exports.User = User; // Если из модуля планируется экспортировать несколько объектов, лучше экспортировать их таким образом.
// В таком случае вызываться они будут из родителя так: new user.User('Michael');

module.exports = User; // Для более удобной работы можно экспортировать модуль таким макаром.
// В таком случае вызвать объект можно будет так: new User('Michael');


// Позволяет посмотреть все данные по модулю. Кем был вызван, какие дети есть, какие экспорты торчат наружу.
// console.log(module);