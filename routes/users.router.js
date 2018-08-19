const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User } = require('../models/user.model');


router.post('/', async (req, res) => {
    try {
        let { error } = await validateUser(req.body);
        if (error) return res.status(400).send('Wrong user parameters: ', error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        // Hashing passwords
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save() ;

        res.send(_.pick(user, ['_id', 'name', 'email']));
    }
    catch (ex) {
        console.log(ex.message);
        res.send(ex.message);
    }
});

function validateUser(newUser) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(newUser, schema);
}

module.exports = router;