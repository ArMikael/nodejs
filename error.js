var util = require('util');
var phrases = require('./db/ru.json');

function PhraseError (message) {
    this.message = message;
    Error.captureStackTrace(this, PhraseError); // второй параметр указывает до какого места отслеживать путь ошибки
}

util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';


function HttpError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


function getPhrase(name) {
    if (!phrases[name]) {
        throw new PhraseError("Phrase doesn't exists: " + name);
    }
    return phrases[name];
}

function makePage(url) {
    if (url != 'index.html') {
        throw new HttpError(404, 'Page not found')
    }
    return util.format("%s, %s!", getPhrase('Hello'), getPhrase('Mord'));
}

try {
    var page = makePage('index.html');
    console.log(page);

} catch (e) {
    if (e instanceof HttpError) {
        console.log(e.status, e.message);
    } else {
        console.error('Error %s\n message: %s\n stack: %s', e.name, e.message, e.stack)
    }
}