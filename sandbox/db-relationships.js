const mongoose = require('mongoose');

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
      type: mongoose.Schema.Type.ObjectId, // Schema type object -
      ref: 'Author' // In what Collection in DB this object could be found
  }
}));
