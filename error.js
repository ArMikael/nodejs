function PhraseError (message) {
    this.message = message;
    Error.captureStackTrace(this, PhraseError); // второй параметр указывает до какого места отслеживать путь ошибки
}

utils.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';


function HttpError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}

utils.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


function getPhrase(name) {
    if (!phrases[name]) {
        throw new PhraseError('Нет такой фразы ', + name);
    }
    return phrases[name];
}