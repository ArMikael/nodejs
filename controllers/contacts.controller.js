const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://armikael:nanabanana12@ds211588.mlab.com:11588/tododb');

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = (app) => {
    app.get('/contact', (req, res) => {
        // http://localhost:3000/contact?name=Michael&email=armikael@gmail.com
        res.render('contact-us', { data: req.query });
    });

    app.post('/contact', urlencodedParser, (req, res) => {
        Contact(req.body).save((err, data) => {
            if (!data) return res.sendStatus(400);
            res.render('contact-success', { data: data });
        });
    });



    app.get('/contacts', (req, res) => {
        Contact.find({}, (err, data) => {
            if (err) throw err;
            res.render('contacts', { contactsList: data });
        });
    });

    app.post('/contacts/:contact', urlencodedParser, (req, res) => {
        Contact.findOneAndUpdate({ _id: req.body.id }, req.body, (err, data) => {
            if (err) throw err;
            return res.send('Successfully saved');
        });
    });
};