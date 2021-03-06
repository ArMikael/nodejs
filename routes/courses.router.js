const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const router = express.Router();
const auth = require('../middleware/auth.middleware');

const { Course } = require('../models/course.model');


// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find({});
    res.status(200).send(courses);
});

// Get specific course
router.get('/:id', async (req, res) => {
    const course = await Course.find({ _id: req.params.id });

    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.status(200).send(course);
});

// Adding new course
router.post('/', auth, async (req, res) => {
    try {
        const validationResult = await validateCourse(req.body);

        // Bad request 400
        if (validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

        let addedCourse = new Course(req.body);
        await addedCourse.save();
        res.send(addedCourse);
    }
    catch (ex) {
        console.log(ex.message);
        res.send(ex.message);
    }
});


// Updating an existing course
router.put('/:id', auth, async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).send('The course with the given name was not found.');

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.set(req.body).save();

    res.send(course);

    // const result = await Course.update({ _id: req.params.id }, {
    //     $set: {
    //         author: 'New Author',
    //         isPublished: true
    //     }
    // });
    //
    // console.log(result);
});

// Remove course
router.delete('/:id', auth, async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) return res.status(404).send('Course with the given id was not found.');

    res.send(course);
});


// Validation by using Joi before sending it to db
function validateCourse(course) {
    const schema = {
        id: Joi.objectId(),
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        tags: Joi.array(),
        isPublished: Joi.boolean().required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;