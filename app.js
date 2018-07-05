const express = require('express');
const app = express();
const handlebars = require('handlebars');

app.set('view engine', 'handlebars');




let server = require('./server');

server.run(); // Вызов метод дочернего модуля.