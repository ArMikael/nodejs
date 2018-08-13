const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { User } = require('../models/user.model');

router.post('/', async (req, res) => {
    try {
        let { error } = await validateUser(req.body);
        if (error) return res.status(400).send('Wrong user parameters: ', error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(req.body);
        await user.save();

        res.send(user);
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