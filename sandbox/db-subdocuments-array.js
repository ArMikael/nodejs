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

const Course = mongoose.model('CourseMultiAuthors', new mongoose.Schema({
    name: String,
    authors: {
        type: [AuthorSchema],
        require: true
    }
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

let authors = [
    {
        name: 'Harry Lordy',
        bio: 'Book hero',
        website: 'www.hero.book'
    },
    {
        name: 'Harry Potter',
        bio: 'Potter hero',
        website: 'www.hero.book'
    },
    {
        name: 'Many Botter',
        bio: 'Some hero',
        website: 'www.hero.book'
    }
];

createCourse('Writing books for beginners', authors);

async function listCourses() {
    const courses = await Course
        .find()
        .select('name author');

    console.log(courses);
}

listCourses();

// updateAuthor();