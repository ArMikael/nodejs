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

let itemOne = Todo({ item: 'Saving data into DB'}).save(err => {
    if (err) {
        throw err;
    }

    console.log('Item saved.');
});


module.exports = (app) => {

    app.get('/todo', (req, res) => {
        res.render('todo', {todoList: data});
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body);
        res.render('todo', {todoList: data});
    });

    app.delete('/todo/:item', (req, res) => {
        // let delItem = data.filter(req.body.item);

        data = data.filter((todo) => {
           return todo.item.replace(/ /g, '-') !== req.params.item;
        });

        res.json(data);
    });
};