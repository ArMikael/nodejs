const path = require('path');
const express = require('express');
const app = express();
const hbs = require('express-handlebars');

app.engine('hbs', hbs({ extname: 'hbs', defaultValue: 'layout', layoutsDir: __dirname + '/views/' }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
   res.render('home');
});

app.get('/user/:name', (req, res) => {
    res.render('layout', { name: req.params.name });
});


app.listen(3000);

// let server = require('./server');
//
// server.run(); // Вызов метод дочернего модуля.