const config = require('config');
const { privateConfig } = require('./config/private-config');
const express = require('express');
const helmet = require('helmet'); // Sets headers to HTTP request to secure the app
const morgan = require('morgan'); // HTTP request logger. For DEV only.
const debug = require('debug')('app:courses'); // Set in terminal "export DEBUG=app:courses,app:config"
const configDebug = require('debug')('app:config'); // Run all debuggers -> export DEBUG:app:*
const mongoose = require('mongoose');
const { Course } = require('./models/course.model');

mongoose.connect(privateConfig.mdbCoursesConnectionString, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch((err) => console.log('Could not connect to MongoDB.'));


const courses = require('./routes/courses.router');

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
//configDebug('Mail Password: ', config.get('mail.password')); //

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.get('/', (req, res) => {
    // res.status(200).render('index', { title: 'Course Machine App', mainTitle: 'Course Machine' });
    res.status(200).send('Welcome to the Courses Machine!');
});

async function createCourse() {
    const course = new Course({
        name: 'NodeJS for Dummies',
        author: 'Michael Treser',
        tags: ['NodeJS', 'JS'],
        price: 14.789,
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (err) {
        // Simple Error notification
        // console.log(err.message);

        // Advance Error notification
        for (field in err.errors) {
            console.log(err.errors[field].message);
        }
    }
}

// createCourse();

async function getCourses() {
    const courses = await Course
        .find({ isPublished: true, price: { $gte: 15 }})
        .or([{ tags: 'backend'}, { tags: 'frontend'}])
        .sort('-price')
        .limit(10)
        .select({ name: 1, author: 1, price: 1, tags: 1 });

    console.log(courses);
}

// getCourses();


const port = process.env.PORT || 3300;
app.listen(port);