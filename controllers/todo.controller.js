const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connecting to the database
mongoose.connect('mongodb://armikael:nanabanana12@ds211588.mlab.com:11588/tododb');

// Creating Schema / Blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

// Creating Model type
// 1st param: Name on the collection that will be stored in mongoDB
// 2nd param: Schema as structure
const Todo = mongoose.model('Todo', todoSchema);


module.exports = (app) => {
    app.get('/todo', (req, res) => {
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {todoList: data});
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.render('todo', { todoList: data });
        });
    });

    app.delete('/todo/:item', (req, res) => {
        Todo.find({ item: req.params.item.replace(/\-/, ' ') }).remove((err, data) => {
            if (err) throw err;
            res.render('todo', { todoList: data });
        });
    });
};