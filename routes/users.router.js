const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { User } = require('../models/user.model');

router.post('/', async (req, res) => {
    try {
        let validUser = await validateUser(req.body);

        if (!validUser.error) return res.status(400).send('Wrong user parameters: ', validUser.error.details[0].message);

        let user = new User(req.body);
        await user.save();

        res.send(validUser);
    }
    catch (ex) {
        console.log(ex.message);
        res.send(ex.message);
    }
});

function validateUser(newUser) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.email().required(),
        password: Joi.string().required()
    };

    return Joi.validate(newUser, schema);
}

module.exports = router;