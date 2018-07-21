const express = require('express');

const app = express();

const courses = [
    {
        id: 1, name: 'Angular 6 Complete Guide'
    },
    {
        id: 2, name: 'NodeJS Complete Guide'
    },
    {
        id: 3, name: 'mongoDB Beginners Guide'
    }
];

app.get('/courses/', (req, res) => {
    res.status(200).send(courses);
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(crs => crs.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');

    res.status(200).send(course);
});

const port = process.env.PORT || 3200;
app.listen(port);