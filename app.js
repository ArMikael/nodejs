const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const todoCtrl = require('./controllers/todo.controller');
const contactsCtrl = require('./controllers/contacts.controller');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('hbs',
    hbs({
        extname: 'hbs',
        defaultValue: 'layout',
        layoutsDir: __dirname + '/views/',
        partialsDir: __dirname + '/views/partials/'
    }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/assets', express.static('assets'));

todoCtrl(app);
contactsCtrl(app);

// All request to static files will be forwarded to the "public" folder
// app.use('/', express.static('./public'));


app.get('/', (req, res) => {
   res.render('index');
});

app.get('/user/:name', (req, res) => {
    let userData = {
        name: 'David',
        age: '33',
        job: 'Developer',
        hobbies: ['singing', 'playing board games', 'swimming']
    };

    res.render('profile',
        {
            name: req.params.name,
            condition: false,
            userData: userData,
            itemsList: ['Umbrella', 'Guitar', 'Mandolin']
        }
    );
});

app.get('/about', (req, res) => {
    res.render('about');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port: ${ port }...`));

// export PORT=xxx // set process.env.PORT variable on Mac

// let server = require('./server');
//
// server.run(); // Вызов метод дочернего модуля.