const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        // All following are mongoose validators and doesn't exist in vanilla mongoDB
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    author: String,
    categories: {
        type: [ String ],
        enum: ['Front End', 'Back End', 'DB'],
        lowercase: true, // save all categories in lowercase
        trim: true // remove all empty spaces in categories strings
        // uppercase: true // save all categories in uppercase
    },
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value && value.length > 0
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 2000,
        get: (v) => Math.round(v), // Round the value when it's coming from DB
        set: (v) => Math.round(v) // Round the value when we saving it on backend
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course;