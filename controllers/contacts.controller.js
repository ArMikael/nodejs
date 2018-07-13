const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://armikael:nanabanana12@ds211588.mlab.com:11588/tododb');

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = (app) => {
    app.get('/contact', (req, res) => {
        // http://localhost:3000/contact?name=Michael&email=armikael@gmail.com
        res.render('contact-us', { data: req.query });
    });

    app.post('/contact', urlencodedParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        res.render('contact-success', { data: req.body });
    });
};