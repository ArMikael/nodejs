const mongoose = require('mongoose');
const { privateConfig } = require('../config/private-config');

mongoose.connect(privateConfig.mdbCoursesConnectionString, { useNewUrlParser: true })
    .then('CoursesDB connected...')
    .catch(err => console.log(err.message));


const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

// createAuthor('Ryan Dahl', 'NodeJS Creator', 'http://www.nodejs.com');

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
        // 'name bio' - to show specific props, '-_id -__v' - to exclude some properties
        .populate('author', 'name bio')
        .select('name author');

    console.log(courses);
}

listCourses();