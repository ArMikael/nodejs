let data = [
    { item: 'Sending and handling web forms' },
    { item: 'User Authentication and Authorization'},
    { item: 'Connection to DB'}
];
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        res.render('todo', {data: data});
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body);
        res.render('todo', {data: data});
    });

    app.delete('/todo', (req, res) => {

    });
};