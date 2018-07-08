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

app.get('/', (req, res) => {
   res.render('home');
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


app.listen(3000);

// let server = require('./server');
//
// server.run(); // Вызов метод дочернего модуля.