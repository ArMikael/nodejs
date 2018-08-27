const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { privateConfig } = require('../config/private-config');

const UserSchema = new mongoose.Schema ({
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
});

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, privateConfig.secretKey);
};

const User = mongoose.model('User', UserSchema);

module.exports.User = User;

// module.exports = {
//   UserSchema: UserSchema,
//   User: User
// };