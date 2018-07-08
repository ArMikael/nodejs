const path = require('path');
const express = require('express');
const app = express();
const hbs = require('express-handlebars');

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


app.get('/', (req, res) => {
   res.render('index');
});

app.get('/user/:name', (req, res) => {
    let userData = {
        name: 'David',
        age: '33',
        job: 'Developer'
    };

    res.render('layout',
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

app.get('/contact', (req, res) => {
    // http://localhost:3000/contact?name=Michael&email=armikael@gmail.com
    res.render('contact-us', { data: req.query });
});

app.listen(3000);

// let server = require('./server');
//
// server.run(); // Вызов метод дочернего модуля.