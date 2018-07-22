const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

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

app.post('/courses/', (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) {
        // Bad request 400
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/courses/:id', (req, res) => {
    let course = courses.find(crs => crs.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given name was not found.');

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return false;
    }

    course.name = req.body.name;

    res.send(course);
});

const port = process.env.PORT || 3200;
app.listen(port);

function validateCourse(course) {
    const schema = {
        id: Joi.number(),
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};