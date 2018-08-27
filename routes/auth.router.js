const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User } = require('../models/user.model');


router.post('/', async (req, res) => {
    try {
        let { error } = await validateAuth(req.body);
        if (error) return res.status(400).send('Wrong user parameters: ', error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = await user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
    catch (ex) {
        console.log(ex.message);
        res.send(ex.message);
    }
});

function validateAuth(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(user, schema);
}

module.exports = router;