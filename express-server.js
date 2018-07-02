var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();

app.get('/', function (req, res) {
   res.send('Up and running!');
});

app.get('/db/ru.json', function (req, res) {
    res.sendFile(__dirname + '/db/ru.json');
});

app.get('/profile/:id', function (req, res) {
    console.log(req.params.id);
    res.send(req.params.id);
});

app.get('/games/:gameTitle', function (req, res) {
   res.send('Game not found.');
});

app.listen(3000);