const config = require('config');
const express = require('express');
const helmet = require('helmet'); // Sets headers to HTTP request to secure the app
const morgan = require('morgan'); // HTTP request logger. For DEV only.
const debug = require('debug')('app:courses'); // Set in terminal "export DEBUG=app:courses,app:config"
const configDebug = require('debug')('app:config'); // Run all debuggers -> export DEBUG:app:*

const courses = require('./courses');

debug('All dependencies loaded!');

const app = express();

// app.set('view engine', 'pug');
// app.set('views', './views/pug'); // default views folder

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/courses', courses);

configDebug('App Name: ', config.get('name'));
configDebug('Mail Server: ', config.get('mail.host'));
configDebug('Mail Password: ', config.get('mail.password')); //

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.get('/', (req, res) => {
    // res.status(200).render('index', { title: 'Course Machine App', mainTitle: 'Course Machine' });
    res.status(200).send('Welcome to the Courses Machine!');
});


const port = process.env.PORT || 3300;
app.listen(port);