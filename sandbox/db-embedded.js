const mongoose = require('mongoose');
const { privateConfig } = require('../config/private-config');

mongoose.connect(privateConfig.mdbCoursesConnectionString, { useNewUrlParser: true })
    .then('CoursesDB connected...')
    .catch(err => console.log(err.message));

const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});


const Author = mongoose.model('Author', AuthorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: AuthorSchema,
        require: true
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

//createCourse('NodeJS for Beginners', '5b6a0032f0d9c605e02bdb56');

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name bio')
        .select('name author');

    console.log(courses);
}

// listCourses();

// updateAuthor();