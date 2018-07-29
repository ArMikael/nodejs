const express = require('express');
const Joi = require('joi');
const router = express.Router();

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


router.get('/', (req, res) => {
    res.status(200).send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(crs => crs.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    res.status(200).send(course);
});

router.post('/', (req, res) => {
    const result = validateCourse(req.body);

    // Bad request 400
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    let course = courses.find(crs => crs.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given name was not found.');

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;

    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(crs => crs.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with the given id was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});



function validateCourse(course) {
    const schema = {
        id: Joi.number(),
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

module.exports = router;