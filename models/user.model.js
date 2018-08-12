const mongoose = require('mongoose');

const UserSchema = mongoose.Schema = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
};

const User = new mongoose.Model('User', UserSchema);

module.exports.User = User;

// module.exports = {
//   UserSchema: UserSchema,
//   User: User
// };